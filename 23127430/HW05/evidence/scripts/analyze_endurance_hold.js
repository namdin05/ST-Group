const fs = require('fs');
const readline = require('readline');

function argument(name) {
  const index = process.argv.indexOf(name);
  if (index < 0 || index + 1 >= process.argv.length) {
    throw new Error(`Missing ${name}`);
  }
  return process.argv[index + 1];
}

function percentile(values, percentileValue) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const index = (sorted.length - 1) * percentileValue;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
}

function stats(values) {
  if (!values.length) return null;
  return {
    first: values[0],
    last: values[values.length - 1],
    min: Math.min(...values),
    max: Math.max(...values),
    average: values.reduce((sum, value) => sum + value, 0) / values.length,
    delta: values[values.length - 1] - values[0],
  };
}

function regression(points) {
  if (points.length < 2) return null;
  const xMean = points.reduce((sum, point) => sum + point.x, 0) / points.length;
  const yMean = points.reduce((sum, point) => sum + point.y, 0) / points.length;
  let numerator = 0;
  let denominator = 0;
  for (const point of points) {
    numerator += (point.x - xMean) * (point.y - yMean);
    denominator += (point.x - xMean) ** 2;
  }
  const slope = numerator / denominator;
  let total = 0;
  let residual = 0;
  for (const point of points) {
    const predicted = yMean + slope * (point.x - xMean);
    total += (point.y - yMean) ** 2;
    residual += (point.y - predicted) ** 2;
  }
  return {
    slopeMbPerMinute: slope,
    rSquared: total === 0 ? 1 : 1 - residual / total,
  };
}

function parseCsvLine(line) {
  return line.split(',').map((value) => value.replace(/^"|"$/g, '').replace(/""/g, '"'));
}

async function main() {
  const statePath = argument('--state');
  const rawPath = argument('--raw');
  const resourcePath = argument('--resources');
  const outputPath = argument('--out');
  const state = JSON.parse(fs.readFileSync(statePath, 'utf8').replace(/^\uFEFF/, ''));
  const executionStartMs = Date.parse(state.enduranceStartedAt);
  const holdStartMs = executionStartMs + 60_000;
  const holdEndMs = executionStartMs + 780_000;
  const holdSeconds = (holdEndMs - holdStartMs) / 1000;
  const values = {
    http_req_duration: [],
    http_req_failed: [],
    checks: [],
    functional_failures: [],
    http_reqs: [],
    iterations: [],
  };

  const input = readline.createInterface({
    input: fs.createReadStream(rawPath, { encoding: 'utf8' }),
    crlfDelay: Infinity,
  });
  for await (const line of input) {
    if (!line || line[0] !== '{') continue;
    const record = JSON.parse(line);
    if (record.type !== 'Point' || !Object.hasOwn(values, record.metric)) continue;
    const timeMs = Date.parse(record.data.time);
    if (timeMs < holdStartMs || timeMs >= holdEndMs) continue;
    values[record.metric].push(Number(record.data.value));
  }

  const csvLines = fs.readFileSync(resourcePath, 'utf8').replace(/^\uFEFF/, '').trim().split(/\r?\n/);
  const headers = parseCsvLine(csvLines.shift());
  const resourceRows = csvLines.map((line) => {
    const fields = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, fields[index]]));
  }).filter((row) => {
    const timeMs = Date.parse(row.timestamp);
    return row.k6_running === 'True' && timeMs >= holdStartMs && timeMs < holdEndMs;
  });

  const backendPoints = resourceRows.map((row) => ({
    x: (Date.parse(row.timestamp) - holdStartMs) / 60_000,
    y: Number(row.backend_working_set_mb),
  }));
  const k6Points = resourceRows.map((row) => ({
    x: (Date.parse(row.timestamp) - holdStartMs) / 60_000,
    y: Number(row.k6_working_set_mb),
  }));
  const backendValues = backendPoints.map((point) => point.y);
  const k6Values = k6Points.map((point) => point.y);
  const availableValues = resourceRows.map((row) => Number(row.available_memory_mb));
  const httpRequestCount = values.http_reqs.reduce((sum, value) => sum + value, 0);
  const iterationCount = values.iterations.reduce((sum, value) => sum + value, 0);
  const checkCount = values.checks.length;
  const passedChecks = values.checks.reduce((sum, value) => sum + value, 0);

  const result = {
    source: {
      executionState: statePath,
      rawMetricStream: rawPath,
      resourceSeries: resourcePath,
    },
    profile: {
      targetVus: 20,
      rampUpSeconds: 60,
      holdSeconds,
      rampDownSeconds: 60,
      holdStart: new Date(holdStartMs).toISOString(),
      holdEnd: new Date(holdEndMs).toISOString(),
    },
    holdMetrics: {
      httpRequests: httpRequestCount,
      stableRequestRate: httpRequestCount / holdSeconds,
      completedIterations: iterationCount,
      iterationRate: iterationCount / holdSeconds,
      httpDurationMs: {
        samples: values.http_req_duration.length,
        average: values.http_req_duration.reduce((sum, value) => sum + value, 0) / values.http_req_duration.length,
        p50: percentile(values.http_req_duration, 0.5),
        p90: percentile(values.http_req_duration, 0.9),
        p95: percentile(values.http_req_duration, 0.95),
        p99: percentile(values.http_req_duration, 0.99),
        max: Math.max(...values.http_req_duration),
      },
      httpFailureRate: values.http_req_failed.reduce((sum, value) => sum + value, 0) / values.http_req_failed.length,
      functionalFailureRate: values.functional_failures.reduce((sum, value) => sum + value, 0) / values.functional_failures.length,
      checks: {
        total: checkCount,
        passed: passedChecks,
        failed: checkCount - passedChecks,
        passRate: passedChecks / checkCount,
      },
    },
    holdResources: {
      samples: resourceRows.length,
      backendWorkingSetMb: {
        ...stats(backendValues),
        ...regression(backendPoints),
      },
      k6WorkingSetMb: {
        ...stats(k6Values),
        ...regression(k6Points),
      },
      availableMemoryMb: stats(availableValues),
    },
  };

  fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
