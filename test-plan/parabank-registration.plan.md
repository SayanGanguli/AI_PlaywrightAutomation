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

#### 1.3. empty registration shows required-field validation

**File:** `tests/parabank-registration/negative-registration-required-fields.spec.ts`

**Steps:**
  1. Open the registration page and click Register without entering data.
    - expect: The page remains on register.htm.
    - expect: First name shows 'First name is required.'.
    - expect: Last name shows 'Last name is required.'.
    - expect: Address shows 'Address is required.'.
    - expect: City shows 'City is required.'.
    - expect: State shows 'State is required.'.
    - expect: ZIP shows 'Zip Code is required.'.
    - expect: SSN shows 'Social Security Number is required.'.
    - expect: Username shows 'Username is required.'.
    - expect: Password shows 'Password is required.'.
    - expect: Confirm shows 'Password confirmation is required.'.
    - expect: Phone has no required message.

#### 1.4. registration rejects password confirmation mismatch

**File:** `tests/parabank-registration/negative-registration-password-mismatch.spec.ts`

**Steps:**
  1. Open the registration page and fill all required fields with otherwise valid values, using different values for Password and Confirm.
    - expect: The form contains the supplied values.
  2. Click Register.
    - expect: The page remains on register.htm.
    - expect: The confirmation field displays 'Passwords did not match.'.
    - expect: Registration does not proceed to a success state.

#### 1.5. registration rejects duplicate username

**File:** `tests/parabank-registration/negative-registration-duplicate-user.spec.ts`

**Steps:**
  1. Open the registration page and fill all required fields with valid values using a username known to already exist.
    - expect: The form contains the supplied values.
  2. Click Register.
    - expect: The page remains on register.htm.
    - expect: The username field displays 'This username already exists.'.
    - expect: Registration does not proceed to a success state.

#### 1.6. registration validates individual field inputs

**File:** `tests/parabank-registration/negative-registration-invalid-input.spec.ts`

**Steps:**
  1. Submit values with invalid formats or characters for ZIP, phone, SSN, username, first name, last name, address, city, or state, while supplying valid values for all other fields.
    - expect: UNKNOWN: No field-level format validation messages or constraints were observed in the live DOM for these fields. Confirm which invalid formats the application is expected to reject and the exact messages before implementation.
  2. Submit boundary-length values for text fields and password.
    - expect: UNKNOWN: No minlength, maxlength, or pattern constraints were exposed by the live form. Confirm supported boundaries and expected outcomes before implementation.

#### 1.7. registration preserves form state after validation error

**File:** `tests/parabank-registration/registration-error-state.spec.ts`

**Steps:**
  1. Fill the registration form and submit with a mismatched password confirmation or duplicate username.
    - expect: The page remains on register.htm.
    - expect: The relevant error is shown.
    - expect: UNKNOWN: Persistence or clearing of each previously entered field after the server response should be confirmed before asserting it.
  2. Correct the invalid value and resubmit.
    - expect: UNKNOWN: Successful transition after correction could not be verified because the live environment did not permit a known-new username.

#### 1.8. registration navigation returns to login entry

**File:** `tests/parabank-registration/registration-navigation.spec.ts`

**Steps:**
  1. Open registration through the landing-page Register link, then use the visible ParaBank or Home navigation link.
    - expect: UNKNOWN: The expected navigation target and whether entered registration state is discarded were not exercised during discovery. Confirm the intended navigation behavior before implementation.
