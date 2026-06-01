---
name: frontend-engineering
description: Frontend engineering workflows for the X7do0 Academy static site. Covers Tailwind CSS, CSS variables theme system, semantic HTML, and component patterns.
---

## Frontend Engineering — X7do0 Academy

### Tech Stack
- **No framework.** Vanilla HTML/CSS/JS, file-based routing.
- **Styling:** Tailwind CSS (CDN) + custom CSS variables (`assets/css/variables.css`) + shared styles (`assets/css/styles.css`).
- **Theme:** CSS custom properties under `:root` (light) and `[data-theme="dark"]` (dark).
- **Icons:** Font Awesome 6 (CDN).
- **Fonts:** Outfit (UI), Fira Code (code), Noto Sans Arabic (Arabic UI).

### Theme Conventions
- Use semantic CSS variables (`--bg-primary`, `--text-primary`, `--accent-primary`, etc.) rather than hardcoded colors.
- Use Tailwind `dark:` variants only when CSS variables cannot express the difference.
- Always verify both light and dark themes after changes.

### Localization Conventions
- Static labels use `data-i18n` attributes updated by `assets/js/i18n.js`.
- Dynamic content re-renders on `languageChanged` event.
- Use CSS logical properties (`border-s`, `ps-`, `me-`, `text-start`) for LTR/RTL support.
- Code blocks must remain LTR even in RTL/Arabic mode.

### Component Patterns
- Cards use `.academic-card` class from `styles.css`.
- Page shell: global navbar, breadcrumbs (on subpages), content area, optional footer.
- Feature-specific CSS must be scoped under a unique class (e.g., `.python-practice`).
- New JS modules must be ES modules, not global scripts.

### Responsive Strategy
- Desktop and mobile are treated as separate layout tiers.
- Mobile uses proper navigation patterns (drawers, stacked layouts).
- Touch targets must be at least 44x44px.
