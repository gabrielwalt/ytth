/**
 * Table: data tables (calorie charts, plan comparisons, FSA examples).
 * Styled after the MMCP plan table: navy header row, zebra rows, 16px rounded card.
 *
 * Authoring: one row per table row; the first row is the header row.
 * Variants: "no-header" (first row is data), "compact" (smaller cells).
 * A row with fewer cells than the widest row stretches its last cell over the remaining columns
 * (title and subheading rows). In a no-header table, a first row made of one such cell is shown
 * as the table's title row.
 * In a table with a header row, the first cell of each body row is its row header
 * (th scope="row"), so every value is announced with its row and column ("Dental, Monthly
 * contributions: $0"). Wide tables scroll sideways on small screens with the row headers kept
 * in view (sticky first column).
 * @param {Element} block The block
 */
export default function decorate(block) {
  const table = document.createElement('table');
  const head = document.createElement('thead');
  const body = document.createElement('tbody');
  const rows = [...block.children];
  const width = Math.max(1, ...rows.map((r) => r.children.length));
  const titleRow = rows[0]?.children.length === 1 && width > 1;
  const hasHeader = !block.classList.contains('no-header') || titleRow;

  rows.forEach((row, i) => {
    const tr = document.createElement('tr');
    const cells = [...row.children];
    if (cells.length === 1 && width > 1 && i > 0) tr.className = 'table-subheading';
    cells.forEach((cell, j) => {
      const isHead = hasHeader && i === 0;
      const isRowHead = !isHead && hasHeader && !titleRow && j === 0 && width > 1
        && cells.length > 1 && cell.textContent.trim() !== '';
      const c = document.createElement(isHead || isRowHead ? 'th' : 'td');
      if (isHead) c.scope = cells.length === 1 && width > 1 ? 'colgroup' : 'col';
      if (isRowHead) c.scope = 'row';
      if (j === cells.length - 1 && cells.length < width) c.colSpan = width - cells.length + 1;
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
  // the region is named after the closest heading before the table
  let caption = null;
  for (let n = block.closest('.table-wrapper') || block; n && !caption; n = n.previousElementSibling) {
    caption = n.matches('h2, h3, h4, h5, h6') ? n : [...n.querySelectorAll('h2, h3, h4, h5, h6')].pop();
  }
  scroller.setAttribute('aria-label', caption ? caption.textContent.trim() : 'Table');
  scroller.append(table);
  block.replaceChildren(scroller);
}
