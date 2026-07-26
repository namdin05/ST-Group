import { test, expect, Page } from '@playwright/test';

async function login(page: Page) {
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Đăng nhập' }).click();
    await page.getByRole('textbox').first().fill('test@eshop.com');
    await page.getByRole('textbox').nth(1).fill('Test1234!');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).not.toHaveURL(/\/login/);
}

async function navigateToFirstProduct(page: Page) {
    await page.getByRole('link', { name: 'EShop' }).click();
    await page.getByRole('link', { name: 'Xem chi tiết' }).first().click();
    await expect(page).toHaveURL(/\/product\//);
}

async function addFirstProduct(page: Page, quantity: number = 1) {
    await navigateToFirstProduct(page);
    if (quantity > 1) {
        await page.getByRole('spinbutton').fill(quantity.toString());
    }
    await page.getByRole('button', { name: 'Thêm vào giỏ hàng' }).dblclick();
}

async function goToCheckoutFromCart(page: Page) {
    await page.getByRole('link', { name: 'Giỏ hàng' }).click();
    
    await page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();
}

test.describe("Checkout & Coupon", () => {

    test.describe("3.1. Kiểm soát truy cập trang Thanh toán", () => {

        test("TC-3.1.1: Người dùng chưa đăng nhập truy cập /checkout", async ({ page }) => {
            await page.goto("http://localhost:5173/checkout");
            await expect(page).toHaveURL(/\/login/);
        });

        test("TC-3.1.2: Người dùng đã đăng nhập truy cập /checkout qua giỏ hàng", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await goToCheckoutFromCart(page);
            await expect(page.getByRole('button', { name: "Xác Nhận Thanh Toán" }).first()).toBeVisible();
        });

    });

    test.describe("3.2. Áp dụng Mã giảm giá", () => {

        test("TC-3.2.1: Mã giảm giá không tồn tại", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await goToCheckoutFromCart(page);
            await page.getByRole('textbox', { name: 'Nhập mã giảm giá' }).fill("FAKECODE");
            await page.getByRole('button', { name: 'Áp dụng' }).click();
            await expect(page.getByText(/không hợp lệ|không tồn tại|invalid/i)).toBeVisible();
        });

        test("TC-3.2.2: Mã giảm giá đã hết hạn", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await goToCheckoutFromCart(page);
            await page.getByPlaceholder('Nhập mã giảm giá...').fill("EXPIRED");
            await page.getByRole('button', { name: 'Áp dụng' }).click();
            await expect(page.getByText(/hết hạn|expired/i)).toBeVisible();
        });

        test("TC-3.2.3: Mã giảm giá yêu cầu đơn hàng tối thiểu - chưa đủ ngưỡng", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await goToCheckoutFromCart(page);
            await page.getByRole('spinbutton').fill('100000');
            await page.getByPlaceholder('Nhập mã giảm giá...').fill("SAVE10");
            await page.getByRole('button', { name: 'Áp dụng' }).click();
            await expect(page.getByText(/tối thiểu|chưa đủ|chưa đạt|min.*order/i)).toBeVisible();
        });

        test("TC-3.2.4: Mã giảm giá áp dụng thành công - đủ ngưỡng đơn hàng", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await goToCheckoutFromCart(page);
            const totalText = await page.getByText(/Tổng thanh toán:/i).textContent();
            await page.getByPlaceholder('Nhập mã giảm giá...').fill("SAVE10");
            await page.getByRole('button', { name: 'Áp dụng' }).click();
            await expect(page.getByText(/thành công|Áp dụng thành công/i)).toBeVisible();
            const discountedText = await page.getByText(/Tổng thanh toán:/i).textContent();
            expect(discountedText).not.toBe(totalText);
        });

        test("TC-3.2.5: Người dùng đã hết lượt sử dụng mã giảm giá", async ({ page }) => {
            await login(page);

            // 1
            await addFirstProduct(page, 1);
            await goToCheckoutFromCart(page);
            await page.getByPlaceholder('Nhập mã giảm giá...').fill("SAVE10");
            await page.getByRole('button', { name: 'Áp dụng' }).click();
            await page.getByRole('button', { name: 'Xác Nhận Thanh Toán' }).click();

            // 2
            await addFirstProduct(page, 1);
            await goToCheckoutFromCart(page);
            await page.getByPlaceholder('Nhập mã giảm giá...').fill("SAVE10");
            await page.getByRole('button', { name: 'Áp dụng' }).click();

            await expect(page.getByText(/hết lượt|đã sử dụng|giới hạn|max.*use/i)).toBeVisible();
        });

        test("TC-3.2.6: Mã giảm giá loại giảm cố định", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await goToCheckoutFromCart(page);
            const totalText = await page.getByText(/Tổng thanh toán:/i).textContent();
            await page.getByPlaceholder('Nhập mã giảm giá...').fill("BIGBUY");
            await page.getByRole('button', { name: 'Áp dụng' }).click();
            await expect(page.getByText(/thành công|Áp dụng thành công/i)).toBeVisible();
            const discountedText = await page.getByText(/Tổng thanh toán:/i).textContent();
            expect(discountedText).not.toBe(totalText);
        });

    });

    test.describe("3.3. Tính toàn vẹn dữ liệu đơn hàng", () => {

        test("TC-3.3.1: Can thiệp tham số total_amount khi tạo đơn hàng", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await goToCheckoutFromCart(page);

            await page.route('**/api/orders**', async (route) => {
                const postData = route.request().postDataJSON();
                if (postData && postData.total_amount !== undefined) {
                    expect(postData.total_amount).toBeDefined();
                    expect(postData.total_amount).toBeGreaterThan(1000);
                }
                await route.continue();
            }, { times: 1 });

            await page.getByRole('button', { name: 'Xác Nhận Thanh Toán' }).click();
            await expect(page.getByText(/thành công|cảm ơn|thank you|order confirmed/i)).toBeVisible();
        });

    });

    test.describe("3.4. Hoàn thành Thanh toán", () => {

        test("TC-3.4.1: Đặt hàng thành công", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await goToCheckoutFromCart(page);

            await page.getByRole('button', { name: 'Xác Nhận Thanh Toán' }).click();
            await expect(page.getByRole('heading', { name: 'Thanh toán thành công!' })).toBeVisible();
        });

        test("TC-3.4.2: Giỏ hàng trống sau khi đặt hàng thành công", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await goToCheckoutFromCart(page);

            await page.getByRole('button', { name: 'Xác Nhận Thanh Toán' }).click();
            
            await goToCheckoutFromCart(page);
            await expect(page.getByRole('heading', { name: 'Giỏ hàng của bạn đang trống' })).toBeVisible();
        });

        test("TC-3.4.3: Đơn hàng xuất hiện trong lịch sử với trạng thái pending", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await goToCheckoutFromCart(page);

            await page.getByRole('button', { name: 'Xác Nhận Thanh Toán' }).click();

            await page.goto("http://localhost:5173/profile");
            await expect(page.getByText(/pending|chờ xử lý|đang xử lý|Chờ xác nhận/i)).toBeVisible();
        });

    });

});
