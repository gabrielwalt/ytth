# Your Track to Health: block library

Every block below was measured against the design PDFs at 1440 and 425 px (see `PROJECT_DESIGN_SYSTEM.md`). Block JavaScript reads the rows and cells defensively: rows and cells an author leaves out are skipped.

**Authoring freedom:** title slots (card, teaser, quick-links, plan-card, benefit-card and plan-details titles, the hero heading) accept any heading level, H1–H6, with the same look. Lists, quotes, several paragraphs and up to three buttons are fine in any content slot. Any block can sit in any section style: dark and light surfaces switch the content colors automatically (`PROJECT_DESIGN_SYSTEM.md` → Color contexts). The test page `/drafts/author-combinations` puts every section style and the main blocks under unusual content; check it at 1440, 768 and 425 px after style changes.

Authoring notation:
- `| a | b |` is one row of the block table.
- `:name:` is an icon.
- `**link**` is a primary button, `_link_` a secondary button and `**_link_**` an accent button.

## Global

### Header (`/nav` fragment)
The header is a white bar floating over the page. On mobile it becomes a hamburger menu.

The `/nav` document has three sections:
1. **Brand:** `:logo: Your Track to Health`, linked to `/`. The link text becomes the accessible name, and only the logo shows.
2. **Sections:** a list of top-level links. A nested list turns its item into a dropdown. The panel shows an "X overview" arrow link and the child links; more than 5 children are shown in columns.
   - **Groups:** when a child item is plain text with its own nested list (`Benefits` → links), the panel shows labelled groups: a teal eyebrow label above each list. On desktop the groups sit side by side, one column each, under a divider; on mobile they stack inside the opened section. Plain links next to groups share an untitled group.
3. **Tools:**
   - a `Search` link (shown as an icon)
   - `Sign in • Register`, an accent button. The part after "•" is hidden on mobile.
   - `Contact & forms`, which is also repeated in the mobile menu

Escape, a click outside and moving focus away all close the menus.

**Search panel:** the search icon opens a panel under the header bar (full bar width, on every screen size): a search field with live suggestions and a Search button that goes to `/search?q=…`. Escape (or a second click) closes it and returns focus to the icon; opening a menu closes it. With a modifier key, or without JavaScript, the icon is a plain link to the search page; on the search page it focuses the page's field.

The full desktop bar appears from 1200 px; below that the header uses the hamburger menu.

### Footer (`/footer` fragment)
The `/footer` document has three sections:
1. The logo link plus the `Sign in` (primary) and `Register` (secondary) buttons.
2. Lists. A list of plain links forms the first column. A list item with a nested list is a group: a heading link plus its sub-links.
3. The legal links (external links open in a new tab) and the © and "Last updated" paragraphs.

Desktop: a five-column grid; the columns share the width in the design's proportions, never get narrower than their links, and the last one ends on the frame's right edge. Mobile: stacked rows with dividers.

## Page blocks

### Hero
| Variant | Page | Notes |
|---|---|---|
| `split` | Benefits & coverage | As in the PDF: from 900 px the photo fills the band (family shown large on the right) and a light wash, solid behind the text column, dissolves into it over ~600 px with an eased fade (anchored to the end of the text column, so the text stays on solid wash at every width). Smaller screens: the photo is a band at the top (behind the floating header) dissolving into the panel, and the text uses the full width under it (max 560 px). Optional `Focus | 40%` row |
| `navy` | Inner pages and plan pages (MMCP) | Navy band with eyebrow (or breadcrumbs) and H1, as tall as its content (no minimum height). Background: a faint teal glow at the top right and the tracks motif (`styles/images/bg-hex-tracks.svg`: three half-hexagons whose edges run on to the right), drawn right of the text and scaled to the band's height, so short and tall bands, phones and wide screens all show the whole figure. **With a photo** (a row holding only a picture, plus an optional `Focus | 40%` row, or `left` / `center` / `right`): same treatment as `split`. From 900 px the photo fills the band from about a third of its width (frame + 560 px, 35–50 vw) and dissolves into the navy over ~80% of its width with an eased fade; the text column may reach into its first 15%, where the navy is near solid; the band is at least 392 px tall. Smaller screens: a 260 px photo band at the top (behind the floating header) dissolving into the navy, the text full width under it. The title gets the full 860 px measure where there is no photo | 40%` row, or `left` / `center` / `right`, naming the part of the photo that must stay in view): text always stays on plain navy. From 900 px the photo fills the band's right part, starting after the text column (max 860 px) and fading into the navy; the band is at least 392 px tall. On smaller screens the photo is a 200 px band under the text, fading in from above. The title gets the full 860 px measure, so plan names stay on one line where they fit |
| `home` | Homepage | Full-bleed photo, display H1, text, button and search field |

