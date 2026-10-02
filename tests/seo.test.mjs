import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { URL } from "node:url";
import { site } from "../src/data/content.ts";

const expectedBaseUrl = site.url.replace(/\/$/, "");
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

test("SEO URLs stay aligned with the live portfolio URL", async () => {
  const [html, robots, sitemap] = await Promise.all([
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
  ]);

  const escapedBaseUrl = escapeRegExp(expectedBaseUrl);
  assert.match(html, new RegExp(escapedBaseUrl));
  assert.match(robots, new RegExp(`${escapedBaseUrl}/sitemap\\.xml`));
  assert.match(sitemap, new RegExp(`<loc>${escapedBaseUrl}/</loc>`));
});

test("CSP allows the current inline JSON-LD payload", async () => {
  const [html, vercelConfigText] = await Promise.all([
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../vercel.json", import.meta.url), "utf8"),
  ]);
  const scriptMatch = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  );
  assert.ok(scriptMatch, "JSON-LD script should exist");

  const hash = createHash("sha256")
    .update(scriptMatch[1])
    .digest("base64");
  const csp = JSON.parse(vercelConfigText).headers[0].headers.find(
    (header) => header.key === "Content-Security-Policy",
  )?.value;

  assert.ok(csp);
  assert.match(csp, new RegExp(`'sha256-${escapeRegExp(hash)}'`));
});
