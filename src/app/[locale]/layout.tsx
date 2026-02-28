import dynamic from "next/dynamic";
import { Navbar, Loader } from "@/shared/layout";
import NavigationProgress from "@/shared/layout/NavigationProgress";
import { AnimationProvider } from "@/shared/providers/AnimationProvider";
import { ErrorBoundary } from "@/shared/utilities/ErrorBoundary";
import { JsonLd } from "@/shared/ui/JsonLd";
import {
  generateOrganizationJsonLd,
  generateWebSiteJsonLd,
} from "@/lib/structuredData";

// Lazy load below-fold components to reduce initial bundle size
const Footer = dynamic(() => import("@/shared/layout/Footer"));
const WhatsAppButton = dynamic(() => import("@/shared/ui/WhatsAppButton"));
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../globals.css";

config.autoAddCss = false;

// Local fonts for better performance (no external network requests)
const montserrat = localFont({
  src: "../../../public/fonts/Montserrat-VariableFont_wght.ttf",
  variable: "--font-montserrat",
  display: "swap",
  weight: "100 900", // Variable font supports all weights
});

const storyScript = localFont({
  src: "../../../public/fonts/StoryScript-Regular.ttf",
  variable: "--font-fancy",
  display: "swap",
});

const yellowtail = localFont({
  src: "../../../public/fonts/Yellowtail-Regular.ttf",
  variable: "--font-yellowtail",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Amsirar Trip - Morocco Tours, Sahara Desert Adventures & Excursions",
    template: "%s | Amsirar Trip - Morocco Travel Experts",
  },
  description:
    "Explore Morocco with local experts. Authentic Sahara desert tours, imperial city excursions, Atlas Mountains treks, and private guided experiences. 20+ years serving travelers. Book your dream Morocco adventure today.",
  keywords: [
    "Amsirar Trip",
    "AmsirarTrip",
    "Amsirartrip",
    "amsirartrip",
    "Amsirar",
    "amsirar",
    "Amsirar Tours",
    "Amsirar Morocco",
    "Morocco tours",
    "Sahara desert trips",
    "Marrakech excursions",
    "Morocco travel agency",
    "Atlas Mountains tours",
    "Imperial cities Morocco",
    "Merzouga desert tours",
    "Morocco adventure travel",
    "Fes day trips",
    "Chefchaouen tours",
    "Morocco guided tours",
    "private Morocco tours",
    "Morocco desert camping",
    "camel trekking Morocco",
    "Morocco cultural tours",
    "authentic Morocco experiences",
  ],
  authors: [{ name: "Amsirar Trip", url: "https://amsirartrip.com" }],
  creator: "Amsirar Trip",
  publisher: "Amsirar Trip",
  category: "Travel & Tourism",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://amsirartrip.com"),
  alternates: {
    canonical: "https://amsirartrip.com",
    languages: {
      "x-default": "https://amsirartrip.com",
      en: "https://amsirartrip.com",
      fr: "https://amsirartrip.com/fr",
      es: "https://amsirartrip.com/es",
      de: "https://amsirartrip.com/de",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/horse-head.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/icon-512.png", type: "image/png" }],
    shortcut: ["/favicon.png"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amsirartrip.com",
    siteName: "Amsirar Trip",
    title: "Amsirar Trip - Authentic Morocco Tours & Desert Adventures",
    description:
      "Explore Morocco with local experts. Sahara desert tours, imperial city excursions, Atlas Mountains treks. 20+ years experience. Book your authentic Morocco adventure.",
    images: [
      {
        url: "https://amsirartrip.com/images/Header/header-1.webp",
        width: 1200,
        height: 630,
        alt: "Amsirar Trip - Morocco Desert Tours and Cultural Experiences",
        type: "image/webp",
      },
      {
        url: "https://amsirartrip.com/images/Tours/Tour1.webp",
        width: 1200,
        height: 630,
        alt: "Morocco Sahara Desert Tour Experience",
        type: "image/webp",
      },
    ],
    countryName: "Morocco",
  },
  twitter: {
    card: "summary_large_image",
    site: "@amsirartrip",
    creator: "@amsirartrip",
    title: "Amsirar Trip - Authentic Morocco Tours & Desert Adventures",
    description:
      "Explore Morocco with local experts. Sahara desert tours, imperial city excursions, Atlas Mountains treks. 20+ years experience. Book your dream trip today.",
    images: {
      url: "https://amsirartrip.com/images/Header/header-1.webp",
      alt: "Amsirar Trip Morocco Desert Tours",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "Fcx5GvFdkFaYv-hJ0lusirB6y2k48RYTVLw8Ft0SkpU",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} ${storyScript.variable} ${yellowtail.variable}`}
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <head>
        <link
          rel="preload"
          href="/images/Header/header-1.webp"
          as="image"
          type="image/webp"
        />
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        {/* JSON-LD structured data for SEO - rendered synchronously in head */}
        <JsonLd
          id="organization-jsonld"
          data={generateOrganizationJsonLd()}
          isSync={true}
        />
        <JsonLd
          id="website-jsonld"
          data={generateWebSiteJsonLd()}
          isSync={true}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ErrorBoundary>
            <AnimationProvider>
              <NavigationProgress />
              <Loader />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <WhatsAppButton />
            </AnimationProvider>
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
