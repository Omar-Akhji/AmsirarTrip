"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { TOURS_DATA } from "../data";
import { m } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faUtensils,
  faHorseHead,
  faClock,
  faCheck,
  faArrowRight,
  faMapMarkerAlt,
} from "@/lib/fontawesome";

import { PageHeader } from "@/shared/layout/PageHeader";

const BookingForm = dynamic(
  () => import("@/features/booking/components/BookingForm"),
  {
    ssr: false,
    loading: () => <div>Loading booking form...</div>,
  }
);

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

  // Use type assertion for array return
  const sidebarItems = (t.raw("tours.sidebar.items") as string[]) || [];

  // Get translation data
  const title = t(`${tourKey}.title`);
  const overview = t(`${tourKey}.overview`);
  const includes = t(`${tourKey}.includes`);
  const excludes = t(`${tourKey}.excludes`);
  const goodToKnow = t(`${tourKey}.goodToKnow`);
  const dayLabel = t("tours.day");

  // Labels for day details
  const accommodationLabel = t("tours.accommodationLabel");
  const mealsLabel = t("tours.mealsLabel");
  const activitiesLabel = t("tours.activitiesLabel");
  const arrivalLabel = t("tours.arrivalLabel");

  // React Compiler handles memoization automatically
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

    // Get optional day details - use t.has() to check if key exists first
    let accommodation = "";
    let meals = "";
    let activities = "";
    let arrival = "";

    const accommodationKey = `${dayKey}.accommodation`;
    const mealsKey = `${dayKey}.meals`;
    const activitiesKey = `${dayKey}.activities`;
    const arrivalKey = `${dayKey}.arrival`;

    if (t.has(accommodationKey)) {
      accommodation = t(accommodationKey);
    }

    if (t.has(mealsKey)) {
      meals = t(mealsKey);
    }

    if (t.has(activitiesKey)) {
      activities = t(activitiesKey);
    }

    if (t.has(arrivalKey)) {
      arrival = t(arrivalKey);
    }

    if (dayTitle && dayTitle !== dayKey) {
      result.push({
        number: i,
        title: dayTitle,
        text: Array.isArray(dayText) ? dayText : [],
        accommodation,
        meals,
        activities,
        arrival,
      });
    }
  }
  const days = result;

  return (
    <>
      <PageHeader
        title={t("tours.detailsTitle")}
        subtitle={t("tours.detailsSubtitle")}
        smTitle={t("tours.detailsTitle")}
        bgImage="/images/Header/header-1.webp"
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.tours"), href: "/tours" },
          { label: t("tours.detailsTitle") },
        ]}
      />

      <main>
        <section
          id="tour-single"
          className="py-14"
          aria-labelledby="tour-title"
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[4fr_2fr]">
            <article className="rounded-[20px] bg-white p-4 sm:p-6 pb-8 sm:pb-12 shadow-sm ring-1 ring-slate-100">
              <figure className="relative mb-8 aspect-4/3 w-full overflow-hidden rounded-[20px] shadow-md border border-slate-50">
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
                    className="mb-3 hidden h-1 w-16 rounded-full bg-amber-300 sm:block"
                    aria-hidden="true"
                  ></span>
                  <h2
                    id="tour-title"
                    className="mt-2 text-2xl leading-tight font-extrabold text-amber-600 sm:text-3xl md:text-4xl"
                  >
                    {title}
                  </h2>
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="inline-flex items-center gap-3 rounded-full border border-orange-100 bg-orange-50 px-5 py-3">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="size-5 shrink-0 text-orange-500"
                      aria-hidden
                    />
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
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="size-5 shrink-0 text-indigo-500"
                      aria-hidden
                    />
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

                <>
                  <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
                    {t("tours.overview")}
                  </h2>
                  <p className="text-sm leading-relaxed whitespace-pre-line text-gray-700 sm:text-base">
                    {overview}
                  </p>
                </>

                {/* Itinerary */}
                <>
                  <h2 className="mb-8 text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
                    {t("tours.itinerary")}
                  </h2>
                  <div className="space-y-8">
                    {days.map((day, idx) => (
                      <m.div
                        key={day.number}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{
                          once: true,
                          amount: 0.2,
                          margin: "-50px",
                        }}
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
                              <h3 className="text-lg leading-tight font-bold tracking-tight text-slate-900 sm:text-xl md:text-2xl">
                                {dayLabel} {day.number}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Day Content */}
                        <div className="border-orange space-y-3 border-l-0 pl-0 sm:ml-5.5 sm:border-l-4 sm:pl-6">
                          {/* Cities Route */}
                          <div className="mb-4 flex flex-wrap items-center gap-2">
                            {day.title.split("➜").map((location, idx, arr) => (
                              <React.Fragment key={idx}>
                                <span className="inline-flex items-center rounded-full border border-orange-200/50 bg-linear-to-r from-orange-50 to-amber-50 px-3 py-1 text-sm font-medium text-orange-700">
                                  {location.trim()}
                                </span>
                                {idx < arr.length - 1 && (
                                  <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="size-4 shrink-0 text-orange-400"
                                    aria-hidden
                                  />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                          {day.text.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-green-500 to-emerald-600 text-white shadow-sm">
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className="size-3.5"
                                  aria-hidden
                                />
                              </div>
                              <p className="flex-1 text-sm leading-relaxed text-gray-700 sm:text-base">
                                {item}
                              </p>
                            </div>
                          ))}

                          {/* Day Details Grid */}
                          {(day.accommodation ||
                            day.meals ||
                            day.activities ||
                            day.arrival) && (
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                              {day.accommodation && (
                                <div className="flex items-center gap-2 rounded-lg border-[3px] border-indigo-200 bg-indigo-50 px-3 py-2">
                                  <FontAwesomeIcon
                                    icon={faHotel}
                                    className="size-5 shrink-0 text-indigo-600"
                                    aria-hidden
                                  />
                                  <div>
                                    <div className="text-xs font-semibold text-indigo-700">
                                      {accommodationLabel}
                                    </div>
                                    <div className="text-sm text-indigo-900">
                                      {day.accommodation}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {day.meals && (
                                <div className="flex items-center gap-2 rounded-lg border-[3px] border-amber-200 bg-amber-50 px-3 py-2">
                                  <FontAwesomeIcon
                                    icon={faUtensils}
                                    className="size-5 shrink-0 text-amber-600"
                                    aria-hidden
                                  />
                                  <div>
                                    <div className="text-xs font-semibold text-amber-700">
                                      {mealsLabel}
                                    </div>
                                    <div className="text-sm text-amber-900">
                                      {day.meals}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {day.activities && (
                                <div className="flex items-center gap-2 rounded-lg border-[3px] border-emerald-200 bg-emerald-50 px-3 py-2">
                                  <FontAwesomeIcon
                                    icon={faHorseHead}
                                    className="size-5 shrink-0 text-emerald-600"
                                    aria-hidden
                                  />
                                  <div>
                                    <div className="text-xs font-semibold text-emerald-700">
                                      {activitiesLabel}
                                    </div>
                                    <div className="text-sm text-emerald-900">
                                      {day.activities}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {day.arrival && (
                                <div className="flex items-center gap-2 rounded-lg border-[3px] border-sky-200 bg-sky-50 px-3 py-2">
                                  <FontAwesomeIcon
                                    icon={faClock}
                                    className="size-5 shrink-0 text-sky-600"
                                    aria-hidden
                                  />
                                  <div>
                                    <div className="text-xs font-semibold text-sky-700">
                                      {arrivalLabel}
                                    </div>
                                    <div className="text-sm text-sky-900">
                                      {day.arrival}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </m.div>
                    ))}
                  </div>
                </>

                {/* Includes */}
                {includes && (
                  <div>
                    <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
                      {t("tours.included")}
                    </h2>
                    <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                      <ul className="space-y-2">
                        {includes
                          .split("\n")
                          .map((item: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className="size-3"
                                  aria-hidden
                                />
                              </span>
                              <span className="flex-1 text-left text-sm text-gray-700 sm:text-base">
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
                    <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
                      {t("tours.excluded")}
                    </h2>
                    <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                      <ul className="space-y-2">
                        {excludes
                          .split("\n")
                          .map((item: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                ✕
                              </span>
                              <span className="flex-1 text-left text-sm text-gray-700 sm:text-base">
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
                    <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
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
                              <span className="flex-1 text-left text-sm text-gray-700 sm:text-base">
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
                        <span className="inline-flex size-5 items-center justify-center justify-self-end rounded-full bg-orange-500 text-xs font-semibold text-white">
                          {idx + 1}
                        </span>
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
                    <span className="size-2 justify-self-end rounded-full bg-orange-500"></span>
                    <p className="">{t("tours.sidebar.ctaPoint01")}</p>
                  </li>
                  <li className="grid grid-cols-[40px_1fr] items-center gap-3">
                    <span className="size-2 justify-self-end rounded-full bg-orange-500"></span>
                    <p className="">{t("tours.sidebar.ctaPoint02")}</p>
                  </li>
                  <li className="grid grid-cols-[40px_1fr] items-center gap-3">
                    <span className="size-2 justify-self-end rounded-full bg-orange-500"></span>
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
      </main>
    </>
  );
};

export default TourLayout;
