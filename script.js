/**
 * ============================================================
 * Priyanshi Mishra — Portfolio Website
 * script.js — Core Functionality
 * ============================================================
 *
 * Modules:
 *   1. Page Loading Animation
 *   2. Theme Toggle (Dark/Light) with localStorage
 *   3. Navbar Scroll Effect
 *   4. Mobile Hamburger Menu
 *   5. Smooth Scroll for Anchor Links
 *   6. Scroll-triggered Fade-in Animations (IntersectionObserver)
 *   7. Contact Form Validation
 *
 * ============================================================
 */

"use strict";

/* ──────────────────────────────────────────────────────────────
   1. PAGE LOADING ANIMATION
   Fades out the loading overlay once the page is fully loaded.
   ────────────────────────────────────────────────────────────── */

(function initLoadingAnimation() {
  const overlay = document.getElementById("loading-overlay");
  if (!overlay) return;

  window.addEventListener("load", () => {
    // Small delay so the user glimpses the brand animation
    setTimeout(() => {
      overlay.classList.add("hidden");
      // Remove from DOM after transition completes
      overlay.addEventListener("transitionend", () => {
        overlay.remove();
      });
    }, 600);
  });
})();


/* ──────────────────────────────────────────────────────────────
   2. THEME TOGGLE
   Persists user preference in localStorage.
   Falls back to prefers-color-scheme on first visit.
   ────────────────────────────────────────────────────────────── */

(function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");
  if (!toggle) return;

  /**
   * Apply theme to document and update toggle icons.
   * @param {"dark"|"light"} theme
   */
  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      if (sunIcon) sunIcon.style.display = "none";
      if (moonIcon) moonIcon.style.display = "block";
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (sunIcon) sunIcon.style.display = "block";
      if (moonIcon) moonIcon.style.display = "none";
    }
  }

  // Determine initial theme
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // Respect system preference; default to dark
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  // Toggle on click
  toggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  });
})();


/* ──────────────────────────────────────────────────────────────
   3. NAVBAR SCROLL EFFECT
   Adds `.scrolled` class to navbar when page is scrolled,
   triggering background and shadow via CSS.
   ────────────────────────────────────────────────────────────── */

(function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const SCROLL_THRESHOLD = 50;

  function handleScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // Use passive listener for scroll performance
  window.addEventListener("scroll", handleScroll, { passive: true });
  // Run once on load in case page is already scrolled
  handleScroll();
})();


/* ──────────────────────────────────────────────────────────────
   4. MOBILE HAMBURGER MENU
   Toggles mobile navigation overlay.
   Closes menu when a link is clicked or Escape is pressed.
   ────────────────────────────────────────────────────────────── */

(function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const navbar = document.getElementById("navbar");
  if (!hamburger || !navLinks) return;

  function openMenu() {
    hamburger.classList.add("active");
    navLinks.classList.add("mobile-menu-open");
    if (navbar) navbar.classList.add("mobile-menu-open");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    navLinks.classList.remove("mobile-menu-open");
    if (navbar) navbar.classList.remove("mobile-menu-open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.contains("mobile-menu-open");
    isOpen ? closeMenu() : openMenu();
  });

  // Close on nav link click
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Close when clicking outside the menu
  document.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("mobile-menu-open") &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });
})();


/* ──────────────────────────────────────────────────────────────
   5. SMOOTH SCROLL FOR ANCHOR LINKS
   Handles clicks on any anchor link pointing to an ID on the
   page. Offsets for fixed navbar height.
   ────────────────────────────────────────────────────────────── */

(function initSmoothScroll() {
  const NAVBAR_HEIGHT = 80;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const targetPosition =
        targetEl.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Update URL hash without jumping
      history.pushState(null, null, targetId);
    });
  });
})();


/* ──────────────────────────────────────────────────────────────
   6. SCROLL-TRIGGERED FADE-IN ANIMATIONS
   Uses IntersectionObserver for performant scroll animations.
   Respects `prefers-reduced-motion` accessibility setting.
   ────────────────────────────────────────────────────────────── */

