/**
 * Sanitize JSON-LD data for safe injection into HTML
 * Prevents XSS by escaping potentially dangerous characters
 */
export function sanitizeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
