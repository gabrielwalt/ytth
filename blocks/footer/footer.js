import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Removes button decoration and the paragraph wrapper the fragment added to list content.
 * @param {Element} root The element to clean
 */
function unwrapListParagraphs(root) {
  root.querySelectorAll('li > p').forEach((p) => p.replaceWith(...p.childNodes));
}

/**
 * Builds the link navigation: single links in the first column, then link groups.
 * @param {Element} section The fragment section holding the lists
 * @returns {Element} The footer nav
 */
function buildNav(section) {
  const nav = document.createElement('nav');
  nav.className = 'footer-nav';
  nav.setAttribute('aria-label', 'Footer');

  const singles = document.createElement('div');
  singles.className = 'footer-links';
  const groups = [];

  section.querySelectorAll(':scope .default-content-wrapper > ul').forEach((list) => {
    unwrapListParagraphs(list);
    const plain = [...list.children].filter((li) => !li.querySelector('ul'));
    const nested = [...list.children].filter((li) => li.querySelector('ul'));
    if (plain.length) {
      const ul = document.createElement('ul');
      ul.append(...plain);
      singles.append(ul);
    }
    nested.forEach((li) => {
      const group = document.createElement('div');
      group.className = 'footer-group';
      const heading = li.querySelector(':scope > a');
      const sub = li.querySelector(':scope > ul');
      if (heading) {
        heading.classList.add('footer-heading');
        group.append(heading);
      }
      if (sub) {
        sub.classList.add('footer-sublinks');
        sub.style.setProperty('--rows', Math.ceil(sub.children.length / 2));
        group.append(sub);
      }
      groups.push(group);
    });
  });

  nav.append(singles, ...groups);
  return nav;
}

/**
 * Builds the legal row: notice links and the copyright line.
 * @param {Element} section The fragment section holding the legal content
 * @returns {Element} The legal row
 */
function buildLegal(section) {
  const legal = document.createElement('div');
  legal.className = 'footer-legal';
  const wrapper = section.querySelector('.default-content-wrapper') || section;
  const list = wrapper.querySelector('ul');
  if (list) {
    unwrapListParagraphs(list);
    list.className = 'footer-notices';
    list.querySelectorAll('a').forEach((a) => {
      if (a.hostname !== window.location.hostname || /\.pdf($|[?#])/i.test(a.pathname)) {
        a.classList.add('footer-external');
        a.target = '_blank';
        a.rel = 'noopener';
      }
    });
    legal.append(list);
  }
  const meta = document.createElement('div');
  meta.className = 'footer-meta';
  wrapper.querySelectorAll(':scope > p').forEach((p) => meta.append(p));
  legal.append(meta);
  return legal;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  block.textContent = '';
  if (!fragment) return;

  const [top, links, legal] = [...fragment.querySelectorAll(':scope > .section')];
  const footer = document.createElement('div');
  footer.className = 'footer-inner';

  if (top) {
    const brand = document.createElement('div');
    brand.className = 'footer-top';
    const wrapper = top.querySelector('.default-content-wrapper') || top;
    const logoLink = wrapper.querySelector('a:has(.icon)');
    if (logoLink) {
      logoLink.className = 'footer-logo';
      const text = logoLink.textContent.trim();
      logoLink.setAttribute('aria-label', text || 'Your Track to Health home');
      [...logoLink.childNodes]
        .filter((n) => n.nodeType === Node.TEXT_NODE)
        .forEach((n) => n.remove());
      brand.append(logoLink);
    }
    const actions = document.createElement('div');
    actions.className = 'footer-actions';
    wrapper.querySelectorAll('a.button').forEach((a) => actions.append(a));
    brand.append(actions);
    footer.append(brand);
  }
  if (links) footer.append(buildNav(links));
  if (legal) footer.append(buildLegal(legal));

  block.append(footer);
}
