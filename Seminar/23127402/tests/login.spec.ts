import { test, expect } from '@playwright/test';

test.describe("Login end user", () => {
    
    test("Đăng nhập thành công", async ({ page }) => {
        await page.goto("http://localhost:5173/login");

        await page.locator('input[type="text"]').first().fill("test@eshop.com");
        await page.locator('input[type="text"]').nth(1).fill("Test1234!");

        await page.getByRole('button', {name: "Sign In"}).click();
    });

});