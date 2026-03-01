"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { m } from "motion/react";
import type { BookingFormState } from "../actions/booking-action";

interface BookingPersonalFieldsProps {
  state: BookingFormState | null;
}

export function BookingPersonalFields({ state }: BookingPersonalFieldsProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* Name + Phone row */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <m.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <label htmlFor="fullName" className="sr-only">
            {t("booking.fullName", "Full Name")}
          </label>
          <input
            className={cn(
              "w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none",
              state?.errors?.fullName
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-200"
            )}
            type="text"
            id="fullName"
            name="fullName"
            placeholder={t("booking.fullName", "Full Name")}
            aria-label={t("booking.fullName", "Full Name")}
            autoComplete="name"
            aria-invalid={state?.errors?.fullName ? "true" : "false"}
            aria-describedby={
              state?.errors?.fullName ? "fullName-error" : undefined
            }
            required
          />
          {state?.errors?.fullName && (
            <p id="fullName-error" className="mt-1 text-xs text-red-600">
              {state.errors.fullName}
            </p>
          )}
        </m.div>

        <m.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <label htmlFor="phone" className="sr-only">
            {t("booking.phone", "Phone Number")}
          </label>
          <input
            className={cn(
              "w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none",
              state?.errors?.phone
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-200"
            )}
            type="tel"
            id="phone"
            name="phone"
            placeholder={t("booking.phone", "Phone Number")}
            aria-label={t("booking.phone", "Phone Number")}
            autoComplete="tel"
            aria-invalid={state?.errors?.phone ? "true" : "false"}
            aria-describedby={state?.errors?.phone ? "phone-error" : undefined}
            required
          />
          {state?.errors?.phone && (
            <p id="phone-error" className="mt-1 text-xs text-red-600">
              {state.errors.phone}
            </p>
          )}
        </m.div>
      </div>

      {/* Email row */}
      <m.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <label htmlFor="email" className="sr-only">
          {t("booking.email", "Email")}
        </label>
        <input
          className={cn(
            "w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none",
            state?.errors?.email
              ? "border-red-300 focus:ring-red-200"
              : "border-gray-200"
          )}
          type="email"
          id="email"
          name="email"
          placeholder={t("booking.email", "Email")}
          aria-label={t("booking.email", "Email")}
          autoComplete="email"
          aria-invalid={state?.errors?.email ? "true" : "false"}
          aria-describedby={state?.errors?.email ? "email-error" : undefined}
          required
        />
        {state?.errors?.email && (
          <p id="email-error" className="mt-1 text-xs text-red-600">
            {state.errors.email}
          </p>
        )}
      </m.div>
    </>
  );
}
