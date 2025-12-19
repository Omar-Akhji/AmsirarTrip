# Unused Dependencies & Scripts Analysis

> **Generated:** December 19, 2025  
> **Project:** AmsirarTrip Enhanced  
> **Status:** ✅ Clean - All Dependencies Active

---

## 📊 Summary

| Category                | Count | Status               |
| ----------------------- | ----- | -------------------- |
| Production Dependencies | 21    | ✅ All used          |
| Dev Dependencies        | 24    | ✅ All used          |
| NPM Scripts             | 13    | 🔧 1 path fix needed |

**Removed in cleanup:** `sass`, `@types/cors`, `eslint-formatter-compact`, `babel-plugin-react-compiler`  
**Total saved:** ~8.5MB in node_modules

---

## ✅ Production Dependencies (21)

| Package                    | Used In                              | Status |
| -------------------------- | ------------------------------------ | ------ |
| `@radix-ui/react-popover`  | `shared/ui/popover.tsx`              | ✅     |
| `@radix-ui/react-slot`     | `shared/ui/button.tsx`               | ✅     |
| `@types/dompurify`         | TypeScript types                     | ✅     |
| `class-variance-authority` | `shared/ui/button.tsx`               | ✅     |
| `clsx`                     | `lib/utils.ts`                       | ✅     |
| `date-fns`                 | `shared/ui/calendar.tsx`             | ✅     |
| `framer-motion`            | Multiple components                  | ✅     |
| `isomorphic-dompurify`     | `lib/api-utils.ts`, `lib/schemas.ts` | ✅     |
| `lucide-react`             | Icons throughout app                 | ✅     |
| `next`                     | Core framework                       | ✅     |
| `next-intl`                | Internationalization                 | ✅     |
| `nodemailer`               | API routes (email)                   | ✅     |
| `react`                    | Core                                 | ✅     |
| `react-day-picker`         | `shared/ui/calendar.tsx`             | ✅     |
| `react-dom`                | Core                                 | ✅     |
| `react-google-recaptcha`   | Forms                                | ✅     |
| `react-remove-scroll`      | Radix UI peer dep                    | ✅     |
| `tailwind-merge`           | `lib/utils.ts`                       | ✅     |
| `tslib`                    | TypeScript runtime                   | ✅     |
| `zod`                      | `lib/schemas.ts`                     | ✅     |

---

## ✅ Dev Dependencies (24)

| Package                            | Purpose                    | Status |
| ---------------------------------- | -------------------------- | ------ |
| `@tailwindcss/postcss`             | Tailwind v4 PostCSS        | ✅     |
| `@types/node`                      | Node.js types              | ✅     |
| `@types/nodemailer`                | Nodemailer types           | ✅     |
| `@types/react`                     | React types                | ✅     |
| `@types/react-dom`                 | React DOM types            | ✅     |
| `@types/react-google-recaptcha`    | reCAPTCHA types            | ✅     |
| `@typescript-eslint/eslint-plugin` | TS ESLint rules            | ✅     |
| `@typescript-eslint/parser`        | TS ESLint parser           | ✅     |
| `autoprefixer`                     | PostCSS autoprefixer       | ✅     |
| `eslint`                           | Linting                    | ✅     |
| `eslint-config-next`               | Next.js ESLint config      | ✅     |
| `eslint-plugin-jsx-a11y`           | Accessibility rules        | ✅     |
| `eslint-plugin-react`              | React ESLint rules         | ✅     |
| `eslint-plugin-react-hooks`        | Hooks rules                | ✅     |
| `postcss`                          | CSS processing             | ✅     |
| `prettier`                         | Code formatting            | ✅     |
| `prettier-plugin-tailwindcss`      | Tailwind class sorting     | ✅     |
| `sharp`                            | Next.js image optimization | ✅     |
| `stylelint`                        | CSS linting                | ✅     |
| `stylelint-config-standard`        | Stylelint rules            | ✅     |
| `stylelint-config-tailwindcss`     | Tailwind Stylelint         | ✅     |
| `stylelint-order`                  | CSS property ordering      | ✅     |
| `tailwindcss`                      | Styling framework          | ✅     |
| `typescript`                       | TypeScript compiler        | ✅     |

---

## 🔧 Script Fix Required

### `lint:css` path mismatch

**Current (broken):**

```json
"lint:css": "stylelint \"app/**/*.css\"",
"lint:css:fix": "stylelint \"app/**/*.css\" --fix"
```

**Should be:**

```json
"lint:css": "stylelint \"src/app/**/*.css\"",
"lint:css:fix": "stylelint \"src/app/**/*.css\" --fix"
```

---

## ✅ All Scripts

| Script         | Command                                        | Status      |
| -------------- | ---------------------------------------------- | ----------- |
| `dev`          | `next dev`                                     | ✅          |
| `build`        | `next build`                                   | ✅          |
| `start`        | `next start`                                   | ✅          |
| `test`         | `node test.cjs`                                | ✅          |
| `lint`         | `eslint .`                                     | ✅          |
| `lint:fix`     | `eslint . --fix`                               | ✅          |
| `lint:css`     | `stylelint "app/**/*.css"`                     | 🔧 Fix path |
| `lint:css:fix` | `stylelint "app/**/*.css" --fix`               | 🔧 Fix path |
| `type-check`   | `tsc --noEmit`                                 | ✅          |
| `format`       | `prettier --write .`                           | ✅          |
| `format:check` | `prettier --check .`                           | ✅          |
| `verify:local` | `node scripts/verify-security.mjs`             | ✅          |
| `verify:prod`  | `node scripts/verify-security.mjs https://...` | ✅          |

---

**Last Updated:** December 19, 2025  
**Status:** ✅ Clean (1 script path to fix)
