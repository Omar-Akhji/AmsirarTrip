"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_V2_SITE_KEY } from "@/lib/client-env";
import { cn } from "@/lib/utils";
import { m } from "motion/react";
import type { BookingFormState } from "../actions/booking-action";
import { BookingPersonalFields } from "./BookingPersonalFields";
import { BookingTripDetails } from "./BookingTripDetails";

interface BookingFormFieldsProps {
  state: BookingFormState | null;
  selectedTour: string;
  tourTitle?: string | undefined;
  tourId?: string | undefined;
  tourDuration: number | null;
  excursionTitle?: string | undefined;
  excursionId?: string | undefined;
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
        <div className="mbe-6">
          <m.input
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 inline-full"
            type="text"
            value={selectedTour}
            readOnly
            aria-label={t("booking.selectedTour", "Selected Tour")}
          />
        </div>
      )}

      {excursionTitle && excursionId && (
        <div className="mbe-6">
          <m.input
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 inline-full"
            type="text"
            value={excursionTitle}
            readOnly
            aria-label={t("booking.selectedExcursion", "Selected Excursion")}
          />
        </div>
      )}

      <BookingPersonalFields state={state} />

      <BookingTripDetails
        state={state}
        locale={locale}
        calendarOpen={calendarOpen}
        reservationDate={reservationDate}
        onCalendarOpenChange={onCalendarOpenChange}
        onDateSelect={onDateSelect}
      />

      {/* reCAPTCHA */}
      <m.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.8 }}
        className="flex flex-col gap-4 lg:flex-row lg:items-center"
      >
        <>
          <div className="flex justify-center overflow-hidden inline-full lg:justify-start">
            <div
              className={cn(
                "origin-center scale-85 rounded-2xl border border-dashed p-3 sm:scale-100 lg:origin-left",
                state?.errors?.["recaptchaToken"]
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
          {state?.errors?.["recaptchaToken"] && (
            <p id="recaptchaToken-error" className="mbs-1 text-xs text-red-600">
              {state.errors["recaptchaToken"]}
            </p>
          )}
        </>
      </m.div>
    </>
  );
}
