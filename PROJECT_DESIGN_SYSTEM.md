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
| `--color-teal-light` | `#1e8f90` | Nav chevrons, teal table group bar, badge gradient |
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
| `--color-error` | `#b3261e` | Form errors |
| `--color-shaded`, `--gradient-shaded` | `#f3f3f3`, `#ececec → #fafafa` | `shaded` section |
| `--color-shaded-light`, `--gradient-shaded-light` | `#fafaf8`, `#f4f5f0 → white` | `shaded-light` section |

**Where the colors come from, and why they look more vibrant in the PDFs (checked 2026-11-11):**
- Every brand color except lime, sand and the tile border on navy was read from the vector PDF's drawing operators, so the numbers are exact. Lime and sand come from large flat areas of the homepage JPEG, where compression keeps the color (sampled navy `#1c345c` vs `#1c355e`, sand `#e4e2d8` vs `#e5e2d9`). The JPEG does dull small and thin features (a nav triangle reads `#208273` instead of `#1e8f90`), but no token was sampled from those.
- The PDFs store all colors as untagged device RGB (no output profile). PDF viewers on wide-gamut screens show those numbers in the screen's Display P3 gamut, which is why the buttons and triangles look more vibrant there than in a browser, which shows them as sRGB. The sRGB teal `#007e80` has no red at all: it is already at the edge of the sRGB gamut.
- **So on wide-gamut screens (`@media (color-gamut: p3)`) the brand colors use the same numbers as Display P3** (`color(display-p3 0 0.4941 0.502)` for the teal, and so on), which reproduces what the PDFs show. Other screens keep the sRGB values. Neutrals are unchanged. Contrast stays the same (white on P3 teal ≈ 5:1).

## Breakpoints

- **Base (mobile):** follows the 425 px artboards. Verified at 375, 425 and 768 px.
- **`900px`:** the desktop type scale, desktop gutters and section spacing, and the desktop layout of most blocks.
- **`1200px`:** the full desktop **header** (inline menu, search, sign-in and contact) and the full desktop **footer** grid. The homepage **quick-links** band switches to its desktop row here too, and inner pages get the side-menu column. Below 1200 px these use their mobile layouts.
  - Between 1200 and 1319 px the header menu spacing tightens (the bar keeps the 40 px gutter).
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
| `--container-wide` | 1320 (60 px side space at 1440): **the content frame**. The header bar, every section, every block and the footer share its edges at all breakpoints (decision 2026-11-11; the PDFs had 1288 and 1220 px columns and a 16 px mobile header margin, which left edges a few pixels apart) |
| `--container` | same as `--container-wide` (was 1220) |
| `--container-text` | 860 (`readable`) |
| `--gutter` | 20 mobile / 40 desktop |
| `--section-spacing` | 40 mobile / 64 desktop |
| Spacing scale | `--space-2xs` 4, `-xs` 8, `-s` 16, `-m` 24, `-l` 32, `-xl` 40, `-2xl` 64, `-3xl` 80 |
| Header | `--header-offset` 22 / 30, `--header-height` 54 / 70, `--header-inset` = `--gutter` (the bar sits on the content frame) |

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
| `--shadow-header` | `0 2px 10px rgb(0 0 0 / 27%)` | Header bar, dropdowns, search panel |
| `--shadow-card` | `0 2px 8px rgb(0 0 0 / 8%)` | Cards |
| `--shadow-field` | `0 2px 10px rgb(0 0 0 / 15%)` | Homepage search field |
| `--shadow-popover` | `0 2px 16px rgb(0 0 0 / 25%)` | Tooltips |
| `--radius-pill`, `--radius-round` | 999px, 50% | Filter pills, round buttons |
| inner corner | `calc(var(--radius-l) - var(--border-width))` | A colored header inside a bordered card |

## Buttons

Buttons are drawn from tokens (`--button-primary-bg`, `-color`, `-hover-bg`, `-hover-color`, and the same for `secondary` and `accent`, plus `--button-secondary-border`). The color contexts below change them, so a button looks right on any surface.

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
| `narrow`, `medium`, `inset` | No longer change the width (kept so authored pages stay valid): every section uses the content frame |
| `center` | Centered default content |
| `readable` | Default content limited to 860 |
| `small-heading` | `h2` at 24/28 bold; intro text max 1050 |
| `padding-s` | 60/49 mobile, 56/80 desktop |
| `padding-l` | 48/72 mobile, 72/108 desktop |
| `padding-xl` | 64/72 mobile, 100/108 desktop |
| `padding-xxl` | 46/48 mobile, 110/111 desktop |

