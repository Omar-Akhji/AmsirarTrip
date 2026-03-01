import { useTranslation } from "@/lib/hooks/useTranslation";
import { m } from "motion/react";
import { cn } from "@/lib/utils";
import type { ContactFormState } from "../actions/contact-action";

interface ContactFormFieldsProps {
  state: ContactFormState | null;
}

export function ContactFormFields({ state }: ContactFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <>
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
              state?.errors?.email ? "border-red-300" : "border-gray-200"
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
              state?.errors?.phone ? "border-red-300" : "border-gray-200"
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
            state?.errors?.message ? "border-red-300" : "border-gray-200"
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
    </>
  );
}
