// Dump TS data files to JSON for the Python static builder.
// Reads each TS file and uses esbuild-style inline transform via tsx.
// Vite-specific `import.meta.glob` in blog.ts is patched away first.
//
// Run: node build/dump_data.mjs > build/data.json

import { readFileSync, writeFileSync, mkdtempSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { pathToFileURL } from 'url';
import { transform } from 'esbuild';

const ROOT = new URL('..', import.meta.url).pathname;
const DATA = join(ROOT, 'src/data');

async function loadTs(file) {
  let src = readFileSync(join(DATA, file), 'utf8');
  // Patch out Vite-only API used in blog.ts (only matters at runtime, not for data)
  src = src.replace(/import\.meta\.glob\([^)]*\)/g, '({})');
  // Compile TS → JS
  const out = await transform(src, { loader: 'ts', format: 'esm', target: 'es2022' });
  // Write to a temp .mjs and dynamic-import it
  const dir = mkdtempSync(join(tmpdir(), 'msgdump-'));
  // Rewrite local relative imports to absolute file URLs of compiled siblings
  let js = out.code;
  // For our case the only cross-file import is `from './site'` — pre-load that first
  return { js, dir };
}

// Load site.ts first, then services/blog/projects/faq which import from './site'
const siteRes = await loadTs('site.ts');
const sitePath = join(siteRes.dir, 'site.mjs');
writeFileSync(sitePath, siteRes.js);
const site = await import(pathToFileURL(sitePath).href);

async function loadDep(file) {
  const r = await loadTs(file);
  // Replace './site' import with absolute path
  r.js = r.js.replace(/from\s+["']\.\/site["']/g, `from ${JSON.stringify(pathToFileURL(sitePath).href)}`);
  // Strip type-only re-imports
  const p = join(r.dir, file.replace('.ts', '.mjs'));
  writeFileSync(p, r.js);
  return import(pathToFileURL(p).href);
}

const services = await loadDep('services.ts');
const blog = await loadDep('blog.ts');
const projects = await loadDep('projects.ts');
const faq = await loadDep('faq.ts');

const out = {
  SITE: site.SITE,
  SPOKES: site.SPOKES,
  CATEGORIES: site.CATEGORIES,
  CATEGORY_ORDER: site.CATEGORY_ORDER,
  services: services.services,
  blogPosts: blog.blogPosts,
  projects: projects.seedProjects,
  faqs: faq.faqs,
};
process.stdout.write(JSON.stringify(out, null, 2));
