# AmsirarTrip Enhanced — Project Architecture

AmsirarTrip is a modern, high-performance web application designed for a Morocco travel and tourism agency. Built on the Next.js App Router paradigm, it leverages React 19, Tailwind CSS v4, internationalization (`next-intl`), GSAP animations, and Next.js Server Actions to deliver a premium, secure, and SEO-optimized user experience.

---

## 🏗️ Directory Tree & File Registry

The project implements a **feature-based modular architecture**, separating core layout components, global utilities, and localized router pages.

### 1. Routing & Configuration (`src/app/`)
Handles the Next.js App Router entry points, localized routing domains, global styles, and route-based configurations.

```plaintext
src/app/
├── error.tsx                       # Global React Error Boundary for route-level failures
├── global-error.tsx                # Catch-all boundary for root layout-level errors
├── globals.css                     # Tailwind CSS v4 source file containing theme variables and base layers
├── icon.png                        # App icon asset (Favicon fallback)
├── icon.svg                        # Vector source app icon
├── robots.ts                       # Dynamic Search Engine Robots protocol generator
├── sitemap.ts                      # Dynamic sitemap compiler mapping all localized paths
├── proxy.ts                        # Local client proxy configuration
├── api/
│   └── health/
│       └── route.ts                # App status health check API endpoint
└── [locale]/                       # next-intl Internationalization route wrapper
    ├── layout.tsx                  # Root localized layout (loads fonts, providers, layout shell)
    ├── loading.tsx                 # Suspense fallback component for route changes
    ├── not-found.tsx               # Custom localized 404 page
    ├── page.tsx                    # Localized homepage view
    ├── about/
    │   └── page.tsx                # Localized About page route
    ├── contact/
    │   └── page.tsx                # Localized Contact page route
    ├── excursions/
    │   ├── page.tsx                # Excursions index view
    │   └── [slug]/
    │       └── page.tsx            # Excursion details page
    ├── privacy-policy/
    │   └── page.tsx                # Privacy Policy page route
    ├── terms-of-service/
    │   └── page.tsx                # Terms of Service page route
    └── tours/
        ├── page.tsx                # Tours index view
        └── [slug]/
            └── page.tsx            # Tour details page
```

---

### 2. Feature Modules (`src/features/`)
Autonomous business domains keeping components, types, and datasets self-contained to maximize modularity.