Styles combine freely. When several background styles are combined, `navy` wins over `light`, `grey`, `sand` and the washes; `hexagons` only adds its line art (images only), so it works with any background, including navy.

The live pipeline renders Section Metadata as classes on the section. The local preview doesn't, so `scripts/scripts.js` (`applyUnprocessedMetadata`) does the same in the browser.

## Color contexts (any content on any surface)

The text, heading, link, arrow-link, bullet, rule, focus and button colors are context variables (`--text-color`, `--heading-color`, `--link-color`, `--link-arrow-color`, `--marker-color`, `--rule-color`, `--focus-color`, `--text-muted-color`, `--button-*`). Two lists at the end of `styles/styles.css` set them:
- **Dark surfaces:** navy sections, `.surface-dark`, the navy and home heroes, the navy feature card, plan-card headers, plan-details headers and navy group bars, table headers, the FSA result panel. Text, headings and links turn white, bullets and arrow links mint, secondary buttons lose their border, accent buttons turn white, and hover states use white or mint.
- **Light surfaces:** `.surface-light` and every white or light card (outline and feature cards, teaser card, plan and benefit cards, plan details, table rows, lookup panels, section menu, suggestions, tooltips). They switch back, so a white card in a navy section keeps dark text.
- **Sand** (section and card) keeps the light colors but uses navy links (teal on sand is 3.8:1).

Both lists use zero specificity (`:where`), so a block can still set a color on purpose. A new block with a dark or light surface adds its selector to the matching list.

Primary buttons stay teal on every surface (white on teal passes 4.5:1; the lighter teal did not).

## Long-form content and links

- Content images are block-level and never wider than their column. An image followed by an italic paragraph shows that paragraph as a caption (14/20, muted).
- Blockquotes have a 4 px teal left rule and lead text size. List bullets are teal (mint on dark surfaces). These rules apply inside blocks too, so quotes and lists in card bodies, accordion answers or columns look the same.
- Inside any block cell, the first element has no top margin and the last no bottom margin. Content slots that reset their margins (card bodies, the teaser card) space further elements with `--flow-space` (16) and buttons with `--flow-space-button` (24); the design's own spacing rules are more specific and win.
- On `content` and `article` pages, default text keeps an 860 px measure (`--container-text`); blocks (tables, accordions, documents, cards) fill the column up to the frame's right edge.
- Phone numbers in running text become `tel:` links (bold, no underline).
- External and PDF links open in a new tab. They get a 12 px trailing icon (`external.svg` or `file-pdf.svg`, drawn in the link colour) and screen-reader text.
- `.visually-hidden` hides text visually but keeps it for screen readers.

## Navigation patterns

Built from the existing tokens; no new colours or sizes.

