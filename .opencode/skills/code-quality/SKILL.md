---
name: code-quality
description: Code quality standards for X7do0 Academy. Covers linting patterns, dead code detection, duplication avoidance, and formatting conventions.
---

## Code Quality — X7do0 Academy

### Standards

- **Avoid dead code.** Remove unused CSS classes, JS functions, and HTML elements.
- **Avoid duplication.** Shared patterns (navigation, headers, toggles) should not be copied across HTML files.
- **Avoid hardcoded values.** Use CSS variables for colors, spacing, and shadows. Use constants for magic numbers and strings.
- **Prefer reusable components.** Extract repeated HTML+CSS patterns into shared classes or JS template functions.
- **Preserve clean project structure.** New files go in established directories; no root-level clutter.

### CSS Quality

- No global `*` reset (handled by Tailwind preflight).
- No hardcoded color hex values for theme-dependent properties (use CSS variables).
- No `!important` unless absolutely necessary and documented.
- Maximum specificity: 0-2-0 (class-based selectors only, no ID or element selectors).
- Scoped feature CSS under a single class prefix.

### JavaScript Quality

- ES modules only. No global variables.
- No `console.log` in production code (use `console.warn`/`console.error` for diagnostics).
- Functions under 50 lines where possible.
- No jQuery or other framework dependencies.
- Event listeners use delegation where feasible.
- JavaScript errors must never cascade to the user (use try/catch at boundaries).

### HTML Quality

- Semantic HTML5 elements: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- `data-page` attribute on `<body>` identifies current page.
- `data-i18n` for translatable text.
- `aria-label` for icon-only buttons.
- No inline JS event handlers (onclick, etc.).

### Verification
- Run Playwright tests to catch runtime errors.
- Manually inspect for unused CSS classes.
- Check for dead code paths in conditionals.
