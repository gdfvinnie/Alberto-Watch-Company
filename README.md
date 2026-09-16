# Alberto Watch Company — Luxury Watch SPA

A complete, responsive **Single-Page Application (SPA)** for a fictional luxury watch retailer:
Alberto Watch Company — luxury retail, professional watch repair, appraisal and first-class
customer care. Built for an academic front-end development project.

> ⚠️ All business details, brands' model names, prices and specifications are **fictional sample
> data** created for demonstration only. No real inventory is represented.

## ✨ Features

- **True SPA navigation** — 9 sections (Home, Products, Technology, Store Locator, Support,
  Gallery, About Us, Contact Us, Sitemap) with smooth scrolling, scroll-spy active highlighting,
  hover underline/glow, and deep-linking via `#hash` URLs — no page reloads.
- **24-sample product catalogue** loaded dynamically from a structured data module
  (`src/data/products.js`) across 6 categories: Vintage, Luxury, Smart Watches, Sport, Everyday,
  Classic.
- **Dynamic filtering** — click a category card to expand its collection inline with an animated
  transition; click again to close.
- **Product details modal** — full specifications (movement, case, strap, water resistance,
  availability, model, category), fade-in animation, focus trap, closes via button / × / overlay
  click / Escape.
- **Full price list** — responsive table of all 24 watches (mobile: collapses into stacked cards).
- **Technology** — six animated explainer cards (Quartz, Automatic, Eco-Drive, Smartwatch, Water
  Resistance, Mechanical Precision).
- **Store Locator** — three Nigerian stores on a **real interactive Leaflet + OpenStreetMap map**
  centred on Nigeria, with grey markers, click-to-open detail popups (address, phone, hours),
  card↔marker syncing and **HTML5 Geolocation** ("Find My Location") with friendly
  denied/unavailable fallbacks.
- **Support** — six service cards (pre-fill the form) plus a fully validated request form with
  success simulation.
- **Gallery** — 18 images, category filters, and a lightbox with prev/next, keyboard navigation
  (←/→/Escape) and caption.
- **About** — story, service list and animated statistics counters (20+ years, 5,000+ watches,
  2,500+ customers, 15+ brands).
- **Contact** — company details and a validated contact form with success notification.
- **Visitor counter** — persistent front-end counter beside the logo (localStorage).
- **DateTime ticker** — fixed bottom ticker with live date, time and location (geolocation-aware)
  scrolling continuously right-to-left.
- **Accessibility** — semantic HTML, ARIA attributes, focus-visible styles, focus traps, keyboard
  modals, form labels, alt text on every image, skip link, reduced-motion support.
- **Responsive** — 1920 / 1440 / 1366 / 1024 / 768 / 480 / 390 / 375 px breakpoints, hamburger
  dropdown navigation, stacked cards, horizontally scrollable table, touch-friendly controls.
- **Visual design** — clean **white + grey luxury-minimalist aesthetic**: white main background,
  very-light-grey secondary sections, white cards with subtle grey borders and soft shadows,
  charcoal text, understated **grey hover/active states** on every interactive element, Merriweather
  serif logotype (perfectly centred at every breakpoint) and isolated watch photography presented
  catalogue-style with `object-fit: contain`.

## 🛠 Technologies

| Layer      | Choice |
|------------|--------|
| UI         | React 18 (function components + hooks) |
| Styling    | Custom CSS3 (`src/styles.css`) + Bootstrap 5 CSS grid/utilities |
| Build      | Vite 5 |
| Data       | Structured JSON-style JS module (`src/data/products.js`) — real models, references and publicly documented specifications |
| Mapping    | Leaflet 1.9 + OpenStreetMap raster tiles (no API key required) |
| APIs       | HTML5 Geolocation, IntersectionObserver, localStorage |
| Fonts      | Google Fonts — **Merriweather** (brand/serif) + Montserrat (sans) |
| Imagery    | Real product photography from Wikimedia Commons (public domain / CC-BY / CC-BY-SA) — see `IMAGE-CREDITS.md` |

