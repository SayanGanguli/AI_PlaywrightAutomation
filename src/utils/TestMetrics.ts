import fs from 'node:fs';
import path from 'node:path';

export interface TestMetric {
    title: string;
    status:
    | 'passed'
    | 'failed'
    | 'skipped'
    | 'flaky'
    | 'timedOut'
    | 'interrupted';
    duration: number;
    retries: number;
    browser: string;
    file: string;
}

export interface TestMetricsSummary {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    flaky: number;
    passRate: string;
    failRate: string;
    skipRate: string;
    totalDuration: number;
    totalRetries: number;
    generatedAt: string;
    tests: TestMetric[];
}

export class TestMetrics {
    private static tests: TestMetric[] = [];

    static addTest(metric: TestMetric): void {
        this.tests.push(metric);
    }

    static generateSummary(): TestMetricsSummary {
        const total = this.tests.length;

        const passed = this.tests.filter(
            (test) => test.status === 'passed',
        ).length;

        const failed = this.tests.filter(
            (test) => test.status === 'failed',
        ).length;

        const skipped = this.tests.filter(
            (test) => test.status === 'skipped',
        ).length;

        const flaky = this.tests.filter(
            (test) => test.status === 'flaky',
        ).length;

        const totalDuration = this.tests.reduce(
            (sum, test) => sum + test.duration,
            0,
        );

        const totalRetries = this.tests.reduce(
            (sum, test) => sum + test.retries,
            0,
        );

        return {
            total,
            passed,
            failed,
            skipped,
            flaky,
            passRate: this.calculatePercentage(passed, total),
            failRate: this.calculatePercentage(failed, total),
            skipRate: this.calculatePercentage(skipped, total),
            totalDuration,
            totalRetries,
            generatedAt: new Date().toISOString(),
            tests: this.tests,
        };
    }

    static writeReport(): void {
        const summary = this.generateSummary();

        const reportDirectory = path.resolve('reports');

        fs.mkdirSync(reportDirectory, {
            recursive: true,
        });

        const reportPath = path.join(
            reportDirectory,
            'test-metrics.json',
        );

        fs.writeFileSync(
            reportPath,
            JSON.stringify(summary, null, 2),
            'utf-8',
        );

        console.log('\n========== TEST METRICS ==========');
        console.log(`Total Tests : ${summary.total}`);
        console.log(`Passed      : ${summary.passed}`);
        console.log(`Failed      : ${summary.failed}`);
        console.log(`Skipped     : ${summary.skipped}`);
        console.log(`Flaky       : ${summary.flaky}`);
        console.log(`Pass Rate   : ${summary.passRate}`);
        console.log(`Fail Rate   : ${summary.failRate}`);
        console.log(`Skip Rate   : ${summary.skipRate}`);
        console.log(
            `Duration    : ${this.formatDuration(summary.totalDuration)}`,
        );
        console.log(`Retries     : ${summary.totalRetries}`);
        console.log('==================================\n');
    }

    private static calculatePercentage(
        value: number,
        total: number,
    ): string {
        if (total === 0) {
            return '0%';
        }

        return `${((value / total) * 100).toFixed(2)}%`;
    }

    private static formatDuration(duration: number): string {
        const seconds = Math.floor(duration / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes}m ${remainingSeconds}s`;
    }
}