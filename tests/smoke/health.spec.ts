import { test, expect } from '@playwright/test';

test('App is reachable @smoke', async ({ page }) => {
  await test.step('Open base URL', async () => {
    await page.goto('/');
  });

  await test.step('Title is correct', async () => {
    await expect(page).toHaveTitle(/Swag Labs/i);
  });
});
