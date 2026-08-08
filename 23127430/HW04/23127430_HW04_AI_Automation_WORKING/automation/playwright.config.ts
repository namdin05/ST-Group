import { defineConfig, devices } from '@playwright/test';

const runTimestamp = new Date().toISOString();
const reportOutputFolder =
  process.env.HW04_REPORT_DIR ?? '../html-reports/fr01/chromium';

export default defineConfig({
  testDir: './tests',
  reporter: [
    [
      'html',
      {
        outputFolder: reportOutputFolder,
        open: 'never',
        title: `HW04 AI Automation Testing | Run by: 23127430 | ${runTimestamp}`,
      },
    ],
  ],
  metadata: {
    runBy: '23127430',
    runTimestamp,
  },
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
