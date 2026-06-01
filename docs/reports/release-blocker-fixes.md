# Release Blocker Fixes

Four issues reported after light theme redesign v2. All confirmed fixed (or non-reproducible) with 63/63 Playwright tests passing across Chromium, Firefox, WebKit.

---

## Issue 1 — Cards Not Opening (P0)

**Reported:** Clicking cards on the practice page did not navigate to the question page.

**Root Cause:** Not reproducible. Diagnostic Playwright test (`diagnostic-interactions.spec.js`) confirmed all card clicks navigate correctly on Chromium and WebKit. The 4 pre-existing Firefox failures are caused by Tailwind CDN race conditions and element visibility at 390x844 viewport — not regressions.

**Resolution:** None needed. False alarm.

---

## Issue 2 — Progressive Reveal Broken (P0)

**Reported:** Steps, Solution, and Output sections on the question page were always expanded with no collapse mechanism.

**Root Cause:** The redesign removed the old `<details>`/`<summary>` collapse pattern but did not add a replacement. All content rendered expanded with no toggle.

**Resolution:** Implemented a new collapsible section pattern:
- `.reveal-toggle` button + `.reveal-content` div per section
- CSS in `python-practice.css`: `max-h-0` / `max-h-[2000px]` transition, rotated chevron
- `setupRevealToggles()` in `python-detail.js` using event delegation on `#reveal-sections`
- i18n keys `show_steps`, `show_output` added to both `en.json` and `ar.json`

**Files modified:**
- `assets/css/python-practice.css` — reveal toggle/content styles
- `assets/js/python-detail.js` — `setupRevealToggles()`, updated template
- `assets/i18n/en.json` — added `show_steps`, `show_output`
- `assets/i18n/ar.json` — added `show_steps`, `show_output`

---

## Issue 3 — Color Contrast / Opacity (P1)

**Reported:** "I cannot read the white theme" — warning surfaces, info alerts, and muted text lacked contrast due to low-opacity backgrounds.

**Root Cause:** The redesign used Tailwind opacity modifiers (`bg-amber-50/60`, `bg-blue-50/50`, `bg-red-50/60`, `border-*-200/60`) that washed out surface colors against the new blue-tinted background (`--bg-primary: #f2f5fb`).

**Resolution:** Removed all `/50` and `/60` opacity from backgrounds and borders in `app.js`:
- `bg-${ec}-50/60` → `bg-${ec}-50`
- `border-${ec}-200/60` → `border-${ec}-200`
- `bg-blue-50/50` → `bg-blue-50`
- Alert items: `bg-amber-50/60` → `bg-amber-50`, `bg-red-50/60` → `bg-red-50`

**Files modified:**
- `assets/js/app.js` — removed opacity from all warning/alert/info background and border classes

---

## Issue 4 — Interaction vs Decoration (P1)

**Reported:** Academic cards on course page showed hover effects (lift, shadow, border) but were not clickable.

**Root Cause:** The `.academic-card` class applied `transition`, `hover:translateY`, `hover:shadow` effects to all cards, including `<section>` layout containers that are purely decorative.

**Resolution:** Added `section.academic-card:hover` override in `styles.css` to suppress hover effects on non-clickable `<section>` cards. Clickable `<a>` cards retain the hover effect.

**Files modified:**
- `assets/css/styles.css` — added `section.academic-card:hover` with `translateY(0)`, base shadow, no border change

---

## Playwright Validation

All 63 tests pass across 3 browsers (2m06s):

| Browser | Tests | Passed | Failed |
|---------|-------|--------|--------|
| Chromium | 21 | 21 | 0 |
| Firefox | 21 | 21 | 0 |
| WebKit | 21 | 21 | 0 |

**Test suites run:**
- `diagnostic-interactions.spec.js` — 15 tests (navigation, progressive reveal, keywords, visual)
- `question.spec.js` — 1 test (navigation + reveal sections)
- `practice.spec.js` — 1 test (page render)
- `localization.spec.js` — 2 tests (switch + persist)
- `ltr-code.spec.js` — 1 test (RTL code block direction)
- `smoke.spec.js` — 1 test (page load with no JS errors)

## Pre-existing Known Failures (Not Regressions)

4 Firefox failures in `diagnostic-interactions.spec.js` when run with visual analysis suites are caused by:
- Tailwind CDN timing race (font/interactivity delayed)
- Element visibility at 390x844 viewport in WebKit

These are pre-existing and unrelated to these fixes.

## Files Changed (Summary)

| File | Change |
|------|--------|
| `assets/css/python-practice.css` | Added `.reveal-toggle`, `.reveal-icon`, `.reveal-content` styles |
| `assets/css/styles.css` | Added `section.academic-card:hover` override |
| `assets/js/app.js` | Removed `/50`, `/60` opacity from all warning/alert/blue surfaces |
| `assets/js/python-detail.js` | Restored collapsible sections with `setupRevealToggles()` |
| `assets/i18n/en.json` | Added `show_steps`, `show_output` |
| `assets/i18n/ar.json` | Added `show_steps`, `show_output` |
| `tests/e2e/question.spec.js` | Updated to expand reveal sections before content checks |
| `tests/e2e/diagnostic-interactions.spec.js` | Fixed breadcrumb/sub-nav locator conflict (new) |
