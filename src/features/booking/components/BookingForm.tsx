"use client";

import { useActionState, useRef, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { format as formatDate } from "date-fns";
import ReCAPTCHA from "react-google-recaptcha";
import { TOURS_DATA } from "@/features/tours";
import { EnhancedCalendar } from "@/shared/ui/calendar";
import { RECAPTCHA_V2_SITE_KEY } from "@/lib/client-env";
import * as Popover from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { m } from "motion/react";
import { LoadingSpinner } from "@/shared/ui/Loading";
import { submitBookingAction } from "../actions/booking-action";
import type { BookingFormState } from "../actions/booking-action";

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
      className="flex w-full transform items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase shadow-lg shadow-orange-500/25 transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
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

  // Calendar state (interactive UI, not form state)
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [reservationDate, setReservationDate] = useState<Date | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [buttonText, setButtonText] = useState("booking.checkAvailability");

  // React 19's useActionState for form state management
  const [state, formAction] = useActionState<BookingFormState | null, FormData>(
    submitBookingAction,
    null
  );

  // Handle successful submission - use callback to avoid synchronous setState in effect
  useEffect(() => {
    if (state?.success) {
      // Use queueMicrotask to defer state updates from synchronous effect execution
      queueMicrotask(() => {
        setButtonText("Your booking request has been sent");
        setTimeout(() => setButtonText("booking.checkAvailability"), 4000);
        setReservationDate(null);
        setCaptchaToken("");
      });

      // Reset form (these are DOM operations, not state updates)
      formRef.current?.reset();
      recaptchaRef.current?.reset();
    }
  }, [state?.success]);

  // React Compiler handles memoization automatically
  const perks = [
    t("booking.perkLocalExperts", "Licensed local drivers & guides"),
    t("booking.perkFlexible", "Flexible departures from Marrakech"),
    t("booking.perkSupport", "Fast responses within 24 hours"),
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
    ? TOURS_DATA.find((t) => t.id === Number(tourId))?.duration
    : null;

  return (
    <section id="booking" className={baseSectionClass}>
      <div className={innerWrapperClass}>
        <div className="grid gap-8 lg:grid-cols-5">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
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
              {/* Error Summary */}
              {state?.errors?.submit && (
                <div className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900">
                  <div className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{state.errors.submit}</span>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {state?.success && state.message && (
                <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                  {state.message}
                </div>
              )}

              {/* Hidden fields for tour/excursion context */}
              {selectedTour && (
                <>
                  <input
                    type="hidden"
                    name="reservationType"
                    value={selectedTour}
                  />
                  {tourDuration && (
                    <input type="hidden" name="duration" value={tourDuration} />
                  )}
                  <input type="hidden" name="language" value={i18n.language} />
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
                    aria-label={t(
                      "booking.selectedExcursion",
                      "Selected Excursion"
                    )}
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
                    <p
                      id="fullName-error"
                      className="mt-1 text-xs text-red-600"
                    >
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
                    aria-describedby={
                      state?.errors?.phone ? "phone-error" : undefined
                    }
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
                  aria-describedby={
                    state?.errors?.email ? "email-error" : undefined
                  }
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
                    placeholder={t(
                      "booking.numberOfPeople",
                      "Number of People"
                    )}
                    aria-label={t("booking.numberOfPeople", "Number of People")}
                    autoComplete="off"
                    min="1"
                    max="50"
                    aria-invalid={state?.errors?.persons ? "true" : "false"}
                    aria-describedby={
                      state?.errors?.persons
                        ? "numberOfPeople-error"
                        : undefined
                    }
                    required
                  />
                  {state?.errors?.persons && (
                    <p
                      id="numberOfPeople-error"
                      className="mt-1 text-xs text-red-600"
                    >
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
                  <Popover.Root
                    open={calendarOpen}
                    onOpenChange={setCalendarOpen}
                  >
                    <Popover.Trigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "flex h-auto w-full items-center justify-start rounded-2xl border bg-white px-4 py-3 text-left text-sm font-normal transition-colors hover:bg-gray-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none",
                          !reservationDate && "text-gray-500",
                          state?.errors?.date
                            ? "border-red-300"
                            : "border-gray-200"
                        )}
                        aria-describedby={
                          state?.errors?.date
                            ? "reservationDate-error"
                            : undefined
                        }
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {reservationDate ? (
                          reservationDate.toLocaleDateString(
                            i18n.language || "en",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )
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
                            setReservationDate(date ?? null);
                          }}
                          onClose={() => setCalendarOpen(false)}
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
                      reservationDate
                        ? formatDate(reservationDate, "yyyy-MM-dd")
                        : ""
                    }
                  />
                  {state?.errors?.date && (
                    <p
                      id="reservationDate-error"
                      className="mt-1 text-xs text-red-600"
                    >
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
                    state?.errors?.message
                      ? "border-red-300"
                      : "border-gray-200"
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
                            onChange={(token) => setCaptchaToken(token || "")}
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
                    <p
                      id="recaptchaToken-error"
                      className="mt-1 text-xs text-red-600"
                    >
                      {state.errors.recaptchaToken}
                    </p>
                  )}
                </>

                <div className="w-full flex-1">
                  <SubmitButton buttonText={buttonText} />
                </div>
              </m.div>
            </form>
          </m.div>

          <m.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-2xl ring-1 shadow-slate-900/40 ring-white/10 lg:col-span-2 lg:p-8"
          >
            <div
              className="absolute -top-20 -right-10 h-48 w-48 rounded-full bg-orange-500/30 blur-3xl"
              aria-hidden="true"
            ></div>
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--color-slate-900)_0%,rgba(15,23,42,0.6)_55%,transparent_90%)] opacity-90"
              aria-hidden="true"
            ></div>

            <div className="relative flex flex-col gap-8">
              <div className="flex flex-col items-center gap-3 text-center">
                <>
                  <p className="text-[11px] font-semibold tracking-[0.45em] text-amber-200 uppercase">
                    {t("booking.checkBadge", "Check us")}
                  </p>
                  <h3 className="mt-1 mb-4 text-xl font-semibold sm:text-2xl">
                    {t("booking.checkTitle", "Find us on TripAdvisor")}
                  </h3>
                </>
                <div className="inline-flex h-32 w-32 items-center justify-center rounded-full border-2 border-white/20 bg-white/5 p-4 ring-1 ring-white/10">
                  <Image
                    src="/icons/tripadvisor-nav_icon.svg"
                    alt={t("booking.tripadvisorAlt", "TripAdvisor icon")}
                    width={48}
                    height={48}
                    className="h-20 w-20 object-contain"
                  />
                </div>
              </div>

              <div className="mx-auto flex w-fit items-center gap-3 rounded-2xl bg-white/5 p-3">
                <div className="text-2xl leading-none font-extrabold">4.5</div>
                <div className="text-xs text-slate-200">
                  {t("booking.ratingLabel", "Average guest rating")}
                  <span className="block text-[10px] text-amber-200">
                    {t("booking.reviewCount", "Based on 180+ travellers")}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-100">
                {t(
                  "booking.checkCopy",
                  "Read honest reviews and, if you prefer, request your booking directly through our TripAdvisor listing."
                )}
              </p>

              <ul className="grid gap-6 text-sm">
                {perks.map((perk, idx) => (
                  <li key={idx} className="inline-flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs font-semibold">
                      {idx + 1}
                    </span>
                    <span className="flex-1 text-slate-100">{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="https://www.tripadvisor.de/Attraction_Review-g293734-d32584739-Reviews-Amsirar_Travel-Marrakech_Marrakech_Safi.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex transform items-center justify-center gap-2 rounded-full bg-[#34E0A1] px-4 py-2 text-sm font-semibold text-black transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-[#2bc48d] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34E0A1]"
                  aria-label={t(
                    "booking.tripadvisorCtaAria",
                    "Open TripAdvisor in new tab"
                  )}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{t("booking.checkCta", "Check reviews & book")}</span>
                </a>
              </div>
            </div>
          </m.aside>
        </div>
      </div>
    </section>
  );
}

export default BookingForm;
