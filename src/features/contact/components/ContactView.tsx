"use client";

import React from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ContactFormTailwind = dynamic(
  () => import("@/features/contact/components/ContactFormTailwind"),
  {
    ssr: false,
    loading: () => <div>Loading contact form...</div>,
  }
);

export default function ContactView() {
  const { t } = useTranslation();

  const contactMethods = [
    {
      icon: <PhoneIcon className="size-6" />,
      title: t(
        "contact.card.phoneTitle",
        "Feel free to contact us — we're here to help"
      ),
      description: t(
        "contact.card.phoneSeo",
        "Have a quick question or want to book now? Our local team answers calls and messages promptly — reach out and we'll help plan the perfect Morocco trip."
      ),
    },
    {
      icon: <MailIcon className="size-6" />,
      title: t(
        "contact.card.emailTitle",
        "Send a message — we'll reply with a tailored plan"
      ),
      description: t(
        "contact.card.emailSeo",
        "Prefer to write? Send us your plans, dates and priorities — we'll prepare a personalised itinerary and respond quickly with options and clear next steps."
      ),
    },
    {
      icon: <LocationIcon className="size-6" />,
      title: t(
        "contact.card.visitTitle",
        "Visit our Marrakech office — friendly, local support"
      ),
      description: t(
        "contact.card.visitSeo",
        "Drop by for an in-person chat, help with bookings, or to learn more about our desert excursions and private tours — our team is ready to welcome you."
      ),
    },
  ];

  return (
    <>
      <header className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.35),transparent_65%)]"
          aria-hidden="true"
        ></div>
        <div
          className="absolute inset-0 z-10 bg-linear-to-br from-slate-900/80 via-slate-900/60 to-slate-900 opacity-80"
          aria-hidden="true"
        ></div>
        <div
          className="absolute inset-0 z-10 bg-linear-to-br from-black/60 via-black/20 to-transparent"
          aria-hidden="true"
        ></div>
        <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-24 text-center lg:flex-row lg:items-center lg:py-28 lg:text-left">
          <div className="contact-hero-content flex-1 space-y-6 pt-6 text-center lg:pt-12">
            <p className="text-xs font-semibold tracking-[0.45em] text-orange-200 uppercase">
              {t("contact.smTitle", "get in touch with us")}
            </p>
            <h1 className="text-4xl font-semibold tracking-[0.2em] text-orange-200 uppercase sm:text-5xl">
              {t("contact.title")}
            </h1>
            <p className="text-lg text-slate-200 lg:text-xl">
              {t("contact.headerSubtitle")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
              <a
                href="#contact-form-section"
                className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                <span>{t("contact.form.cta", "Send message")}</span>
                <ArrowIcon className="size-4" />
              </a>
              <a
                href="https://wa.me/212661173144"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="size-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="relative isolate py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {contactMethods.map((method, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                aria-label={
                  typeof method.title === "string" ? method.title : undefined
                }
                className="contact-info-card group rounded-3xl border border-orange-100 bg-white px-6 py-8 shadow-lg shadow-orange-100/70 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition group-hover:bg-orange-600 group-hover:text-white">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {method.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-700">
                  {method.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-form-section" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 pt-16">
          <div className="section-header text-center">
            <p className="inline-flex items-center justify-center rounded-full border border-orange-400 bg-orange-500/10 px-6 py-3 text-sm font-semibold tracking-[0.45em] text-orange-600 uppercase">
              {t("contact.form.badge", "Plan with locals")}
            </p>
            <h2 className="mt-6 text-3xl leading-tight font-extrabold tracking-[0.2em] text-gray-900 uppercase md:text-4xl">
              {t("contact.lgTitle", "contact us")}
            </h2>
          </div>
        </div>
      </section>

      <ContactFormTailwind />

      <section id="location" className="relative bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="title-wrap mb-12 text-center">
            <p className="inline-flex items-center justify-center rounded-full border border-orange-400 bg-orange-500/10 px-6 py-3 text-sm font-semibold tracking-[0.45em] text-orange-600 uppercase">
              {t("contact.location.smTitle")}
            </p>
            <h2 className="mt-6 text-3xl leading-tight font-extrabold tracking-[0.2em] text-gray-900 uppercase md:text-4xl">
              {t("contact.location.lgTitle")}
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="map-container overflow-hidden rounded-3xl shadow-2xl ring-1 ring-slate-200"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.999!2d-8.0257651!3d31.6259758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafef007a3f58d3%3A0xa6485d9ed7022b4c!2sAmsirar+Travel!5e0!3m2!1sen!2sma!4v1699999999999!5m2!1sen!2sma"
              width="100%"
              height="500"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AmsirarTrip Agency Location - Marrakech, Morocco"
              aria-label="Interactive map showing AmsirarTrip agency location in Marrakech"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.12 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2L8.09 9.91a16 16 0 0 0 6 6l1.38-1.38a2 2 0 0 1 2-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}

function LocationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
