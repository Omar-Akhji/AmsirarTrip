# AmsirarTrip — AI Agent Instructions

Next.js 16 / React 19 tourism website for Morocco travel. Feature-based architecture with SSR, i18n (en/fr/de/es), and security-first API design.

**Key tech versions:** pnpm 10, Zod v4, Tailwind CSS v4 (CSS-first config), `motion` v12 (not `framer-motion`), React Compiler enabled, ESLint v10 flat config, ESM (`"type": "module"`).

## Architecture

```
src/
├── app/[locale]/          # Pages with locale param — params is Promise (await it)
│   ├── tours/[slug]/      # Dynamic routes via generateStaticParams + ISR (revalidate=3600)
│   └── api/               # POST routes: booking, contact, newsletter; GET: health
├── features/{name}/       # components/, data/, types/, index.ts barrel
│   └── data/              # Two-file pattern: {name}Data.ts (i18n keys) + {name}Metadata.ts (SEO/slugs)
├── shared/                # layout/ (Navbar, Footer, PageHeader), ui/ (Button, JsonLd), utilities/
├── lib/                   # Core: api-utils, schemas, env, metadata, structuredData, constants/
├── i18n/                  # next-intl v4 routing config
└── proxy.ts               # ⚠ Middleware file (not middleware.ts) — i18n routing + CSP nonces
```

**Data flow:** Static data in `features/{name}/data/` → thin page wrappers call feature components → forms use Server Actions (`useActionState`) → POST to API routes with Zod v4 validation → email via Nodemailer.

## Key Files

| File                          | Purpose                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| `lib/metadata.ts`             | `generateSEOMetadata()` — ALWAYS use for page metadata                                          |
| `lib/schemas.ts`              | Zod v4 schemas with DOMPurify `.transform()` on all strings                                     |
| `lib/api-utils.ts`            | `checkRateLimit()`, `createErrorResponse()`, `withErrorHandling()`                              |
| `lib/env.ts`                  | Lazy server env getter — throws on access if `GMAIL_USER`/`GMAIL_PASS` missing                  |
| `lib/structuredData.ts`       | JSON-LD generators (`generateTourJsonLd`, `generateExcursionJsonLd`, etc.)                      |
| `lib/constants/animations.ts` | Motion prop-spread objects (not variants): `<m.div {...fadeInUp}>`                              |
| `lib/constants/routes.ts`     | `ROUTES` object with `as const` — all tour/excursion paths                                      |
| `i18n/routing.ts`             | Locales config, exports `Link`, `usePathname`, `useRouter` from `createNavigation()`            |
| `shared/ui/JsonLd.tsx`        | React 19 native `<script>` children (no `dangerouslySetInnerHTML`)                              |
| `app/globals.css`             | Tailwind v4 `@theme` design tokens (no `tailwind.config.js`) — brand colors, breakpoints, fonts |

## Critical Patterns

### Page Component — always `await params`

```tsx
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

Pages are thin wrappers — delegate rendering to feature components (e.g., `<ToursView />`).

### React Compiler — no manual memoization

React Compiler is enabled project-wide (`reactCompiler: true` in next.config.ts). **Never add `useMemo`, `useCallback`, or `React.memo`** — the compiler handles this automatically.

### i18n (next-intl v4)

- **Server:** `getTranslations()` from `next-intl/server`
- **Client:** `useTranslations()` from `next-intl`
- **Navigation:** Import `Link`, `useRouter`, `usePathname` from `@/i18n/routing` (not `next/link`)
- **Files:** `public/locales/{en,fr,de,es}/common.json`
- **Rule:** Never hardcode user-facing text

### API Route Security (every POST route)

```tsx
// Mandatory 5-step pipeline inside withErrorHandling():
// 1. Rate limit — checkRateLimit(ip, limit, windowMs)
// 2. Zod v4 validation — Schema.safeParse(body)
// 3. reCAPTCHA verify — verifyRecaptcha(token) with hostname + staleness checks
// 4. Process — send email via Nodemailer (Gmail SMTP)
// 5. Structured response — createSuccessResponse() / createErrorResponse()
```

### Server Actions (React 19)

```tsx
// features/booking/actions/booking-action.ts
"use server";
export async function bookingAction(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  // Validate with Zod → call apiClient → return { success, message, errors? }
}
// Client: const [state, formAction, isPending] = useActionState(bookingAction, null);
```

### Animations — prop-spread pattern (NOT variants)

```tsx
import { m } from "motion/react"; // ⚠ NOT "framer-motion"
import { fadeInUp, ANIMATION_VIEWPORT_SETTINGS } from "@/lib/constants/animations";
<m.div {...fadeInUp} viewport={ANIMATION_VIEWPORT_SETTINGS}>  // viewport: { once: true, amount: 0.2 }
```

### Component Conventions

- `"use client"` only for interactivity (forms, animations, client hooks)
- Styling: Tailwind only — design tokens in `globals.css` `@theme` block
- Images: `next/image` with WebP, `fill` + `sizes` for responsive
- Dynamic imports for below-fold components: `const Footer = dynamic(() => import(...))`
- Imports: Always `@/*` alias → `src/*`
- Icons: `lucide-react` (primary) + `@fortawesome/react-fontawesome` (social only)

## Commands

```bash
pnpm dev             # Dev server (Turbopack)
pnpm build           # Production build (standalone output for Docker)
pnpm lint:fix        # ESLint auto-fix
pnpm type-check      # TypeScript validation
pnpm format          # Prettier + Tailwind class sorting
pnpm react-doctor    # React health check
```

## Adding Tours/Excursions

1. Add runtime data to `features/{tours|excursions}/data/{name}Data.ts` — use i18n keys for all text, `ROUTES` constant for path
2. Add SEO metadata to `features/{tours|excursions}/data/{name}Metadata.ts` — English strings, slug, keywords, pricing, ISO duration
3. Add translations to all 4 `public/locales/{locale}/common.json`
4. Dynamic `[slug]` routing + `generateStaticParams()` handles page creation automatically
5. Include JSON-LD via `generateTourJsonLd()` / `generateExcursionJsonLd()` + `<JsonLd>` component

## Rules

- **Security:** Rate limit + reCAPTCHA + Zod v4 validation on ALL form endpoints
- **SEO:** Every page needs `generateSEOMetadata()` with locale; include JSON-LD structured data
- **Types:** Strict TypeScript (`noUnusedLocals`, `noUnusedParameters`), no `any`
- **Env:** Access via `env.GMAIL_USER` from `lib/env.ts` — validates lazily at runtime
- **No new deps** without explicit request
- **No `tailwind.config.js`** — use `@theme` in `globals.css` for design tokens (Tailwind v4)
- **Package manager:** pnpm only (corepack-managed)
- Match existing patterns exactly — check similar files first
