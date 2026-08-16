import { test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';
import { SignupPage } from '../src/pages/SignUpPage';
import { AccountCreatedPage } from '../src/pages/AccountCreatedPage';

test('AutomationExercise Test Case 1 - Register User', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);

    const uniqueEmail = `qa.user.${Date.now()}@mailinator.com`;

    await homePage.navigateToHomePage();
    await homePage.clickSignupLogin();

    await loginPage.signupNewUser('QA User', uniqueEmail);

    await signupPage.expectAccountInformationVisible();
    await signupPage.selectTitle('Mr.');

    await signupPage.fillAccountDetails({
        password: 'Test@1234',
        day: '1',
        month: 'January',
        year: '1990',
        firstName: 'QA',
        lastName: 'User',
        company: 'Automation',
        address: '123 Main Street',
        country: 'India',
        state: 'California',
        city: 'Los Angeles',
        zipcode: '90001',
        mobileNumber: '1234567890',
    });

    await accountCreatedPage.expectAccountCreated();
    await accountCreatedPage.clickContinue();
});