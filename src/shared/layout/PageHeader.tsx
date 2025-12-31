import * as React from "react";

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
}: PageHeaderProps) {
  const gradientClass = {
    top: "bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.35),transparent_65%)]",
    "top-right":
      "bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.35),transparent_65%)]",
    center:
      "bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.35),transparent_65%)]",
  };

  return (
    <header className="relative isolate overflow-hidden bg-slate-950 text-white">
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
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-24 text-center lg:flex-row lg:items-center lg:py-28 lg:text-left">
        <div className="flex-1 space-y-6 pt-6 text-center lg:pt-12">
          {smTitle && (
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
            <p className="text-lg text-slate-200 lg:text-xl">{subtitle}</p>
          )}
          {children && (
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
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
