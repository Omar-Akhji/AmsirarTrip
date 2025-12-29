# AmsirarTrip - Morocco Travel & Tours Website

A modern Next.js 16 application for a Morocco travel and tourism website, featuring desert tours, city excursions, and adventure camping experiences.

## 🚀 Features

- **Server-Side Rendering**: Next.js 16.1 with App Router and Turbopack
- **Internationalization**: Multi-language support (English, French, German, Spanish) with next-intl
- **Responsive Design**: Mobile-first design with Tailwind CSS v4
- **Feature-Based Architecture**: Modular feature folders for scalability
- **Image Galleries**: Dynamic header image rotation and photo galleries
- **Tour Listings**: Featured tours with detailed information
- **Booking System**: Integrated booking forms with reCAPTCHA protection
- **API Routes**: Built-in Next.js API routes for email notifications
- **Modern React**: Built with React 19.2

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1 with App Router & Turbopack
- **Frontend**: React 19.2
- **Styling**: Tailwind CSS v4.1 with PostCSS
- **Internationalization**: next-intl v4.6 for multi-language support
- **Animations**: Framer Motion v12
- **API**: Next.js API Routes with Nodemailer
- **Security**: DOMPurify, Zod v4 validation, reCAPTCHA v2
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Montserrat, Yellowtail)
- **Date Handling**: date-fns v4, react-day-picker v9

## 📁 Project Structure

