import test from 'node:test';
import assert from 'node:assert/strict';
import { siteConfig } from '../src/config/site.ts';
import { en } from '../src/locales/en.ts';
import { es } from '../src/locales/es.ts';

test('Portfolio Configuration & Identity', async (t) => {
  await t.test('siteConfig contains verified identity and non-empty links', () => {
    assert.equal(siteConfig.name, 'Eduardo De La Cruz');
    assert.equal(siteConfig.monogram, 'E');
    assert.match(siteConfig.github, /^https:\/\/github\.com\//);
    assert.match(siteConfig.email, /@/);
    assert.match(siteConfig.domain, /^https:\/\//);
  });
});

test('Internationalization (EN / ES Parity)', async (t) => {
  await t.test('English and Spanish have identical navigation sections', () => {
    assert.deepEqual(Object.keys(en.nav), Object.keys(es.nav));
  });

  await t.test('Both locales expose all localized portfolio UI labels', () => {
    for (const locale of [en, es]) {
      assert.ok(locale.hero.selectedWork);
      assert.ok(locale.hero.expandView);
      assert.ok(locale.hero.showcase.gio.description);
      assert.ok(locale.work.expandView);
      assert.ok(locale.work.screenshotView);
      assert.ok(locale.work.privateProject);
      assert.ok(locale.work.desktopView);
      assert.ok(locale.work.mobileView);
      assert.ok(locale.about.locationText);
      assert.ok(locale.about.stackDescription);
      assert.ok(locale.contact.directDescription);
      assert.ok(locale.contact.responseTime);
      assert.ok(locale.contact.whatsappMessage);
      assert.ok(locale.contact.emailFallback);
      assert.ok(locale.footer.connectTitle);
    }
  });

  await t.test('Both locales have 3 projects with verified data', () => {
    assert.equal(en.work.projects.length, 3);
    assert.equal(es.work.projects.length, 3);
    for (let i = 0; i < 3; i += 1) {
      assert.equal(en.work.projects[i].id, es.work.projects[i].id);
      assert.ok(en.work.projects[i].screenshots.length >= 3);
      assert.ok(es.work.projects[i].screenshots.length >= 3);
    }
  });

  await t.test('Primary case study is GIO Workspace with real screenshots', () => {
    const gioEn = en.work.projects[0];
    assert.equal(gioEn.id, 'gio-workspace');
    assert.equal(gioEn.screenshots[0].url, '/images/projects/gio/dashboard.webp');
    assert.equal(gioEn.screenshots[0].label, 'Home');
    assert.ok(gioEn.screenshots.some((shot) => shot.label === 'Login'));
    assert.ok(gioEn.screenshots.some((shot) => shot.type === 'mobile'));
    assert.equal(gioEn.github, null);
  });

  await t.test('Independent engineering projects carry required disclaimers', () => {
    const whatzapp = en.work.projects.find((p) => p.id === 'whatzapp');
    assert.ok(whatzapp?.independentNote?.includes('Not affiliated with WhatsApp'));
  });

  await t.test('Services match 6 core business problem categories', () => {
    assert.equal(en.services.items.length, 6);
    assert.equal(es.services.items.length, 6);
  });

  await t.test('Process defines 5 transparent client delivery steps', () => {
    assert.equal(en.process.steps.length, 5);
    assert.equal(es.process.steps.length, 5);
  });
});
