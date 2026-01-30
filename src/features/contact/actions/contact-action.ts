"use server";

import { ContactSchema } from "@/lib/schemas";
import { submitContact } from "@/lib/api-client";
import type { ContactPayload } from "@/lib/api-client";

export interface ContactFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

/**
 * Server action for contact form submission using React 19's useActionState
 * @param prevState - Previous state from useActionState
 * @param formData - FormData from the form submission
 */
export async function submitContactAction(
  _prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  try {
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
      // Convert Zod errors to record format
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

    // Prepare payload with topic handling
    const topic = formData.get("topic") as string;
    const payload: ContactPayload = {
      name: validationResult.data.name,
      email: validationResult.data.email,
      phone: validationResult.data.phone,
      message: topic
        ? `${topic.trim()}\n\n${validationResult.data.message}`
        : validationResult.data.message,
      recaptchaToken: validationResult.data.recaptchaToken,
    };

    // Submit to API
    const result = await submitContact(payload);

    if (result.ok) {
      return {
        success: true,
        message: "Message sent! We will reply within 24 hours.",
      };
    } else {
      return {
        success: false,
        message: result.error || "Failed to send message. Please try again.",
      };
    }
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
