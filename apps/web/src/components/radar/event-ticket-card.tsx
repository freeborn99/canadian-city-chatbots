'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, MapPin, Calendar, ExternalLink, Sparkles } from 'lucide-react';
import { ShowHighlight } from '@/lib/city-data';
import { buildAffiliateUrl } from '@/lib/affiliate-config';

interface EventTicketCardProps {
  show: ShowHighlight;
  accentClass: string;
  tenantId?: string;
  onAskAboutShow: (title: string) => void;
}

export const EventTicketCard: React.FC<EventTicketCardProps> = ({
  show,
  accentClass,
  tenantId = 'yyc',
  onAskAboutShow,
}) => {
  const affiliateUrl = buildAffiliateUrl(show.ticketUrl, show.ticketPlatform, tenantId);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -2 }}
      className="relative rounded-2xl glass-card border border-slate-800/90 hover:border-slate-700/80 p-4 shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Category Pill & Status */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-950/60 border border-violet-700/50 text-violet-300">
          {show.category}
        </span>

        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-950/50 border border-rose-800/40 text-rose-300">
          <Sparkles className="w-2.5 h-2.5" />
          {show.availabilityStatus}
        </span>
      </div>

      {/* Show Title */}
      <h4 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors mb-1.5 line-clamp-2">
        {show.title}
      </h4>

      {/* Venue & Dates */}
      <div className="space-y-1 mb-3 text-xs text-slate-300">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          <span className="truncate">{show.venue}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{show.dates}</span>
        </div>
      </div>

      {/* Price Badge */}
      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 mb-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <Ticket className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-400 font-medium">Tickets from:</span>
        </div>
        <span className="font-bold text-white text-sm font-mono">{show.ticketPriceRange}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r ${accentClass} text-white font-semibold text-xs shadow-md hover:opacity-95 transition-opacity`}
        >
          <span>Get Tickets ({show.ticketPlatform})</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        <button
          onClick={() => onAskAboutShow(show.title)}
          className="py-2 px-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
          title="Ask Assistant for show details"
        >
          Ask AI
        </button>
      </div>
    </motion.div>
  );
};
