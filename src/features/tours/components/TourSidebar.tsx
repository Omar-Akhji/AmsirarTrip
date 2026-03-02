"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { m } from "motion/react";
import { fadeInUp, slideInUpSmall } from "@/lib/constants/animations";

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

export default function TourSidebar({
  sidebarItems,
}: {
  sidebarItems: string[];
}) {
  const t = useTranslations();

  return (
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
              <m.li
                key={item}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + idx * 0.08 }}
                className="grid grid-cols-[40px_1fr] items-center gap-3"
              >
                <span className="inline-flex size-5 items-center justify-center justify-self-end rounded-full bg-orange-500 text-xs font-semibold text-white">
                  {idx + 1}
                </span>
                <p className="text-sm leading-relaxed">{item}</p>
              </m.li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-200">
            {t("tours.sidebar.conclusion")}
          </p>
        </div>
      </m.div>

      <m.div
        {...slideInUpSmall}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 shadow-sm"
      >
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
      </m.div>
    </m.aside>
  );
}