```
├── .github/                      # GitHub workflows & Copilot instructions
├── scripts/                      # Build & utility scripts
│   ├── convert-locales.js        # Locale conversion utility
│   ├── purge-css.cjs             # CSS purging script
│   └── verify-security.mjs       # Security verification
├── types/                        # Global TypeScript declarations
│   └── global.d.ts               # Global type definitions
│
src/
├── app/                          # Next.js App Router
│   ├── error.tsx                 # Global error boundary
│   ├── globals.css               # Global styles (Tailwind)
│   ├── sitemap.ts                # Dynamic sitemap generation
│   ├── [locale]/                 # Internationalized routes
│   │   ├── layout.tsx            # Root layout with providers
│   │   ├── page.tsx              # Home page
│   │   ├── about/page.tsx        # About page
│   │   ├── contact/page.tsx      # Contact page
│   │   ├── tours/
│   │   │   ├── page.tsx          # Tours listing
│   │   │   └── [slug]/page.tsx   # Dynamic tour details
│   │   └── excursions/
│   │       ├── page.tsx          # Excursions listing
│   │       └── [slug]/page.tsx   # Dynamic excursion details
│   └── api/                      # API routes
│       ├── booking/route.ts      # Booking submissions
│       ├── contact/route.ts      # Contact form handler
│       ├── health/route.ts       # Health check endpoint
│       └── newsletter/route.ts   # Newsletter signup
│
├── features/                     # Feature-based modules
│   ├── about/                    # About page feature
│   │   ├── components/
│   │   │   └── AboutView.tsx
│   │   ├── data/index.ts
│   │   ├── types/index.ts
│   │   └── index.ts
│   ├── booking/                  # Booking system
│   │   ├── components/
│   │   │   └── BookingForm.tsx
│   │   ├── data/index.ts
│   │   ├── types/index.ts
│   │   └── index.ts
│   ├── contact/                  # Contact feature
│   │   ├── components/
│   │   │   ├── ContactFormTailwind.tsx
│   │   │   └── ContactView.tsx
│   │   ├── data/index.ts
│   │   ├── hooks/                # (empty - reserved)
│   │   ├── types/index.ts
│   │   └── index.ts
│   ├── excursions/               # Excursions feature
│   │   ├── components/
│   │   │   ├── ExcursionLayout.tsx
│   │   │   └── ExcursionsView.tsx
│   │   ├── data/
│   │   │   ├── excursionsData.ts
│   │   │   ├── excursionsMetadata.ts
│   │   │   └── index.ts
│   │   ├── hooks/                # (empty - reserved)
│   │   ├── types/index.ts
│   │   └── index.ts
│   ├── home/                     # Homepage feature
│   │   ├── components/
│   │   │   ├── FeaturedTours.tsx
│   │   │   ├── HomeView.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── VideoSection.tsx
│   │   │   └── index.ts
│   │   ├── data/index.ts
│   │   ├── types/index.ts
│   │   └── index.ts
│   └── tours/                    # Tours feature
│       ├── components/
│       │   ├── TourLayout.tsx
│       │   └── ToursView.tsx
│       ├── data/
│       │   ├── toursData.ts
│       │   ├── toursMetadata.ts
│       │   └── index.ts
│       ├── types/index.ts
│       └── index.ts
│
├── shared/                       # Shared/reusable code
│   ├── layout/                   # Layout components
│   │   ├── Footer.tsx
│   │   ├── Loader.tsx
│   │   ├── Navbar.tsx
│   │   ├── NavigationProgress.tsx
│   │   └── index.ts
│   ├── ui/                       # UI primitives
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── calendar-enhanced.tsx
│   │   ├── CountUp.tsx
│   │   ├── input.tsx
│   │   ├── Loading.tsx
│   │   ├── popover.tsx
│   │   └── index.ts
│   └── utilities/
│       ├── ErrorBoundary.tsx
│       └── index.ts
│
├── lib/                          # Core utilities & config
│   ├── api-client.ts             # API client utilities
│   ├── api-utils.ts              # API helpers & rate limiting
│   ├── client-env.ts             # Client-safe env variables
│   ├── env.ts                    # Server environment variables
│   ├── metadata.ts               # SEO metadata generator
│   ├── sanitize.ts               # DOMPurify sanitization
│   ├── schemas.ts                # Zod validation schemas
│   ├── security-headers.ts       # Security headers config
│   ├── structuredData.ts         # JSON-LD structured data
│   ├── utils.ts                  # General utilities (cn, etc.)
│   ├── validation.ts             # Form validation helpers
│   ├── hooks/
│   │   ├── index.ts
│   │   ├── useHeaderRotator.ts
│   │   ├── useNavbar.ts
│   │   └── useTranslation.ts
│   └── constants/
│       ├── routes.ts
│       └── translations.ts
│
├── i18n/                         # Internationalization config
│   ├── request.ts                # next-intl request config
│   └── routing.ts                # Locale routing config
│
└── proxy.ts                      # Middleware proxy config

public/
├── robots.txt                    # SEO robots file
├── site.webmanifest              # PWA manifest
├── horse-head.svg                # Logo asset
├── fonts/                        # Custom fonts (empty)
├── icons/                        # SVG icons (20+ icons)
├── images/                       # Static images
│   ├── backgrounds/              # Background images
│   ├── Excursions/               # Excursion images
│   ├── Header/                   # Header carousel images
│   ├── Home/                     # Homepage images
│   ├── Tours/                    # Tour images
│   └── *.webp                    # Various WebP images
├── locales/                      # Translation files
│   ├── en/common.json
│   ├── fr/common.json
│   ├── de/common.json
│   └── es/common.json
└── videos/
    └── Morocco-Video.mp4         # Homepage video
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v20+)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Omar-Akhji/AmsirarTrip.git
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

### Docker Deployment

```bash
# Build and run with Docker
docker compose build
docker compose up -d
```

### Development Commands

```bash
npm run dev          # Start Next.js dev server (Turbopack)
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run lint:css     # Run Stylelint
npm run lint:css:fix # Fix Stylelint issues
npm run type-check   # TypeScript type checking
npm run format       # Format with Prettier
npm run format:check # Check formatting
npm run verify:local # Verify security locally
npm run verify:prod  # Verify production security
```

## 🎨 Feature Module Pattern

Each feature follows this structure:

```
features/tours/
├── components/
│   ├── TourLayout.tsx      # Tour detail layout
│   └── ToursView.tsx       # Tours listing view
├── data/
│   ├── toursData.ts        # Tour definitions with i18n keys
│   ├── toursMetadata.ts    # SEO metadata for tours
│   └── index.ts            # Barrel export
├── types/
│   └── index.ts            # TypeScript interfaces
└── index.ts                # Feature barrel export
```

Import features using barrel exports:

```typescript
import { toursData, Tour } from "@/features/tours";
import { ExcursionLayout, excursionsData } from "@/features/excursions";
```

## 📋 Development Guidelines

### Import Aliases

Use path aliases for clean imports:

```typescript
// ✅ Correct
import { Button } from "@/shared/ui/button";
import { toursData } from "@/features/tours";
import { sanitizeString } from "@/lib/api-utils";

// ❌ Wrong
import { Button } from "../../../shared/ui/button";
```

### Asset Paths

Always use absolute paths starting with `/`:

```jsx
// ✅ Correct
<img src="/images/tour-1.jpg" alt="Tour" />

// ❌ Wrong
<img src="../images/tour-1.jpg" alt="Tour" />
```

## 📱 Responsive Design

The site is fully responsive with breakpoints:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1250px

## 🌍 Internationalization

Supported languages:

- 🇬🇧 English (en)
- 🇫🇷 French (fr)
- 🇩🇪 German (de)
- 🇪🇸 Spanish (es)

Translation files are in `public/locales/{lang}/common.json`.

## 🔒 Security

This application implements comprehensive security measures:

- ✅ **Input Validation**: DOMPurify sanitization + Zod schemas
- ✅ **XSS Protection**: Content Security Policy headers
- ✅ **Rate Limiting**: IP-based rate limiting with auto-blocking
- ✅ **reCAPTCHA v2**: Bot protection on all forms
- ✅ **Email Security**: Secure Nodemailer with Gmail
- ✅ **Environment Variables**: Validated and type-safe

See [`SECURITY.md`](./SECURITY.md) for the comprehensive security guide.

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for Morocco travel enthusiasts
