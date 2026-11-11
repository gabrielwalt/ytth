/**
 * Benefit lookup: "Medical benefit and Summary of Benefits & Coverage (SBC) lookup".
 * Members pick their railroad and union and enter a ZIP code; the block lists their medical
 * benefit options and SBC documents. Replaces the server form BenefitLookup.aspx.
 *
 * Authoring: one row "Data | <link to the lookup spreadsheet>" (a DA sheet published as JSON).
 * The spreadsheet has three sheets:
 * - railroads: Code, Name
 * - unions:    Railroad (code, or * for all), Union
 * - options:   Railroad (code or *), Union (name or *), ZIP from, ZIP to (blank = all ZIPs),
 *              Administrator, Plan, Plan link, SBC title, SBC link
 * @param {Element} block The block
 */

/**
 * Reads one sheet of a (multi-)sheet JSON.
 * @param {Object} json The spreadsheet JSON
 * @param {string} name The sheet name
 * @returns {Array<Object>} The rows, with lower-case keys
 */
function sheet(json, name) {
  const data = json[':names'] ? json[name]?.data : (json.data || []).filter((r) => (r.Sheet || r.sheet) === name);
  return (data || []).map((r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k.trim().toLowerCase(), String(v ?? '').trim()])));
}

const el = (tag, className, text) => {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
};

/**
 * Builds a labelled form field.
 * @param {string} id The control id
 * @param {string} labelText The label
 * @param {HTMLElement} control The control
 * @returns {HTMLElement} The field
 */
function field(id, labelText, control) {
  const f = el('div', 'benefit-lookup-field');
  const label = el('label', '', labelText);
  label.htmlFor = id;
  control.id = id;
  control.required = true;
  f.append(label, control);
  return f;
}

export default async function decorate(block) {
  const link = block.querySelector('a[href]');
  const source = link ? link.getAttribute('href') : block.textContent.replace(/^\s*data\s*/i, '').trim();
  block.replaceChildren();

  let json = {};
  try {
    const resp = await fetch(source);
    if (resp.ok) json = await resp.json();
  } catch {
    json = {};
  }
  const railroads = sheet(json, 'railroads').sort((a, b) => a.name.localeCompare(b.name));
  const unions = sheet(json, 'unions');
  const options = sheet(json, 'options');
  if (!railroads.length) {
    block.append(el('p', 'benefit-lookup-error', 'The benefit lookup is not available right now. Please call Member Services or try again later.'));
    return;
  }

  const form = el('form', 'benefit-lookup-form');
  form.noValidate = true;
  const rr = el('select');
  rr.append(new Option('Select your railroad', ''));
  railroads.forEach((r) => rr.append(new Option(r.name, r.code)));
  const un = el('select');
  const zip = el('input');
  zip.type = 'text';
  zip.inputMode = 'numeric';
  zip.maxLength = 5;
  zip.autocomplete = 'postal-code';
  zip.pattern = '\\d{5}';

  const fillUnions = () => {
    un.replaceChildren(new Option('Select your union', ''));
    const names = [...new Set(unions
      .filter((u) => u.railroad === rr.value || u.railroad === '*')
      .map((u) => u.union))].sort();
    names.forEach((n) => un.append(new Option(n, n)));
    un.disabled = !rr.value;
  };
  rr.addEventListener('change', fillUnions);
  fillUnions();

  const submit = el('button', 'button primary', 'Show my options');
  submit.type = 'submit';
  const error = el('p', 'benefit-lookup-message');
  error.setAttribute('role', 'alert');
  form.append(
    field('lookup-railroad', 'Railroad', rr),
    field('lookup-union', 'Union', un),
    field('lookup-zip', 'ZIP code', zip),
    submit,
  );
  const results = el('div', 'benefit-lookup-results');
  results.setAttribute('aria-live', 'polite');
  block.append(el('p', 'benefit-lookup-required', 'All fields are required.'), form, error, results);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    error.textContent = '';
    results.replaceChildren();
    const missing = [];
    if (!rr.value) missing.push('your railroad');
    if (!un.value) missing.push('your union');
    if (!/^\d{5}$/.test(zip.value.trim())) missing.push('a 5-digit ZIP code');
    if (missing.length) {
      error.textContent = `Please select or enter ${missing.join(', ')}.`;
      return;
    }
    const z = Number(zip.value.trim());
    const hits = options.filter((o) => (o.railroad === rr.value || o.railroad === '*')
      && (o.union === un.value || o.union === '*')
      && (!o['zip from'] || z >= Number(o['zip from']))
      && (!o['zip to'] || z <= Number(o['zip to'])));
    if (!hits.length) {
      results.append(el('p', 'benefit-lookup-none', 'We couldn’t find benefit options for this combination. Please contact Railroad Enrollment Services for help.'));
      return;
    }
    const heading = el('h2', 'benefit-lookup-title', 'Your medical benefit options');
    const list = el('ul', 'benefit-lookup-list');
    hits.forEach((o) => {
      const li = el('li');
      if (o.administrator) li.append(el('p', 'benefit-lookup-admin eyebrow', o.administrator));
      const h = el('h3');
      if (o['plan link']) {
        const a = el('a', '', o.plan);
        a.href = o['plan link'];
        h.append(a);
      } else {
        h.textContent = o.plan;
      }
      li.append(h);
      if (o['sbc link']) {
        const a = el('a', 'link-pdf', o['sbc title'] || 'Summary of Benefits & Coverage (SBC)');
        a.href = o['sbc link'];
        a.target = '_blank';
        a.rel = 'noopener';
        const p = el('p', 'benefit-lookup-sbc');
        p.append(a);
        li.append(p);
      }
      list.append(li);
    });
    results.append(heading, list);
    heading.tabIndex = -1;
    heading.focus();
  });
}
