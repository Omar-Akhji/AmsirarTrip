"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { Quote } from "lucide-react";
import { AnimateOnScroll } from "@/shared/ui";

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const testimonials = [{ key: "kevin" }, { key: "ben" }, { key: "sara" }];

  return (
    <section id="testimonials" className="bg-slate-50 py-12">
      <div className="mx-auto px-4 max-inline-330">
        <AnimateOnScroll animation="fade-up">
          <div className="mx-auto mbe-10 space-y-4 text-center max-inline-4xl">
            <p className="inline-flex items-center justify-center rounded-full border-2 border-orange-400 px-6 py-3 text-sm font-semibold tracking-[0.45em] text-orange-600 uppercase">
              {t("testimonials.smTitle")}
            </p>
            <h2 className="mbs-6 text-2xl leading-tight font-extrabold tracking-widest text-gray-900 uppercase text-shadow-md sm:text-3xl sm:tracking-[0.15em] md:text-4xl md:tracking-[0.2em]">
              {t("testimonials.lgTitle")}
            </h2>
            <div
              className="mx-auto mbs-4 rounded-full bg-orange-500 block-1 inline-20"
              aria-hidden="true"
            />
          </div>
        </AnimateOnScroll>
        <div className="relative">
          <div className="relative">
            {/* mobile: 1 column; tablet/md: 2 columns (3rd spans both); desktop/lg: 3 columns */}
            <div className="grid grid-cols-1 justify-items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((tst, idx) => (
                <AnimateOnScroll
                  key={tst.key}
                  animation="fade-up"
                  delay={idx * 150}
                  className={`flex block-full inline-full ${idx === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}
                >
                  <article className="relative flex inline-full transform flex-col justify-between overflow-hidden rounded-2xl bg-slate-900 p-6 text-start text-orange-200 shadow-lg ring-1 ring-white/10 transition-transform block-full inline-full pointer-fine:hover:-translate-y-1 pointer-fine:hover:shadow-xl">
                    {/* Decorative Quote Icon */}
                    <div
                      className="absolute inset-e-4 top-2 -rotate-12 opacity-10 select-none"
                      aria-hidden="true"
                    >
                      <Quote
                        className="text-white"
                        style={{ width: "5rem", height: "5rem" }}
                      />
                    </div>
                    <div className="mbe-4 flex items-center gap-4 self-start">
                      <div className="inline-flex items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 block-25 inline-25">
                        <Image
                          src="/icons/face-img.svg"
                          alt="User Avatar"
                          width={60}
                          height={60}
                          className="object-contain block-15 inline-15"
                        />
                      </div>
                      <div
                        className="mx-2 bg-white/10 block-8 inline-px"
                        aria-hidden
                      />
                      <div>
                        <cite className="text-sm font-semibold text-white not-italic">
                          {t(`testimonials.items.${tst.key}.name`)}
                        </cite>
                        <p className="mbs-0.5 text-xs text-slate-300">
                          {t(`testimonials.items.${tst.key}.country`)}
                        </p>
                      </div>
                    </div>
                    {/* small horizontal divider to separate header (avatar/name) from quote */}
                    <div
                      className="my-3 bg-white/10 block-px inline-full"
                      aria-hidden
                    />
                    <div className="block-full">
                      <blockquote className="mbe-4 text-sm leading-snug text-slate-300 italic sm:text-sm">
                        {t(`testimonials.items.${tst.key}.quote`)}
                      </blockquote>
                    </div>

                    <div
                      className="mbs-4 flex items-center justify-start text-orange-400"
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
                  </article>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
