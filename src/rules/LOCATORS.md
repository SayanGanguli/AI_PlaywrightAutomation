# Locator Rules

## Purpose

This document defines the rules for identifying, creating, using, and maintaining Playwright locators.

All agents and generated Playwright tests must follow these rules.

---

## 1. Locator Priority

Use locators in the following preferred order:

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()`
5. `getByTestId()`
6. CSS selectors
7. XPath — only when no stable alternative exists

Prefer user-facing and accessibility-based locators whenever possible.

---

## 2. Preferred Locator Examples

### Role

Prefer:

```ts
page.getByRole('button', { name: 'Login' })
```

over:

```ts
page.locator('#loginButton')
```

---

### Label

For form controls, prefer:

```ts
page.getByLabel('Email Address')
```

over:

```ts
page.locator('input[name="email"]')
```

---

### Placeholder

When a stable placeholder exists:

```ts
page.getByPlaceholder('Enter your email')
```

---

### Text

Use text when the visible text is meaningful and stable:

```ts
page.getByText('Products')
```

Avoid text locators when the same text appears in multiple unrelated elements.

---

### Test ID

Use `getByTestId()` when the application provides a stable test identifier:

```ts
page.getByTestId('login-button')
```

Test IDs are preferred over fragile CSS/XPath selectors when they are intentionally designed for automation.

---

## 3. Avoid Fragile Locators

Do not use selectors that depend heavily on implementation details.

Avoid:

```ts
page.locator('div:nth-child(3) > div:nth-child(2) > button')
```

Avoid:

```ts
page.locator('//div[3]/div[2]/button')
```

Avoid:

```ts
page.locator('.css-1a2b3c')
```

Avoid generated or frequently changing class names.

---

## 4. XPath Rules

XPath should be the last option.

Do not use XPath simply because it is familiar.

Before using XPath, verify that the element cannot be reliably located using:

* Role
* Label
* Placeholder
* Text
* Test ID
* Stable CSS selector

If XPath is necessary, keep it simple and readable.

---

## 5. Locator Strictness

Playwright locators should normally resolve to the intended element.

If a locator matches multiple elements, do not immediately solve the problem with:

```ts
.first()
```

or:

```ts
.nth(0)
```

First determine why multiple elements are being matched.

Example:

```ts
page.getByRole('button', { name: 'Login' })
```

If multiple buttons match, refine the locator using the appropriate parent/container or additional accessible information.

---

## 6. Avoid Blind `.first()` and `.nth()`

Do not use:

```ts
locator.first()
```

or:

```ts
locator.nth(0)
```

merely to bypass a strict-mode violation.

These methods may hide a real locator problem.

Use them only when the test intentionally targets a specific item and the selection logic is meaningful.

Example:

```ts
page.getByRole('listitem').nth(2)
```

is acceptable when the third list item is explicitly part of the test requirement.

---

## 7. Locator Variables in Page Objects

Locators should normally be defined inside Page Object classes.

Example:

```ts
export class LoginPage {
    readonly emailInput;
    readonly passwordInput;
    readonly loginButton;

    constructor(private page: Page) {
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }
}
```

Tests should interact with the Page Object instead of repeatedly defining raw locators.

---

## 8. Do Not Duplicate Locators

If the same application element is used by multiple tests, do not redefine the locator in every test.

Bad:

```ts
page.getByRole('button', { name: 'Login' })
```

repeated across multiple test files.

Prefer:

```ts
loginPage.loginButton
```

through the appropriate Page Object.

---

## 9. Dynamic Data

Do not construct locators using unstable dynamic values unless the dynamic value is intentionally part of the UI.

Avoid:

```ts
page.locator(`button.${randomGeneratedClass}`)
```

Prefer stable attributes or user-facing properties.

---

## 10. Locator Validation

Before accepting a newly created locator, verify:

1. The locator identifies the intended element.
2. The locator is stable.
3. The locator is readable.
4. The locator does not depend unnecessarily on DOM structure.
5. The locator does not accidentally match multiple elements.

---

## 11. Locator Debugging

When a locator fails:

1. Read the Playwright error.
2. Determine whether the locator matched zero elements or multiple elements.
3. Inspect the current page state.
4. Check whether the element is inside an iframe.
5. Check whether the element is inside a dialog, popup, or other container.
6. Check whether the element is dynamically rendered.
7. Check whether the accessible name or text has changed.
8. Replace or refine the locator only after identifying the root cause.

Do not randomly modify selectors until the test passes.

---

## 12. Locator Quality Standard

Every locator should be:

* Stable
* Readable
* Maintainable
* Specific enough
* Based on meaningful application behavior where possible
* Resistant to unrelated UI changes

The goal is not merely to make the test pass.

The goal is to create a locator that remains reliable as the application evolves.

---

## 13. Agent Responsibility

Agents generating or modifying Playwright tests must follow these rules.

The agent must not:

* Introduce unnecessary XPath.
* Introduce brittle CSS selectors.
* Use `.first()` to hide an ambiguous locator.
* Use `.nth()` without a meaningful reason.
* Introduce hard-coded DOM traversal unnecessarily.
* Duplicate existing Page Object locators.

When an existing locator is available in a Page Object, the agent should reuse it.

---

## 14. Locator Decision Process

When identifying an element, follow this process:

```text
Can the element be identified by role?
        │
       YES → getByRole()
        │
       NO
        ▼
Can it be identified by label?
        │
       YES → getByLabel()
        │
       NO
        ▼
Can it be identified by placeholder?
        │
       YES → getByPlaceholder()
        │
       NO
        ▼
Can stable visible text identify it?
        │
       YES → getByText()
        │
       NO
        ▼
Is there a stable test ID?
        │
       YES → getByTestId()
        │
       NO
        ▼
Use a stable CSS selector
        │
       NO
        ▼
Use XPath only if necessary
```

---

## 15. Final Principle

A good locator describes **what the user interacts with**, not unnecessarily **how the HTML happens to be structured**.

Prefer:

```ts
page.getByRole('button', { name: 'Submit' })
```

over:

```ts
page.locator('div.form > div:nth-child(4) button')
```

The first expresses intent.

The second expresses implementation details.
