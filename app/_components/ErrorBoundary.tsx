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

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // In production, you could send this to an error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      // Production mode: Show generic error message
      if (process.env.NODE_ENV === "production") {
        console.error("ErrorBoundary caught error:", this.state.error);
        // TEMPORARY DEBUGGING: Show error in production to diagnose issue
        return (
          <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 pt-20">
            <div className="w-full max-w-2xl rounded-lg border border-red-200 bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold text-red-600">
                Application Error
              </h2>
              <p className="mb-2 text-gray-700">
                An error occurred in the application:
              </p>
              <pre className="overflow-auto rounded border border-gray-300 bg-gray-100 p-4 text-sm text-red-800">
                {this.state.error?.message}
                {"\n"}
                {this.state.error?.stack}
              </pre>
            </div>
          </div>
        );
        // return null;
      }

      // Development mode: Show detailed error information
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <svg
                className="h-8 w-8 text-amber-600"
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
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Development Error
            </h2>
            <p className="mb-4 text-gray-600">
              A component error occurred during development. Check the console
              for details.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-orange-500 px-6 py-2 font-medium text-white transition-colors hover:bg-orange-600"
            >
              Reload Page
            </button>
            {this.state.error && (
              <details className="mt-4 text-left" open>
                <summary className="mb-2 cursor-pointer text-sm font-semibold text-gray-700">
                  Error Details
                </summary>
                <pre className="mt-2 max-h-96 overflow-auto rounded bg-gray-100 p-3 text-xs">
                  {this.state.error.message}
                  {"\n\n"}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
