'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Clock, Compass, ShieldCheck, MessageSquare, Share2 } from 'lucide-react';
import { NewsHeadline } from '@/lib/city-data';
import { MarkdownRenderer } from '@/components/chat/markdown-renderer';
import { useAuth } from '@/lib/auth-context';
import { getCanonicalArticleUrl } from '@/lib/utils';

interface NewsExpandedModalProps {
  article: NewsHeadline | null;
  onClose: () => void;
  accentClass: string;
  onAskAI: (prompt: string) => void;
}

export const NewsExpandedModal: React.FC<NewsExpandedModalProps> = ({
  article,
  onClose,
  accentClass,
  onAskAI,
}) => {
  if (!article) return null;

  const { openShareModal } = useAuth();
  const { expandedDetails } = article;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto glass-panel rounded-3xl border border-slate-700/80 shadow-2xl p-5 md:p-6 z-10 space-y-4"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300">
                  {article.category}
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  {article.source}
                </span>
                <span className="text-slate-500 text-xs">• {article.timeAgo}</span>
              </div>

              <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                {article.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex-shrink-0"
              title="Close briefing"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* AI Executive Summary */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Executive Briefing</span>
            </div>
            <MarkdownRenderer content={article.summary} />
          </div>

          {/* Key Takeaways */}
          {expandedDetails?.keyTakeaways && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Key Facts & Takeaways</span>
              </h4>
              <ul className="space-y-1.5 pl-2 text-xs md:text-sm text-slate-300">
                {expandedDetails.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resident Impact */}
          {expandedDetails?.localImpact && (
            <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-800/40 text-xs space-y-1">
              <span className="text-amber-300 font-bold uppercase tracking-wide text-[10px] block">
                🏙️ What This Means For Locals:
              </span>
              <p className="text-slate-200 leading-relaxed">
                {expandedDetails.localImpact}
              </p>
            </div>
          )}

          {/* Timeline */}
          {expandedDetails?.timeline && (
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
              <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{expandedDetails.timeline}</span>
            </div>
          )}

          {/* Ethical Legal Notice & Direct Canonical Source Link */}
          <div className="pt-3 border-t border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Fair Dealing Summary • Verified Attribution</span>
              <span className="font-semibold text-slate-400">{article.source}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={getCanonicalArticleUrl(article.url, article.title, article.source)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r ${accentClass} text-white font-semibold text-xs shadow-lg hover:opacity-95 transition-all`}
              >
                <span>Read Full Story on {article.source}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {expandedDetails?.relatedActionUrl && (
                <a
                  href={expandedDetails.relatedActionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors"
                >
                  <span>{expandedDetails.relatedActionText || 'Civic Link'}</span>
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                </a>
              )}

              <button
                onClick={() => openShareModal({ 
                  title: article.title, 
                  text: article.summary,
                  url: window.location.href 
                })}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-colors"
                title="Share this story"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  onAskAI(`Tell me more about "${article.title}" and its history in the city.`);
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                title="Ask Assistant about this news story"
              >
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ask AI</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
