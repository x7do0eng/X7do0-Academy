const { test, expect } = require('@playwright/test');
const { expectNoPageErrors, trackPageErrors, useCleanPreferences } = require('./helpers');

test('Homepage loads successfully with no uncaught page errors', async ({ page }) => {
  const pageErrors = trackPageErrors(page);
  await useCleanPreferences(page);

  await page.goto('/');

  await expect(page).toHaveTitle(/X7do0 Academy/);
  await expect(page.getByRole('heading', { name: /Master Complexity/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Start Learning/ })).toBeVisible();
  await expectNoPageErrors(pageErrors);
});
