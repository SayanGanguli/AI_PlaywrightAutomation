import dotenv from 'dotenv';

dotenv.config();

// Locators
export const loginHeading = 'h2:has-text("Customer Login")';
export const usernameInput = 'input[name="username"]';
export const passwordInput = 'input[name="password"]';
export const loginButton = 'input[type="submit"][value="Log In"]';
export const registerLink = 'a:has-text("Register")';

export const registrationHeading = 'h1:has-text("Signing up is easy!")';
export const registrationForm = 'form[action*="register.htm"]';
export const registrationSubmit = `${registrationForm} input[type="submit"][value="Register"]`;
export const registrationFirstNameInput = '#customer\\.firstName';
export const registrationLastNameInput = '#customer\\.lastName';
export const registrationStreetInput = '#customer\\.address\\.street';
export const registrationCityInput = '#customer\\.address\\.city';
export const registrationStateInput = '#customer\\.address\\.state';
export const registrationZipCodeInput = '#customer\\.address\\.zipCode';
export const registrationPhoneInput = '#customer\\.phoneNumber';
export const registrationSsnInput = '#customer\\.ssn';
export const registrationUsernameInput = '#customer\\.username';
export const registrationPasswordInput = '#customer\\.password';
export const registrationConfirmationInput = '#repeatedPassword';

export const accountsHeading = 'h1:has-text("Accounts Overview")';
export const accountServicesHeading = 'h2:has-text("Account Services")';
export const accountsOverviewLink = 'a:has-text("Accounts Overview")';
export const logoutLink = 'a:has-text("Log Out")';
export const accountTable = 'table';
export const balanceIncludesDepositsCell = 'td:has-text("*Balance includes deposits")';

// Environment variables
export const getConfig = () => ({
  url: process.env.PARABANK_URL || 'https://parabank.parasoft.com/parabank/index.htm',
  validUsername: process.env.PARABANK_USERNAME || 'john',
  validPassword: process.env.PARABANK_PASSWORD || 'demo',
  invalidUsername: process.env.PARABANK_INVALID_USERNAME || 'invalid-user',
  invalidPassword: process.env.PARABANK_INVALID_PASSWORD || 'invalid-password',
  loginPageTitle: process.env.PARABANK_LOGIN_PAGE_TITLE || 'ParaBank | Welcome | Online Banking',
  accountOverviewTitle: process.env.PARABANK_ACCOUNT_OVERVIEW_TITLE || 'ParaBank | Accounts Overview',
  registrationPageTitle: process.env.PARABANK_REGISTRATION_PAGE_TITLE || 'ParaBank | Register for Free Online Account Access',
  browserName: process.env.BROWSER_NAME || 'chromium',
  browserMode: process.env.BROWSER_MODE || 'maximize',
  duplicateUsername: process.env.PARABANK_DUPLICATE_USERNAME || 'john',
});
