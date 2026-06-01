import { test, expect } from '@playwright/test';
import { useCleanPreferences, trackPageErrors, expectNoPageErrors } from './helpers.js';

const MOBILE_VIEWPORTS = [
    { width: 375, height: 812 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
];

const PAGES = [
    { path: '/', name: 'homepage', pageId: 'home' },
    { path: '/courses/index.html', name: 'courses', pageId: 'courses' },
    { path: '/courses/python/index.html', name: 'python', pageId: 'python' },
    { path: '/courses/python/practice/index.html', name: 'practice', pageId: 'python-practice' },
    { path: '/courses/python/practice/question.html?id=1', name: 'question', pageId: 'python-practice-detail' },
    { path: '/accounts/index.html', name: 'connect', pageId: 'connect' },
];

test.describe('Mobile Navigation', () => {
    for (const viewport of MOBILE_VIEWPORTS) {
        test.describe(`${viewport.width}x${viewport.height}`, () => {
            for (const page of PAGES) {
                test(`${page.name}: hamburger is visible and drawer works`, async ({ browser }) => {
                    const context = await browser.newContext({ viewport });
                    const pageObj = await context.newPage();
                    const errors = trackPageErrors(pageObj);

                    await useCleanPreferences(pageObj);
                    await pageObj.goto(page.path);
                    await pageObj.waitForLoadState('networkidle');

                    expectNoPageErrors(errors);

                    // Hamburger should be visible
                    const hamburger = pageObj.locator('#hamburger-btn');
                    await expect(hamburger).toBeVisible();

                    // Hamburger should have correct ARIA
                    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
                    await expect(hamburger).toHaveAttribute('aria-label', 'Open navigation menu');

                    // Drawer should be hidden initially
                    const drawer = pageObj.locator('#mobile-nav-drawer');
                    await expect(drawer).toHaveAttribute('aria-hidden', 'true');
                    await expect(drawer).not.toHaveClass(/open/);

                    // Open drawer by clicking hamburger
                    await hamburger.click();
                    await expect(drawer).toHaveClass(/open/);
                    await expect(drawer).toHaveAttribute('aria-hidden', 'false');
                    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');

                    // Close by clicking outside drawer (overlay area)
                    const overlay = pageObj.locator('#nav-overlay');
                    await expect(overlay).toHaveClass(/visible/);
                    await pageObj.locator('body').click({position: {x: 10, y: 50}});
                    await expect(drawer).not.toHaveClass(/open/);
                    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');

                    // Open again and close via Escape
                    await hamburger.click();
                    await expect(drawer).toHaveClass(/open/);
                    await pageObj.keyboard.press('Escape');
                    await expect(drawer).not.toHaveClass(/open/);

                    expectNoPageErrors(errors);
                    await context.close();
                });

                test(`${page.name}: theme and language toggles visible on mobile`, async ({ browser }) => {
                    const context = await browser.newContext({ viewport });
                    const pageObj = await context.newPage();
                    const errors = trackPageErrors(pageObj);

                    await useCleanPreferences(pageObj);
                    await pageObj.goto(page.path);
                    await pageObj.waitForLoadState('networkidle');

                    // Theme toggle visible
                    const themeToggle = pageObj.locator('#theme-toggle');
                    await expect(themeToggle).toBeVisible();

                    // Language toggle visible
                    const langToggle = pageObj.locator('#lang-toggle');
                    await expect(langToggle).toBeVisible();

                    // Toggles should be at least 44px touch targets
                    const themeBox = await themeToggle.boundingBox();
                    expect(themeBox.width).toBeGreaterThanOrEqual(44);
                    expect(themeBox.height).toBeGreaterThanOrEqual(44);

                    const langBox = await langToggle.boundingBox();
                    expect(langBox.width).toBeGreaterThanOrEqual(44);
                    expect(langBox.height).toBeGreaterThanOrEqual(44);

                    expectNoPageErrors(errors);
                    await context.close();
                });

                test(`${page.name}: no horizontal overflow`, async ({ browser }) => {
                    const context = await browser.newContext({ viewport });
                    const pageObj = await context.newPage();
                    const errors = trackPageErrors(pageObj);

                    await useCleanPreferences(pageObj);
                    await pageObj.goto(page.path);
                    await pageObj.waitForLoadState('networkidle');

                    // Check document width doesn't exceed viewport width
                    const docWidth = await pageObj.evaluate(() => document.documentElement.scrollWidth);
                    expect(docWidth).toBeLessThanOrEqual(viewport.width + 1);

                    expectNoPageErrors(errors);
                    await context.close();
                });

                test(`${page.name}: drawer links navigate to correct pages`, async ({ browser }) => {
                    const context = await browser.newContext({ viewport });
                    const pageObj = await context.newPage();
                    const errors = trackPageErrors(pageObj);

                    await useCleanPreferences(pageObj);
                    await pageObj.goto(page.path);
                    await pageObj.waitForLoadState('networkidle');

                    // Open drawer
                    await pageObj.locator('#hamburger-btn').click();

                    // Drawer nav links should be visible
                    const drawerLinks = pageObj.locator('.nav-drawer-link');
                    const count = await drawerLinks.count();
                    expect(count).toBe(3); // Home, Courses, Connect

                    expectNoPageErrors(errors);
                    await context.close();
                });
            }
        });
    }
});
