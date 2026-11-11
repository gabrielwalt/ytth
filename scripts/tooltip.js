/**
 * Info tooltip (design: plan cards, "What is a deductible?"): an :info: icon becomes a button
 * that shows a small white popover above it on hover, focus or click. Styles: styles.css.
 * Used by the plan-cards and plan-details blocks.
 */

let tooltipCount = 0;

/**
 * Builds the info button + popover for an :info: icon.
 * @param {Element} icon The icon span
 * @param {Element} content The tooltip content (cloned)
 * @param {string} [label] Accessible name of the button (default: the content's heading)
 */
export default function attachTooltip(icon, content, label) {
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
  button.setAttribute('aria-label', label || (heading ? heading.textContent.trim() : 'More information'));
  icon.replaceWith(wrap);
  button.append(icon);
  const pop = document.createElement('span');
  pop.className = 'plan-tooltip-popover';
  pop.id = id;
  pop.setAttribute('role', 'tooltip');
  pop.append(...[...content.childNodes].map((n) => n.cloneNode(true)));
  wrap.append(button, pop);

  const set = (open) => button.setAttribute('aria-expanded', open ? 'true' : 'false');
  // a click right after the pointer opened it (hover, or a tap's emulated hover) keeps it open
  let openedByHover = false;
  button.addEventListener('click', () => {
    if (openedByHover) {
      openedByHover = false;
      set(true);
      return;
    }
    set(button.getAttribute('aria-expanded') !== 'true');
  });
  wrap.addEventListener('mouseenter', () => {
    openedByHover = button.getAttribute('aria-expanded') !== 'true';
    set(true);
  });
  wrap.addEventListener('mouseleave', () => {
    openedByHover = false;
    set(false);
  });
  button.addEventListener('blur', () => set(false));
  button.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
}
