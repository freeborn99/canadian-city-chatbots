'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bed, Star, MapPin, ExternalLink, Bookmark } from 'lucide-react';
import { HotelStay } from '@/lib/city-data';

interface HotelCardProps {
  hotel: HotelStay;
  accentClass: string;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onAskAI?: (prompt: string) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  accentClass,
  isSaved,
  onToggleSave,
  onAskAI,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl glass-card border border-slate-800/90 hover:border-slate-700/80 p-3.5 shadow-xl transition-all group overflow-hidden"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300">
              {hotel.tag}
            </span>
          </div>
          <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
            {hotel.name}
          </h4>
        </div>

        <div className="flex items-center gap-1 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-md text-amber-300 text-xs font-semibold">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{hotel.rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-2">
        <MapPin className="w-3 h-3 text-cyan-400 flex-shrink-0" />
        <span className="truncate">{hotel.neighborhood}</span>
      </div>

      <p className="text-xs text-slate-300 mb-2.5 leading-relaxed">
        {hotel.description}
      </p>

      {/* Amenities Pills */}
      <div className="flex flex-wrap gap-1 mb-3">
        {hotel.amenities.map((amenity) => (
          <span
            key={amenity}
            className="text-[9px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-medium"
          >
            {amenity}
          </span>
        ))}
      </div>

      {/* Price & Booking Button */}
      <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800/80 mb-3 flex items-center justify-between text-xs">
        <span className="text-slate-400 text-[11px]">Nightly Rate:</span>
        <span className="font-bold text-white font-mono text-sm">{hotel.pricePerNight}</span>
      </div>

      <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
        <a
          href={hotel.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-gradient-to-r ${accentClass} text-white font-semibold text-xs shadow-md hover:opacity-95 transition-opacity`}
        >
          <Bed className="w-3.5 h-3.5" />
          <span>Check Rates ({hotel.bookingPlatform})</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        {onToggleSave && (
          <button
            onClick={onToggleSave}
            className="p-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-300 transition-colors"
            title="Save Hotel"
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
