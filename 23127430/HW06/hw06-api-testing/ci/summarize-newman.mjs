import fs from "node:fs";

const reportPath = "23127430/HW06/hw06-api-testing/reports/ci/newman-result.json";
if (!fs.existsSync(reportPath)) {
  console.error(`Newman report is missing: ${reportPath}`);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
const stats = report.run?.stats ?? {};
const assertionTotal = stats.assertions?.total ?? 0;
const assertionFailed = stats.assertions?.failed ?? 0;
const requestFailed = stats.requests?.failed ?? 0;
const testScriptFailed = stats.testScripts?.failed ?? 0;
const prerequestFailed = stats.prerequestScripts?.failed ?? 0;
const iterations = stats.iterations?.total ?? 0;
const summary = [
  "## HW06 Newman result",
  "",
  `- Iterations: ${iterations}`,
  `- Assertions: ${assertionTotal}`,
  `- Failed assertions: ${assertionFailed}`,
  `- Failed requests: ${requestFailed}`,
  `- Failed test scripts: ${testScriptFailed}`,
  `- Failed prerequest scripts: ${prerequestFailed}`,
].join("\n");

console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
}

if (assertionFailed || requestFailed || testScriptFailed || prerequestFailed) {
  process.exit(1);
}

