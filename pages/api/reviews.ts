/**
 * GET  /api/reviews → approved reviews (public)
 * POST /api/reviews → submit a new review (saved as unapproved)
 */
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const ReviewSchema = z.object({
  name:     z.string().trim().min(2).max(80),
  location: z.string().trim().min(2).max(80),
  rating:   z.coerce.number().int().min(1).max(5),
  message:  z.string().trim().min(10).max(1000),
  website:  z.string().optional(), // honeypot — real users never fill this
});

// Basic per-instance rate limit: 3 submissions per IP per 10 minutes.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET")  return listApproved(res);
  if (req.method === "POST") return submit(req, res);
  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ success: false, message: "Method not allowed" });
}

async function listApproved(res: NextApiResponse) {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("reviews")
      .select("id, name, location, rating, message")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(30);
    if (error) throw error;

    // No CDN caching: approvals/deletes in /admin must show up immediately.
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ reviews: data });
  } catch (err) {
    console.error("[GET /api/reviews]", err);
    return res.status(500).json({ reviews: [], message: "Could not load reviews." });
  }
}

async function submit(req: NextApiRequest, res: NextApiResponse) {
  const parsed = ReviewSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Please check the form and try again." });
  }

  const { website, ...review } = parsed.data;

  // Honeypot filled → silently pretend success so bots don't retry.
  if (website) return res.status(200).json({ success: true });

  const ip = String(req.headers["x-forwarded-for"] ?? req.socket.remoteAddress ?? "").split(",")[0].trim();
  if (rateLimited(ip)) {
    return res.status(429).json({ success: false, message: "Too many submissions. Please try again later." });
  }

  try {
    const { error } = await getSupabaseAdmin().from("reviews").insert({ ...review, approved: false });
    if (error) throw error;
    return res.status(201).json({ success: true });
  } catch (err) {
    console.error("[POST /api/reviews]", err);
    return res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
}
