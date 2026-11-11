import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates desktop width
const isDesktop = window.matchMedia('(min-width: 1200px)');

/**
 * Collapses every open dropdown in the nav.
 * @param {Element} nav The nav element
 * @param {Element} [except] A dropdown button to leave untouched
 */
function closeDropdowns(nav, except) {
  nav.querySelectorAll('.nav-drop > button[aria-expanded="true"]').forEach((button) => {
    if (button !== except) button.setAttribute('aria-expanded', 'false');
  });
}

/**
 * Opens or closes the header search panel.
 * @param {Element} nav The nav element
 * @param {boolean} open Open (true) or close (false)
 * @param {boolean} [focusToggle] Return focus to the search icon after closing
 */
function toggleSearch(nav, open, focusToggle = false) {
  const toggle = nav.querySelector('a.nav-search');
  const panel = nav.querySelector('.nav-search-panel');
  if (!toggle || !panel) return;
  panel.hidden = !open;
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (open) {
    panel.querySelector('input').focus();
  } else if (focusToggle) {
    toggle.focus();
  }
}

/**
 * The search icon opens a search panel under the header bar: a field with live suggestions
 * (pages and PDFs) that submits to the search page. Without JavaScript, or with a modifier
 * key, the icon stays a plain link to the search page. On the search page itself it focuses
 * the page's search field instead.
 * @param {Element} nav The nav element
 * @param {Element} link The search link
 */
function decorateSearch(nav, link) {
  const target = new URL(link.href, window.location.href);
  const panel = document.createElement('div');
  panel.className = 'nav-search-panel';
  panel.id = 'nav-search-panel';
  panel.hidden = true;
  panel.innerHTML = `<form class="nav-search-form" role="search" method="get">
      <label class="visually-hidden" for="nav-search-q">Search the site</label>
      <span class="nav-search-field">
        <img class="nav-search-field-icon" src="${window.hlx.codeBasePath}/icons/search-teal.svg" alt="" width="22" height="22">
        <input id="nav-search-q" type="search" name="q" placeholder="How can we help you today?">
      </span>
      <button type="submit" class="button primary">Search</button>
    </form>`;
  panel.querySelector('form').action = target.pathname;
  nav.append(panel);
  link.setAttribute('aria-controls', panel.id);
  link.setAttribute('aria-expanded', 'false');

  const input = panel.querySelector('input');
  let suggestions;
  link.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const pageField = document.querySelector('main .search input[type="search"]');
    if (pageField) {
      pageField.focus();
      pageField.select();
      return;
    }
    const open = panel.hidden;
    if (open) {
      closeDropdowns(nav);
      if (nav.getAttribute('aria-expanded') === 'true') {
        nav.setAttribute('aria-expanded', 'false');
        document.body.style.overflowY = '';
      }
      if (!suggestions) {
        suggestions = import('../../scripts/search-suggest.js')
          .then((m) => m.default(input, { container: panel.querySelector('.nav-search-form') }));
      }
    }
    toggleSearch(nav, open);
  });
  panel.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      toggleSearch(nav, false, true);
    }
  });
}

/**
 * Opens or closes the mobile menu.
 * @param {Element} nav The nav element
 * @param {boolean} [force] Force a state (true = open)
 */
function toggleMenu(nav, force) {
  const button = nav.querySelector('.nav-hamburger button');
  const open = typeof force === 'boolean' ? force : nav.getAttribute('aria-expanded') !== 'true';
  if (isDesktop.matches) {
    nav.removeAttribute('aria-expanded');
    document.body.style.overflowY = '';
    closeDropdowns(nav);
    return;
  }
  nav.setAttribute('aria-expanded', open ? 'true' : 'false');
  button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.style.overflowY = open ? 'hidden' : '';
  if (!open) closeDropdowns(nav);
}

/**
 * Removes button decoration the fragment added to a link.
 * @param {Element} link The link
 */
function unbutton(link) {
  link.classList.remove('button', 'primary', 'secondary', 'accent');
  const wrapper = link.closest('.button-wrapper');
  if (wrapper) wrapper.classList.remove('button-wrapper');
}

/**
 * Keeps only the icon of an icon link visible; its text becomes the accessible name.
 * @param {Element} link The link
 * @param {string} fallback Accessible name to use when the link has no text
 */
function labelIconLink(link, fallback) {
  const text = link.textContent.trim();
  link.setAttribute('aria-label', link.getAttribute('aria-label') || text || fallback);
  [...link.childNodes].filter((n) => n.nodeType === Node.TEXT_NODE).forEach((n) => n.remove());
  link.querySelectorAll('img').forEach((img) => { img.alt = ''; });
}

/**
 * Turns each top-level list item with a nested list into a dropdown.
 * @param {Element} sections The nav-sections container
 */
