# AI Playwright Automation

An enterprise-level AI-assisted end-to-end test automation framework built with **Playwright** and **TypeScript**.

The framework combines AI-driven test planning, implementation, test artifact generation, execution, and automated failure healing into a structured automation lifecycle.

---

## 🚀 Overview

The framework transforms a natural-language testing requirement into an executable Playwright test.

The project is designed for:

- Reliable regression coverage across major browsers
- Clean separation of test logic, page interactions, and test data
- Reusability for future application workflows
- CI-friendly execution and reporting
- Maintainable automation standards consistent with enterprise QA practices

### AI Automation Lifecycle

```text
                 User Requirement
                        │
                        ▼
                    ┌────────┐
                    │ Planner│
                    └────┬───┘
                         │
                         ▼
                    Test Plan
                         │
                         ▼
                 ┌──────────────┐
                 │ Implementer  │
                 └──────┬───────┘
                        │
                        ▼
                 Playwright Test
                        │
                        ▼
                  ┌───────────┐
                  │ Generator │
                  └─────┬─────┘
                        │
                        ▼
              Supporting Artifacts
                        │
                        ▼
                 Test Execution
                        │
                    Failure?
                    /     \
                  No       Yes
                  │         │
                  ▼         ▼
                Pass     ┌────────┐
                         │ Healer │
                         └────┬───┘
                              │
                              ▼
                         Fix & Retry
                              │
                              ▼
                           Verify
```

---

# 🧠 AI Agents

The framework uses four specialized agents.

## 1. Planner

The **Planner** converts a natural-language requirement into a structured test plan.

### Responsibilities

* Understand the business requirement
* Identify the application workflow
* Define preconditions
* Identify required test data
* Define test steps
* Define expected results
* Identify reusable framework components

Planner artifacts are stored under:

```text
test-plan/
```

---

## 2. Implementer

The **Implementer** converts the approved test plan into executable Playwright automation.

### Responsibilities

* Analyze the test plan
* Inspect existing framework code
* Reuse existing page objects and flows
* Create or update Playwright tests
* Implement required business workflows
* Add appropriate assertions

Executable tests are stored under:

```text
tests/
```

---

## 3. Generator

The **Generator** creates supporting automation artifacts when required.

These may include:

* Page Objects
* Components
* Fixtures
* Test Data
* Data Factories
* Business Flows
* Utilities

The Generator always checks for existing implementations before creating new ones.

---

## 4. Healer

The **Healer** analyzes failed tests and attempts to resolve automation-related failures.

It can help with:

* Locator failures
* Strict-mode violations
* Changed selectors
* Timeouts
* Navigation issues
* Synchronization problems
* Test-data issues

The Healer follows:

```text
Failure
   ↓
Analyze
   ↓
Identify Root Cause
   ↓
Apply Minimal Fix
   ↓
Re-run
   ↓
Verify
```

The Healer must **never weaken assertions or hide genuine application defects simply to make a test pass**.

---

# 🏗️ Architecture

The framework follows a layered architecture.

```text
┌─────────────────────────────────────────┐
│              AI AGENTS                  │
│                                         │
│ Planner → Implementer → Generator       │
│                         ↓               │
│                       Healer             │
└───────────────────────┬─────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────┐
│              TEST LAYER                 │
│                                         │
│             Playwright Tests            │
└───────────────────────┬─────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────┐
│           BUSINESS FLOW LAYER           │
│                                         │
│ Authentication / Registration / Checkout│
└───────────────────────┬─────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────┐
│            PAGE OBJECT LAYER            │
│                                         │
│ Login / Registration / Home / Checkout  │
└───────────────────────┬─────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────┐
│          PLAYWRIGHT / BROWSER           │
└─────────────────────────────────────────┘
```

---

# 📁 Project Structure

```text
AI_PlaywrightAutomation/
│
├── .github/
│   └── workflows/
│       └── ...
│
├── src/
│   │
│   ├── agents/
│   │   ├── planner/
│   │   ├── implementer/
│   │   ├── generator/
│   │   └── healer/
│   │
│   ├── pages/
│   │   ├── home/
│   │   ├── authentication/
│   │   ├── account/
│   │   └── checkout/
│   │
│   ├── components/
│   │
│   ├── flows/
│   │   ├── AuthenticationFlow.ts
│   │   └── ...
│   │
│   ├── fixtures/
│   │
│   ├── data/
│   │   ├── UserFactory.ts
│   │   └── ...
│   │
│   ├── managers/
│   │
│   ├── types/
│   │
│   └── utils/
│
├── tests/
│   ├── authentication/
│   ├── account/
│   ├── checkout/
│   └── ...
│
├── test-plan/
│   ├── registration/
│   └── ...
│
├── reports/
│
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── AGENTS.md
├── README.md
└── .gitignore
```

---

# 🔧 Technology Stack

| Technology      | Purpose                                               |
| --------------- | ----------------------------------------------------- |
| TypeScript      | Programming language                                  |
| Playwright      | End-to-end browser automation                         |
| Playwright Test | Test runner and assertions                            |
| Node.js         | Runtime environment                                   |
| AI Agents       | Test planning, implementation, generation and healing |
| Git             | Version control                                       |
| GitHub Actions  | CI/CD                                                 |
| HTML Report     | Test reporting                                        |

