# HW06 CI/CD Report

## Pipeline Configuration

- Workflow: `.github/workflows/hw06-api-ci.yml`
- Trigger branches: `23127430-HW06`, `ci-failure-demo`
- Runtime: GitHub-hosted Ubuntu runner with Node.js 22
- SUT startup: unchanged EShop backend at `http://127.0.0.1:3000`
- Test runner: Newman 6.2.2
- CI sample: three data-driven cases covering FR-01, FR-07, and FR-13
- Evidence: CLI output, JSON report, job summary, and uploaded Newman artifact

## Run 1 — All Passing

- Branch: `23127430-HW06`
- Commit: [ce2a2e08406edafdb43ef64e5e74db0997249edb](https://github.com/namdin05/ST-Group/commit/ce2a2e08406edafdb43ef64e5e74db0997249edb)
- GitHub Actions run: [HW06 API CI Sample #1](https://github.com/namdin05/ST-Group/actions/runs/32556187492)
- Result: **SUCCESS** — 3 iterations, 20 requests, 42 assertions, 0 failed assertions, 0 failed requests, 0 failed test scripts, and 0 failed prerequest scripts
- Artifact: `hw06-newman-32556187492`

## Run 2 — One Controlled Failure

- Branch: `ci-failure-demo`
- Commit: [ae4b51c3d369323f8bffa5b8d286fe257bad8ae3](https://github.com/namdin05/ST-Group/commit/ae4b51c3d369323f8bffa5b8d286fe257bad8ae3)
- GitHub Actions run: [HW06 API CI Sample #2](https://github.com/namdin05/ST-Group/actions/runs/32556289946)
- Result: **FAILURE (controlled)** — 3 iterations, 20 requests, 42 assertions, exactly 1 failed assertion, 0 failed requests, 0 failed test scripts, and 0 failed prerequest scripts
- Controlled change: `FR01-API-TC001` expected HTTP status changed from `200` to `201`; SUT unchanged
- Failure evidence: actual status `200` did not equal controlled expected status `201`
- Artifact: `hw06-newman-32556289946`
- Merge status: Not merged into main or `23127430-HW06`

## Screenshots

Screenshots are intentionally left for the student to capture from the real GitHub Actions UI after both runs complete.
