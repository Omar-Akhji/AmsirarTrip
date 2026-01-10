"use client";

import Image from "next/image";
import { m } from "motion/react";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight } from "@/lib/fontawesome";

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const testimonials = [{ key: "kevin" }, { key: "ben" }, { key: "sara" }];

  return (
    <section id="testimonials" className="bg-slate-50 py-12">
      <div className="container">
        <div className="mx-auto mb-8 max-w-4xl text-center">
          <p className="inline-flex items-center justify-center rounded-full border border-orange-400 bg-orange-500/10 px-6 py-3 text-sm font-semibold tracking-[0.45em] text-orange-600 uppercase">
            {t("testimonials.smTitle")}
          </p>
          <h2 className="mt-6 text-2xl leading-tight font-extrabold tracking-widest text-gray-900 uppercase sm:text-3xl sm:tracking-[0.15em] md:text-4xl md:tracking-[0.2em]">
            {t("testimonials.lgTitle")}
          </h2>
        </div>
        <div className="relative">
          <div>
            <div className="relative">
              {/* mobile: 1 column; tablet/md: 2 columns (3rd spans both); desktop/lg: 3 columns */}
              <div className="grid grid-cols-1 justify-items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((tst, idx) => (
                  <m.article
                    key={tst.key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className={`relative flex h-full w-full transform flex-col justify-between overflow-hidden rounded-2xl bg-slate-900 p-6 text-left text-orange-200 shadow-lg ring-1 ring-white/10 transition-transform hover:-translate-y-1 hover:shadow-xl ${
                      idx === 2 ? "md:col-span-2 lg:col-span-1" : ""
                    }`}
                  >
                    {/* Decorative Quote Icon */}
                    <div
                      className="absolute top-2 right-4 -rotate-12 opacity-10 select-none"
                      aria-hidden="true"
                    >
                      <FontAwesomeIcon
                        icon={faQuoteRight}
                        className="text-white"
                        style={{ width: "5rem", height: "5rem" }}
                      />
                    </div>
                    <div className="mb-4 flex items-center gap-4 self-start">
                      <div className="mr-auto inline-flex size-25 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                        <Image
                          src="/icons/face-img.svg"
                          alt="User Avatar"
                          width={60}
                          height={60}
                          className="size-15 object-contain"
                        />
                      </div>
                      <div className="mx-2 h-8 w-px bg-white/10" aria-hidden />
                      <div>
                        <cite className="text-sm font-semibold text-white not-italic">
                          {t(`testimonials.items.${tst.key}.name`)}
                        </cite>
                        <p className="mt-0.5 text-xs text-slate-300">
                          {t(`testimonials.items.${tst.key}.country`)}
                        </p>
                      </div>
                    </div>
                    {/* small horizontal divider to separate header (avatar/name) from quote */}
                    <div className="my-3 h-px w-full bg-white/10" aria-hidden />
                    <div className="h-full">
                      <blockquote className="mb-4 text-sm leading-snug text-slate-300 italic sm:text-sm">
                        {t(`testimonials.items.${tst.key}.quote`)}
                      </blockquote>
                    </div>

                    <div
                      className="mt-4 flex items-center justify-start text-orange-400"
                      aria-hidden
                    >
                      {Array.from({ length: 5 }).map((_, k) => (
                        <svg
                          key={k}
                          width={14}
                          height={14}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="mx-0.5"
                          aria-hidden
                        >
                          <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </m.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
