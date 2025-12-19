export interface TourStructuredData {
  name: string;
  description: string;
  provider: string;
  image: string;
  price?: number;
  currency?: string;
  duration: string;
  startLocation: string;
  endLocation: string;
  url: string;
}

/**
 * Sanitize string for JSON-LD to prevent XSS
 * Removes HTML tags and escapes special characters
 */
function sanitizeForJsonLd(value: string | undefined): string {
  if (!value) return "";
  return value
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .trim();
}

export function generateTourJsonLd(data: TourStructuredData) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: sanitizeForJsonLd(data.name),
    description: sanitizeForJsonLd(data.description),
    provider: {
      "@type": "TravelAgency",
      name: sanitizeForJsonLd(data.provider),
      url: "https://amsirartrip.com",
      logo: "https://amsirartrip.com/horse-head.svg",
      address: {
        "@type": "PostalAddress",
        addressCountry: "MA",
        addressLocality: "Marrakech",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+212-661-173-144",
        contactType: "Customer Service",
        availableLanguage: ["English", "French", "Spanish", "German"],
      },
    },
    image: data.image.startsWith("http")
      ? data.image
      : `https://amsirartrip.com${data.image}`,
    ...(data.price && {
      offers: {
        "@type": "Offer",
        price: data.price,
        priceCurrency: data.currency || "EUR",
        availability: "https://schema.org/InStock",
      },
    }),
    itinerary: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "TouristDestination",
          name: data.startLocation,
        },
        {
          "@type": "TouristDestination",
          name: data.endLocation,
        },
      ],
    },
    touristType: ["Adventure", "Cultural", "Nature"],
    duration: sanitizeForJsonLd(data.duration),
    url: data.url.startsWith("http")
      ? data.url
      : `https://amsirartrip.com${data.url}`,
  };
}

export interface ExcursionStructuredData {
  name: string;
  description: string;
  provider: string;
  image: string;
  duration: string;
  location: string;
  url: string;
}

export function generateExcursionJsonLd(data: ExcursionStructuredData) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: sanitizeForJsonLd(data.name),
    description: sanitizeForJsonLd(data.description),
    image: data.image.startsWith("http")
      ? data.image
      : `https://amsirartrip.com${data.image}`,
    provider: {
      "@type": "TravelAgency",
      name: sanitizeForJsonLd(data.provider),
      url: "https://amsirartrip.com",
    },
    touristType: ["Day Trip", "Cultural Experience"],
    isAccessibleForFree: false,
    publicAccess: true,
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
      addressRegion: "Marrakech-Safi",
    },
    url: data.url.startsWith("http")
      ? data.url
      : `https://amsirartrip.com${data.url}`,
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "AmsirarTrip",
    alternateName: "Amsirar Transport Touristique",
    url: "https://amsirartrip.com",
    logo: "https://amsirartrip.com/horse-head.svg",
    image: "https://amsirartrip.com/images/Header/header-1.webp",
    description:
      "Specialist in Morocco travel and tours, Sahara desert trips, and excursions to the imperial cities of Morocco.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
      addressLocality: "Marrakech",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+212-661-173-144",
      contactType: "Customer Service",
      areaServed: "MA",
      availableLanguage: ["English", "French", "Spanish", "German"],
    },
    sameAs: [
      "https://facebook.com/amsirartrip",
      "https://instagram.com/amsirartrip",
      "https://twitter.com/amsirartrip",
    ],
    priceRange: "€€-€€€",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "250",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: sanitizeForJsonLd(item.name),
      item: item.url.startsWith("http")
        ? item.url
        : `https://amsirartrip.com${item.url}`,
    })),
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQJsonLd(faqItems: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: sanitizeForJsonLd(item.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: sanitizeForJsonLd(item.answer),
      },
    })),
  };
}

export interface ReviewData {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}

export function generateReviewJsonLd(tourName: string, reviews: ReviewData[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: sanitizeForJsonLd(tourName),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      ).toFixed(1),
      reviewCount: reviews.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: sanitizeForJsonLd(review.author),
      },
      datePublished: review.datePublished,
      reviewBody: sanitizeForJsonLd(review.reviewBody),
      reviewRating: {
        "@type": "Rating",
        ratingValue: Math.max(1, Math.min(5, review.rating)), // Clamp rating between 1-5
        bestRating: "5",
        worstRating: "1",
      },
    })),
  };
}

export function generateLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://amsirartrip.com/#organization",
    name: "AmsirarTrip",
    image: "https://amsirartrip.com/images/Header/header-1.webp",
    logo: "https://amsirartrip.com/horse-head.svg",
    description:
      "Professional Morocco travel agency specializing in authentic Sahara desert tours, imperial city excursions, and personalized adventure experiences across Morocco.",
    url: "https://amsirartrip.com",
    telephone: "+212-661-173-144",
    email: "contact@amsirartrip.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Marrakech",
      addressLocality: "Marrakech",
      addressRegion: "Marrakech-Safi",
      postalCode: "40000",
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "31.6295",
      longitude: "-7.9811",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "22:00",
      },
    ],
    priceRange: "€€-€€€",
    servesCuisine: "Moroccan",
    sameAs: [
      "https://facebook.com/amsirartrip",
      "https://instagram.com/amsirartrip",
      "https://twitter.com/amsirartrip",
    ],
    areaServed: {
      "@type": "Country",
      name: "Morocco",
    },
  };
}

export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://amsirartrip.com/#website",
    url: "https://amsirartrip.com",
    name: "AmsirarTrip",
    description:
      "Authentic Morocco tours and desert adventures with local experts",
    publisher: {
      "@id": "https://amsirartrip.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://amsirartrip.com/tours?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["en", "fr", "de", "es"],
  };
}
