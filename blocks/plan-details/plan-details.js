/**
 * Plan details: the benefits table of a medical plan page (MMCP design).
 *
 * Authoring: one block table. The rows are typed by their shape:
 *   - 1 cell with a heading and an optional eyebrow paragraph before it, first row: card header
 *   - 2+ cells that each start with a heading: summary stats
 *   - 1 cell with plain text: group bar (the first group is teal, later groups navy)
 *   - first cell empty, other cells text: column headers (e.g. In-network / Out-of-network)
 *   - first cell with a heading (+ helper paragraph): major row (values optional; a major
 *     row without values is a subheading for the rows below it)
 *   - other rows: item rows (zebra striped)
 *   - 1 cell with an ordered list: footnotes
 * A row with a single value in a table whose other rows have two values (a benefit that is the
 * same in and out of network, CHCB) spans both value columns.
 * @param {Element} block The block
 */
import attachTooltip from '../../scripts/tooltip.js';

const HEADING = 'h1, h2, h3, h4, h5, h6';

/**
 * @param {Element} cell A cell
 * @returns {boolean} Whether the cell's first element is a heading
 */
const startsWithHeading = (cell) => !!cell.firstElementChild?.matches(HEADING);

/**
 * Builds a value cell that carries its column label (shown on mobile).
 * @param {Element} cell The authored cell
 * @param {string} label The column label
 * @returns {Element} The value element
 */
function valueCell(cell, label, span = false) {
  const div = document.createElement('div');
  div.className = span ? 'plan-details-value plan-details-value-span' : 'plan-details-value';
  if (label) {
    const l = document.createElement('span');
    l.className = 'plan-details-value-label';
    l.textContent = label;
    div.append(l);
  }
  const v = document.createElement('div');
  v.className = 'plan-details-value-text';
  v.append(...cell.childNodes);
  div.append(v);
  return div;
}

// info icons explain the plan term of their row, using the page's "Common terms"
const TERMS = [
  [/deductible/i, /deductible/i],
  [/coinsurance/i, /coinsurance/i],
  [/copay/i, /copay/i],
  [/out-of-pocket/i, /out-of-pocket/i],
];

/**
 * Reads the "Common terms" definitions on the page (columns terms block: heading + text).
 * @returns {Array<{term: string, content: Element}>} The definitions
 */
function pageTerms() {
  return [...document.querySelectorAll('main .columns.terms :is(h3, h4, h5, h6)')].map((h) => {
    const content = document.createElement('div');
    // a bold paragraph, not a heading: the table's "heading + helper text" styles must not apply
    const title = document.createElement('p');
    title.className = 'plan-tooltip-title';
    const strong = document.createElement('strong');
    strong.textContent = h.textContent.trim();
    title.append(strong);
    content.append(title);
    let n = h.nextElementSibling;
    while (n && !/^H[1-6]$/.test(n.tagName)) {
      content.append(n.cloneNode(true));
      n = n.nextElementSibling;
    }
    return { term: h.textContent.trim(), content };
  });
}

/**
 * Turns the :info: icons of the table into tooltips with the matching term definition.
 * @param {Element} root The decorated table
 */
function attachTermTooltips(root) {
  const icons = [...root.querySelectorAll('.icon-info')];
  if (!icons.length) return;
  const defs = pageTerms();
  icons.forEach((icon) => {
    const label = (icon.closest('h1, h2, h3, h4, h5, h6, p') || icon.parentElement).textContent.trim();
    const pair = TERMS.find(([re]) => re.test(label));
    const def = pair && defs.find((d) => pair[1].test(d.term));
    if (!def) return;
    const term = def.term.toLowerCase();
    // "coinsurance" takes no article; the other plan terms are countable
    const article = /^coinsurance/.test(term) ? '' : `${/^[aeiou]/.test(term) ? 'an' : 'a'} `;
    attachTooltip(icon, def.content, `What is ${article}${term}?`);
  });
}

