"use client";
import { motion } from "framer-motion";
import { usePatientReviews, PatientReview } from "@/hooks/usePatientReviews";
import ReviewForm from "./ReviewForm";

/* ── Star display ─────────────────────────────────────────────────────────── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4"
          fill={i < count ? "#e8b14a" : "none"}
          stroke={i < count ? "#e8b14a" : "#d1d5db"}
          strokeWidth={1.5}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Single review card ──────────────────────────────────────────────────── */
function ReviewCard({ review, index }: { review: PatientReview; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="card flex flex-col gap-4 p-6"
    >
      {/* Quote + stars */}
      <div className="flex items-start justify-between gap-3">
        <span className="font-serif text-5xl leading-none select-none" style={{ color: "rgba(204,90,107,0.2)" }}>
          &ldquo;
        </span>
        <Stars count={review.rating} />
      </div>

      {/* Message */}
      <p className="font-sans text-sm text-neutral-600 leading-relaxed flex-1 line-clamp-5">
        {review.message}
      </p>

      {/* Name + location */}
      <div className="border-t border-warm-200 pt-4 mt-auto">
        <p className="font-sans font-semibold text-navy-800 text-sm">{review.name}</p>
        <p className="font-sans text-xs text-neutral-400 mt-0.5">
          {review.location || "Verified Patient"}
        </p>
      </div>
    </motion.article>
  );
}

/* ── Loading skeleton ────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="card p-6 space-y-3 animate-pulse">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => <div key={i} className="w-4 h-4 rounded bg-warm-200" />)}
      </div>
      <div className="space-y-2">
        <div className="h-3 rounded bg-warm-200 w-full" />
        <div className="h-3 rounded bg-warm-200 w-5/6" />
        <div className="h-3 rounded bg-warm-200 w-4/6" />
      </div>
      <div className="border-t border-warm-200 pt-4 space-y-1">
        <div className="h-3 rounded bg-warm-200 w-24" />
        <div className="h-2 rounded bg-warm-200 w-16" />
      </div>
    </div>
  );
}

/* ── Main Section ────────────────────────────────────────────────────────── */
export default function PatientReviews() {
  const { reviews, loading, error } = usePatientReviews();

  return (
    <section className="section-py bg-warm-50">
      <div className="container-site">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="chip mb-5">Patient Reviews</span>
          <h2 className="heading-section text-navy-800 text-balance mb-4">
            Real Stories from{" "}
            <span className="italic text-blush-500">Our Patients</span>
          </h2>
          <div className="divider mx-auto" />
          <p className="font-sans text-neutral-500 max-w-xl mx-auto mt-4 text-sm leading-relaxed">
            Every review below was written by a real patient and personally
            approved by Dr. Nisha&apos;s team before appearing here.
          </p>
        </motion.div>

        {/* Review grid */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {error && (
          <p className="text-center font-sans text-sm text-neutral-400 mb-16">{error}</p>
        )}

        {!loading && !error && reviews.length === 0 && (
          <p className="text-center font-sans text-sm text-neutral-400 mb-16">
            No reviews yet — be the first to share your experience!
          </p>
        )}

        {!loading && reviews.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {reviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} index={i} />
            ))}
          </div>
        )}

        {/* Submit a review */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-warm-200" />
            <span className="font-sans text-xs text-neutral-400 uppercase tracking-widest whitespace-nowrap">
              Share Your Experience
            </span>
            <div className="flex-1 h-px bg-warm-200" />
          </div>

          <div className="card p-6 md:p-8">
            <h3 className="font-serif text-xl text-navy-800 mb-1">Leave a Review</h3>
            <p className="font-sans text-xs text-neutral-400 mb-6 leading-relaxed">
              Your review will appear on this page after approval by our team.
            </p>
            <ReviewForm />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
