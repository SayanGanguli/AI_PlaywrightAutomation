# ParaBank Login and Account Overview Test Plan

## Application Overview

Functional coverage for the ParaBank customer login flow and the authenticated Accounts Overview page. Each test starts from a fresh browser context at https://parabank.parasoft.com/parabank/index.htm. The positive case uses the observed demo credentials john/demo. The negative case uses invalid credentials and must confirm that authentication is rejected and account data remains protected.

## Test Scenarios

### 1. ParaBank Authentication and Account Overview

**Seed:** `tests/google.spec.ts`

#### 1.1. Positive login displays the account overview

**File:** `tests/parabank-login-account-overview/positive-login-displays-account-overview.spec.ts`

**Steps:**
  1. Open https://parabank.parasoft.com/parabank/index.htm in a fresh browser context.
    - expect: The page title is ParaBank | Welcome | Online Banking.
    - expect: The Customer Login section is visible with username and password fields and a Log In button.
  2. Enter john in the username field and demo in the password field.
    - expect: The username and password fields contain the supplied values.
    - expect: No validation error is displayed before submission.
  3. Click Log In.
    - expect: The browser navigates to the ParaBank account overview page at overview.htm.
    - expect: The page title is ParaBank | Accounts Overview.
    - expect: Welcome John Smith is displayed.
    - expect: The Account Services navigation is visible, including Accounts Overview and Log Out.
  4. Inspect the Accounts Overview table.
    - expect: The table contains Account, Balance*, and Available Amount columns.
    - expect: Accounts 13344 and 14232 are listed.
    - expect: A Total row is displayed with the account total balance.
    - expect: The balance disclaimer is displayed.
    - expect: No error message or blank account state is shown.
  5. Click Log Out and verify the post-logout state.
    - expect: The user returns to the public login page.
    - expect: The Customer Login form is visible.
    - expect: Authenticated account-service links and account balances are no longer accessible from the logged-out page.

#### 1.2. Negative login rejects invalid credentials and protects account data

**File:** `tests/parabank-login-account-overview/negative-login-rejects-invalid-credentials.spec.ts`

**Steps:**
  1. Open https://parabank.parasoft.com/parabank/index.htm in a fresh browser context.
    - expect: The public ParaBank login page is displayed.
    - expect: The Customer Login section is visible.
  2. Enter invalid-user in the username field and invalid-password in the password field.
    - expect: The username and password fields contain invalid values.
  3. Click Log In.
    - expect: Authentication is rejected.
    - expect: The user remains on the login page or is returned to it.
    - expect: A clear authentication error is displayed, such as Invalid username or password.
    - expect: The user is not redirected to overview.htm.
  4. Verify that authenticated account content is unavailable.
    - expect: Welcome John Smith is not displayed.
    - expect: Account Services links are not displayed.
    - expect: The Accounts Overview table and account balances are not displayed.
    - expect: The user cannot access account data without valid authentication.
  5. Record the result if the application redirects to overview.htm or exposes account data.
    - expect: The test is marked failed because invalid credentials were accepted or an authenticated session was reused.
    - expect: The failure includes the final URL, visible user identity, and any exposed account information for defect investigation.
