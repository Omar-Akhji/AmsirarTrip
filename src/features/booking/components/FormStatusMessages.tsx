import { m, AnimatePresence } from "motion/react";

interface FormStatusMessagesProps {
  submitError?: string;
  success?: boolean;
  successMessage?: string;
}

export function FormStatusMessages({
  submitError,
  success,
  successMessage,
}: FormStatusMessagesProps) {
  return (
    <AnimatePresence mode="wait">
      {/* Error Summary */}
      {submitError && (
        <m.div
          key="error"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900"
        >
          <div className="flex items-start gap-2">
            <svg
              className="mt-0.5 h-5 w-5 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span>{submitError}</span>
          </div>
        </m.div>
      )}

      {/* Success Message */}
      {success && successMessage && (
        <m.div
          key="success"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          {successMessage}
        </m.div>
      )}
    </AnimatePresence>
  );
}
