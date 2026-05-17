"use client";

import { useActionState, useEffect, useReducer, useRef, useState } from "react";
import Form from "next/form";
import { useFormStatus } from "react-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { TOURS_DATA } from "@/features/tours";
import { hasRecaptchaV2, RECAPTCHA_V2_SITE_KEY } from "@/lib/client-env";
import type { FormState } from "@/lib/form-types";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { AnimateOnScroll } from "@/shared/ui";
import { LoadingSpinner } from "@/shared/ui/Loading";
import { submitBookingAction } from "../actions/booking-action";
import { BookingFormFields } from "./BookingFormFields";
import { BookingSidebar } from "./BookingSidebar";
import { FormStatusMessages } from "./FormStatusMessages";

// ── Local state reducer (UI behavioral states) ──────────────

interface FormUIState {
  calendarOpen: boolean;
  reservationDate: Date | null;
  captchaToken: string;
  buttonText: string;
}

type FormUIAction =
  | { type: "SET_CALENDAR_OPEN"; open: boolean }
  | { type: "SET_DATE"; date: Date | null }
  | { type: "SET_CAPTCHA"; token: string }
  | { type: "SET_BUTTON_TEXT"; text: string }
  | { type: "RESET_UI_ONLY" };

const initialUIState: FormUIState = {
  calendarOpen: false,
  reservationDate: null,
  captchaToken: "",
  buttonText: "booking.checkAvailability",
};

function formUIReducer(state: FormUIState, action: FormUIAction): FormUIState {
  switch (action.type) {
    case "SET_CALENDAR_OPEN":
      return { ...state, calendarOpen: action.open };
    case "SET_DATE":
      return { ...state, reservationDate: action.date };
    case "SET_CAPTCHA":
      return { ...state, captchaToken: action.token };
    case "SET_BUTTON_TEXT":
      return { ...state, buttonText: action.text };
    case "RESET_UI_ONLY":
      return {
        ...state,
        reservationDate: null,
        captchaToken: "",
        buttonText: "Your booking request has been sent",
      };
    default:
      return state;
  }
}

interface BookingFormProps {
  tourTitle?: string;
  tourId?: string;
  excursionTitle?: string;
  excursionId?: string;
  fullWidth?: boolean;
}

// Submit button component with useFormStatus
function SubmitButton({ buttonText }: { buttonText: string }) {
  const { t } = useTranslation();
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="inline-flex transform items-center justify-center gap-2 rounded-full border border-orange-400 bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold tracking-wide whitespace-nowrap text-white uppercase transition duration-300 ease-in-out inline-full disabled:cursor-not-allowed disabled:opacity-60 md:inline-auto md:min-inline-50 pointer-fine:hover:-translate-y-0.5 pointer-fine:hover:brightness-110"
      disabled={pending}
      aria-busy={pending}
    >
      {pending && <LoadingSpinner size="sm" />}
      {pending ?
        t("booking.sending", "Sending...")
      : buttonText === "booking.checkAvailability" ?
        t(buttonText, "Reserve Now")
      : buttonText}
    </button>
  );
}

