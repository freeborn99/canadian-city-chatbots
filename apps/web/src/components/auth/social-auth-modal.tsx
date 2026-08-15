'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Shield, CheckCircle2, Bell, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface SocialAuthModalProps {
  accentClass: string;
}

export const SocialAuthModal: React.FC<SocialAuthModalProps> = ({ accentClass }) => {
  const { isAuthModalOpen, closeAuthModal } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
    }
  };

  const handleProviderClick = (providerName: string) => {
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md glass-panel rounded-3xl border border-slate-700/80 shadow-2xl p-6 z-10 space-y-5 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-tr ${accentClass} p-0.5 shadow-lg`}
              >
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Citizen Pass 🍁
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-300">
                    Coming Soon
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Universal Canadian City Explorer Authentication
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
                closeAuthModal();
              }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Coming Soon Notice State */}
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center mx-auto text-emerald-300">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">You&apos;re on the Early Access List! 🍁</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Social sign-in with Google, X, and Apple is launching in the next public release. You will receive priority access and a founding explorer badge.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  closeAuthModal();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md transition-colors"
              >
                Continue Exploring City
              </button>
            </motion.div>
          ) : (
            <>
              {/* Feature Highlights */}
              <div className="bg-slate-900/80 rounded-2xl p-3.5 border border-slate-800/80 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Sync saved restaurants & shows across 10 city domains</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>1-Click social itinerary sharing to X & WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Verified Canadian Citizen Explorer status</span>
                </div>
              </div>

              {/* Social Login Options (Tagged with Coming Soon preview) */}
              <div className="space-y-2">
                <button
                  onClick={() => handleProviderClick('Google')}
                  className="w-full flex items-center justify-between py-2.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Coming Soon</span>
                </button>

                <button
                  onClick={() => handleProviderClick('X')}
                  className="w-full flex items-center justify-between py-2.5 px-4 rounded-2xl bg-black hover:bg-slate-900 border border-slate-700 text-white font-semibold text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>Continue with X (Twitter)</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Coming Soon</span>
                </button>
              </div>

              {/* VIP Early Access Notify Form */}
              <form onSubmit={handleNotifySubmit} className="space-y-2 pt-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <Bell className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold">Get Launch Notification:</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
                  />
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-xl bg-gradient-to-r ${accentClass} text-white font-bold text-xs shadow-md hover:opacity-95 transition-opacity flex items-center gap-1 flex-shrink-0 cursor-pointer`}
                  >
                    <span>Notify Me</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </form>
            </>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1 border-t border-slate-800/60">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted zero-cost Canadian civic authentication</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
