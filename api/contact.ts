import { buildEmailContent, sendContactEmail } from "./contact/email";
import { isRateLimited } from "./contact/rateLimit";
import type { ContactBody, RequestLike, ResponseLike } from "./contact/types";
import {
  extractContactFields,
  getClientIp,
  validateContactFields,
} from "./contact/validation";

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const body: ContactBody = req.body || {};

  if (body.website?.trim()) {
    return res.status(200).json({ ok: true });
  }

  const fields = extractContactFields(body);
  const validationError = validateContactFields(fields);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail =
    process.env.CONTACT_TO_EMAIL || "eduardodelacruzg5@gmail.com";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ||
    "Portfolio Contact <onboarding@resend.dev>";

  if (!resendApiKey) {
    console.warn("[Contact API] RESEND_API_KEY is not configured.");
    return res.status(503).json({ error: "Email delivery is not configured." });
  }

  const clientIp = getClientIp(req.headers["x-forwarded-for"]);
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: "Too many inquiries sent. Please wait 60 seconds before trying again.",
    });
  }

  try {
    const email = buildEmailContent(fields, clientIp);
    const resendResponse = await sendContactEmail({
      resendApiKey,
      fromEmail,
      toEmail,
      replyTo: fields.email,
      ...email,
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("[Contact API] Resend API error:", errorText);
      return res
        .status(502)
        .json({ error: "Failed to dispatch email via provider." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[Contact API] Unexpected error:", error);
    return res.status(500).json({ error: "Internal server error occurred." });
  }
}
