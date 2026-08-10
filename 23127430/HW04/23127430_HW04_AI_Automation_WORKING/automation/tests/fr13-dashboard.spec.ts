import {
  expect,
  test,
  type APIRequestContext,
  type APIResponse,
  type Locator,
  type Page,
  type TestInfo,
} from '@playwright/test';
import testData from '../test-data/fr13-dashboard.json';

// This project intentionally has no @types/node dependency. Keep the isolated
// backend harness dependency-free while still letting Playwright transpile it.
declare const require: (id: string) => any;
declare const __dirname: string;
declare const process: {
  execPath: string;
  env: Record<string, string | undefined>;
};

const { spawn } = require('child_process');
const { once } = require('events');
const { mkdtemp, readFile, rm, writeFile } = require('fs/promises');
const { createServer } = require('net');
const { tmpdir } = require('os');
const path = require('path');
const { randomUUID } = require('crypto');

type ChildProcessWithoutNullStreams = {
  exitCode: number | null;
  signalCode: string | null;
  stdout: { on: (event: string, listener: (chunk: { toString(): string }) => void) => void };
  stderr: { on: (event: string, listener: (chunk: { toString(): string }) => void) => void };
  kill: () => boolean;
};

type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'canceled';

type DashboardOrder = {
  id: number;
  total_amount: number;
  status: OrderStatus;
};

type Fr13Case = {
  id: string;
  layer: string;
  datasetRef?: string;
  authFixture?: 'admin' | 'user' | null;
  action?: { type: string; target: string };
  request?: {
    method: string;
    path: string;
    authorization?: null;
  };
  expected: Record<string, unknown>;
};

type Fr13DataFile = {
  feature: string;
  featureName: string;
  source: string;
  urls: { adminBase: string };
  datasets: Record<string, DashboardOrder[]>;
  testCases: Fr13Case[];
};

type IsolatedBackend = {
  apiBase: string;
  adminToken: string;
  stop: () => Promise<void>;
};

const dataFile = testData as unknown as Fr13DataFile;
const casesById = new Map(dataFile.testCases.map((testCase) => [testCase.id, testCase]));

if (casesById.size !== dataFile.testCases.length) {
  throw new Error('FR-13 test data contains duplicate test-case IDs.');
}

function caseById(id: string): Fr13Case {
  const testCase = casesById.get(id);
  if (!testCase) throw new Error(`Missing FR-13 test data for ${id}.`);
  return testCase;
}

function datasetFor(testCase: Fr13Case): DashboardOrder[] {
  if (!testCase.datasetRef) return [];
  const dataset = dataFile.datasets[testCase.datasetRef];
  if (!dataset) throw new Error(`Missing FR-13 dataset: ${testCase.datasetRef}.`);
  return dataset;
}

function deliveredRevenue(orders: DashboardOrder[]): number {
  return orders
    .filter((order) => order.status === 'delivered')
    .reduce((sum, order) => sum + order.total_amount, 0);
}

function numericText(text: string): number {
  const digits = text.replace(/[^\d-]/g, '');
  return digits ? Number(digits) : Number.NaN;
}

async function expectMoney(locator: Locator, expected: number, currency = '₫'): Promise<void> {
  await expect(locator).toContainText(currency);
  await expect
    .poll(() => locator.innerText().then(numericText), {
      message: `money value should settle at ${expected} ${currency}`,
    })
    .toBe(expected);
}

async function expectGroupedMoney(
  locator: Locator,
  expected: number,
  currency = '₫',
): Promise<void> {
  await expectMoney(locator, expected, currency);
  const amountText = (await locator.innerText()).replace(currency, '').trim();
  expect(amountText).toMatch(/^\d{1,3}(?:[.,\s\u00a0\u202f]\d{3})+$/);
}

function orderProjection(orders: DashboardOrder[]): DashboardOrder[] {
  return orders
    .map(({ id, total_amount, status }) => ({ id, total_amount, status }))
    .sort((left, right) => left.id - right.id);
}

