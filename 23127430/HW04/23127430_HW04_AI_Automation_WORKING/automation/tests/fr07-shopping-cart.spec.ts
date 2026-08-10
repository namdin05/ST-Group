import {
  expect,
  test,
  type APIRequestContext,
  type Locator,
  type Page,
  type TestInfo,
} from '@playwright/test';
import testData from '../test-data/fr07-shopping-cart.json';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category_id: number;
};

type CartEntry = { productRef: string; quantity: number };
type ApiRequestData = {
  method: string;
  path: string;
  body?: Record<string, unknown>;
  authorization?: null;
};

type Fr07Case = {
  id: string;
  layer: string;
  cart?: CartEntry[];
  actions?: Array<{ type: string; productRef: string; quantity: number }>;
  action?: Record<string, unknown>;
  authFixture?: string;
  request?: ApiRequestData;
  requests?: ApiRequestData[];
  expected: Record<string, unknown>;
};

type Fr07DataFile = {
  urls: { webBase: string; apiBase: string };
  auth: { name: string; email: string; password: string };
  products: Record<string, Product>;
  testCases: Fr07Case[];
};

const dataFile = testData as unknown as Fr07DataFile;
const casesById = new Map(dataFile.testCases.map((testCase) => [testCase.id, testCase]));

if (casesById.size !== dataFile.testCases.length) {
  throw new Error('FR-07 test data contains duplicate test-case IDs.');
}

function caseById(id: string): Fr07Case {
  const testCase = casesById.get(id);
  if (!testCase) throw new Error(`Missing FR-07 test data for ${id}.`);
  return testCase;
}

function productByRef(reference: string): Product {
  const product = dataFile.products[reference];
  if (!product) throw new Error(`Missing FR-07 product fixture: ${reference}.`);
  return product;
}

function runId(testInfo: TestInfo): string {
  return [
    testInfo.project.name,
    testInfo.workerIndex,
    testInfo.retry,
    testInfo.title.replace(/[^a-zA-Z0-9]+/g, '-'),
    Date.now(),
  ]
    .join('-')
    .toLowerCase();
}

function resolveTemplates<T>(value: T, id: string): T {
  return JSON.parse(JSON.stringify(value).replaceAll('{{runId}}', id)) as T;
}

async function mockReviewedProducts(page: Page): Promise<void> {
  const products = Object.values(dataFile.products);

  await page.route('**/api/products**', async (route) => {
    const pathname = new URL(route.request().url()).pathname;
    const idMatch = pathname.match(/\/api\/products\/(\d+)$/);
    const body = idMatch
      ? products.find((product) => product.id === Number(idMatch[1])) ?? {}
      : products;

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(body),
    });
  });
}

async function addProductWithQuantity(
  page: Page,
  product: Product,
  quantity: number,
): Promise<void> {
  if (!page.url().startsWith(dataFile.urls.webBase)) {
    await page.goto(dataFile.urls.webBase);
  } else if (new URL(page.url()).pathname !== '/') {
    await page.getByRole('link', { name: 'EShop', exact: true }).click();
  }

  const productLink = page.locator(`a[href="/product/${product.id}"]`);
  await productLink.waitFor({ state: 'visible' });
  await productLink.click();
  await expect(page).toHaveURL(`${dataFile.urls.webBase}/product/${product.id}`);
  await expect(page.getByRole('heading', { name: product.name, exact: true })).toBeVisible();

  // The real quantity label is not associated with its input. Scope the fallback
  // to the product page's only number input until the SUT adds htmlFor/id.
  await page.locator('main input[type="number"]').fill(String(quantity));
  const addButton = page.getByRole('button', {
    name: /^(?:Thêm vào giỏ hàng|Đã thêm)$/,
  });
  await addButton.click();

  // Current SUT ignores the first click. This conditional setup preserves the
  // reviewed cart precondition without adding a hardcoded delay and also works
  // after that unrelated FR-06 defect is fixed.
  if ((await addButton.textContent())?.trim() !== 'Đã thêm') {
    await addButton.click();
  }
  await expect(addButton).toHaveText('Đã thêm');
}

async function seedCart(page: Page, entries: CartEntry[]): Promise<void> {
  for (const entry of entries) {
    await addProductWithQuantity(page, productByRef(entry.productRef), entry.quantity);
  }
}

