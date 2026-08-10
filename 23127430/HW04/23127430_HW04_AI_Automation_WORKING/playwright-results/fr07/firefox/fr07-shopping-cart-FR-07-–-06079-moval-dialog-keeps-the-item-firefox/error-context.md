# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr07-shopping-cart.spec.ts >> FR-07 – Shopping Cart >> UI cases >> TC008 – canceling the removal dialog keeps the item
- Location: tests\fr07-shopping-cart.spec.ts:343:9

# Error details

```
Error: page.goto: Page crashed
Call log:
  - navigating to "http://localhost:5173/", waiting until "load"

```

# Test source

```ts
  6   |   type Page,
  7   |   type TestInfo,
  8   | } from '@playwright/test';
  9   | import testData from '../test-data/fr07-shopping-cart.json';
  10  | 
  11  | type Product = {
  12  |   id: number;
  13  |   name: string;
  14  |   price: number;
  15  |   description: string;
  16  |   imageUrl: string;
  17  |   category_id: number;
  18  | };
  19  | 
  20  | type CartEntry = { productRef: string; quantity: number };
  21  | type ApiRequestData = {
  22  |   method: string;
  23  |   path: string;
  24  |   body?: Record<string, unknown>;
  25  |   authorization?: null;
  26  | };
  27  | 
  28  | type Fr07Case = {
  29  |   id: string;
  30  |   layer: string;
  31  |   cart?: CartEntry[];
  32  |   actions?: Array<{ type: string; productRef: string; quantity: number }>;
  33  |   action?: Record<string, unknown>;
  34  |   authFixture?: string;
  35  |   request?: ApiRequestData;
  36  |   requests?: ApiRequestData[];
  37  |   expected: Record<string, unknown>;
  38  | };
  39  | 
  40  | type Fr07DataFile = {
  41  |   urls: { webBase: string; apiBase: string };
  42  |   auth: { name: string; email: string; password: string };
  43  |   products: Record<string, Product>;
  44  |   testCases: Fr07Case[];
  45  | };
  46  | 
  47  | const dataFile = testData as unknown as Fr07DataFile;
  48  | const casesById = new Map(dataFile.testCases.map((testCase) => [testCase.id, testCase]));
  49  | 
  50  | if (casesById.size !== dataFile.testCases.length) {
  51  |   throw new Error('FR-07 test data contains duplicate test-case IDs.');
  52  | }
  53  | 
  54  | function caseById(id: string): Fr07Case {
  55  |   const testCase = casesById.get(id);
  56  |   if (!testCase) throw new Error(`Missing FR-07 test data for ${id}.`);
  57  |   return testCase;
  58  | }
  59  | 
  60  | function productByRef(reference: string): Product {
  61  |   const product = dataFile.products[reference];
  62  |   if (!product) throw new Error(`Missing FR-07 product fixture: ${reference}.`);
  63  |   return product;
  64  | }
  65  | 
  66  | function runId(testInfo: TestInfo): string {
  67  |   return [
  68  |     testInfo.project.name,
  69  |     testInfo.workerIndex,
  70  |     testInfo.retry,
  71  |     testInfo.title.replace(/[^a-zA-Z0-9]+/g, '-'),
  72  |     Date.now(),
  73  |   ]
  74  |     .join('-')
  75  |     .toLowerCase();
  76  | }
  77  | 
  78  | function resolveTemplates<T>(value: T, id: string): T {
  79  |   return JSON.parse(JSON.stringify(value).replaceAll('{{runId}}', id)) as T;
  80  | }
  81  | 
  82  | async function mockReviewedProducts(page: Page): Promise<void> {
  83  |   const products = Object.values(dataFile.products);
  84  | 
  85  |   await page.route('**/api/products**', async (route) => {
  86  |     const pathname = new URL(route.request().url()).pathname;
  87  |     const idMatch = pathname.match(/\/api\/products\/(\d+)$/);
  88  |     const body = idMatch
  89  |       ? products.find((product) => product.id === Number(idMatch[1])) ?? {}
  90  |       : products;
  91  | 
  92  |     await route.fulfill({
  93  |       status: 200,
  94  |       contentType: 'application/json',
  95  |       body: JSON.stringify(body),
  96  |     });
  97  |   });
  98  | }
  99  | 
  100 | async function addProductWithQuantity(
  101 |   page: Page,
  102 |   product: Product,
  103 |   quantity: number,
  104 | ): Promise<void> {
  105 |   if (!page.url().startsWith(dataFile.urls.webBase)) {
> 106 |     await page.goto(dataFile.urls.webBase);
      |                ^ Error: page.goto: Page crashed
  107 |   } else if (new URL(page.url()).pathname !== '/') {
  108 |     await page.getByRole('link', { name: 'EShop', exact: true }).click();
  109 |   }
  110 | 
  111 |   const productLink = page.locator(`a[href="/product/${product.id}"]`);
  112 |   await productLink.waitFor({ state: 'visible' });
  113 |   await productLink.click();
  114 |   await expect(page).toHaveURL(`${dataFile.urls.webBase}/product/${product.id}`);
  115 |   await expect(page.getByRole('heading', { name: product.name, exact: true })).toBeVisible();
  116 | 
  117 |   // The real quantity label is not associated with its input. Scope the fallback
  118 |   // to the product page's only number input until the SUT adds htmlFor/id.
  119 |   await page.locator('main input[type="number"]').fill(String(quantity));
  120 |   const addButton = page.getByRole('button', {
  121 |     name: /^(?:Thêm vào giỏ hàng|Đã thêm)$/,
  122 |   });
  123 |   await addButton.click();
  124 | 
  125 |   // Current SUT ignores the first click. This conditional setup preserves the
  126 |   // reviewed cart precondition without adding a hardcoded delay and also works
  127 |   // after that unrelated FR-06 defect is fixed.
  128 |   if ((await addButton.textContent())?.trim() !== 'Đã thêm') {
  129 |     await addButton.click();
  130 |   }
  131 |   await expect(addButton).toHaveText('Đã thêm');
  132 | }
  133 | 
  134 | async function seedCart(page: Page, entries: CartEntry[]): Promise<void> {
  135 |   for (const entry of entries) {
  136 |     await addProductWithQuantity(page, productByRef(entry.productRef), entry.quantity);
  137 |   }
  138 | }
  139 | 
  140 | class CartPage {
  141 |   readonly main: Locator;
  142 |   readonly table: Locator;
  143 |   readonly itemRows: Locator;
  144 |   readonly emptyHeading: Locator;
  145 | 
  146 |   constructor(readonly page: Page) {
  147 |     this.main = page.locator('main');
  148 |     this.table = page.getByRole('table');
  149 |     this.itemRows = this.table.locator('tbody tr');
  150 |     this.emptyHeading = page.getByRole('heading', {
  151 |       name: 'Giỏ hàng của bạn đang trống',
  152 |       exact: true,
  153 |     });
  154 |   }
  155 | 
  156 |   async goto(): Promise<void> {
  157 |     if (!this.page.url().startsWith(dataFile.urls.webBase)) {
  158 |       await this.page.goto(`${dataFile.urls.webBase}/cart`);
  159 |       return;
  160 |     }
  161 | 
  162 |     await this.page.getByRole('link', { name: 'Giỏ hàng', exact: true }).click();
  163 |     await expect(this.page).toHaveURL(`${dataFile.urls.webBase}/cart`);
  164 |   }
  165 | 
  166 |   rowFor(productName: string): Locator {
  167 |     return this.table.getByRole('row').filter({ hasText: productName });
  168 |   }
  169 | 
  170 |   quantityCell(productName: string): Locator {
  171 |     return this.rowFor(productName).getByRole('cell').nth(2);
  172 |   }
  173 | 
  174 |   lineTotalCell(productName: string): Locator {
  175 |     return this.rowFor(productName).getByRole('cell').nth(3);
  176 |   }
  177 | 
  178 |   removeButton(productName: string): Locator {
  179 |     return this.rowFor(productName).getByRole('button', { name: 'Xóa', exact: true });
  180 |   }
  181 | }
  182 | 
  183 | async function expectNumericMoney(locator: Locator, expected: number): Promise<void> {
  184 |   await expect(locator).toContainText('₫');
  185 |   const numericValue = Number((await locator.innerText()).replace(/[^\d-]/g, ''));
  186 |   expect(numericValue).toBe(expected);
  187 | }
  188 | 
  189 | async function createAuthenticatedUser(
  190 |   request: APIRequestContext,
  191 |   testInfo: TestInfo,
  192 | ): Promise<{ token: string; email: string }> {
  193 |   const auth = resolveTemplates(dataFile.auth, runId(testInfo));
  194 |   const registerResponse = await request.post(`${dataFile.urls.apiBase}/api/register`, {
  195 |     data: auth,
  196 |   });
  197 |   expect([200, 201], 'API test precondition: unique user registration').toContain(
  198 |     registerResponse.status(),
  199 |   );
  200 | 
  201 |   const loginResponse = await request.post(`${dataFile.urls.apiBase}/api/login`, {
  202 |     data: { email: auth.email, password: auth.password },
  203 |   });
  204 |   expect(loginResponse.status(), 'API test precondition: unique user login').toBe(200);
  205 |   const loginBody = await loginResponse.json();
  206 |   expect(loginBody.token).toEqual(expect.any(String));
```