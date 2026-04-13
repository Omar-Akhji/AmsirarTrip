"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { m } from "motion/react";
import {
  fadeInUp,
  fadeInScale,
  fadeIn,
  slideInUpSmall,
} from "@/lib/constants/animations";

import { PageHeader } from "@/shared/layout/PageHeader";

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

const BookingForm = dynamic(
  () => import("@/features/booking/components/BookingForm"),
  { ssr: false },
);

const CheckIcon = () => (
  <svg
    className="size-4"
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

interface ExcursionLayoutProps {
  excursionKey: string;
  bookingId: string | number;
  imageSrc: string;
}

function ExcursionLayout({
  excursionKey,
  bookingId,
  imageSrc,
}: ExcursionLayoutProps) {
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
  const distanceLabel = t(
    `${excursionKey}.distanceValue`,
    "~191 km from Marrakech",
  );
  const durationLabel = t(
    `${excursionKey}.durationLabel`,
    "Full-day excursion",
  );
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
            <m.article
              {...fadeIn}
              className="rounded-[20px] bg-white p-4 pbe-8 shadow-sm ring-1 ring-slate-100 sm:p-6 sm:pbe-12"
            >
              <m.figure
                {...fadeInScale}
                className="relative mbe-8 aspect-4/3 overflow-hidden rounded-[20px] border border-slate-50 shadow-md inline-full"
              >
                <Image
                  className="object-cover"
                  src={imageSrc}
                  alt={`${altText} - Morocco excursion destination`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </m.figure>

              <m.div {...fadeInUp} className="mbe-6 text-center">
                <div className="mx-auto inline-block">
                  <span
                    className="mbe-3 hidden rounded-full bg-amber-300 block-1 inline-16 sm:block"
                    aria-hidden="true"
                  ></span>
                  <h2
                    id="excursion-title"
                    className="text-orange mbs-2 text-2xl leading-tight font-extrabold sm:text-3xl md:text-4xl"
                  >
                    {title}
                  </h2>
                </div>
              </m.div>

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
                        d="M3 12h18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="text-start">
                      <div className="text-sm font-semibold text-orange-600">
                        {distanceLabel}
                      </div>
                      <div className="text-xs font-semibold text-amber-300">
                        {t("excursion.common.distanceLabel", "Distance")}
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
                        d="M12 3v18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="text-start">
                      <div className="text-sm font-semibold text-indigo-600">
                        {durationLabel}
                      </div>
                      <div className="text-xs font-semibold text-amber-300">
                        {t("excursion.common.durationLabel", "Duration")}
                      </div>
                    </div>
                  </div>
                </div>

                <>
                  <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl md:text-3xl">
                    {t("excursion.common.highlights")}
                  </h2>
                  <ul className="mbs-4 grid gap-3">
                    {highlights.map((item, idx) => (
                      <m.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="grid grid-cols-[40px_1fr] items-center gap-4"
                      >
                        <span className="inline-flex shrink-0 items-center justify-center justify-self-end rounded-full bg-orange-500 text-white block-8 inline-8">
                          <CheckIcon />
                        </span>
                        <p className="text-start text-sm leading-relaxed sm:text-base">
                          {item}
                        </p>
                      </m.li>
                    ))}
                  </ul>
                </>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl md:text-3xl">
                    {t("excursion.common.overview")}
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                    {t(`${excursionKey}.overview`)}
                  </p>
                </div>
              </div>
            </m.article>

            <m.aside
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6 self-start lg:sticky lg:top-24"
            >
              <m.div
                {...slideInUpSmall}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl"
              >
                <div className="p-8">
                  <p className="text-center text-xs tracking-[0.45em] text-orange-300 uppercase">
                    {t("excursion.sidebar.title")}
                  </p>
                  <h3 className="mbs-2 text-center text-2xl font-semibold">
                    {t("excursion.sidebar.mainBrand")}
                  </h3>
                  <span className="mbs-1 block text-center text-sm text-orange-200">
                    {t("excursion.sidebar.subBrand")}
                  </span>
                  <div
                    className="my-4 hidden border-t border-slate-700 sm:block"
                    aria-hidden="true"
                  ></div>
                  <p className="mbs-2 text-sm text-slate-200">
                    <Trans
                      i18nKey="excursion.sidebar.intro"
                      components={{
                        strong: <strong className="text-white" />,
                      }}
                    />
                  </p>
                  <p className="mbs-4 text-sm text-slate-200">
                    {t("excursion.sidebar.details")}
                  </p>
                  <ul className="mbs-4 grid gap-3 text-sm text-slate-100">
                    {sidebarItems.map((item, idx) => (
                      <li
                        key={item}
                        className="grid grid-cols-[40px_1fr] items-center gap-3"
                      >
                        <span className="inline-flex items-center justify-center justify-self-end rounded-full bg-orange-500 text-xs font-semibold text-white block-5 inline-5">
                          {idx + 1}
                        </span>
                        <p className="text-sm leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="mbs-4 text-sm text-slate-200">
                    {t("excursion.sidebar.conclusion")}
                  </p>
                </div>
              </m.div>

              <m.div
                {...slideInUpSmall}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 shadow-sm"
              >
                <h4 className="text-lg font-semibold text-slate-900">
                  {t("excursion.sidebar.ctaTitle")}
                </h4>
                <p className="mbs-2 text-sm text-slate-500">
                  {t("excursion.sidebar.ctaDescription")}
                </p>
                <ul className="m-0 mbs-4 grid list-none gap-3 p-0 text-sm text-slate-600">
                  <li className="grid grid-cols-[40px_1fr] items-center gap-3">
                    <span className="justify-self-end rounded-full bg-orange-500 block-2 inline-2"></span>
                    <p className="">{t("excursion.sidebar.ctaPoint01")}</p>
                  </li>
                  <li className="grid grid-cols-[40px_1fr] items-center gap-3">
                    <span className="justify-self-end rounded-full bg-orange-500 block-2 inline-2"></span>
                    <p className="">{t("excursion.sidebar.ctaPoint02")}</p>
                  </li>
                  <li className="grid grid-cols-[40px_1fr] items-center gap-3">
                    <span className="justify-self-end rounded-full bg-orange-500 block-2 inline-2"></span>
                    <p className="">{t("excursion.sidebar.ctaPoint03")}</p>
                  </li>
                </ul>
              </m.div>
            </m.aside>
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
