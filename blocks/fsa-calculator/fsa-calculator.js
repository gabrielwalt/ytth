/**
 * FSA calculator: estimates eligible out-of-pocket expenses, a suggested Health FSA
 * contribution and the tax savings. Same logic as the current site's FSAcalculator.aspx:
 *   suggested = min(sum of expenses, maximum contribution)
 *   savings   = suggested × (federal rate + state rate + RRTA Tier 1 + RRTA Tier 2 + Medicare)
 *
 * Authoring (key | value rows, all optional; defaults are the current site's values):
 * - Maximum contribution | 3500
 * - Tier 1 rate | 6.2%      - Tier 2 rate | 4.9%      - Medicare rate | 1.45%
 * - Expenses | a list of expense names (one per item)
 * - Note | text shown under the results (for example the disclaimer)
 * @param {Element} block The block
 */

const DEFAULT_EXPENSES = [
  'Deductibles',
  'Copayments',
  'Prescribed medications',
  'Physician/clinic/hospital treatments',
  'Behavioral health treatments',
  'Chiropractic/physical therapy/acupuncture',
  'Eye exams/eyeglasses/contact lenses & solutions',
  'Hearing exams/hearing aids & batteries',
  'Dental exams/dental & orthodontic work',
  'Other eligible expenses',
];
const FEDERAL = [10, 12, 22, 24, 32, 35, 37];
const STATE = Array.from({ length: 14 }, (_, i) => i);

const money = (n) => `$${Math.round(n).toLocaleString('en-US')}`;
const rate = (v, fallback) => {
  const n = Number.parseFloat(String(v || '').replace('%', ''));
  return Number.isFinite(n) ? n / 100 : fallback;
};

/**
 * Creates an element with a class and optional text.
 * @param {string} tag Tag name
 * @param {string} [className] Class name
 * @param {string} [text] Text content
 * @returns {HTMLElement} The element
 */
function el(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
}

export default function decorate(block) {
  const config = {};
  let expenses = DEFAULT_EXPENSES;
  let note = null;
  [...block.children].forEach((row) => {
    const [k, v] = [...row.children];
    if (!k || !v) return;
    const key = k.textContent.trim().toLowerCase();
    if (key === 'expenses' && v.querySelector('li')) {
      expenses = [...v.querySelectorAll('li')].map((li) => li.textContent.trim()).filter(Boolean);
    } else if (key === 'note') {
      note = v;
    } else {
      config[key] = v.textContent.trim();
    }
  });
  const max = Number.parseFloat((config['maximum contribution'] || '3500').replace(/[$,]/g, '')) || 3500;
  const tier1 = rate(config['tier 1 rate'], 0.062);
  const tier2 = rate(config['tier 2 rate'], 0.049);
  const medicare = rate(config['medicare rate'], 0.0145);

  const form = el('form', 'fsa-calculator-form');
  form.noValidate = true;

  // expenses
  const expField = el('fieldset', 'fsa-calculator-expenses');
  expField.append(el('legend', '', 'Your estimated eligible expenses for the plan year'));
  const inputs = expenses.map((name, i) => {
    const row = el('div', 'fsa-calculator-row');
    const id = `fsa-exp-${i}`;
    const label = el('label', '', name);
    label.htmlFor = id;
    const wrap = el('span', 'fsa-calculator-money');
    const input = el('input');
    input.id = id;
    input.type = 'text';
    input.inputMode = 'numeric';
    input.autocomplete = 'off';
    input.placeholder = '0';
    wrap.append(el('span', '', '$'), input);
    row.append(label, wrap);
    expField.append(row);
    return input;
  });

  // results
  const results = el('div', 'fsa-calculator-results');
  results.setAttribute('aria-live', 'polite');
  results.append(el('h3', 'fsa-calculator-results-title', 'Results'));
  const line = (labelText, extraClass) => {
    const r = el('div', `fsa-calculator-line${extraClass ? ` ${extraClass}` : ''}`);
    const label = el('span', 'fsa-calculator-label');
    if (labelText) label.append(labelText);
    const value = el('span', 'fsa-calculator-value', '$0');
    r.append(label, value);
    results.append(r);
    return { label, value };
  };
  const total = line('Total of estimated eligible expenses');
  const suggested = line('Suggested Health FSA annual contribution', 'is-key');
  results.append(el('p', 'fsa-calculator-max', `The current maximum amount you can contribute to an FSA is ${money(max)}.`));
  results.append(el('h4', 'fsa-calculator-subtitle', 'Estimated tax savings*'));

  const select = (id, values, suffix, initial) => {
    const s = el('select');
    s.id = id;
    values.forEach((v) => {
      const o = el('option', '', `${v}% ${suffix}`);
      o.value = v / 100;
      if (v === initial) o.selected = true;
      s.append(o);
    });
    return s;
  };
  const fed = select('fsa-fed', FEDERAL, 'in federal income tax', 10);
  fed.setAttribute('aria-label', 'Your federal income tax bracket');
  const fedLine = line(fed);
  const st = select('fsa-state', STATE, 'in state income tax', 0);
  st.setAttribute('aria-label', 'Your state income tax rate');
  const stLine = line(st);
  const pct = (r) => `${(r * 100).toLocaleString('en-US', { maximumFractionDigits: 2 })}%`;
  const t1Line = line(`${pct(tier1)} in Railroad Retirement Tier 1 tax`);
  const t2Line = line(`${pct(tier2)} in Railroad Retirement Tier 2 tax`);
  const medLine = line(`${pct(medicare)} in federal Medicare tax`);
  const saving = line('Total estimated tax savings for the year', 'is-total');
  if (note) {
    note.className = 'fsa-calculator-note';
    results.append(note);
  }

  const update = () => {
    const sum = inputs.reduce((acc, i) => {
      const n = Number.parseFloat(i.value.replace(/[$,\s]/g, ''));
      return acc + (Number.isFinite(n) && n > 0 ? n : 0);
    }, 0);
    const contribution = Math.min(sum, max);
    total.value.textContent = money(sum);
    suggested.value.textContent = money(contribution);
    const parts = [
      [fedLine, contribution * Number(fed.value)],
      [stLine, contribution * Number(st.value)],
      [t1Line, contribution * tier1],
      [t2Line, contribution * tier2],
      [medLine, contribution * medicare],
    ];
    parts.forEach(([l, v]) => { l.value.textContent = money(v); });
    // as on the current site, the total is the rounded sum of the unrounded parts
    saving.value.textContent = money(parts.reduce((a, [, v]) => a + v, 0));
  };
  inputs.forEach((i) => {
    i.addEventListener('input', () => {
      i.value = i.value.replace(/[^\d]/g, '');
      update();
    });
  });
  fed.addEventListener('change', update);
  st.addEventListener('change', update);
  form.addEventListener('submit', (e) => { e.preventDefault(); update(); });

  form.append(expField, results);
  block.replaceChildren(form);
  update();
}
