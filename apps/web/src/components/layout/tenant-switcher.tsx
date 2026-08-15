'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { CityTenant, getAllTenants } from '@/lib/tenants';

interface TenantSwitcherProps {
  currentTenant: CityTenant;
  onSelectTenant: (tenantId: string) => void;
}

export const TenantSwitcher: React.FC<TenantSwitcherProps> = ({
  currentTenant,
  onSelectTenant,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const tenants = getAllTenants();

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-200 shadow-lg backdrop-blur-md transition-all hover:border-slate-600"
      >
        <Globe className="w-3.5 h-3.5 text-cyan-400" />
        <span>
          City: <strong className="text-white">{currentTenant.name}</strong>
        </span>
        <span className="font-mono text-[10px] text-slate-400">({currentTenant.id.toUpperCase()})</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click outside backdrop */}
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-64 rounded-2xl glass-panel p-2 shadow-2xl border border-slate-700/80 z-40 space-y-1"
            >
              <div className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                Select Canadian Domain / City
              </div>

              <div className="max-h-64 overflow-y-auto space-y-0.5 pt-1">
                {tenants.map((t) => {
                  const isSelected = t.id === currentTenant.id;

                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        onSelectTenant(t.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors ${
                        isSelected
                          ? 'bg-slate-850 text-white font-medium border border-slate-700'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-cyan-400' : 'bg-slate-600'
                          }`}
                        />
                        <span>{t.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {t.domain}
                        </span>
                      </div>

                      {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
