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

  test('TC003 - empty registration shows required-field validation', async ({ page }) => {
    const signUpPage = new SignUpPage(page);

    await signUpPage.open();
    await signUpPage.submit();
    await signUpPage.expectRegistrationPage();
    await signUpPage.expectRequiredFieldErrors();
  });

  test('TC004 - registration rejects password confirmation mismatch', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    const registrationData = SignUpPage.createUniqueRegistrationData();

    await signUpPage.open();
    await signUpPage.fillRegistration({
      ...registrationData,
      confirmation: `${registrationData.password}-mismatch`,
    });
    await signUpPage.submit();
    await signUpPage.expectRegistrationPage();
    await signUpPage.expectPasswordMismatchError();
  });

  test('TC005 - registration rejects duplicate username', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    const registrationData = SignUpPage.createUniqueRegistrationData();
    const { duplicateUsername } = getConfig();

    await signUpPage.open();
    await signUpPage.fillRegistration({
      ...registrationData,
      username: duplicateUsername,
    });
    await signUpPage.submit();
    await signUpPage.expectRegistrationPage();
    await signUpPage.expectDuplicateUsernameError();
  });

  test('TC006 - registration validates individual field inputs', async () => {
    test.fail(true, 'Blocked: the approved plan does not define verified field-format or boundary outcomes.');
  });

  test('TC007 - registration remains on the form after a validation error', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    const registrationData = SignUpPage.createUniqueRegistrationData();

    await signUpPage.open();
    await signUpPage.fillRegistration({
      ...registrationData,
      confirmation: `${registrationData.password}-mismatch`,
    });
    await signUpPage.submit();
    await signUpPage.expectRegistrationPage();
    await signUpPage.expectPasswordMismatchError();
  });

  test('TC008 - registration navigation returns to login entry', async () => {
    test.fail(true, 'Blocked: the approved plan does not define verified home-navigation behavior.');
  });
});