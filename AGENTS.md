# X7do0 Academy — Engineering Memory

This file is the permanent project instruction file for all agents working on this repository. Read it before any task.

---

## Project Identity

**Name:** X7do0 Academy
**Purpose:** Educational platform focused on deep understanding of programming and computer engineering concepts.
**Current course:** Python Core
**Future courses:** C#, C++, AI/ML, additional engineering content.
**Site type:** Static HTML/CSS/JS site deployed on GitHub Pages.

---

## Project Structure

```
X7do0-Academy/
├── index.html                          # Homepage
├── AGENTS.md                           # This file (project memory)
├── opencode.json                       # OpenCode project config
├── playwright.config.js                # Playwright E2E configuration
├── package.json                        # Dependencies (playwright only)
├── .gitignore                          # Git exclusion rules
├── .nojekyll                           # Disable Jekyll on GitHub Pages
├── .opencode/                          # OpenCode skills and agents
│   ├── skills/                         # Reusable skill definitions
│   └── agents/                         # Custom agent definitions
├── accounts/
│   └── index.html                      # Connect page
├── courses/
│   ├── index.html                      # Course catalog
│   └── python/
│       ├── index.html                  # Python Notes page
│       └── practice/
│           ├── index.html              # Practice Questions list
│           └── question.html           # Individual question page
├── assets/
│   ├── css/
│   │   ├── variables.css               # CSS custom properties (theme tokens)
│   │   ├── styles.css                  # Shared component styles
│   │   └── python-practice.css         # Practice page scoped styles
│   ├── js/
│   │   ├── theme-manager.js            # Theme + language toggling (inline script)
│   │   ├── i18n.js                     # Localization service (ES module)
│   │   ├── app.js                      # Python Notes renderer (ES module)
│   │   ├── python-practice.js          # Practice questions controller (ES module)
│   │   ├── progress-tracker.js         # Progress persistence (ES module)
│   │   └── python-detail.js            # Question detail renderer (ES module)
│   ├── i18n/
│   │   ├── en.json                     # English translations
│   │   └── ar.json                     # Arabic translations
│   ├── favicon.png
│   └── preview.png                     # OpenGraph social preview
├── data/
│   ├── python-lessons.js               # 12 lessons data (ES module)
│   └── python-practice-questions.js    # 25 practice questions (ES module)
├── files/
│   └── python/lesson-01..12/           # Downloadable Python lesson files
├── tests/
│   └── e2e/                            # Playwright E2E tests
│       ├── helpers.js                  # Shared test utilities
│       ├── smoke.spec.js               # Basic page load tests
│       ├── practice.spec.js            # Practice page tests
│       ├── localization.spec.js        # i18n tests
│       ├── question.spec.js            # Question page tests
│       ├── ltr-code.spec.js            # Code block direction tests
│       ├── capture-screenshots.spec.js # Screenshot capture
│       ├── light-theme-contrast.spec.js# Theme contrast tests
│       └── support/
│           └── static-server.mjs       # Dev server for testing
├── archive/                            # Historical reports and backups
│   ├── WEBSITE_AUDIT_REPORT.md
│   ├── I18N_ARCHITECTURE.md
│   ├── LIGHT_THEME_REFINEMENT_REPORT.md
│   ├── REPAIR_REPORT.md
│   └── backup/
├── docs/
│   ├── reports/                        # All audit/review reports
│   ├── project/                        # Project knowledge documents
│   └── screenshots/                    # UI screenshots
└── update.bat                          # Local git automation (not committed)
```

---

## Build & Test Commands

```bash
npm run test:e2e             # Run all Playwright tests headless
npm run test:e2e:headed      # Run tests in visible browser
npm run test:e2e:ui          # Playwright UI test runner
```

There is no build step. The site is static HTML. No bundler, no framework.

---

## Architecture Overview

### Page System
- Static file-based routing. Each page is a directory with `index.html`.
- `data-page` attribute on `<body>` identifies the current page for nav highlighting.
- Navbar active state managed by `theme-manager.js` via `data-nav-link` attributes.
- Breadcrumbs on subpages (courses, python, practice).

### Theme System
- **Source of truth:** `assets/css/variables.css` — CSS custom properties.
- Light theme: `:root` block.
- Dark theme: `[data-theme="dark"]` block.
- Toggle: `theme-manager.js` sets `data-theme` on `<html>` and persists to `localStorage.theme`.
- Do NOT use hardcoded Tailwind color classes for theme-dependent elements. Use CSS variables or `dark:` variants.

