import { test, expect } from '@playwright/test';
import { LocatorFactory } from '../src/utils/LocatorFactory';
import { GooglePage } from '../src/pages/HomePage'

test('homepage title', async ({ page }) => {
    let google = new GooglePage(page)

    google.navigateToHomePage()
    google.expectTitle("Google")
    google.click_element('label','Gmail')
    
});