export default function decorate(block) {
  const rows = [...block.children];
  const out = document.createElement('div');
  out.className = 'plan-details-card';
  let columns = [];
  let groupCount = 0;
  let zebra = 0;
  // the widest value row tells how many value columns the table has
  const valueColumns = Math.max(0, ...rows.map((r) => r.children.length - 1));
  const values = (el, cells) => {
    const vals = cells.slice(1);
    const span = vals.length === 1 && valueColumns >= 2;
    const label = span ? columns.join(' & ') : null;
    vals.forEach((c, j) => el.append(valueCell(c, span ? label : columns[j], span)));
  };

  rows.forEach((row, i) => {
    const cells = [...row.children];
    const texts = cells.map((c) => c.textContent.trim());
    const el = document.createElement('div');

    // header
    if (i === 0 && cells.length === 1 && cells[0].querySelector(HEADING)) {
      el.className = 'plan-details-header';
      el.append(...cells[0].childNodes);
      const heading = el.querySelector(HEADING);
      const eyebrow = heading.previousElementSibling;
      if (eyebrow && eyebrow.tagName === 'P') eyebrow.classList.add('plan-details-eyebrow');
      out.append(el);
      return;
    }

    // footnotes
    if (cells.length === 1 && cells[0].querySelector('ol') && !cells[0].querySelector(HEADING)) {
      el.className = 'plan-details-footnotes';
      el.append(...cells[0].childNodes);
      out.append(el);
      return;
    }

    // summary stats
    if (cells.length >= 2 && cells.every(startsWithHeading)) {
      el.className = 'plan-details-stats';
      cells.forEach((c) => {
        const stat = document.createElement('div');
        stat.className = 'plan-details-stat';
        stat.append(...c.childNodes);
        el.append(stat);
      });
      out.append(el);
      return;
    }

    // group bar
    if (cells.length === 1 && !cells[0].querySelector(HEADING) && texts[0]) {
      groupCount += 1;
      zebra = 0;
      el.className = `plan-details-group ${groupCount === 1 ? 'teal' : 'navy'}`;
      el.setAttribute('role', 'heading');
      el.setAttribute('aria-level', '3');
      el.append(...cells[0].childNodes);
      out.append(el);
      return;
    }

    // column headers
    if (cells.length > 1 && !texts[0] && texts.slice(1).some(Boolean)) {
      columns = texts.slice(1);
      el.className = 'plan-details-columns';
      el.setAttribute('aria-hidden', 'true');
      el.append(document.createElement('div'));
      columns.forEach((t) => {
        const c = document.createElement('div');
        c.textContent = t;
        el.append(c);
      });
      out.append(el);
      return;
    }

    // major rows and subheadings
    if (startsWithHeading(cells[0])) {
      const hasValues = texts.slice(1).some(Boolean);
      el.className = hasValues ? 'plan-details-row plan-details-major' : 'plan-details-row plan-details-subheading';
      // a subheading takes the first (white) stripe slot of the rows below it
      zebra = hasValues ? 0 : 1;
      const label = document.createElement('div');
      label.className = 'plan-details-label';
      label.append(...cells[0].childNodes);
      el.append(label);
      if (hasValues) values(el, cells);
      out.append(el);
      return;
    }

    // item rows
    zebra += 1;
    // an item without values (e.g. "Retail — 21-day supply") labels the rows below it
    const hasValues = texts.slice(1).some(Boolean);
    el.className = `plan-details-row plan-details-item${zebra % 2 === 0 ? ' striped' : ''}${hasValues ? '' : ' plan-details-label-only'}`;
    const label = document.createElement('div');
    label.className = 'plan-details-label';
    label.append(...cells[0].childNodes);
    el.append(label);
    if (hasValues) values(el, cells);
    out.append(el);
  });

  // a group's last row sits 32px above the next group bar
  out.querySelectorAll('.plan-details-group').forEach((g) => {
    const prev = g.previousElementSibling;
    if (prev && prev.classList.contains('plan-details-row')) prev.classList.add('plan-details-group-end');
  });

  block.replaceChildren(out);
  attachTermTooltips(out);
}
