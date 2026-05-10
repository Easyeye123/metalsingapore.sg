import { useMemo } from 'react';

/**
 * Tiny, dependency-free Markdown renderer for our blog content.
 * Supports headings (#–####), paragraphs, ordered/unordered lists, fenced code,
 * tables, bold/italic/code, links and horizontal rules. Aims for safe HTML
 * output: angle brackets in raw text are escaped before any markup is added.
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function inline(s: string): string {
  let out = escapeHtml(s);
  // links [text](url)
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, txt, url) => {
    const safeUrl = String(url).replace(/"/g, '%22');
    return `<a href="${safeUrl}" rel="noopener">${txt}</a>`;
  });
  // bold **x**
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // italic *x*
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // inline code `x`
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  return out;
}

function renderTable(lines: string[]): string {
  // header | sep | rows
  if (lines.length < 2) return '';
  const header = lines[0].split('|').map((c) => c.trim()).filter((c, i, arr) => i > 0 && i < arr.length - 1 || c);
  const cleaned = (l: string) => l.split('|').map((c) => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);
  const rows = lines.slice(2).map(cleaned);
  let html = '<table><thead><tr>';
  for (const h of cleaned(lines[0])) html += `<th>${inline(h)}</th>`;
  html += '</tr></thead><tbody>';
  for (const r of rows) {
    html += '<tr>';
    for (const c of r) html += `<td>${inline(c)}</td>`;
    html += '</tr>';
  }
  html += '</tbody></table>';
  return html;
  void header; // appease eslint
}

export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (/^---\s*$/.test(line)) { out.push('<hr/>'); i++; continue; }
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) { const lvl = h[1].length + 1; out.push(`<h${lvl}>${inline(h[2])}</h${lvl}>`); i++; continue; }

    // fenced code
    if (/^```/.test(line)) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++; // close
      out.push(`<pre><code>${escapeHtml(buf.join('\n'))}</code></pre>`);
      continue;
    }

    // table block
    if (/^\|.*\|$/.test(line) && i + 1 < lines.length && /^\|?\s*[:-]+\s*\|/.test(lines[i + 1])) {
      const buf: string[] = [];
      while (i < lines.length && /^\|.*\|$/.test(lines[i])) { buf.push(lines[i]); i++; }
      out.push(renderTable(buf));
      continue;
    }

    // unordered list
    if (/^[-*]\s+/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) { buf.push(lines[i].replace(/^[-*]\s+/, '')); i++; }
      out.push(`<ul>${buf.map((l) => `<li>${inline(l)}</li>`).join('')}</ul>`);
      continue;
    }
    // ordered list
    if (/^\d+\.\s+/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) { buf.push(lines[i].replace(/^\d+\.\s+/, '')); i++; }
      out.push(`<ol>${buf.map((l) => `<li>${inline(l)}</li>`).join('')}</ol>`);
      continue;
    }

    if (line.trim() === '') { i++; continue; }

    // paragraph: collect until blank line
    const para: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== '' && !/^[#`>\-*\d|]/.test(lines[i])) {
      para.push(lines[i]); i++;
    }
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return out.join('\n');
}

export default function Markdown({ source }: { source: string }) {
  const html = useMemo(() => renderMarkdown(source), [source]);
  return <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
}
