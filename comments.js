// 1️⃣ إعداد Firebase
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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 2️⃣ عناصر الـ HTML
const nameInput = document.getElementById('nameInput');
const commentInput = document.getElementById('commentInput');
const commentsList = document.getElementById('commentsList');

// 3️⃣ دالة إرسال التعليق
function submitComment() {
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (name && comment) {
        database.ref('comments').push({
            name: name,
            comment: comment,
            timestamp: Date.now()
        });

        nameInput.value = '';
        commentInput.value = '';
        showCustomAlert('تم إرسال تعليقك بنجاح! شكراً لك 💬');
    } else {
        showCustomAlert('الرجاء تعبئة الاسم والتعليق');
    }
}

// دالة لعرض التنبيهات المخصصة
function showCustomAlert(message) {
    const existingAlerts = document.querySelectorAll('.alert-custom');
    existingAlerts.forEach(alert => alert.remove());
    
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert-custom';
    alertDiv.innerHTML = message;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// 4️⃣ قراءة التعليقات وعرضها مباشرة
database.ref('comments').on('value', snapshot => {
    commentsList.innerHTML = '';
    const comments = [];
    snapshot.forEach(item => {
        const data = item.val();
        comments.push({ ...data, key: item.key });
    });
    
    // ترتيب التعليقات حسب التاريخ (الأحدث أولاً)
    comments.sort((a, b) => b.timestamp - a.timestamp);
    
    comments.forEach(data => {
        const div = document.createElement('div');
        div.className = 'comment-card';
        const date = new Date(data.timestamp);
        const formattedDate = date.toLocaleString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong style="color: #4CAF50;">${escapeHtml(data.name)}</strong>
                <small style="color: #888; font-size: 12px;">${formattedDate}</small>
            </div>
            <p style="margin: 0; line-height: 1.5;">${escapeHtml(data.comment)}</p>
        `;
        commentsList.appendChild(div);
    });
});

// دالة للهروب من HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}