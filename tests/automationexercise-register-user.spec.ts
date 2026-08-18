import { test } from '@playwright/test';
import { createUserData } from '../src/test-data/userData';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';
import { SignupPage } from '../src/pages/SignUpPage';
import { AccountCreatedPage } from '../src/pages/AccountCreatedPage';
import { AccountDeletedPage } from '../src/pages/AccountDeletedPage';

test('AutomationExercise Test Case 1 - Register User', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const signupPage = new SignupPage(page);
  const accountCreatedPage = new AccountCreatedPage(page);
  const accountDeletedPage = new AccountDeletedPage(page);

  const userData = createUserData();

  await homePage.navigateToHomePage();
  await homePage.clickSignupLogin();

  await loginPage.signupNewUser(userData.name, userData.email);

  await signupPage.expectAccountInformationVisible();

  await signupPage.selectTitle('Mr.');

  await signupPage.fillAccountDetails({
    password: userData.password,
    day: userData.day,
    month: userData.month,
    year: userData.year,
    firstName: userData.firstName,
    lastName: userData.lastName,
    company: userData.company,
    address: userData.address,
    country: userData.country,
    state: userData.state,
    city: userData.city,
    zipcode: userData.zipcode,
    mobileNumber: userData.mobileNumber,
  });

  await accountCreatedPage.expectAccountCreated();
  await accountCreatedPage.clickContinue();

  await homePage.expectLoggedInUser(userData.name);
  await homePage.clickDeleteAccount();

  await accountDeletedPage.expectAccountDeleted();
  await accountDeletedPage.clickContinue();
});