```plaintext
src/features/
├── about/                          # About Domain
│   └── components/
│       └── AboutView.tsx           # Company overview presentation layer
├── booking/                        # Booking and Checkout Engine
│   ├── actions/
│   │   └── booking-action.ts       # Server Action processing forms & reCAPTCHA, sending confirmation mail
│   └── components/
│       ├── BookingForm.tsx         # Multistep booking checkout wizard container
│       ├── BookingFormFields.tsx   # Trip parameters selection components (guests, dates)
│       ├── BookingPersonalFields.tsx # Guest personal details inputs
│       ├── BookingSidebar.tsx      # Cart summary display
│       ├── BookingTripDetails.tsx  # Selected itinerary highlight panels
│       └── FormStatusMessages.tsx  # Error/Success display feedback alerts
├── contact/                        # Contact Forms & Info
│   ├── actions/
│   │   └── contact-action.ts       # Server Action for validation and sending customer inquiries
│   └── components/
│       ├── ContactForm.tsx         # Main interactive contact form
│       ├── ContactFormFields.tsx   # Custom style input wrappers
│       ├── ContactInfoSidebar.tsx  # Physical agency info, phone, and social hooks
│       └── ContactView.tsx         # Integrated Contact section layout
├── excursions/                     # Excursion Pages & Data
│   ├── components/
│   │   ├── ExcursionCard.tsx       # Day-trip summary card
│   │   ├── ExcursionInfo.tsx       # Excursion highlights and specs panel
│   │   ├── ExcursionLayout.tsx     # Inner detailed view layout
│   │   └── ExcursionsView.tsx      # Main excursions catalog view
│   └── data/
│       ├── excursionsData.ts       # Day-trip content registry (with translations key bindings)
│       └── excursionsMetadata.ts   # Targeted SEO meta structures
├── home/                           # Homepage Components
│   └── components/
│       ├── FeaturedTours.tsx       # High-priority tours carousel
│       ├── HomeHero.tsx            # Viewport header banner with localized call to actions
│       ├── HomeStats.tsx           # Graphic statistics overview (happy travelers, trips)
│       ├── HomeView.tsx            # Page aggregator for home route
│       ├── ServicesSection.tsx     # Agency service catalog cards
│       ├── TestimonialsSection.tsx # Customer feedback sliders
│       └── VideoSection.tsx        # Moroccan tourism video module
├── legal/                          # Privacy Policy & Terms Features
│   ├── components/
│   │   ├── LegalPageLayout.tsx     # Standard structural legal text framework
│   │   ├── LegalSectionCard.tsx    # Policy paragraph containers
│   │   ├── PrivacyPolicyView.tsx   # Privacy agreement content
│   │   └── TermsOfServiceView.tsx  # General Terms content
│   ├── data/
│   │   └── legalConfig.ts          # Content configuration for terms & privacy sections
│   ├── types/
│   │   └── index.ts                # TypeScript types for legal contents
│   └── index.ts                    # Barrel exports
└── tours/                          # Multi-day desert tours
    ├── components/
    │   ├── StatHighlights.tsx      # Tour metrics panel (duration, route, etc.)
    │   ├── TourCard.tsx            # Catalog card with details preview
    │   ├── TourInfo.tsx            # Tour features and amenities grid
    │   ├── TourItinerary.tsx       # Day-by-day accordion list
    │   ├── TourLayout.tsx          # Full-width tour details page template
    │   ├── TourSeoSections.tsx     # Rich content widgets for SEO optimization
    │   └── ToursView.tsx           # Tours listing view
    ├── data/
    │   ├── toursData.ts            # Dynamic multi-day tour registry
    │   └── toursMetadata.ts        # Dynamic tours SEO definitions
    ├── types/
    │   └── index.ts                # TypeScript types
    └── index.ts                    # Tour module barrel exports
```

---

### 3. Core Utilities Layer (`src/lib/`)
Contains type-safe environment configurations, centralized libraries, and helper classes.

```plaintext
src/lib/
├── actions/
│   └── newsletter-action.ts        # Server Action handling email subscriptions via Nodemailer
├── constants/
│   └── routes.ts                   # Type-safe global route configuration map
├── hooks/
│   ├── index.ts                    # Hook barrel exports
│   ├── useMediaQuery.ts            # Viewport breakpoint matcher hook
│   ├── useNavbar.ts                # Scroll behavior and viewport position tracker
│   └── useTranslation.ts           # Custom wrapper wrapping translation bindings
├── api-utils.ts                    # Rate limiting and API utilities
├── client-env.ts                   # Client-safe environment schema loader
├── env.ts                          # Server environment schema validation (Zod-driven)
├── form-types.ts                   # Zod-derived types for forms
├── gsap.ts                         # GSAP animation library configuration and plugins register
├── metadata.ts                     # Localized Meta Tag compiler
├── schemas.ts                      # Zod validation schema sets (Forms validation)
├── security-headers.ts             # Content Security Policy (CSP) and HTTP security settings
├── server-utils.ts                 # Server helpers (including nodemailer transport configurations)
├── structuredData.ts               # Organization & Website JSON-LD constructors
├── types.ts                        # Shared type definitions
└── utils.ts                        # CSS merging utilities (`clsx` + `tailwind-merge`)
```

---

### 4. Shared Primitives Layer (`src/shared/`)
Reusable design system primitives and base layouts used across multiple feature modules.

