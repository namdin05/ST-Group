import {
  expect,
  test,
  type APIRequestContext,
  type Page,
  type TestInfo,
} from '@playwright/test';
import testData from '../test-data/fr01-registration.json';

type RegistrationInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type GeneratorInput = {
  nameGenerator: { character: string; length: number };
  email: string;
  passwordGenerator: {
    prefix: string;
    character: string;
    totalLength: number;
  };
};

type RegistrationCase = {
  id: string;
  layer: string;
  fixtureRefs?: string[];
  data?: RegistrationInput | GeneratorInput;
  request?: {
    method: string;
    path: string;
    body: Record<string, unknown>;
  };
  expected: Record<string, unknown>;
};

type RegistrationDataFile = {
  urls: { webBase: string; apiBase: string };
  fixtures: Record<string, RegistrationInput & { role: string }>;
  testCases: RegistrationCase[];
};

const dataFile = testData as unknown as RegistrationDataFile;
const casesById = new Map(dataFile.testCases.map((testCase) => [testCase.id, testCase]));

if (casesById.size !== dataFile.testCases.length) {
  throw new Error('FR-01 test data contains duplicate test-case IDs.');
}

function caseById(id: string): RegistrationCase {
  const testCase = casesById.get(id);
  if (!testCase) throw new Error(`Missing FR-01 test data for ${id}.`);
  return testCase;
}

function runId(testInfo: TestInfo): string {
  return [
    testInfo.project.name,
    testInfo.workerIndex,
    testInfo.retry,
    testInfo.title.replace(/[^a-zA-Z0-9]+/g, '-'),
    Date.now(),
  ]
    .join('-')
    .toLowerCase();
}

function resolveTemplates<T>(value: T, id: string): T {
  return JSON.parse(JSON.stringify(value).replaceAll('{{runId}}', id)) as T;
}

class RegistrationPage {
  readonly form;
  readonly heading;
  readonly nameInput;
  readonly emailInput;
  readonly passwordInput;
  readonly confirmPasswordInput;
  readonly submitButton;

  constructor(readonly page: Page) {
    this.submitButton = page.getByRole('button', { name: 'Đăng Ký', exact: true });
    this.form = page.locator('form').filter({ has: this.submitButton });
    this.heading = page.getByRole('heading', {
      name: 'Đăng Ký Tài Khoản',
      exact: true,
    });

    // The rendered SUT inputs have no accessible name/id/placeholder. Keep the
    // fallback scoped to the registration form and document it for human review.
    const textInputs = this.form.locator('input[type="text"]');
    const passwordInputs = this.form.locator('input[type="password"]');
    this.nameInput = textInputs.nth(0);
    this.emailInput = textInputs.nth(1);
    this.passwordInput = passwordInputs.nth(0);
    this.confirmPasswordInput = passwordInputs.nth(1);
  }

  async goto(): Promise<void> {
    await this.page.goto(`${dataFile.urls.webBase}/register`);
    await expect(this.heading).toBeVisible();
    await expect(this.submitButton).toBeEnabled();
  }

