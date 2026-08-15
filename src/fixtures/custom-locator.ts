import { test as base, Locator, Page } from '@playwright/test';

export type LocatorStrategy =
  | 'text'
  | 'role'
  | 'label'
  | 'placeholder'
  | 'alt'
  | 'testId'
  | 'selector';

// Extend Playwright's test with a custom fixture
export const test = base.extend<{
  getLocator: (strategy: LocatorStrategy, value?: string, options?: any) => Locator;
}>({
  getLocator: async ({ page }, use) => {
    const getLocator = (strategy: LocatorStrategy, value: string = "", options?: any): Locator => {
      const strategyMap: Record<LocatorStrategy, () => Locator> = {
        text: () => page.getByText(value, options),
        role: () => page.getByRole(value as any, options),
        label: () => page.getByLabel(value, options),
        placeholder: () => page.getByPlaceholder(value, options),
        alt: () => page.getByAltText(value, options),
        testId: () => page.getByTestId(value),
        selector: () => page.locator(value, options),
      };

      const locatorBuilder = strategyMap[strategy];
      if (!locatorBuilder) {
        throw new Error(`Unsupported locator strategy: ${strategy}`);
      }
      return locatorBuilder();
    };

    await use(getLocator);
  },
});

export const expect = test.expect;
