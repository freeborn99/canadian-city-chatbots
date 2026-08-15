'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  MessageSquare,
  Globe,
  Sparkles,
  ChevronRight,
  Info,
  X,
  Database
} from 'lucide-react';
import { CityTenant, getAllTenants } from '@/lib/tenants';

interface SidebarProps {
  tenant: CityTenant;
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onSwitchTenant: (tenantId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  tenant,
  isOpen,
  onClose,
  onNewChat,
  onSwitchTenant,
}) => {
  const allTenants = getAllTenants();

  // Simulated session history items for UX
  const mockHistory = [
    { id: '1', title: `Weekend in ${tenant.name}`, time: '2 hours ago' },
    { id: '2', title: `Transit & Road Conditions`, time: 'Yesterday' },
    { id: '3', title: `Best spots near ${tenant.landmarks[0] || 'Downtown'}`, time: '3 days ago' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -320,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 md:w-80 glass-panel border-r border-slate-800/80 flex flex-col justify-between shadow-2xl ${
          !isOpen && 'pointer-events-none'
        }`}
      >
        {/* Top Section */}
        <div className="p-4 border-b border-slate-800/60">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-tr ${tenant.gradientClass} p-0.5`}
              >
                <div className="w-full h-full bg-slate-950 rounded-[5px] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <span className="font-bold text-sm tracking-tight text-white">
                Canadian AI Hub
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              title="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 1024) onClose();
            }}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r ${tenant.gradientClass} text-white font-medium text-sm shadow-md ${tenant.glowClass} hover:opacity-95 transition-all`}
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Scrollable Middle Section: History & City Hub */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Chat History Section */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2.5 flex items-center gap-1.5">
              <MessageSquare className="w-3 h-3 text-slate-400" />
              <span>Recent Conversations</span>
            </h3>

            <div className="space-y-1">
              {mockHistory.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNewChat();
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800/50 text-slate-300 hover:text-white text-xs transition-colors flex items-center justify-between group"
                >
                  <span className="truncate">{item.title}</span>
                  <span className="text-[10px] text-slate-500 group-hover:text-slate-400">{item.time}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 10 Canadian Domains / Cities Switcher */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2.5 flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>10 Canadian Domains</span>
            </h3>

            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              {allTenants.map((t) => {
                const isActive = t.id === tenant.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      onSwitchTenant(t.id);
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between ${
                      isActive
                        ? `bg-slate-800 text-white font-medium border border-slate-700 shadow-sm`
                        : `text-slate-400 hover:bg-slate-850 hover:text-slate-200`
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${isActive ? 'bg-cyan-400' : 'bg-slate-600'}`}
                      />
                      <span>{t.name}</span>
                      <span className="font-mono text-[10px] text-slate-500 uppercase">
                        [{t.id}]
                      </span>
                    </div>

                    <ChevronRight className={`w-3 h-3 ${isActive ? 'text-cyan-400' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* City Trivia / Civic Info Card */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>About {tenant.name}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
              {tenant.sampleTrivia}
            </p>
            <div className="flex flex-wrap gap-1">
              {tenant.landmarks.slice(0, 3).map((l) => (
                <span
                  key={l}
                  className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info & Admin link */}
        <div className="p-4 border-t border-slate-800/60 bg-slate-950/40 space-y-2">
          <Link
            href="/admin"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all group"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Admin & Telemetry</span>
            </span>
            <span className="text-[10px] text-cyan-400 font-mono group-hover:translate-x-0.5 transition-transform">
              📊 Portal →
            </span>
          </Link>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Upstash Vector Index</span>
            </span>
            <span className="text-emerald-400 font-mono text-[10px]">ONLINE</span>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
