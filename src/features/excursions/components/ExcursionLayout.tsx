"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { DetailsSidebar } from "@/shared/layout/DetailsSidebar";
import { PageHeader } from "@/shared/layout/PageHeader";
import { AnimateOnScroll } from "@/shared/ui";

const ExcursionInfo = dynamic(() => import("./ExcursionInfo"));

const BookingForm = dynamic(() => import("@/features/booking/components/BookingForm"), {
  ssr: false,
});

interface ExcursionLayoutProps {
  excursionKey: string;
  bookingId: string | number;
  imageSrc: string;
}

function ExcursionLayout({ excursionKey, bookingId, imageSrc }: ExcursionLayoutProps) {
  const { t } = useTranslation();
  const rawT = useTranslations();

  const highlights: string[] = [
    t(`${excursionKey}.highlights.0`),
    t(`${excursionKey}.highlights.1`),
    t(`${excursionKey}.highlights.2`),
    t(`${excursionKey}.highlights.3`),
  ].filter(Boolean); // Filter out any empty strings
  const sidebarItems = (rawT.raw("excursion.sidebar.items") as string[]) || [];

  const title = t(`${excursionKey}.title`);
  const bookingTitle = t(`${excursionKey}.bookingTitle`);
  // Dynamic labels from translations
  const distanceLabel = t(`${excursionKey}.distanceValue`, "~191 km from Marrakech");
  const durationLabel = t(`${excursionKey}.durationLabel`, "Full-day excursion");
  const altText = t(`${excursionKey}.alt`);

  return (
    <>
      <PageHeader
        title={t("excursion.detailsTitle")}
        subtitle={t("excursion.detailsSubtitle")}
        smTitle={t("excursion.detailsTitle")}
        bgImage="/images/Header/header-1.webp"
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.excursions"), href: "/excursions" },
          { label: t("excursion.detailsTitle") },
        ]}
      />

      <main>
        <section
          id="excursion-single"
          className="py-14"
          aria-labelledby="excursion-title"
        >
          <div className="mx-auto grid gap-10 px-4 max-inline-7xl lg:grid-cols-[4fr_2fr]">
            <article className="rounded-[20px] bg-white p-4 pbe-8 shadow-xs ring-1 ring-zinc-100 sm:p-6 sm:pbe-12">
              <AnimateOnScroll animation="zoom-in">
                <figure className="relative mbe-8 aspect-4/3 overflow-hidden rounded-[20px] border border-zinc-50 shadow-md inline-full">
                  <Image
                    className="object-cover"
                    src={imageSrc}
                    alt={`${altText} - Morocco excursion destination`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </figure>
              </AnimateOnScroll>

              <AnimateOnScroll
                animation="fade-up"
                delay={150}
              >
                <div className="mbe-6 text-center">
                  <div className="mx-auto inline-block">
                    <span
                      className="mbe-3 hidden rounded-full bg-amber-300 block-1 inline-16 sm:block"
                      aria-hidden="true"
                    ></span>
                    <h2
                      id="excursion-title"
                      className="mbs-2 text-2xl leading-tight font-semibold text-orange sm:text-3xl md:text-4xl"
                    >
                      {title}
                    </h2>
                  </div>
                </div>
              </AnimateOnScroll>

              <div className="space-y-8">
                <AnimateOnScroll
                  animation="fade-up"
                  delay={150}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="inline-flex items-center gap-3 rounded-full border border-orange-100 bg-orange-50 px-5 py-3">
                      <svg
                        className="size-5 text-orange-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M3 12h18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="text-start">
                        <div className="text-sm font-semibold text-orange-600">{distanceLabel}</div>
                        <div className="text-xs font-semibold text-amber-300">
                          {t("excursion.common.distanceLabel", "Distance")}
                        </div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-3 rounded-full border border-amber-100 bg-amber-50 px-5 py-3">
                      <svg
                        className="size-5 text-amber-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M12 3v18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="text-start">
                        <div className="text-sm font-semibold text-amber-600">{durationLabel}</div>
                        <div className="text-xs font-semibold text-amber-300">
                          {t("excursion.common.durationLabel", "Duration")}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
                <ExcursionInfo
                  highlights={highlights}
                  overview={t(`${excursionKey}.overview`)}
                />
              </div>
            </article>

            <DetailsSidebar
              sidebarItems={sidebarItems}
              translationPrefix="excursion"
            />
          </div>
        </section>
        <BookingForm
          excursionId={String(bookingId)}
          excursionTitle={bookingTitle}
          fullWidth
        />
      </main>
    </>
  );
}

export default ExcursionLayout;
