/**
 * POST /api/contact
 * Handles general contact form submissions.
 */
import type { NextApiRequest, NextApiResponse } from "next";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

type ApiResponse = { success: boolean; message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { name, email, message } = req.body as ContactPayload;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required.",
    });
  }

  // TODO (Step N): Send email via nodemailer / Resend
  console.log("[Contact]", req.body);

  return res.status(200).json({
    success: true,
    message: "Thank you for reaching out. We will get back to you within 24 hours.",
  });
}
