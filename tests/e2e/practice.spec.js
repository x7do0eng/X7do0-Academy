const { test, expect } = require('@playwright/test');
const {
  en,
  expectNoPageErrors,
  expectNoRawLocalizationKeys,
  trackPageErrors,
  useCleanPreferences
} = require('./helpers');

test('Practice page renders questions, categories, and progress widgets', async ({ page }) => {
  const pageErrors = trackPageErrors(page);
  await useCleanPreferences(page);

  await page.goto('/courses/python/practice/index.html');

  await expect(page.getByRole('heading', { name: /Python Practice Questions/ })).toBeVisible();
  await expect(page.locator('#practice-questions-container .practice-question-card')).toHaveCount(25);
  await expect(page.locator('#practice-categories-sidebar button')).toHaveCount(12);
  await expect(page.locator('#progress-mount-point')).toContainText(en.practice.progress);
  await expect(page.locator('#progress-mount-point')).toContainText('0 / 25 done');
  await expect(page.locator('#progress-mount-point').getByRole('link', { name: en.practice.continue_learning })).toBeVisible();
  await expect(page.getByPlaceholder(en.practice.search_placeholder)).toBeVisible();

  await expectNoRawLocalizationKeys(page);
  await expectNoPageErrors(pageErrors);
});
