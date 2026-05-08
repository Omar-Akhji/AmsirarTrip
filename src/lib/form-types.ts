/**
 * Shared form state types and utilities for server actions
 * Single source of truth — used by contact, booking, and newsletter actions
 */

export interface FormState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

const GENERIC_ERROR = "An unexpected error occurred. Please try again.";

/**
 * Create a safe error response that never leaks internal details
 * Logs the real error server-side for debugging
 */
export function createErrorResponse(
  error: unknown,
  context: string,
): FormState {
  console.error(`${context} error:`, error);
  return { success: false, message: GENERIC_ERROR };
}
