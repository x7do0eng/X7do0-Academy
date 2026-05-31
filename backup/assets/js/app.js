import { lessons } from '../../data/python-lessons.js';

document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById('lesson-grid');
    const overlay = document.getElementById('code-overlay');
    const overlayContent = document.getElementById('overlay-content');
    let overlayTimeout;

    // Guard: Only run interactive logic on Python Course Page
    if (document.body.dataset.page !== 'python') return;

    // Render Lessons
    if (mainContainer && lessons) {
        lessons.forEach((lesson, index) => {
            const card = document.createElement('section');
            card.className = `academic-card p-6 group ${lesson.span ? `md:col-span-${lesson.span}` : ''}`;

            // Header
            const header = `
                <div class="flex items-center justify-between mb-6 pb-3 border-b border-blue-100">
                    <h3 class="text-lg font-bold text-blue-900 group-hover:text-${lesson.color || 'blue'}-700 transition-colors">
                        ${lesson.id}. ${lesson.title}</h3>
                    <i class="${lesson.icon} text-blue-200 group-hover:text-${lesson.color || 'blue'}-600 transition-colors text-xl"></i>
                </div>
            `;

            // Content Body
            let contentBody = '';

            // Handle Grid Layouts (e.g., Lesson 09 Loops)
            if (lesson.layout === 'grid-column' && lesson.columns) {
                contentBody += `<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">`;
                lesson.columns.forEach(col => {
                    contentBody += `<div class="space-y-4">`;
                    (col || []).forEach(item => contentBody += renderItem(item));
                    contentBody += `</div>`;
                });
                contentBody += `</div>`;
            } else if (lesson.layout === 'grid') { // Lesson 03 Operators
                contentBody += `<div class="grid grid-cols-2 gap-3">`;
                (lesson.items || []).forEach(item => contentBody += renderItem(item));
                contentBody += `</div>`;
            } else {
                contentBody += `<ul class="space-y-3">`;
                (lesson.items || []).forEach(item => {
                    // Groups and containers don't need li wrapper if they are block elements
                    if (item.type === 'group' || item.type === 'container') {
                        contentBody += renderItem(item);
                    } else {
                        const isCompound = item.type === 'compound';
                        // Removed 'flex items-center justify-between' as children are now full blocks
                        contentBody += `<li class="${isCompound ? 'pt-4 border-t border-slate-100' : ''}">
                            ${renderItem(item)}
                         </li>`;
                    }
                });
                contentBody += `</ul>`;
            }

            // Extra Info (Lesson 02)
            if (lesson.extraInfo) {
                contentBody += `
                    <div class="arabic-text text-xs text-${lesson.extraInfo.color}-800 mt-6 bg-${lesson.extraInfo.color}-50 p-3 rounded-lg border border-${lesson.extraInfo.color}-100 flex gap-2 items-start shadow-sm">
                        <i class="${lesson.extraInfo.icon} mt-1 text-${lesson.extraInfo.color}-500"></i>
                        <span>${lesson.extraInfo.text}</span>
                    </div>
                `;
            }

            // Files & Resources
            const filesSection = `
                <div class="mt-4 pt-4 border-t border-slate-100 border-dashed">
                    <button class="w-full flex items-center justify-between group/toggle focus:outline-none toggle-btn" aria-expanded="false">
                        <span class="text-[10px] font-bold tracking-widest text-slate-500 group-hover/toggle:text-blue-700 transition-colors uppercase">
                            <i class="fas fa-folder-open mr-2"></i> Files & Resources
                        </span>
                        <i class="fas fa-chevron-down text-[10px] text-slate-400 group-hover/toggle:text-blue-600 transition-transform duration-300 toggle-icon"></i>
                    </button>
                    <div class="collapsible-content">
                        <div class="space-y-2 pt-3">
                            ${lesson.files ? `
                                ${lesson.files.subject ? `
                                <a href="${lesson.files.subject}" download class="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-white group/file transition-all duration-300 border border-slate-200 hover:border-blue-300 hover:shadow-sm">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 group-hover/file:text-blue-700">
                                            <i class="far fa-file-code"></i>
                                        </div>
                                        <div class="text-left">
                                            <div class="text-xs font-mono text-slate-700 group-hover/file:text-blue-900 transition-colors">Lesson Code</div>
                                            <div class="text-[10px] text-slate-500">subject.py</div>
                                        </div>
                                    </div>
                                    <i class="fas fa-download text-slate-400 group-hover/file:text-blue-500 transition-colors"></i>
                                </a>` : ''}
                                
                                ${lesson.files.challenge ? `
                                <a href="${lesson.files.challenge}" download class="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-white group/file transition-all duration-300 border border-slate-200 hover:border-purple-300 hover:shadow-sm">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded bg-purple-100 flex items-center justify-center text-purple-600 group-hover/file:text-purple-700">
                                            <i class="fas fa-tasks"></i>
                                        </div>
                                        <div class="text-left">
                                            <div class="text-xs font-mono text-slate-700 group-hover/file:text-purple-900 transition-colors">Challenge</div>
                                            <div class="text-[10px] text-slate-500">challenge.py</div>
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
    }

    // Helper: Render individual items
    function renderItem(item) {
        if (!item || !item.type) return '';

        const items = item.items || [];
        const content = item.content || [];

        // Unified Block Style - Strict enforcement
        // Added 'keyword' class to ensure hover listeners attach correctly
        const blockStyle = "keyword p-3 rounded-lg bg-slate-50 border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer block w-full text-left";

        if (item.type === 'keyword') {
            const spanClass = item.span ? `col-span-${item.span}` : '';
            const alignClass = item.align === 'center' ? 'text-center' : 'text-left';

            // Standardize generic style
            let classes = `${blockStyle} text-sm font-mono font-bold text-blue-900 ${alignClass} ${spanClass}`;

            // Context-specific overrides that maintain block structure
            if (item.label === 'Multiplication (*)' || (item.code && item.code.includes("5 * 2"))) {
                classes = `${blockStyle} text-xs font-mono font-bold text-slate-700 text-center hover:text-green-800 hover:border-green-300 ${spanClass}`;
            } else if (item.label && item.label.includes("Compound Ops")) {
                classes = `${blockStyle} text-xs font-mono font-bold text-slate-600 text-center hover:border-green-300 ${spanClass}`;
            } else if (item.label === "type(x)") {
                classes = `${blockStyle} text-sm font-mono font-bold text-slate-700 hover:border-pink-300 ${spanClass}`;
            }

            return `<span class="${classes}" data-code='${item.code || ""}'>${item.label}</span>`;
        }

        if (item.type === 'compound') {
            const noteText = item.note && typeof item.note === 'object' ? item.note.text : (item.note || '');
            return `
                <div class="space-y-2 w-full">
                    <span class="${blockStyle} text-sm font-mono font-bold text-blue-900" data-code='${item.code || ""}'>${item.label}</span>
                    <div class="arabic-text text-xs text-slate-500 italic px-2 border-r-2 border-blue-300 mr-2 bg-blue-50/50 p-2 rounded">${noteText}</div>
                </div>
            `;
        }

        if (item.type === 'alert') {
            return `
                <div class="arabic-text text-xs text-${item.color}-800 ${item.style === 'simple' ? 'font-semibold bg-red-50 p-2 rounded border border-red-200 mt-2' : 'pl-2 border-l-2 border-amber-400 flex items-center gap-2 bg-amber-50 p-2 rounded'}">
                    ${item.icon ? `<i class="${item.icon} text-${item.color}-600"></i>` : ''}
                    ${item.text}
                </div>
            `;
        }

        if (item.type === 'group') {
            // Groups wrap children which are already blocks
            return `<div class="flex flex-wrap gap-2 w-full">
                ${items.map(subItem => renderItem(subItem)).join('')}
             </div>`;
        }

        if (item.type === 'pill' || item.type === 'pill-box') {
            const color = item.color || 'blue';
            // Force block style even for pills in standard list context
            return `<span class="${blockStyle} flex-1 text-center text-${color}-700 border-${color}-200 hover:bg-${color}-50 text-xs font-mono font-bold" data-code='${item.code || ""}'>${item.label}</span>`;
        }

        if (item.type === 'code-box') {
            const noteText = item.note && typeof item.note === 'object' ? item.note.text : (item.note || '');
            return `<div class="${blockStyle} group/code hover:border-${item.color === 'green' ? 'green-300' : 'blue-300'}" data-code='${item.code || ""}'>
                <span class="text-${item.color === 'green' ? 'green-700' : 'blue-700'} font-bold font-mono text-sm block group-hover/code:text-${item.color === 'green' ? 'green-800' : 'blue-800'}">${item.label}</span>
                ${noteText ? `<div class="arabic-text text-[10px] text-slate-500 mt-2">${noteText}</div>` : ''}
            </div>`;
        }

        if (item.type === 'container') {
            return `<div class="p-4 bg-slate-50 rounded-lg border border-slate-200 shadow-sm w-full">
                ${items.map(sub => {
                if (sub.type === 'divider') return `<div class="my-2 border-t border-slate-200"></div>`;
                return `<span class="${blockStyle} text-blue-900 text-sm font-mono font-bold hover:text-blue-700 mb-2" data-code='${sub.code || ""}'>${sub.label}</span>`;
            }).join('')}
             </div>`;
        }

        if (item.type === 'logic-row') {
            return `<div class="${blockStyle} flex justify-between items-center hover:border-${item.color === 'blue' ? 'blue' : (item.color === 'purple' ? 'purple' : 'red')}-300" data-code='${item.code || ""}'>
                <span class="text-${item.color}-700 font-bold font-mono text-sm">${item.label}</span>
                <span class="arabic-text text-[10px] text-slate-600 px-2 py-1 bg-white rounded border border-slate-100 shadow-sm">${item.arText}</span>
            </div>`;
        }

        if (item.type === 'module-box') {
            return `<div class="${blockStyle.replace('keyword', '')} flex flex-col hover:border-${item.color}-300">
                <span class="text-${item.color === 'blue' ? 'blue' : 'purple'}-800 font-mono font-bold text-sm border-b border-${item.color}-100 pb-2 block mb-3">${item.title}</span>
                <div class="text-green-800 font-mono text-xs space-y-2 leading-relaxed font-semibold">
                    ${content.map(c => `
                        <div class="${c.comment ? 'flex justify-between' : 'truncate'}">
                            ${c.code} ${c.comment ? `<span class="text-slate-400 font-normal">${c.comment}</span>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>`;
        }

        if (item.type === 'method') {
            return `<span class="${blockStyle} text-xs font-mono font-bold text-slate-700 hover:text-indigo-900 hover:border-indigo-300" data-code='${item.code || ""}'>${item.label}</span>`;
        }

        if (item.type === 'text') {
            return `<div class="arabic-text text-xs text-slate-600 mb-4 italic flex items-center gap-2">
                    <div class="h-px bg-slate-300 w-4"></div>
                    ${item.text}
                </div>`;
        }

        return '';
    }


    // --- Interaction Logic (Restored from Original) ---

    // Hover Effects for Keywords
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

    setupInteractions();

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
