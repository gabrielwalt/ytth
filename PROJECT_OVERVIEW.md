# Your Track to Health: project overview

This project migrates https://www.yourtracktohealth.com/ to AEM Edge Delivery Services, with Document Authoring (DA) as the content source. It is a redesign, not a 1:1 copy. The new look comes from the design PDFs in the repo root. The content of the pages the PDFs don't cover comes from the current site.

## Project documentation

| File | What it covers |
|---|---|
| `PROJECT_OVERVIEW.md` | This file: goals, decisions, status, open items |
| `PROJECT_DESIGN_SYSTEM.md` | Tokens (color, type, layout, shape), section styles, buttons, icons |
| `PROJECT_BLOCKS.md` | The block library: what each block is for, how to author it, its variants |
| `PROJECT_CONTENT_IMPORT.md` | How content gets into `content/`: design-source pages, importers, assets |

**Keep these files current.** Update the matching `PROJECT_*.md` file whenever you change any of these:
- a token or section style
- a block or a block's authoring structure
- the import workflow
- a project decision or the open items

Use the same commit as the change. `.hlxignore` keeps the files off the site.

## Sources

| Source | Content | Precision |
|---|---|---|
| `YTTH_Benefits_Coverage.pdf` | Benefits & coverage, MMCP. Desktop 1440 px and mobile 425 px | Vector Figma export, measured exactly |
| `YTTH-Homepage.pdf` | Homepage. Desktop 1440 px and mobile 425 px | One flat 1x raster per page, measured from pixels |
| yourtracktohealth.com | About 178 pages: content for every page outside the PDFs, plus the homepage photos | Inventory in `migration-work/site-inventory.json` |

## Decisions (made by the site owner, 2026-11-10)

- **The inner-page designs (Benefits & coverage, MMCP) are the standard** wherever the PDFs disagree:
  - Sentence case everywhere, including nav, footer, buttons, card titles and tile labels.
  - "Leaf" corners (top-left and bottom-right rounded) on cards, tiles and buttons.
  - Mobile layouts follow the 425 px artboards.
- **Migrate everything:** all ~178 pages of the current site, including old wellness articles, image-only infographics and PDF-only pages.
- **Homepage photos come from the current site.** Never crop them from the homepage PDF raster.
- **Copy comes from the PDFs** for the three designed pages. Never invent benefit facts. Mark missing copy as a placeholder in square brackets, for example `[Answer to be provided by the benefits team.]`.
- Where the desktop and mobile artboards carry different copy (homepage), the desktop copy is used.

## Status

| Step | Scope | Status |
|---|---|---|
| 1 | Design system: tokens, base styles, buttons, section styles, style guide (`/drafts/style-guide.html`) | Done |
| 2 | Header and footer, plus the blocks and content of Homepage, Benefits & coverage and MMCP | Done. All three pages match their PDFs at 1440 and 425 px within a few pixels |
| 3 | Catalog and import the remaining ~175 pages into the new blocks | Next |
| 4 | Information architecture, redirects from the old `.aspx` URLs, PDF handling | Later |

Pages built so far, each with its document path:
- Homepage: `/index`
- Benefits & coverage: `/benefits-coverage`
- MMCP: `/benefits-coverage/medical-plans/mmcp`
- The nav and footer fragments: `/nav`, `/footer`

**Where content lives:** every change so far is in the local workspace only. Nothing has been uploaded to DA, previewed or published.

## Open items

1. **Homepage hero and teaser photos are low resolution** (599 px wide, from the current site). They need high-resolution replacements.
2. **Homepage quick-link destinations need confirming:**
   - Request ID card → member sign-in
   - Find a doctor → Medical plans
   - Estimate drug costs → Prescription drugs
   - 24/7 Nurseline → 24/7 nurses & telemedicine
3. **MMCP FAQ:** three answers are placeholders, waiting on the benefits team.
4. **MMCP mobile line:** the mobile design has an extra line under "How the plan works" (the names of the two health and welfare plans). Desktop doesn't have it, so it is left out.
5. **"New hire"** has no dropdown children in the nav yet.
6. **Images for DA:** pictures are referenced from `migration-work/assets/`. Upload them to DA media before the pages go to DA.
7. **Homepage mobile header:** the mobile design hides "Sign in" in the header on the homepage only. We keep it, for consistency with the inner pages.
