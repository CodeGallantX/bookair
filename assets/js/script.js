function navigate(url) {
    window.location.href = `${url}.html`;
}



    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeSidebarBtn = document.querySelector('.close-sidebar');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const overlay = document.querySelector('.overlay');
    
    mobileMenuBtn.addEventListener('click', () => {
      mobileSidebar.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    closeSidebarBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
    
    function closeSidebar() {
      mobileSidebar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const mobileThemeToggle = document.querySelector('.mobile-theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      updateThemeIcons('dark');
    }
    
    themeToggle.addEventListener('click', toggleTheme);
    mobileThemeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTheme();
      closeSidebar();
    });
    
    function toggleTheme() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcons('light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcons('dark');
      }
    }
    
    function updateThemeIcons(theme) {
      const icons = document.querySelectorAll('.theme-toggle i, .mobile-theme-toggle i');
      icons.forEach(icon => {
        if (theme === 'dark') {
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
          document.querySelector('.mobile-theme-toggle span').textContent = 'Light Mode';
        } else {
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
          document.querySelector('.mobile-theme-toggle span').textContent = 'Dark Mode';
        }
      });
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          document.documentElement.setAttribute('data-theme', 'dark');
          updateThemeIcons('dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
          updateThemeIcons('light');
        }
      }
    });
    
    function navigate(page) {
      console.log(`Navigating to ${page}`);
      // In a real app, this would redirect to the appropriate page
    }