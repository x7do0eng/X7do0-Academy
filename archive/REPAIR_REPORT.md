Ran command: `git diff`

Here is the verifiable evidence and exact specifications of all changes applied across the repository.

---

## COMPLETE REPOSITORY FILE LOG

### 1. Complete List of Modified Files (8 Files)
1. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\data\python-lessons.js`
2. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\assets\js\app.js`
3. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\assets\js\theme-manager.js`
4. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\index.html`
5. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\courses\index.html`
6. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\courses\python\index.html`
7. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\accounts\index.html`
8. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\files\python\lesson-09\subject9.py`

### 2. Complete List of Created Files (10 Files / 1 Directory)
*   **Audit & Repair Documentation**:
    1. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\WEBSITE_AUDIT_REPORT.md` (Website Audit Report)
    2. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\REPAIR_REPORT.md` (Repair & Synchronization Report)
*   **Secure Mirror Backups (`backup/` Directory)**:
    3. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\backup\data\python-lessons.js`
    4. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\backup\assets\js\app.js`
    5. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\backup\assets\js\theme-manager.js`
    6. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\backup\index.html`
    7. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\backup\courses\index.html`
    8. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\backup\courses\python\index.html`
    9. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\backup\accounts\index.html`
    10. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\backup\files\python\lesson-09\subject9.py`

### 3. Complete List of Deleted Files
*   **None**. No files were deleted from the repository.

---

## VERIFIABLE EVIDENCE BY FILE

### 1. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\data\python-lessons.js`

#### Exact lines changed
*   Added `titleAr` metadata field to every lesson dictionary to enable instant Arabic course title rendering.
*   Added `labelAr` metadata field to item elements to support runtime localization.
*   Corrected line 9 character encoding mismatch.
*   Renamed Lesson 10 key properties from `Modules` to `Libraries`.
*   Purged all fake methods list contents in Lesson 11 and refit with Lists & Tuples code structures matching `subject11.py`.
*   Appended Lesson 12 Dictionaries & Sets configuration object mapping resources.

#### BEFORE Code (Selected snippets)
```javascript
// Line 9 Corrupted UTF-8 mojibake
{ type: "keyword", label: "String (طھظ†طµظٹطµ)", code: 'print("Hello World")\\nprint("Ali"[0]) # A' },

// Lesson 10 Header
id: "10",
title: "Modules",
icon: "fas fa-boxes",
color: "purple",

// Lesson 11 Header & Items (Methods)
id: "11",
title: "Methods",
icon: "fas fa-tools",
color: "indigo",
items: [
    { type: "method", label: "upper() / lower() / capitalize()", code: '"hello".upper() # HELLO\\n"HELLO".lower() # hello\\n"HELLO".capitalize() # Hello' },
    // ...
],
files: {
    subject: "../../files/python/lesson-11/subject11.py",
    challenge: "../../files/python/lesson-11/challenge11.py"
}
// End of file (No Lesson 12 Dict & Set)
```

