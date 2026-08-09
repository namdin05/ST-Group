# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr01-registration.spec.ts >> FR-01 – Account Registration >> UI cases >> TC002 – empty name is rejected by required-field validation
- Location: tests\fr01-registration.spec.ts:179:9

# Error details

```
Test timeout of 15000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: Test timeout of 15000ms exceeded.
Call log:
  - navigating to "http://localhost:5173/register", waiting until "load"

```

# Test source

```ts
  3   |   test,
  4   |   type APIRequestContext,
  5   |   type Page,
  6   |   type TestInfo,
  7   | } from '@playwright/test';
  8   | import testData from '../test-data/fr01-registration.json';
  9   | 
  10  | type RegistrationInput = {
  11  |   name: string;
  12  |   email: string;
  13  |   password: string;
  14  |   confirmPassword?: string;
  15  | };
  16  | 
  17  | type GeneratorInput = {
  18  |   nameGenerator: { character: string; length: number };
  19  |   email: string;
  20  |   passwordGenerator: {
  21  |     prefix: string;
  22  |     character: string;
  23  |     totalLength: number;
  24  |   };
  25  | };
  26  | 
  27  | type RegistrationCase = {
  28  |   id: string;
  29  |   layer: string;
  30  |   fixtureRefs?: string[];
  31  |   data?: RegistrationInput | GeneratorInput;
  32  |   request?: {
  33  |     method: string;
  34  |     path: string;
  35  |     body: Record<string, unknown>;
  36  |   };
  37  |   expected: Record<string, unknown>;
  38  | };
  39  | 
  40  | type RegistrationDataFile = {
  41  |   urls: { webBase: string; apiBase: string };
  42  |   fixtures: Record<string, RegistrationInput & { role: string }>;
  43  |   testCases: RegistrationCase[];
  44  | };
  45  | 
  46  | const dataFile = testData as unknown as RegistrationDataFile;
  47  | const casesById = new Map(dataFile.testCases.map((testCase) => [testCase.id, testCase]));
  48  | 
  49  | if (casesById.size !== dataFile.testCases.length) {
  50  |   throw new Error('FR-01 test data contains duplicate test-case IDs.');
  51  | }
  52  | 
  53  | function caseById(id: string): RegistrationCase {
  54  |   const testCase = casesById.get(id);
  55  |   if (!testCase) throw new Error(`Missing FR-01 test data for ${id}.`);
  56  |   return testCase;
  57  | }
  58  | 
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
> 103 |     await this.page.goto(`${dataFile.urls.webBase}/register`);
      |                     ^ Error: page.goto: Test timeout of 15000ms exceeded.
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
  159 |   expect.soft(loginResponse.status(), `${testCaseId} must not create a login-capable account`).toBe(401);
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
```