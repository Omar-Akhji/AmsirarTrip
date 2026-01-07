"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/routing";
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

export default function FooterTailwind() {
  const { t } = useTranslation();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatusKey, setNewsletterStatusKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SITE_KEY = RECAPTCHA_V3_SITE_KEY;

  const loadRecaptchaV3 = (): Promise<typeof window.grecaptcha | null> => {
    return new Promise((resolve) => {
      if (!SITE_KEY) {
        resolve(null);
        return;
      }
      if (
        typeof window.grecaptcha !== "undefined" &&
        window.grecaptcha?.ready
      ) {
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
        SITE_KEY
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
  };

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      let recaptchaToken = "";
      try {
        const grecaptcha = await loadRecaptchaV3();
        if (grecaptcha && SITE_KEY) {
          recaptchaToken = await grecaptcha.execute(SITE_KEY, {
            action: "newsletter",
          });
        }
      } catch {
        // ignore
      }

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail, recaptchaToken }),
      });
      const data = await response.json();
      if (data.ok) {
        setNewsletterStatusKey("footer.newsletterSuccess");
        setNewsletterEmail("");
      } else {
        setNewsletterStatusKey("footer.newsletterFailure");
      }
    } catch {
      setNewsletterStatusKey("footer.newsletterNetwork");
    } finally {
      setIsSubmitting(false);
    }
    setTimeout(() => setNewsletterStatusKey(""), 5000);
  };

  // Quick links removed for a cleaner footer design

  return (
    <footer
      className="border-orange relative z-10 mt-0 box-border w-full overflow-hidden border-t-4 bg-linear-to-b from-[#18191a] to-[#202124] py-6 text-left leading-[1.6] text-white shadow-[0_-8px_24px_rgba(0,0,0,0.35)] sm:py-8"
      role="contentinfo"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-orange/5 absolute -top-16 -right-16 size-72 rounded-full blur-3xl" />
        <div className="bg-orange/3 absolute -bottom-20 -left-20 size-87.5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-white/2 to-transparent" />
      </div>

      {/* Top accent removed */}

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="mx-auto max-w-7xl p-8">
          <div className="grid grid-cols-1 items-baseline gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-2">
                <Link
                  href="/"
                  prefetch={true}
                  className="group inline-flex items-center gap-1"
                  aria-label="AmsirarTrip homepage"
                >
                  <span className="text-3xl font-bold tracking-tight text-white transition-transform duration-300 group-hover:scale-105">
                    Amsirar
                  </span>
                  <span className="text-orange font-fancy text-3xl transition-all duration-300 group-hover:text-amber-400">
                    Trip
                  </span>
                </Link>
              </div>
              <span className="bg-orange mb-6 block h-1 w-12 rounded" />
              <p className="font-fancy text-xl leading-relaxed text-slate-400 sm:w-full lg:max-w-sm">
                {t("footer.description")}
              </p>

              {/* Social Links removed from brand section */}
            </div>

            {/* Quick Links removed */}

            {/* Contact & Newsletter (swapped to left) */}
            <div className="space-y-6 lg:col-span-1">
              {/* Contact Info */}
              <div>
                <h3 className="mb-2 text-sm font-semibold tracking-wider text-white uppercase">
                  {t("footer.office")}
                </h3>
                <span className="bg-orange mb-6 block h-1 w-12 rounded" />
                <address className="space-y-4 not-italic">
                  <div className="group grid grid-cols-[36px_1fr] items-start gap-x-3">
                    <div className="text-orange group-hover:bg-orange/10 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300">
                      <svg
                        className="size-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <p className="max-w-67.5 text-sm leading-relaxed text-slate-400">
                      Imm. J appt N° 5, Résidence La Perle de l&apos;Atlas,
                      angle Rue aboubakr, Marrakech
                    </p>
                  </div>

                  <div className="group grid grid-cols-[36px_1fr] items-center gap-x-3">
                    <div className="text-orange group-hover:bg-orange/10 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300">
                      <svg
                        className="size-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <a
                      href="mailto:amsirare@gmail.com"
                      className="hover:text-orange text-sm text-slate-400 transition-colors duration-300"
                    >
                      amsirare@gmail.com
                    </a>
                  </div>

                  <div className="group grid grid-cols-[36px_1fr] items-center gap-x-3">
                    <div className="text-orange group-hover:bg-orange/10 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300">
                      <svg
                        className="size-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <rect
                          x="7"
                          y="2"
                          width="10"
                          height="20"
                          rx="2"
                          ry="2"
                          strokeWidth={1.5}
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M11 18h2"
                        />
                      </svg>
                    </div>
                    <a
                      href="tel:+212661173144"
                      className="hover:text-orange text-sm text-slate-400 transition-colors duration-300"
                    >
                      +212 (0) 6 61 17 31 44
                    </a>
                  </div>

                  <div className="group grid grid-cols-[36px_1fr] items-center gap-x-3">
                    <div className="text-orange group-hover:bg-orange/10 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300">
                      <svg
                        className="size-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 5a2 2 0 012-2h2.5a1 1 0 01.9.56l1.2 2.4a1 1 0 01-.2 1.08L7.7 9.9a8 8 0 004.6 4.6l1.86-1.72a1 1 0 011.08-.2l2.4 1.2a1 1 0 01.56.9V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                        />
                      </svg>
                    </div>
                    <a
                      href="tel:+21205661731444"
                      className="hover:text-orange text-sm text-slate-400 transition-colors duration-300"
                    >
                      +212 (0) 5 6 61 73 14 44
                    </a>
                  </div>
                </address>
              </div>
            </div>
            {/* Popular Places removed */}

            {/* Newsletter (separate column) */}
            <div className="md:col-span-2 lg:col-span-1">
              {/* Newsletter title outside card */}
              <h3 className="mb-2 text-sm font-semibold tracking-wider text-white uppercase">
                {t("footer.newsletter")}
              </h3>
              <span className="bg-orange mb-6 block h-1 w-12 rounded" />
              {/* Newsletter */}
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
                      className="focus:border-orange/50 focus:ring-orange/20 h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white transition-all duration-300 placeholder:text-slate-500 focus:ring-2 focus:outline-none"
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

                {/* Social icons under newsletter (restored original design) */}
                <nav aria-label={t("footer.socialAria")} className="mt-4">
                  <div className="flex flex-wrap items-center justify-start gap-3">
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
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      href="#"
                      aria-label={t("footer.social.twitter")}
                      className="inline-flex size-10 items-center justify-center rounded-full bg-white text-center transition-[transform_0.12s_ease,box-shadow_0.12s_ease] hover:-translate-y-1 hover:shadow-[0_8px_18px_rgba(0,0,0,0.28)] sm:size-11"
                    >
                      <FontAwesomeIcon
                        icon={byPrefixAndName.fab["x-twitter"]}
                        className="text-dark-grey text-base sm:text-lg"
                      />
                    </a>
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
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl p-4 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <p className="text-center text-xl text-slate-500">
                <small>
                  ©{" "}
                  <time dateTime={new Date().getFullYear().toString()}>
                    {new Date().getFullYear()}
                  </time>{" "}
                  AmsirarTrip. Ltd. {t("footer.copyright")}
                </small>
              </p>

              <div className="flex gap-4 text-xl text-slate-500">
                <Link
                  href="/privacy-policy"
                  className="text-slate-500 transition-colors hover:text-white"
                >
                  <small>{t("legal.footer.privacyPolicy")}</small>
                </Link>
                <span className="text-white/20">|</span>
                <Link
                  href="/terms-of-service"
                  className="text-slate-500 transition-colors hover:text-white"
                >
                  <small>{t("legal.footer.termsOfService")}</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
