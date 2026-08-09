export const env = {
  webUrl: process.env.WEB_BASE_URL ?? 'http://localhost:5173',
  adminUrl: process.env.ADMIN_BASE_URL ?? 'http://localhost:5174',
  apiUrl: process.env.API_BASE_URL ?? 'http://localhost:3000',
  studentId: process.env.STUDENT_ID ?? '23127209',
  user: {
    email: process.env.USER_EMAIL ?? 'test@eshop.com',
    password: process.env.USER_PASSWORD ?? 'Test1234!'
  },
  admin: {
    email: process.env.ADMIN_EMAIL ?? 'admin@eshop.com',
    password: process.env.ADMIN_PASSWORD ?? 'Admin123!'
  }
} as const;

export type CaseRecord = {
  id: string;
  description: string;
  preconditions: string[];
  input: Record<string, unknown>;
  expected: string[];
  references: string[];
};
