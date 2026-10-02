import test from "node:test";
import assert from "node:assert/strict";
import { content, site } from "../src/data/content.ts";

const en = content.en;
const es = content.es;

test("Portfolio Configuration & Identity", async (t) => {
  await t.test("site contains verified identity and non-empty links", () => {
    assert.equal(site.name, "Eduardo De La Cruz");
    assert.match(site.github, /^https:\/\/github\.com\//);
    assert.match(site.email, /@/);
    assert.match(site.linkedin, /^https:\/\//);
    assert.match(site.whatsapp, /^https:\/\//);
    assert.equal(site.resume, "/Eduardo_De_La_Cruz_Resume.pdf");
  });
});

test("Internationalization (EN / ES Parity)", async (t) => {
  await t.test("English and Spanish have identical navigation sections", () => {
    assert.deepEqual(Object.keys(en.nav), Object.keys(es.nav));
  });

  await t.test("Both locales expose all localized portfolio UI labels", () => {
    for (const locale of [en, es]) {
      assert.ok(locale.nav.stack);
      assert.ok(locale.hero.lead);
      assert.ok(locale.hero.resume);
      assert.ok(locale.projects.title);
      assert.ok(locale.projects.explore);
      assert.ok(locale.about.title);
      assert.ok(locale.contact.form.message);
      assert.ok(locale.footer);
    }
  });

  await t.test("Both locales have 5 projects with verified data", () => {
    assert.equal(en.projects.items.length, 5);
    assert.equal(es.projects.items.length, 5);
    for (let i = 0; i < 5; i += 1) {
      assert.equal(en.projects.items[i].id, es.projects.items[i].id);
      assert.ok(en.projects.items[i].gallery.length >= 2);
      assert.ok(es.projects.items[i].gallery.length >= 2);
    }
  });

  await t.test(
    "Primary case study is GIO Workspace with real screenshots",
    () => {
      const gioEn = en.projects.items.find((project) => project.id === "gio");
      assert.equal(
        gioEn?.gallery[0].src,
        "/images/projects/gio/dashboard.webp",
      );
      assert.equal(gioEn?.gallery[0].label, "Dashboard");
      assert.ok(
        gioEn?.gallery.some((shot) =>
          shot.label.toLowerCase().includes("login"),
        ),
      );
      assert.ok(gioEn?.gallery.some((shot) => shot.kind === "mobile"));
      assert.equal(gioEn?.caseStudy, "/gio-workspace.pdf");
    },
  );

  await t.test(
    "Independent engineering projects carry required disclaimers",
    () => {
      const whatzapp = en.projects.items.find(
        (project) => project.id === "whatzapp",
      );
      assert.ok(whatzapp?.disclaimer?.includes("Not affiliated with WhatsApp"));
    },
  );

  await t.test(
    "Discord Clone exposes a real project gallery and live demo",
    () => {
      const discord = en.projects.items.find(
        (project) => project.id === "discord",
      );
      assert.ok(discord);
      assert.ok(discord.gallery.some((shot) => shot.label === "Chat"));
      assert.ok(discord.gallery.some((shot) => shot.label === "Voice & video"));
      assert.match(discord.github ?? "", /discord-clone/);
      assert.match(discord.live ?? "", /^https:\/\//);
      assert.equal(
        en.projects.items.some((project) => project.id === "multistore"),
        false,
      );
    },
  );

  await t.test("Capabilities expose the active service categories", () => {
    assert.equal(en.capabilities.items.length, 4);
    assert.equal(es.capabilities.items.length, 4);
  });

  await t.test("About timeline exposes the active milestones", () => {
    assert.equal(en.about.timeline.length, 3);
    assert.equal(es.about.timeline.length, 3);
  });
});
