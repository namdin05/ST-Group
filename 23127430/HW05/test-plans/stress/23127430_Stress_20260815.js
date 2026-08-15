import wf01 from '../load/23127430_Load_20260814.js';

const RUN_MODE = (__ENV.RUN_MODE || 'stress').toLowerCase();
const MAX_STRESS_VUS = 50;

const userRows = open('../../test-data/users.csv')
  .replace(/^\uFEFF/, '')
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

if (userRows.length - 1 < MAX_STRESS_VUS) {
  throw new Error(`Stress profile requires ${MAX_STRESS_VUS} unique users; found ${userRows.length - 1}`);
}

const thresholds = {
  http_req_failed: ['rate<0.05'],
  functional_failures: ['rate<0.01'],
  http_req_duration: ['p(95)<1000'],
  checks: ['rate>0.99'],
};

export const options = RUN_MODE === 'dry-run'
  ? {
      scenarios: {
        wf01_stress_dry_run: {
          executor: 'shared-iterations',
          vus: 1,
          iterations: 1,
          maxDuration: '2m',
          tags: { profile: 'stress-dry-run' },
        },
      },
      thresholds,
    }
  : {
      scenarios: {
        wf01_stress: {
          executor: 'ramping-vus',
          startVUs: 5,
          stages: [
            { duration: '30s', target: 5 },
            { duration: '30s', target: 10 },
            { duration: '30s', target: 10 },
            { duration: '30s', target: 20 },
            { duration: '30s', target: 20 },
            { duration: '30s', target: 35 },
            { duration: '30s', target: 35 },
            { duration: '30s', target: MAX_STRESS_VUS },
            { duration: '1m', target: MAX_STRESS_VUS },
            { duration: '30s', target: 0 },
          ],
          gracefulRampDown: '30s',
          gracefulStop: '30s',
          tags: { profile: 'stress-50-vus' },
        },
      },
      thresholds,
    };

export default wf01;

