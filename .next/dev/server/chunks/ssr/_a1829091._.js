module.exports = [
"[project]/lib/constants/routes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ROUTES",
    ()=>ROUTES
]);
const ROUTES = {
    HOME: "/",
    TOURS: "/tours",
    EXCURSION: "/excursions",
    TOUR_1: "/tours/merzouga-desert-adventure-3-days",
    TOUR_2: "/tours/coast-and-cities-explorer-6-days",
    TOUR_3: "/tours/caravan-and-kasbah-experience-3-days",
    TOUR_4: "/tours/imperial-cities-and-coastline-5-days",
    TOUR_5: "/tours/grand-moroccan-circuit-10-days",
    TOUR_6: "/tours/atlas-and-desert-escape-4-days",
    TOUR_7: "/tours/coastal-and-desert-odyssey-4-days",
    TOUR_8: "/tours/chegaga-wilderness-expedition-3-days",
    TOUR_9: "/tours/northern-heritage-trail-7-days",
    EXCURSION_1: "/excursions/ouzoud-waterfalls-day-trip",
    EXCURSION_2: "/excursions/essaouira-coastal-escape",
    EXCURSION_3: "/excursions/imlil-toubkal-adventure",
    EXCURSION_4: "/excursions/ourika-valley-discovery",
    EXCURSION_5: "/excursions/agafay-desert-sunset",
    EXCURSION_6: "/excursions/sunrise-hot-air-balloon",
    ABOUT: "/about",
    CONTACT: "/contact"
};
}),
"[project]/lib/constants/excursionsData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EXCURSIONS_DATA",
    ()=>EXCURSIONS_DATA
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants/routes.ts [app-ssr] (ecmascript)");
;
const EXCURSIONS_DATA = [
    {
        id: 1,
        image: "/images/Excursions/Ouzoud Waterfalls.webp",
        title: "excursion.list.ouzoud.title",
        alt: "excursion.list.ouzoud.alt",
        description: "excursion.list.ouzoud.description",
        tagline: "excursion.list.ouzoud.tagline",
        duration: "excursion.list.ouzoud.duration",
        route: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].EXCURSION_1
    },
    {
        id: 2,
        image: "/images/Excursions/Essaouira.webp",
        title: "excursion.list.essaouira.title",
        alt: "excursion.list.essaouira.alt",
        description: "excursion.list.essaouira.description",
        tagline: "excursion.list.essaouira.tagline",
        duration: "excursion.list.essaouira.duration",
        route: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].EXCURSION_2
    },
    {
        id: 3,
        image: "/images/Excursions/Imlil & Toubkal.webp",
        title: "excursion.list.imlil.title",
        alt: "excursion.list.imlil.alt",
        description: "excursion.list.imlil.description",
        tagline: "excursion.list.imlil.tagline",
        duration: "excursion.list.imlil.duration",
        route: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].EXCURSION_3
    },
    {
        id: 4,
        image: "/images/Excursions/Ourika Valley.webp",
        title: "excursion.list.ourika.title",
        alt: "excursion.list.ourika.alt",
        description: "excursion.list.ourika.description",
        tagline: "excursion.list.ourika.tagline",
        duration: "excursion.list.ourika.duration",
        route: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].EXCURSION_4
    },
    {
        id: 5,
        image: "/images/Excursions/Agafay.webp",
        title: "excursion.list.agafay.title",
        alt: "excursion.list.agafay.alt",
        description: "excursion.list.agafay.description",
        tagline: "excursion.list.agafay.tagline",
        duration: "excursion.list.agafay.duration",
        route: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].EXCURSION_5
    },
    {
        id: 6,
        image: "/images/Excursions/Hot Air Balloon Ride.webp",
        title: "excursion.list.balloon.title",
        alt: "excursion.list.balloon.alt",
        description: "excursion.list.balloon.description",
        tagline: "excursion.list.balloon.tagline",
        duration: "excursion.list.balloon.duration",
        route: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].EXCURSION_6
    }
];
}),
"[project]/app/_components/sections/ExcursionsView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExcursionView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/i18n/routing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useTranslation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$excursionsData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants/excursionsData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function ExcursionView() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
    const highlightStats = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>[
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
        ], [
        t
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "relative isolate overflow-hidden bg-slate-950 text-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.35),transparent_65%)]",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 z-10 bg-linear-to-br from-slate-900/80 via-slate-900/60 to-slate-900 opacity-80",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 z-10 bg-linear-to-br from-black/60 via-black/20 to-transparent",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-20 mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-24 text-center lg:flex-row lg:items-center lg:py-28 lg:text-left",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "contact-hero-content flex-1 space-y-6 pt-6 text-center lg:pt-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl font-semibold tracking-[0.2em] text-orange-200 uppercase sm:text-5xl",
                                    children: t("excursion.title")
                                }, void 0, false, {
                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-slate-200 lg:text-xl",
                                    children: t("excursion.headerSubtitle")
                                }, void 0, false, {
                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://www.tripadvisor.de/Attraction_Review-g293734-d32584739-Reviews-Amsirar_Travel-Marrakech_Marrakech_Safi.html",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20",
                                            children: "Offers on TripAdvisor"
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 69,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#excursions-grid",
                                            className: "inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: t("excursion.detailsTitle")
                                                }, void 0, false, {
                                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowIcon, {
                                                    className: "size-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 77,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "text-slate-900",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "py-12",
                        "aria-labelledby": "excursion-highlights",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-7xl px-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto mb-10 max-w-3xl text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold tracking-[0.45em] text-orange-500 uppercase",
                                            children: t("excursion.blog.smTitle")
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            id: "excursion-highlights",
                                            className: "mt-4 text-3xl leading-tight font-bold md:text-4xl",
                                            children: t("excursion.detailsTitle")
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 96,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-3 text-base text-slate-600",
                                            children: t("excursion.detailsSubtitle")
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 102,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-6 md:grid-cols-3",
                                    children: highlightStats.map((stat, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].article, {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-4xl font-bold text-orange-600",
                                                    children: stat.value
                                                }, void 0, false, {
                                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "mt-3 text-lg font-semibold text-slate-900",
                                                    children: stat.label
                                                }, void 0, false, {
                                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-sm text-slate-600",
                                                    children: stat.description
                                                }, void 0, false, {
                                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                    lineNumber: 123,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, stat.id, true, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 109,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "excursions-grid",
                        className: "border-t border-slate-200 bg-linear-to-b from-slate-50 to-white py-16",
                        "aria-labelledby": "excursion-grid-heading",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-7xl px-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-12 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold tracking-[0.45em] text-orange-500 uppercase",
                                            children: t("excursion.blog.smTitle")
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 139,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            id: "excursion-grid-heading",
                                            className: "mt-4 text-3xl leading-tight font-bold md:text-4xl",
                                            children: t("excursion.blog.lgTitle")
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 142,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-3 text-base text-slate-600",
                                            children: t("excursion.sectionSubtitle")
                                        }, void 0, false, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                    lineNumber: 138,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-8 min-[901px]:grid-cols-2 min-[1150px]:grid-cols-3",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$excursionsData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EXCURSIONS_DATA"].map((excursion, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].article, {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "thumbnail relative h-[400px] overflow-hidden rounded-t-3xl bg-black",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            src: excursion.image,
                                                            alt: t(excursion.alt),
                                                            fill: true,
                                                            sizes: "(max-width: 900px) 100vw, (max-width: 1149px) 50vw, 33vw",
                                                            priority: idx < 2,
                                                            className: "block w-[120%] transform object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-60"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                            lineNumber: 164,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.3em] text-orange-200 uppercase backdrop-blur-sm",
                                                            children: t("excursion.card.category")
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                            lineNumber: 173,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "post-content absolute bottom-0 box-border min-h-50 w-full rounded-b-3xl bg-white p-[30px] pb-24 transition-all duration-500 ease-out",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "m-0 mb-2 text-[1.3rem] leading-[1.2] font-bold tracking-[0.5px] text-orange-600",
                                                            children: t(excursion.title)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                            lineNumber: 179,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "m-0 pb-1 text-xs font-medium tracking-[0.5px] text-orange-400 normal-case",
                                                            children: t(excursion.tagline)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                            lineNumber: 183,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "description max-h-0 overflow-hidden text-sm leading-[1.8em] text-gray-600 opacity-0 transition-[max-height,opacity] duration-500 ease-out group-hover:max-h-[6em] group-hover:opacity-100",
                                                            children: t(excursion.description)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                            lineNumber: 187,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "post-meta absolute bottom-6 left-1/2 flex -translate-x-1/2 transform items-center justify-center text-orange-600",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Link"], {
                                                                href: excursion.route,
                                                                className: "inline-flex transform items-center rounded-[20px] border border-orange-600 bg-transparent px-4 py-2 font-medium text-orange-600 no-underline transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-orange-50 hover:shadow-lg hover:shadow-orange-500/30",
                                                                children: t("excursion.exploreLink")
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                                lineNumber: 192,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                            lineNumber: 191,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, excursion.id, true, {
                                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                            lineNumber: 155,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
function ArrowIcon(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 12h14"
            }, void 0, false, {
                fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                lineNumber: 222,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M13 6l6 6-6 6"
            }, void 0, false, {
                fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/_components/sections/ExcursionsView.tsx",
        lineNumber: 212,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_a1829091._.js.map