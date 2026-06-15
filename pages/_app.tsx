import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/animations.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Auto-unregister any stale service workers to prevent Fast Refresh loop
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => reg.unregister());
      });
    }
  }, []);

  return (
    <main className={`${cormorant.variable} ${dmSans.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
