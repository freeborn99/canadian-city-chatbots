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
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-slate-800/80 px-2.5 sm:px-4 md:px-6 py-2.5 sm:py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile / Desktop Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          className="p-1.5 sm:p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors border border-slate-800"
          title="Toggle Navigation Sidebar"
        >
          <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Dynamic City Brand */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center bg-gradient-to-tr ${tenant.gradientClass} p-0.5 shadow-md flex-shrink-0`}
          >
            <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <h1 className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-white flex items-center">
              Chat<span className={`bg-gradient-to-r ${tenant.gradientClass} bg-clip-text text-transparent`}>{tenant.id.toUpperCase()}</span>
            </h1>

            {/* Mobile-first Spotlight Button (Placed right beside the title as requested) */}
            <button
              onClick={onToggleRadar}
              className={`xl:hidden flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shadow-sm active:scale-95 border ${
                isRadarOpen
                  ? 'bg-slate-800 text-white border-cyan-500 shadow-cyan-500/20'
                  : 'bg-cyan-950/80 border-cyan-700/60 text-cyan-300 hover:text-white hover:bg-cyan-900/80'
              }`}
              title="Open Spotlight Hub & Interactive Map"
            >
              <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>Spotlight</span>
            </button>

            {/* Desktop Location Badge */}
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800/80 text-[11px] font-medium text-slate-300 border border-slate-700/50">
              <MapPin className="w-3 h-3 text-cyan-400" />
              {tenant.name}, {tenant.province}
            </span>
          </div>
        </div>
      </div>

      {/* Right Action Controls: Beta Badge, Share, Domain, Report, User Profile */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Beta Badge (Moved to right controls) */}
        <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>BETA 🍁</span>
        </span>

        {/* Social Share Button */}
        <button
          onClick={() => openShareModal()}
          className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all shadow-sm active:scale-95"
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
          className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all shadow-sm active:scale-95"
          title="Report an Issue or Suggest Improvement"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Report</span>
        </button>

        {/* User Social Profile / Sign-in */}
        <UserProfileMenu tenant={tenant} />
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
