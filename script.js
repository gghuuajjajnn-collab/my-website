// 1. قاعدة البيانات (مصفوفة الأكواد)
const myCode = [
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
        code: `public class Student {\n    private String name;\n    private int age;\n    \n    public Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n    \n    public String getName() {\n        return name;\n    }\n    \n    public void setName(String name) {\n        this.name = name;\n    }\n    \n    public int getAge() {\n        return age;\n    }\n    \n    public void setAge(int age) {\n        this.age = age;\n    }\n    \n    public void displayInfo() {\n        System.out.println("Name: " + name + ", Age: " + age);\n    }\n}`
    },
    {
        title: "إنشاء مصفوفة ديناميكية",
        lang: "C++",
        code: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> numbers;\n    \n    // إضافة عناصر\n    numbers.push_back(10);\n    numbers.push_back(20);\n    numbers.push_back(30);\n    \n    // عرض العناصر\n    cout << "العناصر: ";\n    for(int num : numbers) {\n        cout << num << " ";\n    }\n    cout << endl;\n    \n    // حجم المصفوفة\n    cout << "الحجم: " << numbers.size() << endl;\n    \n    return 0;\n}`
    },
    {
        title: "تحويل JSON إلى كائن",
        lang: "JavaScript",
        code: `// تحويل JSON string إلى كائن\nlet jsonString = '{"name": "أحمد", "age": 25, "city": "صنعاء"}';\nlet person = JSON.parse(jsonString);\n\nconsole.log(person.name); // أحمد\nconsole.log(person.age);  // 25\n\n// تحويل كائن إلى JSON string\nlet personObject = {\n    name: "فاطمة",\n    age: 22,\n    city: "عدن"\n};\nlet jsonOutput = JSON.stringify(personObject);\nconsole.log(jsonOutput);`
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
        code: `from datetime import datetime\n\n# الحصول على التاريخ والوقت الحالي\nnow = datetime.now()\n\n# تنسيق التاريخ\nformatted_date = now.strftime("%Y-%m-%d")\nformatted_time = now.strftime("%H:%M:%S")\n\nprint("التاريخ:", formatted_date)\nprint("الوقت:", formatted_time)\nprint("التاريخ الكامل:", now.strftime("%A, %B %d, %Y"))`
    },
    {
        title: "إنشاء قائمة مرتبطة",
        lang: "C++",
        code: `#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* next;\n};\n\nclass LinkedList {\nprivate:\n    Node* head;\npublic:\n    LinkedList() { head = NULL; }\n    \n    void insert(int value) {\n        Node* newNode = new Node();\n        newNode->data = value;\n        newNode->next = head;\n        head = newNode;\n    }\n    \n    void display() {\n        Node* temp = head;\n        while(temp != NULL) {\n            cout << temp->data << " -> ";\n            temp = temp->next;\n        }\n        cout << "NULL" << endl;\n    }\n};\n\nint main() {\n    LinkedList list;\n    list.insert(10);\n    list.insert(20);\n    list.insert(30);\n    list.display();\n    return 0;\n}`
    }
];

// ==========================================
// 2. تعريف المتغيرات
// ==========================================
const assistantMessage = document.getElementById("assistantMessage");
const searchInput = document.getElementById('searchInput');
const langFilter = document.getElementById('langFilter');
const suggestionsList = document.getElementById('suggestionsList');
const resultCard = document.getElementById('resultCard');
const langHeader = document.getElementById('langHeader');
const welcomeMessag = document.getElementById('welcomeMessag');

