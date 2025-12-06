# SEO Configuration Guide

## Quick Setup (Before Going Live)

### 1. Update Domain URLs

Replace `https://amsirartrip.com` with your actual domain in these files:

#### `src/lib/metadata.ts`

```typescript
const BASE_URL = "https://your-actual-domain.com";
```

#### `src/lib/structuredData.ts`

```typescript
// Update all URLs in JSON-LD functions:
url: "https://your-actual-domain.com",
logo: "https://your-actual-domain.com/horse-head.svg",
```

#### `app/sitemap.ts`

```typescript
const BASE_URL = "https://your-actual-domain.com";
```

#### `public/robots.txt`

```
Sitemap: https://your-actual-domain.com/sitemap.xml
```

### 2. Add Search Engine Verification

#### `app/[locale]/layout.tsx`

Update the verification codes:

```typescript
verification: {
  google: "paste-your-google-verification-code-here",
  // bing: "paste-bing-code",
  // yandex: "paste-yandex-code",
},
```

Get verification codes from:

- Google: <https://search.google.com/search-console>
- Bing: <https://www.bing.com/webmasters>

### 3. Update Social Media

#### `src/lib/structuredData.ts`

Update social media URLs in `generateOrganizationJsonLd()`:

```typescript
sameAs: [
  "https://facebook.com/YOUR_PAGE",
  "https://instagram.com/YOUR_HANDLE",
  "https://twitter.com/YOUR_HANDLE",
],
```

#### `app/[locale]/layout.tsx`

Update Twitter handle:

```typescript
twitter: {
  creator: "@YOUR_TWITTER_HANDLE",
},
```

### 4. Update Contact Information

#### `src/lib/structuredData.ts`

```typescript
telephone: "+212-XXX-XXX-XXX", // Your actual phone
```

---

## How to Add SEO to New Pages

### Example: Adding a New Tour Page

1. **Create the page file:** `app/[locale]/tours/7/page.tsx`

2. **Add metadata:**

```typescript
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from "@/lib/metadata";
import { generateTourJsonLd } from "@/lib/structuredData";
import { Metadata } from "next";
import Script from "next/script";
import TourLayout from "@/components/layouts/TourLayout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generateSEOMetadata({
    title: `${t("tour7.title")} - X Day Tour`,
    description: t("tours.tour7.description"),
    keywords: [
      "keyword 1",
      "keyword 2",
      // Add 8-12 relevant keywords
    ],
    path: "/tours/7",
    locale,
    image: "/images/Tours/Tour7.webp",
    type: "article",
  });
}

export default function Tour7Page() {
  return (
    <>
      <Script
        id="tour7-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateTourJsonLd({
              name: "Tour Name - X Days",
              description: "Tour description for SEO",
              provider: "AmsirarTrip",
              image: "https://amsirartrip.com/images/Tours/Tour7.webp",
              duration: "P7D", // ISO 8601 duration (P7D = 7 days)
              startLocation: "City Name",
              endLocation: "City Name",
              url: "https://amsirartrip.com/en/tours/7",
            })
          ),
        }}
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

3. **Update sitemap:** Add the route to `app/sitemap.ts` routes array:

```typescript
const routes = [
  // ... existing routes
  "/tours/7",
];
```

---

## SEO Utilities Reference

### `generateSEOMetadata(config)`

**Parameters:**

- `title` (string): Page title (will be appended with "| AmsirarTrip")
- `description` (string): Meta description (150-160 chars recommended)
- `keywords` (string[]): Array of keywords (8-12 recommended)
- `path` (string): Page path (e.g., "/tours/1")
- `locale` (string): Current language locale
- `image` (string, optional): OG image path (default: header image)
- `type` ("website" | "article", optional): OG type

**Returns:** Next.js Metadata object

### `generateTourJsonLd(data)`

**Parameters:**

- `name`: Tour name
- `description`: Tour description
- `provider`: "AmsirarTrip"
- `image`: Full URL to tour image
- `duration`: ISO 8601 duration (e.g., "P3D" for 3 days)
- `startLocation`: City name
- `endLocation`: City name
- `url`: Full URL to tour page
- `price` (optional): Price in EUR
- `currency` (optional): "EUR"

**Returns:** JSON-LD TouristTrip schema

### `generateExcursionJsonLd(data)`

**Parameters:**

- `name`: Excursion name
- `description`: Excursion description
- `provider`: "AmsirarTrip"
- `image`: Full URL to excursion image
- `duration`: "P1D" (day trip)
- `location`: Location name
- `url`: Full URL to excursion page

**Returns:** JSON-LD TouristAttraction schema

---

## Keywords Best Practices

### How to Choose Keywords

1. **Primary Keyword:** Main topic (e.g., "Merzouga desert tour")
2. **Long-tail Keywords:** Specific phrases (e.g., "3 day Sahara tour from Marrakech")
3. **Location Keywords:** Include cities (e.g., "Marrakech to Fes tour")
4. **Semantic Keywords:** Related terms (e.g., "camel trekking Morocco")

### Keyword Research Tools

- Google Keyword Planner
- Ahrefs
- SEMrush
- AnswerThePublic
- Google Search Console (existing queries)

---

## Image SEO Checklist

For every image:

- ✅ Use descriptive file names (`marrakech-tour.webp` not `IMG_1234.jpg`)
- ✅ Add alt text describing the image
- ✅ Use Next.js Image component for optimization
- ✅ WebP format for smaller file sizes
- ✅ Appropriate dimensions (1200x630 for OG images)

---

## Testing Your SEO

### 1. Google Rich Results Test

```
https://search.google.com/test/rich-results
```

Test any tour/excursion page to verify structured data.

### 2. Schema Validator

```
https://validator.schema.org/
```

Validate JSON-LD markup.

### 3. PageSpeed Insights

```
https://pagespeed.web.dev/
```

Check performance and SEO score.

### 4. Lighthouse (Chrome DevTools)

```
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "SEO" category
4. Click "Generate report"
```

Target Score: 95-100

### 5. Mobile-Friendly Test

```
https://search.google.com/test/mobile-friendly
```

---

## Common SEO Issues & Fixes

### Issue: Title Too Long

**Fix:** Keep titles under 60 characters

```typescript
title: "Short Tour Name - AmsirarTrip"; // ✅ Good
title: "Very Long Descriptive Tour Name..."; // ❌ Too long
```

### Issue: Description Too Short

**Fix:** Write 150-160 character descriptions

```typescript
description: "Visit Morocco's..."; // ❌ Too short (need 150+ chars)
```

### Issue: Missing Alt Text

**Fix:** Add descriptive alt text to all images

```typescript
<Image
  src="/image.webp"
  alt="Tourists riding camels in Merzouga desert at sunset" // ✅
