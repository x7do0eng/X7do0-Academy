---
name: project-auditing
description: Project auditing process for X7do0 Academy. Systematic inspection of file structure, dependencies, dead code, localization coverage, and theme consistency.
---

## Project Auditing — X7do0 Academy

### Audit Types

**1. Structural Audit**
- All files belong to expected directories.
- No orphaned files outside `courses/`, `assets/`, `data/`, `files/`, `tests/`, `docs/`.
- No duplicated page shells (navbar, head imports should be consistent).

**2. Dependency Audit**
- All CDN resources are accounted for (Tailwind, Font Awesome, Google Fonts).
- No unused external dependencies.
- DevDependencies (`@playwright/test`) are current.

**3. Dead Code Audit**
- Search for unused CSS classes (check `styles.css` against HTML templates).
- Search for unused JS functions or handlers.
- Search for unused i18n keys in JSON files.

**4. Localization Coverage Audit**
- Every user-facing string in HTML has `data-i18n` or is dynamically translated.
- Both `en.json` and `ar.json` have matching keys.
- No hardcoded English strings in HTML or JS templates.
- All dynamic content re-renders on `languageChanged` event.

**5. Theme Consistency Audit**
- Every themed element uses CSS variables (not hardcoded colors).
- Dark mode has no blinding surfaces or invisible text.
- Verify: light cards on light bg, dark cards on dark bg, text contrast.

**6. Test Coverage Audit**
- Every page has at least a smoke test (loads without errors).
- Critical user flows have Playwright tests.
- Theme toggle and language toggle tested (including persistence).

### Report Format
All audit reports go in `docs/reports/` with descriptive filenames:
- `docs/reports/ui-audit.md`
- `docs/reports/mobile-ux-audit.md`
- `docs/reports/localization-audit.md`
- `docs/reports/code-quality-audit.md`
