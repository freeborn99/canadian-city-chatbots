'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Navigation } from 'lucide-react';
import { CityTenant } from '@/lib/tenants';

interface CityMapRadarProps {
  tenant: CityTenant;
  activeCategory: string;
}

export const CityMapRadar: React.FC<CityMapRadarProps> = ({ tenant, activeCategory }) => {
  return (
    <div className="relative rounded-2xl glass-panel p-3.5 border border-slate-800/90 shadow-xl overflow-hidden mb-4">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Radar sweeping line animation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20"
        style={{
          background: `conic-gradient(from 0deg, transparent 70%, ${tenant.accentHex} 100%)`,
          borderRadius: '50%',
        }}
      />

      <div className="relative z-10 flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-white">
          <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin [animation-duration:12s]" />
          <span>Live {tenant.name} Radar</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
          Target: {activeCategory.toUpperCase()}
        </span>
      </div>

      {/* Interactive Plotted Landmark Pins */}
      <div className="relative h-28 w-full rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-center overflow-hidden">
        {/* Concentric radar rings */}
        <div className="absolute w-20 h-20 rounded-full border border-slate-800/80" />
        <div className="absolute w-28 h-28 rounded-full border border-slate-800/40" />

        {/* Dynamic plotted pins */}
        {tenant.landmarks.slice(0, 4).map((landmark, idx) => {
          const positions = [
            'top-3 left-4',
            'bottom-3 right-5',
            'top-6 right-8',
            'bottom-4 left-6',
          ];
          return (
            <motion.div
              key={landmark}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`absolute ${positions[idx % positions.length]} flex items-center gap-1 group cursor-pointer`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full bg-gradient-to-tr ${tenant.gradientClass} animate-pulse shadow-md`}
              />
              <span className="text-[9px] font-semibold text-slate-300 group-hover:text-white bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-800 backdrop-blur-sm transition-colors shadow-sm">
                {landmark}
              </span>
            </motion.div>
          );
        })}

        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
          <Navigation className="w-3 h-3 text-cyan-400 animate-bounce" />
          <span>Scanning Metro {tenant.id.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};
