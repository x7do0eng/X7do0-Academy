---
name: ui-ux-review
description: UI and UX review guidelines for X7do0 Academy. Covers layout inspection, theme verification, RTL/LTR parity, and mobile behavior.
---

## UI/UX Review — X7do0 Academy

### Review Checklist

**Every page:**
- Loads without JS errors.
- Navbar: brand link works, active page highlighted, toggles render correctly.
- Theme toggle works (light ↔ dark) and preference persists on reload.
- Language toggle works (EN ↔ AR) and preference persists on reload.
- No raw localization keys visible in UI.
- SEO meta tags present (viewport, description, og:image, theme-color).

**Theme check (light + dark):**
- Text has sufficient contrast (WCAG AA minimum: 4.5:1 normal, 3:1 large).
- Cards are visually distinct from background.
- No blinding white surfaces in dark mode.
- No invisible text (check for hardcoded light-only colors).

**RTL check (Arabic):**
- Page direction flips correctly (`dir="rtl"`).
- Text alignment uses logical properties (`text-start`, not `text-left`).
- Borders/margins use logical properties (`border-s`, `ps-`, `me-`).
- Code blocks remain LTR.
- Icons with directional meaning (arrows) rotate with `rtl:rotate-180`.

**Mobile check (320px, 375px, 430px):**
- Content does not overflow horizontally.
- Touch targets are at least 44x44px.
- Navigation is usable (no hover-only interactions).
- All interactive elements are reachable without horizontal scroll.

**Consistency:**
- Same fonts, spacing, color palette as rest of Academy.
- Breadcrumbs match page hierarchy.
- No duplicated or orphaned navigation elements.
