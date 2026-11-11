/* eslint-disable */
// Post-import step: appends merge-source content (imported to /drafts/merge-sources/) into its
// target page, before the target's "In this section" block. Run after every import:
//   node tools/importer/merge-pages.cjs
// Only merges listed here are applied; the other merge sources duplicate their target page.
const fs = require('fs');
const path = require('path');

const CONTENT = path.resolve(__dirname, '../../content');
const MERGES = [
  {
    source: 'drafts/merge-sources/benefits-coverage/nurses-telemedicine-content-aspx-menuid-295',
    target: 'benefits-coverage/nurses-telemedicine',
    heading: '24/7 telemedicine',
  },
];

const bodyOf = (html) => {
  // second section = page body; drop its section/page metadata blocks and section nav
  const sections = html.split(/\n(?=<div>)/);
  const body = sections[1] || '';
  return body
    .replace(/^<div>/, '')
    .replace(/<div class="section-metadata">[\s\S]*$/, '')
    .replace(/<div class="section-nav"><\/div>/g, '');
};

MERGES.forEach(({ source, target, heading }) => {
  const src = path.join(CONTENT, `${source}.plain.html`);
  const dst = path.join(CONTENT, `${target}.plain.html`);
  if (!fs.existsSync(src) || !fs.existsSync(dst)) {
    console.log('skip (missing file):', source, '->', target);
    return;
  }
  let html = fs.readFileSync(dst, 'utf8');
  const marker = `<!-- merged: ${source} -->`;
  if (html.includes(marker)) {
    console.log('already merged:', target);
    return;
  }
  const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const insert = `${marker}<h2 id="${id}">${heading}</h2>${bodyOf(fs.readFileSync(src, 'utf8'))}`;
  const at = html.indexOf('<div class="section-nav"></div>');
  html = at >= 0 ? html.slice(0, at) + insert + html.slice(at) : html.replace(/<div class="section-metadata">/, `${insert}<div class="section-metadata">`);
  fs.writeFileSync(dst, html);
  console.log('merged:', source, '->', target);
});
