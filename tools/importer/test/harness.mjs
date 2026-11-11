/* eslint-disable */
/**
 * Runs the site importer's transform (tools/importer/import-site.js) on a saved old-site page in
 * Node, without the browser import tool, and returns the resulting HTML.
 * WebImporter.DOMUtils.createTable and Blocks.getMetadataBlock are stubbed with plain tables
 * (first row = block name), the same shape the import tool produces.
 * jsdom is not a project dependency (no build step): set JSDOM_PATH, or the workspace copy is used.
 */
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, '../../..');
const JSDOM_PATH = process.env.JSDOM_PATH
  || '/home/node/.excat-marketplaces/excat-marketplace/excat/tools/excatops-mcp/node_modules/jsdom';

export async function transform(html, url) {
  const { JSDOM } = require(JSDOM_PATH);
  const dom = new JSDOM(html, { url: url.replace('://yourtracktohealth.com', '://www.yourtracktohealth.com') });
  const { document } = dom.window;
  Object.assign(globalThis, { window: dom.window, document, Node: dom.window.Node, NodeFilter: dom.window.NodeFilter,
    CSS: { escape: (s) => String(s).replace(/[^a-zA-Z0-9_-]/g, (c) => `\\${c}`) },
  });
  const table = (rows, doc) => {
    const t = doc.createElement('table');
    rows.forEach((r) => {
      const tr = doc.createElement('tr');
      (Array.isArray(r) ? r : [r]).forEach((c) => {
        const td = doc.createElement('td');
        if (typeof c === 'string') td.textContent = c; else if (c) td.append(c);
        tr.append(td);
      });
      t.append(tr);
    });
    return t;
  };
  globalThis.WebImporter = {
    DOMUtils: { createTable: table },
    Blocks: { getMetadataBlock: (doc, meta) => table([['Metadata'], ...Object.entries(meta).map(([k, v]) => [k, typeof v === 'string' ? v : v?.textContent || ''])], doc) },
  };
  // the importer imports its URL map relatively: load a copy with an absolute import
  const tmp = path.join('/tmp', `import-site-test-${process.pid}-${Date.now()}.mjs`);
  const src = fs.readFileSync(process.env.IMPORTER_SRC || path.join(ROOT, 'tools/importer/import-site.js'), 'utf8')
    .replace("import MAP from './url-map-data.js';", `import MAP from '${pathToFileURL(path.join(ROOT, 'tools/importer/url-map-data.js')).href}';`)
    .replace("import HERO_IMAGES from './hero-images-data.js';", `import HERO_IMAGES from '${pathToFileURL(path.join(ROOT, 'tools/importer/hero-images-data.js')).href}';`);
  fs.writeFileSync(tmp, src);
  try {
    const mod = await import(pathToFileURL(tmp).href);
    const res = mod.default.transform({ document, url, html, params: { originalURL: url } });
    const out = (Array.isArray(res) ? res : [res]).map((r) => r.element || r);
    return { document, element: out[0], html: out.map((e) => e.outerHTML).join('\n') };
  } finally {
    fs.unlinkSync(tmp);
  }
}

/** Text of an element with collapsed whitespace. */
export const text = (el) => (el?.textContent || '').replace(/\s+/g, ' ').trim();

/** The rows of the first block table whose name matches. */
export function blockRows(element, name) {
  const t = [...element.querySelectorAll('table')].find((tb) => text(tb.rows[0]) .toLowerCase().startsWith(name.toLowerCase()));
  return t ? [...t.rows].slice(1) : [];
}
