/* ============================================
   BR Life Saúde — Main JS
   ============================================ */

/* ---------- HEADER SCROLL ---------- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---------- MOBILE NAV ---------- */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});

// Close nav on link click
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---------- ACTIVE NAV LINK ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observerNav.observe(s));

/* ---------- FADE-UP ANIMATION ---------- */
const fadeElements = document.querySelectorAll(
  '.service-card, .feature-item, .contact-item, .about__card, .about__content, .hero__stats'
);

fadeElements.forEach(el => el.classList.add('fade-up'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) * 80 : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeElements.forEach(el => fadeObserver.observe(el));

/* ---------- CONTACT FORM ---------- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = contactForm.name.value.trim();
    const phone   = contactForm.phone.value.trim();
    const service = contactForm.service.value;
    const message = contactForm.message.value.trim();

    // Build WhatsApp message
    let text = `Olá! Sou ${name}.`;
    if (service) text += `\n\nServiço de interesse: *${service}*`;
    if (message) text += `\n\nMensagem: ${message}`;
    if (phone)   text += `\n\nTelefone: ${phone}`;

    const url = `https://wa.me/5542998470877?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
}

/* ---------- SMOOTH SCROLL (fallback) ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---------- HERO TYPING EFFECT (optional subtle) ---------- */
// Triggered on load
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    heroTitle.style.transition = 'opacity .8s ease .2s, transform .8s ease .2s';
    requestAnimationFrame(() => {
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    });
  }

  const heroSubtitle = document.querySelector('.hero__subtitle');
  if (heroSubtitle) {
    heroSubtitle.style.opacity = '0';
    heroSubtitle.style.transform = 'translateY(20px)';
    heroSubtitle.style.transition = 'opacity .8s ease .4s, transform .8s ease .4s';
    requestAnimationFrame(() => {
      heroSubtitle.style.opacity = '1';
      heroSubtitle.style.transform = 'translateY(0)';
    });
  }

  const heroActions = document.querySelector('.hero__actions');
  if (heroActions) {
    heroActions.style.opacity = '0';
    heroActions.style.transform = 'translateY(20px)';
    heroActions.style.transition = 'opacity .8s ease .6s, transform .8s ease .6s';
    requestAnimationFrame(() => {
      heroActions.style.opacity = '1';
      heroActions.style.transform = 'translateY(0)';
    });
  }
});
