/**
 * Reads the site's page index (the query index set up in the site configuration).
 * Used by the search, article-list and section-nav blocks.
 */

const cache = new Map();

/**
 * Removes the site name that page titles may carry.
 * @param {string} title The page title
 * @returns {string} The title without the site suffix
 */
export function cleanTitle(title) {
  return (title || '').replace(/\s*[|–-]\s*Your Track to Health\s*$/i, '').trim();
}

/**
 * Fetches every row of an index sheet, following the sheet's paging.
 * @param {string} [source] The index URL (default: /query-index.json)
 * @returns {Promise<Array<Object>>} The index rows
 */
export async function fetchIndex(source = '/query-index.json') {
  if (cache.has(source)) return cache.get(source);
  // until the site's query index is configured, the default source falls back to the
  // index generated from the migrated content (/search-index.json, served from the code)
  if (source === '/query-index.json') {
    const probe = await fetch('/query-index.json?limit=1').catch(() => null);
    if (!probe || !probe.ok) return fetchIndex('/search-index.json');
  }
  const load = (async () => {
    const rows = [];
    const pageSize = 500;
    let offset = 0;
    let total = Infinity;
    while (offset < total) {
      const url = new URL(source, window.location.href);
      url.searchParams.set('offset', offset);
      url.searchParams.set('limit', pageSize);
      // eslint-disable-next-line no-await-in-loop
      const resp = await fetch(url);
      if (!resp.ok) break;
      // eslint-disable-next-line no-await-in-loop
      const json = await resp.json();
      const data = json.data || [];
      rows.push(...data);
      total = Number.isFinite(json.total) ? json.total : rows.length;
      if (!data.length) break;
      offset += data.length;
    }
    return rows.filter((r) => r.path && !/^\/(nav|footer|drafts|fragments)(\/|$)/.test(r.path));
  })();
  cache.set(source, load);
  return load;
}

/**
 * Formats an index date (epoch seconds, ms, or a date string) for display.
 * @param {string|number} value The date value
 * @returns {string} e.g. "August 3, 2026" or '' when unknown
 */
export function formatDate(value) {
  if (!value) return '';
  let n = Number(value);
  if (Number.isFinite(n) && n < 1e11) n *= 1000;
  const d = Number.isFinite(n) ? new Date(n) : new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
