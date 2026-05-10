# Source-file → URL dedupe map

One canonical URL per topic. When both `.md` and `.pdf` exist, Markdown is the
primary source for the rendered page and the PDF is offered as a download
alongside.

## Facade / fire / window / gondola group (PDF-sourced)

| Source file(s) | Final URL |
| --- | --- |
| `Blog_1_bca-periodic-facade-inspection-singapore.pdf` (+ `.md`) | https://ezzogenics.com/blog/bca-periodic-facade-inspection-singapore/ |
| `Blog_2_masonry-wall-inspection-singapore.pdf` (+ `.md`) | https://ezzogenics.com/blog/masonry-wall-inspection-singapore/ |
| `Blog_3_cladding-inspection-singapore.pdf` (+ `.md`) | https://ezzogenics.com/blog/cladding-inspection-singapore/ |
| `Blog_4_curtain-wall-inspection-singapore.pdf` (+ `.md`) | https://ezzogenics.com/blog/curtain-wall-inspection-singapore/ |
| `Blog_5_facade-inspection-safety-singapore.pdf` (+ `.md`) | https://ezzogenics.com/blog/facade-inspection-safety-singapore/ |
| `Blog_6_gondola-safety-singapore.pdf` (+ `.md`) | https://ezzogenics.com/blog/gondola-safety-singapore/ |
| `Blog_7_fire-code-2023-singapore.pdf` (+ `.md`) | https://ezzogenics.com/blog/fire-code-2023-singapore/ |
| `Blog_8_window-inspection-singapore.pdf` (+ `.md`) | https://ezzogenics.com/blog/window-inspection-singapore/ |

## Metal / work-at-height engineering group (Markdown + PDF pairs)

| Source file(s) | Final URL |
| --- | --- |
| `Blog_18m_CatLadder_Design_Engineering.md` + `.pdf` | https://ezzogenics.com/blog/18m-cat-ladder-design-engineering-singapore/ |
| `Blog_CatLadder_Aluminium_vs_SS304_vs_GalvMS.md` + `.pdf` | https://ezzogenics.com/blog/cat-ladder-aluminium-vs-ss304-vs-galvanised-mild-steel/ |
| `Blog_CatLadder_WallEmbedment_Engineering.md` + `.pdf` | https://ezzogenics.com/blog/cat-ladder-wall-embedment-engineering-singapore/ |
| `Blog_Wall_Anchors_Hilti_vs_Fischer_BoltSizing.md` + `.pdf` | https://ezzogenics.com/blog/wall-anchors-hilti-vs-fischer-bolt-sizing-singapore/ |
| `Blog_Handrail_SS304_vs_MildSteel.md` + `.pdf` | https://ezzogenics.com/blog/handrail-ss304-vs-mild-steel-singapore/ |
| `Blog_Lifespan_GalvMS_vs_SS304_vs_SS316.md` + `.pdf` | https://ezzogenics.com/blog/galvanised-mild-steel-vs-ss304-vs-ss316-lifespan-singapore/ |
| `Blog_SCDF_CatLadder_Solar_RoofAccess.md` + `.pdf` | https://ezzogenics.com/blog/scdf-cat-ladder-solar-roof-access-singapore/ |
| `Blog_Floor_Loading_Singapore_BCA_SCDF_JTC.pdf` (+ `.md`) | https://ezzogenics.com/blog/floor-loading-singapore-bca-scdf-jtc/ |

## Renovation / flooring / electrical group (Markdown sources)

| Source file(s) | Final URL |
| --- | --- |
| `2024-05-13-court-marking-techniques.md` (frontmatter stripped, body integrated as `Blog_Court_Marking_Techniques.md`) | https://ezzogenics.com/blog/court-marking-techniques-singapore/ |
| `2024-11-27-efflorescence-removal-and-prevention.md` (`Blog_Efflorescence_Removal_and_Prevention.md`) | https://ezzogenics.com/blog/efflorescence-removal-and-prevention-singapore/ |
| `2024-11-30-prevent-short-circuits.md` (`Blog_Prevent_Short_Circuits.md`) | https://ezzogenics.com/blog/prevent-short-circuits-renovation-singapore/ |
| `2024-11-28-condominium-renovation-tips.md` (`Blog_Condominium_Renovation_Tips.md`) | https://ezzogenics.com/blog/condominium-renovation-tips-singapore/ |
| `2024-11-30-custom-furniture-and-carpentry-tips.md` (`Blog_Custom_Furniture_and_Carpentry_Tips.md`) | https://ezzogenics.com/blog/custom-furniture-and-carpentry-tips-singapore/ |
| `EN-14904-English-CE-marking-sport-parquet.pdf` → rewritten as `EN_14904_CE_Marking_Sport_Parquet_Singapore.md` (no original-author attribution) | https://ezzogenics.com/blog/en-14904-ce-marking-sport-parquet-singapore/ |

## Steel comparison group (canonical single page)

| Source file(s) | Final URL |
| --- | --- |
| `EN10025_Steel_Grades_Comparison.xlsx` (downloadable workbook) + `cheat_sheet_one_pager.html.html` (copy reference) + images `01_s355_hbeam.jpg`, `02_ss316_handrail.jpg`, `04_ms_hbeam_stack.jpg` | https://ezzogenics.com/blog/en-10025-steel-grades-comparison-singapore/ |

The workbook is published to `/assets/downloads/EN10025_Steel_Grades_Comparison.xlsx` and linked from the article. The three images are compressed and stored at `/assets/images/blog/steel-grades/` and embedded with descriptive alt text.

## Deduplication notes

- For every Markdown / PDF pair in the metal-engineering group, the rendered page uses the `.md` body; the PDF is exposed as a one-line "Download the PDF version" link beneath the article.
- For every PDF-only source in the facade/fire/gondola group, the original PDF is preserved and a content-equivalent `.md` is loaded into the static page so each topic is reachable with one canonical slug.
- Renovation Markdown-only sources have no PDF download link rendered (PDF link is conditional on `.pdf` existing).
- The `cheat_sheet_one_pager.html.html` was used as copy reference only; it is not republished as a separate page. The canonical resource is `/blog/en-10025-steel-grades-comparison-singapore/`.
- The previous slugs `cat-ladder-design-engineering-singapore`, `cat-ladder-wall-anchorage-engineering`, `wall-anchors-hilti-fischer-bolt-sizing`, `handrail-ss304-vs-mild-steel`, `lifespan-galvanised-vs-ss304-vs-ss316` and `scdf-cat-ladder-roof-access-solar-pv` have been retired in favour of the canonical slugs above. Only one canonical slug per topic appears in the manifest, sitemap, blog hub and Home recent-posts cards.
