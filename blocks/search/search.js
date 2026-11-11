/**
 * Search page: a search field with live results from the page index and the PDF documents
 * linked across the site (scripts/search.js). Results show the section, the title and an
 * excerpt with the matched words, and can be narrowed to one section or to PDFs.
 * The header search panel, the homepage hero and the 404 page submit to /search?q=…
 *
 * Authoring: an empty block. A list of links in the block becomes the "Popular pages" shown
 * before searching and when nothing matches (default: the main sections).
 * @param {Element} block The block
 */
import {
  search, snippet, appendHighlighted, resultLabel,
} from '../../scripts/search.js';

const PAGE_SIZE = 20;
const SECTION_ORDER = ['Benefits & coverage', 'Health programs', 'Retirement', 'Contact & forms', 'News'];
const DEFAULT_POPULAR = [
  ['/benefits-coverage', 'Benefits & coverage'],
  ['/benefits-coverage/medical-plans/find-a-doctor', 'Find a doctor'],
  ['/benefits-coverage/benefit-lookup', 'Medical benefit & SBC lookup'],
  ['/contact-forms/forms', 'Forms'],
  ['/contact-forms/benefits-directory', 'Benefits directory'],
  ['/health-programs', 'Health programs'],
];

const el = (tag, className, text) => {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text) e.textContent = text;
  return e;
};

/** Which filter a result belongs to: its section, or "documents" for PDFs. */
const groupOf = (row) => (row.type === 'document' ? 'documents' : row.section || 'other');
const groupLabel = (key) => ({ all: 'All results', documents: 'PDF documents', other: 'Other pages' }[key] || key);

function popularList(block) {
  const authored = [...block.querySelectorAll('a[href]')].map((a) => [a.getAttribute('href'), a.textContent.trim()]);
  const items = authored.length ? authored : DEFAULT_POPULAR;
  const wrap = el('div', 'search-popular');
  wrap.append(el('h2', 'search-popular-title', 'Popular pages'));
  const ul = el('ul');
  items.forEach(([href, text]) => {
    const li = el('li');
    const a = el('a', 'link-arrow', text);
    a.href = href;
    li.append(a);
    ul.append(li);
  });
  wrap.append(ul);
  return wrap;
}

function resultItem(row, terms) {
  const li = el('li', row.type === 'document' ? 'search-result is-document' : 'search-result');
  const label = resultLabel(row);
  if (label) li.append(el('p', 'search-result-label', label));
  const h = el('h2', 'search-result-title');
  const a = el('a');
  a.href = row.path;
  appendHighlighted(a, row.title, terms);
  if (row.type === 'document') {
    a.target = '_blank';
    a.rel = 'noopener';
    a.append(el('span', 'visually-hidden', ' (PDF, opens in a new tab)'));
  }
  h.append(a);
  li.append(h);
  const text = snippet(row, terms);
  if (text) {
    const p = el('p', 'search-result-text');
    appendHighlighted(p, text, terms);
    li.append(p);
  }
  if (row.type === 'document' && row.page) {
    const from = el('p', 'search-result-url', 'Linked from ');
    const page = el('a');
    page.href = row.page;
    page.textContent = row.pageTitle || row.page;
    from.append(page);
    li.append(from);
  } else {
    li.append(el('p', 'search-result-url', row.path));
  }
  return li;
}

export default async function decorate(block) {
  const popular = popularList(block);
  const params = new URLSearchParams(window.location.search);

  const form = el('form', 'search-form');
  form.setAttribute('role', 'search');
  form.innerHTML = `<label class="visually-hidden" for="search-q">Search the site</label>
    <span class="search-field">
      <img class="search-field-icon" src="${window.hlx.codeBasePath}/icons/search-teal.svg" alt="" width="22" height="22">
      <input id="search-q" type="search" name="q" autocomplete="off" placeholder="How can we help you today?">
    </span>
    <button type="submit" class="button primary">Search</button>`;
  const input = form.querySelector('input');
  input.value = params.get('q') || '';

  const status = el('p', 'search-status');
  status.setAttribute('role', 'status');
  const filters = el('div', 'search-filters');
  filters.setAttribute('role', 'group');
  filters.setAttribute('aria-label', 'Filter results');
  const list = el('ol', 'search-results');
  const more = el('button', 'button secondary search-more', 'Show more results');
  more.type = 'button';
  more.hidden = true;
  block.replaceChildren(form, status, filters, list, more, popular);

  let filter = params.get('filter') || 'all';
  let shown = PAGE_SIZE;
  let current = { terms: [], results: [], partial: false };
  let timer;

  const updateUrl = () => {
    const url = new URL(window.location.href);
    const q = input.value.trim();
    if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
    if (filter !== 'all') url.searchParams.set('filter', filter); else url.searchParams.delete('filter');
    window.history.replaceState({}, '', url);
  };

  const renderResults = () => {
    const {
      terms, results, partial, ignored = [],
    } = current;
    const q = input.value.trim();
    const counts = new Map([['all', results.length]]);
    results.forEach(({ row }) => counts.set(groupOf(row), (counts.get(groupOf(row)) || 0) + 1));
    if (!counts.has(filter)) filter = 'all';

    // filter buttons: all, then the sections in menu order, other pages, PDFs
    const keys = ['all', ...SECTION_ORDER, ...[...counts.keys()].filter((k) => !SECTION_ORDER.includes(k) && !['all', 'other', 'documents'].includes(k)), 'other', 'documents']
      .filter((k) => counts.get(k));
    filters.replaceChildren(...(results.length ? keys : []).map((k) => {
      const b = el('button', 'search-filter');
      b.type = 'button';
      b.setAttribute('aria-pressed', k === filter ? 'true' : 'false');
      b.append(groupLabel(k), el('span', 'search-filter-count', ` ${counts.get(k)}`));
      b.addEventListener('click', () => {
        filter = k;
        shown = PAGE_SIZE;
        updateUrl();
        renderResults();
      });
      return b;
    }));

    const visible = results.filter(({ row }) => filter === 'all' || groupOf(row) === filter);
    list.replaceChildren(...visible.slice(0, shown).map(({ row }) => resultItem(row, terms)));
    more.hidden = visible.length <= shown;

    if (!q) {
      status.textContent = '';
    } else if (!results.length) {
      status.textContent = `No results for “${q}”. Check the spelling, try fewer or more general words, or start from one of the popular pages below.`;
    } else {
      const n = results.length;
      const searched = terms.map((t) => t.word).join(' ');
      const notFound = ignored.length ? `No pages mention “${ignored.join(' ')}”. ` : '';
      const forWhat = ignored.length ? searched : q;
      status.textContent = `${notFound}${n} result${n === 1 ? '' : 's'} for “${forWhat}”${partial ? ' (pages that match some of your words)' : ''}`;
    }
    popular.hidden = Boolean(q && results.length);
  };

  const run = async () => {
    const q = input.value.trim();
    shown = PAGE_SIZE;
    if (!q) {
      current = { terms: [], results: [], partial: false };
      renderResults();
      return;
    }
    if (!current.results.length) status.textContent = 'Searching…';
    const found = await search(q);
    if (input.value.trim() !== q) return; // a newer query is running
    current = found;
    renderResults();
  };

  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      filter = 'all';
      updateUrl();
      run();
    }, 200);
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearTimeout(timer);
    updateUrl();
    run();
  });
  more.addEventListener('click', () => {
    const first = list.children.length;
    shown += PAGE_SIZE;
    renderResults();
    const next = list.children[first];
    if (next) next.querySelector('a').focus();
  });

  run();
  if (!input.value) input.focus({ preventScroll: true });
}
