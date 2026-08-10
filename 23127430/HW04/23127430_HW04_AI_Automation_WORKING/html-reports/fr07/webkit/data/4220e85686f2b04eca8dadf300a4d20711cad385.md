# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr07-shopping-cart.spec.ts >> FR-07 – Shopping Cart >> UI cases >> TC009 – confirming the removal dialog deletes the item
- Location: tests\fr07-shopping-cart.spec.ts:364:9

# Error details

```
Error: Removing an item must open a confirmation dialog

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - link "EShop" [ref=e5]:
      - /url: /
    - navigation [ref=e6]:
      - link "Giỏ hàng" [ref=e7]:
        - /url: /cart
      - link "Đăng nhập" [ref=e8]:
        - /url: /login
      - link "Đăng ký" [ref=e9]:
        - /url: /register
  - main [ref=e10]:
    - generic [ref=e11]:
      - heading "Giỏ hàng của bạn đang trống" [level=2] [ref=e12]
      - link "Tiếp tục mua sắm" [ref=e13]:
        - /url: /
  - contentinfo [ref=e14]: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
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
  307 |       await expect.soft(minusButton, 'Each cart row requires a minus control').toBeVisible();
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
> 379 |       expect.soft(confirmationVisible, 'Removing an item must open a confirmation dialog').toBe(
      |                                                                                            ^ Error: Removing an item must open a confirmation dialog
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
  408 |       expect(response.status()).toBe(Number(testCase.expected.status));
  409 |       const body = await response.json();
  410 |       expect(Array.isArray(body)).toBe(true);
  411 |     });
  412 | 
  413 |     test('TC012 – API merges duplicate product posts into one line', async ({ request }, testInfo) => {
  414 |       const testCase = caseById('TC012');
  415 |       const { token } = await createAuthenticatedUser(request, testInfo);
  416 |       for (const requestData of testCase.requests ?? []) {
  417 |         const response = await sendApiRequest(request, requestData, token);
  418 |         expect(response.status()).toBe(200);
  419 |       }
  420 | 
  421 |       const getResponse = await request.get(`${dataFile.urls.apiBase}/api/cart`, {
  422 |         headers: { Authorization: `Bearer ${token}` },
  423 |       });
  424 |       expect(getResponse.status()).toBe(200);
  425 |       const cart = await getResponse.json();
  426 |       expect(cart).toHaveLength(Number(testCase.expected.lineCount));
  427 |       expect(cart[0]).toMatchObject({
  428 |         id: testCase.expected.productId,
  429 |         quantity: testCase.expected.quantity,
  430 |       });
  431 |     });
  432 | 
  433 |     test('TC013 – unauthenticated client cannot retrieve a cart', async ({ request }) => {
  434 |       const testCase = caseById('TC013');
  435 |       const response = await sendApiRequest(request, testCase.request as ApiRequestData);
  436 | 
  437 |       expect(response.status()).toBe(Number(testCase.expected.status));
  438 |       const body = await response.json();
  439 |       expect(Array.isArray(body), 'Unauthorized response must not expose cart data').toBe(false);
  440 |     });
  441 | 
  442 |     test('TC014 – API rejects non-positive quantity without changing the cart', async ({
  443 |       request,
  444 |     }, testInfo) => {
  445 |       const testCase = caseById('TC014');
  446 |       const { token } = await createAuthenticatedUser(request, testInfo);
  447 |       const headers = { Authorization: `Bearer ${token}` };
  448 |       const initialResponse = await request.get(`${dataFile.urls.apiBase}/api/cart`, { headers });
  449 |       expect(initialResponse.status()).toBe(200);
  450 |       const initialCart = await initialResponse.json();
  451 | 
  452 |       for (const requestData of testCase.requests ?? []) {
  453 |         const response = await sendApiRequest(request, requestData, token);
  454 |         expect.soft(response.status(), 'Non-positive quantity should return a client error').toBeGreaterThanOrEqual(400);
  455 |         expect.soft(response.status(), 'Non-positive quantity should return a client error').toBeLessThan(500);
  456 |       }
  457 | 
  458 |       const finalResponse = await request.get(`${dataFile.urls.apiBase}/api/cart`, { headers });
  459 |       expect(finalResponse.status()).toBe(200);
  460 |       expect(await finalResponse.json()).toEqual(initialCart);
  461 |     });
  462 |   });
  463 | });
  464 | 
```