function decorateSections(sections, nav) {
  const list = sections.querySelector('ul');
  if (!list) return;
  list.classList.add('nav-menu');
  // documents wrap list item content in <p>; unwrap it so links sit directly in the items
  list.querySelectorAll('li > p').forEach((p) => p.replaceWith(...p.childNodes));
  [...list.children].forEach((item, i) => {
    const subList = item.querySelector(':scope > ul');
    if (!subList) {
      item.classList.add('nav-item');
      return;
    }
    item.classList.add('nav-item', 'nav-drop');
    const link = item.querySelector(':scope > a');
    const label = (link ? link.textContent : [...item.childNodes]
      .filter((n) => n !== subList)
      .map((n) => n.textContent)
      .join('')).trim();

    const panelId = `nav-panel-${i}`;
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', panelId);
    const labelEl = document.createElement('span');
    labelEl.textContent = label;
    button.append(labelEl);

    const panel = document.createElement('div');
    panel.className = 'nav-panel';
    panel.id = panelId;
    if (link) {
      // the authored section link becomes the panel's overview link
      const overview = document.createElement('p');
      overview.className = 'nav-panel-overview';
      link.classList.add('link-arrow');
      if (link.textContent.trim() === label) link.textContent = `${label} overview`;
      overview.append(link);
      panel.append(overview);
    }
    // groups: sub-items that hold their own list ("Benefits", "Coverage & enrollment")
    const groups = [...subList.children].filter((li) => li.querySelector(':scope > ul'));
    if (groups.length) {
      const wrap = document.createElement('div');
      wrap.className = 'nav-panel-groups';
      let loose = null; // plain links between groups share an untitled group
      [...subList.children].forEach((li) => {
        const inner = li.querySelector(':scope > ul');
        if (!inner) {
          if (!loose) {
            const group = document.createElement('div');
            group.className = 'nav-panel-group';
            loose = document.createElement('ul');
            loose.className = 'nav-panel-list';
            group.append(loose);
            wrap.append(group);
          }
          loose.append(li);
          return;
        }
        loose = null;
        const group = document.createElement('div');
        group.className = 'nav-panel-group';
        const title = document.createElement('p');
        title.className = 'nav-panel-group-title';
        const titleLink = li.querySelector(':scope > a');
        title.append(titleLink || [...li.childNodes].filter((n) => n !== inner)
          .map((n) => n.textContent).join('').trim());
        inner.classList.add('nav-panel-list');
        group.append(title, inner);
        wrap.append(group);
      });
      panel.classList.add('has-groups');
      panel.append(wrap);
    } else {
      subList.classList.add('nav-panel-list');
      if (subList.children.length > 5) subList.classList.add('nav-panel-list-columns');
      panel.append(subList);
    }

    item.textContent = '';
    item.append(button, panel);

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      toggleSearch(nav, false);
      if (isDesktop.matches) closeDropdowns(nav, button);
      button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });
}

/**
 * Decorates the tools area: search, sign in and contact links.
 * @param {Element} tools The nav-tools container
 */
function decorateTools(tools) {
  tools.querySelectorAll('a').forEach((link) => {
    const icon = link.querySelector('.icon');
    if (icon && icon.classList.contains('icon-search')) {
      link.classList.add('nav-search');
      labelIconLink(link, 'Search');
      return;
    }
    if (link.classList.contains('button')) {
      // "Sign in • Register": the part after the bullet is hidden on mobile
      unbutton(link);
      link.classList.add('nav-signin');
      const [first, ...rest] = link.textContent.split('•');
      const main = document.createElement('span');
      main.className = 'nav-signin-label';
      main.textContent = first.trim();
      link.replaceChildren(main);
      if (rest.length) {
        const extra = document.createElement('span');
        extra.className = 'nav-signin-extra';
        extra.textContent = ` • ${rest.join('•').trim()}`;
        link.append(extra);
      }
      return;
    }
    link.classList.add('nav-link');
  });
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-label', 'Main');
  if (fragment) {
    while (fragment.firstElementChild) nav.append(fragment.firstElementChild);
  }

  ['brand', 'sections', 'tools'].forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const brand = nav.querySelector('.nav-brand');
  if (brand) {
    const brandLink = brand.querySelector('a');
    if (brandLink) {
      unbutton(brandLink);
      labelIconLink(brandLink, 'Your Track to Health home');
    }
  }

  const sections = nav.querySelector('.nav-sections');
  if (sections) decorateSections(sections, nav);

  const tools = nav.querySelector('.nav-tools');
  if (tools) {
    decorateTools(tools);
    const searchLink = tools.querySelector('a.nav-search');
    if (searchLink) decorateSearch(nav, searchLink);
  }

  // mobile: the "Contact & forms" link also appears at the end of the menu
  if (sections && tools) {
    const contact = tools.querySelector('.nav-link');
    const menu = sections.querySelector('.nav-menu');
    if (contact && menu) {
      const item = document.createElement('li');
      item.className = 'nav-item nav-item-mobile';
      const copy = contact.cloneNode(true);
      copy.className = '';
      item.append(copy);
      menu.append(item);
    }
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.querySelector('button').addEventListener('click', () => {
    toggleSearch(nav, false);
    toggleMenu(nav);
  });
  nav.append(hamburger);

  // close on escape and on click outside
  window.addEventListener('keydown', (e) => {
    if (e.code !== 'Escape') return;
    const open = nav.querySelector('.nav-drop > button[aria-expanded="true"]');
    if (isDesktop.matches && open) {
      closeDropdowns(nav);
      open.focus();
    } else if (!isDesktop.matches && nav.getAttribute('aria-expanded') === 'true') {
      toggleMenu(nav, false);
      hamburger.querySelector('button').focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (nav.contains(e.target)) return;
    if (isDesktop.matches) closeDropdowns(nav);
    toggleSearch(nav, false);
  });
  nav.addEventListener('focusout', (e) => {
    if (isDesktop.matches && !nav.contains(e.relatedTarget)) closeDropdowns(nav);
  });

  toggleMenu(nav, false);
  isDesktop.addEventListener('change', () => toggleMenu(nav, false));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
