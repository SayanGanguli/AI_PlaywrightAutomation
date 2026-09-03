# Test Plan: Registration Workflow

## Application Overview

ParaBank registration starts from the Register link on index.htm and opens register.htm, titled 'ParaBank | Register for Free Online Account Access'. The registration POST form contains first name, last name, street address, city, state, ZIP code, optional phone number, SSN, username, password, repeated password, and a Register submit control. Empty submission visibly returns required messages for all fields except phone. A complete submission with mismatched passwords returns 'Passwords did not match.' A duplicate username returns 'This username already exists.' A successful registration destination and exact success message could not be verified because the live environment reported the generated test usernames as existing; this is explicitly marked UNKNOWN in the plan.

## Test Scenarios

### 1. parabank-registration


#### 1.1. registration page is reachable from the landing page

**File:** `tests/parabank-registration/registration-entry-point.spec.ts`

**Steps:**
  1. Open the configured ParaBank URL.
    - expect: The page title is 'ParaBank | Welcome | Online Banking'.
  2. Click the 'Register' link.
    - expect: The URL contains /register.htm.
    - expect: The page title is 'ParaBank | Register for Free Online Account Access'.
    - expect: The 'Signing up is easy!' heading is visible.
    - expect: The registration fields and Register control are visible.

#### 1.2. valid registration creates a new account

**File:** `tests/parabank-registration/positive-registration-creates-account.spec.ts`

**Steps:**
  1. Open the registration page through the Register link.
    - expect: The registration form is displayed.
  2. Generate a unique username and provide valid values for first name, last name, street, city, state, ZIP, SSN, password, and matching confirmation; phone may be omitted because it was observed as optional.
    - expect: All submitted values are accepted by the form.
  3. Click Register.
    - expect: UNKNOWN: The exact success message, URL, authenticated state, and post-registration navigation could not be verified against the live environment. Confirm the expected successful destination before implementation.