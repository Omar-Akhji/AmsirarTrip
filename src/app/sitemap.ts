import { MetadataRoute } from "next";
import { TOURS_DATA } from "@/features/tours";
import { EXCURSIONS_DATA } from "@/features/excursions";

const BASE_URL = "https://amsirartrip.com";
const locales = ["en", "fr", "es", "de"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/tours",
    ...TOURS_DATA.map((tour) => tour.route),
    ...EXCURSIONS_DATA.map((excursion) => excursion.route),
    "/about",
    "/contact",
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate entries for each locale
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${BASE_URL}/${locale}${route}`,
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
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${BASE_URL}/${loc}${route}`])
          ),
        },
      });
    });
  });

  return sitemap;
}
