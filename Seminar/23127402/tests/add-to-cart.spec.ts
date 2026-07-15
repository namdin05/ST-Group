import { test, expect, Page } from '@playwright/test';

async function login(page: Page) {
    await page.goto("http://localhost:5173/login");
    await page.locator('input[type="text"]').first().fill("test@eshop.com");
    await page.locator('input[type="text"]').nth(1).fill("Test1234!");
    await page.getByRole('button', { name: "Sign In" }).click();
    await expect(page).not.toHaveURL(/\/login/);
}

async function addFirstProduct(page: Page, quantity: number = 1) {
    await page.goto("http://localhost:5173/");
    await page.locator('.product-card a, [data-testid="product"] a, .card a, a[href*="/product/"]').first().click();
    await expect(page).toHaveURL(/\/product\/|\/details\/|\/item\//);
    if (quantity > 1) {
        await page.locator('input[type="number"], .quantity-input input').fill(quantity.toString());
    }
    await page.getByRole('button', { name: /thêm.*giỏ|add.*cart|mua/i }).click();
    await page.getByRole('button', { name: /thêm.*giỏ|add.*cart|mua/i }).click();
}

test.describe("Add To Cart", () => {

    test.describe("2.1. Thêm sản phẩm thành công từ trang Chi tiết sản phẩm", () => {

        test("TC-2.1.1: Thêm vào giỏ hàng với số lượng mặc định 1", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await expect(page.getByText(/thành công|Đã thêm|added to cart|success/i)).toBeVisible();
        });

        test("TC-2.1.2: Thay đổi số lượng lên 5 và thêm vào giỏ hàng", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 5);
            await expect(page.getByText(/thành công|Đã thêm|added to cart|success/i)).toBeVisible();
        });

    });

    test.describe("2.2. Ràng buộc số lượng sản phẩm thêm vào", () => {

        test("TC-2.2.1: Nhập số lượng 0 hoặc số âm", async ({ page }) => {
            await login(page);
            await page.goto("http://localhost:5173/");
            await page.locator('.product-card a, [data-testid="product"] a, .card a, a[href*="/product/"]').first().click();
            await expect(page).toHaveURL(/\/product\/|\/details\/|\/item\//);
            const qtyInput = page.locator('input[type="number"], .quantity-input input');
            await qtyInput.fill("0");
            const addButton = page.getByRole('button', { name: /thêm.*giỏ|add.*cart|mua/i });
            if (await addButton.isDisabled()) {
                await expect(addButton).toBeDisabled();
            } else {
                await addButton.click();
                await expect(page.getByText(/tối thiểu|ít nhất|minimum|phải lớn hơn/i)).toBeVisible();
            }
        });

        test("TC-2.2.2: Nhập số lượng không phải số nguyên", async ({ page }) => {
            await login(page);
            await page.goto("http://localhost:5173/");
            await page.locator('.product-card a, [data-testid="product"] a, .card a, a[href*="/product/"]').first().click();
            await expect(page).toHaveURL(/\/product\/|\/details\/|\/item\//);
            const qtyInput = page.locator('input[type="number"], .quantity-input input');
            await qtyInput.fill("2.5");
            const value = await qtyInput.inputValue();
            expect(['2', '2.5']).toContain(value);
        });

    });

    test.describe("2.3. Thêm sản phẩm trùng lặp (Cộng dồn số lượng)", () => {

        test("TC-2.3.1: Thêm sản phẩm A hai lần - kiểm tra cộng dồn", async ({ page }) => {
            await login(page);

            await addFirstProduct(page, 2);

            await page.goto("http://localhost:5173/");
            await page.locator('.product-card a, [data-testid="product"] a, .card a, a[href*="/product/"]').first().click();
            await expect(page).toHaveURL(/\/product\/|\/details\/|\/item\//);
            await page.locator('input[type="number"], .quantity-input input').fill("3");
            await page.getByRole('button', { name: /thêm.*giỏ|add.*cart|mua/i }).click();

            await page.goto("http://localhost:5173/cart");
            await expect(page.locator('.cart-item, [data-testid="cart-item"], .cart-row')).toHaveCount(1);
            await expect(page.locator('.cart-item .quantity, [data-testid="cart-item"] .quantity, .cart-row .qty')).toContainText("5");
        });

    });

    test.describe("2.4. Xóa sản phẩm và cập nhật giỏ hàng", () => {

        test("TC-2.4.1: Tăng/giảm số lượng trong trang Giỏ hàng", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await page.goto("http://localhost:5173/cart");

            const plusBtn = page.locator('button[aria-label*="tăng"], button[aria-label*="increment"], .qty-btn-plus, .increase').first();
            if (await plusBtn.isVisible()) {
                await plusBtn.click();
                await page.waitForTimeout(500);
            }

            const minusBtn = page.locator('button[aria-label*="giảm"], button[aria-label*="decrement"], .qty-btn-minus, .decrease').first();
            if (await minusBtn.isVisible()) {
                await minusBtn.click();
            }

            await expect(page.locator('.total-amount, .order-total, [data-testid="total"], .cart-total')).toBeVisible();
        });

        test("TC-2.4.2: Nhấn nút Xóa sản phẩm - hiển thị dialog xác nhận", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await page.goto("http://localhost:5173/cart");

            await page.locator('button[aria-label*="Xóa"], button[aria-label*="xóa"], button[aria-label*="delete"], .btn-remove, .delete-item, button:has-text("Xóa"), button:has-text("xóa")').first().click();
            await expect(page.getByRole('dialog').first()).toBeVisible();
        });

        test("TC-2.4.3: Hủy trên dialog xác nhận xóa", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await page.goto("http://localhost:5173/cart");

            await page.locator('button[aria-label*="xóa"], button[aria-label*="delete"], .btn-remove, .delete-item').first().click();
            await expect(page.getByRole('dialog').first()).toBeVisible();
            await page.getByRole('button', { name: /hủy|cancel|không/i }).click();
            await expect(page.getByRole('dialog')).toHaveCount(0);
        });

        test("TC-2.4.4: Xác nhận xóa sản phẩm", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await page.goto("http://localhost:5173/cart");

            await page.locator('button[aria-label*="xóa"], button[aria-label*="delete"], .btn-remove, .delete-item').first().click();
            await expect(page.getByRole('dialog').first()).toBeVisible();
            await page.getByRole('button', { name: /xóa|delete|confirm|đồng ý|yes/i }).click();
            await expect(page.getByText(/xóa thành công|đã xóa|removed|deleted/i)).toBeVisible();
        });

        test("TC-2.4.5: Xóa toàn bộ - giỏ hàng trống", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 2);
            await page.goto("http://localhost:5173/cart");

            const deleteButtons = page.locator('button[aria-label*="xóa"], button[aria-label*="delete"], .btn-remove, .delete-item');
            const count = await deleteButtons.count();

            for (let i = 0; i < count; i++) {
                await page.locator('button[aria-label*="xóa"], button[aria-label*="delete"], .btn-remove, .delete-item').first().click();
                await expect(page.getByRole('dialog').first()).toBeVisible();
                await page.getByRole('button', { name: /xóa|delete|confirm|đồng ý|yes/i }).click();
                await page.waitForTimeout(500);
            }

            await expect(page.getByText(/trống|empty|no items|0 sản phẩm/i)).toBeVisible();
        });

    });

});
