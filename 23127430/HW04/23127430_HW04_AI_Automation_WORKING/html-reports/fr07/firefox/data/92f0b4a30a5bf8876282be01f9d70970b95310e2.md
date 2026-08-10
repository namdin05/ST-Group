# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr07-shopping-cart.spec.ts >> FR-07 – Shopping Cart >> UI cases >> TC005 – minus control cannot reduce quantity below one
- Location: tests\fr07-shopping-cart.spec.ts:299:9

# Error details

```
Error: Each cart row requires a minus control

expect(locator).toBeVisible() failed

Locator: getByRole('table').getByRole('row').filter({ hasText: 'Laptop Gaming Pro' }).getByRole('button', { name: '-', exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Each cart row requires a minus control with timeout 5000ms
  - waiting for getByRole('table').getByRole('row').filter({ hasText: 'Laptop Gaming Pro' }).getByRole('button', { name: '-', exact: true })

```

```yaml
- banner:
  - link "EShop":
    - /url: /
  - navigation:
    - link "Giỏ hàng":
      - /url: /cart
    - link "Đăng nhập":
      - /url: /login
    - link "Đăng ký":
      - /url: /register
- main:
  - heading "Giỏ Hàng" [level=2]
  - table:
    - rowgroup:
      - row "Sản phẩm Giá Số lượng Thành tiền Thao tác":
        - columnheader "Sản phẩm"
        - columnheader "Giá"
        - columnheader "Số lượng"
        - columnheader "Thành tiền"
        - columnheader "Thao tác"
    - rowgroup:
      - row "Laptop Gaming Pro 100,000 ₫ 1 100,000 ₫ Xóa":
        - cell "Laptop Gaming Pro"
        - cell "100,000 ₫"
        - cell "1"
        - cell "100,000 ₫"
        - cell "Xóa":
          - button "Xóa"
  - text: "Tổng tạm tính: 100,000 ₫"
  - link "← Mua tiếp":
    - /url: /
  - button "Tiến hành thanh toán"
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  207 |   return { token: loginBody.token as string, email: auth.email };
  208 | }
  209 | 
  210 | async function sendApiRequest(
  211 |   request: APIRequestContext,
  212 |   requestData: ApiRequestData,
  213 |   token?: string,
  214 | ) {
  215 |   return request.fetch(`${dataFile.urls.apiBase}${requestData.path}`, {
  216 |     method: requestData.method,
  217 |     data: requestData.body,
  218 |     headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  219 |   });
  220 | }
  221 | 
  222 | test.describe('FR-07 – Shopping Cart', () => {
  223 |   test.describe('UI cases', () => {
  224 |     test.beforeEach(async ({ page }, testInfo) => {
  225 |       await mockReviewedProducts(page);
  226 |       testInfo.annotations.push({
  227 |         type: 'fixture-assumption',
  228 |         description: 'UI product API is controlled by the human-reviewed FR-07 JSON fixture.',
  229 |       });
  230 |     });
  231 | 
  232 |     test('TC001 – non-empty cart displays all required columns', async ({ page }) => {
  233 |       const testCase = caseById('TC001');
  234 |       await seedCart(page, testCase.cart ?? []);
  235 |       const cart = new CartPage(page);
  236 |       await cart.goto();
  237 | 
  238 |       await expect(cart.table).toBeVisible();
  239 |       for (const label of testCase.expected.columnLabels as string[]) {
  240 |         await expect.soft(
  241 |           cart.table.getByRole('columnheader', { name: label, exact: true }),
  242 |           `Required FR-07 column should be named “${label}”`,
  243 |         ).toBeVisible();
  244 |       }
  245 |       await expect(cart.itemRows).toHaveCount(1);
  246 |     });
  247 | 
  248 |     test('TC002 – empty cart shows message, illustration, and shopping link', async ({ page }) => {
  249 |       const testCase = caseById('TC002');
  250 |       const cart = new CartPage(page);
  251 |       await cart.goto();
  252 | 
  253 |       await expect(cart.emptyHeading).toHaveText(String(testCase.expected.message));
  254 |       expect(
  255 |         await cart.main.locator('img, svg, [role="img"]').count(),
  256 |         'Empty state should include a semantic illustration',
  257 |       ).toBeGreaterThan(0);
  258 |       const continueLink = page.getByRole('link', { name: 'Tiếp tục mua sắm', exact: true });
  259 |       await expect(continueLink).toHaveAttribute('href', String(testCase.expected.continuePath));
  260 |     });
  261 | 
  262 |     test('TC003 – adding the same product twice merges into one line', async ({ page }) => {
  263 |       const testCase = caseById('TC003');
  264 |       for (const action of testCase.actions ?? []) {
  265 |         await addProductWithQuantity(
  266 |           page,
  267 |           productByRef(action.productRef),
  268 |           action.quantity,
  269 |         );
  270 |       }
  271 |       const cart = new CartPage(page);
  272 |       await cart.goto();
  273 | 
  274 |       const product = productByRef((testCase.actions ?? [])[0].productRef);
  275 |       await expect(cart.itemRows).toHaveCount(Number(testCase.expected.lineCount));
  276 |       await expect(cart.rowFor(product.name)).toHaveCount(1);
  277 |       await expect(cart.quantityCell(product.name)).toHaveText(String(testCase.expected.quantity));
  278 |     });
  279 | 
  280 |     test('TC004 – plus control increments quantity and totals', async ({ page }) => {
  281 |       const testCase = caseById('TC004');
  282 |       await seedCart(page, testCase.cart ?? []);
  283 |       const cart = new CartPage(page);
  284 |       await cart.goto();
  285 |       const product = productByRef((testCase.cart ?? [])[0].productRef);
  286 |       const plusButton = cart.rowFor(product.name).getByRole('button', { name: '+', exact: true });
  287 | 
  288 |       await expect.soft(plusButton, 'Each cart row requires a plus control').toBeVisible();
  289 |       if ((await plusButton.count()) > 0) await plusButton.click();
  290 | 
  291 |       await expect(cart.quantityCell(product.name)).toHaveText(String(testCase.expected.quantity));
  292 |       await expectNumericMoney(cart.lineTotalCell(product.name), Number(testCase.expected.lineTotal));
  293 |       await expectNumericMoney(
  294 |         cart.main.getByText(/₫$/, { exact: true }).last(),
  295 |         Number(testCase.expected.grandTotal),
  296 |       );
  297 |     });
  298 | 
  299 |     test('TC005 – minus control cannot reduce quantity below one', async ({ page }) => {
  300 |       const testCase = caseById('TC005');
  301 |       await seedCart(page, testCase.cart ?? []);
  302 |       const cart = new CartPage(page);
  303 |       await cart.goto();
  304 |       const product = productByRef((testCase.cart ?? [])[0].productRef);
  305 |       const minusButton = cart.rowFor(product.name).getByRole('button', { name: '-', exact: true });
  306 | 
> 307 |       await expect.soft(minusButton, 'Each cart row requires a minus control').toBeVisible();
      |                                                                                ^ Error: Each cart row requires a minus control
  308 |       if ((await minusButton.count()) > 0 && (await minusButton.isEnabled())) {
  309 |         await minusButton.click();
  310 |       }
  311 |       await expect(cart.quantityCell(product.name)).toHaveText(
  312 |         String(testCase.expected.minimumQuantity),
  313 |       );
  314 |     });
  315 | 
  316 |     test('TC006 – line total equals price multiplied by quantity', async ({ page }) => {
  317 |       const testCase = caseById('TC006');
  318 |       await seedCart(page, testCase.cart ?? []);
  319 |       const cart = new CartPage(page);
  320 |       await cart.goto();
  321 |       const product = productByRef((testCase.cart ?? [])[0].productRef);
  322 | 
  323 |       await expectNumericMoney(cart.lineTotalCell(product.name), Number(testCase.expected.lineTotal));
  324 |     });
  325 | 
  326 |     test('TC007 – grand total sums all line totals and uses the exact label', async ({ page }) => {
  327 |       const testCase = caseById('TC007');
  328 |       await seedCart(page, testCase.cart ?? []);
  329 |       const cart = new CartPage(page);
  330 |       await cart.goto();
  331 | 
  332 |       await expect.soft(
  333 |         cart.main.getByText(new RegExp(`^${String(testCase.expected.totalLabel)}:`)),
  334 |         'Grand-total label must match FR-07 exactly',
  335 |       ).toBeVisible();
  336 |       const displayedGrandTotal = cart.main.getByText(
  337 |         `${Number(testCase.expected.grandTotal).toLocaleString('en-US')} ₫`,
  338 |         { exact: true },
  339 |       );
  340 |       await expect(displayedGrandTotal).toBeVisible();
  341 |     });
  342 | 
  343 |     test('TC008 – canceling the removal dialog keeps the item', async ({ page }) => {
  344 |       const testCase = caseById('TC008');
  345 |       await seedCart(page, testCase.cart ?? []);
  346 |       const cart = new CartPage(page);
  347 |       await cart.goto();
  348 |       const product = productByRef((testCase.cart ?? [])[0].productRef);
  349 |       let confirmationVisible = false;
  350 |       page.once('dialog', async (dialog) => {
  351 |         confirmationVisible = true;
  352 |         expect.soft(dialog.type()).toBe('confirm');
  353 |         await dialog.dismiss();
  354 |       });
  355 | 
  356 |       await cart.removeButton(product.name).click();
  357 | 
  358 |       expect.soft(confirmationVisible, 'Removing an item must open a confirmation dialog').toBe(
  359 |         Boolean(testCase.expected.confirmationVisible),
  360 |       );
  361 |       await expect(cart.itemRows).toHaveCount(Number(testCase.expected.lineCount));
  362 |     });
  363 | 
  364 |     test('TC009 – confirming the removal dialog deletes the item', async ({ page }) => {
  365 |       const testCase = caseById('TC009');
  366 |       await seedCart(page, testCase.cart ?? []);
  367 |       const cart = new CartPage(page);
  368 |       await cart.goto();
  369 |       const product = productByRef((testCase.cart ?? [])[0].productRef);
  370 |       let confirmationVisible = false;
  371 |       page.once('dialog', async (dialog) => {
  372 |         confirmationVisible = true;
  373 |         expect.soft(dialog.type()).toBe('confirm');
  374 |         await dialog.accept();
  375 |       });
  376 | 
  377 |       await cart.removeButton(product.name).click();
  378 | 
  379 |       expect.soft(confirmationVisible, 'Removing an item must open a confirmation dialog').toBe(
  380 |         Boolean(testCase.expected.confirmationVisible),
  381 |       );
  382 |       await expect(cart.itemRows).toHaveCount(Number(testCase.expected.lineCount));
  383 |       await expect(cart.emptyHeading).toBeVisible();
  384 |     });
  385 | 
  386 |     test('TC010 – continue-shopping control returns to the home page', async ({ page }) => {
  387 |       const testCase = caseById('TC010');
  388 |       await seedCart(page, testCase.cart ?? []);
  389 |       const cart = new CartPage(page);
  390 |       await cart.goto();
  391 |       const continueLink = page.getByRole('link', {
  392 |         name: 'Tiếp tục mua sắm',
  393 |         exact: true,
  394 |       });
  395 | 
  396 |       await expect.soft(continueLink, 'Non-empty cart requires the reviewed control label').toBeVisible();
  397 |       if ((await continueLink.count()) > 0) await continueLink.click();
  398 |       await expect(page).toHaveURL(`${dataFile.urls.webBase}${String(testCase.expected.path)}`);
  399 |     });
  400 |   });
  401 | 
  402 |   test.describe('API cases', () => {
  403 |     test('TC011 – authenticated user can retrieve their cart', async ({ request }, testInfo) => {
  404 |       const testCase = caseById('TC011');
  405 |       const { token } = await createAuthenticatedUser(request, testInfo);
  406 |       const response = await sendApiRequest(request, testCase.request as ApiRequestData, token);
  407 | 
```