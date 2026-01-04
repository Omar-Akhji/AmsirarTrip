import { Metadata } from "next";

const SITE_NAME = "AmsirarTrip";
const BASE_URL = "https://amsirartrip.com";
const COMPANY_PHONE = "+212 (0) 6 61 17 31 44";
const COMPANY_EMAIL = "contact@amsirartrip.com";

// Localized taglines for SEO metadata
const SITE_TAGLINES: Record<string, string> = {
  en: "Morocco Travel Experts",
  fr: "Experts du Voyage au Maroc",
  de: "Marokko Reise-Experten",
  es: "Expertos en Viajes a Marruecos",
};

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  image?: string;
  locale?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  path,
  image = `${BASE_URL}/images/Header/header-1.webp`,
  locale = "en",
  type = "website",
  publishedTime,
  modifiedTime,
  author,
}: SEOConfig): Metadata {
  const url = `${BASE_URL}${path}`;
  const tagline = SITE_TAGLINES[locale] || SITE_TAGLINES.en;
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME} - ${tagline}`;

  // Ensure description is optimal length (150-160 chars)
  const truncatedDescription =
    description.length > 160
      ? description.substring(0, 157) + "..."
      : description;

  return {
    title: {
      absolute: fullTitle,
    },
    description: truncatedDescription,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    authors: author
      ? [{ name: author, url: BASE_URL }]
      : [{ name: SITE_NAME, url: BASE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "Travel & Tourism",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(BASE_URL),
    other: {
      "contact:phone_number": COMPANY_PHONE,
      "contact:email": COMPANY_EMAIL,
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${path}`,
        fr: `${BASE_URL}/fr${path}`,
        es: `${BASE_URL}/es${path}`,
        de: `${BASE_URL}/de${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description: truncatedDescription,
      url,
      siteName: SITE_NAME,
      locale,
      type,
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_NAME}`,
          type: "image/webp",
        },
      ],
      countryName: "Morocco",
    },
    twitter: {
      card: "summary_large_image",
      site: "@amsirartrip",
      creator: "@amsirartrip",
      title: fullTitle,
      description: truncatedDescription,
      images: {
        url: image,
        alt: `${title} - ${SITE_NAME}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // google: "YOUR_ACTUAL_GOOGLE_VERIFICATION_CODE", // Get from Google Search Console
      // yandex: "your-yandex-verification-code",
      // bing: "your-bing-verification-code",
    },
  };
}

export const defaultKeywords = [
  "AmsirarTrip",
  "Amsirartrip",
  "amsirartrip",
  "Amsirar",
  "amsirar",
  "Amsirar Trip",
  "Amsirar Tours",
  "Amsirar Morocco",
  "Morocco tours",
  "Sahara desert trips",
  "Marrakech excursions",
  "Morocco travel agency",
  "Atlas Mountains tours",
  "Imperial cities Morocco",
  "Morocco desert camping",
  "camel trekking Morocco",
  "Fes cultural tours",
  "Chefchaouen day trips",
  "private Morocco tours",
  "Morocco adventure travel",
  "authentic Morocco experiences",
  "Morocco tour packages",
  "guided tours Morocco",
  "Morocco holiday packages",
  "Moroccan adventure",
  "Merzouga tours",
  "Morocco day trips",
];
