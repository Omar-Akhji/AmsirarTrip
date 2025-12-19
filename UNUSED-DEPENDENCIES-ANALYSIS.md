# Unused Dependencies & Scripts Analysis

> **Generated:** December 16, 2025  
> **Project:** AmsirarTrip Enhanced  
> **Status:** ⚠️ Informational Only - No Actions Taken

---

## 📊 Summary

This document identifies potentially unused dependencies, scripts, and configurations in the project. These items are **NOT REMOVED** but documented for review and potential cleanup.

---

## 🔍 Analysis Results

### ❌ UNUSED Production Dependencies

#### 1. **react-remove-scroll** (v2.7.1)

```json
"react-remove-scroll": "2.7.1"
```

**Status:** ❌ **NOT USED**

**Analysis:**

- No imports found in codebase
- Not used in any component
- Typically used for scroll locking in modals/dialogs

**Recommendation:**  
This is likely a peer dependency of `@radix-ui/react-popover` or other Radix UI components. Before removing:

- Check if Radix UI components internally require it
- Test popover/modal functionality after removal
- Safe to remove if no Radix UI components break

**Potential Savings:** ~15KB (gzipped)

---

### ⚠️ UNUSED Development Dependencies

#### 1. **@types/cors** (v2.8.17)

```json
"@types/cors": "^2.8.17"
```

**Status:** ❌ **NOT USED**

**Analysis:**

- No `cors` package in dependencies
- No imports of CORS middleware found
- Type definitions exist but no actual CORS usage

**Why It Might Be There:**

- Leftover from previous implementation
- Planned CORS configuration never implemented
- Copy-paste from template

**Recommendation:**  
✅ **SAFE TO REMOVE** - No CORS middleware is used in the project. CORS is currently handled via Next.js middleware in `src/proxy.ts` with custom headers.

**Potential Savings:** ~10KB

---

#### 2. **sass** (v1.94.2)

```json
"sass": "1.94.2"
```

**Status:** ⚠️ **PARTIALLY UNUSED**

**Analysis:**

- No `.scss` or `.sass` files found in project
- Type declarations exist in `types/global.d.ts`:
  ```typescript
  declare module "*.scss" {
    const content: { [className: string]: string };
    export default content;
  }
  ```
- Documentation references old SCSS files that don't exist:
  - `README.md` mentions: `src/styles/index.scss`
  - `MIGRATION.md` mentions: `src/styles/App.css` and `src/styles/index.scss`

**Current Styling:**

- ✅ Tailwind CSS v4 (active)
- ✅ `src/app/globals.css` (active)
- ❌ No SASS/SCSS files

**Recommendation:**  
🟡 **CAN BE REMOVED** - Project uses Tailwind CSS exclusively. However, check if Next.js automatically processes any CSS modules. Safe to remove after verification.

**Potential Savings:** ~8MB (!!) in node_modules

---

#### 3. **babel-plugin-react-compiler** (v19.1.0-rc.3)

```json
"babel-plugin-react-compiler": "^19.1.0-rc.3"
```

**Status:** ⚠️ **INSTALLED BUT DISABLED**

**Analysis:**
Found in `next.config.ts`:

```typescript
experimental: {
  // React Compiler: disabled due to type error in Next.js 15.1+
  // reactCompiler: process.env.NODE_ENV === "production",
}
```

**Why It's There:**

- Experimental React optimization feature
- Currently commented out due to compatibility issues
- Reserved for future use when Next.js 16+ stabilizes

**Recommendation:**  
🟡 **KEEP FOR NOW** - This is intended for future use when:

1. Next.js 16+ stabilizes React Compiler support
2. Type errors are resolved
3. React 19 compiler matures

**Potential Savings:** ~500KB

---

#### 4. **eslint-formatter-compact** (v9.0.1)

```json
"eslint-formatter-compact": "^9.0.1"
```

**Status:** ⚠️ **INSTALLED BUT NOT CONFIGURED**

**Analysis:**

- Package installed but not used in ESLint config
- `eslint.config.js` doesn't specify a formatter
- No npm scripts use `--format compact`

**Recommendation:**  
🟡 **CAN BE REMOVED** unless you want to add it to scripts:

```json
"lint": "eslint . --format compact"
```

**Potential Savings:** ~50KB

---

### ✅ UNUSED npm Scripts

#### 1. **lint:css** & **lint:css:fix**

```json
"lint:css": "stylelint \"app/**/*.css\"",
"lint:css:fix": "stylelint \"app/**/*.css\" --fix"
```

