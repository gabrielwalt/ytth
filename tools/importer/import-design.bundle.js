/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-design.js
  var import_design_exports = {};
  __export(import_design_exports, {
    default: () => import_design_default
  });

  // tools/importer/parsers/design-block.js
  function parse(element, { document }) {
    const name = element.getAttribute("data-block");
    const cells = [[name]];
    [...element.children].forEach((row) => {
      const cols = [...row.children];
      if (cols.length === 0) {
        cells.push([row.innerHTML.trim() ? row : ""]);
        return;
      }
      cells.push(cols.map((col) => {
        const frag = document.createElement("div");
        frag.append(...col.childNodes);
        return frag;
      }));
    });
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }

  // tools/importer/import-design.js
  function transformIcons(main, document) {
    main.querySelectorAll("[data-icon]").forEach((el) => {
      el.replaceWith(document.createTextNode(`:${el.getAttribute("data-icon")}:`));
    });
  }
  function transformBlocks(main, document) {
    const blocks = [...main.querySelectorAll("[data-block]")].reverse();
    blocks.forEach((el) => parse(el, { document }));
  }
  function transformSections(main, document) {
    const sections = [...main.querySelectorAll(":scope > section")];
    sections.forEach((section, i) => {
      const style = [...section.classList].join(", ");
      if (style) {
        const meta = WebImporter.DOMUtils.createTable([
          ["Section Metadata"],
          ["Style", style]
        ], document);
        section.append(meta);
      }
      const frag = document.createDocumentFragment();
      if (i > 0) frag.append(document.createElement("hr"));
      frag.append(...section.childNodes);
      section.replaceWith(frag);
    });
  }
  function transformMetadata(main, document) {
    var _a, _b, _c, _d;
    const target = ((_a = document.querySelector('meta[name="target-path"]')) == null ? void 0 : _a.content) || "";
    if (/^\/(nav|footer)$/.test(target) || target.startsWith("/fragments/")) return;
    const meta = {};
    const title = (_b = document.querySelector("title")) == null ? void 0 : _b.textContent.trim();
    if (title) meta.Title = title;
    const desc = (_c = document.querySelector('meta[name="description"]')) == null ? void 0 : _c.content;
    if (desc) meta.Description = desc;
    const template = (_d = document.querySelector('meta[name="template"]')) == null ? void 0 : _d.content;
    if (template) meta.Template = template;
    if (Object.keys(meta).length) {
      main.append(WebImporter.Blocks.getMetadataBlock(document, meta));
    }
  }
  var import_design_default = {
    transform: ({ document, url }) => {
      var _a;
      const main = document.querySelector("main");
      const target = (_a = document.querySelector('meta[name="target-path"]')) == null ? void 0 : _a.content;
      if (!target) throw new Error(`design-source page has no target-path meta: ${url}`);
      transformIcons(main, document);
      transformBlocks(main, document);
      transformMetadata(main, document);
      transformSections(main, document);
      return [{
        element: main,
        path: target,
        report: { source: url }
      }];
    }
  };
  return __toCommonJS(import_design_exports);
})();
