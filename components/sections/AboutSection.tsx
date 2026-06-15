"use client";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* ── Data ─────────────────────────────────────────────────── */
const SHORT_BIO =
  "Dr. Nisha Tabassum is a Consultant Gynaecologist, Laparoscopic Surgeon & Infertility Specialist with over 13 years of dedicated practice in Karachi. She has served as Head of Department at Murshid Hospital, Senior Registrar at Lady Dufferin Hospital and Consultant Gynaecologist at Osmania Hospital Karachi, Mamji Hospital, RIMS Trauma Hospital and Sindh Rangers Hospital Nazimabad.";

const CREDENTIALS = [
  { icon: "🎓", label: "MBBS — Dow University of Health Sciences" },
  { icon: "🏆", label: "FCPS (Obstetrics & Gynaecology) — CPSP Pakistan" },
  { icon: "✅", label: "PMDC-Verified Consultant Gynaecologist" },
  { icon: "🔬", label: "Laparoscopic Surgery Specialist" },
];

const LEADERSHIP = [
  {
    role: "Head of Department (HOD)",
    place: "Murshid Hospital, Karachi",
    icon: "🏥",
  },
  {
    role: "Senior Registrar",
    place: "Lady Dufferin Hospital, Karachi",
    icon: "🏛️",
  },
  {
    role: "Consultant Gynaecologist",
    place: "Osmania Hospital, Karachi",
    icon: "⚕️",
  },
  {
    role: "Consultant Gynaecologist",
    place: "Mamji Hospital, Karachi",
    icon: "🏥",
  },
  {
    role: "Consultant Gynaecologist",
    place: "RIMS Trauma Hospital, Karachi",
    icon: "🔬",
  },
  {
    role: "Consultant Gynaecologist",
    place: "Sindh Rangers Hospital, Nazimabad",
    icon: "🏥",
  },
];

const AFFILIATIONS = [
  { name: "Nazimabad Clinic", icon: "🩺" },
  { name: "Sindh Rangers Hospital", icon: "🏥" },
  { name: "Mamji Hospital", icon: "⚕️" },
  { name: "RIMS Trauma Hospital", icon: "🔬" },
];

const SPECIALTIES = [
  "High-Risk Pregnancies",
  "Infertility Management",
  "Laparoscopic Surgery",
  "PCOS & Hormonal Care",
  "Antenatal & Postnatal Care",
  "Hysteroscopy",
  "Normal Delivery (SVD)",
  "Instrumental Delivery",
  "Cerclage Application",
  "Total Abdominal Hysterectomy",
  "Vaginal Hysterectomy",
  "Myomectomy",
  "Obstetrical Hysterectomy",
  "Laparotomy",
  "Laparoscopy & Dye Test",
  "C-Section",
];

const STATS = [
  { num: "13+", label: "Years in Practice" },
  { num: "4.9", label: "Star Rating", suffix: "/5" },
  { num: "99%", label: "Patient Satisfaction" },
];

