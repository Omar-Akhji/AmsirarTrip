"use client";

import { useActionState, useRef, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { m } from "motion/react";
import { LoadingSpinner } from "@/shared/ui/Loading";
import { cn } from "@/lib/utils";
import { RECAPTCHA_V2_SITE_KEY, hasRecaptchaV2 } from "@/lib/client-env";
import { submitContactAction } from "../actions/contact-action";
import type { ContactFormState } from "../actions/contact-action";

// Submit button component that uses useFormStatus
function SubmitButton() {
  const { t } = useTranslation();
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="inline-flex w-full transform items-center justify-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase shadow-lg shadow-orange-500/25 transition duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 disabled:opacity-60"
      disabled={pending}
      aria-busy={pending}
    >
      {pending && <LoadingSpinner size="sm" />}
      {pending
        ? t("contact.form.sending", "Sending…")
        : t("contact.form.cta", "Send message")}
    </button>
  );
}

const ContactForm = () => {
  const { t } = useTranslation();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [captchaToken, setCaptchaToken] = useState("");

  // React 19's useActionState for form state management
  const [state, formAction] = useActionState<ContactFormState | null, FormData>(
    submitContactAction,
    null
  );

  // Handle successful submission - reset form in useEffect
  useEffect(() => {
    if (state?.success) {
      // Reset form fields (DOM operations)
      formRef.current?.reset();
      recaptchaRef.current?.reset();
      // Use queueMicrotask to defer state update from synchronous effect execution
      queueMicrotask(() => {
        setCaptchaToken("");
      });
    }
  }, [state?.success]);

  const alertClasses: Record<string, string> = {
    success: "bg-green-50 text-green-800 border border-green-100",
    error: "bg-rose-50 text-rose-700 border border-rose-100",
  };

  return (
    <section id="contact-tailwind" className="bg-gray-50 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <m.div
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
              ref={formRef}
              action={formAction}
              noValidate
              className="space-y-5 p-6 md:p-8"
            >
              {/* Success/Error Message */}
              {state?.message && (
                <output
                  className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                    state.success ? alertClasses.success : alertClasses.error
                  }`}
                  role={state.success ? undefined : "alert"}
                  aria-live="polite"
                >
                  {state.message}
                </output>
              )}

              {/* Field Errors Summary */}
              {state?.errors && Object.keys(state.errors).length > 0 && (
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
                    {Object.entries(state.errors).map(([field, error]) => (
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
                <m.div
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
                      "w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none",
                      state?.errors?.name ? "border-red-300" : "border-gray-200"
                    )}
                    placeholder={t("contact.form.fields.name", "Full name")}
                    aria-label={t("contact.form.fields.name", "Full name")}
                    autoComplete="name"
                    required
                    aria-invalid={state?.errors?.name ? "true" : "false"}
                    aria-describedby={
                      state?.errors?.name ? "name-error" : undefined
                    }
                  />
                  {state?.errors?.name && (
                    <p id="name-error" className="mt-1 text-xs text-red-600">
                      {state.errors.name}
                    </p>
                  )}
                </m.div>
                <m.div
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
                      "w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none",
                      state?.errors?.email
                        ? "border-red-300"
                        : "border-gray-200"
                    )}
                    placeholder={t("contact.form.fields.email", "Email")}
                    aria-label={t("contact.form.fields.email", "Email")}
                    autoComplete="email"
                    required
                    aria-invalid={state?.errors?.email ? "true" : "false"}
                    aria-describedby={
                      state?.errors?.email ? "email-error" : undefined
                    }
                  />
                  {state?.errors?.email && (
                    <p id="email-error" className="mt-1 text-xs text-red-600">
                      {state.errors.email}
                    </p>
                  )}
                </m.div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <m.div
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
                      "w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none",
                      state?.errors?.phone
                        ? "border-red-300"
                        : "border-gray-200"
                    )}
                    placeholder={t("contact.form.fields.phone", "Phone number")}
                    aria-label={t("contact.form.fields.phone", "Phone number")}
                    autoComplete="tel"
                    required
                    aria-invalid={state?.errors?.phone ? "true" : "false"}
                    aria-describedby={
                      state?.errors?.phone ? "phone-error" : undefined
                    }
                  />
                  {state?.errors?.phone && (
                    <p id="phone-error" className="mt-1 text-xs text-red-600">
                      {state.errors.phone}
                    </p>
                  )}
                </m.div>
                <m.div
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
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                    placeholder={t(
                      "contact.form.fields.topic",
                      "Trip focus (optional)"
                    )}
                    aria-label={t(
                      "contact.form.fields.topic",
                      "Trip focus (optional)"
                    )}
                    autoComplete="off"
                  />
                </m.div>
              </div>

              <m.div
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
                    "min-h-40 w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none",
                    state?.errors?.message
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
                  autoComplete="off"
                  required
                  aria-invalid={state?.errors?.message ? "true" : "false"}
                  aria-describedby={
                    state?.errors?.message ? "message-error" : undefined
                  }
                />
                {state?.errors?.message && (
                  <p id="message-error" className="mt-1 text-xs text-red-600">
                    {state.errors.message}
                  </p>
                )}
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex flex-col gap-4 lg:flex-row lg:items-center"
              >
                <>
                  <div className="flex w-full justify-center overflow-hidden lg:justify-start">
                    <div
                      className={cn(
                        "origin-center scale-85 rounded-2xl border border-dashed p-3 sm:scale-100 lg:origin-left",
                        state?.errors?.recaptchaToken
                          ? "border-red-300"
                          : "border-gray-200"
                      )}
                    >
                      {hasRecaptchaV2 ? (
                        <>
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={RECAPTCHA_V2_SITE_KEY}
                            onChange={(token) => setCaptchaToken(token || "")}
                          />
                          {/* Hidden input to pass token to FormData */}
                          <input
                            type="hidden"
                            name="recaptchaToken"
                            value={captchaToken}
                          />
                        </>
                      ) : (
                        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-600">
                          ReCAPTCHA not configured (Site Key missing)
                        </div>
                      )}
                    </div>
                  </div>
                  {state?.errors?.recaptchaToken && (
                    <p
                      id="recaptchaToken-error"
                      className="mt-1 text-xs text-red-600"
                    >
                      {state.errors.recaptchaToken}
                    </p>
                  )}
                </>
                <SubmitButton />
              </m.div>
            </form>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between rounded-3xl bg-slate-900 p-8 text-white lg:col-span-2"
          >
            <>
              <p className="text-xs font-semibold tracking-[0.45em] text-orange-200 uppercase">
                {t("contact.form.infoBadge", "Need details?")}
              </p>
              <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                {t("contact.form.infoTitle", "Plan handcrafted experiences")}
              </h3>
              <p className="mt-4 text-sm text-slate-200">
                {t(
                  "contact.form.infoCopy",
                  "Our Marrakech team answers every message personally and can help with custom itineraries, desert camps, or last-minute transfers."
                )}
              </p>
            </>

            <ul className="mt-8 space-y-6 text-sm">
              {[
                {
                  id: "visit",
                  num: "01",
                  label: t("contact.form.info.address", "Visit"),
                  content: (
                    <p className="mt-1 text-base text-white">
                      Imm. J appt N° 5, Résidence La Perle de l'Atlas, angle Rue
                      aboubakr, Marrakech
                    </p>
                  ),
                },
                {
                  id: "call",
                  num: "02",
                  label: t("contact.form.info.phone", "Call"),
                  content: (
                    <>
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
                    </>
                  ),
                },
                {
                  id: "email",
                  num: "03",
                  label: t("contact.form.info.email", "Email"),
                  content: (
                    <a
                      className="mt-1 block text-base text-white hover:text-orange-300"
                      href="mailto:amsirare@gmail.com"
                    >
                      amsirare@gmail.com
                    </a>
                  ),
                },
              ].map((item) => (
                <li
                  key={item.id}
                  className="grid grid-cols-[48px_1fr] items-start gap-4"
                >
                  <span className="inline-flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/15 text-sm leading-none font-semibold text-orange-300">
                    {item.num}
                  </span>
                  <div className="self-start">
                    <p className="text-xs tracking-wide text-slate-300 uppercase">
                      {item.label}
                    </p>
                    {item.content}
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-xs text-slate-400">
              {t(
                "contact.form.infoFooter",
                "Available every day from 09:00 to 21:00 GMT+1"
              )}
            </p>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
