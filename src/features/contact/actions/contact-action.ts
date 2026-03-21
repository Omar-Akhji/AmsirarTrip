"use server";

import { headers } from "next/headers";
import { ContactSchema } from "@/lib/schemas";
import { env } from "@/lib/env";
import { checkRateLimit, logSuspiciousActivity } from "@/lib/api-utils";
import { verifyRecaptcha, createMailer, escapeHtml } from "@/lib/server-utils";

export interface ContactFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

/**
 * Server action for contact form submission using React 19's useActionState
 */
export async function submitContactAction(
  _prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "unknown";

    const rateLimit = checkRateLimit(ip, 10, 60000);
    if (!rateLimit.allowed) {
      if (rateLimit.blocked) {
        logSuspiciousActivity(ip, "BLOCKED_ACTION", "contact-action");
      }
      return {
        success: false,
        message: "Too many requests. Please try again later.",
      };
    }

    // Extract form data
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      recaptchaToken: formData.get("recaptchaToken") as string,
    };

    // Validate using Zod schema
    const validationResult = ContactSchema.safeParse(rawData);

    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      validationResult.error.issues.forEach((err) => {
        const path = err.path[0] as string;
        errors[path] = err.message;
      });

      return {
        success: false,
        message: "Please check the form for errors",
        errors,
      };
    }

    const data = validationResult.data;
    const topic = formData.get("topic") as string;
    const messageContent = topic
      ? `${topic.trim()}\n\n${data.message}`
      : data.message;

    // Verify CAPTCHA
    const host = headersList.get("host")?.split(":")[0] || "";
    if (!(await verifyRecaptcha(data.recaptchaToken, host))) {
      logSuspiciousActivity(ip, "CAPTCHA_FAILED", "contact-action");
      return {
        success: false,
        message: "Security verification failed. Please try again.",
      };
    }

    const transporter = createMailer();
    const mailTo = env.MAIL_TO || env.GMAIL_USER;

    const html = `
      <h2>New Contact Message</h2>
      <p><strong>Name :</strong> ${escapeHtml(data.name)}</p>
      <p><strong>E-mail :</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone :</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Message :</strong><br>${escapeHtml(messageContent).replace(
        /\n/g,
        "<br>"
      )}</p>
    `;

    await transporter.sendMail({
      from: `Amsirar Trip Contact <${env.GMAIL_USER}>`,
      to: mailTo,
      replyTo: data.email,
      subject: `Contact from ${data.name}`,
      text: `Name : ${data.name}\nE-mail : ${data.email}\nPhone : ${data.phone}\nMessage : \n${messageContent}`,
      html,
    });

    return {
      success: true,
      message: "Message sent! We will reply within 24 hours.",
    };
  } catch (error) {
    console.error("Contact form submission error:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
    };
  }
}
