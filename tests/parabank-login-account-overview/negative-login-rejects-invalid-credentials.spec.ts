import { expect, test } from '@playwright/test';

test.describe('ParaBank Authentication and Account Overview', () => {
  test('Negative login rejects invalid credentials and protects account data', async ({ page }) => {
    // 1. Open https://parabank.parasoft.com/parabank/index.htm in a fresh browser context.
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');
    await expect(page.getByRole('heading', { name: 'Customer Login' })).toBeVisible();

    // 2. Enter invalid-user in the username field and invalid-password in the password field.
    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    await usernameInput.fill('invalid-user');
    await passwordInput.fill('invalid-password');
    await expect(usernameInput).toHaveValue('invalid-user');
    await expect(passwordInput).toHaveValue('invalid-password');

    // 3. Click Log In.
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page).not.toHaveURL(/\/overview\.htm/);
    await expect(page.getByText(/invalid username or password/i)).toBeVisible();

    // 4. Verify authenticated account content is unavailable.
    await expect(page.getByText('Welcome John Smith')).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Account Services' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Accounts Overview' })).not.toBeVisible();
    await expect(page.getByText('$5022.93')).not.toBeVisible();
  });
});
