---
name: accessibility-review
description: Accessibility review process for X7do0 Academy. WCAG-focused checks for contrast, keyboard navigation, ARIA labels, and screen reader compatibility.
---

## Accessibility Review — X7do0 Academy

### Standards
Target **WCAG 2.1 Level AA** compliance.

### Automated Checks (Playwright)
Run tests to verify:
- No uncaught page errors (JS crashes block assistive tech).
- No raw i18n keys leaked into visible text.

### Manual Checks

**Color and Contrast:**
- Light theme: `--bg-primary` (#eef2f7) vs `--text-primary` (#020617) — passes.
- Light theme: card bg (#ffffff) vs primary bg (#eef2f7) — sufficient distinction.
- Dark theme: `--bg-primary` (#020617) vs `--text-primary` (#f8fafc) — passes.
- Links use `--accent-primary` with underline or bold weight.
- Error states use red, success uses green (with icon or text, not color alone).

**Keyboard Navigation:**
- All interactive elements reachable via Tab.
- Focus indicators visible (use `focus-visible` or outline styles).
- No keyboard traps.
- Tab order matches visual order.
- Custom interactive elements have `role` and `tabindex`.

**Screen Reader:**
- All images have `alt` text or `aria-label`.
- Navigation landmark (`<nav>`) present.
- Main content wrapped in `<main>`.
- Buttons and links have descriptive text (not just icons).
- Language and direction set on `<html>`.
- Theme toggle and language toggle have `aria-label`.

**ARIA:**
- Dynamic content updates dispatch appropriate events.
- Custom controls have `aria-expanded` where applicable.
- Modal/drawer content traps focus and returns focus on close.
