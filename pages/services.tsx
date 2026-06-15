import Head from "next/head";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/sections/PageHero";
import { SITE_URL } from "@/lib/constants";

const ServicesGrid = dynamic(() => import("@/components/sections/ServicesGrid"));

const TITLE = "Gynaecology & Laparoscopic Surgery Services | Dr. Nisha Tabassum Karachi";
const DESC  = "Comprehensive women's healthcare services: antenatal care, laparoscopic surgery, hysteroscopy, PCOS management, fertility consultations, menopause care, and more in Karachi.";

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description"         content={DESC} />
        <meta name="keywords"            content="gynaecology services Karachi, laparoscopic surgery Karachi, PCOS treatment, antenatal care, hysteroscopy Karachi, fertility consultation Karachi, menopause care" />
        <meta name="robots"              content="index, follow" />
        <link rel="canonical"            href={`${SITE_URL}/services`} />
        <meta property="og:title"        content={TITLE} />
        <meta property="og:description"  content={DESC} />
        <meta property="og:url"          content={`${SITE_URL}/services`} />
      </Head>
      <Layout>
        <PageHero
          badge="Our Services"
          title="Complete Women's Healthcare"
          subtitle="Expert, compassionate care at every stage of a woman's life."
        />
        <ServicesGrid />
      </Layout>
    </>
  );
}
