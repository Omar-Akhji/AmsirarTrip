"use client";

import { useTranslations, useLocale as useNextIntlLocale } from "next-intl";

/**
 * Compatibility wrapper for react-i18next useTranslation hook
 * Provides a similar API using next-intl underneath
 */
export function useTranslation() {
  const translations = useTranslations();
  const locale = useNextIntlLocale();

  // Wrapper that supports values parameter for ICU message format
  // The second parameter can be either a default value (ignored) or values object
  const t = (
    key: string,
    defaultValueOrValues?: string | Record<string, string | number | Date>
  ) => {
    // If second param is an object, it's values for ICU messages
    if (typeof defaultValueOrValues === "object") {
      return translations(key, defaultValueOrValues);
    }
    // Otherwise it's a default value (ignored by next-intl)
    return translations(key);
  };

  return {
    t,
    i18n: {
      language: locale,
      changeLanguage: () => {
        // Next-intl handles language changes via routing
        console.warn("Language changes should be done via next-intl routing");
      },
    },
  };
}
