/**
 * Site search: ranks the page index and the PDF document index against a query, and builds
 * highlighted snippets. Used by the search block, the header search panel and the search
 * suggestions of the homepage hero and the 404 page.
 *
 * Sources:
 * - pages: the site's page index (`/query-index.json`, falling back to the generated
 *   `/search-index.json`); a `content` column with the page text makes full-text search work
 * - documents: `/search-documents.json`, the PDFs linked from the pages (generated)
 */
import { fetchIndex, cleanTitle } from './site-index.js';

const DOCUMENTS_SOURCE = '/search-documents.json';

// site sections by first path segment (the hero eyebrow of some pages names a sub-area)
const SECTIONS = {
  'benefits-coverage': 'Benefits & coverage',
  'health-programs': 'Health programs',
  retirement: 'Retirement',
  'contact-forms': 'Contact & forms',
  news: 'News',
};

/**
 * The site section of a page or of the page a PDF is linked from.
 * @param {Object} row The index row
 * @returns {string} The section name, or '' for pages outside the sections
 */
const sectionOf = (row) => {
  const first = ((row.type === 'document' ? row.page : row.path) || '').split('/')[1];
  return SECTIONS[first] || '';
};

// utility pages that are no answer to a question
const EXCLUDE = /^\/(search|sitemap|feedback-thank-you|404)$/;

// words that carry no meaning on their own ("how do I find a doctor" → "find", "doctor")
const STOPWORDS = new Set(('a an the and or of to for in on at by with from my me i we our is are am be '
  + 'do does did can could how what where when who which why your you it its get about this that there').split(' '));

// everyday words members use for the plan's terms (each key also matches its listed words)
const SYNONYMS = {
  doctor: ['physician', 'provider'],
  doctors: ['physician', 'provider'],
  physician: ['doctor'],
  rx: ['prescription', 'pharmacy'],
  drug: ['prescription', 'medication'],
  drugs: ['prescription', 'medication'],
  medicine: ['prescription', 'medication'],
  pharmacy: ['prescription'],
  eye: ['vision'],
  eyes: ['vision'],
  glasses: ['vision'],
  teeth: ['dental'],
  dentist: ['dental'],
  therapy: ['behavioral', 'mental'],
  counseling: ['behavioral', 'mental'],
  retire: ['retirement', 'retiree'],
  baby: ['maternity', 'pregnancy'],
  pregnant: ['maternity', 'pregnancy', 'baby'],
  smoking: ['nicotine', 'tobacco'],
  gym: ['fitness'],
};

/**
 * Lower-cases, strips accents and turns punctuation into spaces.
 * @param {string} s The text
 * @returns {string} The normalized text
 */
