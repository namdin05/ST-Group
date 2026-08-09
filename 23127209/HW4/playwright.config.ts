import { defineConfig, devices } from '@playwright/test';

const studentId = process.env.STUDENT_ID ?? '23127209';
const runTimestamp = process.env.RUN_TIMESTAMP ?? new Date().toISOString();
const feature = process.env.FEATURE ?? 'all-features';
const selectedBrowser = process.env.BROWSER ?? 'all-browsers';
const reportDir = process.env.PLAYWRIGHT_HTML_OUTPUT_DIR ?? `reports/${feature}/${selectedBrowser}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 50_000,
  expect: { timeout: 10_000 },
  retries: 0,
  maxFailures: 0,
  outputDir: `test-results/${feature}/${selectedBrowser}`,
  reporter: [
    ['line'],
    ['json', { outputFile: `test-results/${feature}/${selectedBrowser}/results.json` }],
    ['html', { outputFolder: reportDir, open: 'never' }]
  ],
  metadata: {
    'Run by': studentId,
    'Run timestamp': runTimestamp,
    Feature: feature,
    Browser: selectedBrowser
  },
  use: {
    baseURL: process.env.WEB_BASE_URL ?? 'http://localhost:5173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
