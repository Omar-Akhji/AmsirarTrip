/**
 * Centralized Framer Motion animation variants for consistent animations.
 * Use with motion components: <motion.div {...fadeInUp}>
 */

/**
 * Fade in while sliding up - good for cards and content blocks
 */
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
};

/**
 * Fade in with small slide up - good for form fields
 */
export const fadeInUpSmall = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

/**
 * Fade in with larger slide up - good for emphasized content
 */
export const fadeInUpLarge = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

/**
 * Fade in with subtle scale - good for images and feature cards
 */
export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
};

/**
 * Fade in with more pronounced scale - good for stats and highlights
 */
export const fadeInScaleLarge = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4 },
};

/**
 * Slide in from left - good for alternating content layouts
 */
export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

/**
 * Slide in from left (larger) - good for page sections
 */
export const slideInLeftLarge = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

/**
 * Slide in from right - good for alternating content layouts
 */
export const slideInRight = {
  initial: { opacity: 0, x: 20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

/**
 * Slide in from right (larger) - good for page sections
 */
export const slideInRightLarge = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

/**
 * Create a staggered delay for list items
 * @param index - Item index in the list
 * @param baseDelay - Base delay before stagger starts (default: 0)
 * @param staggerAmount - Delay between each item (default: 0.1)
 */
export const staggerDelay = (
  index: number,
  baseDelay: number = 0,
  staggerAmount: number = 0.1
) => ({
  transition: { duration: 0.5, delay: baseDelay + index * staggerAmount },
});
