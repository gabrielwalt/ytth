/**
 * Hero block.
 * Variants: split (text left, photo right), navy (text on navy with track lines),
 * home (full-bleed photo; see the homepage design).
 *
 * Authoring: one row may hold only a picture (the photo). The other row holds the text.
 * In the text row, a paragraph that holds only an icon becomes the hexagon badge, and a
 * paragraph before the h1 becomes the eyebrow.
 * @param {Element} block The hero block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const content = document.createElement('div');
  content.className = 'hero-content';
  const inner = document.createElement('div');
  inner.className = 'hero-text';
  content.append(inner);
  let media = null;

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      const onlyPicture = cell.querySelector('picture') && cell.textContent.trim() === '';
      if (onlyPicture && !media) {
        media = document.createElement('div');
        media.className = 'hero-media';
        media.append(...cell.querySelectorAll('picture'));
      } else {
        inner.append(...cell.childNodes);
      }
    });
  });

  // badge: a paragraph holding only an icon
  inner.querySelectorAll(':scope > p').forEach((p) => {
    if (p.querySelector('.icon') && p.textContent.trim() === '') p.classList.add('hero-badge');
  });

  // eyebrow: a paragraph directly before the heading
  const heading = inner.querySelector('h1, h2');
  if (heading) {
    const prev = heading.previousElementSibling;
    if (prev && prev.tagName === 'P' && !prev.classList.contains('hero-badge')) {
      prev.classList.add('hero-eyebrow');
    }
  }

  // search: a paragraph holding only a link to /search becomes a search field,
  // the link text is the placeholder
  inner.querySelectorAll(':scope > p').forEach((p) => {
    const a = p.querySelector('a');
    if (!a || p.textContent.trim() !== a.textContent.trim()) return;
    const url = new URL(a.href, window.location.href);
    if (!/\/search\/?$/.test(url.pathname)) return;
    const form = document.createElement('form');
    form.className = 'hero-search';
    form.setAttribute('role', 'search');
    form.action = url.pathname;
    form.method = 'get';
    const label = a.textContent.trim();
    form.innerHTML = `<img class="hero-search-icon" src="${window.hlx.codeBasePath}/icons/search-teal.svg" alt="" width="24" height="24">
      <input type="search" name="q" autocomplete="off">
      <button type="submit"><img src="${window.hlx.codeBasePath}/icons/send.svg" alt="" width="18" height="18"></button>`;
    const input = form.querySelector('input');
    input.placeholder = label;
    input.setAttribute('aria-label', label);
    form.querySelector('button').setAttribute('aria-label', 'Search');
    p.remove();
    content.append(form);
  });

  // the hero photo is the LCP candidate
  if (media) {
    const img = media.querySelector('img');
    if (img) {
      img.loading = 'eager';
      img.fetchPriority = 'high';
    }
  }

  block.replaceChildren(...(media ? [media, content] : [content]));
}
