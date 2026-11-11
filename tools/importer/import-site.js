/* global WebImporter */
/* eslint-disable no-console */

/**
 * Import script for the current yourtracktohealth.com pages (everything outside the three
 * designed pages). One script handles every page type of the current site:
 * - page path, title and section come from the URL map (tools/importer/url-map-data.js)
 * - the old banner, side menu, breadcrumbs and print button are dropped
 * - the page gets the navy page header (hero navy) with the section as eyebrow
 * - content patterns become blocks: icon card grids -> Cards (resource), collapsible panels ->
 *   Accordion, data tables -> Table, PDF heading lists -> Documents, video library -> Videos,
 *   image maps -> image + link list, archives -> Article list
 * - links are rewritten to the new paths; PDF viewer links become direct PDF links
 * - every inner page ends with an "In this section" block
 * See PROJECT_CONTENT_IMPORT.md.
 */
import MAP from './url-map-data.js';

const OLD_ORIGIN = 'https://www.yourtracktohealth.com';

const SECTION_LABEL = [
  ['/benefits-coverage', 'Benefits & coverage'],
  ['/health-programs', 'Health programs'],
  ['/retirement', 'Retirement'],
  ['/contact-forms', 'Contact & forms'],
  ['/news', 'News'],
];

// words that keep their capital in sentence case (brands, acronyms, proper nouns)
const KEEP_CAPS = new Set(('Aetna UnitedHealthcare Highmark MetLife Hartford Trustmark EyeMed Teladoc Optum OptumRx Rx '
  + 'Express Scripts Railroad Railroads Medicare Medicaid COBRA FSA HSA HFSA HDHP MMCP CHCB SBC SPD AD&D COVID-19 COVID '
  + 'A1C Calm HealthSafe ID UHC RRB RRTA RUIA SSB SSBP GA-46000 GA-23111 GA-48000 Lyme Wellos I US U.S. IRS TTY PPO HMO '
  + 'OE Q&A Q-1 FAQ FAQs iOS Android Google Apple CDC Monday Tuesday Wednesday Thursday Friday Saturday Sunday January February '
  + 'March April May June July August September October November December').split(' '));

// multi-word names that stay exactly as written
const KEEP_PHRASES = [
  'Railroad Employees National Health and Welfare Plan', 'Railroad Employees National Dental Plan',
  'Railroad Employees National Vision Plan', 'Railroad Employees National Early Retirement Major Medical Benefit Plan',
  'SMART-TD Health and Welfare Plan', 'Railroad Retirement Board', 'Railroad Retirement', 'Railroad Enrollment Services',
  'Railroad Healthlink', 'Railroad National Plan', 'Supplemental Sickness Benefit', 'Managed Medical Care Program',
  'Comprehensive Health Care Benefit', 'High Deductible Health Plan', 'Health Savings Account',
  'Flexible Spending Account', 'Summary of Benefits & Coverage', 'Summary of Benefits and Coverage',
  'Summary Plan Description', 'Centers of Excellence', 'Blue Cross Blue Shield', 'United Behavioral Health',
  'HSA Bank', 'Hospital Association', 'One Pass Select', 'Plan E', 'Plan F', 'Plans A, B, C', 'Your Track to Health',
  'Express Scripts', 'Calm Health', 'Teladoc Health', 'Cardiac Care Program',
];
/**
 * Normalizes an old-site URL to the URL map key. Keep in sync with build-url-map.cjs.
 * @param {string} u The URL (absolute or relative)
 * @returns {string} The key
 */
function normalize(u) {
  let url;
  try {
    url = new URL(u, `${OLD_ORIGIN}/`);
  } catch (e) {
    return '';
  }
  const params = [...url.searchParams.entries()]
    .filter(([k]) => !/^(sitemap|pref|index|utm_.*|agf[a-z])$/i.test(k))
    .map(([k, v]) => `${k.toLowerCase()}=${v.toLowerCase().replace(/\s+/g, ' ').trim()}`)
    .sort();
  const p = url.pathname.replace(/^\/+/, '').toLowerCase();
  return params.length ? `${p}?${params.join('&')}` : p;
}

/**
 * Sentence case for Title Case headings, keeping brands, plan names and acronyms.
 * @param {string} text The text
 * @returns {string} The text in sentence case
 */
