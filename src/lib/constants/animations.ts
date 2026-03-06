/**
 * Centralized Framer Motion animation variants for consistent animations.
 * Use with motion components: <m.div {...fadeInUp}>
 */

/**
 * Global Viewport Settings for Performance
 *
 * @property once - PERFORMANCE CRITICAL: Animations only trigger once.
 *                  Prevents intersection observers from running on every scroll,
 *                  significantly reducing CPU usage.
 * @property amount - Element must be 20% visible to trigger.
 * @property margin - Pre-load margin (optional customization).
 */
const ANIMATION_VIEWPORT_SETTINGS = {
  once: true,
  amount: 0.05,
};

/**
 * Fade in while sliding up - good for cards and content blocks
 */
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: ANIMATION_VIEWPORT_SETTINGS,
  transition: { duration: 0.5 },
};

/**
 * Fade in with subtle scale - good for images and feature cards
 */
export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: ANIMATION_VIEWPORT_SETTINGS,
  transition: { duration: 0.5 },
};

/**
 * Slide in from left (larger) - good for page sections
 */
export const slideInLeftLarge = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: ANIMATION_VIEWPORT_SETTINGS,
  transition: { duration: 0.6 },
};

/**
 * Slide in from right (larger) - good for page sections
 */
export const slideInRightLarge = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: ANIMATION_VIEWPORT_SETTINGS,
  transition: { duration: 0.6 },
};

/**
 * Simple fade in - good for section wrappers and containers
 */
export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: ANIMATION_VIEWPORT_SETTINGS,
  transition: { duration: 0.5 },
};

/**
 * Slide in from bottom (subtle) - good for sidebar cards and smaller blocks
 */
export const slideInUpSmall = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: ANIMATION_VIEWPORT_SETTINGS,
  transition: { duration: 0.4 },
};
