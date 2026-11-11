/**
 * Documents: a list of downloadable files (forms, plan documents, flyers).
 *
 * Authoring: one row per document.
 * - cell 1: the link to the file; its text is the document title
 * - cell 2 (optional): a description (paragraphs or a list)
 * A row with a single heading cell starts a group (for example "Medical forms").
 * @param {Element} block The block
 */
export default function decorate(block) {
  const out = document.createDocumentFragment();
  let list = null;
  const newList = () => {
    list = document.createElement('ul');
    list.className = 'documents-list';
    out.append(list);
  };

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const heading = cells[0]?.querySelector('h2, h3, h4');
    if (heading && cells.length === 1 && !cells[0].querySelector('a')) {
      heading.classList.add('documents-group');
      out.append(heading);
      newList();
      return;
    }
    const link = cells[0]?.querySelector('a[href]');
    if (!link) return;
    if (!list) newList();

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.href;
    a.className = 'documents-link';
    const target = new URL(link.href, window.location.href);
    const file = target.searchParams.get('fileName') || target.pathname;
    const ext = (file.match(/\.([a-z0-9]+)$/i) || [])[1];
    const type = ext ? ext.toUpperCase() : 'LINK';
    if (ext || new URL(link.href, window.location.href).origin !== window.location.origin) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
    a.innerHTML = '<span class="documents-icon" aria-hidden="true"></span>';
    const title = document.createElement('span');
    title.className = 'documents-title';
    title.textContent = link.textContent.trim();
    const meta = document.createElement('span');
    meta.className = 'documents-type';
    meta.textContent = type;
    a.append(title, meta);
    const hint = document.createElement('span');
    hint.className = 'visually-hidden';
    hint.textContent = ext ? ` (${type}, opens in a new tab)` : ' (opens in a new tab)';
    if (a.target) a.append(hint);
    li.append(a);

    const desc = cells[1];
    if (desc && desc.textContent.trim()) {
      desc.className = 'documents-description';
      li.append(desc);
    }
    list.append(li);
  });

  block.replaceChildren(out);
}