export function normalize(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Simple English stemming: "claims" → "claim", "therapies" → "therapy".
 * @param {string} t A normalized word
 * @returns {string} The stem
 */
function stem(t) {
  if (t.length > 4 && t.endsWith('ies')) return `${t.slice(0, -3)}y`;
  if (t.length > 4 && /(ches|shes|sses|xes)$/.test(t)) return t.slice(0, -2);
  if (t.length > 3 && t.endsWith('s') && !t.endsWith('ss')) return t.slice(0, -1);
  return t;
}

/**
 * Splits a query into terms; each term matches its stem and synonyms at word starts.
 * Short terms (3 letters or fewer, e.g. "hsa", "id") must match whole words.
 * @param {string} query The query
 * @returns {Array<{word: string, exact: RegExp, related: RegExp|null, all: RegExp}>} The terms
 */
export function parseQuery(query) {
  const words = normalize(query).split(' ').filter(Boolean);
  const meaningful = words.filter((w) => !STOPWORDS.has(w));
  const list = meaningful.length ? meaningful : words;
  return [...new Set(list)].map((word) => {
    const base = stem(word);
    const forms = [...new Set([word, base])];
    const related = [...new Set([...(SYNONYMS[word] || []), ...(SYNONYMS[base] || [])])];
    const pattern = (variants) => variants
      .map((v) => (v.length <= 3 ? `${escapeRe(v)}\\b` : escapeRe(v)))
      .join('|');
    return {
      word,
      exact: new RegExp(`\\b(?:${pattern(forms)})`, 'i'),
      related: related.length ? new RegExp(`\\b(?:${pattern(related)})`, 'i') : null,
      all: new RegExp(`\\b(?:${pattern([...forms, ...related])})`, 'gi'),
    };
  });
}

let dataPromise;

/**
 * Loads and prepares both indexes once (normalized fields are cached on each row).
 * @returns {Promise<Array<Object>>} The searchable rows (pages first, then documents)
 */
export function loadSearchData() {
  if (!dataPromise) {
    dataPromise = Promise.all([
      fetchIndex().catch(() => []),
      fetchIndex(DOCUMENTS_SOURCE).catch(() => []),
    ]).then(([pages, documents]) => {
      const kept = pages.filter((r) => !EXCLUDE.test(r.path));
      const titles = new Map(kept.map((r) => [r.path, cleanTitle(r.title)]));
      // the nearest parent page below the section root, to tell same-named pages apart
      // ("Find a doctor" under Medical plans and under Aetna)
      const parentOf = (r) => {
        if (r.type === 'document') return r.pageTitle || '';
        const parts = r.path.split('/').filter(Boolean);
        for (let i = parts.length - 1; i > 1; i -= 1) {
          const t = titles.get(`/${parts.slice(0, i).join('/')}`);
          if (t) return t;
        }
        return '';
      };
      return [
        ...kept.map((r) => ({ ...r, type: 'page' })),
        ...documents.map((r) => ({ ...r, type: 'document' })),
      ].map((r) => ({ ...r, section: sectionOf(r), parentTitle: parentOf(r) }));
    }).then((rows) => rows.map((r) => {
      const title = cleanTitle(r.title) || r.path;
      return {
        ...r,
        title,
        n: {
          title: normalize(title),
          description: normalize(r.description),
          section: normalize(r.section),
          content: normalize(r.content),
          path: normalize(r.type === 'page' ? r.path : ''),
        },
      };
    }));
  }
  return dataPromise;
}

const count = (re, text, cap) => {
  if (!text) return 0;
  const m = text.match(new RegExp(re.source, 'gi'));
  return m ? Math.min(m.length, cap) : 0;
};

/**
 * Scores one term against one row.
 * @returns {number} 0 when the term matches nowhere
 */
function scoreTerm(term, n) {
  const fieldScore = (re) => {
    if (!re) return 0;
    let s = 0;
    if (re.test(n.title)) s += n.title.startsWith(term.word) ? 14 : 10;
    if (re.test(n.description)) s += 4;
    if (re.test(n.section)) s += 3;
    if (re.test(n.path)) s += 2;
    s += count(re, n.content, 5);
    return s;
  };
  const exact = fieldScore(term.exact);
  const related = Math.round(fieldScore(term.related) * 0.6);
  return Math.max(exact, related);
}

/**
 * Builds a ~170 character excerpt around the first match in the page text.
 * @param {Object} row The index row
 * @param {Array} terms The parsed terms
 * @returns {string} The excerpt, or the description when the text has no match
 */
export function snippet(row, terms, length = 170) {
  const text = (row.content || '').replace(/\s+/g, ' ');
  let first = -1;
  terms.forEach((t) => {
    const m = new RegExp(t.all.source, 'i').exec(text);
    if (m && (first < 0 || m.index < first)) first = m.index;
  });
  const description = row.description || '';
  const inDescription = terms.some((t) => new RegExp(t.all.source, 'i').test(description));
  if (first < 0 || (inDescription && description)) return description || text.slice(0, length);
  let start = Math.max(0, first - 60);
  if (start > 0) start = text.indexOf(' ', start) + 1;
  let end = Math.min(text.length, start + length);
  if (end < text.length) end = text.lastIndexOf(' ', end);
  return `${start > 0 ? '… ' : ''}${text.slice(start, end).trim()}${end < text.length ? ' …' : ''}`;
}

/**
 * Searches both indexes.
 * @param {string} query The query
 * @param {Object} [options]
 * @param {number} [options.limit] Maximum results (default: all)
 * @param {boolean} [options.documents] Include PDF documents (default: true)
 * @returns {Promise<{terms: Array, results: Array, partial: boolean, ignored: string[]}>}
 *   Ranked results. Words found nowhere on the site are left out and listed in `ignored`;
 *   `partial` is true when no row matched every remaining word and the results match some
 */
export async function search(query, { limit = Infinity, documents = true } = {}) {
  const parsed = parseQuery(query);
  if (!parsed.length) {
    return {
      terms: parsed, results: [], partial: false, ignored: [],
    };
  }
  const rows = (await loadSearchData()).filter((r) => documents || r.type === 'page');
  const terms = parsed.filter((t) => rows.some((r) => scoreTerm(t, r.n)));
  const ignored = parsed.filter((t) => !terms.includes(t)).map((t) => t.word);
  if (!terms.length) {
    return {
      terms: parsed, results: [], partial: false, ignored,
    };
  }
  const phrase = terms.length > 1 ? normalize(query) : '';

  const rank = (requireAll) => rows.map((row) => {
    let total = 0;
    let matched = 0;
    terms.forEach((t) => {
      const s = scoreTerm(t, row.n);
      if (s) matched += 1;
      total += s;
    });
    if (!matched || (requireAll && matched < terms.length)) return null;
    if (phrase) {
      if (row.n.title.includes(phrase)) total += 12;
      if (row.n.description.includes(phrase)) total += 6;
      if (row.n.content.includes(phrase)) total += 4;
    }
    total *= matched / terms.length;
    if (row.type === 'document') total *= 0.8; // pages first when equally relevant
    return { row, score: total };
  }).filter(Boolean).sort((a, b) => b.score - a.score);

  let results = rank(true);
  let partial = false;
  if (!results.length && terms.length > 1) {
    results = rank(false);
    partial = results.length > 0;
  }
  return {
    terms, results: results.slice(0, limit), partial, ignored,
  };
}

/**
 * Appends text to an element with the matched words wrapped in <mark>.
 * @param {Element} el The target element
 * @param {string} text The text
 * @param {Array} terms The parsed terms
 */
export function appendHighlighted(el, text, terms) {
  if (!terms.length || !text) {
    el.append(text || '');
    return;
  }
  // mark whole words ("health" marks all of "healthy")
  const re = new RegExp(`((?:${terms.map((t) => t.all.source).join('|')})[a-z0-9]*)`, 'gi');
  text.split(re).forEach((part, i) => {
    if (!part) return;
    if (i % 2) {
      const mark = document.createElement('mark');
      mark.textContent = part;
      el.append(mark);
    } else {
      el.append(part);
    }
  });
}

/**
 * The label shown above a result: its site section, and "PDF" for documents.
 * @param {Object} row The index row
 * @returns {string} e.g. "Benefits & coverage › Aetna" or "Health programs › Diabetes · PDF"
 */
export function resultLabel(row) {
  const where = [row.section, row.parentTitle].filter(Boolean).join(' › ');
  return [where, row.type === 'document' ? 'PDF' : ''].filter(Boolean).join(' · ');
}
