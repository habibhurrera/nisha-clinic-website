import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Primary: Soft Teal ──────────────────────────────────
        brand: {
          50:  "#f0faf9",
          100: "#ccefec",
          200: "#99dfd9",
          300: "#5cc7be",
          400: "#2aada3",
          500: "#1a9086",  // main teal
          600: "#15736b",
          700: "#125e57",
          800: "#0e4a45",
          900: "#0a3632",
        },
        // ── Accent: Warm Blush/Rose ─────────────────────────────
        blush: {
          50:  "#fdf5f6",
          100: "#fae8ea",
          200: "#f5cdd3",
          300: "#eda9b2",
          400: "#e07f8d",
          500: "#cc5a6b",  // main rose
          600: "#b5404f",
        },
        // ── Navy (kept for hero dark backgrounds) ───────────────
        navy: {
          50:  "#f0f4f7",
          100: "#dce6ed",
          200: "#b8cedc",
          300: "#7da9c1",
          400: "#4582a1",
          500: "#2b6584",
          600: "#1f4f68",
          700: "#1a3f54",
          800: "#153244",
          900: "#0f2535",
        },
        // ── Charcoal for body text ───────────────────────────────
        charcoal: {
          500: "#4a4a4a",
          700: "#2d2d2d",  // main body text
          900: "#1a1a1a",
        },
        // ── Background surfaces ──────────────────────────────────
        warm: {
          50:  "#fafafa",  // pearl white
          100: "#f5f5f5",
          200: "#ebebeb",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans:  ["var(--font-dm-sans)",   "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 6rem)",    { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.2rem, 5vw, 4rem)",  { lineHeight: "1.1",  letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.6rem, 3vw, 2.5rem)",{ lineHeight: "1.2",  letterSpacing: "-0.01em" }],
      },
      animation: {
        "float":       "float 6s ease-in-out infinite",
        "shimmer":     "shimmer 2.5s linear infinite",
        "pulse-soft":  "pulse-soft 3s ease-in-out infinite",
        "marquee":     "marquee 28s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%":       { opacity: "1" },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "hero-mesh":      "radial-gradient(ellipse 80% 60% at 70% 40%, #fae8ea 0%, #f0faf9 40%, #ccefec 100%)",
        "gradient-brand": "linear-gradient(135deg, #1a9086 0%, #0e4a45 100%)",
        "gradient-blush": "linear-gradient(135deg, #fdf5f6 0%, #fae8ea 50%, #f5cdd3 100%)",
        "gradient-navy":  "linear-gradient(160deg, #153244 0%, #0f2535 100%)",
      },
      boxShadow: {
        "card-soft":  "0 4px 32px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        "card-hover": "0 12px 48px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)",
        "glow-blush": "0 0 40px rgba(204,90,107,0.18)",
        "glow-brand": "0 0 40px rgba(26,144,134,0.22)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
