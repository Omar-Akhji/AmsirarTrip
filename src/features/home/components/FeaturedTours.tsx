"use client";

import Image from "next/image";
import { m } from "motion/react";
import { useTranslation } from "@/lib/hooks/useTranslation";

const FeaturedTours = () => {
  const { t } = useTranslation();
  const cities = [
    {
      key: "marrakech",
      image: "/images/Home/Marrakech-tourist.webp",
      titleKey: "featured.cards.marrakech.title",
      descriptionKey: "featured.marrakech.description",
      altKey: "featured.cards.marrakech.alt",
    },
    {
      key: "casablanca",
      image: "/images/Home/Casablanca-tourist.webp",
      titleKey: "featured.cards.casablanca.title",
      descriptionKey: "featured.casablanca.description",
      altKey: "featured.cards.casablanca.alt",
    },
    {
      key: "fez",
      image: "/images/Home/Fez-tourist.webp",
      titleKey: "featured.cards.fez.title",
      descriptionKey: "featured.fez.description",
      altKey: "featured.cards.fez.alt",
    },
    {
      key: "dadesValley",
      image: "/images/Home/valley-tourisit.webp",
      titleKey: "featured.cards.dadesValley.title",
      descriptionKey: "featured.dadesValley.description",
      altKey: "featured.cards.dadesValley.alt",
    },
    {
      key: "chefchaouen",
      image: "/images/Home/Chefchaouen-tourist.webp",
      titleKey: "featured.cards.chefchaouen.title",
      descriptionKey: "featured.chefchaouen.description",
      altKey: "featured.cards.chefchaouen.alt",
    },
    {
      key: "rabat",
      image: "/images/Home/Rabat-tourist.webp",
      titleKey: "featured.cards.rabat.title",
      descriptionKey: "featured.rabat.description",
      altKey: "featured.cards.rabat.alt",
    },
  ];

  return (
    <section
      id="featured"
      className="relative isolate overflow-hidden bg-gray-50 py-24 text-gray-900"
      aria-labelledby="featured-heading"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.3),transparent_70%)]"
        aria-hidden="true"
      ></div>
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <p className="inline-flex items-center justify-center rounded-full border border-orange-400 bg-orange-500/10 px-6 py-3 text-sm font-semibold tracking-[0.45em] text-orange-600 uppercase">
            {t("featured.smTitle")}
          </p>
          <h2
            id="featured-heading"
            className="mt-6 text-2xl leading-tight font-extrabold tracking-widest text-gray-900 uppercase sm:text-3xl sm:tracking-[0.15em] md:text-4xl md:tracking-[0.2em]"
          >
            {t("featured.lgTitle")}
          </h2>
        </div>

        <div className="featured-row">
          {cities.map((city, idx) => (
            <m.article
              key={city.key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card-article relative h-75 w-full overflow-hidden rounded-xl"
            >
              <Image
                src={city.image}
                alt={t(city.altKey)}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1090px) 50vw, 33vw"
                className="card-img object-cover"
              />
              <div className="card-data">
                <h3 className="card-title">{t(city.titleKey)}</h3>
                <p className="card-text">{t(city.descriptionKey)}</p>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
