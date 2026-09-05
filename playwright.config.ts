import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

const browserName = (process.env.BROWSER_NAME ?? 'chromium').toLowerCase();
const browserMode = (process.env.BROWSER_MODE ?? 'maximize').toLowerCase();

const browserConfigs = {
  chromium: devices['Desktop Chrome'],
  firefox: devices['Desktop Firefox'],
  webkit: devices['Desktop Safari'],
} as const;

const selectedBrowser = browserConfigs[browserName as keyof typeof browserConfigs] ?? devices['Desktop Chrome'];

export default defineConfig({
  testDir: './tests',

  globalSetup: './src/fixtures/global-setup.ts',

  globalTeardown: './src/fixtures/global-teardown.ts',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['./src/utils/MetricsReporter.ts'],
  ],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    launchOptions:
      browserMode === 'maximize'
        ? {
          args: ['--start-maximized'],
        }
        : undefined,
  },

  projects: [
    {
      name: browserName,
      use: {
        ...selectedBrowser,
      },
    },
  ],
});
