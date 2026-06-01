import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const SCREENSHOT_DIR = 'docs/screenshots/light-theme-review';

const VIEWPORTS = [
    { width: 1280, height: 720, label: 'desktop' },
    { width: 375, height: 812, label: 'mobile' },
];

const PAGES = [
    { path: '/', name: 'homepage', label: 'Homepage' },
    { path: '/courses/index.html', name: 'courses', label: 'Courses Page' },
    { path: '/courses/python/index.html', name: 'python', label: 'Python Course Page' },
    { path: '/courses/python/practice/index.html', name: 'practice', label: 'Practice Page' },
    { path: '/courses/python/practice/question.html?id=1', name: 'question', label: 'Question Page' },
    { path: '/accounts/index.html', name: 'connect', label: 'Connect Page' },
];

async function setLightTheme(page) {
    await page.addInitScript(() => {
        localStorage.setItem('theme', 'light');
    });
}

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

test.describe('Light Theme Visual Review Screenshots', () => {
    test.describe.configure({ mode: 'parallel' });

    for (const vp of VIEWPORTS) {
        for (const pageInfo of PAGES) {
            test(`capture ${pageInfo.name} at ${vp.label}`, async ({ browser }) => {
                const context = await browser.newContext({ viewport: vp });
                const pageObj = await context.newPage();
                await setLightTheme(pageObj);
                await pageObj.goto(pageInfo.path);
                await pageObj.waitForLoadState('networkidle');

                const dir = path.join(SCREENSHOT_DIR, vp.label);
                ensureDir(dir);

                // Full page
                await pageObj.screenshot({
                    path: path.join(dir, `${pageInfo.name}-full.png`),
                    fullPage: true,
                });

                // Viewport
                await pageObj.screenshot({
                    path: path.join(dir, `${pageInfo.name}-viewport.png`),
                });

                // Nav area (main navbar only)
                const nav = pageObj.locator('.navbar-sticky');
                if (await nav.count() > 0) {
                    await nav.first().screenshot({
                        path: path.join(dir, `${pageInfo.name}-nav.png`),
                    });
                }

                await context.close();
            });
        }
    }

    // Detail screenshots at desktop
    test('capture detail: homepage hero + cards', async ({ browser }) => {
        const pageObj = await browser.newPage();
        await setLightTheme(pageObj);
        await pageObj.setViewportSize({ width: 1280, height: 720 });
        await pageObj.goto('/');
        await pageObj.waitForLoadState('networkidle');

        const dir = path.join(SCREENSHOT_DIR, 'desktop');
        ensureDir(dir);

        // Hero section
        const hero = pageObj.locator('section').first();
        if (await hero.count() > 0) {
            await hero.screenshot({ path: path.join(dir, 'homepage-hero.png') });
        }

        // Course cards area
        const cards = pageObj.locator('section').nth(1);
        if (await cards.count() > 0) {
            await cards.screenshot({ path: path.join(dir, 'homepage-cards.png') });
        }

        await pageObj.close();
    });

    test('capture detail: courses page cards', async ({ browser }) => {
        const pageObj = await browser.newPage();
        await setLightTheme(pageObj);
        await pageObj.setViewportSize({ width: 1280, height: 720 });
        await pageObj.goto('/courses/index.html');
        await pageObj.waitForLoadState('networkidle');

        const dir = path.join(SCREENSHOT_DIR, 'desktop');
        ensureDir(dir);

        // Course cards
        const courseGrid = pageObj.locator('main').first();
        if (await courseGrid.count() > 0) {
            await courseGrid.screenshot({ path: path.join(dir, 'courses-content.png') });
        }

        await pageObj.close();
    });

    test('capture detail: practice page', async ({ browser }) => {
        const pageObj = await browser.newPage();
        await setLightTheme(pageObj);
        await pageObj.setViewportSize({ width: 1280, height: 720 });
        await pageObj.goto('/courses/python/practice/index.html');
        await pageObj.waitForLoadState('networkidle');

        const dir = path.join(SCREENSHOT_DIR, 'desktop');
        ensureDir(dir);

        // Progress section
        const progressSection = pageObj.locator('.python-practice').first();
        if (await progressSection.count() > 0) {
            await progressSection.screenshot({ path: path.join(dir, 'practice-progress.png') });
        }

        await pageObj.close();
    });

    test('capture detail: question page', async ({ browser }) => {
        const pageObj = await browser.newPage();
        await setLightTheme(pageObj);
        await pageObj.setViewportSize({ width: 1280, height: 720 });
        await pageObj.goto('/courses/python/practice/question.html?id=1');
        await pageObj.waitForLoadState('networkidle');

        const dir = path.join(SCREENSHOT_DIR, 'desktop');
        ensureDir(dir);

        // Question card
        const question = pageObj.locator('.python-practice').first();
        if (await question.count() > 0) {
            await question.screenshot({ path: path.join(dir, 'question-content.png') });
        }

        // Output/solution panels
        const panels = pageObj.locator('[class*="panel"], [class*="output"], [class*="solution"]');
        if (await panels.count() > 0) {
            await panels.first().screenshot({ path: path.join(dir, 'question-panel.png') });
        }

        await pageObj.close();
    });
});
