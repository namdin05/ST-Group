import { expect, type APIRequestContext } from '@playwright/test';
import { env } from './config.js';

export type TempUser = { id: number; email: string; password: string };

export async function loginApi(request: APIRequestContext, email: string, password: string) {
  return request.post(`${env.apiUrl}/api/login`, { data: { email, password } });
}

export async function adminToken(request: APIRequestContext) {
  const response = await loginApi(request, env.admin.email, env.admin.password);
  expect(response.ok()).toBeTruthy();
  return (await response.json()).token as string;
}

export async function createTempUser(request: APIRequestContext, label: string): Promise<TempUser> {
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const email = `hw04-${label}-${suffix}@example.test`;
  const password = 'Temp1234!';
  const response = await request.post(`${env.apiUrl}/api/register`, {
    data: { name: `HW04 ${label}`, email, password }
  });
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  return { id: body.id, email, password };
}

export async function deleteTempUser(request: APIRequestContext, user?: TempUser) {
  if (!user) return;
  const token = await adminToken(request);
  await request.delete(`${env.apiUrl}/api/admin/users/${user.id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function categoryApi(request: APIRequestContext, method: 'post' | 'delete', path: string, token?: string, data?: unknown) {
  return request.fetch(`${env.apiUrl}${path}`, {
    method: method.toUpperCase(),
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    data
  });
}
