const { test, expect } = require('@playwright/test');
const {
  ar,
  en,
  expectNoPageErrors,
  expectNoRawLocalizationKeys,
  trackPageErrors,
  useCleanPreferences
} = require('./helpers');

test('Switches Arabic and English while updating text and direction', async ({ page }) => {
  const pageErrors = trackPageErrors(page);
  await useCleanPreferences(page);

  await page.goto('/courses/python/practice/index.html');
  await expect(page.locator('#practice-questions-container .practice-question-card')).toHaveCount(25);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.getByText(en.practice.all_questions)).toBeVisible();
  await expect(page.getByPlaceholder(en.practice.search_placeholder)).toBeVisible();

  // Test: Toggle label on English should be 'عربي'
  await expect(page.locator('#lang-toggle')).toContainText('عربي');

  await page.locator('#lang-toggle').click();

  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByText(ar.practice.all_questions)).toBeVisible();
  await expect(page.getByPlaceholder(ar.practice.search_placeholder)).toBeVisible();
  await expect(page.getByText(ar.practice.continue_learning)).toBeVisible();
  await expect(page.locator('#practice-questions-container .practice-question-card')).toHaveCount(25);

  // Test: Toggle label on Arabic should be EN
  await expect(page.locator('#lang-toggle')).toContainText('EN');

  await page.locator('#lang-toggle').click();

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.getByText(en.practice.all_questions)).toBeVisible();
  await expect(page.getByPlaceholder(en.practice.search_placeholder)).toBeVisible();
  await expect(page.locator('#practice-questions-container .practice-question-card')).toHaveCount(25);

  // Test: Toggle label back on English should be 'عربي'
  await expect(page.locator('#lang-toggle')).toContainText('عربي');

  await expectNoRawLocalizationKeys(page);
  await expectNoPageErrors(pageErrors);
});

test('Language toggle label persists after refresh', async ({ page }) => {
  await useCleanPreferences(page);
  await page.goto('/');

  // Switch to Arabic
  await page.locator('#lang-toggle').click();
  await expect(page.locator('#lang-toggle')).toContainText('EN');

  await page.reload();

  // Verify persistence
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('#lang-toggle')).toContainText('EN');
});
