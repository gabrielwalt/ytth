import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Cards block. Variants follow the redesign: resource (icon cards on grey), outline
 * (lavender border), and the homepage feature/navy/sand cards.
 *
 * Authoring: one row per card; a cell may hold an image or an icon, the other cell the text.
 * @param {Element} block The block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      const onlyPicture = div.children.length === 1 && div.querySelector('picture') && !div.textContent.trim();
      const onlyIcon = div.querySelector('.icon') && !div.textContent.trim() && !div.querySelector('picture');
      if (onlyPicture) div.className = 'cards-card-image';
      else if (onlyIcon) div.className = 'cards-card-icon';
      else div.className = 'cards-card-body';
    });
    // an icon paragraph at the top of the body becomes the card icon
    const body = li.querySelector('.cards-card-body');
    if (body && !li.querySelector('.cards-card-icon')) {
      const first = body.firstElementChild;
      if (first && first.tagName === 'P' && first.querySelector('.icon') && !first.textContent.trim()) {
        const icon = document.createElement('div');
        icon.className = 'cards-card-icon';
        icon.append(...first.childNodes);
        first.remove();
        li.insertBefore(icon, body);
      }
    }
    // a plain link closing a resource card is an arrow link
    if (body && block.classList.contains('resource')) {
      const last = body.lastElementChild;
      const link = last?.querySelector('a:only-child');
      if (link && last.textContent.trim() === link.textContent.trim() && !link.classList.contains('button')) {
        link.classList.add('link-arrow');
      }
    }
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(ul);
}
