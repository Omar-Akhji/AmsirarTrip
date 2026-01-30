# AmsirarTrip — AI Agent Instructions

Next.js 16 tourism website for Morocco travel. **Feature-based architecture** with SSR, i18n (4 languages), and security-first API design.

## Architecture Overview

```
src/
├── app/[locale]/          # Pages with locale param (en/fr/de/es)
│   ├── tours/[slug]/      # Dynamic tour pages via generateStaticParams
│   └── api/               # POST routes: booking, contact, newsletter
├── features/              # Feature modules (tours, booking, contact, home)
│   └── {feature}/         # components/, data/, types/, index.ts (barrel)
├── shared/                # Cross-feature: layout/, ui/, utilities/
├── lib/                   # Core utilities (see Key Files below)
└── i18n/                  # next-intl routing config
```

**Data Flow:** Static tour data in `features/tours/data/` → Pages consume via `TourLayout` → Forms POST to API routes with Zod validation.

## Key Files & Patterns

| File                               | Purpose                                                            |
| ---------------------------------- | ------------------------------------------------------------------ |
| `lib/metadata.ts`                  | `generateSEOMetadata()` — ALWAYS use for page metadata             |
| `lib/schemas.ts`                   | Zod schemas with DOMPurify transforms for API validation           |
| `lib/api-utils.ts`                 | `checkRateLimit()`, `createErrorResponse()`, `withErrorHandling()` |
| `lib/env.ts`                       | Server env getter — throws if required vars missing                |
| `i18n/routing.ts`                  | Locales: `['en','fr','de','es']`, prefix: `as-needed`              |
| `features/tours/data/toursData.ts` | Static tour definitions with i18n keys                             |

## Critical Patterns

### Page Component (Server)

```tsx
// Always await params in Next.js 15+
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tours" });
  return generateSEOMetadata({
    title: t("meta.title"),
    path: "/tours",
    locale,
  });
}
```

### i18n Usage

- **Server:** `getTranslations()` from `next-intl/server`
- **Client:** `useTranslations()` from `next-intl`
- **Files:** `public/locales/{en,fr,de,es}/common.json`
- **Rule:** Never hardcode text — all strings via translation keys

### API Route Security (Mandatory)

```tsx
// Every POST route must follow this order:
const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
const rateLimit = checkRateLimit(ip, 10, 60000); // 1. Rate limit
if (!rateLimit.allowed) return createErrorResponse("...", 429);
const validation = Schema.safeParse(body); // 2. Zod validation
if (!validation.success) return createErrorResponse("...", 400);
await verifyRecaptcha(recaptchaToken); // 3. reCAPTCHA verify
// 4. Process with sanitized data (schemas auto-sanitize via DOMPurify)
```

### Component Conventions

- `"use client"` only for interactivity (forms, animations, hooks)
- Animations: framer-motion
- Styling: Tailwind only (no CSS files except `globals.css`)
- Images: `next/image` with WebP format
- Imports: Always use `@/*` alias → `src/*`

## Commands

```bash
npm run dev          # Dev server
npm run build        # Production build
npm run lint:fix     # ESLint auto-fix
npm run type-check   # TypeScript validation
npm run format       # Prettier + Tailwind class sorting
```

## Adding Tours/Excursions

1. Add to `features/tours/data/toursData.ts` (use i18n keys for text)
2. Add translations to all 4 `public/locales/{locale}/common.json`
3. Tour pages use dynamic `[slug]` routing with `generateStaticParams()`
4. Include JSON-LD via `generateTourJsonLd()` + `sanitizeJsonLd()`

## Rules

- **Security:** Rate limit + reCAPTCHA + Zod validation on all forms
- **SEO:** Every page needs `generateSEOMetadata()` with locale alternates
- **Types:** Strict TypeScript, no `any`
- **Env:** Use `env.GMAIL_USER` from `lib/env.ts` (validates at runtime)
- **No new deps** without explicit request
- Match existing patterns exactly — check similar files first
