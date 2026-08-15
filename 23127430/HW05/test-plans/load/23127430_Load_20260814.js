import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { Counter, Rate, Trend } from 'k6/metrics';

const BASE_URL = (__ENV.BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');
const RUN_MODE = (__ENV.RUN_MODE || 'load').toLowerCase();

function parseCsv(text, expectedHeader) {
  const lines = text
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2 || lines[0] !== expectedHeader.join(',')) {
    throw new Error(`Unexpected CSV header; expected ${expectedHeader.join(',')}`);
  }

  return lines.slice(1).map((line, rowIndex) => {
    const values = line.split(',');
    if (values.length !== expectedHeader.length) {
      throw new Error(`Unexpected CSV column count at row ${rowIndex + 2}`);
    }
    return Object.fromEntries(expectedHeader.map((key, index) => [key, values[index]]));
  });
}

const users = new SharedArray('wf01 users', () =>
  parseCsv(open('../../test-data/users.csv'), ['email', 'password', 'shipping_address']),
);

const products = new SharedArray('wf01 product keywords', () =>
  parseCsv(open('../../test-data/products.csv'), ['keyword']),
);

if (users.length < 5) {
  throw new Error(`Option A requires at least 5 unique users; found ${users.length}`);
}
if (products.length === 0) {
  throw new Error('At least one product keyword is required');
}

const functionalFailures = new Rate('functional_failures');
const completedIterations = new Counter('wf01_completed_iterations');
const abortedIterations = new Counter('wf01_aborted_iterations');
const iterationDuration = new Trend('wf01_iteration_duration', true);

const thresholds = {
  http_req_failed: ['rate<0.01'],
  functional_failures: ['rate==0'],
};

export const options = RUN_MODE === 'dry-run'
  ? {
      scenarios: {
        wf01_dry_run: {
          executor: 'shared-iterations',
          vus: 1,
          iterations: 1,
          maxDuration: '2m',
          tags: { profile: 'dry-run' },
        },
      },
      thresholds,
    }
  : {
      scenarios: {
        wf01_load: {
          executor: 'ramping-vus',
          startVUs: 1,
          stages: [
            { duration: '2m', target: 5 },
            { duration: '5m', target: 5 },
            { duration: '1m', target: 0 },
          ],
          gracefulRampDown: '30s',
          gracefulStop: '30s',
          tags: { profile: 'option-a' },
        },
      },
      thresholds,
    };

function randomSleep(minSeconds, maxSeconds) {
  sleep(minSeconds + Math.random() * (maxSeconds - minSeconds));
}

function safeJson(response) {
  try {
    return response.json();
  } catch (_) {
    return null;
  }
}

function abortIteration(step) {
  functionalFailures.add(1, { step });
  abortedIterations.add(1, { step });
}