### Localization System
- **Source of truth:** `assets/i18n/{en,ar}.json`.
- **Engine:** `assets/js/i18n.js` (ES module).
- Static text: `data-i18n="key.path"` on HTML elements.
- Dynamic text: `i18n.t("key.path")` in JS.
- Flat key aliases in `i18n.js` for backward compatibility with `theme-manager.js`.
- On language change, `theme-manager.js` dispatches `languagePreferenceChanged`, then `i18n.js` dispatches `languageChanged`.
- All dynamic components re-render on `languageChanged` event.

### CSS Conventions
- Use CSS custom properties from `variables.css` for all colors, shadows, borders.
- Use Tailwind *logical* utilities for spacing: `ps-` (padding-inline-start), `pe-`, `ms-`, `me-`, `text-start`, `border-s`.
- Code blocks must remain LTR in all languages: `direction: ltr !important`.
- Feature-specific CSS goes in separate files with scoped selectors (e.g., `.python-practice`).

### JavaScript Conventions
- ES modules only. No global variables.
- No jQuery. No framework.
- Event-driven communication between modules.
- Module isolation: `app.js` handles only Python notes; `python-practice.js` handles only practice.

### Testing
- Playwright E2E tests in `tests/e2e/`.
- Use `useCleanPreferences(page)` for clean test state.
- Use `trackPageErrors(page)` and `expectNoPageErrors(errors)` to verify no JS errors.
- Use `expectNoRawLocalizationKeys(page)` to verify i18n doesn't leak keys.
- Prefer fixing tests over disabling them.

---

## Engineering Principles

1. **Architecture over patches.** Design for the problem, not the moment.
2. **Maintainability over shortcuts.** The next engineer should understand the code.
3. **Consistency over cleverness.** Prefer patterns already in use.
4. **Accessibility is required.** WCAG 2.1 AA target.
5. **Mobile support is required.** Separate desktop/mobile layouts where appropriate.
6. **Localization must remain centralized.** All strings in JSON files, single i18n engine.
7. **Avoid duplicated systems.** One theming system, one i18n system, one way to render cards.
8. **Avoid hardcoded values.** Use CSS variables, constants, and translation keys.
9. **Prefer reusable components.** Extract patterns into shared classes and modules.
10. **Preserve clean project structure.** New files go in established directories.

---

## UI Rules

- Desktop and Mobile are separate layout tiers. Do not compress desktop into mobile.
- Touch targets: minimum 44x44px.
- No hover-only interactions on mobile (add click/tap fallback).
- Mobile navigation: drawer with overlay, not dropdowns.

## Playwright Rules

- Before major UI changes: inspect the actual running site with Playwright, capture screenshots.
- After modifications: run tests, verify no regressions.
- Do not rely solely on source-code inspection for UI changes.

## Localization Rules

- Single source of truth: `assets/i18n/` JSON files.
- All localization through the centralized i18n system (`i18n.js`).
- Avoid duplicate translation logic. Do not put translation strings in multiple places.

## Reporting Rules

- All reports: `docs/reports/` — e.g., `docs/reports/ui-audit.md`.
- Do not create random report folders.

## Screenshot Rules

- All screenshots: `docs/screenshots/` — e.g., `docs/screenshots/home-light.png`.
- Do not create random screenshot folders.

## Cleanup Rules

- Do not create unnecessary files.
- Before creating new documentation, check whether an existing document should be updated.
- Archive instead of deleting when uncertain.

---

## Available Skills

The `.opencode/skills/` directory contains reusable skill definitions:

| Skill | Description |
|---|---|
| `frontend-engineering` | Frontend patterns, theme, localization conventions |
| `playwright-testing` | E2E testing workflow |
| `ui-ux-review` | UI/UX review checklist |
| `accessibility-review` | WCAG-focused accessibility review |
| `architecture-review` | Architecture consistency review |
| `refactoring` | Safe refactoring process |
| `localization` | i18n and RTL workflow |
| `responsive-design` | Responsive design approach |
| `code-quality` | Code quality standards |
| `project-auditing` | Systematic project auditing |

Load a skill with the `skill` tool when its task matches.

---

## Available Custom Agents

The `.opencode/agents/` directory contains custom subagent definitions:

| Agent | Purpose |
|---|---|
| `@ui-review` | Reviews UI components for visual consistency |
| `@architecture-reviewer` | Reviews architecture against project patterns |
| `@code-reviewer` | Reviews code for quality, dead code, anti-patterns |
| `@docs-writer` | Creates and maintains project documentation |

Invoke with `@agent-name` in your prompt.
