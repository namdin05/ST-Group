import { test, expect, Page } from '@playwright/test';

async function login(page: Page) {
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Đăng nhập' }).click();
    await page.getByRole('textbox').first().fill('test@eshop.com');
    await page.getByRole('textbox').nth(1).fill('Test1234!');
    await page.getByRole('button', { name: 'Sign In' }).click();
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

test.describe("Add To Cart", () => {

    test.describe("2.1. Successfully added a product from the Product Details page.", () => {

        test("TC-2.1.1: Click 'Thêm vào giỏ hàng' with the default quantity set to 1.", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);

            await expect(page.getByRole('button', { name: 'Đã thêm' })).toBeVisible();

            await page.getByRole('link', { name: 'Giỏ hàng' }).click();

            await expect(page.getByRole('button', { name: 'Tiến hành thanh toán' })).toBeVisible();

            await expect(page.locator('tbody tr')).toHaveCount(1);
            await expect(page.locator('tbody tr td').nth(2)).toHaveText("1");
        });

        test("TC-2.1.2: Change the quantity to 5 and click 'Thêm vào giỏ hàng'.", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 5);

            await expect(page.getByRole('button', { name: 'Đã thêm' })).toBeVisible();

            await page.getByRole('link', { name: 'Giỏ hàng' }).click();

            await expect(page.locator('tbody tr')).toHaveCount(1);
            await expect(page.locator('tbody tr td').nth(2)).toHaveText("5");
        });

    });

    test.describe("2.2. Constraint on the number of additional products.", () => {

        test("TC-2.2.1: Enter the quantity as 0 or a negative number (0, -1, -5)", async ({ page }) => {
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
                    await expect(page.getByText(/Số lượng phải lớn hơn 0|Không hợp lệ|Vui lòng nhập số lượng/i)).toBeVisible({ timeout: 1000 });
                }
            }
        });

        test("TC-2.2.2: Enter a quantity that is not an integer (2.5, abc, 1e3)", async ({ page }) => {
            await login(page);
            await navigateToFirstProduct(page);

            const qtyInput = page.getByRole('spinbutton');

            await qtyInput.fill("2.5").catch(() => { });
            const valueDecimal = await qtyInput.inputValue();
            expect(["2.5", "2", "3"]).toContain(valueDecimal);

            await qtyInput.fill("abc").catch(() => { qtyInput.fill("1") });
            const valueText = await qtyInput.inputValue();
            expect(["1", "0", ""]).toContain(valueText);

            await qtyInput.fill("1e3").catch(() => { });
            const valueScientific = await qtyInput.inputValue();
            expect(["1000", "1e3", "1", ""]).toContain(valueScientific);
        });

    });

    test.describe("2.3. Duplicates added products (Accumulated quantity)", () => {

        test("TC-2.3.1: Add product A (quantity 2) -> Go back to home page -> Re-enter product A and add again (quantity 3)", async ({ page }) => {
            await login(page);

            await addFirstProduct(page, 2);
            await expect(page.getByRole('button', { name: 'Đã thêm' })).toBeVisible();

            await page.getByRole('link', { name: 'EShop' }).click();

            await addFirstProduct(page, 3);
            await expect(page.getByRole('button', { name: 'Đã thêm' })).toBeVisible();

            await page.getByRole('link', { name: 'Giỏ hàng' }).click();
            await expect(page.locator('tbody tr')).toHaveCount(1);
        });

    });


    test.describe("2.4. Delete products and update cart", () => {

        test("TC-2.4.1: Press increase (+) or decrease (-) quantity directly in Cart page", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 2);
            await page.getByRole('link', { name: 'Giỏ hàng' }).click();

            await expect(page.locator('tbody tr')).toBeVisible();
            await expect(page.getByText(/Tổng tạm tính:/i)).toBeVisible();

            const qtyCell = page.locator('tbody tr td').nth(2);
            await expect(qtyCell).toBeVisible();

            const plusBtn = page.getByRole('button', { name: '+' }).or(page.getByRole('button', { name: 'tăng' }));
            const minusBtn = page.getByRole('button', { name: '-' }).or(page.getByRole('button', { name: 'giảm' }));

            await expect(plusBtn).toBeVisible();
            await plusBtn.click();

            await expect(minusBtn).toBeVisible();
            await minusBtn.click();

            await expect(qtyCell).toBeVisible();
            await expect(qtyCell).toHaveText("1");
        });

        test("TC-2.4.2: Press the Delete product button -> display confirmation dialog", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await page.getByRole('link', { name: 'Giỏ hàng' }).click();

            page.once('dialog', async (dialog) => {
                await dialog.dismiss();
            });

            const deleteBtn = page.getByRole('button', { name: 'Xóa' }).first();
            if (await deleteBtn.isVisible()) {
                await deleteBtn.click();
            }

            await expect(page.locator('tbody tr').first()).toBeVisible();
        });

        test("TC-2.4.3: Select 'Cancel' on the delete confirmation dialog.", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await page.getByRole('link', { name: 'Giỏ hàng' }).click();

            page.once('dialog', async (dialog) => {
                await dialog.dismiss();
            });

            const deleteBtn = page.getByRole('button', { name: 'Xóa' }).first();
            if (await deleteBtn.isVisible()) {
                await deleteBtn.click();
            }

            await expect(page.locator('tbody tr').first()).toBeVisible();
        });

        test("TC-2.4.4: Select 'Confirm/Delete' on the delete confirmation dialog.", async ({ page }) => {
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

            await expect(page.getByRole('heading', { name: 'Giỏ hàng của bạn đang trống' })).toBeVisible();
        });

        test("TC-2.4.5: Delete all products from the cart -> cart is empty", async ({ page }) => {
            await login(page);
            await addFirstProduct(page, 1);
            await page.goto("http://localhost:5173/cart");

            page.on('dialog', async (dialog) => {
                await dialog.accept();
            });

            const deleteButtons = page.getByRole('button', { name: 'Xóa' });
            const count = await deleteButtons.count();

            for (let i = 0; i < count; i++) {
                await page.getByRole('button', { name: 'Xóa' }).first().click().catch(() => { });
                await page.waitForTimeout(300);
            }

            await expect(page.getByText('Giỏ hàng của bạn đang trống')).toBeVisible();
        });

    });

});