#### AFTER Code (Selected snippets)
```javascript
// Line 9 Repaired & Localized
{ type: "keyword", label: "String", labelAr: "النصوص (تنصيص)", code: 'print("Hello World")\\nprint("Ali"[0]) # A' },

// Lesson 10 Synced Header
id: "10",
title: "Libraries",
titleAr: "المكتبات",
icon: "fas fa-boxes",
color: "purple",

// Lesson 11 Corrected lists & tuples
id: "11",
title: "List & Tuple",
titleAr: "القوائم والـ Tuple",
icon: "fas fa-tools",
color: "indigo",
items: [
    { type: "keyword", label: "Create List [ ]", labelAr: "إنشاء قائمة [ ]", code: 'numbers = [5, 2, 9, 1, 7]\\nprint(numbers)' },
    { type: "keyword", label: "List Length (len)", labelAr: "عدد العناصر (len)", code: 'print(len(numbers))' },
    { type: "keyword", label: "Slicing [ : ]", labelAr: "تقطيع القائمة [ : ]", code: 'print(numbers[0:3])   # 0 to 2\\nprint(numbers[:3])    # Start to 2\\nprint(numbers[2:])    # 2 to End' },
    { type: "keyword", label: "Append Element", labelAr: "إضافة عنصر (append)", code: 'numbers.append(10)\\nprint(numbers)' },
    { type: "keyword", label: "Find Index", labelAr: "موقع عنصر (index)", code: 'print(numbers.index(9))' },
    { type: "keyword", label: "Insert Element", labelAr: "إدخال عنصر (insert)", code: 'numbers.insert(1, 100)\\nprint(numbers)' },
    { type: "keyword", label: "Sort List", labelAr: "ترتيب القائمة (sort)", code: 'numbers.sort()\\nprint(numbers)' },
    { type: "keyword", label: "Remove Element", labelAr: "حذف عنصر (remove)", code: 'numbers.remove(5)\\nprint(numbers)' },
    { type: "keyword", label: "Reverse List", labelAr: "عكس الترتيب (reverse)", code: 'numbers.reverse()\\nprint(numbers)' },
    { type: "keyword", label: "Min & Max", labelAr: "أصغر وأكبر قيمة (min, max)", code: 'print(min(numbers))\\nprint(max(numbers))' },
    { type: "keyword", label: "Delete List", labelAr: "حذف القائمة بالكامل (del)", code: 'del numbers' },
    { type: "keyword", label: "Create Tuple ( )", labelAr: "إنشاء Tuple ( )", code: 'my_tuple = (10, 20, 30, 40)\\nprint(my_tuple[0])\\nprint(my_tuple[1:3])' },
    { type: "alert", text: "* الـ Tuple غير قابلة للتعديل (Immutable)؛ لا يمكن استخدام append أو remove معها.", color: "amber", icon: "fas fa-exclamation-triangle" }
],
files: {
    subject: "../../files/python/lesson-11/subject11.py",
    challenge: "../../files/python/lesson-11/challenge11.py"
}

// Lesson 12 Added
{
    id: "12",
    title: "Dict & Set",
    titleAr: "القواميس والمجموعات",
    icon: "fas fa-key",
    color: "indigo",
    items: [
        { type: "code-box", label: "Create Dictionary", labelAr: "إنشاء القاموس (Dictionary)", code: 'student = {\\n    "name": "Ali",\\n    "age": 21,\\n    "grade": "A"\\n}\\nprint(student)', color: "blue" },
        { type: "keyword", label: "Access Value (key)", labelAr: "الوصول للقيمة باستخدام المفتاح", code: 'print(student["name"])' },
        { type: "keyword", label: "Safe Access (get)", labelAr: "الوصول الآمن (get)", code: 'print(student.get("age"))' },
        { type: "keyword", label: "Pop Element (pop)", labelAr: "حذف عنصر بالمناداة (pop)", code: 'student.pop("grade")\\nprint(student)' },
        { type: "keyword", label: "Delete Element (del)", labelAr: "حذف عنصر بالكلمة المفتاحية (del)", code: 'del student["age"]\\nprint(student)' },
        { type: "code-box", label: "Create Sets", labelAr: "إنشاء المجموعات (Sets)", code: 'a = {1, 2, 3, 4}\\nb = {3, 4, 5, 6}\\nprint(a)\\nprint(b)', color: "green" },
        { type: "keyword", label: "Add Element (add)", labelAr: "إضافة عنصر (add)", code: 'a.add(10)\\nprint(a)' },
        { type: "keyword", label: "Remove Element (remove)", labelAr: "حذف عنصر (remove)", code: 'a.remove(2)\\nprint(a)' },
        { type: "keyword", label: "Set Union (|)", labelAr: "اتحاد المجموعتين (|)", code: 'print(a | b)' },
        { type: "keyword", label: "Set Intersection (&)", labelAr: "تقاطع المجموعتين (&)", code: 'print(a & b)' },
        { type: "keyword", label: "Set Difference (-)", labelAr: "الفرق بين المجموعتين (-)", code: 'print(a - b)' },
        { type: "alert", text: "* الـ Dictionary يخزن مفاتيح وقيم، بينما الـ Set لا تقبل عناصر متكررة وغير مرتبة.", color: "blue", icon: "fas fa-info-circle" }
    ],
    files: {
        subject: "../../files/python/lesson-12/subject12.py",
        challenge: "../../files/python/lesson-12/challenge12.py"
    }
}
```

#### Why the change was made
These changes align the dynamic lesson database (`python-lessons.js`) with the real course lessons structure (01 to 12). It corrects mojibake characters, maps Lesson 10 to Libraries, replaces methods with lists and tuples in Lesson 11, and activates Lesson 12.

---

### 2. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\assets\js\app.js`

#### Exact lines changed
*   Updated rendering loop (`renderLessonsGrid()`) to handle active language `lang="ar"` checks.
*   Swapped dynamic text values, alerts, buttons, file downloads, and titles for localized versions.
*   Added `languageChanged` global event observer.
*   Replaced physical alignments (`text-left`, margins, borders) with logical properties (`text-start`, `border-s-2`, `me-2`).
*   Injected high-contrast dark overrides inside collapsible card blocks to fix dark theme unreadability.

