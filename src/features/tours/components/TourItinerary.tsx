import React from "react";
import { Check, Clock, Hotel, Navigation2, Tent, Utensils } from "lucide-react";
import { AnimateOnScroll } from "@/shared/ui";

// Helper function to get ordinal suffix
const getOrdinalSuffix = (num: number) => {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return num + "st";
  if (j === 2 && k !== 12) return num + "nd";
  if (j === 3 && k !== 13) return num + "rd";
  return num + "th";
};

interface DayData {
  number: number;
  title: string;
  text: string[];
  accommodation?: string;
  meals?: string;
  activities?: string;
  arrival?: string;
}

interface TourItineraryProps {
  days: DayData[];
  accommodationLabel: string;
  mealsLabel: string;
  activitiesLabel: string;
  arrivalLabel: string;
}

export default function TourItinerary({
  days,
  accommodationLabel,
  mealsLabel,
  activitiesLabel,
  arrivalLabel,
}: TourItineraryProps) {
  return (
    <div className="space-y-8">
      {days.map((day, idx) => (
        <AnimateOnScroll
          key={day.number}
          animation="fade-up"
          delay={idx * 100}
        >
          <div className="group relative">
            {/* Day Title with Modern Design */}
            <div className="mbe-6">
              <div className="mbe-4 flex items-center gap-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center rounded-full bg-linear-to-br from-orange-500 to-amber-600 px-4 text-lg font-bold text-white shadow-lg transition-shadow duration-300 block-12 group-hover:shadow-xl">
                    {getOrdinalSuffix(day.number)} Day
                  </div>
                </div>
              </div>
            </div>

            {/* Day Content */}
            <div className="relative space-y-3 border-s-0 ps-0 sm:ms-5.5 sm:border-s-2 sm:border-orange-200/50 sm:ps-8">
              {/* Cities Route */}
              <div className="mbe-4 flex flex-wrap items-center gap-2">
                {day.title.split("➜").map((location, idx, arr) => (
                  <React.Fragment key={location.trim()}>
                    <span className="inline-flex items-center rounded-full border border-orange-200/50 bg-linear-to-r from-orange-50 to-amber-50 px-3 py-1 text-sm font-medium text-orange-700">
                      {location.trim()}
                    </span>
                    {idx < arr.length - 1 && (
                      <Navigation2
                        className="size-3.5 shrink-0 rotate-90 text-orange-400"
                        aria-hidden
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
              {day.text.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <div className="mbs-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-green-500 to-emerald-600 text-white shadow-xs">
                    <Check
                      className="size-3.5"
                      aria-hidden
                    />
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-neutral-700 sm:text-base">
                    {item}
                  </p>
                </div>
              ))}

              {/* Day Details Grid */}
              {(day.accommodation || day.meals || day.activities || day.arrival) && (
                <div className="mbs-4 grid gap-3 sm:grid-cols-2">
                  {day.accommodation && (
                    <div className="flex items-center gap-2 rounded-lg border-[3px] border-amber-200 bg-amber-50 px-3 py-2">
                      <Hotel
                        className="size-5 shrink-0 text-amber-600"
                        aria-hidden
                      />
                      <div>
                        <div className="text-xs font-semibold text-amber-700">
                          {accommodationLabel}
                        </div>
                        <div className="text-sm text-amber-900">{day.accommodation}</div>
                      </div>
                    </div>
                  )}
                  {day.meals && (
                    <div className="flex items-center gap-2 rounded-lg border-[3px] border-amber-200 bg-amber-50 px-3 py-2">
                      <Utensils
                        className="size-5 shrink-0 text-amber-600"
                        aria-hidden
                      />
                      <div>
                        <div className="text-xs font-semibold text-amber-700">{mealsLabel}</div>
                        <div className="text-sm text-amber-900">{day.meals}</div>
                      </div>
                    </div>
                  )}
                  {day.activities && (
                    <div className="flex items-center gap-2 rounded-lg border-[3px] border-emerald-200 bg-emerald-50 px-3 py-2">
                      <Tent
                        className="size-5 shrink-0 text-emerald-600"
                        aria-hidden
                      />
                      <div>
                        <div className="text-xs font-semibold text-emerald-700">
                          {activitiesLabel}
                        </div>
                        <div className="text-sm text-emerald-900">{day.activities}</div>
                      </div>
                    </div>
                  )}
                  {day.arrival && (
                    <div className="flex items-center gap-2 rounded-lg border-[3px] border-sky-200 bg-sky-50 px-3 py-2">
                      <Clock
                        className="size-5 shrink-0 text-sky-600"
                        aria-hidden
                      />
                      <div>
                        <div className="text-xs font-semibold text-sky-700">{arrivalLabel}</div>
                        <div className="text-sm text-sky-900">{day.arrival}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  );
}
