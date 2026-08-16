'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Ticket, Train, PhoneCall, Flame, Newspaper } from 'lucide-react';
import { CityTenant } from '@/lib/tenants';

export type CivicCategory = 'all' | 'eats' | 'shows' | 'transit' | 'civic' | 'overview';

interface QuickCategoryBarProps {
  tenant: CityTenant;
  activeCategory: CivicCategory;
  onSelectCategory: (category: CivicCategory) => void;
}

export const QuickCategoryBar: React.FC<QuickCategoryBarProps> = ({
  tenant,
  activeCategory,
  onSelectCategory,
}) => {
  const categories = [
    {
      id: 'overview' as CivicCategory,
      label: 'Local News',
      icon: Newspaper,
      badge: 'Live',
    },
    {
      id: 'eats' as CivicCategory,
      label: 'Eats & Resos',
      icon: Utensils,
      badge: 'Tables',
    },
    {
      id: 'shows' as CivicCategory,
      label: 'Shows & Tickets',
      icon: Ticket,
      badge: 'Box Office',
    },
    {
      id: 'transit' as CivicCategory,
      label: 'Transit Alerts',
      icon: Train,
      badge: 'Live Status',
    },
    {
      id: 'civic' as CivicCategory,
      label: 'City 311',
      icon: PhoneCall,
      badge: 'Official',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-1.5 sm:px-3 pt-1.5 pb-1">
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 px-0.5 flex-nowrap md:flex-wrap">
        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-0.5 pr-1 flex-shrink-0">
          <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
          <span>Explore:</span>
        </div>

        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.id;

          return (
            <motion.button
              key={cat.id}
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-all border shadow-sm flex-shrink-0 ${
                isSelected
                  ? `bg-slate-800 text-white border-slate-600 shadow-md ${tenant.glowClass}`
                  : 'bg-slate-900/90 hover:bg-slate-850 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Icon
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                  isSelected ? 'text-cyan-400' : 'text-slate-400'
                }`}
              />
              <span className="whitespace-nowrap">{cat.label}</span>
              <span
                className={`text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0.2 rounded font-mono ${
                  isSelected
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60'
                    : 'bg-slate-800/80 text-slate-400'
                }`}
              >
                {cat.badge}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
