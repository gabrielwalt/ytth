/**
 * "On this page": jump links to the page's main headings, on inner pages with the section menu.
 *
 * When it is shown (best practice: a table of contents is only worth it on long pages):
 * - at least 3 entries, and
 * - the content is clearly longer than the window (more than 1.75 window heights), so on a
 *   short page, where everything is already in view, there is none. Rechecked on resize: a page
 *   of tiles is long on a phone (one column) but short on a desktop.
 *
 * Entries: the h2 headings of the page content, including headings inside blocks (plan tables,
 * cards, fragments) but not inside accordion items (hidden until opened). With fewer than 3 h2s,
 * the h3s are used (pages built from tiles).
 *
 * Where: in the section menu column, above the section tree, with the same look:
 * - wide screens (>= 1200px): the top of the sticky side column, always open; it stays in view
 *   while reading and marks the section in view, without pushing the content down
 * - single column: a collapsed bar like "In this section" ("On this page" + the number of
 *   sections); a chosen link closes it again
 * Built after all sections are loaded (scripts.js → loadLazy), so block headings exist.
 */

// headings inside accordion items are hidden until the item is opened: they are not
// destinations (Contact & forms listed the administrators of one closed topic)
const SKIP = [
  '.hero', '.section-nav-wrapper', 'header', 'footer', 'dialog', 'details', '[hidden]',
  '[aria-hidden="true"]', '.plan-tooltip',
].join(', ');
const MIN_ENTRIES = 3;
const MIN_LENGTH = 1.75; // content height in window heights

const slug = (text) => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

function headings(main, level) {
  return [...main.querySelectorAll(level)]
    .filter((h) => !h.closest(SKIP) && h.textContent.trim() && h.getClientRects().length);
}

export default function buildToc(main = document.querySelector('main')) {
  const navWrapper = main?.querySelector('.section.has-section-nav > .section-nav-wrapper');
  if (!navWrapper || navWrapper.querySelector('.toc')) return;
  let heads = headings(main, 'h2');
  if (heads.length < MIN_ENTRIES) heads = headings(main, 'h3');
  if (heads.length < MIN_ENTRIES) return;
  heads.forEach((h) => {
    if (h.id) return;
    const base = slug(h.textContent) || 'section';
    let id = base;
    for (let n = 2; document.getElementById(id); n += 1) id = `${base}-${n}`;
    h.id = id;
  });

  const nav = document.createElement('nav');
  nav.className = 'toc';
  nav.setAttribute('aria-label', 'On this page');

  // single column: a disclosure bar, the same as "In this section"
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'toc-disclosure';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'toc-panel');
  const lead = document.createElement('span');
  lead.className = 'toc-disclosure-label';
  lead.textContent = 'On this page';
  const count = document.createElement('span');
  count.className = 'toc-disclosure-current';
  count.textContent = `${heads.length} sections`;
  toggle.append(lead, count);
  toggle.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', toggle.getAttribute('aria-expanded') !== 'true');
  });

  const panel = document.createElement('div');
  panel.className = 'toc-panel';
  panel.id = 'toc-panel';
  const title = document.createElement('p');
  title.className = 'toc-title';
  title.textContent = 'On this page';
  const ol = document.createElement('ol');
  ol.className = 'toc-list';
  heads.forEach((h) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.textContent = h.textContent.replace(/\s+/g, ' ').trim();
    li.append(a);
    ol.append(li);
  });
  // a chosen link closes the bar (single column), so the section isn't covered by the list
  ol.addEventListener('click', (e) => {
    if (e.target.closest('a')) toggle.setAttribute('aria-expanded', 'false');
  });
  panel.append(title, ol);
  nav.append(toggle, panel);
  navWrapper.prepend(nav);
  navWrapper.classList.add('has-toc');

  // shown only when the content is clearly longer than the window (rechecked on resize)
  const content = [...navWrapper.parentElement.children].filter((c) => c !== navWrapper);
  const update = () => {
    const height = content.reduce((sum, c) => sum + c.getBoundingClientRect().height, 0);
    const long = height > window.innerHeight * MIN_LENGTH;
    nav.hidden = !long;
    navWrapper.classList.toggle('has-toc', long);
  };
  update();
  let timer;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(update, 150);
  });

  // mark the section in view
  if ('IntersectionObserver' in window) {
    const links = new Map([...ol.querySelectorAll('a')].map((a) => [decodeURIComponent(a.hash.slice(1)), a]));
    const io = new IntersectionObserver((entries) => {
      entries.filter((e) => e.isIntersecting).forEach((e) => {
        links.forEach((a) => a.removeAttribute('aria-current'));
        links.get(e.target.id)?.setAttribute('aria-current', 'location');
      });
    }, { rootMargin: '-120px 0px -60% 0px' });
    heads.forEach((h) => io.observe(h));
  }
}
