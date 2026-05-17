// Dynamically imported below-the-fold components for reduced initial JS bundle
import dynamic from "next/dynamic";
import HomeHero from "./HomeHero";
import HomeStats from "./HomeStats";

const FeaturedTours = dynamic(() => import("./FeaturedTours"));
const ServicesSection = dynamic(() => import("./ServicesSection"));
const TestimonialsSection = dynamic(() => import("./TestimonialsSection"));
const VideoSection = dynamic(() => import("./VideoSection"));

export default function HomeView() {
  return (
    <>
      {/* Hero with background slider */}
      <HomeHero />

      {/* Main content area */}
      <main className="text-zinc-900">
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
