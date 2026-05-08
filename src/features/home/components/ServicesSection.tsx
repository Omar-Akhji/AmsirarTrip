"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { AnimateOnScroll } from "@/shared/ui";

const ServicesSection = () => {
  const { t } = useTranslation();

  const services = [
    {
      key: "handcrafted",
      icon: "/icons/globus-icon.svg",
      altKey: "services.cards.handcrafted.alt",
    },
    {
      key: "guide",
      icon: "/icons/map-icon.svg",
      altKey: "services.cards.guide.alt",
    },
    {
      key: "price",
      icon: "/icons/dollar-icon.svg",
      altKey: "services.cards.price.alt",
    },
  ];

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden py-20 text-orange-200 sm:py-24"
      aria-labelledby="services-heading"
    >
      {/* Optimized Background Image */}
      <Image
        src="/images/services-bg.webp"
        alt=""
        fill
        className="-z-20 object-cover"
        sizes="100vw"
        quality={85}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/40" aria-hidden="true" />
      <div className="relative mx-auto px-4 max-inline-6xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10">
          <AnimateOnScroll animation="fade-up">
            <div className="mx-auto space-y-4 text-center max-inline-3xl">
              <p className="inline-flex items-center justify-center rounded-full border-2 border-orange-100 px-6 py-3 text-sm font-semibold tracking-[0.45em] text-white uppercase sm:tracking-[0.3em]">
                {t("services.smTitle")}
              </p>
              <h2
                id="services-heading"
                className="mbs-4 text-2xl leading-tight font-semibold tracking-widest text-white uppercase text-shadow-md sm:text-3xl sm:tracking-[0.15em] md:text-4xl md:tracking-[0.2em]"
              >
                {t("services.lgTitle")}
              </h2>
              <div
                className="mx-auto mbs-4 rounded-full bg-orange-200 block-1 inline-20"
                aria-hidden="true"
              />
            </div>
          </AnimateOnScroll>
        </div>

        <div className="mbs-12 grid justify-items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <AnimateOnScroll
              key={service.key}
              animation="fade-up"
              delay={idx * 150}
              className={`flex block-full inline-full ${idx === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <article className="group relative flex inline-full flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-xs ring-1 ring-black/5 backdrop-blur-sm transition pointer-fine:hover:-translate-y-1 pointer-fine:hover:bg-white/10 pointer-fine:hover:shadow-md">
                <div className="mbe-6 inline-flex size-25 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <Image
                    src={service.icon}
                    alt={t(service.altKey)}
                    width={60}
                    height={60}
                    className="size-15"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {t(`services.cards.${service.key}.title`)}
                </h3>
                <p className="mbs-3 text-sm text-white">
                  {t(`services.cards.${service.key}.text`)}
                </p>
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition group-hover:border-orange-200/60"
                  aria-hidden
                />
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
