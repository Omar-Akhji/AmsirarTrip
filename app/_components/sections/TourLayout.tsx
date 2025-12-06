"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { TOURS_DATA } from "@/lib/constants/toursData";
import { motion } from "framer-motion";

const BookingForm = dynamic(() => import("@/components/forms/BookingForm"), {
  ssr: false,
  loading: () => <div>Loading booking form...</div>,
});

// Define interfaces
interface TourData {
  id: number;
  image: string;
  title: string;
  author: string;
  category: string;
  description: string;
  duration: number;
  start: string;
  end: string;
  route: string;
}

interface TourLayoutProps {
  tourKey: string;
  bookingId: number;
  imageSrc: string;
}

interface TransProps {
  i18nKey: string;
  components?: Record<string, React.ReactNode>;
  children?: React.ReactNode;
}

const Trans = ({ i18nKey, components, children }: TransProps) => {
  const t = useTranslations();

  // Use components to avoid unused variable warning
  void components;

  return <>{children || t(i18nKey)}</>;
};

const CheckIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 12.5L9.5 17L19 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Helper function to get ordinal suffix
const getOrdinalSuffix = (num: number) => {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return num + "st";
  if (j === 2 && k !== 12) return num + "nd";
  if (j === 3 && k !== 13) return num + "rd";
  return num + "th";
};

