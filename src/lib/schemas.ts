import { z } from "zod";

// Helper for sanitization (we'll use this in the transform)
import DOMPurify from "isomorphic-dompurify";

const sanitize = (val: string) => DOMPurify.sanitize(val.trim());

// --- Shared Schemas ---

const phoneRegex =
  /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;

const RecaptchaSchema = (t: (key: string) => string) => z.object({
  recaptchaToken: z.string().min(1, t("recaptchaRequired")),
});

// --- Contact Schema ---

export const getContactSchema = (t: (key: string) => string) => z
  .object({
    name: z
      .string()
      .min(2, t("nameMin"))
      .transform(sanitize),
    email: z.string().email(t("emailInvalid")).transform(sanitize),
    phone: z
      .string()
      .regex(phoneRegex, t("phoneInvalid"))
      .max(20, t("phoneTooLong"))
      .transform(sanitize),
    message: z
      .string()
      .min(10, t("messageMin"))
      .max(1000, t("messageTooLong"))
      .transform(sanitize),
  })
  .merge(RecaptchaSchema(t));

// --- Newsletter Schema ---

export const getNewsletterSchema = (t: (key: string) => string) => z
  .object({
    name: z
      .string()
      .min(2, t("nameMin"))
      .transform(sanitize),
    email: z.string().email(t("emailInvalid")).transform(sanitize),
  })
  .merge(RecaptchaSchema(t));

// --- Booking Schema ---

export const getBookingSchema = (t: (key: string) => string) => z
  .object({
    reservationType: z
      .string()
      .min(1, t("reservationRequired"))
      .transform(sanitize),
    fullName: z
      .string()
      .min(2, t("nameMin"))
      .transform(sanitize),
    email: z.string().email(t("emailInvalid")).transform(sanitize),
    phone: z
      .string()
      .regex(phoneRegex, t("phoneInvalid"))
      .max(20, t("phoneTooLong"))
      .transform(sanitize),
    persons: z.coerce
      .number()
      .int()
      .min(1, t("personsMin"))
      .max(50, t("personsMax")),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: t("invalidDate"),
    }),
    message: z
      .string()
      .max(1000, t("messageTooLong"))
      .optional()
      .transform((val) => (val ? sanitize(val) : undefined)),
    language: z
      .string()
      .optional()
      .transform((val) => (val ? sanitize(val) : undefined)),
    duration: z.coerce.number().int().min(1).max(30).optional(),
  })
  .merge(RecaptchaSchema(t));
