'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Star, Clock, ExternalLink, Bookmark } from 'lucide-react';
import { TourExperience } from '@/lib/city-data';
import { buildAffiliateUrl } from '@/lib/affiliate-config';

interface ExperienceCardProps {
  experience: TourExperience;
  accentClass: string;
  tenantId?: string;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onAskAI?: (prompt: string) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  accentClass,
  tenantId = 'yyc',
  isSaved,
  onToggleSave,
  onAskAI,
}) => {
  const affiliateUrl = buildAffiliateUrl(experience.bookingUrl, experience.bookingPlatform, tenantId);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl glass-card border border-slate-800/90 hover:border-slate-700/80 p-3.5 shadow-xl transition-all group overflow-hidden"
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300">
          {experience.category}
        </span>
        <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-300">
          {experience.badge}
        </span>
      </div>

      <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors mb-1">
        {experience.title}
      </h4>

      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
        <span className="truncate">By {experience.operator}</span>
        <div className="flex items-center gap-1 text-amber-300 font-semibold text-[11px]">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{experience.rating} ({experience.reviewCount})</span>
        </div>
      </div>

      {/* Highlights */}
      <div className="space-y-1 mb-2.5 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/60 text-xs">
        {experience.highlights.map((item, idx) => (
          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 flex-shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Duration & Price */}
      <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800/80 mb-3 flex items-center justify-between text-xs">
        <span className="text-slate-400 text-[11px] flex items-center gap-1">
          <Clock className="w-3 h-3 text-cyan-400" />
          <span>{experience.duration}</span>
        </span>
        <span className="font-bold text-white font-mono">{experience.priceFrom}</span>
      </div>

      <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-gradient-to-r ${accentClass} text-white font-semibold text-xs shadow-md hover:opacity-95 transition-opacity`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Book Tour ({experience.bookingPlatform})</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        {onToggleSave && (
          <button
            onClick={onToggleSave}
            className="p-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-300 transition-colors"
            title="Save Experience"
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`}
            />
          </button>
        )}
      </div>
    </motion.div>
  );
};
