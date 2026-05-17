import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AnimateOnScroll } from "@/shared/ui";

const FeaturedTours = async () => {
  const t = await getTranslations();
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
      className="relative isolate overflow-hidden bg-neutral-50 py-24 text-neutral-900"
      aria-labelledby="featured-heading"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.3),transparent_70%)]"
        aria-hidden="true"
      ></div>
      <div className="relative z-10 mx-auto px-4 max-inline-7xl">
        <div className="mx-auto mbe-16 space-y-4 text-center max-inline-4xl">
          <p className="inline-flex items-center justify-center rounded-full border-2 border-orange-400 px-6 py-3 text-sm font-semibold tracking-[0.45em] text-orange-600 uppercase">
            {t("featured.smTitle")}
          </p>
          <h2
            id="featured-heading"
            className="mt-6 text-2xl leading-tight font-semibold tracking-widest text-neutral-900 uppercase text-shadow-md sm:text-3xl sm:tracking-[0.15em] md:text-4xl md:tracking-[0.2em]"
          >
            {t("featured.lgTitle")}
          </h2>
          <div
            className="mx-auto mbs-4 rounded-full bg-orange-500 block-1 inline-20"
            aria-hidden="true"
          />
        </div>

        <div className="featured-row grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {cities.map((city, index) => (
            <AnimateOnScroll
              key={city.key}
              animation="fade-up"
              delay={index * 150} // Staggered entry animation across cards
              className="block-[18.75rem] inline-full"
            >
              <article className="card-article relative block overflow-hidden rounded-xl block-full inline-full">
                <Image
                  src={city.image}
                  alt={t(city.altKey)}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1090px) 50vw, 33vw"
                  className="card-img object-cover"
                />
                <div className="card-data">
                  <h3 className="card-title text-shadow-md">{t(city.titleKey)}</h3>
                  <p className="card-text">{t(city.descriptionKey)}</p>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
