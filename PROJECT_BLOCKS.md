# Your Track to Health: block library

Every block below was measured against the design PDFs at 1440 and 425 px (see `PROJECT_DESIGN_SYSTEM.md`). Block JavaScript reads the rows and cells defensively: rows and cells an author leaves out are skipped.

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
3. **Tools:**
   - a `Search` link (shown as an icon)
   - `Sign in • Register`, an accent button. The part after "•" is hidden on mobile.
   - `Contact & forms`, which is also repeated in the mobile menu

Escape, a click outside and moving focus away all close the menus.

### Footer (`/footer` fragment)
The `/footer` document has three sections:
1. The logo link plus the `Sign in` (primary) and `Register` (secondary) buttons.
2. Lists. A list of plain links forms the first column. A list item with a nested list is a group: a heading link plus its sub-links.
3. The legal links (external links open in a new tab) and the © and "Last updated" paragraphs.

Desktop: a five-column grid. Mobile: stacked rows with dividers.

## Page blocks

### Hero
| Variant | Page | Notes |
|---|---|---|
| `split` | Benefits & coverage | A light panel with the photo on the right 40 % (cropped as in the design). On mobile the photo is a faded background |
| `navy` | Plan pages (MMCP) | Navy background with track lines, eyebrow and H1 |
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

Desktop: the intro on the left and four tiles of 180 × 94 on the right. Mobile: tiles in a 2 × 2 grid, then the intro centered below a divider.

### Cards
One row per card. A cell that holds only a picture is the image, and a cell (or leading paragraph) that holds only an icon is the card icon.

| Variant | Use |
|---|---|
| *(none)* | Plain grid |
| `resource` | Icon, title, text and a plain link (shown as an arrow link), three columns on a `light` section ("Additional plan resources") |
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

### Columns
| Variant | Use |
|---|---|
| `intro` | Plan page intro: a lead paragraph on the left, "Available through" and the partner logos (2x, shown at half size) on the right, in a 300 px column |
| `terms` | Four definition columns ("Common terms") |

### Accordion
One row per item: `| question | answer |`. It is built from `details` and `summary` elements with plus and minus icons. The first item starts open; the `closed` variant starts every item closed.

### Fragment
The boilerplate fragment loader. On localhost it falls back to `/content/…` paths, to match how the local preview serves documents.

## Which page uses which block

| Page | Blocks |
|---|---|
| Homepage `/index` | hero (home), quick-links, cards (feature), teaser, cards (outline) |
| Benefits & coverage | hero (split), plan-cards, benefit-cards, benefit-cards (two-up), cards (resource), cards (outline) |
| MMCP | hero (navy), columns (intro), plan-details, columns (terms), accordion |
