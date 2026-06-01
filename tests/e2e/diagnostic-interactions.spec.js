const { test, expect } = require('@playwright/test');
const {
  en,
  expectNoPageErrors,
  expectNoRawLocalizationKeys,
  trackPageErrors,
  useCleanPreferences
} = require('./helpers');

/**
 * DIAGNOSTIC TEST: Identify ALL broken interactions from v2 redesign.
 * Tests all clickable surfaces on python course, practice, and question pages.
 */

test.describe('Python Course Page — Navigation & Interactions', () => {
  test('Notes card sub-nav on course page links to current page', async ({ page }) => {
    const errors = trackPageErrors(page);
    await useCleanPreferences(page);
    await page.goto('/courses/python/index.html');
    await expect(page.getByRole('heading', { name: /Python Notes/i })).toBeVisible();

    // Notes card: links to ./index.html (same page)
    const notesCard = page.locator('nav').filter({ has: page.locator('[data-i18n="python_notes_card_title"]') }).locator('a').first();
    await expect(notesCard).toBeVisible();
    const href = await notesCard.getAttribute('href');
    expect(href).toBe('./index.html');

    await expectNoRawLocalizationKeys(page);
    await expectNoPageErrors(errors);
  });

  test('Practice card sub-nav on course page navigates to practice', async ({ page }) => {
    const errors = trackPageErrors(page);
    await useCleanPreferences(page);
    await page.goto('/courses/python/index.html');

    const practiceCard = page.locator('[data-i18n="python_practice_card_title"]').locator('..');
    const link = practiceCard.locator('..');
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/courses\/python\/practice\//);
    await expectNoPageErrors(errors);
  });

  test('All <a> tags inside sub-nav have correct hrefs', async ({ page }) => {
    const errors = trackPageErrors(page);
    await useCleanPreferences(page);
    await page.goto('/courses/python/index.html');

    // The sub-nav is inside the header sticky
    const subNavLinks = page.locator('header nav a');
    const count = await subNavLinks.count();
    expect(count).toBe(2);
    for (let i = 0; i < count; i++) {
      const href = await subNavLinks.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
    }
    await expectNoPageErrors(errors);
  });
});

test.describe('Practice Page — Navigation & Interactions', () => {
  test('Notes card on practice page navigates to python notes', async ({ page }) => {
    const errors = trackPageErrors(page);
    await useCleanPreferences(page);
    await page.goto('/courses/python/practice/index.html');

    const notesLink = page.locator('[data-i18n="python_notes_card_title"]').locator('..');
    const link = notesLink.locator('..');
    await expect(link).toBeVisible();

    // Click the Notes link
    await link.click();
    // Should navigate to ../index.html = /courses/python/index.html
    await expect(page).toHaveURL(/\/courses\/python\/index\.html$/);
    await expectNoPageErrors(errors);
  });

  test('All sub-nav links in header have correct hrefs', async ({ page }) => {
    const errors = trackPageErrors(page);
    await useCleanPreferences(page);
    await page.goto('/courses/python/practice/index.html');

    // Targeting all <a> tags inside the header sub-nav
    const subNavLinks = page.locator('header').locator('nav a');
    const count = await subNavLinks.count();
    expect(count).toBe(2);
    const hrefs = [];
    for (let i = 0; i < count; i++) {
      hrefs.push(await subNavLinks.nth(i).getAttribute('href'));
    }
    expect(hrefs).toContain('../index.html');
    expect(hrefs).toContain('./index.html');
    await expectNoPageErrors(errors);
  });

  test('Question card click navigates to question page', async ({ page }) => {
    const errors = trackPageErrors(page);
    await useCleanPreferences(page);
    await page.goto('/courses/python/practice/index.html');

    // Wait for cards to render
    await expect(page.locator('.practice-question-card').first()).toBeVisible({ timeout: 10000 });

    // Find question number 1
    const card1 = page.locator('.practice-question-card').filter({ hasText: '1' }).first();
    await expect(card1).toBeVisible();
    await card1.click();

    // Should navigate to question.html?id=1
    await expect(page).toHaveURL(/question\.html\?id=1/);
    await expectNoPageErrors(errors);
  });

  test('Resume link in progress bar navigates to first incomplete question', async ({ page }) => {
    const errors = trackPageErrors(page);
    await useCleanPreferences(page);
    await page.goto('/courses/python/practice/index.html');

    await expect(page.locator('.progress-surface')).toBeVisible({ timeout: 10000 });
    const resumeLink = page.locator('.progress-surface a[href*="question.html"]').first();
    if (await resumeLink.isVisible()) {
      await resumeLink.click();
      await expect(page).toHaveURL(/question\.html\?id=\d+/);
    }
    await expectNoPageErrors(errors);
  });

  test('Category filter click filters questions', async ({ page }) => {
    const errors = trackPageErrors(page);
    await useCleanPreferences(page);
    await page.goto('/courses/python/practice/index.html');

    await expect(page.locator('#practice-categories-sidebar button')).toHaveCount(12, { timeout: 10000 });
    const firstCategory = page.locator('#practice-categories-sidebar button').nth(1);
    await firstCategory.click();

    // After clicking a category, the question list should update
    await page.waitForTimeout(500);
    const cards = page.locator('.practice-question-card');
    const cardCount = await cards.count();
    expect(cardCount).toBeLessThan(25);
    expect(cardCount).toBeGreaterThanOrEqual(1);

    await expectNoPageErrors(errors);
  });

  test('Search input filters questions', async ({ page }) => {
    const errors = trackPageErrors(page);
    await useCleanPreferences(page);
    await page.goto('/courses/python/practice/index.html');

    await expect(page.locator('#practice-search')).toBeVisible({ timeout: 10000 });
    await page.locator('#practice-search').fill('List');
    await page.waitForTimeout(500);

    const cards = page.locator('.practice-question-card');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThanOrEqual(1);

    await expectNoPageErrors(errors);
  });
});

