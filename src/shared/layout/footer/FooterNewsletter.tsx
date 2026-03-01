import React, { useState } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { RECAPTCHA_V3_SITE_KEY } from "@/lib/client-env";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@/lib/fontawesome";

// Type declaration for grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

function loadRecaptchaV3(
  siteKey: string | undefined
): Promise<typeof window.grecaptcha | null> {
  return new Promise((resolve) => {
    if (!siteKey) {
      resolve(null);
      return;
    }
    if (typeof window.grecaptcha !== "undefined" && window.grecaptcha?.ready) {
      window.grecaptcha.ready(() => resolve(window.grecaptcha));
      return;
    }
    const existing = document.getElementById("recaptcha-v3");
    if (existing) {
      existing.addEventListener("load", () => {
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => resolve(window.grecaptcha));
        } else {
          resolve(null);
        }
      });
      existing.addEventListener("error", () => resolve(null));
      return;
    }
    const script = document.createElement("script");
    script.id = "recaptcha-v3";
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(
      siteKey
    )}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => resolve(window.grecaptcha));
      } else {
        resolve(null);
      }
    };
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
}

/**
 * Get reCAPTCHA token using promise chains (avoids try/catch with conditionals
 * which React Compiler cannot optimize).
 */
async function getRecaptchaToken(siteKey: string | undefined): Promise<string> {
  if (!siteKey) return "";
  const grecaptcha = await loadRecaptchaV3(siteKey).catch(() => null);
  if (!grecaptcha) return "";
  return grecaptcha.execute(siteKey, { action: "newsletter" }).catch(() => "");
}

/**
 * Submit newsletter subscription using promise chains.
 */
async function submitNewsletter(
  email: string,
  recaptchaToken: string
): Promise<{ ok: boolean; statusKey: string }> {
  const response = await fetch("/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, recaptchaToken }),
  }).catch(() => null);

  if (!response) return { ok: false, statusKey: "footer.newsletterNetwork" };

  const data = await response.json().catch(() => ({ ok: false }));
  if (data.ok) return { ok: true, statusKey: "footer.newsletterSuccess" };
  return { ok: false, statusKey: "footer.newsletterFailure" };
}

export function FooterNewsletter() {
  const { t } = useTranslation();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatusKey, setNewsletterStatusKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SITE_KEY = RECAPTCHA_V3_SITE_KEY;

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const recaptchaToken = await getRecaptchaToken(SITE_KEY);
    const result = await submitNewsletter(newsletterEmail, recaptchaToken);

    if (result.ok) {
      setNewsletterEmail("");
    }
    setNewsletterStatusKey(result.statusKey);

    setIsSubmitting(false);
    setTimeout(() => setNewsletterStatusKey(""), 5000);
  };

  return (
    <div className="md:col-span-2 lg:col-span-1">
      <h3 className="mb-2 text-sm font-semibold tracking-wider text-white uppercase">
        {t("footer.newsletter")}
      </h3>
      <span className="bg-orange mb-6 block h-1 w-12 rounded" />
      <div className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 p-4 backdrop-blur-sm">
        <p className="mb-4 text-sm leading-relaxed text-slate-400">
          Subscribe to get exclusive offers and travel tips
        </p>
        <form
          onSubmit={handleNewsletterSubmit}
          aria-label={t("footer.newsletterAria")}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <input
              type="email"
              name="email"
              placeholder={t("footer.newsletterPlaceholder")}
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              aria-label={t("footer.newsletterInputAria")}
              autoComplete="email"
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white transition-all duration-300 placeholder:text-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            aria-label={t("footer.newsletterButtonAria")}
            className="from-orange hover:shadow-orange/30 flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-r to-amber-500 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <svg
                className="size-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            )}
          </button>
        </form>
        {newsletterStatusKey && (
          <p
            className={`mt-3 text-xs font-medium ${
              newsletterStatusKey.includes("Success")
                ? "text-emerald-400"
                : "text-orange"
            }`}
          >
            {t(newsletterStatusKey)}
          </p>
        )}

        {/* Social icons under newsletter */}
        <FooterSocialLinks />
      </div>
    </div>
  );
}

function FooterSocialLinks() {
  const { t } = useTranslation();

  return (
    <nav aria-label={t("footer.socialAria")} className="mt-4">
      <ul className="flex flex-wrap items-center justify-center gap-3">
        <li>
          <a
            href="https://www.facebook.com/profile.php?id=61571322141368"
            aria-label={t("footer.social.facebook")}
            className="inline-flex size-10 items-center justify-center rounded-full bg-white text-center transition-[transform_0.12s_ease,box-shadow_0.12s_ease] hover:-translate-y-1 hover:shadow-[0_8px_18px_rgba(0,0,0,0.28)] sm:size-11"
          >
            <FontAwesomeIcon
              icon={byPrefixAndName.fab["facebook-f"]}
              className="text-dark-grey text-base sm:text-lg"
            />
          </a>
        </li>
        <li>
          <a
            href="https://x.com/AmsirarTravel"
            aria-label={t("footer.social.twitter")}
            className="inline-flex size-10 items-center justify-center rounded-full bg-white text-center transition-[transform_0.12s_ease,box-shadow_0.12s_ease] hover:-translate-y-1 hover:shadow-[0_8px_18px_rgba(0,0,0,0.28)] sm:size-11"
          >
            <FontAwesomeIcon
              icon={byPrefixAndName.fab["x-twitter"]}
              className="text-dark-grey text-base sm:text-lg"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/amsirar.trip?igsh=ZDlxanNsbTA5M2Zi"
            aria-label={t("footer.social.instagram")}
            className="inline-flex size-10 items-center justify-center rounded-full bg-white text-center transition-[transform_0.12s_ease,box-shadow_0.12s_ease] hover:-translate-y-1 hover:shadow-[0_8px_18px_rgba(0,0,0,0.28)] sm:size-11"
          >
            <FontAwesomeIcon
              icon={byPrefixAndName.fab.instagram}
              className="text-dark-grey text-base sm:text-lg"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.tiktok.com/@amsirartrip"
            aria-label={t("footer.social.tiktok")}
            className="inline-flex size-10 items-center justify-center rounded-full bg-white text-center transition-[transform_0.12s_ease,box-shadow_0.12s_ease] hover:-translate-y-1 hover:shadow-[0_8px_18px_rgba(0,0,0,0.28)] sm:size-11"
          >
            <FontAwesomeIcon
              icon={byPrefixAndName.fab.tiktok}
              className="text-dark-grey text-base sm:text-lg"
            />
          </a>
        </li>
      </ul>
    </nav>
  );
}
