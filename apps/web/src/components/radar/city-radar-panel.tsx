'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Utensils,
  Ticket,
  Train,
  PhoneCall,
  Sparkles,
  ChevronRight,
  X,
  ExternalLink,
  Radar
} from 'lucide-react';
import { CityTenant } from '@/lib/tenants';
import { getCityHubData } from '@/lib/city-data';
import { RestaurantCard } from './restaurant-card';
import { EventTicketCard } from './event-ticket-card';
import { TransitRadarCard } from './transit-radar-card';
import { CityMapRadar } from './city-map-radar';
import { CivicCategory } from './quick-category-bar';

interface CityRadarPanelProps {
  tenant: CityTenant;
  isOpen: boolean;
  onClose: () => void;
  activeCategory: CivicCategory;
  onSelectCategory: (category: CivicCategory) => void;
  onAskAI: (prompt: string) => void;
}

export const CityRadarPanel: React.FC<CityRadarPanelProps> = ({
  tenant,
  isOpen,
  onClose,
  activeCategory,
  onSelectCategory,
  onAskAI,
}) => {
  const hubData = getCityHubData(tenant.id);

  const tabs = [
    { id: 'eats' as CivicCategory, label: 'Dining Resos', icon: Utensils, count: hubData.restaurants.length },
    { id: 'shows' as CivicCategory, label: 'Shows & Tickets', icon: Ticket, count: hubData.shows.length },
    { id: 'transit' as CivicCategory, label: 'Transit Radar', icon: Train, count: hubData.transitLines.length },
    { id: 'civic' as CivicCategory, label: 'City 311', icon: PhoneCall, count: hubData.civicServices.length },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm xl:hidden"
          />
        )}
      </AnimatePresence>

      {/* Right-Side Live Canvas Panel */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : 380,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 bottom-0 right-0 z-50 w-80 md:w-96 glass-panel border-l border-slate-800/80 flex flex-col justify-between shadow-2xl ${
          !isOpen && 'pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800/60">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-tr ${tenant.gradientClass} p-0.5`}
              >
                <div className="w-full h-full bg-slate-950 rounded-[5px] flex items-center justify-center">
                  <Radar className="w-3.5 h-3.5 text-white animate-spin [animation-duration:15s]" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>{tenant.name} Intelligence Deck</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  Live Action Highlights
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              title="Close radar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectCategory(tab.id)}
                  title={tab.label}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[10px] font-medium transition-all ${
                    isSelected
                      ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 mb-0.5 ${
                      isSelected ? 'text-cyan-400' : 'text-slate-400'
                    }`}
                  />
                  <span className="truncate w-full text-center">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Content Deck */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Visual Mini Map Radar */}
          <CityMapRadar tenant={tenant} activeCategory={activeCategory} />

          {/* Tab 1: Restaurant Reservations */}
          {activeCategory === 'eats' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="font-semibold text-slate-300">Featured Tables & Resos</span>
                <span className="text-[10px] font-mono">{hubData.restaurants.length} spots live</span>
              </div>

              {hubData.restaurants.map((r) => (
                <RestaurantCard
                  key={r.id}
                  restaurant={r}
                  accentClass={tenant.gradientClass}
                  onAskAboutRestaurant={(name) =>
                    onAskAI(`Tell me more about the menu, vibe, and reservation tips for ${name} in ${tenant.name}.`)
                  }
                />
              ))}
            </div>
          )}

          {/* Tab 2: Shows, Theatre & Concert Tickets */}
          {activeCategory === 'shows' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="font-semibold text-slate-300">Live Stage & Sports Tickets</span>
                <span className="text-[10px] font-mono">{hubData.shows.length} events listed</span>
              </div>

              {hubData.shows.map((s) => (
                <EventTicketCard
                  key={s.id}
                  show={s}
                  accentClass={tenant.gradientClass}
                  onAskAboutShow={(title) =>
                    onAskAI(`What are the showtimes, venue details, and best ticket options for "${title}" in ${tenant.name}?`)
                  }
                />
              ))}
            </div>
          )}

          {/* Tab 3: Transit Alerts */}
          {activeCategory === 'transit' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="font-semibold text-slate-300">Transit & Rail Radar</span>
                <span className="text-[10px] font-mono">Live feeds</span>
              </div>

              {hubData.transitLines.map((t) => (
                <TransitRadarCard key={t.id} transit={t} />
              ))}
            </div>
          )}

          {/* Tab 4: City 311 & Municipal Services */}
          {activeCategory === 'civic' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="font-semibold text-slate-300">Official Municipal Portals</span>
                <span className="text-[10px] font-mono">Verified</span>
              </div>

              {hubData.civicServices.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl glass-card border border-slate-800/90 shadow-md space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">{c.department}</span>
                      <h4 className="text-sm font-bold text-white">{c.title}</h4>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{c.description}</p>

                  {c.phone && (
                    <div className="text-[11px] text-cyan-300 font-mono">
                      📞 Phone: {c.phone}
                    </div>
                  )}

                  <a
                    href={c.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r ${tenant.gradientClass} text-white font-semibold text-xs shadow-md hover:opacity-95 transition-opacity`}
                  >
                    <span>{c.actionText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-800/60 bg-slate-950/40 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Radar Synchronized</span>
          </div>
          <span className="text-slate-500 font-mono">v2.0-Deck</span>
        </div>
      </motion.aside>
    </>
  );
};
