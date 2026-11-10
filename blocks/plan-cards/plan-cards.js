/**
 * Plan cards: medical plan summaries (Benefits & coverage design).
 *
 * Authoring, one row per card:
 *   cell 1: eyebrow paragraph + heading (plan name)
 *   cell 2: summary label (may end with :info:), price paragraph (**$350** Individual ...),
 *           a list of details (each item: label + nested list of values), a button link.
 * Optional rows:
 *   one cell with plain text: caption shown above the cards (e.g. "3 available plans")
 *   "Tooltip" | content: popover text for every :info: icon in the block
 * @param {Element} block The block
 */

let tooltipCount = 0;

/**
 * Builds the info button + popover for an :info: icon.
 * @param {Element} icon The icon span
 * @param {Element} content The tooltip content
 */
function attachTooltip(icon, content) {
  tooltipCount += 1;
  const id = `plan-tooltip-${tooltipCount}`;
  const wrap = document.createElement('span');
  wrap.className = 'plan-tooltip';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'plan-tooltip-button';
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', id);
  const heading = content.querySelector('h1, h2, h3, h4, h5, h6, strong');
  button.setAttribute('aria-label', heading ? heading.textContent.trim() : 'More information');
  icon.replaceWith(wrap);
  button.append(icon);
  const pop = document.createElement('span');
  pop.className = 'plan-tooltip-popover';
  pop.id = id;
  pop.setAttribute('role', 'tooltip');
  pop.innerHTML = content.innerHTML;
  wrap.append(button, pop);

  const set = (open) => button.setAttribute('aria-expanded', open ? 'true' : 'false');
  button.addEventListener('click', () => set(button.getAttribute('aria-expanded') !== 'true'));
  wrap.addEventListener('mouseenter', () => set(true));
  wrap.addEventListener('mouseleave', () => set(false));
  button.addEventListener('blur', () => set(false));
  button.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
}

/**
 * Turns "**$350** Individual **$700** Family" into price groups.
 * @param {Element} p The price paragraph
 */
function decoratePrices(p) {
  p.classList.add('plan-prices');
  const groups = [];
  let current = null;
  [...p.childNodes].forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE && (node.tagName === 'STRONG' || node.tagName === 'B')) {
      current = document.createElement('span');
      current.className = 'plan-price';
      const amount = document.createElement('span');
      amount.className = 'plan-price-amount';
      amount.textContent = node.textContent.trim();
      current.append(amount);
      groups.push(current);
    } else if (current && node.textContent.trim()) {
      const unit = document.createElement('span');
      unit.className = 'plan-price-unit';
      unit.textContent = node.textContent.trim();
      current.append(unit);
    }
  });
  if (groups.length) p.replaceChildren(...groups);
}

/**
 * Turns the details list into label / value rows.
 * @param {Element} ul The details list
 */
function decorateDetails(ul) {
  const dl = document.createElement('dl');
  dl.className = 'plan-details';
  [...ul.children].forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    [...li.childNodes].forEach((n) => { if (n !== nested) dt.append(n); });
    if (nested) {
      [...nested.children].forEach((v) => {
        const line = document.createElement('span');
        line.append(...v.childNodes);
        dd.append(line);
      });
    }
    // documents may wrap item text in <p>
    dt.querySelectorAll('p').forEach((p) => p.replaceWith(...p.childNodes));
    // a trailing "(qualifier)" goes on its own line, as in the design
    const text = dt.textContent.trim();
    const match = text.match(/^(.*?)\s*(\([^)]*\))$/);
    if (match && dt.children.length === 0) {
      const qualifier = document.createElement('span');
      qualifier.className = 'plan-details-qualifier';
      const [, main, qual] = match;
      qualifier.textContent = qual;
      dt.replaceChildren(document.createTextNode(main), qualifier);
    }
    const row = document.createElement('div');
    row.append(dt, dd);
    dl.append(row);
  });
  ul.replaceWith(dl);
}

export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'plan-cards-list';
  let caption = null;
  let tooltip = null;

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const first = cells[0];
    if (cells.length >= 2 && first.textContent.trim().toLowerCase() === 'tooltip') {
      [tooltip] = [cells[1]];
      return;
    }
    if (cells.length === 1 && !first.querySelector('h1, h2, h3, h4, h5, h6')) {
      caption = document.createElement('p');
      caption.className = 'plan-cards-caption';
      caption.textContent = first.textContent.trim();
      return;
    }

    const li = document.createElement('li');
    li.className = 'plan-card';
    const header = document.createElement('div');
    header.className = 'plan-card-header';
    const body = document.createElement('div');
    body.className = 'plan-card-body';
    header.append(...first.childNodes);
    cells.slice(1).forEach((cell) => body.append(...cell.childNodes));

    const heading = header.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      const eyebrow = heading.previousElementSibling;
      if (eyebrow && eyebrow.tagName === 'P') eyebrow.classList.add('plan-card-eyebrow');
    }

    const paragraphs = [...body.querySelectorAll(':scope > p')];
    const priceP = paragraphs.find((p) => p.querySelector('strong, b') && /\$/.test(p.textContent) && !p.querySelector('a'));
    if (priceP) {
      decoratePrices(priceP);
      const label = priceP.previousElementSibling;
      if (label && label.tagName === 'P') label.classList.add('plan-summary-label');
    }
    body.querySelectorAll(':scope > ul').forEach(decorateDetails);
    const button = body.querySelector('a.button');
    if (button) button.closest('p').classList.add('plan-card-action');

    li.append(header, body);
    list.append(li);
  });

  if (tooltip) {
    list.querySelectorAll('.icon-info').forEach((icon) => attachTooltip(icon, tooltip));
  }

  block.replaceChildren(...(caption ? [caption, list] : [list]));
}
