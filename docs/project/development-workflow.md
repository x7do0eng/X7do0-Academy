# Development Workflow — X7do0 Academy

## Standard Workflow

### 1. Understand Before Changing
- Read the relevant files first.
- Check if a skill in `.opencode/skills/` matches the task.
- Check if an agent in `.opencode/agents/` can help.

### 2. Make Changes
- Follow the conventions documented in `AGENTS.md`.
- Use CSS variables from `variables.css` for theme-dependent properties.
- Use `data-i18n` and `i18n.t()` for all user-facing text.
- Use logical CSS properties for LTR/RTL support.
- Keep code blocks LTR even in Arabic mode.

### 3. Verify Changes
- Run `npm run test:e2e` to check for regressions.
- Manually check both themes (light/dark) and both languages (EN/AR).
- Check mobile layout if UI changed.
- Verify no raw i18n keys visible in the UI.

### 4. Commit (When Asked)
- Commit only when explicitly asked.
- Write concise commit messages.
- Do not commit secrets, API keys, or local config files.

---

## UI Change Workflow

When making UI changes:

1. Run `npm run test:e2e` to establish baseline.
2. Inspect the actual running site with Playwright (`npm run test:e2e:headed`).
3. Capture screenshots of before state (save to `docs/screenshots/`).
4. Make changes.
5. Run tests again.
6. Capture screenshots of after state.
7. Check both themes, both languages, mobile layout.

Do not rely solely on source-code inspection. UI must be verified in a live browser.

---

## Adding a New Page

1. Create the directory and `index.html`.
2. Follow the page shell pattern (navbar, breadcrumbs, main, footer).
3. Set `<body data-page="page-id">`.
4. Update `theme-manager.js` `highlightActiveNav()` if the page needs nav highlighting.
5. Add translations for page title and header to `assets/i18n/{en,ar}.json`.
6. Add any flat key aliases needed in `i18n.js`.
7. Write Playwright smoke test (`tests/e2e/`).

---

## Adding a New Translation Key

1. Add to both `assets/i18n/en.json` and `assets/i18n/ar.json`.
2. For static HTML: add `data-i18n="key.path"` to element.
3. For dynamic JS: call `i18n.t("key.path")` during render.
4. For flat key compatibility: add alias in `i18n.js` `aliases` object.
5. Run localization tests to verify no leaks.

---

## Adding a New Course

1. Create `courses/<name>/index.html` following the course page pattern.
2. Create `data/<name>-lessons.js` with lesson data (ES module).
3. Create `assets/js/<name>.js` as the renderer module.
4. Create `assets/css/<name>.css` for course-specific styles (scoped).
5. Add translation keys for course name, description, lesson titles.
6. Link from `courses/index.html` catalog.
7. Write Playwright tests for the new course pages.
8. Register `data-page="<name>"` in theme-manager if needed.

---

## Refactoring Workflow

1. Check git status. Record the current state.
2. Run full test suite (`npm run test:e2e`).
3. Make focused changes (one concern per change).
4. Run tests again.
5. Check both themes and both languages.
6. If UI changed, capture screenshots before/after.

Never refactor and add features in the same change.

---

## Emergency Workflow (Failing Tests)

If tests fail after changes:
1. Read the failure output carefully. Playwright reports are in `playwright-report/`.
2. Identify root cause — is it a real regression or a test issue?
3. Fix the root cause. Do not silence the test.
4. If the test expectation is wrong (due to intentional behavior change), update the test.
5. Never disable tests without documenting the reason in a comment.

---

## Available Commands

```bash
npm run test:e2e                # Headless E2E tests
npm run test:e2e:headed         # Visible browser E2E tests
npm run test:e2e:ui             # Playwright UI mode
```

---

## Code Review Checklist

Before considering changes complete:
- [ ] No new JS console errors.
- [ ] No raw i18n keys visible.
- [ ] Light and dark themes both look correct.
- [ ] English and Arabic both work.
- [ ] Mobile layout is usable (320px-430px).
- [ ] Touch targets are ≥44px.
- [ ] All interactive elements are keyboard-accessible.
- [ ] New text has translation entries in both `en.json` and `ar.json`.
- [ ] New CSS uses variables (not hardcoded colors).
- [ ] New CSS uses logical properties (not physical L/R).
- [ ] Code blocks remain LTR in Arabic mode.
- [ ] Playwright tests pass.
- [ ] No dead code introduced.
- [ ] No duplication introduced.
