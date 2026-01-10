import * as React from "react";
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
    <header
      className="relative isolate w-full overflow-hidden bg-slate-950 text-white shadow-xl"
      style={
        bgImage
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 ${gradientClass[gradientPosition]}`}
        aria-hidden="true"
      />
      {/* Dark overlay 1 */}
      <div
        className="absolute inset-0 z-10 bg-linear-to-br from-slate-900/80 via-slate-900/60 to-slate-900 opacity-80"
        aria-hidden="true"
      />
      {/* Dark overlay 2 */}
      <div
        className="absolute inset-0 z-10 bg-linear-to-br from-black/60 via-black/20 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 pt-8 pb-16 text-center lg:py-20">
        <div className="flex-1 space-y-6 pt-0 text-center lg:pt-8">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center justify-center gap-3"
            >
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-md">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="text-sm font-medium text-white/80 transition-colors hover:text-white"
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
            <p className="text-xs font-semibold tracking-[0.45em] text-orange-200 uppercase">
              {smTitle}
            </p>
          )}
          <h1
            id={headingId}
            className="text-3xl font-semibold tracking-widest text-orange-200 uppercase sm:text-4xl sm:tracking-[0.15em] lg:text-5xl lg:tracking-[0.2em]"
          >
            {title}
          </h1>
          {subtitle && (
            <p className="font-fancy text-lg text-slate-200 lg:text-xl">
              {subtitle}
            </p>
          )}
          {children && (
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
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
      className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
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
      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
    >
      {children}
    </a>
  );
}
