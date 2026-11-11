import {
  loadHeader,
  loadFooter,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  buildBlock,
  toClassName,
  toCamelCase,
} from './aem.js';

if (window.trustedTypes && window.trustedTypes.createPolicy) {
  const innerTT = window.trustedTypes.createPolicy('tt-inner', {
    createHTML: (s) => s, // avoid stack overflow
  });

  window.trustedTypes.createPolicy('default', {
    createHTML: (input, type, sink) => {
      let processedInput = input;
      if (/srcdoc\s*=/i.test(processedInput)) {
        const doc = new DOMParser().parseFromString(innerTT.createHTML(processedInput), 'text/html');
        doc.querySelectorAll('iframe[srcdoc]').forEach((el) => el.removeAttribute('srcdoc'));
        processedInput = doc.body.innerHTML;
      }
      if (sink.includes('createContextualFragment') || sink.includes('Document write')) {
        const doc = new DOMParser().parseFromString(innerTT.createHTML(processedInput), 'text/html');
        doc.querySelectorAll('script').forEach((el) => el.remove());
        processedInput = doc.body.innerHTML;
      }
      return processedInput;
    },
    createScriptURL: (input) => input,
    createScript: (input) => input,
  });
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Turns `/widgets/...` links into widget blocks.
 * @param {Element} main The container element
 */
function buildWidgetAutoBlocks(main) {
  const widgetLinks = [...main.querySelectorAll('a[href*="/widgets/"]')];
  widgetLinks.forEach((link) => {
    if (link.closest('.widget')) return;
    const newLink = link.cloneNode(true);
    const widgetBlock = buildBlock('widget', { elems: [newLink] });
    const p = link.closest('p');
    if (
      p
      && p.querySelectorAll('a').length === 1
      && p.querySelector('a') === link
      && p.textContent.trim() === link.textContent.trim()
    ) {
      p.replaceWith(widgetBlock);
    } else {
      link.replaceWith(widgetBlock);
    }
  });
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    // auto load `*/fragments/*` references
    const fragments = [...main.querySelectorAll('a[href*="/fragments/"]')].filter((f) => !f.closest('.fragment'));
    if (fragments.length > 0) {
      // eslint-disable-next-line import/no-cycle
      import('../blocks/fragment/fragment.js').then(({ loadFragment }) => {
        fragments.forEach(async (fragment) => {
          try {
            const { pathname } = new URL(fragment.href);
            const frag = await loadFragment(pathname);
            fragment.parentElement.replaceWith(...frag.children);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Fragment loading failed', error);
          }
        });
      });
    }
    buildWidgetAutoBlocks(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates formatted links to style them as buttons.
 * @param {HTMLElement} main The main container element
 */
function decorateButtons(main) {
  main.querySelectorAll('p a[href]').forEach((a) => {
    a.title = a.title || a.textContent;
    const p = a.closest('p');
    const text = a.textContent.trim();

    // quick structural checks
    if (a.querySelector('img') || p.textContent.trim() !== text) return;

    // skip URL display links
    try {
      if (new URL(a.href).href === new URL(text, window.location).href) return;
    } catch { /* continue */ }

    // require authored formatting for buttonization
    const strong = a.closest('strong');
    const em = a.closest('em');
    if (!strong && !em) return;

    p.className = 'button-wrapper';
    a.className = 'button';
    if (strong && em) { // high-impact call-to-action
      a.classList.add('accent');
      const outer = strong.contains(em) ? strong : em;
      outer.replaceWith(a);
    } else if (strong) {
      a.classList.add('primary');
      strong.replaceWith(a);
    } else {
      a.classList.add('secondary');
      em.replaceWith(a);
    }
  });
}

/**
 * Turns authored `:icon-name:` text into icon spans. Edge Delivery does this when it renders
 * a document; this covers content that reaches the page unconverted (e.g. local preview).
 * @param {Element} main The container element
 */
function decorateIconTokens(main) {
  const token = /(^|\s):([a-z][a-z0-9-]*):(?=\s|$)/g;
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    if (walker.currentNode.nodeValue.includes(':')) nodes.push(walker.currentNode);
  }
  nodes.forEach((node) => {
    const text = node.nodeValue;
    if (!token.test(text)) return;
    token.lastIndex = 0;
    const frag = document.createDocumentFragment();
    let last = 0;
    text.replace(token, (match, space, name, offset) => {
      frag.append(text.slice(last, offset) + space);
      const span = document.createElement('span');
      span.className = `icon icon-${name}`;
      frag.append(span);
      last = offset + match.length;
      return match;
    });
    frag.append(text.slice(last));
    node.replaceWith(frag);
  });
}

/**
 * Applies Section Metadata and page Metadata tables that reach the page unprocessed
 * (Edge Delivery turns them into section classes and head meta tags; the local preview
 * serves documents as authored).
 * @param {Element} main The main element
 */
function applyUnprocessedMetadata(main) {
  const readTable = (block) => [...block.children].map((row) => {
    const [key, value] = [...row.children];
    return [key?.textContent.trim().toLowerCase() || '', value];
  });
  main.querySelectorAll(':scope > div > div.section-metadata').forEach((block) => {
    const section = block.parentElement;
    readTable(block).forEach(([key, value]) => {
      const text = value?.textContent.trim() || '';
      if (key === 'style') {
        text.split(',').map((s) => toClassName(s.trim())).filter(Boolean)
          .forEach((cls) => section.classList.add(cls));
      } else if (key) {
        section.dataset[toCamelCase(key)] = text;
      }
    });
    block.remove();
  });
  main.querySelectorAll(':scope > div > div.metadata').forEach((block) => {
    readTable(block).forEach(([key, value]) => {
      const text = value?.textContent.trim() || '';
      if (!key || !text) return;
      if (key === 'title') document.title = text;
      if (key === 'template' || key === 'theme') {
        text.split(',').map((t) => toClassName(t.trim())).filter(Boolean)
          .forEach((cls) => document.body.classList.add(cls));
      }
      const name = toClassName(key);
      if (!document.head.querySelector(`meta[name="${name}"]`)) {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = text;
        document.head.append(meta);
      }
    });
    const section = block.parentElement;
    block.remove();
    if (!section.children.length) section.remove();
  });
}

/**
 * Whether a URL opens a PDF: a .pdf path, or the old server's PDF viewer (?fileName=….pdf).
 * @param {URL|string} u The URL
 * @returns {boolean} True for PDF links
 */
export function isPdfUrl(u) {
  try {
    const url = new URL(u, window.location.href);
    return /\.pdf$/i.test(url.pathname) || /\.pdf$/i.test(url.searchParams.get('fileName') || '');
  } catch {
    return false;
  }
}

const PHONE_PATTERN = /(?:\b1-)?(?:\(\d{3}\)\s?|\b\d{3}[-.])\d{3}[-.]\d{4}\b/g;

/**
 * Turns phone numbers in running text into tel: links.
 * @param {Element} root The container to scan
 */
export function linkPhoneNumbers(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement.closest('a, button, script, style, h1, h2, h3, h4, h5, h6')
      ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  const nodes = [];
  while (walker.nextNode()) {
    PHONE_PATTERN.lastIndex = 0;
    if (PHONE_PATTERN.test(walker.currentNode.nodeValue)) nodes.push(walker.currentNode);
  }
  nodes.forEach((node) => {
    const text = node.nodeValue;
    const frag = document.createDocumentFragment();
    let last = 0;
    PHONE_PATTERN.lastIndex = 0;
    text.replace(PHONE_PATTERN, (match, offset) => {
      frag.append(text.slice(last, offset));
      const a = document.createElement('a');
      a.href = `tel:+1${match.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '')}`;
      a.className = 'link-phone';
      a.textContent = match;
      frag.append(a);
      last = offset + match.length;
      return match;
    });
    frag.append(text.slice(last));
    node.replaceWith(frag);
  });
}

/**
 * Marks links that leave the site or open a PDF: new tab, an icon, and hidden text for
 * screen readers.
 * @param {Element} root The container to scan
 */
export function decorateLinkTypes(root) {
  root.querySelectorAll('a[href]').forEach((a) => {
    let url;
    try {
      url = new URL(a.href, window.location.href);
    } catch {
      return;
    }
    if (!/^https?:$/.test(url.protocol)) return;
    const pdf = isPdfUrl(url);
    const external = url.origin !== window.location.origin;
    if (!pdf && !external) return;
    a.target = '_blank';
    a.rel = 'noopener';
    // buttons, image links and bold (emphasized) links keep their designed look: no icon
    if (a.classList.contains('button') || a.querySelector('img, picture, .icon') || a.closest('header, footer, strong')) return;
    a.classList.add(pdf ? 'link-pdf' : 'link-external');
    const hint = document.createElement('span');
    hint.className = 'visually-hidden';
    hint.textContent = pdf ? ' (PDF, opens in a new tab)' : ' (opens in a new tab)';
    a.append(hint);
  });
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  applyUnprocessedMetadata(main);
  decorateIconTokens(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
  decorateButtons(main);
  // page content only: header and footer fragments are decorated detached and style their own links
  if (main.isConnected) {
    main.querySelectorAll('.default-content-wrapper').forEach((wrapper) => {
      linkPhoneNumbers(wrapper);
      decorateLinkTypes(wrapper);
    });
  }
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  loadHeader(doc.querySelector('body > header'));

  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadFooter(doc.querySelector('body > footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  import('./consent-check.js');
  // load anything that can be postponed to the latest here
}

/**
 * The local preview serves documents under /content/ while the content links to site paths
 * (/benefits-coverage). Keeps visitors inside the preview by adding the prefix to internal
 * links and GET forms. Does nothing on the live site.
 */
function keepPreviewPrefix() {
  if (!window.location.pathname.startsWith('/content/')) return;
  const codePaths = /^\/(content|icons|styles|scripts|blocks|fonts|media|drafts|tools|migration-work)\//;
  const fix = (url) => {
    if (url.origin !== window.location.origin || codePaths.test(url.pathname)) return false;
    if (/\.[a-z0-9]+$/i.test(url.pathname)) return false; // files (json, pdf, …)
    url.pathname = `/content${url.pathname === '/' ? '/index' : url.pathname}`;
    return true;
  };
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const url = new URL(a.href, window.location.href);
    if (fix(url)) {
      e.preventDefault();
      window.location.assign(url.href);
    }
  });
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (e.defaultPrevented || (form.method || 'get').toLowerCase() !== 'get' || !form.getAttribute('action')) return;
    const url = new URL(form.getAttribute('action'), window.location.href);
    if (fix(url)) {
      e.preventDefault();
      url.search = new URLSearchParams(new FormData(form)).toString();
      window.location.assign(url.href);
    }
  });
}

async function loadPage() {
  keepPreviewPrefix();
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
