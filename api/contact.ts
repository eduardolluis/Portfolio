export interface ContactBody {
  name?: string;
  email?: string;
  company?: string;
  need?: string;
  budget?: string;
  message?: string;
  website?: string; // Honeypot field
}

interface RequestLike {
  method?: string;
  headers: Record<string, string | undefined>;
  body?: ContactBody;
}

interface ResponseLike {
  status: (code: number) => {
    json: (data: unknown) => void;
  };
}

// In-memory rate limiting map: IP -> timestamp
const ipRateLimitMap = new Map<string, number>();

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

// Periodic cleanup of stale rate-limit entries
function cleanupRateLimitMap() {
  const cutoff = Date.now() - 5 * 60 * 1000;
  for (const [ip, timestamp] of ipRateLimitMap.entries()) {
    if (timestamp < cutoff) {
      ipRateLimitMap.delete(ip);
    }
  }
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  // 1. Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const body: ContactBody = req.body || {};

  // 2. Anti-spam honeypot check: If the hidden 'website' field is populated, silently accept
  if (body.website && body.website.trim().length > 0) {
    return res.status(200).json({ ok: true });
  }

  // 3. Extract and sanitize fields
  const name = body.name?.trim() || "";
  const email = body.email?.trim() || "";
  const company = body.company?.trim() || "";
  const need = body.need?.trim() || "";
  const budget = body.budget?.trim() || "";
  const message = body.message?.trim() || "";

  // 4. Validate required fields
  if (!name || name.length < 2 || name.length > 100) {
    return res.status(400).json({ error: "Please provide a valid name (2-100 characters)." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email) || email.length > 120) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  if (!message || message.length < 5 || message.length > 4000) {
    return res.status(400).json({ error: "Message must be between 5 and 4000 characters." });
  }

  // 5. Rate limiting: 1 request per 60 seconds per IP
  const forwardedFor = req.headers["x-forwarded-for"];
  const clientIp = typeof forwardedFor === "string" ? forwardedFor.split(",")[0].trim() : "unknown-ip";

  cleanupRateLimitMap();
  const lastRequestTime = ipRateLimitMap.get(clientIp);
  const now = Date.now();

  if (lastRequestTime && now - lastRequestTime < 60 * 1000) {
    return res.status(429).json({
      error: "Too many inquiries sent. Please wait 60 seconds before trying again.",
    });
  }
  ipRateLimitMap.set(clientIp, now);

  // 6. Resend Email Dispatch
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "eduardodelacruzg5@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  // If no Resend key is configured in dev or staging
  if (!resendApiKey) {
    console.warn("[Contact API] RESEND_API_KEY not configured. Logging inquiry locally:");
    console.log({
      timestamp: new Date().toISOString(),
      name,
      email,
      company: company || "(none)",
      need: need || "(none)",
      budget: budget || "(none)",
      message,
    });

    // In local dev/staging without key, simulate successful delivery so UI works smoothly
    return res.status(200).json({
      ok: true,
      notice: "Inquiry logged. Configure RESEND_API_KEY in production to send live emails.",
    });
  }

  try {
    const emailSubject = `New Portfolio Inquiry from ${name}${company ? ` (${company})` : ""}`;
    const emailText = `New Project Inquiry:

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Project Need: ${need || "Not specified"}
Estimated Budget: ${budget || "Not specified"}

Message:
${message}

---
Sent via Eduardo De La Cruz Portfolio Contact Form
Client IP: ${clientIp}
Timestamp: ${new Date().toISOString()}`;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company || "—");
    const safeNeed = escapeHtml(need || "—");
    const safeBudget = escapeHtml(budget || "—");
    const safeMessage = escapeHtml(message);

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #141f1a; border: 1px solid #dcded9; border-radius: 8px;">
        <h2 style="color: #141f1a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #b85d3b; padding-bottom: 8px;">
          New Portfolio Project Inquiry
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #6e7f77;">Client Name:</td>
            <td style="padding: 8px 0; color: #141f1a;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #6e7f77;">Email Address:</td>
            <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #b85d3b; text-decoration: none;">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #6e7f77;">Company:</td>
            <td style="padding: 8px 0; color: #141f1a;">${safeCompany}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #6e7f77;">Project Type:</td>
            <td style="padding: 8px 0; color: #141f1a;">${safeNeed}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #6e7f77;">Budget Range:</td>
            <td style="padding: 8px 0; color: #141f1a;">${safeBudget}</td>
          </tr>
        </table>
        <div style="background-color: #f7f6f2; padding: 16px; border-radius: 6px; border-left: 3px solid #b85d3b; margin: 20px 0;">
          <h4 style="margin: 0 0 8px 0; color: #141f1a; font-size: 14px;">Project Description:</h4>
          <p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #33423a;">${safeMessage}</p>
        </div>
        <p style="font-size: 12px; color: #88998f; margin-top: 24px; border-top: 1px solid #e2e4df; padding-top: 12px;">
          Received on ${new Date().toUTCString()} · IP: ${clientIp}
        </p>
      </div>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const err = await resendResponse.text();
      console.error("[Contact API] Resend API error:", err);
      return res.status(502).json({ error: "Failed to dispatch email via provider." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[Contact API] Unexpected error:", error);
    return res.status(500).json({ error: "Internal server error occurred." });
  }
}
