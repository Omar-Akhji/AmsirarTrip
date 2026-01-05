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
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },

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
