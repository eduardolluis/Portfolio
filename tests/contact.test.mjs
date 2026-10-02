import test from "node:test";
import assert from "node:assert/strict";
import { buildEmailContent } from "../api/contact/email.ts";
import {
  extractContactFields,
  getClientIp,
  validateContactFields,
} from "../api/contact/validation.ts";

test("Contact API helpers", async (t) => {
  await t.test("trims and validates a normal inquiry", () => {
    const fields = extractContactFields({
      name: "  Eduardo  ",
      email: "  eduardo@example.com ",
      message: "  Hello there  ",
    });

    assert.equal(fields.name, "Eduardo");
    assert.equal(fields.email, "eduardo@example.com");
    assert.equal(fields.message, "Hello there");
    assert.equal(validateContactFields(fields), null);
  });

  await t.test("rejects invalid required fields", () => {
    const fields = extractContactFields({
      name: "A",
      email: "not-an-email",
      message: "hey",
    });
    assert.match(validateContactFields(fields), /name/i);
  });

  await t.test("uses the first forwarded IP and bounds its size", () => {
    assert.equal(getClientIp("203.0.113.8, 10.0.0.1"), "203.0.113.8");
    assert.equal(getClientIp(undefined), "unknown-ip");
    assert.equal(getClientIp("x".repeat(150)).length, 100);
  });

  await t.test("escapes untrusted content in the HTML email", () => {
    const fields = extractContactFields({
      name: "Eduardo",
      email: "eduardo@example.com",
      message: "<script>alert(1)</script>",
    });
    const email = buildEmailContent(fields, '<img src=x onerror="boom">');

    assert.doesNotMatch(email.html, /<script>/);
    assert.match(email.html, /&lt;script&gt;/);
    assert.doesNotMatch(email.html, /<img src=x/);
    assert.match(email.html, /&lt;img src=x onerror=&quot;boom&quot;&gt;/);
  });
});
