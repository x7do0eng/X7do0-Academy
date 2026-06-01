# Interaction Regression Fix

## Root Cause

The visual redesign renamed question card classes from `.academic-card` to `.practice-question-card` but did NOT update the event delegation in `python-practice.js`.

The practice page's `init()` method registers click/keydown listeners on `#practice-questions-container` that use `e.target.closest('.academic-card')`. Since cards are now `.practice-question-card`, `closest('.academic-card')` returns `null` and the navigation handler never fires.

Additionally, the ID extraction logic looked for `card.querySelector('.font-mono')` which matched the old card structure (`<span class="text-[10px] font-mono ...">#1</span>`). The new structure uses `<span class="question-number">1</span>` (plain number, no `#` prefix, no `font-mono` class).

## Files Modified

### `assets/js/python-practice.js`

**Event delegation selectors** — Two lines in `init()`:
- `e.target.closest('.academic-card')` → `e.target.closest('.practice-question-card')`
- `card.querySelector('.font-mono')` → `card.querySelector('.question-number')`
- `idSpan.textContent.replace('#', '')` → `idSpan.textContent.trim()`

Both the `click` and `keydown` (Enter) handlers were updated.

### `assets/css/styles.css`

**`.card-accent-top::before`** — Added `pointer-events: none` to prevent the decorative 3px gradient bar pseudo-element from intercepting clicks on cards below it. While only 3px tall, this follows the principle that no decorative layer should intercept user actions.

## Other Interactive Surfaces Verified (No Issues Found)

| Surface | Mechanism | Status |
|---------|-----------|--------|
| Lesson keywords | `.keyword` click handler in `app.js` | Working |
| Files/Resources toggle | `.toggle-btn` in `app.js` | Working |
| Sub-navigation cards | `<a>` tags with absolute href | Working |
| Course catalog cards | `<a>` tags with absolute href | Working |
| Homepage CTAs | `<a>` tags with absolute href | Working |
| Practice progress resume | `<a>` tag with `./question.html?id=` | Working |
| Prev/Next navigation | `<a>` tags with `href` | Working |
| Category buttons | Click handlers in `PracticeController` | Working |
| Theme/Lang toggles | DOM event listeners | Working |

## Playwright Validation

- **121/121 tests pass** (no regressions)
- Manual Playwright interaction debug confirmed:
  - Practice question card click navigates to `question.html?id=1` ✓
  - Keyword click triggers code overlay ✓
  - Sub-navigation cards navigate correctly ✓
  - `card-accent-top ::before` no longer intercepts events ✓
