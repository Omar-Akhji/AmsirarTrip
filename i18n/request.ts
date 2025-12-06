import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Get locale from the request using the new API
  let locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (
    !locale ||
    !routing.locales.includes(locale as "en" | "fr" | "de" | "es")
  ) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../public/locales/${locale}/common.json`)).default,
  };
});
