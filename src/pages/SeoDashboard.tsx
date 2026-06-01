import { useState, useMemo } from 'react';
import RouteHead from '../components/RouteHead';
import { AUDIT_SITES, type Grade, type SiteAudit } from '../data/seoAudit';

const GRADE_COLORS: Record<Grade, { bg: string; text: string; label: string }> = {
  A: { bg: '#1a6e3c', text: '#fff', label: 'Excellent' },
  B: { bg: '#2d7d32', text: '#fff', label: 'Good' },
  C: { bg: '#e6a817', text: '#fff', label: 'Fair' },
  D: { bg: '#d4511f', text: '#fff', label: 'Poor' },
  F: { bg: '#c0392b', text: '#fff', label: 'Critical' },
};

const STATUS_STYLES: Record<SiteAudit['status'], { dot: string; label: string }> = {
  live:   { dot: '#2d7d32', label: 'Live' },
  issues: { dot: '#e6a817', label: 'Issues' },
  down:   { dot: '#c0392b', label: 'Down' },
};

type SortKey = 'score' | 'name' | 'grade' | 'lastAudited';

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="seo-score-bar-track" title={`${value}/100`}>
      <div
        className="seo-score-bar-fill"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  );
}

function GradeBadge({ grade }: { grade: Grade }) {
  const c = GRADE_COLORS[grade];
  return (
    <span
      className="seo-grade-badge"
      style={{ background: c.bg, color: c.text }}
      title={c.label}
    >
      {grade}
    </span>
  );
}

function StatusDot({ status }: { status: SiteAudit['status'] }) {
  const s = STATUS_STYLES[status];
  return (
    <span className="seo-status-dot-row">
      <span className="seo-status-dot" style={{ background: s.dot }} />
      {s.label}
    </span>
  );
}

function scoreColor(value: number): string {
  if (value >= 85) return '#1a6e3c';
  if (value >= 70) return '#2d7d32';
  if (value >= 55) return '#e6a817';
  if (value >= 40) return '#d4511f';
  return '#c0392b';
}

function SiteCard({ site }: { site: SiteAudit }) {
  const [expanded, setExpanded] = useState(false);
  const totalIssues = site.issues.critical + site.issues.warnings + site.issues.notices;

  return (
    <article className="seo-card">
      <div className="seo-card-header">
        <div className="seo-card-title-row">
          <GradeBadge grade={site.grade} />
          <div className="seo-card-name">
            <span className="seo-card-site-name">{site.name}</span>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="seo-card-url"
            >
              {site.url.replace('https://', '')} ↗
            </a>
          </div>
        </div>
        <div className="seo-card-meta">
          <StatusDot status={site.status} />
          <span className="seo-card-category">{site.category}</span>
        </div>
      </div>

      <div className="seo-card-score-row">
        <div className="seo-overall-score" style={{ color: scoreColor(site.score) }}>
          {site.score}
          <span className="seo-overall-denom">/100</span>
        </div>
        <div className="seo-issue-chips">
          {site.issues.critical > 0 && (
            <span className="seo-chip seo-chip-critical">{site.issues.critical} critical</span>
          )}
          {site.issues.warnings > 0 && (
            <span className="seo-chip seo-chip-warning">{site.issues.warnings} warnings</span>
          )}
          {site.issues.notices > 0 && (
            <span className="seo-chip seo-chip-notice">{site.issues.notices} notices</span>
          )}
        </div>
      </div>

      <button
        type="button"
        className="seo-expand-btn"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        {expanded ? 'Hide details ▲' : 'Show breakdown ▼'}
      </button>

      {expanded && (
        <div className="seo-breakdown">
          {(
            [
              ['Technical SEO', site.scores.technical],
              ['On-Page SEO', site.scores.onPage],
              ['Performance', site.scores.performance],
              ['Mobile', site.scores.mobile],
              ['Links', site.scores.links],
            ] as [string, number][]
          ).map(([label, val]) => (
            <div key={label} className="seo-breakdown-row">
              <span className="seo-breakdown-label">{label}</span>
              <ScoreBar value={val} color={scoreColor(val)} />
              <span
                className="seo-breakdown-val"
                style={{ color: scoreColor(val) }}
              >
                {val}
              </span>
            </div>
          ))}
          <div className="seo-breakdown-footer">
            Last audited: {site.lastAudited} · {totalIssues} total issues
          </div>
        </div>
      )}
    </article>
  );
}

