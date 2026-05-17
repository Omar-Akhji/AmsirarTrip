"use client";

import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Clock,
  CreditCard,
  Flag,
  HelpCircle,
  MapPin,
} from "lucide-react";
import { AnimateOnScroll } from "@/shared/ui";
import type { TourSeoContent } from "../data/toursMetadata";

interface TourQuickFactsProps {
  duration: number | undefined;
  durationLabel: string;
  daysLabel: string;
  startLabel: string;
  startCity: string;
  endLabel: string;
  endCity: string;
  priceLabel: string;
  price: TourSeoContent["price"];
}

interface TourSeoSectionLabels {
  highlightsTitle: string;
  pricingTitle: string;
  priceLabel: string;
  faqTitle: string;
  reserveNow: string;
}

export function TourQuickFacts({
  duration,
  durationLabel,
  daysLabel,
  startLabel,
  startCity,
  endLabel,
  endCity,
  priceLabel,
  price,
}: TourQuickFactsProps) {
  const facts = [
    {
      id: "duration",
      icon: Clock,
      value: `${duration || 3} ${daysLabel}`,
      label: durationLabel,
      className: "border-orange-100 bg-orange-50 text-orange-600",
      iconClassName: "text-orange-500",
    },
    {
      id: "start",
      icon: MapPin,
      value: startCity,
      label: startLabel,
      className: "border-amber-100 bg-amber-50 text-amber-600",
      iconClassName: "text-amber-500",
    },
    {
      id: "end",
      icon: Flag,
      value: endCity,
      label: endLabel,
      className: "border-emerald-100 bg-emerald-50 text-emerald-700",
      iconClassName: "text-emerald-600",
    },
    {
      id: "price",
      icon: CreditCard,
      value: price.label,
      label: priceLabel,
      className: "border-sky-100 bg-sky-50 text-sky-700",
      iconClassName: "text-sky-600",
    },
  ];

  return (
    <AnimateOnScroll
      animation="fade-up"
      delay={150}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {facts.map((fact) => {
          const Icon = fact.icon;

          return (
            <div
              key={fact.id}
              className={`inline-flex items-center gap-3 rounded-2xl border px-5 py-3 min-block-20 ${fact.className}`}
            >
              <Icon
                className={`size-5 shrink-0 ${fact.iconClassName}`}
                aria-hidden
              />
              <div className="text-start">
                <div className="text-sm font-semibold">{fact.value}</div>
                <div className="text-xs font-semibold">{fact.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AnimateOnScroll>
  );
}

export function TourHighlights({ seo, title }: { seo: TourSeoContent; title: string }) {
  return (
    <AnimateOnScroll
      animation="fade-up"
      delay={225}
    >
      <section aria-labelledby="tour-highlights-title">
        <h2
          id="tour-highlights-title"
          className="mbe-4 text-xl font-semibold text-zinc-900 sm:text-2xl md:text-3xl"
        >
          {title}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {seo.highlights.map((highlight) => (
            <div
              key={highlight}
              className="flex items-start gap-3 rounded-2xl border border-orange-100 bg-white p-4 shadow-xs"
            >
              <BadgeCheck
                className="mbs-0.5 size-5 shrink-0 text-orange-500"
                aria-hidden
              />
              <p className="text-sm leading-relaxed text-neutral-700 sm:text-base">{highlight}</p>
            </div>
          ))}
        </div>
      </section>
    </AnimateOnScroll>
  );
}

export function TourPricing({
  seo,
  labels,
}: {
  seo: TourSeoContent;
  labels: Pick<TourSeoSectionLabels, "pricingTitle" | "reserveNow">;
}) {
  return (
    <AnimateOnScroll
      animation="fade-up"
      delay={375}
    >
      <section
        aria-labelledby="tour-pricing-title"
        className="rounded-2xl border border-orange-100 bg-linear-to-br from-orange-50 to-amber-50 p-5 sm:p-6"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              id="tour-pricing-title"
              className="text-xl font-semibold text-zinc-900 sm:text-2xl"
            >
              {labels.pricingTitle}
            </h2>
            <p className="mbs-2 text-2xl font-semibold text-orange-600">{seo.price.label}</p>
            <p className="text-sm leading-relaxed text-neutral-700 max-inline-2xl sm:text-base">
              {seo.price.note}
            </p>
          </div>
          <a
            href="#booking"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition min-inline-40 pointer-fine:hover:-translate-y-0.5 pointer-fine:hover:bg-orange-700"
          >
            {labels.reserveNow}
            <ArrowRight
              className="size-4"
              aria-hidden
            />
          </a>
        </div>
      </section>
    </AnimateOnScroll>
  );
}

export function TourFaqs({ seo, title }: { seo: TourSeoContent; title: string }) {
  return (
    <AnimateOnScroll animation="fade-up">
      <section aria-labelledby="tour-faq-title">
        <h2
          id="tour-faq-title"
          className="mbe-4 text-xl font-semibold text-zinc-900 sm:text-2xl md:text-3xl"
        >
          {title}
        </h2>
        <div className="space-y-3">
          {seo.faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs open:border-orange-200 open:bg-orange-50/40"
            >
              <summary className="flex cursor-pointer list-none items-start gap-3 text-start text-base font-semibold text-zinc-900 marker:hidden">
                <HelpCircle
                  className="mbs-0.5 size-5 shrink-0 text-orange-500"
                  aria-hidden
                />
                <span className="flex-1">{faq.question}</span>
                <ChevronDown
                  className="size-5 shrink-0 text-zinc-300 transition group-open:rotate-180 group-open:text-orange-500"
                  aria-hidden
                />
              </summary>
              <p className="mbs-3 ps-8 text-sm leading-relaxed text-neutral-700 sm:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </AnimateOnScroll>
  );
}
