const { expect } = require('@playwright/test');
const en = require('../../assets/i18n/en.json');
const ar = require('../../assets/i18n/ar.json');

const rawLocalizationKeys = [
  'practice.all_questions',
  'practice.continue_learning',
  'practice.resume',
  'practice.progress',
  'question.prompt',
  'question.steps',
  'question.solution',
  'question.output'
];

function trackPageErrors(page) {
  const errors = [];
  page.on('pageerror', (error) => {
    errors.push(error.message);
  });
  return errors;
}

async function useCleanPreferences(page, { lang = 'en', theme = 'light' } = {}) {
  // Set initial preferences before first navigation
  await page.addInitScript(({ initialLang, initialTheme }) => {
    // Only set defaults if not already saved (preserves manual toggles across reloads)
    if (!localStorage.getItem('lang')) localStorage.setItem('lang', initialLang);
    if (!localStorage.getItem('theme')) localStorage.setItem('theme', initialTheme);
    localStorage.removeItem('academy_progress');
  }, { initialLang: lang, initialTheme: theme });
}

async function expectNoRawLocalizationKeys(page) {
  const bodyText = await page.locator('body').innerText();
  for (const key of rawLocalizationKeys) {
    expect(bodyText, `raw localization key leaked: ${key}`).not.toContain(key);
  }
}

async function expectNoPageErrors(errors) {
  expect(errors).toEqual([]);
}

module.exports = {
  ar,
  en,
  expectNoPageErrors,
  expectNoRawLocalizationKeys,
  trackPageErrors,
  useCleanPreferences
};
