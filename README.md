# Dr. Nisha Tabassum — Clinic Website

Next.js 14 + Tailwind CSS | Steps 1–9 Complete

## 🚀 Quick Start

```bash
npm install
cp .env.local.example .env.local   # fill in your values
npm run dev                         # http://localhost:3000
```

## 📦 Deploy to Vercel (Recommended)

### Option A — Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option B — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to https://vercel.com → "New Project"
3. Import your GitHub repo
4. Framework: **Next.js** (auto-detected)
5. Add environment variables from `.env.local.example`
6. Click **Deploy** ✅

### Environment Variables to add in Vercel Dashboard
| Variable                      | Value                           |
|-------------------------------|---------------------------------|
| `NEXT_PUBLIC_SITE_URL`        | `https://drnishatabassum.com`   |
| `NEXT_PUBLIC_GA_ID`           | `G-XXXXXXXXXX` (optional)       |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | your Maps API key (optional)    |

## 🔧 Custom Domain on Vercel
1. Vercel Dashboard → your project → **Settings → Domains**
2. Add `drnishatabassum.com`
3. Update your domain registrar DNS:
   - **A record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com`

## 📂 Project Structure

```
clinic/
├── pages/
│   ├── index.tsx          # Home — lazy loads all below-fold sections
│   ├── about.tsx
│   ├── services.tsx
│   ├── locations.tsx
│   ├── appointments.tsx   # Booking form → WhatsApp redirect
│   ├── contact.tsx
│   ├── 404.tsx
│   └── api/
│       ├── booking.ts     # Fallback API (not required with WhatsApp flow)
│       ├── contact.ts
│       └── sitemap.ts     # Auto-generates XML sitemap
├── components/
│   ├── layout/            # Navbar, Footer, Layout
│   ├── sections/          # HeroSection, AboutSnippet, ServicesGrid…
│   └── ui/                # Button, Card, LazyImage, SEOMeta, ErrorBoundary
├── styles/
│   ├── globals.css        # Full design system
│   └── animations.css
├── public/
│   ├── images/            # Add real photos here
│   ├── robots.txt
│   └── site.webmanifest
├── lib/constants.ts       # All site-wide data
├── vercel.json            # Vercel deployment config
└── next.config.js         # Images, caching, security headers
```

## 📸 Adding Real Photos

Replace placeholder SVGs with actual images:
```tsx
// In HeroSection.tsx — swap SVG for:
<Image
  src="/images/hero/doctor.jpg"
  alt="Dr. Nisha Tabassum"
  fill
  priority           // ← important for LCP
  className="object-cover"
/>

// For all other sections use LazyImage:
import LazyImage from "@/components/ui/LazyImage";
<LazyImage src="/images/about/doctor.jpg" alt="..." width={400} height={500} />
```

## 📲 How Booking Works (WhatsApp Flow)
1. Patient fills the form (Name, Phone, Location, Date, Concern)
2. Clicks **Request Appointment via WhatsApp**
3. WhatsApp opens with a pre-filled professional message
4. Patient taps **Send** — message goes to Dr. Nisha's number
5. Clinic confirms the slot via WhatsApp reply

WhatsApp number is set in `lib/constants.ts` → `CONTACT.whatsappIntl`

## 🔍 SEO Checklist
- [x] Unique title + description on every page
- [x] Canonical URLs
- [x] OG / Twitter Card meta
- [x] JSON-LD Physician structured data
- [x] robots.txt
- [x] /api/sitemap → XML sitemap
- [x] next/image (WebP/AVIF auto-conversion)
- [x] Lazy loading all below-fold sections
- [x] Security headers via next.config.js
