import { BasePage } from "./BasePage";

export class GooglePage extends BasePage{
    
    public async navigateToHomePage(): Promise<void> {
        await this.navigateTo("/");
    }
}