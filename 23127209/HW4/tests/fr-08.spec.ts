import { expect, test } from '@playwright/test';
import casesJson from './data/fr-08.json' with { type: 'json' };
import { createTempUser, deleteTempUser, type TempUser } from './support/api.js';
import { env, type CaseRecord } from './support/config.js';
import { annotateCase, attachJson } from './support/evidence.js';
import { CheckoutPage, LoginPage } from './support/pages.js';

const cases = casesJson as CaseRecord[];

test.describe(`Run by: ${env.studentId} | FR-08 - Thanh toán`, () => {
  for (const record of cases) {
    test(`${record.id} - ${record.description}`, async ({ page, request }, testInfo) => {
      annotateCase(testInfo, record);
      const mode = String(record.input.mode);
      let user: TempUser | undefined;

      try {
        if (mode === 'invalidToken') {
          const response = await request.post(`${env.apiUrl}/api/checkout`, {
            headers: { Authorization: 'Bearer invalid-token' },
            data: { total_amount: 1, shipping_address: 'HW04 test' }
          });
          await attachJson(testInfo, 'invalid-token-response', { status: response.status(), body: await response.text() });
          expect([401, 403]).toContain(response.status());
          return;
        }

        if (mode === 'unauthenticated') {
          await page.goto(`${env.webUrl}/checkout`);
          await expect(page).toHaveURL(/\/login$/);
          return;
        }

        user = await createTempUser(request, record.id.toLowerCase());
        const checkout = new CheckoutPage(page);
        await checkout.login(user.email, user.password);

        if (mode === 'emptyCart') {
          await page.goto(`${env.webUrl}/checkout`);
          await expect(checkout.confirm()).toHaveCount(0);
          return;
        }

        await checkout.addProduct(0);
        if (['twoProducts', 'displayItems'].includes(mode)) await checkout.addProduct(1);
        if (mode === 'quantityTwo') await checkout.addProduct(0);
        await checkout.gotoCheckout();

        if (mode === 'readonly') {
          const amount = checkout.amountInput();
          const readOnly = await amount.getAttribute('readonly');
          const disabled = await amount.isDisabled();
          expect(readOnly !== null || disabled).toBeTruthy();
          return;
        }

        if (mode === 'twoProducts' || mode === 'displayItems') {
          await expect(page.getByText(/iPhone 15 Pro Max x 1/)).toBeVisible();
          await expect(page.getByText(/Samsung Galaxy S24 Ultra x 1/)).toBeVisible();
          expect(Number(await checkout.amountInput().inputValue())).toBe(58_000_000);
          if (mode === 'displayItems') expect(await page.getByRole('listitem').count()).toBe(2);
          return;
        }

        if (mode === 'quantityTwo') {
          expect(Number(await checkout.amountInput().inputValue())).toBe(60_000_000);
          return;
        }

        const genuineAmount = Number(await checkout.amountInput().inputValue());
        const tamperedAmount = mode === 'tamper' ? Number(record.input.amount) : genuineAmount;
        if (mode === 'tamper') {
          await page.route('**/api/checkout', async route => {
            const original = route.request().postDataJSON() as Record<string, unknown>;
            await route.continue({ postData: JSON.stringify({ ...original, total_amount: tamperedAmount }), headers: { ...route.request().headers(), 'content-type': 'application/json' } });
          });
        }

        const responsePromise = page.waitForResponse(response => response.url().endsWith('/api/checkout'));
        await checkout.confirm().click();
        const response = await responsePromise;
        const body = await response.json().catch(() => ({}));
        await attachJson(testInfo, 'checkout-response', { status: response.status(), genuineAmount, tamperedAmount, body });

        if (mode === 'tamper' && !response.ok()) {
          expect(response.status()).toBe(400);
          return;
        }

        expect(response.status()).toBe(200);
        expect(body.orderId).toEqual(expect.any(Number));
        const orderResponse = await request.get(`${env.apiUrl}/api/orders/${body.orderId}`);
        const order = await orderResponse.json();
        await attachJson(testInfo, 'created-order', order);
        expect(Number(order.total_amount)).toBe(genuineAmount);

        if (mode === 'clearCart') {
          await page.goto(`${env.webUrl}/cart`);
          await expect(page.getByText(/giỏ hàng.*trống/i)).toBeVisible();
          const token = await page.evaluate(() => localStorage.getItem('token'));
          const cart = await request.get(`${env.apiUrl}/api/cart`, { headers: { Authorization: `Bearer ${token}` } });
          expect(await cart.json()).toEqual([]);
        }
      } finally {
        await deleteTempUser(request, user);
      }
    });
  }
});
