"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "./constants";

interface SocialLinksProps {
  className?: string;
  compact?: boolean;
  scrolled?: boolean;
}

export function SocialLinks({ className = "", compact = false, scrolled = false }: SocialLinksProps) {
  const size = compact ? "sm" : "md";
  const iconSize = compact ? 20 : 25;

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
    <ul className={cn("flex items-center gap-2.5", className)}>
      {SOCIAL_LINKS.map((link) => {
        const isExternal = link.href.startsWith("http");
        const buttonClasses = cn(
          getSocialButtonClasses(size),
          scrolled && link.accent
        );

        return (
          <li key={link.label}>
            <a
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
                alt=""
                width={iconSize}
                height={iconSize}
                className={cn(
                  compact ? "size-5" : "size-6.25",
                  "object-contain"
                )}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
