# Test Plan: Registration Workflow

## Application Overview

ParaBank registration is available from the landing page through the **Register** link and opens the registration page at `/register.htm`.

The registration form supports the required user details, username, password, and password confirmation.

Registration test data must be reused from:

`src/test-data/test-data.json`

The username must be generated dynamically at runtime using the format:

`TestAuto<random two digit number>`

Example: `TestAuto42`

## Test Scenarios

### 1. parabank-registration

#### 1.1. valid registration creates a new account

**File:** `tests/parabank-registration/valid-registration-creates-account.spec.ts`

**Steps:**

1. Open the configured ParaBank URL and navigate to the registration page through the **Register** link.
   - **expect:** The registration page is displayed and the registration form is visible.

2. Use the existing registration data from `src/test-data/test-data.json`.
   - **expect:** The existing framework test data is reused; registration values are not duplicated in the test.

3. Generate a unique username using the format `TestAuto<random two digit number>`.
   - **expect:** The generated username matches `^TestAuto\d{2}$`.

4. Complete the registration form using the existing test data and generated username.
   - **expect:** All required fields are populated and the password confirmation matches the password.

5. Submit the registration form.
   - **expect:** The registration is successfully submitted and the application reaches the successful registration state.

6. Verify the successful registration result using the existing framework/page-object conventions.
   - **expect:** The expected successful registration confirmation or destination is displayed.

## Implementation Constraints

- Only **one test case** should be implemented for registration.
- Do not create separate negative, validation, duplicate-username, or entry-point test cases.
- Reuse `src/test-data/test-data.json`; do not duplicate its values in the spec.
- Generate the username dynamically as `TestAuto<random two digit number>`.
- Reuse existing Page Objects, fixtures, utilities, locators, and framework patterns.
- Do not introduce duplicate framework components.
- Preserve the existing project structure and coding style.
- Keep the implementation minimal and isolated to the valid registration scenario.
