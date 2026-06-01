# Localization Architecture - X7do0 Academy

## Overview
A scalable, lightweight i18n foundation to support English (LTR) and Arabic (RTL).

## Components

### 1. Resource Files
Stored in `assets/i18n/`. Use JSON for language definitions.
- `en.json`: Default English resources.
- `ar.json`: Arabic resources.

### 2. Language Service (`assets/js/i18n.js`)
Handles:
- Loading resources asynchronously.
- Persistence via `localStorage`.
- Initialization based on saved preferences, browser language, or default (en).
- Applying `lang` and `dir` attributes to the `<html>` document.

### 3. Translation Helper
Access via `i18n.t("key.path")` to retrieve translated strings.

## RTL/LTR Strategy
- Automatic `dir` attribute injection on `<html>` based on current language (`rtl` for 'ar', `ltr` otherwise).
- CSS should utilize logical properties (e.g., `margin-inline-start`, `border-s`) to adapt automatically to the direction.

## Integration
The main application initializes the service on `DOMContentLoaded` before rendering UI elements.
