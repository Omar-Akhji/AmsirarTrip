"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { m } from "motion/react";
import { TOURS_DATA } from "../data";
import { Clock, MapPin } from "lucide-react";
import { fadeInUp, fadeInScale, fadeIn } from "@/lib/constants/animations";

import { PageHeader } from "@/shared/layout/PageHeader";

const TourSidebar = dynamic(() => import("./TourSidebar"));
const TourItinerary = dynamic(() => import("./TourItinerary"));
const TourInfo = dynamic(() => import("./TourInfo"));

const BookingForm = dynamic(
  () => import("@/features/booking/components/BookingForm"),
  { ssr: false }
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
            <m.article
              {...fadeIn}
              className="rounded-[20px] bg-white p-4 pb-8 shadow-sm ring-1 ring-slate-100 sm:p-6 sm:pb-12"
            >
              <m.figure
                {...fadeInScale}
                className="relative mb-8 aspect-4/3 w-full overflow-hidden rounded-[20px] border border-slate-50 shadow-md"
              >
                <Image
                  className="object-cover"
                  src={imageSrc}
                  alt={`${title} - Tour image showcasing Morocco travel experience`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </m.figure>

              <m.div {...fadeInUp} className="mb-6 text-center">
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
              </m.div>

              <div className="space-y-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="inline-flex items-center gap-3 rounded-full border border-orange-100 bg-orange-50 px-5 py-3">
                    <Clock
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
                    <MapPin
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

                <m.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }}>
                  <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
                    {t("tours.overview")}
                  </h2>
                  <p className="text-sm leading-relaxed whitespace-pre-line text-gray-700 sm:text-base">
                    {overview}
                  </p>
                </m.div>

                {/* Itinerary */}
                <m.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
                  <h2 className="mb-8 text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
                    {t("tours.itinerary")}
                  </h2>
                  <TourItinerary
                    days={days}
                    accommodationLabel={accommodationLabel}
                    mealsLabel={mealsLabel}
                    activitiesLabel={activitiesLabel}
                    arrivalLabel={arrivalLabel}
                  />
                </m.div>

                {/* Info Sections */}
                <TourInfo
                  includes={includes}
                  excludes={excludes}
                  goodToKnow={goodToKnow}
                  includedTitle={t("tours.included")}
                  excludedTitle={t("tours.excluded")}
                  goodToKnowTitle={t("tours.goodToKnow")}
                />
              </div>
            </m.article>

            <TourSidebar sidebarItems={sidebarItems} />
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