(function initScrollAnimations() {
  // Skip if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // Make all fade-in elements immediately visible
    document.querySelectorAll(".fade-in").forEach((el) => {
      el.classList.add("visible");
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -60px 0px",
    threshold: 0.1,
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Stop observing once visible (animate only once)
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with .fade-in class
  document.querySelectorAll(".fade-in").forEach((el) => {
    fadeInObserver.observe(el);
  });
})();


/* ──────────────────────────────────────────────────────────────
   7. CONTACT FORM VALIDATION
   Client-side validation with inline error messages.
   Handles form submission to Formspree (or shows success).
   ────────────────────────────────────────────────────────────── */

(function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const fields = {
    name: {
      el: document.getElementById("contact-name"),
      error: document.getElementById("name-error"),
      validate: (val) => {
        if (!val.trim()) return "Please enter your name.";
        if (val.trim().length < 2) return "Name must be at least 2 characters.";
        return "";
      },
    },
    email: {
      el: document.getElementById("contact-email"),
      error: document.getElementById("email-error"),
      validate: (val) => {
        if (!val.trim()) return "Please enter your email.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val.trim())) return "Please enter a valid email address.";
        return "";
      },
    },
    subject: {
      el: document.getElementById("contact-subject"),
      error: document.getElementById("subject-error"),
      validate: (val) => {
        if (!val.trim()) return "Please enter a subject.";
        if (val.trim().length < 3) return "Subject must be at least 3 characters.";
        return "";
      },
    },
    message: {
      el: document.getElementById("contact-message"),
      error: document.getElementById("message-error"),
      validate: (val) => {
        if (!val.trim()) return "Please enter your message.";
        if (val.trim().length < 10) return "Message must be at least 10 characters.";
        return "";
      },
    },
  };

  /**
   * Validate a single field and show/hide error message.
   * @param {object} field — field config object
   * @returns {boolean} — true if valid
   */
  function validateField(field) {
    if (!field.el || !field.error) return true;
    const errorMsg = field.validate(field.el.value);
    if (errorMsg) {
      field.error.textContent = errorMsg;
      field.error.style.display = "block";
      field.el.classList.add("invalid");
      field.el.setAttribute("aria-invalid", "true");
      return false;
    } else {
      field.error.textContent = "";
      field.error.style.display = "none";
      field.el.classList.remove("invalid");
      field.el.removeAttribute("aria-invalid");
      return true;
    }
  }

  // Validate on blur (when user leaves a field)
  Object.values(fields).forEach((field) => {
    if (field.el) {
      field.el.addEventListener("blur", () => validateField(field));
      // Clear error on input
      field.el.addEventListener("input", () => {
        if (field.el.classList.contains("invalid")) {
          validateField(field);
        }
      });
    }
  });

  // Handle form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    Object.values(fields).forEach((field) => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) return;

    const submitBtn = form.querySelector(".form-submit");
    const successMsg = document.getElementById("form-success");

    // Disable button and show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    try {
      // Attempt to submit to Formspree
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        // Show success message
        if (successMsg) {
          successMsg.textContent = "Thank you! Your message has been sent successfully.";
          successMsg.style.display = "block";
        }
        form.reset();
        // Clear all error states
        Object.values(fields).forEach((field) => {
          if (field.el) field.el.classList.remove("invalid");
          if (field.error) field.error.style.display = "none";
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      // Show a user-friendly error
      if (successMsg) {
        successMsg.textContent =
          "Something went wrong. Please email me directly at 24priyanshimishra@gmail.com";
        successMsg.style.display = "block";
        successMsg.style.color = "var(--color-secondary)";
      }
    } finally {
      // Re-enable button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }

      // Hide success/error message after 5 seconds
      const successEl = document.getElementById("form-success");
      if (successEl) {
        setTimeout(() => {
          successEl.style.display = "none";
          successEl.style.color = "";
        }, 5000);
      }
    }
  });
})();


/* ──────────────────────────────────────────────────────────────
   8. ACTIVE NAV LINK HIGHLIGHTING
   Highlights the nav link corresponding to the currently
   visible section using IntersectionObserver.
   ────────────────────────────────────────────────────────────── */

(function initActiveNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
})();
