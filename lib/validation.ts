/**
 * Client-side validation utilities
 */

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export const validators = {
  /**
   * Validate email format
   */
  email: (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },

  /**
   * Validate phone number (international format)
   */
  phone: (value: string): boolean => {
    // Accept various formats: +123456789, (123) 456-7890, 123-456-7890, etc.
    const phoneRegex =
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(value.replace(/\s/g, ""));
  },

  /**
   * Validate required field
   */
  required: (value: unknown): boolean => {
    if (typeof value === "string") {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  },

  /**
   * Validate minimum length
   */
  minLength: (value: string, min: number): boolean => {
    return value.trim().length >= min;
  },

  /**
   * Validate maximum length
   */
  maxLength: (value: string, max: number): boolean => {
    return value.trim().length <= max;
  },

  /**
   * Validate number range
   */
  numberRange: (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
  },

  /**
   * Validate date is not in the past
   */
  futureDate: (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  },
};

/**
 * Validate booking form data
 */
export function validateBookingForm(data: {
  fullName: string;
  email: string;
  phone: string;
  numberOfPeople: string;
  reservationDate: Date | null;
  message?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!validators.required(data.fullName)) {
    errors.fullName = "Full name is required";
  } else if (!validators.minLength(data.fullName, 2)) {
    errors.fullName = "Name must be at least 2 characters";
  }

  if (!validators.required(data.email)) {
    errors.email = "Email is required";
  } else if (!validators.email(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!validators.required(data.phone)) {
    errors.phone = "Phone number is required";
  } else if (!validators.phone(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  const persons = Number(data.numberOfPeople);
  if (!validators.required(data.numberOfPeople) || isNaN(persons)) {
    errors.numberOfPeople = "Number of people is required";
  } else if (!validators.numberRange(persons, 1, 50)) {
    errors.numberOfPeople = "Number of people must be between 1 and 50";
  }

  if (!data.reservationDate) {
    errors.reservationDate = "Reservation date is required";
  } else if (!validators.futureDate(data.reservationDate)) {
    errors.reservationDate = "Date must be today or in the future";
  }

  if (data.message && !validators.maxLength(data.message, 1000)) {
    errors.message = "Message must be less than 1000 characters";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate contact form data
 */
export function validateContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!validators.required(data.name)) {
    errors.name = "Name is required";
  } else if (!validators.minLength(data.name, 2)) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!validators.required(data.email)) {
    errors.email = "Email is required";
  } else if (!validators.email(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!validators.required(data.phone)) {
    errors.phone = "Phone number is required";
  } else if (!validators.phone(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!validators.required(data.message)) {
    errors.message = "Message is required";
  } else if (!validators.minLength(data.message, 10)) {
    errors.message = "Message must be at least 10 characters";
  } else if (!validators.maxLength(data.message, 1000)) {
    errors.message = "Message must be less than 1000 characters";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets
    .slice(0, 1000); // Limit length
}
