import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import {
  loginHeading,
  usernameInput,
  passwordInput,
  loginButton,
  accountServicesHeading,
  accountsHeading,
  getConfig,
} from '../components/Helper';
import { getAccountOverviewData, getMessages } from '../utils/testData';

export class LoginPage extends BasePage {
  async open(): Promise<void> {
    const config = getConfig();
    await this.navigateTo(config.url);
    await expect(this.page).toHaveTitle(config.loginPageTitle);
    await expect(this.factory.getLocator('selector', loginHeading)).toBeVisible();
    await expect(this.factory.getLocator('selector', usernameInput)).toBeVisible();
    await expect(this.factory.getLocator('selector', passwordInput)).toBeVisible();
    await expect(this.factory.getLocator('selector', loginButton)).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    const usernameField = this.factory.getLocator('selector', usernameInput);
    const passwordField = this.factory.getLocator('selector', passwordInput);

    await usernameField.fill(username);
    await passwordField.fill(password);

    await expect(usernameField).toHaveValue(username);
    await expect(passwordField).toHaveValue(password);
    await this.factory.getLocator('selector', loginButton).click();
  }

  async loginWithInvalidCredentials(username: string, password: string): Promise<void> {
    await this.login(username, password);
    await expect(this.factory.getLocator('text', getMessages().invalidCredentials, { exact: false })).toBeVisible();
  }

  async expectNoAuthenticatedAccount(): Promise<void> {
    const accountOverviewData = getAccountOverviewData();

    await expect(this.factory.getLocator('text', accountOverviewData.welcomeText)).not.toBeVisible();
    await expect(this.factory.getLocator('selector', accountServicesHeading)).not.toBeVisible();
    await expect(this.factory.getLocator('selector', accountsHeading)).not.toBeVisible();
    await expect(this.factory.getLocator('text', accountOverviewData.balanceText, { exact: false })).not.toBeVisible();
  }

  async expectLoginPageVisibleAfterLogout(): Promise<void> {
    const config = getConfig();
    const accountOverviewData = getAccountOverviewData();

    await expect(this.page).toHaveTitle(config.loginPageTitle);
    await expect(this.factory.getLocator('selector', loginHeading)).toBeVisible();
    await expect(this.factory.getLocator('text', accountOverviewData.welcomeText)).not.toBeVisible();
  }
}