| Pattern | Where | Design |
|---|---|---|
| Header bar | Every page | Floating white bar; dropdowns with teal chevrons; hamburger below 1200 px |
| Section menu | Inner pages | Section name as an eyebrow (12/16 bold, uppercase, 0.1em, navy) over a 2 px `--color-border` rule. Items are 16/22 (500 on level 1, 400 below) with `--color-divider` lines between level-1 items, and they indent 16 px per level (level 3 at 14/20). Open-branch ancestors are navy. The current page is navy bold on a `--color-surface-1` tab: square left edge with a straight 3 px teal bar, 4 px rounded right corners. Every row keeps a 3 px gap (2 px below level 1) to the divider lines, so the highlight never touches a rule. Teal chevron toggles, as in the header |
| Section menu, small screens | Inner pages below 1200 px | A bar in `--color-surface-1` with a 1 px border and leaf corners. Eyebrow "In this section" (muted) over the current page (18/26 bold navy); plus/minus circle icon as on the accordion |
| On this page | Under the current menu item | Eyebrow "On this page" (muted). 14/20 links with a 1 px `--color-border` rule on the left; the heading in view turns teal and bold |
| Eyebrow link | Navy hero | The section name links to the section's main page (white, underline on hover) — breadcrumb information without a breadcrumb bar |
| Footer | Every page | The first column has New hire, Retirement, then Contact & forms, News and Video library. The last column fits its links and ends on the frame's right edge. The meta row has © and "Last updated", plus Site map, Notice of privacy practices and Accessibility at its end |
| Header search panel | Every page | White panel under the header bar, full bar width, `--radius-leaf-l` and `--shadow-header`. Field with the teal search icon (focus: teal border, mint ring) and a primary Search button. The open search icon gets a `--color-surface-1` square |
| Search suggestions | Header panel, homepage hero, 404 page | A list under the field: title navy 500 with the matched words bold, a muted 14/20 label (section › parent page · PDF), a PDF icon for documents. The highlighted row uses the section-menu look (`--color-surface-1` with a 3 px teal bar); "See all results" in teal under a divider |
| Search results | `/search` | Pill filters (border `--color-border`, pressed = navy fill), an eyebrow label in teal, 20/28 bold navy title, an excerpt with mint-marked words, the address in subtle 14/20 |

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
| Hexagon library (indigo outline, text-colour glyph, 68.5 × 59.6) — from the current site's icons | `hex-24-hours`, `hex-account`, `hex-advisor`, `hex-baby`, `hex-calculator`, `hex-care`, `hex-care-team`, `hex-chat`, `hex-checklist`, `hex-coach`, `hex-discount`, `hex-doctor`, `hex-doctors`, `hex-eye`, `hex-first-aid`, `hex-folder`, `hex-form`, `hex-glasses`, `hex-globe`, `hex-handshake`, `hex-headset`, `hex-heart-pulse`, `hex-household`, `hex-laptop`, `hex-lock`, `hex-mental-health`, `hex-mindfulness`, `hex-mobile`, `hex-no-smoking`, `hex-pharmacy`, `hex-question`, `hex-ribbon`, `hex-spine`, `hex-stethoscope`, `hex-strategy`, `hex-tooth`, `hex-virus`, `hex-wallet` |

**Hexagon library (2026-11-11).** The current site's tiles use 38 glyphs of its own icon font (icomoon). `migration-work/icons/build-icons.cjs` takes the glyph outlines from that font, centres each one in the PDF's hexagon badge (the frame of `hex-find`/`hex-calendar`) and thickens the hairline glyphs to the PDF icons' ~1.5 px, so the set reads as one family with the designed icons. Names say what the icon shows, not where it was used (`hex-wallet`, not `hex-fsa`); the authoring library's icons sheet lists them with labels. Authors place an icon by writing `:hex-name:` as the first paragraph of a card or tile; decorative icons have no text alternative (the title next to them names the tile).
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

## Header photos (2026-11-11)

The Benefits & coverage design pairs the page header with a photo; inner pages now do the same where a good photo exists.

- **Source:** the current site's 2800 × 700 page banners. Their left ~45% carries a baked-in teal fade, logo and tagline and is not used; the photo part (x 1450–2800, 1350 × 700; the heart photo from x 1800 to clear a logo) is cropped into `migration-work/assets/heroes/` by `migration-work/heroes/crop-banners.cjs`. Two small banners (an illustration and a text panel) are left out. Catalog with subject and focus point: `migration-work/heroes/catalog.json` (25 photos, named after what they show).
- **Layout:** text never sits on the photo. Wide screens: the photo takes the band's right part after the text column and fades into the navy; small screens: a band under the text. Text contrast is the navy's (white on #1c355e).
- **Retirement:** the old Retirement side box layered a green gradient image (`linkimgbk1.jpg`, dropped) under a call-center photo (600 × 400, `hero-retirement-specialist.jpg`). The photo now heads `/retirement` and `/retirement/forms`; the Retirement banner's retiree photo moved to `/retirement/coverage-options`. A sweep of every page that opens with a picture found no other gradient images: the remaining lead images are article infographics, small inline photos and an app ad with baked-in text, which belong to the content.
- **Assignment** (`build-assignments.cjs`, review list `hero-assignments.json`): each photo heads the page whose banner it was (24 pages); 7 topical pages without a banner get a second use (savings & spending accounts, heart health, find a doctor, new hire, fitness memberships, healthy habits, dependents). No photo appears more than twice on the site, counting the homepage (telehealth and retiree photos); none is used on a page that already shows it. The designed plan pages (MMCP, CHCB, HDHP) keep the PDF's navy band with the tracks motif, as do all other pages without a fitting photo.
- **Authors:** add a picture row (and optionally `Focus | 40%`) to `Hero (navy)`. Choose a calm photo with its subject away from its left edge; alt text stays empty (decorative: the title names the page).
