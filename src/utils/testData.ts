import fs from 'node:fs';
import path from 'node:path';

const testDataPath = path.resolve(__dirname, '../test-data/test-data.json');

type TestData = {
  accountOverview: {
    welcomeText: string;
    balanceText: string;
  };
  messages: {
    invalidCredentials: string;
  };
};

const readTestData = (): TestData => {
  const raw = fs.readFileSync(testDataPath, 'utf-8');
  return JSON.parse(raw) as TestData;
};

export const getAccountOverviewData = () => readTestData().accountOverview;
export const getMessages = () => readTestData().messages;
