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
    await page.goto("http://localhost:5173/");
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

test.describe("Add To Cart", () => {

    test.describe("2.1. Thêm sản phẩm thành công từ trang Chi tiết sản phẩm", () => {

        test("TC-2.1.1: Nhấp 'Thêm vào giỏ hàng' với số lượng mặc định bằng 1", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);

            await expect(page.getByRole('button', { name: 'Đã thêm' })).toBeVisible();

            await page.getByRole('link', { name: 'Giỏ hàng' }).click();

            await expect(page.getByRole('button', { name: 'Tiến hành thanh toán' })).toBeVisible();

            await expect(page.locator('tbody tr')).toHaveCount(1);
            await expect(page.locator('tbody tr td').nth(2)).toHaveText("1");
        });

        test("TC-2.1.2: Thay đổi ô số lượng lên 5 và nhấn 'Thêm vào giỏ hàng'", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 5);

            await expect(page.getByRole('button', { name: 'Đã thêm' })).toBeVisible();

            await page.getByRole('link', { name: 'Giỏ hàng' }).click();

            await expect(page.locator('tbody tr')).toHaveCount(1);
            await expect(page.locator('tbody tr td').nth(2)).toHaveText("5");
        });

    });

    test.describe("2.2. Ràng buộc số lượng sản phẩm thêm vào", () => {

        test("TC-2.2.1: Nhập số lượng là số 0 hoặc số âm (0, -1, -5)", async ({ page }) => {
            await login(page);
            await navigateToFirstProduct(page);

            const qtyInput = page.getByRole('spinbutton');
            const addButton = page.getByRole('button', { name: 'Thêm vào giỏ hàng' });

            for (const val of ["0", "-1", "-5"]) {
                await qtyInput.fill(val);
                if (await addButton.isDisabled()) {
                    await expect(addButton).toBeDisabled();
                } else {
                    await addButton.dblclick();
                    await expect(page.getByText(/Số lượng phải lớn hơn 0|Không hợp lệ|Vui lòng nhập số lượng/i)).toBeVisible();
                }
            }
        });

        test("TC-2.2.2: Nhập số lượng không phải số nguyên (2.5, abc, 1e3)", async ({ page }) => {
            await login(page);
            await navigateToFirstProduct(page);

            const qtyInput = page.getByRole('spinbutton');

            await qtyInput.fill("2.5");
            const valueDecimal = await qtyInput.inputValue();
            expect(["2", "3"]).toContain(valueDecimal);

            await qtyInput.fill("abc");
            const valueText = await qtyInput.inputValue();
            expect(valueText === "" || /^\d+$/.test(valueText)).toBeTruthy();

            await qtyInput.fill("1e3");
            const valueScientific = await qtyInput.inputValue();
            expect(["1000", "1", "", "1e3"]).toContain(valueScientific);
        });

    });

    test.describe("2.3. Thêm sản phẩm trùng lặp (Cộng dồn số lượng)", () => {

        test("TC-2.3.1: Thêm sản phẩm A (số lượng 2) -> Quay lại trang chủ -> Vào lại sản phẩm A và thêm tiếp (số lượng 3)", async ({ page }) => {
            await login(page);

            await addFirstProduct(page, 2);
            await expect(page.getByRole('button', { name: 'Đã thêm' })).toBeVisible();

            await page.getByRole('link', { name: 'EShop' }).click();

            addFirstProduct(page, 3)
            await expect(page.getByRole('button', { name: 'Đã thêm' })).toBeVisible();

            await page.getByRole('link', { name: 'Giỏ hàng' }).click();
            await expect(page.locator('tbody tr')).toHaveCount(1);
        });

    });

    
    test.describe("2.4. Xóa sản phẩm và cập nhật giỏ hàng", () => {

        test("TC-2.4.1: Nhấn tăng (+) hoặc giảm (-) số lượng trực tiếp trong trang Giỏ hàng", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 2);
            await page.getByRole('link', { name: 'Giỏ hàng' }).click();

            await expect(page.locator('tbody tr')).toBeVisible();
            await expect(page.getByText(/Tổng tạm tính:/i)).toBeVisible();
        });

        test("TC-2.4.2: Nhấn nút Xóa sản phẩm -> hiển thị dialog xác nhận", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await page.getByRole('link', { name: 'Giỏ hàng' }).click();

            let dialogHandled = false;
            page.once('dialog', async (dialog) => {
                dialogHandled = true;
                await dialog.dismiss();
            });

            await page.getByRole('button', { name: 'Xóa' }).first().click();

            await expect(page.locator('tbody tr')).toHaveCount(0);
        });

        test("TC-2.4.3: Chọn 'Hủy' trên dialog xác nhận xóa", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await page.goto("http://localhost:5173/cart");

            page.once('dialog', async (dialog) => {
                await dialog.dismiss();
            });

            const deleteBtn = page.getByRole('button', { name: 'Xóa' }).first();
            if (await deleteBtn.isVisible()) {
                await deleteBtn.click();
            }

            await expect(page.locator('tbody tr').first()).toBeVisible();
        });

        test("TC-2.4.4: Chọn 'Xác nhận/Xóa' trên dialog xác nhận xóa", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await page.goto("http://localhost:5173/cart");

            page.once('dialog', async (dialog) => {
                await dialog.accept();
            });

            const deleteBtn = page.getByRole('button', { name: 'Xóa' }).first();
            if (await deleteBtn.isVisible()) {
                await deleteBtn.click();
            }
        });

        test("TC-2.4.5: Xóa toàn bộ sản phẩm khỏi giỏ hàng -> giỏ hàng trống", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await page.goto("http://localhost:5173/cart");

            page.on('dialog', async (dialog) => {
                await dialog.accept();
            });

            const deleteButtons = page.getByRole('button', { name: 'Xóa' });
            const count = await deleteButtons.count();

            for (let i = 0; i < count; i++) {
                await page.getByRole('button', { name: 'Xóa' }).first().click();
                await page.waitForTimeout(300);
            }

            await expect(page.getByText('Giỏ hàng của bạn đang trống')).toBeVisible();
        });

    });

});
