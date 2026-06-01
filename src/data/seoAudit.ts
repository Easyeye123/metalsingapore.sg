/**
 * Ezzogenics group SEO audit data.
 * Scores: 0–100. Grade thresholds: A ≥85 / B ≥70 / C ≥55 / D ≥40 / F <40.
 * Replace with live FastAPI endpoint data; shape must match SiteAudit.
 */

export type Grade = 'A' | 'B' | 'C' | 'D' | 'F';
export type SiteStatus = 'live' | 'issues' | 'down';

export interface CategoryScores {
  technical: number;
  onPage: number;
  performance: number;
  mobile: number;
  links: number;
}

export interface SiteIssues {
  critical: number;
  warnings: number;
  notices: number;
}

export interface SiteAudit {
  id: string;
  name: string;
  url: string;
  category: string;
  grade: Grade;
  score: number;
  scores: CategoryScores;
  issues: SiteIssues;
  status: SiteStatus;
  lastAudited: string;
}

export function scoreToGrade(score: number): Grade {
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  if (score >= 55) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}

export const AUDIT_SITES: SiteAudit[] = [
  {
    id: 'ezzogenics-com',
    name: 'Ezzogenics Pte Ltd',
    url: 'https://ezzogenics.com',
    category: 'Group Hub',
    grade: 'A',
    score: 91,
    scores: { technical: 94, onPage: 92, performance: 88, mobile: 91, links: 90 },
    issues: { critical: 0, warnings: 3, notices: 8 },
    status: 'live',
    lastAudited: '2026-05-28',
  },
  {
    id: 'metalsingapore-sg',
    name: 'MetalSingapore.sg',
    url: 'https://metalsingapore.sg',
    category: 'Metal Works',
    grade: 'A',
    score: 87,
    scores: { technical: 91, onPage: 88, performance: 85, mobile: 87, links: 84 },
    issues: { critical: 0, warnings: 5, notices: 11 },
    status: 'live',
    lastAudited: '2026-05-28',
  },
  {
    id: 'workatheight-sg',
    name: 'Work at Height SG',
    url: 'https://workatheight.sg',
    category: 'Work at Height',
    grade: 'B',
    score: 79,
    scores: { technical: 82, onPage: 80, performance: 74, mobile: 79, links: 80 },
    issues: { critical: 1, warnings: 9, notices: 14 },
    status: 'live',
    lastAudited: '2026-05-27',
  },
  {
    id: 'rope-access-singapore-com',
    name: 'Rope Access Singapore',
    url: 'https://rope-access-singapore.com',
    category: 'Work at Height',
    grade: 'B',
    score: 76,
    scores: { technical: 79, onPage: 77, performance: 71, mobile: 76, links: 77 },
    issues: { critical: 1, warnings: 11, notices: 16 },
    status: 'live',
    lastAudited: '2026-05-27',
  },
  {
    id: 'glassexpertsingapore-com',
    name: 'Glass Expert Singapore',
    url: 'https://glassexpertsingapore.com',
    category: 'Glass',
    grade: 'B',
    score: 72,
    scores: { technical: 75, onPage: 73, performance: 68, mobile: 72, links: 72 },
    issues: { critical: 2, warnings: 13, notices: 19 },
    status: 'live',
    lastAudited: '2026-05-26',
  },
  {
    id: 'metalglasswork-com',
    name: 'Metal & Glass Work Singapore',
    url: 'https://metalglassworksingapore.com',
    category: 'Metal & Glass',
    grade: 'C',
    score: 64,
    scores: { technical: 67, onPage: 65, performance: 59, mobile: 63, links: 66 },
    issues: { critical: 3, warnings: 17, notices: 22 },
    status: 'live',
    lastAudited: '2026-05-26',
  },
  {
    id: 'flooringsg-sg',
    name: 'Flooring Singapore',
    url: 'https://flooringsingapore.sg',
    category: 'Flooring',
    grade: 'C',
    score: 61,
    scores: { technical: 64, onPage: 62, performance: 55, mobile: 60, links: 64 },
    issues: { critical: 3, warnings: 19, notices: 25 },
    status: 'issues',
    lastAudited: '2026-05-25',
  },
  {
    id: 'commercialreno-sg',
    name: 'Commercial Renovation SG',
    url: 'https://commercialrenovation.sg',
    category: 'Renovation',
    grade: 'C',
    score: 58,
    scores: { technical: 60, onPage: 59, performance: 53, mobile: 57, links: 61 },
    issues: { critical: 4, warnings: 21, notices: 28 },
    status: 'live',
    lastAudited: '2026-05-24',
  },
  {
    id: 'waterproofing-sg',
    name: 'Waterproofing Contractor SG',
    url: 'https://waterproofingcontractorsg.com',
    category: 'Waterproofing',
    grade: 'D',
    score: 51,
    scores: { technical: 53, onPage: 52, performance: 46, mobile: 50, links: 54 },
    issues: { critical: 5, warnings: 26, notices: 33 },
    status: 'issues',
    lastAudited: '2026-05-23',
  },
  {
    id: 'facaderestoration-sg',
    name: 'Facade Restoration Singapore',
    url: 'https://facaderestorationsingapore.com',
    category: 'Facade',
    grade: 'D',
    score: 47,
    scores: { technical: 49, onPage: 48, performance: 42, mobile: 46, links: 50 },
    issues: { critical: 6, warnings: 29, notices: 37 },
    status: 'live',
    lastAudited: '2026-05-22',
  },
  {
    id: 'scaffolding-sg',
    name: 'Scaffolding SG',
    url: 'https://scaffoldingsg.com',
    category: 'Access',
    grade: 'D',
    score: 44,
    scores: { technical: 46, onPage: 45, performance: 39, mobile: 43, links: 47 },
    issues: { critical: 7, warnings: 31, notices: 40 },
    status: 'issues',
    lastAudited: '2026-05-21',
  },
  {
    id: 'paintingcontractor-sg',
    name: 'Painting Contractor SG',
    url: 'https://paintingcontractorsg.com',
    category: 'Painting',
    grade: 'F',
    score: 36,
    scores: { technical: 38, onPage: 37, performance: 31, mobile: 35, links: 39 },
    issues: { critical: 9, warnings: 38, notices: 47 },
    status: 'issues',
    lastAudited: '2026-05-20',
  },
  {
    id: 'ceilingspecialist-sg',
    name: 'Ceiling Specialist SG',
    url: 'https://ceilingspecialistsg.com',
    category: 'Interior',
    grade: 'F',
    score: 29,
    scores: { technical: 31, onPage: 30, performance: 24, mobile: 28, links: 32 },
    issues: { critical: 12, warnings: 44, notices: 55 },
    status: 'down',
    lastAudited: '2026-05-19',
  },
  {
    id: 'civilworks-sg',
    name: 'Civil Works Singapore',
    url: 'https://civilworkssingapore.com',
    category: 'Civil',
    grade: 'F',
    score: 22,
    scores: { technical: 24, onPage: 23, performance: 17, mobile: 21, links: 25 },
    issues: { critical: 15, warnings: 51, notices: 62 },
    status: 'down',
    lastAudited: '2026-05-18',
  },
];
