import Head from "next/head";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/sections/PageHero";
import { SITE_URL } from "@/lib/constants";

const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));

const TITLE = "Contact Dr. Nisha Tabassum | Gynaecologist Karachi";
const DESC  = "Get in touch with Dr. Nisha Tabassum's clinic in Karachi for appointments, queries, or emergencies. Call, WhatsApp, or email us directly.";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description"         content={DESC} />
        <meta name="keywords"            content="contact gynaecologist Karachi, Dr Nisha Tabassum contact, women doctor Karachi phone, WhatsApp gynaecologist" />
        <meta name="robots"              content="index, follow" />
        <link rel="canonical"            href={`${SITE_URL}/contact`} />
        <meta property="og:title"        content={TITLE} />
        <meta property="og:description"  content={DESC} />
        <meta property="og:url"          content={`${SITE_URL}/contact`} />
      </Head>
      <Layout>
        <PageHero
          badge="Get In Touch"
          title="Contact Us"
          subtitle="Reach out via call, WhatsApp, or email. We respond within a few hours."
        />
        <ContactSection />
      </Layout>
    </>
  );
}
