"use server";

import { BookingSchema } from "@/lib/schemas";
import { submitBooking } from "@/lib/api-client";
import type { BookingPayload } from "@/lib/api-client";

export interface BookingFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

/**
 * Server action for booking form submission using React 19's useActionState
 * @param prevState - Previous state from useActionState
 * @param formData - FormData from the form submission
 */
export async function submitBookingAction(
  _prevState: BookingFormState | null,
  formData: FormData
): Promise<BookingFormState> {
  try {
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
    const validationResult = BookingSchema.safeParse(rawData);

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

    // Prepare payload
    const payload: BookingPayload = {
      reservationType: validationResult.data.reservationType,
      fullName: validationResult.data.fullName,
      email: validationResult.data.email,
      phone: validationResult.data.phone,
      persons: validationResult.data.persons,
      date: validationResult.data.date,
      message: validationResult.data.message,
      language: validationResult.data.language,
      duration: validationResult.data.duration,
      recaptchaToken: validationResult.data.recaptchaToken,
    };

    // Submit to API
    const result = await submitBooking(payload);

    if (result.ok) {
      return {
        success: true,
        message: "Your booking request has been sent successfully!",
      };
    } else {
      return {
        success: false,
        message: result.error || "Failed to submit booking. Please try again.",
      };
    }
  } catch (error) {
    console.error("Booking form submission error:", error);

    // Handle specific error types
    if (error instanceof Error && error.message.includes("429")) {
      return {
        success: false,
        message: "Too many requests. Please try again in a minute.",
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
    };
  }
}
