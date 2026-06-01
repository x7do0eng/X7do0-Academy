# Light Theme Readability and Contrast Audit Report

## 1. Root Causes Found
*   **Insufficient Contrast:** Light theme background (`#f1f4f8`) was too close to card backgrounds and borders, reducing legibility.
*   **Hardcoded Colors:** Several UI components relied on hardcoded hex values or generic rgba colors that didn't adapt well to contrast requirements.
*   **Text Readability:** Secondary text colors were too muted for professional readability standards in light mode.

## 2. Files Modified
*   [`assets/css/variables.css`](assets/css/variables.css): Updated semantic color tokens.
*   [`assets/css/styles.css`](assets/css/styles.css): Updated component styles to use updated tokens and improved shadow/border contrast.

## 3. Updated Design Tokens
| Token | Old (Light) | New (Light) |
| :--- | :--- | :--- |
| `--bg-primary` | `#f1f4f8` | `#eef2f7` |
| `--bg-card` | `#fcfdfe` | `#ffffff` |
| `--text-primary` | `#1a1f36` | `#0f172a` |
| `--text-secondary` | `#3d4f6f` | `#334155` |
| `--text-muted` | `#7b8ba5` | `#64748b` |
| `--border-subtle` | `#dbe1ee` | `#cbd5e1` |

## 4. Test Results
*   New E2E test `light-theme-contrast.spec.js` validates that cards are distinct from the background in light mode and that dark mode remains unaffected.

## 5. Remaining UI Debt
*   Ensure all custom components adopt these new semantic variables.
*   Periodic accessibility audit to ensure future additions maintain the established contrast ratios.
