import { test, expect } from '@playwright/test';

test.describe('FLOW 1: Login + account handling', () => {
  test('1. Valid login - Login successfully', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Đăng nhập' }).click();

    await page.getByRole('textbox').first().fill('test@eshop.com');
    await page.getByRole('textbox').nth(1).fill('Test1234!');

    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).not.toHaveURL(/\/login/);
  });

  test('2. Invalid credentials - Invalid email/password', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Đăng nhập' }).click();


    await page.getByRole('textbox').first().fill('wrongemail@eshop.com');
    await page.getByRole('textbox').nth(1).fill('password');

    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByText('Đăng nhập thất bại. Vui lòng kiểm tra lại.')).toBeVisible();
  });

  test('3. Lockout or rejection - Locked account', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Đăng nhập' }).click();

    for(let i = 0; i < 3; i++) {
        await page.getByRole('textbox').first().fill('test@eshop.com');
        await page.getByRole('textbox').nth(1).fill('password');

        await page.getByRole('button', { name: 'Sign In' }).click();
    }

    await page.getByRole('textbox').first().fill('test@eshop.com');
    await page.getByRole('textbox').nth(1).fill('Test1234!');

    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByText('Đăng nhập thất bại. Vui lòng kiểm tra lại.')).toBeVisible();
  });
});