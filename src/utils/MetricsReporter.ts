import type {
    FullConfig,
    FullResult,
    Reporter,
    TestCase,
    TestResult,
} from '@playwright/test/reporter';

import { TestMetrics } from './TestMetrics';

class MetricsReporter implements Reporter {
    onBegin(config: FullConfig): void {
        console.log(
            `\nStarting test execution with ${config.workers} worker(s)...`,
        );
    }

    onTestEnd(
        test: TestCase,
        result: TestResult,
    ): void {
        let status:
            | 'passed'
            | 'failed'
            | 'skipped'
            | 'flaky'
            | 'timedOut'
            | 'interrupted' = result.status;

        if (result.status === 'passed' && result.retry > 0) {
            status = 'flaky';
        }

        TestMetrics.addTest({
            title: test.title,
            status,
            duration: result.duration,
            retries: result.retry,
            browser: test.parent.project()?.name ?? 'unknown',
            file: test.location.file,
        });
    }

    onEnd(result: FullResult): void {
        console.log(`\nOverall test run status: ${result.status}`);

        TestMetrics.writeReport();
    }
}

export default MetricsReporter;