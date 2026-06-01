const i18n = {
    currentLang: 'en',
    resources: {},
    fallbackResources: {},
    cache: {},
    initialized: false,
    initPromise: null,
    supportedLanguages: ['en', 'ar'],
    aliases: {
        // theme-manager flat keys → JSON dotted keys
        nav_home: 'nav.home',
        nav_courses: 'nav.courses',
        nav_connect: 'nav.connect',
        preview_title: 'preview.title',
        python_header_sub: 'python.header_sub',
        course_python_header_title: 'python.header_notes_html',
        course_python_notes_header_title: 'python.header_notes_html',
        course_python_practice_header_title: 'python.header_practice_html',
        python_name: 'python.name',
        python_notes_card_title: 'python.notes',
        python_notes_card_desc: 'python.notes_desc',
        python_practice_card_title: 'python.practice_questions',
        python_practice_card_desc: 'python.practice_desc',
        // Homepage
        welcome_label: 'home.welcome_label',
        hero_title: 'home.hero_title_html',
        hero_desc: 'home.hero_desc',
        cta_start: 'home.cta_start',
        cta_contact: 'home.cta_contact',
        feat_struct_title: 'home.features.struct_title',
        feat_struct_desc: 'home.features.struct_desc',
        feat_code_title: 'home.features.code_title',
        feat_code_desc: 'home.features.code_desc',
        feat_deep_title: 'home.features.deep_title',
        feat_deep_desc: 'home.features.deep_desc',
        instructor_title: 'home.instructor.title',
        instructor_bio: 'home.instructor.bio',
        instructor_link: 'home.instructor.link',
        // Courses
        courses_title: 'courses.title',
        courses_desc: 'courses.desc',
        back_home: 'courses.back_home',
        course_catalog: 'courses.catalog',
        active_badge: 'courses.active_badge',
        planned_badge: 'courses.planned_badge',
        coming_soon: 'courses.coming_soon',
        lessons_count: 'courses.lessons_count',
        course_python_title: 'courses.python.title',
        course_python_desc: 'courses.python.desc',
        course_cpp_title: 'courses.cpp.title',
        course_cpp_desc: 'courses.cpp.desc',
        course_csharp_title: 'courses.csharp.title',
        course_csharp_desc: 'courses.csharp.desc',
        // Connect
        connect_title: 'connect.title',
        connect_desc: 'connect.desc',
        desc_tg_personal: 'connect.telegram_personal',
        desc_tg_channel: 'connect.telegram_channel',
        desc_youtube: 'connect.youtube',
        desc_instagram: 'connect.instagram',
        // Python page (additional)
        files_resources: 'python.files_resources',
        lesson_code: 'python.lesson_code',
        challenge: 'python.challenge'
    },

    async init() {
        if (this.initPromise) return this.initPromise;

        this.initPromise = (async () => {
            this.currentLang = this.normalizeLang(localStorage.getItem('lang') || navigator.language.split('-')[0] || 'en');
            await this.loadResources(this.currentLang);
            this.applySettings();

            // Listen for language toggle events from theme-manager
            window.addEventListener('languagePreferenceChanged', (event) => {
                if (event.detail?.lang) {
                    this.setLanguage(event.detail.lang, { dispatch: true, source: 'theme-manager' });
                }
            });

            this.updateUI();
            this.initialized = true;
            return this;
        })();

        return this.initPromise;
    },

    normalizeLang(lang) {
        return this.supportedLanguages.includes(lang) ? lang : 'en';
    },

    getResourceUrl(lang) {
        return new URL(`../i18n/${lang}.json`, import.meta.url);
    },

    async fetchResources(lang) {
        if (this.cache[lang]) return this.cache[lang];
        const response = await fetch(this.getResourceUrl(lang));
        if (!response.ok) throw new Error(`Unable to load ${lang} resources`);
        this.cache[lang] = await response.json();
        return this.cache[lang];
    },

    async loadResources(lang = this.currentLang) {
        const normalizedLang = this.normalizeLang(lang);

        try {
            this.fallbackResources = await this.fetchResources('en');
            this.resources = normalizedLang === 'en'
                ? this.fallbackResources
                : await this.fetchResources(normalizedLang);
            this.currentLang = normalizedLang;
        } catch (e) {
            console.error('Failed to load language resources', e);
            this.currentLang = 'en';
            this.resources = this.fallbackResources || {};
        }
    },

    resolveKey(key) {
        return this.aliases[key] || key;
    },

    resolveValue(source, key) {
        const resolvedKey = this.resolveKey(key);
        if (Object.prototype.hasOwnProperty.call(source, resolvedKey)) {
            return source[resolvedKey];
        }

        return resolvedKey.split('.').reduce((obj, k) => (obj || {})[k], source);
    },

    format(value, params = {}) {
        if (typeof value !== 'string') return value;
        return Object.entries(params).reduce(
            (text, [name, replacement]) => text.replaceAll(`{${name}}`, replacement),
            value
        );
    },

    humanizeMissingKey(key) {
        return this.resolveKey(key).split('.').pop().replaceAll('_', ' ');
    },

    t(key, params = {}) {
        const value = this.resolveValue(this.resources, key)
            ?? this.resolveValue(this.fallbackResources, key);

        if (value === undefined || value === null) {
            console.warn(`[i18n] Missing translation: ${key}`);
            return this.humanizeMissingKey(key);
        }

        return this.format(value, params);
    },

    async setLanguage(lang, options = {}) {
        const nextLang = this.normalizeLang(lang);
        if (this.currentLang === nextLang && this.resources) return;
        this.currentLang = nextLang;
        localStorage.setItem('lang', nextLang);
        this.applySettings();
        await this.loadResources(nextLang);
        this.updateUI();

        if (options.dispatch !== false) {
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: nextLang, source: options.source || 'i18n' } }));
        }
    },

    applySettings() {
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.classList.toggle('font-arabic', this.currentLang === 'ar');
    },

    updateUI() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            if (!translation) return;

            if (el.dataset.i18nHtml === 'true' || translation.includes('<')) {
                el.innerHTML = translation;
            } else {
                el.textContent = translation;
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.setAttribute('placeholder', this.t(el.getAttribute('data-i18n-placeholder')));
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
            el.setAttribute('aria-label', this.t(el.getAttribute('data-i18n-aria-label')));
        });

        // Update document title using lookup table
        const page = document.body.dataset.page;
        const title = this.t(`page_title.${page}`);
        if (title) {
            document.title = title;
        }
    }
};

export default i18n;