**Status:** ⚠️ **PATH MISMATCH**

**Analysis:**

- Scripts check `app/**/*.css`
- Actual CSS file is at `src/app/globals.css`
- Pattern won't match any files

**Recommendation:**  
🔧 **FIX THE PATH:**

```json
"lint:css": "stylelint \"src/app/**/*.css\"",
"lint:css:fix": "stylelint \"src/app/**/*.css\" --fix"
```

---

### 📦 Dependencies That ARE Used (For Reference)

These packages **appear unused** but are actually required:

#### ✅ **tslib** (2.8.1)

- **Used by:** TypeScript runtime
- **Required:** Yes, for compiled TypeScript

#### ✅ **sharp** (0.34.5)

- **Used by:** Next.js image optimization
- **Required:** Yes, for production builds

#### ✅ **autoprefixer** (10.4.22)

- **Used by:** PostCSS pipeline
- **Required:** Yes, for Tailwind CSS

---

## 📝 Unused Configuration Files

### ⚠️ Type Declarations for Non-Existent Files

**File:** `types/global.d.ts`

```typescript
// These are unused:
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.scss" {
  const content: { [className: string]: string };
  export default content;
}
```

**Recommendation:** Remove SCSS type declarations if SASS is removed.

---

## 🎯 Cleanup Recommendations

### Priority 1: Safe to Remove Immediately

1. ✅ **@types/cors** - No CORS used
2. ✅ **sass** - No SCSS/SASS files (verify first)
3. ✅ **eslint-formatter-compact** - Not configured

**Total Potential Savings:** ~8MB in node_modules

### Priority 2: Fix Configuration

1. 🔧 **Fix Stylelint paths**
   ```json
   "lint:css": "stylelint \"src/app/**/*.css\"",
   "lint:css:fix": "stylelint \"src/app/**/*.css\" --fix"
   ```

### Priority 3: Keep for Future

1. 🟡 **babel-plugin-react-compiler** - Future React 19 optimization
2. 🟡 **react-remove-scroll** - Radix UI peer dependency (verify)

---

## 🧪 Verification Steps Before Removal

### To Remove @types/cors:

```bash
npm uninstall @types/cors
npm run type-check
```

### To Remove sass:

```bash
npm uninstall sass
npm run build
# Verify no SCSS compilation errors
```

### To Remove eslint-formatter-compact:

```bash
npm uninstall eslint-formatter-compact
npm run lint
```

### To Verify react-remove-scroll:

```bash
# Test all Radix UI components:
# - Popover (booking form, calendar)
# - Date picker
# - Modals/dialogs
```

---

## 📊 Package Size Impact

| Package                     | Size (node_modules) | Gzipped Bundle Impact |
| --------------------------- | ------------------- | --------------------- |
| sass                        | ~8MB                | N/A (dev only)        |
| @types/cors                 | ~10KB               | N/A (dev only)        |
| eslint-formatter-compact    | ~50KB               | N/A (dev only)        |
| babel-plugin-react-compiler | ~500KB              | N/A (dev only)        |
| react-remove-scroll         | ~150KB              | ~15KB                 |

**Total Removable:** ~8.7MB from node_modules  
**Bundle Impact:** ~15KB gzipped (if react-remove-scroll confirmed unused)

---

## ⚠️ Important Notes

1. **Do NOT remove without testing** - Some packages may be indirect dependencies
2. **Check after Next.js/React updates** - Dependencies may become useful
3. **Radix UI dependencies** - Some packages are peer dependencies of UI libraries
4. **TypeScript types** - Always run `npm run type-check` after removing @types packages

---

## 🔄 Update Strategy

### Safe Removal Process:

1. Create a new branch

   ```bash
   git checkout -b cleanup/unused-dependencies
   ```

2. Remove one package at a time

   ```bash
   npm uninstall <package-name>
   ```

3. Test thoroughly

   ```bash
   npm run type-check
   npm run lint
   npm run build
   npm run dev
   ```

4. Commit if successful

   ```bash
   git add package.json package-lock.json
   git commit -m "chore: remove unused dependency <package-name>"
   ```

5. Repeat for each package

---

## 📞 Questions to Answer Before Cleanup

- [ ] Does Radix UI require `react-remove-scroll`?
- [ ] Are there any CSS modules that need SASS?
- [ ] Will React Compiler be enabled in production soon?
- [ ] Should we use `eslint-formatter-compact` in CI/CD?

---

**Last Updated:** December 16, 2025  
**Analyzed By:** AI Code Analysis  
**Status:** Awaiting Manual Review

---
