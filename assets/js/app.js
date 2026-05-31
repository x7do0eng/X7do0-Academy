import { lessons } from '../../data/python-lessons.js';

document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById('lesson-grid');
    const overlay = document.getElementById('code-overlay');
    const overlayContent = document.getElementById('overlay-content');
    let overlayTimeout;

    // Guard: Only run interactive logic on Python Course Page
    if (document.body.dataset.page !== 'python') return;

    // Render lessons grid based on current language
    function renderLessonsGrid() {
        if (!mainContainer || !lessons) return;
        
        mainContainer.innerHTML = '';
        const isAr = document.documentElement.lang === 'ar';

        lessons.forEach((lesson, index) => {
            const card = document.createElement('section');
            // Statically map loop card or other cards to standard layout to ensure perfect 3-column symmetry
            // Removed custom span layouts to preserve clean masonry grid flow
            card.className = `academic-card p-6 group ${lesson.span && lesson.span > 1 && !isAr ? `md:col-span-${lesson.span}` : ''}`;

            // Localized title
            const lessonTitle = isAr && lesson.titleAr ? lesson.titleAr : lesson.title;

            // Header - Using semantic dark-mode border variables
            const header = `
                <div class="flex items-center justify-between mb-6 pb-3 border-b border-slate-200/60 dark:border-slate-700/80">
                    <h3 class="text-lg font-bold text-academic-primary group-hover:text-${lesson.color || 'blue'}-500 transition-colors">
                        ${lesson.id}. ${lessonTitle}</h3>
                    <i class="${lesson.icon} text-slate-400 dark:text-slate-600 group-hover:text-${lesson.color || 'blue'}-500 transition-colors text-xl"></i>
                </div>
            `;

            // Content Body
            let contentBody = '';

            // Handle Grid Layouts (e.g. Lesson 03 Operators)
            if (lesson.layout === 'grid') {
                contentBody += `<div class="grid grid-cols-2 gap-3">`;
                (lesson.items || []).forEach(item => contentBody += renderItem(item, isAr));
                contentBody += `</div>`;
            } else if (lesson.layout === 'grid-column' && lesson.columns) {
                // Backward compatibility for loop columns if defined
                contentBody += `<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">`;
                lesson.columns.forEach(col => {
                    contentBody += `<div class="space-y-4">`;
                    (col || []).forEach(item => contentBody += renderItem(item, isAr));
                    contentBody += `</div>`;
                });
                contentBody += `</div>`;
            } else {
                contentBody += `<ul class="space-y-3">`;
                (lesson.items || []).forEach(item => {
                    if (item.type === 'group' || item.type === 'container') {
                        contentBody += renderItem(item, isAr);
                    } else {
                        const isCompound = item.type === 'compound';
                        contentBody += `<li class="${isCompound ? 'pt-4 border-t border-slate-200/50 dark:border-slate-800/80' : ''}">
                            ${renderItem(item, isAr)}
                         </li>`;
                    }
                });
                contentBody += `</ul>`;
            }

            // Extra Info (Lesson 02)
            if (lesson.extraInfo) {
                contentBody += `
                    <div class="arabic-text text-xs text-${lesson.extraInfo.color}-900 dark:text-blue-300 mt-6 bg-${lesson.extraInfo.color}-50/50 dark:bg-blue-950/20 p-3 rounded-lg border border-${lesson.extraInfo.color}-200/60 dark:border-blue-900/30 flex gap-2 items-start shadow-sm">
                        <i class="${lesson.extraInfo.icon} mt-1 text-${lesson.extraInfo.color}-500 dark:text-blue-400"></i>
                        <span>${lesson.extraInfo.text}</span>
                    </div>
                `;
            }

            // Files & Resources - Localized labels & icons
            const filesLabel = isAr ? 'الملفات والمصادر' : 'Files & Resources';
            const codeFileLabel = isAr ? 'كود الشرح العلمي' : 'Lesson Code';
            const challengeLabel = isAr ? 'التحدي البرمجي التطبيقي' : 'Challenge';

            const filesSection = `
                <div class="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/60 border-dashed">
                    <button class="w-full flex items-center justify-between group/toggle focus:outline-none toggle-btn" aria-expanded="false">
                        <span class="text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 group-hover/toggle:text-${lesson.color || 'blue'}-600 dark:group-hover/toggle:text-${lesson.color || 'blue'}-400 transition-colors uppercase">
                            <i class="fas fa-folder-open me-2"></i> ${filesLabel}
                        </span>
                        <i class="fas fa-chevron-down text-[10px] text-slate-400 group-hover/toggle:text-${lesson.color || 'blue'}-500 transition-transform duration-300 toggle-icon"></i>
                    </button>
                    <div class="collapsible-content">
                        <div class="space-y-2 pt-3">
                            ${lesson.files ? `
                                ${lesson.files.subject ? `
                                <a href="${lesson.files.subject}" download class="flex items-center justify-between p-2 rounded-lg bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/80 group/file transition-all duration-300 border border-slate-200/60 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                            <i class="far fa-file-code"></i>
                                        </div>
                                        <div class="text-start">
                                            <div class="text-xs font-mono text-slate-700 dark:text-slate-300 group-hover/file:text-blue-900 dark:group-hover/file:text-blue-400 transition-colors">${codeFileLabel}</div>
                                            <div class="text-[10px] text-slate-500 dark:text-slate-400">subject.py</div>
                                        </div>
                                    </div>
                                    <i class="fas fa-download text-slate-400 group-hover/file:text-blue-500 transition-colors"></i>
                                </a>` : ''}
                                
                                ${lesson.files.challenge ? `
                                <a href="${lesson.files.challenge}" download class="flex items-center justify-between p-2 rounded-lg bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/80 group/file transition-all duration-300 border border-slate-200/60 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-sm">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                            <i class="fas fa-tasks"></i>
                                        </div>
                                        <div class="text-start">
                                            <div class="text-xs font-mono text-slate-700 dark:text-slate-300 group-hover/file:text-purple-900 dark:group-hover/file:text-purple-400 transition-colors">${challengeLabel}</div>
                                            <div class="text-[10px] text-slate-500 dark:text-slate-400">challenge.py</div>
                                        </div>
                                    </div>
                                    <i class="fas fa-download text-slate-400 group-hover/file:text-purple-500 transition-colors"></i>
                                </a>` : ''}
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;

            card.innerHTML = header + contentBody + filesSection;
            mainContainer.appendChild(card);
        });

        // Re-setup all interaction listeners
        setupInteractions();
    }

    // Helper: Render individual items
    function renderItem(item, isAr) {
        if (!item || !item.type) return '';

        const items = item.items || [];
        const content = item.content || [];

        // Localized label
        const itemLabel = isAr && item.labelAr ? item.labelAr : item.label;

        // Unified Block Style - Fixed dark theme styling override
        const blockStyle = "keyword p-3 rounded-lg bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-sm hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer block w-full text-start";

        if (item.type === 'keyword') {
            const spanClass = item.span ? `col-span-${item.span}` : '';
            const alignClass = item.align === 'center' ? 'text-center' : 'text-start';

            let classes = `${blockStyle} text-sm font-mono font-bold ${alignClass} ${spanClass}`;

            // Context-specific overrides
            if (item.label === 'Multiplication (*)' || (item.code && item.code.includes("5 * 2"))) {
                classes = `${blockStyle} text-xs font-mono font-bold text-center hover:text-green-800 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-500 ${spanClass}`;
            } else if (item.label && item.label.includes("Compound Ops")) {
                classes = `${blockStyle} text-xs font-mono font-bold text-center hover:border-green-300 dark:hover:border-green-500 ${spanClass}`;
            } else if (item.label === "type(x)") {
                classes = `${blockStyle} text-sm font-mono font-bold hover:border-pink-300 dark:hover:border-pink-500 ${spanClass}`;
            }

            return `<span class="${classes}" data-code='${item.code || ""}'>${itemLabel}</span>`;
        }

        if (item.type === 'compound') {
            const noteText = item.note && typeof item.note === 'object' ? item.note.text : (item.note || '');
            return `
                <div class="space-y-2 w-full">
                    <span class="${blockStyle} text-sm font-mono font-bold" data-code='${item.code || ""}'>${itemLabel}</span>
                    <div class="arabic-text text-xs text-slate-500 dark:text-slate-400 italic px-2 border-s-2 border-blue-300 me-2 bg-blue-50/50 dark:bg-blue-950/10 p-2 rounded">${noteText}</div>
                </div>
            `;
        }

        if (item.type === 'alert') {
            return `
                <div class="arabic-text text-xs text-${item.color}-900 dark:text-${item.color === 'red' ? 'red-400' : 'amber-400'} ${item.style === 'simple' ? 'font-semibold bg-red-50/60 dark:bg-red-950/20 p-2 rounded border border-red-200/60 dark:border-red-900/30 mt-2' : 'pe-2 border-s-2 border-amber-400 dark:border-amber-600 flex items-center gap-2 bg-amber-50/60 dark:bg-amber-950/20 p-2 rounded'}">
                    ${item.icon ? `<i class="${item.icon} text-${item.color}-600 dark:text-${item.color === 'red' ? 'red-400' : 'amber-400'}"></i>` : ''}
                    ${item.text}
                </div>
            `;
        }

        if (item.type === 'group') {
            return `<div class="flex flex-wrap gap-2 w-full">
                ${items.map(subItem => renderItem(subItem, isAr)).join('')}
             </div>`;
        }

        if (item.type === 'pill' || item.type === 'pill-box') {
            const color = item.color || 'blue';
            return `<span class="${blockStyle} flex-1 text-center text-${color}-700 dark:text-${color}-400 border-${color}-200 dark:border-${color}-900/60 hover:bg-${color}-50 dark:hover:bg-${color}-950/30 text-xs font-mono font-bold" data-code='${item.code || ""}'>${itemLabel}</span>`;
        }

        if (item.type === 'code-box') {
            const noteText = item.note && typeof item.note === 'object' ? item.note.text : (item.note || '');
            return `<div class="${blockStyle} group/code hover:border-${item.color === 'green' ? 'green-300' : 'blue-300'} dark:hover:border-${item.color === 'green' ? 'green-500' : 'blue-500'}" data-code='${item.code || ""}'>
                <span class="text-${item.color === 'green' ? 'green-700' : 'blue-700'} dark:text-${item.color === 'green' ? 'green-400' : 'blue-400'} font-bold font-mono text-sm block group-hover/code:text-${item.color === 'green' ? 'green-800' : 'blue-800'} dark:group-hover/code:text-${item.color === 'green' ? 'green-300' : 'blue-300'}">${itemLabel}</span>
                ${noteText ? `<div class="arabic-text text-[10px] text-slate-500 dark:text-slate-400 mt-2">${noteText}</div>` : ''}
            </div>`;
        }

        if (item.type === 'container') {
            return `<div class="p-4 bg-slate-50/70 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700 shadow-sm w-full">
                ${items.map(sub => {
                if (sub.type === 'divider') return `<div class="my-2 border-t border-slate-200/50 dark:border-slate-700"></div>`;
                const subLabel = isAr && sub.labelAr ? sub.labelAr : sub.label;
                return `<span class="${blockStyle} text-sm font-mono font-bold mb-2" data-code='${sub.code || ""}'>${subLabel}</span>`;
            }).join('')}
             </div>`;
        }

        if (item.type === 'logic-row') {
            return `<div class="${blockStyle} flex justify-between items-center hover:border-${item.color === 'blue' ? 'blue' : (item.color === 'purple' ? 'purple' : 'red')}-300 dark:hover:border-${item.color === 'blue' ? 'blue' : (item.color === 'purple' ? 'purple' : 'red')}-500" data-code='${item.code || ""}'>
                <span class="text-${item.color}-700 dark:text-${item.color}-400 font-bold font-mono text-sm">${itemLabel}</span>
                <span class="arabic-text text-[10px] text-slate-600 dark:text-slate-300 px-2 py-1 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200/60 dark:border-slate-700 shadow-sm">${item.arText}</span>
            </div>`;
        }

        if (item.type === 'module-box') {
            const moduleTitle = isAr && item.labelAr ? item.labelAr : item.title;
            return `<div class="${blockStyle.replace('keyword', '')} flex flex-col hover:border-${item.color}-300 dark:hover:border-${item.color}-500">
                <span class="text-${item.color === 'blue' ? 'blue' : 'purple'}-800 dark:text-${item.color === 'blue' ? 'blue' : 'purple'}-400 font-mono font-bold text-sm border-b border-${item.color}-100 dark:border-${item.color}-900/50 pb-2 block mb-3">${moduleTitle}</span>
                <div class="text-green-800 dark:text-green-400 font-mono text-xs space-y-2 leading-relaxed font-semibold">
                    ${content.map(c => `
                        <div class="${c.comment ? 'flex justify-between' : 'truncate'}">
                            ${c.code} ${c.comment ? `<span class="text-slate-400 dark:text-slate-500 font-normal">${c.comment}</span>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>`;
        }

        if (item.type === 'method') {
            return `<span class="${blockStyle} text-xs font-mono font-bold hover:text-indigo-900 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500" data-code='${item.code || ""}'>${itemLabel}</span>`;
        }

        if (item.type === 'text') {
            return `<div class="arabic-text text-xs text-slate-600 dark:text-slate-400 mb-4 italic flex items-center gap-2">
                    <div class="h-px bg-slate-300 dark:bg-slate-700 w-4"></div>
                    ${item.text}
                </div>`;
        }

        return '';
    }


    // --- Interaction Logic (Restored from Original & Fixed for Dark Mode) ---
    const setupInteractions = () => {
        document.querySelectorAll('.keyword').forEach(item => {
            // Desktop hover interaction
            item.addEventListener('mouseenter', () => {
                const code = item.getAttribute('data-code');
                if (code) {
                    overlayContent.textContent = code.replace(/\\n/g, '\n');
                    overlay.classList.remove('opacity-0', 'translate-x-10', 'pointer-events-none');
                    overlay.classList.add('opacity-100', 'translate-x-0');
                    clearTimeout(overlayTimeout);
                }
            });

            item.addEventListener('mouseleave', () => {
                overlayTimeout = setTimeout(() => {
                    overlay.classList.add('opacity-0', 'translate-x-10', 'pointer-events-none');
                    overlay.classList.remove('opacity-100', 'translate-x-0');
                }, 300);
            });

            // Mobile click interaction
            item.addEventListener('click', () => {
                const code = item.getAttribute('data-code');
                if (code) {
                    overlayContent.textContent = code.replace(/\\n/g, '\n');
                    overlay.classList.remove('opacity-0', 'translate-x-10', 'pointer-events-none');
                    overlay.classList.add('opacity-100', 'translate-x-0');
                }
            });
        });

        // Collapsible Section Logic
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const content = btn.nextElementSibling;
                const isExpanded = btn.getAttribute('aria-expanded') === 'true';

                btn.setAttribute('aria-expanded', !isExpanded);
                content.classList.toggle('expanded');
            });
        });
    };

    // Initial render
    renderLessonsGrid();

    // Listen to global language changes to immediately swap card/item text between English & Arabic
    window.addEventListener('languageChanged', (e) => {
        renderLessonsGrid();
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                entry.target.classList.add('opacity-100', 'translate-y-0');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.academic-card').forEach((card, index) => {
        card.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
        card.style.transitionDelay = `${index * 50}ms`; // Stagger effect
        observer.observe(card);
    });
});
