import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { getConfig } from '../../src/components/Helper';

test.describe('ParaBank Authentication and Account Overview', () => {
  test('Negative login rejects invalid credentials and protects account data', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { invalidUsername, invalidPassword } = getConfig();

    await loginPage.open();
    await loginPage.loginWithInvalidCredentials(invalidUsername, invalidPassword);
    await loginPage.expectNoAuthenticatedAccount();
  });
});
