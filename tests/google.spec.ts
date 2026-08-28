import {test} from '@playwright/test'


test ("Demo test", async ({page})=> {
    await page.goto("https://www.google.com/")
    page.setDefaultTimeout(10)
    const title = await page.title()
    console.log(title)
})