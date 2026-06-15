"use client";
import { motion } from "framer-motion";
import ReviewForm from "./ReviewForm";

export default function ReviewFormSection() {
  return (
    <section id="leave-review" className="section-py bg-warm-50">
      <div className="container-site">

        {/* Divider label */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-warm-200" />
          <span className="font-sans text-xs text-neutral-400 uppercase tracking-widest whitespace-nowrap">
            Share Your Experience
          </span>
          <div className="flex-1 h-px bg-warm-200" />
        </div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
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