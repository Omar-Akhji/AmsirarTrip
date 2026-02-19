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
import { BookingSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  return withErrorHandling(async () => {
    // Rate limiting by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateLimit = checkRateLimit(ip, 10, 60000); // 10 requests per minute

    if (!rateLimit.allowed) {
      if (rateLimit.blocked) {
        logSuspiciousActivity(ip, "BLOCKED_REQUEST", "/api/booking");
      }
      logApiRequest(
        "POST",
        "/api/booking",
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
    const validation = BookingSchema.safeParse(body);

    if (!validation.success) {
      const errorMessages = validation.error.issues
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");

      logApiRequest(
        "POST",
        "/api/booking",
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

    const {
      reservationType,
      fullName,
      email,
      phone,
      persons,
      date,
      message,
      language,
      duration,
      recaptchaToken,
    } = validation.data;

    // Verify CAPTCHA
    if (!(await verifyRecaptcha(recaptchaToken, request.nextUrl.hostname))) {
      logSuspiciousActivity(ip, "CAPTCHA_FAILED", "/api/booking");
      logApiRequest(
        "POST",
        "/api/booking",
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
      <h2>New Booking Request</h2>
      <p><strong>Website display language :</strong> ${escapeHtml(
        getLanguageName(language)
      )}</p>
      <p><strong>Type of reservation :</strong> ${escapeHtml(
        cleanReservationType(reservationType)
      )}</p>
      <p><strong>Duration :</strong> ${escapeHtml(
        duration ? `${duration} days` : "Not specified"
      )}</p>
      <p><strong>Full Name :</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Phone Number :</strong> ${escapeHtml(phone)}</p>
      <p><strong>E-mail :</strong> ${escapeHtml(email)}</p>
      <p><strong>Date of reservation :</strong> ${escapeHtml(date)}</p>
      <p><strong>Number of people :</strong> ${escapeHtml(String(persons))}</p>
      ${
        message
          ? `<p><strong>Message :</strong><br>${escapeHtml(message).replace(
              /\n/g,
              "<br>"
            )}</p>`
          : ""
      }
    `;

    await transporter.sendMail({
      from: `Amsirar Trip Bookings <${env.GMAIL_USER}>`,
      to: mailTo,
      replyTo: email,
      subject: `Booking: ${fullName} (${cleanReservationType(
        reservationType
      )})`,
      text: `Website display language : ${getLanguageName(language)}
Type of reservation : ${cleanReservationType(reservationType)}
Duration : ${duration ? `${duration} days` : "Not specified"}
Full Name : ${fullName}
Phone Number : ${phone}
E-mail : ${email}
Date of reservation : ${date}
Number of people : ${persons}${message ? `\nMessage : ${message}` : ""}`,
      html,
    });

    logApiRequest("POST", "/api/booking", 200, Date.now() - startTime);
    return createSuccessResponse(
      { success: true }, // Don't expose messageId
      "Booking request sent successfully"
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

function getLanguageName(code: string = ""): string {
  const languages: Record<string, string> = {
    en: "English",
    fr: "Français",
    de: "Deutsch",
    es: "Español",
  };
  return languages[code] || code;
}

function cleanReservationType(type: string = ""): string {
  return type.replace(/^Tour\d+\s/, "");
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
