/**
 * usePatientReviews.ts
 * ─────────────────────────────────────────────────────────────
 * Fetches approved patient reviews from a published Google Sheet CSV.
 *
 * EXPECTED SHEET COLUMNS (row 1 = headers):
 *   Timestamp | Name | Location | Rating | Message | Approved
 *
 * HOW THE DOCTOR APPROVES A REVIEW:
 * • Open the linked Google Sheet.
 * • Find the review row.
 * • In the "Approved" column type:  Yes  → appears on website
 *                                    No   → hidden
 */

import { useState, useEffect, useRef } from "react";

// ─── ✏️  YOUR PUBLISHED GOOGLE SHEET CSV URL ───────────────────────────────
const GOOGLE_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRiXQcYV7o4a2IzZ4DDr0xnSiSZeL8iurDtvGoevBenY8j4RppRhVlSJ5zxJXhk3BYQ6n0KVB_qq7RY/pub?gid=987016597&single=true&output=csv";
// ───────────────────────────────────────────────────────────────────────────

const CACHE_TTL_MS = 10 * 1000; // 5 minutes

export interface PatientReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  message: string;
}

interface CacheEntry {
  data: PatientReview[];
  fetchedAt: number;
}

let cache: CacheEntry | null = null;

function parseCsv(csv: string): PatientReview[] {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

  const nameIdx     = headers.indexOf("name");
  const locationIdx = headers.indexOf("location");
  const ratingIdx   = headers.indexOf("rating");
  const messageIdx  = headers.indexOf("message");
  const approvedIdx = headers.indexOf("approved");

  if ([nameIdx, ratingIdx, messageIdx, approvedIdx].includes(-1)) {
    console.warn("[usePatientReviews] Missing expected columns in Google Sheet.");
    return [];
  }

  const reviews: PatientReview[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = splitCsvLine(lines[i]);

    // Only show rows where Approved column = "yes"
    const approved = cols[approvedIdx]?.trim().toLowerCase();
    if (approved !== "yes") continue;

    const rating = parseInt(cols[ratingIdx]?.trim() ?? "5", 10);

    reviews.push({
      id:       `review-${i}`,
      name:     cols[nameIdx]?.trim()     || "Anonymous",
      location: locationIdx !== -1 ? (cols[locationIdx]?.trim() || "") : "",
      rating:   isNaN(rating) ? 5 : Math.min(5, Math.max(1, rating)),
      message:  cols[messageIdx]?.trim()  || "",
    });
  }

  return reviews;
}

function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
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
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
      setReviews(cache.data);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res  = await fetch(GOOGLE_SHEET_CSV_URL, { signal: controller.signal, cache: "no-store" });
        if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
        const csv  = await res.text();
        const data = parseCsv(csv);
        cache = { data, fetchedAt: Date.now() };
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
