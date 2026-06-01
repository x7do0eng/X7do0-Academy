# X7do0 Academy

**Learn programming with depth, not shortcuts.**

An educational platform focused on the fundamental concepts that drive modern software engineering. Built as a static website with no frameworks, no build step, and no unnecessary complexity.

## Features

- **Structured learning paths** — Curated lessons that build knowledge layer by layer
- **Dark + light themes** — Persistent theme preference with smooth transitions
- **Full localization** — English and Arabic with RTL support
- **Mobile responsive** — Dedicated mobile layout with drawer navigation
- **Practice questions** — Interactive coding exercises with progressive reveal
- **Progress tracking** — Local-storage-based completion persistence

## Current Course

| Course | Status |
|--------|--------|
| **Python Core** — 12 lessons, 25 practice questions | Active |

## Tech Stack

- HTML5, CSS3, JavaScript (ES modules)
- [Tailwind CSS](https://tailwindcss.com/) (CDN)
- [Font Awesome](https://fontawesome.com/) (CDN)
- [Highlight.js](https://highlightjs.org/) (CDN)
- [Playwright](https://playwright.dev/) (E2E tests)
- GitHub Pages (hosting)

## Local Development

No build step required. Serve the directory with any static server:

```bash
# Python 3
python -m http.server 5500 -d X7do0-Academy

# Node.js (npx)
npx serve X7do0-Academy

# Run E2E tests
cd X7do0-Academy
npm install
npm run test:e2e
```

## Project Structure

```
X7do0-Academy/
├── index.html               # Homepage
├── accounts/index.html      # Connect page
├── courses/
│   ├── index.html           # Course catalog
│   └── python/
│       ├── index.html       # Python notes
│       └── practice/        # Practice questions
├── assets/
│   ├── css/                 # Stylesheets (variables, shared, scoped)
│   ├── js/                  # ES modules (i18n, theme, app logic)
│   └── i18n/                # Translation JSON files (en, ar)
├── data/                    # Course and question data
├── files/python/            # Downloadable lesson files
├── tests/e2e/               # Playwright end-to-end tests
└── docs/                    # Project documentation
```

## Screenshots

<!-- TODO: Add screenshots -->

## Roadmap

- C# Fundamentals
- C++ Systems Programming
- AI / Machine Learning
- Additional practice content

## License

ISC
