document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const themeToggle = document.querySelector('.theme-toggle');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const toast = document.querySelector('.toast');
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const setTheme = (dark) => {
    body.classList.toggle('dark', dark);
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    document.querySelector('meta[name="theme-color"]').content = dark ? '#0b0c10' : '#f3f1eb';
  };
  setTheme(storedTheme ? storedTheme === 'dark' : prefersDark);

  themeToggle.addEventListener('click', () => {
    const dark = !body.classList.contains('dark');
    setTheme(dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  });

  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    mobileNav.hidden = true;
  };
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    menuToggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    mobileNav.hidden = open;
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });

  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 16);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.primary-nav a');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55%' });
  sections.forEach(section => navObserver.observe(section));

  let toastTimer;
  const showToast = (message) => {
    toast.querySelector('span').textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  };
  toast.querySelector('button').addEventListener('click', () => toast.classList.remove('show'));
  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast(`${value} copied to clipboard`);
    } catch {
      const input = document.createElement('textarea');
      input.value = value; input.style.position = 'fixed'; input.style.opacity = '0';
      document.body.append(input); input.select(); document.execCommand('copy'); input.remove();
      showToast(`${value} copied to clipboard`);
    }
  }));

  document.querySelector('[data-year]').textContent = new Date().getFullYear();

});