All imagery is real photography served locally from `/public/img` — zero broken images. The two
external assets (Google Fonts, OpenStreetMap map tiles) degrade gracefully offline: the site falls
back to system serif/sans fonts, and the map keeps its markers, popups and geolocation features on
a neutral background until connectivity returns. Small UI icons remain inline SVG.

## 🚀 Installation & Running

Requires **Node.js 18+** and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (with hot reload)
npm run dev
# → open the printed local URL (default http://localhost:5173)

# 3. Production build + local preview
npm run build
npm run preview
# → http://localhost:4173
```

### Project structure

```
alberto-watch-company/
├── index.html                  # SPA entry, fonts, favicon
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg             # Red-crown watch favicon
│   └── img/                    # Real watch photography (42 licensed files) + CREDITS.json
└── src/
    ├── main.jsx                # React bootstrap, imports Bootstrap CSS
    ├── App.jsx                 # Section layout + scroll-spy + navigation
    ├── styles.css              # Complete luxury theme (all styling lives here)
    ├── data/
    │   ├── products.js         # 24-watch catalogue of real models + 6 categories
    │   └── imageCredits.json   # Author + licence for every photograph
    ├── art/
    │   └── artMap.jsx          # <Photo> renderer (img with graceful placeholder fallback)
    ├── hooks/
    │   └── hooks.js            # useReveal, useCountUp, useGeolocation
    └── components/
        ├── Header.jsx          # Logo, nav, visitor counter, hamburger
        ├── Hero.jsx            # Home / hero with CTAs
        ├── Products.jsx        # Categories, filter toolbar, grid, modal, price list
        ├── Technology.jsx      # 6 technology cards
        ├── StoreLocator.jsx    # Stores + Leaflet/OSM Nigeria map + geolocation
        ├── Support.jsx         # Services + validated request form
        ├── Gallery.jsx         # Filterable photo grid + lightbox
        ├── About.jsx           # Story + animated counters
        ├── Contact.jsx         # Details + validated contact form
        ├── Sitemap.jsx         # Working sitemap links
        ├── Footer.jsx          # Footer with legal demo links
        ├── DateTimeTicker.jsx  # Bottom date/time/location ticker
        └── WatchArt.jsx        # Small SVG UI icons
