/**
 * Breadcrumbs: Home › section › … › current page, in the navy page header of inner pages.
 * The trail comes from the same page tree as the section menu (/fragments/section-nav), so the
 * two always agree; a page that is not listed (a health article) follows its closest listed
 * parent and ends with its own title.
 *
 * Placement: on content and article pages the breadcrumb takes the place of the section
 * eyebrow (same line, so nothing moves); on pages whose eyebrow is a designed label (MMCP,
 * CHCB, HDHP: "Medical plan details") it sits above it, in the header's top spacing.
 * Not shown on the homepage or on section main pages (their trail would only be "Home").
 * Small screens show only the link to the parent page ("‹ Medical plans").
 */
// eslint-disable-next-line import/no-cycle -- loaded dynamically by scripts.js
import { cleanPath, loadTree, locate } from './site-tree.js';

export default async function buildBreadcrumbs(main = document.querySelector('main')) {
  const hero = main?.querySelector('.hero.navy .hero-text');
  if (!hero || hero.querySelector('.breadcrumbs')) return;
  const here = cleanPath(window.location.pathname);
  if (here === '/' || here === '/index') return;
  const roots = await loadTree();
  const found = locate(roots, here);
  if (!found) return;
  const h1 = hero.querySelector('h1');
  const title = (h1?.textContent || document.title).replace(/\s+/g, ' ').trim();
  const items = [{ label: 'Home', href: '/' }];
  found.trail.forEach((n) => items.push({ label: n.label, href: n.href, path: n.path }));
  const last = items[items.length - 1];
  if (last.path !== here) items.push({ label: title });
  if (items.length < 3) return;

  const nav = document.createElement('nav');
  nav.className = 'breadcrumbs';
  nav.setAttribute('aria-label', 'Breadcrumb');
  const ol = document.createElement('ol');
  items.forEach((item, i) => {
    const li = document.createElement('li');
    const isLast = i === items.length - 1;
    if (isLast) {
      const span = document.createElement('span');
      span.setAttribute('aria-current', 'page');
      span.textContent = item.label;
      li.append(span);
    } else {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      li.append(a);
    }
    if (i === items.length - 2) li.classList.add('breadcrumbs-parent');
    ol.append(li);
  });
  nav.append(ol);

  const eyebrow = hero.querySelector('.hero-eyebrow');
  const sectionLabel = found.root.label.toLowerCase();
  if (eyebrow && eyebrow.textContent.trim().toLowerCase() === sectionLabel) {
    eyebrow.replaceWith(nav);
  } else {
    nav.classList.add('breadcrumbs-above');
    hero.prepend(nav);
  }
}