function expectCompleteOrderFixture(
  actual: DashboardOrder[],
  expected: DashboardOrder[],
): void {
  expect(orderProjection(actual)).toEqual(orderProjection(expected));
}

function expectNoAdminOrderData(body: unknown): void {
  expect(Array.isArray(body)).toBe(false);
  if (body && typeof body === 'object') {
    expect(Array.isArray((body as Record<string, unknown>).orders)).toBe(false);
  }
}

class DashboardPage {
  readonly dashboardHeading: Locator;
  readonly revenueHeading: Locator;
  readonly orderCountHeading: Locator;

  constructor(readonly page: Page) {
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard', exact: true });
    this.revenueHeading = page.getByRole('heading', {
      name: 'Tổng doanh thu (Delivered)',
      exact: true,
    });
    this.orderCountHeading = page.getByRole('heading', {
      name: 'Tổng số đơn hàng',
      exact: true,
    });
  }

  // The current SUT exposes no test id or ARIA relationship for metric values.
  // Scope the fallback to the value paragraph in the semantic heading's card.
  revenueValue(): Locator {
    return this.revenueHeading.locator('..').locator('p');
  }

  orderCountValue(): Locator {
    return this.orderCountHeading.locator('..').locator('p');
  }
}

async function mockAdminApi(page: Page, orders: DashboardOrder[]): Promise<void> {
  await page.route('**/api/**', async (route) => {
    const request = route.request();
    const pathname = new URL(request.url()).pathname;

    if (request.method() === 'GET' && pathname === '/api/admin/orders') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(orders),
      });
      return;
    }

    if (
      request.method() === 'GET' &&
      ['/api/admin/users', '/api/products', '/api/categories', '/api/coupons'].includes(pathname)
    ) {
      await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
      return;
    }

    await route.fulfill({
      status: 404,
      contentType: 'application/json',
      body: JSON.stringify({ error: `Unexpected FR-13 UI request: ${request.method()} ${pathname}` }),
    });
  });
}

async function openDashboardWithDataset(
  page: Page,
  orders: DashboardOrder[],
): Promise<DashboardOrder[]> {
  await mockAdminApi(page, orders);
  await page.addInitScript(() => localStorage.setItem('adminToken', 'fr13-controlled-ui-token'));

  const ordersResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === 'GET' &&
      new URL(response.url()).pathname === '/api/admin/orders' &&
      response.status() === 200,
  );
  await page.goto(dataFile.urls.adminBase);
  const ordersResponse = await ordersResponsePromise;
  return (await ordersResponse.json()) as DashboardOrder[];
}

async function reservePort(): Promise<number> {
  const server = createServer();
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  if (!address || typeof address === 'string') {
    server.close();
    throw new Error('Could not reserve a local port for the isolated FR-13 backend.');
  }
  const port = address.port;
  await new Promise<void>((resolve, reject) =>
    server.close((error?: Error) => (error ? reject(error) : resolve())),
  );
  return port;
}

function isolatedOrderSeed(orders: DashboardOrder[]): string {
  if (orders.length === 0) return '';
  const statements = orders
    .map(
      (order) =>
        `        insertFr13Order.run(${order.id}, ${order.total_amount}, ${JSON.stringify(order.status)});`,
    )
    .join('\n');

  return `
        // FR-13 isolated API fixture injected only into this temporary backend copy.
        const insertFr13Order = db.prepare(
            'INSERT INTO orders (id, total_amount, status) VALUES (?, ?, ?)'
        );
${statements}
        insertFr13Order.finalize();

`;
}

async function stopBackendProcess(
  child: ChildProcessWithoutNullStreams,
  runtimeDirectory: string,
): Promise<void> {
  if (child.exitCode === null && child.signalCode === null) {
    const exited = once(child, 'exit');
    child.kill();
    await exited;
  }
  await rm(runtimeDirectory, { recursive: true, force: true });
}

