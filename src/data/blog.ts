/**
 * Blog manifest for MetalSingapore.sg.
 *
 * The full Markdown is loaded at runtime via import.meta.glob so the bundle
 * ships the raw text. The static pre-render (build/site.py) renders each
 * article to HTML.
 *
 * One canonical URL per topic. baseFile must match a real file in
 * /assets/data/blogs/<baseFile>.md (and optional .pdf). Every category in
 * `categories` must be a valid CategorySlug from src/data/site.ts.
 */

import type { CategorySlug } from './site';

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  categories: CategorySlug[];
  /** Filename in /assets/data/blogs, .md primary; .pdf optional download. */
  baseFile: string;
  publishedISO: string;
  readingMinutes: number;
  /** Optional path under /assets/images/ used for OG and the article hero. */
  image?: string;
  /** Optional downloadable supplements served from /assets/downloads/. */
  downloads?: { label: string; href: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "en-10025-steel-grades-comparison-singapore",
    title:
      "EN 10025 steel grades for Singapore — S235, S275, S355 vs SS304, SS316 and galvanised mild steel",
    metaTitle:
      "EN 10025 Steel Grades Singapore — S275, S355 vs SS304, SS316",
    metaDescription:
      "Material-selection reference for Singapore: EN 10025 S275JR / S355JR vs SS304, SS316, galvanised mild steel and aluminium 6063 — yield, tensile, Charpy, weldability.",
    excerpt:
      "Side-by-side EN 10025 mild steel grades vs SS304, SS316, galvanised mild steel and aluminium for handrails, cat ladders, platforms and structural metalwork — with a downloadable comparison workbook.",
    categories: [
      "stainless-steel-fabrication",
      "custom-metal-works",
      "cat-ladders-and-access-metalwork",
    ],
    baseFile: "Blog_EN_10025_Steel_Grades_Comparison_Singapore",
    publishedISO: "2026-05-10",
    readingMinutes: 16,
    image: "/assets/images/blog/og_steel_grades_comparison.png",
    downloads: [
      {
        label: "EN 10025 Steel Grades Comparison workbook (.xlsx)",
        href: "/assets/downloads/EN10025_Steel_Grades_Comparison.xlsx",
      },
    ],
  },
  {
    slug: "18m-cat-ladder-design-engineering-singapore",
    title:
      "18-metre cat ladder design considerations for Singapore",
    metaTitle:
      "18m Cat Ladder Design Considerations Singapore | MetalSingapore.sg",
    metaDescription:
      "Design considerations for an 18 m vertical cat ladder in Singapore — stile and rung sizing, hoops, intermediate platforms and wall fixings, subject to QP review.",
    excerpt:
      "What an 18 m vertical cat ladder typically looks like in Singapore — section sizing, hoops and intermediate landings — with all final values to be confirmed by the appointed QP.",
    categories: ["cat-ladders-and-access-metalwork", "custom-metal-works"],
    baseFile: "Blog_18m_CatLadder_Design_Engineering",
    publishedISO: "2025-04-22",
    readingMinutes: 14,
  },
  {
    slug: "cat-ladder-aluminium-vs-ss304-vs-galvanised-mild-steel",
    title:
      "Cat ladder material selection — aluminium vs SS304 vs galvanised mild steel",
    metaTitle:
      "Cat Ladder Material Selection Singapore | MetalSingapore.sg",
    metaDescription:
      "Aluminium 6063 vs stainless steel SS304 vs galvanised mild steel for cat ladders in Singapore — strength, weight, corrosion and total cost of ownership.",
    excerpt:
      "How we choose between aluminium 6063, SS304 and galvanised mild steel for fixed cat ladders in Singapore — strength-to-weight, corrosion exposure and lifecycle cost.",
    categories: ["cat-ladders-and-access-metalwork", "stainless-steel-fabrication"],
    baseFile: "Blog_CatLadder_Aluminium_vs_SS304_vs_GalvMS",
    publishedISO: "2025-05-01",
    readingMinutes: 11,
  },
  {
    slug: "cat-ladder-wall-embedment-engineering-singapore",
    title:
      "Cat ladder wall embedment — anchor selection and edge distance",
    metaTitle:
      "Cat Ladder Wall Embedment Singapore | MetalSingapore.sg",
    metaDescription:
      "Wall-embedded cat ladder fixings in Singapore — chemical vs mechanical anchors, edge distance, base material and pull-out checks for the appointed QP.",
    excerpt:
      "How wall-embedded cat ladder brackets are sized — chemical vs mechanical anchors, base material, edge and spacing distances and the QP review chain.",
    categories: ["cat-ladders-and-access-metalwork", "custom-metal-works"],
    baseFile: "Blog_CatLadder_WallEmbedment_Engineering",
    publishedISO: "2025-05-02",
    readingMinutes: 13,
  },
  {
    slug: "wall-anchors-hilti-vs-fischer-bolt-sizing-singapore",
    title:
      "Hilti vs Fischer wall anchors — bolt sizing for Singapore metal works",
    metaTitle:
      "Hilti vs Fischer Wall Anchors Singapore | MetalSingapore.sg",
    metaDescription:
      "Hilti vs Fischer mechanical and chemical anchors for Singapore metalwork — pull-out, shear, edge distance and how to read the manufacturer's ETA tables.",
    excerpt:
      "Working through Hilti and Fischer mechanical and chemical anchor selection for Singapore metalwork — pull-out, shear, combined-load checks and ETA references.",
    categories: ["custom-metal-works", "cat-ladders-and-access-metalwork"],
    baseFile: "Blog_Wall_Anchors_Hilti_vs_Fischer_BoltSizing",
    publishedISO: "2025-05-03",
    readingMinutes: 15,
  },
  {
    slug: "handrail-ss304-vs-mild-steel-singapore",
    title:
      "Handrail material selection — SS304 vs mild steel for Singapore",
    metaTitle:
      "Handrail SS304 vs Mild Steel Singapore | MetalSingapore.sg",
    metaDescription:
      "When to specify SS304 vs powder-coated mild steel for Singapore handrails — finish, corrosion, weld quality and total cost over a typical service life.",
    excerpt:
      "Stainless steel SS304 or powder-coated mild steel for Singapore handrails — finish, exposure, weld quality and the total cost of ownership we see in practice.",
    categories: ["metal-railings", "stainless-steel-fabrication"],
    baseFile: "Blog_Handrail_SS304_vs_MildSteel",
    publishedISO: "2025-05-04",
    readingMinutes: 9,
  },
  {
    slug: "galvanised-mild-steel-vs-ss304-vs-ss316-lifespan-singapore",
    title:
      "Lifespan of galvanised mild steel vs SS304 vs SS316 in Singapore",
    metaTitle:
      "Galv MS vs SS304 vs SS316 Lifespan Singapore | MetalSingapore.sg",
    metaDescription:
      "Realistic service-life expectations for galvanised mild steel vs SS304 vs SS316 in Singapore — corrosion category, exposure and visible deterioration patterns.",
    excerpt:
      "How long galvanised mild steel, SS304 and SS316 actually last in Singapore — corrosion category, exposure and the deterioration patterns we see at site.",
    categories: ["stainless-steel-fabrication", "custom-metal-works", "metal-railings"],
    baseFile: "Blog_Lifespan_GalvMS_vs_SS304_vs_SS316",
    publishedISO: "2025-05-05",
    readingMinutes: 10,
  },
  {
    slug: "scdf-cat-ladder-solar-roof-access-singapore",
    title:
      "SCDF, solar PV and roof-access cat ladder design considerations",
    metaTitle:
      "SCDF Solar Roof-Access Cat Ladder Singapore | MetalSingapore.sg",
    metaDescription:
      "Cat ladder design considerations for solar PV and roof access in Singapore — SCDF interfaces, hoops, intermediate landings and where the QP comes in.",
    excerpt:
      "Cat ladder design considerations for solar PV and roof access in Singapore — interfaces with SCDF requirements, hoops and intermediate platforms, all subject to QP review.",
    categories: ["cat-ladders-and-access-metalwork", "custom-metal-works"],
    baseFile: "Blog_SCDF_CatLadder_Solar_RoofAccess",
    publishedISO: "2025-05-06",
    readingMinutes: 11,
  },
  {
    slug: "floor-loading-singapore-bca-scdf-jtc",
    title:
      "Floor loading in Singapore — who sets the numbers, and where SCDF actually fits in",
    metaTitle:
      "Floor Loading Singapore — BCA, JTC, SCDF | MetalSingapore.sg",
    metaDescription:
      "How floor loading is set in Singapore — BCA via the Eurocodes, JTC for industrial estates, SCDF for fire-specific loads. UDL vs point load explained.",
    excerpt:
      "A practical guide to BCA, JTC and SCDF floor-load requirements in Singapore — Eurocode UDL vs point loads, storey-shelter slabs, fire-engine accessways and refuge floors.",
    categories: [
      "cat-ladders-and-access-metalwork",
      "custom-metal-works",
      "outdoor-trellis-and-structural-metalwork",
    ],
    baseFile: "Blog_Floor_Loading_Singapore_BCA_SCDF_JTC",
    publishedISO: "2025-05-07",
    readingMinutes: 14,
  },
  {
    slug: "fischer-concrete-anchor-comparison-singapore",
    title:
      "fischer Bolt Anchor Systems Compared: FIS EM Plus vs FIS V Plus vs FAZ II Plus vs FBN II — Which Concrete Anchor Should You Specify?",
    metaTitle:
      "fischer Concrete Anchor Comparison Guide",
    metaDescription:
      "Compare fischer FIS EM Plus, FIS V Plus, FAZ II Plus and FBN II anchors for concrete fixing, cat ladders and access metalwork.",
    excerpt:
      "Side-by-side comparison of four fischer concrete anchor systems — pure epoxy, vinyl ester hybrid, high-performance through-bolt and standard wedge — with ETA references, seismic ratings, base materials and where each fits on Singapore cat ladder, handrail and access-metalwork packages.",
    categories: [
      "cat-ladders-and-access-metalwork",
      "custom-metal-works",
      "stainless-steel-fabrication",
    ],
    baseFile: "Blog_Fischer_Concrete_Anchor_Comparison",
    publishedISO: "2026-05-10",
    readingMinutes: 13,
  },
  {
    slug: "top-5-metal-gate-designs-singapore",
    title:
      "Top 5 metal gate designs for Singapore homes and developments",
    metaTitle:
      "Top 5 Metal Gate Designs Singapore | MetalSingapore.sg",
    metaDescription:
      "Five metal gate designs we fabricate most often for Singapore homes, condos and small commercial sites — materials, finishes and what each design suits.",
    excerpt:
      "Five metal gate designs that show up most often on Singapore drawings — vertical bar, laser-cut, slatted, perforated and frame-and-infill — with the materials and finishes we use.",
    categories: ["metal-gates", "custom-metal-works"],
    baseFile: "Blog_Top5_Metal_Gate_Designs_Singapore",
    publishedISO: "2025-05-08",
    readingMinutes: 7,
  },
];

/** Eagerly load Markdown bodies as raw strings via Vite. */
const blogModules = import.meta.glob('/assets/data/blogs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export function getBlogMarkdown(baseFile: string): string {
  const key = `/assets/data/blogs/${baseFile}.md`;
  return blogModules[key] || '';
}
