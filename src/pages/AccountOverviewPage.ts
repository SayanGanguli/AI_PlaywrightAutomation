import { expect, Page } from '@playwright/test';
import {
  accountOverviewPageTitle,
  accountServicesHeading,
  accountTable,
  accountsHeading,
  accountsOverviewLink,
  balanceIncludesDepositsCell,
  balanceText,
  logoutLink,
  welcomeText,
} from '../components/Helper';

export class AccountOverviewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectOverviewVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/\/overview\.htm/);
    await expect(this.page).toHaveTitle(accountOverviewPageTitle);
    await expect(this.page.getByText(welcomeText)).toBeVisible();
    await expect(this.page.locator(accountServicesHeading)).toBeVisible();
    await expect(this.page.locator(accountsOverviewLink)).toBeVisible();
    await expect(this.page.locator(logoutLink)).toBeVisible();
    await expect(this.page.locator(accountsHeading)).toBeVisible();
    await expect(this.page.locator(accountTable)).toBeVisible();
    await expect(this.page.getByText(balanceText)).toBeVisible();
    await expect(this.page.locator(balanceIncludesDepositsCell)).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.page.locator(logoutLink).click();
  }
}
