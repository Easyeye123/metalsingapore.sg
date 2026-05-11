import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';

/**
 * Vite configuration for the MetalSingapore.sg microsite SPA.
 *
 * The deployable artefact for cPanel is the pre-rendered static HTML produced
 * by build/site.py (run via `npm run build:static`). The Vite SPA in /src is
 * the maintainable source mirror — every static page has a matching React
 * route reading the same /assets/* content pipeline.
 */

function spaFallback(): Plugin {
  return {
    name: 'metalsg-spa-fallback',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '/';
        if (
          req.method !== 'GET' ||
          url.startsWith('/@') ||
          url.startsWith('/src/') ||
          url.startsWith('/node_modules/') ||
          url.startsWith('/assets/') ||
          url.startsWith('/portfolio-images/') ||
          url.startsWith('/portfolio-admin/') ||
          url.startsWith('/contact-submit.php') ||
          url.includes('.')
        ) {
          return next();
        }
        const html = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8',
        );
        const transformed = await server.transformIndexHtml(url, html);
        res.setHeader('Content-Type', 'text/html');
        res.end(transformed);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), spaFallback()],
  root: '.',
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    fs: { allow: ['.', './assets', './portfolio-images'] },
  },
});
