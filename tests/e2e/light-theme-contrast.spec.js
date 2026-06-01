const { test, expect } = require('@playwright/test');
const { useCleanPreferences } = require('./helpers');

test.describe('Light Theme Contrast Audit', () => {
    test.beforeEach(async ({ page }) => {
        await useCleanPreferences(page);
        // Explicitly set to light theme
        await page.addInitScript(() => {
            localStorage.setItem('theme', 'light');
        });
        await page.goto('/');
    });

    test('UI elements have sufficient contrast', async ({ page }) => {
        // Check key elements
        const cards = page.locator('.academic-card');
        await expect(cards.first()).toBeVisible();

        // Ensure cards are distinguishable from background
        const cardBackground = await cards.first().evaluate((el) => getComputedStyle(el).backgroundColor);
        const pageBackground = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);

        expect(cardBackground).not.toBe(pageBackground);
    });

    test('Dark mode preserves integrity', async ({ page }) => {
        await page.addInitScript(() => {
            localStorage.setItem('theme', 'dark');
        });
        await page.reload();

        const pageBackground = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
        // Dark mode should be dark
        expect(pageBackground).not.toBe('rgb(238, 242, 247)'); // Light mode bg
    });
});
