import { expect, Page } from '@playwright/test';
import {
  accountOverviewPageTitle,
  accountServicesHeading,
  accountsHeading,
  balanceText,
  invalidCredentialsMessage,
  loginButton,
  loginHeading,
  loginPageTitle,
  loginPageUrl,
  passwordInput,
  usernameInput,
  welcomeText,
} from '../components/Helper';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(): Promise<void> {
    await this.page.goto(loginPageUrl);
    await expect(this.page).toHaveTitle(loginPageTitle);
    await expect(this.page.locator(loginHeading)).toBeVisible();
    await expect(this.page.locator(usernameInput)).toBeVisible();
    await expect(this.page.locator(passwordInput)).toBeVisible();
    await expect(this.page.locator(loginButton)).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    const usernameField = this.page.locator(usernameInput);
    const passwordField = this.page.locator(passwordInput);

    await usernameField.fill(username);
    await passwordField.fill(password);

    await expect(usernameField).toHaveValue(username);
    await expect(passwordField).toHaveValue(password);
    await this.page.locator(loginButton).click();
  }

  async loginWithInvalidCredentials(username: string, password: string): Promise<void> {
    await this.login(username, password);
    await expect(this.page.getByText(invalidCredentialsMessage)).toBeVisible();
  }

  async expectNoAuthenticatedAccount(): Promise<void> {
    await expect(this.page.getByText(welcomeText)).not.toBeVisible();
    await expect(this.page.locator(accountServicesHeading)).not.toBeVisible();
    await expect(this.page.locator(accountsHeading)).not.toBeVisible();
    await expect(this.page.getByText(balanceText)).not.toBeVisible();
  }

  async expectLoginPageVisibleAfterLogout(): Promise<void> {
    await expect(this.page).toHaveTitle(loginPageTitle);
    await expect(this.page.locator(loginHeading)).toBeVisible();
    await expect(this.page.getByText(welcomeText)).not.toBeVisible();
  }
}