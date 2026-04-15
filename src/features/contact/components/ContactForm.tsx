"use client";

import { useActionState, useRef, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { m } from "motion/react";
import { LoadingSpinner } from "@/shared/ui/Loading";
import { cn } from "@/lib/utils";
import { RECAPTCHA_V2_SITE_KEY, hasRecaptchaV2 } from "@/lib/client-env";
import { submitContactAction } from "../actions/contact-action";
import type { ContactFormState } from "../actions/contact-action";
import { ContactFormFields } from "./ContactFormFields";
import { ContactInfoSidebar } from "./ContactInfoSidebar";

// Submit button component that uses useFormStatus
function SubmitButton() {
  const { t } = useTranslation();
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="inline-flex transform items-center justify-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase shadow-lg shadow-orange-500/25 transition duration-300 ease-in-out inline-full disabled:opacity-60 md:inline-auto md:min-inline-50 pointer-fine:hover:-translate-y-0.5 pointer-fine:hover:shadow-xl pointer-fine:hover:brightness-110"
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
  const [captchaToken, setCaptchaToken] = useState("");
  // Key state to force form reset on success (video best practice)
  const [formKey, setFormKey] = useState(0);

  // React 19's useActionState for form state management
  const [state, formAction] = useActionState<ContactFormState | null, FormData>(
    submitContactAction,
    null,
  );

  // Synchronize reset when state.success is true
  useEffect(() => {
    // Access property via bracket notation to satisfy noPropertyAccessFromIndexSignature
    if (state?.["success"]) {
      // Defer state updates to avoid synchronous cascading renders warning
      queueMicrotask(() => {
        setFormKey((prev) => prev + 1);
        setCaptchaToken("");
      });
    }
  }, [state]);

  const alertClasses: Record<string, string> = {
    success: "bg-green-50 text-green-800 border border-green-100",
    error: "bg-rose-50 text-rose-700 border border-rose-100",
  };

  return (
    <section id="contact-tailwind" className="bg-gray-50 py-12 md:py-16">
      <div className="mx-auto px-4 max-inline-6xl sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-orange-100 lg:col-span-3"
          >
            <div className="bg-linear-to-r from-orange-500 to-orange-600 px-6 py-8 text-white">
              <p className="text-xs font-semibold tracking-[0.35em] text-orange-100 uppercase">
                {t("contact.form.badge", "Plan with locals")}
              </p>
              <h2 className="mbs-2 text-2xl font-bold md:text-3xl">
                {t(
                  "contact.form.title",
                  "Design Your Custom Morocco Tour & Private Itinerary",
                )}
              </h2>
              <p className="mbs-3 text-sm text-orange-50/90 md:text-base">
                {t(
                  "contact.form.subtitle",
                  "Share a few details and we will craft a bespoke itinerary for you.",
                )}
              </p>
            </div>

            <form
              key={formKey}
              action={formAction}
              noValidate
              className="space-y-5 p-6 md:p-8"
            >
              {/* Success/Error Message */}
              {state?.["message"] && (
                <output
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-medium",
                    state?.["success"] ? alertClasses["success"] : alertClasses["error"]
                  )}
                  role={state?.["success"] ? undefined : "alert"}
                  aria-live="polite"
                >
                  {state?.["message"]}
                </output>
              )}

              {/* Field Errors Summary */}
              {state?.["errors"] && Object.keys(state["errors"]).length > 0 && (
                <div
                  className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3"
                  role="alert"
                >
                  <p className="mbe-2 text-sm font-semibold text-orange-900">
                    {t(
                      "contact.form.errors.title",
                      "Please complete these fields:",
                    )}
                  </p>
                  <ul className="space-y-1 text-xs text-orange-800">
                    {Object.entries(state["errors"]).map(([field, error]) => (
                      <li key={field} className="flex items-start gap-2">
                        <svg
                          className="mbs-0.5 size-4 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{error as string}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ContactFormFields state={state} />

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex flex-col gap-4 lg:flex-row lg:items-center"
              >
                <>
                  <div className="flex justify-center overflow-hidden inline-full lg:justify-start">
                    <div
                      className={cn(
                        "origin-center scale-85 rounded-2xl border border-dashed p-3 sm:scale-100 lg:origin-left",
                        state?.["errors"]?.["recaptchaToken"]
                          ? "border-red-300"
                          : "border-gray-200",
                      )}
                    >
                      {hasRecaptchaV2 ? (
                        <>
                           <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={RECAPTCHA_V2_SITE_KEY}
                            onChange={(token) => setCaptchaToken(token || "")}
                          />
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
                  {state?.["errors"]?.["recaptchaToken"] && (
                    <p
                      id="recaptchaToken-error"
                      className="mbs-1 text-xs text-red-600"
                    >
                      {state["errors"]["recaptchaToken"] as string}
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
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between rounded-3xl bg-slate-900 p-8 text-white lg:col-span-2"
          >
            <ContactInfoSidebar />
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
