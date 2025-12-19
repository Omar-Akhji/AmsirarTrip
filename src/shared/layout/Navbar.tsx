"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import useNavbar from "@/lib/hooks/useNavbar";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  to: string;
  labelKey: string;
}

interface SocialLink {
  href: string;
  icon: string;
  label: string;
  accent: string;
}

interface Language {
  code: string;
  name: string;
  shortName: string;
}

interface LanguageSelectorProps {
  placement?: "left" | "right";
  size?: "sm" | "md";
  className?: string;
}

const NAV_LINKS: NavLink[] = [
  { to: "/", labelKey: "nav.home" },
  { to: "/tours", labelKey: "nav.tours" },
  { to: "/excursions", labelKey: "nav.excursion" },
  { to: "/about", labelKey: "nav.about" },
  { to: "/contact", labelKey: "nav.contact" },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://www.tripadvisor.de/Attraction_Review-g293734-d32584739-Reviews-Amsirar_Travel-Marrakech_Marrakech_Safi.html",
    icon: "/icons/tripadvisor-nav_icon.svg",
    label: "Tripadvisor",
    accent: "bg-[#00af87] border-[#00af87] text-white",
  },
  {
    href: "https://wa.me/212661173144",
    icon: "/icons/whatsapp-nav_icon.svg",
    label: "WhatsApp",
    accent: "bg-[#25d366] border-[#25d366] text-white",
  },
  {
    href: "mailto:contact@amsirartrip.com",
    icon: "/icons/mail-nav_icon.svg",
    label: "Email",
    accent: "bg-[#ea4335] border-[#ea4335] text-white",
  },
];

const LANGUAGES: Language[] = [
  { code: "en", name: "English", shortName: "EN" },
  { code: "fr", name: "Français", shortName: "FR" },
  { code: "de", name: "Deutsch", shortName: "DE" },
  { code: "es", name: "Español", shortName: "ES" },
];

// LanguageSelector Component (must be outside Navbar to avoid React Compiler errors)
const LanguageSelector: React.FC<
  LanguageSelectorProps & {
    langOpen: boolean;
    setLangOpen: (open: boolean) => void;
    currentLanguage: Language;
    changeLanguage: (code: string) => void;
    scrolled: boolean;
    langRef: React.RefObject<HTMLDivElement | null>;
  }
