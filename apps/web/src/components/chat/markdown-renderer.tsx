'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { buildAffiliateUrl, inferPlatformFromUrl } from '@/lib/affiliate-config';
import { TransitWidget, TransitItinerary } from './transit-widget';

interface MarkdownRendererProps {
  content: string;
  accentClass?: string;
  tenantId?: string;
}

function tryParseTransit(raw: string, tenantId: string): TransitItinerary | null {
  try {
    const trimmed = raw.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      const parsed = JSON.parse(trimmed);
      if (parsed.origin && parsed.destination && Array.isArray(parsed.steps)) {
        return { ...parsed, cityId: parsed.cityId || tenantId };
      }
    }
  } catch {
    // Partial JSON during streaming
  }
  return null;
}

/**
 * Safely normalize markdown spacing WITHOUT breaking tables or code blocks.
 * Splits content into protected blocks (tables, code) vs prose, only modifying prose.
 */
function normalizeMarkdown(content: string): string {
  if (!content) return '';

  const normalized = content.replace(/\r\n/g, '\n');

  // Split the content preserving code blocks and table blocks
  // We identify tables as consecutive lines that contain pipes |
  const lines = normalized.split('\n');
  const result: string[] = [];
  let inCodeBlock = false;
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Track code block boundaries
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }

    // Don't modify anything inside code blocks
    if (inCodeBlock) {
      result.push(line);
      continue;
    }

    // Detect table rows (lines with | characters that aren't just standalone |)
    const isTableRow = /\|.*\|/.test(trimmed);
    const isTableSeparator = /^\|?[\s\-:|]+\|/.test(trimmed);

    if (isTableRow || isTableSeparator) {
      // If we just entered the table, add a blank line before for remark-gfm
      if (!inTable && result.length > 0 && result[result.length - 1].trim() !== '') {
        result.push('');
      }
      inTable = true;
      result.push(line);
      continue;
    }

    // If we just left a table, add a blank line after
    if (inTable && !isTableRow && !isTableSeparator) {
      inTable = false;
      if (result.length > 0 && result[result.length - 1].trim() !== '') {
        result.push('');
      }
    }

    // For normal prose lines, apply spacing fixes
    let processed = line;

    // Ensure headers have preceding blank line
    if (/^#{1,4}\s/.test(trimmed) && result.length > 0 && result[result.length - 1].trim() !== '') {
      result.push('');
    }

    result.push(processed);
  }

  return result.join('\n');
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, tenantId = 'yyc' }) => {
  const formattedContent = React.useMemo(() => normalizeMarkdown(content), [content]);

  return (
    <div className="prose prose-invert prose-slate max-w-none text-sm md:text-base leading-relaxed break-words space-y-2.5">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-2.5 last:mb-0 text-slate-200 leading-relaxed">{children}</p>,
          strong: ({ children }) => <strong className="font-bold text-white tracking-wide">{children}</strong>,
          em: ({ children }) => <em className="text-slate-300 italic">{children}</em>,
          ul: ({ children }) => <ul className="my-2.5 ml-4 list-disc space-y-1.5 text-slate-200">{children}</ul>,
          ol: ({ children }) => <ol className="my-2.5 ml-4 list-decimal space-y-1.5 text-slate-200">{children}</ol>,
          li: ({ children }) => <li className="pl-1 leading-relaxed">{children}</li>,
          h1: ({ children }) => <h1 className="text-xl font-extrabold mt-4 mb-2.5 text-white border-b border-slate-800 pb-1.5">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-bold mt-3.5 mb-2 text-cyan-300">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-bold mt-3 mb-1.5 text-white flex items-center gap-2">{children}</h3>,
          h4: ({ children }) => <h4 className="text-sm font-bold mt-2.5 mb-1 text-slate-200">{children}</h4>,
          hr: () => (
            <div className="my-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
              <span className="text-slate-600 text-[10px]">•</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            </div>
          ),
          blockquote: ({ children }) => (
            <div className="my-3 p-4 rounded-xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-l-4 border-cyan-500/60 shadow-inner">
              <div className="text-slate-300 leading-relaxed italic">{children}</div>
            </div>
          ),
          img: ({ src, alt }) => (
            <figure className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-lg bg-slate-900/50">
              <img src={src} alt={alt || ''} className="w-full max-h-80 object-cover" loading="lazy" />
              {alt && <figcaption className="text-xs text-slate-400 text-center py-2 bg-slate-900/60 border-t border-slate-800/50">{alt}</figcaption>}
            </figure>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-([\w-]+)/.exec(className || '');
            const lang = match ? match[1].toLowerCase() : '';
            const rawContent = String(children);

            // 🚇 Render Interactive Transit Itinerary Widget
            if (lang === 'transit' || lang === 'transit-itinerary' || lang === 'transit-route') {
              const transitData = tryParseTransit(rawContent, tenantId);
              if (transitData) {
                return <TransitWidget data={transitData} />;
              }
            }

            // 📰 Render News Card Widget
            if (lang === 'news-card') {
              try {
                const data = JSON.parse(rawContent.trim());
                return (
                  <div className="my-4 rounded-xl border border-slate-700/80 bg-gradient-to-b from-slate-800/60 to-slate-900/80 overflow-hidden shadow-lg hover:shadow-cyan-900/20 transition-all">
                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs">
                        {data.category && (
                          <span className="bg-cyan-900/60 text-cyan-200 px-2 py-0.5 rounded-full border border-cyan-700/50">
                            {data.category}
                          </span>
                        )}
                        <span className="text-slate-400 flex items-center gap-1.5">
                          {data.source && <span className="font-semibold text-slate-300">{data.source}</span>}
                          {data.timeAgo && <span>• {data.timeAgo}</span>}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white leading-snug">{data.title}</h4>
                      <p className="text-sm text-slate-300 line-clamp-2">{data.summary}</p>
                      {data.url && (
                        <div className="mt-2 pt-2 border-t border-slate-700/50">
                          <a href={data.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold flex items-center gap-1 group w-max">
                            Read Full <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              } catch {
                // Ignore partial JSON
              }
            }

            const isInline = !match && !rawContent.includes('\n');
            if (isInline) {
              return (
                <code className="bg-slate-800/80 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-700/60" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-3.5 my-3 overflow-x-auto text-xs font-mono text-slate-200">
                <code>{children}</code>
              </pre>
            );
          },
          a: ({ href, children }) => {
            let finalUrl = href || '#';
            let isExternal = false;
            
            if (href) {
              const platform = inferPlatformFromUrl(href);
              if (platform !== 'Direct') {
                finalUrl = buildAffiliateUrl(href, platform, tenantId);
              }
              isExternal = href.startsWith('http');
            }

            return (
              <a
                href={finalUrl}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-medium transition-colors group"
              >
                <span>{children}</span>
                {isExternal && (
                  <svg
                    className="w-2.5 h-2.5 opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                )}
              </a>
            );
          },
          table: ({ children }) => (
            <div className="my-4 flex flex-col gap-1">
              <div className="overflow-x-auto rounded-xl border border-slate-700/60 shadow-lg">
                <table className="w-full text-left text-sm">
                  {children}
                </table>
              </div>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gradient-to-r from-slate-800 to-slate-800/90">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="even:bg-slate-800/20 hover:bg-slate-800/40 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="text-[11px] uppercase tracking-wider font-bold text-cyan-300 px-3 py-2.5 border-b border-slate-700/60 whitespace-nowrap">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-slate-200 text-sm">
              {children}
            </td>
          ),
        }}
      >
        {formattedContent}
      </ReactMarkdown>
    </div>
  );
};
