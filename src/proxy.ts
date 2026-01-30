import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

/**
 * Generate a cryptographically secure nonce (128 bits of entropy)
 * Uses Web Crypto API for edge runtime compatibility
 */
function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Buffer.from(array).toString("base64");
}

/**
 * API route security middleware
 * Applies additional security checks for API routes
 */
function apiSecurityMiddleware(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;

  // Check if this is an API route
  if (!pathname.startsWith("/api/")) {
    return null;
  }

  // Only allow POST for form submissions
  if (!["POST", "GET", "OPTIONS"].includes(request.method)) {
    return NextResponse.json(
      { ok: false, error: "Method not allowed" },
      { status: 405 }
    );
  }

  // Handle OPTIONS for CORS preflight
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": request.headers.get("origin") || "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  // CSRF Protection: Check for proper headers on state-changing requests
  if (request.method === "POST") {
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    const host = request.headers.get("host");

    // For POST requests, verify they come from our domain
    if (origin && host) {
      try {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
          console.warn(
            `[SECURITY] CSRF attempt blocked - Origin: ${origin}, Host: ${host}`
          );
          return NextResponse.json(
            { ok: false, error: "Invalid request origin" },
            { status: 403 }
          );
        }
      } catch (e) {
        console.error("Error parsing origin:", e);
      }
    } else if (referer && host) {
      try {
        const refererHost = new URL(referer).host;
        if (refererHost !== host) {
          console.warn(
            `[SECURITY] CSRF attempt blocked - Referer: ${referer}, Host: ${host}`
          );
          return NextResponse.json(
            { ok: false, error: "Invalid request source" },
            { status: 403 }
          );
        }
      } catch (e) {
        console.error("Error parsing referer:", e);
      }
    }
  }

  return null;
}

/**
 * Bot protection middleware
 * Blocks known bad bots and scrapers
 */
function botProtectionMiddleware(request: NextRequest): NextResponse | null {
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";

  // List of bad bots to block
  const badBots = [
    "httrack",
    "semrushbot",
    "ahrefsbot",
    "mj12bot",
    "dotbot",
    "petalbot",
    "seznambot",
    "python-requests",
    "scrapy",
    "libwww-perl",
    "wget",
    "curl",
  ];

  // Check if User-Agent contains any bad bot string
  if (badBots.some((bot) => userAgent.includes(bot))) {
    console.warn(`[SECURITY] Bad bot blocked: ${userAgent}`);
    return new NextResponse("Forbidden", { status: 403 });
  }

  return null;
}

/**
 * Build Content Security Policy with nonce
 * Uses strict-dynamic for secure script loading
 */
function buildCSP(nonce: string, isProduction: boolean): string {
  const directives = [
    "default-src 'self'",
    // Scripts: nonce + strict-dynamic (allows nonced scripts to load other scripts)
    // unsafe-eval needed for Next.js React Compiler
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://kit.fontawesome.com`,
    // Styles: keep unsafe-inline for now (CSS nonces have poor browser support)
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://kit.fontawesome.com",
    "img-src 'self' blob: data: https:",
    "font-src 'self' https://fonts.gstatic.com data: https://kit.fontawesome.com https://ka-f.fontawesome.com",
    "connect-src 'self' https://www.google.com https://ka-f.fontawesome.com",
    "frame-src 'self' https://www.google.com https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    isProduction ? "upgrade-insecure-requests" : "",
    "block-all-mixed-content",
  ];

  return directives.filter(Boolean).join("; ");
}

export default function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // 0. Strict Domain Enforcement (Redirect EVERYTHING else to amsirartrip.com)
  // This kills amsirartrip.cloud, amsirartravel.com, and IP access
  const isDev = process.env.NODE_ENV === "development";
  const mainDomain = "amsirartrip.com";

  if (!isDev && host !== mainDomain && !host.includes("localhost")) {
    const redirectUrl = `https://${mainDomain}${pathname}${request.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 301);
  }

  // 1. Bot Protection
  const botResponse = botProtectionMiddleware(request);
  if (botResponse) return botResponse;

  // 2. API Security
  const apiResponse = apiSecurityMiddleware(request);
  if (apiResponse) return apiResponse;

  // 3. Generate CSP nonce for this request
  const nonce = generateNonce();

  // 4. Internationalization
  const response = intlMiddleware(request);

  // 5. Pass nonce to server components via header
  response.headers.set("x-nonce", nonce);

  // 6. Apply nonce-based CSP
  const isProduction = process.env.NODE_ENV === "production";
  response.headers.set(
    "Content-Security-Policy",
    buildCSP(nonce, isProduction)
  );

  // 7. Security headers fallback (if next.config.ts fails to apply them)
  const securityHeaders: [string, string][] = [
    ["X-Content-Type-Options", "nosniff"],
    ["X-Frame-Options", "DENY"],
    ["Referrer-Policy", "strict-origin-when-cross-origin"],
    ["X-XSS-Protection", "1; mode=block"],
  ];

  securityHeaders.forEach(([key, value]) => {
    if (!response.headers.has(key)) {
      response.headers.set(key, value);
    }
  });

  return response;
}

export const config = {
  // Match all pathnames EXCEPT:
  // - _next (Next.js internals)
  // - _vercel (Vercel internals)
  // - api routes (handled separately)
  // - sitemap.xml, robots.txt (SEO files - must not be redirected)
  // - Static files with extensions
  matcher: ["/((?!_next|_vercel|api|favicon\\.ico|.*\\..*).*)"],
};
