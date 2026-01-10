"use client";

import React, { useState, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { format as formatDate } from "date-fns";
import ReCAPTCHA from "react-google-recaptcha";
import { TOURS_DATA } from "@/features/tours";
import { EnhancedCalendar } from "@/shared/ui/calendar-enhanced";
import { RECAPTCHA_V2_SITE_KEY } from "@/lib/client-env";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { m } from "motion/react";
import { validateBookingForm, sanitizeInput } from "@/lib/validation";
import { submitBooking, ApiError } from "@/lib/api-client";
import { LoadingSpinner } from "@/shared/ui/Loading";

interface BookingFormProps {
  tourTitle?: string;
  tourId?: string;
  excursionTitle?: string;
  excursionId?: string;
  fullWidth?: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({
  tourTitle,
  tourId,
  excursionTitle,
  excursionId,
  fullWidth = false,
}) => {
  const { t, i18n } = useTranslation();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState<{
    selectedTour: string;
    fullName: string;
    email: string;
    phone: string;
    numberOfPeople: string;
    reservationDate: Date | null;
    message: string;
  }>({
    selectedTour:
      tourTitle && tourId
        ? `${tourTitle} - Duration: ${
            TOURS_DATA.find((t) => t.id === Number(tourId))?.duration || ""
          } Days`
        : tourTitle || excursionTitle || "",
    fullName: "",
    email: "",
    phone: "",
    numberOfPeople: "",
    reservationDate: null,
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [buttonText, setButtonText] = useState("booking.checkAvailability");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const perks = useMemo(
    () => [
      t("booking.perkLocalExperts", "Licensed local drivers & guides"),
      t("booking.perkFlexible", "Flexible departures from Marrakech"),
      t("booking.perkSupport", "Fast responses within 24 hours"),
    ],
    [t]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: sanitizeInput(value),
      }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    // Validate form
    const validation = validateBookingForm({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      numberOfPeople: formData.numberOfPeople,
      reservationDate: formData.reservationDate,
      message: formData.message,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      setTouched({
        fullName: true,
        email: true,
        phone: true,
        numberOfPeople: true,
        reservationDate: true,
      });
      // Focus first error field
      const firstErrorField = Object.keys(validation.errors)[0];
      document.getElementsByName(firstErrorField)[0]?.focus();
      return;
    }

    // Validate CAPTCHA (only if configured)
    const recaptchaToken = recaptchaRef.current?.getValue();
    if (RECAPTCHA_V2_SITE_KEY && !recaptchaToken) {
      setErrors({
        captcha: t(
          "booking.errors.captcha",
          "Please complete the CAPTCHA verification."
        ),
      });
      return;
    }

    try {
      setSubmitting(true);
      setErrors({});

      const persons = Number(formData.numberOfPeople || 0);
      const dateStr = formData.reservationDate
        ? formatDate(formData.reservationDate, "yyyy-MM-dd")
        : "";

      const reservationTypeValue = formData.selectedTour
        ? `${
            tourId
              ? `Tour${tourId} `
              : excursionId
                ? `Excursion${excursionId} `
                : ""
          }${formData.selectedTour}`
        : "General";

      const tourDuration = tourId
        ? TOURS_DATA.find((t) => t.id === Number(tourId))?.duration
        : null;

      const result = await submitBooking({
        reservationType: reservationTypeValue,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        persons: persons > 0 ? persons : 1,
        date: dateStr,
        message: formData.message,
        language: i18n.language,
        duration: tourDuration ?? undefined,
        recaptchaToken: recaptchaToken || "",
      });

      if (result.ok) {
        setButtonText("Your booking request has been sent");
        setTimeout(() => {
          setButtonText("booking.checkAvailability");
        }, 4000);
        // Reset form
        setFormData((prev) => ({
          ...prev,
          fullName: "",
          email: "",
          phone: "",
          numberOfPeople: "",
          reservationDate: null,
          message: "",
        }));
        setTouched({});
        recaptchaRef.current?.reset();
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors({
          submit:
            error.status === 429
              ? t(
                  "booking.errors.rateLimit",
                  "Too many requests. Please try again in a minute."
                )
              : error.message,
        });
      } else {
        setErrors({
          submit: t(
            "booking.errors.network",
            "Network error. Please check your connection and try again."
          ),
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const baseSectionClass = `py-20 md:py-10 bg-gray-50 ${
    fullWidth ? "booking-form-fullwidth" : ""
  }`;
  const innerWrapperClass = `booking-form-inner mx-auto w-full max-w-6xl ${
    fullWidth ? "px-4 sm:px-6 lg:px-10" : "px-4 sm:px-6 lg:px-8"
  }`;

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
              onSubmit={handleSubmit}
              className="space-y-5 p-6 md:p-8"
              noValidate
            >
              {/* Error Summary */}
              {errors.submit && (
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
                    <span>{errors.submit}</span>
                  </div>
                </div>
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
                    name="selectedTour"
                    placeholder={t("booking.selectedTour", "Selected Tour")}
                    value={`${tourTitle} - Duration: ${
                      TOURS_DATA.find((t) => t.id === Number(tourId))
                        ?.duration || ""
                    } Days`}
                    readOnly
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
                    name="selectedTour"
                    placeholder={t(
                      "booking.selectedExcursion",
                      "Selected Excursion"
                    )}
                    value={excursionTitle}
                    readOnly
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
                      "w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200",
                      errors.fullName && touched.fullName
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-200"
                    )}
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder={t("booking.fullName", "Full Name")}
                    aria-label={t("booking.fullName", "Full Name")}
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("fullName")}
                    autoComplete="name"
                    aria-invalid={
                      errors.fullName && touched.fullName ? "true" : "false"
                    }
                    aria-describedby={
                      errors.fullName ? "fullName-error" : undefined
                    }
                    required
                  />
                  {errors.fullName && touched.fullName && (
                    <p
                      id="fullName-error"
                      className="mt-1 text-xs text-red-600"
                    >
                      {errors.fullName}
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
                      "w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200",
                      errors.phone && touched.phone
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-200"
                    )}
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder={t("booking.phone", "Phone Number")}
                    aria-label={t("booking.phone", "Phone Number")}
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("phone")}
                    autoComplete="tel"
                    aria-invalid={
                      errors.phone && touched.phone ? "true" : "false"
                    }
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    required
                  />
                  {errors.phone && touched.phone && (
                    <p id="phone-error" className="mt-1 text-xs text-red-600">
                      {errors.phone}
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
                    "w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200",
                    errors.email && touched.email
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200"
                  )}
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t("booking.email", "Email")}
                  aria-label={t("booking.email", "Email")}
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("email")}
                  autoComplete="email"
                  aria-invalid={
                    errors.email && touched.email ? "true" : "false"
                  }
                  aria-describedby={errors.email ? "email-error" : undefined}
                  required
                />
                {errors.email && touched.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-600">
                    {errors.email}
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
                      "w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200",
                      errors.numberOfPeople && touched.numberOfPeople
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
                    value={formData.numberOfPeople}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("numberOfPeople")}
                    autoComplete="off"
                    min="1"
                    max="50"
                    aria-invalid={
                      errors.numberOfPeople && touched.numberOfPeople
                        ? "true"
                        : "false"
                    }
                    aria-describedby={
                      errors.numberOfPeople ? "numberOfPeople-error" : undefined
                    }
                    required
                  />
                  {errors.numberOfPeople && touched.numberOfPeople && (
                    <p
                      id="numberOfPeople-error"
                      className="mt-1 text-xs text-red-600"
                    >
                      {errors.numberOfPeople}
                    </p>
                  )}
                </m.div>

                <m.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "h-auto w-full justify-start rounded-2xl border-gray-200 px-4 py-3 text-left text-sm font-normal hover:bg-gray-50 hover:text-gray-900",
                          !formData.reservationDate && "text-gray-500",
                          errors.reservationDate && touched.reservationDate
                            ? "border-red-300"
                            : "border-gray-200"
                        )}
                        aria-invalid={
                          errors.reservationDate && touched.reservationDate
                            ? "true"
                            : "false"
                        }
                        aria-describedby={
                          errors.reservationDate
                            ? "reservationDate-error"
                            : undefined
                        }
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {formData.reservationDate ? (
                          formData.reservationDate.toLocaleDateString(
                            i18n.language || "en",
                            { day: "numeric", month: "short", year: "numeric" }
                          )
                        ) : (
                          <span>{t("booking.reservationDate")}</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden rounded-2xl border-0 bg-transparent p-0 shadow-none"
                      align="start"
                    >
                      <EnhancedCalendar
                        selected={formData.reservationDate ?? undefined}
                        onSelect={(date: Date | undefined) => {
                          setFormData((prev) => ({
                            ...prev,
                            reservationDate: date ?? null,
                          }));
                          if (errors.reservationDate) {
                            setErrors((prev) => ({
                              ...prev,
                              reservationDate: "",
                            }));
                          }
                        }}
                        onClose={() => setCalendarOpen(false)}
                        disabled={(date: Date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.reservationDate && touched.reservationDate && (
                    <p
                      id="reservationDate-error"
                      className="mt-1 text-xs text-red-600"
                    >
                      {errors.reservationDate}
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
                    "w-full rounded-2xl border px-4 py-3 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-200",
                    errors.message && touched.message
                      ? "border-red-300"
                      : "border-gray-200"
                  )}
                  id="message"
                  name="message"
                  placeholder={t("booking.message", "Your message")}
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={(e) => handleBlur(e.target.name)}
                  autoComplete="off"
                  rows={4}
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
              </div>

              <m.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="flex flex-col gap-4 lg:flex-row lg:items-center"
              >
                <div>
                  <div className="flex w-full justify-center overflow-hidden lg:justify-start">
                    <div
                      className={cn(
                        "origin-center scale-85 rounded-2xl border border-dashed p-3 sm:scale-100 lg:origin-left",
                        errors.recaptchaToken && touched.recaptchaToken
                          ? "border-red-300"
                          : "border-gray-200"
                      )}
                    >
                      {RECAPTCHA_V2_SITE_KEY ? (
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={RECAPTCHA_V2_SITE_KEY}
                          onChange={(token) => {
                            setFormData((prev) => ({
                              ...prev,
                              recaptchaToken: token,
                            }));
                            if (errors.recaptchaToken) {
                              setErrors((prev) => ({
                                ...prev,
                                recaptchaToken: "",
                              }));
                            }
                          }}
                        />
                      ) : (
                        <div className="rounded bg-amber-50 p-2 text-sm text-amber-600">
                          CAPTCHA configuration missing.
                        </div>
                      )}
                    </div>
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

                <div className="w-full flex-1">
                  <button
                    className="flex w-full transform items-center justify-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase shadow-lg shadow-orange-500/25 transition duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                    type="submit"
                    disabled={submitting}
                    aria-busy={submitting}
                  >
                    {submitting && <LoadingSpinner size="sm" />}
                    {submitting
                      ? t("booking.sending", "Sending...")
                      : buttonText === "booking.checkAvailability"
                        ? t(buttonText, "Reserve Now")
                        : buttonText}
                  </button>
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
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0f172a_0%,rgba(15,23,42,0.6)_55%,transparent_90%)] opacity-90"
              aria-hidden="true"
            ></div>

            <div className="relative flex flex-col gap-6">
              <div className="flex flex-col items-center gap-3 text-center">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.45em] text-amber-200 uppercase">
                    {t("booking.checkBadge", "Check us")}
                  </p>
                  <h3 className="mt-1 mb-4 text-xl font-semibold sm:text-2xl">
                    {t("booking.checkTitle", "Find us on TripAdvisor")}
                  </h3>
                </div>
                <div>
                  <div className="inline-flex h-25 w-25 items-center justify-center rounded-full border-2 border-white/20 bg-white/5 p-3 ring-1 ring-white/10">
                    <Image
                      src="/icons/tripadvisor-nav_icon.svg"
                      alt={t("booking.tripadvisorAlt", "TripAdvisor icon")}
                      width={32}
                      height={32}
                      className="h-15 w-15 object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
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

              <ul className="grid gap-3 text-sm">
                {perks.map((perk, idx) => (
                  <li key={idx} className="inline-flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs font-semibold">
                      {idx + 1}
                    </span>
                    <span className="flex-1 text-slate-100">{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="https://www.tripadvisor.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex transform items-center justify-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
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
};

export default BookingForm;
