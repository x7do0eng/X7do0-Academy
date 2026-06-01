---
name: refactoring
description: Safe refactoring process for X7do0 Academy. Preserve backups, verify with Playwright, and document changes.
---

## Refactoring — X7do0 Academy

### Process

1. **Check Git status.** Record the current state before starting.
2. **Run the full test suite.** `npm run test:e2e` — verify baseline passes.
3. **Back up files.** If unsure about changes, copy files to `archive/backup/` first.
4. **Make focused changes.** One concern per commit/change.
5. **Run tests again.** Verify no regressions.
6. **Check both themes.** Light and dark.
7. **Check both languages.** English and Arabic.
8. **Screenshot if UI changed.** Save to `docs/screenshots/`.

### Rules

- Never refactor and add features in the same change.
- Extract, don't rewrite. Prefer renaming and restructuring over replacing.
- Preserve existing `data-i18n` keys and translation JSON structures unless explicitly updating them.
- When renaming CSS classes, keep the old name as an alias until all references are updated.
- Hardcoded values should be replaced with variables or constants, not just moved.
- If a refactor touches localization files, verify all UI text matches.

### Common Refactoring Patterns in This Project

| Pattern | Approach |
|---|---|
| Duplicated HTML headers | Extract into JS template or shared snippet |
| Hardcoded colors | Replace with CSS variables |
| Physical alignment classes | Replace with logical properties |
| Global script pattern | Convert to ES module |
| Repeated Tailwind class strings | Extract into CSS class |
