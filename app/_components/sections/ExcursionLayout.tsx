"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { motion } from "framer-motion";

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

const BookingForm = dynamic(() => import("@/components/forms/BookingForm"), {
  ssr: false,
  loading: () => <div>Loading booking form...</div>,
});

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

interface ExcursionLayoutProps {
  excursionKey: string;
  bookingId: string | number;
  imageSrc: string;
}

const ExcursionLayout: React.FC<ExcursionLayoutProps> = ({
  excursionKey,
  bookingId,
  imageSrc,
}) => {
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
    "~191 km from Marrakech"
  );
  const durationLabel = t(
    `${excursionKey}.durationLabel`,
    "Full-day excursion"
  );
  const altText = t(`${excursionKey}.alt`);

  return (
    <>
      <header className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,250,252,0.08),transparent_60%)]"
          aria-hidden="true"
        ></div>
        <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-24 text-center lg:flex-row lg:items-center lg:py-28 lg:text-left">
          <div className="flex-1 space-y-6 pt-6 text-center lg:pt-12">
            <span className="block text-4xl font-semibold tracking-[0.2em] text-orange-200 uppercase">
              {t("excursion.detailsTitle")}
            </span>
            <div className="mt-2">
              <p className="mt-1 text-xl text-slate-300">
                Stories, tips, and insights from our adventures
              </p>
            </div>
          </div>
          {/* right column removed — image moved into article for tour-like layout */}
        </div>
      </header>

      <section id="excursion-single" className="py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[4fr_2fr]">
          <article className="rounded-3xl bg-white p-8 shadow-xl shadow-orange-100/50 sm:p-12">
            <figure className="relative mb-8 aspect-4/3 w-full overflow-hidden rounded-2xl">
              <Image
                className="object-cover"
                src={imageSrc}
                alt={`${altText} - Morocco excursion destination`}
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
                <h1 className="text-orange mt-2 text-3xl leading-tight font-extrabold md:text-4xl">
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
                      d="M3 12h18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="text-left">
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
                  <div className="text-left">
                    <div className="text-sm font-semibold text-indigo-600">
                      {durationLabel}
                    </div>
                    <div className="text-xs font-semibold text-amber-300">
                      {t("excursion.common.durationLabel", "Duration")}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {t("excursion.common.highlights")}
                </h2>
                <ul className="mt-4 grid gap-3">
                  {highlights.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="grid grid-cols-[40px_1fr] items-center gap-4"
                    >
                      <div className="flex items-center justify-end">
                        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
                          <CheckIcon />
                        </span>
                      </div>
                      <p className="text-left leading-relaxed">{item}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">
                  {t("excursion.common.overview")}
                </h2>
                <p className="text-base leading-relaxed text-slate-600">
                  {t(`${excursionKey}.overview`)}
                </p>
              </div>
            </div>
          </article>

          <aside className="space-y-6 self-start lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl">
              <div className="p-8">
                <p className="text-center text-xs tracking-[0.45em] text-orange-300 uppercase">
                  {t("excursion.sidebar.title")}
                </p>
                <h3 className="mt-2 text-center text-2xl font-semibold">
                  {t("excursion.sidebar.mainBrand")}
                </h3>
                <span className="mt-1 block text-center text-sm text-orange-200">
                  {t("excursion.sidebar.subBrand")}
                </span>
                <div
                  className="my-4 border-t border-slate-700"
                  aria-hidden="true"
                ></div>
                <p className="mt-2 text-sm text-slate-200">
                  <Trans
                    i18nKey="excursion.sidebar.intro"
                    components={{ strong: <strong className="text-white" /> }}
                  />
                </p>
                <p className="mt-4 text-sm text-slate-200">
                  {t("excursion.sidebar.details")}
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
                  {t("excursion.sidebar.conclusion")}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-slate-900">
                {t("excursion.sidebar.ctaTitle")}
              </h4>
              <p className="mt-2 text-sm text-slate-500">
                {t("excursion.sidebar.ctaDescription")}
              </p>
              <ul className="m-0 mt-4 grid list-none gap-3 p-0 text-sm text-slate-600">
                <li className="grid grid-cols-[40px_1fr] items-center gap-3">
                  <div className="flex items-center justify-end">
                    <span className="size-2 rounded-full bg-orange-500"></span>
                  </div>
                  <p className="">{t("excursion.sidebar.ctaPoint01")}</p>
                </li>
                <li className="grid grid-cols-[40px_1fr] items-center gap-3">
                  <div className="flex items-center justify-end">
                    <span className="size-2 rounded-full bg-orange-500"></span>
                  </div>
                  <p className="">{t("excursion.sidebar.ctaPoint02")}</p>
                </li>
                <li className="grid grid-cols-[40px_1fr] items-center gap-3">
                  <div className="flex items-center justify-end">
                    <span className="size-2 rounded-full bg-orange-500"></span>
                  </div>
                  <p className="">{t("excursion.sidebar.ctaPoint03")}</p>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <BookingForm
        excursionId={String(bookingId)}
        excursionTitle={bookingTitle}
        fullWidth
      />
    </>
  );
};

export default ExcursionLayout;
