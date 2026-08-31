import { test } from '@playwright/test';
import { validPassword, validUsername } from '../../src/components/Helper';
import { AccountOverviewPage } from '../../src/pages/AccountOverviewPage';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('ParaBank Authentication and Account Overview', () => {
  test('Positive login displays the account overview', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountOverviewPage = new AccountOverviewPage(page);

    await loginPage.open();
    await loginPage.login(validUsername, validPassword);
    await accountOverviewPage.expectOverviewVisible();
    await accountOverviewPage.logout();
    await loginPage.expectLoginPageVisibleAfterLogout();
  });
});
