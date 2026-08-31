import { expect, Page } from '@playwright/test';
import {
  accountServicesHeading,
  accountTable,
  accountsHeading,
  accountsOverviewLink,
  balanceIncludesDepositsCell,
  logoutLink,
  getConfig,
} from '../components/Helper';
import { getAccountOverviewData } from '../utils/testData';

export class AccountOverviewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectOverviewVisible(): Promise<void> {
    const config = getConfig();
    const accountOverviewData = getAccountOverviewData();

    await expect(this.page).toHaveURL(/\/overview\.htm/);
    await expect(this.page).toHaveTitle(config.accountOverviewTitle);
    await expect(this.page.getByText(accountOverviewData.welcomeText)).toBeVisible();
    await expect(this.page.locator(accountServicesHeading)).toBeVisible();
    await expect(this.page.locator(accountsOverviewLink)).toBeVisible();
    await expect(this.page.locator(logoutLink)).toBeVisible();
    await expect(this.page.locator(accountsHeading)).toBeVisible();
    await expect(this.page.locator(accountTable)).toBeVisible();
    // Use first() to get the first balance amount in the table
    await expect(this.page.getByText(accountOverviewData.balanceText, { exact: false }).first()).toBeVisible();
    await expect(this.page.locator(balanceIncludesDepositsCell)).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.page.locator(logoutLink).click();
  }
}
