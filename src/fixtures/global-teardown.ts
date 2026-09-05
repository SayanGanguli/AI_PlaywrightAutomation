import fs from 'node:fs';
import path from 'node:path';
import type { FullConfig } from '@playwright/test';

export default function globalTeardown(_config: FullConfig): void {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const archiveDir = path.resolve('reports', `archive-${timestamp}`);

  const artifacts = [
    path.resolve('playwright-report'),
    path.resolve('reports', 'test-metrics.json'),
  ];

  // Create archive directory
  fs.mkdirSync(archiveDir, { recursive: true });

  // Move artifacts if they exist
  artifacts.forEach((artifactPath) => {
    if (fs.existsSync(artifactPath)) {
      const fileName = path.basename(artifactPath);
      const destPath = path.join(archiveDir, fileName);

      // For directories like playwright-report, copy recursively
      if (fs.lstatSync(artifactPath).isDirectory()) {
        fs.cpSync(artifactPath, destPath, { recursive: true });
      } else {
        fs.copyFileSync(artifactPath, destPath);
      }
    }
  });

  console.log(`Global teardown completed. Artifacts archived in: ${archiveDir}`);
}
