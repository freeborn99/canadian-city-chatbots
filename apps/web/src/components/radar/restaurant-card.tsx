'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, ExternalLink, UtensilsCrossed, Clock } from 'lucide-react';
import { RestaurantHighlight } from '@/lib/city-data';
import { buildAffiliateUrl } from '@/lib/affiliate-config';
import { ShareButton } from '../social/share-button';

interface RestaurantCardProps {
  restaurant: RestaurantHighlight;
  accentClass: string;
  tenantId?: string;
  onAskAboutRestaurant: (name: string) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  accentClass,
  tenantId = 'yyc',
  onAskAboutRestaurant,
}) => {
  const affiliateUrl = buildAffiliateUrl(restaurant.reservationUrl, restaurant.bookingPlatform, tenantId);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -2 }}
      className="relative rounded-2xl glass-card border border-slate-800/90 hover:border-slate-700/80 p-4 shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Top Header & Tag */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-700/50 text-cyan-300">
              {restaurant.tag}
            </span>
            <span className="text-xs text-slate-400 font-mono font-medium">
              {restaurant.priceLevel}
            </span>
          </div>
          <h4 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
            {restaurant.name}
          </h4>
        </div>

        <div className="flex items-center gap-1 bg-amber-950/50 border border-amber-800/40 px-2 py-0.5 rounded-md text-amber-300 text-xs font-semibold">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{restaurant.rating}</span>
        </div>
      </div>

      {/* Cuisine & Neighborhood */}
      <p className="text-xs text-slate-300 mb-2">{restaurant.cuisine}</p>

      <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-3">
        <MapPin className="w-3 h-3 text-cyan-400 flex-shrink-0" />
        <span className="truncate">{restaurant.neighborhood}</span>
      </div>

      {/* Signature Dish Pill */}
      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 mb-3 text-xs flex items-start gap-2">
        <UtensilsCrossed className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="text-slate-400 text-[10px] uppercase tracking-wide block font-semibold">
            Signature Dish:
          </span>
          <span className="text-slate-200 font-medium">{restaurant.signatureDish}</span>
        </div>
      </div>

      {/* Live Available Reservation Slots */}
      <div className="mb-3.5">
        <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-1.5">
          <Clock className="w-3 h-3 text-emerald-400" />
          <span className="font-medium text-slate-300">Available Reso Times:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {restaurant.availableTimes.map((time) => (
            <span
              key={time}
              className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 font-mono"
            >
              {time}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r ${accentClass} text-white font-semibold text-xs shadow-md hover:opacity-95 transition-opacity`}
        >
          <span>Book on {restaurant.bookingPlatform}</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        <button
          onClick={() => onAskAboutRestaurant(restaurant.name)}
          className="py-2 px-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
          title="Ask Assistant about this spot"
        >
          Ask AI
        </button>
        <ShareButton
          url={affiliateUrl}
          title={restaurant.name}
          text={restaurant.signatureDish}
        />
      </div>
    </motion.div>
  );
};
