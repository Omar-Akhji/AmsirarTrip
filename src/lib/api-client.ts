/**
 * API client with retry logic and better error handling
 */

export interface ApiClientOptions {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch with timeout
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number }
): Promise<Response> {
  const { timeout = 30000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError("Request timeout", 408, "TIMEOUT");
    }
    throw error;
  }
}

/**
 * API client with automatic retry logic
 */
export async function apiClient<T = unknown>(
  url: string,
  options: RequestInit & ApiClientOptions = {}
): Promise<T> {
  const {
    retries = 3,
    retryDelay = 1000,
    timeout = 30000,
    ...fetchOptions
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, {
        ...fetchOptions,
        timeout,
        headers: {
          "Content-Type": "application/json",
          ...fetchOptions.headers,
        },
      });

      // Parse response
      const data = await response.json().catch(() => ({}));

      // Handle error responses
      if (!response.ok) {
        const errorMessage =
          data.error || data.message || `HTTP ${response.status}`;
        throw new ApiError(
          errorMessage,
          response.status,
          data.code,
          data.details
        );
      }

      return data as T;
    } catch (error) {
      lastError = error as Error;

      // Don't retry on client errors (4xx) or non-retryable errors
      if (error instanceof ApiError) {
        if (error.status >= 400 && error.status < 500 && error.status !== 408) {
          throw error;
        }
      }

      // Don't retry on last attempt
      if (attempt === retries) {
        break;
      }

      // Wait before retrying with exponential backoff
      const delay = retryDelay * Math.pow(2, attempt);
      await sleep(delay);
    }
  }

  // If we get here, all retries failed
  throw lastError || new ApiError("Request failed", 500, "UNKNOWN_ERROR");
}

/**
 * Typed API calls for booking
 */
export interface BookingPayload {
  reservationType: string;
  fullName: string;
  email: string;
  phone: string;
  persons: number;
  date: string;
  message?: string;
  language?: string;
  duration?: number;
  recaptchaToken: string;
}

export interface BookingResponse {
  ok: boolean;
  id?: string;
  error?: string;
}

export async function submitBooking(
  payload: BookingPayload
): Promise<BookingResponse> {
  return apiClient<BookingResponse>("/api/booking", {
    method: "POST",
    body: JSON.stringify(payload),
    retries: 2, // Only retry twice for mutations
  });
}

/**
 * Typed API calls for contact
 */
export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  recaptchaToken: string;
}

export interface ContactResponse {
  ok: boolean;
  id?: string;
  error?: string;
}

export async function submitContact(
  payload: ContactPayload
): Promise<ContactResponse> {
  return apiClient<ContactResponse>("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
    retries: 2,
  });
}
