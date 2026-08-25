import { promises as fs } from 'node:fs';
import path from 'node:path';
import { test as base, expect } from '@playwright/test';
import type { FullConfig } from '@playwright/test';
import { createUserData, UserData } from '../test-data/userData';

export type FrameworkFixtures = {
  testUser: UserData;
};

export const test = base.extend<FrameworkFixtures>({
  testUser: async ({ baseURL }, use) => {
    void baseURL;
    await use(createUserData());
  },
});

export { expect };

export default async function globalSetup(config: FullConfig): Promise<void> {
  const outputDir = path.resolve(config.rootDir, 'test-results');
  const runMarker = path.join(outputDir, '.run-started');

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(
    runMarker,
    JSON.stringify(
      {
        environment: process.env.TEST_ENV ?? 'qa',
        baseUrl: process.env.BASE_URL,
        startedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
    'utf8',
  );
}
