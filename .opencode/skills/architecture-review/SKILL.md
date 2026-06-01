---
name: architecture-review
description: Architecture review guidelines for X7do0 Academy. Ensures consistency, maintainability, and adherence to project standards.
---

## Architecture Review — X7do0 Academy

### Principles
1. **Architecture over patches.** Design for the problem, not the moment.
2. **Maintainability over shortcuts.** The next engineer should understand the code.
3. **Consistency over cleverness.** Prefer patterns already in use.
4. **Avoid duplicated systems.** One way to theme, one way to localize, one way to render.

### Review Checklist

**File Structure:**
- New feature belongs in existing directory structure (courses/, assets/, data/).
- Pages go in logically named directories with `index.html`.
- Feature-specific CSS goes in `assets/css/` with scoped selectors.
- Feature-specific JS goes in `assets/js/` as ES modules.
- Data files go in `data/`.

**CSS:**
- Shared visual tokens in `variables.css`, used via `var(--token)`.
- Shared component classes in `styles.css`.
- Feature-specific styles in separate scoped files.
- No hardcoded colors or direct Tailwind color classes for theme-dependent elements.
- Logical properties used for LTR/RTL support.

**JavaScript:**
- `theme-manager.js` — only theme/language initialization and toggling.
- `i18n.js` — only translation resource loading and text updates.
- `app.js` — only Python notes page rendering.
- New features get their own module file.
- No global variable pollution; use ES modules.
- Event-based communication (`languageChanged`, `languagePreferenceChanged`).

**Localization:**
- Static text via `data-i18n` attributes.
- Dynamic text via `i18n.t("key.path")`.
- All user-facing strings in `assets/i18n/{en,ar}.json`.
- No hardcoded strings in HTML or JS for user-facing text.

**Routing:**
- Static file-based only. No client-side router.
- Query strings for internal state (practice filters, question IDs).
- `popstate` event for browser back/forward support.
