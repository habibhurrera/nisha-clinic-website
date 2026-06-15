"use client";
import { motion } from "framer-motion";
import Link from "next/link";

/* ── Location Data ────────────────────────────────────────── */
export const LOCATIONS = [
  {
    id: "nazimabad",
    name: "Private Clinic — Nazimabad",
    tag: "Private Clinic",
    tagColor: "#1a9086",
    tagBg: "#f0faf9",
    address: "Nazimabad, Karachi, Sindh, Pakistan",
    timings: ["Mon, Wed, Fri: 06:00 PM – 08:00 PM", "Sat: 01:00 PM – 03:00 PM"],
    type: "Private Clinic",
    icon: "🏥",
    accentColor: "#1a9086",
    mapUrl: "https://maps.app.goo.gl/b4iGn9QBAr3Ct68S7",
    highlights: ["Private consultation rooms", "On-site diagnostic services", "Ample parking", "Female staff available"],
  },
  {
    id: "rangers",
    name: "Sindh Rangers Hospital",
    tag: "Hospital",
    tagColor: "#125e57",
    tagBg: "#ccefec",
    address: "Sindh Rangers Hospital, Karachi",
    timings: ["Mon – Fri: 08:30 AM – 02:30 PM"],
    type: "Military / Government Hospital",
    icon: "🏛️",
    accentColor: "#125e57",
    mapUrl: "https://maps.google.com/maps?q=Sindh+Rangers+Hospital+Karachi",
    highlights: ["Full inpatient facilities", "Equipped OT for surgeries", "Emergency obstetric care"],
  },
  {
    id: "mamji",
    name: "Mamji Hospital",
    tag: "Hospital",
    tagColor: "#2b6584",
    tagBg: "#dce6ed",
    address: "Mamji Hospital, Karachi",
    timings: ["Tue – Thu: 04:00 PM – 06:00 PM", "Sat: 03:00 PM – 05:00 PM"],
    type: "Private Hospital",
    icon: "⚕️",
    accentColor: "#2b6584",
    mapUrl: "https://maps.google.com/maps?q=Mamji+Hospital+Karachi",
    highlights: ["State-of-the-art laparoscopy suite", "Private rooms available", "Neonatal ICU on-site"],
  },
  {
    id: "rims",
    name: "RIMS Trauma Hospital",
    tag: "Trauma Centre",
    tagColor: "#b8860b",
    tagBg: "#fef9ec",
    address: "RIMS Trauma Hospital, Karachi",
    timings: ["Sat: 12:00 PM – 02:00 PM"],
    type: "Trauma & Surgical Centre",
    icon: "🚑",
    accentColor: "#b8860b",
    mapUrl: "https://maps.google.com/maps?q=RIMS+Trauma+Hospital+Karachi",
    highlights: ["24/7 emergency gynaecology", "High-risk obstetric unit", "Trauma-trained surgical team"],
  },
];

/* ── Map Button ───────────────────────────────────────────── */
function MapButton({ loc }: { loc: typeof LOCATIONS[0] }) {
  return (
    <a
      href={loc.mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 font-sans text-xs font-semibold px-4 py-2 rounded-full transition-colors mt-4"
      style={{ background: loc.tagBg, color: loc.accentColor }}
    >
      📍 Open in Google Maps ↗
    </a>
  );
}

/* ── Location Card ────────────────────────────────────────── */
function LocationCard({ loc, i }: { loc: typeof LOCATIONS[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-[1.75rem] border border-warm-200 shadow-card-soft
        hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
    >
      <div className="p-6 flex flex-col flex-1">
        {/* Tag + name */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <h3 className="font-serif text-lg font-semibold leading-snug" style={{ color: "#1a1a1a" }}>
            {loc.name}
          </h3>
          <span
            className="chip text-[10px] flex-shrink-0 mt-0.5"
            style={{ background: loc.tagBg, color: loc.accentColor }}
          >
            {loc.tag}
          </span>
        </div>

        {/* Details */}
        <ul className="space-y-2.5 font-sans text-sm mb-4" style={{ color: "#4a4a4a" }}>
          <li className="flex gap-2.5 items-start">
            <span className="flex-shrink-0 mt-0.5">📍</span>
            <span>{loc.address}</span>
          </li>
          {loc.timings.map((t, idx) => (
            <li key={idx} className="flex gap-2.5 items-start">
              <span className="flex-shrink-0 mt-0.5">🕐</span>
              <span>{t}</span>
            </li>
          ))}
          <li className="flex gap-2.5 items-start">
            <span className="flex-shrink-0 mt-0.5">🏷️</span>
            <span style={{ color: "#6b7280" }}>{loc.type}</span>
          </li>
        </ul>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {loc.highlights.map(h => (
            <span
              key={h}
              className="font-sans text-[11px] px-2.5 py-1 rounded-full"
              style={{ background: loc.tagBg, color: loc.accentColor }}
            >
              ✓ {h}
            </span>
          ))}
        </div>

        {/* Map link */}
        <div className="mt-auto">
          <MapButton loc={loc} />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main export ──────────────────────────────────────────── */
export default function LocationsMap({ compact = false }: { compact?: boolean }) {
  const visible = compact ? LOCATIONS.slice(0, 2) : LOCATIONS;

  return (
    <section className="section-py" style={{ background: "#f5f5f5" }} id="locations">
      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="chip-brand mb-5">Find Us</span>
          <h2 className="heading-section text-balance mb-4">
            Clinic{" "}
            <span className="italic" style={{ color: "#1a9086" }}>Locations</span>
          </h2>
          <div className="divider-brand mx-auto mb-5" />
          <p className="body-lead">
            Dr. Nisha Tabassum sees patients at four locations across Karachi.
            All venues are equipped for consultations, procedures, and emergency care.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {visible.map((loc, i) => (
            <LocationCard key={loc.id} loc={loc} i={i} />
          ))}
        </div>

        {compact && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <Link href="/locations" className="btn-outline-brand">
              View All 4 Locations & Timings →
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
