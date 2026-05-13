const AUTH_STORAGE_KEY = 'code_repo_auth';

function getBackendBaseUrl() {
    if (typeof BACKEND_BASE_URL !== 'undefined' && BACKEND_BASE_URL.trim()) {
        return BACKEND_BASE_URL.trim().replace(/\/$/, '');
    }
    const host = window.location.hostname;
    if (host === '127.0.0.1' || host === 'localhost') {
        return `${window.location.protocol}//${host}:5000`;
    }
    return '';
}

function getAuth() {
    try {
        return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
    } catch {
        return null;
    }
}

function setAuth(authData) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
}

function clearAuth() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

function isLoggedIn() {
    const auth = getAuth();
    return auth && auth.token && auth.email;
}

function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = '/login';
        return null;
    }
    return getAuth();
}

function logout() {
    clearAuth();
    window.location.href = '/login';
}

function showAuthMessage(message) {
    const messageElement = document.getElementById('authMessage');
    if (messageElement) {
        messageElement.innerText = message;
    } else {
        alert(message);
    }
}

function updateNavAuth() {
    const auth = getAuth();
    const logoutBtn = document.getElementById('logoutBtn');
    const loginLink = document.getElementById('loginNav');
    const userName = document.getElementById('userNameDisplay');

    if (logoutBtn) {
        logoutBtn.style.display = auth ? 'inline-block' : 'none';
    }
    if (loginLink) {
        loginLink.style.display = auth ? 'none' : 'inline-block';
    }
    if (userName) {
        userName.innerText = auth ? auth.name : 'زائر';
    }
}

async function handleGoogleCredentialResponse(response) {
    const backendUrl = getBackendBaseUrl();
    if (!backendUrl) {
        showAuthMessage('الخادم غير محدد. اضبط BACKEND_BASE_URL في config.js.');
        return;
    }

    const result = await fetch(`${backendUrl}/tokeninfo`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id_token: response.credential})
    });

    const data = await result.json();
    if (!result.ok) {
        showAuthMessage(data.error || 'حدث خطأ أثناء تسجيل الدخول بجوجل.');
        return;
    }

    setAuth({
        token: response.credential,
        email: data.email,
        name: data.name || data.email,
        role: data.role || 'member',
        provider: 'google'
    });

    window.location.href = '/';
}

function initGoogleSignIn() {
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_ID.trim()) {
        const googleContainer = document.getElementById('googleButton');
        if (googleContainer) googleContainer.style.display = 'none';
        return;
    }

    if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) {
        setTimeout(initGoogleSignIn, 200);
        return;
    }

    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredentialResponse,
        ux_mode: 'popup'
    });
    google.accounts.id.renderButton(
        document.getElementById('googleButton'),
        { theme: 'outline', size: 'large', width: '100%' }
    );
}

function fetchWithAuth(url, options = {}) {
    const auth = getAuth();
    options.headers = options.headers || {};
    if (auth && auth.token) {
        options.headers['Authorization'] = `Bearer ${auth.token}`;
    }
    return fetch(url, options);
}

function normalizePath(path) {
    const cleaned = path.replace(/\/+$/, '');
    return cleaned === '' ? '/' : cleaned;
}

function isLoginPage() {
    const path = normalizePath(window.location.pathname);
    return path === '/login' || path === '/login.html';
}

function isHomePage() {
    const path = normalizePath(window.location.pathname);
    return path === '/' || path === '/index.html';
}

function initLoginPage() {
    const auth = getAuth();
    if (auth && auth.email) {
        window.location.href = '/';
        return;
    }
    initGoogleSignIn();
}

window.addEventListener('DOMContentLoaded', () => {
    updateNavAuth();
    if (isLoginPage() || isHomePage()) {
        initLoginPage();
    }
});
