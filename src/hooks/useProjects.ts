import { useEffect, useMemo, useState } from 'react';
import { seedProjects, type Project } from '../data/projects';

/**
 * Loads the project list. Seed data is bundled; the admin uploader writes
 * additional entries to /assets/data/projects.json which is fetched at runtime
 * and merged into the list (admin-added projects win on duplicate id).
 */
export function useProjects() {
  const [extra, setExtra] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('/assets/data/projects.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: unknown) => {
        if (cancelled) return;
        if (Array.isArray(data)) setExtra(data as Project[]);
        else if (data && typeof data === 'object' && Array.isArray((data as { projects?: unknown }).projects)) {
          setExtra((data as { projects: Project[] }).projects);
        }
      })
      .catch(() => { /* ignore — seed only */ })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const projects = useMemo<Project[]>(() => {
    const byId = new Map<string, Project>();
    for (const p of seedProjects) byId.set(p.id, p);
    for (const p of extra) byId.set(p.id, p);
    return Array.from(byId.values());
  }, [extra]);

  return { projects, loading };
}
