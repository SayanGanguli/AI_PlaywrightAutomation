import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { FullConfig } from '@playwright/test';

export default async function globalTeardown(config: FullConfig): Promise<void> {
  const outputDir = path.resolve(config.rootDir, 'test-results');
  const runMarker = path.join(outputDir, '.run-started');

  await fs.rm(runMarker, { force: true });
}
