"use client";

import { useActionState, useRef, useEffect, useReducer } from "react";
import { useFormStatus } from "react-dom";
import { useTranslation } from "@/lib/hooks/useTranslation";
import ReCAPTCHA from "react-google-recaptcha";
import { TOURS_DATA } from "@/features/tours";
import { m } from "motion/react";
import { LoadingSpinner } from "@/shared/ui/Loading";
import { submitBookingAction } from "../actions/booking-action";
import type { BookingFormState } from "../actions/booking-action";
import { BookingSidebar } from "./BookingSidebar";
import { FormStatusMessages } from "./FormStatusMessages";
import { BookingFormFields } from "./BookingFormFields";

// ── Local state reducer (replaces 5 individual useState calls) ──────────────

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
  | { type: "RESET_AFTER_SUCCESS" };

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
    case "RESET_AFTER_SUCCESS":
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
      className="flex w-full transform items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-sm font-semibold tracking-wide whitespace-nowrap text-white uppercase shadow-lg shadow-orange-500/25 transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
      type="submit"
      disabled={pending}
      aria-busy={pending}
    >
      {pending && <LoadingSpinner size="sm" />}
      {pending
        ? t("booking.sending", "Sending...")
        : buttonText === "booking.checkAvailability"
          ? t(buttonText, "Reserve Now")
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
  const formRef = useRef<HTMLFormElement>(null);

  // Single reducer replaces all independent useState calls
  const [uiState, dispatch] = useReducer(formUIReducer, initialUIState);

  // React 19's useActionState for form state management
  const [state, formAction] = useActionState<BookingFormState | null, FormData>(
    submitBookingAction,
    null
  );

  // Handle successful submission — single dispatch replaces multiple setState calls
  useEffect(() => {
    if (state?.success) {
      queueMicrotask(() => {
        dispatch({ type: "RESET_AFTER_SUCCESS" });
        setTimeout(
          () =>
            dispatch({
              type: "SET_BUTTON_TEXT",
              text: "booking.checkAvailability",
            }),
          4000
        );
      });

      // Reset form (DOM operations, not state updates)
      formRef.current?.reset();
      recaptchaRef.current?.reset();
    }
  }, [state?.success]);

  // React Compiler handles memoization automatically
  const perks = [
    {
      id: "experts",
      text: t("booking.perkLocalExperts", "Licensed local drivers & guides"),
    },
    {
      id: "flexible",
      text: t("booking.perkFlexible", "Flexible departures from Marrakech"),
    },
    {
      id: "support",
      text: t("booking.perkSupport", "Fast responses within 24 hours"),
    },
  ];

  const baseSectionClass = `py-20 md:py-10 bg-gray-50 ${
    fullWidth ? "booking-form-fullwidth" : ""
  }`;
  const innerWrapperClass = `booking-form-inner mx-auto w-full max-w-6xl ${
    fullWidth ? "px-4 sm:px-6 lg:px-10" : "px-4 sm:px-6 lg:px-8"
  }`;

  const selectedTour =
    tourTitle && tourId
      ? `${tourTitle} - Duration: ${
          TOURS_DATA.find((t) => t.id === Number(tourId))?.duration || ""
        } Days`
      : tourTitle || excursionTitle || "";

  const tourDuration = tourId
    ? (TOURS_DATA.find((t) => t.id === Number(tourId))?.duration ?? null)
    : null;

  return (
    <section id="booking" className={baseSectionClass}>
      <div className={innerWrapperClass}>
        <div className="grid gap-8 lg:grid-cols-5">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-orange-100 lg:col-span-3"
          >
            <div className="bg-linear-to-r from-orange-500 to-orange-600 px-6 py-8 text-white">
              <h2 className="text-xl font-bold sm:text-2xl md:text-3xl">
                {t("booking.makeReservation", "Make your reservation")}
              </h2>
              <p className="mt-3 text-sm text-orange-50/90 md:text-base">
                {t(
                  "booking.description",
                  "Book your perfect Morocco adventure with us"
                )}
              </p>
            </div>

            <form
              ref={formRef}
              action={formAction}
              className="space-y-5 p-6 md:p-8"
              noValidate
            >
              <FormStatusMessages
                submitError={state?.errors?.submit}
                success={state?.success}
                successMessage={state?.message}
              />

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
                captchaToken={uiState.captchaToken}
                recaptchaRef={recaptchaRef}
                onCalendarOpenChange={(open) =>
                  dispatch({ type: "SET_CALENDAR_OPEN", open })
                }
                onDateSelect={(date) => dispatch({ type: "SET_DATE", date })}
                onCaptchaChange={(token) =>
                  dispatch({ type: "SET_CAPTCHA", token })
                }
              />

              <div className="w-full flex-1">
                <SubmitButton buttonText={uiState.buttonText} />
              </div>
            </form>
          </m.div>

          <BookingSidebar perks={perks} />
        </div>
      </div>
    </section>
  );
}

export default BookingForm;
