"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import dynamic from "next/dynamic";
import { m, LazyMotion, domAnimation } from "motion/react";
import {
  ArrowIcon,
  PhoneIcon,
  MailIcon,
  LocationIcon,
  WhatsAppIcon,
} from "@/shared/ui/icons";
import { fadeInUp } from "@/lib/constants/animations";
import {
  PageHeader,
  HeaderCTA,
  HeaderSecondaryCTA,
} from "@/shared/layout/PageHeader";

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
      <PageHeader
        title={t("contact.title")}
        subtitle={t("contact.headerSubtitle")}
        smTitle={t("contact.smTitle", "get in touch with us")}
        gradientPosition="top-right"
        bgImage="/images/Header/header-1.webp"
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.contact") },
        ]}
      >
        <HeaderCTA href="#contact-form-section">
          <span>{t("contact.form.cta", "Send message")}</span>
          <ArrowIcon className="size-4" />
        </HeaderCTA>
        <HeaderSecondaryCTA href="https://wa.me/212661173144" external>
          <WhatsAppIcon className="size-4" />
          <span>WhatsApp</span>
        </HeaderSecondaryCTA>
      </PageHeader>
      <LazyMotion features={domAnimation}>
        <section className="relative isolate py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-6 md:grid-cols-3">
              {contactMethods.map((method, index) => (
                <m.article
                  key={index}
                  {...fadeInUp}
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
                </m.article>
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
              <h2 className="mt-6 text-2xl leading-tight font-extrabold tracking-widest text-gray-900 uppercase sm:text-3xl sm:tracking-[0.15em] md:text-4xl md:tracking-[0.2em]">
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
              <h2 className="mt-6 text-2xl leading-tight font-extrabold tracking-widest text-gray-900 uppercase sm:text-3xl sm:tracking-[0.15em] md:text-4xl md:tracking-[0.2em]">
                {t("contact.location.lgTitle")}
              </h2>
            </div>
            <m.div
              {...fadeInUp}
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
            </m.div>
          </div>
        </section>
      </LazyMotion>
    </>
  );
}