Authoring:
- `| picture |`: a cell with only a picture is the photo.
- `| text |`, which holds:
  - an optional icon-only paragraph, which becomes the hexagon badge
  - an optional paragraph before the H1, which becomes the eyebrow
  - the H1, the text and a button
- **Search** (home variant): a paragraph that holds only a link to `/search` becomes a search form. The link text is the placeholder, and the form submits to `/search?q=…`.

The hero photo loads eagerly at high priority, because it is the largest image on the page.

### Quick links (`quick-links`)
The homepage navy band. Use it in a section styled `navy`.
- The row with a heading is the intro: `:hex-people:`, the heading, a text paragraph and an optional `_link_` button.
  - The button shows on mobile only; on desktop the header's sign-in does the same job.
- Every other row is a tile: an icon paragraph and a link paragraph, for example `| :ql-rx: Estimate drug costs (link) |`.

The intro heading links to the button's target (the member portal), so the action stays available on desktop where the button is hidden. Tiles that link to other sites open in a new tab.

Desktop: the intro on the left and four tiles of 180 × 94 on the right. Mobile: tiles in a 2 × 2 grid, then the intro centered below a divider.

### Cards
One row per card. A cell that holds only a picture is the image, and a cell (or leading paragraph) that holds only an icon is the card icon.

| Variant | Use |
|---|---|
| *(none)* | Plain grid |
| `resource` | Icon, title, text and a plain link (shown as an arrow link), three columns on a `light` section ("Additional plan resources"). On inner pages (template `content`/`article`) the same block shows **resource tiles**: white cards with a hairline border and leaf corners, hexagon icon, title and links, two columns next to the side menu (three without it, one on phones). Used by the hub pages (FSA, Aetna, Dental, Trustmark…) and the "where to go for care" page. Icon: a first paragraph holding only `:hex-…:` (see `PROJECT_DESIGN_SYSTEM.md` → Icons) |
| `outline` | White cards with a lavender border, leaf corners, hexagon icon, title, text and button; two columns ("Need to make updates", homepage) |
| `feature` | Homepage: card 1 is the photo card (image, H2, text, button) spanning two rows. Cards 2, 3… alternate navy and sand; each has a hexagon icon, H3, text and button, centered, all the same height |

### Teaser (`teaser`)
A full-bleed photo with a white card (H2, text, button) set over its bottom-left corner. It is the homepage open-enrollment promotion.

Authoring: `| picture | heading, text, button |`. A picture placed in the text cell also works.

### Plan cards (`plan-cards`)
Medical plan summaries on Benefits & coverage.
- One row per card, with two cells:
  - **Cell 1:** an eyebrow paragraph and the plan name heading.
  - **Cell 2:**
    - the summary label (can end with `:info:`)
    - the prices, for example `**$350** Individual`
    - a list of details (each item is a label with a nested list of values)
    - a button
- Optional rows:
  - a one-cell plain-text caption (for example "3 available plans")
  - `| Tooltip | content |`: the popover text for every `:info:` icon in the block

Desktop: three columns. A trailing "(…)" in a detail value moves to its own line.

### Benefit cards (`benefit-cards`)
The "Additional benefits" panels. One row per card, with four cells:

| Cell | Contents |
|---|---|
| 1 | Heading and subtitle |
| 2 | Button |
| 3 | Body: paragraphs, lists and icon links |
| 4 | Contact aside. Each partner logo (authored at 2x) starts a group: label, phone, hours |

How the body content is shown:
- A phone-number paragraph becomes a `tel:` link.
- A list without bold text becomes a checklist.
- A list with bold text becomes a list of facts. It splits into two columns when every item has a line break.

Variant `two-up`: two cards side by side, with the contact aside above the body.

### Plan details (`plan-details`)
The benefits table of a plan page (MMCP). The block reads each row's type from its shape:

| Row shape | Becomes |
|---|---|
| First row, one cell with an eyebrow and a heading | Navy card header |
| Two or more cells that each start with a heading | Summary stats (desktop only; the table repeats them) |
| One cell with plain text | Group bar (the first is teal, the rest navy) |
| First cell empty, the others text | Column headers (for example In-network / Out-of-network); used as value labels on mobile |
| First cell with a heading and values | Major row |
| First cell with a heading and no values | Subheading |
| Any other row | Item row, zebra striped |
| Item row without values (for example "Retail — 21-day supply") | A label row; on mobile it shows as a subheading |
| One cell with an ordered list | Footnotes |

