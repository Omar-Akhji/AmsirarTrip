/**
 * Reusable loading components
 */

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = { sm: "size-4 border-2", md: "size-8 border-3", lg: "size-12 border-4" };

  return (
    <output
      className={`${sizeClasses[size]} animate-spin rounded-full border-orange-500 border-t-transparent`}
      aria-label="Loading"
    >
      <span className="sr-only">Loading…</span>
    </output>
  );
}