// ==========================================
// 3. نظام البحث الذكي والاقتراحات
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
                li.textContent = item.title + " (" + item.lang + ")";
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
// 4. دوال العرض والإخفاء والنسخ والتنبيهات
// ==========================================
function displayResult(item) {
    if (assistantMessage) assistantMessage.innerText = "وجدت الكود 😎";

    if (resultCard) resultCard.style.display = "block";
    if (langHeader) langHeader.style.display = "block";
    if (welcomeMessag) welcomeMessag.style.display = "none";
    
    document.getElementById('displayTitle').innerText = item.title;
    document.getElementById('displayLang').innerText = item.lang;
    document.getElementById('displayCode').innerText = item.code;
    
    let favBtn = document.getElementById('favBtn');
    if (!favBtn) {
        favBtn = document.createElement('button');
        favBtn.id = 'favBtn';
        favBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            margin-left: 10px;
            transition: 0.3s;
        `;
        favBtn.onclick = () => toggleFavorite(item.title);
        document.getElementById('displayTitle').appendChild(favBtn);
    }
    updateFavoriteButton(item.title);
}

function hideResult() {
    if (assistantMessage) assistantMessage.innerText = "حاول كلمة أخرى 🤔";

    if (resultCard) resultCard.style.display = "none";
    if (langHeader) langHeader.style.display = "none";
    if (welcomeMessag) welcomeMessag.style.display = "block";
}

function copyCode() {
    if (assistantMessage) assistantMessage.innerText = "تم النسخ بنجاح 🚀";
    const codeText = document.getElementById('displayCode').innerText;
    navigator.clipboard.writeText(codeText);
    showCustomAlert("تم نسخ الكود بنجاح! ✅<br>يمكنك الآن لصقه في مشروعك");
}

function showCustomAlert(message) {
    const existingAlerts = document.querySelectorAll('.alert-custom');
    existingAlerts.forEach(alert => alert.remove());
    
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert-custom';
    alertDiv.innerHTML = message;
    
    // تنسيق التنبيه ليكون جميلاً
    alertDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        background: var(--card-bg, #1e1e1e);
        color: var(--text-color, #fff);
        border-right: 4px solid #007acc;
        box-shadow: 0 5px 15px rgba(0,0,0,0.5);
        z-index: 1000;
        text-align: right;
    `;
    
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// ==========================================
// 5. وظائف الوضع الليلي/نهاري
// ==========================================
let isDarkMode = localStorage.getItem('darkMode') ? localStorage.getItem('darkMode') === 'true' : true; 
const themeToggle = document.createElement('button');
themeToggle.id = 'themeToggle';
themeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
themeToggle.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px; /* تم تغييره لليسار حتى لا يغطي على العناصر الأخرى */
    background: #007acc;
    color: black;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    font-size: 20px;
    y-index: 1000;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    transition: 0.3s;
`;
themeToggle.title = isDarkMode ? 'الوضع النهاري' : 'الوضع الليلي';
document.body.appendChild(themeToggle);

function applyTheme() {
    const root = document.documentElement;
    if (isDarkMode) {
        root.style.setProperty('--bg-color', '#121212');
        root.style.setProperty('--text-color', '#e0e0e0');
        root.style.setProperty('--card-bg', '#1e1e1e');
        root.style.setProperty('--input-bg', '#2d2d2d');
        root.style.setProperty('--border-color', '#444');
        themeToggle.innerHTML = '☀️';
        themeToggle.title = 'الوضع النهاري';
    } else {
        root.style.setProperty('--bg-color', '#f5f5f5fe');
        root.style.setProperty('--text-color', '#333');
        root.style.setProperty('--card-bg', '#060606');
        root.style.setProperty('--input-bg', '#070707');
        root.style.setProperty('--border-color', '#ddd');
        themeToggle.innerHTML = '🌙';
        themeToggle.title = 'الوضع الليلي';
    }
    localStorage.setItem('darkMode', isDarkMode);
    
    const cards = document.querySelectorAll('.code-card, .about-card, .comment-card, .chat-container');
    cards.forEach(card => {
        card.style.backgroundColor = isDarkMode ? '#1e1e1e' : '#ffffff';
        card.style.borderColor = isDarkMode ? '#333' : '#ddd';
    });
    
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.backgroundColor = isDarkMode ? '#2d2d2d' : '#f9f9f9';
        input.style.color = isDarkMode ? '#e0e0e0' : '#333';
        input.style.borderColor = isDarkMode ? '#444' : '#ddd';
    });
}

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    applyTheme();
});

themeToggle.addEventListener('mouseenter', () => {
    themeToggle.style.transform = 'scale(1.1)';
});

themeToggle.addEventListener('mouseleave', () => {
    themeToggle.style.transform = 'scale(1)';
});

applyTheme();

window.addEventListener('storage', (e) => {
    if (e.key === 'darkMode') {
        isDarkMode = e.newValue === 'true';
        applyTheme();
    }
});



// ==========================================
// 6. وظائف المفضلات
// ==========================================
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

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
        showCustomAlert('لا توجد أكواد محفوظة في المفضلات ⭐<br>اضغط على ❤️ بجانب أي كود لإضافته للمفضلات');
        return;
    }
    
    let message = '<strong>أكوادك المفضلة ❤️</strong><br><br>';
    favCodes.forEach((code, index) => {
        message += `${index + 1}. <strong>${code.title}</strong> (${code.lang})<br>`;
    });
    showCustomAlert(message);
}

// ==========================================
// 7. تأثيرات الأزرار واختصارات لوحة المفاتيح
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
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
});

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) searchInput.focus();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        isDarkMode = !isDarkMode;
        applyTheme();
    }
    if (e.key === 'Escape') {
        if (suggestionsList) suggestionsList.style.display = 'none';
    }
});

