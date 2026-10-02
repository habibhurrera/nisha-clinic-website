/**
 * Admin-only review management (requires admin session cookie).
 * GET    /api/admin/reviews                 → all reviews, newest first
 * PATCH  /api/admin/reviews { id, approved } → approve / hide
 * DELETE /api/admin/reviews { id }           → delete permanently
 */
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { isAdmin } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const PatchSchema  = z.object({ id: z.string().uuid(), approved: z.boolean() });
const DeleteSchema = z.object({ id: z.string().uuid() });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAdmin(req)) {
    return res.status(401).json({ success: false, message: "Not logged in." });
  }

  res.setHeader("Cache-Control", "no-store");

  try {
    const db = getSupabaseAdmin();

    if (req.method === "GET") {
      const { data, error } = await db
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return res.status(200).json({ reviews: data });
    }

    if (req.method === "PATCH") {
      const parsed = PatchSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ success: false, message: "Invalid request." });
      const { error } = await db.from("reviews").update({ approved: parsed.data.approved }).eq("id", parsed.data.id);
      if (error) throw error;
      return res.status(200).json({ success: true });
    }

    if (req.method === "DELETE") {
      const parsed = DeleteSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ success: false, message: "Invalid request." });
      const { error } = await db.from("reviews").delete().eq("id", parsed.data.id);
      if (error) throw error;
      return res.status(200).json({ success: true });
    }

    res.setHeader("Allow", "GET, PATCH, DELETE");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  } catch (err) {
    console.error(`[${req.method} /api/admin/reviews]`, err);
    return res.status(500).json({ success: false, message: "Database error." });
  }
}
