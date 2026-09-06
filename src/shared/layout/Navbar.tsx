"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import useNavbar from "@/lib/hooks/useNavbar";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { LANGUAGES } from "./navbar/constants";
import { DesktopMenu } from "./navbar/DesktopMenu";
import { MobileMenu } from "./navbar/MobileMenu";

function Navbar() {
  const { navbarRef, scrolled } = useNavbar();
  const { i18n } = useTranslation();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [asideOpen, setAsideOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">("desktop");

  const collapseRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    if (!asideOpen && !langOpen) return; // Skip if both menus are closed

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (asideOpen && collapseRef.current && btnRef.current) {
        const clickedOutside =
          !collapseRef.current.contains(target) && !btnRef.current.contains(target);
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
      const newViewport =
        width < 768 ? "mobile"
        : width < 1090 ? "tablet"
        : "desktop";
      setViewport(newViewport);
    };

    evaluateViewport();
    window.addEventListener("resize", evaluateViewport, { passive: true });
    return () => window.removeEventListener("resize", evaluateViewport);
  }, []);

  // React Compiler handles function memoization automatically
  const handleNavClick = () => {
    setAsideOpen(false);
    setLangOpen(false);
  };

  const currentLanguage = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0]!;

  // React Compiler handles function memoization automatically
  const changeLanguage = (code: string) => {
    // Validate language code before changing
    const validLanguage = LANGUAGES.find((l) => l.code === code);
    if (!validLanguage) {
      console.warn(`Invalid language code: ${code}`);
      return;
    }

    // Save language preference to localStorage
    if (globalThis.window !== undefined) {
      try {
        localStorage.setItem("site-language", code);
      } catch (error) {
        // Ignore localStorage errors (incognito mode, quota exceeded, etc.)
        console.debug("Failed to save language preference:", error);
      }
    }

    // Navigate to new locale - pathname from next-intl is already without locale prefix
    // router.replace will keep the current path and just change the locale
    const targetPath = pathname || "/";
    try {
      replace(targetPath, { locale: code as "en" | "fr" | "de" | "es" });
      setLangOpen(false);
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  const navClassName = cn(
    "navbar fixed start-1/2 top-2 z-50 rounded-2xl border border-white/10 px-4 py-2 shadow-[0_10px_30px_rgba(3,7,18,0.12)] backdrop-blur-xl transition-colors duration-200 inline-[min(1100px,calc(100%-2rem))] has-data-[state=open]:backdrop-blur-[8px]",
    "translate-x-[-50%] will-change-auto",
    scrolled ?
      "bg-white text-slate-900 shadow-[0_12px_30px_rgba(3,7,18,0.08)]"
    : "bg-white/10 text-white",
  );

  const getNavLinkClasses = (isActive: boolean, isMobile: boolean = false): string => {
    const base =
      "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200";
    const sizing =
      isMobile ?
        "mx-auto inline-fit min-inline-40 justify-center px-8 py-2.5 text-base"
      : "px-3 py-2 text-[0.98rem] tracking-tight";

    // Active link styles
    if (isActive) {
      return cn(
        base,
        sizing,
        scrolled ?
          "bg-orange text-white shadow-[0_10px_26px_rgba(229,74,31,0.12)]"
        : "bg-white/10 text-white shadow-xs backdrop-blur",
      );
    }

    // Inactive link styles
    const textColor = scrolled ? "text-slate-900" : "text-white";
    const bgColor = "bg-transparent";
    const hover =
      "pointer-fine:hover:-translate-y-0.5 pointer-fine:hover:bg-white/10 pointer-fine:hover:shadow-[0_8px_26px_rgba(3,7,18,0.12)]";

    return cn(base, sizing, textColor, bgColor, hover);
  };

  const getCollapseClasses = () => {
    const baseClasses =
      "fixed start-1/2 top-[calc(100%+0.75rem)] z-40 inline-full -translate-x-1/2 overflow-y-auto max-h-[calc(100vh-6rem)] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300";
    const colorClasses =
      scrolled ?
        "border border-white/10 bg-white text-slate-900"
      : "border border-white/20 bg-slate-900 text-white";
    const visibilityClasses =
      asideOpen ?
        "pointer-events-auto opacity-100 translate-y-0"
      : "pointer-events-none opacity-0 -translate-y-4";

    return cn(baseClasses, colorClasses, visibilityClasses);
  };

  return (
    <nav
      className={navClassName}
      ref={navbarRef}
    >
      {viewport === "desktop" ?
        <DesktopMenu
          scrolled={scrolled}
          langOpen={langOpen}
          setLangOpen={setLangOpen}
          currentLanguage={currentLanguage}
          changeLanguage={changeLanguage}
          langRef={langRef}
          handleNavClick={handleNavClick}
          getNavLinkClasses={getNavLinkClasses}
        />
      : <MobileMenu
          scrolled={scrolled}
          langOpen={langOpen}
          setLangOpen={setLangOpen}
          currentLanguage={currentLanguage}
          changeLanguage={changeLanguage}
          langRef={langRef}
          asideOpen={asideOpen}
          setAsideOpen={setAsideOpen}
          btnRef={btnRef}
          collapseRef={collapseRef}
          handleNavClick={handleNavClick}
          getNavLinkClasses={getNavLinkClasses}
          getCollapseClasses={getCollapseClasses}
          viewport={viewport}
        />
      }
    </nav>
  );
}

export default Navbar;
