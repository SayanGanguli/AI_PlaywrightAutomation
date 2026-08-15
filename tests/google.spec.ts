import { test } from '@playwright/test';
import { GooglePage } from '../src/pages/HomePage'

test('homepage title', async ({ page }) => {
    const google = new GooglePage(page)

    await google.navigateToHomePage()
    await google.expectTitle("Google")
    await google.clickElement('label','Gmail')
    
});