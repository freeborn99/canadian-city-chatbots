import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ArrowRight, Share2, Clock, Sparkles, ExternalLink } from 'lucide-react';
import { NewsHeadline } from '@/lib/city-data';
import { CityTenant } from '@/lib/tenants';
import { useAuth } from '@/lib/auth-context';

interface LiveCivicFeedProps {
  tenant: CityTenant;
  news: NewsHeadline[];
  onOpenArticle?: (article: NewsHeadline) => void;
  lastRefreshedAt?: number;
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Civic': return 'bg-blue-500/15 text-blue-400 border border-blue-500/25';
    case 'Business': return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25';
    case 'Culture': return 'bg-purple-500/15 text-purple-400 border border-purple-500/25';
    case 'Development': return 'bg-amber-500/15 text-amber-400 border border-amber-500/25';
    case 'Regional': return 'bg-teal-500/15 text-teal-400 border border-teal-500/25';
    case 'Sports': return 'bg-red-500/15 text-red-400 border border-red-500/25';
    case 'Technology': return 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25';
    case 'Government': return 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/25';
    case 'Energy': return 'bg-orange-500/15 text-orange-400 border border-orange-500/25';
    case 'Finance': return 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25';
    case 'Maritime': return 'bg-sky-500/15 text-sky-400 border border-sky-500/25';
    case 'Aerospace': return 'bg-violet-500/15 text-violet-400 border border-violet-500/25';
    case 'Agriculture': return 'bg-lime-500/15 text-lime-400 border border-lime-500/25';
    case 'Policy': return 'bg-slate-500/15 text-slate-300 border border-slate-500/25';
    case 'Industry': return 'bg-zinc-500/15 text-zinc-300 border border-zinc-500/25';
    case 'Logistics': return 'bg-fuchsia-500/15 text-fuchsia-400 border border-fuchsia-500/25';
    case 'Healthcare': return 'bg-rose-500/15 text-rose-400 border border-rose-500/25';
    case 'Environment': return 'bg-green-500/15 text-green-400 border border-green-500/25';
    case 'Education': return 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25';
    default: return 'bg-slate-500/15 text-slate-400 border border-slate-500/25';
  }
}

export const LiveCivicFeed: React.FC<LiveCivicFeedProps> = ({ tenant, news, onOpenArticle, lastRefreshedAt }) => {
  const { openShareModal } = useAuth();

  const minutesAgo = useMemo(() => {
    if (!lastRefreshedAt) return null;
    return Math.max(0, Math.floor((Date.now() - lastRefreshedAt) / 60000));
  }, [lastRefreshedAt]);

  if (!news || news.length === 0) return null;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  } as const;

  const cardVariant = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  const [heroStory, ...remainingStories] = news;
  const gridStories = remainingStories.slice(0, 5);

  return (
    <div className="w-full mb-8 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-red-500/20 text-red-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
          </div>
          <h2 className="text-sm font-bold text-white tracking-wide uppercase">Live Civic Feed</h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {lastRefreshedAt ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <Clock className="w-3 h-3" />
              <span>{minutesAgo === 0 ? 'Just now' : `${minutesAgo} min ago`}</span>
            </>
          ) : (
            <span>Updated recently</span>
          )}
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
        {/* Hero Card — Top Story */}
        {heroStory && (
          <motion.div
            variants={cardVariant}
            onClick={() => onOpenArticle?.(heroStory)}
            className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/60 hover:from-slate-800/90 hover:to-slate-700/60 border border-slate-700/60 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer shadow-lg hover:shadow-cyan-900/20"
          >
            <div className="p-5 md:p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${getCategoryColor(heroStory.category)}`}>
                  {heroStory.category}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">{heroStory.timeAgo} • {heroStory.source}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 ml-auto" />
              </div>

              <h3 className="text-lg md:text-xl font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
                {heroStory.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {heroStory.summary}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-700/50 mt-1">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    <span>Read Briefing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); openShareModal({ title: heroStory.title, text: heroStory.summary, url: heroStory.url }); }}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid Cards */}
        {gridStories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {gridStories.map((story) => (
              <motion.div
                key={story.id}
                variants={cardVariant}
                onClick={() => onOpenArticle?.(story)}
                className="group relative flex flex-col bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800/60 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
              >
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${getCategoryColor(story.category)}`}>
                      {story.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">{story.timeAgo}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white leading-snug mb-1.5 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {story.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3 flex-1">
                    {story.summary}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 mt-auto">
                    <span className="text-[10px] text-slate-500 font-medium">{story.source}</span>
                    <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
