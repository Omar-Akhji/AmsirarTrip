# Quick SEO Implementation Guide

This guide shows you how to apply the enhanced SEO patterns to your pages.

---

## For Tour Pages

### 1. Update generateMetadata function

```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  // Build comprehensive description
  const tourDescription = `${t(
    "tourX.overview"
  )} [Add unique selling points, highlights, and call-to-action]`;

  return generateSEOMetadata({
    title: `${t("tourX.title")} - [Duration] Day [Main Destination] Tour`,
    description: tourDescription,
    keywords: [
      "[Primary destination] tour",
      "[Duration] day [destination] tour",
      "[Starting city] to [destination]",
      "[Notable landmark] tour",
      "[Experience type] Morocco",
      // Add 8-12 total keywords
    ],
    path: `/${locale}/tours/X`,
    locale,
    image: "/images/Tours/TourX.webp",
    type: "article",
    publishedTime: "2024-01-15T00:00:00Z",
    modifiedTime: new Date().toISOString(),
    author: "AmsirarTrip",
  });
}
```

### 2. Add structured data Script

```typescript
export default function TourXPage() {
  return (
    <>
      <Script
        id="tourX-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateTourJsonLd({
              name: "[X Day Tour Name]",
              description: "[Comprehensive description with highlights]",
              provider: "AmsirarTrip",
              image: "https://amsirartrip.com/images/Tours/TourX.webp",
              price: XXX, // Price in EUR
              currency: "EUR",
              duration: "PXD", // ISO 8601: P3D = 3 days
              startLocation: "[City]",
              endLocation: "[City]",
              url: `https://amsirartrip.com/en/tours/X`,
            })
          ),
        }}
      />
      <TourLayout
        tourKey="tourX"
        bookingId={X}
        imageSrc="/images/Tours/TourX.webp"
      />
    </>
  );
}
```

---

## For Excursion Pages

### 1. Update generateMetadata function

```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generateSEOMetadata({
    title: `${t("excursionX.title")} - Day Trip from [City]`,
    description: t("excursionX.overview"),
    keywords: [
      "[Destination] day trip",
      "[City] to [destination]",
      "[Destination] excursion",
      "[Activity] [destination]",
      "[Destination] guided tour",
      // Add more specific keywords
    ],
    path: `/${locale}/excursion/X`,
    locale,
    image: "/images/Excursions/ExcursionX.webp",
    type: "article",
    publishedTime: "2024-01-15T00:00:00Z",
    modifiedTime: new Date().toISOString(),
    author: "AmsirarTrip",
  });
}
```

### 2. Add structured data Script

```typescript
export default function ExcursionXPage() {
  return (
    <>
      <Script
        id="excursionX-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateExcursionJsonLd({
              name: "[Excursion Name]",
              description: "[Full description]",
              provider: "AmsirarTrip",
              image:
                "https://amsirartrip.com/images/Excursions/ExcursionX.webp",
              duration: "P1D", // 1 day
              location: "[Destination]",
              url: `https://amsirartrip.com/en/excursion/X`,
            })
          ),
        }}
      />
      <ExcursionLayout
        excursionKey="excursionX"
        bookingId={X}
        imageSrc="/images/Excursions/ExcursionX.webp"
      />
    </>
  );
}
```

---

## For Static Pages (About, Contact, etc.)

### Update generateMetadata function

```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generateSEOMetadata({
    title: t("about.title"), // or t("contact.title")
    description: t("about.description"),
    keywords: [
      "Morocco travel agency",
      "About AmsirarTrip",
      "Morocco tour company",
      "Professional Morocco guides",
      // Add relevant keywords
    ],
    path: `/${locale}/about`, // or /contact
    locale,
    image: "/images/Header/header-1.webp",
    type: "website",
  });
}
```

---

## Adding Breadcrumbs

Add to any page for better navigation and SEO:

```typescript
import { generateBreadcrumbJsonLd } from "@/lib/structuredData";

