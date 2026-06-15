"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const CREDENTIALS = [
  { icon: "🎓", label: "MBBS — Dow University of Health Sciences" },
  { icon: "🏆", label: "FCPS (Obstetrics & Gynaecology) — CPSP Pakistan" },
  { icon: "✅", label: "PMDC-Verified Consultant Gynaecologist" },
  { icon: "🔬", label: "Laparoscopic Surgery Specialist" },
  { icon: "🏥", label: "HOD — Murshid Hospital, Karachi" },
];

const HIGHLIGHTS = [
  { num: "13+", sub: "Years in Practice" },
  { num: "4.9★", sub: "Star Rating"  },
  { num: "99%", sub: "Satisfaction"     },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutSnippet() {
  return (
    <section className="section-py overflow-hidden" style={{ background: "#fdfcfa" }}>
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Visual card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Large photo card */}
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0 shadow-[0_20px_60px_rgba(21,50,68,0.14)]">
              {/* Doctor photo */}
              <Image
                src="/image.png"
                alt="Dr. Nisha Tabassum — Consultant Gynaecologist"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 448px"
              />

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-[2rem]"
                style={{ background: "linear-gradient(225deg, #fae8ea, transparent)" }} />
            </div>

            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.sub}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute glass rounded-2xl px-5 py-3 shadow-card-hover text-center
                  ${i === 0 ? "-right-4 top-16"   : ""}
                  ${i === 1 ? "-right-4 bottom-32" : ""}
                  ${i === 2 ? "-left-4  bottom-12" : ""}
                `}
              >
                <p className="font-serif text-2xl font-bold text-navy-800 leading-none">{h.num}</p>
                <p className="font-sans text-[11px] text-neutral-500 mt-0.5">{h.sub}</p>
              </motion.div>
            ))}

            {/* Background decorative blob */}
            <div className="absolute -z-10 -bottom-8 -left-8 w-64 h-64 rounded-full blur-3xl"
              style={{ background: "rgba(46,125,100,0.08)" }} />
          </motion.div>

          {/* Right — Text content */}
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeUp}>
              <span className="chip-blush mb-5">About the Doctor</span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="heading-section text-balance mb-2">
              A Decade of Trusted
              <span className="block italic" style={{ color: "#cc5a6b" }}> Women's Healthcare</span>
            </motion.h2>

            <motion.div variants={fadeUp}>
              <div className="divider-blush mb-6" />
            </motion.div>

            <motion.p variants={fadeUp} className="body-lead mb-4">
              Dr. Nisha Tabassum is a Consultant Gynaecologist, Laparoscopic Surgeon &amp; Infertility
              Specialist with over <strong className="text-navy-800">13 years of dedicated practice</strong> in
              Karachi. She has served as Head of Department at Murshid Hospital, Senior Registrar at Lady Dufferin
              Hospital and Consultant Gynaecologist at Osmania Hospital Karachi, Mamji Hospital, RIMS Trauma
              Hospital and Sindh Rangers Hospital Nazimabad.
            </motion.p>

            <motion.p variants={fadeUp} className="body-lead mb-8">
              She specialises in high-risk pregnancies, infertility, laparoscopic surgery, PCOS management,
              and comprehensive antenatal care — bringing surgical expertise with compassionate, personalised
              support at multiple hospitals in Karachi.
            </motion.p>


          </motion.div>
        </div>
      </div>
    </section>
  );
}
