"use client";
import { motion } from "framer-motion";
import { CONTACT, LOCATIONS } from "@/lib/constants";

/* ── Contact cards data ───────────────────────────────────── */
const CONTACT_CARDS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
    ),
    label: "Phone / Call",
    value: CONTACT.phone,
    href: `tel:${CONTACT.phoneIntl}`,
    accent: "#2e7d64",
    bg: "#f0f7f4",
    cta: "Call Now",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    label: "WhatsApp",
    value: "0314-2840922",
    href: `https://wa.me/923142840922?text=${encodeURIComponent(CONTACT.whatsappMsg)}`,
    accent: "#25D366",
    bg: "#f0fdf4",
    cta: "Chat on WhatsApp",
    external: true,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    accent: "#2b6584",
    bg: "#f0f4f7",
    cta: "Send Email",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    label: "Facebook",
    value: "Dr. Nisha Tabassum",
    href: CONTACT.facebook,
    accent: "#1877F2",
    bg: "#f0f4ff",
    cta: "Follow on Facebook",
    external: true,
  },
];

/* ── Fade-up animation ────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Main Component ───────────────────────────────────────── */
export default function ContactSection() {
  return (
    <section className="section-py" style={{ background: "#fdfcfa" }} id="contact">
      <div className="container-site">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <span className="chip-blush mb-5">Get in Touch</span>
          <h2 className="heading-section text-balance mb-4">
            We're Here{" "}
            <span className="italic" style={{ color: "#cc5a6b" }}>For You</span>
          </h2>
          <div className="divider-blush mx-auto mb-5" />
          <p className="body-lead">
            Reach out by phone, WhatsApp, or email. Evening slots available.
            We respond to all queries within a few hours.
          </p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
          initial="hidden" whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
        >
          {CONTACT_CARDS.map(c => (
            <motion.div key={c.label} variants={fadeUp}>
              <a
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="group flex flex-col h-full rounded-3xl p-6 bg-white border border-warm-200
                  shadow-card-soft hover:shadow-card-hover hover:-translate-y-1.5
                  transition-all duration-300"
              >
                <div
                  className="w-[3.25rem] h-[3.25rem] rounded-2xl flex items-center justify-center mb-4
                    group-hover:scale-110 transition-transform duration-300"
                  style={{ background: c.bg, color: c.accent }}
                >
                  {c.icon}
                </div>
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                  {c.label}
                </p>
                <p className="font-sans font-semibold text-navy-800 text-sm mb-4 flex-1 leading-snug">
                  {c.value}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold transition-colors duration-200"
                  style={{ color: c.accent }}
                >
                  {c.cta}
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </span>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Clinic timings */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-[1.75rem] border border-warm-200 shadow-card-soft p-7"
        >
          <h3 className="font-serif text-2xl text-navy-800 mb-6">Clinic Timings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LOCATIONS.map(loc => (
              <div key={loc.id} className="flex items-start gap-3 py-3 border-b border-warm-200 last:border-0 sm:last:border-0">
                <span className="text-xl flex-shrink-0">📍</span>
                <div>
                  <p className="font-sans font-semibold text-navy-800 text-sm">{loc.name}</p>
                  <p className="font-sans text-xs text-neutral-500 mt-0.5">{loc.timings}</p>
                  <p className="font-sans text-xs text-neutral-400">{loc.address}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