export default function TourXPage() {
  const breadcrumbItems = [
    { name: "Home", url: "https://amsirartrip.com" },
    { name: "Tours", url: "https://amsirartrip.com/tours" },
    { name: "Tour Name", url: "https://amsirartrip.com/tours/X" },
  ];

  return (
    <>
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLd(breadcrumbItems)),
        }}
      />
      {/* Rest of page */}
    </>
  );
}
```

---

## Adding FAQs

For pages with FAQ sections:

```typescript
import { generateFAQJsonLd, FAQItem } from "@/lib/structuredData";

export default function TourXPage() {
  const faqItems: FAQItem[] = [
    {
      question: "What is included in the tour price?",
      answer:
        "The tour includes accommodation, transportation, guide services, and meals as specified in the itinerary.",
    },
    {
      question: "What should I bring?",
      answer:
        "We recommend bringing comfortable walking shoes, sunscreen, a hat, and a camera.",
    },
    // Add more FAQs
  ];

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQJsonLd(faqItems)),
        }}
      />
      {/* Rest of page with actual FAQ section */}
    </>
  );
}
```

---

## Adding Reviews

For pages displaying customer reviews:

```typescript
import { generateReviewJsonLd, ReviewData } from "@/lib/structuredData";

export default function TourXPage() {
  const reviews: ReviewData[] = [
    {
      author: "John Smith",
      rating: 5,
      reviewBody:
        "Amazing experience! The desert was breathtaking and our guide was excellent.",
      datePublished: "2024-01-10",
    },
    // Add more reviews
  ];

  return (
    <>
      <Script
        id="review-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateReviewJsonLd("Tour Name", reviews)),
        }}
      />
      {/* Rest of page */}
    </>
  );
}
```

---

## Keyword Selection Tips

### 1. Primary Keywords (High Priority)

- Main destination + "tour"
- Duration + destination
- Starting city + "to" + destination

### 2. Long-Tail Keywords (High Conversion)

- Specific experiences (e.g., "camel trekking Merzouga")
- Tour features (e.g., "luxury desert camping Morocco")
- Landmarks (e.g., "Ait Ben Haddou tour from Marrakech")

### 3. Location-Based Keywords

- City names + "day trip"
- Region names + "excursion"
- Landmark names + "visit"

### 4. Activity Keywords

- "Morocco adventure travel"
- "Morocco cultural tours"
- "Morocco desert safari"

---

## Best Practices

### Titles

✅ Include primary keyword at the beginning
✅ Keep under 60 characters
✅ Include brand name
✅ Be descriptive and compelling

### Descriptions

✅ 150-160 characters optimal
✅ Include primary and secondary keywords
✅ Add a call-to-action
✅ Be unique for each page

### Keywords

✅ 8-15 keywords per page
✅ Mix of high-volume and long-tail
✅ Include location-based terms
✅ Use natural language variations

### Images

✅ Use high-quality, relevant images
✅ Optimize file sizes (WebP format)
✅ Use descriptive alt text
✅ Include in structured data

---

## Validation Steps

After implementing SEO on a page:

1. **Check for TypeScript errors**: `npm run type-check`
2. **Test in browser**: Navigate to the page
3. **Validate structured data**:
   - Open [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Enter your page URL
   - Check for errors
4. **Check metadata**:
   - View page source
   - Verify meta tags are present
   - Check OpenGraph tags
5. **Mobile test**:
   - Use responsive design mode
   - Check mobile meta tags

---

## Common Patterns

### Import statements

```typescript
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from "@/lib/metadata";
import {
  generateTourJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/structuredData";
import { Metadata } from "next";
import Script from "next/script";
```

### Metadata export

```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Implementation
}
```

### Structured data Script

```typescript
<Script
  id="unique-id-jsonld"
  type="application/ld+json"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
/>
```

---

## Need Help?

- Review `SEO-ENHANCEMENTS.md` for detailed information
- Check `.github/copilot-instructions.md` for project patterns
- Look at `app/[locale]/tours/1/page.tsx` as a complete example
- Use Google Rich Results Test to validate changes

---

**Quick Reference Version:** 1.0  
**Last Updated:** 2025-01-XX
