import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import { useRouter } from "next/router";

interface LayoutProps { children: React.ReactNode }

// Pages that handle their own top-spacing (have full-bleed hero)
const FULL_BLEED_PAGES = ["/", "/about"];

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter();
  const isFullBleed  = FULL_BLEED_PAGES.includes(pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-1 ${isFullBleed ? "" : "pt-16 md:pt-20"}`}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
