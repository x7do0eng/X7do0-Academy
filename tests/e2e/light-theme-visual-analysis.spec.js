import { test, expect } from '@playwright/test';

const PAGES = [
    { path: '/', name: 'homepage', label: 'Homepage' },
    { path: '/courses/index.html', name: 'courses', label: 'Courses Page' },
    { path: '/courses/python/index.html', name: 'python', label: 'Python Course Page' },
    { path: '/courses/python/practice/index.html', name: 'practice', label: 'Practice Page' },
    { path: '/courses/python/practice/question.html?id=1', name: 'question', label: 'Question Page' },
    { path: '/accounts/index.html', name: 'connect', label: 'Connect Page' },
];

test.describe('Light Theme Visual Analysis', () => {
    test.describe.configure({ mode: 'parallel' });

    for (const pageInfo of PAGES) {
        test(`analyze ${pageInfo.name}`, async ({ browser }) => {
            const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
            const pageObj = await context.newPage();

            await pageObj.addInitScript(() => localStorage.setItem('theme', 'light'));
            await pageObj.goto(pageInfo.path);
            await pageObj.waitForLoadState('networkidle');

            // Collect visual metrics
            const results = await pageObj.evaluate(() => {
                const getStyle = (el, prop) => getComputedStyle(el)[prop];
                const els = {
                    body: document.body,
                    nav: document.querySelector('.navbar-sticky'),
                    main: document.querySelector('main'),
                    footer: document.querySelector('footer'),
                };

                const data = {
                    pageName: document.title,
                    body: {
                        bg: getStyle(document.body, 'backgroundColor'),
                        textColor: getStyle(document.body, 'color'),
                        fontFamily: getStyle(document.body, 'fontFamily'),
                        fontSize: getStyle(document.body, 'fontSize'),
                        lineHeight: getStyle(document.body, 'lineHeight'),
                    },
                    nav: null,
                    cards: [],
                    headings: [],
                    links: [],
                    buttons: [],
                };

                if (els.nav) {
                    data.nav = {
                        bg: getStyle(els.nav, 'backgroundColor'),
                        textColor: getStyle(els.nav, 'color'),
                        height: els.nav.offsetHeight + 'px',
                        paddingTop: getStyle(els.nav, 'paddingTop'),
                        paddingBottom: getStyle(els.nav, 'paddingBottom'),
                        paddingLeft: getStyle(els.nav, 'paddingLeft'),
                        paddingRight: getStyle(els.nav, 'paddingRight'),
                        boxShadow: getStyle(els.nav, 'boxShadow'),
                    };
                }

                // Collect headings
                document.querySelectorAll('h1, h2, h3').forEach(h => {
                    data.headings.push({
                        tag: h.tagName,
                        text: (h.textContent || '').trim().slice(0, 50),
                        fontSize: getStyle(h, 'fontSize'),
                        fontWeight: getStyle(h, 'fontWeight'),
                        color: getStyle(h, 'color'),
                        lineHeight: getStyle(h, 'lineHeight'),
                        marginTop: getStyle(h, 'marginTop'),
                        marginBottom: getStyle(h, 'marginBottom'),
                    });
                });

                // Collect cards
                document.querySelectorAll('[class*="card"], [class*="Card"], .bg-white.rounded, .rounded-\\[\\d+px\\], [class*="shadow"]').forEach(c => {
                    const tag = c.tagName;
                    const cls = c.className;
                    // Filter to likely card elements
                    if (cls.includes('nav') || cls.includes('drawer')) return;
                    const rect = c.getBoundingClientRect();
                    if (rect.width < 100) return;
                    data.cards.push({
                        tag,
                        classes: cls.slice(0, 80),
                        width: Math.round(rect.width) + 'px',
                        height: Math.round(rect.height) + 'px',
                        bg: getStyle(c, 'backgroundColor'),
                        boxShadow: getStyle(c, 'boxShadow'),
                        border: getStyle(c, 'border'),
                        borderRadius: getStyle(c, 'borderRadius'),
                        padding: getStyle(c, 'padding'),
                    });
                });

                // Collect links
                document.querySelectorAll('a[class*="btn"], a[class*="button"], a[class*="cta"], nav a, main a').forEach(a => {
                    const text = (a.textContent || '').trim().slice(0, 40);
                    if (!text) return;
                    data.links.push({
                        text,
                        color: getStyle(a, 'color'),
                        fontSize: getStyle(a, 'fontSize'),
                        fontWeight: getStyle(a, 'fontWeight'),
                        bg: getStyle(a, 'backgroundColor'),
                        padding: getStyle(a, 'padding'),
                        border: getStyle(a, 'border'),
                        borderRadius: getStyle(a, 'borderRadius'),
                    });
                });

                // Collect buttons
                document.querySelectorAll('button, [role="button"]').forEach(b => {
                    data.buttons.push({
                        text: (b.textContent || '').trim().slice(0, 40),
                        color: getStyle(b, 'color'),
                        bg: getStyle(b, 'backgroundColor'),
                        fontSize: getStyle(b, 'fontSize'),
                        fontWeight: getStyle(b, 'fontWeight'),
                        padding: getStyle(b, 'padding'),
                        border: getStyle(b, 'border'),
                        borderRadius: getStyle(b, 'borderRadius'),
                        minWidth: getStyle(b, 'minWidth'),
                        minHeight: getStyle(b, 'minHeight'),
                    });
                });

                return data;
            });

            console.log(`\n=== ${pageInfo.label} ===`);
            console.log(`Title: ${results.pageName}`);
            console.log(`Body bg: ${results.body.bg}, fg: ${results.body.textColor}, font: ${results.body.fontSize}/${results.body.lineHeight}`);

            if (results.nav) {
                console.log(`Nav bg: ${results.nav.bg}, fg: ${results.nav.textColor}, shadow: ${results.nav.boxShadow}, height: ${results.nav.height}`);
            }

            console.log(`\nHeadings (${results.headings.length}):`);
            results.headings.forEach(h => {
                console.log(`  ${h.tag}: "${h.text}" | size: ${h.fontSize} weight: ${h.fontWeight} color: ${h.color} | mt: ${h.marginTop} mb: ${h.marginBottom}`);
            });

            console.log(`\nCards (${results.cards.length}):`);
            results.cards.forEach(c => {
                console.log(`  ${c.classes.slice(0, 60)} | bg: ${c.bg} shadow: ${c.boxShadow} border: ${c.border || 'none'} radius: ${c.borderRadius}`);
                console.log(`    size: ${c.width} x ${c.height} pad: ${c.padding}`);
            });

            console.log(`\nLinks (${results.links.length}):`);
            results.links.forEach(l => {
                console.log(`  "${l.text}" | color: ${l.color} size: ${l.fontSize} weight: ${l.fontWeight} bg: ${l.bg}`);
            });

            console.log(`\nButtons (${results.buttons.length}):`);
            results.buttons.forEach(b => {
                console.log(`  "${b.text}" | color: ${b.color} bg: ${b.bg} size: ${b.fontSize} pad: ${b.padding} min: ${b.minWidth}x${b.minHeight}`);
            });

            await context.close();
        });
    }
});
