# Your Track to Health: project overview

This project migrates https://www.yourtracktohealth.com/ to AEM Edge Delivery Services, with Document Authoring (DA) as the content source. It is a redesign, not a 1:1 copy. The new look comes from the design PDFs in the repo root. The content of the pages the PDFs don't cover comes from the current site.

## Project documentation

| File | What it covers |
|---|---|
| `PROJECT_OVERVIEW.md` | This file: goals, decisions, status, open items |
| `PROJECT_PLAN.md` | Every remaining task, by phase, with its status and the progress log |
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

Decided 2026-11-10 (Phase 1 of `PROJECT_PLAN.md`):
- **Information architecture:**
  - Old "Benefits" and "Coverage" merge into **Benefits & coverage** (`/benefits-coverage/…`).
  - "Healthy Living" becomes **Health programs** (`/health-programs/…`). The 2013–2017 wellness articles go under `/health-programs/articles/…`.
  - "Retirement" stays **Retirement** (`/retirement/…`).
  - "Contact Us" becomes **Contact & forms** (`/contact-forms/…`).
  - News pages go to `/news/…`, linked from the footer.
- **Side menu (revised 2026-11-11):** inner pages get a section menu again, built on the brand.
  - Desktop: a sticky left column with the section tree, the current branch open and an "On this page" list.
  - Smaller screens: a collapsible "In this section" bar above the content.
  - No breadcrumb bar: the open branch shows every parent of the current page, and the hero eyebrow links to the section.
  - No print button.
- **Footer** adds the old site's utility links (Video library, Site map, Accessibility) and News.
- **PDFs** stay on the current server.
  - For now, links point to `https://www.yourtracktohealth.com/PDF_Files/…`, the same as today.
  - Before launch, all PDF links are switched in one rewrite to the final legacy address, which is not chosen yet.
  - Viewer links (`/Common/PDFViewer.aspx?fileName=…`) are rewritten to direct file links.
- **PDF-only pages** (13): no page. The old address redirects straight to the PDF, and links point to the PDF.
- **New hire:** a page in the new design with clearly marked placeholder text, for the benefits team to fill in.
- **Tools:** the medical benefit lookup and the FSA calculator are rebuilt now as native blocks. This needs the lookup data from the current system.
- **Redirects:** CDN rules that match the old path plus its `MenuId`/`MenuName` and redirect to the new path. We generate the rule list; the owner's IT team applies it.
- **Health programs › Managing heart health:** a new page built from the Railroad Heart Health Guide PDF. The Cardiac Care Program page stays under Benefits & coverage.
- **24/7 nurses & telemedicine:** one page. The current "24/7 Nurses & Health Specialists" and "24/7 Telemedicine" pages are merged.
- **Forms and the plan-document (SPD) library** move under Contact & forms.
- **Nav "Important announcements"** (Retirement) links straight to its PDF, because that page held only a PDF.
- **"Additional plan benefits and support"** (Life insurance) holds 3 PDFs. It stays a short document-list page, an exception to the PDF redirect rule.

## Status

| Step | Scope | Status |
|---|---|---|
| 1 | Design system: tokens, base styles, buttons, section styles, style guide (`/drafts/style-guide.html`) | Done |
| 2 | Header and footer, plus the blocks and content of Homepage, Benefits & coverage and MMCP | Done. All three pages match their PDFs at 1440 and 425 px within a few pixels |
| 3 | Blocks the designs don't cover (tables, documents, videos, search, article list, tools, 404, "In this section") | Done |
| 4–5 | Import infrastructure and migration of every current page, plus 7 new pages | Done 2026-11-11: 175 documents, QA clean |
| 6+ | Assets, SEO and redirects, accessibility and performance QA, review, launch, handover | See `PROJECT_PLAN.md` |

Pages built so far (175 documents in `content/`; the full list with old and new addresses is `migration-work/url-map/url-map.csv`):
- From the designs: Homepage `/index`, Benefits & coverage `/benefits-coverage`, MMCP `/benefits-coverage/medical-plans/mmcp`, and the fragments `/nav` and `/footer`
- Imported from the current site: 157 pages, plus 6 merge sources in `/drafts/merge-sources/`
- New: CHCB, HDHP, Managing heart health, Flexible fitness memberships, Savings & spending accounts, New hire (placeholder), Search

**Where content lives:** every change so far is in the local workspace only. Nothing has been uploaded to DA, previewed or published.

## Open items

1. **Homepage hero and teaser photos are low resolution** (599 px wide, from the current site). They need high-resolution replacements.
2. **Homepage targets (reviewed 2026-11-11 against the migrated content; owner to confirm):**
   - Request ID card → Benefits directory (every administrator's member site and phone, where ID cards are requested)
   - Find a doctor / Find your doctor → the new Find a doctor page (Aetna, Highmark and UnitedHealthcare provider directories)
   - Estimate drug costs → optumrx.com (where medication costs are checked)
   - 24/7 Nurseline → 24/7 nurses & telemedicine
   - Manage your benefits → member portal (heading link; the button shows on phones)
   - See your options (open enrollment) → the plan comparison on Benefits & coverage
   - Find a location (flu) → the flu-shot flyer used by the current site
3. **MMCP FAQ:** three answers are placeholders, waiting on the benefits team.
4. **MMCP mobile line:** the mobile design has an extra line under "How the plan works" (the names of the two health and welfare plans). Desktop doesn't have it, so it is left out.
5. **"New hire"** has no dropdown children in the nav yet.
6. **PDFs only work through the old viewer page** (`/Common/PDFViewer.aspx?fileName=/PDF_Files/…`); direct `/PDF_Files/` addresses return 404. Every link uses the viewer address. That server must stay up after launch, or the PDFs need a new home.
6b. **Final PDF address:** links point to `www.yourtracktohealth.com/PDF_Files/…` until the legacy address is chosen. That must happen before the domain switches.
7. **Lookup data:** the railroad / union / ZIP → plan document data for the benefit lookup tool. Extract it from the current form, or get an export from the owner.
   - **FSA calculator values:** the current site still uses a $3,500 maximum contribution (plan year 2019). Confirm the current limit and the RRTA and Medicare rates.
   - **Feedback form backend:** choose where submissions of the webmaster feedback form should go.
8. **Images for DA:** pictures are referenced from `migration-work/assets/`. Upload them to DA media before the pages go to DA.
9. **Homepage mobile header:** the mobile design hides "Sign in" in the header on the homepage only. We keep it, for consistency with the inner pages.
