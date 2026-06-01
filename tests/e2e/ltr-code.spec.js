const { test, expect } = require('@playwright/test');
const { useCleanPreferences } = require('./helpers');

test('Verify code blocks remain LTR in Arabic mode', async ({ page }) => {
    await useCleanPreferences(page);
    await page.goto('/courses/python/practice/question.html?id=1');

    // Switch to Arabic
    await page.locator('#lang-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    // Check that code block direction is LTR
    await expect(page.locator('pre').first()).toHaveCSS('direction', 'ltr');
});
