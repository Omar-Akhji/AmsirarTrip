import { Check } from "lucide-react";
import { AnimateOnScroll } from "@/shared/ui";
import { useTranslations } from "next-intl";

interface ExcursionInfoProps {
  highlights: string[];
  overview: string;
}

export default function ExcursionInfo({
  highlights,
  overview,
}: ExcursionInfoProps) {
  const t = useTranslations("excursion");

  return (
    <>
      <AnimateOnScroll animation="fade-up" delay={300}>
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl md:text-3xl">
            {t("common.highlights")}
          </h2>
          <ul className="mbs-4 grid gap-3">
            {highlights.map((item) => (
              <li
                key={item}
                className="grid grid-cols-[40px_1fr] items-center gap-4"
              >
                <span className="inline-flex shrink-0 items-center justify-center justify-self-end rounded-full bg-orange-500 text-white block-8 inline-8">
                  <Check className="size-4" />
                </span>
                <p className="text-start text-sm leading-relaxed sm:text-base">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={450}>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 sm:text-2xl md:text-3xl">
            {t("common.overview")}
          </h2>
          <p className="text-sm leading-relaxed whitespace-pre-line text-zinc-600 sm:text-base">
            {overview}
          </p>
        </div>
      </AnimateOnScroll>
    </>
  );
}
