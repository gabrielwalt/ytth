/* global WebImporter */
/* eslint-disable no-console */

/**
 * Import script for the "design" template.
 *
 * Source: the design-source pages in migration-work/design-source/, which are semantic
 * transcriptions of the redesign PDFs. See migration-work/design-source/README.md for the
 * markup conventions.
 */
import designBlockParser from './parsers/design-block.js';

/**
 * Replaces <span data-icon="x"> with the authored :x: icon notation.
 * @param {Element} main The main element
 * @param {Document} document The document
 */
function transformIcons(main, document) {
  main.querySelectorAll('[data-icon]').forEach((el) => {
    el.replaceWith(document.createTextNode(`:${el.getAttribute('data-icon')}:`));
  });
}

/**
 * Converts every data-block element into a block table, innermost first.
 * @param {Element} main The main element
 * @param {Document} document The document
 */
function transformBlocks(main, document) {
  const blocks = [...main.querySelectorAll('[data-block]')].reverse();
  blocks.forEach((el) => designBlockParser(el, { document }));
}

/**
 * Turns <section> elements into EDS sections: a section break between them, and a
 * Section Metadata block when the section has a class.
 * @param {Element} main The main element
 * @param {Document} document The document
 */
function transformSections(main, document) {
  const sections = [...main.querySelectorAll(':scope > section')];
  sections.forEach((section, i) => {
    const style = [...section.classList].join(', ');
    if (style) {
      const meta = WebImporter.DOMUtils.createTable([
        ['Section Metadata'],
        ['Style', style],
      ], document);
      section.append(meta);
    }
    const frag = document.createDocumentFragment();
    if (i > 0) frag.append(document.createElement('hr'));
    frag.append(...section.childNodes);
    section.replaceWith(frag);
  });
}

/**
 * Appends the page Metadata block from the source <head>.
 * @param {Element} main The main element
 * @param {Document} document The document
 */
function transformMetadata(main, document) {
  const target = document.querySelector('meta[name="target-path"]')?.content || '';
  // fragments (nav, footer) carry no page metadata
  if (/^\/(nav|footer)$/.test(target) || target.startsWith('/fragments/')) return;
  const meta = {};
  const title = document.querySelector('title')?.textContent.trim();
  if (title) meta.Title = title;
  const desc = document.querySelector('meta[name="description"]')?.content;
  if (desc) meta.Description = desc;
  const template = document.querySelector('meta[name="template"]')?.content;
  if (template) meta.Template = template;
  if (Object.keys(meta).length) {
    main.append(WebImporter.Blocks.getMetadataBlock(document, meta));
  }
}

export default {
  transform: ({ document, url }) => {
    const main = document.querySelector('main');
    const target = document.querySelector('meta[name="target-path"]')?.content;
    if (!target) throw new Error(`design-source page has no target-path meta: ${url}`);

    transformIcons(main, document);
    transformBlocks(main, document);
    transformMetadata(main, document);
    transformSections(main, document);

    return [{
      element: main,
      path: target,
      report: { source: url },
    }];
  },
};