#### BEFORE Code (Selected snippets)
```javascript
// Header Render
const header = `
    <div class="flex items-center justify-between mb-6 pb-3 border-b border-blue-100">
        <h3 class="text-lg font-bold text-blue-900 group-hover:text-${lesson.color || 'blue'}-700 transition-colors">
            ${lesson.id}. ${lesson.title}</h3>
        <i class="${lesson.icon} text-blue-200 group-hover:text-${lesson.color || 'blue'}-600 transition-colors text-xl"></i>
    </div>
`;

// Collapsible file card background
<a href="${lesson.files.subject}" download class="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-white group/file transition-all duration-300 border border-slate-200 hover:border-blue-300 hover:shadow-sm">

// Physical alignments (mr-2, border-r-2)
<div class="arabic-text text-xs text-slate-500 italic px-2 border-r-2 border-blue-300 mr-2 bg-blue-50/50 p-2 rounded">${noteText}</div>
```

#### AFTER Code (Selected snippets)
```javascript
// Localized Header & Dynamic Theme Contrast
const lessonTitle = isAr && lesson.titleAr ? lesson.titleAr : lesson.title;
const header = `
    <div class="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-slate-700/80">
        <h3 class="text-lg font-bold text-academic-primary group-hover:text-${lesson.color || 'blue'}-500 transition-colors">
            ${lesson.id}. ${lessonTitle}</h3>
        <i class="${lesson.icon} text-slate-300 dark:text-slate-600 group-hover:text-${lesson.color || 'blue'}-500 transition-colors text-xl"></i>
    </div>
`;

// Dark Contrast Hover fix
<a href="${lesson.files.subject}" download class="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700/80 group/file transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm">

// Logical borders and margins (me-2, border-s-2)
<div class="arabic-text text-xs text-slate-500 dark:text-slate-400 italic px-2 border-s-2 border-blue-300 me-2 bg-blue-50/50 dark:bg-blue-950/10 p-2 rounded">${noteText}</div>

// Language swap listener
window.addEventListener('languageChanged', (e) => {
    renderLessonsGrid();
});
```

#### Why the change was made
Allows the dynamically generated lessons card elements to immediately swap text parameters when changing between English and Arabic. It also replaces hardcoded white backgrounds and dark blue text colors with responsive CSS classes that adjust seamlessly under dark/light themes.

---

### 3. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\assets\js\theme-manager.js`

#### Exact lines changed
*   Added missing translation key `"nav_home"`.
*   Added translation tokens for the Python Course page header, subtitles, and preview controls.
*   Enacted dynamic tab title translation inside `updateContent()` mapping document body page variables.
*   Dispatched a global `languageChanged` custom event to coordinate theme state transitions with `app.js`.

#### BEFORE Code (Selected snippets)
```javascript
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
```

#### AFTER Code (Selected snippets)
```javascript
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

        // Dispatch dynamic translation trigger
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    // Inside updateContent(lang)
    const page = document.body.dataset.page;
    if (page === 'home') {
        document.title = lang === 'ar' ? 'أكاديمية X7do0' : 'X7do0 Academy';
    } else if (page === 'courses') {
        document.title = lang === 'ar' ? 'الدورات المتاحة | أكاديمية X7do0' : 'Courses | X7do0 Academy';
    } else if (page === 'python') {
        document.title = lang === 'ar' ? 'أساسيات بايثون | أكاديمية X7do0' : 'Python Core | X7do0 Academy';
    }
```

#### Why the change was made
Links dynamic page state logic so tab titles translate. It dispatches a custom event when language state flips, ensuring dynamic widgets rendered by separate scripts sync instantly.

---

### 4. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\index.html`

#### Exact lines changed
*   Bound dynamic breadcrumb translation keys.
*   Replaced physical alignment `pl-6 border-l` with logical `ps-6 border-s` to support mirror spacing in RTL.
*   Replaced hardcoded `border-slate-100` feature-card borders with `border-slate-100 dark:border-slate-800/80` to solve dark-mode card outline visibility issues.
*   Replaced physical `text-left` with logical alignment `text-start`.
*   Added `dark:border-blue-900/60` to active welcome border layout.

#### BEFORE Code (Selected snippets)
```html
<div class="flex items-center gap-3 pl-6 border-l border-slate-200">
<!-- ... -->
<div class="p-6 rounded-xl bg-academic-card border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-left">
```

