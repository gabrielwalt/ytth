/**
 * Section nav ("In this section"): links to the pages around the current one. It replaces
 * the current site's left-hand side menu.
 *
 * Authoring:
 * - a list of links: shown as they are
 * - empty block: built from the query index. It lists the pages below the current page,
 *   or, if there are none, the pages next to it (same parent folder).
 * The block removes itself when it has no links.
 * @param {Element} block The block
 */

import { fetchIndex, cleanTitle } from '../../scripts/site-index.js';

/**
 * Builds the link list from the query index.
 * @returns {Promise<Array<{href: string, label: string}>>} The links
 */
async function linksFromIndex() {
  const pages = await fetchIndex();
  const here = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  const parentOf = (p) => p.replace(/\/[^/]+$/, '') || '/';
  let picks = pages.filter((d) => parentOf(d.path) === here && d.path !== here);
  if (!picks.length) {
    const parent = parentOf(here);
    picks = pages.filter((d) => parentOf(d.path) === parent && d.path !== parent);
  }
  return picks
    .map((d) => ({ href: d.path, label: cleanTitle(d.navTitle || d.title) }))
    .filter((l) => l.label)
    .sort((a, b) => a.label.localeCompare(b.label));
}

export default async function decorate(block) {
  let links = [...block.querySelectorAll('a[href]')].map((a) => ({ href: a.getAttribute('href'), label: a.textContent.trim() }));
  const title = block.querySelector('h2, h3, h4')?.textContent.trim() || 'In this section';
  if (!links.length) {
    try {
      links = await linksFromIndex();
    } catch {
      links = [];
    }
  }
  if (!links.length) {
    block.closest('.section-nav-wrapper')?.remove();
    return;
  }

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', title);
  const heading = document.createElement('h2');
  heading.className = 'section-nav-title';
  heading.textContent = title;
  const ul = document.createElement('ul');
  const here = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '');
  links.forEach(({ href, label }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    const path = new URL(href, window.location.href).pathname.replace(/\/$/, '');
    if (path === here || `/content${path}` === here) {
      a.setAttribute('aria-current', 'page');
    } else {
      a.className = 'link-arrow';
    }
    li.append(a);
    ul.append(li);
  });
  nav.append(heading, ul);
  block.replaceChildren(nav);
}
