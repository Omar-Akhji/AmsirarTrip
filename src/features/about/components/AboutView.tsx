"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CountUp } from "@/shared/ui";
import { m, LazyMotion, domAnimation } from "motion/react";
import {
  PageHeader,
  HeaderCTA,
  HeaderSecondaryCTA,
} from "@/shared/layout/PageHeader";
import {
  slideInLeftLarge,
  slideInRightLarge,
  fadeInUp,
} from "@/lib/constants/animations";

export default function AboutView() {
  const t = useTranslations();
  const factStats = React.useMemo(
    () => [
      {
        id: "photos",
        icon: "/icons/camera-icon.svg",
        value: 12200,
        duration: 14000,
        label: t("about.facts.photos"),
      },
      {
        id: "beaches",
        icon: "/icons/beach-icon.svg",
        value: 4500,
        duration: 14000,
        label: t("about.facts.beaches"),
      },
      {
        id: "mountains",
        icon: "/icons/mountain-icon.svg",
        value: 840,
        duration: 9000,
        label: t("about.facts.mountains"),
      },
      {
        id: "cruises",
        icon: "/icons/travel-icon.svg",
        value: 1200,
        duration: 10000,
        label: t("about.facts.cruises"),
      },
    ],
    [t]
  );

  return (
    <>
      <PageHeader
        title={t("about.title")}
        subtitle={t("about.headerSubtitle")}
        headingId="about-page-title"
        bgImage="/images/Header/header-1.webp"
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.about") },
        ]}
      >
        <HeaderCTA href="#about">
          <span>{t("about.ourStory")}</span>
          <span className="sr-only">{t("about.ourStory")}</span>
        </HeaderCTA>
        <HeaderSecondaryCTA href="#facts">
          {t("about.facts.smTitle")}
        </HeaderSecondaryCTA>
      </PageHeader>

      <main>
        <LazyMotion features={domAnimation}>
          <section
            id="about"
            className="relative isolate overflow-hidden bg-gray-50 py-24 text-gray-900"
            aria-labelledby="our-story-heading"
          >
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.3),transparent_70%)]"
              aria-hidden="true"
            ></div>
            <div className="relative z-10 mx-auto max-w-7xl px-4">
              <div className="mx-auto mb-16 max-w-4xl text-center">
                <p className="inline-flex items-center justify-center rounded-full border border-orange-400 bg-orange-500/10 px-6 py-3 text-sm font-semibold tracking-[0.45em] text-orange-600 uppercase">
                  {t("about.smTitle")}
                </p>
                <h2
                  id="our-story-heading"
                  className="mt-6 text-2xl leading-tight font-extrabold tracking-widest text-gray-900 uppercase sm:text-3xl sm:tracking-[0.15em] md:text-4xl md:tracking-[0.2em]"
                >
                  {t("about.ourStory")}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600">
                  {t("about.headerSubtitle")}
                </p>
              </div>

              <div className="grid items-center gap-12 lg:grid-cols-2">
                <m.div {...slideInLeftLarge} className="order-2 lg:order-1">
                  <article
                    className="space-y-8"
                    aria-labelledby="experience-heading"
                  >
                    <div className="space-y-6">
                      <p className="text-sm leading-relaxed text-gray-700">
                        {t("about.experienceText1")}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-700">
                        {t("about.experienceText2")}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-700">
                        {t("about.experienceText3")}
                      </p>
                    </div>

                    <div className="border-t border-slate-700 pt-8">
                      <h3 className="mb-6 text-xl font-bold text-orange-600">
                        {t("about.whyTrustTitle")}
                      </h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                            1
                          </div>
                          <p className="flex-1 text-sm leading-relaxed text-gray-700">
                            {t("about.whyTrust.point1")}
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                            2
                          </div>
                          <p className="flex-1 text-sm leading-relaxed text-gray-700">
                            {t("about.whyTrust.point2")}
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                            3
                          </div>
                          <p className="flex-1 text-sm leading-relaxed text-gray-700">
                            {t("about.whyTrust.point3")}
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                            4
                          </div>
                          <p className="flex-1 text-sm leading-relaxed text-gray-700">
                            {t("about.whyTrust.point4")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <blockquote className="border-l-4 border-orange-400 pl-6 text-gray-600 italic">
                      <p className="text-sm">{t("about.conclusionText")}</p>
                    </blockquote>
                  </article>
                </m.div>

                <m.div {...slideInRightLarge} className="order-1 lg:order-2">
                  <figure className="relative">
                    <div className="absolute inset-0 rotate-3 transform rounded-3xl bg-linear-to-br from-orange-500/20 to-amber-500/20"></div>
                    <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-white shadow-2xl">
                      <Image
                        src="/images/about-img.webp"
                        alt="Amsirar landscape showcasing traditional Moroccan architecture and culture"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-gray-900/40 to-transparent p-6">
                        <p className="text-sm font-medium text-gray-100">
                          {t("about.imageCaption") ||
                            "Discover Morocco with Amsirar"}
                        </p>
                      </div>
                    </div>
                  </figure>
                </m.div>
              </div>
            </div>
          </section>

          <section
            id="facts"
            className="fun-facts-bg relative isolate overflow-hidden py-16 text-white"
            aria-labelledby="facts-heading"
          >
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,250,252,0.06),transparent_60%)]"
              aria-hidden="true"
            ></div>
            <div
              className="absolute inset-0 bg-black/40"
              aria-hidden="true"
            ></div>

            <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
              <div className="mx-auto max-w-3xl text-center">
                <p className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-sm font-semibold tracking-[0.45em] text-orange-200 uppercase">
                  {t("about.facts.smTitle")}
                </p>
                <h2
                  id="facts-heading"
                  className="mt-4 text-2xl leading-tight font-bold tracking-widest text-white uppercase sm:text-3xl sm:tracking-[0.15em] md:text-4xl md:tracking-[0.2em]"
                >
                  {t("about.facts.lgTitle")}
                </h2>
              </div>

              <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {factStats.map((fact, idx) => (
                  <m.li
                    key={fact.id}
                    {...fadeInUp}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <article
                      aria-labelledby={`fact-${fact.id}-label`}
                      className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 px-8 py-10 text-center shadow-[0_25px_60px_rgba(15,23,42,0.55)] backdrop-blur"
                    >
                      <div
                        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden="true"
                      >
                        <div className="absolute inset-0 bg-linear-to-br from-orange-500/20 via-amber-400/10 to-transparent"></div>
                      </div>
                      <div className="relative flex flex-col items-center space-y-6">
                        <figure className="inline-flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-transparent p-3 text-orange-50 shadow-lg ring-2 shadow-orange-600/25 ring-white/10">
                          <Image
                            src={fact.icon}
                            alt=""
                            width={96}
                            height={96}
                            className="block h-full w-full object-contain"
                            aria-hidden="true"
                          />
                        </figure>
                        <div
                          className="text-4xl font-bold text-amber-200"
                          aria-hidden="true"
                        >
                          <CountUp
                            end={fact.value}
                            duration={fact.duration}
                            className="inline-block"
                          />
                        </div>
                        <h3
                          id={`fact-${fact.id}-label`}
                          className="text-sm text-orange-100"
                        >
                          {fact.label}
                        </h3>
                      </div>
                    </article>
                  </m.li>
                ))}
              </ul>
            </div>
          </section>
        </LazyMotion>
      </main>
    </>
  );
}
