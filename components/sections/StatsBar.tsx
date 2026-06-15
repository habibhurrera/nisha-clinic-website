"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const STATS = [
  { value: 13, suffix: "+", label: "Years Experience",  icon: "🏅", color: "#2e7d64" },
  { value: 5000, suffix: "+", label: "Patients Served", icon: "👩", color: "#cc5a6b" },
  { value: 99, suffix: "%",  label: "Satisfaction Rate",icon: "💚", color: "#2b6584" },
  { value: 4.9, suffix: "/5", label: "Patient Rating",  icon: "⭐", color: "#c4793a" },
];

function Counter({ to, suffix, duration = 2000 }: { to: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const isDecimal = to % 1 !== 0;
    const steps = 60;
    const inc = to / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += inc;
      if (current >= to) { setCount(to); clearInterval(interval); }
      else setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
    }, duration / steps);
    return () => clearInterval(interval);
  }, [inView, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsBar() {
  return (
    <section className="py-12 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #fdf5f6 0%, #f0f7f4 50%, #f0f4f7 100%)" }}
    >
      <div className="container-site">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="card p-6 text-center group hover:shadow-card-hover transition-all duration-300"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <p className="font-serif text-3xl md:text-4xl font-bold leading-none mb-1"
                style={{ color: s.color }}>
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="font-sans text-sm text-neutral-500">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
