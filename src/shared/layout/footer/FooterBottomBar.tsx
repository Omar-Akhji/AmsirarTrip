import { Link } from "@/i18n/routing";
import { useTranslation } from "@/lib/hooks/useTranslation";

export function FooterBottomBar() {
  const { t } = useTranslation();

  return (
    <div className="border-t border-white/5 bg-black/20">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Copyright Notice */}
          <div className="order-2 text-center sm:order-1 sm:text-left">
            <p className="text-sm font-medium text-slate-500">
              ©{" "}
              <time dateTime={new Date().getFullYear().toString()}>
                {new Date().getFullYear()}
              </time>{" "}
              <span className="text-slate-400">Amsirar Trip. Ltd.</span>{" "}
              <span className="mx-1.5 hidden opacity-20 sm:inline-block">
                •
              </span>{" "}
              {t("footer.copyright")}
            </p>
          </div>

          {/* Legal Links */}
          <nav aria-label="Privacy and Terms" className="order-1 sm:order-2">
            <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-white"
                >
                  {t("legal.footer.privacyPolicy")}
                </Link>
              </li>
              <li
                className="hidden h-3 w-px bg-white/10 sm:block"
                aria-hidden="true"
              />
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-white"
                >
                  {t("legal.footer.termsOfService")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
