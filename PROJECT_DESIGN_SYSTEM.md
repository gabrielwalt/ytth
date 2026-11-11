# Your Track to Health: design system

All values live as CSS custom properties in `styles/styles.css` (with fonts in `styles/fonts.css`), and every block uses them. The static style guide at `/drafts/style-guide.html` shows them rendered.

Sizes are mobile first. The desktop values apply from `900px`. They were measured from the 425 px and 1440 px artboards of the design PDFs (see `PROJECT_OVERVIEW.md`).

## How the values were measured

- **`YTTH_Benefits_Coverage.pdf`** (vector). Values were read from the drawing operators: colors, box geometry, corner radii, text sizes and baselines. The fonts are embedded as Type3 glyphs. Roboto was identified by matching glyph advance widths (within 0.1–0.5 %).
  - p1: Benefits & coverage, desktop
  - p2: Benefits & coverage, mobile
  - p3: MMCP, desktop
  - p4: MMCP, mobile
- **`YTTH-Homepage.pdf`** (flat raster, 1x). Values were sampled from the pixels and are about ±1 px exact. The colors carry JPEG noise; `#1c355d` is `--color-navy`.
- Raw extractions are in `migration-work/design-extract/`:
  - `*-lines.json`: text lines with size, weight, color and baseline
  - `*-boxes.json`: boxes with size, color and per-corner radius
  - `*-styles.txt`: text styles grouped
- Page renders are checked against the PDFs at 1440 and 425 px. Chrome's text renders 0.2–0.5 % narrower than Figma's.

## Color

| Token | Value | Use |
|---|---|---|
| `--color-navy` | `#1c355e` | Headings, header sign-in, footer, navy hero, plan card headers, quick-links band, navy cards |
| `--color-teal` | `#007e80` | Primary buttons, links |
| `--color-teal-light` | `#1e8f90` | Nav chevrons, teal table group bar, primary buttons on navy |
| `--color-mint` | `#c5e0da` | Eyebrows on navy |
| `--color-indigo` | `#4752ae` | Hexagon icon outlines, arrow links |
| `--color-indigo-dark` | `#293682` | Small inline icons |
| `--color-lavender` | `#9da1c3` | Outline card border, hexagon outline on navy |
| `--color-lime` | `#a4c02f` | "Manage your benefits" badge, badge gradient |
| `--color-sand` | `#e5e2d9` | Sand card, `sand` section |
| `--color-text` | `#414042` | Body text |
| `--color-text-muted` | `#6c6c6c` | Subtitles, placeholders |
| `--color-text-subtle` | `#979795` | Table helper text |
| `--color-border` | `#cbcac6` | Card and table borders |
| `--color-border-on-navy` | `#8ea4cd` | Quick-link tile borders and divider |
| `--color-divider` | `#e8e7e3` | Hairlines inside cards |
| `--color-surface-2` | `#eeeeed` | Benefit card header, zebra rows, search button |
| `--color-surface-1` | `#f7f7f7` | `light` section |
| `--gradient-badge` | lime → teal-light, 135° | Hexagon badge |

## Breakpoints

- **Base (mobile):** follows the 425 px artboards. Verified at 375, 425 and 768 px.
- **`900px`:** the desktop type scale, desktop gutters and section spacing, and the desktop layout of most blocks.
- **`1200px`:** the full desktop **header** (inline menu, search, sign-in and contact) and the full desktop **footer** grid. The homepage **quick-links** band switches to its desktop row here too. Below 1200 px these use their mobile layouts, because the desktop versions need about 1250 px of width.
  - The quick-links band has its own tablet layout from 768 to 1199 px: four tiles in one row, with the intro below.
- Every page is checked for horizontal overflow at 1440, 1280, 1024, 768, 425 and 375 px.

## Typography

Roboto in three weights: 400, 500 and 700.

