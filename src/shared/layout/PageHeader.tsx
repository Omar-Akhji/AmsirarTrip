import * as React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

interface PageHeaderProps {
  /** Main title text */
  title: string;
  /** Optional subtitle below title */
  subtitle?: string;
  /** Optional small title/badge above main title */
  smTitle?: string;
  /** Optional children for CTA buttons */
  children?: React.ReactNode;
  /** Optional ID for the heading (for aria-labelledby) */
  headingId?: string;
  /** Optional gradient position variant */
  gradientPosition?: "top" | "top-right" | "center";
  /** Optional background image URL */
  bgImage?: string;
  /** Optional breadcrumbs for navigation */
  breadcrumbs?: { label: string; href?: string }[];
}

/**
 * Shared page header component with consistent styling across all pages.
 * Features gradient overlay backgrounds and responsive layout.
 */
export function PageHeader({
  title,
  subtitle,
  smTitle,
  children,
  headingId,
  gradientPosition = "top",
  bgImage,
  breadcrumbs,
}: PageHeaderProps) {
  const gradientClass = {
    top: "bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.35),transparent_65%)]",
    "top-right":
      "bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.35),transparent_65%)]",
    center:
      "bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.35),transparent_65%)]",
  };

  return (
    <header className="page-hero relative isolate overflow-hidden bg-zinc-950 text-white shadow-xl inline-full min-block-[40vh] sm:min-block-[45vh] lg:min-block-[50vh]">
      {/* Optimized Background Image */}
      {bgImage && (
        <Image
          src={bgImage}
          alt=""
          fill
          className="-z-30 object-cover"
          sizes="100vw"
          quality={85}
          priority={true}
        />
      )}
      {/* Gradient background */}
      <div
        className={`absolute inset-0 ${gradientClass[gradientPosition]}`}
        aria-hidden="true"
      />
      {/* Dark overlay 1 */}
      <div
        className="absolute inset-0 z-10 bg-linear-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-900 opacity-80"
        aria-hidden="true"
      />
      {/* Dark overlay 2 */}
      <div
        className="absolute inset-0 z-10 bg-linear-to-br from-black/60 via-black/20 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 mx-auto flex flex-col items-center justify-center gap-12 px-4 pbs-8 pbe-16 text-center inline-full max-inline-7xl lg:py-20">
        <div className="flex-1 space-y-6 pbs-0 text-center lg:pbs-8">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="mbe-8 flex items-center justify-center gap-3"
            >
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-md">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={crumb.href || crumb.label}>
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="text-sm font-medium text-white/80 transition-colors pointer-fine:hover:text-white"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-sm font-semibold text-orange-300">
                        {crumb.label}
                      </span>
                    )}
                    {index < breadcrumbs.length - 1 && (
                      <svg
                        className="size-3 text-white/40"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </nav>
          )}

          {smTitle && !breadcrumbs && (
            <div className="flex items-center justify-center gap-4">
              <span className="bg-orange-400/60 block-px inline-8"></span>
              <p className="text-xs font-bold tracking-[0.2em] text-orange-300 uppercase sm:tracking-[0.3em]">
                {smTitle}
              </p>
              <span className="bg-orange-400/60 block-px inline-8"></span>
            </div>
          )}
          <h1
            id={headingId}
            className="lg:text-shadow-xl text-3xl font-semibold tracking-widest text-orange-200 uppercase text-shadow-black/60 text-shadow-lg sm:text-4xl sm:tracking-[0.15em] lg:text-5xl lg:tracking-[0.2em] lg:text-shadow-black/60"
          >
            {title}
          </h1>
          {subtitle && (
            <p className="font-fancy text-lg text-zinc-200 lg:text-xl">
              {subtitle}
            </p>
          )}
          {children && (
            <div className="flex flex-wrap items-center justify-center gap-4 pbs-2">
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/**
 * Primary CTA button for page headers (bordered style)
 */
export function HeaderCTA({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white/90 transition text-shadow-xs pointer-fine:hover:bg-white/10"
    >
      {children}
    </a>
  );
}

/**
 * Secondary CTA button for page headers (filled/glass style)
 */
export function HeaderSecondaryCTA({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition text-shadow-xs pointer-fine:hover:-translate-y-0.5 pointer-fine:hover:bg-white/20"
    >
      {children}
    </a>
  );
}
