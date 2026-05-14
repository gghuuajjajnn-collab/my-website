// ==========================================
// 1. Firebase Configuration (نفس التعليقات)
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyApTn4C_mRycCfC8A58G4VKrbhtmbkVk2A",
    authDomain: "mycollageapp-597bd.firebaseapp.com",
    databaseURL: "https://mycollageapp-597bd-default-rtdb.firebaseio.com",
    projectId: "mycollageapp-597bd",
    storageBucket: "mycollageapp-597bd.firebasestorage.app",
    messagingSenderId: "697363114840",
    appId: "1:697363114840:web:ffdf90200ff478b137d32d",
    measurementId: "G-N5GH394R1G"
};

// Initialize Firebase
let db;
try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    db = firebase.database();
} catch(e) {
    console.log('Firebase init error:', e);
}

// ==========================================
// 2. قاعدة البيانات المحلية (Fallback)
// ==========================================
const defaultCodes = [
    {
        title: "دالة الوقت والتاريخ",
        lang: "Python",
        code: `import datetime\n\n# هذه الدالة تقوم بجلب الوقت الحالي للجهاز وطباعته\ndef get_current_time():\n    now = datetime.datetime.now()\n    print("الوقت الحالي هو:", now)`
    },
    {
        title: "دالة البحث الثنائي",
        lang: "C++",
        code: `int binarySearch(int arr[], int l, int r, int x) {\n    // خوارزمية سريعة جداً للبحث في المصفوفات المرتبة\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (arr[m] == x) return m;\n        if (arr[m] < x) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}`
    },
    {
        title: "دالة زر البحث (جافا سكريبت)",
        lang: "JavaScript",
        code: `function searchAction() {\n    // دالة بسيطة تتصل بالزر لجلب قيمة حقل الإدخال\n    let input = document.getElementById('searchBox').value;\n    alert("أنت تبحث عن: " + input);\n}`
    },
    {
        title: "طباعة نجمة هرمية",
        lang: "Python",
        code: `def print_pyramid(n):\n    for i in range(1, n+1):\n        print(' ' * (n-i) + '*' * (2*i-1))\n\n# مثال الاستخدام\nprint_pyramid(5)`
    },
    {
        title: "حساب المعدل التراكمي",
        lang: "Python",
        code: `def calculate_gpa(grades, credits):\n    total_points = sum(g * c for g, c in zip(grades, credits))\n    total_credits = sum(credits)\n    return total_points / total_credits if total_credits > 0 else 0\n\n# مثال\ngrades = [4.0, 3.5, 3.0]\ncredits = [3, 4, 2]\nprint("المعدل التراكمي:", calculate_gpa(grades, credits))`
    },
    {
        title: "فحص عدد أولي",
        lang: "C++",
        code: `#include <iostream>\nusing namespace std;\n\nbool isPrime(int n) {\n    if (n <= 1) return false;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) return false;\n    }\n    return true;\n}\n\nint main() {\n    int num;\n    cout << "أدخل رقم: ";\n    cin >> num;\n    cout << (isPrime(num) ? "عدد أولي" : "ليس عدد أولي") << endl;\n    return 0;\n}`
    },
    {
        title: "عكس سلسلة نصية",
        lang: "JavaScript",
        code: `function reverseString(str) {\n    return str.split('').reverse().join('');\n}\n\n// مثال\nconsole.log(reverseString("مرحبا بالعالم")); // "ملاعب ابحرم"`
    },
    {
        title: "قراءة ملف نصي",
        lang: "Python",
        code: `def read_file(filename):\n    try:\n        with open(filename, 'r', encoding='utf-8') as file:\n            content = file.read()\n            print(content)\n    except FileNotFoundError:\n        print("الملف غير موجود")\n\n# مثال\nread_file("example.txt")`
    },
    {
        title: "حل معادلة تربيعية",
        lang: "C++",
        code: `#include <iostream>\n#include <cmath>\nusing namespace std;\n\nvoid solveQuadratic(float a, float b, float c) {\n    float discriminant = b*b - 4*a*c;\n    if (discriminant > 0) {\n        float root1 = (-b + sqrt(discriminant)) / (2*a);\n        float root2 = (-b - sqrt(discriminant)) / (2*a);\n        cout << "الجذران: " << root1 << " و " << root2 << endl;\n    } else if (discriminant == 0) {\n        float root = -b / (2*a);\n        cout << "جذر مزدوج: " << root << endl;\n    } else {\n        cout << "لا توجد جذور حقيقية" << endl;\n    }\n}\n\nint main() {\n    solveQuadratic(1, -3, 2);\n    return 0;\n}`
    },
    {
        title: "تحويل درجة حرارة",
        lang: "JavaScript",
        code: `function celsiusToFahrenheit(celsius) {\n    return (celsius * 9/5) + 32;\n}\n\nfunction fahrenheitToCelsius(fahrenheit) {\n    return (fahrenheit - 32) * 5/9;\n}\n\n// أمثلة\nconsole.log(celsiusToFahrenheit(25)); // 77\nconsole.log(fahrenheitToCelsius(77)); // 25`
    },
    {
        title: "ترتيب مصفوفة",
        lang: "Python",
        code: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\n# مثال\nnumbers = [64, 34, 25, 12, 22, 11, 90]\nprint("المصفوفة المرتبة:", bubble_sort(numbers))`
    },
    {
        title: "حساب عاملي",
        lang: "C++",
        code: `#include <iostream>\nusing namespace std;\n\nlong long factorial(int n) {\n    if (n == 0 || n == 1) return 1;\n    return n * factorial(n-1);\n}\n\nint main() {\n    int num;\n    cout << "أدخل رقم: ";\n    cin >> num;\n    cout << "العاملي: " << factorial(num) << endl;\n    return 0;\n}`
    },
    {
        title: "التحقق من تاريخ صحيح",
        lang: "JavaScript",
        code: `function isValidDate(year, month, day) {\n    const date = new Date(year, month - 1, day);\n    return date.getFullYear() === year &&\n           date.getMonth() === month - 1 &&\n           date.getDate() === day;\n}\n\n// مثال\nconsole.log(isValidDate(2023, 12, 25)); // true\nconsole.log(isValidDate(2023, 2, 30)); // false`
    },
    {
        title: "طباعة أرقام فيبوناتشي",
        lang: "Python",
        code: `def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        print(a, end=' ')\n        a, b = b, a + b\n    print()\n\n# مثال\nfibonacci(10)  # 0 1 1 2 3 5 8 13 21 34`
    },
    {
        title: "حساب متوسط قائمة",
        lang: "Python",
        code: `def calculate_average(numbers):\n    if not numbers:\n        return 0\n    return sum(numbers) / len(numbers)\n\n# مثال\nnums = [10, 20, 30, 40, 50]\nprint("المتوسط:", calculate_average(nums))`
    },
    {
        title: "إنشاء كلاس في جافا",
        lang: "Java",
        code: `public class Student {\n    private String name;\n    private int age;\n    \n    public Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n    \n    public String getName() { return name; }\n    public void setName(String name) { this.name = name; }\n    public int getAge() { return age; }\n    public void setAge(int age) { this.age = age; }\n    \n    public void displayInfo() {\n        System.out.println("Name: " + name + ", Age: " + age);\n    }\n}`
    },
    {
        title: "إنشاء مصفوفة ديناميكية",
        lang: "C++",
        code: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> numbers;\n    numbers.push_back(10);\n    numbers.push_back(20);\n    numbers.push_back(30);\n    \n    cout << "العناصر: ";\n    for(int num : numbers) {\n        cout << num << " ";\n    }\n    cout << endl;\n    cout << "الحجم: " << numbers.size() << endl;\n    return 0;\n}`
    },
    {
        title: "تحويل JSON إلى كائن",
        lang: "JavaScript",
        code: `let jsonString = '{"name": "أحمد", "age": 25, "city": "صنعاء"}';\nlet person = JSON.parse(jsonString);\n\nconsole.log(person.name); // أحمد\nconsole.log(person.age);  // 25\n\nlet personObject = {\n    name: "فاطمة",\n    age: 22,\n    city: "عدن"\n};\nlet jsonOutput = JSON.stringify(personObject);\nconsole.log(jsonOutput);`
    },
    {
        title: "قراءة ملف CSV",
        lang: "Python",
        code: `import csv\n\ndef read_csv_file(filename):\n    try:\n        with open(filename, 'r', encoding='utf-8') as file:\n            reader = csv.reader(file)\n            for row in reader:\n                print(row)\n    except FileNotFoundError:\n        print("الملف غير موجود")\n\n# مثال\nread_csv_file("data.csv")`
    },
    {
        title: "إنشاء خادم محلي بسيط",
        lang: "Python",
        code: `from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return "مرحباً بك في الخادم المحلي!"\n\n@app.route('/hello/<name>')\ndef hello(name):\n    return f"مرحباً {name}!"\n\nif __name__ == '__main__':\n    app.run(debug=True)`
    },
    {
        title: "حساب المسافة بين نقطتين",
        lang: "JavaScript",
        code: `function calculateDistance(x1, y1, x2, y2) {\n    const dx = x2 - x1;\n    const dy = y2 - y1;\n    return Math.sqrt(dx * dx + dy * dy);\n}\n\n// مثال\nlet distance = calculateDistance(0, 0, 3, 4);\nconsole.log("المسافة:", distance); // 5`
    },
    {
        title: "طباعة تاريخ اليوم",
        lang: "Python",
        code: `from datetime import datetime\n\nnow = datetime.now()\nformatted_date = now.strftime("%Y-%m-%d")\nformatted_time = now.strftime("%H:%M:%S")\n\nprint("التاريخ:", formatted_date)\nprint("الوقت:", formatted_time)\nprint("التاريخ الكامل:", now.strftime("%A, %B %d, %Y"))`
    },
    {
        title: "إنشاء قائمة مرتبطة",
        lang: "C++",
        code: `#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* next;\n};\n\nclass LinkedList {\nprivate:\n    Node* head;\npublic:\n    LinkedList() { head = NULL; }\n    \n    void insert(int value) {\n        Node* newNode = new Node();\n        newNode->data = value;\n        newNode->next = head;\n        head = newNode;\n    }\n    \n    void display() {\n        Node* temp = head;\n        while(temp != NULL) {\n            cout << temp->data << " -> ";\n            temp = temp->next;\n        }\n        cout << "NULL" << endl;\n    }\n};\n\nint main() {\n    LinkedList list;\n    list.insert(10);\n    list.insert(20);\n    list.insert(30);\n    list.display();\n    return 0;\n}`
    }
];

