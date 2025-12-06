module.exports = [
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/i18n/request.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/server/react-server/getRequestConfig.js [middleware] (ecmascript) <export default as getRequestConfig>");
var __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/i18n/routing.ts [middleware] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__["getRequestConfig"])(async ({ requestLocale })=>{
    // Get locale from the request using the new API
    let locale = await requestLocale;
    // Validate that the incoming `locale` parameter is valid
    if (!locale || !__TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["routing"].locales.includes(locale)) {
        locale = __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["routing"].defaultLocale;
    }
    return {
        locale,
        messages: (await __turbopack_context__.f({
            "../public/locales/de/common.json": {
                id: ()=>"[project]/public/locales/de/common.json (json, async loader)",
                module: ()=>__turbopack_context__.A("[project]/public/locales/de/common.json (json, async loader)")
            },
            "../public/locales/en/common.json": {
                id: ()=>"[project]/public/locales/en/common.json (json, async loader)",
                module: ()=>__turbopack_context__.A("[project]/public/locales/en/common.json (json, async loader)")
            },
            "../public/locales/es/common.json": {
                id: ()=>"[project]/public/locales/es/common.json (json, async loader)",
                module: ()=>__turbopack_context__.A("[project]/public/locales/es/common.json (json, async loader)")
            },
            "../public/locales/fr/common.json": {
                id: ()=>"[project]/public/locales/fr/common.json (json, async loader)",
                module: ()=>__turbopack_context__.A("[project]/public/locales/fr/common.json (json, async loader)")
            }
        }).import(`../public/locales/${locale}/common.json`)).default
    };
});
}),
"[project]/i18n/routing.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Link",
    ()=>Link,
    "redirect",
    ()=>redirect,
    "routing",
    ()=>routing,
    "usePathname",
    ()=>usePathname,
    "useRouter",
    ()=>useRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [middleware] (ecmascript) <export default as defineRouting>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/navigation/react-server/createNavigation.js [middleware] (ecmascript) <export default as createNavigation>");
;
;
const routing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__["defineRouting"])({
    // A list of all locales that are supported
    locales: [
        "en",
        "fr",
        "de",
        "es"
    ],
    // Used when no locale matches
    defaultLocale: "en",
    // The `pathnames` object can be used to define
    // locale-specific pathnames
    localePrefix: "as-needed"
});
const { Link, redirect, usePathname, useRouter } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__["createNavigation"])(routing);
}),
"[project]/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>proxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/middleware/middleware.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/i18n/routing.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
;
;
;
const intlMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["routing"]);
/**
 * API route security middleware
 * Applies additional security checks for API routes
 */ function apiSecurityMiddleware(request) {
    const { pathname } = request.nextUrl;
    // Check if this is an API route
    if (!pathname.startsWith("/api/")) {
        return null;
    }
    // Only allow POST for form submissions
    if (![
        "POST",
        "GET",
        "OPTIONS"
    ].includes(request.method)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: "Method not allowed"
        }, {
            status: 405
        });
    }
    // Handle OPTIONS for CORS preflight
    if (request.method === "OPTIONS") {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"](null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": request.headers.get("origin") || "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400"
            }
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
                    console.warn(`[SECURITY] CSRF attempt blocked - Origin: ${origin}, Host: ${host}`);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        ok: false,
                        error: "Invalid request origin"
                    }, {
                        status: 403
                    });
                }
            } catch (e) {
                console.error("Error parsing origin:", e);
            }
        } else if (referer && host) {
            try {
                const refererHost = new URL(referer).host;
                if (refererHost !== host) {
                    console.warn(`[SECURITY] CSRF attempt blocked - Referer: ${referer}, Host: ${host}`);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        ok: false,
                        error: "Invalid request source"
                    }, {
                        status: 403
                    });
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
 */ function botProtectionMiddleware(request) {
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
        "curl"
    ];
    // Check if User-Agent contains any bad bot string
    if (badBots.some((bot)=>userAgent.includes(bot))) {
        console.warn(`[SECURITY] Bad bot blocked: ${userAgent}`);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"]("Forbidden", {
            status: 403
        });
    }
    return null;
}
function proxy(request) {
    // 1. Bot Protection
    const botResponse = botProtectionMiddleware(request);
    if (botResponse) return botResponse;
    // 2. API Security
    const apiResponse = apiSecurityMiddleware(request);
    if (apiResponse) return apiResponse;
    // 3. Internationalization
    const response = intlMiddleware(request);
    // 4. Security Headers (CSP, etc.)
    // Ensure CSP is applied even if next.config fails
    if (!response.headers.has("Content-Security-Policy")) {
        response.headers.set("Content-Security-Policy", `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://kit.fontawesome.com; style-src 'self' 'unsafe-inline' https://kit.fontawesome.com; img-src 'self' data: blob: https:; font-src 'self' data: https://kit.fontawesome.com https://ka-f.fontawesome.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://ka-f.fontawesome.com; frame-src 'self' https://www.google.com https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';${("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : ""} block-all-mixed-content;`);
    }
    // Security headers fallback (if next.config.ts fails to apply them)
    const securityHeaders = [
        [
            "X-Content-Type-Options",
            "nosniff"
        ],
        [
            "X-Frame-Options",
            "DENY"
        ],
        [
            "Referrer-Policy",
            "strict-origin-when-cross-origin"
        ],
        [
            "X-XSS-Protection",
            "1; mode=block"
        ]
    ];
    securityHeaders.forEach(([key, value])=>{
        if (!response.headers.has(key)) {
            response.headers.set(key, value);
        }
    });
    return response;
}
const config = {
    // Match all pathnames including API routes
    matcher: [
        "/((?!_next|_vercel|.*\\..*).*)"
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f5c96870._.js.map