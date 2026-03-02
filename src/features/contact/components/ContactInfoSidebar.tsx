import { useTranslation } from "@/lib/hooks/useTranslation";
import { m } from "motion/react";
import { fadeInUp } from "@/lib/constants/animations";

export function ContactInfoSidebar() {
  const { t } = useTranslation();

  return (
    <>
      <m.div {...fadeInUp}>
        <p className="text-xs font-semibold tracking-[0.45em] text-orange-200 uppercase">
          {t("contact.form.infoBadge", "Need details?")}
        </p>
        <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
          {t("contact.form.infoTitle", "Plan handcrafted experiences")}
        </h3>
        <p className="mt-4 text-sm text-slate-200">
          {t(
            "contact.form.infoCopy",
            "Our Marrakech team answers every message personally and can help with custom itineraries, desert camps, or last-minute transfers."
          )}
        </p>
      </m.div>

      <ul className="mt-8 space-y-6 text-sm">
        {(
          [
            {
              id: "visit",
              num: "01",
              label: t("contact.form.info.address", "Visit"),
              content: (
                <p className="mt-1 text-base text-white">
                  Imm. J appt N° 5, Résidence La Perle de l&apos;Atlas, angle
                  Rue aboubakr, Marrakech
                </p>
              ),
            },
            {
              id: "call",
              num: "02",
              label: t("contact.form.info.phone", "Call"),
              content: (
                <>
                  <a
                    className="mt-1 block text-base text-white hover:text-orange-300"
                    href="tel:+21266173144"
                  >
                    +212 (0) 6 61 17 31 44
                  </a>
                  <a
                    className="mt-1 block text-base text-white/80 hover:text-orange-300"
                    href="tel:+212566173144"
                  >
                    +212 (0) 5 6 61 73 14 44
                  </a>
                </>
              ),
            },
            {
              id: "email",
              num: "03",
              label: t("contact.form.info.email", "Email"),
              content: (
                <a
                  className="mt-1 block text-base text-white hover:text-orange-300"
                  href="mailto:amsirare@gmail.com"
                >
                  amsirare@gmail.com
                </a>
              ),
            },
          ] as const
        ).map((item, idx) => (
          <m.li
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="grid grid-cols-[48px_1fr] items-start gap-4"
          >
            <span className="inline-flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/15 text-sm leading-none font-semibold text-orange-300">
              {item.num}
            </span>
            <div className="self-start">
              <p className="text-xs tracking-wide text-slate-300 uppercase">
                {item.label}
              </p>
              {item.content}
            </div>
          </m.li>
        ))}
      </ul>

      <p className="mt-8 text-xs text-slate-400">
        {t(
          "contact.form.infoFooter",
          "Available every day from 09:00 to 21:00 GMT+1"
        )}
      </p>
    </>
  );
}
