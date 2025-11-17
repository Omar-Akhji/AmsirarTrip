﻿## AmsirarTrip — AI Coding Agent Quickstart

- **Architecture**: React 19 + Vite SPA in `src/` communicates with Express mailer in root `server.js`; `backend/` and `docs/laravel-backend/` are legacy.
- **Entry**: `src/App.jsx` wraps `Preloader`, `Navbar`, lazy-loaded routes with `Suspense` fallback `LoadingSpinner`, `Footer`.
- **CSS**: `src/main.jsx` imports `index.css` → `assets/style.css` → `cards.css` → `responsive.css` → `navbar.css` → `excursion-single.css`; add new styles under `src/assets/`.
- **Routing**: Paths in `src/constants/routes.js`; lazy imports in `App.jsx`; use `handleNavClick` from `Navbar.jsx` for navigation to trigger preloader and scroll reset.
- **Preloader**: `src/components/shared/Preloader.jsx` waits for `header.flex[data-images]` and `#featured` images; adds `body.is-preloading`; use `LazyImage` for galleries.
- **Header rotator**: `useHeaderRotator.js` manages CSS vars `--rot-img-a/b` from `header.flex` attributes.
- **Navbar**: `useNavbar.js` toggles `navbar-cng` on scroll, sets `--navbar-height`.
- **Data**: `src/constants/toursData.js` provides `{id,image,title,description,duration,start,end,route}` with i18n keys.
- **Images**: Store in `public/images/`, reference with `/`; use `LazyImage` for loading.
- **i18n**: `src/i18n.js` loads `/locales/{lng}/common.json`; supported: en/fr/de/es.
- **Forms**: `BookingForm` and `ContactForm` require recaptcha; `VITE_RECAPTCHA_SITE_KEY` (v2), `VITE_RECAPTCHA_V3_SITE_KEY` (newsletter).
- **Email**: `server.js` uses Nodemailer with `GMAIL_USER`/`GMAIL_PASS`; endpoints `/api/booking`, `/api/newsletter`, `/api/contact`.
- **Dev**: `npm run dev` (Vite proxies `/api` to `localhost:3001`); run `node server.js` separately.
- **Build**: `npm run build` → `dist/`; `npm run preview`.
- **Lint**: `npm run lint` (ESLint); `npm run lint:css` (Stylelint).
