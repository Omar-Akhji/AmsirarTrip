import type { Metadata } from "next";

const SITE_NAME = "Amsirar Trip";
const BASE_URL = "https://amsirartrip.com";
const COMPANY_PHONE = "+212 (0) 6 61 17 31 44";
const COMPANY_EMAIL = "contact@amsirartrip.com";

/**
 * OpenGraph expects locale in `language_TERRITORY` format.
 * Maps our short locale codes to proper OG locale strings.
 */
const OG_LOCALES: Record<string, string> = { en: "en_US", fr: "fr_FR", de: "de_DE", es: "es_ES" };

interface SEOConfig {
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
  /** Set to true to prevent Google from indexing this page */
  noIndex?: boolean;
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
  noIndex = false,
}: SEOConfig): Metadata {
  const isDefaultLocale = locale === "en";
  const localePath = isDefaultLocale ? path : `/${locale}${path}`;
  const url = `${BASE_URL}${localePath}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  // Ensure description is optimal length (150-160 chars)
  const truncatedDescription =
    description.length > 160 ? description.slice(0, 157) + "..." : description;

  return {
    title: { absolute: fullTitle },
    description: truncatedDescription,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    authors: author ? [{ name: author, url: BASE_URL }] : [{ name: SITE_NAME, url: BASE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "Travel & Tourism",
    formatDetection: { email: false, address: false, telephone: false },
    metadataBase: new URL(BASE_URL),
    appleWebApp: { title: SITE_NAME, statusBarStyle: "black-translucent", capable: true },
    other: { "contact:phone_number": COMPANY_PHONE, "contact:email": COMPANY_EMAIL },
    alternates: {
      canonical: url,
      languages: {
        "x-default": `${BASE_URL}${path}`,
        en: `${BASE_URL}${path}`,
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
      locale: OG_LOCALES[locale] || "en_US",
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
      images: { url: image, alt: `${title} - ${SITE_NAME}` },
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/** Focused keyword set — 15 terms max to avoid keyword dilution */
export const defaultKeywords = [
  "Amsirar Trip",
  "Morocco tours",
  "Sahara desert tours",
  "Marrakech excursions",
  "Morocco travel agency",
  "Atlas Mountains tours",
  "Imperial cities Morocco",
  "Merzouga desert tours",
  "Morocco adventure travel",
  "private Morocco tours",
  "camel trekking Morocco",
  "Morocco desert camping",
  "authentic Morocco experiences",
  "Morocco guided tours",
  "Morocco day trips",
];
