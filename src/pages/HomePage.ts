import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  public async navigateToHomePage(): Promise<void> {
    await this.navigateTo('/');
  }

  public async clickSignupLogin(): Promise<void> {
    await this.clickElement('selector', 'a[href="/login"]');
  }
}