| Token / element | Mobile | Desktop | Weight |
|---|---|---|---|
| `--display-*` (home hero H1) | 32 / 34 | 48 / 50 | 500 |
| `h1` (`--heading-*-xxl`) | 24 / 28 | 44 / 52 | 500 |
| `h2` (`-xl`) | 28 / 32 | 36 / 44 | 500 |
| `h3` (`-l`) | 24 / 28 | 24 / 28 | 700 |
| `h4` (`-m`) | 20 / 28 | 20 / 28 | 700 |
| `h5` (`-s`) | 20 / 28 | 20 / 28 | 500 |
| `h6` (`-xs`), FAQ question | 18 / 26 | 18 / 26 | 700 |
| Lead (`--body-*-xl`) | 18 / 27 / 400 | 20 / 28 / 500 | |
| Body (`-m`) | 16 / 24 | 16 / 24 | 400 |
| Small (`-s`) | 14 / 20 | 14 / 20 | 400 |
| Price | 30 / 36 | 30 / 36 | 700 |
| Phone | 24 / 28 | 24 / 28 | 700 |
| Eyebrow | 12 / 16, uppercase, 0.1em | same | 700 |
| Button label | 12 / 16, uppercase, 0.05em | same | 500 |

Rhythm:
- Headings: `margin-bottom` is 8.
- Paragraphs: `margin-bottom` is 24.
- A heading that follows other content: 40 above an `h2` or `h3`, 32 above an `h4`–`h6`.
- `h2 + h3/h4`: 32.
- `sup` has `line-height: 0`, so superscripts don't change the row height.

Blocks override sizes where the design does, for example the hero split H1 24/25 bold, card titles 24/25 on mobile, and the search placeholder 21 px.

## Layout

| Token | Value |
|---|---|
| `--page-max-width` | 1440 |
| `--container-wide` | 1320 (60 px side space at 1440): header, hero text, benefit cards |
| `--container` | 1220 (`narrow` sections, 110 px at 1440) |
| `medium` section | 1288 (homepage card rows, 76 px at 1440) |
| `--container-text` | 860 (`readable`) |
| `--gutter` | 20 mobile / 40 desktop |
| `--section-spacing` | 40 mobile / 64 desktop |
| Spacing scale | `--space-2xs` 4, `-xs` 8, `-s` 16, `-m` 24, `-l` 32, `-xl` 40, `-2xl` 64, `-3xl` 80 |
| Header | `--header-offset` 22 / 30, `--header-height` 54 / 70, `--header-inset` 16 (mobile) |

`main` is padded by the header height plus 40. A page that starts with a hero has no top padding, so the floating header sits over the hero.

## Shape

| Token | Value | Use |
|---|---|---|
| `--radius-leaf-s` | `8px 0` | Buttons, outline cards, quick-link tiles, header sign-in |
| `--radius-leaf-l` | `16px 0` | Plan cards, feature cards, teaser card |
| `--radius-l` | 16 | Benefit cards, plan details card |
| `--radius-m` / `--radius-header` | 10 desktop / 12 mobile | Header bar |
| `--radius-s` | 8 | Search field |
| `--border` | `1px solid --color-border` | |
| `--border-accent` | `1px solid --color-lavender` | |
| `--shadow-header` | `0 2px 10px rgb(0 0 0 / 27%)` | Header bar |

## Buttons

How to author them in a document:
- `**link**` gives a primary button (teal; navy on hover).
- `_link_` gives a secondary button (white with a navy label and a 1 px navy inset border; the border is dropped on navy).
- `**_link_**` gives an accent button (navy).

All buttons are 37 px tall, padded 0 20, with leaf corners. A plain link alone in a resource card becomes an arrow link (`a.link-arrow`, indigo triangle).

## Section styles

Set them with Section Metadata "Style". Several can be combined, for example `light, narrow, inset, padding-s`.

| Style | Effect |
|---|---|
| `light` / `highlight` | `#f7f7f7` background |
| `grey` | `#eeeeed` background |
| `sand` | Sand background |
| `navy` | Navy background, white text, links and headings |
| `hexagons` | Faint hexagon line art (`styles/images/bg-hexagons.svg`) |
| `shaded`, `shaded-light` | Soft grey wash from left to right (homepage card rows); combine with `hexagons` |
| `narrow` | 1220 content column |
| `medium` | 1288 content column |
| `inset` | 30 px side padding on mobile (MMCP, homepage outline cards). The plan details table keeps 20 |
| `center` | Centered default content |
| `readable` | Default content limited to 860 |
| `small-heading` | `h2` at 24/28 bold; intro text max 1050 |
| `padding-s` | 60/49 mobile, 56/80 desktop |
| `padding-l` | 48/72 mobile, 72/108 desktop |
| `padding-xl` | 64/72 mobile, 100/108 desktop |
| `padding-xxl` | 46/48 mobile, 110/111 desktop |

