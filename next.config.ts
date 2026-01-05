import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { getSecurityHeaders } from "./src/lib/security-headers";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // eslint: {
  //   // ESLint will run but won't fail the build
  //   ignoreDuringBuilds: false,
  // },
  images: {
    remotePatterns: [],
    unoptimized: false,
    // Enable image optimization with device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Security headers (Helmet.js-style protection for Next.js)
  // See lib/security-headers.ts for full configuration details
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: getSecurityHeaders(),
      },
      {
        // Additional headers for API routes
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Fix singular path
      {
        source: "/excursion",
        destination: "/excursions",
        permanent: true,
      },
      // Tours: ID to Slug mapping
      {
        source: "/tours/1",
        destination: "/tours/merzouga-desert-adventure-3-days",
        permanent: true,
      },
      {
        source: "/tours/2",
        destination: "/tours/coast-and-cities-explorer-6-days",
        permanent: true,
      },
      {
        source: "/tours/3",
        destination: "/tours/caravan-and-kasbah-experience-3-days",
        permanent: true,
      },
      {
        source: "/tours/4",
        destination: "/tours/imperial-cities-and-coastline-5-days",
        permanent: true,
      },
      {
        source: "/tours/5",
        destination: "/tours/grand-moroccan-circuit-10-days",
        permanent: true,
      },
      {
        source: "/tours/6",
        destination: "/tours/atlas-and-desert-escape-4-days",
        permanent: true,
      },
      {
        source: "/tours/7",
        destination: "/tours/coastal-and-desert-odyssey-4-days",
        permanent: true,
      },
      {
        source: "/tours/8",
        destination: "/tours/chegaga-wilderness-expedition-3-days",
        permanent: true,
      },
      {
        source: "/tours/9",
        destination: "/tours/northern-heritage-trail-7-days",
        permanent: true,
      },
      // Excursions: ID to Slug mapping
      {
        source: "/excursions/1",
        destination: "/excursions/ouzoud-waterfalls-day-trip",
        permanent: true,
      },
      {
        source: "/excursion/1", // Handle both singular and plural for ID access just in case
        destination: "/excursions/ouzoud-waterfalls-day-trip",
        permanent: true,
      },
      {
        source: "/excursions/2",
        destination: "/excursions/essaouira-coastal-escape",
        permanent: true,
      },
      {
        source: "/excursion/2",
        destination: "/excursions/essaouira-coastal-escape",
        permanent: true,
      },
      {
        source: "/excursions/3",
        destination: "/excursions/imlil-toubkal-adventure",
        permanent: true,
      },
      {
        source: "/excursion/3",
        destination: "/excursions/imlil-toubkal-adventure",
        permanent: true,
      },
      {
        source: "/excursions/4",
        destination: "/excursions/ourika-valley-discovery",
        permanent: true,
      },
      {
        source: "/excursion/4",
        destination: "/excursions/ourika-valley-discovery",
        permanent: true,
      },
      {
        source: "/excursions/5",
        destination: "/excursions/agafay-desert-sunset",
        permanent: true,
      },
      {
        source: "/excursion/5",
        destination: "/excursions/agafay-desert-sunset",
        permanent: true,
      },
      {
        source: "/excursions/6",
        destination: "/excursions/sunrise-hot-air-balloon",
        permanent: true,
      },
      {
        source: "/excursion/6",
        destination: "/excursions/sunrise-hot-air-balloon",
        permanent: true,
      },
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
    // React Compiler: disabled due to type error in Next.js 15.1+
    // reactCompiler: process.env.NODE_ENV === "production",
    // Optimize package imports to reduce bundle size
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "date-fns",
      "@radix-ui/react-popover",
      "@radix-ui/react-slot",
      "class-variance-authority",
    ],
    // Enable router caching for faster navigation
    staleTimes: {
      dynamic: 30, // Cache dynamic pages for 30 seconds
      static: 180, // Cache static pages for 3 minutes
    },
  },
  output: "standalone",
};

export default withNextIntl(nextConfig);
