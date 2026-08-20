'use client';

import React, { useState } from 'react';
import { Compass, Newspaper, Utensils, Users, Loader2 } from 'lucide-react';
import { CityTenant } from '@/lib/tenants';

export type AIPersona = 'insider' | 'news' | 'foodie' | 'family';

export interface PersonaDefinition {
  id: AIPersona;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  activationPrompt: string;
}

export const PERSONA_DEFINITIONS: PersonaDefinition[] = [
  {
    id: 'insider',
    label: 'Local Insider',
    icon: Compass,
    desc: 'Hidden spots & shortcuts',
    activationPrompt: 'Switch to Local Insider mode — give me the hidden gems, local shortcuts, and insider tips that only a true local would know.',
  },
  {
    id: 'news',
    label: 'Executive News',
    icon: Newspaper,
    desc: 'Live headlines & civic briefings',
    activationPrompt: 'Provide the Executive News Briefing for today — give me the top 3 curated stories as executive briefing cards with key takeaways and local impact.',
  },
  {
    id: 'foodie',
    label: 'Nightlife & Dining',
    icon: Utensils,
    desc: 'Clubs, speakeasies & resos',
    activationPrompt: 'Switch to Nightlife & Dining mode — show me the top nightclubs, cocktail speakeasies, table reservations, and late-night spots tonight.',
  },
  {
    id: 'family',
    label: 'Family & Weekend',
    icon: Users,
    desc: 'Free events & kid spots',
    activationPrompt: 'Switch to Family & Weekend mode — show me family-friendly activities, free events, kid-friendly parks, and weekend plans.',
  },
];

interface PersonaSwitcherProps {
  tenant: CityTenant;
  activePersona: AIPersona;
  onSelectPersona: (persona: AIPersona) => void;
  onActivatePersona?: (persona: AIPersona, activationPrompt: string) => void;
  isLoading?: boolean;
}

export const PersonaSwitcher: React.FC<PersonaSwitcherProps> = ({
  tenant,
  activePersona,
  onSelectPersona,
  onActivatePersona,
  isLoading = false,
}) => {
  const [switchingTo, setSwitchingTo] = useState<AIPersona | null>(null);

  const handlePersonaClick = (persona: PersonaDefinition) => {
    if (isLoading || persona.id === activePersona) return;

    setSwitchingTo(persona.id);
    onSelectPersona(persona.id);

    // Trigger the activation prompt so the AI immediately acknowledges the mode switch
    if (onActivatePersona) {
      onActivatePersona(persona.id, persona.activationPrompt);
    }

    // Clear the switching animation after a brief delay
    setTimeout(() => setSwitchingTo(null), 600);
  };

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 overflow-x-auto no-scrollbar border-b border-slate-800/60 bg-slate-950/40 backdrop-blur-sm flex-shrink-0">
      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider pl-1 hidden sm:inline">
        AI Persona:
      </span>
      <div className="flex items-center gap-1">
        {PERSONA_DEFINITIONS.map((p) => {
          const Icon = p.icon;
          const isSelected = activePersona === p.id;
          const isSwitching = switchingTo === p.id;

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handlePersonaClick(p)}
              disabled={isLoading}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isSelected
                  ? `bg-slate-800 text-white border border-slate-700 shadow-sm ${tenant.glowClass}`
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
              title={p.desc}
            >
              {isSwitching ? (
                <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              ) : (
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
              )}
              <span className="whitespace-nowrap">{p.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
