/**
 * Table: data tables (calorie charts, plan comparisons, FSA examples).
 * Styled after the MMCP plan table: navy header row, zebra rows, 16px rounded card.
 *
 * Authoring: one row per table row; the first row is the header row.
 * Variants: "no-header" (first row is data), "compact" (smaller cells).
 * Wide tables scroll sideways on small screens.
 * @param {Element} block The block
 */
export default function decorate(block) {
  const table = document.createElement('table');
  const head = document.createElement('thead');
  const body = document.createElement('tbody');
  const hasHeader = !block.classList.contains('no-header');

  [...block.children].forEach((row, i) => {
    const tr = document.createElement('tr');
    [...row.children].forEach((cell) => {
      const isHead = hasHeader && i === 0;
      const c = document.createElement(isHead ? 'th' : 'td');
      if (isHead) c.scope = 'col';
      // unwrap a single paragraph so cells keep a tight line height
      const only = cell.children.length === 1 && cell.firstElementChild.tagName === 'P' ? cell.firstElementChild : null;
      c.append(...(only ? only.childNodes : cell.childNodes));
      tr.append(c);
    });
    (hasHeader && i === 0 ? head : body).append(tr);
  });

  if (head.children.length) table.append(head);
  table.append(body);

  const scroller = document.createElement('div');
  scroller.className = 'table-scroll';
  scroller.tabIndex = 0;
  scroller.setAttribute('role', 'region');
  const caption = block.closest('.section')?.querySelector('h2, h3, h4');
  scroller.setAttribute('aria-label', caption ? caption.textContent.trim() : 'Table');
  scroller.append(table);
  block.replaceChildren(scroller);
}
