import wf01 from '../load/23127430_Load_20260814.js';

const RUN_MODE = (__ENV.RUN_MODE || 'spike').toLowerCase();
const SPIKE_VUS = 25;

const userRows = open('../../test-data/users.csv')
  .replace(/^\uFEFF/, '')
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

if (userRows.length - 1 < SPIKE_VUS) {
  throw new Error(`Spike profile requires ${SPIKE_VUS} unique users; found ${userRows.length - 1}`);
}

const thresholds = {
  http_req_failed: ['rate<0.01'],
  functional_failures: ['rate==0'],
  http_req_duration: ['p(95)<500'],
  checks: ['rate==1'],
};

export const options = RUN_MODE === 'dry-run'
  ? {
      scenarios: {
        wf01_spike_dry_run: {
          executor: 'shared-iterations',
          vus: 1,
          iterations: 1,
          maxDuration: '2m',
          tags: { profile: 'spike-dry-run' },
        },
      },
      thresholds,
    }
  : {
      scenarios: {
        wf01_spike: {
          executor: 'ramping-vus',
          startVUs: 1,
          stages: [
            { duration: '30s', target: 1 },
            { duration: '5s', target: SPIKE_VUS },
            { duration: '1m', target: SPIKE_VUS },
            { duration: '5s', target: 1 },
            { duration: '30s', target: 1 },
            { duration: '10s', target: 0 },
          ],
          gracefulRampDown: '30s',
          gracefulStop: '30s',
          tags: { profile: 'spike-25-vus' },
        },
      },
      thresholds,
    };

export default wf01;

