import { expect, test, type APIRequestContext } from '@playwright/test';
import casesJson from './data/fr-02.json' with { type: 'json' };
import { createTempUser, deleteTempUser, loginApi, adminToken, type TempUser } from './support/api.js';
import { env, type CaseRecord } from './support/config.js';
import { annotateCase } from './support/annotations.js';
import { LoginPage } from './support/pages.js';

const cases = casesJson as CaseRecord[];

async function userState(request: APIRequestContext, user: TempUser) {
  const token = await adminToken(request);
  const response = await request.get(`${env.apiUrl}/api/admin/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  expect(response.ok()).toBeTruthy();
  const users = await response.json();
  const state = users.find((candidate: { id: number }) => candidate.id === user.id);
  expect(state, `Temporary user ${user.id} must exist while the case runs`).toBeTruthy();
  return state;
}

function expectThirtySecondLock(state: { locked_until?: string | null }) {
  expect(state.locked_until).toBeTruthy();
  const remaining = new Date(state.locked_until!).getTime() - Date.now();
  expect(remaining).toBeGreaterThanOrEqual(25_000);
  expect(remaining).toBeLessThanOrEqual(35_000);
}

async function wrongAttempts(request: APIRequestContext, user: TempUser, count: number) {
  const statuses: number[] = [];
  for (let index = 0; index < count; index += 1) {
    const response = await loginApi(request, user.email, 'Wrong1234!');
    statuses.push(response.status());
  }
  return statuses;
}

async function lockUser(request: APIRequestContext, user: TempUser) {
  await wrongAttempts(request, user, 3);
}

test.describe(`Run by: ${env.studentId} | FR-02 - Đăng nhập và khóa tài khoản`, () => {
  for (const record of cases) {
    test(`${record.id} - ${record.description}`, async ({ page, request }, testInfo) => {
      annotateCase(testInfo, record, 'FR-02');
      const mode = String(record.input.mode);
      let tempUser: TempUser | undefined;

      try {
        if (mode === 'happy') {
          const response = await new LoginPage(page).login(env.user.email, env.user.password);
          const body = await response.json();
          expect(response.status()).toBe(200);
          expect(body.token).toEqual(expect.any(String));
          await expect(page).toHaveURL(env.webUrl + '/');
          expect(await page.evaluate(() => localStorage.getItem('token'))).toBeTruthy();
          return;
        }

        if (mode === 'emptyEmail' || mode === 'invalidEmail' || mode === 'emptyPassword') {
          const login = new LoginPage(page);
          await login.goto();
          await login.email().fill(mode === 'emptyEmail' ? '' : mode === 'invalidEmail' ? 'invalid-email' : env.user.email);
          await login.password().fill(mode === 'emptyPassword' ? '' : env.user.password);
          if (mode === 'invalidEmail') expect(await login.email().getAttribute('type')).toBe('email');
          if (mode === 'emptyPassword') expect(await login.password().getAttribute('type')).toBe('password');
          expect(await (mode === 'emptyPassword' ? login.password() : login.email()).evaluate((element: HTMLInputElement) => element.checkValidity())).toBe(false);
          await login.submit().click();
          await expect(page).toHaveURL(/\/login$/);
          return;
        }

        if (mode === 'unknownEmail') {
          const login = new LoginPage(page);
          const response = await login.login(`missing-${Date.now()}@example.test`, 'Wrong1234!');
          const body = await response.json();
          expect(response.status()).toBe(401);
          expect(JSON.stringify(body).toLowerCase()).not.toMatch(/not found|không tồn tại/);
          const error = page.locator('[class*="error"], [role="alert"]').first();
          await expect(error).toBeVisible();
          const errorBox = await error.boundingBox();
          const buttonBox = await login.submit().boundingBox();
          expect(errorBox && buttonBox && errorBox.y < buttonBox.y).toBeTruthy();
          return;
        }

        tempUser = await createTempUser(request, record.id.toLowerCase());

        if (mode === 'wrongAttempts') {
          const attempts = Number(record.input.attempts);
          const statuses = await wrongAttempts(request, tempUser, attempts);
          const state = await userState(request, tempUser);
          expect(statuses).toHaveLength(attempts);
          expect(statuses.every(status => status === 401)).toBeTruthy();
          expect(state.login_attempts).toBe(attempts);
          if (attempts < 3) expect(state.locked_until).toBeNull();
          if (attempts === 3) expectThirtySecondLock(state);
          return;
        }

        await lockUser(request, tempUser);

        if (mode === 'correctWhileLocked' || mode === 'fourthAttempt') {
          const response = await loginApi(request, tempUser.email, mode === 'correctWhileLocked' ? tempUser.password : 'Wrong1234!');
          const body = await response.json();
          expect(response.status()).toBe(403);
          expect(body.token).toBeUndefined();
          return;
        }

        const elapsedSeconds = Number(record.input.elapsedSeconds ?? 31);
        await page.waitForTimeout(elapsedSeconds * 1000);

        if (mode === 'wrongAfterUnlock') {
          const response = await loginApi(request, tempUser.email, 'Wrong1234!');
          const state = await userState(request, tempUser);
          expect(response.status()).toBe(401);
          expect(state.login_attempts).toBe(1);
          expect(state.locked_until).toBeNull();
          return;
        }

        const response = await loginApi(request, tempUser.email, tempUser.password);
        const body = await response.json();
        expect(response.status()).toBe(elapsedSeconds < 30 ? 403 : 200);
        if (elapsedSeconds >= 30) expect(body.token).toEqual(expect.any(String));
      } finally {
        await deleteTempUser(request, tempUser);
      }
    });
  }
});
