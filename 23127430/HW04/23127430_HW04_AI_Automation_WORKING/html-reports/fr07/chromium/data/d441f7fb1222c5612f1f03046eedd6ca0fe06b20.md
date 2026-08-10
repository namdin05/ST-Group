# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr07-shopping-cart.spec.ts >> FR-07 – Shopping Cart >> API cases >> TC014 – API rejects non-positive quantity without changing the cart
- Location: tests\fr07-shopping-cart.spec.ts:442:9

# Error details

```
Error: Non-positive quantity should return a client error

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 400
Received:    200
```

```
Error: Non-positive quantity should return a client error

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 400
Received:    200
```

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 14

- Array []
+ Array [
+   Object {
+     "id": 1,
+     "name": "Laptop Gaming Pro",
+     "price": 100000,
+     "quantity": 0,
+   },
+   Object {
+     "id": 1,
+     "name": "Laptop Gaming Pro",
+     "price": 100000,
+     "quantity": -1,
+   },
+ ]
```

# Test source

```ts
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
> 460 |       expect(await finalResponse.json()).toEqual(initialCart);
      |                                          ^ Error: expect(received).toEqual(expected) // deep equality
  461 |     });
  462 |   });
  463 | });
  464 | 
```