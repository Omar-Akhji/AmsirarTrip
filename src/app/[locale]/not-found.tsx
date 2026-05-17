import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Page Not Found | Amsirar Trip",
  description: "The page you are looking for could not be found.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="flex flex-col items-center justify-center bg-zinc-950 px-4 text-center min-block-screen">
      {/* Gradient background */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.25),transparent_65%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 space-y-6 max-inline-lg">
        {/* 404 Number */}
        <h1 className="text-shadow-xl text-8xl font-semibold text-orange-500 text-shadow-orange-600/40 sm:text-9xl">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">{t("title")}</h2>

        {/* Description */}
        <p className="text-lg text-zinc-300">{t("description")}</p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3 text-sm font-semibold text-white transition pointer-fine:hover:-translate-y-0.5 pointer-fine:hover:bg-orange-600"
        >
          {t("backHome")}
        </Link>
      </div>
    </main>
  );
}