async function startIsolatedBackend(
  request: APIRequestContext,
  orders: DashboardOrder[],
): Promise<IsolatedBackend> {
  const backendSourceDirectory = path.resolve(__dirname, '../../src/backend');
  const runtimeDirectory = await mkdtemp(path.join(tmpdir(), 'hw04-fr13-'));
  const port = await reservePort();
  const apiBase = `http://127.0.0.1:${port}`;
  const adminEmail = `fr13-admin-${randomUUID()}@example.invalid`;
  const adminPassword = `Fr13-${randomUUID()}-Aa1!`;
  const serverPath = path.join(runtimeDirectory, 'server.js');
  const databasePath = path.join(runtimeDirectory, 'database.js');

  const originalServer = await readFile(path.join(backendSourceDirectory, 'server.js'), 'utf8');
  const originalDatabase = await readFile(path.join(backendSourceDirectory, 'database.js'), 'utf8');
  const isolatedServer = originalServer.replace(
    'const PORT = 3000;',
    `const PORT = ${port};`,
  );
  const isolatedDatabase = originalDatabase
    .replace(
      "insertUser.run('Admin User', 'admin@eshop.com', 'Admin123!', 'admin');",
      `insertUser.run('FR13 Isolated Admin', ${JSON.stringify(adminEmail)}, ${JSON.stringify(adminPassword)}, 'admin');`,
    )
    .replace('        // Seed Products', `${isolatedOrderSeed(orders)}        // Seed Products`);

  if (isolatedServer === originalServer || isolatedDatabase === originalDatabase) {
    await rm(runtimeDirectory, { recursive: true, force: true });
    throw new Error('FR-13 isolated backend bootstrap no longer matches the reviewed SUT source.');
  }

  await writeFile(serverPath, isolatedServer, 'utf8');
  await writeFile(databasePath, isolatedDatabase, 'utf8');

  const child = spawn(process.execPath, [serverPath], {
    cwd: runtimeDirectory,
    env: {
      ...process.env,
      NODE_PATH: [
        path.join(backendSourceDirectory, 'node_modules'),
        process.env.NODE_PATH,
      ]
        .filter(Boolean)
        .join(path.delimiter),
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  }) as ChildProcessWithoutNullStreams;
  let diagnostics = '';
  child.stdout.on('data', (chunk: { toString(): string }) => (diagnostics += chunk.toString()));
  child.stderr.on('data', (chunk: { toString(): string }) => (diagnostics += chunk.toString()));

  let adminToken = '';
  try {
    await expect
      .poll(
        async () => {
          try {
            const response = await request.post(`${apiBase}/api/login`, {
              data: { email: adminEmail, password: adminPassword },
            });
            if (response.status() !== 200) return response.status();
            const body = await response.json();
            adminToken = typeof body.token === 'string' ? body.token : '';
            return adminToken ? 200 : 0;
          } catch {
            return child.exitCode === null ? 0 : child.exitCode ?? -1;
          }
        },
        {
          message: 'isolated FR-13 backend should accept its generated admin fixture',
          timeout: 15_000,
        },
      )
      .toBe(200);
  } catch (error) {
    await stopBackendProcess(child, runtimeDirectory);
    throw new Error(
      `Could not start the isolated FR-13 backend.\n${diagnostics.slice(-4_000)}`,
      { cause: error },
    );
  }

  return {
    apiBase,
    adminToken,
    stop: () => stopBackendProcess(child, runtimeDirectory),
  };
}

async function withIsolatedBackend<T>(
  request: APIRequestContext,
  orders: DashboardOrder[],
  action: (backend: IsolatedBackend) => Promise<T>,
): Promise<T> {
  const backend = await startIsolatedBackend(request, orders);
  try {
    return await action(backend);
  } finally {
    await backend.stop();
  }
}

async function sendReviewedRequest(
  request: APIRequestContext,
  apiBase: string,
  testCase: Fr13Case,
  token?: string,
): Promise<APIResponse> {
  if (!testCase.request) throw new Error(`Missing API request data for ${testCase.id}.`);
  return request.fetch(`${apiBase}${testCase.request.path}`, {
    method: testCase.request.method,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

function annotateControlledUi(testInfo: TestInfo): void {
  testInfo.annotations.push({
    type: 'fixture-assumption',
    description:
      'Dashboard UI uses the human-reviewed FR-13 order dataset through controlled HTTP responses.',
  });
}

function annotateIsolatedApi(testInfo: TestInfo): void {
  testInfo.annotations.push({
    type: 'test-isolation',
    description:
      'API case runs a temporary copy of the reviewed backend source with a private SQLite database and generated admin fixture.',
  });
}

test.describe('FR-13 – Dashboard', () => {
  test.describe('UI cases', () => {
    const metricCases = [
      ['TC001', 'mixed statuses contribute only delivered revenue'],
      ['TC002', 'empty orders produce stable zero metrics'],
      ['TC003', 'non-delivered statuses contribute zero revenue'],
      ['TC004', 'large delivered revenue is not truncated'],
      ['TC009', 'minimum positive revenue and count are displayed'],
      ['TC010', 'all supported statuses use the delivered-only rule'],
    ] as const;

    for (const [id, title] of metricCases) {
      test(`${id} – ${title}`, async ({ page }, testInfo) => {
        const testCase = caseById(id);
        const orders = datasetFor(testCase);
        annotateControlledUi(testInfo);
        await openDashboardWithDataset(page, orders);
        const dashboard = new DashboardPage(page);

        await expect(dashboard.dashboardHeading).toBeVisible();
        await expectMoney(
          dashboard.revenueValue(),
          Number(testCase.expected.revenue),
          String(testCase.expected.currency ?? '₫'),
        );
        await expect(dashboard.orderCountValue()).toHaveText(
          String(testCase.expected.orderCount),
        );

        if (testCase.expected.pageStable) {
          await expect(dashboard.dashboardHeading).toHaveCount(1);
        }
        if (testCase.expected.thousandsGrouped) {
          await expectGroupedMoney(
            dashboard.revenueValue(),
            Number(testCase.expected.revenue),
            String(testCase.expected.currency ?? '₫'),
          );
        }
      });
    }

    test('TC011 – unauthenticated visitor sees login instead of metrics', async ({ page }) => {
      const testCase = caseById('TC011');
      await page.goto(dataFile.urls.adminBase);

      await expect(page.getByRole('heading', { name: 'Admin Login', exact: true })).toBeVisible();
      await expect(page.getByPlaceholder('Email', { exact: true })).toBeVisible();
      await expect(page.getByPlaceholder('Password', { exact: true })).toHaveAttribute(
        'type',
        'password',
      );
      await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Dashboard', exact: true })).toHaveCount(
        testCase.expected.dashboardVisible ? 1 : 0,
      );
      await expect(
        page.getByRole('heading', { name: 'Tổng doanh thu (Delivered)', exact: true }),
      ).toHaveCount(testCase.expected.metricsVisible ? 1 : 0);
    });

    test('TC014 – UI metrics equal the order API response', async ({ page }, testInfo) => {
      const testCase = caseById('TC014');
      const orders = datasetFor(testCase);
      annotateControlledUi(testInfo);
      const apiOrders = await openDashboardWithDataset(page, orders);
      const dashboard = new DashboardPage(page);

      expect(apiOrders).toEqual(orders);
      await expectMoney(
        dashboard.revenueValue(),
        deliveredRevenue(apiOrders),
      );
      await expect(dashboard.orderCountValue()).toHaveText(String(apiOrders.length));
    });
  });

  test.describe('API cases', () => {
    test('TC005 – admin order source returns the complete mixed fixture', async (
      { request },
      testInfo,
    ) => {
      const testCase = caseById('TC005');
      const orders = datasetFor(testCase);
      annotateIsolatedApi(testInfo);

      await withIsolatedBackend(request, orders, async (backend) => {
        const response = await sendReviewedRequest(
          request,
          backend.apiBase,
          testCase,
          backend.adminToken,
        );
        expect(response.status()).toBe(Number(testCase.expected.status));
        const body = (await response.json()) as DashboardOrder[];
        expect(Array.isArray(body)).toBe(true);
        expectCompleteOrderFixture(body, orders);
        expect(deliveredRevenue(body)).toBe(Number(testCase.expected.deliveredRevenue));
      });
    });

    test('TC006 – missing token cannot retrieve admin orders', async ({ request }, testInfo) => {
      const testCase = caseById('TC006');
      annotateIsolatedApi(testInfo);

      await withIsolatedBackend(request, [], async (backend) => {
        const response = await sendReviewedRequest(request, backend.apiBase, testCase);
        expect(response.status()).toBe(Number(testCase.expected.status));
        expectNoAdminOrderData(await response.json());
      });
    });

    test('TC007 – non-delivered API fixture derives zero revenue', async (
      { request },
      testInfo,
    ) => {
      const testCase = caseById('TC007');
      const orders = datasetFor(testCase);
      annotateIsolatedApi(testInfo);

      await withIsolatedBackend(request, orders, async (backend) => {
        const response = await sendReviewedRequest(
          request,
          backend.apiBase,
          testCase,
          backend.adminToken,
        );
        expect(response.status()).toBe(Number(testCase.expected.status));
        const body = (await response.json()) as DashboardOrder[];
        expectCompleteOrderFixture(body, orders);
        expect(deliveredRevenue(body)).toBe(Number(testCase.expected.deliveredRevenue));
      });
    });

    test('TC008 – API preserves a large delivered amount', async ({ request }, testInfo) => {
      const testCase = caseById('TC008');
      const orders = datasetFor(testCase);
      annotateIsolatedApi(testInfo);

      await withIsolatedBackend(request, orders, async (backend) => {
        const response = await sendReviewedRequest(
          request,
          backend.apiBase,
          testCase,
          backend.adminToken,
        );
        expect(response.status()).toBe(Number(testCase.expected.status));
        const body = (await response.json()) as DashboardOrder[];
        expect(body).toHaveLength(orders.length);
        expect(deliveredRevenue(body)).toBe(Number(testCase.expected.deliveredRevenue));
        expect(Number.isSafeInteger(body[0].total_amount)).toBe(
          Boolean(testCase.expected.precisionPreserved),
        );
      });
    });

    test('TC012 – normal user token cannot retrieve admin orders', async (
      { request },
      testInfo,
    ) => {
      const testCase = caseById('TC012');
      annotateIsolatedApi(testInfo);

      await withIsolatedBackend(request, [], async (backend) => {
        const fixtureId = randomUUID();
        const user = {
          name: 'FR13 Isolated User',
          email: `fr13-user-${fixtureId}@example.invalid`,
          password: `Fr13-${fixtureId}-Aa1!`,
        };
        const registerResponse = await request.post(`${backend.apiBase}/api/register`, {
          data: user,
        });
        expect(registerResponse.status()).toBe(200);
        const loginResponse = await request.post(`${backend.apiBase}/api/login`, {
          data: { email: user.email, password: user.password },
        });
        expect(loginResponse.status()).toBe(200);
        const loginBody = await loginResponse.json();
        expect(loginBody.token).toEqual(expect.any(String));

        const response = await sendReviewedRequest(
          request,
          backend.apiBase,
          testCase,
          loginBody.token,
        );
        expect.soft(response.status()).toBe(Number(testCase.expected.status));
        expectNoAdminOrderData(await response.json());
      });
    });

    test('TC013 – admin orders API returns an empty array for an empty fixture', async (
      { request },
      testInfo,
    ) => {
      const testCase = caseById('TC013');
      annotateIsolatedApi(testInfo);

      await withIsolatedBackend(request, datasetFor(testCase), async (backend) => {
        const response = await sendReviewedRequest(
          request,
          backend.apiBase,
          testCase,
          backend.adminToken,
        );
        expect(response.status()).toBe(Number(testCase.expected.status));
        const body = (await response.json()) as DashboardOrder[];
        expect(body).toEqual(testCase.expected.body);
        expect(deliveredRevenue(body)).toBe(Number(testCase.expected.deliveredRevenue));
        expect(body).toHaveLength(Number(testCase.expected.orderCount));
      });
    });
  });
});
