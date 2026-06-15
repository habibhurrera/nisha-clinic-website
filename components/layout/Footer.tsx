import Link from "next/link";
import { CONTACT } from "@/lib/constants";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations" },
  { label: "Appointments", href: "/appointments" },
  { label: "Contact", href: "/contact" },
];

const SERVICES_QUICK = [
  "Antenatal Care", "Laparoscopic Surgery", "PCOS Management",
  "Fertility Consultations", "Menopause Care", "Hysteroscopy",
];

export default function Footer() {
  return (
    <footer style={{ background: "linear-gradient(160deg, #0a3632 0%, #0e4a45 60%, #125e57 100%)" }}>

      <div className="container-site py-14 md:py-18">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Branding */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <p className="font-serif text-xl text-white font-medium leading-tight">Dr. Nisha Tabassum</p>
              <p className="font-sans text-[10px] text-white/60 tracking-widest uppercase mt-0.5">Consultant Gynaecologist</p>
            </Link>
            <p className="font-sans text-sm text-white/70 leading-relaxed mb-5">
              Compassionate specialist care for women at every stage of life. Serving Karachi for 13+ years.
            </p>

          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-sans font-semibold text-xs tracking-widest uppercase text-white/60 mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="font-sans text-sm text-white/70 hover:text-white transition-colors duration-150 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-blush-400 group-hover:bg-blush-300 transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="font-sans font-semibold text-xs tracking-widest uppercase text-white/60 mb-5">Services</h3>
            <ul className="space-y-2.5">
              {SERVICES_QUICK.map(s => (
                <li key={s}>
                  <Link href="/services" className="font-sans text-sm text-white/70 hover:text-white transition-colors duration-150 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-blush-400 group-hover:bg-blush-300 transition-colors" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="font-sans font-semibold text-xs tracking-widest uppercase text-white/60 mb-5">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:${CONTACT.phoneIntl}`} className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors">
                  <span>📞</span><span>{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${CONTACT.whatsappIntl}?text=${encodeURIComponent(CONTACT.whatsappMsg)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors">
                  <span>💬</span><span>{CONTACT.whatsapp} (WhatsApp)</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors">
                  <span>✉️</span><span className="break-all">{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors">
                  <span>📘</span><span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="container-site py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-sans text-xs text-white/50">© {new Date().getFullYear()} Dr. Nisha Tabassum. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-sans text-xs text-white/50">MBBS, FCPS · PMDC Verified · Karachi</span>
            <span className="text-white/30">·</span>
            <p className="font-sans text-xs text-white/50">Website by <span className="text-white/80 font-medium">HurreraTech</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}