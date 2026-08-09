# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr01-registration.spec.ts >> FR-01 – Account Registration >> API cases >> TC013 – invalid email format is rejected and creates no account
- Location: tests\fr01-registration.spec.ts:315:9

# Error details

```
Error: TC013 should return a client error

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 400
Received:    200
```

```
Error: TC013 must not create a login-capable account

expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 200
```

# Test source

```ts
  59  | function runId(testInfo: TestInfo): string {
  60  |   return [
  61  |     testInfo.project.name,
  62  |     testInfo.workerIndex,
  63  |     testInfo.retry,
  64  |     testInfo.title.replace(/[^a-zA-Z0-9]+/g, '-'),
  65  |     Date.now(),
  66  |   ]
  67  |     .join('-')
  68  |     .toLowerCase();
  69  | }
  70  | 
  71  | function resolveTemplates<T>(value: T, id: string): T {
  72  |   return JSON.parse(JSON.stringify(value).replaceAll('{{runId}}', id)) as T;
  73  | }
  74  | 
  75  | class RegistrationPage {
  76  |   readonly form;
  77  |   readonly heading;
  78  |   readonly nameInput;
  79  |   readonly emailInput;
  80  |   readonly passwordInput;
  81  |   readonly confirmPasswordInput;
  82  |   readonly submitButton;
  83  | 
  84  |   constructor(readonly page: Page) {
  85  |     this.submitButton = page.getByRole('button', { name: 'Đăng Ký', exact: true });
  86  |     this.form = page.locator('form').filter({ has: this.submitButton });
  87  |     this.heading = page.getByRole('heading', {
  88  |       name: 'Đăng Ký Tài Khoản',
  89  |       exact: true,
  90  |     });
  91  | 
  92  |     // The rendered SUT inputs have no accessible name/id/placeholder. Keep the
  93  |     // fallback scoped to the registration form and document it for human review.
  94  |     const textInputs = this.form.locator('input[type="text"]');
  95  |     const passwordInputs = this.form.locator('input[type="password"]');
  96  |     this.nameInput = textInputs.nth(0);
  97  |     this.emailInput = textInputs.nth(1);
  98  |     this.passwordInput = passwordInputs.nth(0);
  99  |     this.confirmPasswordInput = passwordInputs.nth(1);
  100 |   }
  101 | 
  102 |   async goto(): Promise<void> {
  103 |     await this.page.goto(`${dataFile.urls.webBase}/register`);
  104 |     await expect(this.heading).toBeVisible();
  105 |     await expect(this.submitButton).toBeEnabled();
  106 |   }
  107 | 
  108 |   async fill(input: RegistrationInput, requireConfirm = false): Promise<void> {
  109 |     await this.nameInput.fill(input.name);
  110 |     await this.emailInput.fill(input.email);
  111 |     await this.passwordInput.fill(input.password);
  112 | 
  113 |     if (requireConfirm) {
  114 |       await expect.soft(
  115 |         this.confirmPasswordInput,
  116 |         'FR-01 requires a visible confirm-password field',
  117 |       ).toBeVisible();
  118 |     }
  119 | 
  120 |     if ((await this.confirmPasswordInput.count()) > 0 && input.confirmPassword !== undefined) {
  121 |       await this.confirmPasswordInput.fill(input.confirmPassword);
  122 |     }
  123 |   }
  124 | 
  125 |   async submit(): Promise<void> {
  126 |     await this.submitButton.click();
  127 |   }
  128 | }
  129 | 
  130 | async function postRegister(
  131 |   request: APIRequestContext,
  132 |   testCase: RegistrationCase,
  133 |   id: string,
  134 | ) {
  135 |   if (!testCase.request) throw new Error(`${testCase.id} has no API request data.`);
  136 |   const body = resolveTemplates(testCase.request.body, id);
  137 |   return {
  138 |     body,
  139 |     response: await request.post(`${dataFile.urls.apiBase}${testCase.request.path}`, {
  140 |       data: body,
  141 |     }),
  142 |   };
  143 | }
  144 | 
  145 | async function expectFourXx(responseStatus: number, testCaseId: string): Promise<void> {
  146 |   expect.soft(responseStatus, `${testCaseId} should return a client error`).toBeGreaterThanOrEqual(400);
  147 |   expect.soft(responseStatus, `${testCaseId} should return a client error`).toBeLessThan(500);
  148 | }
  149 | 
  150 | async function expectCannotLogin(
  151 |   request: APIRequestContext,
  152 |   email: string,
  153 |   password: string,
  154 |   testCaseId: string,
  155 | ): Promise<void> {
  156 |   const loginResponse = await request.post(`${dataFile.urls.apiBase}/api/login`, {
  157 |     data: { email, password },
  158 |   });
> 159 |   expect.soft(loginResponse.status(), `${testCaseId} must not create a login-capable account`).toBe(401);
      |                                                                                                ^ Error: TC013 must not create a login-capable account
  160 | }
  161 | 
  162 | test.describe('FR-01 – Account Registration', () => {
  163 |   test.describe('UI cases', () => {
  164 |     test.beforeEach(async ({ page }) => {
  165 |       await new RegistrationPage(page).goto();
  166 |     });
  167 | 
  168 |     test('TC001 – valid registration redirects to login', async ({ page }, testInfo) => {
  169 |       const testCase = caseById('TC001');
  170 |       const input = resolveTemplates(testCase.data as RegistrationInput, runId(testInfo));
  171 |       const registration = new RegistrationPage(page);
  172 | 
  173 |       await registration.fill(input, true);
  174 |       await registration.submit();
  175 | 
  176 |       await expect(page).toHaveURL(`${dataFile.urls.webBase}${String(testCase.expected.path)}`);
  177 |     });
  178 | 
  179 |     test('TC002 – empty name is rejected by required-field validation', async ({ page }, testInfo) => {
  180 |       const testCase = caseById('TC002');
  181 |       const input = resolveTemplates(testCase.data as RegistrationInput, runId(testInfo));
  182 |       const registration = new RegistrationPage(page);
  183 | 
  184 |       await registration.fill(input);
  185 |       await registration.submit();
  186 | 
  187 |       expect(await registration.nameInput.evaluate((element: HTMLInputElement) => element.validity.valueMissing)).toBe(true);
  188 |       await expect(page).toHaveURL(/\/register\/?$/);
  189 |     });
  190 | 
  191 |     test('TC003 – invalid email format is rejected', async ({ page }, testInfo) => {
  192 |       const testCase = caseById('TC003');
  193 |       const input = resolveTemplates(testCase.data as RegistrationInput, runId(testInfo));
  194 |       const registration = new RegistrationPage(page);
  195 | 
  196 |       await registration.fill(input);
  197 |       await expect.soft(registration.emailInput, 'Email should use native email semantics').toHaveAttribute('type', 'email');
  198 |       await registration.submit();
  199 | 
  200 |       await expect(page.getByText(/email.*(?:không hợp lệ|invalid)|(?:không hợp lệ|invalid).*email/i)).toBeVisible();
  201 |       await expect(page).toHaveURL(/\/register\/?$/);
  202 |     });
  203 | 
  204 |     test('TC004 – seven-character password is rejected', async ({ page }, testInfo) => {
  205 |       const testCase = caseById('TC004');
  206 |       const input = resolveTemplates(testCase.data as RegistrationInput, runId(testInfo));
  207 |       const registration = new RegistrationPage(page);
  208 | 
  209 |       await registration.fill(input);
  210 |       await registration.submit();
  211 | 
  212 |       await expect(page.getByText(/Mật khẩu quá yếu/i)).toBeVisible();
  213 |       await expect(page).toHaveURL(/\/register\/?$/);
  214 |     });
  215 | 
  216 |     test('TC005 – valid eight-character password is accepted', async ({ page }, testInfo) => {
  217 |       const testCase = caseById('TC005');
  218 |       const input = resolveTemplates(testCase.data as RegistrationInput, runId(testInfo));
  219 |       const registration = new RegistrationPage(page);
  220 | 
  221 |       await registration.fill(input, true);
  222 |       await registration.submit();
  223 | 
  224 |       await expect(page).toHaveURL(`${dataFile.urls.webBase}${String(testCase.expected.path)}`);
  225 |     });
  226 | 
  227 |     test('TC006 – password without a special character is rejected', async ({ page }, testInfo) => {
  228 |       const testCase = caseById('TC006');
  229 |       const input = resolveTemplates(testCase.data as RegistrationInput, runId(testInfo));
  230 |       const registration = new RegistrationPage(page);
  231 | 
  232 |       await registration.fill(input);
  233 |       await registration.submit();
  234 | 
  235 |       await expect(page.getByText(/Mật khẩu quá yếu/i)).toBeVisible();
  236 |       await expect(page).toHaveURL(/\/register\/?$/);
  237 |     });
  238 | 
  239 |     test('TC007 – duplicate email is rejected in the UI flow', async ({ page, request }, testInfo) => {
  240 |       const testCase = caseById('TC007');
  241 |       const id = runId(testInfo);
  242 |       const existingUser = resolveTemplates(dataFile.fixtures.existingUser, id);
  243 |       const seedResponse = await request.post(`${dataFile.urls.apiBase}/api/register`, {
  244 |         data: existingUser,
  245 |       });
  246 |       expect(seedResponse.status()).toBe(200);
  247 | 
  248 |       const input = resolveTemplates(testCase.data as RegistrationInput, id);
  249 |       const registration = new RegistrationPage(page);
  250 |       await registration.fill(input);
  251 |       await registration.submit();
  252 | 
  253 |       await expect(page.getByText(/email.*(?:tồn tại|đã đăng ký|duplicate|unique)|(?:tồn tại|đã đăng ký|duplicate|unique).*email/i)).toBeVisible();
  254 |       await expect(page).toHaveURL(/\/register\/?$/);
  255 |     });
  256 | 
  257 |     test('TC008 – unusually long input does not crash the registration page', async ({ page }, testInfo) => {
  258 |       const testCase = caseById('TC008');
  259 |       const generator = resolveTemplates(testCase.data as GeneratorInput, runId(testInfo));
```