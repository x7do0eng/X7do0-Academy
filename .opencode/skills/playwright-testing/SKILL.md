---
name: playwright-testing
description: Playwright E2E testing workflows for X7do0 Academy. Run tests, capture screenshots, verify no regressions before and after UI changes.
---

## Playwright Testing — X7do0 Academy

### Commands
```bash
npm run test:e2e            # Headless (CI)
npm run test:e2e:headed     # Visible browser
npm run test:e2e:ui         # Playwright UI mode
```

### Test Location
All tests in `tests/e2e/`. Shared helpers in `tests/e2e/helpers.js`.

### Before Major UI Changes
1. Run `npm run test:e2e` to establish baseline.
2. Use Playwright to inspect the actual running site (headed mode).
3. Capture screenshots of relevant pages for reference.
4. Make changes.
5. Run tests again to verify no regressions.

### Do NOT Rely Solely on Source-Code Inspection
Always verify UI behavior in a live browser context using Playwright.

### Standards
- Prefer fixing tests over disabling them.
- Never silence failures without documenting root causes.
- Use `useCleanPreferences(page)` helper for clean test state.
- Use `trackPageErrors(page)` + `expectNoPageErrors(errors)` to catch JS errors.
- Use `expectNoRawLocalizationKeys(page)` to verify i18n doesn't leak keys.
- Screenshots go to `docs/screenshots/` (not project root).
