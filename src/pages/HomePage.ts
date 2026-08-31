import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  public async navigateToHomePage(): Promise<void> {
    await this.navigateTo('/');
  }

  public async clickSignupLogin(): Promise<void> {
    await this.clickElement('selector', 'a[href="/login"]');
  }

  public async expectLoggedInUser(userName: string): Promise<void> {
  await this.expectText(
    'selector',
    'a:has-text("Logged in as")',
    `Logged in as ${userName}`,
  );
}

  public async clickDeleteAccount(): Promise<void> {
    await this.clickElement(
      'selector',
      'a[href="/delete_account"]',
    );
  }
}