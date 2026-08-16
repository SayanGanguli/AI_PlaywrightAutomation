import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    async signupNewUser(name: string, email: string): Promise<void> {
        await this.enterText('selector', 'input[data-qa="signup-name"]', name);
        await this.enterText('selector', 'input[data-qa="signup-email"]', email);
        await this.clickElement('selector', 'button[data-qa="signup-button"]');
    }
}