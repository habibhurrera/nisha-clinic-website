"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations" },
  { label: "Contact", href: "/contact" },
];

const DARK_HERO_PAGES = ["/"];

export default function Navbar() {
  const { pathname } = useRouter();
  const hasDarkHero = DARK_HERO_PAGES.includes(pathname);

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!hasDarkHero);

  useEffect(() => {
    if (!hasDarkHero) { setScrolled(true); return; }
    const onScroll = () => setScrolled(window.scrollY > 40);
    setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasDarkHero]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
          ${scrolled
            ? "backdrop-blur-md shadow-[0_1px_24px_rgba(0,0,0,0.10)] border-b border-brand-700"
            : "bg-transparent"
          }`}
        style={scrolled ? { background: "linear-gradient(135deg, #1a9086 0%, #0e4a45 100%)" } : {}}
      >
        <div className="container-site flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Dr. Nisha Tabassum Logo"
              width={44}
              height={44}
              className="rounded-full object-contain bg-white/10 p-0.5"
              priority
            />
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg md:text-xl font-semibold text-white">
                Dr. Nisha Tabassum
              </span>
              <span className="font-sans text-[9px] md:text-[10px] tracking-widest uppercase text-blush-200">
                Gynaecologist &amp; Laparoscopic Surgeon
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                className={`relative font-sans text-sm px-4 py-2 rounded-full transition-all duration-200
                  ${pathname === l.href
                    ? "text-white font-semibold"
                    : "text-white/80 hover:text-white"
                  }`}
              >
                {l.label}
                {pathname === l.href && (
                  <motion.span layoutId="nav-pill"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                  />
                )}
              </Link>
            ))}
            <Link href="/appointments" className="btn-blush btn-sm ml-3 shadow-glow-blush">
              Book Now
            </Link>
          </nav>

          {/* Mobile burger */}
          <button onClick={() => setOpen(!open)} aria-label="Menu"
            className="md:hidden p-2 rounded-xl text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-40 backdrop-blur-xl border-b border-brand-700 shadow-xl md:hidden"
            style={{ background: "linear-gradient(135deg, #1a9086 0%, #0e4a45 100%)" }}
          >
            <div className="container-site py-6 flex flex-col gap-2">
              <div className="flex items-center gap-3 px-4 pb-4 border-b border-white/10 mb-2">
                <Image src="/logo.png" alt="Logo" width={36} height={36} className="rounded-full object-contain bg-white/10 p-0.5" />
                <span className="font-serif text-white font-semibold">Dr. Nisha Tabassum</span>
              </div>
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className={`font-sans text-base px-4 py-3 rounded-2xl transition-colors
                    ${pathname === l.href
                      ? "bg-white/15 text-white font-semibold"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}>
                  {l.label}
                </Link>
              ))}
              <Link href="/appointments" onClick={() => setOpen(false)}
                className="btn-blush text-center mt-3">
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}