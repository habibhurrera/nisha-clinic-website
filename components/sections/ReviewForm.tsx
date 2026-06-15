"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfdCrnVuP8c1cgtLILfFk7XTHdDr64L1hs4bpZpEqTlWZiUiQ/formResponse";

const ENTRY_NAME     = "entry.1677308567";
const ENTRY_LOCATION = "entry.1276960200";
const ENTRY_RATING   = "entry.55159011";
const ENTRY_MESSAGE  = "entry.1661067780";

/* ── Star Picker ─────────────────────────────────────────────────────────── */
function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1" role="group" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          className="transition-transform duration-150 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-400 rounded"
        >
          <svg
            className="w-8 h-8"
            fill={(hover || value) >= star ? "#e8b14a" : "none"}
            stroke={(hover || value) >= star ? "#e8b14a" : "#d1d5db"}
            strokeWidth={1.5}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

/* ── Types ───────────────────────────────────────────────────────────────── */
interface ReviewFormData {
  name: string;
  location: string;
  rating: number;
  message: string;
}
interface FormErrors {
  name?: string;
  location?: string;
  rating?: string;
  message?: string;
}

function validate(data: ReviewFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2)
    errors.name = "Please enter your name (at least 2 characters).";
  if (!data.location.trim() || data.location.trim().length < 2)
    errors.location = "Please enter your location (e.g. DHA, Karachi).";
  if (data.rating < 1 || data.rating > 5)
    errors.rating = "Please select a star rating.";
  if (!data.message.trim() || data.message.trim().length < 10)
    errors.message = "Please write at least 10 characters.";
  return errors;
}

/* ── Main Component ──────────────────────────────────────────────────────── */
export default function ReviewForm() {
  const [form, setForm]       = useState<ReviewFormData>({ name: "", location: "", rating: 0, message: "" });
  const [errors, setErrors]   = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ReviewFormData, boolean>>>({});
  const [status, setStatus]   = useState<"idle" | "submitting" | "success" | "error">("idle");

  const set = (field: keyof ReviewFormData, value: string | number) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field: keyof ReviewFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  };

  const fieldClass = (field: keyof FormErrors) =>
    `input-field ${
      touched[field] && errors[field]
        ? "border-blush-400 ring-1 ring-blush-300"
        : touched[field] && !errors[field]
        ? "border-brand-400"
        : ""
    }`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, location: true, rating: true, message: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          [ENTRY_NAME]:     form.name.trim(),
          [ENTRY_LOCATION]: form.location.trim(),
          [ENTRY_RATING]:   String(form.rating),
          [ENTRY_MESSAGE]:  form.message.trim(),
        }).toString(),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  /* ── Success screen ──────────────────────────────────────────────────── */
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center py-10 px-4"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg"
          style={{ background: "linear-gradient(135deg,#f0f7f4,#d9ece4)" }}
        >
          🌸
        </div>
        <h3 className="font-serif text-2xl text-navy-800 mb-2">Thank You!</h3>
        <p className="font-sans text-sm text-neutral-500 max-w-xs mx-auto">
          Your review has been received. Dr. Nisha&apos;s team will review and
          approve it shortly. We appreciate your kind words!
        </p>
      </motion.div>
    );
  }

  /* ── Form ────────────────────────────────────────────────────────────── */
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="label-field">
          Your Name <span className="text-blush-500">*</span>
        </label>
        <input
          type="text"
          value={form.name}
          placeholder="e.g. Fatima Khan"
          onChange={(e) => set("name", e.target.value)}
          onBlur={() => blur("name")}
          className={fieldClass("name")}
          autoComplete="name"
        />
        <AnimatePresence>
          {touched.name && errors.name && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="font-sans text-xs text-blush-600">
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-1.5">
        <label className="label-field">
          Your Location <span className="text-blush-500">*</span>
        </label>
        <input
          type="text"
          value={form.location}
          placeholder="e.g. DHA, Karachi"
          onChange={(e) => set("location", e.target.value)}
          onBlur={() => blur("location")}
          className={fieldClass("location")}
          autoComplete="off"
        />
        <AnimatePresence>
          {touched.location && errors.location && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="font-sans text-xs text-blush-600">
              {errors.location}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Star Rating */}
      <div className="flex flex-col gap-1.5">
        <label className="label-field">
          Rating <span className="text-blush-500">*</span>
        </label>
        <StarPicker value={form.rating} onChange={(v) => { set("rating", v); blur("rating"); }} />
        <AnimatePresence>
          {touched.rating && errors.rating && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="font-sans text-xs text-blush-600">
              {errors.rating}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label className="label-field">
          Your Review <span className="text-blush-500">*</span>
        </label>
        <textarea
          value={form.message}
          placeholder="Share your experience with Dr. Nisha…"
          rows={4}
          onChange={(e) => set("message", e.target.value)}
          onBlur={() => blur("message")}
          className={`${fieldClass("message")} resize-none`}
        />
        <AnimatePresence>
          {touched.message && errors.message && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="font-sans text-xs text-blush-600">
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Error banner */}
      {status === "error" && (
        <p className="font-sans text-sm text-blush-600 bg-blush-50 border border-blush-200 rounded-xl px-4 py-3">
          Something went wrong. Please try again or contact us directly.
        </p>
      )}

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-blush w-full py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Submitting…" : "Submit Review"}
      </motion.button>

      <p className="font-sans text-xs text-center text-neutral-400 leading-relaxed">
        Reviews are manually approved by Dr. Nisha&apos;s team before appearing
        on the website. Your privacy is respected.
      </p>
    </form>
  );
}
