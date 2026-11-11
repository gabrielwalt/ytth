/**
 * The site's page tree, read from the /fragments/section-nav document (editable in DA): one
 * nested list per site section. Shared by the section menu, the breadcrumbs and the
 * "On this page" box, so they always agree.
 */
// eslint-disable-next-line import/no-cycle -- scripts.js loads this module dynamically
import { loadFragment } from '../blocks/fragment/fragment.js';

export const cleanPath = (p) => (p || '/').replace(/\.html$/, '').replace(/^\/content(?=\/)/, '').replace(/\/$/, '') || '/';

/**
 * Reads nested lists into a tree.
 * @param {Element} ul The list
 * @returns {Array<{href: string, label: string, path: string, children: Array}>} Nodes
 */
export function readTree(ul) {
  return [...ul.children].filter((li) => li.tagName === 'LI').map((li) => {
    const a = li.querySelector(':scope > a, :scope > p > a');
    const sub = li.querySelector(':scope > ul');
    const href = a ? a.getAttribute('href') : '';
    let path = '';
    try {
      const url = new URL(href, window.location.href);
      if (url.origin === window.location.origin) path = cleanPath(url.pathname);
    } catch { /* external */ }
    return {
      href, label: a ? a.textContent.trim() : '', path, children: sub ? readTree(sub) : [],
    };
  }).filter((n) => n.label);
}

/**
 * Finds the node for a page: exact match, else the deepest listed ancestor.
 * @param {Array} roots The section roots
 * @param {string} here The page path
 * @returns {{root: Object, trail: Array}|null} The section root and the path of nodes
 */
export function locate(roots, here) {
  let best = null;
  const visit = (node, trail, root) => {
    const t = [...trail, node];
    if (node.path && (here === node.path || here.startsWith(`${node.path}/`))) {
      const bestLength = best ? best.trail[best.trail.length - 1].path.length : -1;
      if (node.path.length > bestLength) best = { root, trail: t };
    }
    node.children.forEach((c) => visit(c, t, root));
  };
  roots.forEach((r) => visit(r, [], r));
  return best;
}

const cache = new Map();

/**
 * Loads the section roots of a tree document (once per page).
 * @param {string} source The fragment path
 * @returns {Promise<Array>} The section roots
 */
export function loadTree(source = '/fragments/section-nav') {
  if (!cache.has(source)) {
    cache.set(source, loadFragment(source).then((fragment) => {
      const roots = [];
      fragment?.querySelectorAll(':scope .default-content-wrapper > ul')
        .forEach((ul) => roots.push(...readTree(ul)));
      return roots;
    }));
  }
  return cache.get(source);
}