On mobile, the rows stack: the label first, then each value with its column label.

**Info icons** (`:info:` next to Annual deductible, Coinsurance, Copays, Out-of-pocket) become tooltips. Each explains its term with the definition from the page's "Common terms" (the `columns (terms)` block). On a page without that block the icons stay decorative. The tooltip code is shared with `plan-cards` (`scripts/tooltip.js`; styles in `styles.css`). Hover, focus, click or tap opens it; a second click or Escape closes it.

### Columns
| Variant | Use |
|---|---|
| `intro` | Plan page intro: a lead paragraph on the left, "Available through" and the partner logos (2x, shown at half size) on the right, in a 300 px column |
| `terms` | Four definition columns ("Common terms") |

### Accordion
One row per item: `| question | answer |`. It is built from `details` and `summary` elements with plus and minus icons. The first item starts open; the `closed` variant starts every item closed.
- Every item gets an id from its label ("Medical benefit & claims" → `#medical-benefit-claims`). A link to `page#id` opens that item and scrolls to it (also on the same page). The old `ContactUs.aspx?Service=…` links point to these ids on `/contact-forms`.

## Inner-page and content blocks (Phase 3)

These blocks have no design in the PDFs; they are built from the design tokens. All of them appear on the test page `/drafts/phase3-blocks.html`.

### Page template
Set Metadata `Template: content` (inner pages) or `Template: article` (wellness articles and news). On those pages:
- default text keeps an 860 px measure; blocks (tables, documents, accordions, cards) fill the content column
- the navy hero title may run 860 px wide

The page header is `hero (navy)`:
- the section name as the eyebrow (for example "Health programs")
- the H1
- an optional intro sentence

### Section nav (`section-nav`) — the side menu of inner pages
Replaces the current site's left-hand menu, its breadcrumbs, the wellness "Resources for" list and the video library's "Jump to" links. The importer puts an empty `Section nav` block on every inner page; the block moves itself in front of the content.

**Source:** the `/fragments/section-nav` document, one section per site section, each a nested list (authored like the header nav). Generate the first version with `node migration-work/url-map/build-section-nav.cjs` and import it, then edit it in DA.

**What it shows:**
- the tree of the section the page belongs to, with the current branch open and the other branches collapsed (teal chevron toggles)
- the current page highlighted. A page that isn't listed (for example a health article) highlights its closest listed parent ("Health articles").
- the hero eyebrow (section name) becomes a link to the section's main page

**Layout:**
- **Desktop (1200 px and up):** a sticky 280 px column, an 80 px gap and the content column, together the 1320 px content frame. Text keeps its 860 px measure; blocks run to the frame's right edge.
- **Smaller screens:** a collapsible bar above the content ("In this section" + the current page, plus/minus icon). It opens into the same tree.

**Scrolling (desktop):** the sticky column scrolls on its own when the tree is taller than the window (`overscroll-behavior: contain`: the wheel never scrolls the page from the menu), and it starts scrolled so the current page is in view.

**Options:** a list of links in the block replaces the fragment. `Source | /other-fragment` reads another document. The block removes itself on pages outside every section (utility pages).

### Breadcrumbs and "On this page" (automatic, not authored)
- **Breadcrumbs** (`scripts/breadcrumbs.js`): Home › section › … › current page, built from the same `/fragments/section-nav` tree as the side menu (shared code: `scripts/site-tree.js`). They take the place of the section eyebrow in the navy page header; on MMCP/CHCB/HDHP (designed eyebrow "Medical plan details") they sit above it. Not on the homepage or section main pages. Phones show only the parent ("‹ Medical plans"). `nav aria-label="Breadcrumb"`, the current page `aria-current="page"`. Supersedes the earlier "no breadcrumbs" decision.
- **On this page** (`scripts/toc.js`), following the usual practice for tables of contents:
  - **Only on long pages:** at least 3 entries, and the content is more than 1.75 window heights long (rechecked on resize). A page of tiles such as FSA has none on desktop, where everything is in view, and a collapsed one on phones, where the tiles stack.
  - **Entries:** the h2 headings, including those inside blocks (plan tables, tiles, fragments) but not inside accordion items (hidden until opened); with fewer than 3 h2s, the h3s.
  - **Desktop (1200 px and up):** the top of the sticky side column, above the section tree, always open, with the tree's look (the same rows and dividers, the section in view marked like the current page). Both parts of the column carry the small-screen bars' titles, "On this page" and "In this section" (muted uppercase over a rule); the section's main page is the tree's first row (bold navy), on all screens. It doesn't push the content down and stays in view while reading.
  - **Single column:** a collapsed bar identical to "In this section" ("On this page" + "7 sections"); the two bars sit side by side from 600 px and stack on phones. A chosen link closes the bar.
