/**
 * Shared base types — single source of truth for common fields
 * Feature-specific types extend these via intersection (&)
 */

/**
 * Common fields shared by all bookable trip items (tours, excursions, activities).
 * Extend with feature-specific fields using intersection types:
 *
 * @example
 * type TourMetadata = BaseTripMetadata & { tourKey: string; durationDays: number };
 */
export interface BaseTripMetadata {
  slug: string;
  bookingId: number;
  image: string;
  duration: string;
  keywords: string[];
}
