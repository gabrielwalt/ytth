/**
 * Search: a search field and results from the site's page index. The homepage hero and the
 * 404 page submit to /search?q=…
 *
 * Authoring: an empty block, or a row "Source | /some-index.json" to search another index.
 * @param {Element} block The block
 */
import { fetchIndex, cleanTitle } from '../../scripts/site-index.js';

const MAX_RESULTS = 50;

/**
 * Scores a page against the search terms (title hits weigh most).
 * @param {Object} row The index row
 * @param {string[]} terms Lower-case search terms
 * @returns {number} The score (0 = no match)
 */
function score(row, terms) {
  const title = cleanTitle(row.title).toLowerCase();
  const desc = (row.description || '').toLowerCase();
  const path = (row.path || '').toLowerCase();
  let total = 0;
  for (let i = 0; i < terms.length; i += 1) {
    const t = terms[i];
    let s = 0;
    if (title.includes(t)) s += 10;
    if (desc.includes(t)) s += 4;
    if (path.includes(t)) s += 2;
    if (!s) return 0; // every term must match somewhere
    total += s;
  }
  return total;
}

/**
 * Appends text to an element with the search terms wrapped in <mark>.
 * @param {Element} el The target element
 * @param {string} text The text
 * @param {string[]} terms The search terms
 */
function appendHighlighted(el, text, terms) {
  if (!terms.length) {
    el.append(text);
    return;
  }
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(${escaped.join('|')})`, 'gi');
  text.split(re).forEach((part, i) => {
    if (i % 2) {
      const m = document.createElement('mark');
      m.textContent = part;
      el.append(m);
    } else if (part) {
      el.append(part);
    }
  });
}

export default async function decorate(block) {
  const config = {};
  [...block.children].forEach((row) => {
    const [k, v] = [...row.children];
    if (k && v) config[k.textContent.trim().toLowerCase()] = v.textContent.trim();
  });
  const source = config.source || '/query-index.json';
  const params = new URLSearchParams(window.location.search);

  const form = document.createElement('form');
  form.className = 'search-form';
  form.setAttribute('role', 'search');
  const label = document.createElement('label');
  label.className = 'visually-hidden';
  label.htmlFor = 'search-q';
  label.textContent = 'Search the site';
  const input = document.createElement('input');
  input.id = 'search-q';
  input.type = 'search';
  input.name = 'q';
  input.placeholder = 'How can we help you today?';
  input.autocomplete = 'off';
  input.value = params.get('q') || '';
  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'button primary';
  button.textContent = 'Search';
  form.append(label, input, button);

  const status = document.createElement('p');
  status.className = 'search-status';
  status.setAttribute('role', 'status');
  const list = document.createElement('ol');
  list.className = 'search-results';
  block.replaceChildren(form, status, list);

  const run = async () => {
    const q = input.value.trim();
    const terms = q.toLowerCase().split(/\s+/).filter((t) => t.length > 1);
    list.replaceChildren();
    if (!terms.length) {
      status.textContent = '';
      return;
    }
    status.textContent = 'Searching…';
    let rows = [];
    try {
      rows = await fetchIndex(source);
    } catch {
      rows = [];
    }
    const hits = rows
      .map((r) => ({ r, s: score(r, terms) }))
      .filter((h) => h.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, MAX_RESULTS);
    status.textContent = hits.length
      ? `${hits.length} result${hits.length === 1 ? '' : 's'} for “${q}”`
      : `No results for “${q}”. Try other words, or browse Benefits & coverage and Health programs.`;
    hits.forEach(({ r }) => {
      const li = document.createElement('li');
      const h = document.createElement('h2');
      const a = document.createElement('a');
      a.href = r.path;
      appendHighlighted(a, cleanTitle(r.title) || r.path, terms);
      h.append(a);
      li.append(h);
      if (r.description) {
        const p = document.createElement('p');
        appendHighlighted(p, r.description, terms);
        li.append(p);
      }
      const path = document.createElement('p');
      path.className = 'search-path';
      path.textContent = r.path;
      li.append(path);
      list.append(li);
    });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set('q', input.value.trim());
    window.history.replaceState({}, '', url);
    run();
  });
  run();
}
