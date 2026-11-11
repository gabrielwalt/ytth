/**
 * Search suggestions: turns a search field into a combobox that lists the best matches while
 * the visitor types (pages and PDFs), plus a "See all results" link to the search page.
 * Keyboard: ↓/↑ move through the list, Enter opens the highlighted result (or submits the
 * form), Escape closes the list. Styles: styles/search-suggest.css.
 *
 * Used by the header search panel, the homepage hero search and the 404 page.
 */
import { loadCSS } from './aem.js';
import {
  search, loadSearchData, appendHighlighted, resultLabel,
} from './search.js';

let count = 0;

/**
 * @param {HTMLInputElement} input The search field (inside a form that submits to /search)
 * @param {Object} [options]
 * @param {number} [options.limit] Number of suggestions (default 6)
 * @param {Element} [options.container] Where the list is placed (default: the form)
 */
export default function attachSuggestions(input, { limit = 6, container } = {}) {
  if (!input || input.dataset.suggest) return;
  loadCSS(`${window.hlx.codeBasePath}/styles/search-suggest.css`);
  count += 1;
  const id = `search-suggest-${count}`;
  input.dataset.suggest = id;
  const form = input.form || input.closest('form');
  const host = container || form;
  host.classList.add('search-suggest-host');

  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-controls', id);
  input.autocomplete = 'off';

  const panel = document.createElement('div');
  panel.className = 'search-suggest';
  panel.hidden = true;
  const list = document.createElement('ul');
  list.id = id;
  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-label', 'Search suggestions');
  const status = document.createElement('p');
  status.className = 'visually-hidden';
  status.setAttribute('role', 'status');
  panel.append(list);
  host.append(panel, status);

  let active = -1;
  let timer;
  let lastQuery = '';

  const options = () => [...list.querySelectorAll('[role="option"]')];
  const setActive = (i) => {
    const opts = options();
    opts.forEach((o, k) => o.setAttribute('aria-selected', k === i ? 'true' : 'false'));
    active = i;
    if (i >= 0 && opts[i]) {
      input.setAttribute('aria-activedescendant', opts[i].id);
      opts[i].scrollIntoView({ block: 'nearest' });
    } else {
      input.removeAttribute('aria-activedescendant');
    }
  };
  const close = () => {
    panel.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    setActive(-1);
  };
  const open = () => {
    if (!list.children.length) return;
    panel.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  };

  const searchUrl = (q) => {
    const url = new URL(form.getAttribute('action') || '/search', window.location.href);
    url.searchParams.set('q', q);
    return `${url.pathname}${url.search}`;
  };

  const option = (k, href, build, extraClass) => {
    const li = document.createElement('li');
    li.id = `${id}-${k}`;
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', 'false');
    if (extraClass) li.className = extraClass;
    const a = document.createElement('a');
    a.href = href;
    a.tabIndex = -1;
    build(a);
    li.append(a);
    // keep the field focused while clicking a suggestion
    li.addEventListener('mousedown', (e) => e.preventDefault());
    return li;
  };

  const render = async () => {
    const q = input.value.trim();
    if (q === lastQuery && list.children.length) { open(); return; }
    lastQuery = q;
    if (q.length < 2) {
      list.replaceChildren();
      close();
      return;
    }
    const { terms, results } = await search(q, { limit });
    if (input.value.trim() !== q) return; // a newer query is on its way
    const items = results.map(({ row }, k) => option(k, row.path, (a) => {
      const title = document.createElement('span');
      title.className = 'search-suggest-title';
      appendHighlighted(title, row.title, terms);
      a.append(title);
      const label = resultLabel(row);
      if (label) {
        const meta = document.createElement('span');
        meta.className = 'search-suggest-meta';
        meta.textContent = label;
        a.append(meta);
      }
      if (row.type === 'document') {
        a.target = '_blank';
        a.rel = 'noopener';
      }
    }, row.type === 'document' ? 'is-document' : ''));
    items.push(option(items.length, searchUrl(q), (a) => {
      a.textContent = results.length ? `See all results for “${q}”` : `No quick matches. Search for “${q}”`;
    }, 'search-suggest-all'));
    list.replaceChildren(...items);
    setActive(-1);
    status.textContent = results.length
      ? `${results.length} suggestion${results.length === 1 ? '' : 's'} available.`
      : 'No suggestions.';
    open();
  };

  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(render, 120);
  });
  // load the indexes as soon as the visitor shows interest
  input.addEventListener('focus', () => {
    loadSearchData();
    if (input.value.trim().length >= 2) render();
  });
  input.addEventListener('keydown', (e) => {
    const opts = options();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (panel.hidden) { render(); return; }
      setActive(Math.min(active + 1, opts.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(Math.max(active - 1, -1));
    } else if (e.key === 'Enter' && active >= 0 && opts[active]) {
      e.preventDefault();
      opts[active].querySelector('a').click();
      close();
    } else if (e.key === 'Escape' && !panel.hidden) {
      e.stopPropagation(); // first Escape closes the list, not the surrounding panel
      close();
    }
  });
  input.addEventListener('blur', () => setTimeout(close, 100));
  form.addEventListener('submit', close);
}
