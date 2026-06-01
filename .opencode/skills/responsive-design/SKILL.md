---
name: responsive-design
description: Responsive design workflow for X7do0 Academy. Mobile-first approach with distinct desktop and mobile layouts.
---

## Responsive Design — X7do0 Academy

### Philosophy

Desktop and Mobile are treated as **separate experiences** when appropriate.
- Do not compress desktop layouts into mobile screens.
- Use proper mobile navigation patterns (drawers, bottom sheets, stacked layouts).
- Respect touch targets, readability, and visual hierarchy on all sizes.

### Breakpoints

| Breakpoint | Target | Notes |
|---|---|---|
| 320px | Small mobile | Minimum supported width |
| 375px | iPhone SE/standard | Typical mobile width |
| 430px | Large phone | iPhone 14 Pro Max |
| 768px | Tablet | iPad, switches to 2-column |
| 1024px | Desktop | 3-column grids, sidebars |
| 1440px | Wide desktop | Max content width |

### Mobile Rules

- Touch targets minimum 44x44px.
- No hover-only interactions (add click/tap fallback).
- Search must remain accessible (not hidden).
- Category navigation uses a slide-out drawer with overlay.
- Drawer closes on: close button, overlay click, Escape key.
- Focus must be managed when drawer opens/closes.

### Desktop Rules

- Grid layouts (2-3 columns) with consistent card sizes.
- Sidebar navigation for categories and filters.
- Hover interactions for code preview, card elevation.
- Max content width: ~900px for text-heavy pages, full width for tool pages.

### Implementation

- Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.
- Use CSS `@media (min-width: ...)` for complex layout changes.
- Test at all breakpoints listed above.
- Use `hidden md:block` or `md:hidden` for separate desktop/mobile elements.