export default function SeoDashboard() {
  const [filterGrade, setFilterGrade] = useState<Grade | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<SiteAudit['status'] | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('score');
  const [sortAsc, setSortAsc] = useState(false);

  const gradeOrder: Record<Grade, number> = { A: 0, B: 1, C: 2, D: 3, F: 4 };

  const displayed = useMemo(() => {
    let items = [...AUDIT_SITES];
    if (filterGrade !== 'all') items = items.filter((s) => s.grade === filterGrade);
    if (filterStatus !== 'all') items = items.filter((s) => s.status === filterStatus);
    items.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'score') cmp = a.score - b.score;
      else if (sortKey === 'grade') cmp = gradeOrder[a.grade] - gradeOrder[b.grade];
      else if (sortKey === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortKey === 'lastAudited') cmp = a.lastAudited.localeCompare(b.lastAudited);
      return sortAsc ? cmp : -cmp;
    });
    return items;
  }, [filterGrade, filterStatus, sortKey, sortAsc]);

  const stats = useMemo(() => {
    const all = AUDIT_SITES;
    const avgScore = Math.round(all.reduce((s, x) => s + x.score, 0) / all.length);
    const gradeCounts = all.reduce<Partial<Record<Grade, number>>>((acc, s) => {
      acc[s.grade] = (acc[s.grade] ?? 0) + 1;
      return acc;
    }, {});
    const liveCount = all.filter((s) => s.status === 'live').length;
    const criticalTotal = all.reduce((s, x) => s + x.issues.critical, 0);
    return { avgScore, gradeCounts, liveCount, criticalTotal };
  }, []);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((v) => !v);
    else { setSortKey(key); setSortAsc(false); }
  }

  const grades: Grade[] = ['A', 'B', 'C', 'D', 'F'];

  return (
    <>
      <RouteHead
        title="SEO Dashboard — Ezzogenics Group"
        description="Internal SEO health tracker for all Ezzogenics group websites. Grades, scores, issue counts and breakdown by category."
        path="/seo-dashboard"
        noindex
      />

      <section className="page-hero seo-hero">
        <div className="container">
          <p className="eyebrow">Internal Tool</p>
          <h1>SEO Dashboard</h1>
          <p className="lead">
            Live SEO health across {AUDIT_SITES.length} Ezzogenics group sites — grades,
            scores, issues and category breakdowns.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="seo-stats-bar">
        <div className="container seo-stats-grid">
          <div className="seo-stat">
            <span className="seo-stat-value">{AUDIT_SITES.length}</span>
            <span className="seo-stat-label">Sites tracked</span>
          </div>
          <div className="seo-stat">
            <span className="seo-stat-value" style={{ color: scoreColor(stats.avgScore) }}>
              {stats.avgScore}
            </span>
            <span className="seo-stat-label">Avg score</span>
          </div>
          <div className="seo-stat">
            <span className="seo-stat-value" style={{ color: '#2d7d32' }}>
              {stats.liveCount}
            </span>
            <span className="seo-stat-label">Live</span>
          </div>
          <div className="seo-stat">
            <span className="seo-stat-value" style={{ color: '#c0392b' }}>
              {stats.criticalTotal}
            </span>
            <span className="seo-stat-label">Critical issues</span>
          </div>
          <div className="seo-stat seo-stat-grades">
            {grades.map((g) => (
              <span
                key={g}
                className="seo-grade-mini"
                style={{ background: GRADE_COLORS[g].bg, color: '#fff' }}
                title={`Grade ${g}: ${stats.gradeCounts[g] ?? 0} sites`}
              >
                {g}: {stats.gradeCounts[g] ?? 0}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Filters + sort */}
      <section className="section seo-main">
        <div className="container">
          <div className="seo-toolbar">
            <div className="seo-filter-group">
              <span className="seo-filter-label">Grade</span>
              {(['all', ...grades] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  className={`btn seo-filter-btn${filterGrade === g ? ' seo-filter-active' : ''}`}
                  style={
                    filterGrade === g && g !== 'all'
                      ? { background: GRADE_COLORS[g as Grade].bg, color: '#fff', borderColor: GRADE_COLORS[g as Grade].bg }
                      : {}
                  }
                  onClick={() => setFilterGrade(g)}
                >
                  {g === 'all' ? 'All' : g}
                </button>
              ))}
            </div>
            <div className="seo-filter-group">
              <span className="seo-filter-label">Status</span>
              {(['all', 'live', 'issues', 'down'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`btn seo-filter-btn${filterStatus === s ? ' seo-filter-active' : ''}`}
                  onClick={() => setFilterStatus(s)}
                >
                  {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <div className="seo-filter-group seo-sort-group">
              <span className="seo-filter-label">Sort</span>
              {(
                [
                  ['score', 'Score'],
                  ['grade', 'Grade'],
                  ['name', 'Name'],
                  ['lastAudited', 'Audited'],
                ] as [SortKey, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={`btn seo-filter-btn${sortKey === key ? ' seo-filter-active' : ''}`}
                  onClick={() => toggleSort(key)}
                >
                  {label}
                  {sortKey === key && <span className="seo-sort-arrow">{sortAsc ? ' ↑' : ' ↓'}</span>}
                </button>
              ))}
            </div>
          </div>

          <p className="seo-result-count">
            Showing {displayed.length} of {AUDIT_SITES.length} sites
          </p>

          <div className="seo-grid">
            {displayed.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>

          {displayed.length === 0 && (
            <p className="seo-empty">No sites match the current filters.</p>
          )}
        </div>
      </section>
    </>
  );
}
