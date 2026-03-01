"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import { format as formatDate } from "date-fns";
import { EnhancedCalendar } from "@/shared/ui/calendar";
import * as Popover from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { m } from "motion/react";
import type { BookingFormState } from "../actions/booking-action";

interface BookingTripDetailsProps {
  state: BookingFormState | null;
  locale: string;
  calendarOpen: boolean;
  reservationDate: Date | null;
  onCalendarOpenChange: (open: boolean) => void;
  onDateSelect: (date: Date | null) => void;
}

export function BookingTripDetails({
  state,
  locale,
  calendarOpen,
  reservationDate,
  onCalendarOpenChange,
  onDateSelect,
}: BookingTripDetailsProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* People count + Date picker row */}
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

      {/* Message textarea */}
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
    </>
  );
}
