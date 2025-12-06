/**
 * Environment variable validation
 * Ensures all required env vars are present at build/runtime
 */

const requiredEnvVars = [
  "GMAIL_USER",
  "GMAIL_PASS",
  "RECAPTCHA_SECRET_KEY",
] as const;

type RequiredEnv = (typeof requiredEnvVars)[number];
type OptionalEnv = "MAIL_TO" | "NEXT_PUBLIC_RECAPTCHA_SITE_KEY";

function validateEnv() {
  const missing: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}\n` +
        `Please check your .env.local file.`
    );
  }
}

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
if (typeof window === "undefined") {
  validateEnv();
}

export const env = {
  GMAIL_USER: getEnv("GMAIL_USER"),
  GMAIL_PASS: getEnv("GMAIL_PASS"),
  RECAPTCHA_SECRET_KEY: getEnv("RECAPTCHA_SECRET_KEY"),
  MAIL_TO: getOptionalEnv("MAIL_TO"),
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: getOptionalEnv(
    "NEXT_PUBLIC_RECAPTCHA_SITE_KEY"
  ),
} as const;
