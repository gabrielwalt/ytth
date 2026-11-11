/**
 * Accordion (FAQ): one row per item; cell 1 is the question, cell 2 the answer.
 * The first item starts open, as in the design. Add the "closed" variant to start all closed.
 *
 * Every item gets an id from its label ("Medical benefit & claims" -> #medical-benefit-claims),
 * so other pages can link straight to one item: the item opens and scrolls into view
 * (also when the hash changes on the same page).
 * @param {Element} block The block
 */
const slug = (text) => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

function openFromHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return;
  const target = document.getElementById(id);
  const details = target?.closest('details.accordion-item');
  if (!details) return;
  details.open = true;
  details.querySelector('summary')?.focus({ preventScroll: true });
  details.scrollIntoView({ block: 'start' });
}

let listening = false;

export default function decorate(block) {
  const openFirst = !block.classList.contains('closed');
  [...block.children].forEach((row, i) => {
    const [question, answer] = [...row.children];
    const details = document.createElement('details');
    details.className = 'accordion-item';
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    const label = document.createElement('span');
    // keep authored inline formatting but drop block wrappers
    const source = question.querySelector('p, h2, h3, h4, h5, h6') || question;
    label.append(...source.childNodes);
    summary.append(label);
    const body = document.createElement('div');
    body.className = 'accordion-item-body';
    if (answer) body.append(...answer.childNodes);
    details.append(summary, body);
    if (openFirst && i === 0) details.open = true;
    const base = slug(label.textContent);
    if (base) {
      let id = base;
      for (let n = 2; document.getElementById(id); n += 1) id = `${base}-${n}`;
      details.id = id;
    }
    row.replaceWith(details);
  });
  openFromHash();
  if (!listening) {
    listening = true;
    window.addEventListener('hashchange', openFromHash);
  }
}
