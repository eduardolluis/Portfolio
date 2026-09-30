import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { en } from '../src/locales/en.ts';
import { es } from '../src/locales/es.ts';
import { siteConfig } from '../src/config/site.ts';

describe('Portfolio Configuration & Identity', () => {
  test('siteConfig contains verified identity and non-empty links', () => {
    assert.equal(siteConfig.name, 'Eduardo de la Cruz');
    assert.equal(siteConfig.monogram, 'EDC');
    assert.equal(siteConfig.github, 'https://github.com/eduardolluis');
    assert.ok(siteConfig.email.includes('@'));
    assert.ok(siteConfig.whatsapp.length > 5);
  });
});

describe('Internationalization (EN / ES Parity)', () => {
  test('English and Spanish have identical navigation sections', () => {
    assert.equal(typeof en.nav.work, 'string');
    assert.equal(typeof es.nav.work, 'string');
    assert.equal(typeof en.nav.services, 'string');
    assert.equal(typeof es.nav.services, 'string');
    assert.equal(typeof en.nav.about, 'string');
    assert.equal(typeof es.nav.about, 'string');
    assert.equal(typeof en.nav.process, 'string');
    assert.equal(typeof es.nav.process, 'string');
    assert.equal(typeof en.nav.contact, 'string');
    assert.equal(typeof es.nav.contact, 'string');
  });

  test('Both locales have 4 projects with verified data', () => {
    assert.equal(en.work.projects.length, 4);
    assert.equal(es.work.projects.length, 4);

    for (let i = 0; i < 4; i++) {
      const pEn = en.work.projects[i];
      const pEs = es.work.projects[i];

      assert.equal(pEn.id, pEs.id);
      assert.ok(pEn.name.length > 0);
      assert.ok(pEs.name.length > 0);
      assert.ok(pEn.screenshots.length > 0);
      assert.ok(pEn.built.length >= 3);
      assert.ok(pEn.tech.length >= 3);
    }
  });

  test('Primary case study is GIO Workspace with real screenshots', () => {
    const gioEn = en.work.projects[0];
    assert.equal(gioEn.id, 'gio-workspace');
    assert.equal(gioEn.name, 'GIO Workspace');
    assert.ok(gioEn.screenshots.some((s) => s.url.includes('preview')));
    assert.equal(gioEn.github, null, 'GIO Workspace repo must remain confidential');
  });

  test('Independent engineering projects carry required disclaimers', () => {
    const whatzapp = en.work.projects.find((p) => p.id === 'whatzapp');
    assert.ok(whatzapp?.independentNote?.includes('Not affiliated with WhatsApp'));

    const discord = en.work.projects.find((p) => p.id === 'discord-clone');
    assert.ok(discord?.independentNote?.includes('Not affiliated with Discord'));
  });

  test('Services match 6 core business problem categories', () => {
    assert.equal(en.services.items.length, 6);
    assert.equal(es.services.items.length, 6);
    for (let i = 0; i < 6; i++) {
      assert.equal(en.services.items[i].id, es.services.items[i].id);
      assert.ok(en.services.items[i].problem.length > 10);
      assert.ok(en.services.items[i].deliverable.length > 10);
    }
  });

  test('Process defines 5 transparent client delivery steps', () => {
    assert.equal(en.process.steps.length, 5);
    assert.equal(es.process.steps.length, 5);
  });
});
