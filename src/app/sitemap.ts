import { MetadataRoute } from "next";
import { TOURS_DATA } from "@/features/tours";
import { EXCURSIONS_DATA } from "@/features/excursions";

const BASE_URL = "https://amsirartrip.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/tours",
    ...TOURS_DATA.map((tour) => tour.route),
    ...EXCURSIONS_DATA.map((excursion) => excursion.route),
    "/about",
    "/contact",
  ];

  // Generate ONE entry per route with all language alternates
  // This prevents duplicate canonical issues in Google Search Console
  return routes.map((route) => ({
    // Canonical URL is always English (no locale prefix)
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route.includes("/tours/") || route.includes("/excursions/")
        ? "weekly"
        : route === ""
          ? "daily"
          : "monthly",
    priority:
      route === ""
        ? 1.0
        : route.includes("/tours/") || route.includes("/excursions/")
          ? 0.8
          : 0.7,
    alternates: {
      languages: {
        // x-default points to the canonical (English) version
        "x-default": `${BASE_URL}${route}`,
        en: `${BASE_URL}${route}`,
        fr: `${BASE_URL}/fr${route}`,
        es: `${BASE_URL}/es${route}`,
        de: `${BASE_URL}/de${route}`,
      },
    },
  }));
}
