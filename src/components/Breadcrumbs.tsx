import { Link } from 'react-router-dom';
import { SITE } from '../data/site';

export interface Crumb { label: string; to?: string }

/**
 * Visible breadcrumb. Pair with a BreadcrumbList JSON-LD on the same page —
 * see breadcrumbJsonLd helper.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {items.map((c, i) => (
        <span key={`${c.label}-${i}`}>
          <span className="sep">/</span>
          {c.to && i < items.length - 1 ? (
            <Link to={c.to}>{c.label}</Link>
          ) : (
            <span className="current" aria-current="page">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function breadcrumbJsonLd(items: { label: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.origin}/` },
      ...items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: it.label,
        item: `${SITE.origin}${it.path.startsWith('/') ? it.path : `/${it.path}`}`,
      })),
    ],
  };
}
