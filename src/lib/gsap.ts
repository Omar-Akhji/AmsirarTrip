import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Centralized GSAP configuration for the application.
 * Ensures plugins are registered only once and provides a consistent entry point.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Optional: Set default scroll trigger configurations
  ScrollTrigger.config({ limitCallbacks: true });
}

export * from "gsap";
export { gsap };
