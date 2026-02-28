"use client";

import HomeHero from "./HomeHero";
import HomeStats from "./HomeStats";

// Dynamically imported below-the-fold components for reduced initial JS bundle
import dynamic from "next/dynamic";

const FeaturedTours = dynamic(() => import("./FeaturedTours"), {
  loading: () => (
    <section className="min-h-250 w-full animate-pulse bg-gray-100 lg:min-h-175" />
  ),
});
const ServicesSection = dynamic(() => import("./ServicesSection"), {
  loading: () => (
    <section className="min-h-300 w-full animate-pulse bg-slate-800 lg:min-h-150" />
  ),
});
const TestimonialsSection = dynamic(() => import("./TestimonialsSection"), {
  loading: () => (
    <section className="min-h-200 w-full animate-pulse bg-gray-50 lg:min-h-125" />
  ),
});
const VideoSection = dynamic(() => import("./VideoSection"), {
  loading: () => (
    <section className="min-h-250 w-full animate-pulse bg-slate-900 lg:min-h-150" />
  ),
});

export default function HomeView() {
  return (
    <>
      {/* Hero with background slider */}
      <HomeHero />

      {/* Main content area */}
      <main className="text-slate-900">
        {/* Stats Section - Below Hero (like tours/excursions pages) */}
        <HomeStats />

        <FeaturedTours />
        <ServicesSection />
        <TestimonialsSection />
        <VideoSection />
      </main>
    </>
  );
}
