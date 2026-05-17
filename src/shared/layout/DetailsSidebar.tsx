import React from "react";
import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/shared/ui";

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

interface DetailsSidebarProps {
  sidebarItems: string[];
  translationPrefix: "tours" | "excursion";
}

export function DetailsSidebar({ sidebarItems, translationPrefix }: DetailsSidebarProps) {
  const t = useTranslations();

  return (
    <aside className="space-y-6 self-start lg:sticky lg:top-24">
      <AnimateOnScroll
        animation="fade-left"
        delay={150}
        className="inline-full"
      >
        <div className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl">
          <div className="p-8">
            <p className="text-center text-xs tracking-[0.45em] text-orange-300 uppercase">
              {t(`${translationPrefix}.sidebar.title`)}
            </p>
            <h3 className="mbs-2 text-center text-2xl font-semibold">
              {t(`${translationPrefix}.sidebar.mainBrand`)}
            </h3>
            <div
              className="my-4 border-t border-slate-700"
              aria-hidden="true"
            />
            <p className="mbs-2 text-sm text-slate-200">
              <Trans
                i18nKey={`${translationPrefix}.sidebar.intro`}
                components={{ strong: <strong className="text-white" /> }}
              />
            </p>
            <p className="mbs-4 text-sm text-slate-200">
              {t(`${translationPrefix}.sidebar.details`)}
            </p>
            <ul className="mbs-4 grid gap-3 text-sm text-slate-100">
              {sidebarItems.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[40px_1fr] items-center gap-3"
                >
                  <span className="inline-flex items-center justify-center justify-self-end rounded-full bg-orange-500 text-xs font-semibold text-white block-5 inline-5">
                    {sidebarItems.indexOf(item) + 1}
                  </span>
                  <p className="text-sm leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
            <p className="mbs-4 text-sm text-slate-200">
              {t(`${translationPrefix}.sidebar.conclusion`)}
            </p>
          </div>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll
        animation="fade-left"
        delay={300}
        className="inline-full"
      >
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 shadow-xs">
          <h4 className="text-lg font-semibold text-slate-900">
            {t(`${translationPrefix}.sidebar.ctaTitle`)}
          </h4>
          <p className="mbs-2 text-sm text-slate-500">
            {t(`${translationPrefix}.sidebar.ctaDescription`)}
          </p>
          <ul className="m-0 mbs-4 grid list-none gap-3 p-0 text-sm text-slate-600">
            <li className="grid grid-cols-[40px_1fr] items-center gap-3">
              <span className="justify-self-end rounded-full bg-orange-500 block-2 inline-2"></span>
              <p className="">{t(`${translationPrefix}.sidebar.ctaPoint01`)}</p>
            </li>
            <li className="grid grid-cols-[40px_1fr] items-center gap-3">
              <span className="justify-self-end rounded-full bg-orange-500 block-2 inline-2"></span>
              <p className="">{t(`${translationPrefix}.sidebar.ctaPoint02`)}</p>
            </li>
            <li className="grid grid-cols-[40px_1fr] items-center gap-3">
              <span className="justify-self-end rounded-full bg-orange-500 block-2 inline-2"></span>
              <p className="">{t(`${translationPrefix}.sidebar.ctaPoint03`)}</p>
            </li>
          </ul>
        </div>
      </AnimateOnScroll>
    </aside>
  );
}
