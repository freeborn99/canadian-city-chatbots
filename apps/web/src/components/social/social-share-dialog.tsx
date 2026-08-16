'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Copy, Check, MessageSquare } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { CityTenant } from '@/lib/tenants';

interface SocialShareDialogProps {
  tenant: CityTenant;
}

export const SocialShareDialog: React.FC<SocialShareDialogProps> = ({ tenant }) => {
  const { isShareModalOpen, closeShareModal, shareData } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!isShareModalOpen) return null;

  const currentUrl = shareData?.url || (typeof window !== 'undefined' ? window.location.href : 'https://chatyyc.com');
  const fallbackText = `Exploring the best spots, reservations, and live tickets in ${tenant.name} with Canadian AI Hub! 🍁`;
  const shareText = shareData?.text || fallbackText;
  const dialogTitle = shareData?.title || `Share ${tenant.name} Itinerary 🍁`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}&hashtags=Chat${tenant.id.toUpperCase()},${tenant.name.replace(/\s+/g, '')},Canada`;
    window.open(tweetUrl, '_blank');
  };

  const shareToLinkedIn = () => {
    const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(liUrl, '_blank');
  };

  const shareToFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(fbUrl, '_blank');
  };

  const shareToWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeShareModal}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md glass-panel rounded-3xl border border-slate-700/80 shadow-2xl p-6 z-10 space-y-5"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-tr ${tenant.gradientClass} p-0.5 shadow-lg`}
              >
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {dialogTitle}
                </h3>
                <p className="text-xs text-slate-400">
                  Broadcast recommendations with friends & community
                </p>
              </div>
            </div>

            <button
              onClick={closeShareModal}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Social Share Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* X / Twitter */}
            <button
              onClick={shareToTwitter}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-black hover:bg-slate-900 border border-slate-700 text-white gap-1.5 transition-all shadow-md active:scale-95"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-[11px] font-semibold">Post to 𝕏</span>
            </button>

            {/* WhatsApp */}
            <button
              onClick={shareToWhatsApp}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 gap-1.5 transition-all shadow-md active:scale-95"
            >
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span className="text-[11px] font-semibold">WhatsApp</span>
            </button>

            {/* LinkedIn */}
            <button
              onClick={shareToLinkedIn}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-700/60 text-blue-300 gap-1.5 transition-all shadow-md active:scale-95"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.59 1.59 0 1 0 0-3.18 1.59 1.59 0 0 0 0 3.18m1.4 9.74v-8.37H5.06v8.37h2.8z" />
              </svg>
              <span className="text-[11px] font-semibold">LinkedIn</span>
            </button>

            {/* Facebook */}
            <button
              onClick={shareToFacebook}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 gap-1.5 transition-all shadow-md active:scale-95"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
              <span className="text-[11px] font-semibold">Facebook</span>
            </button>
          </div>

          {/* Copy Link Bar */}
          <div className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="bg-transparent text-xs text-slate-300 font-mono flex-1 outline-none truncate"
            />
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                copied
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
