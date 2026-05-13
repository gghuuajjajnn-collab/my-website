const siteRoutes = [
    { href: '/', label: 'الرئيسية' },
    { href: '/ai', label: 'الذكاء الاصطناعي' },
    { href: '/comments', label: 'تعليقاتكم' },
    { href: '/login', label: 'تسجيل الدخول', id: 'loginNav' },
    { href: '/about', label: 'من أنا' }
];

function getCurrentPath() {
    const path = window.location.pathname.replace(/\/+$/, '');
    return path === '' ? '/' : path;
}

function buildNavLink(route) {
    const currentPath = getCurrentPath();
    const isActive = currentPath === route.href || (route.href === '/login' && currentPath === '/login.html');
    return `
        <a href="${route.href}" ${route.id ? `id="${route.id}"` : ''} class="${isActive ? 'active' : ''}">${route.label}</a>
    `;
}

function createNavbar() {
    const container = document.getElementById('navContainer');
    if (!container) return;

    const links = siteRoutes.map(buildNavLink).join('');
    container.innerHTML = `
        <nav class="navbar">
            ${links}
            <div class="nav-actions">
                <button type="button" id="themeToggle">☀️</button>
                <button type="button" id="logoutBtn" onclick="logout()" style="display:none;">خروج</button>
            </div>
        </nav>
    `;

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    applyTheme();
    updateNavAuth();
}

function initTheme() {
    const storedTheme = localStorage.getItem('siteTheme');
    if (storedTheme) {
        setTheme(storedTheme);
    } else {
        setTheme('dark');
    }
}

function setTheme(mode) {
    document.body.classList.toggle('light-theme', mode === 'light');
    document.body.classList.toggle('dark-theme', mode === 'dark');
    localStorage.setItem('siteTheme', mode);
    updateThemeButton();
}

function toggleTheme() {
    const current = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
}

function updateThemeButton() {
    const button = document.getElementById('themeToggle');
    if (!button) return;
    const isLight = document.body.classList.contains('light-theme');
    button.textContent = isLight ? '🌙' : '☀️';
    button.title = isLight ? 'تشغيل الوضع الليلي' : 'تشغيل الوضع النهاري';
}

function updateNavAuth() {
    const loginLink = document.getElementById('loginNav');
    const logoutBtn = document.getElementById('logoutBtn');
    const auth = typeof getAuth === 'function' ? getAuth() : null;

    if (loginLink) {
        loginLink.style.display = auth && auth.email ? 'none' : 'inline-block';
    }
    if (logoutBtn) {
        logoutBtn.style.display = auth && auth.email ? 'inline-block' : 'none';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    createNavbar();
    initTheme();
});

window.addEventListener('storage', (event) => {
    if (event.key === 'siteTheme') {
        setTheme(event.newValue || 'dark');
    }
});
