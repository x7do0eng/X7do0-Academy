/**
 * Theme & Language Manager
 * Handles global state for Dark Mode and i18n
 */

const translations = {
    // --- Home ---
    "welcome_label": { en: "Welcome", ar: "مرحباً" },
    "hero_title": {
        en: "Master Complexity with <br/> <span class='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400'>Calm Precision</span>",
        ar: "أتقن التعقيد بـ <br/> <span class='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400'>دقة وهدوء</span>"
    },
    "hero_desc": {
        en: "An educational philosophy built on minimalism, depth, and clarity. Focusing on the fundamental concepts that drive modern software engineering.",
        ar: "فلسفة تعليمية مبنية على البساطة، العمق، والوضوح. نركز على المفاهيم الأساسية التي تقود هندسة البرمجيات الحديثة."
    },
    "cta_start": { en: "Start Learning", ar: "ابدأ التعلم" },
    "cta_contact": { en: "Get in Touch", ar: "تواصل معي" },
    "nav_courses": { en: "Courses", ar: "الدورات" },
    "nav_connect": { en: "Connect", ar: "تواصل" },
    "footer_copy": { en: "© 2026 X7do0 Academy. All rights reserved.", ar: "© 2026 أكاديمية X7do0. جميع الحقوق محفوظة." },

    // --- Features ---
    "feat_struct_title": { en: "Structured Learning", ar: "تعلم منهجي" },
    "feat_struct_desc": { en: "Curated paths designed to build knowledge layer by layer.", ar: "مسارات مصممة بعناية لبناء المعرفة طبقة تلو الأخرى." },
    "feat_code_title": { en: "Practical Code", ar: "كود تطبيقي" },
    "feat_code_desc": { en: "Real-world examples and interactive challenges.", ar: "أمثلة واقعية وتحديات تفاعلية." },
    "feat_deep_title": { en: "Deep Fundamentals", ar: "أساسيات عميقة" },
    "feat_deep_desc": { en: "Understanding the 'Why' behind the syntax.", ar: "فهم الـ 'لماذا' خلف الكود." },

    // --- Homepage Instructor ---
    "instructor_title": { en: "The Instructor", ar: "عن المدرب" },
    "instructor_bio": { en: "Engineer & Educator. Building X7do0 Academy to bridge the gap between academic theory and practical engineering.", ar: "مهندس ومدرّب. أبني أكاديمية X7do0 لسد الفجوة بين النظرية الأكاديمية والهندسة العملية." },
    "instructor_link": { en: "More about me →", ar: "المزيد عني ←" },

    // --- Courses ---
    "courses_title": { en: "Available Courses", ar: "الدورات المتاحة" },
    "courses_desc": { en: "Select a path to begin your journey. Our courses are designed for depth and durability.", ar: "اختر مسارك لتبدأ الرحلة. دوراتنا مصممة للعمق والاستدامة." },
    "back_home": { en: "Back to Home", ar: "العودة للرئيسية" },
    "course_catalog": { en: "Course Catalog", ar: "فهرس الدورات" },
    "active_badge": { en: "Active", ar: "نشط" },
    "planned_badge": { en: "Planned", ar: "مخطط" },
    "coming_soon": { en: "Coming Soon", ar: "قريباً" },
    "lessons_count": { en: "Lessons", ar: "درس" },
    "course_python_title": { en: "Python Core", ar: "أساسيات بايثون" },
    "course_python_desc": { en: "Master the language of modern computing. From variables to complex data structures, built for clarity.", ar: "أتقن لغة الحوسبة الحديثة. من المتغيرات إلى هياكل البيانات المعقدة، مصممة بوضوح." },
    "course_cpp_title": { en: "C++ Systems", ar: "أنظمة C++" },
    "course_cpp_desc": { en: "Dive into memory management and high-performance computing.", ar: "تعمق في إدارة الذاكرة والحوسبة عالية الأداء." },

    // --- Connect ---
    "connect_title": { en: "Get in Touch", ar: "تواصل معي" },
    "connect_desc": { en: "Questions, collaborations, or just want to say hi? Connect with me on these platforms.", ar: "أسئلة، تعاون، أو مجرد إلقاء تحية؟ تواصل معي عبر هذه المنصات." },

    // New Accounts Keys
    "desc_tg_personal": { en: "Personal Account", ar: "حسابي الشخصي" },
    "desc_tg_channel": { en: "Official Channel", ar: "القناة الرسمية" },
    "desc_youtube": { en: "Video Tutorials & Courses", ar: "شروحات فيديو ودورات" },
    "desc_instagram": { en: "Personal Account", ar: "حساب شخصي" },
};

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
})();

class ThemeManager {
    constructor() {
        this.html = document.documentElement;
        this.init();
    }

    init() {
        // Load Preferences
        const savedLang = localStorage.getItem('lang') || 'en';

        // Initial Content Update (Wait for DOM if needed, but this class runs on intent actions mostly)
        // Since we are running new ThemeManager() on DOMContentLoaded, we can update content now
        this.updateContent(savedLang);
        this.updateIcons();

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

        // Highlight Active Nav
        this.highlightActiveNav();
    }

    highlightActiveNav() {
        const currentPage = document.body.dataset.page;
        if (currentPage) {
            // Map subpages to main nav items if needed
            const navKey = currentPage === 'python' ? 'courses' : currentPage;
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

        this.updateContent(lang);
        this.updateIcons();
    }

    updateContent(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (translations[key] && translations[key][lang]) {
                if (el.innerHTML.includes('<') || translations[key][lang].includes('<')) {
                    el.innerHTML = translations[key][lang];
                } else {
                    el.textContent = translations[key][lang];
                }
            }
        });
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
