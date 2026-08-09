import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import executionMatrix from '../tests/data/execution-matrix.json' with { type: 'json' };

const logDir = 'test-results/matrix-logs';
mkdirSync(logDir, { recursive: true });

const runs = [];
for (const feature of executionMatrix.features) {
  for (const browser of executionMatrix.browsers) {
    const featureId = feature.id;
    const browserName = browser.name;
    const reportDir = `reports/${featureId}/${browserName}`;
    if (process.env.SKIP_EXISTING === '1' && existsSync(join(reportDir, 'index.html'))) {
      runs.push({ feature: featureId, browser: browserName, status: 'existing' });
      continue;
    }
    const timestamp = new Date().toISOString();
    const command = process.execPath;
    const result = spawnSync(command, ['node_modules/@playwright/test/cli.js', 'test', feature.spec, `--project=${browserName}`], {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: 'pipe',
      env: {
        ...process.env,
        FEATURE: featureId,
        BROWSER: browserName,
        RUN_TIMESTAMP: timestamp,
        PLAYWRIGHT_HTML_OUTPUT_DIR: reportDir
      }
    });
    const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}\n${result.error?.stack ?? ''}`;
    writeFileSync(join(logDir, `${featureId}-${browserName}.log`), output, 'utf8');
    process.stdout.write(`[${featureId}/${browserName}] exit=${result.status}\n`);
    runs.push({ feature: featureId, browser: browserName, timestamp, exitCode: result.status, status: result.error ? 'runner-error' : result.status === 0 ? 'passed' : 'completed-with-failures' });
  }
}

writeFileSync('test-results/matrix-runs.json', JSON.stringify({ generatedAt: new Date().toISOString(), runs }, null, 2));
process.stdout.write('Matrix completed. Test failures are preserved as SUT evidence.\n');
