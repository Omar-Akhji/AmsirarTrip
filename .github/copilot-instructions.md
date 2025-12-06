# AmsirarTrip — AI Agent Instructions

This file defines essential architecture, patterns, and constraints for AI agents working in this codebase.

## PROJECT CONTEXT

AmsirarTrip is a Next.js 15 tourism website for Morocco travel experiences:

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, TailwindCSS v4, Zod (validation), next-intl (i18n), Nodemailer, reCAPTCHA v2

**Key Facts:**

- Fully SSR with App Router patterns
- Static tour/excursion data (no database)
- i18n: English, French, German, Spanish (locale prefix: `as-needed`)
- **Components:** Physical location `app/_components/`, import via `@/components/*` alias
- Forms use client components; most content is server components
- Security: reCAPTCHA + rate limiting on all POST APIs + middleware CSRF protection
- Metadata: Auto-generated with locale alternates for all pages

## FOLDER STRUCTURE & IMPORT ALIASES

**TypeScript Path Mappings** (in `tsconfig.json`):

- `@/components/*` → `app/_components/*` (UI components, layouts, sections, forms)
- `@/lib/*` → `lib/*` (utilities, hooks, constants, validation)
- `@/i18n/*` → `i18n/*` (routing config, request helpers)
- `@/*` → `app/*` or `lib/*` (fallback for top-level imports)

**Directory Structure:**

```
app/
  layout.tsx (root, sets up fonts & scripts)
  [locale]/
    layout.tsx (i18n provider wrapper)
    page.tsx (home page)
    tours/ & tours/[slug]/ (tour detail pages)
    excursions/ & excursions/[slug]/ (excursion detail pages)
    contact/ & about/ (static pages)
  api/
    contact/route.ts, booking/route.ts, newsletter/route.ts, health/route.ts

app/_components/  (← Note: underscore prefix, not components/)
  layout/: Navbar, Footer, Loader, NavigationProgress
  sections/: HomeView, TourLayout, ExcursionLayout, AboutView, ContactView
  forms/: ContactFormTailwind, BookingForm
  ui/: button, input, popover, calendar, Loading

lib/
  env.ts (server-only env validation)
  client-env.ts (public env vars)
  api-utils.ts (error handlers, rate limiting, response formatters)
  validation.ts (client-side validators)
  schemas.ts (Zod schemas for API validation)
  metadata.ts (SEO metadata generator)
  sanitize.ts (DOMPurify helpers)
  security-headers.ts (Helmet-style headers)
  hooks/: useTranslation, useNavbar, useHeaderRotator
  constants/: routes.ts, toursData.ts, translations.ts

public/
  locales/ (en/, fr/, de/, es/ - JSON i18n files)
  images/ (Header/, Home/, Tours/, Excursions/)

i18n/
  routing.ts (next-intl routing config)
  request.ts (getMessages helpers)

proxy.ts (CSRF protection, API security, i18n routing - root level, Next.js 16+)
```

## ROUTING & PAGE PATTERNS

All page routes use the `[locale]` parameter (en, fr, de, es):

```tsx
// app/[locale]/page.tsx - Home page pattern
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata, defaultKeywords } from "@/lib/metadata";
import HomeView from "@/components/sections/HomeView";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return generateSEOMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: defaultKeywords,
    path: "",
    locale,
    image: "/images/Header/header-1.webp",
  });
}

export default function HomePage() {
  return <HomeView />;
}
```

**Key Rules:**

- **Import Pattern:** Always use `@/components` alias (maps to `app/_components/`)
  - Example: `import { Navbar } from "@/components/layout"`
  - Example: `import TourLayout from "@/components/sections/TourLayout"`
- Use `getTranslations` for server-side i18n (not useTranslations)
- Always `await params` (Next.js 15 async param pattern)
- Pass dictionary/translations to client components via props
- Metadata is ALWAYS generated server-side

## I18N PATTERNS (next-intl)

**Server Components:** Use `getTranslations` from "next-intl/server"

```tsx
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return { title: t("meta.title") };
}
```

**Client Components:** Use custom `useTranslation` hook from `@/lib/hooks/useTranslation`

```tsx
"use client";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t("home.title")}</h1>;
}
```

**Translation Files:** Located in `public/locales/{locale}/common.json`

- Keys are nested: `home.title`, `nav.home`, `about.section1`
- Never invent new keys; check existing files first
- All text MUST come from JSON, never hardcoded

**Supported Languages:**

- `en` (English)
- `fr` (French)
- `de` (German)
- `es` (Spanish)

## SEO & METADATA PATTERNS

Every page MUST use `generateSEOMetadata` from `@/lib/metadata`:

