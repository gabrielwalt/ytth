/**
 * Teaser: a full-bleed photo with an overlapping white text card (homepage
 * "open enrollment" promotion).
 *
 * Authoring: one row; a cell with the picture, a cell with heading, text and a button.
 * @param {Element} block The block
 */
export default function decorate(block) {
  const media = document.createElement('div');
  media.className = 'teaser-media';
  const card = document.createElement('div');
  card.className = 'teaser-card';

  [...block.querySelectorAll(':scope > div > div')].forEach((cell) => {
    const pictures = cell.querySelectorAll('picture');
    if (pictures.length && !cell.textContent.trim()) {
      media.append(...pictures);
    } else {
      card.append(...cell.childNodes);
    }
  });

  // a picture authored inside the text cell still belongs to the background
  if (!media.hasChildNodes()) {
    const pic = card.querySelector('picture');
    if (pic) {
      const p = pic.closest('p');
      media.append(pic);
      if (p && !p.textContent.trim()) p.remove();
    }
  }

  const container = document.createElement('div');
  container.className = 'teaser-container';
  container.append(card);
  block.replaceChildren(media, container);
}
