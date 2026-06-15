import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import StatsBar    from "@/components/sections/StatsBar";
import { SITE_URL } from "@/lib/constants";

const AboutSnippet       = dynamic(() => import("@/components/sections/AboutSnippet"));
const ServicesGrid       = dynamic(() => import("@/components/sections/ServicesGrid"));
const TestimonialsSlider = dynamic(() => import("@/components/sections/TestimonialsSlider"));
const LocationsMap       = dynamic(() => import("@/components/sections/LocationsMap"));
const AppointmentCTA     = dynamic(() => import("@/components/sections/AppointmentCTA"));
const ApprovedReviews    = dynamic(() => import("@/components/sections/ApprovedReviews"), { ssr: false });
const ReviewFormSection  = dynamic(() => import("@/components/sections/ReviewFormSection"), { ssr: false });

const TITLE = "Dr. Nisha Tabassum | Best Gynaecologist in Karachi — MBBS, FCPS";
const DESC  = "Dr. Nisha Tabassum is a PMDC-Verified Consultant Gynaecologist, Laparoscopic Surgeon & Infertility Specialist in Karachi with 13+ years experience. Expert in PCOS, high-risk pregnancy, infertility, laparoscopic surgery & antenatal care. Book appointment today.";
const KEYWORDS = [
  "Dr Nisha Tabassum",
  "Nisha Tabassum gynaecologist",
  "best gynaecologist in Karachi",
  "best gynae in Karachi",
  "best gynae in Pakistan",
  "female gynaecologist Karachi",
  "PCOS treatment Karachi",
  "PCOS doctor Karachi",
  "laparoscopic surgeon Karachi",
  "high risk pregnancy doctor Karachi",
  "infertility specialist Karachi",
  "antenatal care Karachi",
  "women doctor Karachi",
  "gynaecologist Nazimabad Karachi",
  "FCPS gynaecologist Karachi",
  "PMDC verified gynaecologist Pakistan",
  "pregnancy doctor Karachi",
  "C section doctor Karachi",
  "irregular periods treatment Karachi",
  "menopause specialist Karachi",
  "fibroid treatment Karachi",
  "hysteroscopy Karachi",
  "ovarian cyst treatment Karachi",
  "book gynaecologist appointment Karachi",
  "Dr Nisha gynae Karachi",
  "Nisha Tabassum MBBS FCPS",
  "gynaecologist Mamji Hospital",
  "gynaecologist RIMS Trauma Hospital",
  "gynaecologist Sindh Rangers Hospital",
].join(", ");

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // If hash is #leave-review, wait for dynamic sections to mount then scroll
    if (router.asPath.includes("#leave-review")) {
      const scroll = () => {
        const el = document.getElementById("leave-review");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };
      // Try immediately, then retry a few times to handle lazy-load delay
      const timers = [
        setTimeout(scroll, 300),
        setTimeout(scroll, 800),
        setTimeout(scroll, 1500),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description"         content={DESC} />
        <meta name="keywords"            content={KEYWORDS} />
        <meta name="robots"              content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical"            href="https://www.drnishatabassum.com" />

        {/* Open Graph */}
        <meta property="og:title"        content={TITLE} />
        <meta property="og:description"  content={DESC} />
        <meta property="og:url"          content="https://www.drnishatabassum.com" />
        <meta property="og:type"         content="website" />

        {/* Twitter */}
        <meta name="twitter:title"       content={TITLE} />
        <meta name="twitter:description" content={DESC} />
      </Head>
      <Layout>
        <HeroSection />
        <StatsBar />
        <AboutSnippet />
        <ServicesGrid />
        <TestimonialsSlider />
        <LocationsMap />
        <AppointmentCTA />
        <ApprovedReviews />
        <ReviewFormSection />
      </Layout>
    </>
  );
}