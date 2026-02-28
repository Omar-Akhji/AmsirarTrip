import React from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { NAV_LINKS, Language } from "./constants";
import { SocialLinks } from "./SocialLinks";
import { LanguageSelector } from "./LanguageSelector";

interface DesktopMenuProps {
  scrolled: boolean;
  langOpen: boolean;
  setLangOpen: (open: boolean) => void;
  currentLanguage: Language;
  changeLanguage: (code: string) => void;
  langRef: React.RefObject<HTMLDivElement | null>;
  handleNavClick: () => void;
  getNavLinkClasses: (isActive: boolean, isMobile?: boolean) => string;
}

export function DesktopMenu({
  scrolled,
  langOpen,
  setLangOpen,
  currentLanguage,
  changeLanguage,
  langRef,
  handleNavClick,
  getNavLinkClasses,
}: DesktopMenuProps) {
  const { t } = useTranslation();
  const pathname = usePathname();

  const getSocialButtonClasses = (size: "sm" | "md" = "md"): string => {
    const sizeClass = size === "sm" ? "size-10" : "size-11";
    const baseClasses =
      "flex items-center justify-center rounded-full border-2 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.28)]";
    const socialStyles = scrolled
      ? ""
      : "border-white/60 bg-white/10 text-white";
    return cn(baseClasses, sizeClass, socialStyles);
  };

  return (
    <>
      {!scrolled && (
        <div className="relative flex w-full items-center justify-center px-0 py-3 pb-5">
          <a
            href="tel:+212661173144"
            className="absolute left-4 flex gap-2.5 rounded-md text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={`${t("helplineTitle") || "Call us"}: ${
              t("helplineNumber") || "+212 661 173 144"
            }`}
          >
            <div className={getSocialButtonClasses("md")}>
              <Image
                src="/images/icons/nav-phone.png"
                alt=""
                width={20}
                height={20}
                className="size-5 object-contain sm:size-6"
              />
            </div>
            <div className="leading-tight">
              <p className="m-0 text-sm opacity-80">{t("helplineTitle")}</p>
              <p className="m-0 text-base font-semibold">
                {t("helplineNumber")}
              </p>
            </div>
          </a>
          <Link
            href="/"
            className="text-[1.5rem] font-semibold tracking-tight text-white"
            onClick={handleNavClick}
            aria-label="Amsirar Trip Home"
          >
            Amsirar
            <span className="font-brand ml-1 font-light">Trip</span>
          </Link>
        </div>
      )}
      <div className="relative flex items-center gap-2.5 px-4 py-2">
        <div className="mr-auto flex items-center gap-0.5">
          <SocialLinks className="mr-2" scrolled={scrolled} />
          <LanguageSelector
            langOpen={langOpen}
            setLangOpen={setLangOpen}
            currentLanguage={currentLanguage}
            changeLanguage={changeLanguage}
            scrolled={scrolled}
            langRef={langRef}
          />
        </div>
        <ul className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.to;
            return (
              <li key={link.to}>
                <Link
                  href={link.to}
                  className={getNavLinkClasses(isActive)}
                  onClick={handleNavClick}
                >
                  <span className="nav-label">{t(link.labelKey)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
