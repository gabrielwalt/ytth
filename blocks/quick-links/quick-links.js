/**
 * Quick links: the homepage navy band with "Manage your benefits" and icon link tiles.
 *
 * Authoring (one row per item):
 * - a row with a heading is the intro: an icon paragraph (badge), the heading, a text
 *   paragraph and an optional button link (shown on mobile only, like the design)
 * - every other row is a tile: an icon and a link
 * @param {Element} block The block
 */
export default function decorate(block) {
  const intro = document.createElement('div');
  intro.className = 'quick-links-intro';
  const list = document.createElement('ul');
  list.className = 'quick-links-list';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const heading = row.querySelector('h1, h2, h3, h4, h5, h6');

    if (heading && !intro.hasChildNodes()) {
      const text = document.createElement('div');
      text.className = 'quick-links-text';
      cells.forEach((cell) => {
        [...cell.children].forEach((el) => {
          if (el.tagName === 'P' && el.querySelector('.icon') && !el.textContent.trim()) {
            el.className = 'quick-links-badge';
            intro.prepend(el);
          } else if (el.tagName === 'P' && el.querySelector('a')
            && el.textContent.trim() === el.querySelector('a').textContent.trim()) {
            // a paragraph holding only a link is the call to action
            const cta = el.querySelector('a');
            cta.classList.add('button');
            if (!cta.matches('.primary, .accent')) cta.classList.add('secondary');
            el.className = 'button-wrapper quick-links-cta';
            el.replaceChildren(cta);
            intro.append(el);
          } else {
            text.append(el);
          }
        });
      });
      intro.insertBefore(text, intro.querySelector('.quick-links-cta'));
      // the heading leads where the button leads (the button only shows on small screens)
      const cta = intro.querySelector('.quick-links-cta a');
      if (cta && !heading.querySelector('a')) {
        const link = document.createElement('a');
        link.href = cta.href;
        link.className = 'quick-links-heading-link';
        link.append(...heading.childNodes);
        heading.append(link);
      }
      return;
    }

    const link = row.querySelector('a');
    if (!link) return;
    const icon = row.querySelector('.icon');
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'quick-links-tile';
    a.href = link.href;
    const external = new URL(link.href, window.location.href).origin !== window.location.origin;
    if (external) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
    if (icon) a.append(icon);
    const label = document.createElement('span');
    label.className = 'quick-links-label';
    label.textContent = link.textContent.trim();
    a.append(label);
    if (external) {
      const hint = document.createElement('span');
      hint.className = 'visually-hidden';
      hint.textContent = ' (opens in a new tab)';
      a.append(hint);
    }
    li.append(a);
    list.append(li);
  });

  block.replaceChildren(...(intro.hasChildNodes() ? [intro, list] : [list]));
}
