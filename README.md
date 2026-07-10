# VortexCombat Portfolio

A responsive personal portfolio for **VortexCombat**, focused on architecture, development, and ongoing creative work.

## Overview

The site is a lightweight, framework-free experience built with semantic HTML, a token-driven CSS design system, and vanilla JavaScript. Its visual direction combines editorial typography, architectural spacing, a dark glass interface, and a floating IDE-inspired hero element.

## Features

- Responsive single-page layout
- Light and dark themes with system-preference detection
- Persisted theme selection using `localStorage`
- Desktop navigation with active-section highlighting
- Accessible mobile navigation
- Floating glassmorphic code terminal in the desktop hero
- Syntax-highlighted profile code and IDE status bar
- Scroll-triggered content reveals
- Reduced-motion support
- Clipboard interactions for Discord and Epic Games
- Responsive project and contact sections
- Custom, design-system-aligned 404 page
- Semantic landmarks, skip navigation, focus states, and live status feedback

## Design system

- **Spacing:** 4px foundation with fluid responsive section spacing
- **Typography:** responsive 1.25 modular scale using `clamp()`
- **Color:** semantic tokens for paper, ink, accent, borders, and elevated surfaces
- **Surfaces:** layered dark glass, subtle borders, restrained shadows, and backdrop blur
- **Motion:** short easing-based transitions with full `prefers-reduced-motion` handling
- **Components:** reusable buttons, text links, project cards, navigation controls, and contact rows

## Project structure

```text
PortfolioWebsiteVT/
├── index.html     # Main portfolio page
├── styles.css     # Design tokens, components, layouts, and responsive styles
├── script.js      # Theme, navigation, reveal, clipboard, and UI behavior
├── 404.html       # Custom not-found page
├── favicon.png    # Site icon and social preview image
├── CNAME          # Custom domain configuration
└── README.md
```

## Run locally

From the project directory:

```powershell
python -m http.server 4173
```

Then open [http://127.0.0.1:4173](http://127.0.0.1:4173).

## Deployment

The project consists entirely of static files and can be hosted on GitHub Pages or any static web host. The included `CNAME` configures the custom domain.

## Profiles

- [GitHub](https://github.com/VortexCombat)
- [Instagram](https://www.instagram.com/devranguller/)
- [Steam](https://steamcommunity.com/id/vortexcombat/)
- [Xbox](https://www.xbox.com/play/user/TheVortex3350)

## Browser support

The site targets current versions of Chrome, Edge, Firefox, and Safari. Backdrop-filter effects degrade gracefully when unsupported.

## License

All portfolio content and visual design are © VortexCombat unless otherwise stated.
