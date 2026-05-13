const AUTH_STORAGE_KEY = 'code_repo_auth';

function getAuth() {
    try { return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)); } catch { return null; }
}

function isLoggedIn() {
    const auth = getAuth();
    return auth && auth.token;
}

// دالة حماية الصفحات (توضع في الصفحات الخاصة مثل index.html)
function handleProtectedPage() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

// دالة صفحة تسجيل الدخول (تمنع المسجلين من العودة للوجن)
function handleLoginPage() {
    if (isLoggedIn()) {
        window.location.href = 'index.html';
    }
    initGoogleSignIn();
}

function initGoogleSignIn() {
    if (typeof google === 'undefined') {
        setTimeout(initGoogleSignIn, 200);
        return;
    }
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse
    });
    google.accounts.id.renderButton(document.getElementById('googleButton'), { size: 'large' });
}

async function handleGoogleResponse(response) {
    const res = await fetch(`${BACKEND_BASE_URL}/tokeninfo`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id_token: response.credential})
    });
    const data = await res.json();
    if (res.ok) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
            token: response.credential,
            name: data.name,
            email: data.email
        }));
        window.location.href = 'index.html';
    }
}

function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.location.href = 'login.html';
}