/>
```

### Issue: Duplicate Content

**Fix:** Ensure each page has unique content and canonical URL

- Already handled by `generateSEOMetadata()` ✅

### Issue: Slow Page Load

**Fix:**

- Use Next.js Image optimization ✅
- Enable gzip/brotli compression on server
- Use CDN for static assets
- Lazy load images below fold

---

## Monitoring & Analytics

### Set Up (After Launch)

1. **Google Search Console**
   - Submit sitemap
   - Monitor indexed pages
   - Check search performance
   - Fix crawl errors

2. **Google Analytics 4**
   - Track page views
   - Monitor bounce rate
   - Set up conversion goals
   - Track booking form submissions

3. **Monthly Tasks**
   - Review top-performing pages
   - Check for 404 errors
   - Update meta descriptions if CTR is low
   - Add new keywords based on search trends

---

## Advanced Tips

### 1. Add FAQ Schema

For pages with FAQs, add FAQ structured data:

```typescript
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How long is the tour?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The tour is 3 days..."
    }
  }]
}
```

### 2. Add Review Schema

For customer testimonials:

```typescript
{
  "@context": "https://schema.org",
  "@type": "Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5"
  }
}
```

### 3. Add Breadcrumbs

Use `generateBreadcrumbJsonLd()` utility (already created in `structuredData.ts`)

---

## Emergency Fixes

### If Pages Aren't Indexed

1. Check `robots.txt` isn't blocking pages
2. Submit sitemap in Search Console
3. Verify no `noindex` meta tags
4. Check for server errors (500)

### If Rankings Drop

1. Check Search Console for manual actions
2. Verify all pages still have metadata
3. Check for broken internal links
4. Monitor Core Web Vitals
5. Ensure content is still relevant

### If Structured Data Errors

1. Test with Rich Results Test tool
2. Fix JSON-LD syntax errors
3. Ensure all required fields are present
4. Re-deploy and test again

---

## Support Resources

- **Next.js Metadata Docs:** <https://nextjs.org/docs/app/api-reference/functions/generate-metadata>
- **Google Search Central:** <https://developers.google.com/search>
- **Schema.org:** <https://schema.org/>
- **MDN Web Docs:** <https://developer.mozilla.org/en-US/docs/Web/HTML>

---

**Last Updated:** November 27, 2025  
**Version:** 1.0  
**Next Review:** December 27, 2025