class CartPage {
  readonly main: Locator;
  readonly table: Locator;
  readonly itemRows: Locator;
  readonly emptyHeading: Locator;

  constructor(readonly page: Page) {
    this.main = page.locator('main');
    this.table = page.getByRole('table');
    this.itemRows = this.table.locator('tbody tr');
    this.emptyHeading = page.getByRole('heading', {
      name: 'Giỏ hàng của bạn đang trống',
      exact: true,
    });
  }

  async goto(): Promise<void> {
    if (!this.page.url().startsWith(dataFile.urls.webBase)) {
      await this.page.goto(`${dataFile.urls.webBase}/cart`);
      return;
    }

    await this.page.getByRole('link', { name: 'Giỏ hàng', exact: true }).click();
    await expect(this.page).toHaveURL(`${dataFile.urls.webBase}/cart`);
  }

  rowFor(productName: string): Locator {
    return this.table.getByRole('row').filter({ hasText: productName });
  }

  quantityCell(productName: string): Locator {
    return this.rowFor(productName).getByRole('cell').nth(2);
  }

  lineTotalCell(productName: string): Locator {
    return this.rowFor(productName).getByRole('cell').nth(3);
  }

  removeButton(productName: string): Locator {
    return this.rowFor(productName).getByRole('button', { name: 'Xóa', exact: true });
  }
}

async function expectNumericMoney(locator: Locator, expected: number): Promise<void> {
  await expect(locator).toContainText('₫');
  const numericValue = Number((await locator.innerText()).replace(/[^\d-]/g, ''));
  expect(numericValue).toBe(expected);
}

async function createAuthenticatedUser(
  request: APIRequestContext,
  testInfo: TestInfo,
): Promise<{ token: string; email: string }> {
  const auth = resolveTemplates(dataFile.auth, runId(testInfo));
  const registerResponse = await request.post(`${dataFile.urls.apiBase}/api/register`, {
    data: auth,
  });
  expect([200, 201], 'API test precondition: unique user registration').toContain(
    registerResponse.status(),
  );

  const loginResponse = await request.post(`${dataFile.urls.apiBase}/api/login`, {
    data: { email: auth.email, password: auth.password },
  });
  expect(loginResponse.status(), 'API test precondition: unique user login').toBe(200);
  const loginBody = await loginResponse.json();
  expect(loginBody.token).toEqual(expect.any(String));
  return { token: loginBody.token as string, email: auth.email };
}

