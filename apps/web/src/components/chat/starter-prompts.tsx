'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Utensils, Car, Newspaper, Sparkles, ArrowUpRight, Flame } from 'lucide-react';
import { CityTenant, StarterPrompt } from '@/lib/tenants';
import { LocalPartnerShowcase } from '@/components/radar/local-partner-showcase';

import type { Variants } from 'framer-motion';

interface StarterPromptsProps {
  tenant: CityTenant;
  onSelectPrompt: (promptText: string) => void;
}

const iconMap = {
  Calendar: Calendar,
  Utensils: Utensils,
  Car: Car,
  Newspaper: Newspaper,
  Flame: Flame,
  Sparkles: Sparkles,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

export const StarterPrompts: React.FC<StarterPromptsProps> = ({ tenant, onSelectPrompt }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center">
      {/* City Hero Icon & Badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-6 flex flex-col items-center text-center"
      >
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-tr ${tenant.gradientClass} p-0.5 shadow-xl ${tenant.glowClass} mb-4`}
        >
          <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="w-7 h-7 text-white animate-pulse" />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-700/80 text-cyan-300 text-[11px] font-black uppercase tracking-wider shadow-sm animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>PUBLIC BETA 🍁</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 shadow-inner">
            <span className="w-2 h-2 rounded-full animate-ping bg-emerald-400" />
            <span>Real-Time Civic AI • {tenant.province}</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
          Chat<span className={`bg-gradient-to-r ${tenant.gradientClass} bg-clip-text text-transparent`}>{tenant.id.toUpperCase()}</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-lg">
          {tenant.tagline}
        </p>
      </motion.div>

      {/* 4 Animated Starter Prompt Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-3.5 w-full mt-4"
      >
        {tenant.starterPrompts.map((item: StarterPrompt) => {
          const IconComponent = iconMap[item.iconName] || Calendar;

          return (
            <motion.button
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectPrompt(item.prompt)}
              className={`group relative text-left p-4 rounded-xl glass-card border border-slate-800/80 hover:border-slate-600/80 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl`}
            >
              {/* Subtle background glow on hover */}
              <div
                className={`absolute -right-12 -top-12 w-32 h-32 rounded-full bg-gradient-to-br ${tenant.gradientClass} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 pointer-events-none`}
              />

              <div className="flex items-start justify-between w-full mb-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${tenant.bgTintClass} border ${tenant.borderClass.split(' ')[0]} transition-transform duration-300 group-hover:scale-110`}
                >
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div className="text-slate-500 group-hover:text-slate-200 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>



      {/* Local Landmarks Footer Pill */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500"
      >
        <span className="text-slate-400 font-medium mr-1">Trending Topics:</span>
        {tenant.landmarks.map((landmark) => (
          <button
            key={landmark}
            onClick={() => onSelectPrompt(`Tell me what is happening around ${landmark} in ${tenant.name} right now.`)}
            className="px-2.5 py-1 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            {landmark}
          </button>
        ))}
      </motion.div>
    </div>
  );
};
