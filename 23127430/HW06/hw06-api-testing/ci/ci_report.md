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

- Commit: PENDING REAL RUN
- GitHub Actions run: PENDING REAL RUN
- Result: PENDING REAL RUN

## Run 2 — One Controlled Failure

- Branch: `ci-failure-demo`
- Commit: PENDING REAL RUN
- GitHub Actions run: PENDING REAL RUN
- Result: PENDING REAL RUN
- Controlled change: one expected HTTP-status assertion only; SUT unchanged
- Merge status: Must not be merged into main or `23127430-HW06`

## Screenshots

Screenshots are intentionally left for the student to capture from the real GitHub Actions UI after both runs complete.