async function sendApiRequest(
  request: APIRequestContext,
  requestData: ApiRequestData,
  token?: string,
) {
  return request.fetch(`${dataFile.urls.apiBase}${requestData.path}`, {
    method: requestData.method,
    data: requestData.body,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

test.describe('FR-07 – Shopping Cart', () => {
  test.describe('UI cases', () => {
    test.beforeEach(async ({ page }, testInfo) => {
      await mockReviewedProducts(page);
      testInfo.annotations.push({
        type: 'fixture-assumption',
        description: 'UI product API is controlled by the human-reviewed FR-07 JSON fixture.',
      });
    });

    test('TC001 – non-empty cart displays all required columns', async ({ page }) => {
      const testCase = caseById('TC001');
      await seedCart(page, testCase.cart ?? []);
      const cart = new CartPage(page);
      await cart.goto();

      await expect(cart.table).toBeVisible();
      for (const label of testCase.expected.columnLabels as string[]) {
        await expect.soft(
          cart.table.getByRole('columnheader', { name: label, exact: true }),
          `Required FR-07 column should be named “${label}”`,
        ).toBeVisible();
      }
      await expect(cart.itemRows).toHaveCount(1);
    });

    test('TC002 – empty cart shows message, illustration, and shopping link', async ({ page }) => {
      const testCase = caseById('TC002');
      const cart = new CartPage(page);
      await cart.goto();

      await expect(cart.emptyHeading).toHaveText(String(testCase.expected.message));
      expect(
        await cart.main.locator('img, svg, [role="img"]').count(),
        'Empty state should include a semantic illustration',
      ).toBeGreaterThan(0);
      const continueLink = page.getByRole('link', { name: 'Tiếp tục mua sắm', exact: true });
      await expect(continueLink).toHaveAttribute('href', String(testCase.expected.continuePath));
    });

    test('TC003 – adding the same product twice merges into one line', async ({ page }) => {
      const testCase = caseById('TC003');
      for (const action of testCase.actions ?? []) {
        await addProductWithQuantity(
          page,
          productByRef(action.productRef),
          action.quantity,
        );
      }
      const cart = new CartPage(page);
      await cart.goto();

      const product = productByRef((testCase.actions ?? [])[0].productRef);
      await expect(cart.itemRows).toHaveCount(Number(testCase.expected.lineCount));
      await expect(cart.rowFor(product.name)).toHaveCount(1);
      await expect(cart.quantityCell(product.name)).toHaveText(String(testCase.expected.quantity));
    });

    test('TC004 – plus control increments quantity and totals', async ({ page }) => {
      const testCase = caseById('TC004');
      await seedCart(page, testCase.cart ?? []);
      const cart = new CartPage(page);
      await cart.goto();
      const product = productByRef((testCase.cart ?? [])[0].productRef);
      const plusButton = cart.rowFor(product.name).getByRole('button', { name: '+', exact: true });

      await expect.soft(plusButton, 'Each cart row requires a plus control').toBeVisible();
      if ((await plusButton.count()) > 0) await plusButton.click();

      await expect(cart.quantityCell(product.name)).toHaveText(String(testCase.expected.quantity));
      await expectNumericMoney(cart.lineTotalCell(product.name), Number(testCase.expected.lineTotal));
      await expectNumericMoney(
        cart.main.getByText(/₫$/, { exact: true }).last(),
        Number(testCase.expected.grandTotal),
      );
    });

    test('TC005 – minus control cannot reduce quantity below one', async ({ page }) => {
      const testCase = caseById('TC005');
      await seedCart(page, testCase.cart ?? []);
      const cart = new CartPage(page);
      await cart.goto();
      const product = productByRef((testCase.cart ?? [])[0].productRef);
      const minusButton = cart.rowFor(product.name).getByRole('button', { name: '-', exact: true });

      await expect.soft(minusButton, 'Each cart row requires a minus control').toBeVisible();
      if ((await minusButton.count()) > 0 && (await minusButton.isEnabled())) {
        await minusButton.click();
      }
      await expect(cart.quantityCell(product.name)).toHaveText(
        String(testCase.expected.minimumQuantity),
      );
    });

    test('TC006 – line total equals price multiplied by quantity', async ({ page }) => {
      const testCase = caseById('TC006');
      await seedCart(page, testCase.cart ?? []);
      const cart = new CartPage(page);
      await cart.goto();
      const product = productByRef((testCase.cart ?? [])[0].productRef);

      await expectNumericMoney(cart.lineTotalCell(product.name), Number(testCase.expected.lineTotal));
    });

    test('TC007 – grand total sums all line totals and uses the exact label', async ({ page }) => {
      const testCase = caseById('TC007');
      await seedCart(page, testCase.cart ?? []);
      const cart = new CartPage(page);
      await cart.goto();

      await expect.soft(
        cart.main.getByText(new RegExp(`^${String(testCase.expected.totalLabel)}:`)),
        'Grand-total label must match FR-07 exactly',
      ).toBeVisible();
      const displayedGrandTotal = cart.main.getByText(
        `${Number(testCase.expected.grandTotal).toLocaleString('en-US')} ₫`,
        { exact: true },
      );
      await expect(displayedGrandTotal).toBeVisible();
    });

    test('TC008 – canceling the removal dialog keeps the item', async ({ page }) => {
      const testCase = caseById('TC008');
      await seedCart(page, testCase.cart ?? []);
      const cart = new CartPage(page);
      await cart.goto();
      const product = productByRef((testCase.cart ?? [])[0].productRef);
      let confirmationVisible = false;
      page.once('dialog', async (dialog) => {
        confirmationVisible = true;
        expect.soft(dialog.type()).toBe('confirm');
        await dialog.dismiss();
      });

      await cart.removeButton(product.name).click();

      expect.soft(confirmationVisible, 'Removing an item must open a confirmation dialog').toBe(
        Boolean(testCase.expected.confirmationVisible),
      );
      await expect(cart.itemRows).toHaveCount(Number(testCase.expected.lineCount));
    });

    test('TC009 – confirming the removal dialog deletes the item', async ({ page }) => {
      const testCase = caseById('TC009');
      await seedCart(page, testCase.cart ?? []);
      const cart = new CartPage(page);
      await cart.goto();
      const product = productByRef((testCase.cart ?? [])[0].productRef);
      let confirmationVisible = false;
      page.once('dialog', async (dialog) => {
        confirmationVisible = true;
        expect.soft(dialog.type()).toBe('confirm');
        await dialog.accept();
      });

      await cart.removeButton(product.name).click();

      expect.soft(confirmationVisible, 'Removing an item must open a confirmation dialog').toBe(
        Boolean(testCase.expected.confirmationVisible),
      );
      await expect(cart.itemRows).toHaveCount(Number(testCase.expected.lineCount));
      await expect(cart.emptyHeading).toBeVisible();
    });

    test('TC010 – continue-shopping control returns to the home page', async ({ page }) => {
      const testCase = caseById('TC010');
      await seedCart(page, testCase.cart ?? []);
      const cart = new CartPage(page);
      await cart.goto();
      const continueLink = page.getByRole('link', {
        name: 'Tiếp tục mua sắm',
        exact: true,
      });

      await expect.soft(continueLink, 'Non-empty cart requires the reviewed control label').toBeVisible();
      if ((await continueLink.count()) > 0) await continueLink.click();
      await expect(page).toHaveURL(`${dataFile.urls.webBase}${String(testCase.expected.path)}`);
    });
  });

  test.describe('API cases', () => {
    test('TC011 – authenticated user can retrieve their cart', async ({ request }, testInfo) => {
      const testCase = caseById('TC011');
      const { token } = await createAuthenticatedUser(request, testInfo);
      const response = await sendApiRequest(request, testCase.request as ApiRequestData, token);

      expect(response.status()).toBe(Number(testCase.expected.status));
      const body = await response.json();
      expect(Array.isArray(body)).toBe(true);
    });

    test('TC012 – API merges duplicate product posts into one line', async ({ request }, testInfo) => {
      const testCase = caseById('TC012');
      const { token } = await createAuthenticatedUser(request, testInfo);
      for (const requestData of testCase.requests ?? []) {
        const response = await sendApiRequest(request, requestData, token);
        expect(response.status()).toBe(200);
      }

      const getResponse = await request.get(`${dataFile.urls.apiBase}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      expect(getResponse.status()).toBe(200);
      const cart = await getResponse.json();
      expect(cart).toHaveLength(Number(testCase.expected.lineCount));
      expect(cart[0]).toMatchObject({
        id: testCase.expected.productId,
        quantity: testCase.expected.quantity,
      });
    });

    test('TC013 – unauthenticated client cannot retrieve a cart', async ({ request }) => {
      const testCase = caseById('TC013');
      const response = await sendApiRequest(request, testCase.request as ApiRequestData);

      expect(response.status()).toBe(Number(testCase.expected.status));
      const body = await response.json();
      expect(Array.isArray(body), 'Unauthorized response must not expose cart data').toBe(false);
    });

    test('TC014 – API rejects non-positive quantity without changing the cart', async ({
      request,
    }, testInfo) => {
      const testCase = caseById('TC014');
      const { token } = await createAuthenticatedUser(request, testInfo);
      const headers = { Authorization: `Bearer ${token}` };
      const initialResponse = await request.get(`${dataFile.urls.apiBase}/api/cart`, { headers });
      expect(initialResponse.status()).toBe(200);
      const initialCart = await initialResponse.json();

      for (const requestData of testCase.requests ?? []) {
        const response = await sendApiRequest(request, requestData, token);
        expect.soft(response.status(), 'Non-positive quantity should return a client error').toBeGreaterThanOrEqual(400);
        expect.soft(response.status(), 'Non-positive quantity should return a client error').toBeLessThan(500);
      }

      const finalResponse = await request.get(`${dataFile.urls.apiBase}/api/cart`, { headers });
      expect(finalResponse.status()).toBe(200);
      expect(await finalResponse.json()).toEqual(initialCart);
    });
  });
});
