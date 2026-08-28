# AI Playwright Automation

## Project Overview

- This repository contains end-to-end tests built with Playwright Test and TypeScript.
- Tests live in `tests/`.
- Shared fixtures, page objects, components, test data, and utilities belong under `src/`.
- Playwright is configured in `playwright.confg.ts`.

## Development Guidelines

- Use TypeScript and the existing Playwright Test APIs.
- Prefer accessible locators such as `getByRole`, `getByLabel`, and `getByText`.
- Keep selectors and page-specific interactions in page objects under `src/pages/` when they are reused.
- Put reusable setup and browser context behavior in `src/fixtures/`.
- Keep test data in `src/test-data/` rather than embedding large data sets in specs.
- Keep tests independent so they can run in parallel.
- Do not use `page.waitForTimeout`; wait for a locator, assertion, navigation, or other meaningful condition instead.
- Do not commit secrets, generated reports, traces, videos, or screenshots.

## Validation

Before submitting changes:

1. Run the focused Playwright test while iterating:

   ```bash
   npx playwright test tests/<name>.spec.ts
   ```

2. Run the full cross-browser suite when the change is complete:

   ```bash
   npx playwright test
   ```

3. Check formatting:

   ```bash
   npx prettier --check .
   ```

Use `CI=true` when validating CI-specific behavior such as retries and worker limits.

## Change Expectations

- Keep changes focused and preserve existing public APIs and project structure.
- Add or update tests for behavioral changes.
- Review the generated HTML report and failure artifacts when a test fails.
- Do not commit changes unless explicitly requested.
