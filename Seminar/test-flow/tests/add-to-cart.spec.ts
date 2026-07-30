import { test, expect } from '@playwright/test';

test.describe('FLOW 2: Add to Cart', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Đăng nhập' }).click();

    await page.getByRole('textbox').first().fill('test@eshop.com');
    await page.getByRole('textbox').nth(1).fill('Test1234!');

    await page.getByRole('button', { name: 'Sign In' }).click();
  });

  test('1. Real API - Add product into cart', async ({ page }) => {
    await page.getByRole('link', { name: 'Xem chi tiết' }).first().click();

    await expect(page).toHaveURL(/\/product\//);

    await page.getByRole('spinbutton').fill('5');
    await page.getByRole('button', { name: 'Thêm vào giỏ hàng' }).dblclick();

    await expect(page.getByRole('button', { name: 'Đã thêm' })).toBeVisible();

    await page.getByRole('link', { name: 'Giỏ hàng' }).click();

    await expect(page.locator('tbody tr')).toHaveCount(1);
    await expect(page.locator('tbody tr td').nth(2)).toHaveText("5");

    await page.getByRole('button', { name: 'Xóa' }).click();

    await expect(page.getByRole('heading', { name: 'Giỏ hàng của bạn đang trống' })).toBeVisible();
  });
});