// Global codes array - will be populated from Firebase + defaults
let myCode = [...defaultCodes];
let currentCodeItem = null;

// Load codes from Firebase
function loadCodesFromFirebase() {
    if (!db) return;
    
    db.ref('codes').on('value', (snapshot) => {
        const firebaseCodes = [];
        snapshot.forEach((child) => {
            firebaseCodes.push({
                ...child.val(),
                key: child.key,
                isDynamic: true
            });
        });
        
        // Merge: Firebase codes take precedence, but keep defaults that aren't in Firebase
        const firebaseTitles = new Set(firebaseCodes.map(c => c.title));
        myCode = [
            ...firebaseCodes,
            ...defaultCodes.filter(c => !firebaseTitles.has(c.title))
        ];
        
        // Update search if active
        if (searchInput && searchInput.value.trim()) {
            searchInput.dispatchEvent(new Event('input'));
        }
    });
}

// ==========================================
// 3. تعريف المتغيرات
// ==========================================
const assistantMessage = document.getElementById("assistantMessage");
const searchInput = document.getElementById('searchInput');
const langFilter = document.getElementById('langFilter');
const suggestionsList = document.getElementById('suggestionsList');
const resultCard = document.getElementById('resultCard');
const langHeader = document.getElementById('langHeader');
const welcomeMessag = document.getElementById('welcomeMessag');

