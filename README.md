# AI Playwright Automation

Enterprise-grade browser automation framework built with Playwright and TypeScript for validating critical web application workflows with speed, reliability, and maintainability.

## Overview

This repository provides a scalable automation foundation for end-to-end testing of customer-facing web experiences. The current implementation targets the ParaBank application and covers login and account overview validation flows, using a structured Page Object Model, reusable fixtures, and accessible locator strategies.

The project is designed for:

- Reliable regression coverage across major browsers
- Clean separation of test logic, page interactions, and test data
- Reusability for future application workflows
- CI-friendly execution and reporting
- Maintainable automation standards consistent with enterprise QA practices

---

## Tech Stack

- TypeScript
- Playwright Test
- HTML reporting
- Cross-browser execution: Chromium, Firefox, WebKit
- Page Object Model (POM)
- Centralized utilities and fixtures

---

## Project Structure

```text
.
├── AGENTS.md
├── LICENSE
├── README.md
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── src/
│   ├── components/
│   ├── fixtures/
│   ├── global-setup.ts
│   ├── global-teardown.ts
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   └── SignUpPage.ts
│   ├── test-data/
│   └── utils/
│       └── LocatorFactory.ts
├── test-plan/
│   └── parabank-login-account-overview.plan.md
├── test-results/
├── tests/
│   └── parabank-login-account-overview/
│       ├── negative-login-rejects-invalid-credentials.spec.ts
│       └── positive-login-displays-account-overview.spec.ts
└── playwright-report/
```

### Key directories

- `src/pages/`: page classes encapsulating UI flows and reusable interaction methods
- `src/fixtures/`: shared browser/test setup patterns
- `src/test-data/`: test inputs and scenario data
- `src/utils/`: shared helper utilities such as locator abstraction
- `tests/`: executable Playwright specs
- `test-plan/`: test design and scenario documentation

---

## Test Strategy

The framework follows an enterprise-grade approach centered on maintainability and confidence:

- Prefer user-centric, accessible selectors like `getByRole`, `getByLabel`, and `getByText`
- Encapsulate UI actions in page objects instead of embedding them directly in specs
- Keep tests independent and parallel-safe
- Use explicit wait conditions rather than arbitrary timeouts
- Separate business logic from browser implementation details
- Maintain reusable fixtures for consistent test setup and teardown

---

## Prerequisites

Before running the suite, install the required tooling:

- Node.js 18+ recommended
- npm or pnpm
- Playwright browser dependencies

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Running Tests

Run the full suite:

```bash
npx playwright test
```

Run a specific spec file:

```bash
npx playwright test tests/parabank-login-account-overview/positive-login-displays-account-overview.spec.ts
```

Run a test in headed mode for debugging:

```bash
npx playwright test --headed
```

Run a single test by name:

```bash
npx playwright test -g "Positive login displays the account overview"
```

Generate and view the HTML report:

```bash
npx playwright show-report
```

---

## Configuration

The Playwright configuration is defined in `playwright.config.ts` and includes:

- Test directory configuration
- Parallel execution setup
- Browser project definitions for Chromium, Firefox, and WebKit
- Screenshot and video capture on failure
- Trace capture on first retry

This setup supports both local execution and CI integration.

---

## Current Automation Coverage

The active suite validates core ParaBank functionality:

1. Positive login flow
2. Successful account overview navigation
3. Visibility of account summary elements
4. Logout verification
5. Negative login rejection for invalid credentials

These scenarios provide a strong foundation for expanding automation into additional application modules.

---

## Quality Standards

The repository follows these engineering guardrails:

- No hardcoded waits without business purpose
- No secrets committed to source control
- Test artifacts such as reports, traces, and screenshots are generated during runs and excluded from version control where appropriate
- Selectors remain readable, stable, and maintainable
- Page interactions are centralized to reduce duplication and improve resilience

---

## Contribution Guidelines

Contributions should align with the existing architecture and coding standards:

- Add new scenarios under `tests/`
- Prefer reusable page object methods for repeated flows
- Keep test data in `src/test-data/`
- Build reusable utilities in `src/utils/`
- Use accessible locators and explicit assertions
- Validate changes with focused Playwright runs before merging

Example validation command:

```bash
npx playwright test tests/<spec-file>.spec.ts
```

---

## License

This project is licensed under the ISC license. See [LICENSE](LICENSE) for details.

---

## Summary

This automation framework is structured to support enterprise-quality test engineering by combining strong browser automation practices, a maintainable architecture, and a clear path for scaling test coverage as the application grows.

