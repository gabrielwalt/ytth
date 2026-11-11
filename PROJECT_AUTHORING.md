# Your Track to Health: authoring and the block library

How authors build pages in da.live (Experience Workspace, document authoring) with the block library, and how the library is set up. The same guide for authors is the document `content/library/guide.plain.html` (`/library/guide` in DA). Block contracts are in `PROJECT_BLOCKS.md`, section styles and tokens in `PROJECT_DESIGN_SYSTEM.md`.

## For authors

### Open the library
1. Open a page of `gabrielwalt/ytth` in da.live.
2. Put the cursor in an empty paragraph where the new content goes.
3. Click **Library** in the editor toolbar. Tabs: **Blocks**, **Templates**, **Icons**.

### Insert, edit, preview
- **Blocks:** open a block, read an example's info (i) text (purpose, rows and cells, required vs optional, which variant when, icons, accessibility), click the example to insert it, replace the sample text. Sample pictures are grey placeholders: always replace them and write alt text.
- A block is a table: the first row is the block name, a variant in brackets changes the look (`Cards (resource)`), every further row is one item. Rows and cells can be added or left out.
- **Templates:** create the document in the right folder, insert a template, replace every `[bracketed]` text.
- **Icons:** inserts the icon name between colons (`:hex-wallet:`); `decorateIconTokens` (`scripts/scripts.js`) shows the icon.
- **Sections:** `---` starts a section; a *Section styles* item at the end of a section adds the Section metadata `Style` row.
- **Preview** in da.live → `https://main--ytth--gabrielwalt.aem.page/<path>`; check a phone-sized window; **Publish**. Fragments and the section menu are separate documents: publish them after editing.

### Author-insertable blocks

| Library entry | Examples (library-metadata names) | Use |
|---|---|---|
| Page header (hero) | Page header (navy, inner pages); Page header with photo (split, designed pages); Homepage hero (full-bleed photo with search) | First section of every page. Navy for all inner pages, articles, plan pages; `split` (Benefits & coverage) and `home` (homepage) are designed-page variants |
| Section menu (section nav) | Section menu (empty block, end of inner pages) | Empty block, last block of every inner page |
| Accordion (FAQ) | FAQ accordion (first answer open); FAQ accordion (all closed) | FAQs and contact directories; `#item-label` deep links open one item |
| Cards and resource tiles | Cards: photo grid; Resource tiles with hexagon icons; Outline cards (call to action); Feature cards (homepage) | Hub pages use `resource`; `outline` for 2/4 CTAs; `feature` homepage only |
| Columns | Columns: side by side; Plan intro with partner logos; Common terms (definitions) | `intro` and `terms` are plan-page variants (terms: prefer the fragment) |
| Documents (forms and PDFs) | Document list (forms and PDFs) | Form and PDF lists, heading rows group them |
| Table | Table with header row (plan comparison); Table without header row (label and value); Compact table (long charts) | Data tables |
| Videos (Brightcove) | Videos with transcripts (Brightcove) | Click-to-load Brightcove player, transcript disclosure, PDF transcript |
| Shared content (fragment) | Fragment: Plan common terms; …Health coach phone numbers; …Article disclaimer (annual physical); …Program confidentiality notice; …FSA tax disclaimer | Text shared word for word by several pages |
| Section styles (section metadata) | light; navy; sand; hexagons on a shaded wash; centred call to action (light, center, padding-l); readable text with small heading; narrow | Inserted with a sample heading/text via `library-container-start/-end` |
| Page metadata | Page metadata (title, description, template) | One per page, at the end; `Template: content` or `article` |
| Plan details table | Plan details table (plan pages) | Shortened CHCB table showing every row shape |
| Plan cards | Plan cards (medical plan summaries) | MMCP / CHCB / HDHP summaries with tooltip row |
| Benefit contact panels | Benefit contact panels (full width); Benefit contact panels (two per row) | Partner logo, phone, hours |
| Quick links band | Quick links band (homepage, navy) | Inserted together with its `navy` Section metadata (container) |
| Teaser | Teaser (photo with promo card) | One campaign per page |
| Article list | Article list (news and health articles) | `Folder` / `Limit` rows |
| Site search | Site search (search page only) | Already on `/search` |
| FSA calculator | Health FSA calculator | Already on the calculator page; settings rows |
| Benefit lookup | Medical benefit & SBC lookup | Already on the lookup page; `Data` / `Fallback` rows |

