/**
 * Client-side environment variables
 * Only variables prefixed with NEXT_PUBLIC_ are available here
 */

// reCAPTCHA v2 Site Key (for checkbox CAPTCHA)
export const RECAPTCHA_V2_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  "6LdibCMsAAAAAEs4tGP69c05XHL_G35zjtMpbI7I";

// reCAPTCHA v3 Site Key (for invisible CAPTCHA)
export const RECAPTCHA_V3_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY || "";

// Helper to check if reCAPTCHA v2 is configured
export const hasRecaptchaV2 = Boolean(RECAPTCHA_V2_SITE_KEY);
