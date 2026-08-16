import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, 'config/environments/qa.env'),
});
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  // Maximum time allowed for each test.
  timeout: 30_000,

  // Maximum time allowed for each assertion.
  expect: {
    timeout: 30_000,
  },

  // Directory for screenshots, videos and traces.
  outputDir: './test-results',

  // HTML report + JUnit report for CI/CD integration.
  reporter: [
    [
      'html',
      {
        outputFolder: './playwright-report',
        open: 'never',
      },
    ],
    [
      'junit',
      {
        outputFile: './test-results/results.xml',
      },
    ],
  ],

  use: {
    // QA environment URL.
    baseURL: process.env.BASE_URL,

    // Maximum time for individual Playwright actions.
    actionTimeout: 30_000,

    // Maximum time for navigation.
    navigationTimeout: 30_000,

    // Debugging artifacts.
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'], // ensures browser starts maximized
        },
        deviceScaleFactor: undefined,
      },      
    },

    // Enable when cross-browser execution is ready.
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});