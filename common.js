const siteRoutes = [
    { href: 'index.html', label: 'الرئيسية' },
    { href: 'ai.html', label: 'الذكاء الاصطناعي' },
    { href: 'comments.html', label: 'تعليقاتكم' },
    { href: 'favorites.html', label: 'المفضلات', id: 'favoritesNav' },
    { href: 'login.html', label: 'تسجيل الدخول', id: 'loginNav' },
    { href: 'about.html', label: 'من أنا' }
];

function getCurrentPath() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    if (!filename || filename === '') return 'index.html';
    return filename;
}

function buildNavLink(route) {
    const current = getCurrentPath();
    const isActive = current === route.href || current === route.href.replace('.html', '');
    return `<a href="${route.href}" ${route.id ? `id="${route.id}"` : ''} class="${isActive ? 'active' : ''}">${route.label}</a>`;
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
    initTheme();
    updateNavAuth();
}

function initTheme() {
    const stored = localStorage.getItem('siteTheme');
    setTheme(stored || 'dark');
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
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const isLight = document.body.classList.contains('light-theme');
    btn.textContent = isLight ? '🌙' : '☀️';
    btn.title = isLight ? 'تشغيل الوضع الليلي' : 'تشغيل الوضع النهاري';
}

window.addEventListener('DOMContentLoaded', () => {
    createNavbar();
    initTheme();
});

window.addEventListener('storage', (e) => {
    if (e.key === 'siteTheme') {
        setTheme(e.newValue || 'dark');
    }
});

window.addEventListener('keydown', (e) => {
    try {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 't') {
            const active = document.activeElement;
            if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) {
                return;
            }
            e.preventDefault();
            if (typeof toggleTheme === 'function') toggleTheme();
        }
    } catch (err) {
        // ignore
    }
});