**Templates:** Content page (navy hero, default content, section nav, Style `narrow`, `Template: content`); Hub page (navy hero, `cards (resource)` with hexagon icons, section nav, `narrow`, `Template: content`); Article page (navy hero "Health programs", article text, the annual-physical disclaimer fragment, section nav, `narrow`, `Template: article`); Plan page (as MMCP/CHCB/HDHP: navy hero "Medical plan details", `columns (intro)` + `plan-details` in `narrow, inset`, then "How the plan works" with the plan-common-terms fragment and an FAQ accordion in `light, narrow, inset, padding-s`; like the live plan pages it has no section nav and no Template row).

### Shared content (fragments)
Editing a fragment document changes every page that uses it (after the fragment is published). Never paste a copy. Consumers are in `tools/importer/fragments-report.json` (written by `tools/importer/apply-fragments.cjs`):

| Fragment | Used on |
|---|---|
| `/fragments/plan-common-terms` | MMCP, CHCB, HDHP, How the plans work (also feeds the plan-table info tooltips) |
| `/fragments/health-coach-contacts` | 4 health articles (Are you as active…, Nutrition labels, Portion distortion, Stretch and strengthen) |
| `/fragments/article-disclaimer-annual-physical` | 4 health articles (Cross-training, Exercise when time is short, Flu vaccines, Portion distortion) |
| `/fragments/program-confidentiality` | Diagnosed with cancer, Managing a health condition, Healthy habits, Quitting nicotine |
| `/fragments/fsa-tax-disclaimer` | 3 FSA articles |

Note: a plain link to a `/fragments/…` path in default content is also turned into the fragment (`buildAutoBlocks`), so do not link to fragment documents in running text.

### Automatic page chrome: never insert
| Part | Where it comes from | Edited in |
|---|---|---|
| Header | `/nav` document (`blocks/header`) | `/nav` |
| Footer | `/footer` document (`blocks/footer`) | `/footer` |
| Breadcrumbs | `scripts/breadcrumbs.js`, from the section-menu tree | `/fragments/section-nav` |
| "On this page" | `scripts/toc.js`, from the page's H2s (H3s when fewer than 3 H2s) | the page headings |
| Section menu tree | `blocks/section-nav` reads `/fragments/section-nav` | `/fragments/section-nav` (the block on the page stays empty) |
| Link and phone handling | `scripts/scripts.js` (`tel:` links, new-tab icon and screen-reader text for external and PDF links) | nothing to do |

