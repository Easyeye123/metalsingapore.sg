import { useEffect } from 'react';
import { SITE } from '../data/site';

interface Props {
  title: string;
  description: string;
  /** Path relative to origin, e.g. "/services/flooring" — should start with "/". */
  path: string;
  /** Image absolute path (origin-relative or full URL). Defaults to category cover. */
  image?: string;
  /** Optional JSON-LD object or array — appended on mount, removed on unmount. */
  jsonLd?: object | object[];
  /** noindex non-rankable / admin pages. */
  noindex?: boolean;
}

/**
 * Per-route SEO head updater. Sets <title>, meta description, canonical,
 * OG/Twitter tags and optional JSON-LD blocks. Pre-rendered HTML duplicates
 * the same tags so first paint is correct for crawlers.
 */
export default function RouteHead({ title, description, path, image, jsonLd, noindex }: Props) {
  useEffect(() => {
    const fullTitle = title.trim();
    document.title = fullTitle;

    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const canonical = `${SITE.origin}${cleanPath}`;
    const ogImage = image
      ? (image.startsWith('http') ? image : `${SITE.origin}${image}`)
      : `${SITE.origin}${SITE.ogImage}`;

    const ensureMeta = (selector: string, build: () => HTMLMetaElement) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = build();
        document.head.appendChild(el);
      }
      return el;
    };
    const setMeta = (name: string, content: string) => {
      const el = ensureMeta(`meta[name="${name}"]`, () => {
        const m = document.createElement('meta');
        m.setAttribute('name', name);
        return m;
      });
      el.setAttribute('content', content);
    };
    const setOg = (prop: string, content: string) => {
      const el = ensureMeta(`meta[property="${prop}"]`, () => {
        const m = document.createElement('meta');
        m.setAttribute('property', prop);
        return m;
      });
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setOg('og:title', fullTitle);
    setOg('og:description', description);
    setOg('og:url', canonical);
    setOg('og:image', ogImage);
    setOg('og:type', 'website');
    setOg('og:site_name', SITE.name);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);

    const scripts: HTMLScriptElement[] = [];
    if (jsonLd) {
      const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      for (const block of blocks) {
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.text = JSON.stringify(block);
        document.head.appendChild(s);
        scripts.push(s);
      }
    }

    return () => { for (const s of scripts) s.remove(); };
  }, [title, description, path, image, noindex, jsonLd]);

  return null;
}
