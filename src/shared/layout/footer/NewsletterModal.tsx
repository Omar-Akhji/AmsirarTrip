"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { RECAPTCHA_V2_SITE_KEY, hasRecaptchaV2 } from "@/lib/client-env";
import ReCAPTCHA from "react-google-recaptcha";
import { X, Mail, User, Loader2 } from "lucide-react";

import { submitNewsletterAction } from "@/lib/actions/newsletter-action";

export default function NewsletterModal({
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
    const result = await submitNewsletterAction(name, email, recaptchaToken);

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
      className="fixed inset-0 z-50 m-auto overflow-visible rounded-3xl border border-gray-200 bg-white p-0 text-gray-900 shadow-2xl inline-[95vw] max-inline-md backdrop:bg-black/50 backdrop:backdrop-blur-sm open:flex open:flex-col transition-all duration-300 starting:open:opacity-0 starting:open:scale-95 starting:backdrop:bg-black/0 backdrop:transition-all backdrop:duration-300"
    >
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="mbe-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {t("footer.newsletter")}
            </h2>
            <p className="mbs-1.5 text-sm leading-relaxed text-gray-500">
              {t("footer.newsletterDescription")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("footer.newsletterCloseAria")}
            className="-me-1 -mbs-1 flex items-center justify-center rounded-full text-gray-400 transition-colors block-9 inline-9 pointer-fine:hover:bg-gray-100 pointer-fine:hover:text-gray-600"
          >
            <X className="block-5 inline-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} aria-label={t("footer.newsletterAria")}>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="newsletter-name"
                className="mbe-1.5 block text-sm font-medium text-gray-700"
              >
                {t("footer.newsletterNameLabel")}
              </label>
              <div className="relative">
                <User className="absolute start-3.5 top-1/2 -translate-y-1/2 text-gray-400 block-4 inline-4" />
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
                  className="rounded-full border border-gray-200 bg-gray-50 ps-10 pe-4 text-sm text-gray-900 transition-all duration-200 block-11 inline-full placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:outline-none user-valid:border-green-500 user-invalid:border-red-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="newsletter-email"
                className="mbe-1.5 block text-sm font-medium text-gray-700"
              >
                {t("footer.newsletterInputAria")}
              </label>
              <div className="relative">
                <Mail className="absolute start-3.5 top-1/2 -translate-y-1/2 text-gray-400 block-4 inline-4" />
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  placeholder={t("footer.newsletterPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="rounded-full border border-gray-200 bg-gray-50 ps-10 pe-4 text-sm text-gray-900 transition-all duration-200 block-11 inline-full placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:outline-none user-valid:border-green-500 user-invalid:border-red-500"
                />
              </div>
            </div>

            {/* reCAPTCHA v2 — wrapped like BookingForm */}
            <div className="flex justify-center pbs-1">
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
              className={`mbs-4 text-center text-sm font-medium ${
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
            className="from-orange mbs-5 flex items-center justify-center gap-2 rounded-full bg-linear-to-r to-amber-500 text-sm font-semibold text-white shadow-md transition-all duration-300 block-11 inline-full pointer-fine:hover:scale-[1.02] pointer-fine:hover:shadow-lg pointer-fine:hover:shadow-orange-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-fine:hover:scale-100"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin block-4 inline-4" />
            ) : (
              t("footer.newsletterSubscribe")
            )}
          </button>
        </form>
      </div>
    </dialog>
  );
}
