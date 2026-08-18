import { BasePage } from './BasePage';

export class AccountDeletedPage extends BasePage {
  async expectAccountDeleted(): Promise<void> {
    await this.expectText(
      'selector',
      'h2.title',
      'Account Deleted!',
    );
  }

  async clickContinue(): Promise<void> {
    await this.clickElement(
      'selector',
      'a[data-qa="continue-button"]',
    );
  }
}