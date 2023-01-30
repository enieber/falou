import { test, expect } from '@playwright/test';

const baseUrl = process.env.URL || 'http://localhost:3000'

test('has list of Senadores', async ({ page }) => {
  await page.goto(baseUrl);

  await page.getByRole('link', { name: 'Senadores' }).click();

  await expect(page).toHaveURL(`${baseUrl}/senadores`);
});

test('has text number of senadores', async ({ page }) => {
  await page.goto(baseUrl);

  await page.getByRole('link', { name: 'Senadores' }).click();

  const element = await page.locator('#card-senators > h4');

  await expect(element).toContainText('O Brasil tem 79 senadores');
})

test('has text number of comissões', async ({ page }) => {
  await page.goto(baseUrl);

  await page.getByRole('link', { name: 'Senadores' }).click();

  const element = await page.locator('#card-commisoes > h4');

  await expect(element).toContainText('O senado tem 8 comissões');
})

test('test of search senadores by name with 1 result', async ({ page }) => {
  await page.goto(baseUrl);

  await page.getByRole('link', { name: 'Senadores' }).click();

  await page.selectOption("text=Filtrar", {label: "Por Nome"})

  await page.locator("#search").fill("Alessandro Vieira");
  
  await expect(page.locator("li")).toHaveCount(1);
})

test('test of search senadores by name withoult result', async ({ page }) => {
  await page.goto(baseUrl);

  await page.getByRole('link', { name: 'Senadores' }).click();

  await page.selectOption("text=Filtrar", { label: "Por Nome"})

  await page.locator("#search").fill("asdf");
  
  await expect(page.locator("li")).toHaveCount(0);
})

test('test of search senadores by state with 3 result', async ({ page }) => {
  await page.goto(baseUrl);

  await page.getByRole('link', { name: 'Senadores' }).click();

  await page.selectOption("text=Filtrar", {label: "Por Estado"})

  await page.locator("#search").fill("sp");
  
  await expect(page.locator("li")).toHaveCount(3);
})


test('test of search senadores by state with withoult result', async ({ page }) => {
  await page.goto(baseUrl);

  await page.getByRole('link', { name: 'Senadores' }).click();

  await page.selectOption("text=Filtrar", {label: "Por Estado"})

  await page.locator("#search").fill("asdf");
  
  await expect(page.locator("li")).toHaveCount(0);
})

test('test of search senadores by "Partido" with 2 result', async ({ page }) => {
  await page.goto(baseUrl);

  await page.getByRole('link', { name: 'Senadores' }).click();

  await page.selectOption("text=Filtrar", {label: "Por Partido"})

  await page.locator("#search").fill("ptb");
  
  await expect(page.locator("li")).toHaveCount(2);
})


test('test of search senadores by "Partido" with withoult result', async ({ page }) => {
  await page.goto(baseUrl);

  await page.getByRole('link', { name: 'Senadores' }).click();

  await page.selectOption("text=Filtrar", { label: "Por Partido" })

  await page.locator("#search").fill("asdf");
  
  await expect(page.locator("li")).toHaveCount(0);
})

