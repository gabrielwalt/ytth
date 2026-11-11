/* eslint-disable */
/**
 * Regression test: Contact Us (ContactUs.aspx?menuid=6) lost its opening hours and claim
 * addresses on import (2026-11-11). Cause: the main content column carries the same
 * `webfeedback` class as the "Website feedback" side box; the side-box step moved every bold
 * phone number and every panel-title link out of the panels, and the accordion dropped the
 * untitled panels with their bodies.
 *
 * The fixture is the unmodified old page (fixtures/contactus-menuid-6.html), including its
 * broken markup (unclosed <span>, <dl> with a missing </div>).
 * usage: node --test tools/importer/test/
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { transform, text, blockRows } from './harness.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(here, 'fixtures/contactus-menuid-6.html'), 'utf8');
const URL_ = 'https://yourtracktohealth.com/ContactUs.aspx?menuid=6';
const norm = (t) => t.replace(/\s+/g, ' ').replace(/\s+([,.:])/g, '$1').trim();

const { element } = await transform(html, URL_);
const rows = blockRows(element, 'Accordion');

test('every contact topic becomes an accordion item', () => {
  assert.equal(rows.length, 15);
  assert.equal(text(rows[0].cells[0]), '24/7 nurse support');
  assert.equal(text(rows[14].cells[0]), 'HSA Bank support');
});

test('opening hours and claim addresses stay with their topic', () => {
  const body = (title) => norm(text(rows.find((r) => text(r.cells[0]).toLowerCase() === title.toLowerCase())?.cells[1]));
  const medical = body('Medical benefit & claims');
  for (const s of [
    'The SMART-TD Health and Welfare Plan: 8 a.m. – 6 p.m. EST',
    'Aetna Claim Submission Address: Aetna P.O. Box 981106 El Paso, TX 79998-1106',
    'Highmark Claim Submission Address: Highmark BCBS Railroad Dedicated Unit P.O. Box 890381 Camp Hill, PA 17089-0381',
    'UnitedHealthcare Claim Submission Address: UnitedHealthcare P.O. Box 30985 Salt Lake City, UT 84130-0985',
    '1-888-332-8742', '1-888-445-4379',
  ]) assert.ok(medical.includes(s), `medical panel misses "${s}"`);
  assert.ok(body('Mental health & substance use benefits & claims').includes('United Behavioral Health 8 a.m. – 6:30 p.m. EST'));
  assert.ok(body('Prescription benefits & claims').includes('Optum Rx Claims Department P.O. Box 650334 Dallas, TX 75265-0334'));
  assert.ok(body('Vision benefits & claims').includes('Mon. - Fri. 7:30 a.m. - 11p.m. EST Sun. 11 a.m. - 8 p.m. EST'));
  assert.ok(body('Enrollment support').includes('PO Box 30775 Salt Lake City, UT 84130-0775'));
});

test('every line of every old panel body is in the matching accordion item', async () => {
  // independent reference: parse the old page and split each panel body into its text lines
  const { JSDOM } = (await import('module')).createRequire(import.meta.url)(process.env.JSDOM_PATH
    || '/home/node/.excat-marketplaces/excat-marketplace/excat/tools/excatops-mcp/node_modules/jsdom');
  const old = new JSDOM(html).window.document;
  const panels = [...old.querySelectorAll('#accordion .content-panel-default')];
  assert.equal(panels.length, rows.length);
  panels.forEach((panel, i) => {
    const out = norm(text(rows[i].cells[1]));
    const body = panel.querySelector('.content-panel-body');
    body.querySelectorAll('br').forEach((br) => br.replaceWith('\n'));
    body.querySelectorAll('dt, dd, h3, p, div').forEach((el) => el.prepend('\n'));
    body.textContent.split('\n').map(norm).filter((l) => l.length > 2).forEach((line) => {
      assert.ok(out.includes(line), `panel ${i + 1} (${norm(panel.querySelector('.content-panel-title').textContent)}) misses "${line}"`);
    });
  });
});

test('labels are bold, hours and addresses are regular text', () => {
  const medical = rows[1].cells[1];
  const strongs = [...medical.querySelectorAll('strong')].map(text);
  assert.ok(strongs.includes('Aetna Claim Submission Address:'));
  assert.ok(!strongs.some((s) => /P\.O\. Box|a\.m\./.test(s)), `hours or address in bold: ${strongs.join(' | ')}`);
});

test('the feedback side box follows the panels, with its webmaster link', () => {
  const h2 = [...element.querySelectorAll('h2')].map(text);
  assert.ok(h2.includes('Website feedback & technical issues?'));
  assert.ok(element.querySelector('a[href="mailto:yourtracktohealthwebmaster@uhc.com"]'));
  // the panel titles must not leak out of the accordion as loose links
  assert.equal(element.querySelectorAll('a[href^="#collapse"]').length, 0);
});

test('description is a sentence, not a claim address', () => {
  const meta = blockRows(element, 'Metadata').find((r) => text(r.cells[0]) === 'Description');
  assert.match(text(meta.cells[1]), /^To provide feedback/);
});
