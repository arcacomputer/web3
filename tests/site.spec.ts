import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('renders the complete evidence-led portfolio', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Shipped and verifiable/);
  await expect(page.getByRole('heading', { name: 'Web3 work. Shipped and verifiable.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'WarpletScan' })).toBeVisible();
  await expect(page.getByText('49,060')).toBeVisible();
  await expect(page.getByText('Alchemy', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Hypersnap Doctor' })).toBeVisible();
});

test('has no document-level horizontal overflow', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('passes automated WCAG checks', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
  expect(results.incomplete.filter(({ id }) => id === 'aria-prohibited-attr')).toEqual([]);
});

test('skip link moves keyboard focus to main content', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main#content')).toBeFocused();
});

test('serves the branded 404 page', async ({ page }) => {
  const response = await page.goto('/missing-route');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'This trace ends here.' })).toBeVisible();
});