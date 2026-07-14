import { test, expect, Page } from '@playwright/test';

test.describe("Login & Account Lockout", () => {

    test.describe("1.1. Đăng nhập thành công với tài khoản hợp lệ", () => {

        test("TC-1.1.1: Đăng nhập với tài khoản User mặc định", async ({ page }) => {
            await page.goto("http://localhost:5173/login");
            await page.locator('input[type="text"]').first().fill("test@eshop.com");
            await page.locator('input[type="text"]').nth(1).fill("Test1234!");
            await page.getByRole('button', { name: "Sign In" }).click();
            await expect(page).not.toHaveURL(/\/login/);
            await expect(page.getByText(/Chào|Hello|Welcome/i)).toBeVisible();
        });

        test("TC-1.1.2: Đăng nhập với tài khoản Admin mặc định", async ({ page }) => {
            await page.goto("http://localhost:5173/login");
            await page.locator('input[type="text"]').first().fill("admin@eshop.com");
            await page.locator('input[type="text"]').nth(1).fill("Admin123!");
            await page.getByRole('button', { name: "Sign In" }).click();
            await expect(page).not.toHaveURL(/\/login/);
            await expect(page.getByText(/Admin|Quản trị/i)).toBeVisible();
        });

    });

    test.describe("1.2. Đăng nhập thất bại do thông tin không chính xác", () => {

        test("TC-1.2.1: Email chưa đăng ký trong hệ thống", async ({ page }) => {
            await page.goto("http://localhost:5173/login");
            await page.locator('input[type="text"]').first().fill("nonexistent@test.com");
            await page.locator('input[type="text"]').nth(1).fill("SomePass123!");
            await page.getByRole('button', { name: "Sign In" }).click();
            await expect(page.getByText(/thất bại|không hợp lệ|sai|error|invalid|failed/i)).toBeVisible();
        });

        test("TC-1.2.2: Đúng Email nhưng sai Mật khẩu", async ({ page }) => {
            await page.goto("http://localhost:5173/login");
            await page.locator('input[type="text"]').first().fill("test@eshop.com");
            await page.locator('input[type="text"]').nth(1).fill("WrongPassword!");
            await page.getByRole('button', { name: "Sign In" }).click();
            await expect(page.getByText(/thất bại|không hợp lệ|sai|error|invalid|failed/i)).toBeVisible();
        });

        test("TC-1.2.3: Để trống Email và/hoặc Mật khẩu", async ({ page }) => {
            await page.goto("http://localhost:5173/login");
            await page.getByRole('button', { name: "Sign In" }).click();
            await expect(page).toHaveURL(/\/login/);
        });

    });

    test.describe("1.3. Kiểm tra định dạng dữ liệu đầu vào", () => {

        test("TC-1.3.1: Email không đúng định dạng chuẩn", async ({ page }) => {
            await page.goto("http://localhost:5173/login");
            await page.locator('input[type="text"]').first().fill("nam@");
            await page.locator('input[type="text"]').nth(1).fill("Test1234!");
            await page.getByRole('button', { name: "Sign In" }).click();
            await expect(page.locator('input[type="text"]').first()).toBeVisible();
        });

        test("TC-1.3.2: Kiểm tra thuộc tính password", async ({ page }) => {
            await page.goto("http://localhost:5173/login");
            const passwordInput = page.locator('input[type="password"]');
            await expect(passwordInput).toBeVisible();
        });

    });

    test.describe("1.4. Tạm khóa tài khoản sau nhiều lần đăng nhập sai", () => {

        test("TC-1.4.1: Sai lần 1 và lần 2 - tài khoản chưa bị khóa", async ({ page }) => {
            await page.goto("http://localhost:5173/login");

            for (let i = 0; i < 2; i++) {
                await page.locator('input[type="text"]').first().fill("test@eshop.com");
                await page.locator('input[type="text"]').nth(1).fill("WrongPassword!");
                await page.getByRole('button', { name: "Sign In" }).click();
                await expect(page.getByText(/thất bại|không hợp lệ|sai|error|invalid|failed/i)).toBeVisible();
            }
        });

        test("TC-1.4.2: Sai lần thứ 3 - tài khoản bị khóa tạm thời", async ({ page }) => {
            await page.goto("http://localhost:5173/login");

            for (let i = 0; i < 3; i++) {
                await page.locator('input[type="text"]').first().fill("test@eshop.com");
                await page.locator('input[type="text"]').nth(1).fill("WrongPassword!");
                await page.getByRole('button', { name: "Sign In" }).click();
            }

            await expect(page.getByText(/khóa|lock|blocked|tạm thời/i)).toBeVisible();
        });

        test("TC-1.4.3: Đăng nhập đúng khi tài khoản đang bị khóa", async ({ page }) => {
            await page.goto("http://localhost:5173/login");

            for (let i = 0; i < 3; i++) {
                await page.locator('input[type="text"]').first().fill("test@eshop.com");
                await page.locator('input[type="text"]').nth(1).fill("WrongPassword!");
                await page.getByRole('button', { name: "Sign In" }).click();
            }

            await expect(page.getByText(/khóa|lock|blocked/i)).toBeVisible();

            await page.locator('input[type="text"]').first().fill("test@eshop.com");
            await page.locator('input[type="text"]').nth(1).fill("Test1234!");
            await page.getByRole('button', { name: "Sign In" }).click();

            await expect(page).toHaveURL(/\/login/);
            await expect(page.getByText(/khóa|lock|blocked/i)).toBeVisible();
        });

        test("TC-1.4.4: Đăng nhập đúng sau khi hết thời gian khóa", async ({ page }) => {
            await page.goto("http://localhost:5173/login");

            for (let i = 0; i < 3; i++) {
                await page.locator('input[type="text"]').first().fill("test@eshop.com");
                await page.locator('input[type="text"]').nth(1).fill("WrongPassword!");
                await page.getByRole('button', { name: "Sign In" }).click();
            }

            await expect(page.getByText(/khóa|lock|blocked/i)).toBeVisible();

            await page.waitForTimeout(31000);

            await page.locator('input[type="text"]').first().fill("test@eshop.com");
            await page.locator('input[type="text"]').nth(1).fill("Test1234!");
            await page.getByRole('button', { name: "Sign In" }).click();

            await expect(page).not.toHaveURL(/\/login/);
        });

    });

});
