import wf01 from '../load/23127430_Load_20260814.js';

const RUN_MODE = (__ENV.RUN_MODE || 'endurance').toLowerCase();
const MAX_ENDURANCE_VUS = 20;

const userRows = open('../../test-data/users.csv')
  .replace(/^\uFEFF/, '')
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

if (userRows.length - 1 < MAX_ENDURANCE_VUS) {
  throw new Error(`Endurance profile requires ${MAX_ENDURANCE_VUS} unique users; found ${userRows.length - 1}`);
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
        wf01_endurance_dry_run: {
          executor: 'shared-iterations',
          vus: 1,
          iterations: 1,
          maxDuration: '2m',
          tags: { profile: 'endurance-dry-run' },
        },
      },
      thresholds,
    }
  : {
      scenarios: {
        wf01_endurance: {
          executor: 'ramping-vus',
          startVUs: 1,
          stages: [
            { duration: '1m', target: MAX_ENDURANCE_VUS },
            { duration: '12m', target: MAX_ENDURANCE_VUS },
            { duration: '1m', target: 0 },
          ],
          gracefulRampDown: '30s',
          gracefulStop: '30s',
          tags: { profile: 'endurance-20-vus-12m-hold' },
        },
      },
      thresholds,
    };

export default wf01;
