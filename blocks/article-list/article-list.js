/**
 * Article list: news and article archives built from the site's page index.
 *
 * Authoring (key | value rows, all optional):
 * - Folder | /news           pages below this folder (default: the current page's folder)
 * - Limit  | 12              number of articles per page of results (default 12)
 * - Source | /query-index.json
 * Newest first (by "date" or "lastModified"); a "Show more" button reveals the next ones.
 * @param {Element} block The block
 */
import { fetchIndex, cleanTitle, formatDate } from '../../scripts/site-index.js';

export default async function decorate(block) {
  const config = {};
  [...block.children].forEach((row) => {
    const [k, v] = [...row.children];
    if (k && v) config[k.textContent.trim().toLowerCase()] = v.textContent.trim();
  });
  const here = window.location.pathname.replace(/\.html$/, '').replace(/^\/content(?=\/)/, '').replace(/\/$/, '');
  const folder = (config.folder || here).replace(/\/$/, '');
  const limit = Number.parseInt(config.limit, 10) || 12;

  let rows = [];
  try {
    rows = await fetchIndex(config.source || '/query-index.json');
  } catch {
    rows = [];
  }
  const when = (r) => {
    const n = Number(r.date || r.lastModified);
    if (Number.isFinite(n)) return n;
    const t = Date.parse(r.date || r.lastModified);
    return Number.isFinite(t) ? t / 1000 : 0;
  };
  const articles = rows
    .filter((r) => r.path.startsWith(`${folder}/`) && r.path !== folder)
    .sort((a, b) => when(b) - when(a));

  if (!articles.length) {
    const p = document.createElement('p');
    p.className = 'article-list-empty';
    p.textContent = 'There are no articles here yet.';
    block.replaceChildren(p);
    return;
  }

  const ul = document.createElement('ul');
  const more = document.createElement('p');
  more.className = 'button-wrapper article-list-more';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'button secondary';
  button.textContent = 'Show more';
  more.append(button);

  let shown = 0;
  const showNext = () => {
    articles.slice(shown, shown + limit).forEach((r) => {
      const li = document.createElement('li');
      const date = formatDate(r.date || r.lastModified);
      if (date) {
        const d = document.createElement('p');
        d.className = 'article-list-date eyebrow';
        d.textContent = date;
        li.append(d);
      }
      const h = document.createElement('h2');
      const a = document.createElement('a');
      a.href = r.path;
      a.textContent = cleanTitle(r.title) || r.path;
      h.append(a);
      li.append(h);
      if (r.description) {
        const p = document.createElement('p');
        p.textContent = r.description;
        li.append(p);
      }
      ul.append(li);
    });
    shown = Math.min(shown + limit, articles.length);
    more.hidden = shown >= articles.length;
  };
  button.addEventListener('click', showNext);
  showNext();
  block.replaceChildren(ul, more);
}
