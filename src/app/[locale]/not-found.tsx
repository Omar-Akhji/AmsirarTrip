import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | AmsirarTrip",
  description: "The page you are looking for could not be found.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center">
      {/* Gradient background */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.25),transparent_65%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-lg space-y-6">
        {/* 404 Number */}
        <h1 className="text-8xl font-bold text-orange-500 sm:text-9xl">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          {t("title")}
        </h2>

        {/* Description */}
        <p className="text-lg text-slate-300">{t("description")}</p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-600"
        >
          {t("backHome")}
        </Link>
      </div>
    </main>
  );
}
