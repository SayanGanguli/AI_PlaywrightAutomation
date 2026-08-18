import { expect, Page } from '@playwright/test';
import { LocatorFactory, LocatorStrategy } from '../utils/LocatorFactory';

export abstract class BasePage {
  protected readonly page: Page;
  //protected readonly factory!: ReturnType<typeof LocatorFactory>;
  protected readonly factory: LocatorFactory;

  constructor(page: Page) {
    this.page = page;
    this.factory = new LocatorFactory(page);
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

  async clickElement(
    strategy: LocatorStrategy,
    strategyValue: string,
  ): Promise<void> {
    const locator = this.factory.getLocator(strategy, strategyValue);
    await locator.click();
  }

  async enterText(
    strategy: LocatorStrategy,
    strategyValue: string,
    fillText: string,
  ): Promise<void> {
    const locator = this.factory.getLocator(strategy, strategyValue);
    await locator.fill(fillText);
  }

  async clear(
    strategy: LocatorStrategy,
    strategyValue: string,
  ): Promise<void> {
    const locator = this.factory.getLocator(strategy, strategyValue);
    await locator.clear();
  }

  async getText(
    strategy: LocatorStrategy,
    strategyValue: string,
  ): Promise<string> {
    const locator = this.factory.getLocator(strategy, strategyValue);
    return (await locator.textContent())?.trim() ?? '';
  }

  async isVisible(
    strategy: LocatorStrategy,
    strategyValue: string,
  ): Promise<boolean> {
    return this.factory.getLocator(strategy, strategyValue).isVisible();
  }

  async isEnabled(
    strategy: LocatorStrategy,
    strategyValue: string,
  ): Promise<boolean> {
    return this.factory.getLocator(strategy, strategyValue).isEnabled();
  }

  async selectElement(
    strategy: LocatorStrategy,
    strategyValue: string,
    optionValue: string,
  ): Promise<void> {
    await this.factory
      .getLocator(strategy, strategyValue)
      .selectOption(optionValue);
  }

  async press(
    strategy: LocatorStrategy,
    strategyValue: string,
    key: string,
  ): Promise<void> {
    await this.factory.getLocator(strategy, strategyValue).press(key);
  }

  async expectVisible(
    strategy: LocatorStrategy,
    strategyValue: string,
  ): Promise<void> {
    await expect(
      this.factory.getLocator(strategy, strategyValue),
    ).toBeVisible();
  }

  async expectText(
    strategy: LocatorStrategy,
    strategyValue: string,
    text: string,
  ): Promise<void> {
    await expect(
      this.factory.getLocator(strategy, strategyValue),
    ).toContainText(text);
  }

  async expectUrl(url: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(url);
  }

  async expectTitle(pageTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(pageTitle);
  }
}