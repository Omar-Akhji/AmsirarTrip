"use server";

import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { getNewsletterSchema } from "@/lib/schemas";
import { env } from "@/lib/env";
import { checkRateLimit, logSuspiciousActivity } from "@/lib/api-utils";
import { verifyRecaptcha, createMailer, escapeHtml } from "@/lib/server-utils";

export async function submitNewsletterAction(
  name: string,
  email: string,
  recaptchaToken: string
): Promise<{ ok: boolean; statusKey: string }> {
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "unknown";

    const rateLimit = checkRateLimit(ip, 5, 60000);
    if (!rateLimit.allowed) {
      if (rateLimit.blocked) {
        logSuspiciousActivity(ip, "BLOCKED_ACTION", "newsletter-action");
      }
      return { ok: false, statusKey: "footer.newsletterNetwork" };
    }

    const t = await getTranslations("validations");
    const validationResult = getNewsletterSchema(t).safeParse({
      name,
      email,
      recaptchaToken,
    });

    if (!validationResult.success) {
      return { ok: false, statusKey: "footer.newsletterFailure" };
    }

    const data = validationResult.data;

    const host = headersList.get("host")?.split(":")[0] || "";
    if (!(await verifyRecaptcha(data.recaptchaToken, host))) {
      logSuspiciousActivity(ip, "CAPTCHA_FAILED", "newsletter-action");
      return { ok: false, statusKey: "footer.newsletterCaptchaError" };
    }

    const transporter = createMailer();
    const mailTo = env.MAIL_TO || env.GMAIL_USER;

    const html = `
      <h2>New Newsletter Subscription</h2>
      <p><strong>Name :</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(data.email)}</p>
    `;

    await transporter.sendMail({
      from: `Amsirar Trip Newsletter <${env.GMAIL_USER}>`,
      to: mailTo,
      replyTo: data.email,
      subject: `Newsletter Subscription: ${escapeHtml(data.name)} (${data.email})`,
      text: `New newsletter subscription:\nName: ${data.name}\nEmail: ${data.email}`,
      html,
    });

    return { ok: true, statusKey: "footer.newsletterSuccess" };
  } catch (error) {
    console.error("Newsletter submission error:", error);
    return { ok: false, statusKey: "footer.newsletterFailure" };
  }
}