```plaintext
src/shared/
├── layout/                         # Core Layout Modules
│   ├── DetailsSidebar.tsx          # Sidebar wrapper for tours and excursions details
│   ├── Footer.tsx                  # Main footer entry point
│   ├── Navbar.tsx                  # Responsive global navigation bar
│   ├── NavigationProgress.tsx      # Dynamic router change progress tracker
│   ├── PageHeader.tsx              # Localized parallax page banner
│   ├── index.ts                    # Layout barrel export
│   ├── footer/                     # Granular Footer Sub-components
│   │   ├── FooterBottomBar.tsx     # Copy and legal links bar
│   │   ├── FooterBrand.tsx         # Agency branding details
│   │   ├── FooterContactInfo.tsx   # Direct address details
│   │   ├── FooterNewsletter.tsx    # In-footer newsletter form wrapper
│   │   └── NewsletterModal.tsx     # Popup modal for email subscription
│   └── navbar/                     # Granular Navbar Sub-components
│       ├── constants.ts            # Navigation links list
│       ├── DesktopMenu.tsx         # Desktop viewport menu links
│       ├── LanguageSelector.tsx    # Multi-language selector dropdown
│       ├── MobileMenu.tsx          # Mobile flyout burger menu
│       └── SocialLinks.tsx         # Social icon link rows
├── ui/                             # Base Primitive UI Components
│   ├── AnimateOnScroll.tsx         # GSAP ScrollTrigger animation wrapper
│   ├── calendar.tsx                # Tailwind CSS v4 custom styled date picker
│   ├── CountUp.tsx                 # Fast numbers animation widget
│   ├── icons.tsx                   # Dedicated Lucide-based svg icons dictionary
│   ├── index.ts                    # UI barrel exports
│   ├── JsonLd.tsx                  # Safe injection script wrapper for JSON-LD data
│   ├── Loading.tsx                 # Base loading indicator (spinner)
│   ├── NativePopover.tsx           # Accessible relative UI Popover dialog
│   ├── PageTransitionLoader.tsx    # Route-level smooth page exit/enter screen
│   └── WhatsAppButton.tsx          # Floating persistent click-to-chat CTA
└── utilities/
    └── ErrorBoundary.tsx           # Local React Error Boundary wrapper
```

---

## 🛠️ Technology Stack & Versions

| Layer | Technology | Version | Description |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js** (App Router) | `^16.2.6` | React framework with Turbopack and React Server Components (RSC) |
| **Core Library** | **React** | `^19.2.6` | UI component library with compiler integration |
| **Styling** | **Tailwind CSS** | `4.3.0` | Utility-first CSS using the PostCSS 8 engine |
| **Localization** | **next-intl** | `^4.12.0` | App Router-native translation and routing system |
| **Animations** | **GSAP** & **@gsap/react** | `^3.15.0` | Ultra-high performance UI/scroll animations with ScrollTrigger |
| **Validation** | **Zod** | `^4.4.3` | Strict TypeScript-first schema validation |
| **Security** | **isomorphic-dompurify** | `3.13.0` | XSS prevention via HTML sanitization |
| **Date Utils** | **date-fns** & **react-day-picker** | `^4.1.0` / `^10.0.1` | Complete calendar and scheduling suite |
| **Icons** | **lucide-react** | `1.16.0` | SVG-based iconography |

---

## 🔄 Architectural Flows & Patterns

### 1. Form Handling & Server Actions Flow
AmsirarTrip does not use standard REST routing to handle input data. Forms utilize React `Action` streams and Next.js Server Actions:

- **Client Trigger:** The user fills a form (Booking, Contact, or Newsletter) and submits.
- **Client validation:** Zod validates the schema on the client side, then a reCAPTCHA token is generated.
- **Server Action Dispatch:** Next.js sends an encrypted `POST` request payload to the Server Action.
- **Security Check:** The Server Action verifies the client IP (rate limiting), runs `isomorphic-dompurify` to strip XSS strings, and validates the schema using Zod on the server.
- **SMTP Send:** Standard `Nodemailer` transport dispatches the email.

### 2. High-Performance Animations
Layout transitions and scroll-bound animations leverage GSAP ScrollTrigger for performance:
- The page is structured via React Server Components to load quickly.
- `PageTransitionLoader` coordinates smooth entries.
- The `AnimateOnScroll` wrapper detects intersection with the viewport using GSAP ScrollTrigger and applies GPU-accelerated transforms (`translate3d`, `scale`, etc.).
- Respects the user's OS settings by checking `prefers-reduced-motion` and rendering directly if checked.
