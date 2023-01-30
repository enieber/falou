import { test, expect } from '@playwright/test';

const baseUrl = process.env.URL || 'http://localhost:3000'

test('has title Falou', async ({ page }) => {
  await page.goto(baseUrl);

  await expect(page).toHaveTitle(/Falou/);
});

