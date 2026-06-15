import type { NextApiRequest, NextApiResponse } from "next";

const BASE = "https://drnishatabassum.com";

const PAGES = [
  { path: "/",            priority: "1.0", changefreq: "weekly"  },
  { path: "/about",       priority: "0.9", changefreq: "monthly" },
  { path: "/services",    priority: "0.9", changefreq: "monthly" },
  { path: "/locations",   priority: "0.8", changefreq: "monthly" },
  { path: "/appointments",priority: "0.9", changefreq: "weekly"  },
  { path: "/contact",     priority: "0.7", changefreq: "monthly" },
];

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(p => `  <url>
    <loc>${BASE}${p.path}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </url>`).join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
  res.status(200).send(xml);
}
