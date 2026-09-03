import { expect, test } from '@playwright/test';
import { getConfig } from '../../src/components/Helper';
import { SignUpPage } from '../../src/pages/SignUpPage';

test.describe('ParaBank Registration', () => {
  test('TC001 - registration page is reachable from the landing page', async ({ page }) => {
    const config = getConfig();
    const signUpPage = new SignUpPage(page);

    await page.goto(config.url);
    await expect(page).toHaveTitle(config.loginPageTitle);
    await signUpPage.open();
    await signUpPage.expectRegistrationPage();
  });

  test('TC002 - valid registration creates a new account', async () => {
    test.fail(true, 'Blocked: the approved plan does not define a verified registration success state.');
  });
})