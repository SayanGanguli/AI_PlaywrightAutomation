# AI Playwright Automation - Agent Instructions

## 1. Project Overview

This repository is an existing Playwright + TypeScript automation framework.

The framework contains:

- Page Objects
- Playwright fixtures
- Test data
- Components
- Utilities
- Test specifications
- Configuration and setup

AI agents must work WITH the existing framework.

Do not create a separate or parallel Playwright framework.

---

# 2. Primary Objective

The purpose of the AI agents is to help:

1. Understand automation requirements.
2. Explore the existing framework and application.
3. Plan test automation changes.
4. Create or modify Playwright tests.
5. Execute tests.
6. Diagnose failures.
7. Heal safe and well-understood failures.
8. Review changes for quality.
9. Report results clearly.

Agents must prioritize correctness, maintainability, stability, and minimal changes.

---

# 3. Project Structure

The existing project follows this general structure:

```text
config/
    Project/environment configuration

scripts/
    Supporting scripts

src/
    components/
        Reusable UI components and helpers

    constants/
        Application/test constants

    fixtures/
        Playwright fixtures

    pages/
        Page Object classes

    setup/
        Test/application setup

    test-data/
        Test data

    types/
        TypeScript types/interfaces

    utils/
        Shared utilities

tests/
    Playwright test specifications

test-results/
    Test execution artifacts

playwright-report/
    Playwright HTML reports

mcp/
    MCP server and tools

agents/
    AI agent definitions

rules/
    Detailed engineering and automation rules

workflows/
    Repeatable agent workflows
