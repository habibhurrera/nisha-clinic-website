/**
 * usePatientReviews.ts
 * ─────────────────────────────────────────────────────────────
 * Fetches approved patient reviews from /api/reviews (Supabase).
 *
 * HOW THE DOCTOR APPROVES A REVIEW:
 * • Go to /admin and log in.
 * • Click "Approve" on a pending review → it appears on the website.
 */

import { useState, useEffect } from "react";

export interface PatientReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  message: string;
}

interface UsePatientReviewsResult {
  reviews: PatientReview[];
  loading: boolean;
  error: string | null;
}

export function usePatientReviews(): UsePatientReviewsResult {
  const [reviews, setReviews] = useState<PatientReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/reviews", { signal: controller.signal, cache: "no-store" });
        if (!res.ok) throw new Error(`Reviews fetch failed: ${res.status}`);
        const { reviews: data } = (await res.json()) as { reviews: PatientReview[] };
        setReviews(data);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error("[usePatientReviews]", err);
        setError("Could not load reviews at this time.");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return { reviews, loading, error };
}
