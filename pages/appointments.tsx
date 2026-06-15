import Head from "next/head";
import Layout from "@/components/layout/Layout";
import AppointmentForm from "@/components/sections/AppointmentForm";
import { CONTACT, SITE_URL } from "@/lib/constants";
import { motion } from "framer-motion";
import Link from "next/link";

const HIGHLIGHTS = [
  { icon: "📅", text: "Same-week appointments" },
  { icon: "🌙", text: "Evening slots available" },
  { icon: "📍", text: "4 locations in Karachi" },
  { icon: "⚡", text: "Confirmed within hours" },
];

const TITLE = "Book an Appointment | Dr. Nisha Tabassum — Gynaecologist Karachi";
const DESC  = "Book an appointment with Dr. Nisha Tabassum online. Same-week slots available. Request via WhatsApp at Nazimabad, Sindh Rangers Hospital, Mamji, and RIMS in Karachi.";

export default function AppointmentsPage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description"         content={DESC} />
        <meta name="keywords"            content="book gynaecologist appointment Karachi, online appointment gynaecologist, women doctor appointment Karachi, Dr Nisha Tabassum appointment" />
        <meta name="robots"              content="index, follow" />
        <link rel="canonical"            href={`${SITE_URL}/appointments`} />
        <meta property="og:title"        content={TITLE} />
        <meta property="og:description"  content={DESC} />
        <meta property="og:url"          content={`${SITE_URL}/appointments`} />
      </Head>
      <Layout>
        {/* Hero */}
        <div className="relative overflow-hidden"
          style={{ background:"linear-gradient(160deg,#2e7d64 0%,#153244 60%,#0f2535 100%)",
            paddingTop:"clamp(5rem,10vw,8rem)", paddingBottom:"clamp(4rem,8vw,7rem)" }}
        >
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"
            style={{ background:"rgba(204,90,107,0.18)" }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"
            style={{ background:"rgba(46,125,100,0.2)" }} />
          <div className="container-site relative z-10 text-center">
            <span className="chip-white mb-6 inline-flex">Book a Visit</span>
            <h1 className="font-serif text-white text-balance leading-tight mb-4"
              style={{ fontSize:"clamp(2.4rem,5vw,4rem)", letterSpacing:"-0.02em" }}>
              Request an Appointment
            </h1>
            <p className="font-sans text-white/65 max-w-xl mx-auto mb-8"
              style={{ fontSize:"clamp(1rem,2vw,1.125rem)", lineHeight:"1.7" }}>
              Fill in the form below and your details will be sent directly to
              Dr. Nisha's WhatsApp for quick confirmation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {HIGHLIGHTS.map(h => (
                <span key={h.text} className="font-sans text-sm text-white/70 flex items-center gap-1.5">
                  <span>{h.icon}</span>{h.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Form + sidebar */}
        <section className="section-py" style={{ background:"#fdfcfa" }}>
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start">
              {/* Form panel */}
              <motion.div
                initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
                className="lg:col-span-2 bg-white rounded-[2rem] shadow-card-hover border border-warm-200 p-7 md:p-10"
              >
                <h2 className="font-serif text-2xl md:text-3xl text-navy-800 mb-2">Book Your Appointment</h2>
                <p className="font-sans text-sm text-neutral-500 mb-8">
                  All fields marked <span className="text-blush-500">*</span> are required.
                </p>
                <AppointmentForm />
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }}
                transition={{ duration:0.7, delay:0.15, ease:[0.22,1,0.36,1] }}
                className="space-y-5"
              >
                {/* Call */}
                <div className="rounded-[1.75rem] p-6 border border-brand-200" style={{ background:"#f0f7f4" }}>
                  <h3 className="font-serif text-lg text-navy-800 mb-3">Prefer to Call?</h3>
                  <p className="font-sans text-sm text-neutral-600 mb-4">
                    Speak directly with our clinic assistant for instant booking.
                  </p>
                  <a href={`tel:${CONTACT.phoneIntl}`} className="btn-primary btn-sm inline-flex gap-2 w-full justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    {CONTACT.phone}
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="rounded-[1.75rem] p-6 border" style={{ background:"#f0fdf4", borderColor:"#bbf7d0" }}>
                  <h3 className="font-serif text-lg text-navy-800 mb-3">WhatsApp</h3>
                  <p className="font-sans text-sm text-neutral-600 mb-4">
                    Message directly for quick queries or to share medical history.
                  </p>
                  <a
                    href={`https://wa.me/${CONTACT.whatsappIntl}?text=${encodeURIComponent(CONTACT.whatsappMsg)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex gap-2 items-center justify-center w-full px-5 py-3 rounded-full font-sans text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                    style={{ background:"linear-gradient(135deg,#25D366,#128C7E)" }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {CONTACT.whatsapp}
                  </a>
                </div>

                {/* Locations */}
                <div className="rounded-[1.75rem] p-6 bg-white border border-warm-200 shadow-card-soft">
                  <h3 className="font-serif text-lg text-navy-800 mb-3">Our Locations</h3>
                  <ul className="space-y-2 font-sans text-xs text-neutral-500">
                    <li className="flex gap-2"><span>📍</span>Nazimabad Clinic (Mon–Sat, 5–9 PM)</li>
                    <li className="flex gap-2"><span>📍</span>Sindh Rangers Hospital</li>
                    <li className="flex gap-2"><span>📍</span>Mamji Hospital</li>
                    <li className="flex gap-2"><span>📍</span>RIMS Trauma Hospital</li>
                  </ul>
                  <Link href="/locations" className="font-sans text-xs font-semibold text-brand-600 hover:text-brand-700 mt-3 inline-block transition-colors">
                    View addresses & maps →
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
