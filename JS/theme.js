class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle.querySelector('i');
        this.init();
    }

    init() {
        // Set initial theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);

        // Add event listener
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme); 
        this.themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);

        // Add transition effect
        document.documentElement.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    }
}

// Initialize theme manager
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});