'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { buildAffiliateUrl, inferPlatformFromUrl } from '@/lib/affiliate-config';

interface MarkdownRendererProps {
  content: string;
  accentClass?: string;
  tenantId?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, tenantId = 'yyc' }) => {
  // Normalize markdown text spacing so headers, lists, and bold callouts don't bunch up together
  const formattedContent = React.useMemo(() => {
    if (!content) return '';
    return content
      .replace(/\r\n/g, '\n')
      .replace(/\n(#{1,4}\s)/g, '\n\n$1')
      .replace(/\n(\*\*[^*]+:\*\*)/g, '\n\n$1')
      // Ensure double newline after a bold label if there isn't one already
      .replace(/(\*\*[^*]+:\*\*)\n(?!\n)/g, '$1\n\n')
      // Ensure double newlines around horizontal rules
      .replace(/\n(---|\*\*\*)\n/g, '\n\n$1\n\n')
      // Ensure bullet lists start on a new paragraph
      .replace(/\n(\s*[-*]\s)/g, '\n\n$1');
  }, [content]);

  return (
    <div className="prose prose-invert prose-slate max-w-none text-sm md:text-base leading-relaxed break-words space-y-3">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-3.5 last:mb-0 text-slate-200 leading-relaxed">{children}</p>,
          strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
          ul: ({ children }) => <ul className="my-3 ml-4 list-disc space-y-2 text-slate-200">{children}</ul>,
          ol: ({ children }) => <ol className="my-3 ml-4 list-decimal space-y-2 text-slate-200">{children}</ol>,
          li: ({ children }) => <li className="pl-1 leading-relaxed">{children}</li>,
          h1: ({ children }) => <h1 className="text-xl font-extrabold mt-5 mb-3 text-white border-b border-slate-800 pb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-bold mt-4 mb-2.5 text-cyan-300">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-bold mt-4 mb-2 text-white flex items-center gap-2">{children}</h3>,
          h4: ({ children }) => <h4 className="text-sm font-bold mt-3 mb-1.5 text-slate-200">{children}</h4>,
          hr: () => <hr className="my-4 border-slate-800/80" />,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-cyan-500/60 bg-slate-900/60 px-3.5 py-2 rounded-r-xl my-3 text-slate-300 italic">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !String(children).includes('\n');
            if (isInline) {
              return (
                <code className="bg-slate-850 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-750" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-slate-900/90 border border-slate-750 rounded-xl p-3.5 my-3 overflow-x-auto text-xs font-mono text-slate-200">
                <code>{children}</code>
              </pre>
            );
          },
          a: ({ href, children }) => {
            const finalUrl = href ? buildAffiliateUrl(href, inferPlatformFromUrl(href), tenantId) : '#';
            return (
              <a
                href={finalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-cyan-300 hover:text-white underline decoration-cyan-500/40 hover:decoration-cyan-400 underline-offset-4 transition-all group bg-cyan-950/40 hover:bg-cyan-900/50 px-1.5 py-0.5 rounded-md border border-cyan-800/40 hover:border-cyan-600/60 shadow-sm"
              >
                <span>{children}</span>
                <svg
                  className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0"
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
              </a>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-3.5 rounded-xl border border-slate-800">
              <table className="min-w-full divide-y divide-slate-800 text-left text-xs md:text-sm">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="bg-slate-850 px-3.5 py-2.5 text-slate-200 font-semibold">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-3.5 py-2.5 border-t border-slate-800/60 text-slate-300">{children}</td>
          ),
        }}
      >
        {formattedContent}
      </ReactMarkdown>
    </div>
  );
};
