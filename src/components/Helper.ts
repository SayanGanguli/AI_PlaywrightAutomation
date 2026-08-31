import 'dotenv/config';

export const loginPageUrl = process.env.PARABANK_URL ?? 'https://parabank.parasoft.com';
export const loginHeading = 'h2:has-text("Customer Login")';
export const usernameInput = 'input[name="username"]';
export const passwordInput = 'input[name="password"]';
export const loginButton = 'input[type="submit"][value="Log In"]';
export const invalidCredentialsMessage: RegExp = /invalid username or password/i;
export const loginPageTitle = 'ParaBank | Welcome | Online Banking';

export const accountOverviewPageTitle = 'ParaBank | Accounts Overview';
export const welcomeText = 'Welcome John Smith';
export const accountsHeading = 'h1:has-text("Accounts Overview")';
export const accountServicesHeading = 'h1:has-text("Account Services")';
export const accountsOverviewLink = 'a:has-text("Accounts Overview")';
export const logoutLink = 'a:has-text("Log Out")';
export const accountTable = 'table';
export const balanceText = /\$5022\.93/;
export const balanceIncludesDepositsCell = 'td:has-text("*Balance includes deposits")';

export const validUsername = process.env.PARABANK_USERNAME ?? 'john';
export const validPassword = process.env.PARABANK_PASSWORD ?? 'demo';
export const invalidUsername = process.env.PARABANK_INVALID_USERNAME ?? 'invalid-user';
export const invalidPassword = process.env.PARABANK_INVALID_PASSWORD ?? 'invalid-pass';