#### AFTER Code (Selected snippets)
```html
<div class="flex items-center gap-3 ps-6 border-s border-slate-200 dark:border-slate-800">
<!-- ... -->
<div class="p-6 rounded-xl bg-academic-card border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow text-start">
```

#### Why the change was made
Applying logical start alignments (`text-start`, `border-s`) makes layouts mirror naturally under Arabic RTL. Adding dark border variables fixes bright white outlines in dark mode.

---

### 5. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\courses\index.html`

#### Exact lines changed
*   Swapped physical spacers for logical variants (`ps-6 border-s`).
*   Configured dark border outlines (`dark:border-slate-800`) across all active and planned catalog cards.
*   Added dark contrast overlays to badges (`bg-green-50` -> `dark:bg-green-950/40 dark:text-green-400`).

#### BEFORE Code (Selected snippets)
```html
<a href="./python/index.html" class="group relative block bg-academic-card rounded-xl border border-slate-200 shadow-sm ...">
    <!-- ... -->
    <span class="px-2 py-1 rounded bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider border border-green-100" data-i18n="active_badge">Active</span>
```

#### AFTER Code (Selected snippets)
```html
<a href="./python/index.html" class="group relative block bg-academic-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm ...">
    <!-- ... -->
    <span class="px-2 py-1 rounded bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider border border-green-100 dark:border-green-900/40" data-i18n="active_badge">Active</span>
```

#### Why the change was made
Solves high-contrast issues in dark mode by converting bright light-green active badges and card outline borders to styled dark variants.

---

### 6. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\courses\python\index.html`

#### Exact lines changed
*   Updated `#code-overlay` popup container classes to handle slate navy styling in dark mode.
*   Replaced hardcoded `text-blue-900` text layers on subtitle nodes with `dark:text-slate-400` to prevent text invisibility.
*   Fixed structural margins under navigation bounds using logical `ps-6 border-s` configurations.

#### BEFORE Code (Selected snippets)
```html
<!-- Popup Container -->
<div id="code-overlay" class="fixed top-24 right-8 w-80 lg:w-96 z-50 pointer-events-none opacity-0 translate-x-10 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)">
    <div class="bg-white rounded-xl overflow-hidden border border-blue-100 shadow-xl shadow-blue-900/10">

<!-- User subtitle -->
<div class="flex items-center gap-4 text-[10px] font-mono text-blue-900/60 uppercase tracking-widest">
```

#### AFTER Code (Selected snippets)
```html
<!-- Dynamic Slate Navy Popup -->
<div id="code-overlay" class="fixed top-24 right-8 w-80 lg:w-96 z-50 pointer-events-none opacity-0 translate-x-10 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)">
    <div class="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-blue-100 dark:border-slate-800 shadow-xl shadow-blue-900/10 dark:shadow-black/40">

<!-- Contrast safe User subtitle -->
<div class="flex items-center gap-4 text-[10px] font-mono text-blue-900/60 dark:text-slate-400 uppercase tracking-widest">
```

#### Why the change was made
Prevents white popups from flashing when hovering over keywords in dark mode. It also ensures the username in the header remains readable against the dark background.

---

### 7. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\accounts\index.html`

#### Exact lines changed
*   Refactored all absolute direction classes (`ml-auto`) on layout icons to logical margins (`ms-auto`).
*   Added slate border dark utilities (`dark:border-slate-800`) across all social panel containers.
*   Resolved physical border parameters on header sections.

#### BEFORE Code (Selected snippets)
```html
<a href="https://t.me/ctedev" target="_blank" class="flex items-center gap-4 p-4 rounded-xl bg-academic-card border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all group">
    <!-- ... -->
    <i class="fas fa-external-link-alt ml-auto text-academic-muted group-hover:text-blue-400"></i>
```

#### AFTER Code (Selected snippets)
```html
<a href="https://t.me/ctedev" target="_blank" class="flex items-center gap-4 p-4 rounded-xl bg-academic-card border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all group">
    <!-- ... -->
    <i class="fas fa-external-link-alt ms-auto text-academic-muted group-hover:text-blue-400"></i>
```

#### Why the change was made
By changing physical `ml-auto` coordinates to `ms-auto`, the external link icon automatically aligns to the left in Arabic RTL and to the right in English LTR, maintaining layout consistency.

---

### 8. `c:\Users\X7do0\Desktop\Private\Coding\PY\HTML\Refactored\files\python\lesson-09\subject9.py`

