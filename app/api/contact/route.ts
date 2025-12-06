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
import { ContactSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  return withErrorHandling(async () => {
    // Rate limiting by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateLimit = checkRateLimit(ip, 10, 60000);

    if (!rateLimit.allowed) {
      if (rateLimit.blocked) {
        logSuspiciousActivity(ip, "BLOCKED_REQUEST", "/api/contact");
      }
      logApiRequest(
        "POST",
        "/api/contact",
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
    const validation = ContactSchema.safeParse(body);

    if (!validation.success) {
      const errorMessages = validation.error.issues
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");

      logApiRequest(
        "POST",
        "/api/contact",
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

    const { name, email, phone, message, recaptchaToken } = validation.data;

    // Verify CAPTCHA
    if (!(await verifyRecaptcha(recaptchaToken))) {
      logSuspiciousActivity(ip, "CAPTCHA_FAILED", "/api/contact");
      logApiRequest(
        "POST",
        "/api/contact",
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
      <h2>New Contact Message</h2>
      <p><strong>Name :</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail :</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone :</strong> ${escapeHtml(phone)}</p>
      <p><strong>Message :</strong><br>${escapeHtml(message).replace(
        /\n/g,
        "<br>"
      )}</p>
    `;

    await transporter.sendMail({
      from: `AmsirarTrip Contact <${env.GMAIL_USER}>`,
      to: mailTo,
      replyTo: email,
      subject: `Contact from ${name}`,
      text: `Name : ${name}\nE-mail : ${email}\nPhone : ${phone}\nMessage : ${message}`,
      html,
    });

    logApiRequest("POST", "/api/contact", 200, Date.now() - startTime);
    return createSuccessResponse(
      { success: true }, // Don't expose messageId
      "Contact message sent successfully"
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

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(
        env.RECAPTCHA_SECRET_KEY
      )}&response=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    if (!response.ok) {
      console.error("CAPTCHA API returned non-OK status:", response.status);
      return false;
    }

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("CAPTCHA verification error:", error);
    return false;
  }
}