- **Skip link:** "Skip to content" is the first focus stop of every page.

### Table (`table`)
One row per table row; the first row is the header.
- Variants: `no-header` and `compact`.
- In a table with a header row the first cell of each row is its row header (`th scope="row"`), so values are announced with their row and column.
- Tables with 4 or more columns scroll sideways on phones; the row headers stay in view (sticky first column). The scroll region is named after the closest heading before the table.

### Documents (`documents`)
| Cell | Contents |
|---|---|
| 1 | Link to the file (its text is the title) |
| 2 | Optional description |

A row holding only a heading starts a group. Each document shows a PDF icon and a file-type tag, and opens in a new tab.

### Videos (`videos`)
One row per video. Two columns on tablet and desktop, one on phones.

| Cell | Contents |
|---|---|
| 1 | Thumbnail picture (optional; the Brightcove poster, 16:9) |
| 2 | Video link (its text is the title), optional description paragraphs, optional link to the transcript PDF |
| 3 | Transcript text (optional): paragraphs, `<strong>` speaker labels, `<em>` scene descriptions, line breaks |

**Brightcove videos open in a dialog.** Use the player address as the video link: `https://players.brightcove.net/{account}/{player}_default/index.html?videoId={id}` (the Player Pages form `…/pages/v1/index.html?accountId=…&playerId=…&videoId=…`, which `bcove.video` share links redirect to, works too). `bcove.video` / `bcove.me` short links themselves can't be read, so they and other videos (YouTube, Vimeo) stay cards that open the video in a new tab (with their transcript PDF as a link on the card).
- **Card:** cover image with a play button ("Play video: {title}", `aria-haspopup="dialog"`), the title and the optional description. No other links.
- **Dialog** (one native `<dialog>` per page, built on first use): the title and a close button; the player (16:9, at most ~58% of the window height, so the transcript always has room); below it "Transcript" with a "Download PDF" link next to the heading, and the transcript text in a readable 68-character measure (speakers in navy, scene descriptions muted), scrolling on its own. Phones: the dialog fills the screen, the player stays on top while the transcript scrolls. It closes with its button, Escape or a click outside; closing removes the player (the video stops) and focus returns to the card. The page behind doesn't scroll.
- **Loading:** nothing is requested from Brightcove before a card is pressed; the player then starts playing (`autoplay=true`, the visitor asked for it).
- **Consent:** `scripts/consent-check.js` only announces a yes/no `consent.update` event. The block listens to it: with consent it warms up the connection to Brightcove when the pointer or focus reaches a card; without it nothing loads until the visitor presses play (an explicit choice to load the third-party player; it sends Brightcove analytics, `metrics.brightcove.com`, from then on). Swap in a "video" consent category here when a real CMP arrives.
- **Transcript:** cell 3 is kept out of the page (in a `<template>`) and shown in the dialog; the PDF link of cell 2 becomes the dialog's "Download PDF".
- **Anchors:** each title is an `h3` with an id from its text (`/video-library#health-flexible-spending-account`), for links from other pages.
- Captions come from the Brightcove player (every library video has an English caption track); the HTML transcript is an addition, not a replacement.

### Article list (`article-list`)
Rows `Folder | /news`, `Limit | 12`, and optionally `Source | …`. It lists the pages below the folder from the page index, newest first, with a "Show more" button.

### Search (`search`)
An empty block on `/search`. A list of links in the block becomes the "Popular pages" shown before searching and when nothing matches (default: the main sections and tools).

- **What it searches:** every page (title, description, section, path and page text) and every PDF linked from the pages (link text and the sentence around the link). Code: `scripts/search.js`.
- **Ranking:** all words must match (stop words like "how do I" are ignored); title matches weigh most, then description, section and text; plurals and a few everyday synonyms match too (doctor → physician/provider, rx → prescription, teeth → dental…, the `SYNONYMS` list). Words that appear nowhere on the site are dropped and named in the status line.
- **Results:** live while typing; a label (section › parent page, "PDF"), the title, an excerpt around the match with the words marked, and the address (for PDFs, the page that links them). Filters per section and for PDF documents, with counts; 20 at a time with "Show more results". `?q=` and `?filter=` stay in the address, so results can be shared.

