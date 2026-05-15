const AUTH_STORAGE_KEY = 'code_repo_auth';

function getAuth() {
    try {
        return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
    } catch {
        return null;
    }
}

function setAuth(data) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
}

function isLoggedIn() {
    const auth = getAuth();
    return !!(auth && auth.token);
}

function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function handleProtectedPage() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

function handleLoginPage() {
    if (isLoggedIn()) {
        window.location.href = 'index.html';
    }
    initGoogleSignIn();
}

function getBackendBaseUrl() {
    return (typeof BACKEND_BASE_URL !== 'undefined') ? BACKEND_BASE_URL : null;
}

function initGoogleSignIn() {
    if (typeof google === 'undefined') {
        setTimeout(initGoogleSignIn, 300);
        return;
    }
    if (!GOOGLE_CLIENT_ID) {
        console.error('GOOGLE_CLIENT_ID not set in config.js');
        return;
    }
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse
    });

    const googleBtn = document.getElementById('googleButton');
    if (googleBtn) {
        google.accounts.id.renderButton(googleBtn, {
            type: 'standard',
            size: 'large',
            width: '100%'
        });
    }
}

async function handleGoogleResponse(response) {
    const backendUrl = getBackendBaseUrl();
    if (!backendUrl) {
        showAuthMessage('Backend URL not configured');
        return;
    }

    try {
        const res = await fetch(`${backendUrl}/tokeninfo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_token: response.credential })
        });

        const data = await res.json();

        if (res.ok && !data.error) {
            setAuth({
                token: response.credential,
                name: data.name,
                email: data.email,
                role: data.role,
                provider: 'google'
            });
            window.location.href = 'index.html';
        } else {
            showAuthMessage(data.error || 'Google login failed');
        }
    } catch (error) {
        console.error('Google login error:', error);
        showAuthMessage('Cannot connect to backend server');
    }
}

function showAuthMessage(msg) {
    const el = document.getElementById('authMessage');
    if (el) {
        el.textContent = msg;
        el.style.color = '#ff6b6b';
    } else {
        alert(msg);
    }
}

async function fetchWithAuth(url, options = {}) {
    const auth = getAuth();
    if (!auth || !auth.token) {
        throw new Error('Not authenticated');
    }

    options.headers = options.headers || {};
    options.headers['Authorization'] = `Bearer ${auth.token}`;
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';

    return fetch(url, options);
}

function logout() {
    if (typeof google !== 'undefined' && google.accounts) {
        try {
            google.accounts.id.disableAutoSelect();
        } catch (e) {
            console.log('Google logout skipped');
        }
    }
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.location.href = 'login.html';
}

function updateNavAuth() {
    const loginLink = document.getElementById('loginNav');
    const logoutBtn = document.getElementById('logoutBtn');
    const auth = getAuth();

    if (loginLink) {
        loginLink.style.display = (auth && auth.email) ? 'none' : 'inline-block';
    }
    if (logoutBtn) {
        logoutBtn.style.display = (auth && auth.email) ? 'inline-block' : 'none';
    }
}