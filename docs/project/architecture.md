# Project Architecture — X7do0 Academy

## Overview

X7do0 Academy is a static educational website. It uses file-based routing, vanilla JavaScript, Tailwind CSS (CDN), and custom CSS variables for theming. There is no build step, no bundler, and no JavaScript framework.

---

## Page Architecture

### Routing
- **Static file system.** Each route maps to a directory with `index.html`.
- Root `/` → `index.html` (Home).
- `/courses/` → `courses/index.html` (Course catalog).
- `/courses/python/` → `courses/python/index.html` (Python Notes).
- `/courses/python/practice/` → `courses/python/practice/index.html` (Practice Questions).
- `/courses/python/practice/question.html` → Individual question detail page (loaded via query string `?id=N`).
- `/accounts/` → `accounts/index.html` (Connect page).

### Page Shell (Shared Pattern)
Every page follows this structure:
1. `<head>` — Tailwind CDN, Font Awesome, Google Fonts, CSS imports, theme-manager.js, i18n init.
2. `<body data-page="page-id">` — identifies current page.
3. `<nav>` — Global navbar with brand, links, theme/language toggles.
4. Breadcrumbs (subpages only).
5. `<main>` — Page-specific content.
6. `<footer>` — Minimal.

---

## Theme Architecture

### CSS Custom Properties
Defined in `assets/css/variables.css`:

- **`:root`** — Light theme tokens.
- **`[data-theme="dark"]`** — Dark theme tokens.

Key token categories:
- `--bg-primary`, `--bg-card`, `--bg-card-hover` — Background surfaces.
- `--text-primary`, `--text-secondary`, `--text-muted` — Text hierarchy.
- `--accent-primary`, `--accent-hover`, `--accent-surface` — Accent colors.
- `--border-subtle`, `--border-accent` — Border colors.
- `--shadow-sm`, `--shadow-md` — Box shadows.
- `--nav-bg` — Navbar background.
- `--code-bg`, `--code-border`, `--code-text` — Code block colors.

### Theme Application
1. `theme-manager.js` runs inline in `<head>` to apply saved theme before paint (prevents flash).
2. Sets `data-theme` on `<html>`, persists to `localStorage.theme`.
3. Toggle button calls `ThemeManager.setTheme()` which updates `data-theme` and icon.

---

## Localization Architecture

### Files
- `assets/i18n/en.json` — English resources (fallback language).
- `assets/i18n/ar.json` — Arabic resources.

### Engine (`assets/js/i18n.js`)
- ES module. Async resource loading.
- Reads `localStorage.lang` or browser language on init.
- Sets `<html lang="..." dir="...">`.
- Provides `i18n.t("key.path")` for dynamic translation.
- Updates `[data-i18n]` elements on language change.
- Dispatches `languageChanged` custom event for dynamic modules.
- Supports flat key aliases (backward compatibility with theme-manager).
- Interpolation via `i18n.t("key", {param: value})`.

### Lifecycle
1. `theme-manager.js` (inline) applies saved lang/dir to `<html>`.
2. `i18n.init()` is called on `DOMContentLoaded`.
3. Language toggle in theme-manager dispatches `languagePreferenceChanged`.
4. i18n.js catches the event, loads new resources, updates UI, dispatches `languageChanged`.
5. Dynamic modules (app.js, python-practice.js) listen for `languageChanged` and re-render.

---

## JavaScript Module Architecture

### Module Roles

| Module | Role | Loaded on |
|---|---|---|
| `theme-manager.js` | Theme/language init + toggling | All pages (inline in head) |
| `i18n.js` | Translation engine | All pages (ES module) |
| `app.js` | Python Notes lesson grid | `/courses/python/` |
| `python-practice.js` | Practice question browser | `/courses/python/practice/` |
| `python-detail.js` | Question detail page | `/courses/python/practice/question.html` |
| `progress-tracker.js` | Progress persistence (localStorage) | Practice pages |

### Communication Pattern
Modules communicate via custom events on `window`:
- `languagePreferenceChanged` — theme-manager → i18n (language toggle).
- `languageChanged` — i18n → all dynamic modules (re-render).
- No direct cross-module function calls.
- No global state (except through localStorage for persistence).

---

## Data Architecture

### Static Data Files (ES Modules)
- `data/python-lessons.js` → exports `lessons` array (12 objects).
- `data/python-practice-questions.js` → exports `questions` (25) and `categories` (11).

### Persistence (localStorage)
- `theme` — "light" | "dark".
- `lang` — "en" | "ar".
- `academy_progress` — JSON array of completed question IDs.

---

## CSS Architecture

### File Breakdown

| File | Scope | Contents |
|---|---|---|
| `variables.css` | Global | CSS custom properties for theme tokens |
| `styles.css` | Global | Shared component classes (`.academic-card`, `.keyword`, `.navbar-sticky`, `.nav-link`, etc.) |
| `python-practice.css` | Practice page | Scoped under `.python-practice` |

### Selector Strategy
- **Global styles:** Class-based selectors only. No element or ID selectors.
- **Feature styles:** Scoped under a unique class prefix (e.g., `.python-practice .card`).
- **Tailwind:** Used for layout, spacing, typography. Not for theme-dependent colors.

---

## Testing Architecture

- **Framework:** Playwright.
- **Location:** `tests/e2e/`.
- **Helper:** `helpers.js` provides shared utilities (`useCleanPreferences`, `trackPageErrors`, `expectNoPageErrors`, `expectNoRawLocalizationKeys`).
- **Server:** `support/static-server.mjs` serves the static files during tests.
- **Config:** `playwright.config.js` — Chromium, Firefox, WebKit. Desktop viewports.

---

## Future Architecture Considerations

1. **Python-Bank integration** — A detailed blueprint exists at the parent level (`PYTHON_BANK_INTEGRATION_PLAN.md`). The recommendation is to create `courses/python/practice/` with native Academy code rather than merging the standalone app.
2. **HTML deduplication** — The `<head>` block is duplicated across all pages. Future work could extract this into a shared template or JS loader.
3. **New courses** — Adding a new course means creating a new page under `courses/<name>/` with its own data file and renderer module.
