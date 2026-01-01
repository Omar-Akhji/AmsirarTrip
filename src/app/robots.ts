import { MetadataRoute } from "next";

const BASE_URL = "https://amsirartrip.com";
const locales = ["en", "fr", "es", "de"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/images/", "/fonts/", "/videos/", "/_next/image"],
        disallow: ["/api/", "/_next/static/", "/*.json$"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 1,
      },
      // Allow AI bots for better visibility (GEO)
      {
        userAgent: "GPTBot",
        allow: "/",
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
        userAgent: "FacebookBot",
        allow: "/",
      },
    ],
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      ...locales.map((locale) => `${BASE_URL}/${locale}/sitemap.xml`),
    ],
    host: BASE_URL,
  };
}
