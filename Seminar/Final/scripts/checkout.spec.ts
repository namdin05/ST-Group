import { test, expect, Page } from '@playwright/test';

async function login(page: Page) {
    await page.goto("http://localhost:5173/login");
    await page.locator('input[type="text"]').first().fill("test@eshop.com");
    await page.locator('input[type="text"]').nth(1).fill("Test1234!");
    await page.getByRole('button', { name: "Sign In" }).click();
    await expect(page).not.toHaveURL(/\/login/);
}

test.describe("Checkout & Coupon", () => {

    test.describe("3.1. Kiểm soát truy cập trang Thanh toán", () => {

        test("TC-3.1.1: Người dùng chưa đăng nhập truy cập /checkout", async ({ page }) => {
            await page.goto("http://localhost:5173/checkout");
            await expect(page).toHaveURL(/\/login/);
        });

        test("TC-3.1.2: Người dùng đã đăng nhập truy cập /checkout", async ({ page }) => {
            await login(page);
            await page.goto("http://localhost:5173/checkout");
            await expect(page).toHaveURL(/\/checkout/);
            await expect(page.getByRole('button', { name: "Xác Nhận Thanh Toán" }).first()).toBeVisible();
        });

    });

    test.describe("3.2. Áp dụng Mã giảm giá", () => {

        test("TC-3.2.1: Mã giảm giá không tồn tại", async ({ page }) => {
            await login(page);
            await page.goto("http://localhost:5173/checkout");
            await page.locator('input[placeholder*="mã giảm"], input[placeholder*="coupon"], .coupon-input input').first().fill("FAKECODE");
            await page.getByRole('button', { name: /áp dụng|apply/i }).click();
            await expect(page.getByText(/không hợp lệ|không tồn tại|invalid/i)).toBeVisible();
        });

        test("TC-3.2.2: Mã giảm giá đã hết hạn", async ({ page }) => {
            await login(page);
            await page.goto("http://localhost:5173/checkout");
            await page.locator('input[placeholder*="mã giảm"], input[placeholder*="coupon"], .coupon-input input').first().fill("EXPIRED");
            await page.getByRole('button', { name: /áp dụng|apply/i }).click();
            await expect(page.getByText(/hết hạn|expired/i)).toBeVisible();
        });

        test("TC-3.2.3: Mã giảm giá yêu cầu đơn hàng tối thiểu - chưa đủ ngưỡng", async ({ page }) => {
            await login(page);
            await page.goto("http://localhost:5173/checkout");
            await page.locator('input[placeholder*="mã giảm"], input[placeholder*="coupon"], .coupon-input input').first().fill("SAVE10");
            await page.getByRole('button', { name: /áp dụng|apply/i }).click();
            await expect(page.getByText(/tối thiểu|chưa đủ|chưa đạt|min.*order/i)).toBeVisible();
        });

        test("TC-3.2.4: Mã giảm giá áp dụng thành công - đủ ngưỡng đơn hàng", async ({ page }) => {
            await login(page);
            await page.goto("http://localhost:5173/checkout");
            const totalText = await page.locator('.total-amount, .order-total, [data-testid="total"]').textContent();
            await page.locator('input[placeholder*="mã giảm"], input[placeholder*="coupon"], .coupon-input input').first().fill("SAVE10");
            await page.getByRole('button', { name: /áp dụng|apply/i }).click();
            await expect(page.getByText(/giảm|discount|thành công/i)).toBeVisible();
            const discountedText = await page.locator('.total-amount, .order-total, [data-testid="total"]').textContent();
            expect(discountedText).not.toBe(totalText);
        });

        test("TC-3.2.5: Người dùng đã hết lượt sử dụng mã giảm giá", async ({ page }) => {
            await login(page);
            await page.goto("http://localhost:5173/checkout");
            await page.locator('input[placeholder*="mã giảm"], input[placeholder*="coupon"], .coupon-input input').first().fill("SAVE10");
            await page.getByRole('button', { name: /áp dụng|apply/i }).click();
            await expect(page.getByText(/hết lượt|đã sử dụng|giới hạn|max.*use/i)).toBeVisible();
        });

        test("TC-3.2.6: Mã giảm giá loại giảm cố định", async ({ page }) => {
            await login(page);
            await page.goto("http://localhost:5173/checkout");
            const totalText = await page.locator('.total-amount, .order-total, [data-testid="total"]').textContent();
            await page.locator('input[placeholder*="mã giảm"], input[placeholder*="coupon"], .coupon-input input').first().fill("BIGBUY");
            await page.getByRole('button', { name: /áp dụng|apply/i }).click();
            await expect(page.getByText(/giảm|discount|thành công/i)).toBeVisible();
            const discountedText = await page.locator('.total-amount, .order-total, [data-testid="total"]').textContent();
            expect(discountedText).not.toBe(totalText);
        });

    });

    // test.describe("3.3. Tính toàn vẹn dữ liệu đơn hàng", () => {

    //     test("TC-3.3.1: Can thiệp tham số total_amount khi tạo đơn hàng", async ({ page }) => {
    //         await login(page);
    //         await page.goto("http://localhost:5173/checkout");

    //         await page.route('**/api/orders**', async (route) => {
    //             const postData = route.request().postDataJSON();
    //             if (postData && postData.total_amount !== undefined) {
    //                 expect(postData.total_amount).toBeDefined();
    //                 expect(postData.total_amount).toBeGreaterThan(1000);
    //             }
    //             await route.continue();
    //         }, { times: 1 });

    //         await page.getByRole('button', { name: /đặt hàng|place order|order/i }).click();
    //         await expect(page).toHaveURL(/success|order|thank/i);
    //     });

    // });

    // test.describe("3.4. Hoàn thành Thanh toán", () => {

    //     test("TC-3.4.1: Đặt hàng thành công", async ({ page }) => {
    //         await login(page);
    //         await page.goto("http://localhost:5173/checkout");

    //         await page.locator('input[name="address"], input[placeholder*="địa chỉ"], .shipping-address input').first().fill("123 Test Street");
    //         await page.locator('input[name="phone"], input[placeholder*="số điện thoại"], input[placeholder*="phone"]').first().fill("0123456789");
    //         await page.locator('input[name="name"], input[placeholder*="họ tên"], input[placeholder*="name"]').first().fill("Test User");

    //         await page.getByRole('button', { name: /đặt hàng|place order|order/i }).click();
    //         await expect(page.getByText(/thành công|cảm ơn|thank you|order confirmed/i)).toBeVisible();
    //         const orderCode = await page.locator('.order-code, [data-testid="order-code"], .order-number').textContent();
    //         expect(orderCode).not.toBeNull();
    //         expect(orderCode?.trim().length).toBeGreaterThan(0);
    //     });

    //     test("TC-3.4.2: Giỏ hàng trống sau khi đặt hàng thành công", async ({ page }) => {
    //         await login(page);
    //         await page.goto("http://localhost:5173/checkout");

    //         await page.locator('input[name="address"], input[placeholder*="địa chỉ"], .shipping-address input').first().fill("123 Test Street");
    //         await page.locator('input[name="phone"], input[placeholder*="số điện thoại"], input[placeholder*="phone"]').first().fill("0123456789");

    //         await page.getByRole('button', { name: /đặt hàng|place order|order/i }).click();
    //         await page.goto("http://localhost:5173/cart");
    //         await expect(page.getByText(/trống|empty|no items|0 sản phẩm/i)).toBeVisible();
    //     });

    //     test("TC-3.4.3: Đơn hàng xuất hiện trong lịch sử với trạng thái pending", async ({ page }) => {
    //         await login(page);
    //         await page.goto("http://localhost:5173/checkout");

    //         await page.locator('input[name="address"], input[placeholder*="địa chỉ"], .shipping-address input').first().fill("123 Test Street");
    //         await page.locator('input[name="phone"], input[placeholder*="số điện thoại"], input[placeholder*="phone"]').first().fill("0123456789");

    //         await page.getByRole('button', { name: /đặt hàng|place order|order/i }).click();

    //         await page.goto("http://localhost:5173/orders");
    //         await expect(page.getByText(/pending|chờ xử lý|đang xử lý/i)).toBeVisible();
    //     });

    // });

});
