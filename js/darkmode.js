/* ============================================================
   DARK MODE + SETTINGS MENU
   Paste this at the very BOTTOM of js/script.js
   ============================================================ */

// ── Theme (dark/light mode) ───────────────────────────────
const THEME_KEY = 'mi-portfolio-theme';

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  // Update checkmarks in dropdown
  document.querySelectorAll('.settings-item[data-theme]').forEach(item => {
    item.classList.toggle('active', item.dataset.theme === theme);
  });
  // Update mobile toggle icon
  const mobileBtn = document.getElementById('mobileThemeBtn');
  if (mobileBtn) {
    mobileBtn.innerHTML = theme === 'dark'
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
    mobileBtn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const current = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// Apply saved theme immediately on load
const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
applyTheme(savedTheme);

// ── Settings dropdown ─────────────────────────────────────
const settingsBtn      = document.getElementById('settingsBtn');
const settingsDropdown = document.getElementById('settingsDropdown');

if (settingsBtn && settingsDropdown) {
  // Toggle open/close
  settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsDropdown.classList.toggle('open');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!settingsBtn.contains(e.target)) {
      settingsDropdown.classList.remove('open');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') settingsDropdown.classList.remove('open');
  });

  // Theme option clicks
  settingsDropdown.querySelectorAll('.settings-item[data-theme]').forEach(item => {
    item.addEventListener('click', () => {
      applyTheme(item.dataset.theme);
      settingsDropdown.classList.remove('open');
    });
  });

  // Help option
  const helpItem = document.getElementById('helpItem');
  if (helpItem) {
    helpItem.addEventListener('click', () => {
      settingsDropdown.classList.remove('open');
      alert('Portfolio of Mohaiminul Islam\n\nNavigate using the top navbar links.\nClick "View Project" on any project card for details.\nUse Light/Dark Mode to switch themes.\n\nContact: mohaiminul118@gmail.com');
    });
  }
}

// ── Mobile theme toggle button ────────────────────────────
const mobileThemeBtn = document.getElementById('mobileThemeBtn');
if (mobileThemeBtn) {
  mobileThemeBtn.addEventListener('click', toggleTheme);
}