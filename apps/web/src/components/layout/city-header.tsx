'use client';

import React, { useState } from 'react';
import { Menu, Sparkles, MapPin, ExternalLink, Share2, AlertTriangle } from 'lucide-react';
import { CityTenant } from '@/lib/tenants';
import { UserProfileMenu } from '@/components/auth/user-profile-menu';
import { useAuth } from '@/lib/auth-context';
import { FeedbackModal } from '@/components/feedback/feedback-modal';

interface CityHeaderProps {
  tenant: CityTenant;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  onToggleRadar: () => void;
  isRadarOpen: boolean;
}

export const CityHeader: React.FC<CityHeaderProps> = ({
  tenant,
  onToggleSidebar,
  onToggleRadar,
  isRadarOpen,
}) => {
  const { openShareModal } = useAuth();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-slate-800/80 px-4 md:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile / Desktop Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors border border-slate-800"
          title="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Dynamic City Brand */}
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-tr ${tenant.gradientClass} p-0.5 shadow-md`}
          >
            <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg font-bold tracking-tight text-white flex items-center">
                Chat<span className={`bg-gradient-to-r ${tenant.gradientClass} bg-clip-text text-transparent`}>{tenant.id.toUpperCase()}</span>
              </h1>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-700/80 text-cyan-300 text-[10px] font-black uppercase tracking-wider shadow-sm animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>BETA 🍁</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800/80 text-[11px] font-medium text-slate-300 border border-slate-700/50">
                <MapPin className="w-3 h-3 text-cyan-400" />
                {tenant.name}, {tenant.province}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Action Controls: Share, Domain, User Profile, Radar */}
      <div className="flex items-center gap-2">
        {/* Social Share Button */}
        <button
          onClick={openShareModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all shadow-sm active:scale-95"
          title="Share City Itinerary on Social"
        >
          <Share2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Share</span>
        </button>

        {/* Domain Badge */}
        <a
          href={`https://${tenant.domain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
        >
          <span>{tenant.domain}</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        {/* Report an Issue Button */}
        <button
          onClick={() => setIsFeedbackOpen(true)}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all shadow-sm active:scale-95"
          title="Report an Issue or Suggest Improvement"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Report Issue</span>
        </button>

        {/* User Social Profile / Sign-in */}
        <UserProfileMenu tenant={tenant} />

        {/* Right-Side Spotlight & Radar Toggle Button (for mobile / tablet screens) */}
        <button
          onClick={onToggleRadar}
          className={`xl:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-md active:scale-95 ${
            isRadarOpen
              ? `bg-slate-800 text-white border-cyan-500 shadow-cyan-500/20`
              : `bg-gradient-to-r ${tenant.gradientClass} text-white border-transparent hover:opacity-95 shadow-md`
          }`}
          title="Toggle City Spotlight Hub & Interactive Map"
        >
          <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
          <span>Spotlight & Map</span>
        </button>
      </div>

      {/* Interactive AI Screen Issue Reporting Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        tenantId={tenant.id}
      />
    </header>
  );
};