The live pipeline renders Section Metadata as classes on the section. The local preview doesn't, so `scripts/scripts.js` (`applyUnprocessedMetadata`) does the same in the browser.

## Long-form content and links

- Content images are block-level and never wider than their column. An image followed by an italic paragraph shows that paragraph as a caption (14/20, muted).
- Blockquotes have a 4 px teal left rule and lead text size. List bullets are teal.
- On `content` and `article` pages, default text and tables keep an 860 px width (`--container-text`).
- Phone numbers in running text become `tel:` links (bold, no underline).
- External and PDF links open in a new tab. They get a 12 px trailing icon (`external.svg` or `file-pdf.svg`, drawn in the link colour) and screen-reader text.
- `.visually-hidden` hides text visually but keeps it for screen readers.

## Navigation patterns

Built from the existing tokens; no new colours or sizes.

| Pattern | Where | Design |
|---|---|---|
| Header bar | Every page | Floating white bar; dropdowns with teal chevrons; hamburger below 1200 px |
| Section menu | Inner pages | Section name as an eyebrow (12/16 bold, uppercase, 0.1em, navy) over a 2 px `--color-border` rule. Items are 16/22 (500 on level 1, 400 below) with `--color-divider` lines between level-1 items, and they indent 16 px per level (level 3 at 14/20). Open-branch ancestors are navy. The current page is navy bold on `--color-surface-1`, with a 3 px teal inset bar and leaf corners. Teal chevron toggles, as in the header |
| Section menu, small screens | Inner pages below 1200 px | A bar in `--color-surface-1` with a 1 px border and leaf corners. Eyebrow "In this section" (muted) over the current page (18/26 bold navy); plus/minus circle icon as on the accordion |
| On this page | Under the current menu item | Eyebrow "On this page" (muted). 14/20 links with a 1 px `--color-border` rule on the left; the heading in view turns teal and bold |
| Eyebrow link | Navy hero | The section name links to the section's main page (white, underline on hover) — breadcrumb information without a breadcrumb bar |
| Footer | Every page | The first column has New hire, Retirement, then Contact & forms, News and Video library. The meta row has © and "Last updated", plus Site map and Accessibility links at its end |

## Icons

SVGs live in `/icons`. In documents, write them as `:name:` text; `decorateIconTokens` in `scripts/scripts.js` turns that text into an icon.

| Group | Icons |
|---|---|
| Brand | `logo`, `logo-white` |
| UI | `file-pdf`, `search`, `search-teal`, `send`, `menu`, `user` (white), `user-navy`, `user-circle`, `external`, `info`, `plus-circle`, `minus-circle`, `check-circle` |
| Inline | `rx`, `headset`, `heart`, `question` |
| Hexagon, indigo outline (68.5 × 59.6) | `hex-find`, `hex-calendar`, `hex-document`, `hex-heart`, `hex-family`, `hex-dumbbell`, `hex-devices` |
| Hexagon, on navy / sand | `hex-bandage` (lavender and white), `hex-syringe` (dark grey) |
| Badges | `hex-badge-id-card` (gradient, Benefits hero), `hex-people` (lime, quick links) |
| Quick-link tiles (white line, 26 × 26) | `ql-id-card`, `ql-stethoscope`, `ql-rx`, `ql-headset` |

The icons from the vector PDF were exported from it. The homepage-only icons (`ql-*`, `hex-bandage`, `hex-syringe`, `hex-dumbbell`, `hex-devices`, `hex-people`, `search-teal`, `send`) were redrawn to match the raster. Partner logos are images, not icons; they are authored at 2x and shown at half their pixel size.

## Where the designs disagree, and what we chose

| Topic | Homepage PDF | Inner-page PDF | Chosen |
|---|---|---|---|
| Case | Title Case, UPPERCASE footer headings | Sentence case | Sentence case |
| Corners | Fully rounded cards, tiles and search | Leaf corners | Leaf corners. The search field keeps its 8 px round corners |
| Card border | Grey-lavender | `#cbcac6` / lavender | Tokens above |
| Plan cards | n/a | Leaf on desktop, round on mobile | Leaf on both |
| Copy | Different on desktop and mobile | n/a | Desktop copy |

The designs also contain typos and lorem ipsum ("deducible", "Preventitive" and others). The text on the site is corrected or left out.