// ==========================================
// 4. نظام البحث الذكي والاقتراحات
// ==========================================
if (searchInput) {
    searchInput.addEventListener('input', function() {
        if (assistantMessage) assistantMessage.innerText = "جاري البحث 🔍";

        const term = this.value.trim().toLowerCase();
        const selectedLang = langFilter ? langFilter.value : 'all';
        
        suggestionsList.innerHTML = '';
        
        if (term === '') {
            suggestionsList.style.display = 'none';
            hideResult();
            return;
        }

        const suggestions = myCode.filter(item => {
            const matchesText = item.title.toLowerCase().includes(term);
            const matchesLang = (selectedLang === "all" || item.lang === selectedLang);
            return matchesText && matchesLang;
        });

        if (suggestions.length > 0) {
            suggestionsList.style.display = 'block'; 
            
            suggestions.forEach(item => {
                const li = document.createElement('li');
                li.style.cssText = 'display:flex; justify-content:space-between; align-items:center;';
                li.innerHTML = `
                    <span>${item.title}</span>
                    <span style="background:var(--accent-color); color:white; padding:2px 8px; border-radius:12px; font-size:11px;">${item.lang}</span>
                `;
                li.onclick = () => {
                    searchInput.value = item.title; 
                    suggestionsList.style.display = 'none'; 
                    displayResult(item); 
                };
                suggestionsList.appendChild(li);
            });
        } else {
            suggestionsList.style.display = 'none';
            hideResult();
        }
    });
}

