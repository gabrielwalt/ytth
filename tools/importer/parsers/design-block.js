/* global WebImporter */

/**
 * Parser for design-source blocks.
 * Source markup: <div data-block="name (variant)"> whose child divs are rows and whose
 * grandchild divs are cells. It becomes a standard EDS block table.
 * @param {Element} element The data-block element
 * @param {{document: Document}} context Import context
 */
export default function parse(element, { document }) {
  const name = element.getAttribute('data-block');
  const cells = [[name]];
  [...element.children].forEach((row) => {
    const cols = [...row.children];
    if (cols.length === 0) {
      cells.push([row.innerHTML.trim() ? row : '']);
      return;
    }
    cells.push(cols.map((col) => {
      // keep the cell's children (empty cells stay empty)
      const frag = document.createElement('div');
      frag.append(...col.childNodes);
      return frag;
    }));
  });
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
