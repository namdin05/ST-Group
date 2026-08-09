import { expect, test } from '@playwright/test';
import casesJson from './data/fr-14.json' with { type: 'json' };
import { adminToken, categoryApi, createTempUser, deleteTempUser, loginApi, type TempUser } from './support/api.js';
import { env, type CaseRecord } from './support/config.js';
import { annotateCase, attachJson } from './support/evidence.js';
import { CategoryPage } from './support/pages.js';

const cases = casesJson as CaseRecord[];
const uniqueName = (base: string, id: string) => `${base} ${id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

test.describe(`Run by: ${env.studentId} | FR-14 - Quản lý danh mục`, () => {
  for (const record of cases) {
    test(`${record.id} - ${record.description}`, async ({ page, request }, testInfo) => {
      annotateCase(testInfo, record);
      const mode = String(record.input.mode);
      const adminJwt = await adminToken(request);
      const createdIds: number[] = [];
      let user: TempUser | undefined;

      const createCategory = async (name: string, token = adminJwt) => {
        const response = await categoryApi(request, 'post', '/api/categories', token, { name });
        const body = await response.json().catch(() => ({}));
        if (body.id) createdIds.push(body.id);
        return { response, body };
      };

      try {
        if (['create', 'invalidName', 'unicode', 'list', 'deleteExisting'].includes(mode)) {
          const categories = new CategoryPage(page);
          await categories.loginAsAdmin();

          if (mode === 'list') {
            const apiResponse = await request.get(`${env.apiUrl}/api/categories`);
            const apiCategories = await apiResponse.json();
            const rows = categories.table().getByRole('row');
            expect(await rows.count() - 1).toBe(apiCategories.length);
            for (const category of apiCategories) await expect(categories.table().getByText(category.name, { exact: true })).toBeVisible();
            return;
          }

          if (mode === 'deleteExisting') {
            const keepName = uniqueName('HW04 Keep', record.id);
            const targetName = uniqueName('HW04 Delete', record.id);
            const keep = await createCategory(keepName);
            const target = await createCategory(targetName);
            expect(keep.response.ok() && target.response.ok()).toBeTruthy();
            await page.reload();
            await page.getByText('Danh mục', { exact: true }).click();
            page.once('dialog', dialog => dialog.accept());
            await categories.table().getByRole('row', { name: new RegExp(targetName) }).getByRole('button', { name: 'Xóa' }).click();
            await expect(categories.table().getByText(targetName, { exact: true })).toHaveCount(0);
            await expect(categories.table().getByText(keepName, { exact: true })).toBeVisible();
            createdIds.splice(createdIds.indexOf(target.body.id), 1);
            return;
          }

          const rawName = String(record.input.name ?? '');
          const name = rawName ? uniqueName(rawName, record.id) : rawName;
          await categories.nameInput().fill(name);
          const before = await request.get(`${env.apiUrl}/api/categories`).then(r => r.json());
          await categories.addButton().click();

          if (mode === 'invalidName') {
            const after = await request.get(`${env.apiUrl}/api/categories`).then(r => r.json());
            const beforeIds = new Set(before.map((category: { id: number }) => category.id));
            for (const category of after) if (!beforeIds.has(category.id)) createdIds.push(category.id);
            await attachJson(testInfo, 'category-counts', { before: before.length, after: after.length });
            expect(after.length).toBe(before.length);
            return;
          }

          await expect(categories.table().getByText(name, { exact: true })).toBeVisible();
          const after = await request.get(`${env.apiUrl}/api/categories`).then(r => r.json());
          const created = after.find((category: { name: string }) => category.name === name);
          if (created) createdIds.push(created.id);
          if (mode === 'unicode') {
            await page.reload();
            await page.getByText('Danh mục', { exact: true }).click();
            await expect(categories.table().getByText(name, { exact: true })).toBeVisible();
          }
          return;
        }

        if (mode === 'duplicate') {
          const name = uniqueName('HW04 Duplicate', record.id);
          const first = await createCategory(name);
          const second = await createCategory(name);
          await attachJson(testInfo, 'duplicate-responses', { first: first.response.status(), second: second.response.status(), secondBody: second.body });
          expect(first.response.ok()).toBeTruthy();
          expect(second.response.status()).toBe(409);
          return;
        }

        if (mode === 'deleteMissing') {
          const response = await categoryApi(request, 'delete', '/api/categories/999999999', adminJwt);
          await attachJson(testInfo, 'delete-missing', { status: response.status(), body: await response.text() });
          expect(response.status()).toBe(404);
          return;
        }

        if (mode === 'noToken') {
          const response = await categoryApi(request, 'post', '/api/categories', undefined, { name: uniqueName('No token', record.id) });
          expect(response.status()).toBe(401);
          return;
        }

        if (mode === 'apiCreate') {
          const { response } = await createCategory(String(record.input.name));
          expect(response.status()).toBe(200);
          return;
        }

        user = await createTempUser(request, record.id.toLowerCase());
        const userLogin = await loginApi(request, user.email, user.password);
        const userToken = (await userLogin.json()).token as string;

        if (mode === 'userCreate') {
          const response = await categoryApi(request, 'post', '/api/categories', userToken, { name: uniqueName('Forbidden', record.id) });
          const body = await response.json().catch(() => ({}));
          if (body.id) createdIds.push(body.id);
          await attachJson(testInfo, 'user-create-response', { status: response.status(), body });
          expect(response.status()).toBe(403);
          return;
        }

        if (mode === 'userDelete') {
          const target = await createCategory(uniqueName('Protected', record.id));
          const response = await categoryApi(request, 'delete', `/api/categories/${target.body.id}`, userToken);
          await attachJson(testInfo, 'user-delete-response', { status: response.status(), body: await response.text() });
          expect(response.status()).toBe(403);
        }
      } finally {
        for (const id of createdIds) await categoryApi(request, 'delete', `/api/categories/${id}`, adminJwt);
        await deleteTempUser(request, user);
      }
    });
  }
});
