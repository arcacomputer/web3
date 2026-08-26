import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:8787';
const output = new URL('../test-results/visual/', import.meta.url);
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ headless: true });
const consoleErrors = [];

for (const target of [
  { name: 'desktop', viewport: { width: 1440, height: 1000 }, mobile: false },
  { name: 'mobile', viewport: { width: 390, height: 844 }, mobile: true }
]) {
  const context = await browser.newContext({ viewport: target.viewport, isMobile: target.mobile });
  const page = await context.newPage();
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(`${target.name}: ${message.text()}`);
  });
  const response = await page.goto(baseURL, { waitUntil: 'networkidle' });
  if (!response?.ok()) throw new Error(`${target.name} returned ${response?.status()}`);
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => element.decode());
  }
  const brokenImages = await page.locator('img').evaluateAll((images) => images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.getAttribute('src')));
  if (brokenImages.length) throw new Error(`${target.name} broken images: ${brokenImages.join(', ')}`);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: fileURLToPath(new URL(`${target.name}-hero.png`, output)), fullPage: false });
  await page.locator('#work').screenshot({ path: fileURLToPath(new URL(`${target.name}-featured.png`, output)) });
  await page.locator('.portfolio').screenshot({ path: fileURLToPath(new URL(`${target.name}-portfolio.png`, output)) });
  await page.screenshot({ path: fileURLToPath(new URL(`${target.name}-full.png`, output)), fullPage: true });
  await context.close();
}

await browser.close();
if (consoleErrors.length) throw new Error(`Console errors:\n${consoleErrors.join('\n')}`);
console.log(`visual captures written from ${baseURL}`);
