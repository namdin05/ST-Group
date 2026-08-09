import type { TestInfo } from '@playwright/test';
import type { CaseRecord } from './config.js';

export function annotateCase(testInfo: TestInfo, record: CaseRecord) {
  testInfo.annotations.push(
    { type: 'Run by', description: process.env.STUDENT_ID ?? '23127209' },
    { type: 'Test case', description: record.id },
    { type: 'References', description: record.references.join(', ') }
  );
}

export async function attachJson(testInfo: TestInfo, name: string, value: unknown) {
  await testInfo.attach(name, {
    body: Buffer.from(JSON.stringify(value, null, 2), 'utf8'),
    contentType: 'application/json'
  });
}
