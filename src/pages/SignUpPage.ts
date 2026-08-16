import { BasePage } from './BasePage';

export type RegistrationData = {
  password: string;
  day: string;
  month: string;
  year: string;
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

export class SignupPage extends BasePage {
  async expectAccountInformationVisible(): Promise<void> {
    await this.expectText(
      'selector',
      'h2.title:has-text("Enter Account Information")',
      'Enter Account Information',
    );
  }

  async selectTitle(title: 'Mr.' | 'Mrs.'): Promise<void> {
    const selector =
      title === 'Mr.' ? 'input#id_gender1' : 'input#id_gender2';

    await this.page.locator(selector).check();
  }

  async fillAccountDetails(data: RegistrationData): Promise<void> {
    await this.enterText(
      'selector',
      'input[data-qa="password"]',
      data.password,
    );

    await this.selectElement(
      'selector',
      'select[data-qa="days"]',
      data.day,
    );

    await this.selectElement(
      'selector',
      'select[data-qa="months"]',
      data.month,
    );

    await this.selectElement(
      'selector',
      'select[data-qa="years"]',
      data.year,
    );

    await this.enterText(
      'selector',
      'input[data-qa="first_name"]',
      data.firstName,
    );

    await this.enterText(
      'selector',
      'input[data-qa="last_name"]',
      data.lastName,
    );

    if (data.company) {
      await this.enterText(
        'selector',
        'input[data-qa="company"]',
        data.company,
      );
    }

    await this.enterText(
      'selector',
      'input[data-qa="address"]',
      data.address,
    );

    await this.selectElement(
      'selector',
      'select[data-qa="country"]',
      data.country,
    );

    await this.enterText(
      'selector',
      'input[data-qa="state"]',
      data.state,
    );

    await this.enterText(
      'selector',
      'input[data-qa="city"]',
      data.city,
    );

    await this.enterText(
      'selector',
      'input[data-qa="zipcode"]',
      data.zipcode,
    );

    await this.enterText(
      'selector',
      'input[data-qa="mobile_number"]',
      data.mobileNumber,
    );

    await this.clickElement(
      'selector',
      'button[data-qa="create-account"]',
    );
  }
}