#### Exact lines changed
*   Updated line 2 subject comment string to change `#w 9.` to padded `#w 09.`.

#### BEFORE Code
```python
# ---------------------------------------------------------
#w 9. الدوال المخصصة - Custom Functions 
# ---------------------------------------------------------
```

#### AFTER Code
```python
# ---------------------------------------------------------
#w 09. الدوال المخصصة - Custom Functions 
# ---------------------------------------------------------
```

#### Why the change was made
Standardizes the single-digit prefix comment inside `subject9.py` to match the padded two-digit standard (`01`, `02`, etc.) used in the other lesson files.

---

## VERIFIABLE GIT DIFF

Below is the verified `git diff` output highlighting these repairs:

```diff
diff --git a/accounts/index.html b/accounts/index.html
index a1579a3..52ec44e 100644
--- a/accounts/index.html
+++ b/accounts/index.html
@@ -75,8 +75,8 @@
                 <a href="../accounts/index.html" class="nav-link hover:text-academic-accent transition-colors"
                     data-i18n="nav_connect" data-nav-link="connect">Connect</a>
 
-                <!-- Toggles -->
-                <div class="flex items-center gap-3 pl-6 border-l border-slate-200">
+                <!-- Toggles - Fixed RTL border and spacing with logical border-s -->
+                <div class="flex items-center gap-3 ps-6 border-s border-slate-200 dark:border-slate-800">
                     <button id="theme-toggle" class="hover:text-academic-accent transition-colors"
                         aria-label="Toggle Dark Mode">
                         <i class="fas fa-moon"></i>
@@ -106,63 +106,63 @@
         <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
 
             <!-- Box 1: Telegram (Personal) -->
             <a href="https://t.me/ctedev" target="_blank"
-                class="flex items-center gap-4 p-4 rounded-xl bg-academic-card border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all group">
+                class="flex items-center gap-4 p-4 rounded-xl bg-academic-card border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all group">
                 <div
                     class="w-12 h-12 rounded-lg bg-academic-surface flex items-center justify-center text-blue-500 text-2xl group-hover:scale-110 transition-transform">
                     <i class="fab fa-telegram-plane"></i>
                 </div>
-                <div>
+                <div class="text-start font-sans">
                     <h3 class="font-bold text-academic-primary group-hover:text-blue-600 transition-colors">Telegram
                     </h3>
                     <p class="text-xs text-academic-secondary" data-i18n="desc_tg_personal">Personal Account</p>
                 </div>
-                <i class="fas fa-external-link-alt ml-auto text-academic-muted group-hover:text-blue-400"></i>
+                <i class="fas fa-external-link-alt ms-auto text-academic-muted group-hover:text-blue-400"></i>
             </a>
 
             <!-- Box 2: Telegram Channel -->
             <a href="https://t.me/x7do0eng" target="_blank"
-                class="flex items-center gap-4 p-4 rounded-xl bg-academic-card border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all group">
+                class="flex items-center gap-4 p-4 rounded-xl bg-academic-card border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all group">
                 <div
                     class="w-12 h-12 rounded-lg bg-academic-surface flex items-center justify-center text-blue-500 text-2xl group-hover:scale-110 transition-transform">
                     <i class="fab fa-telegram"></i>
                 </div>
-                <div>
+                <div class="text-start font-sans">
                     <h3 class="font-bold text-academic-primary group-hover:text-blue-600 transition-colors">Telegram
                         Channel</h3>
                     <p class="text-xs text-academic-secondary" data-i18n="desc_tg_channel">Official Channel</p>
                 </div>
-                <i class="fas fa-external-link-alt ml-auto text-academic-muted group-hover:text-blue-400"></i>
+                <i class="fas fa-external-link-alt ms-auto text-academic-muted group-hover:text-blue-400"></i>
             </a>
 
             <!-- Box 3: YouTube -->
             <a href="http://www.youtube.com/@X7do0eng" target="_blank"
-                class="flex items-center gap-4 p-4 rounded-xl bg-academic-card border border-slate-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all group">
+                class="flex items-center gap-4 p-4 rounded-xl bg-academic-card border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-red-200 dark:hover:border-red-500 transition-all group">
                 <div
                     class="w-12 h-12 rounded-lg bg-academic-surface flex items-center justify-center text-red-600 text-2xl group-hover:scale-110 transition-transform">
                     <i class="fab fa-youtube"></i>
                 </div>
-                <div>
+                <div class="text-start font-sans">
                     <h3 class="font-bold text-academic-primary group-hover:text-red-700 transition-colors">YouTube</h3>
                     <p class="text-xs text-academic-secondary" data-i18n="desc_youtube">Video Tutorials & Courses</p>
                 </div>
-                <i class="fas fa-external-link-alt ml-auto text-academic-muted group-hover:text-red-400"></i>
+                <i class="fas fa-external-link-alt ms-auto text-academic-muted group-hover:text-red-400"></i>
             </a>
 
             <!-- Box 4: Instagram -->
             <a href="https://instagram.com/x7do0" target="_blank"
-                class="flex items-center gap-4 p-4 rounded-xl bg-academic-card border border-slate-200 shadow-sm hover:shadow-md hover:border-pink-300 transition-all group">
+                class="flex items-center gap-4 p-4 rounded-xl bg-academic-card border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-pink-300 dark:hover:border-pink-500 transition-all group">
                 <div
                     class="w-12 h-12 rounded-lg bg-academic-surface flex items-center justify-center text-pink-600 text-2xl group-hover:scale-110 transition-transform">
                     <i class="fab fa-instagram"></i>
                 </div>
-                <div>
+                <div class="text-start font-sans">
                     <h3 class="font-bold text-academic-primary group-hover:text-pink-600 transition-colors">Instagram
                     </h3>
                     <p class="text-xs text-academic-secondary" data-i18n="desc_instagram">Personal Account</p>
                 </div>
-                <i class="fas fa-external-link-alt ml-auto text-academic-muted group-hover:text-pink-400"></i>
+                <i class="fas fa-external-link-alt ms-auto text-academic-muted group-hover:text-pink-400"></i>
             </a>
 
         </div>
diff --git a/files/python/lesson-09/subject9.py b/files/python/lesson-09/subject9.py
index b3b6e28..e0672cf 100644
--- a/files/python/lesson-09/subject9.py
+++ b/files/python/lesson-09/subject9.py
@@ -1,5 +1,5 @@
 # ---------------------------------------------------------
-#w 9. الدوال المخصصة - Custom Functions 
+#w 09. الدوال المخصصة - Custom Functions 
 # ---------------------------------------------------------
 
 #g 1. الدالة الأساسية (Basic: def NAME():) 
diff --git a/index.html b/index.html
index e7c60be..b858a69 100644
--- a/index.html
+++ b/index.html
@@ -95,8 +95,8 @@
                 <a href="./accounts/index.html" class="nav-link hover:text-academic-accent transition-colors"
                     data-i18n="nav_connect" data-nav-link="connect">Connect</a>
 
-                <!-- Toggles -->
-                <div class="flex items-center gap-3 pl-6 border-l border-slate-200">
+                <!-- Toggles - Fixed RTL border and spacing with logical border-s -->
+                <div class="flex items-center gap-3 ps-6 border-s border-slate-200 dark:border-slate-800">
                     <button id="theme-toggle" class="hover:text-academic-accent transition-colors"
                         aria-label="Toggle Dark Mode">
                         <i class="fas fa-moon"></i>
@@ -259,11 +260,11 @@
             </div>
         </div>
 
-        <!-- Features Grid -->
+        <!-- Features Grid - Fixed dark-theme borders and logical text direction alignment -->
         <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full animate-fade-in opacity-0"
             style="animation: fadeIn 0.8s ease-out 0.2s forwards;">
             <div
-                class="p-6 rounded-xl bg-academic-card border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-left">
+                class="p-6 rounded-xl bg-academic-card border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow text-start">
                 <div
                     class="w-10 h-10 rounded-lg bg-academic-surface flex items-center justify-center text-academic-accent mb-4">
                     <i class="fas fa-cube"></i>
@@ -275,7 +276,7 @@
                     layer.</p>
             </div>
             <div
-                class="p-6 rounded-xl bg-academic-card border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-left">
+                class="p-6 rounded-xl bg-academic-card border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow text-start">
                 <div
                     class="w-10 h-10 rounded-lg bg-academic-surface flex items-center justify-center text-academic-accent mb-4">
                     <i class="fas fa-code"></i>
@@ -286,7 +287,7 @@
                     Real-world examples and interactive challenges.</p>
             </div>
             <div
-                class="p-6 rounded-xl bg-academic-card border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-left">
+                class="p-6 rounded-xl bg-academic-card border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow text-start">
                 <div
                     class="w-10 h-10 rounded-lg bg-academic-surface flex items-center justify-center text-academic-accent mb-4">
                     <i class="fas fa-graduation-cap"></i>
```