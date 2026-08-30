import { expect, test } from '@playwright/test';

test.describe('ParaBank Authentication and Account Overview', () => {
  test('Positive login displays the account overview', async ({ page }) => {
    // 1. Open https://parabank.parasoft.com/parabank/index.htm in a fresh browser context.
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');
    await expect(page.getByRole('heading', { name: 'Customer Login' })).toBeVisible();
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();

    // 2. Enter john in the username field and demo in the password field.
    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    await usernameInput.fill('john');
    await passwordInput.fill('demo');
    await expect(usernameInput).toHaveValue('john');
    await expect(passwordInput).toHaveValue('demo');

    // 3. Click Log In.
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page).toHaveURL(/\/overview\.htm/);
    await expect(page).toHaveTitle('ParaBank | Accounts Overview');
    await expect(page.getByText('Welcome John Smith')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Account Services' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Accounts Overview' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();

    // 4. Inspect the Accounts Overview table.
    const accountsTable = page.getByRole('table');
    await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
    await expect(accountsTable.getByRole('columnheader', { name: 'Account' })).toBeVisible();
    await expect(accountsTable.getByRole('columnheader', { name: 'Balance*' })).toBeVisible();
    await expect(accountsTable.getByRole('columnheader', { name: 'Available Amount' })).toBeVisible();
    await expect(page.getByRole('link', { name: '13344' })).toBeVisible();
    await expect(page.getByRole('link', { name: '14232' })).toBeVisible();
    await expect(accountsTable.getByRole('row', { name: /Total \$5022\.93/ })).toBeVisible();
    await expect(page.getByText('$5022.93')).toBeVisible();
    await expect(page.getByRole('cell', { name: '*Balance includes deposits' })).toBeVisible();

    // 5. Click Log Out and verify the post-logout state.
    await page.getByRole('link', { name: 'Log Out' }).click();
    await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');
    await expect(page.getByRole('heading', { name: 'Customer Login' })).toBeVisible();
    await expect(page.getByText('Welcome John Smith')).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Accounts Overview' })).not.toBeVisible();
    await expect(page.getByText('$5022.93')).not.toBeVisible();
  });
});
