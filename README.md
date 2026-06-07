# Priyanshi Mishra — Portfolio Website

A modern, minimalist portfolio website showcasing my work as a Pre-Doc Researcher and Computer Science Engineer.

## ✨ Features

- **Minimalist Clean Design** — Elegant typography, generous whitespace, coastal color palette
- **Dark/Light Mode** — Toggle between themes with automatic persistence
- **Fully Responsive** — Mobile-first design that looks great on all devices
- **Accessible** — Semantic HTML, ARIA labels, respects `prefers-reduced-motion`
- **SEO Optimized** — Meta tags, Open Graph, semantic structure
- **Smooth Animations** — Scroll-triggered fade-ins using IntersectionObserver
- **Contact Form** — Client-side validation with Formspree integration
- **Performance** — No frameworks, minimal dependencies, optimized for Lighthouse

## 🎨 Color Palette

| Token | Dark Mode | Light Mode |
|-------|-----------|------------|
| Background | `#0D1117` | `#FFF5EE` |
| Primary (Turquoise) | `#2DD4BF` | `#0D9488` |
| Secondary (Coral) | `#F4845F` | `#E8634A` |
| Text | `#FFF5EE` | `#1A1A2E` |

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML — all sections
├── styles.css          # Complete design system & responsive styles
├── script.js           # Theme toggle, animations, form validation
├── assets/             # Images, photos (add your headshot here)
│   └── profile.jpg     # (Add your photo with this filename)
├── pages/              # Reserved for future multi-page expansion
└── README.md           # You're reading it!
```

## 🚀 Quick Start

### Local Development

1. Clone or download this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio.git
   cd portfolio
   ```

2. Open `index.html` in your browser:
   - Simply double-click `index.html`, or
   - Use a local server for best results:
     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js
     npx serve .

     # Using VS Code
     # Install "Live Server" extension → Right-click index.html → "Open with Live Server"
     ```

3. Visit `http://localhost:8000` in your browser.

### Customize Content

1. **Photo:** Replace the photo placeholder in the hero section:
   - Add your headshot image to the `assets/` folder (recommended: `profile.jpg`)
   - In `index.html`, find the `.hero-image-placeholder` div and replace it with:
     ```html
     <img src="assets/profile.jpg" alt="Priyanshi Mishra" class="hero-image" loading="eager" />
     ```

2. **Social Links:** Update placeholder URLs in `index.html`:
   - Search for `linkedin.com/in/priyanshi-mishra` and replace with your actual LinkedIn URL
   - Search for `github.com/priyanshi-mishra` and replace with your actual GitHub URL
   - Search for `scholar.google.com` and replace with your Google Scholar URL
   - Search for `leetcode.com/priyanshi-mishra` and replace with your LeetCode URL

3. **Contact Form:** Set up Formspree:
   - Go to [formspree.io](https://formspree.io) and create a free account
   - Create a new form and copy your form endpoint URL
   - In `index.html`, replace `https://formspree.io/f/placeholder` with your endpoint

## 🌐 Deploying to GitHub Pages

1. Create a new GitHub repository named `portfolio` (or `your-username.github.io` for a user site).

2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to **Settings** → **Pages** in your repository
   - Under **Source**, select `main` branch and `/ (root)` folder
   - Click **Save**

4. Your site will be live at:
   - `https://YOUR_USERNAME.github.io/portfolio/` (project site)
   - `https://YOUR_USERNAME.github.io/` (if repo is named `your-username.github.io`)

5. Update the canonical URL in `index.html`:
   ```html
   <link rel="canonical" href="https://YOUR_USERNAME.github.io/portfolio/" />
   ```

## 🛠 Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Flexbox, Grid, media queries
- **Vanilla JavaScript** — No frameworks or build tools
- **Google Fonts** — Inter + Playfair Display
- **Formspree** — Contact form backend (free tier)

## 📊 Lighthouse Targets

| Metric | Target |
|--------|--------|
| Performance | 95+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

## 📝 License

© 2026 Priyanshi Mishra. All rights reserved.
