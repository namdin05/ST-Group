# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr13-dashboard.spec.ts >> FR-13 – Dashboard >> UI cases >> TC014 – UI metrics equal the order API response
- Location: tests\fr13-dashboard.spec.ts:462:9

# Error details

```
Error: money value should settle at 350000 ₫

money value should settle at 350000 ₫

expect(received).toBe(expected) // Object.is equality

Expected: 350000
Received: 700000

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - heading "EShop Admin" [level=1] [ref=e5]
    - list [ref=e6]:
      - listitem [ref=e7] [cursor=pointer]: Dashboard
      - listitem [ref=e8] [cursor=pointer]: Danh mục
      - listitem [ref=e9] [cursor=pointer]: Sản phẩm
      - listitem [ref=e10] [cursor=pointer]: Mã Giảm Giá
      - listitem [ref=e11] [cursor=pointer]: Đơn hàng
      - listitem [ref=e12] [cursor=pointer]: Người dùng
      - listitem [ref=e13] [cursor=pointer]: Đăng xuất
  - generic [ref=e15]:
    - heading "Dashboard" [level=2] [ref=e16]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Tổng doanh thu (Delivered)" [level=3] [ref=e19]
        - paragraph [ref=e20]: 700,000 ₫
      - generic [ref=e21]:
        - heading "Tổng số đơn hàng" [level=3] [ref=e22]
        - paragraph [ref=e23]: "4"
```

# Test source

