/**
 * Benefit cards: the "Additional Benefits" panels (Benefits & coverage design).
 * Variant "two-up" lays the cards out in two columns.
 *
 * Authoring, one row per card:
 *   cell 1: heading + subtitle
 *   cell 2: button link (e.g. **View details**)
 *   cell 3: body text (paragraphs, lists, icon links)
 *   cell 4: contact aside. Each partner logo starts a contact group (label, phone, hours).
 * Partner logos are authored at 2x and shown at half their pixel size.
 * @param {Element} block The block
 */

const PHONE = /^\+?1?[\s-]*\(?\d{3}\)?[\s.-]*\d{3}[\s.-]*\d{4}$/;

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

/**
 * Groups the aside into contact groups, each starting at a logo.
 * @param {Element} cell The aside cell
 * @returns {Element} The aside element
 */
function buildAside(cell) {
  const aside = document.createElement('div');
  aside.className = 'benefit-card-aside';
  let group = null;
  let details = null;
  const newGroup = () => {
    group = document.createElement('div');
    group.className = 'benefit-contact';
    details = document.createElement('div');
    details.className = 'benefit-contact-details';
    group.append(details);
    aside.append(group);
  };
  [...cell.children].forEach((el) => {
    const picture = el.matches('picture') ? el : el.querySelector('picture');
    if (picture && el.textContent.trim() === '') {
      newGroup();
      const logo = document.createElement('div');
      logo.className = 'benefit-contact-logo';
      logo.append(picture);
      group.prepend(logo);
      const img = picture.querySelector('img');
      if (img) sizeLogo(img);
      return;
    }
    if (!group) newGroup();
    const text = el.textContent.trim();
    if (PHONE.test(text)) {
      const a = document.createElement('a');
      a.href = `tel:${text.replace(/[^\d+]/g, '')}`;
      a.className = 'benefit-phone';
      a.textContent = text;
      el.replaceChildren(a);
      el.classList.add('benefit-phone-line');
    }
    details.append(el);
  });
  return aside;
}

/**
 * Styles the body: check lists, fact columns and icon links.
 * @param {Element} body The body element
 */
function decorateBody(body) {
  body.querySelectorAll(':scope > ul').forEach((ul) => {
    const items = [...ul.children];
    // lists that highlight values (bold text) are fact lists; items with line breaks become columns
    const facts = items.some((li) => li.querySelector('strong, b'));
    if (!facts) {
      ul.classList.add('benefit-checklist');
      return;
    }
    ul.classList.add('benefit-facts');
    if (items.length > 1 && items.every((li) => li.querySelector('br'))) ul.classList.add('benefit-facts-columns');
  });
  body.querySelectorAll(':scope > p').forEach((p) => {
    const first = p.firstElementChild;
    if (first && first.classList.contains('icon') && p.querySelector('a')) p.classList.add('benefit-icon-link');
  });
}

export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'benefit-cards-list';
  [...block.children].forEach((row) => {
    const [titleCell, actionCell, bodyCell, asideCell] = [...row.children];
    const li = document.createElement('li');
    li.className = 'benefit-card';

    const header = document.createElement('div');
    header.className = 'benefit-card-header';
    const title = document.createElement('div');
    title.className = 'benefit-card-title';
    if (titleCell) title.append(...titleCell.childNodes);
    const subtitle = title.querySelector('h2, h3, h4')?.nextElementSibling;
    if (subtitle && subtitle.tagName === 'P') subtitle.classList.add('benefit-card-subtitle');
    header.append(title);
    if (actionCell && actionCell.textContent.trim()) {
      const action = document.createElement('div');
      action.className = 'benefit-card-action';
      action.append(...actionCell.childNodes);
      header.append(action);
    }

    const main = document.createElement('div');
    main.className = 'benefit-card-main';
    if (bodyCell) {
      const body = document.createElement('div');
      body.className = 'benefit-card-body';
      body.append(...bodyCell.childNodes);
      decorateBody(body);
      main.append(body);
    }
    if (asideCell && asideCell.children.length) main.append(buildAside(asideCell));

    li.append(header, main);
    list.append(li);
  });
  block.replaceChildren(list);
}
