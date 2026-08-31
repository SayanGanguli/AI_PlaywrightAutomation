import 'dotenv/config';

export const loginPageUrl = process.env.PARABANK_URL ?? 'https://parabank.parasoft.com/parabank/index.htm';
export const loginHeading = 'h1:has-text("Customer Login")';
export const usernameInput = 'input[name="username"]';
export const passwordInput = 'input[name="password"]';
export const loginButton = 'button:has-text("Log In")';
export const invalidCredentialsMessage = /invalid username or password/i;
export const loginPageTitle = 'ParaBank | Welcome | Online Banking';

export const accountOverviewPageTitle = 'ParaBank | Accounts Overview';
export const welcomeText = 'Welcome John Smith';
export const accountsHeading = 'h1:has-text("Accounts Overview")';
export const accountServicesHeading = 'h1:has-text("Account Services")';
export const accountsOverviewLink = 'a:has-text("Accounts Overview")';
export const logoutLink = 'a:has-text("Log Out")';
export const accountTable = 'table';
export const balanceText = '$5022.93';
export const balanceIncludesDepositsCell = 'td:has-text("*Balance includes deposits")';

export const validUsername = process.env.PARABANK_USERNAME ?? 'john';
export const validPassword = process.env.PARABANK_PASSWORD ?? 'demo';
export const invalidUsername = process.env.PARABANK_INVALID_USERNAME ?? 'invalid-user';
export const invalidPassword = process.env.PARABANK_INVALID_PASSWORD ?? 'invalid-password';
