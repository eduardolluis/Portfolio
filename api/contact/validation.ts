import type { ContactBody, ContactFields } from "./types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function extractContactFields(body: ContactBody): ContactFields {
  return {
    name: body.name?.trim() || "",
    email: body.email?.trim() || "",
    company: body.company?.trim() || "",
    need: body.need?.trim() || "",
    budget: body.budget?.trim() || "",
    message: body.message?.trim() || "",
  };
}

export function validateContactFields(fields: ContactFields) {
  if (!fields.name || fields.name.length < 2 || fields.name.length > 100) {
    return "Please provide a valid name (2-100 characters).";
  }

  if (
    !fields.email ||
    !emailRegex.test(fields.email) ||
    fields.email.length > 120
  ) {
    return "Please provide a valid email address.";
  }

  if (
    !fields.message ||
    fields.message.length < 5 ||
    fields.message.length > 4000
  ) {
    return "Message must be between 5 and 4000 characters.";
  }

  return null;
}

export function getClientIp(
  forwardedFor: string | string[] | undefined,
): string {
  const raw = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
  const first = raw?.split(",")[0]?.trim();
  return first ? first.slice(0, 100) : "unknown-ip";
}
