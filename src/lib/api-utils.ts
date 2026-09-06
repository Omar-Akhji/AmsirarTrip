import { logSuspiciousActivity } from "./server-utils";

const rateLimitMap = new Map<string, { count: number; resetAt: number; violations: number }>();
const blockedIPs = new Map<string, number>(); // IP -> unblock timestamp

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60_000,
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
      blockedIPs.set(identifier, now + 3_600_000); // Block for 1 hour
      logSuspiciousActivity(
        identifier,
        "BLOCKED",
        `Blocked after ${record.violations} rate limit violations`,
      );
      return { allowed: false, remaining: 0, blocked: true };
    }

    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: maxRequests - record.count };
}

/**
 * Clean up old rate limit entries and expired blocked IPs periodically
 */
if (globalThis.window === undefined) {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetAt) {
        rateLimitMap.delete(key);
      }
    }
    for (const [key, expiry] of blockedIPs.entries()) {
      if (now > expiry) {
        blockedIPs.delete(key);
      }
    }
  }, 60_000); // Clean up every minute
}