function jsonHeaders(token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export default function () {
  const iterationStartedAt = Date.now();
  const userIndex = __VU - 1;
  if (userIndex < 0 || userIndex >= users.length) {
    abortIteration('user-allocation');
    throw new Error(`No unique CSV account available for VU ${__VU}`);
  }

  const user = users[userIndex];
  const keyword = products[(userIndex + __ITER) % products.length].keyword;

  const loginResponse = http.post(
    `${BASE_URL}/api/login`,
    JSON.stringify({ email: user.email, password: user.password }),
    { headers: jsonHeaders(), tags: { name: '01_Login' } },
  );
  const loginJson = safeJson(loginResponse);
  const loginOk = check(loginResponse, {
    'Login: HTTP 200': (response) => response.status === 200,
    'Login: success message': () => loginJson && loginJson.message === 'Login successful',
    'Login: non-empty JWT': () => loginJson && typeof loginJson.token === 'string' && loginJson.token.length > 0,
    'Login: numeric user id': () => loginJson && Number.isFinite(Number(loginJson.user && loginJson.user.id)),
    'Login: no error field': () => loginJson && !loginJson.error,
  });
  if (!loginOk) {
    abortIteration('login');
    return;
  }

  const token = loginJson.token;
  randomSleep(1, 2);

  const searchResponse = http.get(
    `${BASE_URL}/api/products?search=${encodeURIComponent(keyword)}`,
    { tags: { name: '02_Search_Product' } },
  );
  const searchJson = safeJson(searchResponse);
  const selectedProduct = Array.isArray(searchJson) ? searchJson[0] : null;
  const searchOk = check(searchResponse, {
    'Search: HTTP 200': (response) => response.status === 200,
    'Search: non-empty array': () => Array.isArray(searchJson) && searchJson.length > 0,
    'Search: product id': () => selectedProduct && Number.isFinite(Number(selectedProduct.id)),
    'Search: product name': () => selectedProduct && typeof selectedProduct.name === 'string' && selectedProduct.name.length > 0,
    'Search: numeric price': () => selectedProduct && Number.isFinite(Number(selectedProduct.price)),
  });
  if (!searchOk) {
    abortIteration('search');
    return;
  }

  const productId = Number(selectedProduct.id);
  const productName = selectedProduct.name;
  const productPrice = Number(selectedProduct.price);
  randomSleep(2, 4);

  const detailResponse = http.get(`${BASE_URL}/api/products/${productId}`, {
    tags: { name: '03_Product_Detail' },
  });
  const detailJson = safeJson(detailResponse);
  const detailOk = check(detailResponse, {
    'Detail: HTTP 200': (response) => response.status === 200,
    'Detail: non-empty object': () => detailJson && typeof detailJson === 'object' && Object.keys(detailJson).length > 0,
    'Detail: correlated product id': () => detailJson && Number(detailJson.id) === productId,
    'Detail: numeric price': () => detailJson && Number.isFinite(Number(detailJson.price)),
  });
  if (!detailOk) {
    abortIteration('detail');
    return;
  }

  randomSleep(2, 5);
  const cartBody = JSON.stringify({
    id: productId,
    name: productName,
    price: productPrice,
    quantity: 1,
  });
  const cartResponse = http.post(`${BASE_URL}/api/cart`, cartBody, {
    headers: jsonHeaders(token),
    tags: { name: '04_Add_To_Cart' },
  });
  const cartJson = safeJson(cartResponse);
  const cartPostOk = check(cartResponse, {
    'Cart POST: HTTP 200': (response) => response.status === 200,
    'Cart POST: success message': () => cartJson && cartJson.message === 'Added to cart',
  });
  if (!cartPostOk) {
    abortIteration('cart-post');
    return;
  }

  const cartReadResponse = http.get(`${BASE_URL}/api/cart`, {
    headers: jsonHeaders(token),
    tags: { name: '05_Cart_Readback' },
  });
  const cartReadJson = safeJson(cartReadResponse);
  const cartReadOk = check(cartReadResponse, {
    'Cart GET: HTTP 200': (response) => response.status === 200,
    'Cart GET: correlated item and quantity': () =>
      Array.isArray(cartReadJson) &&
      cartReadJson.some((item) => Number(item.id) === productId && Number(item.quantity) === 1),
  });
  if (!cartReadOk) {
    abortIteration('cart-readback');
    return;
  }

  randomSleep(1, 3);
  const checkoutResponse = http.post(
    `${BASE_URL}/api/checkout`,
    JSON.stringify({ total_amount: productPrice, shipping_address: user.shipping_address }),
    {
      headers: jsonHeaders(token),
      tags: { name: '06_Checkout' },
    },
  );
  const checkoutJson = safeJson(checkoutResponse);
  const orderId = checkoutJson ? Number(checkoutJson.orderId) : NaN;
  const checkoutOk = check(checkoutResponse, {
    'Checkout: HTTP 200': (response) => response.status === 200,
    'Checkout: success message': () => checkoutJson && checkoutJson.message === 'Checkout successful',
    'Checkout: positive order id': () => Number.isInteger(orderId) && orderId > 0,
  });
  if (!checkoutOk) {
    abortIteration('checkout');
    return;
  }

  const ordersResponse = http.get(`${BASE_URL}/api/orders/my-orders`, {
    headers: jsonHeaders(token),
    tags: { name: '07_Order_Readback' },
  });
  const ordersJson = safeJson(ordersResponse);
  const ordersOk = check(ordersResponse, {
    'Orders GET: HTTP 200': (response) => response.status === 200,
    'Orders GET: correlated order id': () =>
      Array.isArray(ordersJson) && ordersJson.some((order) => Number(order.id) === orderId),
  });
  if (!ordersOk) {
    abortIteration('order-readback');
    return;
  }

  functionalFailures.add(0);
  completedIterations.add(1);
  iterationDuration.add(Date.now() - iterationStartedAt);
  randomSleep(3, 6);
}
