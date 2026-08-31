import { expect, Page } from '@playwright/test';
import {
  accountServicesHeading,
  accountsHeading,
  loginButton,
  loginHeading,
  passwordInput,
  usernameInput,
  getConfig,
} from '../components/Helper';
import { getAccountOverviewData, getMessages } from '../utils/testData';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(): Promise<void> {
    const config = getConfig();
    await this.page.goto(config.url);
    await expect(this.page).toHaveTitle(config.loginPageTitle);
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
    await expect(this.page.getByText(getMessages().invalidCredentials, { exact: false })).toBeVisible();
  }

  async expectNoAuthenticatedAccount(): Promise<void> {
    const accountOverviewData = getAccountOverviewData();

    await expect(this.page.getByText(accountOverviewData.welcomeText)).not.toBeVisible();
    await expect(this.page.locator(accountServicesHeading)).not.toBeVisible();
    await expect(this.page.locator(accountsHeading)).not.toBeVisible();
    await expect(this.page.getByText(accountOverviewData.balanceText, { exact: false })).not.toBeVisible();
  }

  async expectLoginPageVisibleAfterLogout(): Promise<void> {
    const config = getConfig();
    const accountOverviewData = getAccountOverviewData();

    await expect(this.page).toHaveTitle(config.loginPageTitle);
    await expect(this.page.locator(loginHeading)).toBeVisible();
    await expect(this.page.getByText(accountOverviewData.welcomeText)).not.toBeVisible();
  }
}