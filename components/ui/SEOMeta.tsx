import Head from "next/head";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

interface SEOMetaProps {
  title:       string;
  description: string;
  keywords?:   string;
  path?:       string; // e.g. "/about"
  noIndex?:    boolean;
}

export default function SEOMeta({
  title, description, keywords, path = "", noIndex = false,
}: SEOMetaProps) {
  const url = `${SITE_URL}${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description"  content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots"       content={noIndex ? "noindex,nofollow" : "index,follow"} />
      <link rel="canonical"     href={url} />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={url} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
}
