import { z } from "zod";

// Helper for sanitization (we'll use this in the transform)
import DOMPurify from "isomorphic-dompurify";

const sanitize = (val: string) => DOMPurify.sanitize(val.trim());

// --- Shared Schemas ---

const phoneRegex =
  /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;

export const RecaptchaSchema = z.object({
  recaptchaToken: z.string().min(1, "Recaptcha token is required"),
});

// --- Contact Schema ---

export const ContactSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .transform(sanitize),
    email: z.string().email("Invalid email address").transform(sanitize),
    phone: z
      .string()
      .regex(phoneRegex, "Invalid phone number")
      .max(20, "Phone number too long")
      .transform(sanitize),
    message: z
      .string()
      .min(10, "Message must be at least 10 characters")
      .max(1000, "Message too long")
      .transform(sanitize),
  })
  .merge(RecaptchaSchema);

export type ContactRequest = z.infer<typeof ContactSchema>;

// --- Newsletter Schema ---

export const NewsletterSchema = z
  .object({
    email: z.string().email("Invalid email address").transform(sanitize),
  })
  .merge(RecaptchaSchema);

export type NewsletterRequest = z.infer<typeof NewsletterSchema>;

// --- Booking Schema ---

export const BookingSchema = z
  .object({
    reservationType: z
      .string()
      .min(1, "Reservation type is required")
      .transform(sanitize),
    fullName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .transform(sanitize),
    email: z.string().email("Invalid email address").transform(sanitize),
    phone: z
      .string()
      .regex(phoneRegex, "Invalid phone number")
      .max(20, "Phone number too long")
      .transform(sanitize),
    persons: z.coerce
      .number()
      .int()
      .min(1, "At least 1 person required")
      .max(50, "Max 50 persons"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    message: z
      .string()
      .max(1000, "Message too long")
      .optional()
      .transform((val) => (val ? sanitize(val) : undefined)),
    language: z
      .string()
      .optional()
      .transform((val) => (val ? sanitize(val) : undefined)),
    duration: z.coerce.number().int().min(1).max(30).optional(),
  })
  .merge(RecaptchaSchema);

export type BookingRequest = z.infer<typeof BookingSchema>;
