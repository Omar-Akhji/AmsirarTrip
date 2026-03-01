"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import { format as formatDate } from "date-fns";
import ReCAPTCHA from "react-google-recaptcha";
import { EnhancedCalendar } from "@/shared/ui/calendar";
import { RECAPTCHA_V2_SITE_KEY } from "@/lib/client-env";
import * as Popover from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { m } from "motion/react";
import type { BookingFormState } from "../actions/booking-action";

interface BookingFormFieldsProps {
  state: BookingFormState | null;
  selectedTour: string;
  tourTitle?: string;
  tourId?: string;
  tourDuration: number | null;
  excursionTitle?: string;
  excursionId?: string;
  locale: string;
  calendarOpen: boolean;
  reservationDate: Date | null;
  captchaToken: string;
  recaptchaRef: React.RefObject<ReCAPTCHA | null>;
  onCalendarOpenChange: (open: boolean) => void;
  onDateSelect: (date: Date | null) => void;
  onCaptchaChange: (token: string) => void;
}

export function BookingFormFields({
  state,
  selectedTour,
  tourTitle,
  tourId,
  tourDuration,
  excursionTitle,
  excursionId,
  locale,
  calendarOpen,
  reservationDate,
  captchaToken,
  recaptchaRef,
  onCalendarOpenChange,
  onDateSelect,
  onCaptchaChange,
}: BookingFormFieldsProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* Hidden fields for tour/excursion context */}
      {selectedTour && (
        <>
          <input type="hidden" name="reservationType" value={selectedTour} />
          {tourDuration && (
            <input type="hidden" name="duration" value={tourDuration} />
          )}
          <input type="hidden" name="language" value={locale} />
        </>
      )}

      {tourTitle && tourId && (
        <div className="mb-6">
          <m.input
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700"
            type="text"
            value={selectedTour}
            readOnly
            aria-label={t("booking.selectedTour", "Selected Tour")}
          />
        </div>
      )}

      {excursionTitle && excursionId && (
        <div className="mb-6">
          <m.input
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700"
            type="text"
            value={excursionTitle}
            readOnly
            aria-label={t("booking.selectedExcursion", "Selected Excursion")}
          />
        </div>
      )}

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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <m.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <label htmlFor="numberOfPeople" className="sr-only">
            {t("booking.numberOfPeople", "Number of People")}
          </label>
          <input
            className={cn(
              "w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none",
              state?.errors?.persons
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-200"
            )}
            type="number"
            id="numberOfPeople"
            name="numberOfPeople"
            placeholder={t("booking.numberOfPeople", "Number of People")}
            aria-label={t("booking.numberOfPeople", "Number of People")}
            autoComplete="off"
            min="1"
            max="50"
            aria-invalid={state?.errors?.persons ? "true" : "false"}
            aria-describedby={
              state?.errors?.persons ? "numberOfPeople-error" : undefined
            }
            required
          />
          {state?.errors?.persons && (
            <p id="numberOfPeople-error" className="mt-1 text-xs text-red-600">
              {state.errors.persons}
            </p>
          )}
        </m.div>

        <m.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Popover.Root open={calendarOpen} onOpenChange={onCalendarOpenChange}>
            <Popover.Trigger asChild>
              <button
                type="button"
                className={cn(
                  "flex h-auto w-full items-center justify-start rounded-2xl border bg-white px-4 py-3 text-left text-sm font-normal transition-colors hover:bg-gray-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none",
                  !reservationDate && "text-gray-500",
                  state?.errors?.date ? "border-red-300" : "border-gray-200"
                )}
                aria-describedby={
                  state?.errors?.date ? "reservationDate-error" : undefined
                }
              >
                <CalendarIcon className="mr-2 size-4" />
                {reservationDate ? (
                  reservationDate.toLocaleDateString(locale || "en", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                ) : (
                  <span>{t("booking.reservationDate")}</span>
                )}
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-auto overflow-hidden rounded-2xl border border-gray-100 bg-white p-0 shadow-2xl ring-1 ring-black/5 outline-none"
                align="start"
                sideOffset={8}
              >
                <EnhancedCalendar
                  selected={reservationDate ?? undefined}
                  onSelect={(date: Date | undefined) => {
                    onDateSelect(date ?? null);
                  }}
                  onClose={() => onCalendarOpenChange(false)}
                  disabled={(date: Date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
          {/* Hidden input for form submission */}
          <input
            type="hidden"
            name="reservationDate"
            value={
              reservationDate ? formatDate(reservationDate, "yyyy-MM-dd") : ""
            }
          />
          {state?.errors?.date && (
            <p id="reservationDate-error" className="mt-1 text-xs text-red-600">
              {state.errors.date}
            </p>
          )}
        </m.div>
      </div>

      <div className="w-full">
        <label htmlFor="message" className="sr-only">
          {t("booking.message", "Your message")}
        </label>
        <m.textarea
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className={cn(
            "w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none",
            state?.errors?.message ? "border-red-300" : "border-gray-200"
          )}
          id="message"
          name="message"
          placeholder={t("booking.message", "Your message")}
          autoComplete="off"
          rows={4}
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
      </div>

      <m.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.8 }}
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
              {RECAPTCHA_V2_SITE_KEY ? (
                <>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={RECAPTCHA_V2_SITE_KEY}
                    onChange={(token) => onCaptchaChange(token || "")}
                  />
                  <input
                    type="hidden"
                    name="recaptchaToken"
                    value={captchaToken}
                  />
                </>
              ) : (
                <div className="rounded bg-amber-50 p-2 text-sm text-amber-600">
                  CAPTCHA configuration missing.
                </div>
              )}
            </div>
          </div>
          {state?.errors?.recaptchaToken && (
            <p id="recaptchaToken-error" className="mt-1 text-xs text-red-600">
              {state.errors.recaptchaToken}
            </p>
          )}
        </>
      </m.div>
    </>
  );
}