function sentenceCase(text) {
  let t = text.replace(/\s+/g, ' ').trim();
  if (!t) return t;
  // protect known names (case-insensitive), restore them at the end
  const kept = [];
  KEEP_PHRASES.forEach((phrase) => {
    const re = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    t = t.replace(re, () => {
      kept.push(phrase);
      return `§${kept.length - 1}§`;
    });
  });
  const restore = (out) => out.replace(/§(\d+)§/g, (m, i) => kept[Number(i)]);
  // ALL CAPS -> capitalize first letter only (acronyms are restored below)
  const allCaps = t === t.toUpperCase() && /[A-Z]{3}/.test(t);
  const base = allCaps ? t.charAt(0) + t.slice(1).toLowerCase() : t;
  let afterBreak = true;
  const result = base.split(' ').map((w) => {
    const bare = w.replace(/^[("“'‘]+|[)"”'’.,:;!?]+$/g, '');
    let out = w;
    const stem = bare.replace(/[’']s$/, ''); // possessive: "Aetna’s" keeps "Aetna"
    if (!afterBreak && /^[A-Z][a-z’']+$/.test(bare) && !KEEP_CAPS.has(bare) && !KEEP_CAPS.has(stem)) out = w.toLowerCase();
    // restore acronyms that the ALL CAPS pass lowered
    const up = bare.toUpperCase();
    if (allCaps && KEEP_CAPS.has(up) && up.length > 1 && /^[A-Z0-9&-]+$/.test(up)) out = w.replace(bare, up);
    afterBreak = /[:?!.]$/.test(w);
    return out;
  }).join(' ').replace(/^§/, '§');
  return restore(result);
}

/**
 * Rewrites a link target from the old site to the new site.
 * @param {string} href The old href
 * @returns {string} The new href
 */
function rewriteHref(href) {
  if (!href || /^(mailto:|tel:|javascript:|#)/i.test(href)) return href;
  let url;
  try {
    url = new URL(href, `${OLD_ORIGIN}/`);
  } catch (e) {
    return href;
  }
  if (!/(^|\.)yourtracktohealth\.com$/i.test(url.hostname)) return url.href;
  // the old server serves PDFs only through its viewer page; direct /PDF_Files/ URLs return 404
  const viewer = (file) => `${MAP.pdfHost}/Common/PDFViewer.aspx?fileName=${file.startsWith('/') ? '' : '/'}${file}`;
  if (/\/common\/pdfviewer\.aspx$/i.test(url.pathname) && url.searchParams.get('fileName')) {
    return viewer(url.searchParams.get('fileName').split('#')[0]);
  }
  if (/\.pdf$/i.test(url.pathname)) return viewer(url.pathname);
  if (/^\/?(default\.aspx)?$/i.test(url.pathname)) return '/';
  // ContactUs.aspx?Service=X only pre-opened one topic of the contact page
  if (/^\/contactus\.aspx$/i.test(url.pathname)) return '/contact-forms';
  const hit = MAP.pages[normalize(url.href)];
  if (hit) {
    if (hit.action === 'pdf' || hit.action === 'external') return hit.redirectTo || url.href;
    if (hit.path) return hit.path === '/index' ? '/' : hit.path + (url.hash || '');
  }
  return `${OLD_ORIGIN}${url.pathname}${url.search}${url.hash}`;
}

const INLINE = new Set(['A', 'ABBR', 'B', 'BR', 'CODE', 'EM', 'I', 'IMG', 'PICTURE', 'SMALL', 'SPAN', 'STRONG', 'SUB', 'SUP', 'U', 'FONT', 'LABEL']);

/**
 * Wraps loose inline content (text, links, <br>) into paragraphs; a double <br> starts a new
 * paragraph. Recurses into wrapper divs.
 * @param {Element} container The element to normalize
 * @param {Document} document The document
 */
function paragraphize(container, document) {
  const nodes = [...container.childNodes];
  let buffer = [];
  const flush = (before) => {
    // trim leading/trailing <br>
    while (buffer.length && buffer[0].nodeName === 'BR') buffer.shift();
    while (buffer.length && buffer[buffer.length - 1].nodeName === 'BR') buffer.pop();
    const hasText = buffer.some((n) => (n.nodeType === 3 ? n.textContent.trim() : (n.textContent.trim() || n.querySelector?.('img') || n.nodeName === 'IMG')));
    if (hasText) {
      const p = document.createElement('p');
      buffer.forEach((n) => p.append(n));
      if (before) container.insertBefore(p, before);
      else container.append(p);
    } else {
      buffer.forEach((n) => n.remove?.());
    }
    buffer = [];
  };
  nodes.forEach((n) => {
    const inline = n.nodeType === 3 || (n.nodeType === 1 && INLINE.has(n.nodeName));
    if (inline) {
      if (n.nodeName === 'BR' && buffer.length && buffer[buffer.length - 1].nodeName === 'BR') {
        const prev = buffer.pop();
        const next = n.nextSibling;
        prev.remove();
        n.remove();
        flush(next && next.parentNode === container ? next : null);
        return;
      }
      buffer.push(n);
    } else if (n.nodeType === 1) {
      flush(n);
      if (n.nodeName === 'DIV' || n.nodeName === 'SECTION' || n.nodeName === 'ARTICLE') paragraphize(n, document);
    } else {
      n.remove();
    }
  });
  flush(null);
}

/**
 * Builds a block table.
 * @param {string} name Block name (with variant)
 * @param {Array<Array>} rows Rows of cells
 * @param {Document} document The document
 * @returns {Element} The table
 */
const block = (name, rows, document) => {
  const t = WebImporter.DOMUtils.createTable([[name], ...rows], document);
  t.dataset.blockTable = 'true';
  return t;
};

/**
 * Removes the current site's chrome and decorative leftovers from the content.
 * @param {Element} root The content root
 */
function cleanup(root) {
  root.querySelectorAll([
    'script', 'style', 'noscript', 'iframe[src*="googletag"]', 'input[type="hidden"]',
    '#sidebar', '.breadCrumbs', '[id$="divSiteMapContainer"]', '#TogNav', '.goTop', '.clearfix',
    '[id$="clearFix"]', '.visually-hidden', '.sr-only', '#divH1Title:empty',
    'img[src*="external3" i]', 'img[src*="defaultarrow" i]', 'img[src*="link%20icon" i]',
    'img[src*="link icon" i]', 'img[src*="iconprint" i]', 'img[src$=".gif" i]',
    'span[class^="icon-"]', 'span[class*=" icon-"]',
  ].join(',')).forEach((el) => el.remove());
  root.querySelectorAll('.BoldText, .boldtext, b').forEach((el) => {
    const s = el.ownerDocument.createElement('strong');
    s.append(...el.childNodes);
    el.replaceWith(s);
  });
  root.querySelectorAll('span.PhoneNum, font').forEach((el) => el.replaceWith(...el.childNodes));
  root.querySelectorAll('a').forEach((a) => {
    // "Skip navigation" anchors and empty links
    if (!a.textContent.trim() && !a.querySelector('img')) a.remove();
  });
  root.querySelectorAll('[style]').forEach((el) => el.removeAttribute('style'));
}

/**
 * Rewrites all links and image sources to absolute / new-site URLs.
 * @param {Element} root The content root
 */
function rewriteLinks(root) {
  root.querySelectorAll('a[href]').forEach((a) => {
    a.setAttribute('href', rewriteHref(a.getAttribute('href')));
    a.removeAttribute('onclick');
    a.removeAttribute('target');
    // link texts in ALL CAPS ("VIEW YOUR OPTIONS") -> sentence case
    const t = a.textContent.trim();
    if (t.length > 3 && t === t.toUpperCase() && /[A-Z]{3}/.test(t) && !a.querySelector('img')) a.textContent = sentenceCase(t);
  });
  root.querySelectorAll('img[src]').forEach((img) => {
    try {
      img.src = new URL(img.getAttribute('src'), `${OLD_ORIGIN}/`).href;
    } catch (e) { /* keep */ }
  });
}

/**
 * Collapsible panels (FAQ, contact topics) -> Accordion block.
 * @param {Element} root The content root
 * @param {Document} document The document
 */
function transformAccordions(root, document) {
  const toRows = (panels, titleSel, bodySel) => panels.map((panel) => {
    const title = panel.querySelector(titleSel);
    const body = panel.querySelector(bodySel);
    const q = document.createElement('div');
    q.textContent = sentenceCase(title ? title.textContent : '');
    const a = document.createElement('div');
    if (body) {
      paragraphize(body, document);
      a.append(...body.childNodes);
    }
    return [q, a];
  }).filter(([q]) => q.textContent.trim());

  root.querySelectorAll('.content-panel-group, #accordion').forEach((group) => {
    const panels = [...group.querySelectorAll('.content-panel-default')];
    if (!panels.length) return;
    // nested panels (FSA FAQ): each top panel becomes a heading + an accordion of its questions
    if (group.querySelector('.child-panel-default')) {
      const frag = document.createDocumentFragment();
      panels.forEach((panel) => {
        const h = document.createElement('h2');
        h.textContent = sentenceCase(panel.querySelector('.panel-title, .content-panel-title')?.textContent || '');
        if (h.textContent) frag.append(h);
        const children = [...panel.querySelectorAll('.child-panel-default')];
        const rows = toRows(children, '.child-panel-title', '.child-panel-body');
        if (rows.length) frag.append(block('Accordion (closed)', rows, document));
      });
      group.replaceWith(frag);
      return;
    }
    const rows = toRows(panels, '.content-panel-title, .panel-title', '.content-panel-body, .content-panel-collapse');
    group.replaceWith(block('Accordion (closed)', rows, document));
  });
}

/**
 * Definition lists (Q&A, contact numbers) -> paragraphs (term in bold).
 * @param {Element} root The content root
 * @param {Document} document The document
 */
function transformDefinitionLists(root, document) {
  root.querySelectorAll('dl').forEach((dl) => {
    const frag = document.createDocumentFragment();
    dl.querySelectorAll('dt, dd').forEach((item) => {
      if (!item.textContent.trim() && !item.querySelector('a')) return;
      const p = document.createElement('p');
      if (item.nodeName === 'DT') {
        const s = document.createElement('strong');
        s.append(...item.childNodes);
        p.append(s);
      } else {
        p.append(...item.childNodes);
      }
      frag.append(p);
    });
    dl.replaceWith(frag);
  });
}

/**
 * Icon card grids of the Content.aspx hub pages -> Cards (resource).
 * @param {Element} root The content root
 * @param {Document} document The document
 */
function transformCardGrids(root, document) {
  const boxes = [...root.querySelectorAll('.contentbox')];
  if (!boxes.length) return;
  const rows = boxes.map((box) => {
    const cell = document.createElement('div');
    const titleEl = box.querySelector('.content-title');
    const link = titleEl?.querySelector('a[href]') || box.querySelector('a[id$="hlHeading2"]');
    const h3 = document.createElement('h3');
    const title = sentenceCase((titleEl || box).querySelector('h3, h2')?.textContent || titleEl?.textContent || '');
    if (link) {
      const a = document.createElement('a');
      a.href = link.getAttribute('href');
      a.textContent = title;
      h3.append(a);
    } else {
      h3.textContent = title;
    }
    cell.append(h3);
    const body = box.querySelector('.panel-body');
    if (body) {
      paragraphize(body, document);
      cell.append(...body.childNodes);
    }
    return [cell];
  });
  const first = boxes[0].closest('.row') || boxes[0].parentElement;
  const table = block('Cards (resource)', rows, document);
  first.parentElement.insertBefore(table, first);
  boxes.forEach((b) => (b.closest('.col-lg-6, .col-md-6, .col-sm-6, .col-lg-4, .col-md-4') || b).remove());
  root.querySelectorAll('.row').forEach((r) => { if (!r.textContent.trim() && !r.querySelector('img, table')) r.remove(); });
}

/**
 * Data tables -> Table block; layout tables are flattened.
 * @param {Element} root The content root
 * @param {Document} document The document
 */
function transformTables(root, document) {
  [...root.querySelectorAll('table:not([data-block-table])')].reverse().forEach((table) => {
    if (table.closest('[data-block-table]')) return;
    const rows = [...table.querySelectorAll('tr')];
    const width = Math.max(0, ...rows.map((r) => r.children.length));
    const isData = table.querySelector('th') || (rows.length >= 2 && width >= 2 && !table.querySelector('table'));
    if (!isData || width < 2) {
      const frag = document.createDocumentFragment();
      table.querySelectorAll('td, th').forEach((c) => {
        const d = document.createElement('div');
        d.append(...c.childNodes);
        frag.append(d);
      });
      table.replaceWith(frag);
      return;
    }
    const cells = rows.map((tr) => [...tr.children].map((c) => {
      const d = document.createElement('div');
      d.append(...c.childNodes);
      if (!d.textContent.replace(/\u00a0/g, ' ').trim() && !d.querySelector('img')) d.replaceChildren();
      return d;
    }));
    table.replaceWith(block(table.querySelector('th') ? 'Table' : 'Table (no-header)', cells, document));
  });
}

/**
 * Forms and document lists (<h2><a href=…pdf>…</a></h2> + description) -> Documents block.
 * @param {Element} root The content root
 * @param {Document} document The document
 */
function transformDocumentLists(root, document) {
  const heads = [...root.querySelectorAll('h2, h3, h4')].filter((h) => {
    if (h.closest('[data-block-table]')) return false; // headings inside other blocks (cards) stay
    const a = h.querySelector('a[href]');
    return a && /\.pdf/i.test(a.getAttribute('href')) && h.textContent.trim() === a.textContent.trim();
  });
  if (heads.length < 2) return;
  const rows = [];
  heads.forEach((h) => {
    const a = h.querySelector('a');
    const link = document.createElement('p');
    const na = document.createElement('a');
    na.href = a.getAttribute('href');
    na.textContent = sentenceCase(a.textContent.replace(/\u00a0/g, ' ').trim());
    link.append(na);
    const desc = document.createElement('div');
    let n = h.nextElementSibling;
    while (n && !heads.includes(n) && !/^H[1-4]$/.test(n.nodeName)) {
      const next = n.nextElementSibling;
      desc.append(n);
      n = next;
    }
    const linkCell = document.createElement('div');
    linkCell.append(link);
    rows.push([linkCell, desc]);
  });
  const table = block('Documents', rows, document);
  heads[0].parentElement.insertBefore(table, heads[0]);
  heads.forEach((h) => h.remove());
}

/**
 * Video library -> headings + Videos blocks.
 * @param {Element} root The content root
 * @param {Document} document The document
 */
function transformVideos(root, document) {
  const groups = [...root.querySelectorAll('.bottomBdrGrey')].filter((g) => g.querySelector('.videoCntCol'));
  if (!groups.length) return false;
  const out = document.createDocumentFragment();
  groups.forEach((g) => {
    const h = g.querySelector('h3');
    if (h) {
      const h2 = document.createElement('h2');
      h2.textContent = sentenceCase(h.textContent);
      out.append(h2);
    }
    const intro = g.querySelector('.videoCnt');
    if (intro) {
      const p = document.createElement('p');
      p.append(...intro.childNodes);
      out.append(p);
    }
    const rows = [...g.querySelectorAll('.videoCntCol li')].map((li) => {
      const img = li.querySelector('img');
      const imgCell = document.createElement('div');
      if (img) imgCell.append(img);
      const body = document.createElement('div');
      const title = li.querySelector('h2 a, h3 a');
      if (title) {
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = title.getAttribute('href');
        a.textContent = sentenceCase(title.textContent);
        p.append(a);
        body.append(p);
      }
      li.querySelectorAll('p').forEach((p) => {
        const a = p.querySelector('a[href*=".pdf" i]');
        if (a) {
          const np = document.createElement('p');
          const na = document.createElement('a');
          na.href = a.getAttribute('href');
          na.textContent = 'Read transcript';
          np.append(na);
          body.append(np);
        } else if (p.textContent.trim()) {
          body.append(p);
        }
      });
      return [imgCell, body];
    });
    out.append(block('Videos', rows, document));
  });
  root.replaceChildren(out);
  return true;
}

/**
 * Infographic image maps -> the image followed by a list of its linked areas.
 * @param {Element} root The content root
 * @param {Document} document The document
 */
function transformImageMaps(root, document, title) {
  root.querySelectorAll('img[usemap]').forEach((img) => {
    const name = img.getAttribute('usemap').replace('#', '');
    const map = root.querySelector(`map[name="${name}"], map#${CSS.escape(name)}`);
    img.removeAttribute('usemap');
    if (!img.getAttribute('alt')) img.setAttribute('alt', `${title} (infographic)`);
    if (!map) return;
    const ul = document.createElement('ul');
    map.querySelectorAll('area[href]').forEach((area) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = area.getAttribute('href');
      const alt = (area.getAttribute('alt') || '').trim();
      a.textContent = /^pdf$/i.test(alt) || !alt ? 'Download this article (PDF)' : alt;
      li.append(a);
      ul.append(li);
    });
    map.remove();
    if (ul.children.length) {
      const p = document.createElement('p');
      p.textContent = 'Related links';
      const s = document.createElement('strong');
      s.append(...p.childNodes);
      p.append(s);
      img.closest('p, div')?.after(p, ul);
    }
  });
}

/**
 * Finds the current site's content root, title and subtitle on the page.
 * @param {Document} document The document
 * @returns {{root: Element, h1: string, sub: string, bannerAlt: string}} The parts
 */
function findContent(document) {
  const banner = document.querySelector('#divImgPlHolder img, [id$="MainImg"]');
  const bannerAlt = banner?.getAttribute('alt') || '';
  const h1El = document.querySelector('.h1PageHeader, #divPageCnt h1, .pageHeader, main h1');
  const subEl = document.querySelector('.h2PageHeader');
  const root = document.querySelector('[id$="PageCntnt_divPgCntnt"]')
    || document.querySelector('#divPageCnt')
    || document.querySelector('.col-lg-9 #divPrintArticle')
    || document.querySelector('#page-content')
    || document.querySelector('main');
  return {
    root,
    h1: h1El ? h1El.textContent.replace(/\s+/g, ' ').trim().replace(/^Your ?Track ?To ?Health\s*-\s*/i, '') : '',
    sub: subEl ? subEl.textContent.replace(/\s+/g, ' ').trim() : '',
    bannerAlt,
    h1El,
  };
}

/**
 * The banner alt text carries the old banner's message ("MEDICAL BENEFITS. Up to three …").
 * Returns the sentence after the uppercase title or logo name.
 * @param {string} alt The banner alt text
 * @returns {string} The intro sentence or ''
 */
function introFromBanner(alt) {
  if (!alt) return '';
  const m = alt.match(/^(?:[A-Z0-9&®.,'’\s-]{3,}?\.|[^.]{0,60}\blogo\.)\s*(.+)$/i);
  const text = (m ? m[1] : '').trim();
  return text.length > 20 ? text : '';
}

export default {
  transform: ({ document, url }) => {
    const entry = MAP.pages[normalize(url)];
    if (!entry || !entry.path) throw new Error(`No URL map entry for ${url}`);
    const merged = entry.action === 'merge';
    const path = merged
      ? `/drafts/merge-sources${entry.path === '/' ? '/index' : entry.path}-${normalize(url).replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`
      : entry.path;

    const {
      root, h1, sub, bannerAlt, h1El,
    } = findContent(document);
    if (h1El && root.contains(h1El)) h1El.remove();
    root.querySelectorAll('.h2PageHeader, [id$="PageCntnt_divHeader"]').forEach((el) => el.remove());
    cleanup(root);

    const isArticle = /wellness article|news|image-only|campaign/.test(entry.template || '');
    const title = entry.forceTitle ? entry.title : sentenceCase(h1 && !/^yourtracktohealth$/i.test(h1) ? h1 : entry.title);
    const label = (SECTION_LABEL.find(([p]) => entry.path.startsWith(p)) || [])[1] || '';

    // page-type specific content
    let listFolder = null;
    if (/archive \/ listing/.test(entry.template)) {
      listFolder = entry.path;
      root.replaceChildren();
    }
    if (/interactive tool/.test(entry.template)) {
      root.querySelectorAll('select, input, button, label, .form-horizontal, .form-group, [class*="fsacal" i], [id*="FsaCalculator" i], [id*="collapseFsa" i], [id*="divResult" i], table').forEach((el) => el.remove());
    }
    const videos = /video library/.test(entry.template) && transformVideos(root, document);
    if (!videos) {
      transformImageMaps(root, document, title);
      transformAccordions(root, document);
      transformCardGrids(root, document);
      transformDefinitionLists(root, document);
      transformTables(root, document);
    }
    rewriteLinks(root);
    if (!videos) {
      paragraphize(root, document);
      transformDocumentLists(root, document);
    }
    // tools: replace the old server forms with the new blocks
    if (/interactive tool/.test(entry.template)) {
      if (/benefit-lookup/.test(entry.path)) {
        root.append(block('Benefit lookup', [['Data', '/benefits-coverage/benefit-lookup-data.json']], document));
      } else {
        const note = document.createElement('div');
        note.innerHTML = '<p>*The estimated tax savings is intended to provide an estimate of your potential savings when you use a Health Flexible Spending Account. Your actual savings depend on a number of factors. Dollar amounts and savings will differ depending on income, state tax rules, city tax rules and other factors. Please consult a tax, legal or financial advisor about your own personal situation. For more information about the health FSA, call the FSA Customer Care Center at 1-888-298-9754.</p>';
        root.append(block('Fsa calculator', [['Maximum contribution', '3500'], ['Note', note]], document));
      }
    }
    // headings: sentence case, demote stray h1s, drop empty ones
    root.querySelectorAll('h1').forEach((h) => {
      const h2 = document.createElement('h2');
      h2.append(...h.childNodes);
      h.replaceWith(h2);
    });
    root.querySelectorAll('h2, h3, h4, h5, h6').forEach((h) => {
      if (!h.textContent.trim()) { h.remove(); return; }
      if (!h.querySelector('a') && h.children.length === 0) h.textContent = sentenceCase(h.textContent);
    });
    // ALL CAPS link paragraphs ("VIEW YOUR OPTIONS") are calls to action -> primary buttons
    root.querySelectorAll('p').forEach((p) => {
      const a = p.querySelector(':scope > a:only-child');
      const linkText = a ? a.textContent.trim() : '';
      if (a && p.textContent.trim() === linkText && linkText.length <= 32 && !p.closest('table') && /\b(view|learn|see|visit|read|download|access|find|get|start|explore|go)\b/i.test(linkText) && !a.querySelector('img')) {
        const s = document.createElement('strong');
        p.insertBefore(s, a);
        s.append(a);
      }
    });

    // ---- page assembly ----
    const main = document.createElement('div');
    const heroText = document.createElement('div');
    if (label) {
      const eyebrow = document.createElement('p');
      eyebrow.textContent = label;
      heroText.append(eyebrow);
    }
    const h1New = document.createElement('h1');
    h1New.textContent = title;
    heroText.append(h1New);
    const intro = sub ? sentenceCase(sub) : introFromBanner(bannerAlt);
    if (intro && intro.toLowerCase() !== title.toLowerCase()) {
      const p = document.createElement('p');
      p.textContent = intro;
      heroText.append(p);
    }
    main.append(block('Hero (navy)', [[heroText]], document));
    main.append(document.createElement('hr'));

    const body = document.createElement('div');
    body.append(...root.childNodes);
    // the banner text often repeats as the first paragraph
    const firstP = body.querySelector('p');
    if (firstP && intro && firstP.textContent.replace(/\s+/g, ' ').trim().toLowerCase() === intro.toLowerCase()) firstP.remove();
    if (listFolder) {
      const folder = listFolder === '/news' ? '/news' : '/health-programs/articles';
      body.append(block('Article list', [['Folder', folder], ['Limit', '12']], document));
    }
    main.append(body);
    if (!merged) main.append(block('Section nav', [], document));
    main.append(WebImporter.DOMUtils.createTable([['Section Metadata'], ['Style', 'narrow']], document));

    const firstText = [...body.querySelectorAll('p')].map((p) => p.textContent.replace(/\s+/g, ' ').trim()).find((t) => t.length > 60) || intro || '';
    const description = firstText.length > 160 ? `${firstText.slice(0, 157).replace(/\s+\S*$/, '')}…` : firstText;
    const meta = { Title: title, Template: isArticle ? 'article' : 'content' };
    if (description) meta.Description = description;
    main.append(WebImporter.Blocks.getMetadataBlock(document, meta));

    return [{
      element: main,
      path,
      report: {
        source: url, template: entry.template, merged, title,
      },
    }];
  },
};
