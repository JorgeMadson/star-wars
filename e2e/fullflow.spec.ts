import { test, expect } from '@playwright/test';

test('Test until the details page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('rowheader', { name: 'Luke Skywalker' }).click();
  await page.getByText('2', { exact: true }).click();
  await page.getByRole('row', { name: 'Anakin Skywalker 188cm male Details' }).getByRole('link').click();
  await page.getByText('Height: 188 cm').click();
});