function BookingForm({
  tourTitle,
  tourId,
  excursionTitle,
  excursionId,
  fullWidth = false,
}: BookingFormProps) {
  const { t, i18n } = useTranslation();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Use unique key to force remount on success (video best practice)
  const [formKey, setFormKey] = useState(0);

  // Single reducer for UI behavioral states
  const [uiState, dispatch] = useReducer(formUIReducer, initialUIState);

  // React 19's useActionState for form state management
  const [state, formAction] = useActionState<FormState | null, FormData>(submitBookingAction, null);

  // Handle successful submission via component remount
  useEffect(() => {
    if (state?.["success"]) {
      // Defer state updates to avoid synchronous cascading renders warning
      queueMicrotask(() => {
        dispatch({ type: "RESET_UI_ONLY" });

        // Delay the remount slightly to show specific success text first
        successTimerRef.current = setTimeout(() => {
          setFormKey((prev) => prev + 1);
          dispatch({ type: "SET_BUTTON_TEXT", text: "booking.checkAvailability" });
        }, 4000);
      });
    }
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, [state]);

  // Reset reCAPTCHA and scroll to first error on validation failure
  useEffect(() => {
    if (state && !state["success"] && state["errors"]) {
      dispatch({ type: "SET_CAPTCHA", token: "" });
      recaptchaRef.current?.reset();
      const firstError = document.querySelector('[aria-invalid="true"]');
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state]);

  const perks = [
    { id: "experts", text: t("booking.perkLocalExperts", "Licensed local drivers & guides") },
    { id: "flexible", text: t("booking.perkFlexible", "Flexible departures from Marrakech") },
    { id: "support", text: t("booking.perkSupport", "Fast responses within 24 hours") },
  ];

  const selectedTour =
    tourTitle && tourId ?
      `${tourTitle} - Duration: ${
        TOURS_DATA.find((t) => t.id === Number(tourId))?.duration || ""
      } Days`
    : tourTitle || excursionTitle || "";

  const tourDuration =
    tourId ? (TOURS_DATA.find((t) => t.id === Number(tourId))?.duration ?? null) : null;

  return (
    <section
      id="booking"
      className={`bg-neutral-50 py-20 md:py-10 ${fullWidth ? "booking-form-fullwidth" : ""}`}
    >
      <div
        className={`booking-form-inner mx-auto overflow-x-hidden inline-full max-inline-6xl ${fullWidth ? "px-4 sm:px-6 lg:px-10" : "px-4 sm:px-6 lg:px-8"}`}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <AnimateOnScroll
            animation="fade-in"
            className="inline-full lg:col-span-3"
          >
            <div className="overflow-hidden rounded-3xl bg-white block-full">
              <div className="bg-linear-to-r from-orange-500 to-orange-600 px-6 py-8 text-white">
                <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl">
                  {t("booking.makeReservation", "Make your reservation")}
                </h2>
                <p className="mbs-3 text-sm text-orange-50/90 md:text-base">
                  {t("booking.description", "Book your perfect Morocco adventure with us")}
                </p>
              </div>

              <Form
                key={formKey}
                action={formAction}
                className="space-y-5 p-6 md:p-8"
                noValidate
                data-form="booking"
              >
                <FormStatusMessages
                  submitError={state?.["errors"]?.["submit"]}
                  success={state?.["success"]}
                  successMessage={state?.["message"]}
                />

                {/* Honeypot field — hidden from real users, bots fill it */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 overflow-hidden"
                >
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <BookingFormFields
                  state={state}
                  selectedTour={selectedTour}
                  tourTitle={tourTitle}
                  tourId={tourId}
                  tourDuration={tourDuration}
                  excursionTitle={excursionTitle}
                  excursionId={excursionId}
                  locale={i18n.language}
                  calendarOpen={uiState.calendarOpen}
                  reservationDate={uiState.reservationDate}
                  onCalendarOpenChange={(open) => dispatch({ type: "SET_CALENDAR_OPEN", open })}
                  onDateSelect={(date) => dispatch({ type: "SET_DATE", date })}
                />

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <>
                    <div className="flex justify-center inline-full lg:justify-start">
                      <div
                        className={cn(
                          "w-fit rounded-2xl border transition-all duration-500",
                          state?.["errors"]?.["recaptchaToken"] ?
                            "border-red-300"
                          : "border-neutral-100",
                        )}
                      >
                        <div className="origin-top-left scale-85 block-[66px] inline-[258px] sm:scale-100 sm:block-auto sm:inline-auto">
                          {hasRecaptchaV2 ?
                            <>
                              <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={RECAPTCHA_V2_SITE_KEY}
                                onChange={(token) =>
                                  dispatch({ type: "SET_CAPTCHA", token: token || "" })
                                }
                              />
                              <input
                                type="hidden"
                                name="recaptchaToken"
                                value={uiState.captchaToken}
                              />
                            </>
                          : <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-600">
                              ReCAPTCHA not configured (Site Key missing)
                            </div>
                          }
                        </div>
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
                  <SubmitButton buttonText={uiState.buttonText} />
                </div>
              </Form>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll
            animation="fade-in"
            delay={300}
            className="inline-full lg:col-span-2 lg:block-full"
          >
            <BookingSidebar perks={perks} />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

export default BookingForm;
