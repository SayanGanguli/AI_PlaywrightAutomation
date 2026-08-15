import { Page, Locator } from '@playwright/test';

export type LocatorStrategy =
  | 'text'
  | 'role'
  | 'label'
  | 'placeholder'
  | 'alt'
  | 'testId'
  | 'selector';

export function LocatorFactory(page: Page) {
  const strategyMap: Record<LocatorStrategy, (value: string, options?: Record<string, unknown>) => Locator> = {
    text: (value, options) => page.getByText(value, options),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    role: (value, options) => page.getByRole(value as any, options), 
    label: (value, options) => page.getByLabel(value, options),
    placeholder: (value, options) => page.getByPlaceholder(value, options),
    alt: (value, options) => page.getByAltText(value, options),
    testId: (value) => page.getByTestId(value),
    selector: (value, options) => page.locator(value, options),
  };

  return {
    getLocator(strategy: LocatorStrategy, value: string = "", options?: Record<string, unknown>): Locator {
      const locatorBuilder = strategyMap[strategy];
      if (!locatorBuilder) {
        throw new Error(`Unsupported locator strategy: ${strategy}`);
      }
      return locatorBuilder(value, options);
    },
  };
}
