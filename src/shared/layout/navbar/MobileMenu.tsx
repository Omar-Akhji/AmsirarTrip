import React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, Language } from "./constants";
import { SocialLinks } from "./SocialLinks";
import { LanguageSelector } from "./LanguageSelector";

interface MobileMenuProps {
  scrolled: boolean;
  langOpen: boolean;
  setLangOpen: (open: boolean) => void;
  currentLanguage: Language;
  changeLanguage: (code: string) => void;
  langRef: React.RefObject<HTMLDivElement | null>;
  asideOpen: boolean;
  setAsideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  btnRef: React.RefObject<HTMLButtonElement | null>;
  collapseRef: React.RefObject<HTMLDivElement | null>;
  handleNavClick: () => void;
  getNavLinkClasses: (isActive: boolean, isMobile?: boolean) => string;
  getCollapseClasses: () => string;
  isTablet: boolean;
  isMobile: boolean;
}

export function MobileMenu({
  scrolled,
  langOpen,
  setLangOpen,
  currentLanguage,
  changeLanguage,
  langRef,
  asideOpen,
  setAsideOpen,
  btnRef,
  collapseRef,
  handleNavClick,
  getNavLinkClasses,
  getCollapseClasses,
  isTablet,
  isMobile,
}: MobileMenuProps) {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <div className="relative flex items-center gap-3 px-2 inline-full">
      {isTablet && (
        <div className="me-auto flex items-center gap-2">
          <SocialLinks className="gap-2" compact={true} scrolled={scrolled} />
          <LanguageSelector
            size="sm"
            langOpen={langOpen}
            setLangOpen={setLangOpen}
            currentLanguage={currentLanguage}
            changeLanguage={changeLanguage}
            scrolled={scrolled}
            langRef={langRef}
          />
        </div>
      )}

      <Link
        href="/"
        className={cn(
          "text-[1.4rem] font-semibold tracking-tight",
          scrolled ? "text-slate-900" : "text-white",
          isTablet || isMobile ? "absolute start-1/2 z-10 -translate-x-1/2" : ""
        )}
        onClick={handleNavClick}
        aria-label="Amsirar Trip Home"
      >
        Amsirar
        <span
          className={cn(
            "font-brand ms-1 font-light",
            scrolled ? "text-orange" : "text-white"
          )}
        >
          Trip
        </span>
      </Link>

      {isMobile && (
        <LanguageSelector
          size="sm"
          className="me-auto"
          placement="left"
          langOpen={langOpen}
          setLangOpen={setLangOpen}
          currentLanguage={currentLanguage}
          changeLanguage={changeLanguage}
          scrolled={scrolled}
          langRef={langRef}
        />
      )}

      <button
        type="button"
        id="navbar-show-btn"
        className={cn(
          "focus-visible:outline-orange ms-2 flex size-10 items-center justify-center rounded-md text-lg transition-all duration-150 focus-visible:outline focus-visible:outline-offset-2",
          scrolled
            ? "bg-white text-slate-900"
            : "bg-[rgba(0,0,0,0.35)] text-white shadow-[0_8px_20px_rgba(3,7,18,0.12)]"
        )}
        aria-expanded={asideOpen}
        aria-controls="navbar-collapse"
        onClick={() => setAsideOpen((s) => !s)}
        ref={btnRef}
      >
        {asideOpen ? (
          <X
            className={cn("size-5", scrolled ? "text-slate-900" : "text-white")}
          />
        ) : (
          <Menu
            className={cn("size-5", scrolled ? "text-slate-900" : "text-white")}
          />
        )}
      </button>

      <div
        id="navbar-collapse"
        ref={collapseRef}
        className={cn(
          getCollapseClasses(),
          isTablet &&
            "start-auto end-0.5 top-[calc(100%+0.75rem)] translate-x-0 inline-1/2"
        )}
      >
        {isMobile && (
          <div
            className={cn(
              "flex items-center justify-center gap-4 px-4 py-4",
              scrolled
                ? "border-b border-slate-200/30"
                : "border-b border-white/20"
            )}
          >
            <SocialLinks className="gap-4" compact={true} scrolled={scrolled} />
          </div>
        )}
        <ul className="flex flex-col items-center gap-3 px-4 py-4">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.to;
            return (
              <li key={link.to}>
                <Link
                  href={link.to}
                  className={getNavLinkClasses(isActive, true)}
                  onClick={handleNavClick}
                >
                  <span className="nav-label">{t(link.labelKey)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
