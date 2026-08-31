import { test } from '@playwright/test';
import { invalidPassword, invalidUsername } from '../../src/components/Helper';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('ParaBank Authentication and Account Overview', () => {
  test('Negative login rejects invalid credentials and protects account data', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.loginWithInvalidCredentials(invalidUsername, invalidPassword);
    await loginPage.expectNoAuthenticatedAccount();
  });
});
