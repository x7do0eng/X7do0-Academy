/**
 * Mobile Navigation Drawer
 * Reads nav paths from body data attributes, builds a slide-over drawer.
 * Usage: <body data-nav-home="..." data-nav-courses="..." data-nav-connect="...">
 */

const DRAWER_ID = 'mobile-nav-drawer';
const OVERLAY_ID = 'nav-overlay';
const HAMBURGER_ID = 'hamburger-btn';
const OPEN_CLASS = 'open';
const VISIBLE_CLASS = 'visible';
const DRAWER_OPEN_CLASS = 'drawer-open';

const i18nKeys = {
    home: 'nav.home',
    courses: 'nav.courses',
    connect: 'nav.connect',
};

const NavDrawer = {
    init() {
        const body = document.body;
        this.homePath = body.dataset.navHome;
        this.coursesPath = body.dataset.navCourses;
        this.connectPath = body.dataset.navConnect;
        this.currentPage = body.dataset.page;

        if (!this.homePath) return;

        this.buildDrawer();
        this.buildOverlay();
        this.bindEvents();
    },

    buildDrawer() {
        const drawer = document.createElement('div');
        drawer.id = DRAWER_ID;
        drawer.className = 'nav-drawer';
        drawer.setAttribute('role', 'dialog');
        drawer.setAttribute('aria-modal', 'true');
        drawer.setAttribute('aria-hidden', 'true');
        drawer.setAttribute('aria-label', 'Navigation menu');

        const closeBtn = document.createElement('button');
        closeBtn.className = 'nav-drawer-close';
        closeBtn.setAttribute('aria-label', 'Close navigation menu');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';

        const nav = document.createElement('nav');
        nav.className = 'nav-drawer-links';

        const items = [
            { key: 'home', path: this.homePath },
            { key: 'courses', path: this.coursesPath },
            { key: 'connect', path: this.connectPath },
        ];

        items.forEach(({ key, path }) => {
            const link = document.createElement('a');
            link.href = path;
            link.className = 'nav-drawer-link';
            link.dataset.i18n = i18nKeys[key];
            link.dataset.navLink = key;
            link.textContent = key.charAt(0).toUpperCase() + key.slice(1);

            const currentSection = document.body.dataset.navSection || this.currentPage;
            if (currentSection === key) {
                link.classList.add('nav-link-active');
            }

            link.addEventListener('click', () => this.close());
            nav.appendChild(link);
        });

        drawer.appendChild(closeBtn);
        drawer.appendChild(nav);
        document.body.appendChild(drawer);

        this.drawer = drawer;
        this.closeBtn = closeBtn;
    },

    buildOverlay() {
        const overlay = document.createElement('div');
        overlay.id = OVERLAY_ID;
        overlay.className = 'nav-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        document.body.appendChild(overlay);
        this.overlay = overlay;
    },

    bindEvents() {
        this.hamburger = document.getElementById(HAMBURGER_ID);
        if (!this.hamburger) return;

        this.hamburger.addEventListener('click', () => this.toggle());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.drawer.contains(e.target) && e.target !== this.hamburger && !this.hamburger.contains(e.target)) {
                this.close();
            }
        });
    },

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    },

    open() {
        this.isOpen = true;
        this.drawer.classList.add(OPEN_CLASS);
        this.drawer.setAttribute('aria-hidden', 'false');
        this.overlay.classList.add(VISIBLE_CLASS);
        document.body.classList.add(DRAWER_OPEN_CLASS);
        this.hamburger.setAttribute('aria-expanded', 'true');

        this.closeBtn.focus();
        this.focusTrap();
    },

    close() {
        this.isOpen = false;
        this.drawer.classList.remove(OPEN_CLASS);
        this.drawer.setAttribute('aria-hidden', 'true');
        this.overlay.classList.remove(VISIBLE_CLASS);
        document.body.classList.remove(DRAWER_OPEN_CLASS);
        this.hamburger.setAttribute('aria-expanded', 'false');

        this.hamburger.focus();
    },

    focusTrap() {
        const focusable = this.drawer.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        const handler = (e) => {
            if (e.key !== 'Tab') return;
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        this.drawer.addEventListener('keydown', handler);
        this._focusHandler = handler;
    },
};

let scrollbarWidth = null;

function getScrollbarWidth() {
    if (scrollbarWidth !== null) return scrollbarWidth;
    scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    return scrollbarWidth;
}

document.addEventListener('DOMContentLoaded', () => {
    NavDrawer.init();
    const existingHandler = document.documentElement.style.getPropertyValue.bind(document.documentElement.style);
    document.addEventListener('drawer-state-change', () => {});
});
