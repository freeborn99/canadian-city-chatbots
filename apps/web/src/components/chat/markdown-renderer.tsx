'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  accentClass?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-invert prose-slate max-w-none text-sm md:text-base leading-relaxed break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-3 last:mb-0 text-slate-200">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
          ul: ({ children }) => <ul className="my-2 ml-4 list-disc space-y-1 text-slate-300">{children}</ul>,
          ol: ({ children }) => <ol className="my-2 ml-4 list-decimal space-y-1 text-slate-300">{children}</ol>,
          li: ({ children }) => <li className="pl-1">{children}</li>,
          h1: ({ children }) => <h1 className="text-xl font-bold mt-4 mb-2 text-white">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-semibold mt-3 mb-2 text-white">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-semibold mt-2 mb-1 text-white">{children}</h3>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-cyan-500/50 bg-slate-800/30 px-3 py-1.5 rounded-r my-2 text-slate-300 italic">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !String(children).includes('\n');
            if (isInline) {
              return (
                <code className="bg-slate-800 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-slate-900/90 border border-slate-700/50 rounded-lg p-3 my-2 overflow-x-auto text-xs font-mono text-slate-200">
                <code>{children}</code>
              </pre>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-200 underline decoration-cyan-500/40 hover:decoration-cyan-400 underline-offset-4 transition-all group bg-cyan-950/30 hover:bg-cyan-900/40 px-1.5 py-0.5 rounded-md border border-cyan-800/30 hover:border-cyan-700/50"
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
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-3 rounded-lg border border-slate-800">
              <table className="min-w-full divide-y divide-slate-800 text-left text-xs md:text-sm">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="bg-slate-800/60 px-3 py-2 text-slate-200 font-semibold">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 border-t border-slate-800/60 text-slate-300">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
