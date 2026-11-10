/**
 * Shows a 2x logo at half its pixel size.
 * @param {HTMLImageElement} img The logo image
 */
function sizeLogo(img) {
  const apply = () => {
    if (img.naturalWidth) img.style.width = `${img.naturalWidth / 2}px`;
  };
  if (img.complete) apply();
  else img.addEventListener('load', apply, { once: true });
}

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  // intro: a paragraph of images is a row of 2x partner logos
  if (block.classList.contains('intro')) {
    block.querySelectorAll('p').forEach((p) => {
      if (p.querySelector('picture') && !p.textContent.trim()) {
        p.classList.add('columns-logos');
        p.querySelectorAll('img').forEach(sizeLogo);
      }
    });
  }
}
