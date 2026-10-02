/**
 * Minimal admin auth for /admin.
 * Password comes from ADMIN_PASSWORD. On login we set an httpOnly cookie
 * holding "<expiry>.<hmac>" — no database session table needed.
 * Changing ADMIN_PASSWORD logs out every existing session.
 */
import { createHmac, timingSafeEqual } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_SEC = 60 * 60 * 24 * 7; // 7 days

function secret(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD must be set.");
  return `${pw}:${process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""}`;
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function checkPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  return !!pw && safeEqual(input, pw);
}

function cookieAttrs(maxAge: number): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}`;
}

export function setSessionCookie(res: NextApiResponse) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SEC;
  const token = `${exp}.${sign(String(exp))}`;
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=${token}; ${cookieAttrs(SESSION_TTL_SEC)}`);
}

export function clearSessionCookie(res: NextApiResponse) {
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=; ${cookieAttrs(0)}`);
}

export function isAdmin(req: NextApiRequest): boolean {
  const token = req.cookies[COOKIE_NAME];
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  try {
    return safeEqual(sig, sign(exp));
  } catch {
    return false;
  }
}
