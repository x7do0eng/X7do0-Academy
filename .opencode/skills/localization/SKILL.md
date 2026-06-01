---
name: localization
description: Localization (i18n) workflow for X7do0 Academy. Covers adding new translations, RTL support, and maintaining the bilingual system.
---

## Localization — X7do0 Academy

### Architecture

- **Single source of truth:** `assets/i18n/en.json` and `assets/i18n/ar.json`.
- **Engine:** `assets/js/i18n.js` — ES module, async resource loading, event-driven.
- **Fallback:** English resources always loaded as fallback for missing keys.
- **Aliases:** Flat keys in HTML (`data-i18n="nav_home"`) mapped to dotted JSON keys in `i18n.js`.

### Adding a New Translation

1. Add the key-value pair to both `en.json` and `ar.json` under the appropriate namespace.
2. If the key is used in static HTML, add `data-i18n="key"` to the element.
3. If used in dynamic JS, call `i18n.t("key.path")` during render.
4. For HTML content (e.g., `<span>` inside text), set `data-i18n-html="true"` on the element.
5. For placeholders: `data-i18n-placeholder="key"`.
6. For aria-labels: `data-i18n-aria-label="key"`.

### Flat Key Aliases

If you need a flat key (e.g., for `theme-manager.js` which uses flat keys), add an alias in `i18n.js`:
```js
aliases: {
  my_flat_key: 'namespace.my_key',
}
```

### RTL/LTR Guidelines

- Set `dir` on `<html>`, not on individual elements (except code blocks).
- Use CSS logical properties: `border-s` not `border-l`, `ps-` not `pl-`, `me-` not `mr-`.
- Use Tailwind logical utilities: `text-start` not `text-left`, `ms-auto` not `ml-auto`.
- Code blocks must remain LTR in all languages: add `direction: ltr !important` on `<pre>`/`<code>`.
- Directional icons (arrows, chevrons) should rotate with `rtl:rotate-180`.

### Testing

- Run `expectNoRawLocalizationKeys(page)` in Playwright tests.
- Manually verify switch: EN → AR → EN produces the same UI.
- Verify page title changes with language.
- Verify breadcrumbs and nav links update correctly.
