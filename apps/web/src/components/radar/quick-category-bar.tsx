'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Ticket, Train, PhoneCall, Flame } from 'lucide-react';
import { CityTenant } from '@/lib/tenants';

export type CivicCategory = 'all' | 'eats' | 'shows' | 'transit' | 'civic';

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
      id: 'eats' as CivicCategory,
      label: 'Eats & Resos',
      icon: Utensils,
      badge: 'Tables Available',
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
      label: 'City 311 & Services',
      icon: PhoneCall,
      badge: 'Official',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-3 pb-1">
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar">
        <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider pl-1 pr-2 flex-shrink-0">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
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
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex-shrink-0 border shadow-sm ${
                isSelected
                  ? `bg-slate-800 text-white border-slate-600 shadow-md ${tenant.glowClass}`
                  : 'bg-slate-900/80 hover:bg-slate-850 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  isSelected ? 'text-cyan-400' : 'text-slate-400'
                }`}
              />
              <span>{cat.label}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
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
