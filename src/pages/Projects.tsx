import { useMemo, useState } from 'react';
import RouteHead from '../components/RouteHead';
import Breadcrumbs, { breadcrumbJsonLd } from '../components/Breadcrumbs';
import CtaBlock from '../components/CtaBlock';
import ProjectCard from '../components/ProjectCard';
import { CATEGORIES, type CategorySlug } from '../data/site';
import { useProjects } from '../hooks/useProjects';

const FILTERS: { slug: CategorySlug | 'all'; label: string }[] = [
  { slug: 'all', label: 'All' },
  { slug: 'metal-railings', label: 'Railings' },
  { slug: 'metal-gates', label: 'Gates' },
  { slug: 'fencing-and-grilles', label: 'Fencing & grilles' },
  { slug: 'cat-ladders-and-access-metalwork', label: 'Cat ladders & access' },
  { slug: 'stainless-steel-fabrication', label: 'Stainless steel' },
  { slug: 'outdoor-trellis-and-structural-metalwork', label: 'Trellis & structural' },
  { slug: 'custom-metal-works', label: 'Custom metal works' },
];

export default function Projects() {
  const [filter, setFilter] = useState<CategorySlug | 'all'>('all');
  const { projects, loading } = useProjects();

  const filtered = useMemo(
    () => filter === 'all' ? projects : projects.filter((p) => p.category === filter),
    [projects, filter],
  );

  const grouped = useMemo(() => {
    const result: Partial<Record<CategorySlug, typeof projects>> = {};
    for (const p of projects) (result[p.category] ||= []).push(p);
    return result;
  }, [projects]);

  return (
    <>
      <RouteHead
        title="Projects — MetalSingapore.sg Metal Works Portfolio"
        description="A grouped portfolio of MetalSingapore.sg projects across Singapore — railings, gates, fencing, cat ladders, stainless steel, trellis and custom metal works."
        path="/projects"
        jsonLd={breadcrumbJsonLd([{ label: 'Projects', path: '/projects' }])}
      />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Projects', to: '/projects' }]} />
          <h1>Projects portfolio</h1>
          <p className="lead" style={{ maxWidth: '62ch' }}>
            Recent metal-works projects grouped by service category. Where
            project name, location or year is uncertain, the entry is flagged
            <em> pending confirmation</em> rather than published with invented detail.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {FILTERS.map((f) => (
              <button
                key={f.slug}
                type="button"
                className={`btn ${filter === f.slug ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setFilter(f.slug)}
                aria-pressed={filter === f.slug}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading && <p>Loading projects…</p>}

          {filter === 'all' ? (
            (Object.keys(CATEGORIES) as CategorySlug[]).map((slug) => {
              const cat = CATEGORIES[slug];
              const items = grouped[slug] || [];
              if (items.length === 0) return null;
              return (
                <div key={slug} style={{ marginBottom: '3rem' }}>
                  <h2 id={slug}>{cat.title}</h2>
                  <p style={{ color: 'var(--muted)', marginBottom: '1.2rem' }}>{cat.short}</p>
                  <div className="project-grid">
                    {items.map((p) => <ProjectCard key={p.id} project={p} />)}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="project-grid">
              {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          )}
        </div>
      </section>

      <CtaBlock heading="Send us a project brief" />
    </>
  );
}
