
const { test, expect } = require('@playwright/test');

test('TC01 Register User', async ({ page }) => {

    await page.goto('https://automationexercise.com');

    await page.getByText('Signup / Login').click();

    await expect(
        page.getByText('New User Signup!')
    ).toBeVisible();

    // TODO: MCP locator mapping will be injected here

});
