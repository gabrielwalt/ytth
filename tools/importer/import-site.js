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
  'The SMART-TD Health and Welfare Plan', 'SMART-TD Health and Welfare Plan', 'Railroad Retirement Board', 'Railroad Retirement', 'Railroad Enrollment Services',
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
  // ALL CAPS: lower everything, then capitalize each sentence start ("One tap. All your …")
  const base = allCaps
    ? (t.charAt(0) + t.slice(1).toLowerCase()).replace(/([.?!]\s+)([a-z])/g, (m, a, b) => a + b.toUpperCase())
    : t;
  let afterBreak = true;
  const result = base.split(' ').map((w) => {
    const bare = w.replace(/^[("“'‘]+|[)"”'’.,:;!?]+$/g, '');
    let out = w;
    const stem = bare.replace(/[’']s$/, ''); // possessive: "Aetna’s" keeps "Aetna"
    if (!afterBreak && /^[A-Z][a-z’']+$/.test(bare) && !KEEP_CAPS.has(bare) && !KEEP_CAPS.has(stem)) out = w.toLowerCase();
    // hyphenated and slashed words ("Out-of-Pocket", "Non-Preferred", "21-Day", "Care/Medical"):
    // each Title-Case part after the first follows the same rule (the first only mid-sentence)
    if (/[-/]/.test(bare) && !KEEP_CAPS.has(bare)) {
      out = out.split(/([-/])/).map((part, k) => {
        const pb = part.replace(/^[("“'‘]+|[)"”'’.,:;!?]+$/g, '');
        if ((k === 0 && afterBreak) || !/^[A-Z][a-z’']+$/.test(pb) || KEEP_CAPS.has(pb)) return part;
        return part.toLowerCase();
      }).join('');
    }
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
  // inline styling that carries meaning, before the styles are dropped: a short bold block set
  // larger than the text is a heading ("24/7 Nurses & Health Specialists" cards); any other
  // inline bold is bold text ("In-network Cost: $0")
  root.querySelectorAll('[style*="font-weight"]').forEach((el) => {
    const style = el.getAttribute('style').toLowerCase();
    if (!/font-weight\s*:\s*(bold|[6-9]00)/.test(style) || el.closest('h1, h2, h3, h4, h5, h6, strong, th')) return;
    const doc = el.ownerDocument;
    const size = style.match(/font-size\s*:\s*([\d.]+)(em|rem|px)/);
    const larger = size && ((size[2] === 'px' && Number(size[1]) >= 18) || (size[2] !== 'px' && Number(size[1]) >= 1.1));
    const words = el.textContent.trim().split(/\s+/).length;
    if (/^(DIV|P)$/.test(el.nodeName) && larger && words <= 14 && !el.querySelector('div, p, ul, ol, table')) {
      const h = doc.createElement('h3');
      h.append(...el.childNodes);
      el.replaceWith(h);
    } else if (el.nodeName === 'SPAN' || el.nodeName === 'FONT') {
      // an unclosed <span> in the old HTML can swallow the rest of a panel: only its leading
      // inline text is bold, the blocks after it are unwrapped untouched
      const BLOCK = /^(DIV|P|UL|OL|LI|TABLE|DL|DT|DD|H[1-6]|BLOCKQUOTE)$/;
      const nodes = [...el.childNodes];
      const firstBlock = nodes.findIndex((n) => n.nodeType === 1 && (BLOCK.test(n.nodeName) || n.querySelector('div, p, ul, ol, li, table, dl, dt, dd, h1, h2, h3, h4, h5, h6')));
      const inline = firstBlock < 0 ? nodes : nodes.slice(0, firstBlock);
      const s = doc.createElement('strong');
      s.append(...inline);
      if (firstBlock < 0) {
        el.replaceWith(s);
      } else {
        el.replaceWith(...(s.textContent.trim() ? [s] : []), ...el.childNodes);
      }
    } else if (!el.querySelector('div, p, ul, ol, table, h1, h2, h3, h4, h5, h6')) {
      const s = doc.createElement('strong');
      s.append(...el.childNodes);
      el.append(s);
    }
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
    const keep = (item) => item.textContent.trim() || item.querySelector?.('a, img');
    const emit = (nodes, bold) => {
      const p = document.createElement('p');
      if (bold) {
        const s = document.createElement('strong');
        s.append(...nodes);
        p.append(s);
      } else {
        p.append(...nodes);
      }
      frag.append(p);
    };
    // walk the list in document order: terms and descriptions, but also any other content the
    // old CMS put inside the list (e.g. a claim address in a layout div after the last <dd>)
    const walk = (node) => {
      let loose = [];
      const flush = () => {
        if (loose.some((n) => keep(n))) emit(loose, false);
        loose = [];
      };
      [...node.childNodes].forEach((child) => {
        if (child.nodeName === 'DT' || child.nodeName === 'DD') {
          flush();
          if (keep(child)) emit([...child.childNodes], child.nodeName === 'DT');
        } else if (child.nodeType === 1 && child.querySelector('dt, dd')) {
          flush();
          walk(child);
        } else if (child.nodeType === 1 && /^(DIV|P|SECTION)$/.test(child.nodeName)) {
          flush();
          if (keep(child)) emit([...child.childNodes], false);
        } else {
          loose.push(child);
        }
      });
      flush();
    };
    walk(dl);
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

// plan terms that get an info icon (their tooltip explains the term, see plan-details)
const PLAN_TERM = /^(annual deductible|coinsurance|copays?|annual out-of-pocket maximum)\b/i;

/**
 * Sentence-cases the text nodes of an element in place, keeping inline markup (sup, strong).
 * @param {Element} el The element
 */
function sentenceCaseNodes(el) {
  const walker = el.ownerDocument.createTreeWalker(el, 4);
  const nodes = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n);
  nodes.forEach((n, i) => {
    if (n.parentElement.closest('sup') || !n.textContent.trim()) return;
    const [, lead, core, trail] = n.textContent.match(/^(\s*)([\s\S]*?)(\s*)$/);
    let cased = sentenceCase(core);
    // only the first text node starts with a capital; later ones continue the sentence
    if (i > 0) {
      cased = cased.replace(/^([("“'‘]*)([A-Z])(?=[a-z])/, (m, punct, c) => {
        const word = cased.slice(punct.length).match(/^[A-Za-z’']+/)[0];
        return KEEP_CAPS.has(word) ? m : `${punct}${c.toLowerCase()}`;
      });
    }
    n.textContent = `${lead}${cased}${trail}`;
  });
}

/**
 * "Common terms" boxes (numbered Deductible / Coinsurance / … boxes) -> Columns (terms).
 * @param {Element} root The content root
 * @param {Document} document The document
 */
function transformTermBoxes(root, document) {
  const boxes = [...root.querySelectorAll('.panel-Content')].filter((b) => b.querySelector('.boxNumbering'));
  if (boxes.length < 2) return;
  const cells = boxes.map((box) => {
    const cell = document.createElement('div');
    const titleEl = [...box.querySelectorAll('h3, h4, .local_title')].find((h) => !h.querySelector('.boxNumbering') && h.textContent.trim());
    const h = document.createElement('h5');
    h.textContent = sentenceCase(titleEl ? titleEl.textContent.replace(/\s+/g, ' ').trim() : '');
    cell.append(h);
    box.querySelectorAll('p').forEach((p) => {
      // "text<br><br>NOTE: …" is two paragraphs
      p.innerHTML.split(/(?:<br\s*\/?>\s*){2,}/i).map((part) => part.trim()).filter(Boolean).forEach((part) => {
        const np = document.createElement('p');
        np.innerHTML = part;
        cell.append(np);
      });
    });
    return cell;
  });
  const container = boxes[0].parentElement;
  boxes.slice(1).forEach((b) => b.remove());
  boxes[0].replaceWith(block('Columns (terms)', [cells], document));
  if (!container.textContent.trim()) container.remove();
}

/**
 * Plan overview grids ("How the plan works: at a glance": tables whose rows start with a number
 * cell `td.fillHalfCol`) -> one Plan details block per plan, with the summary header lines
 * that precede it in the layout table. Shared cells are repeated on every row they cover, so
 * each row stays complete on its own (phones stack the rows).
 * @param {Element} root The content root
 * @param {Document} document The document
 */
function transformPlanGrids(root, document) {
  const own = (t) => [...t.rows].filter((r) => r.closest('table') === t);
  const grids = [...root.querySelectorAll('table')].filter((t) => own(t).some((r) => r.cells[0]?.classList.contains('fillHalfCol')));
  if (!grids.length) return;
  const text = (el) => el.textContent.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
  const p = (html) => { const e = document.createElement('p'); e.innerHTML = html; return e; };
  const cellDiv = (nodes) => { const d = document.createElement('div'); d.append(...nodes); return d; };
  const anchors = {};

  const planBlock = (grid, headCells) => {
    const rows = [];
    // header: eyebrow + plan names (first header cell), title (second header cell)
    const header = document.createElement('div');
    let eyebrowHtml = '';
    let namesHtml = '';
    let titleHtml = '';
    headCells.forEach((cell) => {
      const parts = cell.innerHTML.split(/<br\s*\/?>/i).map((x) => x.trim()).filter((x) => x.replace(/&nbsp;|<[^>]+>/g, '').trim());
      if (/benefits summary/i.test(text(cell))) {
        [eyebrowHtml] = parts;
        namesHtml = parts.slice(1).join('<br>');
      } else if (!titleHtml) {
        titleHtml = parts.join(' ');
      }
    });
    const eyebrow = p(eyebrowHtml);
    sentenceCaseNodes(eyebrow);
    // "High Deductible Health Plan (HDHP) Effective 1/1/2026 (…)" -> title + "Effective …" line
    const m = titleHtml.match(/^(.*?\))\s*(Effective\b.*)$/i);
    const h = document.createElement('h2');
    h.innerHTML = m ? m[1] : titleHtml;
    sentenceCaseNodes(h);
    header.append(eyebrow, h);
    if (m) { const eff = p(m[2]); sentenceCaseNodes(eff); header.append(eff); }
    if (namesHtml) header.append(p(namesHtml));
    rows.push([header]);
    anchors[text(h).toLowerCase()] = text(h);

    const carry = []; // values of cells that span several rows, per value column
    own(grid).forEach((tr) => {
      const cells = [...tr.cells];
      const num = cells[0]?.classList.contains('fillHalfCol') ? cells.shift() : null;
      const numText = num ? text(num) : '';
      if (!cells.length) return;
      const first = cells[0];
      const all = cells.map(text).join(' ');
      // full-width rows: group bars, column headers, footnotes
      if (cells.length === 1 && first.colSpan >= 3) {
        if (!all) return;
        if (first.querySelector('ol, ul')) { rows.push([cellDiv([first.querySelector('ol, ul')])]); return; }
        if (/in-network/i.test(all) && /out-of-network/i.test(all) && all.length < 40) {
          rows.push([cellDiv([]), cellDiv([document.createTextNode('In-network')]), cellDiv([document.createTextNode('Out-of-network')])]);
          return;
        }
        // a numbered full-width row with a bold term is a subheading ("3 Copays (…)")
        if (/^\d$/.test(numText) && first.querySelector('strong')) {
          const label = document.createElement('div');
          const hd = document.createElement('h4');
          hd.innerHTML = first.querySelector('strong').innerHTML;
          sentenceCaseNodes(hd);
          if (PLAN_TERM.test(text(hd))) hd.append(' :info:');
          label.append(hd);
          first.querySelector('strong').remove();
          const rest = first.innerHTML.replace(/^(\s*<br\s*\/?>)+/i, '').trim();
          if (rest.replace(/&nbsp;/g, '').trim()) label.append(p(rest));
          rows.push([label]);
          // a subheading row is told apart from a group bar by its heading
          return;
        }
        const bar = p(first.innerHTML.trim());
        sentenceCaseNodes(bar);
        rows.push([cellDiv([bar])]);
        return;
      }
      // label cell
      const label = document.createElement('div');
      const strong = first.querySelector('strong');
      if (/^\d$/.test(numText) && strong) {
        const hd = document.createElement('h4');
        hd.innerHTML = strong.innerHTML;
        sentenceCaseNodes(hd);
        if (PLAN_TERM.test(text(hd))) hd.append(' :info:');
        label.append(hd);
        strong.remove();
        const rest = first.innerHTML.replace(/^(\s*<br\s*\/?>)+/i, '').trim();
        if (rest.replace(/&nbsp;/g, '').trim()) label.append(p(rest));
      } else {
        const lp = p(first.innerHTML.trim());
        sentenceCaseNodes(lp);
        label.append(lp);
      }
      const values = [];
      let next = 1;
      const spanBoth = cells[1] && cells[1].colSpan >= 2;
      if (first.colSpan >= 2 && !text(cells[1] || first)) {
        // "Retail — 21-day supply": a label row without values
        rows.push([label, cellDiv([]), cellDiv([])]);
        return;
      }
      for (let k = 0; k < (spanBoth ? 1 : 2); k += 1) {
        if (carry[k] && carry[k].left > 0) {
          values.push(cellDiv([carry[k].node.cloneNode(true)]));
          carry[k].left -= 1;
        } else if (cells[next]) {
          const c = cells[next];
          next += 1;
          const v = p(c.innerHTML.trim());
          if (c.rowSpan > 1) carry[k] = { node: v.cloneNode(true), left: c.rowSpan - 1 };
          values.push(cellDiv(text(c) ? [v] : []));
        }
      }
      rows.push([label, ...values]);
    });
    return block('Plan details', rows, document);
  };

  // the layout table around the grids carries the header lines of each plan
  const outer = grids[0].parentElement.closest('table');
  const frag = document.createDocumentFragment();
  if (outer && grids.every((g) => outer.contains(g))) {
    let head = [];
    own(outer).forEach((tr) => {
      const grid = grids.find((g) => tr.contains(g));
      if (grid) {
        frag.append(planBlock(grid, head));
        head = [];
        return;
      }
      if (text(tr)) head.push(...tr.cells);
    });
    head.forEach((c) => frag.append(cellDiv([...c.childNodes])));
    (outer.closest('.table-responsive') || outer).replaceWith(frag);
  } else {
    grids.forEach((g) => g.replaceWith(planBlock(g, [])));
  }

  // "Click here for the … overview grid" jump links -> the plan headings
  root.querySelectorAll('a:not([href])').forEach((a) => {
    const t = text(a).toLowerCase();
    const target = Object.keys(anchors).find((k) => t.includes(k.replace(/\s*\(.*$/, '')));
    if (target) a.setAttribute('href', `#${target.replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')}`);
  });
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
    // side boxes of the content column that sit outside the content box (Contact Us: "Website
    // feedback & technical issues?") are content too: they follow the main content
    document.querySelectorAll('.webfeedback').forEach((box) => {
      if (root.contains(box)) return;
      const out = document.createElement('div');
      const heading = box.querySelector('h2, h3');
      if (heading) {
        const h = document.createElement('h2');
        h.textContent = heading.textContent.replace(/\s+/g, ' ').trim();
        out.append(h);
      }
      box.querySelectorAll(':scope span').forEach((s) => {
        if (s.closest('h2, h3') || !s.textContent.trim()) return;
        const p = document.createElement('p');
        p.append(...s.childNodes);
        out.append(p);
      });
      box.querySelectorAll('a[href]').forEach((a) => {
        if (out.contains(a) || !a.textContent.trim() || a.closest('span')) return;
        const p = document.createElement('p');
        p.append(a);
        out.append(p);
      });
      root.append(out);
    });
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
      transformTermBoxes(root, document);
      transformPlanGrids(root, document);
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