test.describe('Question Page — Progressive Reveal', () => {
  test('Reveal sections are collapsed by default, expand on click', async ({ page }) => {
    const errors = trackPageErrors(page);
    await useCleanPreferences(page);
    await page.goto('/courses/python/practice/question.html?id=2');

    // Sections should be collapsed by default
    const stepsBtn = page.locator('#q-reveals .reveal-toggle').nth(0);
    await expect(stepsBtn).toBeVisible();
    await expect(stepsBtn).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    await stepsBtn.click();
    await expect(stepsBtn).toHaveAttribute('aria-expanded', 'true');

    // Now verify content is visible
    await expect(page.locator('#q-reveals .reveal-content.expanded').first()).toBeVisible();

    await expectNoPageErrors(errors);
  });

  test('Question page shows all content sections after expanding', async ({ page }) => {
    const errors = trackPageErrors(page);
    await useCleanPreferences(page);
    await page.goto('/courses/python/practice/question.html?id=2');

    // Expand all reveal sections
    const toggles = page.locator('#q-reveals .reveal-toggle');
    const count = await toggles.count();
    for (let i = 0; i < count; i++) {
      await toggles.nth(i).click();
    }

    // Now verify content
    await expect(page.getByText('Create an empty list')).toBeVisible();
    await expect(page.getByText('fib_list')).toBeVisible();
    await expect(page.getByText('Enter n: 10')).toBeVisible();

    await expectNoRawLocalizationKeys(page);
    await expectNoPageErrors(errors);
  });

  test('Question page prev/next navigation works', async ({ page }) => {
    const errors = trackPageErrors(page);
    await useCleanPreferences(page);
    await page.goto('/courses/python/practice/question.html?id=2');

    // Go to previous
    await page.locator('#q-nav a').first().click();
    await expect(page).toHaveURL(/question\.html\?id=1$/);
    await expect(page.getByRole('heading', { name: 'Question 1' })).toBeVisible();

    // Go to next
    await page.goto('/courses/python/practice/question.html?id=2');
    await page.locator('#q-nav a').last().click();
    await expect(page).toHaveURL(/question\.html\?id=3$/);
    await expect(page.getByRole('heading', { name: 'Question 3' })).toBeVisible();

    await expectNoPageErrors(errors);
  });

  test('Complete button toggles state', async ({ page }) => {
    const errors = trackPageErrors(page);
    await useCleanPreferences(page);
    await page.goto('/courses/python/practice/question.html?id=2');

    const completeBtn = page.locator('#complete-btn');
    await expect(completeBtn).toBeVisible();

    // Click to mark complete
    await completeBtn.click();
    await page.waitForTimeout(300);
    const btnText = await completeBtn.textContent();
    expect(btnText.toLowerCase()).toContain('incomplete');

    await expectNoPageErrors(errors);
  });
});

test.describe('Python Course Page — Keyword Interactions', () => {
  test('Keyword click shows code overlay', async ({ page }) => {
    const errors = trackPageErrors(page);
    await useCleanPreferences(page);
    await page.goto('/courses/python/index.html');

    await expect(page.locator('#lesson-grid .keyword').first()).toBeVisible({ timeout: 10000 });
    const firstKeyword = page.locator('#lesson-grid .keyword').first();
    await firstKeyword.click();

    // Code overlay should now be visible
    await expect(page.locator('#code-overlay')).toBeVisible();
    const overlayContent = page.locator('#overlay-content');
    const text = await overlayContent.textContent();
    expect(text.length).toBeGreaterThan(0);

    await expectNoPageErrors(errors);
  });
});

test.describe('Visual & Theme', () => {
  test('Card accent top bar is present on python course header', async ({ page }) => {
    const errors = trackPageErrors(page);
    await useCleanPreferences(page);
    await page.goto('/courses/python/index.html');

    const headerCard = page.locator('.card-accent-top');
    await expect(headerCard).toBeVisible();
    await expectNoPageErrors(errors);
  });
});
