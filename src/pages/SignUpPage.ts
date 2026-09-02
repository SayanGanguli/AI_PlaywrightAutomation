import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import {
	getConfig,
	registerLink,
	registrationConfirmationInput,
	registrationCityInput,
	registrationFirstNameInput,
	registrationForm,
	registrationHeading,
	registrationLastNameInput,
	registrationPasswordInput,
	registrationPhoneInput,
	registrationSsnInput,
	registrationStateInput,
	registrationStreetInput,
	registrationSubmit,
	registrationUsernameInput,
	registrationZipCodeInput,
} from '../components/Helper';
import { getMessages, getRegistrationData } from '../utils/testData';

export interface RegistrationData {
	firstName: string;
	lastName: string;
	street: string;
	city: string;
	state: string;
	zipCode: string;
	phone?: string;
	ssn: string;
	username: string;
	password: string;
	confirmation: string;
}

export class SignUpPage extends BasePage {
	async open(): Promise<void> {
		const config = getConfig();

		await this.navigateTo(config.url);
		await this.factory.getLocator('selector', registerLink).click();
		await expect(this.page).toHaveURL(/\/register\.htm/);
		await expect(this.page).toHaveTitle(config.registrationPageTitle);
		await expect(this.factory.getLocator('selector', registrationHeading)).toBeVisible();
		await expect(this.factory.getLocator('selector', registrationForm)).toBeVisible();
	}

	async fillRegistration(data: RegistrationData): Promise<void> {
		const fields: Array<[string, string | undefined]> = [
			[registrationFirstNameInput, data.firstName],
			[registrationLastNameInput, data.lastName],
			[registrationStreetInput, data.street],
			[registrationCityInput, data.city],
			[registrationStateInput, data.state],
			[registrationZipCodeInput, data.zipCode],
			[registrationPhoneInput, data.phone],
			[registrationSsnInput, data.ssn],
			[registrationUsernameInput, data.username],
			[registrationPasswordInput, data.password],
			[registrationConfirmationInput, data.confirmation],
		];

		for (const [locator, value] of fields) {
			if (value !== undefined) {
				await this.factory.getLocator('selector', locator).fill(value);
			}
		}
	}

	async submit(): Promise<void> {
		await this.factory.getLocator('selector', registrationSubmit).click();
	}

	async expectRequiredFieldErrors(): Promise<void> {
		const messages = getMessages().registration;
		for (const message of [
			messages.firstNameRequired,
			messages.lastNameRequired,
			messages.addressRequired,
			messages.cityRequired,
			messages.stateRequired,
			messages.zipCodeRequired,
			messages.ssnRequired,
			messages.usernameRequired,
			messages.passwordRequired,
			messages.confirmationRequired,
		]) {
			await expect(this.factory.getLocator('text', message)).toBeVisible();
		}
	}

	async expectPasswordMismatchError(): Promise<void> {
		await expect(this.factory.getLocator('text', getMessages().registration.passwordMismatch)).toBeVisible();
	}

	async expectDuplicateUsernameError(): Promise<void> {
		await expect(this.factory.getLocator('text', getMessages().registration.duplicateUsername)).toBeVisible();
	}

	async expectRegistrationPage(): Promise<void> {
		await expect(this.page).toHaveURL(/\/register\.htm/);
		await expect(this.factory.getLocator('selector', registrationForm)).toBeVisible();
	}

	static createUniqueRegistrationData(): RegistrationData {
		const data = getRegistrationData();

		return {
			...data,
			username: `user_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
			confirmation: data.password,
		};
	}
}
