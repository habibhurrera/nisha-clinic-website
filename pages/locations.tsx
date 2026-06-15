import Head from "next/head";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/sections/PageHero";
import { SITE_URL } from "@/lib/constants";

const LocationsMap = dynamic(() => import("@/components/sections/LocationsMap"));

const TITLE = "Clinic Locations & Timings | Dr. Nisha Tabassum Karachi";
const DESC  = "Find Dr. Nisha Tabassum at Nazimabad Clinic, Sindh Rangers Hospital, Mamji Hospital, and RIMS Trauma Hospital in Karachi. View addresses, timings, and maps.";

export default function LocationsPage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description"         content={DESC} />
        <meta name="keywords"            content="gynaecologist Nazimabad Karachi, Sindh Rangers Hospital gynaecologist, Mamji Hospital gynaecologist, RIMS Trauma Hospital, clinic timings Karachi" />
        <meta name="robots"              content="index, follow" />
        <link rel="canonical"            href={`${SITE_URL}/locations`} />
        <meta property="og:title"        content={TITLE} />
        <meta property="og:description"  content={DESC} />
        <meta property="og:url"          content={`${SITE_URL}/locations`} />
      </Head>
      <Layout>
        <PageHero
          badge="Find Us"
          title="Clinic Locations"
          subtitle="4 convenient locations across Karachi with evening and weekend slots."
        />
        <LocationsMap />
      </Layout>
    </>
  );
}