```tsx
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tours" });

  return generateSEOMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: ["Morocco", "tours", "Sahara"],
    path: "/tours",
    locale,
    image: "/images/Tours/tour-1.webp",
  });
}
```

**Required Fields:**

- `title` (auto-suffixed with " | AmsirarTrip")
- `description` (max 160 chars, auto-truncated)
- `path` (route without locale: "" for home, "/tours", "/contact")
- `locale` (en, fr, de, es)
- `image` (absolute path, default: "/images/Header/header-1.webp")

**Auto-generated:**

- Canonical URL with full locale path
- Language alternates (hreflang) for all 4 languages
- OpenGraph + Twitter cards
- Structured data for Organization, LocalBusiness, Product

**Do NOT:**

- Leave metadata fields empty
- Use hardcoded titles (use translation keys)
- Create custom metadata objects — always use `generateSEOMetadata`

## SECURITY RULES (MANDATORY)

All API routes MUST enforce:

- ✔ **Rate limiting**: `checkRateLimit(ip, maxRequests, windowMs)` — blocks IPs after violations
- ✔ **reCAPTCHA v2**: `verifyRecaptcha(token)` — REQUIRED on all forms
- ✔ **Input validation**: Zod schemas via `ContactSchema.safeParse()`
- ✔ **Sanitization**: `sanitizeInput()` for strings, `escapeHtml()` in emails
- ✔ **Error handling**: Never expose internal errors to client (see `api-utils.ts`)
- ✔ **No console.log()**: Use logging utilities only
- ✔ **Env validation**: Import from `@/lib/env` via `env.GMAIL_USER` (throws if missing)
- ✔ **Email injection prevention**: Validate email format, sanitize name/message fields

**Forbidden:**

- No eval(), no `dangerouslySetInnerHTML`
- No hardcoded secrets in code
- No raw Nodemailer configs — use `sendMail()` helper
- No direct error messages to clients
- No user data in HTML without escaping

**Common Pattern (Contact Form):**

1. Client: Validate with `validateContactForm()`, submit with reCAPTCHA token
2. Server: Rate limit IP → Validate Zod schema → Verify reCAPTCHA → Sanitize inputs → Send email
3. Response: Always JSON (never HTML), sanitized error messages

## API ROUTES (EXACT PATTERN)

All routes in `app/api/*/route.ts` use this structure:

```typescript
import { NextRequest } from "next/server";
import { env } from "@/lib/env";
import {
  withErrorHandling,
  createErrorResponse,
  createSuccessResponse,
  checkRateLimit,
  logApiRequest,
  logSuspiciousActivity,
} from "@/lib/api-utils";
import { ContactSchema } from "@/lib/schemas"; // Zod validation

export const POST = withErrorHandling(async (request: NextRequest) => {
  // 1. Extract IP (handle proxy headers)
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // 2. Rate Limit Check
  const rateLimit = checkRateLimit(ip, 10, 60000); // 10 req/min
  if (!rateLimit.allowed) {
    if (rateLimit.blocked)
      logSuspiciousActivity(ip, "BLOCKED_REQUEST", "/api/contact");
    return createErrorResponse(
      "Too many requests. Please try again later.",
      429,
      "RATE_LIMIT"
    );
  }

  // 3. Parse & Validate (Zod)
  const body = await request.json().catch(() => ({}));
  const validation = ContactSchema.safeParse(body);

  if (!validation.success) {
    return createErrorResponse(
      "Invalid request. Please check your input.",
      400,
      "VALIDATION_ERROR",
      validation.error.flatten()
    );
  }

  const { name, email, message, recaptchaToken } = validation.data;

  // 4. reCAPTCHA Verification (REQUIRED)
  if (!(await verifyRecaptcha(recaptchaToken))) {
    logSuspiciousActivity(ip, "CAPTCHA_FAILED", "/api/contact");
    return createErrorResponse(
      "Security verification failed. Please try again.",
      400,
      "CAPTCHA_FAILED"
    );
  }

  // 5. Process Request (example: send email)
  const result = await sendMail({
    to: env.MAIL_TO,
    subject: `New message from ${name}`,
    html: `<p>${escapeHtml(message)}</p>`,
  });

  if (!result.success) {
    return createErrorResponse("Email failed to send", 500, "EMAIL_ERROR");
  }

  // 6. Success Response
  return createSuccessResponse({ message: "Message delivered successfully" });
});
```

**Required Utilities (in `@/lib/api-utils.ts`):**

