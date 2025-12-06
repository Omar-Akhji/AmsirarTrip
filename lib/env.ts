/**
 * Environment variable validation
 * Ensures all required env vars are present at build/runtime
 */

type RequiredEnv = "GMAIL_USER" | "GMAIL_PASS" | "RECAPTCHA_SECRET_KEY";
type OptionalEnv = "MAIL_TO" | "NEXT_PUBLIC_RECAPTCHA_SITE_KEY";

/**
 * Get a required environment variable
 * Throws if not found
 */
export function getEnv(key: RequiredEnv): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  return value;
}

/**
 * Get an optional environment variable with fallback
 */
export function getOptionalEnv(
  key: OptionalEnv,
  fallback: string = ""
): string {
  return process.env[key] || fallback;
}

/**
 * Validate environment on server startup
 * Only runs on server-side
 */
// Validate validation function is no longer called at top level
// if (typeof window === "undefined") {
//   validateEnv();
// }

export const env = {
  get GMAIL_USER() {
    return getEnv("GMAIL_USER");
  },
  get GMAIL_PASS() {
    return getEnv("GMAIL_PASS");
  },
  get RECAPTCHA_SECRET_KEY() {
    return getEnv("RECAPTCHA_SECRET_KEY");
  },
  get MAIL_TO() {
    return getOptionalEnv("MAIL_TO");
  },
  get NEXT_PUBLIC_RECAPTCHA_SITE_KEY() {
    const key = getOptionalEnv("NEXT_PUBLIC_RECAPTCHA_SITE_KEY");
    if (!key && typeof window !== "undefined") {
      console.warn("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing!");
    }
    return key;
  },
} as const;