```ts
  11  | 
  12  | // This project intentionally has no @types/node dependency. Keep the isolated
  13  | // backend harness dependency-free while still letting Playwright transpile it.
  14  | declare const require: (id: string) => any;
  15  | declare const __dirname: string;
  16  | declare const process: {
  17  |   execPath: string;
  18  |   env: Record<string, string | undefined>;
  19  | };
  20  | 
  21  | const { spawn } = require('child_process');
  22  | const { once } = require('events');
  23  | const { mkdtemp, readFile, rm, writeFile } = require('fs/promises');
  24  | const { createServer } = require('net');
  25  | const { tmpdir } = require('os');
  26  | const path = require('path');
  27  | const { randomUUID } = require('crypto');
  28  | 
  29  | type ChildProcessWithoutNullStreams = {
  30  |   exitCode: number | null;
  31  |   signalCode: string | null;
  32  |   stdout: { on: (event: string, listener: (chunk: { toString(): string }) => void) => void };
  33  |   stderr: { on: (event: string, listener: (chunk: { toString(): string }) => void) => void };
  34  |   kill: () => boolean;
  35  | };
  36  | 
  37  | type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'canceled';
  38  | 
  39  | type DashboardOrder = {
  40  |   id: number;
  41  |   total_amount: number;
  42  |   status: OrderStatus;
  43  | };
  44  | 
  45  | type Fr13Case = {
  46  |   id: string;
  47  |   layer: string;
  48  |   datasetRef?: string;
  49  |   authFixture?: 'admin' | 'user' | null;
  50  |   action?: { type: string; target: string };
  51  |   request?: {
  52  |     method: string;
  53  |     path: string;
  54  |     authorization?: null;
  55  |   };
  56  |   expected: Record<string, unknown>;
  57  | };
  58  | 
  59  | type Fr13DataFile = {
  60  |   feature: string;
  61  |   featureName: string;
  62  |   source: string;
  63  |   urls: { adminBase: string };
  64  |   datasets: Record<string, DashboardOrder[]>;
  65  |   testCases: Fr13Case[];
  66  | };
  67  | 
  68  | type IsolatedBackend = {
  69  |   apiBase: string;
  70  |   adminToken: string;
  71  |   stop: () => Promise<void>;
  72  | };
  73  | 
  74  | const dataFile = testData as unknown as Fr13DataFile;
  75  | const casesById = new Map(dataFile.testCases.map((testCase) => [testCase.id, testCase]));
  76  | 
  77  | if (casesById.size !== dataFile.testCases.length) {
  78  |   throw new Error('FR-13 test data contains duplicate test-case IDs.');
  79  | }
  80  | 
  81  | function caseById(id: string): Fr13Case {
  82  |   const testCase = casesById.get(id);
  83  |   if (!testCase) throw new Error(`Missing FR-13 test data for ${id}.`);
  84  |   return testCase;
  85  | }
  86  | 
  87  | function datasetFor(testCase: Fr13Case): DashboardOrder[] {
  88  |   if (!testCase.datasetRef) return [];
  89  |   const dataset = dataFile.datasets[testCase.datasetRef];
  90  |   if (!dataset) throw new Error(`Missing FR-13 dataset: ${testCase.datasetRef}.`);
  91  |   return dataset;
  92  | }
  93  | 
  94  | function deliveredRevenue(orders: DashboardOrder[]): number {
  95  |   return orders
  96  |     .filter((order) => order.status === 'delivered')
  97  |     .reduce((sum, order) => sum + order.total_amount, 0);
  98  | }
  99  | 
  100 | function numericText(text: string): number {
  101 |   const digits = text.replace(/[^\d-]/g, '');
  102 |   return digits ? Number(digits) : Number.NaN;
  103 | }
  104 | 
  105 | async function expectMoney(locator: Locator, expected: number, currency = '₫'): Promise<void> {
  106 |   await expect(locator).toContainText(currency);
  107 |   await expect
  108 |     .poll(() => locator.innerText().then(numericText), {
  109 |       message: `money value should settle at ${expected} ${currency}`,
  110 |     })
> 111 |     .toBe(expected);
      |      ^ Error: money value should settle at 350000 ₫
  112 | }
  113 | 
  114 | async function expectGroupedMoney(
  115 |   locator: Locator,
  116 |   expected: number,
  117 |   currency = '₫',
  118 | ): Promise<void> {
  119 |   await expectMoney(locator, expected, currency);
  120 |   const amountText = (await locator.innerText()).replace(currency, '').trim();
  121 |   expect(amountText).toMatch(/^\d{1,3}(?:[.,\s\u00a0\u202f]\d{3})+$/);
  122 | }
  123 | 
  124 | function orderProjection(orders: DashboardOrder[]): DashboardOrder[] {
  125 |   return orders
  126 |     .map(({ id, total_amount, status }) => ({ id, total_amount, status }))
  127 |     .sort((left, right) => left.id - right.id);
  128 | }
  129 | 
  130 | function expectCompleteOrderFixture(
  131 |   actual: DashboardOrder[],
  132 |   expected: DashboardOrder[],
  133 | ): void {
  134 |   expect(orderProjection(actual)).toEqual(orderProjection(expected));
  135 | }
  136 | 
  137 | function expectNoAdminOrderData(body: unknown): void {
  138 |   expect(Array.isArray(body)).toBe(false);
  139 |   if (body && typeof body === 'object') {
  140 |     expect(Array.isArray((body as Record<string, unknown>).orders)).toBe(false);
  141 |   }
  142 | }
  143 | 
  144 | class DashboardPage {
  145 |   readonly dashboardHeading: Locator;
  146 |   readonly revenueHeading: Locator;
  147 |   readonly orderCountHeading: Locator;
  148 | 
  149 |   constructor(readonly page: Page) {
  150 |     this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard', exact: true });
  151 |     this.revenueHeading = page.getByRole('heading', {
  152 |       name: 'Tổng doanh thu (Delivered)',
  153 |       exact: true,
  154 |     });
  155 |     this.orderCountHeading = page.getByRole('heading', {
  156 |       name: 'Tổng số đơn hàng',
  157 |       exact: true,
  158 |     });
  159 |   }
  160 | 
  161 |   // The current SUT exposes no test id or ARIA relationship for metric values.
  162 |   // Scope the fallback to the value paragraph in the semantic heading's card.
  163 |   revenueValue(): Locator {
  164 |     return this.revenueHeading.locator('..').locator('p');
  165 |   }
  166 | 
  167 |   orderCountValue(): Locator {
  168 |     return this.orderCountHeading.locator('..').locator('p');
  169 |   }
  170 | }
  171 | 
  172 | async function mockAdminApi(page: Page, orders: DashboardOrder[]): Promise<void> {
  173 |   await page.route('**/api/**', async (route) => {
  174 |     const request = route.request();
  175 |     const pathname = new URL(request.url()).pathname;
  176 | 
  177 |     if (request.method() === 'GET' && pathname === '/api/admin/orders') {
  178 |       await route.fulfill({
  179 |         status: 200,
  180 |         contentType: 'application/json',
  181 |         body: JSON.stringify(orders),
  182 |       });
  183 |       return;
  184 |     }
  185 | 
  186 |     if (
  187 |       request.method() === 'GET' &&
  188 |       ['/api/admin/users', '/api/products', '/api/categories', '/api/coupons'].includes(pathname)
  189 |     ) {
  190 |       await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
  191 |       return;
  192 |     }
  193 | 
  194 |     await route.fulfill({
  195 |       status: 404,
  196 |       contentType: 'application/json',
  197 |       body: JSON.stringify({ error: `Unexpected FR-13 UI request: ${request.method()} ${pathname}` }),
  198 |     });
  199 |   });
  200 | }
  201 | 
  202 | async function openDashboardWithDataset(
  203 |   page: Page,
  204 |   orders: DashboardOrder[],
  205 | ): Promise<DashboardOrder[]> {
  206 |   await mockAdminApi(page, orders);
  207 |   await page.addInitScript(() => localStorage.setItem('adminToken', 'fr13-controlled-ui-token'));
  208 | 
  209 |   const ordersResponsePromise = page.waitForResponse(
  210 |     (response) =>
  211 |       response.request().method() === 'GET' &&
```