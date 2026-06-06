/**
 * Priyanshi Mishra — Portfolio Script
 * Handles: loader, theme, nav scroll/mobile, scroll-reveal, contact form, back-to-top
 * Author: Claude (generated)
 */

'use strict';

/* ============================================================
   UTILITY HELPERS
============================================================ */

/** Safely query a single element */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
/** Safely query multiple elements */
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];


/* ============================================================
   1. LOADER
============================================================ */
(function initLoader() {
  const loader = $('#loader');
  if (!loader) return;

  // Remove loader after page is ready (min 600ms for polish)
  const hide = () => {
    loader.classList.add('hidden');
    // Remove from DOM after transition so it can't interfere
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
  };

  if (document.readyState === 'complete') {
    setTimeout(hide, 300);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 600));
  }
})();


/* ============================================================
   2. THEME — Dark / Light / Auto
============================================================ */
(function initTheme() {
  const html   = document.documentElement;
  const toggle = $('#theme-toggle');
  if (!toggle) return;

  // Read stored preference (or fall back to 'auto')
  const stored = localStorage.getItem('portfolio-theme') || 'auto';
  applyTheme(stored);

  toggle.addEventListener('click', () => {
    // Cycle: auto → light → dark → auto
    const current = html.getAttribute('data-theme') || 'auto';
    const next = current === 'auto' ? 'light' : current === 'light' ? 'dark' : 'auto';
    applyTheme(next);
    localStorage.setItem('portfolio-theme', next);
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    toggle.setAttribute('aria-label',
      `Switch to ${theme === 'auto' ? 'light' : theme === 'light' ? 'dark' : 'system'} mode`
    );
  }
})();


/* ============================================================
   3. STICKY NAVIGATION — scroll shadow
============================================================ */
(function initNavScroll() {
  const header = $('#site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


/* ============================================================
   4. MOBILE MENU — hamburger toggle
============================================================ */
(function initMobileMenu() {
  const toggle = $('#menu-toggle');
  const menu   = $('#mobile-menu');
  if (!toggle || !menu) return;

  const open  = () => {
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent scroll-through
  };

  const close = () => {
    menu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.getAttribute('aria-hidden') === 'false';
    isOpen ? close() : open();
  });

  // Close on nav link click
  $$('[data-close-menu]').forEach(link => link.addEventListener('click', close));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) close();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();


/* ============================================================
   5. SCROLL REVEAL — Intersection Observer
============================================================ */
(function initScrollReveal() {
  const items = $$('.reveal');
  if (!items.length) return;

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // once is enough
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  items.forEach(el => observer.observe(el));
})();


/* ============================================================
   6. ACTIVE NAV LINK — highlight based on scroll position
============================================================ */
(function initActiveNav() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.removeAttribute('aria-current');
            if (link.getAttribute('href') === `#${id}`) {
              link.setAttribute('aria-current', 'page');
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(section => observer.observe(section));
})();


/* ============================================================
   7. CONTACT FORM VALIDATION
============================================================ */
(function initContactForm() {
  const form    = $('#contact-form');
  const success = $('#form-success');
  if (!form) return;

  /* Validation rules */
  const rules = {
    name:    { el: $('#f-name'),    errEl: $('#name-error'),    minLen: 2,  label: 'Name'    },
    email:   { el: $('#f-email'),   errEl: $('#email-error'),   type: 'email', label: 'Email' },
    subject: { el: $('#f-subject'), errEl: $('#subject-error'), minLen: 3,  label: 'Subject' },
    message: { el: $('#f-message'), errEl: $('#message-error'), minLen: 10, label: 'Message' },
  };

  /** Show an error message for a field */
  const showError = (rule, msg) => {
    rule.errEl.textContent = msg;
    rule.el.classList.add('error');
    rule.el.setAttribute('aria-invalid', 'true');
    rule.el.setAttribute('aria-describedby', rule.errEl.id);
  };

  /** Clear the error for a field */
  const clearError = (rule) => {
    rule.errEl.textContent = '';
    rule.el.classList.remove('error');
    rule.el.removeAttribute('aria-invalid');
  };

  /** Validate a single field; returns true if valid */
  const validateField = (rule) => {
    const val = rule.el.value.trim();

    if (!val) {
      showError(rule, `${rule.label} is required.`);
      return false;
    }
    if (rule.type === 'email') {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(val)) {
        showError(rule, 'Please enter a valid email address.');
        return false;
      }
    }
    if (rule.minLen && val.length < rule.minLen) {
      showError(rule, `${rule.label} must be at least ${rule.minLen} characters.`);
      return false;
    }

    clearError(rule);
    return true;
  };

  // Real-time validation on blur
  Object.values(rules).forEach(rule => {
    rule.el?.addEventListener('blur', () => validateField(rule));
    rule.el?.addEventListener('input', () => {
      if (rule.el.classList.contains('error')) validateField(rule);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const valid = Object.values(rules).map(validateField).every(Boolean);
    if (!valid) {
      // Focus first errored field for accessibility
      const firstError = form.querySelector('[aria-invalid="true"]');
      firstError?.focus();
      return;
    }

    // Simulate submission (replace with real endpoint like Formspree / EmailJS)
    const btn     = form.querySelector('[type="submit"]');
    const btnText = btn.querySelector('.btn-text');

    btn.disabled    = true;
    btnText.textContent = 'Sending…';

    // Simulate async send
    setTimeout(() => {
      form.reset();
      btn.disabled    = false;
      btnText.textContent = 'Send Message';

      // Show success banner
      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => { success.hidden = true; }, 6000);
      }
    }, 1200);

    /*
    ── REAL IMPLEMENTATION EXAMPLE (Formspree):
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name:    rules.name.el.value,
        email:   rules.email.el.value,
        subject: rules.subject.el.value,
        message: rules.message.el.value,
      })
    })
    .then(res => { if (res.ok) { ... } })
    .catch(() => { ... });
    */
  });
})();


/* ============================================================
   8. BACK TO TOP
============================================================ */
(function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.hidden = window.scrollY < 400;
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ============================================================
   9. FOOTER YEAR — auto-update copyright
============================================================ */
(function initFooterYear() {
  const el = $('#footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ============================================================
   10. SMOOTH SCROLL — anchor links that bypass nav height
============================================================ */
(function initSmoothScroll() {
  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
  ) || 68;

  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const target = $(anchor.getAttribute('href'));
    if (!target) return;

    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });
})();
