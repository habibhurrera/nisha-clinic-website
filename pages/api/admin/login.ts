/**
 * POST   /api/admin/login  { password } → sets session cookie
 * DELETE /api/admin/login               → logs out
 * GET    /api/admin/login               → { loggedIn }
 */
import type { NextApiRequest, NextApiResponse } from "next";
import { checkPassword, clearSessionCookie, isAdmin, setSessionCookie } from "@/lib/adminAuth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json({ loggedIn: isAdmin(req) });
  }

  if (req.method === "POST") {
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (!checkPassword(password)) {
      return res.status(401).json({ success: false, message: "Incorrect password." });
    }
    setSessionCookie(res);
    return res.status(200).json({ success: true });
  }

  if (req.method === "DELETE") {
    clearSessionCookie(res);
    return res.status(200).json({ success: true });
  }

  res.setHeader("Allow", "GET, POST, DELETE");
  return res.status(405).json({ success: false, message: "Method not allowed" });
}
