# Priyanshi Mishra — Portfolio

A minimal, clean, and fully responsive personal portfolio website built with pure HTML, CSS, and JavaScript.

---

## ✨ Features

- **Minimal & Clean** design with Rose/Pink gradient palette
- **Dark / Light / Auto** (system default) colour scheme toggle
- **Smooth animations** — fade-up on load, scroll-reveal on scroll
- **Fully responsive** — mobile-first, tested from 320px upward
- **Contact form** with real-time client-side validation
- **Accessible** — semantic HTML, ARIA labels, focus management, keyboard navigation
- **SEO optimised** — meta tags, Open Graph, Twitter Card
- **Lighthouse-optimised** — minimal JS, no blocking resources, preconnected fonts
- **Dark/Light theme** persisted in `localStorage`

---

## 🗂 Project Structure

```
portfolio/
├── index.html      ← All sections: Hero, About, Skills, Experience,
│                     Projects, Research, Achievements, Contact
├── styles.css      ← All styles: tokens, components, dark mode, responsive
├── script.js       ← Loader, theme, mobile nav, scroll-reveal, form, back-to-top
└── assets/
    └── (place profile photo or any images here)
```

---

## 🚀 Quick Start

### Local development

No build tools required — it's just static files.

```bash
# Clone / download the portfolio folder, then:
cd portfolio

# Option A — Python (built-in)
python3 -m http.server 8080
# Open http://localhost:8080

# Option B — Node.js serve
npx serve .
# Open the printed URL

# Option C — VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

---

## 🌐 Deployment Options

### GitHub Pages (free, recommended)
1. Create a new repository at github.com (e.g. `priyanshimishra.github.io`).
2. Push the contents of this folder to the `main` branch.
3. Go to **Settings → Pages → Source → Deploy from branch → main / root**.
4. Your site will be live at `https://priyanshimishra.github.io` within minutes.

### Netlify (free, drag & drop)
1. Go to [netlify.com](https://netlify.com) and sign in.
2. Drag the entire `portfolio/` folder onto the dashboard.
3. Done — Netlify gives you a free URL instantly. Add a custom domain in settings.

### Vercel (free)
```bash
npx vercel
# Follow the prompts — it auto-detects a static site.
```

### Firebase Hosting (free tier)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # choose "portfolio" folder as public directory
firebase deploy
```

---

## 📬 Real Contact Form Integration

The form currently simulates a submission. To make it actually send emails:

### Option A — Formspree (easiest, free)
1. Sign up at [formspree.io](https://formspree.io).
2. Create a new form and copy your Form ID (e.g. `xabcdefg`).
3. In `script.js`, replace the `setTimeout` simulation block with:
```js
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
.then(res => res.ok ? showSuccess() : alert('Something went wrong.'))
.catch(() => alert('Network error. Please try again.'));
```

### Option B — EmailJS (client-side, no backend)
Follow the [EmailJS docs](https://www.emailjs.com/docs/sdk/installation/) to connect your Gmail.

---

## 🎨 Customisation

### Update personal details
All content is in `index.html` — no JavaScript data files. Search for the relevant section comment (e.g. `<!-- HERO -->`) and edit the HTML directly.

### Change the colour palette
Edit the CSS custom properties in `styles.css` under `:root`:
```css
--clr-primary:    #e11d48;   /* main rose */
--clr-primary-lt: #fb7185;   /* lighter rose */
--clr-accent:     #f43f5e;
--clr-gradient:   linear-gradient(135deg, #fb7185 0%, #e11d48 60%, #be123c 100%);
```

### Add a profile photo
1. Place your photo in `assets/` (e.g. `assets/priyanshi.jpg`).
2. In `index.html`, inside the `#about` section, add:
```html
<div class="about-photo">
  <img src="assets/priyanshi.jpg" alt="Priyanshi Mishra" width="360" height="360" />
</div>
```
3. Style `.about-photo img` with `border-radius: 50%` or `var(--radius-lg)`.

---

## ♿ Accessibility
- All interactive elements have `:focus-visible` rings
- ARIA roles, labels, and `aria-expanded`/`aria-hidden` managed in JS
- Form errors announced via `role="alert"` and `aria-live="polite"`
- Respects `prefers-reduced-motion` (animations disabled)
- Colour contrast meets WCAG AA standards in both light and dark modes

---

## 📄 License
© 2026 Priyanshi Mishra. All rights reserved.
