import { defineConfig } from '@playwright/test';
import { loadEnvFile, requireEnv } from './src/helpers/env';

loadEnvFile();

const baseURL = requireEnv('BASE_URL');

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL,
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
