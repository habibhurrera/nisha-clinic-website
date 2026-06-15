"use client";
import React from "react";

interface State { hasError: boolean }

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  State
> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="p-8 text-center font-sans text-neutral-500">
          Something went wrong. Please refresh the page.
        </div>
      );
    }
    return this.props.children;
  }
}
