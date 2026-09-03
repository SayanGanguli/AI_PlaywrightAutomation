import { expect, test } from '@playwright/test';
import { registrationUsernameInput } from '../../src/components/Helper';
import { SignUpPage, RegistrationData } from '../../src/pages/SignUpPage';
import { getRegistrationData } from '../../src/utils/testData';

test.describe('parabank-registration', () => {
  test('TC01 - valid registration creates a new account', { tag: ['@registration', '@positive'] }, async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    const registrationData = getRegistrationData();
    const username = `TestAuto${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`;
    const registration: RegistrationData = {
      ...registrationData,
      username,
      confirmation: registrationData.password,
    };

    // 1. Open the configured ParaBank URL and navigate to the registration page through the Register link.
    await signUpPage.open();

    // 2. Use the existing registration data from src/test-data/test-data.json.
    // 3. Generate a random two digit number and create the username using the format TestAuto<random two digit number>.
    expect(username).toMatch(/^TestAuto\d{2}$/);

    // 4. Complete the registration form using the existing test data and generated username.
    await signUpPage.fillRegistration(registration);
    await expect(page.locator(registrationUsernameInput)).toHaveValue(username);

    // 5. Submit the registration form.
    await signUpPage.submit();

    // 6. Verify the successful registration result using the observed application state.
    await expect(page).toHaveTitle('ParaBank | Customer Created');
    await expect(page.getByRole('heading', { name: `Welcome ${username}` })).toBeVisible();
    await expect(page.getByText('Your account was created successfully. You are now logged in.')).toBeVisible();
  });
});
