import dotenv from 'dotenv';

dotenv.config();

// Locators
export const loginHeading = 'h2:has-text("Customer Login")';
export const usernameInput = 'input[name="username"]';
export const passwordInput = 'input[name="password"]';
export const loginButton = 'input[type="submit"][value="Log In"]';

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
  browserName: process.env.BROWSER_NAME || 'chromium',
  browserMode: process.env.BROWSER_MODE || 'maximize',
});
