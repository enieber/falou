import { test, expect } from '@playwright/test';

test('has title Falou', async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Falou/);
});

