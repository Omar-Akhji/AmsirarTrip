interface TourStructuredData {
  name: string;
  description: string;
  provider: string;
  image: string;
  price?: number | undefined;
  currency?: string | undefined;
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

interface ExcursionStructuredData {
  name: string;
  description: string;
  provider: string;
  image: string;
  price?: number | undefined;
  currency?: string | undefined;
  duration: string;
  location: string;
  url: string;
}

export function generateExcursionJsonLd(data: ExcursionStructuredData) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
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
          name: data.location,
        },
      ],
    },
    touristType: ["Day Trip", "Cultural Experience"],
    duration: sanitizeForJsonLd(data.duration),
    url: data.url.startsWith("http")
      ? data.url
      : `https://amsirartrip.com${data.url}`,
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Amsirar Trip",
    alternateName: [
      "Amsirar",
      "AmsirarTrip",
      "amsirartrip",
      "Amsirar Tours",
      "Amsirar Morocco",
    ],
    url: "https://amsirartrip.com",
    logo: "https://amsirartrip.com/horse-head.svg",
    image: "https://amsirartrip.com/images/Header/header-1.webp",
    description:
      "Amsirar Trip is a specialist Morocco travel agency offering authentic Sahara desert tours, imperial city excursions, Atlas Mountains treks, and cultural experiences. Book your Morocco adventure with local experts.",
    legalName: "Amsirar Trip",
    foundingDate: "2004",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
    knowsAbout: [
      "Morocco Tourism",
      "Sahara Desert Tours",
      "Atlas Mountains Trekking",
      "Cultural Heritage",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Marrakech",
      addressLocality: "Marrakech",
      addressRegion: "Marrakech-Safi",
      postalCode: "40000",
      addressCountry: "MA",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "250",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Kevin B.",
        },
        datePublished: "2023-11-15",
        reviewBody:
          "An unforgettable journey! From the bustling souks of Marrakech to the silent dunes of Merzouga. Amsirar Trip took care of everything.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Ben L.",
        },
        datePublished: "2024-02-10",
        reviewBody:
          "Professional, punctual, and passionate. Our driver was incredibly knowledgeable and made us feel safe throughout the entire Atlas Mountains trek.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Sara M.",
        },
        datePublished: "2024-03-22",
        reviewBody:
          "The luxury desert camp was beyond our expectations. Watching the sunrise over the Sahara while sipping traditional mint tea is a memory I'll cherish forever.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
      },
    ],
  };
}

export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Amsirar Trip",
    alternateName: ["AmsirarTrip", "Amsirar", "Amsirar Tours"],
    url: "https://amsirartrip.com",
    description:
      "Amsirar Trip offers authentic Morocco tours, Sahara desert adventures, and cultural experiences with local experts.",
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
