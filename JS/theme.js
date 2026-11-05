class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle?.querySelector('i') ?? null;
        this.init();
    }

    getSavedTheme() {
        try {
            return localStorage.getItem('theme') || 'light';
        } catch (error) {
            return 'light';
        }
    }

    init() {
        this.setTheme(this.getSavedTheme());

        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    setTheme(theme) {
        const safeTheme = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', safeTheme);

        if (this.themeIcon) {
            this.themeIcon.className = safeTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        try {
            localStorage.setItem('theme', safeTheme);
        } catch (error) {
            // The theme still works for this page even when storage is unavailable.
        }

        if (this.themeToggle) {
            this.themeToggle.setAttribute('aria-label',
                safeTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
            this.themeToggle.setAttribute('aria-pressed', String(safeTheme === 'dark'));
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
