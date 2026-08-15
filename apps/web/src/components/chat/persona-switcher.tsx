'use client';

import React from 'react';
import { Compass, Newspaper, Utensils, Users } from 'lucide-react';
import { CityTenant } from '@/lib/tenants';

export type AIPersona = 'insider' | 'news' | 'foodie' | 'family';

interface PersonaSwitcherProps {
  tenant: CityTenant;
  activePersona: AIPersona;
  onSelectPersona: (persona: AIPersona) => void;
}

export const PersonaSwitcher: React.FC<PersonaSwitcherProps> = ({
  tenant,
  activePersona,
  onSelectPersona,
}) => {
  const personas = [
    { id: 'insider' as AIPersona, label: 'Local Insider', icon: Compass, desc: 'Hidden spots & shortcuts' },
    { id: 'news' as AIPersona, label: 'Executive News', icon: Newspaper, desc: 'Live headlines & civic briefings' },
    { id: 'foodie' as AIPersona, label: 'Foodie & Drinks', icon: Utensils, desc: 'Tables, menus & happy hours' },
    { id: 'family' as AIPersona, label: 'Family & Weekend', icon: Users, desc: 'Free events & kid spots' },
  ];

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 overflow-x-auto no-scrollbar border-b border-slate-800/60 bg-slate-950/40 backdrop-blur-sm flex-shrink-0">
      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider pl-1 hidden sm:inline">
        AI Persona:
      </span>
      <div className="flex items-center gap-1">
        {personas.map((p) => {
          const Icon = p.icon;
          const isSelected = activePersona === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPersona(p.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                isSelected
                  ? `bg-slate-800 text-white border border-slate-700 shadow-sm ${tenant.glowClass}`
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
              title={p.desc}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span className="whitespace-nowrap">{p.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