**Search suggestions** (`scripts/search-suggest.js`, `styles/search-suggest.css`): the header panel, the homepage hero field and the 404 page show the 6 best matches while typing, plus "See all results". It is an ARIA combobox (↓/↑, Enter, Escape). The 404 page starts with the words of the missing address ("/benefits/dental-plan" → "dental plan").

### FSA calculator (`fsa-calculator`)
The same formula as the current site:
- suggested contribution = min(sum of expenses, maximum)
- savings = contribution × (federal + state + RRTA Tier 1 + Tier 2 + Medicare)

Optional rows:
- `Maximum contribution` (default 3500)
- `Tier 1 rate` (6.2%), `Tier 2 rate` (4.9%), `Medicare rate` (1.45%)
- `Expenses` (a list)
- `Note` (the disclaimer)

### Benefit lookup (`benefit-lookup`)
One row: `Data | <link to the lookup spreadsheet>`. The spreadsheet has three sheets:
- `railroads`: Code, Name
- `unions`: Railroad (or `*`), Union
- `options`: Railroad, Union, ZIP from, ZIP to, Administrator, Plan, Plan link, SBC title, SBC link

Members pick a railroad, then a union (filtered by railroad), and enter a ZIP code. The block lists the matching plan options with their SBC documents.

Optional row `Fallback | <link>`: while the spreadsheet is not published, the block shows a panel that sends members to that lookup (default: the current site's `BenefitLookup.aspx`, which keeps working) instead of an error. The current lookup's results depend on all three inputs (tested 2026-11-11: BNSF, machinists' union, ZIP 60601 → 4 program choices; ZIP 59001 → 8, incl. CHCB and Aetna, with a different SBC code), so the spreadsheet needs the ZIP ranges per network area from Railroad Enrollment Services.

### Contact directory
No new block:
- vendor contact panels use `benefit-cards` (logo, phone, hours)
- service topics use `accordion`

### Images in running text (all default content)
A picture inside a paragraph or list item that also has text (`scripts.js` → `decorateInlineImages`):
- **icon-size** (up to 48 × 48 px, e.g. "Tap the **Share** button [icon]"): stays in the line, at text height
- **larger** (the articles' side images): floats right of the text from 900 px (max 240 px wide), centered between the paragraphs on smaller screens; the next h2/h3 starts below it
The size comes from the width and height the delivery adds to each image, so nothing moves. A picture alone in its paragraph stays a full-width content image.

### Automatic link handling (all default content)
- Phone numbers become `tel:` links.
- Links to other sites and to PDFs open in a new tab, with a trailing icon and screen-reader text ("opens in a new tab", "PDF").

### 404 page
`404.html`: navy header, search field with suggestions (pre-filled with the words of the missing address), homepage link, and a "Go back" button when the visitor came from this site. Its inner box is a `<section>`, not a `<div>`, so the page decoration doesn't mistake it for a block.

### Site-wide link behaviour
- **Local preview:** the preview serves documents under `/content/`. Internal links and GET forms (the search fields) keep that prefix automatically (`keepPreviewPrefix` in `scripts/scripts.js`), so every call to action works in the preview. Nothing changes on the live site.
- **Page index:** search, the article lists and other index readers read `/query-index.json`. Until it is configured (Phase 7) they fall back to `/search-index.json`, which `migration-work/url-map/build-search-index.cjs` generates from the migrated content (with a `content` column holding each page's text). Search also reads `/search-documents.json` (the PDFs linked from the pages, generated by the same script).

### Fragment
The boilerplate fragment loader.
- When the page itself is served under `/content/` (the local preview), it loads `/content/<path>` first.
- If that fails, it tries the other location. This works on any host, so the header and footer appear in every preview.

## Which page uses which block

| Page | Blocks |
|---|---|
| Homepage `/index` | hero (home), quick-links, cards (feature), teaser, cards (outline) |
| Benefits & coverage | hero (split), plan-cards, benefit-cards, benefit-cards (two-up), cards (resource), cards (outline) |
| MMCP | hero (navy), columns (intro), plan-details, columns (terms), accordion |
| CHCB, HDHP | as MMCP |
| Inner content pages | hero (navy), default content, cards (resource), accordion, benefit-cards, table, documents, videos, section-nav |
| Articles and news | hero (navy), default content, table, section-nav; the archives use article-list |
| Site map | hero (navy), default content (nested lists, generated) |
| Tools | `/benefits-coverage/benefit-lookup` (benefit-lookup), `…/fsa/calculator` (fsa-calculator), `/search` (search) |

`widget` is a boilerplate block that no page uses.
