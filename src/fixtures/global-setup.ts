import fs from 'node:fs';
import path from 'node:path';

import type { FullConfig } from '@playwright/test';

import { getConfig } from '../components/Helper';

export default function globalSetup(_config: FullConfig): void {
	const { url } = getConfig();

	try {
		new URL(url);
	} catch {
		throw new Error(`Invalid PARABANK_URL: ${url}`);
	}

	const testDataPath = path.resolve(
		__dirname,
		'../test-data/test-data.json',
	);

	if (!fs.existsSync(testDataPath)) {
		throw new Error(`Test data file was not found: ${testDataPath}`);
	}

	fs.mkdirSync(path.resolve('reports'), { recursive: true });

	console.log(`Global setup completed for ${url}`);
}
