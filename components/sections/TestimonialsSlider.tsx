"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const TESTIMONIALS = [
  {
    name: "Fatima A.",
    location: "DHA, Karachi",
    rating: 5,
    text: "Dr. Nisha is incredible — she made me feel completely at ease during my high-risk pregnancy. Her expertise and calm demeanour were truly reassuring throughout. I cannot recommend her highly enough.",
    tag: "Antenatal Care",
  },
  {
    name: "Sana M.",
    location: "Gulshan-e-Iqbal",
    rating: 5,
    text: "I had been suffering from severe PCOS for years without real answers. Dr. Nisha gave me a clear, structured plan and within 4 months my symptoms improved dramatically. She truly listens.",
    tag: "PCOS Management",
  },
  {
    name: "Rabia K.",
    location: "Clifton, Karachi",
    rating: 5,
    text: "My laparoscopy was done so smoothly — minimal pain, fast recovery, and Dr. Nisha walked me through every step. The clinic staff were also wonderful. Very professional experience overall.",
    tag: "Laparoscopic Surgery",
  },
  {
    name: "Nadia H.",
    location: "North Nazimabad",
    rating: 5,
    text: "After years of trying, Dr. Nisha's fertility consultation finally gave us hope and a clear path forward. She combines deep expertise with genuine warmth. We are forever grateful.",
    tag: "Fertility Consultation",
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="w-4 h-4" fill="#e8b14a" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
  </div>
);

export default function TestimonialsSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section-py relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0f2535 0%, #153244 100%)" }}
    >
      {/* Decorative orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb-drift absolute -top-20 -right-20 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(204,90,107,0.12) 0%, transparent 70%)" }}/>
        <div className="orb-drift-slow absolute -bottom-20 -left-20 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(46,125,100,0.12) 0%, transparent 70%)" }}/>
      </div>

      <div className="container-site relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="chip-white mb-5">Patient Stories</span>
          <h2 className="heading-section text-white text-balance mb-4">
            What Our Patients{" "}
            <span className="italic" style={{ color: "#eda9b2" }}>Say</span>
          </h2>
          <div className="divider mx-auto mb-0" style={{ background: "rgba(237,169,178,0.5)" }} />
        </motion.div>

        {/* Active testimonial */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass-dark rounded-3xl p-8 md:p-12 mb-8"
            >
              {/* Quote mark */}
              <div className="font-serif text-8xl leading-none mb-4" style={{ color: "rgba(237,169,178,0.25)", lineHeight: 0.8 }}>
                &ldquo;
              </div>
              <Stars count={TESTIMONIALS[active].rating} />
              <p className="font-serif text-xl md:text-2xl text-white leading-relaxed mt-4 mb-6 italic text-balance">
                {TESTIMONIALS[active].text}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="font-sans font-semibold text-white">{TESTIMONIALS[active].name}</p>
                  <p className="font-sans text-sm" style={{ color: "rgba(186,210,224,0.7)" }}>
                    {TESTIMONIALS[active].location}
                  </p>
                </div>
                <span className="chip-blush" style={{ background: "rgba(204,90,107,0.2)", color: "#f5cdd3" }}>
                  {TESTIMONIALS[active].tag}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot nav */}
          <div className="flex items-center justify-center gap-3">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === active ? "2rem" : "0.5rem",
                  height: "0.5rem",
                  background: i === active ? "#e07f8d" : "rgba(255,255,255,0.2)",
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* All ratings badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex items-center justify-center gap-8 flex-wrap"
          >
            {[
              { label: "Google Reviews", score: "4.9 ⭐" },
              { label: "Patient Satisfaction", score: "99%" },
              { label: "Recommend Rate", score: "98%" },
            ].map((r) => (
              <div key={r.label} className="text-center">
                <p className="font-serif text-3xl font-bold text-white">{r.score}</p>
                <p className="font-sans text-xs mt-1" style={{ color: "rgba(186,210,224,0.6)" }}>{r.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
