import { Locator, Page } from '@playwright/test';

export type LocatorStrategy =
  | 'text'
  | 'role'
  | 'label'
  | 'placeholder'
  | 'alt'
  | 'testId'
  | 'selector';

export class LocatorFactory {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getLocator(
    strategy: LocatorStrategy,
    value: string,
    options?: Record<string, unknown>,
  ): Locator {
    switch (strategy) {
      case 'text':
        return this.page.getByText(value, options);

      case 'role':
        return this.page.getByRole(
          value as Parameters<Page['getByRole']>[0],
          options,
        );

      case 'label':
        return this.page.getByLabel(value, options);

      case 'placeholder':
        return this.page.getByPlaceholder(value, options);

      case 'alt':
        return this.page.getByAltText(value, options);

      case 'testId':
        return this.page.getByTestId(value);

      case 'selector':
        return this.page.locator(value, options);

      default:
        throw new Error(`Unsupported locator strategy: ${strategy}`);
    }
  }
}