import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/layout/Layout";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found | Dr. Nisha Tabassum</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Layout>
        <div className="section-py container-site text-center">
          <p className="font-serif text-8xl text-blush-300 mb-4">404</p>
          <h1 className="heading-section mb-4">Page Not Found</h1>
          <p className="body-lead mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/"            className="btn-primary">Go Home</Link>
            <Link href="/appointments" className="btn-outline-brand">Book Appointment</Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
