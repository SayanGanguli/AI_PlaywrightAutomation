# AI Playwright Automation

Enterprise-ready browser automation framework built with Playwright and TypeScript. The framework is organized around reusable page objects, generated test data, environment-based configuration, and CI-friendly test reporting.

## Contents

- [Purpose](#purpose)
- [Framework Status](#framework-status)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Reports and Artifacts](#reports-and-artifacts)
- [Project Structure](#project-structure)
- [Automation Design](#automation-design)
- [Custom Fixtures and Lifecycle](#custom-fixtures-and-lifecycle)
- [AI Workflow Documentation](#ai-workflow-documentation)
- [Contribution Standards](#contribution-standards)
- [Framework Maintenance](#framework-maintenance)

## Purpose

This repository provides a maintainable foundation for end-to-end web automation. It is intended to support:

- repeatable functional and regression testing;
- local development and CI/CD execution;
- isolated test data generation;
- reusable page and component abstractions; and
- future AI-assisted planning, test generation, and locator healing.

## Framework Status

| Capability             | Current state                                                         |
| ---------------------- | --------------------------------------------------------------------- |
| Language               | TypeScript with strict compiler settings                              |
| Test runner            | Playwright Test                                                       |
| Active browser project | Chromium                                                              |
| Configured environment | QA                                                                    |
| Base application       | `https://automationexercise.com/`                                     |
| Test reporters         | HTML and JUnit XML                                                    |
| Failure artifacts      | Screenshots, traces, and videos according to Playwright configuration |
| Quality checks         | TypeScript, ESLint, and Prettier scripts                              |

Firefox and WebKit projects are intentionally disabled until cross-browser execution is ready. Update this table when a capability changes, rather than allowing it to become a historical snapshot.

## Prerequisites

- Node.js compatible with the project toolchain
- npm
- Access to the target environment configured in `config/environments/`

Verify the local toolchain before installation:

```powershell
node --version
npm --version
```

## Installation

Install project dependencies and the Playwright browsers:

```powershell
npm install
npx playwright install
```

For a clean CI installation, use `npm ci` when a lockfile is committed.

## Configuration

The Playwright configuration selects an environment using `TEST_ENV` and loads the matching file from `config/environments/`.

The default environment is QA:

```powershell
npm test
```

To select another environment, add a corresponding file such as `config/environments/staging.env` and run:

```powershell
$env:TEST_ENV = "staging"
npm test
```

Environment files currently require a `BASE_URL` value. Keep credentials and other secrets out of source control; provide them through the CI secret store or local environment variables.

## Running Tests

| Command                   | Use                                                           |
| ------------------------- | ------------------------------------------------------------- |
| `npm test`                | Run the full Playwright suite                                 |
| `npm run test:headed`     | Run tests with a visible browser                              |
| `npm run test:ui`         | Open Playwright UI mode                                       |
| `npm run test:debug`      | Run with the Playwright debugger                              |
| `npm run test:regression` | Run tests under `tests/regression` when that suite is present |
| `npm run report`          | Open the latest HTML report                                   |
| `npm run typecheck`       | Run TypeScript without emitting files                         |
| `npm run lint`            | Run ESLint                                                    |
| `npm run format:check`    | Verify Prettier formatting                                    |
| `npm run format`          | Format supported project files                                |
| `npm run clean`           | Remove generated test output using the cleanup script         |

Run one test or narrow execution while developing:

```powershell
npx playwright test tests/automationexercise-register-user.spec.ts
npx playwright test -g "Register User"
npx playwright test --project=chromium
```

The default local browser is headed and maximized. CI execution uses a single worker and up to two retries, as configured in `playwright.config.ts`.

## Reports and Artifacts

Each run writes generated output to `test-results/` and the HTML report to `playwright-report/`.

- HTML report: `playwright-report/index.html`
- JUnit report: `test-results/results.xml`
- Screenshots: captured on failure
- Trace: captured on the first retry
- Video: retained on failure

Generated output should not be committed. Use `npm run clean` before a fresh local run when stale artifacts could affect investigation.

## Project Structure

```text
.
├── config/environments/       Environment-specific `.env` files
├── mcp/                       MCP server, tools, and project resources
│   ├── resources/             MCP resources exposed to clients
│   ├── server.ts              MCP server entry point
│   └── tools/                 MCP test execution and artifact tools
├── scripts/                   Maintenance and reporting scripts
├── src/
│   ├── agents/                AI workflow guidance
│   ├── components/            Shared UI components
│   ├── constants/             Shared constants
│   ├── fixtures/              Playwright fixtures
│   ├── pages/                 Page object models
│   ├── rules/                 Locator, MCP, and test-data rules
│   ├── setup/                 Global setup and teardown hooks
│   ├── test-data/             Test-data factories and builders
│   ├── types/                 Shared TypeScript types
│   └── utils/                 Shared utilities, including locator helpers
├── tests/                     Playwright test specifications
├── playwright.config.ts       Runner, environment, browser, and reporter config
└── package.json               Scripts and dependencies
```

## Automation Design

### Page objects

Tests should express business intent through page objects in `src/pages/`. Locators and page interactions belong in the page or component abstraction; test specifications should coordinate the workflow and assert business outcomes.

### Test data

Use factories in `src/test-data/` for generated data. Do not hard-code user credentials or reuse mutable accounts across tests unless the scenario explicitly requires shared state.

### Locators

Prefer stable, user-facing locators and keep locator construction consistent with `src/utils/LocatorFactory.ts`. When a locator is unavoidable because of an application limitation, document the reason in the relevant rule or page object.

### Isolation and cleanup

Tests should be independently runnable. Create the data needed by a test, remove disposable data during the workflow, and leave the target environment in a known state whenever the application permits it.

## Custom Fixtures and Lifecycle

Use the shared `test` export from `src/fixtures/global_setUp.ts` for TypeScript tests that need framework fixtures:

```typescript
import { test, expect } from '../src/fixtures/global_setUp';

test('uses generated test data', async ({ page, testUser }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Automation Exercise/);
  console.log(testUser.email);
});
```

The `testUser` fixture creates isolated user data for each test. The configured global setup creates a temporary run marker under `test-results/`, and global teardown removes it after the run while leaving reports and failure artifacts available for investigation. Add future shared fixtures to the same fixture module and document their lifecycle here.

## AI Workflow Documentation

The repository reserves `src/agents/` for AI-assisted workflow guidance:

- `PLANNER.md`: scenario and coverage planning
- `GENERATOR.md`: test generation conventions
- `HEALER.md`: locator and test repair conventions

The rule documents in `src/rules/` are the intended location for shared constraints on locators, test data, and MCP usage. Keep these documents aligned with the implementation as those workflows are introduced.

## Contribution Standards

Before opening a change for review:

```powershell
npm run typecheck
npm run lint
npm run format:check
npm test
```

New tests should:

- use descriptive test names and follow the existing page-object pattern;
- avoid fixed waits and implementation-detail assertions;
- include cleanup for created data where applicable; and
- preserve useful Playwright artifacts when diagnosing failures.

Keep changes focused and update the relevant rule, agent guide, or README section when introducing a new framework convention.

## Framework Maintenance

This README is a living document and must be updated periodically. Update it in the same change as framework behavior whenever any of the following changes:

- supported browsers, environments, or required environment variables;
- package scripts, CI commands, reporters, or artifact retention;
- source or test directory responsibilities;
- locator, fixture, test-data, or page-object conventions; or
- AI agent and rule workflows.

### Review cadence

- Review at least once per quarter and during every framework release.
- Review immediately after adding or moving a top-level folder, MCP tool, test command, environment, browser project, or report artifact.
- Confirm that the status table, command table, project tree, configuration examples, fixture paths, and verification commands match the repository.
- Record the review date and any resulting updates in the pull request description or release notes.

Last reviewed: 2026-08-26
