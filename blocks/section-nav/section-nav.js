/**
 * Section nav: the side menu of inner pages (replaces the current site's left-hand menu,
 * its breadcrumbs and its "Jump to" links).
 *
 * Source: the /fragments/section-nav document (editable in DA). It holds one nested list per
 * site section, the same way the header nav is authored. The block shows the tree of the
 * section the current page belongs to:
 * - the branch of the current page is open, the others are collapsed (toggle buttons)
 * - the current page is highlighted; pages that are not in the menu (for example the health
 *   articles) highlight their closest listed parent
 * - the hero eyebrow (section name) becomes a link to the section's main page (the breadcrumbs,
 *   scripts/breadcrumbs.js, then replace it)
 * "On this page" is a separate box at the top of the content column (scripts/toc.js).
 * Desktop (>= 1200px): sticky left column that scrolls on its own (no scroll chaining) and
 * starts scrolled to the current page. Smaller screens: a collapsible panel above the content.
 *
 * Authoring: an empty "Section nav" block. Optional rows: a list of links (used instead of
 * the fragment), or "Source | /other-fragment".
 * @param {Element} block The block
 */
import { loadFragment } from '../fragment/fragment.js';
import {
  cleanPath, readTree, locate, loadTree,
} from '../../scripts/site-tree.js';

let instance = 0;

/**
 * Renders one level of the tree.
 * @param {Array} nodes The nodes
 * @param {Set} open Nodes on the current trail
 * @param {Object} current The current node
 * @param {number} depth Nesting depth (1 = section children)
 * @returns {HTMLUListElement} The list
 */
function renderList(nodes, open, current, depth) {
  const ul = document.createElement('ul');
  ul.className = `section-nav-list depth-${depth}`;
  nodes.forEach((node) => {
    const li = document.createElement('li');
    const row = document.createElement('div');
    row.className = 'section-nav-item';
    const a = document.createElement('a');
    a.href = node.href;
    a.textContent = node.label;
    if (node === current) {
      a.setAttribute('aria-current', 'page');
      li.classList.add('is-current');
    } else if (open.has(node)) {
      li.classList.add('is-trail');
    }
    row.append(a);
    li.append(row);
    if (node.children.length) {
      instance += 1;
      const id = `section-nav-sub-${instance}`;
      const expanded = open.has(node);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'section-nav-toggle';
      button.setAttribute('aria-expanded', expanded);
      button.setAttribute('aria-controls', id);
      button.setAttribute('aria-label', `${expanded ? 'Hide' : 'Show'} pages in ${node.label}`);
      button.addEventListener('click', () => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isOpen);
        button.setAttribute('aria-label', `${isOpen ? 'Show' : 'Hide'} pages in ${node.label}`);
      });
      row.append(button);
      const sub = renderList(node.children, open, current, depth + 1);
      sub.id = id;
      li.append(sub);
    }
    ul.append(li);
  });
  return ul;
}

export default async function decorate(block) {
  const wrapper = block.closest('.section-nav-wrapper');
  const section = block.closest('.section');
  const config = {};
  [...block.children].forEach((row) => {
    const [k, v] = [...row.children];
    if (k && v && !k.querySelector('a, ul')) config[k.textContent.trim().toLowerCase()] = v.textContent.trim();
  });
  const authored = block.querySelector('ul');
  let roots = [];
  if (authored) {
    roots = [{
      href: window.location.pathname, label: 'In this section', path: '', children: readTree(authored),
    }];
  } else if (config.source) {
    const fragment = await loadFragment(config.source);
    fragment?.querySelectorAll(':scope .default-content-wrapper > ul')
      .forEach((ul) => roots.push(...readTree(ul)));
  } else {
    roots = await loadTree();
  }

  const here = cleanPath(window.location.pathname);
  const found = locate(roots, here) || (authored ? { root: roots[0], trail: [roots[0]] } : null);
  if (!found) {
    wrapper?.remove();
    return;
  }
  const { root, trail } = found;
  const last = trail[trail.length - 1];
  // a page below the section root that isn't listed highlights nothing (the root stays a link)
  const current = last === root && root.path !== here ? null : last;
  const open = new Set(trail);

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', `${root.label}: pages in this section`);

  // small screens: a disclosure bar that names the current page
  instance += 1;
  const panelId = `section-nav-panel-${instance}`;
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'section-nav-disclosure';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', panelId);
  const lead = document.createElement('span');
  lead.className = 'section-nav-disclosure-label';
  lead.textContent = 'In this section';
  const where = document.createElement('span');
  where.className = 'section-nav-disclosure-current';
  where.textContent = (current || root).label;
  toggle.append(lead, where);
  toggle.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', toggle.getAttribute('aria-expanded') !== 'true');
  });

  const panel = document.createElement('div');
  panel.className = 'section-nav-panel';
  panel.id = panelId;
  const head = document.createElement('a');
  head.className = 'section-nav-root';
  head.href = root.href;
  head.textContent = root.label;
  if (root === current) head.setAttribute('aria-current', 'page');
  panel.append(head, renderList(root.children, open, current, 1));
  nav.append(toggle, panel);
  block.replaceChildren(nav);

  // reading order: the menu comes before the page content
  if (wrapper && section && section.firstElementChild !== wrapper) section.prepend(wrapper);
  section?.classList.add('has-section-nav');

  // desktop: the sticky column scrolls on its own; start with the current page in view
  requestAnimationFrame(() => {
    const scroller = wrapper;
    const mark = panel.querySelector('[aria-current="page"]');
    if (!scroller || !mark || scroller.scrollHeight <= scroller.clientHeight) return;
    const top = mark.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
    if (top > scroller.clientHeight - 80) scroller.scrollTop = top - scroller.clientHeight / 3;
  });

  // the hero eyebrow names the section: link it to the section's main page
  if (!authored && root.path) {
    const eyebrow = document.querySelector('.hero .hero-eyebrow');
    if (eyebrow && !eyebrow.querySelector('a') && eyebrow.textContent.trim().toLowerCase() === root.label.toLowerCase()) {
      const a = document.createElement('a');
      a.href = root.href;
      a.textContent = eyebrow.textContent.trim();
      eyebrow.replaceChildren(a);
    }
  }
}
