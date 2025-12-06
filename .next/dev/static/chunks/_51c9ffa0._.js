(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/i18n/routing.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [app-client] (ecmascript) <export default as defineRouting>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$client$2f$createNavigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/navigation/react-client/createNavigation.js [app-client] (ecmascript) <export default as createNavigation>");
;
;
const routing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__["defineRouting"])({
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
const { Link, redirect, usePathname, useRouter } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$client$2f$createNavigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__["createNavigation"])(routing);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useNavbar.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useNavbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useNavbar() {
    _s();
    const navbarRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useNavbar.useEffect": ()=>{
            const navbar = navbarRef.current;
            if (!navbar) return;
            let ticking = false;
            function onScroll() {
                if (!ticking) {
                    requestAnimationFrame({
                        "useNavbar.useEffect.onScroll": ()=>{
                            const scrollY = window.scrollY || window.pageYOffset;
                            setScrolled(scrollY > 0);
                            ticking = false;
                        }
                    }["useNavbar.useEffect.onScroll"]);
                    ticking = true;
                }
            }
            function setNavbarHeightVar() {
                if (!navbar) return;
                try {
                    const h = navbar.getBoundingClientRect().height;
                    document.documentElement.style.setProperty("--navbar-height", h + "px");
                } catch  {
                /* ignore errors reading element size */ }
            }
            function onResize() {
                document.body.classList.add("resize-animation-stopper");
                clearTimeout(window.__resizeTimer);
                window.__resizeTimer = window.setTimeout({
                    "useNavbar.useEffect.onResize": ()=>{
                        document.body.classList.remove("resize-animation-stopper");
                    }
                }["useNavbar.useEffect.onResize"], 400);
                try {
                    // keep resize debounce logic; no aside toggle here (component handles it)
                    window.matchMedia("(min-width: 992px)");
                } catch  {
                /* ignore media query errors */ }
            }
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            window.addEventListener("DOMContentLoaded", setNavbarHeightVar);
            window.addEventListener("resize", setNavbarHeightVar);
            window.addEventListener("scroll", setNavbarHeightVar);
            window.addEventListener("resize", onResize);
            onScroll();
            return ({
                "useNavbar.useEffect": ()=>{
                    window.removeEventListener("scroll", onScroll);
                    window.removeEventListener("DOMContentLoaded", setNavbarHeightVar);
                    window.removeEventListener("resize", setNavbarHeightVar);
                    window.removeEventListener("scroll", setNavbarHeightVar);
                    window.removeEventListener("resize", onResize);
                }
            })["useNavbar.useEffect"];
        }
    }["useNavbar.useEffect"], []);
    return {
        navbarRef,
        scrolled
    };
}
_s(useNavbar, "qlLcX+FECvcwhZn342IxiyHF4zo=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useTranslation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTranslation",
    ()=>useTranslation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/use-intl/dist/esm/development/react.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useTranslation() {
    _s();
    const translations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    // Wrapper that supports values parameter for ICU message format
    // The second parameter can be either a default value (ignored) or values object
    const t = (key, defaultValueOrValues)=>{
        // If second param is an object, it's values for ICU messages
        if (typeof defaultValueOrValues === "object") {
            return translations(key, defaultValueOrValues);
        }
        // Otherwise it's a default value (ignored by next-intl)
        return translations(key);
    };
    return {
        t,
        i18n: {
            language: locale,
            changeLanguage: ()=>{
                // Next-intl handles language changes via routing
                console.warn("Language changes should be done via next-intl routing");
            }
        }
    };
}
_s(useTranslation, "o3nIYUItddIUwffWCUchimOAe0E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/_components/layout/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/i18n/routing.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useNavbar$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useNavbar.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useTranslation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const NAV_LINKS = [
    {
        to: "/",
        labelKey: "nav.home"
    },
    {
        to: "/tours",
        labelKey: "nav.tours"
    },
    {
        to: "/excursions",
        labelKey: "nav.excursion"
    },
    {
        to: "/about",
        labelKey: "nav.about"
    },
    {
        to: "/contact",
        labelKey: "nav.contact"
    }
];
const SOCIAL_LINKS = [
    {
        href: "https://www.tripadvisor.de/Attraction_Review-g293734-d32584739-Reviews-Amsirar_Travel-Marrakech_Marrakech_Safi.html",
        icon: "/icons/tripadvisor-nav_icon.svg",
        label: "Tripadvisor",
        accent: "bg-[#00af87] border-[#00af87] text-white"
    },
    {
        href: "https://wa.me/212661173144",
        icon: "/icons/whatsapp-nav_icon.svg",
        label: "WhatsApp",
        accent: "bg-[#25d366] border-[#25d366] text-white"
    },
    {
        href: "mailto:contact@amsirartrip.com",
        icon: "/icons/mail-nav_icon.svg",
        label: "Email",
        accent: "bg-[#ea4335] border-[#ea4335] text-white"
    }
];
const LANGUAGES = [
    {
        code: "en",
        name: "English",
        shortName: "EN"
    },
    {
        code: "fr",
        name: "Français",
        shortName: "FR"
    },
    {
        code: "de",
        name: "Deutsch",
        shortName: "DE"
    },
    {
        code: "es",
        name: "Español",
        shortName: "ES"
    }
];
// LanguageSelector Component (must be outside Navbar to avoid React Compiler errors)
const LanguageSelector = ({ placement = "right", size = "md", className = "", langOpen, setLangOpen, currentLanguage, changeLanguage, scrolled, langRef })=>{
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const getButtonClasses = (size, scrolled)=>{
        const sizeClass = size === "sm" ? "size-10" : "size-11";
        const baseClasses = "flex items-center justify-center rounded-full border-2 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.28)]";
        const textSize = size === "sm" ? "text-sm" : "text-base font-semibold";
        const colorStyles = scrolled ? "border-orange bg-orange text-white shadow-[0_10px_24px_rgba(229,74,31,0.35)]" : "border-white/60 bg-white/10 text-white";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(baseClasses, sizeClass, textSize, colorStyles);
    };
    const badgeClasses = (size)=>{
        const baseClasses = "absolute -right-1.5 -bottom-1 font-bold tracking-[0.04em] text-white rounded-full border-2 border-white bg-orange";
        const sizeClasses = size === "sm" ? "px-1 py-[1px] text-[0.6rem]" : "px-1.5 py-0.5 text-[0.625rem]";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(baseClasses, sizeClasses);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative", className),
        ref: langRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "relative cursor-pointer",
                "aria-haspopup": "listbox",
                "aria-expanded": langOpen,
                "aria-label": t("language") || "Language",
                onClick: (e)=>{
                    e.stopPropagation();
                    setLangOpen(!langOpen);
                },
                onKeyDown: (e)=>{
                    if (e.key === "Escape" && langOpen) {
                        setLangOpen(false);
                    } else if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setLangOpen(!langOpen);
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: getButtonClasses(size, scrolled),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: "/icons/translate-icon-com.svg",
                            alt: "",
                            width: 25,
                            height: 25,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(size === "sm" ? "size-5" : "size-[25px]", "object-contain")
                        }, void 0, false, {
                            fileName: "[project]/app/_components/layout/Navbar.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/_components/layout/Navbar.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: badgeClasses(size),
                        "aria-hidden": "true",
                        children: currentLanguage.shortName
                    }, void 0, false, {
                        fileName: "[project]/app/_components/layout/Navbar.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/_components/layout/Navbar.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: langOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 8,
                        scale: 0.96
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                        scale: 1
                    },
                    exit: {
                        opacity: 0,
                        y: 8,
                        scale: 0.96
                    },
                    transition: {
                        duration: 0.2,
                        ease: "easeOut"
                    },
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute z-50 mt-2 w-48 overflow-hidden rounded-xl border shadow-xl backdrop-blur-xl", placement === "left" ? "left-0" : "right-0", scrolled ? "border-slate-200/60 bg-white/90" : "border-white/10 bg-slate-900/90 text-white"),
                    role: "menu",
                    "aria-orientation": "vertical",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-1 py-1",
                        children: LANGUAGES.map((lang)=>{
                            const selected = lang.code === currentLanguage.code;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                role: "menuitemradio",
                                "aria-checked": selected,
                                onClick: ()=>changeLanguage(lang.code),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-200", selected ? scrolled ? "bg-orange/10 text-orange-600" : "bg-white/10 text-white" : scrolled ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900" : "text-slate-300 hover:bg-white/10 hover:text-white"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: lang.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/layout/Navbar.tsx",
                                            lineNumber: 192,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/_components/layout/Navbar.tsx",
                                        lineNumber: 191,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].svg, {
                                        initial: {
                                            scale: 0
                                        },
                                        animate: {
                                            scale: 1
                                        },
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("size-4", scrolled ? "text-orange-600" : "text-white"),
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        strokeWidth: "2.5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            d: "M5 13l4 4L19 7"
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/layout/Navbar.tsx",
                                            lineNumber: 207,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/_components/layout/Navbar.tsx",
                                        lineNumber: 195,
                                        columnNumber: 23
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, lang.code, true, {
                                fileName: "[project]/app/_components/layout/Navbar.tsx",
                                lineNumber: 174,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/_components/layout/Navbar.tsx",
                        lineNumber: 170,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/app/_components/layout/Navbar.tsx",
                    lineNumber: 155,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/app/_components/layout/Navbar.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/_components/layout/Navbar.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LanguageSelector, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = LanguageSelector;
const Navbar = ()=>{
    _s1();
    const { navbarRef, scrolled } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useNavbar$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const { t, i18n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [asideOpen, setAsideOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [langOpen, setLangOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [viewport, setViewport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("desktop");
    const collapseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const btnRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const langRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isMobile = viewport === "mobile";
    const isTablet = viewport === "tablet";
    const isDesktop = viewport === "desktop";
    // Close menus on outside click
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            if (!asideOpen && !langOpen) return; // Skip if both menus are closed
            const handleClick = {
                "Navbar.useEffect.handleClick": (e)=>{
                    const target = e.target;
                    if (asideOpen && collapseRef.current && btnRef.current) {
                        const clickedOutside = !collapseRef.current.contains(target) && !btnRef.current.contains(target);
                        if (clickedOutside) setAsideOpen(false);
                    }
                    if (langOpen && langRef.current && !langRef.current.contains(target)) {
                        setLangOpen(false);
                    }
                }
            }["Navbar.useEffect.handleClick"];
            document.addEventListener("click", handleClick, {
                passive: true
            });
            return ({
                "Navbar.useEffect": ()=>document.removeEventListener("click", handleClick)
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], [
        asideOpen,
        langOpen
    ]);
    // Responsive breakpoints with single state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            const evaluateViewport = {
                "Navbar.useEffect.evaluateViewport": ()=>{
                    const width = window.innerWidth;
                    if (width < 767) setViewport("mobile");
                    else if (width <= 1050) setViewport("tablet");
                    else setViewport("desktop");
                }
            }["Navbar.useEffect.evaluateViewport"];
            evaluateViewport();
            window.addEventListener("resize", evaluateViewport, {
                passive: true
            });
            return ({
                "Navbar.useEffect": ()=>window.removeEventListener("resize", evaluateViewport)
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], []);
    const handleNavClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Navbar.useCallback[handleNavClick]": ()=>{
            setAsideOpen(false);
            setLangOpen(false);
        }
    }["Navbar.useCallback[handleNavClick]"], []);
    const currentLanguage = LANGUAGES.find((l)=>l.code === i18n.language) || LANGUAGES[0];
    const changeLanguage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Navbar.useCallback[changeLanguage]": (code)=>{
            // Validate language code before changing
            const validLanguage = LANGUAGES.find({
                "Navbar.useCallback[changeLanguage].validLanguage": (l)=>l.code === code
            }["Navbar.useCallback[changeLanguage].validLanguage"]);
            if (!validLanguage) {
                console.warn(`Invalid language code: ${code}`);
                return;
            }
            // Save language preference to localStorage
            if ("TURBOPACK compile-time truthy", 1) {
                try {
                    localStorage.setItem("site-language", code);
                } catch (error) {
                    // Ignore localStorage errors (incognito mode, quota exceeded, etc.)
                    console.debug("Failed to save language preference:", error);
                }
            }
            // Navigate to new locale - pathname from next-intl is already without locale prefix
            // router.replace will keep the current path and just change the locale
            try {
                router.replace(pathname || "/", {
                    locale: code
                });
                setLangOpen(false);
            } catch (error) {
                console.error("Failed to change language:", error);
            }
        }
    }["Navbar.useCallback[changeLanguage]"], [
        pathname,
        router
    ]);
    const navClassName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("navbar fixed left-1/2 top-2 z-50 w-[min(1100px,calc(100%-2rem))] rounded-2xl border border-white/10 px-4 py-2 shadow-[0_10px_30px_rgba(3,7,18,0.12)] backdrop-blur-xl transition-colors duration-200", "translate-x-[-50%] will-change-auto", scrolled ? "bg-white text-slate-900 shadow-[0_12px_30px_rgba(3,7,18,0.08)]" : "bg-white/10 text-white");
    const getNavLinkClasses = (isActive, isMobile = false)=>{
        const base = "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200";
        const sizing = isMobile ? "w-full justify-center px-3 py-[0.5rem] text-base" : "px-3 py-2 text-[0.98rem] tracking-tight";
        // Active link styles
        if (isActive) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(base, sizing, scrolled ? "bg-orange !text-white shadow-[0_10px_26px_rgba(229,74,31,0.12)]" : "bg-white/10 text-white backdrop-blur");
        }
        // Inactive link styles
        const textColor = scrolled && isMobile ? "text-slate-900" : "text-white";
        const bgColor = scrolled ? "bg-white/5" : "bg-white/5";
        const hover = "hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-[0_8px_26px_rgba(3,7,18,0.12)]";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(base, sizing, textColor, bgColor, hover);
    };
    const getSocialButtonClasses = (size = "md")=>{
        const sizeClass = size === "sm" ? "size-10" : "size-11";
        const baseClasses = "flex items-center justify-center rounded-full border-2 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.28)]";
        const socialStyles = scrolled ? "" : "border-white/60 bg-white/10 text-white";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(baseClasses, sizeClass, socialStyles);
    };
    const renderSocialLinks = (className = "", compact = false)=>{
        const size = compact ? "sm" : "md";
        const iconSize = compact ? 20 : 25;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2.5", className),
            children: SOCIAL_LINKS.map((link)=>{
                const isExternal = link.href.startsWith("http");
                const buttonClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(getSocialButtonClasses(size), scrolled && link.accent);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: link.href,
                    className: buttonClasses,
                    ...isExternal && {
                        target: "_blank",
                        rel: "noopener noreferrer"
                    },
                    "aria-label": link.label,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: link.icon,
                        alt: link.label,
                        width: iconSize,
                        height: iconSize,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(compact ? "size-5" : "size-[25px]", "object-contain")
                    }, void 0, false, {
                        fileName: "[project]/app/_components/layout/Navbar.tsx",
                        lineNumber: 398,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                }, link.label, false, {
                    fileName: "[project]/app/_components/layout/Navbar.tsx",
                    lineNumber: 388,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0));
            })
        }, void 0, false, {
            fileName: "[project]/app/_components/layout/Navbar.tsx",
            lineNumber: 379,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    };
    const getCollapseClasses = ()=>{
        const baseClasses = "fixed left-1/2 top-[calc(100%+0.75rem)] z-40 w-full -translate-x-1/2 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300";
        const colorClasses = scrolled ? "border border-white/10 bg-white text-slate-900" : "border border-white/20 bg-slate-900 text-white";
        const visibilityClasses = asideOpen ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-4";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(baseClasses, colorClasses, visibilityClasses);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: navClassName,
        ref: navbarRef,
        children: isDesktop ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                !scrolled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pb-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex w-full px-0 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "tel:+212661173144",
                                className: "absolute left-4 flex gap-2.5 rounded-md text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white",
                                "aria-label": `${t("helplineTitle") || "Call us"}: ${t("helplineNumber") || "+212 661 173 144"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: getSocialButtonClasses("md"),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "fa-solid fa-phone",
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/layout/Navbar.tsx",
                                            lineNumber: 443,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/_components/layout/Navbar.tsx",
                                        lineNumber: 442,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "leading-tight",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "m-0 text-sm opacity-80",
                                                children: t("helplineTitle")
                                            }, void 0, false, {
                                                fileName: "[project]/app/_components/layout/Navbar.tsx",
                                                lineNumber: 446,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "m-0 text-base font-semibold",
                                                children: t("helplineNumber")
                                            }, void 0, false, {
                                                fileName: "[project]/app/_components/layout/Navbar.tsx",
                                                lineNumber: 449,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/_components/layout/Navbar.tsx",
                                        lineNumber: 445,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/_components/layout/Navbar.tsx",
                                lineNumber: 435,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                href: "/",
                                className: "text-[1.5rem] font-semibold tracking-tight text-white",
                                onClick: handleNavClick,
                                "aria-label": "AmsirarTrip Home",
                                children: [
                                    "Amsirar",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-fancy font-light", scrolled ? "text-orange" : ""),
                                        children: "Trip"
                                    }, void 0, false, {
                                        fileName: "[project]/app/_components/layout/Navbar.tsx",
                                        lineNumber: 461,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/_components/layout/Navbar.tsx",
                                lineNumber: 454,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/_components/layout/Navbar.tsx",
                        lineNumber: 434,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/app/_components/layout/Navbar.tsx",
                    lineNumber: 433,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex items-center gap-2.5 px-4 py-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mr-auto flex items-center gap-0.5",
                            children: [
                                renderSocialLinks("mr-2"),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageSelector, {
                                    langOpen: langOpen,
                                    setLangOpen: setLangOpen,
                                    currentLanguage: currentLanguage,
                                    changeLanguage: changeLanguage,
                                    scrolled: scrolled,
                                    langRef: langRef
                                }, void 0, false, {
                                    fileName: "[project]/app/_components/layout/Navbar.tsx",
                                    lineNumber: 476,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/_components/layout/Navbar.tsx",
                            lineNumber: 474,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "absolute left-1/2 z-10 flex -translate-x-1/2 items-center gap-3",
                            children: NAV_LINKS.map((link)=>{
                                const isActive = pathname === link.to;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                        href: link.to,
                                        className: getNavLinkClasses(isActive),
                                        onClick: handleNavClick,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "nav-label",
                                            children: t(link.labelKey)
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/layout/Navbar.tsx",
                                            lineNumber: 495,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/_components/layout/Navbar.tsx",
                                        lineNumber: 490,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, link.to, false, {
                                    fileName: "[project]/app/_components/layout/Navbar.tsx",
                                    lineNumber: 489,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0));
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/_components/layout/Navbar.tsx",
                            lineNumber: 485,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/_components/layout/Navbar.tsx",
                    lineNumber: 473,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative flex w-full items-center gap-3 px-2",
            children: [
                isTablet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mr-auto flex items-center gap-2",
                    children: [
                        renderSocialLinks("gap-2", true),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageSelector, {
                            size: "sm",
                            langOpen: langOpen,
                            setLangOpen: setLangOpen,
                            currentLanguage: currentLanguage,
                            changeLanguage: changeLanguage,
                            scrolled: scrolled,
                            langRef: langRef
                        }, void 0, false, {
                            fileName: "[project]/app/_components/layout/Navbar.tsx",
                            lineNumber: 508,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/_components/layout/Navbar.tsx",
                    lineNumber: 506,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                    href: "/",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[1.4rem] font-semibold tracking-tight", scrolled ? "text-slate-900" : "text-white", isTablet || isMobile ? "absolute left-1/2 z-10 -translate-x-1/2" : ""),
                    onClick: handleNavClick,
                    "aria-label": "AmsirarTrip Home",
                    children: [
                        "Amsirar",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-fancy font-light", scrolled ? "text-orange" : ""),
                            children: "Trip"
                        }, void 0, false, {
                            fileName: "[project]/app/_components/layout/Navbar.tsx",
                            lineNumber: 533,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/_components/layout/Navbar.tsx",
                    lineNumber: 520,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageSelector, {
                    size: "sm",
                    className: "mr-auto",
                    placement: "left",
                    langOpen: langOpen,
                    setLangOpen: setLangOpen,
                    currentLanguage: currentLanguage,
                    changeLanguage: changeLanguage,
                    scrolled: scrolled,
                    langRef: langRef
                }, void 0, false, {
                    fileName: "[project]/app/_components/layout/Navbar.tsx",
                    lineNumber: 544,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    id: "navbar-show-btn",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus-visible:outline-orange ml-2 flex size-10 items-center justify-center rounded-md text-lg transition-all duration-150 focus-visible:outline focus-visible:outline-offset-2", scrolled ? "bg-white text-slate-900" : "bg-[rgba(0,0,0,0.35)] text-white shadow-[0_8px_20px_rgba(3,7,18,0.12)]"),
                    "aria-expanded": asideOpen,
                    "aria-controls": "navbar-collapse",
                    onClick: ()=>setAsideOpen((s)=>!s),
                    ref: btnRef,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AnimatedMenuIcon, {
                        isOpen: asideOpen,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(scrolled ? "text-slate-900" : "text-white")
                    }, void 0, false, {
                        fileName: "[project]/app/_components/layout/Navbar.tsx",
                        lineNumber: 571,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/app/_components/layout/Navbar.tsx",
                    lineNumber: 557,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "navbar-collapse",
                    ref: collapseRef,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(getCollapseClasses(), isTablet && "top-[calc(100%+0.75rem)] right-0.5 left-auto w-1/2 translate-x-0"),
                    children: [
                        isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-center gap-4 px-4 py-4", scrolled ? "border-b border-slate-200/30" : "border-b border-white/20"),
                            children: renderSocialLinks("gap-4", true)
                        }, void 0, false, {
                            fileName: "[project]/app/_components/layout/Navbar.tsx",
                            lineNumber: 587,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "flex flex-col gap-3 px-4 py-4",
                            children: NAV_LINKS.map((link)=>{
                                const isActive = pathname === link.to;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                        href: link.to,
                                        className: getNavLinkClasses(isActive, true),
                                        onClick: handleNavClick,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: t(link.labelKey)
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/layout/Navbar.tsx",
                                            lineNumber: 608,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/_components/layout/Navbar.tsx",
                                        lineNumber: 603,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, link.to, false, {
                                    fileName: "[project]/app/_components/layout/Navbar.tsx",
                                    lineNumber: 602,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0));
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/_components/layout/Navbar.tsx",
                            lineNumber: 598,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/_components/layout/Navbar.tsx",
                    lineNumber: 577,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/app/_components/layout/Navbar.tsx",
            lineNumber: 504,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/_components/layout/Navbar.tsx",
        lineNumber: 429,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(Navbar, "XLHYhrwlUYHb7fcMrSMolLPDvoc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useNavbar$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = Navbar;
// SVG-based animated hamburger → X icon (adapted from provided HTML/CSS)
const AnimatedMenuIcon = ({ isOpen, className })=>{
    const top = {
        closed: {
            rotate: 0,
            y: 0
        },
        open: {
            rotate: 45,
            y: 20
        }
    };
    const middle = {
        closed: {
            strokeDasharray: "60 60",
            strokeDashoffset: 0,
            opacity: 1
        },
        open: {
            strokeDasharray: "1 60",
            strokeDashoffset: -30,
            opacity: 0
        }
    };
    const bottom = {
        closed: {
            rotate: 0,
            y: 0
        },
        open: {
            rotate: -45,
            y: -20
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "24",
        height: "24",
        viewBox: "0 0 100 100",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(className, "pointer-events-none"),
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M 20,30 H 80",
                stroke: "currentColor",
                strokeWidth: 6,
                strokeLinecap: "round",
                variants: top,
                initial: false,
                animate: isOpen ? "open" : "closed",
                transition: {
                    duration: 0.28
                }
            }, void 0, false, {
                fileName: "[project]/app/_components/layout/Navbar.tsx",
                lineNumber: 651,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M 20,50 H 80",
                stroke: "currentColor",
                strokeWidth: 6,
                strokeLinecap: "round",
                variants: middle,
                initial: false,
                animate: isOpen ? "open" : "closed",
                transition: {
                    duration: 0.28
                },
                style: {
                    transformOrigin: "26px 50px"
                }
            }, void 0, false, {
                fileName: "[project]/app/_components/layout/Navbar.tsx",
                lineNumber: 661,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].path, {
                d: "M 20,70 H 80",
                stroke: "currentColor",
                strokeWidth: 6,
                strokeLinecap: "round",
                variants: bottom,
                initial: false,
                animate: isOpen ? "open" : "closed",
                transition: {
                    duration: 0.28
                }
            }, void 0, false, {
                fileName: "[project]/app/_components/layout/Navbar.tsx",
                lineNumber: 672,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/_components/layout/Navbar.tsx",
        lineNumber: 642,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = AnimatedMenuIcon;
const __TURBOPACK__default__export__ = Navbar;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "LanguageSelector");
__turbopack_context__.k.register(_c1, "Navbar");
__turbopack_context__.k.register(_c2, "AnimatedMenuIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/client-env.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Client-side environment variables
 * Only variables prefixed with NEXT_PUBLIC_ are available here
 */ // reCAPTCHA v2 Site Key (for checkbox CAPTCHA)
__turbopack_context__.s([
    "RECAPTCHA_V2_SITE_KEY",
    ()=>RECAPTCHA_V2_SITE_KEY,
    "RECAPTCHA_V3_SITE_KEY",
    ()=>RECAPTCHA_V3_SITE_KEY,
    "hasRecaptchaV2",
    ()=>hasRecaptchaV2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const RECAPTCHA_V2_SITE_KEY = ("TURBOPACK compile-time value", "your-recaptcha-v2-site-key") || "";
const RECAPTCHA_V3_SITE_KEY = ("TURBOPACK compile-time value", "your-recaptcha-v3-site-key") || "";
const hasRecaptchaV2 = Boolean(RECAPTCHA_V2_SITE_KEY);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/_components/layout/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FooterTailwind
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/i18n/routing.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useTranslation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$client$2d$env$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/client-env.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function FooterTailwind() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const [newsletterEmail, setNewsletterEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newsletterStatusKey, setNewsletterStatusKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const SITE_KEY = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$client$2d$env$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RECAPTCHA_V3_SITE_KEY"];
    const loadRecaptchaV3 = ()=>{
        return new Promise((resolve)=>{
            if (!SITE_KEY) {
                resolve(null);
                return;
            }
            if (typeof window.grecaptcha !== "undefined" && window.grecaptcha?.ready) {
                window.grecaptcha.ready(()=>resolve(window.grecaptcha));
                return;
            }
            const existing = document.getElementById("recaptcha-v3");
            if (existing) {
                existing.addEventListener("load", ()=>{
                    if (window.grecaptcha) {
                        window.grecaptcha.ready(()=>resolve(window.grecaptcha));
                    } else {
                        resolve(null);
                    }
                });
                existing.addEventListener("error", ()=>resolve(null));
                return;
            }
            const script = document.createElement("script");
            script.id = "recaptcha-v3";
            script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(SITE_KEY)}`;
            script.async = true;
            script.defer = true;
            script.onload = ()=>{
                if (window.grecaptcha) {
                    window.grecaptcha.ready(()=>resolve(window.grecaptcha));
                } else {
                    resolve(null);
                }
            };
            script.onerror = ()=>resolve(null);
            document.head.appendChild(script);
        });
    };
    const handleNewsletterSubmit = async (e)=>{
        e.preventDefault();
        if (!newsletterEmail.trim() || isSubmitting) return;
        setIsSubmitting(true);
        try {
            let recaptchaToken = "";
            try {
                const grecaptcha = await loadRecaptchaV3();
                if (grecaptcha && SITE_KEY) {
                    recaptchaToken = await grecaptcha.execute(SITE_KEY, {
                        action: "newsletter"
                    });
                }
            } catch  {
            // ignore
            }
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: newsletterEmail,
                    recaptchaToken
                })
            });
            const data = await response.json();
            if (data.ok) {
                setNewsletterStatusKey("footer.newsletterSuccess");
                setNewsletterEmail("");
            } else {
                setNewsletterStatusKey("footer.newsletterFailure");
            }
        } catch  {
            setNewsletterStatusKey("footer.newsletterNetwork");
        } finally{
            setIsSubmitting(false);
        }
        setTimeout(()=>setNewsletterStatusKey(""), 5000);
    };
    // Quick links removed for a cleaner footer design
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "border-orange relative z-10 mt-0 box-border w-full overflow-hidden border-t-4 bg-linear-to-b from-[#18191a] to-[#202124] py-6 text-left leading-[1.6] text-white shadow-[0_-8px_24px_rgba(0,0,0,0.35)] sm:py-8",
        role: "contentinfo",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-orange/5 absolute -top-16 -right-16 size-72 rounded-full blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/app/_components/layout/Footer.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-orange/3 absolute -bottom-20 -left-20 size-[350px] rounded-full blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/app/_components/layout/Footer.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-white/2 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/app/_components/layout/Footer.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/_components/layout/Footer.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto max-w-7xl p-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 items-baseline gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                                href: "/",
                                                prefetch: true,
                                                className: "group inline-flex items-center gap-1",
                                                "aria-label": "AmsirarTrip homepage",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-3xl font-bold tracking-tight text-white transition-transform duration-300 group-hover:scale-105",
                                                        children: "Amsirar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/_components/layout/Footer.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-orange font-fancy text-3xl transition-all duration-300 group-hover:text-amber-400",
                                                        children: "Trip"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/_components/layout/Footer.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                lineNumber: 136,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/layout/Footer.tsx",
                                            lineNumber: 135,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bg-orange mb-6 block h-1 w-12 rounded"
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/layout/Footer.tsx",
                                            lineNumber: 150,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-fancy text-xl leading-relaxed text-slate-400 sm:w-full lg:max-w-sm",
                                            children: t("footer.description")
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/layout/Footer.tsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/_components/layout/Footer.tsx",
                                    lineNumber: 134,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6 lg:col-span-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "mb-2 text-sm font-semibold tracking-wider text-white uppercase",
                                                children: t("footer.office")
                                            }, void 0, false, {
                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                lineNumber: 164,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-orange mb-6 block h-1 w-12 rounded"
                                            }, void 0, false, {
                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                lineNumber: 167,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("address", {
                                                className: "space-y-4 not-italic",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "group grid grid-cols-[36px_1fr] items-start gap-x-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-orange group-hover:bg-orange/10 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "size-4",
                                                                    fill: "none",
                                                                    viewBox: "0 0 24 24",
                                                                    stroke: "currentColor",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: 1.5,
                                                                            d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                            lineNumber: 177,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: 1.5,
                                                                            d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                            lineNumber: 183,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                    lineNumber: 171,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                lineNumber: 170,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "max-w-[270px] text-sm leading-relaxed text-slate-400",
                                                                children: "Imm. J appt N° 5, Résidence La Perle de l'Atlas, angle Rue aboubakr, Marrakech"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                lineNumber: 191,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/_components/layout/Footer.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "group grid grid-cols-[36px_1fr] items-center gap-x-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-orange group-hover:bg-orange/10 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "size-4",
                                                                    fill: "none",
                                                                    viewBox: "0 0 24 24",
                                                                    stroke: "currentColor",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 1.5,
                                                                        d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                        lineNumber: 205,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                    lineNumber: 199,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                lineNumber: 198,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "mailto:amsirare@gmail.com",
                                                                className: "hover:text-orange text-sm text-slate-400 transition-colors duration-300",
                                                                children: "amsirare@gmail.com"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                lineNumber: 213,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/_components/layout/Footer.tsx",
                                                        lineNumber: 197,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "group grid grid-cols-[36px_1fr] items-center gap-x-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-orange group-hover:bg-orange/10 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "size-4",
                                                                    fill: "none",
                                                                    viewBox: "0 0 24 24",
                                                                    stroke: "currentColor",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                            x: "7",
                                                                            y: "2",
                                                                            width: "10",
                                                                            height: "20",
                                                                            rx: "2",
                                                                            ry: "2",
                                                                            strokeWidth: 1.5
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                            lineNumber: 229,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: 1.5,
                                                                            d: "M11 18h2"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                            lineNumber: 238,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                    lineNumber: 223,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                lineNumber: 222,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "tel:+212661173144",
                                                                className: "hover:text-orange text-sm text-slate-400 transition-colors duration-300",
                                                                children: "+212 (0) 6 61 17 31 44"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                lineNumber: 246,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/_components/layout/Footer.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "group grid grid-cols-[36px_1fr] items-center gap-x-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-orange group-hover:bg-orange/10 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "size-4",
                                                                    fill: "none",
                                                                    viewBox: "0 0 24 24",
                                                                    stroke: "currentColor",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 1.5,
                                                                        d: "M3 5a2 2 0 012-2h2.5a1 1 0 01.9.56l1.2 2.4a1 1 0 01-.2 1.08L7.7 9.9a8 8 0 004.6 4.6l1.86-1.72a1 1 0 011.08-.2l2.4 1.2a1 1 0 01.56.9V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                        lineNumber: 262,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                    lineNumber: 256,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                lineNumber: 255,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "tel:+21205661731444",
                                                                className: "hover:text-orange text-sm text-slate-400 transition-colors duration-300",
                                                                children: "+212 (0) 5 6 61 73 14 44"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                lineNumber: 270,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/_components/layout/Footer.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/_components/layout/Footer.tsx",
                                        lineNumber: 163,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/_components/layout/Footer.tsx",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:col-span-2 lg:col-span-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "mb-2 text-sm font-semibold tracking-wider text-white uppercase",
                                            children: t("footer.newsletter")
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/layout/Footer.tsx",
                                            lineNumber: 285,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bg-orange mb-6 block h-1 w-12 rounded"
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/layout/Footer.tsx",
                                            lineNumber: 288,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 p-4 backdrop-blur-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mb-4 text-sm leading-relaxed text-slate-400",
                                                    children: "Subscribe to get exclusive offers and travel tips"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/_components/layout/Footer.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                    onSubmit: handleNewsletterSubmit,
                                                    "aria-label": t("footer.newsletterAria"),
                                                    className: "flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative flex-1",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "email",
                                                                name: "email",
                                                                placeholder: t("footer.newsletterPlaceholder"),
                                                                value: newsletterEmail,
                                                                onChange: (e)=>setNewsletterEmail(e.target.value),
                                                                required: true,
                                                                "aria-label": t("footer.newsletterInputAria"),
                                                                autoComplete: "email",
                                                                className: "focus:border-orange/50 focus:ring-orange/20 h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white transition-all duration-300 placeholder:text-slate-500 focus:ring-2 focus:outline-none"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                lineNumber: 300,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/_components/layout/Footer.tsx",
                                                            lineNumber: 299,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "submit",
                                                            disabled: isSubmitting,
                                                            "aria-label": t("footer.newsletterButtonAria"),
                                                            className: "from-orange hover:shadow-orange/30 flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-r to-amber-500 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100",
                                                            children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "size-4 animate-spin",
                                                                fill: "none",
                                                                viewBox: "0 0 24 24",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                        className: "opacity-25",
                                                                        cx: "12",
                                                                        cy: "12",
                                                                        r: "10",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                        lineNumber: 324,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        className: "opacity-75",
                                                                        fill: "currentColor",
                                                                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                        lineNumber: 332,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                lineNumber: 319,
                                                                columnNumber: 23
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "size-4",
                                                                fill: "none",
                                                                viewBox: "0 0 24 24",
                                                                stroke: "currentColor",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M14 5l7 7m0 0l-7 7m7-7H3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                    lineNumber: 345,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                lineNumber: 339,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/_components/layout/Footer.tsx",
                                                            lineNumber: 312,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/_components/layout/Footer.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 17
                                                }, this),
                                                newsletterStatusKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: `mt-3 text-xs font-medium ${newsletterStatusKey.includes("Success") ? "text-emerald-400" : "text-orange"}`,
                                                    children: t(newsletterStatusKey)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/_components/layout/Footer.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                                    "aria-label": t("footer.socialAria"),
                                                    className: "mt-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap items-center justify-start gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "https://www.facebook.com/profile.php?id=61571322141368",
                                                                "aria-label": t("footer.social.facebook"),
                                                                className: "inline-flex size-10 items-center justify-center rounded-full bg-white text-center transition-[transform_0.12s_ease,box-shadow_0.12s_ease] hover:-translate-y-1 hover:shadow-[0_8px_18px_rgba(0,0,0,0.28)] sm:size-11",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "fab fa-facebook-f text-base text-[#111] sm:text-lg"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                    lineNumber: 375,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                lineNumber: 370,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "#",
                                                                "aria-label": t("footer.social.twitter"),
                                                                className: "inline-flex size-10 items-center justify-center rounded-full bg-white text-center transition-[transform_0.12s_ease,box-shadow_0.12s_ease] hover:-translate-y-1 hover:shadow-[0_8px_18px_rgba(0,0,0,0.28)] sm:size-11",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "fab fa-x-twitter text-base text-[#111] sm:text-lg"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                    lineNumber: 383,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                lineNumber: 378,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "https://www.instagram.com/amsirar.trip?igsh=ZDlxanNsbTA5M2Zi",
                                                                "aria-label": t("footer.social.instagram"),
                                                                className: "inline-flex size-10 items-center justify-center rounded-full bg-white text-center transition-[transform_0.12s_ease,box-shadow_0.12s_ease] hover:-translate-y-1 hover:shadow-[0_8px_18px_rgba(0,0,0,0.28)] sm:size-11",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "fab fa-instagram text-base text-[#111] sm:text-lg"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                    lineNumber: 390,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                lineNumber: 385,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "https://www.tiktok.com/@amsirartrip",
                                                                "aria-label": t("footer.social.tiktok"),
                                                                className: "inline-flex size-10 items-center justify-center rounded-full bg-white text-center transition-[transform_0.12s_ease,box-shadow_0.12s_ease] hover:-translate-y-1 hover:shadow-[0_8px_18px_rgba(0,0,0,0.28)] sm:size-11",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "fab fa-tiktok text-base text-[#111] sm:text-lg"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                    lineNumber: 397,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                                                lineNumber: 392,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/_components/layout/Footer.tsx",
                                                        lineNumber: 369,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/_components/layout/Footer.tsx",
                                                    lineNumber: 368,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/_components/layout/Footer.tsx",
                                            lineNumber: 290,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/_components/layout/Footer.tsx",
                                    lineNumber: 283,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/_components/layout/Footer.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/_components/layout/Footer.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-white/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-7xl p-4 px-4 sm:px-6 lg:px-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center justify-center gap-4 sm:flex-row",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-center text-sm text-slate-500",
                                    children: t("footer.copyright")
                                }, void 0, false, {
                                    fileName: "[project]/app/_components/layout/Footer.tsx",
                                    lineNumber: 410,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/_components/layout/Footer.tsx",
                                lineNumber: 409,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/_components/layout/Footer.tsx",
                            lineNumber: 408,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/_components/layout/Footer.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/_components/layout/Footer.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/_components/layout/Footer.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
_s(FooterTailwind, "XuMHu900z5JzfkMW4m497b/ca3o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = FooterTailwind;
var _c;
__turbopack_context__.k.register(_c, "FooterTailwind");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/_components/layout/Loader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/i18n/routing.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const Loader = ({ fullscreen = true, autoHide = true, duration = 800 })=>{
    _s();
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // Show loader on initial load and hide after duration
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Loader.useEffect": ()=>{
            // Prevent scrolling while loader is visible
            document.body.style.overflow = "hidden";
            if (autoHide) {
                const timer = setTimeout({
                    "Loader.useEffect.timer": ()=>{
                        setShow(false);
                        document.body.style.overflow = "";
                    }
                }["Loader.useEffect.timer"], duration);
                return ({
                    "Loader.useEffect": ()=>{
                        clearTimeout(timer);
                        document.body.style.overflow = "";
                    }
                })["Loader.useEffect"];
            }
            return ({
                "Loader.useEffect": ()=>{
                    document.body.style.overflow = "";
                }
            })["Loader.useEffect"];
        }
    }["Loader.useEffect"], [
        autoHide,
        duration
    ]);
    // Show loader when pathname changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Loader.useEffect": ()=>{
            // Use a microtask to defer the setState call and avoid synchronous state updates
            Promise.resolve().then({
                "Loader.useEffect": ()=>setShow(true)
            }["Loader.useEffect"]);
            document.body.style.overflow = "hidden";
            const timer = setTimeout({
                "Loader.useEffect.timer": ()=>{
                    setShow(false);
                    document.body.style.overflow = "";
                }
            }["Loader.useEffect.timer"], duration);
            return ({
                "Loader.useEffect": ()=>{
                    clearTimeout(timer);
                    document.body.style.overflow = "";
                }
            })["Loader.useEffect"];
        }
    }["Loader.useEffect"], [
        pathname,
        duration
    ]);
    if (!show) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "ftco-loader",
        className: `show ${fullscreen ? "fullscreen" : ""}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "circular",
            width: "48px",
            height: "48px",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    className: "path-bg",
                    cx: "24",
                    cy: "24",
                    r: "22",
                    fill: "none",
                    strokeWidth: "4",
                    stroke: "#e2e8f0"
                }, void 0, false, {
                    fileName: "[project]/app/_components/layout/Loader.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    className: "path",
                    cx: "24",
                    cy: "24",
                    r: "22",
                    fill: "none",
                    strokeWidth: "4",
                    strokeMiterlimit: "10",
                    stroke: "#e54a1f"
                }, void 0, false, {
                    fileName: "[project]/app/_components/layout/Loader.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/app/_components/layout/Loader.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/_components/layout/Loader.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Loader, "EoPi17txxNFM7leYc3a5jFuqArY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Loader;
const __TURBOPACK__default__export__ = Loader;
var _c;
__turbopack_context__.k.register(_c, "Loader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/_components/layout/NavigationProgress.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NavigationProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/i18n/routing.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function NavigationProgress() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Reset loading when pathname changes (navigation complete)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavigationProgress.useEffect": ()=>{
            // Use microtasks to defer setState calls and avoid synchronous state updates
            Promise.resolve().then({
                "NavigationProgress.useEffect": ()=>{
                    setLoading(false);
                    setProgress(100);
                }
            }["NavigationProgress.useEffect"]);
            const timer = setTimeout({
                "NavigationProgress.useEffect.timer": ()=>{
                    setProgress(0);
                }
            }["NavigationProgress.useEffect.timer"], 300);
            return ({
                "NavigationProgress.useEffect": ()=>clearTimeout(timer)
            })["NavigationProgress.useEffect"];
        }
    }["NavigationProgress.useEffect"], [
        pathname
    ]);
    // Intercept all link clicks BEFORE Next.js navigation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavigationProgress.useEffect": ()=>{
            const handleClick = {
                "NavigationProgress.useEffect.handleClick": (e)=>{
                    const target = e.target;
                    const link = target.closest("a");
                    // Check if it's a navigation link (not external, mailto, tel, or hash)
                    if (link?.href) {
                        const href = link.href;
                        const currentOrigin = window.location.origin;
                        const isExternal = !href.startsWith(currentOrigin);
                        const isSpecial = href.startsWith("mailto:") || href.startsWith("tel:") || href.includes("#");
                        const isSamePage = href === window.location.href;
                        // Start loading for internal navigation links
                        if (!isExternal && !isSpecial && !isSamePage) {
                            setLoading(true);
                            setProgress(10);
                        }
                    }
                }
            }["NavigationProgress.useEffect.handleClick"];
            // Use capture phase to catch click before Next.js
            document.addEventListener("click", handleClick, {
                capture: true
            });
            return ({
                "NavigationProgress.useEffect": ()=>document.removeEventListener("click", handleClick, {
                        capture: true
                    })
            })["NavigationProgress.useEffect"];
        }
    }["NavigationProgress.useEffect"], []);
    // Animate progress
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavigationProgress.useEffect": ()=>{
            if (!loading) return;
            const interval = setInterval({
                "NavigationProgress.useEffect.interval": ()=>{
                    setProgress({
                        "NavigationProgress.useEffect.interval": (prev)=>{
                            if (prev >= 90) return prev;
                            return prev + Math.random() * 10;
                        }
                    }["NavigationProgress.useEffect.interval"]);
                }
            }["NavigationProgress.useEffect.interval"], 200);
            return ({
                "NavigationProgress.useEffect": ()=>clearInterval(interval)
            })["NavigationProgress.useEffect"];
        }
    }["NavigationProgress.useEffect"], [
        loading
    ]);
    if (!loading) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-0 right-0 left-0 z-50 h-1 bg-slate-200",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-orange h-full transition-all duration-200 ease-out",
            style: {
                width: `${progress}%`
            }
        }, void 0, false, {
            fileName: "[project]/app/_components/layout/NavigationProgress.tsx",
            lineNumber: 73,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/_components/layout/NavigationProgress.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_s(NavigationProgress, "T6wjvpaRuYSzezRdrOXrdNqQ+6U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = NavigationProgress;
var _c;
__turbopack_context__.k.register(_c, "NavigationProgress");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/_components/ErrorBoundary.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorBoundary",
    ()=>ErrorBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
;
class ErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"] {
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    componentDidCatch(error, errorInfo) {
        // Log error to console in development
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    // In production, you could send this to an error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
    }
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            // Production mode: Show generic error message
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            // Development mode: Show detailed error information
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-h-screen items-center justify-center bg-gray-50 px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "h-8 w-8 text-amber-600",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                }, void 0, false, {
                                    fileName: "[project]/app/_components/ErrorBoundary.tsx",
                                    lineNumber: 59,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/_components/ErrorBoundary.tsx",
                                lineNumber: 53,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/_components/ErrorBoundary.tsx",
                            lineNumber: 52,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mb-2 text-xl font-semibold text-gray-900",
                            children: "Development Error"
                        }, void 0, false, {
                            fileName: "[project]/app/_components/ErrorBoundary.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-4 text-gray-600",
                            children: "A component error occurred during development. Check the console for details."
                        }, void 0, false, {
                            fileName: "[project]/app/_components/ErrorBoundary.tsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>window.location.reload(),
                            className: "rounded-lg bg-orange-500 px-6 py-2 font-medium text-white transition-colors hover:bg-orange-600",
                            children: "Reload Page"
                        }, void 0, false, {
                            fileName: "[project]/app/_components/ErrorBoundary.tsx",
                            lineNumber: 74,
                            columnNumber: 13
                        }, this),
                        this.state.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                            className: "mt-4 text-left",
                            open: true,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                    className: "mb-2 cursor-pointer text-sm font-semibold text-gray-700",
                                    children: "Error Details"
                                }, void 0, false, {
                                    fileName: "[project]/app/_components/ErrorBoundary.tsx",
                                    lineNumber: 82,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                    className: "mt-2 max-h-96 overflow-auto rounded bg-gray-100 p-3 text-xs",
                                    children: [
                                        this.state.error.message,
                                        "\n\n",
                                        this.state.error.stack
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/_components/ErrorBoundary.tsx",
                                    lineNumber: 85,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/_components/ErrorBoundary.tsx",
                            lineNumber: 81,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/_components/ErrorBoundary.tsx",
                    lineNumber: 51,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/_components/ErrorBoundary.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, this);
        }
        return this.props.children;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_51c9ffa0._.js.map