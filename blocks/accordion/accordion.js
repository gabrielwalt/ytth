/**
 * Accordion (FAQ): one row per item; cell 1 is the question, cell 2 the answer.
 * The first item starts open, as in the design. Add the "closed" variant to start all closed.
 * @param {Element} block The block
 */
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
    row.replaceWith(details);
  });
}
