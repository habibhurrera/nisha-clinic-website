/**
 * POST /api/booking
 * Handles appointment booking form submissions.
 * Validates input, sends confirmation email, stores lead.
 */
import type { NextApiRequest, NextApiResponse } from "next";

type BookingPayload = {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  location: string;
  reason?: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  bookingId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { name, phone, email, date, time, location, reason } =
    req.body as BookingPayload;

  // Basic validation
  if (!name || !phone || !date || !time || !location) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields.",
    });
  }

  // TODO (Step N): Integrate email (nodemailer / Resend) and/or CRM here
  // TODO (Step N): Save to database (e.g. Supabase, MongoDB)

  const bookingId = `NT-${Date.now()}`;

  console.log("[Booking]", { bookingId, name, phone, email, date, time, location, reason });

  return res.status(200).json({
    success: true,
    message: "Your appointment request has been received. We will confirm shortly.",
    bookingId,
  });
}