  async fill(input: RegistrationInput, requireConfirm = false): Promise<void> {
    await this.nameInput.fill(input.name);
    await this.emailInput.fill(input.email);
    await this.passwordInput.fill(input.password);

    if (requireConfirm) {
      await expect.soft(
        this.confirmPasswordInput,
        'FR-01 requires a visible confirm-password field',
      ).toBeVisible();
    }

    if ((await this.confirmPasswordInput.count()) > 0 && input.confirmPassword !== undefined) {
      await this.confirmPasswordInput.fill(input.confirmPassword);
    }
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}

async function postRegister(
  request: APIRequestContext,
  testCase: RegistrationCase,
  id: string,
) {
  if (!testCase.request) throw new Error(`${testCase.id} has no API request data.`);
  const body = resolveTemplates(testCase.request.body, id);
  return {
    body,
    response: await request.post(`${dataFile.urls.apiBase}${testCase.request.path}`, {
      data: body,
    }),
  };
}

async function expectFourXx(responseStatus: number, testCaseId: string): Promise<void> {
  expect.soft(responseStatus, `${testCaseId} should return a client error`).toBeGreaterThanOrEqual(400);
  expect.soft(responseStatus, `${testCaseId} should return a client error`).toBeLessThan(500);
}

async function expectCannotLogin(
  request: APIRequestContext,
  email: string,
  password: string,
  testCaseId: string,
): Promise<void> {
  const loginResponse = await request.post(`${dataFile.urls.apiBase}/api/login`, {
    data: { email, password },
  });
  expect.soft(loginResponse.status(), `${testCaseId} must not create a login-capable account`).toBe(401);
}

test.describe('FR-01 – Account Registration', () => {
  test.describe('UI cases', () => {
    test.beforeEach(async ({ page }) => {
      await new RegistrationPage(page).goto();
    });

    test('TC001 – valid registration redirects to login', async ({ page }, testInfo) => {
      const testCase = caseById('TC001');
      const input = resolveTemplates(testCase.data as RegistrationInput, runId(testInfo));
      const registration = new RegistrationPage(page);

      await registration.fill(input, true);
      await registration.submit();

      await expect(page).toHaveURL(`${dataFile.urls.webBase}${String(testCase.expected.path)}`);
    });

    test('TC002 – empty name is rejected by required-field validation', async ({ page }, testInfo) => {
      const testCase = caseById('TC002');
      const input = resolveTemplates(testCase.data as RegistrationInput, runId(testInfo));
      const registration = new RegistrationPage(page);

      await registration.fill(input);
      await registration.submit();

      expect(await registration.nameInput.evaluate((element: HTMLInputElement) => element.validity.valueMissing)).toBe(true);
      await expect(page).toHaveURL(/\/register\/?$/);
    });

    test('TC003 – invalid email format is rejected', async ({ page }, testInfo) => {
      const testCase = caseById('TC003');
      const input = resolveTemplates(testCase.data as RegistrationInput, runId(testInfo));
      const registration = new RegistrationPage(page);

      await registration.fill(input);
      await expect.soft(registration.emailInput, 'Email should use native email semantics').toHaveAttribute('type', 'email');
      await registration.submit();

      await expect(page.getByText(/email.*(?:không hợp lệ|invalid)|(?:không hợp lệ|invalid).*email/i)).toBeVisible();
      await expect(page).toHaveURL(/\/register\/?$/);
    });

    test('TC004 – seven-character password is rejected', async ({ page }, testInfo) => {
      const testCase = caseById('TC004');
      const input = resolveTemplates(testCase.data as RegistrationInput, runId(testInfo));
      const registration = new RegistrationPage(page);

      await registration.fill(input);
      await registration.submit();

      await expect(page.getByText(/Mật khẩu quá yếu/i)).toBeVisible();
      await expect(page).toHaveURL(/\/register\/?$/);
    });

    test('TC005 – valid eight-character password is accepted', async ({ page }, testInfo) => {
      const testCase = caseById('TC005');
      const input = resolveTemplates(testCase.data as RegistrationInput, runId(testInfo));
      const registration = new RegistrationPage(page);

      await registration.fill(input, true);
      await registration.submit();

      await expect(page).toHaveURL(`${dataFile.urls.webBase}${String(testCase.expected.path)}`);
    });

    test('TC006 – password without a special character is rejected', async ({ page }, testInfo) => {
      const testCase = caseById('TC006');
      const input = resolveTemplates(testCase.data as RegistrationInput, runId(testInfo));
      const registration = new RegistrationPage(page);

      await registration.fill(input);
      await registration.submit();

      await expect(page.getByText(/Mật khẩu quá yếu/i)).toBeVisible();
      await expect(page).toHaveURL(/\/register\/?$/);
    });

    test('TC007 – duplicate email is rejected in the UI flow', async ({ page, request }, testInfo) => {
      const testCase = caseById('TC007');
      const id = runId(testInfo);
      const existingUser = resolveTemplates(dataFile.fixtures.existingUser, id);
      const seedResponse = await request.post(`${dataFile.urls.apiBase}/api/register`, {
        data: existingUser,
      });
      expect(seedResponse.status()).toBe(200);

      const input = resolveTemplates(testCase.data as RegistrationInput, id);
      const registration = new RegistrationPage(page);
      await registration.fill(input);
      await registration.submit();

      await expect(page.getByText(/email.*(?:tồn tại|đã đăng ký|duplicate|unique)|(?:tồn tại|đã đăng ký|duplicate|unique).*email/i)).toBeVisible();
      await expect(page).toHaveURL(/\/register\/?$/);
    });

    test('TC008 – unusually long input does not crash the registration page', async ({ page }, testInfo) => {
      const testCase = caseById('TC008');
      const generator = resolveTemplates(testCase.data as GeneratorInput, runId(testInfo));
      const password =
        generator.passwordGenerator.prefix +
        generator.passwordGenerator.character.repeat(
          generator.passwordGenerator.totalLength - generator.passwordGenerator.prefix.length,
        );
      const input: RegistrationInput = {
        name: generator.nameGenerator.character.repeat(generator.nameGenerator.length),
        email: generator.email,
        password,
        confirmPassword: password,
      };
      const registration = new RegistrationPage(page);

      await registration.fill(input);
      await registration.submit();

      await expect(registration.heading).toBeVisible();
      await expect(page.locator('form script')).toHaveCount(0);
      testInfo.annotations.push({
        type: 'observed-behavior',
        description: `Registration page remained responsive at ${page.url()}`,
      });
    });
  });

  test.describe('API cases', () => {
    test('TC009 – complete valid payload is accepted', async ({ request }, testInfo) => {
      const testCase = caseById('TC009');
      const { response } = await postRegister(request, testCase, runId(testInfo));
      expect(response.status()).toBe(Number(testCase.expected.status));
      const responseBody = await response.json();
      for (const key of testCase.expected.bodyIncludes as string[]) {
        expect(responseBody).toHaveProperty(key);
      }
    });

    test('TC010 – missing name is rejected and creates no account', async ({ request }, testInfo) => {
      const testCase = caseById('TC010');
      const { body, response } = await postRegister(request, testCase, runId(testInfo));
      await expectFourXx(response.status(), testCase.id);
      await expectCannotLogin(request, String(body.email), String(body.password), testCase.id);
    });

    test('TC011 – missing email is rejected', async ({ request }, testInfo) => {
      const testCase = caseById('TC011');
      const { response } = await postRegister(request, testCase, runId(testInfo));
      await expectFourXx(response.status(), testCase.id);
    });

    test('TC012 – missing password is rejected', async ({ request }, testInfo) => {
      const testCase = caseById('TC012');
      const { response } = await postRegister(request, testCase, runId(testInfo));
      await expectFourXx(response.status(), testCase.id);
    });

    test('TC013 – invalid email format is rejected and creates no account', async ({ request }, testInfo) => {
      const testCase = caseById('TC013');
      const { body, response } = await postRegister(request, testCase, runId(testInfo));
      await expectFourXx(response.status(), testCase.id);
      await expectCannotLogin(request, String(body.email), String(body.password), testCase.id);
    });

    test('TC014 – seven-character password is rejected and creates no account', async ({ request }, testInfo) => {
      const testCase = caseById('TC014');
      const { body, response } = await postRegister(request, testCase, runId(testInfo));
      await expectFourXx(response.status(), testCase.id);
      await expectCannotLogin(request, String(body.email), String(body.password), testCase.id);
    });

    test('TC015 – valid eight-character password is accepted', async ({ request }, testInfo) => {
      const testCase = caseById('TC015');
      const { response } = await postRegister(request, testCase, runId(testInfo));
      expect(response.status()).toBe(Number(testCase.expected.status));
      const responseBody = await response.json();
      for (const key of testCase.expected.bodyIncludes as string[]) {
        expect(responseBody).toHaveProperty(key);
      }
    });

    test('TC016 – duplicate email is rejected without overwriting the account', async ({ request }, testInfo) => {
      const testCase = caseById('TC016');
      const id = runId(testInfo);
      const existingUser = resolveTemplates(dataFile.fixtures.existingUser, id);
      const seedResponse = await request.post(`${dataFile.urls.apiBase}/api/register`, {
        data: existingUser,
      });
      expect(seedResponse.status()).toBe(200);

      const { response } = await postRegister(request, testCase, id);
      await expectFourXx(response.status(), testCase.id);

      const originalLogin = await request.post(`${dataFile.urls.apiBase}/api/login`, {
        data: { email: existingUser.email, password: existingUser.password },
      });
      expect.soft(originalLogin.status(), 'The original account must remain usable').toBe(200);
    });

    test('TC017 – registration cannot self-assign the admin role', async ({ request }, testInfo) => {
      const testCase = caseById('TC017');
      const { body, response } = await postRegister(request, testCase, runId(testInfo));
      expect(testCase.expected.allowedStatus as number[]).toContain(response.status());

      const loginResponse = await request.post(`${dataFile.urls.apiBase}/api/login`, {
        data: { email: body.email, password: body.password },
      });
      expect(loginResponse.status()).toBe(200);
      const loginBody = await loginResponse.json();
      expect(loginBody.user.role).toBe(testCase.expected.createdRole);
    });
  });

  test('TC018 – script-like name is rejected or rendered as escaped text', async ({ page, request }, testInfo) => {
    const testCase = caseById('TC018');
    const input = resolveTemplates(testCase.data as RegistrationInput, runId(testInfo));
    const registerResponse = await request.post(`${dataFile.urls.apiBase}/api/register`, {
      data: { name: input.name, email: input.email, password: input.password },
    });
    expect([200, 201]).toContain(registerResponse.status());

    let dialogCount = 0;
    page.on('dialog', async (dialog) => {
      dialogCount += 1;
      await dialog.dismiss();
    });

    await page.goto(`${dataFile.urls.webBase}/login`);
    const loginForm = page.locator('form').filter({
      has: page.getByRole('button', { name: 'Sign In', exact: true }),
    });
    await loginForm.getByLabel('Username', { exact: true }).fill(input.email);
    await loginForm.getByLabel('Mật khẩu', { exact: true }).fill(input.password);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await expect(page).toHaveURL(`${dataFile.urls.webBase}/`);

    const header = page.locator('header');
    expect.soft(dialogCount, 'Injected input must not execute a script dialog').toBe(0);
    await expect.soft(header.locator('script'), 'The name must not become executable markup').toHaveCount(0);
    await expect.soft(header, 'The name should be rendered as escaped text').toContainText(input.name);
  });
});