> = ({
  placement = "right",
  size = "md",
  className = "",
  langOpen,
  setLangOpen,
  currentLanguage,
  changeLanguage,
  scrolled,
  langRef,
}) => {
  const { t } = useTranslation();

  const getButtonClasses = (size: "sm" | "md", scrolled: boolean): string => {
    const sizeClass = size === "sm" ? "size-10" : "size-11";
    const baseClasses =
      "flex items-center justify-center rounded-full border-2 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.28)]";
    const textSize = size === "sm" ? "text-sm" : "text-base font-semibold";
    const colorStyles = scrolled
      ? "border-orange bg-orange text-white shadow-[0_10px_24px_rgba(229,74,31,0.35)]"
      : "border-white/60 bg-white/10 text-white";

    return cn(baseClasses, sizeClass, textSize, colorStyles);
  };

  const badgeClasses = (size: "sm" | "md"): string => {
    const baseClasses =
      "absolute -right-1.5 -bottom-1 font-bold tracking-[0.04em] text-white rounded-full border-2 border-white bg-orange";
    const sizeClasses =
      size === "sm"
        ? "px-1 py-[1px] text-[0.6rem]"
        : "px-1.5 py-0.5 text-[0.625rem]";
    return cn(baseClasses, sizeClasses);
  };

  return (
    <div className={cn("relative", className)} ref={langRef}>
      <button
        type="button"
        className="relative cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={langOpen}
        aria-label={t("language") || "Language"}
        onClick={(e) => {
          e.stopPropagation();
          setLangOpen(!langOpen);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape" && langOpen) {
            setLangOpen(false);
          } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setLangOpen(!langOpen);
          }
        }}
      >
        <div className={getButtonClasses(size, scrolled)}>
          <Image
            src="/icons/translate-icon-com.svg"
            alt=""
            width={25}
            height={25}
            className={cn(
              size === "sm" ? "size-5" : "size-[25px]",
              "object-contain"
            )}
          />
        </div>
        <span className={badgeClasses(size)} aria-hidden="true">
          {currentLanguage.shortName}
        </span>
      </button>
      <AnimatePresence>
        {langOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute z-50 mt-2 w-48 overflow-hidden rounded-xl border shadow-xl backdrop-blur-xl",
              placement === "left" ? "left-0" : "right-0",
              scrolled
                ? "border-slate-200/60 bg-white/90"
                : "border-white/10 bg-slate-900/90 text-white"
            )}
            role="menu"
            aria-orientation="vertical"
          >
            <div className="px-1 py-1">
              {LANGUAGES.map((lang) => {
                const selected = lang.code === currentLanguage.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    role="menuitemradio"
                    aria-checked={selected}
                    onClick={() => changeLanguage(lang.code)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-200",
                      selected
                        ? scrolled
                          ? "bg-orange/10 text-orange-600"
                          : "bg-white/10 text-white"
                        : scrolled
                          ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-medium">{lang.name}</span>
                    </span>
                    {selected && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={cn(
                          "size-4",
                          scrolled ? "text-orange-600" : "text-white"
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar: React.FC = () => {
  const { navbarRef, scrolled } = useNavbar();
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const [asideOpen, setAsideOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  const collapseRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const isMobile = viewport === "mobile";
  const isTablet = viewport === "tablet";
  const isDesktop = viewport === "desktop";

  // Close menus on outside click
  useEffect(() => {
    if (!asideOpen && !langOpen) return; // Skip if both menus are closed

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (asideOpen && collapseRef.current && btnRef.current) {
        const clickedOutside =
          !collapseRef.current.contains(target) &&
          !btnRef.current.contains(target);
        if (clickedOutside) setAsideOpen(false);
      }

      if (langOpen && langRef.current && !langRef.current.contains(target)) {
        setLangOpen(false);
      }
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, [asideOpen, langOpen]);

  // Responsive breakpoints with single state
  useEffect(() => {
    const evaluateViewport = () => {
      const width = window.innerWidth;
      if (width < 767) setViewport("mobile");
      else if (width <= 1050) setViewport("tablet");
      else setViewport("desktop");
    };

    evaluateViewport();
    window.addEventListener("resize", evaluateViewport, { passive: true });
    return () => window.removeEventListener("resize", evaluateViewport);
  }, []);

  const handleNavClick = useCallback(() => {
    setAsideOpen(false);
    setLangOpen(false);
  }, []);

  const currentLanguage =
    LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  const changeLanguage = useCallback(
    (code: string) => {
      // Validate language code before changing
      const validLanguage = LANGUAGES.find((l) => l.code === code);
      if (!validLanguage) {
        console.warn(`Invalid language code: ${code}`);
        return;
      }

      // Save language preference to localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("site-language", code);
        } catch (error) {
          // Ignore localStorage errors (incognito mode, quota exceeded, etc.)
          console.debug("Failed to save language preference:", error);
        }
      }

      // Navigate to new locale - pathname from next-intl is already without locale prefix
      // router.replace will keep the current path and just change the locale
      try {
        router.replace(pathname || "/", {
          locale: code as "en" | "fr" | "de" | "es",
        });
        setLangOpen(false);
      } catch (error) {
        console.error("Failed to change language:", error);
      }
    },
    [pathname, router]
  );

  const navClassName = cn(
    "navbar fixed left-1/2 top-2 z-50 w-[min(1100px,calc(100%-2rem))] rounded-2xl border border-white/10 px-4 py-2 shadow-[0_10px_30px_rgba(3,7,18,0.12)] backdrop-blur-xl transition-colors duration-200",
    "translate-x-[-50%] will-change-auto",
    scrolled
      ? "bg-white text-slate-900 shadow-[0_12px_30px_rgba(3,7,18,0.08)]"
      : "bg-white/10 text-white"
  );

  const getNavLinkClasses = (
    isActive: boolean,
    isMobile: boolean = false
  ): string => {
    const base =
      "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200";
    const sizing = isMobile
      ? "w-full justify-center px-3 py-[0.5rem] text-base"
      : "px-3 py-2 text-[0.98rem] tracking-tight";

    // Active link styles
    if (isActive) {
      return cn(
        base,
        sizing,
        scrolled
          ? "bg-orange !text-white shadow-[0_10px_26px_rgba(229,74,31,0.12)]"
          : "bg-white/10 text-white backdrop-blur"
      );
    }

    // Inactive link styles
    const textColor = scrolled && isMobile ? "text-slate-900" : "text-white";
    const bgColor = scrolled ? "bg-white/5" : "bg-white/5";
    const hover =
      "hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-[0_8px_26px_rgba(3,7,18,0.12)]";

    return cn(base, sizing, textColor, bgColor, hover);
  };

  const getSocialButtonClasses = (size: "sm" | "md" = "md"): string => {
    const sizeClass = size === "sm" ? "size-10" : "size-11";
    const baseClasses =
      "flex items-center justify-center rounded-full border-2 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.28)]";
    const socialStyles = scrolled
      ? ""
      : "border-white/60 bg-white/10 text-white";
    return cn(baseClasses, sizeClass, socialStyles);
  };

  const renderSocialLinks = (
    className: string = "",
    compact: boolean = false
  ) => {
    const size = compact ? "sm" : "md";
    const iconSize = compact ? 20 : 25;

    return (
      <div className={cn("flex items-center gap-2.5", className)}>
        {SOCIAL_LINKS.map((link) => {
          const isExternal = link.href.startsWith("http");
          const buttonClasses = cn(
            getSocialButtonClasses(size),
            scrolled && link.accent
          );

          return (
            <a
              key={link.label}
              href={link.href}
              className={buttonClasses}
              {...(isExternal && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
              aria-label={link.label}
            >
              <Image
                src={link.icon}
                alt={link.label}
                width={iconSize}
                height={iconSize}
                className={cn(
                  compact ? "size-5" : "size-[25px]",
                  "object-contain"
                )}
              />
            </a>
          );
        })}
      </div>
    );
  };

  const getCollapseClasses = () => {
    const baseClasses =
      "fixed left-1/2 top-[calc(100%+0.75rem)] z-40 w-full -translate-x-1/2 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300";
    const colorClasses = scrolled
      ? "border border-white/10 bg-white text-slate-900"
      : "border border-white/20 bg-slate-900 text-white";
    const visibilityClasses = asideOpen
      ? "pointer-events-auto opacity-100 translate-y-0"
      : "pointer-events-none opacity-0 -translate-y-4";

    return cn(baseClasses, colorClasses, visibilityClasses);
  };

  return (
    <nav className={navClassName} ref={navbarRef}>
      {isDesktop ? (
        <>
          {!scrolled && (
            <div className="pb-2">
              <div className="relative flex w-full px-0 py-3">
                <a
                  href="tel:+212661173144"
                  className="absolute left-4 flex gap-2.5 rounded-md text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label={`${t("helplineTitle") || "Call us"}: ${
                    t("helplineNumber") || "+212 661 173 144"
                  }`}
                >
                  <div className={getSocialButtonClasses("md")}>
                    <i className="fa-solid fa-phone" aria-hidden="true"></i>
                  </div>
                  <div className="leading-tight">
                    <p className="m-0 text-sm opacity-80">
                      {t("helplineTitle")}
                    </p>
                    <p className="m-0 text-base font-semibold">
                      {t("helplineNumber")}
                    </p>
                  </div>
                </a>
                <Link
                  href="/"
                  className="text-[1.5rem] font-semibold tracking-tight text-white"
                  onClick={handleNavClick}
                  aria-label="AmsirarTrip Home"
                >
                  Amsirar
                  <span
                    className={cn(
                      "font-fancy font-light",
                      scrolled ? "text-orange" : ""
                    )}
                  >
                    Trip
                  </span>
                </Link>
              </div>
            </div>
          )}
          <div className="relative flex items-center gap-2.5 px-4 py-2">
            <div className="mr-auto flex items-center gap-0.5">
              {renderSocialLinks("mr-2")}
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
      ) : (
        <div className="relative flex w-full items-center gap-3 px-2">
          {isTablet && (
            <div className="mr-auto flex items-center gap-2">
              {renderSocialLinks("gap-2", true)}
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
              isTablet || isMobile
                ? "absolute left-1/2 z-10 -translate-x-1/2"
                : ""
            )}
            onClick={handleNavClick}
            aria-label="AmsirarTrip Home"
          >
            Amsirar
            <span
              className={cn(
                "font-fancy font-light",
                scrolled ? "text-orange" : ""
              )}
            >
              Trip
            </span>
          </Link>

          {isMobile && (
            <LanguageSelector
              size="sm"
              className="mr-auto"
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
              "focus-visible:outline-orange ml-2 flex size-10 items-center justify-center rounded-md text-lg transition-all duration-150 focus-visible:outline focus-visible:outline-offset-2",
              scrolled
                ? "bg-white text-slate-900"
                : "bg-[rgba(0,0,0,0.35)] text-white shadow-[0_8px_20px_rgba(3,7,18,0.12)]"
            )}
            aria-expanded={asideOpen}
            aria-controls="navbar-collapse"
            onClick={() => setAsideOpen((s) => !s)}
            ref={btnRef}
          >
            <AnimatedMenuIcon
              isOpen={asideOpen}
              className={cn(scrolled ? "text-slate-900" : "text-white")}
            />
          </button>

          <div
            id="navbar-collapse"
            ref={collapseRef}
            className={cn(
              getCollapseClasses(),
              isTablet &&
                "top-[calc(100%+0.75rem)] right-0.5 left-auto w-1/2 translate-x-0"
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
                {renderSocialLinks("gap-4", true)}
              </div>
            )}
            <ul className="flex flex-col gap-3 px-4 py-4">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.to;
                return (
                  <li key={link.to}>
                    <Link
                      href={link.to}
                      className={getNavLinkClasses(isActive, true)}
                      onClick={handleNavClick}
                    >
                      <span>{t(link.labelKey)}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

// SVG-based animated hamburger → X icon (adapted from provided HTML/CSS)
const AnimatedMenuIcon: React.FC<{ isOpen: boolean; className?: string }> = ({
  isOpen,
  className,
}) => {
  const top = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 20 },
  };

  const middle = {
    closed: { strokeDasharray: "60 60", strokeDashoffset: 0, opacity: 1 },
    open: { strokeDasharray: "1 60", strokeDashoffset: -30, opacity: 0 },
  };

  const bottom = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -20 },
  };

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, "pointer-events-none")}
      aria-hidden="true"
    >
      <motion.path
        d="M 20,30 H 80"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        variants={top}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.28 }}
      />
      <motion.path
        d="M 20,50 H 80"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        variants={middle}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.28 }}
        style={{ transformOrigin: "26px 50px" }}
      />
      <motion.path
        d="M 20,70 H 80"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        variants={bottom}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.28 }}
      />
    </svg>
  );
};

export default Navbar;