document.addEventListener('click', function(e) {
    if (suggestionsList && e.target !== searchInput) {
        suggestionsList.style.display = 'none';
    }
});

// ==========================================
// 5. Syntax Highlighting
// ==========================================
function highlightSyntax(code, lang) {
    let html = escapeHtml(code);
    
    const colors = {
        keyword: '#ff79c6',
        string: '#f1fa8c',
        comment: '#6272a4',
        number: '#bd93f9',
        function: '#8be9fd'
    };
    
    if (lang === 'Python') {
        html = html.replace(/\b(def|class|return|if|else|elif|for|while|import|from|try|except|with|as|print|pass|break|continue|lambda|yield|raise|assert|del|global|nonlocal)\b/g, `<span style="color:${colors.keyword}">$1</span>`);
        html = html.replace(/\b(True|False|None)\b/g, `<span style="color:${colors.number}">$1</span>`);
        html = html.replace(/(#.*$)/gm, `<span style="color:${colors.comment}">$1</span>`);
        html = html.replace(/(".*?"|'.*?')/g, `<span style="color:${colors.string}">$1</span>`);
        html = html.replace(/\b(\d+)\b/g, `<span style="color:${colors.number}">$1</span>`);
    } else if (lang === 'JavaScript') {
        html = html.replace(/\b(function|return|var|let|const|if|else|for|while|do|try|catch|finally|throw|new|this|typeof|instanceof|in|of|void|delete|debugger|async|await|class|extends|super|import|export|default|from)\b/g, `<span style="color:${colors.keyword}">$1</span>`);
        html = html.replace(/\b(true|false|null|undefined|NaN|Infinity)\b/g, `<span style="color:${colors.number}">$1</span>`);
        html = html.replace(/(\/\/.*$)/gm, `<span style="color:${colors.comment}">$1</span>`);
        html = html.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${colors.comment}">$1</span>`);
        html = html.replace(/(".*?"|'.*?'|`.*?`)/g, `<span style="color:${colors.string}">$1</span>`);
        html = html.replace(/\b(\d+)\b/g, `<span style="color:${colors.number}">$1</span>`);
    } else if (lang === 'C++') {
        html = html.replace(/\b(int|float|double|char|void|bool|long|short|unsigned|signed|auto|const|static|extern|register|volatile|mutable|inline|virtual|explicit|override|final|return|if|else|for|while|do|switch|case|default|break|continue|goto|try|catch|throw|new|delete|class|struct|union|enum|typedef|template|typename|namespace|using|public|protected|private|friend|operator|sizeof|typeof|decltype)\b/g, `<span style="color:${colors.keyword}">$1</span>`);
        html = html.replace(/\b(true|false|null|nullptr)\b/g, `<span style="color:${colors.number}">$1</span>`);
        html = html.replace(/(\/\/.*$)/gm, `<span style="color:${colors.comment}">$1</span>`);
        html = html.replace(/(".*?")/g, `<span style="color:${colors.string}">$1</span>`);
        html = html.replace(/\b(\d+)\b/g, `<span style="color:${colors.number}">$1</span>`);
    } else if (lang === 'Java') {
        html = html.replace(/\b(abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while|true|false|null)\b/g, `<span style="color:${colors.keyword}">$1</span>`);
        html = html.replace(/(\/\/.*$)/gm, `<span style="color:${colors.comment}">$1</span>`);
        html = html.replace(/(".*?")/g, `<span style="color:${colors.string}">$1</span>`);
        html = html.replace(/\b(\d+)\b/g, `<span style="color:${colors.number}">$1</span>`);
    }
    
    return html;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// 6. دوال العرض والإخفاء والنسخ
// ==========================================
function displayResult(item) {
    currentCodeItem = item;
    
    if (assistantMessage) assistantMessage.innerText = "وجدت الكود 😎";

    if (resultCard) resultCard.style.display = "block";
    if (langHeader) langHeader.style.display = "block";
    if (welcomeMessag) welcomeMessag.style.display = "none";
    
    const titleEl = document.getElementById('displayTitle');
    const langEl = document.getElementById('displayLang');
    const codeEl = document.getElementById('displayCode');
    const badgeEl = document.getElementById('codeLangBadge');
    
    if (titleEl) titleEl.innerText = item.title;
    if (langEl) langEl.innerText = item.lang;
    if (badgeEl) badgeEl.innerText = item.lang;
    
    // Apply syntax highlighting
    if (codeEl) {
        codeEl.innerHTML = highlightSyntax(item.code, item.lang);
    }
    
    updateFavoriteButton(item.title);
}

function hideResult() {
    currentCodeItem = null;
    if (assistantMessage) assistantMessage.innerText = "حاول كلمة أخرى 🤔";

    if (resultCard) resultCard.style.display = "none";
    if (langHeader) langHeader.style.display = "none";
    if (welcomeMessag) welcomeMessag.style.display = "block";
}

function copyCode() {
    if (!currentCodeItem) return;
    
    if (assistantMessage) assistantMessage.innerText = "تم النسخ بنجاح 🚀";
    navigator.clipboard.writeText(currentCodeItem.code);
    showCustomAlert("تم نسخ الكود بنجاح! ✅<<br>يمكنك الآن لصقه في مشروعك");
}

function executeCurrentCode() {
    if (!currentCodeItem) return;
    
    const lang = currentCodeItem.lang;
    const code = currentCodeItem.code;
    
    if (lang === 'JavaScript') {
        try {
            // Create a safe output capture
            let output = [];
            const mockConsole = {
                log: (...args) => output.push(args.join(' ')),
                error: (...args) => output.push('Error: ' + args.join(' ')),
                warn: (...args) => output.push('Warn: ' + args.join(' '))
            };
            
            // Wrap in function with mock console
            const func = new Function('console', code);
            func(mockConsole);
            
            showExecutionResult(output.join('\n') || 'تم التنفيذ بنجاح (لا يوجد output)');
        } catch (err) {
            showExecutionResult('خطأ: ' + err.message, true);
        }
    } else if (lang === 'Python') {
        showExecutionResult(
            'تشغيل بايثون يتطلب خادم Backend.\n' +
            'الكود جاهز للتشغيل:\n\n' + 
            code.substring(0, 200) + '...', 
            false, true
        );
    } else {
        showExecutionResult(
            `تشغيل كود ${lang} يتطلب بيئة تطوير متخصصة.\n` +
            'الكود جاهز للنسخ والتشغيل في IDE مناسب.',
            false, true
        );
    }
}

function showExecutionResult(output, isError = false, isInfo = false) {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position:fixed; inset:0; display:flex; align-items:center; justify-content:center;
        background:rgba(0,0,0,0.8); z-index:2000; padding:20px;
    `;
    
    const box = document.createElement('div');
    box.style.cssText = `
        background:var(--card-bg); color:var(--text-color); padding:25px;
        border-radius:15px; max-width:90%; max-height:80vh; overflow:auto;
        text-align:right; border:2px solid ${isError ? 'var(--error-color)' : isInfo ? 'var(--accent-color)' : 'var(--success-color)'};
        width:600px; box-shadow:0 20px 60px rgba(0,0,0,0.5);
    `;
    
    box.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
            <h3 style="margin:0; color:${isError ? 'var(--error-color)' : isInfo ? 'var(--accent-color)' : 'var(--success-color)'};">
                ${isError ? '❌ خطأ' : isInfo ? 'ℹ️ معلومة' : '✅ نتيجة التنفيذ'}
            </h3>
            <button onclick="this.closest('.exec-popup').remove()" style="padding:5px 15px; font-size:12px;">إغلاق</button>
        </div>
        <pre style="background:var(--bg-color); padding:15px; border-radius:8px; direction:ltr; text-align:left; overflow-x:auto; font-family:monospace; font-size:13px; line-height:1.6; color:${isError ? '#ff6b6b' : 'var(--text-color)'};">${escapeHtml(output)}</pre>
    `;
    
    popup.className = 'exec-popup';
    popup.appendChild(box);
    document.body.appendChild(popup);
    
    popup.onclick = (e) => {
        if (e.target === popup) popup.remove();
    };
}

function shareCode() {
    if (!currentCodeItem) return;
    
    const shareData = {
        title: currentCodeItem.title,
        text: `كود: ${currentCodeItem.title}\nلغة: ${currentCodeItem.lang}\n\n${currentCodeItem.code.substring(0, 100)}...`,
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        navigator.clipboard.writeText(shareData.text);
        showCustomAlert('تم نسخ تفاصيل الكود للمشاركة! 📋');
    }
}

// ==========================================
// 7. وظائف المفضلات
// ==========================================
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function toggleCurrentFavorite() {
    if (!currentCodeItem) return;
    toggleFavorite(currentCodeItem.title);
}

function toggleFavorite(title) {
    const index = favorites.indexOf(title);
    if (index > -1) {
        favorites.splice(index, 1);
        if (assistantMessage) assistantMessage.innerText = "تم إزالة من المفضلات 💔";
        showCustomAlert(`تم إزالة <strong>${title}</strong> من المفضلات 💔`);
    } else {
        favorites.push(title);
        if (assistantMessage) assistantMessage.innerText = "تم إضافة إلى المفضلات ❤️";
        showCustomAlert(`تم إضافة <strong>${title}</strong> إلى المفضلات ❤️`);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButton(title);
}

function updateFavoriteButton(title) {
    const favBtn = document.getElementById('favBtn');
    if (favBtn) {
        const isFav = favorites.includes(title);
        favBtn.innerHTML = isFav ? '❤️' : '🤍';
        favBtn.title = isFav ? 'إزالة من المفضلات' : 'إضافة إلى المفضلات';
    }
}

function showFavorites() {
    const favCodes = myCode.filter(code => favorites.includes(code.title));
    if (favCodes.length === 0) {
        showCustomAlert('لا توجد أكواد محفوظة في المفضلات ⭐<<br>اضغط على ❤️ بجانب أي كود لإضافته للمفضلات');
        return;
    }
    
    let message = '<strong>أكوادك المفضلة ❤️</strong><br><br>';
    favCodes.forEach((code, index) => {
        message += `${index + 1}. <strong>${code.title}</strong> (${code.lang})<<br>`;
    });
    showCustomAlert(message);
}

// ==========================================
// 8. إضافة كود جديد (للأدمن)
// ==========================================
function showAddCodeForm() {
    const auth = typeof getAuth === 'function' ? getAuth() : null;
    if (!auth || auth.role !== 'admin') {
        showCustomAlert('فقط الأدمن يمكنه إضافة أكواد جديدة');
        return;
    }
    
    const popup = document.createElement('div');
    popup.style.cssText = `
        position:fixed; inset:0; display:flex; align-items:center; justify-content:center;
        background:rgba(0,0,0,0.8); z-index:2000; padding:20px;
    `;
    
    const box = document.createElement('div');
    box.style.cssText = `
        background:var(--card-bg); color:var(--text-color); padding:25px;
        border-radius:15px; max-width:90%; max-height:90vh; overflow:auto;
        text-align:right; border:2px solid var(--accent-color); width:500px;
    `;
    
    box.innerHTML = `
        <h3 style="margin-top:0; color:var(--accent-color);">➕ إضافة كود جديد</h3>
        <div style="display:flex; flex-direction:column; gap:12px;">
            <input type="text" id="newCodeTitle" placeholder="عنوان الكود" style="padding:12px; border-radius:8px; background:var(--input-bg); border:1px solid var(--border-color); color:var(--text-color);">
            <select id="newCodeLang" style="padding:12px; border-radius:8px; background:var(--input-bg); border:1px solid var(--border-color); color:var(--text-color);">
                <option value="Python">Python</option>
                <option value="JavaScript">JavaScript</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
            </select>
            <textarea id="newCodeBody" placeholder="الكود هنا..." style="padding:12px; border-radius:8px; background:var(--input-bg); border:1px solid var(--border-color); color:var(--text-color); min-height:150px; font-family:monospace; direction:ltr; text-align:left;"></textarea>
            <div style="display:flex; gap:10px;">
                <button onclick="submitNewCode()" style="flex:1;">حفظ الكود</button>
                <button onclick="this.closest('.add-popup').remove()" style="flex:1; background:var(--border-color);">إلغاء</button>
            </div>
        </div>
    `;
    
    popup.className = 'add-popup';
    popup.appendChild(box);
    document.body.appendChild(popup);
}

async function submitNewCode() {
    const title = document.getElementById('newCodeTitle').value.trim();
    const lang = document.getElementById('newCodeLang').value;
    const code = document.getElementById('newCodeBody').value.trim();
    
    if (!title || !code) {
        showCustomAlert('الرجاء ملء جميع الحقول');
        return;
    }
    
    if (db) {
        try {
            await db.ref('codes').push({
                title, lang, code,
                timestamp: Date.now(),
                addedBy: getAuth()?.email || 'unknown'
            });
            showCustomAlert('تم إضافة الكود بنجاح! ✅');
            document.querySelector('.add-popup')?.remove();
        } catch(e) {
            showCustomAlert('خطأ في الحفظ: ' + e.message);
        }
    } else {
        showCustomAlert('Firebase غير متصل. تأكد من الاتصال بالإنترنت.');
    }
}

// ==========================================
// 9. التنبيهات المخصصة
// ==========================================
function showCustomAlert(message) {
    const existingAlerts = document.querySelectorAll('.alert-custom');
    existingAlerts.forEach(alert => alert.remove());
    
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert-custom';
    alertDiv.innerHTML = message;
    
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        background: var(--card-bg, #1e1e1e);
        color: var(--text-color, #fff);
        border-right: 4px solid var(--accent-color);
        box-shadow: 0 5px 15px rgba(0,0,0,0.5);
        z-index: 1000;
        text-align: right;
        max-width: 350px;
        word-wrap: break-word;
        animation: slideInRight 0.5s ease-out;
    `;
    
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => alertDiv.remove(), 500);
    }, 3000);
}

// ==========================================
// 10. تأثيرات الأزرار واختصارات لوحة المفاتيح
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Load Firebase codes
    loadCodesFromFirebase();
    
    // Ripple effect
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size/2 + 'px';
            ripple.style.top = e.clientY - rect.top - size/2 + 'px';
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add Admin button if admin
    const auth = typeof getAuth === 'function' ? getAuth() : null;
    if (auth && auth.role === 'admin') {
        const header = document.querySelector('header');
        if (header) {
            const adminBtn = document.createElement('button');
            adminBtn.textContent = '➕ إضافة كود';
            adminBtn.style.cssText = 'margin-top:15px; padding:8px 20px; font-size:14px;';
            adminBtn.onclick = showAddCodeForm;
            header.appendChild(adminBtn);
        }
    }
});

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) searchInput.focus();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        if (typeof toggleTheme === 'function') toggleTheme();
    }
    if (e.key === 'Escape') {
        if (suggestionsList) suggestionsList.style.display = 'none';
        // Close popups
        document.querySelectorAll('.exec-popup, .add-popup').forEach(p => p.remove());
    }
});