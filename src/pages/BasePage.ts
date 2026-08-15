import { Page,expect} from '@playwright/test';
import { LocatorFactory, LocatorStrategy } from '../utils/LocatorFactory';

export abstract class BasePage {
    protected loc!: LocatorFactory
    protected page!:Page
    
    constructor(loc:LocatorFactory,page:Page) {
        this.page = page
        this.loc = loc
    }

    async navigateTo(path: string): Promise<void> {
        await this.page.goto(path);
    }

    async getPageTitle(): Promise<string> {
        return this.page.title();
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async click_element(strategy: LocatorStrategy, options?:any) {
        const locator = this.loc.getLocator(strategy,options)
        await locator.click()
    }

    async enter_text(strategy: LocatorStrategy, value: string): Promise<void> {
        const locator = await this.loc.getLocator(strategy);
        await locator.fill(value)
    }

    async clear(strategy: LocatorStrategy): Promise<void> {
        const locator = await this.loc.getLocator(strategy);
        await locator.clear()
    }

    async getText(strategy: LocatorStrategy): Promise<string> {
        const locator = await this.loc.getLocator(strategy)
        return (await locator.textContent())?.trim() ?? '';
    }

    async isVisible(strategy: LocatorStrategy): Promise<boolean> {
        return await this.loc.getLocator(strategy).isVisible()
    }

    async isEnabled(strategy: LocatorStrategy): Promise<boolean> {
        return await this.loc.getLocator(strategy).isEnabled();
    }

    async selectElement(strategy: LocatorStrategy,value: string): Promise<void> {
        await this.loc.getLocator(strategy).selectOption(value);
    }

    async press(strategy: LocatorStrategy,key: string): Promise<void> {
        await this.loc.getLocator(strategy).press(key);
    }

    async expectVisible(strategy: LocatorStrategy): Promise<void> {
        await expect(this.loc.getLocator(strategy)).toBeVisible();
    }

    async expectText(strategy: LocatorStrategy,text: string): Promise<void> {
        await expect(this.loc.getLocator(strategy)).toContainText(text);
    }

    async expectUrl(url: string | RegExp): Promise<void> {
        await expect(this.page).toHaveURL(url);
    }

    async expectTitle(page_title: string): Promise<void> {
        await expect(this.page).toHaveTitle(page_title)
    }


}