```

## 🗂 How the JSON data works

Product data lives in **`src/data/products.js`** as a JSON-structured array. Each record describes a
real, publicly documented watch and contains: `id, brand, name, reference, category, price,
movement, caseSize, caseMaterial, dial, bezel, bracelet, crystal, waterResistance, year,
description, availability, condition, image`.

- **Adding a product:** append an object to `products` — it automatically appears in its category
  collection, the main catalogue grid, the filter toolbar counts **and** the price list.
- **Adding a category:** add to `categories`; a card is rendered automatically.
- **Images:** the `image` field is a path under `/public/img` (e.g. `/img/submariner.jpg`). If a
  file is ever missing, `<Photo>` renders a neutral placeholder instead of a broken image.
- **Product accuracy:** model names, reference numbers and specifications were researched from
  public sources (including Wikipedia and retailer reference material such as Bob's Watches) and
  cross-checked against the actual photograph used for each listing. Prices are **indicative sample
  values** for this demonstration and are marked as such in the UI.

## 📷 Photography licensing & disclaimer

All product and gallery photography is real (no AI-generated imagery) and comes from **Wikimedia
Commons** under public-domain, CC0, CC-BY or CC-BY-SA licences. Full attribution — file title,
author and licence — is recorded in `public/img/CREDITS.json`, `src/data/imageCredits.json` and the
human-readable `IMAGE-CREDITS.md`.

**Academic disclaimer:** Alberto Watch Company is a fictional storefront created for a school
project. It is **not** an authorised dealer of, and is not affiliated with, Rolex, Omega, Citizen,
Seiko, Casio, Garmin, Apple, Samsung, Bulova, Orient, Tissot, Michael Kors, Timex, Vostok, Bob's
Watches or any other brand. All trademarks belong to their respective owners and are used solely
for identification in an educational context. Product availability and pricing are illustrative and
subject to change. This disclaimer is also shown in the product details modal within the app.

## 👁 How the visitor counter works

Implemented in `src/components/Header.jsx` with no backend:

1. On first visit, a base count of **1245** is read (or initialised) from
   `localStorage['awc_visitors']`.
2. Every page load/refresh increments the stored value by 1 and displays it zero-padded to 6
   digits: `001246`, `001247`, …
3. If localStorage is unavailable (private browsing), it falls back to an in-memory count for the
   session. The count is per-browser — an academic simulation of a persistent server counter.

## 📍 How geolocation works

Two independent, graceful usages of the **HTML5 Geolocation API**:

- **Store Locator → "Find My Location"** (`src/hooks/hooks.js` → `useGeolocation`): explicit user
  action → `navigator.geolocation.getCurrentPosition`. On success the raw coordinates are shown
  (no reverse-geocoding API key is configured, so coordinates are displayed directly). On denial,
  timeout or unsupported browsers a **friendly message** is displayed and the site keeps working.
- **DateTime ticker** (`src/components/DateTimeTicker.jsx`): one automatic attempt per session;
  coordinates are matched against the three demo store cities and displayed as a city name when
  they fall within range; otherwise raw coordinates are shown. **If permission is denied or
  geolocation is unavailable, it displays `Location: Location unavailable`** — the ticker keeps
  running with live date and time.

No location data ever leaves the browser.

## 🌐 Browser requirements

Chrome, Edge, Firefox and Safari (latest two major versions). The site uses standards-compliant
HTML5 / CSS3 / JavaScript (ES2020) — flexbox/grid, CSS custom properties, `aspect-ratio`,
IntersectionObserver and Geolocation — all supported in current evergreen browsers.

## 📐 Assumptions

- This is a **frontend-only academic demonstration**: forms simulate submission and display a
  success message without transmitting data; the visitor counter is simulated with localStorage.
- Reverse geocoding (coordinates → city) would normally use a paid/keyed API (e.g. Nominatim,
  Google). To keep the project dependency-free it approximates the nearest demo store city from
  coordinates instead — a documented, deliberate simplification.
- Prices are in USD for international comparability; the fictional business is based in Lagos,
  Nigeria, per the project specification.
- "Privacy Policy" and "Terms & Conditions" in the footer are demonstration links (they navigate
  to the top of the page) as permitted by the spec for a project without legal pages.
- The brand names mentioned in the brief (Rolex, Michael Kors, Citizen, Bulova) are presented as
  real product listings researched from public documentation; the store itself, its inventory and
  its prices are fictional. All imagery is freely licensed photography (see the licensing section
  above), not official brand marketing material.
- Helper scripts used to source imagery and licences live in `scripts/` (Wikimedia Commons API);
  they are not needed to run the site and are provided for transparency and reproducibility.

## Admin Panel

A private, owner-only admin panel is built into the SPA at `#/admin`
(e.g. `http://localhost:5173/#/admin`). It is not linked from the public
navigation, so normal visitors never see it.

### First-run setup

Opening `#/admin` on a fresh browser shows a one-time **owner setup**
screen: choose your username/email and password. The account lives only
in this browser's localStorage — no credentials exist anywhere in the
source code.

### Security model

- Passwords are stored **only** as salted SHA-256 hashes
  (`awc_admin_account`); the plaintext is never persisted.
- Sessions are random 256-bit tokens with a hard expiry
  (default 30 minutes), auto sign-out on expiry, and a logout button.
- Brute-force protection: 5 failed attempts locks sign-in for 5 minutes.
- Password reset via the one-time recovery code shown at setup, plus
  in-panel password change.
- This is a client-side academic demo: it guards the UI, not a server.
  For a production deployment, move auth behind a real backend.

### What you can edit

Hero text/images/CTAs, brand strip, the full product catalogue
(add/remove/reorder/edit, 30+ fields per watch), About, Technology,
Services, Gallery, Stores (with map coordinates), Contact info, site
settings (nav labels, disclaimer, ticker text), and password/security.

### Preview & publish

Edits save to a draft. **Preview changes** shows the draft on the live
site (with a banner, only visible to you). **Publish** replaces the
public content instantly; **Discard draft** reverts. A confirmation
modal guards publishing. The Backup tab exports/imports all content as
JSON and can reset to defaults.
