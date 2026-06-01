import { test, expect } from '@playwright/test';
import { useCleanPreferences } from './helpers.js';
import path from 'path';
import fs from 'fs';

const VIEWPORTS = [
    { width: 375, height: 812, label: 'iphone-x' },
    { width: 390, height: 844, label: 'iphone-14' },
    { width: 430, height: 932, label: 'iphone-15-pro-max' },
];

const PAGES = [
    { path: '/', name: 'homepage' },
    { path: '/courses/index.html', name: 'courses' },
    { path: '/courses/python/index.html', name: 'python' },
    { path: '/courses/python/practice/index.html', name: 'practice' },
    { path: '/courses/python/practice/question.html?id=1', name: 'question' },
    { path: '/accounts/index.html', name: 'connect' },
];

const SCREENSHOT_DIR = 'docs/screenshots/mobile/after';

test.describe('Mobile Screenshots', () => {
    for (const vp of VIEWPORTS) {
        for (const pageInfo of PAGES) {
            test(`capture ${pageInfo.name} at ${vp.label}`, async ({ browser }) => {
                const context = await browser.newContext({ viewport: vp });
                const pageObj = await context.newPage();
                await useCleanPreferences(pageObj);
                await pageObj.goto(pageInfo.path);
                await pageObj.waitForLoadState('networkidle');

                const dir = path.join(SCREENSHOT_DIR, vp.label);
                fs.mkdirSync(dir, { recursive: true });

                // Full page screenshot
                await pageObj.screenshot({
                    path: path.join(dir, `${pageInfo.name}.png`),
                    fullPage: true,
                });

                // Viewport-only screenshot
                await pageObj.screenshot({
                    path: path.join(dir, `${pageInfo.name}-viewport.png`),
                });

                await context.close();
            });
        }
    }
});
