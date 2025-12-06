# AmsirarTrip - Next.js Migration

This project has been migrated from Vite + React Router to Next.js 15 with App Router.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2.Create `.env.local` file (copy from `.env.example`):

```bash
cp .env.example .env.local
```

3. Configure environment variables in `.env.local`:
   - reCAPTCHA keys (v2 and v3)
   - Gmail SMTP credentials
   - Recipient email address

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Internationalized routes
│   │   ├── layout.tsx            # Locale-specific layout
│   │   ├── page.tsx              # Home page
│   │   ├── tours/                # Tours pages
│   │   ├── excursion/            # Excursion pages
│   │   ├── about/                # About page
│   │   └── contact/              # Contact page
│   ├── api/                      # API routes
│   │   ├── health/               # Health check
│   │   ├── booking/              # Booking endpoint
│   │   ├── contact/              # Contact form endpoint
│   │   └── newsletter/           # Newsletter subscription
│   └── layout.tsx                # Root layout
├── src/
│   ├── components/
│   │   ├── pages/                # Page components
│   │   ├── shared/               # Shared components (Navbar, Footer, etc.)
│   │   └── ui/                   # UI components (shadcn-style)
│   ├── constants/                # Constants and data
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utility functions
│   └── styles/                   # Global styles
├── i18n/                         # Internationalization config
├── public/                       # Static assets
│   ├── locales/                  # Translation files
│   ├── images/                   # Images
│   └── fonts/                    # Fonts
├── middleware.ts                 # Next.js middleware (i18n)
└── next.config.ts                # Next.js configuration
```

## 🌐 Internationalization

This app supports 4 languages:

- English (en) - default
- French (fr)
- German (de)
- Spanish (es)

Translation files are in `public/locales/{lang}/common.json`.

Locale routing is automatic via middleware. URLs are prefixed with locale codes only when needed (e.g., `/fr/tours`).

## 🔧 Key Technologies

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with React Compiler
- **TypeScript** - Strict type checking
- **Tailwind CSS v4** - Utility-first CSS
- **next-intl** - Internationalization
- **Radix UI** - Headless UI components
- **ScrollReveal** - Scroll animations
- **ReCAPTCHA** - Form protection
- **Nodemailer** - Email sending (API routes)

## 🔐 Environment Variables

### Client-side (NEXT*PUBLIC*\*)

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - reCAPTCHA v2 site key
- `NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY` - reCAPTCHA v3 site key

### Server-side (API routes only)

- `GMAIL_USER` - Gmail account
- `GMAIL_PASS` - Gmail app password
- `MAIL_TO` - Recipient email
- `RECAPTCHA_SECRET_KEY` - reCAPTCHA v2 secret
- `RECAPTCHA_V3_SECRET_KEY` - reCAPTCHA v3 secret

## 📝 Development Guidelines

### Client vs Server Components

- Most components are **client components** (`'use client'` directive) because they use hooks, browser APIs, or event handlers
- Server components are used for layouts and static content where possible
- Always add `'use client'` at the top of components that use:
  - React hooks (`useState`, `useEffect`, etc.)
  - Browser APIs (`window`, `document`, `localStorage`)
  - Event handlers (`onClick`, `onChange`, etc.)
  - Context providers

### Navigation

Use Next.js navigation components from `@/i18n/routing`:

```typescript
import { Link, useRouter, usePathname } from "@/i18n/routing";

// Link component
<Link href="/tours">Tours</Link>;

// Programmatic navigation
const router = useRouter();
router.push("/contact");

// Get current path
const pathname = usePathname();
```

### API Routes

API routes are in `app/api/*/route.ts`. Each route exports HTTP method handlers:

```typescript
export async function GET(request: NextRequest) {
  return NextResponse.json({ data: "value" });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Process request
  return NextResponse.json({ ok: true });
}
```

### Styling

- Global styles: `src/styles/App.css` and `src/styles/index.scss`
- Tailwind config: `tailwind.config.js`
- CSS custom properties defined in `@theme` block in `App.css`
- Component styles use Tailwind utility classes

## 🧪 Testing & QA

```bash
npm run lint          # ESLint
npm run lint:css      # Stylelint
npm run type-check    # TypeScript check
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

1. Build the project: `npm run build`
2. Start the server: `npm run start`
3. Ensure environment variables are set
4. Configure platform to run on port 3000

## Migration Notes

### What Changed

- ✅ Migrated from Vite to Next.js 15
- ✅ Converted React Router to Next.js App Router
- ✅ Replaced Express server with Next.js API routes
- ✅ Switched from react-i18next to next-intl
- ✅ Added 'use client' directives to client components
- ✅ Updated imports and navigation logic
- ✅ Consolidated single-server architecture

### What Stayed the Same

- ✅ React 19 with React Compiler
- ✅ TypeScript with strict mode
- ✅ Tailwind CSS v4
- ✅ All components and UI logic
- ✅ Translation files and content
- ✅ Styling and animations
- ✅ Form validation and reCAPTCHA
- ✅ Email sending via Nodemailer

### Breaking Changes

- API endpoint URLs remain the same (`/api/*`)
- No separate backend server needed
- Environment variables use `NEXT_PUBLIC_` prefix for client-side
- Routing is now file-system based
- Must use `Link` from `@/i18n/routing` instead of `next/link`
