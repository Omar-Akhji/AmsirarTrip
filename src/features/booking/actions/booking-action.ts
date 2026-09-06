"use server";

import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { checkRateLimit } from "@/lib/api-utils";
import { env } from "@/lib/env";
import { createErrorResponse, type FormState } from "@/lib/form-types";
import { getBookingSchema } from "@/lib/schemas";
import {
  createMailer,
  escapeHtml,
  logSuspiciousActivity,
  verifyRecaptcha,
} from "@/lib/server-utils";

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

/**
 * Server action for booking form submission using React 19's useActionState
 */
export async function submitBookingAction(
  _prevState: FormState | null,
  formData: FormData,
): Promise<FormState> {
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim()
      || headersList.get("x-real-ip")
      || "unknown";

    // Honeypot check — hidden field filled only by bots
    const honeypot = formData.get("website") as string;
    if (honeypot) {
      logSuspiciousActivity(ip, "HONEYPOT_TRIGGERED", "booking-action");
      return { success: true, message: "Booking request sent!" };
    }

    const rateLimit = checkRateLimit(ip, 10, 60_000);
    if (!rateLimit.allowed) {
      if (rateLimit.blocked) {
        logSuspiciousActivity(ip, "BLOCKED_ACTION", "booking-action");
      }
      return { success: false, message: "Too many requests. Please try again later." };
    }

    // Extract form data
    const rawData = {
      reservationType: formData.get("reservationType") as string,
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      persons: formData.get("numberOfPeople"),
      date: formData.get("reservationDate") as string,
      message: formData.get("message") as string,
      language: formData.get("language") as string,
      duration: formData.get("duration"),
      recaptchaToken: formData.get("recaptchaToken") as string,
    };

    // Validate using Zod schema
    const t = await getTranslations("validations");
    const validationResult = getBookingSchema(t).safeParse(rawData);

    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      for (const err of validationResult.error.issues) {
        const path = err.path[0] as string;
        errors[path] = err.message;
      }

      return { success: false, message: "Please check the form for errors", errors };
    }

    const data = validationResult.data;

    // Verify CAPTCHA
    const host = headersList.get("host")?.split(":")[0] || "";
    if (!(await verifyRecaptcha(data.recaptchaToken, host))) {
      logSuspiciousActivity(ip, "CAPTCHA_FAILED", "booking-action");
      return { success: false, message: "Security verification failed. Please try again." };
    }

    const transporter = createMailer();
    const mailTo = env.MAIL_TO || env.GMAIL_USER;

    const html = `
      <h2>New Booking Request</h2>
      <p><strong>Website display language :</strong> ${escapeHtml(
        getLanguageName(data.language),
      )}</p>
      <p><strong>Type of reservation :</strong> ${escapeHtml(
        cleanReservationType(data.reservationType),
      )}</p>
      <p><strong>Duration :</strong> ${escapeHtml(
        data.duration ? `${data.duration} days` : "Not specified",
      )}</p>
      <p><strong>Full Name :</strong> ${escapeHtml(data.fullName)}</p>
      <p><strong>Phone Number :</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>E-mail :</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Date of reservation :</strong> ${escapeHtml(data.date)}</p>
      <p><strong>Number of people :</strong> ${escapeHtml(String(data.persons))}</p>
      ${
        data.message ?
          `<p><strong>Message :</strong><br>${escapeHtml(data.message).replaceAll("\n", "<br>")}</p>`
        : ""
      }
    `;

    await transporter.sendMail({
      from: `Amsirar Trip Bookings <${env.GMAIL_USER}>`,
      to: mailTo,
      replyTo: data.email,
      subject: `Booking: ${data.fullName} (${cleanReservationType(data.reservationType)})`,
      text: `Website display language : ${getLanguageName(data.language)}
Type of reservation : ${cleanReservationType(data.reservationType)}
Duration : ${data.duration ? `${data.duration} days` : "Not specified"}
Full Name : ${data.fullName}
Phone Number : ${data.phone}
E-mail : ${data.email}
Date of reservation : ${data.date}
Number of people : ${data.persons}${data.message ? `\nMessage : ${data.message}` : ""}`,
      html,
    });

    return { success: true, message: "Your booking request has been sent successfully!" };
  } catch (error) {
    return createErrorResponse(error, "Booking form submission");
  }
}
