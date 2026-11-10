# Your Track to Health: content and import

Page content is generated into `content/<path>.plain.html` by import scripts. The local preview renders from there. Don't hand-write whole pages in `content/`. Small fixes can be edited in a `.plain.html` file directly, but the next import run overwrites them, so carry them into the source as well.

## 1. Pages from the designs (done)

The pages whose content comes from the PDFs are first written down as semantic HTML in `migration-work/design-source/`. Each file is a transcription of a PDF page, using the PDF's copy and the block structure from `PROJECT_BLOCKS.md`.

| Source | Document path |
|---|---|
| `nav.html` | `/nav` |
| `footer.html` | `/footer` |
| `home.html` | `/index` |
| `benefits-coverage.html` | `/benefits-coverage` |
| `mmcp.html` | `/benefits-coverage/medical-plans/mmcp` |

Source conventions:
- `<meta name="target-path">` sets the document path. `<title>` and `<meta name="description">` become the page Metadata (except on nav and footer).
- Each `<section>` becomes a section. Its `class` becomes the Section Metadata "Style", for example `class="hexagons shaded medium"`.
- `<div data-block="Name (variant)">` becomes a block table. Its child `div`s are rows, and their child `div`s are cells.
- Write icons as `:name:` text. A link that holds only an icon is dropped on import, so give it visible text (the header and footer turn that text into the accessible name).
- When a table cell mixes text with `<sup>`, wrap the cell in `<p>`. Otherwise the import splits it.
- Images point at `/migration-work/assets/…`:
  - `photos/`: hero and card photos
  - `partners/2x/`: partner logos at twice their display size

The importer:
- `tools/importer/import-design.js` handles icons, block tables, metadata and section breaks. It uses `parsers/design-block.js`.
- It is bundled into `import-design.bundle.js` with the content-import skill's `aem-import-bundle.sh`.
- It runs with the skill's `run-bulk-import.js --import-script tools/importer/import-design.bundle.js --urls tools/importer/urls-design-<page>.txt --force`.
- The URL lists:
  - `urls-design.txt`: nav, footer and home
  - `urls-design-benefits.txt`
  - `urls-design-mmcp.txt`
  - `urls-design-home.txt`
- Reports go to `tools/importer/reports/`.

## 2. Pages from the current site (step 3, next)

- The inventory of the current site is `migration-work/site-inventory.json`. It lists 178 pages with their old URL, title, structure, components and PDF links. The old site's pages are identified by `MenuId`.
- The plan:
  1. Group the pages into templates.
  2. Map each template's components to the blocks in `PROJECT_BLOCKS.md` (icon card grids → `cards (resource)`, Q&A → `accordion`, and so on).
  3. Write a parser and transformers per template.
  4. Import every page into the new information architecture (nav paths such as `/benefits-coverage/dental`).
- Leave out the old site's banners with baked-in text, its sidebar navigation and its breadcrumbs. The new design replaces them.

## Assets

- **Homepage photos** come from the current site, never from the homepage PDF raster:
  - `home-hero-worker.jpg`: `images/linkimg1.jpg`, 599 px
  - `home-open-enrollment.jpg`: `images/linkimg2.jpg`, 599 px
  - `home-retiring.jpg`: cropped from the Retirement banner, 962 × 700
  - The two 599 px photos need high-resolution replacements.
- **Benefits & coverage hero:** `benefits-hero-family.jpg`.
- **Partner logos:** in `partners/` (originals) and `partners/2x/`.
- Every image must be uploaded to DA media before the pages go to DA.

## Local preview, DA, preview and live

- The local preview serves documents under `/content/<path>`. It doesn't convert Section Metadata, Metadata or `:icon:` text; `scripts/scripts.js` does that in the browser so the preview matches the live pipeline.
- The site's content source is the DA location in the site configuration (`https://content.da.live/gabrielwalt/ytth/`).
- Uploads to DA, previews and publishes happen only on an explicit request. Before uploading a page, make sure `content/<path>.plain.html` holds exactly what is being uploaded.
