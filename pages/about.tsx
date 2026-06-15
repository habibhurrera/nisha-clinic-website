import Head from "next/head";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/sections/PageHero";
import { SITE_URL } from "@/lib/constants";

const AboutSection = dynamic(() => import("@/components/sections/AboutSection"));

const TITLE = "About Dr. Nisha Tabassum | FCPS Gynaecologist & Laparoscopic Surgeon Karachi";
const DESC  = "Learn about Dr. Nisha Tabassum's 13+ years of gynaecological expertise, FCPS qualifications, PMDC verification, and her philosophy of compassionate women's healthcare.";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description"         content={DESC} />
        <meta name="keywords"            content="Dr Nisha Tabassum gynaecologist, FCPS gynaecologist Karachi, women specialist Karachi, laparoscopic surgeon Karachi, PMDC verified doctor" />
        <meta name="robots"              content="index, follow" />
        <link rel="canonical"            href={`${SITE_URL}/about`} />
        <meta property="og:title"        content={TITLE} />
        <meta property="og:description"  content={DESC} />
        <meta property="og:url"          content={`${SITE_URL}/about`} />
      </Head>
      <Layout>
        <PageHero
          badge="About the Doctor"
          title="A Career Dedicated to Women's Health"
          subtitle="13 years of compassionate, expert gynaecological care in Karachi."
        />
        <AboutSection />
      </Layout>
    </>
  );
}
