const { test, expect } = require('@playwright/test');
const {
  en,
  expectNoPageErrors,
  expectNoRawLocalizationKeys,
  trackPageErrors,
  useCleanPreferences
} = require('./helpers');

async function verifySection(page, expectedText) {
  await expect(page.getByText(expectedText)).toBeVisible();
}

test('Question page supports previous/next navigation and reveal sections', async ({ page }) => {
  const pageErrors = trackPageErrors(page);
  await useCleanPreferences(page);

  await page.goto('/courses/python/practice/question.html?id=2');
  await expect(page.getByRole('heading', { name: 'Question 2' })).toBeVisible();

  await page.locator('#q-nav a[href="./question.html?id=1"]').click();
  await expect(page).toHaveURL(/question\.html\?id=1$/);
  await expect(page.getByRole('heading', { name: 'Question 1' })).toBeVisible();

  await page.goto('/courses/python/practice/question.html?id=2');
  await page.locator('#q-nav a[href="./question.html?id=3"]').click();
  await expect(page).toHaveURL(/question\.html\?id=3$/);
  await expect(page.getByRole('heading', { name: 'Question 3' })).toBeVisible();

  await page.goto('/courses/python/practice/question.html?id=2');

  // Expand all reveal sections before checking content
  const toggles = page.locator('#q-reveals .reveal-toggle');
  const count = await toggles.count();
  for (let i = 0; i < count; i++) {
    await toggles.nth(i).click();
  }

  await verifySection(page, 'Create an empty list');
  await verifySection(page, 'fib_list');
  await verifySection(page, 'Enter n: 10');

  await expectNoRawLocalizationKeys(page);
  await expectNoPageErrors(pageErrors);
});
