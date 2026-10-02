import type { ContactFields } from "./types";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export function buildEmailContent(fields: ContactFields, clientIp: string) {
  const { name, email, company, need, budget, message } = fields;
  const subject = `New Portfolio Inquiry from ${name}${company ? ` (${company})` : ""}`;
  const text = `New Project Inquiry:

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
  const safeClientIp = escapeHtml(clientIp);

  const html = `
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
          Received on ${new Date().toUTCString()} · IP: ${safeClientIp}
        </p>
      </div>
    `;

  return { subject, text, html };
}

export async function sendContactEmail({
  resendApiKey,
  fromEmail,
  toEmail,
  replyTo,
  subject,
  text,
  html,
}: {
  resendApiKey: string;
  fromEmail: string;
  toEmail: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: replyTo,
      subject,
      text,
      html,
    }),
  });
}
