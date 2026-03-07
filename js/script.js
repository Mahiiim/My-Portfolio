// ========== NAVBAR SCROLL EFFECT ==========
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// ========== ACTIVE NAV LINK ==========
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ========== SCROLL REVEAL (simple IntersectionObserver) ==========
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
}

// ========== TYPED TEXT EFFECT (optional for tagline) ==========
function typeEffect(el, texts, speed = 80, pause = 2000) {
  if (!el) return;
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = texts[textIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex--);
    } else {
      el.textContent = current.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === current.length + 1) {
      isDeleting = true;
      setTimeout(type, pause);
      return;
    }
    if (isDeleting && charIndex < 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
    setTimeout(type, isDeleting ? speed / 2 : speed);
  }
  type();
}

// ========== SMOOTH PAGE TRANSITIONS ==========
document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href.startsWith('http') && !href.startsWith('#')) {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.25s ease';
      setTimeout(() => {
        window.location.href = href;
      }, 250);
    }
  });
});

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.35s ease';
});

/* ============================================
   SKILLS PAGE — paste into js/script.js
   Animates progress bars when they scroll into view
   ============================================ */

function animateSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-width') + '%';
        // Small delay so the CSS transition is visible on page load
        setTimeout(() => {
          fill.style.width = targetWidth;
        }, 200);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => observer.observe(fill));
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', animateSkillBars);

/* ============================================
   ACHIEVEMENTS PAGE — paste into js/script.js
   Lightbox for image gallery
   ============================================ */

function initAchievementsLightbox() {
  const imgWraps = document.querySelectorAll('.achieve-img-wrap');
  if (!imgWraps.length) return;

  // Create lightbox element
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  lightbox.innerHTML = `
    <span class="lightbox-close"><i class="fa-solid fa-xmark"></i></span>
    <img src="" alt="Achievement image" />
  `;
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('img');
  const lbClose = lightbox.querySelector('.lightbox-close');

  // Open on image click
  imgWraps.forEach(wrap => {
    wrap.addEventListener('click', () => {
      const img = wrap.querySelector('img');
      if (!img || wrap.classList.contains('img-placeholder')) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close on X click
  lbClose.addEventListener('click', closeLightbox);

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', initAchievementsLightbox);

/* ============================================
   ACHIEVEMENTS PAGE — paste into js/script.js
   Lightbox for clicking images full-screen
   ============================================ */

function initAchievementsLightbox() {
  const imgWraps = document.querySelectorAll('.achieve-img-wrap');
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lightboxImg');
  const lbClose   = document.getElementById('lightboxClose');

  if (!imgWraps.length || !lightbox) return;

  imgWraps.forEach(wrap => {
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

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', initAchievementsLightbox);

/* ============================================
   CONTACT PAGE — paste into js/script.js
   EmailJS integration for contact form
   ============================================ */

// Initialize EmailJS with your Public Key
emailjs.init('K1spV-aZ9Q3p4raTC');

function sendMessage() {
  const nameEl    = document.getElementById('userName');
  const emailEl   = document.getElementById('userEmail');
  const msgEl     = document.getElementById('userMessage');
  const sendBtn   = document.getElementById('sendBtn');
  const successEl = document.getElementById('formSuccess');
  const errorEl   = document.getElementById('formError');

  if (!nameEl) return; // Not on contact page

  const name    = nameEl.value.trim();
  const email   = emailEl.value.trim();
  const message = msgEl.value.trim();

  // Hide previous alerts
  successEl.style.display = 'none';
  errorEl.style.display   = 'none';

  // Basic validation
  if (!name || !email || !message) {
    errorEl.textContent = '';
    errorEl.innerHTML   = '<i class="fa-solid fa-circle-exclamation"></i> Please fill in all fields.';
    errorEl.style.display = 'flex';
    return;
  }

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorEl.innerHTML     = '<i class="fa-solid fa-circle-exclamation"></i> Please enter a valid email address.';
    errorEl.style.display = 'flex';
    return;
  }

  // Disable button & show loading
  sendBtn.disabled     = true;
  sendBtn.innerHTML    = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

  // EmailJS template parameters
  // Make sure your EmailJS template uses: {{from_name}}, {{from_email}}, {{message}}
  const templateParams = {
    from_name:  name,
    from_email: email,
    message:    message,
    to_name:    'Mohaiminul Islam',
  };

  emailjs.send('service_924gh3j', 'template_xr9tqrg', templateParams)
    .then(() => {
      // Success
      successEl.innerHTML     = '<i class="fa-solid fa-circle-check"></i> Message sent successfully! I\'ll get back to you soon.';
      successEl.style.display = 'flex';
      nameEl.value    = '';
      emailEl.value   = '';
      msgEl.value     = '';
      sendBtn.disabled  = false;
      sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    })
    .catch((error) => {
      // Error
      console.error('EmailJS error:', error);
      errorEl.innerHTML     = '<i class="fa-solid fa-circle-exclamation"></i> Something went wrong. Please try again.';
      errorEl.style.display = 'flex';
      sendBtn.disabled      = false;
      sendBtn.innerHTML     = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    });
}