/* eslint-disable */
/**
 * Shared content: replaces content that is repeated word for word on several pages with a
 * reference to one fragment document, so it is edited once (run after every import, like
 * merge-pages.cjs). The fragment documents themselves come from
 * migration-work/design-source/fragment-*.html (design importer, urls-design-fragments.txt).
 *
 * Each definition names the fragment and how to find its content on a page:
 *   - `select`: CSS selector of the candidate element (paragraph, list, block)
 *   - `text`:   the element's text, whitespace-collapsed; it must match exactly
 * A match is replaced by a Fragment block. Only content whose text is identical is replaced;
 * near-duplicates (other dates, other audiences, other wording) are reported, not changed.
 * The script is idempotent and only rewrites the exact markup it found.
 *
 * usage: node tools/importer/apply-fragments.cjs [--dry]
 */
const fs = require('fs');
const path = require('path');

const JSDOM_PATH = process.env.JSDOM_PATH
  || '/home/node/.excat-marketplaces/excat-marketplace/excat/tools/excatops-mcp/node_modules/jsdom';
const { JSDOM } = require(JSDOM_PATH);

const ROOT = path.resolve(__dirname, '../..');
const CONTENT = path.join(ROOT, 'content');
const dry = process.argv.includes('--dry');
const norm = (t) => (t || '').replace(/\s+/g, ' ').trim();
// text with a space at every element boundary ("<h5>Deductible</h5><p>This…" -> "Deductible This…")
const textOf = (el) => {
  const w = el.ownerDocument.createTreeWalker(el, 4);
  const parts = [];
  for (let n = w.nextNode(); n; n = w.nextNode()) parts.push(n.textContent);
  return norm(parts.join(' ')).replace(/ ([.,;:])/g, '$1');
};

const FRAGMENTS = [
  {
    path: '/fragments/plan-common-terms',
    select: 'div.columns.terms',
    starts: 'Deductible This is the amount you pay each year for eligible health care services before the Plan starts to pay.',
  },
  {
    path: '/fragments/health-coach-contacts',
    select: 'ul',
    text: 'Aetna members: Railroad Employees National Plan: 1-800-842-4044; NRC/UTU Plan: 1-888-332-8742 Highmark Blue Cross Blue Shield members: 1-866-267-3320 UnitedHealthcare members: 1-866-735-5685',
  },
  {
    path: '/fragments/article-disclaimer-annual-physical',
    select: 'p',
    text: 'Be sure to discuss any health-related concerns with your doctor whenever you meet with him/her and also as part of your annual routine physical. The material contained in this article has been selected to provide background and useful information. It is not designed to replace either medical advice or medical treatment.',
  },
  {
    path: '/fragments/program-confidentiality',
    select: 'p',
    text: 'This service is available at no additional cost to you. Your personal information and use of this service is confidential and will never be shared with your Railroad employer or Labor Union.',
  },
  {
    // referenced by the site importer itself (the Retirement side box), listed for the report
    path: '/fragments/retirement-specialist-contact',
    select: 'p',
    text: 'Contact a retirement specialist today with questions 1-800-842-5252',
  },
  {
    path: '/fragments/fsa-tax-disclaimer',
    select: 'p',
    starts: '*For educational purposes only. Dollar amounts and savings will differ depending on income, state tax rules, city tax rules and other factors.',
  },
];

const files = [];
(function walk(d) {
  fs.readdirSync(d).forEach((f) => {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      if (!/\/(drafts|fragments|library)$/.test(p)) walk(p);
    } else if (p.endsWith('.plain.html') && !/\/(nav|footer)\.plain\.html$/.test(p)) files.push(p);
  });
}(CONTENT));

const ref = (p) => `<div class="fragment"><div><div><a href="${p}">${p}</a></div></div></div>`;
const report = Object.fromEntries(FRAGMENTS.map((f) => [f.path, { replaced: [], already: [], mismatch: [] }]));
// the fragment's canonical text, taken from its first match, so every consumer is compared to it
const canonical = {};

files.forEach((file) => {
  let html = fs.readFileSync(file, 'utf8');
  const page = file.slice(CONTENT.length).replace(/\.plain\.html$/, '');
  const dom = new JSDOM(`<body>${html}</body>`);
  const { document } = dom.window;
  let changed = false;
  FRAGMENTS.forEach((def) => {
    if (document.querySelector(`.fragment a[href="${def.path}"]`)) report[def.path].already.push(page);
    document.querySelectorAll(def.select).forEach((el) => {
      if (el.closest('.fragment')) return;
      const t = textOf(el);
      const hit = def.text ? t === norm(def.text) : t.startsWith(norm(def.starts));
      if (!hit) return;
      canonical[def.path] = canonical[def.path] || t;
      if (t !== canonical[def.path]) {
        report[def.path].mismatch.push(`${page} (text differs: "${t.slice(0, 80)}…")`);
        return;
      }
      const src = el.outerHTML;
      if (!html.includes(src)) {
        report[def.path].mismatch.push(`${page} (markup not found verbatim)`);
        return;
      }
      html = html.replace(src, ref(def.path));
      report[def.path].replaced.push(page);
      changed = true;
    });
  });
  dom.window.close();
  if (changed && !dry) fs.writeFileSync(file, html);
});

Object.entries(report).forEach(([p, r]) => {
  const consumers = [...new Set([...r.replaced, ...r.already])];
  console.log(`${p}: ${consumers.length} pages${dry ? ' (dry run)' : ''}`);
  consumers.forEach((c) => console.log(`  ${r.replaced.includes(c) ? 'replaced' : 'uses    '} ${c}`));
  r.mismatch.forEach((m) => console.log(`  NOT replaced: ${m}`));
});
fs.writeFileSync(path.join(ROOT, 'tools/importer/fragments-report.json'), `${JSON.stringify(report, null, 1)}\n`);
