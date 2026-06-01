/**
 * Theme & Language Manager
 * Handles global state for Dark Mode (only).
 * Localization is delegated to i18n.js.
 */

// Immediate Execution to prevent flash
(function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLang = localStorage.getItem('lang') || 'en';

    // Apply immediately to root element
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';

    // Apply font
    if (savedLang === 'ar') {
        document.documentElement.classList.add('font-arabic');
    } else {
        document.documentElement.classList.remove('font-arabic');
    }

    // Force icon sync if possible
    window.addEventListener('DOMContentLoaded', () => {
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            const span = langToggle.querySelector('span');
            if (span) {
                span.textContent = savedLang === 'ar' ? 'EN' : 'عربي';
            }
        }
    });
})();

class ThemeManager {
    constructor() {
        this.html = document.documentElement;
        this.init();
    }

    init() {
        // Highlight Active Nav
        this.highlightActiveNav();

        // Event Listeners
        this.themeToggle = document.getElementById('theme-toggle');
        this.langToggle = document.getElementById('lang-toggle');

        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                const newTheme = this.html.dataset.theme === 'dark' ? 'light' : 'dark';
                this.setTheme(newTheme);
            });
        }

        if (this.langToggle) {
            this.langToggle.addEventListener('click', () => {
                const newLang = this.html.lang === 'ar' ? 'en' : 'ar';
                this.setLang(newLang);
            });
        }
    }

    highlightActiveNav() {
        const currentPage = document.body.dataset.page;
        if (currentPage) {
            const navKey = document.body.dataset.navSection || currentPage;
            const activeLinks = document.querySelectorAll(`[data-nav-link="${navKey}"]`);
            activeLinks.forEach(link => {
                link.classList.add('nav-link-active');
            });
        }
    }

    setTheme(theme) {
        this.html.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        this.updateIcons();
        const hljsLink = document.getElementById('hljs-theme-link');
        if (hljsLink) {
            hljsLink.href = theme === 'dark'
                ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
                : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
        }
    }

    setLang(lang) {
        this.html.lang = lang;
        this.html.dir = lang === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('lang', lang);

        if (lang === 'ar') {
            this.html.classList.add('font-arabic');
        } else {
            this.html.classList.remove('font-arabic');
        }

        this.updateIcons();

        // Notify i18n.js to update all text content
        window.dispatchEvent(new CustomEvent('languagePreferenceChanged', { detail: { lang } }));
    }

    updateIcons() {
        const theme = this.html.dataset.theme || 'light';
        const lang = this.html.lang || 'en';

        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
            }
        }

        if (this.langToggle) {
            const span = this.langToggle.querySelector('span');
            if (span) {
                span.textContent = lang === 'ar' ? 'EN' : 'عربي';
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
