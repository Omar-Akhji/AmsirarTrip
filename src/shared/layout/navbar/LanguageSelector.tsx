"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { LANGUAGES, Language } from "./constants";

interface LanguageSelectorProps {
  placement?: "left" | "right";
  size?: "sm" | "md";
  className?: string;
  langOpen: boolean;
  setLangOpen: (open: boolean) => void;
  currentLanguage: Language;
  changeLanguage: (code: string) => void;
  scrolled: boolean;
  langRef: React.RefObject<HTMLDivElement | null>;
}

export function LanguageSelector({
  placement = "right",
  size = "md",
  className = "",
  langOpen,
  setLangOpen,
  currentLanguage,
  changeLanguage,
  scrolled,
  langRef,
}: LanguageSelectorProps) {
  const { t } = useTranslation();

  const getButtonClasses = (size: "sm" | "md", scrolled: boolean): string => {
    const sizeClass = size === "sm" ? "size-10" : "size-11";
    const baseClasses =
      "flex items-center justify-center rounded-full border-2 transition-all duration-150 pointer-fine:hover:-translate-y-0.5 pointer-fine:hover:shadow-[0_8px_18px_rgba(0,0,0,0.28)]";
    const textSize = size === "sm" ? "text-sm" : "text-base font-semibold";
    const colorStyles = scrolled
      ? "border-orange bg-orange text-white shadow-[0_10px_24px_rgba(229,74,31,0.35)]"
      : "border-white/60 bg-white/10 text-white";

    return cn(baseClasses, sizeClass, textSize, colorStyles);
  };

  const badgeClasses = (size: "sm" | "md"): string => {
    const baseClasses =
      "absolute -end-1.5 -bottom-1 font-bold tracking-[0.04em] text-white rounded-full border-2 border-white bg-orange";
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
              size === "sm" ? "size-5" : "size-6.25",
              "object-contain",
            )}
          />
        </div>
        <span className={badgeClasses(size)} aria-hidden="true">
          {currentLanguage.shortName}
        </span>
      </button>
      {langOpen && (
        <div
          className={cn(
            "absolute z-50 mbs-2 overflow-hidden rounded-xl border shadow-xl backdrop-blur-xl inline-48",
            placement === "left" ? "inset-s-0" : "inset-e-0",
            scrolled
              ? "border-zinc-200/60 bg-white/90"
              : "border-white/10 bg-zinc-900/90 text-white",
          )}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="flex flex-col gap-1 p-1">
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
                    "flex items-center justify-between rounded-lg px-3 py-2 text-sm inline-full",
                    selected
                      ? scrolled
                        ? "bg-orange/10 text-orange-600"
                        : "bg-white/10 text-white"
                      : scrolled
                        ? "text-zinc-600 pointer-fine:hover:bg-zinc-100 pointer-fine:hover:text-zinc-900"
                        : "text-zinc-300 pointer-fine:hover:bg-white/10 pointer-fine:hover:text-white",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-medium">{lang.name}</span>
                  </span>
                  {selected && (
                    <div
                      className={cn(
                        "me-1 size-2 rounded-full",
                        scrolled ? "bg-orange" : "bg-white",
                      )}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
