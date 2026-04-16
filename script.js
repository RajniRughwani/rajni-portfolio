// ===================== NAV SCROLL EFFECT =====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.borderBottomColor = 'rgba(26, 42, 69, 0.8)';
  } else {
    navbar.style.borderBottomColor = '';
  }
});

// ===================== MOBILE NAV TOGGLE =====================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===================== ACTIVE NAV LINK =====================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

// ===================== FADE IN ANIMATION =====================
const fadeEls = document.querySelectorAll(
  '.impact-card, .timeline-item, .lab-card, .skill-group, .award-card, .testimonial-card, .stat-item, .contact-card, .about-text, .about-stats'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => fadeObserver.observe(el));

// ===================== COUNTER ANIMATION =====================
function animateCounter(el, target, prefix, suffix, decimals) {
  const duration = 1800;
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    el.textContent = prefix + (decimals ? value.toFixed(1) : Math.floor(value)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const impactNums = document.querySelectorAll('.impact-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent.trim();
      if (text === '£190M') animateCounter(el, 190, '£', 'M', false);
      else if (text === '£5M') animateCounter(el, 5, '£', 'M', false);
      else if (text === '30%') animateCounter(el, 30, '', '%', false);
      else if (text === '42%') animateCounter(el, 42, '', '%', false);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
impactNums.forEach(el => counterObserver.observe(el));
