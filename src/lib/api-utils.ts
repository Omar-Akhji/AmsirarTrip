import DOMPurify from "isomorphic-dompurify";

/**
 * API utilities for error handling, logging, and response formatting
 */

export interface ApiError {
  ok: false;
  error: string;
  code?: string;
  details?: unknown;
}

export interface ApiSuccess<T = unknown> {
  ok: true;
  data?: T;
  message?: string;
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;

/**
 * Create a standardized error response
 */
export function createErrorResponse(
  error: string,
  status: number = 500,
  code?: string,
  details?: unknown
): Response {
  const response: ApiError = { ok: false, error, code, details };
  return Response.json(response, { status });
}

/**
 * Create a standardized success response
 */
export function createSuccessResponse<T>(
  data?: T,
  message?: string,
  status: number = 200
): Response {
  const response: ApiSuccess<T> = { ok: true, data, message };
  return Response.json(response, { status });
}

/**
 * Safe async handler that catches errors
 */
export function withErrorHandling(
  handler: () => Promise<Response>
): Promise<Response> {
  return handler().catch((error) => {
    console.error("API Error:", error);

    // Don't expose internal error messages in production
    const message =
      process.env.NODE_ENV === "development"
        ? error.message || "Internal server error"
        : "Internal server error";

    return createErrorResponse(message, 500, "INTERNAL_ERROR");
  });
}

/**
 * Rate limiting helper (simple in-memory implementation)
 * For production, use Redis or a proper rate limiting service
 */
const rateLimitMap = new Map<
  string,
  { count: number; resetAt: number; violations: number }
>();
const blockedIPs = new Map<string, number>(); // IP -> unblock timestamp

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; blocked?: boolean } {
  const now = Date.now();

  // Check if IP is blocked
  const blockExpiry = blockedIPs.get(identifier);
  if (blockExpiry && now < blockExpiry) {
    return { allowed: false, remaining: 0, blocked: true };
  } else if (blockExpiry) {
    blockedIPs.delete(identifier);
  }

  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
      violations: record?.violations || 0,
    });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    record.violations++;

    // Block IP after 3 violations (30 attempts in short time)
    if (record.violations >= 3) {
      blockedIPs.set(identifier, now + 3600000); // Block for 1 hour
      logSuspiciousActivity(
        identifier,
        "BLOCKED",
        `Blocked after ${record.violations} rate limit violations`
      );
      return { allowed: false, remaining: 0, blocked: true };
    }

    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: maxRequests - record.count };
}

/**
 * Clean up old rate limit entries periodically
 */
if (typeof window === "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }, 60000); // Clean up every minute
}

/**
 * Log API request for monitoring
 */
export function logApiRequest(
  method: string,
  path: string,
  status: number,
  duration: number,
  error?: string
) {
  const timestamp = new Date().toISOString();
  const logLevel = status >= 500 ? "ERROR" : status >= 400 ? "WARN" : "INFO";

  console.log(
    `[${logLevel}] ${timestamp} ${method} ${path} ${status} ${duration}ms${
      error ? ` - ${error}` : ""
    }`
  );
}

/**
 * Log suspicious activity for security monitoring
 */
export function logSuspiciousActivity(
  ip: string,
  type: string,
  details: string
) {
  const timestamp = new Date().toISOString();
  console.warn(
    `[SECURITY] ${timestamp} IP: ${ip} Type: ${type} Details: ${details}`
  );
  // In production, send to Sentry or security monitoring service
}

/**
 * Sanitize string input to prevent XSS and injection attacks
 * Uses DOMPurify for robust sanitization
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== "string") return "";
  return DOMPurify.sanitize(input.trim());
}