- `checkRateLimit(ip, maxReqs, windowMs)` → `{ allowed, remaining, blocked }`
- `verifyRecaptcha(token)` → `Promise<boolean>`
- `createErrorResponse(msg, status, code?, details?)`
- `createSuccessResponse(data?, message?, status?)`
- `withErrorHandling(handler)` → wraps function, catches errors
- `sanitizeInput(str)` → removes XSS
- `escapeHtml(str)` → HTML entity escape

**Schemas (in `@/lib/schemas.ts` — Zod):**

```typescript
export const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  recaptchaToken: z.string(),
});
```

**Environment Variables (from `@/lib/env.ts`):**

```typescript
import { env } from "@/lib/env";
env.GMAIL_USER; // Required
env.GMAIL_PASS; // Required
env.RECAPTCHA_SECRET_KEY; // Required
env.MAIL_TO; // Optional (fallback to GMAIL_USER)
```

**CRITICAL:**

- Never return raw error messages from catch blocks
- No `console.log()` in production routes
- Always validate & sanitize before processing
- Rate limiting & reCAPTCHA are non-optional

## UI / COMPONENT PATTERNS

**File Structure:**

- Reusable UI → `app/_components/ui/` (button, input, popover, calendar, Loading)
- Page layouts → `app/_components/sections/` (HomeView, TourLayout, ContactView)
- App chrome → `app/_components/layout/` (Navbar, Footer, NavigationProgress)

**Server vs Client Components:**

```tsx
// ✅ Server Component (default for content)
export default function HomeView() {
  const t = await getTranslations({ locale, namespace: "home" });
  return <div>{t("title")}</div>;
}

// ✅ Client Component (for interactivity/forms)
("use client");
export default function ContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState({});
  return <form onSubmit={handleSubmit}>...</form>;
}
```

**Props & Interfaces:**

```typescript
interface ComponentProps {
  title: string;
  items: Item[];
  onSelect?: (item: Item) => void;
}

export default function Component({ title, items, onSelect }: ComponentProps) {
  // ...
}
```

**Key Rules:**

- Use `"use client"` only when needed (state, events, hooks, animations)
- For animations: use framer-motion + client component
- All text via translation keys via `useTranslation()` hook (client) or `getTranslations()` (server)
- Images use Next.js `<Image/>` component with optimization
- Tailwind only — no CSS files
- Export default for page-level components
- Named exports for reusable components (in `index.ts`)

## DEVELOPMENT WORKFLOW

**Build & Test:**

```bash
npm run dev           # Start dev server (http://localhost:3000)
npm run build         # Build for production
npm run lint          # Run ESLint
npm run lint:fix      # Auto-fix lint issues
npm run type-check    # TypeScript type checking
npm run format        # Format code with Prettier + Tailwind
npm run format:check  # Check formatting without modifying files
npm test              # Run tests (via test.cjs)
```

**Key npm scripts** (in `package.json`):

- Development: `dev`, `lint:fix`, `type-check`
- Debugging: Check `next.config.ts` for React Compiler & image optimization
- Environment: Copy `.env.example` → `.env.local` with actual credentials

**Environment Setup:**
Required in `.env.local`:

```
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
RECAPTCHA_SECRET_KEY=your-secret-key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
MAIL_TO=contact@example.com  (optional)
```

**Code Formatting:**

The project uses **Prettier** with **Tailwind CSS plugin** for automatic code formatting and class sorting:

- **Configuration:** `.prettierrc` (80 char width, semicolons, double quotes)
- **Ignored files:** `.prettierignore` (node_modules, .next, build outputs, public assets)
- **Auto-format:** Run `npm run format` before commits
- **CI check:** Use `npm run format:check` in pipelines
- **Tailwind sorting:** Classes are automatically sorted per official recommended order
- **IDE integration:** Install Prettier extension for format-on-save

**Formatting Rules:**

- Run `npm run format` after editing components with Tailwind classes
- All TypeScript/TSX files are formatted with Prettier
- Tailwind classes are sorted automatically (no manual ordering needed)
- Format before `git commit` to ensure consistency

## CODE STYLE (MANDATORY)

- **TypeScript:** Strict mode (no `any`)
- **Naming:** PascalCase components, camelCase functions/variables
- **Exports:** Named exports (except Next.js pages)
- **Styles:** Tailwind classes only (no CSS files)
- **Async:** Always use async/await (no promises)
- **Imports:** Named imports from components, sorted alphabetically
- **Comments:** JSDoc for complex functions only

```typescript
// ✅ Good
import { useTranslation } from "@/lib/hooks/useTranslation";
import Image from "next/image";

interface UserProps {
  name: string;
  age: number;
}

export function UserCard({ name, age }: UserProps): JSX.Element {
  const { t } = useTranslation();
  return <div className="flex gap-2">{name}</div>;
}

// ❌ Bad
import * as utils from "@/lib/utils";
const UserCard = ({ name, age }: any) => <div>{name}</div>;
export default UserCard;
```

