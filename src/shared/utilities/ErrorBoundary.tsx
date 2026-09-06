"use client";

import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // In production, you could send this to an error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      // Production mode: Show generic error message
      if (process.env.NODE_ENV === "production") {
        console.error("ErrorBoundary caught error:", this.state.error);
        return null;
      }

      // Development mode: Show detailed error information
      return (
        <div className="flex items-center justify-center bg-neutral-50 px-4 min-block-screen">
          <div className="rounded-lg bg-white p-6 text-center shadow-lg inline-full max-inline-md">
            <div className="mx-auto mbe-4 flex items-center justify-center rounded-full bg-amber-100 block-16 inline-16">
              <svg
                className="text-amber-600 block-8 inline-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="mbe-2 text-xl font-semibold text-neutral-900">Development Error</h2>
            <p className="mbe-4 text-neutral-600">
              A component error occurred during development. Check the console for details.
            </p>
            <button
              onClick={() => globalThis.location.reload()}
              className="rounded-lg bg-orange-500 px-6 py-2 font-medium text-white transition-colors pointer-fine:hover:bg-orange-600"
            >
              Reload Page
            </button>
            {this.state.error && (
              <details
                className="group mbs-4 text-start"
                open
              >
                <summary className="mbe-2 cursor-pointer text-sm font-semibold text-neutral-700">
                  Error Details
                </summary>
                <div className="details-content group-open:animate-in group-open:fade-in group-open:duration-300">
                  <pre className="mbs-2 overflow-auto rounded bg-neutral-100 p-3 text-xs max-block-96">
                    {this.state.error.message}
                    {"\n\n"}
                    {this.state.error.stack}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