### Icons
`content/library/icons.json` lists 59 icons: every `icons/hex-*.svg` (hexagon icons for tiles and cards, plus the two badges `hex-badge-id-card`, `hex-people`), the quick-link tiles (`ql-*`), the inline icons `rx`, `headset`, `heart`, `question`, `user-navy` and the tooltip `info`. Excluded as plumbing: `logo`, `logo-white`, `menu`, `search`, `search-teal`, `send`, `user`, `user-circle`, `external`, `file-pdf`, `plus-circle`, `minus-circle`, `check-circle`. Icon `key` is `:name:` (this project's syntax; the aem.live doc shows `::name::`, which `decorateIconTokens` would not match).

### Accessibility checklist (also in every description)
One H1 (page header), headings in order; descriptive link and button text; alt text on every picture (company name for logos, empty for decorative); tables with a real header row and a heading above; videos with Brightcove captions and a transcript; phone numbers as `1-800-000-0000`.

### Excluded blocks
- `header`, `footer`: page chrome (above).
- `widget`: boilerplate; the repo has no `/widgets` folder and no page uses it (`PROJECT_BLOCKS.md`). Nothing to insert.
- `fragment` is offered only through the five shared fragments.

## Library setup (admins)

### Files
| Repo file | DA document |
|---|---|
| `content/library/blocks/<block>.plain.html` (20 docs) | `library/blocks/<block>` |
| `content/library/blocks/images/placeholder-16x9.png`, `placeholder-4x3.png` | `library/blocks/images/…` |
| `content/library/templates/{content-page,hub-page,article-page,plan-page}.plain.html` | `library/templates/<name>` |
| `content/library/blocks.json`, `templates.json`, `icons.json` (DA sheet JSON) | sheets `library/blocks`, `library/templates`, `library/icons` |
| `content/library/guide.plain.html` | `library/guide` |

Format: block docs follow the excat convention (`block-library-sample.md`): one section per example, each with exactly one block and one `library-metadata` (`name`, `description`); visual variants are block classes (`cards resource` = `Cards (resource)`). Quick links and section styles wrap their content in `library-container-start` / `library-container-end`.

Generators and checks (scratch, `migration-work/library/`): `build-sheets.cjs` (sheets + config rows), `validate-samples.mjs` (excat validator against a scratch root with drafted `metadata.json` variant lists, since `blocks/*/metadata.json` do not exist), `verify.cjs` (Playwright: page errors, block status, empty blocks, overflow at 390/1440, screenshots in `shots/`), `build-da-upload.cjs` (DA-ready copies + `upload-commands.sh`).

### Site config: `library` tab (to add in the DA config of gabrielwalt/ytth; not applied)
| title | path | format | ref | icon | experience |
|---|---|---|---|---|---|
| Blocks | https://content.da.live/gabrielwalt/ytth/library/blocks.json | | | | |
| Templates | https://content.da.live/gabrielwalt/ytth/library/templates.json | | | | |
| Icons | https://content.da.live/gabrielwalt/ytth/library/icons.json | | | | |

Same rows as JSON: `migration-work/library/da-config-library.json`.

Sheet rows: blocks `name` + `path` `https://content.da.live/gabrielwalt/ytth/library/blocks/<block>`; templates `key` + `value` `https://content.da.live/gabrielwalt/ytth/library/templates/<name>`; icons `key` `:name:`, `value` label, `icon` `https://main--ytth--gabrielwalt.aem.page/icons/<name>.svg` (the SVGs are code in `/icons`, served from the code bus; the DA-media alternative would be `https://content.da.live/gabrielwalt/ytth/icons/<name>.svg` if they were ever uploaded to DA).

### Upload steps
1. Commit and push `icons/` to `main` (38 of the 59 icon SVGs are not on `main` yet, so their sheet URLs 404 until then).
2. `node migration-work/library/build-sheets.cjs` and `node migration-work/library/build-da-upload.cjs` (wraps every document in the DA `<body><header></header><main>…</main><footer></footer></body>` shell and rewrites the placeholder pictures to `https://content.da.live/gabrielwalt/ytth/library/blocks/images/…`).
3. Upload `migration-work/library/da-upload/library/**` to DA under `/library` (drag and drop in da.live, or `cd migration-work/library && DA_TOKEN=… sh upload-commands.sh`, DA Admin API `PUT /source/gabrielwalt/ytth/library/…`). Check that the three `.json` files open as sheets in DA (otherwise create the sheets in DA and paste the rows).
4. Preview the library documents and sheets.
5. Add the three rows above to the `library` tab of the site config.
6. Open any page in da.live → Library: check Blocks, Templates, Icons and the info texts.
7. Make sure the five fragment documents exist in DA (`/fragments/…`), otherwise the Fragment examples and the article and plan templates show nothing.

### Verification (2026-11-11, local preview `http://localhost:3000/content/library/…`)
- All 20 block docs, 4 templates and the guide: no page errors, every block `data-block-status="loaded"` and not empty, no horizontal overflow at 390 and 1440 px.
- Expected exceptions: `section-nav` removes itself (the library path is in no site section; checked on `/benefits-coverage/savings-spending-accounts/fsa` instead: menu, breadcrumbs, "On this page" render); `metadata` and `section-metadata` are consumed into page metadata and section classes (section classes checked in the screenshot); fragments 404 because `content/fragments/` holds only `section-nav` so far; `article-list` gets 404 for `/query-index.json` (falls back to `search-index.json`); `benefit-lookup` shows its fallback panel (the data sheet is not published).
- excat validator: 15 PASS. Deliberate deviations: `hero` (no default section: authors should never use an unstyled hero), `fragment` (5 default sections, one per shared fragment), `section-nav` (the block is empty by design), `quick-links` and `section-metadata` (container markers + Section metadata, required for the navy band and for the style examples).
- Not verifiable here: inserting from the DA library UI (needs the upload and the config rows).

### Open items
- `styles/styles.css`: `main > .section.readable .default-content-wrapper { margin-inline: 0 }` pins the text to the viewport's left edge when `readable` is used without `center`: at 1440 px the text starts at 40 px instead of the 60 px content frame. No current page uses `readable` without `center`.
- `blocks/*/metadata.json` (variant lists) do not exist; the excat validator expects them. Drafts: `migration-work/library/validate/blocks/*/metadata.json`.
- The 5 fragment documents must be imported into `content/fragments/` (plan task "Reusable fragments").
