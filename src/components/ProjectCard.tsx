import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { CATEGORIES } from '../data/site';

export default function ProjectCard({ project }: { project: Project }) {
  const cat = CATEGORIES[project.category];
  const gallery = project.gallery || [];
  // Lightbox: index of the gallery photo currently shown, or null when closed.
  // The card cover image is treated as gallery[-1] (i.e. opens to image 0).
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openAt = (i: number) => setLightboxIdx(i);
  const close = useCallback(() => setLightboxIdx(null), []);
  const next = useCallback(
    () => setLightboxIdx((i) => (i === null ? null : (i + 1) % gallery.length)),
    [gallery.length],
  );
  const prev = useCallback(
    () => setLightboxIdx((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length)),
    [gallery.length],
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIdx, close, next, prev]);

  const current = lightboxIdx !== null ? gallery[lightboxIdx] : null;

  return (
    <article className="project-card">
      {gallery.length > 0 ? (
        <button
          type="button"
          onClick={() => openAt(0)}
          aria-label={`Open photo gallery for ${project.title}`}
          style={{ padding: 0, border: 'none', background: 'none', cursor: 'zoom-in', display: 'block' }}
        >
          <img
            src={project.image}
            alt={project.alt}
            loading="lazy"
            decoding="async"
            width={800}
            height={600}
          />
        </button>
      ) : (
        <img
          src={project.image}
          alt={project.alt}
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
        />
      )}
      <div className="project-card__body">
        <h3>{project.title}</h3>
        <p className="muted">
          <span className="tag">{cat?.title || project.category}</span>
          {project.location && <span className="tag">{project.location}</span>}
          {project.year && <span className="tag">{project.year}</span>}
          {project.needsConfirmation && (
            <span className="tag tag--needs-confirm" title="Project label pending confirmation">
              Pending confirmation
            </span>
          )}
        </p>
        <p>{project.description}</p>
        {project.note && <p className="project-note">{project.note}</p>}

        {gallery.length > 0 && (
          <div className="project-gallery" role="group" aria-label={`${project.title} photo gallery`}>
            {gallery.map((g, i) => (
              <button
                key={g.src}
                type="button"
                onClick={() => openAt(i)}
                aria-label={`Open photo ${i + 1} of ${gallery.length}: ${g.alt}`}
              >
                <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        )}

        {project.related && project.related.length > 0 && (
          <ul className="project-related" aria-label="Related pages">
            {project.related.map((r) => (
              <li key={r.to}>
                <Link to={r.to}>{r.label} →</Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {current && (
        <div
          className="lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={close}
        >
          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={current.alt} />
            <figcaption>{current.alt}</figcaption>
            {gallery.length > 1 && (
              <div className="lightbox-controls">
                <button type="button" onClick={prev} aria-label="Previous photo">
                  ← Prev
                </button>
                <span>
                  {lightboxIdx !== null ? lightboxIdx + 1 : 0} / {gallery.length}
                </span>
                <button type="button" onClick={next} aria-label="Next photo">
                  Next →
                </button>
                <button type="button" onClick={close} aria-label="Close gallery">
                  Close
                </button>
              </div>
            )}
            {gallery.length <= 1 && (
              <div className="lightbox-controls">
                <button type="button" onClick={close} aria-label="Close gallery">
                  Close
                </button>
              </div>
            )}
          </figure>
        </div>
      )}
    </article>
  );
}
