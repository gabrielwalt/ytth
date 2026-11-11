/**
 * "On this page": jump links to the page's main headings, at the top of the content column of
 * inner pages (next to the section menu), so they are found before the reading starts.
 *
 * - Entries: the h2 headings of the page content, including headings inside blocks (plan
 *   tables, cards, fragments). With fewer than 3 h2s, the h3s are used instead (pages built
 *   from tiles). Shown from 3 entries; headings in the hero, the menu and dialogs are skipped.
 * - Wide screens: an open box; small screens: a collapsed disclosure, so the content is near.
 * - The entry of the heading in view is marked (aria-current="location").
 * Built after all sections are loaded (scripts.js → loadLazy), so block headings exist.
 */

const SKIP = '.hero, .section-nav, .toc, header, footer, dialog, [aria-hidden="true"], .plan-tooltip';
const slug = (text) => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

function headings(main, level) {
  return [...main.querySelectorAll(level)]
    .filter((h) => !h.closest(SKIP) && h.textContent.trim() && h.getClientRects().length);
}

export default function buildToc(main = document.querySelector('main')) {
  const navWrapper = main?.querySelector('.section.has-section-nav > .section-nav-wrapper');
  if (!navWrapper || main.querySelector('.toc')) return;
  let heads = headings(main, 'h2');
  if (heads.length < 3) heads = headings(main, 'h3');
  if (heads.length < 3) return;
  heads.forEach((h) => {
    if (h.id) return;
    const base = slug(h.textContent) || 'section';
    let id = base;
    for (let n = 2; document.getElementById(id); n += 1) id = `${base}-${n}`;
    h.id = id;
  });

  const wrapper = document.createElement('div');
  wrapper.className = 'toc-wrapper';
  const nav = document.createElement('nav');
  nav.className = 'toc';
  nav.setAttribute('aria-labelledby', 'toc-title');
  const details = document.createElement('details');
  const summary = document.createElement('summary');
  summary.id = 'toc-title';
  summary.className = 'toc-title';
  summary.textContent = 'On this page';
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
  if (heads.length > 6) nav.classList.add('toc-long');
  details.append(summary, ol);
  nav.append(details);
  wrapper.append(nav);
  // first in reading order (before the section menu tree): found right after the page header
  navWrapper.before(wrapper);

  // open on wide screens (and when the screen grows), collapsed on small ones
  const wide = window.matchMedia('(width >= 900px)');
  const sync = () => { details.open = wide.matches; };
  sync();
  wide.addEventListener('change', sync);

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