---

# ⚙️ Prerequisites

Install the following before using the framework:

* Node.js
* npm
* Git
* VS Code or another TypeScript-compatible IDE

Verify Node.js:

```bash
node --version
```

Verify npm:

```bash
npm --version
```

---

# 📦 Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd AI_PlaywrightAutomation
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

# 🔐 Environment Configuration

Environment-specific configuration should be stored using environment variables.

Example:

```text
BASE_URL=https://example.com
```

Do not commit secrets or credentials to Git.

The `.env` file should be included in `.gitignore`.

---

# ▶️ Running Tests

Run the complete Playwright test suite:

```bash
npx playwright test
```

Run a specific test:

```bash
npx playwright test tests/authentication/registration.spec.ts
```

Run tests using a specific browser:

```bash
npx playwright test --project=chromium
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test by title:

```bash
npx playwright test -g "registration"
```

---

# 📊 Test Reports

After execution, Playwright can generate an HTML report.

Open the report using:

```bash
npx playwright show-report
```

Reports and generated test artifacts should generally not be committed to Git.

---

# 🧪 Example Automation Workflow

A registration and login requirement is processed as follows:

```text
User Requirement
       ↓
Planner
       ↓
Registration Test Plan
       ↓
Implementer
       ↓
Registration Test
       ↓
Generator
       ↓
UserFactory / Page Objects / Flow
       ↓
Execute Test
       ↓
Healer if required
```

---

# 🧱 Framework Components

## Page Objects

Page Objects encapsulate UI interactions and locators.

Example:

```text
src/pages/authentication/LoginPage.ts
src/pages/authentication/RegistrationPage.ts
```

---

## Business Flows

Flows represent multi-page business processes.

Example:

```text
src/flows/AuthenticationFlow.ts
```

Possible operations:

```text
register()
login()
logout()
```

---

## Test Data

Test data is separated from test logic.

Example:

```text
src/data/UserFactory.ts
```

Factories can generate dynamic data for scenarios such as user registration.

---

## Fixtures

Fixtures provide reusable Playwright test setup and context.

Examples:

```text
Browser
Context
Page
Page Manager
Authentication State
Test Data
```

---

## Utilities

Generic reusable functionality belongs under:

```text
src/utils/
```

Examples:

```text
ConfigReader
Logger
FileUtils
DateUtils
```

---

# 🎯 Locator Strategy

The framework prefers stable Playwright locators.



---

# 🩹 Self-Healing Philosophy

The Healer follows a **root-cause-first** approach.

Example:

```text
Strict Mode Violation
        ↓
Inspect locator
        ↓
Multiple elements found
        ↓
Identify intended element
        ↓
Use stable locator
        ↓
Re-run test
```

---

# 🔄 Development Workflow

Recommended development workflow:

```text
Create Feature Branch
        ↓
Define Requirement
        ↓
Planner
        ↓
Review Test Plan
        ↓
Implementer
        ↓
Generator
        ↓
Run Tests
        ↓
Healer
        ↓
Run Regression
        ↓
Commit
        ↓
Push
        ↓
Pull Request
        ↓
Merge
```
---

# 🚀 CI/CD

The framework is designed to support automated execution through GitHub Actions.

Typical CI pipeline:

```text
Push / Pull Request
        ↓
Install Dependencies
        ↓
Install Playwright Browsers
        ↓
Run TypeScript Checks
        ↓
Run Playwright Tests
        ↓
Generate Report
        ↓
Publish Artifacts
```

CI configuration belongs under:

```text
.github/workflows/
```

The Playwright pipeline runs automatically every day at midnight IST
(`18:30 UTC` on the previous day) and can also be started manually from the
GitHub Actions tab. Each run publishes the HTML report and
`reports/test-metrics.json` as workflow artifacts.

---

# 🛡️ Engineering Principles

The framework follows these principles:

### 1. Reuse Before Create

Always check whether functionality already exists before creating new code.

### 2. Single Responsibility

Each class and file should have one clear responsibility.

### 3. Stable Locators

Prefer reliable semantic locators.

### 4. Business-Focused Tests

Tests should validate business behavior rather than implementation details.

### 5. Minimal Changes

Agents should make the smallest safe change required.

### 6. Root-Cause Fixes

Failures should be diagnosed before modifying code.

### 7. No False Positives

Tests must not be weakened simply to make them pass.

### 8. Maintainability

Generated code must remain understandable and maintainable by human developers.

---

# 📚 Documentation

| Document     | Purpose                                      |
| ------------ | -------------------------------------------- |
| `README.md`  | Project overview and developer documentation |
| `AGENTS.md`  | Rules and instructions for AI agents         |
| `test-plan/` | Test planning artifacts                      |

---

# 🎯 Project Goal

The goal of this project is to build a scalable AI-assisted automation framework where a tester can provide a natural-language requirement and the framework can systematically:

```text
Plan
 ↓
Implement
 ↓
Generate
 ↓
Execute
 ↓
Heal
 ↓
Verify
```

while maintaining the quality, reliability, and engineering standards expected from an enterprise automation framework.

---