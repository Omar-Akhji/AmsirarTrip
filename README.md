# AmsirarTrip - Morocco Travel & Tours Website

A modern Next.js 15 application for a Morocco travel and tourism website, featuring desert tours, city excursions, and adventure camping experiences.

## 🚀 Features

- **Server-Side Rendering**: Next.js 15 with App Router for optimal performance
- **Internationalization**: Multi-language support (English, French, German, Spanish) with next-intl
- **Responsive Design**: Mobile-first design with Tailwind CSS v4
- **Image Galleries**: Dynamic header image rotation and photo galleries
- **Tour Listings**: Featured tours with detailed information
- **Booking System**: Integrated booking forms with reCAPTCHA protection
- **API Routes**: Built-in Next.js API routes for email notifications
- **Modern React**: Built with React 19 and React Compiler

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19 with React Compiler
- **Styling**: Tailwind CSS v4 with custom PostCSS
- **Internationalization**: next-intl for multi-language support
- **API**: Next.js API Routes with Nodemailer
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Montserrat, Yellowtail)

## 📁 Project Structure

```/
src/
├── components/
│   ├── shared/
│   │   ├── Navbar.jsx          # Navigation with hamburger menu
│   │   ├── Footer.jsx          # Site footer
│   │   ├── Preloader.jsx       # Loading animation component
│   │   └── HeaderRotator.jsx   # Hero image carousel
│   └── home/
│       ├── FeaturedTours.jsx
│       ├── ServicesSection.jsx
│       ├── TestimonialsSection.jsx
│       └── VideoSection.jsx
├── pages/
│   ├── Home.jsx
│   ├── Gallery.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Tours.jsx
│   └── Tours-pages/            # Individual tour detail pages
├── constants/
│   ├── routes.js               # Route constants
│   └── toursData.js            # Tour information
├── hooks/
│   ├── useNavbar.js            # Navbar scroll/resize effects
│   └── [other utility hooks]
└── assets/                     # CSS layers (fonts, normalize, utility, style, responsive)
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd AmsirarTrip
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual keys
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run start
```

### Development Commands

````bash
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:css     # Run Stylelint
npm run type-check   # TypeScript type checking

```bash
npm run preview
````

### Lint Code

```bash
npm run lint
```

## 🎨 Key Components

### Preloader Component

Handles loading states for images and fonts with smooth animations.

```jsx
import { Preloader } from "./components/shared";

// Automatically manages loading state based on route changes
<Preloader />;
```

### HeaderRotator Component

Creates an animated image carousel for hero sections.

```jsx
import { HeaderRotator } from "./components/shared";

<HeaderRotator
  images="/images/header-1.jpg,/images/header-2.jpg"
  interval={3000}
>
  <div className="hero-content">
    <h1>Welcome to Morocco</h1>
  </div>
</HeaderRotator>;
```

### Navbar Component

Responsive navigation with hamburger menu for mobile devices.

```jsx
import { Navbar } from "./components/shared";

<Navbar />; // Automatically handles scroll effects and mobile menu
```

## 📋 Development Guidelines

### CSS Import Order (Critical)

Maintain this exact order in `src/main.jsx`:

```javascript
import "./assets/fonts.css";
import "./assets/normalize.css";
import "./assets/utility.css";
import "./assets/style.css";
import "./assets/responsive.css";
```

### Asset Paths

Always use absolute paths starting with `/`:

```jsx
// ✅ Correct
<img src="/images/tour-1.jpg" alt="Tour" />

// ❌ Wrong - breaks on nested routes
<img src="../images/tour-1.jpg" alt="Tour" />
```

### Route Constants

Import routes from constants instead of hardcoding:

```jsx
import { ROUTES } from './constants/routes';

// ✅ Correct
<Route path={ROUTES.HOME} element={<Home />} />

// ❌ Wrong
<Route path="/home" element={<Home />} />
```

### Component Organization

Group related components in folders with index.js exports:

```javascript
// src/components/shared/index.js
export { default as Navbar } from "./Navbar";
export { default as Footer } from "./Footer";
export { default as Preloader } from "./Preloader";
export { default as HeaderRotator } from "./HeaderRotator";
```

## 🔧 Configuration

### Styling & PostCSS pipeline

Styling is handled with Tailwind CSS v4 and a PostCSS pipeline (Tailwind + Autoprefixer). Custom CSS is in `src/styles/App.css` and `src/styles/index.scss`.

### ESLint

Configured with `eslint-config-next` in `.eslintrc.json`:

- Next.js core web vitals rules
- TypeScript error ignoring during build (temporary, see next.config.ts)
- Image optimization warnings

### Next.js Configuration

React Compiler enabled in `next.config.ts` for optimized builds. TypeScript build errors are temporarily ignored to allow builds while type issues are resolved.

## 📱 Responsive Design

The site is fully responsive with breakpoints:

- Mobile: < 768px
- Tablet: 768px - 991px
- Desktop: > 991px

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 Security

This application implements comprehensive security measures:

- ✅ **Input Validation**: All user inputs sanitized and validated
- ✅ **CSRF Protection**: Cross-site request forgery prevention
- ✅ **XSS Protection**: Content Security Policy and HTML escaping
- ✅ **Rate Limiting**: IP-based rate limiting with automatic blocking
- ✅ **reCAPTCHA v2**: Bot protection on all forms
- ✅ **Email Security**: Secure Nodemailer configuration with Gmail
- ✅ **Environment Variables**: Validated and type-safe access

**Security Documentation**:

- [`SECURITY.md`](./SECURITY.md) - Comprehensive security guide
- [`SECURITY-QUICK-REFERENCE.md`](./SECURITY-QUICK-REFERENCE.md) - Quick reference card
- [`SECURITY-AUDIT-REPORT.md`](./SECURITY-AUDIT-REPORT.md) - Full audit report
- [`HOSTINGER-DEPLOYMENT.md`](./HOSTINGER-DEPLOYMENT.md) - Secure deployment guide

**Security Rating**: B+ (Good) ✅  
**OWASP Compliance**: 10/10 ✅

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for Morocco travel enthusiasts
