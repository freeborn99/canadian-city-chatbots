'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Bookmark, ChevronDown, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { CityTenant } from '@/lib/tenants';

interface UserProfileMenuProps {
  tenant: CityTenant;
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({ tenant }) => {
  const { user, openAuthModal, signOut, savedPlaces } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !user) {
    return (
      <button
        onClick={openAuthModal}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r ${tenant.gradientClass} text-white font-semibold text-xs shadow-lg hover:opacity-95 transition-all active:scale-95`}
      >
        <User className="w-3.5 h-3.5" />
        <span>Sign In</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 text-white shadow-md transition-all"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-7 h-7 rounded-xl object-cover border border-cyan-400/60"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <span className="text-xs font-semibold max-w-[90px] truncate hidden sm:block">
          {user.name.split(' ')[0]}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl border border-slate-700/80 shadow-2xl p-3 z-50 space-y-2.5 text-xs text-slate-200"
            >
              {/* User Header */}
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-800">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-xl object-cover border border-cyan-400"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="truncate">
                  <div className="font-bold text-white truncate">{user.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                </div>
              </div>

              {/* Citizen Badge */}
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{user.badge}</span>
                </div>
              </div>

              {/* Saved Places Count */}
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                  <span>Saved Spots</span>
                </span>
                <span className="font-bold text-white font-mono bg-slate-800 px-2 py-0.5 rounded-md">
                  {savedPlaces.length}
                </span>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 font-semibold text-xs transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
