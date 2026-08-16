import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ArrowRight, Share2 } from 'lucide-react';
import { NewsHeadline } from '@/lib/city-data';
import { CityTenant } from '@/lib/tenants';
import { useAuth } from '@/lib/auth-context';

interface LiveCivicFeedProps {
  tenant: CityTenant;
  news: NewsHeadline[];
}

export const LiveCivicFeed: React.FC<LiveCivicFeedProps> = ({ tenant, news }) => {
  const { openShareModal } = useAuth();

  if (!news || news.length === 0) return null;

  return (
    <div className="w-full mb-8">
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-red-500/20 text-red-400">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
        </div>
        <h2 className="text-sm font-bold text-white tracking-wide uppercase">Live Civic Feed</h2>
        <span className="text-xs text-slate-500 ml-auto">Updated recently</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.slice(0, 4).map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative flex flex-col bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800/60 rounded-2xl overflow-hidden transition-all duration-300"
          >
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  item.category === 'Civic' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {item.category}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">{item.timeAgo} • {item.source}</span>
              </div>
              
              <h3 className="text-sm sm:text-base font-bold text-white leading-snug mb-2 group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-4 flex-1">
                {item.summary}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 mt-auto">
                <button 
                  onClick={() => openShareModal({ title: item.title, text: item.summary, url: item.url })}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>Read Full</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
