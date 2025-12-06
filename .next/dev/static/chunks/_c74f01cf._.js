(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/constants/routes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ROUTES",
    ()=>ROUTES
]);
const ROUTES = {
    HOME: "/",
    TOURS: "/tours",
    EXCURSION: "/excursions",
    TOUR_1: "/tours/1",
    TOUR_2: "/tours/2",
    TOUR_3: "/tours/3",
    TOUR_4: "/tours/4",
    TOUR_5: "/tours/5",
    TOUR_6: "/tours/6",
    EXCURSION_1: "/excursions/ouzoud-waterfalls-day-trip",
    EXCURSION_2: "/excursions/essaouira-coastal-escape",
    EXCURSION_3: "/excursions/imlil-toubkal-adventure",
    EXCURSION_4: "/excursions/ourika-valley-discovery",
    EXCURSION_5: "/excursions/agafay-desert-sunset",
    EXCURSION_6: "/excursions/sunrise-hot-air-balloon",
    ABOUT: "/about",
    CONTACT: "/contact"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/_components/sections/ExcursionsView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExcursionView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/i18n/routing.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useTranslation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants/routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const EXCURSION_DATA = [
    {
        id: 1,
        image: "/images/Excursions/Ouzoud Waterfalls.webp",
        titleKey: "excursion.list.ouzoud.title",
        altKey: "excursion.list.ouzoud.alt",
        descriptionKey: "excursion.list.ouzoud.description",
        taglineKey: "excursion.list.ouzoud.tagline",
        durationKey: "excursion.list.ouzoud.duration",
        route: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].EXCURSION_1
    },
    {
        id: 2,
        image: "/images/Excursions/Essaouira.webp",
        titleKey: "excursion.list.essaouira.title",
        altKey: "excursion.list.essaouira.alt",
        descriptionKey: "excursion.list.essaouira.description",
        taglineKey: "excursion.list.essaouira.tagline",
        durationKey: "excursion.list.essaouira.duration",
        route: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].EXCURSION_2
    },
    {
        id: 3,
        image: "/images/Excursions/Imlil & Toubkal.webp",
        titleKey: "excursion.list.imlil.title",
        altKey: "excursion.list.imlil.alt",
        descriptionKey: "excursion.list.imlil.description",
        taglineKey: "excursion.list.imlil.tagline",
        durationKey: "excursion.list.imlil.duration",
        route: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].EXCURSION_3
    },
    {
        id: 4,
        image: "/images/Excursions/Ourika Valley.webp",
        titleKey: "excursion.list.ourika.title",
        altKey: "excursion.list.ourika.alt",
        descriptionKey: "excursion.list.ourika.description",
        taglineKey: "excursion.list.ourika.tagline",
        durationKey: "excursion.list.ourika.duration",
        route: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].EXCURSION_4
    },
    {
        id: 5,
        image: "/images/Excursions/Agafay.webp",
        titleKey: "excursion.list.agafay.title",
        altKey: "excursion.list.agafay.alt",
        descriptionKey: "excursion.list.agafay.description",
        taglineKey: "excursion.list.agafay.tagline",
        durationKey: "excursion.list.agafay.duration",
        route: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].EXCURSION_5
    },
    {
        id: 6,
        image: "/images/Excursions/Hot Air Balloon Ride.webp",
        titleKey: "excursion.list.balloon.title",
        altKey: "excursion.list.balloon.alt",
        descriptionKey: "excursion.list.balloon.description",
        taglineKey: "excursion.list.balloon.tagline",
        durationKey: "excursion.list.balloon.duration",
        route: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].EXCURSION_6
    }
];
function ExcursionView() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const highlightStats = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "ExcursionView.useMemo[highlightStats]": ()=>[
                {
                    id: "routes",
                    value: "6+",
                    label: t("excursion.stats.routes", "Signature excursions"),
                    description: t("excursion.stats.routesDesc", "Handpicked day trips from waterfalls to desert sunsets.")
                },
                {
                    id: "local",
                    value: "100%",
                    label: t("excursion.stats.local", "Local expertise"),
                    description: t("excursion.stats.localDesc", "Guided by Marrakech-based storytellers and drivers.")
                },
                {
                    id: "support",
                    value: "24/7",
                    label: t("excursion.stats.support", "On-trip support"),
                    description: t("excursion.stats.supportDesc", "Flexible departures and concierge-style planning.")
                }
            ]
    }["ExcursionView.useMemo[highlightStats]"], [
        t
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "relative isolate overflow-hidden bg-slate-950 text-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.35),transparent_65%)]",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 z-10 bg-linear-to-br from-slate-900/80 via-slate-900/60 to-slate-900 opacity-80",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 z-10 bg-linear-to-br from-black/60 via-black/20 to-transparent",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-20 mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-24 text-center lg:flex-row lg:items-center lg:py-28 lg:text-left",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "contact-hero-content flex-1 space-y-6 pt-6 text-center lg:pt-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl font-semibold tracking-[0.2em] text-orange-200 uppercase sm:text-5xl",
                                    children: t("excursion.title")
                                }, void 0, false, {
                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-slate-200 lg:text-xl",
                                    children: t("excursion.headerSubtitle")
                                }, void 0, false, {
                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://www.tripadvisor.de/Attraction_Review-g293734-d32584739-Reviews-Amsirar_Travel-Marrakech_Marrakech_Safi.html",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20",
                                            children: "Offers on TripAdvisor"
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 132,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#excursions-grid",
                                            className: "inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: t("excursion.detailsTitle")
                                                }, void 0, false, {
                                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowIcon, {
                                                    className: "size-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "text-slate-900",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "py-12",
                        "aria-labelledby": "excursion-highlights",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-7xl px-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto mb-10 max-w-3xl text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold tracking-[0.45em] text-orange-500 uppercase",
                                            children: t("excursion.blog.smTitle")
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 156,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            id: "excursion-highlights",
                                            className: "mt-4 text-3xl leading-tight font-bold md:text-4xl",
                                            children: t("excursion.detailsTitle")
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 159,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-3 text-base text-slate-600",
                                            children: t("excursion.detailsSubtitle")
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 165,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                    lineNumber: 155,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-6 md:grid-cols-3",
                                    children: highlightStats.map((stat, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].article, {
                                            initial: {
                                                opacity: 0,
                                                y: 30
                                            },
                                            whileInView: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            viewport: {
                                                once: true,
                                                amount: 0.2
                                            },
                                            transition: {
                                                duration: 0.5,
                                                delay: idx * 0.1
                                            },
                                            className: "rounded-3xl border border-orange-100 bg-white px-6 py-6 shadow-lg shadow-orange-100/70",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-4xl font-bold text-orange-600",
                                                    children: stat.value
                                                }, void 0, false, {
                                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "mt-3 text-lg font-semibold text-slate-900",
                                                    children: stat.label
                                                }, void 0, false, {
                                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-sm text-slate-600",
                                                    children: stat.description
                                                }, void 0, false, {
                                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, stat.id, true, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 172,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "excursions-grid",
                        className: "border-t border-slate-200 bg-linear-to-b from-slate-50 to-white py-16",
                        "aria-labelledby": "excursion-grid-heading",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-7xl px-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-12 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold tracking-[0.45em] text-orange-500 uppercase",
                                            children: t("excursion.blog.smTitle")
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 202,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            id: "excursion-grid-heading",
                                            className: "mt-4 text-3xl leading-tight font-bold md:text-4xl",
                                            children: t("excursion.blog.lgTitle")
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 205,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-3 text-base text-slate-600",
                                            children: t("excursion.sectionSubtitle")
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 211,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                    lineNumber: 201,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-8 min-[901px]:grid-cols-2 min-[1150px]:grid-cols-3",
                                    children: EXCURSION_DATA.map((excursion, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].article, {
                                            initial: {
                                                opacity: 0,
                                                scale: 0.95
                                            },
                                            whileInView: {
                                                opacity: 1,
                                                scale: 1
                                            },
                                            viewport: {
                                                once: true,
                                                amount: 0.2
                                            },
                                            transition: {
                                                duration: 0.5,
                                                delay: idx * 0.1
                                            },
                                            className: "group relative mb-8 block h-[470px] cursor-pointer overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "thumbnail relative h-[400px] overflow-hidden rounded-t-3xl bg-black",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            src: excursion.image,
                                                            alt: t(excursion.altKey),
                                                            fill: true,
                                                            sizes: "(max-width: 900px) 100vw, (max-width: 1149px) 50vw, 33vw",
                                                            priority: idx < 2,
                                                            className: "block w-[120%] transform object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-60"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                            lineNumber: 227,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.3em] text-orange-200 uppercase backdrop-blur-sm",
                                                            children: t("excursion.card.category")
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                            lineNumber: 236,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "post-content absolute bottom-0 box-border min-h-50 w-full rounded-b-3xl bg-white p-[30px] pb-24 transition-all duration-500 ease-out",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "m-0 mb-2 text-[1.3rem] leading-[1.2] font-bold tracking-[0.5px] text-orange-600",
                                                            children: t(excursion.titleKey)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                            lineNumber: 242,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "m-0 pb-1 text-xs font-medium tracking-[0.5px] text-orange-400 normal-case",
                                                            children: t(excursion.taglineKey)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                            lineNumber: 246,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "description max-h-0 overflow-hidden text-sm leading-[1.8em] text-gray-600 opacity-0 transition-[max-height,opacity] duration-500 ease-out group-hover:max-h-[6em] group-hover:opacity-100",
                                                            children: t(excursion.descriptionKey)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                            lineNumber: 250,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "post-meta absolute bottom-6 left-1/2 flex -translate-x-1/2 transform items-center justify-center text-orange-600",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                                                href: excursion.route,
                                                                className: "inline-flex transform items-center rounded-[20px] border border-orange-600 bg-transparent px-4 py-2 font-medium text-orange-600 no-underline transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-orange-50 hover:shadow-lg hover:shadow-orange-500/30",
                                                                children: t("excursion.exploreLink")
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                                lineNumber: 255,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                    lineNumber: 241,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, excursion.id, true, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 218,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                    lineNumber: 216,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                            lineNumber: 200,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(ExcursionView, "+wVOhAg4Ybn7hHCfWbn71By0h6k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = ExcursionView;
function ArrowIcon(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 12h14"
            }, void 0, false, {
                fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                lineNumber: 285,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M13 6l6 6-6 6"
            }, void 0, false, {
                fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                lineNumber: 286,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
        lineNumber: 275,
        columnNumber: 5
    }, this);
}
_c1 = ArrowIcon;
var _c, _c1;
__turbopack_context__.k.register(_c, "ExcursionView");
__turbopack_context__.k.register(_c1, "ArrowIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_c74f01cf._.js.map