import { Page, Locator } from '@playwright/test';

export type LocatorStrategy =
    | 'text'
    | 'role'
    | 'label'
    | 'placeholder'
    | 'alt'
    | 'testId'
    | 'selector'

export class LocatorFactory {

    protected readonly page:Page
    
    constructor(page:Page){
         this.page = page
    }

    getLocator(strategy: LocatorStrategy, value: string="", options?:any): Locator {
        const strategyMap: Record<LocatorStrategy, () => Locator> = {

            text: () => this.page.getByText(value, options),

            role: () => this.page.getByRole(value as any, options),

            label: () => this.page.getByLabel(value, options),

            placeholder: () => this.page.getByPlaceholder(value, options),

            alt: () => this.page.getByAltText(value, options),

            testId: () => this.page.getByTestId(value),

            selector: () => this.page.locator(value, options)
        }

        const locatorBuilder = strategyMap[strategy];

        if (!locatorBuilder) {
            throw new Error(`Unsupported locator strategy: ${strategy}`);
        }

        return locatorBuilder();

    }
}


