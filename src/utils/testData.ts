import fs from 'node:fs';
import path from 'node:path';

const testDataPath = path.resolve(__dirname, '../test-data/test-data.json');

type TestData = {
  registration: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    ssn: string;
    password: string;
  };
  accountOverview: {
    welcomeText: string;
    balanceText: string;
  };
  messages: {
    invalidCredentials: string;
    registration: {
      firstNameRequired: string;
      lastNameRequired: string;
      addressRequired: string;
      cityRequired: string;
      stateRequired: string;
      zipCodeRequired: string;
      ssnRequired: string;
      usernameRequired: string;
      passwordRequired: string;
      confirmationRequired: string;
      passwordMismatch: string;
      duplicateUsername: string;
    };
  };
};

const readTestData = (): TestData => {
  const raw = fs.readFileSync(testDataPath, 'utf-8');
  return JSON.parse(raw) as TestData;
};

export const getAccountOverviewData = () => readTestData().accountOverview;
export const getMessages = () => readTestData().messages;
export const getRegistrationData = () => readTestData().registration;
