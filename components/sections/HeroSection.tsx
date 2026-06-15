"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

/* ── Animation variants ─────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  show:   { opacity: 1, scale: 1,   transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Stat item ──────────────────────────────────────────────── */
const STATS = [
  { value: "13+",   label: "Years Experience",       icon: "🏅" },
  { value: "4.9/5", label: "Patient Rating",          icon: "⭐" },
  { value: "99%",   label: "Satisfaction Rate",       icon: "💚" },
  { value: "5,000+",label: "Patients Served",         icon: "👩" },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY    = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background: "linear-gradient(160deg, #0f2535 0%, #153244 55%, #1a3f54 100%)" }}
    >
      {/* ── Background decorative orbs ───────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="orb-drift absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(204,90,107,0.18) 0%, transparent 70%)" }} />
        <div className="orb-drift-slow absolute bottom-[-15%] left-[-10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(46,125,100,0.14) 0%, transparent 70%)" }} />
        <div className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      {/* ── Main grid ────────────────────────────────────────── */}
      <div className="container-site relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-24 lg:py-0 min-h-screen">

        {/* Left — Text content */}
        <motion.div
          style={{ y: textY, opacity }}
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center pt-20 lg:pt-0"
        >
          {/* Chip */}
          <motion.div variants={fadeUp}>
            <span className="chip-white mb-6 inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              PMDC-Verified Specialist in Karachi
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1 variants={fadeUp}
            className="heading-display text-white text-balance mb-3"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", lineHeight: 1.06 }}
          >
            Dr.{" "}
            <span style={{
              background: "linear-gradient(90deg, #f5cdd3, #e07f8d, #f5cdd3)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
            }}>
              Nisha
            </span>
            {" "}Tabassum
          </motion.h1>

          {/* Credentials */}
          <motion.p variants={fadeUp}
            className="font-serif text-blush-200 italic text-lg md:text-xl mb-5"
            style={{ color: "#eda9b2" }}
          >
            MBBS, FCPS — Consultant Gynaecologist, Laparoscopic Surgeon &amp; Infertility Specialist
          </motion.p>

          {/* Tagline */}
          <motion.p variants={fadeUp}
            className="font-sans text-base md:text-lg leading-relaxed mb-8 max-w-lg"
            style={{ color: "rgba(220,230,237,0.85)" }}
          >
            Providing compassionate, expert women's healthcare in Karachi
            for{" "}
            <span className="text-white font-semibold">over 13 years</span>.
            Specialising in minimally invasive surgery, obstetrics, and
            comprehensive gynaecological care.
          </motion.p>

          {/* Mobile Book Appointment button */}
          <motion.div variants={fadeUp} className="lg:hidden mt-2">
            <a href="/appointments"
              className="btn-blush text-center w-full block"
            >
              Book Appointment
            </a>
          </motion.div>

        </motion.div>

        {/* Right — Hero visual */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="show"
          style={{ y: imgY }}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Decorative rings */}
          <div className="absolute w-[420px] h-[420px] rounded-full border border-white/5" />
          <div className="absolute w-[540px] h-[540px] rounded-full border border-white/5 animate-pulse-soft" />
          <div className="absolute w-[660px] h-[660px] rounded-full border border-white/[0.03]" />

          {/* Photo card */}
          <div className="relative w-[380px] h-[500px] rounded-[2.5rem] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
            {/* Doctor photo */}
            <Image
              src="/image.png"
              alt="Dr. Nisha Tabassum — Consultant Gynaecologist"
              fill
              priority
              className="object-cover object-top"
              sizes="380px"
            />

            {/* Bottom gradient fade */}
            <div
              className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(21,50,68,0.85) 0%, rgba(21,50,68,0.3) 60%, transparent 100%)" }}
            />

            {/* Name card overlay at bottom */}
            <div className="absolute bottom-5 inset-x-5 glass rounded-2xl px-4 py-3">
              <p className="font-serif text-navy-900 font-semibold text-base leading-tight">Dr. Nisha Tabassum</p>
              <p className="font-sans text-[11px] text-navy-600 mt-0.5">MBBS, FCPS · Gynaecologist</p>
            </div>
          </div>

          {/* Floating badge — WhatsApp / Book */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 -right-4 glass rounded-2xl px-4 py-3 shadow-card-hover"
          >
            <p className="font-sans text-xs text-navy-600 font-medium">⭐ 4.9 / 5 Rating</p>
            <p className="font-sans text-[10px] text-neutral-400 mt-0.5">Based on 500+ reviews</p>
          </motion.div>

          {/* Floating badge — experience */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-20 -left-6 glass rounded-2xl px-4 py-3 shadow-card-hover"
          >
            <p className="font-sans text-xs text-navy-600 font-medium">🏅 13+ Years</p>
            <p className="font-sans text-[10px] text-neutral-400 mt-0.5">Clinical Experience</p>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-[10px] tracking-widest uppercase" style={{ color: "rgba(186,210,224,0.5)" }}>Scroll</span>
        <div className="w-px h-10 overflow-hidden" style={{ background: "rgba(186,210,224,0.15)" }}>
          <motion.div
            className="w-full h-1/2 bg-blush-300"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
