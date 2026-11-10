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
      return;
    }

    const link = row.querySelector('a');
    if (!link) return;
    const icon = row.querySelector('.icon');
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'quick-links-tile';
    a.href = link.href;
    if (link.target) a.target = link.target;
    if (icon) a.append(icon);
    const label = document.createElement('span');
    label.className = 'quick-links-label';
    label.textContent = link.textContent.trim();
    a.append(label);
    li.append(a);
    list.append(li);
  });

  block.replaceChildren(...(intro.hasChildNodes() ? [intro, list] : [list]));
}
