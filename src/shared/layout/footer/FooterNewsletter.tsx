"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { RECAPTCHA_V2_SITE_KEY, hasRecaptchaV2 } from "@/lib/client-env";
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@/lib/fontawesome";
import { X, Mail, User, Loader2 } from "lucide-react";
import { m } from "motion/react";
import { fadeInUp } from "@/lib/constants/animations";

/**
 * Submit newsletter subscription with name, email, and reCAPTCHA v2 token.
 */
async function submitNewsletter(
  name: string,
  email: string,
  recaptchaToken: string
): Promise<{ ok: boolean; statusKey: string }> {
  const response = await fetch("/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, recaptchaToken }),
  }).catch(() => null);

  if (!response) return { ok: false, statusKey: "footer.newsletterNetwork" };

  const data = await response.json().catch(() => ({ ok: false }));
  if (data.ok) return { ok: true, statusKey: "footer.newsletterSuccess" };
  return { ok: false, statusKey: "footer.newsletterFailure" };
}

/* ─── Newsletter Modal Dialog ─── */

function NewsletterModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [statusKey, setStatusKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync native <dialog> open state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  // Close on Escape (native dialog handles this, but we need to sync state)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = () => onClose();
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || isSubmitting) return;

    const recaptchaToken = recaptchaRef.current?.getValue() || "";
    if (!recaptchaToken) {
      setStatusKey("footer.newsletterCaptchaError");
      return;
    }

    setIsSubmitting(true);
    const result = await submitNewsletter(name, email, recaptchaToken);

    if (result.ok) {
      setName("");
      setEmail("");
      recaptchaRef.current?.reset();
      setTimeout(() => onClose(), 2000);
    }
    setStatusKey(result.statusKey);
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      className="fixed inset-0 z-50 m-auto w-[95vw] max-w-md overflow-visible rounded-3xl border border-gray-200 bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm open:flex open:flex-col"
    >
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {t("footer.newsletter")}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
              {t("footer.newsletterDescription")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("footer.newsletterCloseAria")}
            className="-mt-1 -mr-1 flex size-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} aria-label={t("footer.newsletterAria")}>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="newsletter-name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                {t("footer.newsletterNameLabel")}
              </label>
              <div className="relative">
                <User className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="newsletter-name"
                  type="text"
                  name="name"
                  placeholder={t("footer.newsletterNamePlaceholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  minLength={2}
                  autoComplete="name"
                  className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pr-4 pl-10 text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="newsletter-email"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                {t("footer.newsletterInputAria")}
              </label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  placeholder={t("footer.newsletterPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pr-4 pl-10 text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                />
              </div>
            </div>

            {/* reCAPTCHA v2 — wrapped like BookingForm */}
            <div className="flex justify-center pt-1">
              <div
                className={`origin-center scale-[0.85] rounded-2xl border border-dashed p-3 sm:scale-100 ${
                  statusKey.includes("Captcha")
                    ? "border-red-300"
                    : "border-gray-200"
                }`}
              >
                {hasRecaptchaV2 ? (
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={RECAPTCHA_V2_SITE_KEY}
                    theme="light"
                    size="normal"
                  />
                ) : (
                  <div className="rounded-lg bg-amber-50 p-2 text-sm text-amber-600">
                    reCAPTCHA not configured
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status message */}
          {statusKey && (
            <p
              className={`mt-4 text-center text-sm font-medium ${
                statusKey.includes("Success")
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {t(statusKey)}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="from-orange mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r to-amber-500 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              t("footer.newsletterSubscribe")
            )}
          </button>
        </form>
      </div>
    </dialog>
  );
}

/* ─── Footer Newsletter Section ─── */

export function FooterNewsletter() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <m.div
      {...fadeInUp}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="md:col-span-2 lg:col-span-1"
    >
      <h3 className="mb-2 text-sm font-semibold tracking-wider text-white uppercase">
        {t("footer.newsletter")}
      </h3>
      <span className="bg-orange mb-6 block h-1 w-12 rounded" />
      <div className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 p-4 backdrop-blur-sm">
        <p className="mb-4 text-sm leading-relaxed text-slate-400">
          {t("footer.newsletterDescription")}
        </p>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          aria-label={t("footer.newsletterButtonAria")}
          className="from-orange flex h-10 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r to-amber-500 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.98]"
        >
          <Mail className="size-4" />
          {t("footer.newsletterSubscribe")}
        </button>

        {/* Social icons under newsletter */}
        <FooterSocialLinks />
      </div>

      <NewsletterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </m.div>
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
