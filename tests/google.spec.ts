import { test, expect } from '@playwright/test';
import { LocatorFactory } from '../src/utils/LocatorFactory';
import { GooglePage } from '../src/pages/HomePage'

test('homepage title', async ({ page }) => {
    let factory = new LocatorFactory(page)
    let google = new GooglePage(factory)

    google.navigateToHomePage()
    google.expectTitle("Google")
    google.click_element('label','Gmail')
    
});