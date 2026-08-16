import { BasePage } from './BasePage';

export class AccountCreatedPage extends BasePage {
  async expectAccountCreated(): Promise<void> {
    await this.expectText(
      'selector',
      'h2.title',
      'Account Created!',
    );
  }

  async clickContinue(): Promise<void> {
    await this.clickElement(
      'selector',
      'a[data-qa="continue-button"]',
    );
  }
}