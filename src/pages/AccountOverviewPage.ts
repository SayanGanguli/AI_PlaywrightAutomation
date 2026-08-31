import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import {
  accountServicesHeading,
  accountsHeading,
  accountsOverviewLink,
  logoutLink,
  accountTable,
  balanceIncludesDepositsCell,
  getConfig,
} from '../components/Helper';
import { getAccountOverviewData } from '../utils/testData';

export class AccountOverviewPage extends BasePage {
  async expectOverviewVisible(): Promise<void> {
    const config = getConfig();
    const accountOverviewData = getAccountOverviewData();

    // Wait for page to load completely
    await this.page.waitForLoadState('networkidle');

    await expect(this.page).toHaveURL(/\/overview\.htm/);
    await expect(this.page).toHaveTitle(config.accountOverviewTitle);
    await expect(this.factory.getLocator('text', accountOverviewData.welcomeText)).toBeVisible();
    await expect(this.factory.getLocator('selector', accountServicesHeading)).toBeVisible();
    await expect(this.factory.getLocator('selector', accountsOverviewLink)).toBeVisible();
    await expect(this.factory.getLocator('selector', logoutLink)).toBeVisible();
    await expect(this.factory.getLocator('selector', accountsHeading)).toBeVisible();
    await expect(this.factory.getLocator('selector', accountTable)).toBeVisible();
    // Use first() to get the first balance amount in the table with explicit wait
    await expect(this.factory.getLocator('text', accountOverviewData.balanceText, { exact: false }).first()).toBeVisible({ timeout: 10000 });
    await expect(this.factory.getLocator('selector', balanceIncludesDepositsCell)).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.factory.getLocator('selector', logoutLink).click();
  }
}
