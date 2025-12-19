# AmsirarTrip - Morocco Travel & Tours Website

A modern Next.js 16 application for a Morocco travel and tourism website, featuring desert tours, city excursions, and adventure camping experiences.

## 🚀 Features

- **Server-Side Rendering**: Next.js 16 with App Router and Turbopack
- **Internationalization**: Multi-language support (English, French, German, Spanish) with next-intl
- **Responsive Design**: Mobile-first design with Tailwind CSS v4
- **Feature-Based Architecture**: Modular feature folders for scalability
- **Image Galleries**: Dynamic header image rotation and photo galleries
- **Tour Listings**: Featured tours with detailed information
- **Booking System**: Integrated booking forms with reCAPTCHA protection
- **API Routes**: Built-in Next.js API routes for email notifications
- **Modern React**: Built with React 19

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router & Turbopack
- **Frontend**: React 19
- **Styling**: Tailwind CSS v4 with PostCSS
- **Internationalization**: next-intl for multi-language support
- **Animations**: Framer Motion
- **API**: Next.js API Routes with Nodemailer
- **Security**: DOMPurify, Zod validation, reCAPTCHA v2
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Montserrat, Yellowtail)

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Internationalized routes
│   │   ├── page.tsx              # Home page
│   │   ├── about/                # About page
│   │   ├── contact/              # Contact page
│   │   ├── tours/                # Tours listing & details
│   │   └── excursions/           # Excursions listing & details
│   └── api/                      # API routes
│       ├── booking/              # Booking submissions
│       ├── contact/              # Contact form
│       └── newsletter/           # Newsletter signup
│
├── features/                     # Feature-based modules
│   ├── about/                    # About page feature
│   │   └── components/           # About-specific components
│   ├── booking/                  # Booking system
│   │   └── components/           # Booking forms
│   ├── contact/                  # Contact feature
│   │   └── components/           # Contact forms
│   ├── excursions/               # Excursions feature
│   │   ├── components/           # Excursion components
│   │   ├── data/                 # Excursion data
│   │   ├── hooks/                # Excursion-specific hooks
│   │   ├── types/                # TypeScript types
│   │   └── index.ts              # Barrel export
│   ├── home/                     # Homepage feature
│   │   └── components/           # Home sections
│   └── tours/                    # Tours feature
│       ├── components/           # Tour components
│       ├── data/                 # Tour data (toursData.ts)
│       ├── types/                # TypeScript types
│       └── index.ts              # Barrel export
│
├── shared/                       # Shared/reusable code
│   ├── layout/                   # Layout components
│   │   ├── Navbar.tsx            # Navigation
│   │   ├── Footer.tsx            # Site footer
│   │   └── Sidebar.tsx           # Tour/Excursion sidebar
│   ├── ui/                       # UI primitives
│   │   ├── Button.tsx            # Button component
│   │   ├── Calendar.tsx          # Date picker
│   │   └── Popover.tsx           # Popover component
│   └── utilities/                # Utility components
│       └── ErrorBoundary.tsx     # Error handling
│
├── lib/                          # Core utilities & config
│   ├── api-utils.ts              # API helpers & sanitization
│   ├── schemas.ts                # Zod validation schemas
│   ├── metadata.ts               # SEO metadata
│   ├── security-headers.ts       # Security headers config
│   ├── structuredData.ts         # JSON-LD structured data
│   ├── env.ts                    # Environment variables
│   ├── hooks/                    # Custom React hooks
│   └── constants/                # App constants
│
├── i18n/                         # Internationalization config
│   └── request.ts                # next-intl configuration
│
├── components/                   # Legacy components (being migrated)
└── proxy.ts                      # Middleware proxy config

public/
├── images/                       # Static images
├── locales/                      # Translation files
│   ├── en/                       # English
│   ├── fr/                       # French
│   ├── de/                       # German
│   └── es/                       # Spanish
└── videos/                       # Video assets
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
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run lint:css     # Run Stylelint
npm run type-check   # TypeScript type checking
npm run format       # Format with Prettier
```

## 🎨 Feature Module Pattern

Each feature follows this structure:

```
features/tours/
├── components/           # Feature-specific components
│   ├── TourCard.tsx
│   └── TourLayout.tsx
├── data/                 # Feature data
│   └── toursData.ts
├── types/                # TypeScript interfaces
│   └── index.ts
└── index.ts              # Barrel export
```

Import features using barrel exports:

```typescript
import { toursData, Tour } from "@/features/tours";
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

**Security Documentation**:

- [`SECURITY.md`](./SECURITY.md) - Comprehensive security guide
- [`SECURITY-QUICK-REFERENCE.md`](./SECURITY-QUICK-REFERENCE.md) - Quick reference

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for Morocco travel enthusiasts
