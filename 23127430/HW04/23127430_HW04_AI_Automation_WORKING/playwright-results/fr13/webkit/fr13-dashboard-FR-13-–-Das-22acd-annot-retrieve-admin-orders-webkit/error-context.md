# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr13-dashboard.spec.ts >> FR-13 – Dashboard >> API cases >> TC012 – normal user token cannot retrieve admin orders
- Location: tests\fr13-dashboard.spec.ts:557:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 403
Received: 200
```

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```

# Test source

```ts
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
  111 |     .toBe(expected);
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
> 138 |   expect(Array.isArray(body)).toBe(false);
      |                               ^ Error: expect(received).toBe(expected) // Object.is equality
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
  212 |       new URL(response.url()).pathname === '/api/admin/orders' &&
  213 |       response.status() === 200,
  214 |   );
  215 |   await page.goto(dataFile.urls.adminBase);
  216 |   const ordersResponse = await ordersResponsePromise;
  217 |   return (await ordersResponse.json()) as DashboardOrder[];
  218 | }
  219 | 
  220 | async function reservePort(): Promise<number> {
  221 |   const server = createServer();
  222 |   await new Promise<void>((resolve, reject) => {
  223 |     server.once('error', reject);
  224 |     server.listen(0, '127.0.0.1', resolve);
  225 |   });
  226 |   const address = server.address();
  227 |   if (!address || typeof address === 'string') {
  228 |     server.close();
  229 |     throw new Error('Could not reserve a local port for the isolated FR-13 backend.');
  230 |   }
  231 |   const port = address.port;
  232 |   await new Promise<void>((resolve, reject) =>
  233 |     server.close((error?: Error) => (error ? reject(error) : resolve())),
  234 |   );
  235 |   return port;
  236 | }
  237 | 
  238 | function isolatedOrderSeed(orders: DashboardOrder[]): string {
```