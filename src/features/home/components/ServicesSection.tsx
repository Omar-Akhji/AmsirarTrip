"use client";

import Image from "next/image";
import { m } from "motion/react";
import { useTranslation } from "@/lib/hooks/useTranslation";

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
    <m.section
      id="services"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
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
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="inline-flex items-center justify-center rounded-full border-2 border-orange-100 px-6 py-3 text-sm font-semibold tracking-[0.45em] text-white uppercase sm:tracking-[0.3em]">
              {t("services.smTitle")}
            </p>
            <h2
              id="services-heading"
              className="mt-4 text-2xl leading-tight font-bold tracking-widest text-white uppercase sm:text-3xl sm:tracking-[0.15em] md:text-4xl md:tracking-[0.2em]"
            >
              {t("services.lgTitle")}
            </h2>
            <div
              className="mx-auto mt-4 h-1 w-20 rounded-full bg-orange-200"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mt-12 grid justify-items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <m.article
              key={service.key}
              initial={{ opacity: 0, y: 80, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`group relative flex flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10 hover:shadow-md ${
                idx === 2 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="mb-6 inline-flex size-25 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
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
              <p className="mt-3 text-sm text-white">
                {t(`services.cards.${service.key}.text`)}
              </p>
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition group-hover:border-orange-200/60"
                aria-hidden
              />
            </m.article>
          ))}
        </div>
      </div>
    </m.section>
  );
};

export default ServicesSection;
