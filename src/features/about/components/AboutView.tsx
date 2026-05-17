import Image from "next/image";
import { useTranslations } from "next-intl";
import { HeaderCTA, HeaderSecondaryCTA, PageHeader } from "@/shared/layout/PageHeader";
import { AnimateOnScroll, CountUp } from "@/shared/ui";

export default function AboutView() {
  const t = useTranslations();
  // React Compiler handles memoization automatically
  const factStats = [
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
  ];

  return (
    <>
      <PageHeader
        title={t("about.title")}
        subtitle={t("about.headerSubtitle")}
        headingId="about-page-title"
        bgImage="/images/Header/header-1.webp"
        breadcrumbs={[{ label: t("nav.home"), href: "/" }, { label: t("nav.about") }]}
      >
        <HeaderCTA href="#about">
          <span>{t("about.ourStory")}</span>
          <span className="sr-only">{t("about.ourStory")}</span>
        </HeaderCTA>
        <HeaderSecondaryCTA href="#facts">{t("about.facts.smTitle")}</HeaderSecondaryCTA>
      </PageHeader>

      <main>
        <section
          id="about"
          className="relative isolate overflow-hidden bg-neutral-50 py-24 text-neutral-900"
          aria-labelledby="our-story-heading"
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.3),transparent_70%)]"
            aria-hidden="true"
          ></div>
          <div className="relative z-10 mx-auto px-4 max-inline-7xl">
            <div className="mx-auto mbe-16 text-center max-inline-4xl">
              <p className="inline-flex items-center justify-center rounded-full border-2 border-orange-400 px-6 py-3 text-sm font-semibold tracking-[0.45em] text-orange-600 uppercase">
                {t("about.smTitle")}
              </p>
              <h2
                id="our-story-heading"
                className="mbs-6 text-2xl leading-tight font-semibold tracking-widest text-neutral-900 uppercase sm:text-3xl sm:tracking-[0.15em] md:text-4xl md:tracking-[0.2em]"
              >
                {t("about.ourStory")}
              </h2>
            </div>

            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <AnimateOnScroll animation="fade-up">
                  <article className="space-y-8">
                    <div className="space-y-6">
                      <p className="text-sm leading-relaxed text-neutral-700">
                        {t("about.experienceText1")}
                      </p>
                      <p className="text-sm leading-relaxed text-neutral-700">
                        {t("about.experienceText2")}
                      </p>
                      <p className="text-sm leading-relaxed text-neutral-700">
                        {t("about.experienceText3")}
                      </p>
                    </div>

                    <div className="border-t border-zinc-700 pbs-8">
                      <h3 className="mbe-6 text-xl font-semibold text-orange-600">
                        {t("about.whyTrustTitle")}
                      </h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {[1, 2, 3, 4].map((num) => (
                          <div
                            key={num}
                            className="flex items-start gap-3"
                          >
                            <div className="flex shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white block-8 inline-8">
                              {num}
                            </div>
                            <p className="flex-1 text-sm leading-relaxed text-neutral-700">
                              {t(`about.whyTrust.point${num}`)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <blockquote className="relative overflow-hidden rounded-r-2xl bg-linear-to-r from-orange-50 to-transparent py-4 ps-8 text-neutral-600 italic ring-1 ring-orange-200/50 ring-inset">
                      <div
                        className="absolute start-0 top-0 bottom-0 w-1.5 bg-orange-400 block-full"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-relaxed">{t("about.conclusionText")}</p>
                    </blockquote>
                  </article>
                </AnimateOnScroll>
              </div>

              <div className="order-1 lg:order-2">
                <AnimateOnScroll
                  animation="zoom-in"
                  delay={200}
                >
                  <figure className="relative">
                    <div className="absolute inset-0 rotate-3 transform rounded-3xl bg-linear-to-br from-orange-500/20 to-amber-500/20"></div>
                    <div className="mask-linear-to-b relative aspect-4/3 overflow-hidden rounded-3xl bg-white from-black via-black to-transparent shadow-2xl">
                      <Image
                        src="/images/about-img.webp"
                        alt="Amsirar landscape showcasing traditional Moroccan architecture and culture"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute start-0 end-0 bottom-0 bg-linear-to-t from-neutral-900/60 to-transparent p-6">
                        <p className="text-sm font-medium text-neutral-100">
                          {t("about.imageCaption") || "Discover Morocco with Amsirar"}
                        </p>
                      </div>
                    </div>
                  </figure>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </section>

        <section
          id="facts"
          className="relative isolate overflow-hidden py-16"
          aria-labelledby="facts-heading"
        >
          <div className="relative z-10 mx-auto px-4 inline-full max-inline-6xl">
            <div className="mx-auto text-center max-inline-3xl">
              <p className="inline-flex items-center justify-center rounded-full border-2 border-white bg-orange-600 px-6 py-3 text-sm font-semibold tracking-[0.45em] text-white uppercase sm:tracking-[0.3em]">
                {t("about.facts.smTitle")}
              </p>
              <h2
                id="facts-heading"
                className="mbs-4 text-2xl leading-tight font-semibold tracking-widest text-zinc-900 uppercase text-shadow-md sm:text-3xl sm:tracking-[0.15em] md:text-4xl md:tracking-[0.2em]"
              >
                {t("about.facts.lgTitle")}
              </h2>
              <div
                className="mx-auto mbs-4 rounded-full bg-orange-500 block-1 inline-20"
                aria-hidden="true"
              />
            </div>

            <div className="mbs-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {factStats.map((fact, idx) => (
                <AnimateOnScroll
                  key={fact.id}
                  animation="fade-up"
                  delay={idx * 150}
                  className="flex block-full inline-full"
                >
                  <article
                    aria-labelledby={`fact-${fact.id}-label`}
                    className="group relative flex transform flex-col justify-between overflow-hidden rounded-2xl bg-zinc-900 px-8 py-10 text-center text-orange-200 shadow-xl ring-1 ring-white/10 transition-transform block-full inline-full pointer-fine:hover:-translate-y-1 pointer-fine:hover:shadow-2xl"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 via-amber-400/5 to-transparent"></div>
                    </div>
                    <div className="relative flex flex-col items-center gap-y-6">
                      <figure className="inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-white/5 p-3 text-orange-50 shadow-lg ring-2 shadow-orange-600/25 ring-white/10 block-24 inline-24">
                        <Image
                          src={fact.icon}
                          alt=""
                          width={96}
                          height={96}
                          className="block object-contain brightness-0 invert block-full inline-full"
                          aria-hidden="true"
                        />
                      </figure>
                      <div
                        className="text-4xl font-bold text-orange-200 text-shadow-md"
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
                        className="text-sm font-medium tracking-wide text-white/80 uppercase"
                      >
                        {fact.label}
                      </h3>
                    </div>
                  </article>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
