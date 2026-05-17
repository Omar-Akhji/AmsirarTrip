import type { MetadataRoute } from "next";
import { getExcursionSlugs } from "@/features/excursions/data/excursionsMetadata";
import { getTourSlugs } from "@/features/tours/data/toursMetadata";

const BASE_URL = "https://amsirartrip.com";
const LOCALES = ["en", "fr", "es", "de"] as const;

/**
 * Last meaningful content update date.
 * Update this when real content changes — never use `new Date()` per build,
 * as Google penalises spoofed lastmod signals with slower crawl rates.
 */
const CONTENT_LAST_MODIFIED = "2026-05-08";

/**
 * Build hreflang alternates for a given path.
 * Includes x-default (English canonical) and all supported locales.
 */
function buildAlternates(path: string) {
  return {
    languages: Object.fromEntries([
      ["x-default", `${BASE_URL}${path}`],
      ...LOCALES.map((locale) => [
        locale,
        locale === "en" ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`,
      ]),
    ]),
  };
}

/**
 * XML Sitemap — Google Search Console optimised.
 *
 * Rules applied:
 * - Only canonical, indexable URLs (no noIndex pages like legal)
 * - Stable lastModified (real content date, not build time)
 * - No changeFrequency / priority (Google ignores both since 2024)
 * - hreflang alternates for all 4 locales
 * - Uses metadata registries instead of display data imports
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const tourSlugs = getTourSlugs();
  const excursionSlugs = getExcursionSlugs();

  const staticRoutes = [
    "", // Home
    "/tours",
    "/excursions",
    "/about",
    "/contact",
  ];

  const dynamicRoutes = [
    ...tourSlugs.map((slug) => `/tours/${slug}`),
    ...excursionSlugs.map((slug) => `/excursions/${slug}`),
  ];

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  return allRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: CONTENT_LAST_MODIFIED,
    alternates: buildAlternates(route),
  }));
}
