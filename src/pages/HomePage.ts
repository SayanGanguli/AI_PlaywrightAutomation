import { BasePage } from "./BasePage";
import { LocatorFactory } from "../utils/LocatorFactory";

export class GooglePage extends BasePage{
    
    constructor(factory:LocatorFactory){
             super(factory)
    }

    public async navigateToHomePage(): Promise<void> {
        await this.navigateTo("/");
    }
}