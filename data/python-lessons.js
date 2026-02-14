export const lessons = [
    {
        id: "01",
        title: "Print & Output",
        icon: "fas fa-print",
        color: "blue", 
        items: [
            { type: "keyword", label: "Numbers", code: "print(100)\\nprint(3.14)" },
            { type: "keyword", label: "String (تنصيص)", code: 'print("Hello World")\\nprint("Ali"[0]) # A' },
            { type: "keyword", label: "Operator", code: "print(5 + 5)\\nprint(10 * 2)" },
            { type: "keyword", label: "Empty (\\n)", code: 'print("Line 1")\\nprint()\\nprint("Line 2")' },
            { type: "keyword", label: "Variable", code: 'x = "Data"\\nprint(x)' },
            {
                type: "compound",
                label: "Multiple Values",
                code: 'name="Ali"\\nprint("Hi " + name)\\nprint(f"Hi {name}")\\nprint("Hi", name)',
                note: { text: "يجب أن تكون القيم من نفس النوع عند استخدام +", color: "blue" }
            }
        ],
        files: {
            subject: "../../files/python/lesson-01/subject1.py",
            challenge: "../../files/python/lesson-01/challenge1.py"
        }
    },
    {
        id: "02",
        title: "Variable Types",
        icon: "fas fa-layer-group",
        color: "purple", // Hover color for title/icon was purple
        items: [
            { type: "keyword", label: "Numbers (int, float)", code: 'x = 10    # int\\ny = 10.5  # float' },
            { type: "keyword", label: "String", code: 'name = "Python"' },
            { type: "keyword", label: "Bool (True, False)", code: 'is_ready = True\\nis_admin = False' },
            { type: "keyword", label: "List [ ]", code: 'items = [1, 2, "a"]\\nprint(items[0])' },
            { type: "keyword", label: "Dictionary { }", code: 'user = {"id": 1, "name": "Ali"}' },
            { type: "keyword", label: "Tuple ( )", code: 'point = (10, 20)\\n# point[0] = 5  (Error!)' }
        ],
        extraInfo: { text: "بايثون لغة ديناميكية؛ يتم تحديد النوع تلقائياً.", icon: "fas fa-info-circle", color: "blue" },
        files: {
            subject: "../../files/python/lesson-02/subject2.py",
            challenge: "../../files/python/lesson-02/challenge2.py"
        }
    },
    {
        id: "03",
        title: "Operators",
        icon: "fas fa-calculator",
        color: "green",
        layout: "grid", // Special layout for this card
        items: [
            { type: "keyword", label: "Multiplication (*)", code: 'x = 5 * 2\\nprint(x)' },
            { type: "keyword", label: "Exponentiation (**)", code: 'x = 5 ** 2\\nprint(x)' },
            { type: "keyword", label: "Division (/)", code: 'x = 10 / 3\\nprint(x)' },
            { type: "keyword", label: "Floor Div (//)", code: 'x = 10 // 3\\nprint(x)' },
            { type: "keyword", label: "Addition (+)", code: 'x = 10 + 7\\nprint(x)' },
            { type: "keyword", label: "Subtraction (-)", code: 'x = 10 - 4\\nprint(x)' },
            { type: "keyword", label: "Modulus (%)", code: 'x = 10 % 3\\nprint(x)', span: 2 },
            { type: "keyword", label: "Compound Ops (+=, -=, *=, /=, %=)", code: 'x = 5\\nx += 3  # x = 8\\nx *= 2  # x = 16\\nx -= 4  # x = 12\\nx /= 2  # x = 6\\nx %= 4  # x = 2', span: 2, align: "center" }
        ],
        files: {
            subject: "../../files/python/lesson-03/subject3.py",
            challenge: "../../files/python/lesson-03/challenge3.py"
        }
    },
    {
        id: "04",
        title: "User Input",
        icon: "fas fa-keyboard",
        color: "blue",
        items: [
            { type: "keyword", label: "Input Method", code: 'name = input("Enter name: ")', style: "block", padding: "py-3" },
            { type: "alert", text: "* يتم دائماً حفظ المدخلات كنص (String).", color: "amber", icon: "fas fa-exclamation-triangle" }
        ],
        files: {
            subject: "../../files/python/lesson-04/subject4.py",
            challenge: "../../files/python/lesson-04/challenge4.py"
        }
    },
    {
        id: "05",
        title: "Type Casting",
        icon: "fas fa-magic",
        color: "pink",
        items: [
            {
                type: "group",
                layout: "flex",
                items: [
                    { type: "pill", label: "str()", code: 's = str(10)', color: "green" },
                    { type: "pill", label: "int()", code: 'i = int("10")', color: "blue" },
                    { type: "pill", label: "float()", code: 'f = float("10.5")', color: "purple" }
                ]
            },
            { type: "keyword", label: "type(x)", code: 'x = 5\\nprint(type(x))' },
            { type: "keyword", label: "len()", code: 'text = "Hello"\\nprint(len(text)) # 5' },
            { type: "alert", text: "* لا يمكن تحويل نص أبجدي إلى رقم (ValueError).", color: "red", style: "simple" }
        ],
        files: {
            subject: "../../files/python/lesson-05/subject5.py",
            challenge: "../../files/python/lesson-05/challenge5.py"
        }
    },
    {
        id: "06",
        title: "Composition",
        icon: "fas fa-code-branch",
        color: "blue",
        items: [
            { type: "text", text: "دمج الدوال (Function Nesting)", icon: "bar", color: "slate" },
            {
                type: "container",
                items: [
                    { type: "code-link", label: "age = int(input())", code: 'age = int(input("Enter age: "))\\nprint(age + 1)' },
                    { type: "divider" },
                    { type: "code-link", label: "print(len(str(x)))", code: 'print(len(str(12345)))' }
                ]
            }
        ],
        files: {
            subject: "../../files/python/lesson-06/subject6.py",
            challenge: "../../files/python/lesson-06/challenge6.py"
        }
    },
    {
        id: "07",
        title: "Conditionals",
        icon: "fas fa-random",
        color: "blue",
        items: [
            { type: "code-box", label: "Standard If/Elif/Else", code: 'x = 10\\nif x > 5:\\n    print("Big")\\nelif x == 5:\\n    print("Equal")\\nelse:\\n    print("Small")', color: "green" },
            { type: "code-box", label: "Nested If", code: 'if x > 0:\\n    if x % 2 == 0:\\n        print("Positive Even")\\n    else:\\n        print("Positive Odd")', color: "purple" }
        ],
        files: {
            subject: "../../files/python/lesson-07/subject7.py",
            challenge: "../../files/python/lesson-07/challenge7.py"
        }
    },
    {
        id: "08",
        title: "Logical Gates",
        icon: "fas fa-project-diagram",
        color: "orange",
        items: [
            { type: "logic-row", label: "OR", code: 'if x > 5 or y > 5:\\n    print("One of them is true")', arText: "أو (إحداهما صحيح)", color: "blue" },
            { type: "logic-row", label: "AND", code: 'if x > 5 and y > 5:\\n    print("Both are true")', arText: "و (كلاهما صحيح)", color: "purple" },
            { type: "logic-row", label: "NOT (!=)", code: 'if not x == 5:\\n    print("x is Not 5")\\n\\nif x != 5:\\n    print("x is Not 5")', arText: "نفي / ليس", color: "red" }
        ],
        files: {
            subject: "../../files/python/lesson-08/subject8.py",
            challenge: "../../files/python/lesson-08/challenge8.py"
        }
    },
    {
        id: "09",
        title: "Loops (Iterative)",
        icon: "fas fa-sync",
        color: "yellow",
        span: 2, // col-span-2
        layout: "grid-column",
        columns: [
            [
                { type: "code-box", label: "For Range (100)", code: 'for i in range(101):\\n    print(i)', note: "بداية: 0، نهاية: 100 (101 غير شامل)", style: "simple" },
                { type: "code-box", label: "For Range (1 to 100)", code: 'for i in range(1, 101):\\n    print(i)', note: "بداية: 1، نهاية: 100 (101 غير شامل)", style: "simple" },
                { type: "code-box", label: "For Range (1 to 100, by step)", code: 'for i in range(1, 101, 2):\\n    print(i)', note: "بداية: 1، نهاية: ،100، مع تحديد خطوة (101 غير شامل)", style: "simple" }
            ],
            [
                { type: "code-box", label: "For Iterable", code: 'items = [10, 20, 30]\\nfor x in items:\\n    print(x)', note: "يجب أن يكون المتغير <b>Iterable</b> (مثل List أو String).", style: "simple" },
                { type: "code-box", label: "While Loop", code: 'count = 0\\nwhile count < 5:\\n    print(count)\\n    count += 1', color: "green", style: "simple" },
                {
                    type: "group", layout: "flex", items: [
                        { type: "pill-box", label: "break", code: 'for i in range(10):\\n    if i == 5: break\\n    print(i)', color: "red" },
                        { type: "pill-box", label: "continue", code: 'for i in range(10):\\n    if i == 5: continue\\n    print(i)', color: "yellow" }
                    ]
                }
            ]
        ],
        files: {
            subject: "../../files/python/lesson-09/subject9.py",
            challenge: "../../files/python/lesson-09/challenge9.py"
        }
    },
    {
        id: "10",
        title: "Custom Functions",
        icon: "fas fa-cube",
        color: "blue",
        items: [
            { type: "code-box", label: "Basic: def NAME():", code: 'def say_hi():\\n    print("Hello!")\\n\\nsay_hi()', color: "green", style: "left-align" },
            { type: "code-box", label: "With Return & Params", code: 'def add(a, b):\\n    return a + b\\n\\nresult = add(5, 10)\\nprint(result)', color: "green", style: "left-align" }
        ],
        files: {
            subject: "../../files/python/lesson-10/subject10.py",
            challenge: "../../files/python/lesson-10/challenge10.py"
        }
    },
    {
        id: "11",
        title: "Modules",
        icon: "fas fa-boxes",
        color: "purple",
        items: [
            {
                type: "module-box",
                title: "import random",
                color: "blue",
                content: [
                    { code: "random.randint(a, b)", comment: "# Int" },
                    { code: "random.random()", comment: "# Float" },
                    { code: "random.choice([...])", comment: "# Element" },
                    { code: "random.shuffle(list)", comment: "# Shuffle" },
                    { code: "random.choices(l, k=n)", comment: "# Many" }
                ]
            },
            {
                type: "module-box",
                title: "import string",
                color: "purple",
                content: [
                    { code: "string.ascii_lowercase" },
                    { code: "string.ascii_uppercase" },
                    { code: "string.digits" },
                    { code: "string.punctuation" }
                ]
            }
        ],
        files: {
            subject: "../../files/python/lesson-11/subject11.py",
            challenge: "../../files/python/lesson-11/challenge11.py"
        }
    },
    {
        id: "12",
        title: "Methods",
        icon: "fas fa-tools",
        color: "indigo",
        items: [
            { type: "method", label: "upper() / lower() / capitalize()", code: '"hello".upper() # HELLO\\n"HELLO".lower() # hello\\n"HELLO".capitalize() # Hello' },
            { type: "method", label: "list.append(item)", code: 'my_list = [1, 2]\\nmy_list.append(3) # [1, 2, 3]' },
            { type: "method", label: "list.remove(item)", code: 'my_list = [1, 2, 3]\\nmy_list.remove(3) # [1, 2]' },
            { type: "method", label: "list.extend(iterable)", code: 'l1 = [1]\\nl2 = [2]\\nl1.extend(l2) # [1, 2]' },
            { type: "method", label: "separator.join(list)", code: 'items = ["A", "B"]\\n"-".join(items) # "A-B"' },
            { type: "method", label: "str.split(separator)", code: 'words = "A B C".split(" ")\\n# ["A", "B", "C"]' },
            { type: "method", label: "sum(list)", code: 'nums = [1, 2, 3]\\nprint(sum(nums)) # 6' }
        ],
        files: {
            subject: "../../files/python/lesson-12/subject12.py",
            challenge: "../../files/python/lesson-12/challenge12.py"
        }
    }
];
