import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { env } from "@/lib/env";
import {
  withErrorHandling,
  createErrorResponse,
  createSuccessResponse,
  checkRateLimit,
  logApiRequest,
  logSuspiciousActivity,
} from "@/lib/api-utils";
import { NewsletterSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  return withErrorHandling(async () => {
    // Rate limiting by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateLimit = checkRateLimit(ip, 5, 60000); // Stricter limit for newsletter

    if (!rateLimit.allowed) {
      if (rateLimit.blocked) {
        logSuspiciousActivity(ip, "BLOCKED_REQUEST", "/api/newsletter");
      }
      logApiRequest(
        "POST",
        "/api/newsletter",
        429,
        Date.now() - startTime,
        rateLimit.blocked ? "IP blocked" : "Rate limit exceeded"
      );
      return createErrorResponse(
        "Too many requests. Please try again later.",
        429,
        "RATE_LIMIT"
      );
    }

    const body = await request.json().catch(() => ({}));

    // Validate with Zod
    const validation = NewsletterSchema.safeParse(body);

    if (!validation.success) {
      const errorMessages = validation.error.issues
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");

      logApiRequest(
        "POST",
        "/api/newsletter",
        400,
        Date.now() - startTime,
        `Validation error: ${errorMessages}`
      );
      return createErrorResponse(
        "Invalid request. Please check your input.",
        400,
        "VALIDATION_ERROR",
        validation.error.flatten()
      );
    }

    const { email, recaptchaToken } = validation.data;

    // Verify CAPTCHA
    if (!(await verifyRecaptcha(recaptchaToken, request.nextUrl.hostname))) {
      logSuspiciousActivity(ip, "CAPTCHA_FAILED", "/api/newsletter");
      logApiRequest(
        "POST",
        "/api/newsletter",
        400,
        Date.now() - startTime,
        "CAPTCHA verification failed"
      );
      return createErrorResponse(
        "Security verification failed. Please try again.",
        400,
        "CAPTCHA_FAILED"
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.GMAIL_USER,
        pass: env.GMAIL_PASS,
      },
    });

    const mailTo = env.MAIL_TO || env.GMAIL_USER;

    const html = `
      <h2>New Newsletter Subscription</h2>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
    `;

    await transporter.sendMail({
      from: `Amsirar Trip Newsletter <${env.GMAIL_USER}>`,
      to: mailTo,
      replyTo: email,
      subject: `Newsletter Subscription: ${email}`,
      text: `New newsletter subscription: ${email}`,
      html,
    });

    logApiRequest("POST", "/api/newsletter", 200, Date.now() - startTime);
    return createSuccessResponse(
      { success: true }, // Don't expose messageId
      "Successfully subscribed to newsletter"
    );
  });
}

// Utility functions
function escapeHtml(str: string = ""): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function verifyRecaptcha(
  token: string,
  expectedHostname: string
): Promise<boolean> {
  try {
    if (!token || typeof token !== "string" || !env.RECAPTCHA_SECRET_KEY) {
      return false;
    }

    const body = new URLSearchParams({
      secret: env.RECAPTCHA_SECRET_KEY,
      response: token,
    });

    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("CAPTCHA API returned non-OK status:", response.status);
      return false;
    }

    const data = (await response.json()) as {
      success?: boolean;
      hostname?: string;
      challenge_ts?: string;
      "error-codes"?: string[];
    };

    if (data.success !== true) {
      if (data["error-codes"]?.length) {
        console.warn("CAPTCHA verification failed:", data["error-codes"]);
      }
      return false;
    }

    if (data.hostname) {
      const allowedHostnames = new Set([
        expectedHostname,
        `www.${expectedHostname}`,
        "localhost",
        "127.0.0.1",
      ]);

      if (!allowedHostnames.has(data.hostname)) {
        console.warn(
          `CAPTCHA hostname mismatch: expected ${expectedHostname}, got ${data.hostname}`
        );
        return false;
      }
    }

    const challengeTs = data.challenge_ts ? Date.parse(data.challenge_ts) : NaN;
    if (Number.isNaN(challengeTs) || Date.now() - challengeTs > 5 * 60 * 1000) {
      console.warn("CAPTCHA token is stale or missing challenge timestamp");
      return false;
    }

    return true;
  } catch (error) {
    console.error("CAPTCHA verification error:", error);
    return false;
  }
}
