'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock } from 'lucide-react';
import { TransitLineStatus } from '@/lib/city-data';

interface TransitRadarCardProps {
  transit: TransitLineStatus;
}

export const TransitRadarCard: React.FC<TransitRadarCardProps> = ({ transit }) => {
  const isNormal = transit.status === 'Normal Service';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3.5 rounded-2xl glass-card border border-slate-800/90 hover:border-slate-700/80 shadow-lg"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div>
          <span className="text-[10px] font-mono text-slate-400 block">
            {transit.systemName}
          </span>
          <h4 className="text-xs font-bold text-white">{transit.lineName}</h4>
        </div>

        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
            isNormal
              ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300'
              : 'bg-amber-950/60 border-amber-800/60 text-amber-300'
          }`}
        >
          <Activity className="w-3 h-3" />
          <span>{transit.status}</span>
        </div>
      </div>

      <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
        {transit.details}
      </p>

      <div className="flex items-center gap-1 text-[10px] text-slate-500">
        <Clock className="w-3 h-3" />
        <span>Updated {transit.updatedMinutesAgo} min ago</span>
      </div>
    </motion.div>
  );
};
