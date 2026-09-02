# AGENTS.md

## Project

This repository is an enterprise-level AI-assisted Playwright automation framework built with TypeScript and Playwright Test.

The framework uses the following AI automation flow:

```text
Requirement
    ↓
Planner
    ↓
Implementer
    ↓
Generator
    ↓
Playwright Test
    ↓
Healer
```

---

## Agent Responsibilities

### 1. Planner

Convert the user's natural-language requirement into a structured test plan.

Planner artifacts must be created under:

```text
test-plan/
```

The Planner must not directly implement executable tests.

---

### 2. Implementer

Convert the approved test plan into executable Playwright tests.

Before creating code:

* Inspect the existing repository.
* Reuse existing page objects, flows, fixtures, utilities, and test data.
* Do not create duplicate functionality.
* Follow existing project conventions.

Executable tests belong under:

```text
tests/
```

---

### 3. Generator

Generate missing supporting artifacts required by the implementation.

Possible artifacts include:

* Page Objects
* Components
* Test Data
* Fixtures
* Flows
* Utilities

Before generating anything, check whether an equivalent artifact already exists.

---

### 4. Healer

Analyze failed tests and fix the root cause when the failure is caused by automation.

The Healer may address:

* Locator failures
* Strict-mode violations
* Timeouts
* Changed selectors
* Navigation issues
* Test-data problems

The Healer must:

* Preserve the original test intent.
* Make the smallest safe change.
* Re-run the affected test.
* Never weaken assertions just to make a test pass.
* Never hide genuine application defects.

---

## Architecture

Use the following responsibilities:

```text
tests/          → Executable Playwright tests
test-plan/      → Planner artifacts
src/pages/      → Page Objects
src/components/ → Reusable UI components
src/flows/      → Business workflows
src/data/       → Test data and factories
src/fixtures/   → Playwright fixtures
src/types/      → TypeScript types/interfaces
src/utils/      → Generic utilities
src/managers/   → Framework managers
```

---

## Coding Rules

* Use TypeScript.
* Use Playwright Test.
* Prefer stable Playwright locators.
* Prefer function getLocator() from src\utils\LocatorFactory.ts
* Avoid brittle selectors.
* Avoid unnecessary `page.waitForTimeout()`.
* Use Playwright's built-in waiting mechanisms.
* Use meaningful assertions.
* Avoid `any` unless justified.
* Keep files focused on a single responsibility.

---

## Reuse Before Create

Before creating a new file, class, method, locator, utility, fixture, or flow:

```text
Search existing code
       ↓
Already exists?
   ↓          ↓
  YES         NO
   ↓           ↓
 Reuse      Create
```

Do not create duplicate implementations.

---

## Test Data

Dynamic test data should be generated through reusable factories where appropriate.

For registration tests, credentials created during registration must be reused for the subsequent login validation.

---

## Naming Conventions
* Files  ---> Use descriptive names:

Examples:

LoginPage.ts
RegistrationPage.ts
AuthenticationFlow.ts
UserFactory.ts
ConfigReader.ts

* Classes ---> Use PascalCase:

LoginPage
RegistrationPage
AuthenticationFlow

* Methods ---> Use camelCase:

login()
registerUser()
verifyAccountCreated()

* Variables ---> Use camelCase:

loginPage
registrationPage
userData

* Constants ---> Use descriptive names:

Example:

DEFAULT_TIMEOUT
BASE_URL

---

## Failure Handling

When a test fails:

```text
Failure
  ↓
Understand error
  ↓
Identify root cause
  ↓
Fix automation if appropriate
  ↓
Re-run test
  ↓
Verify
```

Do not modify the test simply to make it pass.

If the failure indicates an actual application defect, keep the test failure and report the defect.

---

## Git

Do not commit:

```text
node_modules/
.env
.env.*
test-results/
playwright-report/
```

unless explicitly required.

Use meaningful commit messages such as:

```text
feat: add registration automation
fix: resolve registration locator
test: add login validation
refactor: improve authentication flow
docs: update framework documentation
```

---

## Definition of Done

A task is complete when:

1. The implementation follows the test plan.
2. Existing framework components are reused.
3. No unnecessary duplicate code is introduced.
4. Tests pass.
5. TypeScript checks pass.
6. The original business requirement is validated.
7. Only intended files are modified.

## Golden Rule

> Plan first. Reuse existing code. Implement cleanly. Generate only what is needed. Heal failures without hiding defects.
