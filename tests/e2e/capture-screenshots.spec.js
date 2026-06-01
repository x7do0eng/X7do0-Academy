const { test, expect } = require('@playwright/test');

test('Capture UI state', async ({ page }) => {
    await page.goto('/');
    await page.screenshot({ path: 'before-light-home.png', fullPage: true });

    await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
    await page.reload();
    await page.screenshot({ path: 'before-dark-home.png', fullPage: true });
});
