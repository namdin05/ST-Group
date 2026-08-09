import { expect, type Page } from '@playwright/test';
import { env } from './config.js';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto(`${env.webUrl}/login`);
  }

  email() { return this.page.locator('input').nth(0); }
  password() { return this.page.locator('input').nth(1); }
  submit() { return this.page.getByRole('button', { name: 'Sign In' }); }

  async login(email: string, password: string) {
    await this.goto();
    await this.email().fill(email);
    await this.password().fill(password);
    const responsePromise = this.page.waitForResponse(r => r.url().endsWith('/api/login'));
    await this.submit().click();
    return responsePromise;
  }
}

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async login(email: string, password: string) {
    const response = await new LoginPage(this.page).login(email, password);
    expect(response.status()).toBe(200);
    await expect(this.page).toHaveURL(env.webUrl + '/');
  }

  async addProduct(index = 0) {
    await expect(this.page).toHaveURL(env.webUrl + '/');
    await this.page.getByRole('button', { name: 'Thêm vào giỏ' }).nth(index).click();
    await this.page.waitForTimeout(100);
  }

  async gotoCheckout() {
    await this.page.getByRole('link', { name: /Giỏ hàng/ }).click();
    await expect(this.page).toHaveURL(/\/cart$/);
    await expect(this.page.getByRole('button', { name: 'Tiến hành thanh toán' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();
    await expect(this.page).toHaveURL(/\/checkout$/);
  }

  amountInput() { return this.page.getByRole('spinbutton'); }
  confirm() { return this.page.getByRole('button', { name: 'Xác Nhận Thanh Toán' }); }
}

export class CategoryPage {
  constructor(private readonly page: Page) {}

  async loginAsAdmin(token?: string) {
    if (token) {
      await this.page.addInitScript(adminToken => localStorage.setItem('adminToken', adminToken), token);
    }
    await this.page.goto(env.adminUrl);
    const email = this.page.getByPlaceholder('Email');
    if (!token && await email.isVisible()) {
      await email.fill(env.admin.email);
      await this.page.getByPlaceholder('Password').fill(env.admin.password);
      await this.page.getByRole('button', { name: 'Login' }).click();
    }
    await this.page.getByText('Danh mục', { exact: true }).click();
    await expect(this.page.getByRole('heading', { name: 'Quản lý Danh mục' })).toBeVisible();
  }

  nameInput() { return this.page.getByPlaceholder('Tên danh mục mới'); }
  addButton() { return this.page.getByRole('button', { name: 'Thêm mới' }); }
  table() { return this.page.getByRole('table'); }
}
