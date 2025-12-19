"use client";

import React, { useState, useRef, useCallback } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import { validateContactForm, sanitizeInput } from "@/lib/validation";
import { submitContact, ApiError } from "@/lib/api-client";
import { LoadingSpinner } from "@/shared/ui/Loading";
import { cn } from "@/lib/utils";
import { RECAPTCHA_V2_SITE_KEY, hasRecaptchaV2 } from "@/lib/client-env";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  message: "",
};

const ContactFormTailwind = () => {
  const { t } = useTranslation();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const updateField = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      const sanitized = sanitizeInput(value);
      setForm((prev) => ({ ...prev, [name]: sanitized }));

      // Clear field error on input
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status.type === "submitting") return;

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
      recaptchaToken: true,
    });

    // Get CAPTCHA token
    const token = recaptchaRef.current?.getValue() || "";

    // Validate all fields
    const validation = validateContactForm({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    });

    // Check CAPTCHA
    if (!token) {
      setErrors({
        recaptchaToken: t(
          "contact.form.errors.captcha",
          "Please complete the CAPTCHA verification."
        ),
      });
      setTouched((prev) => ({ ...prev, recaptchaToken: true }));
      setStatus({ type: "idle", message: "" });
      return;
    }

    // If there are validation errors, display them
    if (!validation.valid) {
      setErrors(validation.errors);
      // Don't set a scary status message - the field errors are enough
      setStatus({ type: "idle", message: "" });
      return;
    }

    setStatus({ type: "submitting", message: "" });
    setErrors({});

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.topic.trim()
        ? `${form.topic.trim()}\n\n${form.message.trim()}`
        : form.message.trim(),
      recaptchaToken: token,
    };

    try {
      await submitContact(payload);

      setStatus({
        type: "success",
        message: t(
          "contact.form.success",
          "Message sent! We will reply within 24 hours."
        ),
      });
      setForm(initialFormState);
      setTouched({});
      recaptchaRef.current?.reset();

      // Clear success message after 5 seconds
      setTimeout(() => setStatus({ type: "idle", message: "" }), 5000);
    } catch (error) {
      if (error instanceof ApiError) {
        // Handle specific API errors
        if (error.status === 429) {
          setStatus({
            type: "error",
            message: t(
              "contact.form.errors.rateLimit",
              "Too many requests. Please try again in a few minutes."
            ),
          });
        } else if (error.status === 400) {
          setStatus({
            type: "error",
            message: t(
              "contact.form.errors.validation",
              "Please check your information and try again."
            ),
          });
        } else {
          setStatus({
            type: "error",
            message: error.message,
          });
        }
      } else {
        setStatus({
          type: "error",
          message: t(
            "contact.form.errors.generic",
            "We could not send your message. Please try again."
          ),
        });
      }

      // Clear error message after 5 seconds
      setTimeout(() => setStatus({ type: "idle", message: "" }), 5000);
    }
  };

  const alertClasses: Record<string, string> = {
    success: "bg-green-50 text-green-800 border border-green-100",
    error: "bg-rose-50 text-rose-700 border border-rose-100",
    idle: "hidden",
    submitting: "hidden",
  };

  return (
    <section id="contact-tailwind" className="bg-gray-50 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-orange-100 lg:col-span-3"
          >
            <div className="bg-linear-to-r from-orange-500 to-orange-600 px-6 py-8 text-white">
              <p className="text-xs font-semibold tracking-[0.35em] text-orange-100 uppercase">
                {t("contact.form.badge", "Plan with locals")}
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                {t(
                  "contact.form.title",
                  "Design Your Custom Morocco Tour & Private Itinerary"
                )}
              </h2>
              <p className="mt-3 text-sm text-orange-50/90 md:text-base">
                {t(
                  "contact.form.subtitle",
                  "Share a few details and we will craft a bespoke itinerary for you."
                )}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5 p-6 md:p-8"
            >
              {status.message && (
                <output
                  className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                    alertClasses[status.type] || ""
                  }`}
                  role={status.type === "error" ? "alert" : undefined}
                  aria-live="polite"
                >
                  {status.message}
                </output>
              )}

              {Object.keys(errors).length > 0 && (
                <div
                  className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3"
                  role="alert"
                >
                  <p className="mb-2 text-sm font-semibold text-orange-900">
                    {t(
                      "contact.form.errors.title",
                      "Please complete these fields:"
                    )}
                  </p>
                  <ul className="space-y-1 text-xs text-orange-800">
                    {Object.entries(errors).map(([field, error]) => (
                      <li key={field} className="flex items-start gap-2">
                        <svg
                          className="mt-0.5 size-4 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{error}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid gap-5 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <label htmlFor="contact-name" className="sr-only">
                    {t("contact.form.fields.name", "Full name")}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className={cn(
                      "w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200",
                      errors.name && touched.name
                        ? "border-red-300"
                        : "border-gray-200"
                    )}
                    placeholder={t("contact.form.fields.name", "Full name")}
                    aria-label={t("contact.form.fields.name", "Full name")}
                    value={form.name}
                    onChange={updateField}
                    onBlur={() => handleBlur("name")}
                    autoComplete="name"
                    required
                    aria-invalid={
                      errors.name && touched.name ? "true" : "false"
                    }
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && touched.name && (
                    <p id="name-error" className="mt-1 text-xs text-red-600">
                      {errors.name}
                    </p>
                  )}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <label htmlFor="contact-email" className="sr-only">
                    {t("contact.form.fields.email", "Email")}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className={cn(
                      "w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200",
                      errors.email && touched.email
                        ? "border-red-300"
                        : "border-gray-200"
                    )}
                    placeholder={t("contact.form.fields.email", "Email")}
                    aria-label={t("contact.form.fields.email", "Email")}
                    value={form.email}
                    onChange={updateField}
                    onBlur={() => handleBlur("email")}
                    autoComplete="email"
                    required
                    aria-invalid={
                      errors.email && touched.email ? "true" : "false"
                    }
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && touched.email && (
                    <p id="email-error" className="mt-1 text-xs text-red-600">
                      {errors.email}
                    </p>
                  )}
                </motion.div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <label htmlFor="contact-phone" className="sr-only">
                    {t("contact.form.fields.phone", "Phone number")}
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    className={cn(
                      "w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200",
                      errors.phone && touched.phone
                        ? "border-red-300"
                        : "border-gray-200"
                    )}
                    placeholder={t("contact.form.fields.phone", "Phone number")}
                    aria-label={t("contact.form.fields.phone", "Phone number")}
                    value={form.phone}
                    onChange={updateField}
                    onBlur={() => handleBlur("phone")}
                    autoComplete="tel"
                    required
                    aria-invalid={
                      errors.phone && touched.phone ? "true" : "false"
                    }
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && touched.phone && (
                    <p id="phone-error" className="mt-1 text-xs text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <label htmlFor="contact-topic" className="sr-only">
                    {t("contact.form.fields.topic", "Trip focus (optional)")}
                  </label>
                  <input
                    id="contact-topic"
                    name="topic"
                    type="text"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                    placeholder={t(
                      "contact.form.fields.topic",
                      "Trip focus (optional)"
                    )}
                    aria-label={t(
                      "contact.form.fields.topic",
                      "Trip focus (optional)"
                    )}
                    value={form.topic}
                    onChange={updateField}
                    autoComplete="off"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <label htmlFor="contact-message" className="sr-only">
                  {t("contact.form.fields.message", "Message")}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className={cn(
                    "min-h-40 w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200",
                    errors.message && touched.message
                      ? "border-red-300"
                      : "border-gray-200"
                  )}
                  placeholder={t(
                    "contact.form.fields.message",
                    "Tell us about your Morocco dream"
                  )}
                  aria-label={t(
                    "contact.form.fields.message",
                    "Tell us about your Morocco dream"
                  )}
                  value={form.message}
                  onChange={updateField}
                  onBlur={() => handleBlur("message")}
                  autoComplete="off"
                  required
                  aria-invalid={
                    errors.message && touched.message ? "true" : "false"
                  }
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && touched.message && (
                  <p id="message-error" className="mt-1 text-xs text-red-600">
                    {errors.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex flex-col gap-4 lg:flex-row lg:items-center"
              >
                <div>
                  <div
                    className={cn(
                      "rounded-2xl border border-dashed p-3",
                      errors.recaptchaToken && touched.recaptchaToken
                        ? "border-red-300"
                        : "border-gray-200"
                    )}
                  >
                    {hasRecaptchaV2 ? (
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={RECAPTCHA_V2_SITE_KEY}
                        onChange={() => {
                          if (errors.recaptchaToken) {
                            setErrors((prev) => ({
                              ...prev,
                              recaptchaToken: "",
                            }));
                          }
                        }}
                      />
                    ) : (
                      <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-600">
                        ReCAPTCHA not configured (Site Key missing)
                      </div>
                    )}
                  </div>
                  {errors.recaptchaToken && touched.recaptchaToken && (
                    <p
                      id="recaptchaToken-error"
                      className="mt-1 text-xs text-red-600"
                    >
                      {errors.recaptchaToken}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase shadow-lg shadow-orange-500/25 transition hover:brightness-110 disabled:opacity-60"
                  disabled={status.type === "submitting"}
                  aria-busy={status.type === "submitting"}
                >
                  {status.type === "submitting" && <LoadingSpinner size="sm" />}
                  {status.type === "submitting"
                    ? t("contact.form.sending", "Sending…")
                    : t("contact.form.cta", "Send message")}
                </button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between rounded-3xl bg-slate-900 p-8 text-white lg:col-span-2"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.45em] text-orange-200 uppercase">
                {t("contact.form.infoBadge", "Need details?")}
              </p>
              <h3 className="mt-3 text-3xl font-bold">
                {t("contact.form.infoTitle", "Plan handcrafted experiences")}
              </h3>
              <p className="mt-4 text-sm text-slate-200">
                {t(
                  "contact.form.infoCopy",
                  "Our Marrakech team answers every message personally and can help with custom itineraries, desert camps, or last-minute transfers."
                )}
              </p>
            </div>

            <ul className="mt-8 space-y-6 text-sm">
              <li className="grid grid-cols-[48px_1fr] items-start gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/15 text-sm leading-none font-semibold text-orange-300">
                  01
                </span>
                <div className="self-start">
                  <p className="text-xs tracking-wide text-slate-300 uppercase">
                    {t("contact.form.info.address", "Visit")}
                  </p>
                  <p className="mt-1 text-base text-white">
                    Imm. J appt N° 5, Résidence La Perle de l'Atlas, angle Rue
                    aboubakr, Marrakech
                  </p>
                </div>
              </li>
              <li className="grid grid-cols-[48px_1fr] items-start gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/15 text-sm leading-none font-semibold text-orange-300">
                  02
                </span>
                <div className="self-start">
                  <p className="text-xs tracking-wide text-slate-300 uppercase">
                    {t("contact.form.info.phone", "Call")}
                  </p>
                  <a
                    className="mt-1 block text-base text-white hover:text-orange-300"
                    href="tel:+21266173144"
                  >
                    +212 (0) 6 61 17 31 44
                  </a>
                  <a
                    className="mt-1 block text-base text-white/80 hover:text-orange-300"
                    href="tel:+212566173144"
                  >
                    +212 (0) 5 6 61 73 14 44
                  </a>
                </div>
              </li>
              <li className="grid grid-cols-[48px_1fr] items-start gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/15 text-sm leading-none font-semibold text-orange-300">
                  03
                </span>
                <div className="self-start">
                  <p className="text-xs tracking-wide text-slate-300 uppercase">
                    {t("contact.form.info.email", "Email")}
                  </p>
                  <a
                    className="mt-1 block text-base text-white hover:text-orange-300"
                    href="mailto:amsirare@gmail.com"
                  >
                    amsirare@gmail.com
                  </a>
                </div>
              </li>
            </ul>

            <p className="mt-8 text-xs text-slate-400">
              {t(
                "contact.form.infoFooter",
                "Available every day from 09:00 to 21:00 GMT+1"
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormTailwind;
