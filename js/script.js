/* ============================================================
   PORTFOLIO — script.js
   Single-page scroll, active nav, skill bars, lightbox,
   EmailJS contact form, project page back-navigation
   ============================================================ */

// ── EmailJS init ──────────────────────────────────────────
if (typeof emailjs !== 'undefined') {
  emailjs.init('K1spV-aZ9Q3p4raTC');
}

// ── On page load: check if we should scroll to a section ──
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.35s ease';

  const target = sessionStorage.getItem('scrollTo');
  if (target) {
    sessionStorage.removeItem('scrollTo');
    // Small delay so layout is ready
    setTimeout(() => scrollToSection(target), 100);
  }
});
document.body.style.opacity = '0';

// ── Scroll to section ─────────────────────────────────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navH = document.getElementById('navbar') ? document.getElementById('navbar').offsetHeight : 68;
  const top = el.getBoundingClientRect().top + window.scrollY - navH - 10;
  window.scrollTo({ top, behavior: 'smooth' });
}

// ── Hamburger / mobile menu ───────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

function closeMobileMenu() {
  if (hamburger) hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
}

// ── Navbar scroll effect ──────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveNav();
    triggerSkillBars();
  });
}

// ── Active nav link on scroll ─────────────────────────────
const sections = ['home', 'about', 'education', 'projects', 'achievements', 'skills', 'contact'];
const navLinks = document.querySelectorAll('.nav-links a[data-section]');

function updateActiveNav() {
  if (!navbar) return;
  const scrollY = window.scrollY + navbar.offsetHeight + 60;
  let current = 'home';
  sections.forEach(id => {
    const sec = document.getElementById(id);
    if (sec && sec.offsetTop <= scrollY) current = id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.dataset.section === current);
  });
}
updateActiveNav();

// ── Skill bar animation ───────────────────────────────────
let skillsTriggered = false;

function triggerSkillBars() {
  if (skillsTriggered) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    document.querySelectorAll('.skill-fill').forEach(fill => {
      setTimeout(() => { fill.style.width = fill.dataset.width + '%'; }, 200);
    });
    skillsTriggered = true;
  }
}
triggerSkillBars();

// ── Lightbox ──────────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
const lbClose = document.getElementById('lightboxClose');

if (lightbox) {
  document.querySelectorAll('.achieve-img-wrap').forEach(wrap => {
    wrap.addEventListener('click', () => {
      const img = wrap.querySelector('img');
      if (!img || wrap.classList.contains('img-placeholder')) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// ── EmailJS contact form ──────────────────────────────────
function sendMessage() {
  const nameEl = document.getElementById('userName');
  const emailEl = document.getElementById('userEmail');
  const msgEl = document.getElementById('userMessage');
  const sendBtn = document.getElementById('sendBtn');
  const successEl = document.getElementById('formSuccess');
  const errorEl = document.getElementById('formError');
  if (!nameEl) return;

  successEl.style.display = 'none';
  errorEl.style.display = 'none';

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const message = msgEl.value.trim();

  if (!name || !email || !message) {
    errorEl.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Please fill in all fields.';
    errorEl.style.display = 'flex';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorEl.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Please enter a valid email.';
    errorEl.style.display = 'flex';
    return;
  }

  sendBtn.disabled = true;
  sendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

  emailjs.send('service_924gh3j', 'template_xr9tqrg', {
    from_name: name,
    from_email: email,
    message: message,
    to_name: 'Mohaiminul Islam'
  })
    .then(() => {
      successEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message sent! I\'ll get back to you soon.';
      successEl.style.display = 'flex';
      nameEl.value = emailEl.value = msgEl.value = '';
      sendBtn.disabled = false;
      sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    })
    .catch(err => {
      console.error(err);
      errorEl.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Something went wrong. Please try again.';
      errorEl.style.display = 'flex';
      sendBtn.disabled = false;
      sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    });
}

// ── Go back to portfolio Projects section ─────────────────
// Called from ai-robot.html back button
function goBackToProjects() {
  sessionStorage.setItem('scrollTo', 'projects');
  window.location.href = 'index.html';
}