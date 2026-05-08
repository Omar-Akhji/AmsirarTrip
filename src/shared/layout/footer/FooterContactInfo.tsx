"use client";

import { useTranslation } from "@/lib/hooks/useTranslation";
import { MapPin, Mail, Smartphone, Phone } from "lucide-react";

export function FooterContactInfo() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 lg:col-span-1">
      <h3 className="mbe-2 text-sm font-semibold tracking-wider text-white uppercase">
        {t("footer.office")}
      </h3>
      <span className="bg-orange mbe-6 block rounded block-1 inline-12" />
      <address className="not-italic">
        <ul className="space-y-4">
          <li className="group grid grid-cols-[36px_1fr] items-start gap-x-3">
            <div className="text-orange group-hover:bg-orange/10 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300">
              <MapPin className="size-4" strokeWidth={1.5} />
            </div>
            <p className="text-sm leading-relaxed text-zinc-400 max-inline-67.5">
              Imm. J appt N° 5, Résidence La Perle de l&apos;Atlas, angle Rue
              aboubakr, Marrakech
            </p>
          </li>

          <li className="group grid grid-cols-[36px_1fr] items-center gap-x-3">
            <div className="text-orange group-hover:bg-orange/10 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300">
              <Mail className="size-4" strokeWidth={1.5} />
            </div>
            <a
              href="mailto:amsirare@gmail.com"
              className="pointer-fine:hover:text-orange break-anywhere text-sm text-zinc-400 transition-colors duration-300"
            >
              amsirare@gmail.com
            </a>
          </li>

          <li className="group grid grid-cols-[36px_1fr] items-center gap-x-3">
            <div className="text-orange group-hover:bg-orange/10 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300">
              <Smartphone className="size-4" strokeWidth={1.5} />
            </div>
            <a
              href="tel:+212661173144"
              className="pointer-fine:hover:text-orange text-sm text-zinc-400 transition-colors duration-300"
            >
              +212 (0) 6 61 17 31 44
            </a>
          </li>

          <li className="group grid grid-cols-[36px_1fr] items-center gap-x-3">
            <div className="text-orange group-hover:bg-orange/10 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300">
              <Phone className="size-4" strokeWidth={1.5} />
            </div>
            <a
              href="tel:+21205661731444"
              className="pointer-fine:hover:text-orange text-sm text-zinc-400 transition-colors duration-300"
            >
              +212 (0) 5 6 61 73 14 44
            </a>
          </li>
        </ul>
      </address>
    </div>
  );
}
