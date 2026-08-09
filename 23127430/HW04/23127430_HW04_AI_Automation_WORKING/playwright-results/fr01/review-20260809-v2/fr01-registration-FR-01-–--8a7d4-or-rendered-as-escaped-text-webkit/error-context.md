# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr01-registration.spec.ts >> FR-01 – Account Registration >> TC018 – script-like name is rejected or rendered as escaped text
- Location: tests\fr01-registration.spec.ts:371:7

# Error details

```
Error: The name must not become executable markup

expect(locator).toHaveCount(expected) failed

Locator:  locator('header').locator('script')
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - The name must not become executable markup with timeout 5000ms
  - waiting for locator('header').locator('script')
    12 × locator resolved to 1 element
       - unexpected value "1"

```

```
Error: The name should be rendered as escaped text

expect(locator).toContainText(expected) failed

Locator: locator('header')
Expected substring: "<script>alert(1)</script>"
Received string:    "EShopGiỏ hàngChào, Thoát"
Timeout: 5000ms

Call log:
  - The name should be rendered as escaped text with timeout 5000ms
  - waiting for locator('header')
    12 × locator resolved to <header class="bg-blue-600 text-white p-4 flex justify-between items-center">…</header>
       - unexpected value "EShopGiỏ hàngChào, Thoát"

```

```yaml
- banner:
  - link "EShop":
    - /url: /
  - navigation:
    - link "Giỏ hàng":
      - /url: /cart
    - link "Chào,":
      - /url: /profile
    - button "Thoát"
```

# Test source

```ts
  297 |       const testCase = caseById('TC010');
  298 |       const { body, response } = await postRegister(request, testCase, runId(testInfo));
  299 |       await expectFourXx(response.status(), testCase.id);
  300 |       await expectCannotLogin(request, String(body.email), String(body.password), testCase.id);
  301 |     });
  302 | 
  303 |     test('TC011 – missing email is rejected', async ({ request }, testInfo) => {
  304 |       const testCase = caseById('TC011');
  305 |       const { response } = await postRegister(request, testCase, runId(testInfo));
  306 |       await expectFourXx(response.status(), testCase.id);
  307 |     });
  308 | 
  309 |     test('TC012 – missing password is rejected', async ({ request }, testInfo) => {
  310 |       const testCase = caseById('TC012');
  311 |       const { response } = await postRegister(request, testCase, runId(testInfo));
  312 |       await expectFourXx(response.status(), testCase.id);
  313 |     });
  314 | 
  315 |     test('TC013 – invalid email format is rejected and creates no account', async ({ request }, testInfo) => {
  316 |       const testCase = caseById('TC013');
  317 |       const { body, response } = await postRegister(request, testCase, runId(testInfo));
  318 |       await expectFourXx(response.status(), testCase.id);
  319 |       await expectCannotLogin(request, String(body.email), String(body.password), testCase.id);
  320 |     });
  321 | 
  322 |     test('TC014 – seven-character password is rejected and creates no account', async ({ request }, testInfo) => {
  323 |       const testCase = caseById('TC014');
  324 |       const { body, response } = await postRegister(request, testCase, runId(testInfo));
  325 |       await expectFourXx(response.status(), testCase.id);
  326 |       await expectCannotLogin(request, String(body.email), String(body.password), testCase.id);
  327 |     });
  328 | 
  329 |     test('TC015 – valid eight-character password is accepted', async ({ request }, testInfo) => {
  330 |       const testCase = caseById('TC015');
  331 |       const { response } = await postRegister(request, testCase, runId(testInfo));
  332 |       expect(response.status()).toBe(Number(testCase.expected.status));
  333 |       const responseBody = await response.json();
  334 |       for (const key of testCase.expected.bodyIncludes as string[]) {
  335 |         expect(responseBody).toHaveProperty(key);
  336 |       }
  337 |     });
  338 | 
  339 |     test('TC016 – duplicate email is rejected without overwriting the account', async ({ request }, testInfo) => {
  340 |       const testCase = caseById('TC016');
  341 |       const id = runId(testInfo);
  342 |       const existingUser = resolveTemplates(dataFile.fixtures.existingUser, id);
  343 |       const seedResponse = await request.post(`${dataFile.urls.apiBase}/api/register`, {
  344 |         data: existingUser,
  345 |       });
  346 |       expect(seedResponse.status()).toBe(200);
  347 | 
  348 |       const { response } = await postRegister(request, testCase, id);
  349 |       await expectFourXx(response.status(), testCase.id);
  350 | 
  351 |       const originalLogin = await request.post(`${dataFile.urls.apiBase}/api/login`, {
  352 |         data: { email: existingUser.email, password: existingUser.password },
  353 |       });
  354 |       expect.soft(originalLogin.status(), 'The original account must remain usable').toBe(200);
  355 |     });
  356 | 
  357 |     test('TC017 – registration cannot self-assign the admin role', async ({ request }, testInfo) => {
  358 |       const testCase = caseById('TC017');
  359 |       const { body, response } = await postRegister(request, testCase, runId(testInfo));
  360 |       expect(testCase.expected.allowedStatus as number[]).toContain(response.status());
  361 | 
  362 |       const loginResponse = await request.post(`${dataFile.urls.apiBase}/api/login`, {
  363 |         data: { email: body.email, password: body.password },
  364 |       });
  365 |       expect(loginResponse.status()).toBe(200);
  366 |       const loginBody = await loginResponse.json();
  367 |       expect(loginBody.user.role).toBe(testCase.expected.createdRole);
  368 |     });
  369 |   });
  370 | 
  371 |   test('TC018 – script-like name is rejected or rendered as escaped text', async ({ page, request }, testInfo) => {
  372 |     const testCase = caseById('TC018');
  373 |     const input = resolveTemplates(testCase.data as RegistrationInput, runId(testInfo));
  374 |     const registerResponse = await request.post(`${dataFile.urls.apiBase}/api/register`, {
  375 |       data: { name: input.name, email: input.email, password: input.password },
  376 |     });
  377 |     expect([200, 201]).toContain(registerResponse.status());
  378 | 
  379 |     let dialogCount = 0;
  380 |     page.on('dialog', async (dialog) => {
  381 |       dialogCount += 1;
  382 |       await dialog.dismiss();
  383 |     });
  384 | 
  385 |     await page.goto(`${dataFile.urls.webBase}/login`);
  386 |     const loginForm = page.locator('form').filter({
  387 |       has: page.getByRole('button', { name: 'Sign In', exact: true }),
  388 |     });
  389 |     await loginForm.getByLabel('Username', { exact: true }).fill(input.email);
  390 |     await loginForm.getByLabel('Mật khẩu', { exact: true }).fill(input.password);
  391 |     await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  392 |     await expect(page).toHaveURL(`${dataFile.urls.webBase}/`);
  393 | 
  394 |     const header = page.locator('header');
  395 |     expect.soft(dialogCount, 'Injected input must not execute a script dialog').toBe(0);
  396 |     await expect.soft(header.locator('script'), 'The name must not become executable markup').toHaveCount(0);
> 397 |     await expect.soft(header, 'The name should be rendered as escaped text').toContainText(input.name);
      |                                                                              ^ Error: The name should be rendered as escaped text
  398 |   });
  399 | });
  400 | 
```