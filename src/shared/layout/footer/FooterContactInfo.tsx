"use client";

import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { useTranslation } from "@/lib/hooks/useTranslation";

export function FooterContactInfo() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 lg:col-span-1">
      <h3 className="mbe-2 text-sm font-semibold tracking-wider text-white uppercase">
        {t("footer.office")}
      </h3>
      <span className="mbe-6 block rounded bg-orange block-1 inline-12" />
      <address className="not-italic">
        <ul className="space-y-4">
          <li className="group grid grid-cols-[36px_1fr] items-start gap-x-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-orange transition-colors duration-300 group-hover:bg-orange/10">
              <MapPin
                className="size-4"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-sm leading-relaxed text-zinc-400 max-inline-67.5">
              Imm. J appt N° 5, Résidence La Perle de l&apos;Atlas, angle Rue aboubakr, Marrakech
            </p>
          </li>

          <li className="group grid grid-cols-[36px_1fr] items-center gap-x-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-orange transition-colors duration-300 group-hover:bg-orange/10">
              <Mail
                className="size-4"
                strokeWidth={1.5}
              />
            </div>
            <a
              href="mailto:amsirare@gmail.com"
              className="break-anywhere text-sm text-zinc-400 transition-colors duration-300 pointer-fine:hover:text-orange"
            >
              amsirare@gmail.com
            </a>
          </li>

          <li className="group grid grid-cols-[36px_1fr] items-center gap-x-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-orange transition-colors duration-300 group-hover:bg-orange/10">
              <Smartphone
                className="size-4"
                strokeWidth={1.5}
              />
            </div>
            <a
              href="tel:+212661173144"
              className="text-sm text-zinc-400 transition-colors duration-300 pointer-fine:hover:text-orange"
            >
              +212 (0) 6 61 17 31 44
            </a>
          </li>

          <li className="group grid grid-cols-[36px_1fr] items-center gap-x-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-orange transition-colors duration-300 group-hover:bg-orange/10">
              <Phone
                className="size-4"
                strokeWidth={1.5}
              />
            </div>
            <a
              href="tel:+21205661731444"
              className="text-sm text-zinc-400 transition-colors duration-300 pointer-fine:hover:text-orange"
            >
              +212 (0) 5 6 61 73 14 44
            </a>
          </li>
        </ul>
      </address>
    </div>
  );
}