/* ── Animation helpers ────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

/* ── Main Component ───────────────────────────────────────── */
export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="section-py overflow-hidden"
      style={{ background: "#fdfcfa" }}
      id="about"
    >
      <div className="container-site">
        {/* ── Top grid: portrait + core bio ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 lg:mb-32">

          {/* Left — Animated profile card */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main portrait card */}
            <div
              className="relative rounded-[2.5rem] overflow-hidden max-w-sm mx-auto lg:mx-0"
              style={{
                aspectRatio: "4/5",
                boxShadow: "0 24px 80px rgba(21,50,68,0.16)",
              }}
            >
              <Image
                src="/image.png"
                alt="Dr. Nisha Tabassum — Consultant Gynaecologist"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 384px"
              />

              {/* Name badge pinned at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 px-6 py-5"
                style={{
                  background:
                    "linear-gradient(to top, rgba(21,50,68,0.85) 0%, transparent 100%)",
                }}
              >
                <p className="font-serif text-xl text-white leading-tight">
                  Dr. Nisha Tabassum
                </p>
                <p className="font-sans text-xs text-white/70 mt-1 tracking-wide">
                  MBBS, FCPS — Consultant Gynaecologist
                </p>
              </div>

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-20 h-20 rounded-bl-[2.5rem]"
                style={{
                  background: "linear-gradient(225deg, #fae8ea, transparent)",
                }}
              />
            </div>

            {/* Floating stat chips */}
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.75 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.35 + i * 0.13,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`absolute glass rounded-2xl shadow-card-hover text-center px-4 py-3
                  ${i === 0 ? "-right-4 top-12 lg:-right-8" : ""}
                  ${i === 1 ? "-right-4 bottom-36 lg:-right-8" : ""}
                  ${i === 2 ? "-left-4 bottom-16 lg:-left-8" : ""}
                `}
              >
                <p className="font-serif text-2xl font-bold text-navy-800 leading-none">
                  {s.num}
                  {s.suffix && (
                    <span className="text-sm text-neutral-400">{s.suffix}</span>
                  )}
                </p>
                <p className="font-sans text-[11px] text-neutral-500 mt-0.5 whitespace-nowrap">
                  {s.label}
                </p>
              </motion.div>
            ))}

            {/* Decorative blobs */}
            <div
              className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 rounded-full blur-3xl"
              style={{ background: "rgba(46,125,100,0.08)" }}
            />
            <div
              className="absolute -z-10 -top-8 right-8 w-48 h-48 rounded-full blur-3xl"
              style={{ background: "rgba(204,90,107,0.06)" }}
            />
          </motion.div>

          {/* Right — Bio + credentials */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeUp}>
              <span className="chip-blush mb-5">About the Doctor</span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="heading-section text-balance mb-3"
            >
              Trusted Women's Care
              <span className="block italic" style={{ color: "#cc5a6b" }}>
                For Over a Decade
              </span>
            </motion.h2>

            <motion.div variants={fadeUp}>
              <div className="divider-blush mb-6" />
            </motion.div>

            <motion.p variants={fadeUp} className="body-lead mb-6">
              {SHORT_BIO}
            </motion.p>

            <motion.p variants={fadeUp} className="body-lead mb-10">
              She specialises in high-risk pregnancies, infertility, laparoscopic surgery, PCOS management,
              and comprehensive antenatal care — bringing surgical expertise with compassionate, personalised
              support at multiple hospitals in Karachi.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link href="/appointments" className="btn-primary">
                Book a Consultation
              </Link>
              <Link href="#experience" className="btn-outline-brand">
                View Experience ↓
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Leadership & Affiliations row ── */}
        <div
          id="experience"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {/* Leadership roles */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="card p-8"
            style={{ background: "white" }}
          >
            <span className="chip-navy mb-5">Leadership Roles</span>
            <h3 className="font-serif text-2xl text-navy-800 mb-6">
              Hospital Positions
            </h3>
            <div className="space-y-5">
              {LEADERSHIP.map((l) => (
                <div key={l.place} className="flex gap-4 items-start">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: "#f0f7f4" }}
                  >
                    {l.icon}
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-navy-800 text-sm">
                      {l.role}
                    </p>
                    <p className="font-sans text-neutral-500 text-sm mt-0.5">
                      {l.place}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hospital Affiliations */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="card p-8"
            style={{ background: "white" }}
          >
            <span className="chip-brand mb-5">Hospital Network</span>
            <h3 className="font-serif text-2xl text-navy-800 mb-6">
              Current Affiliations
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {AFFILIATIONS.map((a) => (
                <div
                  key={a.name}
                  className="flex items-center gap-3 p-3 rounded-2xl"
                  style={{ background: "#f9f6f0" }}
                >
                  <span className="text-xl">{a.icon}</span>
                  <span className="font-sans text-sm text-neutral-700 leading-snug">
                    {a.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Specialties banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] p-8 md:p-10 overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #153244 0%, #0f2535 100%)",
          }}
        >
          {/* Decorative blob */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"
            style={{ background: "rgba(46,125,100,0.18)" }}
          />
          <div
            className="absolute bottom-0 left-12 w-48 h-48 rounded-full translate-y-1/2 blur-3xl"
            style={{ background: "rgba(204,90,107,0.12)" }}
          />

          <div className="relative z-10">
            <span className="chip-white mb-4">Areas of Expertise</span>
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-7">
              Specialised Care, Personalised for You
            </h3>
            <div className="flex flex-wrap gap-3">
              {SPECIALTIES.map((sp) => (
                <span
                  key={sp}
                  className="font-sans text-sm font-medium px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {sp}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