## CREATING TOURS & EXCURSIONS (WORKFLOW)

When adding a new tour or excursion, follow this 4-step process:

### Step 1: Add Data to `lib/constants/toursData.ts`

```typescript
export const TOURS_DATA = [
  {
    id: 7,
    image: "/images/Tours/Tour7.webp",
    title: "tour7.title", // ← i18n key
    author: "tours.cities.marrakech", // ← i18n key
    category: "tours", // 'tours' or 'excursions'
    description: "tours.tour7.description", // ← i18n key
    duration: 5, // hours or days
    start: "tours.cities.marrakech", // ← i18n key
    end: "tours.cities.marrakech", // ← i18n key
    route: "/tours/7", // URL slug
  },
];
```

**Key Rules:**

- All text (title, description, location) MUST use i18n keys, not hardcoded strings
- Route format: `/tours/{id}` for tours, `/excursions/{slug}` for excursions
- Image paths must exist in `public/images/Tours/` or `public/images/Excursions/`
- Use `.webp` format for performance

### Step 2: Add Translation Keys to i18n Files

In each `public/locales/{locale}/common.json`:

```json
{
  "tours": {
    "tour7": {
      "title": "Sahara Desert Adventure",
      "description": "Experience the majesty of the Sahara with expert guides...",
      "duration": "5 days",
      "highlights": ["Camel trekking", "Berber villages", "Stargazing"]
    }
  }
}
```

**Repeat for all 4 languages:** en, fr, de, es

### Step 3: Create the Detail Page

Create `app/[locale]/tours/7/page.tsx`:

```tsx
import TourLayout from "@/components/sections/TourLayout";
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from "@/lib/metadata";
import { generateTourJsonLd } from "@/lib/structuredData";
import { sanitizeJsonLd } from "@/lib/sanitize";
import { Metadata } from "next";
import Script from "next/script";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generateSEOMetadata({
    title: `${t("tour7.title")} - 4 Day Desert Adventure`,
    description: t("tour7.overview"),
    keywords: ["Sahara", "desert", "Morocco", "adventure"],
    path: `/${locale}/tours/7`,
    locale,
    image: "/images/Tours/Tour7.webp",
    type: "article",
    publishedTime: "2024-01-15T00:00:00Z",
    modifiedTime: new Date().toISOString(),
    author: "AmsirarTrip",
  });
}

export default function Tour7Page() {
  const jsonLd = sanitizeJsonLd(generateTourJsonLd("tour7", 7));

  return (
    <>
      <Script
        id="tour7-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TourLayout
        tourKey="tour7"
        bookingId={7}
        imageSrc="/images/Tours/Tour7.webp"
      />
    </>
  );
}
```

**Key Rules:**

- TourLayout uses `tourKey` (i18n namespace), `bookingId` (for forms), `imageSrc`
- Always include JSON-LD structured data via `generateTourJsonLd()` + `sanitizeJsonLd()`
- Metadata must include `type`, `publishedTime`, `modifiedTime`, `author` for articles
- Path format: `/${locale}/tours/{id}` (include locale in path for SEO)
- Import `Script` from `next/script` for structured data injection

### Step 4: Verify Image Assets

- Add tour image: `public/images/Tours/Tour7.webp`
- Image size: min 1200×630px (for SEO OpenGraph)
- Format: WebP for optimal performance
- Test responsive rendering on mobile/tablet

**Checklist Before Submitting:**

- [ ] Data object in `toursData.ts` with all required fields
- [ ] i18n keys added to all 4 language files (en, fr, de, es)
- [ ] Detail page created at `app/[locale]/tours/{id}/page.tsx`
- [ ] Metadata generated with `generateSEOMetadata()`
- [ ] Image asset exists at `public/images/Tours/`
- [ ] Links and routes tested in all supported languages
- [ ] No hardcoded text in components

## AGENT BEHAVIOR RULES

1. **Always check existing patterns** — match the codebase style exactly
2. **Ask before guessing** — if requirements are unclear, ask
3. **No new dependencies** — use existing packages only (next-intl, framer-motion, zod, etc.)
4. **No new folders** — unless explicitly requested
5. **Security first** — validate, sanitize, rate limit on all inputs
6. **SEO-aware** — always include metadata, use hreflang for locales
7. **Performance-conscious** — server components by default, optimize images
8. **No hardcoded text** — all strings from i18n JSON files
9. **Type-safe** — full TypeScript coverage, no `any`
10. **Production-ready** — code is immediately deployable

================================================================================

# END OF FILE

================================================================================
