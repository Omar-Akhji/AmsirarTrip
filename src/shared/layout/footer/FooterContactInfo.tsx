import { useTranslation } from "@/lib/hooks/useTranslation";

export function FooterContactInfo() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 lg:col-span-1">
      <h3 className="mb-2 text-sm font-semibold tracking-wider text-white uppercase">
        {t("footer.office")}
      </h3>
      <span className="bg-orange mb-6 block h-1 w-12 rounded" />
      <address className="not-italic">
        <ul className="space-y-4">
          <li className="group grid grid-cols-[36px_1fr] items-start gap-x-3">
            <div className="text-orange group-hover:bg-orange/10 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300">
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="max-w-67.5 text-sm leading-relaxed text-slate-400">
              Imm. J appt N° 5, Résidence La Perle de l&apos;Atlas, angle Rue
              aboubakr, Marrakech
            </p>
          </li>

          <li className="group grid grid-cols-[36px_1fr] items-center gap-x-3">
            <div className="text-orange group-hover:bg-orange/10 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300">
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <a
              href="mailto:amsirare@gmail.com"
              className="hover:text-orange text-sm text-slate-400 transition-colors duration-300"
            >
              amsirare@gmail.com
            </a>
          </li>

          <li className="group grid grid-cols-[36px_1fr] items-center gap-x-3">
            <div className="text-orange group-hover:bg-orange/10 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300">
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect
                  x="7"
                  y="2"
                  width="10"
                  height="20"
                  rx="2"
                  ry="2"
                  strokeWidth={1.5}
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M11 18h2"
                />
              </svg>
            </div>
            <a
              href="tel:+212661173144"
              className="hover:text-orange text-sm text-slate-400 transition-colors duration-300"
            >
              +212 (0) 6 61 17 31 44
            </a>
          </li>

          <li className="group grid grid-cols-[36px_1fr] items-center gap-x-3">
            <div className="text-orange group-hover:bg-orange/10 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300">
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h2.5a1 1 0 01.9.56l1.2 2.4a1 1 0 01-.2 1.08L7.7 9.9a8 8 0 004.6 4.6l1.86-1.72a1 1 0 011.08-.2l2.4 1.2a1 1 0 01.56.9V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                />
              </svg>
            </div>
            <a
              href="tel:+21205661731444"
              className="hover:text-orange text-sm text-slate-400 transition-colors duration-300"
            >
              +212 (0) 5 6 61 73 14 44
            </a>
          </li>
        </ul>
      </address>
    </div>
  );
}
