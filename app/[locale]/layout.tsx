import { Navbar, Footer, Loader } from "@/components/layout";
import NavigationProgress from "@/components/layout/NavigationProgress";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Montserrat, Yellowtail } from "next/font/google";
import { generateOrganizationJsonLd } from "@/lib/structuredData";
import { sanitizeJsonLd } from "@/lib/sanitize";
import "../globals.css";
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const yellowtail = Yellowtail({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yellowtail",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "AmsirarTrip - Authentic Morocco Tours, Desert Adventures & Cultural Experiences",
    template: "%s | AmsirarTrip - Morocco Travel Experts",
  },
  description:
    "Explore Morocco with local experts. Authentic Sahara desert tours, imperial city excursions, Atlas Mountains treks, and private guided experiences. 20+ years serving travelers. Book your dream Morocco adventure today.",
  keywords: [
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
  authors: [{ name: "AmsirarTrip", url: "https://amsirartrip.com" }],
  creator: "AmsirarTrip",
  publisher: "AmsirarTrip",
  category: "Travel & Tourism",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://amsirartrip.com"),
  icons: {
    icon: "/horse-head.svg",
    apple: "/horse-head.svg",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amsirartrip.com",
    siteName: "AmsirarTrip",
    title: "AmsirarTrip - Authentic Morocco Tours & Desert Adventures",
    description:
      "Explore Morocco with local experts. Sahara desert tours, imperial city excursions, Atlas Mountains treks. 20+ years experience. Book your authentic Morocco adventure.",
    images: [
      {
        url: "/images/Header/header-1.webp",
        width: 1200,
        height: 630,
        alt: "AmsirarTrip - Morocco Desert Tours and Cultural Experiences",
        type: "image/webp",
      },
      {
        url: "/images/Tours/Tour1.webp",
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
    title: "AmsirarTrip - Authentic Morocco Tours & Desert Adventures",
    description:
      "Explore Morocco with local experts. Sahara desert tours, imperial city excursions, Atlas Mountains treks. 20+ years experience. Book your dream trip today.",
    images: {
      url: "/images/Header/header-1.webp",
      alt: "AmsirarTrip Morocco Desert Tours",
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
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
  const organizationJsonLd = generateOrganizationJsonLd();

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} ${yellowtail.variable}`}
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <head>
        <link
          rel="preconnect"
          href="https://kit.fontawesome.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://kit.fontawesome.com" />
        <link rel="canonical" href={`https://amsirartrip.com/${locale}`} />
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: sanitizeJsonLd(organizationJsonLd),
          }}
        />
      </head>
      <body>
        <Script
          src="https://kit.fontawesome.com/b7031c5d36.js"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <NextIntlClientProvider messages={messages}>
          <ErrorBoundary>
            <NavigationProgress />
            <Loader />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
