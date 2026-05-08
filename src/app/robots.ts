import type { MetadataRoute } from "next";

const BASE_URL = "https://amsirartrip.com";

/**
 * Robots.txt — Google Search Console compliant.
 *
 * Rules applied:
 * - No `host` directive (non-standard, ignored by all major crawlers)
 * - Disallow internal/auth paths
 * - Explicit Googlebot rule with max snippet directives
 * - AI crawlers allowed for GEO visibility
 * - Sitemap reference for discovery
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/booking/",
          "/account/",
          "/search/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/booking/", "/account/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/booking/", "/account/"],
        crawlDelay: 1,
      },
      // AI crawlers — selective access for GEO (Generative Engine Optimisation)
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/booking/", "/account/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "CCBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
