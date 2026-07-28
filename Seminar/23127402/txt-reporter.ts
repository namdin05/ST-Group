import type { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

interface TxtReporterOptions {
  outputFile?: string;
}

interface RunResult {
  status: TestResult['status'];
  durationMs: number;
  errorMessage?: string;
}

function cleanErrorMessage(rawMsg: string): string {
  // Loại bỏ mã màu ANSI escape
  const stripped = rawMsg.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
  // Lấy dòng đầu tiên không rỗng
  const lines = stripped.split('\n').map(s => s.trim()).filter(Boolean);
  let firstLine = lines[0] || 'Unspecified error';
  if (firstLine.length > 150) {
    firstLine = firstLine.substring(0, 147) + '...';
  }
  return firstLine;
}

class TxtReporter implements Reporter {
  private outputFile: string;
  // Gom nhóm kết quả theo tên Test Case
  private testCasesMap: Map<string, RunResult[]> = new Map();

  constructor(options: TxtReporterOptions = {}) {
    this.outputFile = options.outputFile || 'test-results.txt';
  }

  onBegin() {
    this.testCasesMap.clear();
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const title = test.title;
    if (!this.testCasesMap.has(title)) {
      this.testCasesMap.set(title, []);
    }

    let errorMessage: string | undefined;
    if (result.status !== 'passed' && result.status !== 'skipped' && result.error) {
      const rawMsg = result.error.message || result.error.value || String(result.error);
      errorMessage = cleanErrorMessage(rawMsg);
    }

    this.testCasesMap.get(title)?.push({
      status: result.status,
      durationMs: result.duration,
      errorMessage,
    });
  }

  onEnd(result: FullResult) {
    const blocks: string[] = [];

    this.testCasesMap.forEach((runs, title) => {
      let passedCount = 0;
      let failedCount = 0;
      let skippedCount = 0;
      let totalDurationMs = 0;

      const runLines: string[] = [];

      runs.forEach((run, index) => {
        totalDurationMs += run.durationMs;

        let symbol = '✓';
        if (run.status === 'passed') {
          passedCount++;
          symbol = '✓';
          runLines.push(`  ${symbol} Run ${index + 1}: ${title}`);
        } else if (run.status === 'skipped') {
          skippedCount++;
          symbol = '-';
          runLines.push(`  ${symbol} Run ${index + 1}: ${title}`);
        } else {
          failedCount++;
          symbol = '✘';
          const errLog = run.errorMessage ? ` -> Error: ${run.errorMessage}` : '';
          runLines.push(`  ${symbol} Run ${index + 1}: ${title}${errLog}`);
        }
      });

      const totalDurationSec = (totalDurationMs / 1000).toFixed(1);

      const summaryLines: string[] = [];
      if (passedCount > 0) summaryLines.push(`${passedCount} passed`);
      if (failedCount > 0) summaryLines.push(`${failedCount} failed`);
      if (skippedCount > 0) summaryLines.push(`${skippedCount} skipped`);
      summaryLines.push(`Total duration: ${totalDurationSec}s`);

      const block = `Running ${runs.length} tests using 1 worker\n\n${runLines.join('\n')}\n\n${summaryLines.join('\n')}`;
      blocks.push(block);
    });

    const outputContent = blocks.join('\n\n');

    // Đường dẫn file đầu ra
    const filePath = path.isAbsolute(this.outputFile)
      ? this.outputFile
      : path.join(process.cwd(), this.outputFile);

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Ghi nội dung vào file .txt
    fs.writeFileSync(filePath, outputContent.trim(), 'utf-8');
    console.log(`\n====================================`);
    console.log(`Đã xuất kết quả ra file: ${filePath}`);
    console.log(`====================================\n`);
  }
}

export default TxtReporter;