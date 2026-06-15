"use client";
import { motion } from "framer-motion";
import { usePatientReviews, PatientReview } from "@/hooks/usePatientReviews";

/* ── Stars ───────────────────────────────────────────────────────────────── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4"
          fill={i < count ? "#e8b14a" : "none"}
          stroke={i < count ? "#e8b14a" : "#d1d5db"}
          strokeWidth={1.5} viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Review card ─────────────────────────────────────────────────────────── */
function ReviewCard({ review, index }: { review: PatientReview; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="card flex flex-col gap-4 p-6"
    >
      <div>
        <span className="font-serif text-5xl leading-none select-none" style={{ color: "rgba(204,90,107,0.2)" }}>
          &ldquo;
        </span>
      </div>
      <p className="font-sans text-sm text-neutral-600 leading-relaxed flex-1 line-clamp-5">
        {review.message}
      </p>
      <div className="border-t border-warm-200 pt-4 mt-auto flex items-center justify-between gap-3">
        <div>
          <p className="font-sans font-semibold text-sm" style={{ color: "#1a1a1a" }}>{review.name}</p>
          <p className="font-sans text-xs text-neutral-400 mt-0.5">
            {review.location || "Verified Patient"}
          </p>
        </div>
        <Stars count={review.rating} />
      </div>
    </motion.article>
  );
}

/* ── Skeleton ────────────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="card p-6 space-y-3 animate-pulse">
      <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="w-4 h-4 rounded bg-warm-200" />)}</div>
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

/* ── Main ────────────────────────────────────────────────────────────────── */
export default function ApprovedReviews() {
  const { reviews, loading, error } = usePatientReviews();

  if (loading) return (
    <section className="py-12 bg-warm-50">
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    </section>
  );

  if (error || reviews.length === 0) return null;

  return (
    <section className="py-12 bg-warm-50">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="chip-blush mb-4">Patient Reviews</span>
          <h2 className="heading-section mb-3">
            Real Stories from <span className="italic" style={{ color: "#cc5a6b" }}>Our Patients</span>
          </h2>
          <div className="divider-blush mx-auto" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