const TourLayout = ({ tourKey, bookingId, imageSrc }: TourLayoutProps) => {
  const t = useTranslations();

  // Get tour data from TOURS_DATA
  const tourData = (TOURS_DATA.find((tour) => tour.id === bookingId) ||
    {}) as Partial<TourData>;

  // Use type assertion for array return, with safe fallback
  const rawSidebarItems = t.raw("tours.sidebar.items");
  const sidebarItems = Array.isArray(rawSidebarItems)
    ? (rawSidebarItems as string[])
    : [];

  // Get translation data
  const title = t(`${tourKey}.title`);
  const overview = t(`${tourKey}.overview`);
  const includes = t(`${tourKey}.includes`);
  const excludes = t(`${tourKey}.excludes`);
  const goodToKnow = t(`${tourKey}.goodToKnow`);
  const dayLabel = t("tours.day");

  const days = useMemo(() => {
    const result = [];
    const duration = tourData.duration || 3;
    for (let i = 1; i <= duration; i++) {
      const dayKey = `${tourKey}.day${i}`;
      // Try to get the specific title key first to avoid INSUFFICIENT_PATH error
      // if dayKey resolves to an object
      let dayTitle = "";
      try {
        dayTitle = t(`${dayKey}.title`);
      } catch {
        // If title doesn't exist, we might get an error or empty string depending on config
        // fallback to checking if the key itself is a string (legacy support)
        try {
          const rawValue = t.raw(dayKey);
          if (typeof rawValue === "string") {
            dayTitle = rawValue;
          }
        } catch {
          // Ignore
        }
      }

      // Fallback if no title found
      if (!dayTitle || dayTitle === `${dayKey}.title`) {
        dayTitle = `Day ${i}`;
      }
      // Use type assertion for array return
      const dayText = t.raw(`${dayKey}.text`) as string[];

      if (dayTitle && dayTitle !== dayKey) {
        result.push({
          number: i,
          title: dayTitle,
          text: Array.isArray(dayText) ? dayText : [],
        });
      }
    }
    return result;
  }, [tourKey, tourData.duration, t]);

  return (
    <>
      <header className="header-sm relative isolate flex overflow-hidden bg-slate-900 text-white">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,250,252,0.08),transparent_60%)]"
          aria-hidden="true"
        ></div>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 lg:flex-row lg:items-center">
          <div className="flex-1">
            <span className="text-4xl font-semibold tracking-[0.45em] text-orange-200 uppercase">
              {t("tours.detailsTitle")}
            </span>
            <div className="mt-2">
              <p className="mt-1 text-xl text-slate-300">
                {t("tours.detailsSubtitle")}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section id="tour-single" className="py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[4fr_2fr]">
          <article className="rounded-3xl bg-white p-8 shadow-xl shadow-orange-100/50 sm:p-12">
            <figure className="relative mb-8 aspect-4/3 w-full overflow-hidden rounded-2xl">
              <Image
                className="object-cover"
                src={imageSrc}
                alt={`${title} - Tour image showcasing Morocco travel experience`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </figure>

            <div className="mb-6 text-center">
              <div className="mx-auto inline-block">
                <span
                  className="mb-3 block h-1 w-16 rounded-full bg-amber-300"
                  aria-hidden="true"
                ></span>
                <h1 className="mt-2 text-3xl leading-tight font-extrabold text-amber-600 md:text-4xl">
                  {title}
                </h1>
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="inline-flex items-center gap-3 rounded-full border border-orange-100 bg-orange-50 px-5 py-3">
                  <svg
                    className="size-5 text-orange-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M12 8v4l3 3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-orange-600">
                      {tourData.duration} {t("tours.days")}
                    </div>
                    <div className="text-xs font-semibold text-amber-600">
                      {t("tours.duration")}
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-3 rounded-full border border-indigo-100 bg-indigo-50 px-5 py-3">
                  <svg
                    className="size-5 text-indigo-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17l10 5 10-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-indigo-600">
                      {t(tourData.start || "tours.cities.marrakech")}
                    </div>
                    <div className="text-xs font-semibold text-indigo-600">
                      {t("tours.start")}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  {t("tours.overview")}
                </h2>
                <p className="leading-relaxed whitespace-pre-line text-gray-700">
                  {overview}
                </p>
              </div>

              {/* Itinerary */}
              <div>
                <h2 className="mb-8 text-2xl font-bold text-slate-900">
                  {t("tours.itinerary")}
                </h2>
                <div className="space-y-8">
                  {days.map((day, idx) => (
                    <motion.div
                      key={day.number}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="group relative"
                    >
                      {/* Day Title with Modern Design */}
                      <div className="mb-6">
                        <div className="mb-4 flex items-center gap-4">
                          <div className="shrink-0">
                            <div className="flex size-12 items-center justify-center rounded-full bg-linear-to-br from-orange-500 to-amber-600 text-lg font-bold text-white shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                              {getOrdinalSuffix(day.number)}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-xl leading-tight font-bold tracking-tight text-slate-900">
                              {dayLabel} {day.number}
                            </h3>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {day.title.split("➜").map((location, idx, arr) => (
                            <React.Fragment key={idx}>
                              <span className="inline-flex items-center rounded-full border border-orange-200/50 bg-linear-to-r from-orange-50 to-amber-50 px-3 py-1 text-sm font-medium text-orange-700">
                                {location.trim()}
                              </span>
                              {idx < arr.length - 1 && (
                                <svg
                                  className="size-4 shrink-0 text-orange-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.409l-7-14z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* Day Content */}
                      {day.text.length > 0 && (
                        <div className="border-orange ml-5.5 space-y-3 border-l-4 pl-6">
                          {day.text.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="mt-1 shrink-0">
                                <div className="flex size-6 items-center justify-center rounded-full bg-linear-to-br from-green-500 to-emerald-600 text-white shadow-sm">
                                  <CheckIcon />
                                </div>
                              </div>
                              <p className="flex-1 text-sm leading-relaxed text-gray-700">
                                {item}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Includes */}
              {includes && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">
                    {t("tours.included")}
                  </h2>
                  <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                    <ul className="space-y-2">
                      {includes.split("\n").map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                            <CheckIcon />
                          </span>
                          <span className="flex-1 text-left text-gray-700">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Excludes */}
              {excludes && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">
                    {t("tours.excluded")}
                  </h2>
                  <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                    <ul className="space-y-2">
                      {excludes.split("\n").map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            ✕
                          </span>
                          <span className="flex-1 text-left text-gray-700">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Good to Know */}
              {goodToKnow && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">
                    {t("tours.goodToKnow")}
                  </h2>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                    <ul className="space-y-2">
                      {goodToKnow
                        .split("\n")
                        .map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                              i
                            </span>
                            <span className="flex-1 text-left text-gray-700">
                              {item}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </article>

          <aside className="space-y-6 self-start lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl">
              <div className="p-8">
                <p className="text-center text-xs tracking-[0.45em] text-orange-300 uppercase">
                  {t("tours.sidebar.title")}
                </p>
                <h3 className="mt-2 text-center text-2xl font-semibold">
                  {t("tours.sidebar.mainBrand")}
                </h3>
                <span className="mx-auto mt-1 block w-max rounded-full border border-orange-300 px-3 py-0.5 text-sm text-orange-200">
                  {t("tours.sidebar.subBrand")}
                </span>
                <div
                  className="my-4 border-t border-slate-700"
                  aria-hidden="true"
                ></div>
                <p className="mt-2 text-sm text-slate-200">
                  <Trans
                    i18nKey="tours.sidebar.intro"
                    components={{ strong: <strong className="text-white" /> }}
                  />
                </p>
                <p className="mt-4 text-sm text-slate-200">
                  {t("tours.sidebar.details")}
                </p>
                <ul className="mt-4 grid gap-3 text-sm text-slate-100">
                  {sidebarItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="grid grid-cols-[40px_1fr] items-center gap-3"
                    >
                      <div className="flex items-center justify-end">
                        <span className="inline-flex size-5 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white">
                          {idx + 1}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-200">
                  {t("tours.sidebar.conclusion")}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-slate-900">
                {t("tours.sidebar.ctaTitle")}
              </h4>
              <p className="mt-2 text-sm text-slate-500">
                {t("tours.sidebar.ctaDescription")}
              </p>
              <ul className="m-0 mt-4 grid list-none gap-3 p-0 text-sm text-slate-600">
                <li className="grid grid-cols-[40px_1fr] items-center gap-3">
                  <div className="flex items-center justify-end">
                    <span className="size-2 rounded-full bg-orange-500"></span>
                  </div>
                  <p className="">{t("tours.sidebar.ctaPoint01")}</p>
                </li>
                <li className="grid grid-cols-[40px_1fr] items-center gap-3">
                  <div className="flex items-center justify-end">
                    <span className="size-2 rounded-full bg-orange-500"></span>
                  </div>
                  <p className="">{t("tours.sidebar.ctaPoint02")}</p>
                </li>
                <li className="grid grid-cols-[40px_1fr] items-center gap-3">
                  <div className="flex items-center justify-end">
                    <span className="size-2 rounded-full bg-orange-500"></span>
                  </div>
                  <p className="">{t("tours.sidebar.ctaPoint03")}</p>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <BookingForm
        excursionId={bookingId.toString()}
        excursionTitle={title}
        fullWidth
      />
    </>
  );
};

export default TourLayout;
