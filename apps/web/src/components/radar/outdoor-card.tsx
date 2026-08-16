'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trees, MapPin, Compass, Bookmark, Clock, Share2 } from 'lucide-react';
import { OutdoorPark } from '@/lib/city-data';
import { useAuth } from '@/lib/auth-context';

interface OutdoorCardProps {
  park: OutdoorPark;
  accentClass: string;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onAskAI?: (prompt: string) => void;
}

export const OutdoorCard: React.FC<OutdoorCardProps> = ({
  park,
  accentClass,
  isSaved,
  onToggleSave,
  onAskAI,
}) => {
  const { openShareModal } = useAuth();
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl glass-card border border-slate-800/90 hover:border-slate-700/80 p-3.5 shadow-xl transition-all group overflow-hidden"
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300">
          {park.category}
        </span>
        <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-300">
          {park.difficulty}
        </span>
      </div>

      <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors mb-1">
        {park.name}
      </h4>

      <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-2">
        <MapPin className="w-3 h-3 text-cyan-400 flex-shrink-0" />
        <span className="truncate">{park.neighborhood}</span>
      </div>

      {/* Feature tags */}
      <div className="flex flex-wrap gap-1 mb-2.5">
        {park.features.map((feature) => (
          <span
            key={feature}
            className="text-[9px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-medium"
          >
            {feature}
          </span>
        ))}
      </div>

      {/* Parking & Best time advice */}
      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/60 mb-3 space-y-1 text-xs">
        <div className="flex items-center gap-1 text-slate-400 text-[10px]">
          <Compass className="w-3 h-3 text-cyan-400" />
          <span>{park.distanceOrSize}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 text-[10px]">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>{park.bestTime}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
        <button
          onClick={() =>
            onAskAI?.(`What are the best viewpoints, parking tips, and trail tips for ${park.name}?`)
          }
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-gradient-to-r ${accentClass} text-white font-semibold text-xs shadow-md hover:opacity-95 transition-opacity`}
        >
          <Trees className="w-3.5 h-3.5" />
          <span>Explore Trail Guide</span>
        </button>

        <button
          onClick={() => openShareModal({ 
            title: park.name, 
            text: `Check out ${park.name} in ${park.neighborhood}!`,
            url: window.location.href 
          })}
          className="p-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
          title="Share"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>

        {onToggleSave && (
          <button
            onClick={onToggleSave}
            className="p-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-300 transition-colors"
            title="Save Park"
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
