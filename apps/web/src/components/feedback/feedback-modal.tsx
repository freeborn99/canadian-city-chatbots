'use client';

import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Sparkles,
  X,
  Send,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Mail,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenantId: string;
  userPrompt?: string;
  aiResponse?: string;
}

export function FeedbackModal({
  isOpen,
  onClose,
  tenantId,
  userPrompt = '',
  aiResponse = '',
}: FeedbackModalProps) {
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [aiDiagnosis, setAiDiagnosis] = useState<{
    category: string;
    suggestedSummary: string;
    severity: string;
  } | null>(null);

  const [userDescription, setUserDescription] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showContext, setShowContext] = useState(false);

  // When modal opens, run the AI diagnosis on the current screen & conversation context
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setUserDescription('');
      setAiDiagnosis(null);
      setIsDiagnosing(true);

      fetch('/api/feedback/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId,
          userPrompt,
          aiResponse,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'SUCCESS' && data.diagnosis) {
            setAiDiagnosis(data.diagnosis);
            setUserDescription(data.diagnosis.suggestedSummary || '');
          }
        })
        .catch((e) => console.error('Diagnosis failed:', e))
        .finally(() => setIsDiagnosing(false));
    }
  }, [isOpen, tenantId, userPrompt, aiResponse]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId,
          userPrompt,
          aiResponse,
          aiSuggestedCategory: aiDiagnosis?.category || 'General Issue',
          aiSuggestedSummary: aiDiagnosis?.suggestedSummary || 'User reported issue',
          userDescription,
          userEmail,
          clientMeta: {
            url: typeof window !== 'undefined' ? window.location.href : '',
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          },
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
        }, 2200);
      }
    } catch (err) {
      console.error('Failed to submit issue:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg glass-panel border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-slate-100 selection:bg-cyan-500 selection:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                Report an Issue <span className="text-xs">🍁</span>
              </h3>
              <p className="text-[11px] text-slate-400">Help make Canadian City AI better</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success State */}
        {isSubmitted ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Issue Report Dispatched!</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Thank you for helping us improve. Our team has received your report with the attached AI diagnostic context.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            {/* AI Screen Diagnostic Box */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-850 border border-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-cyan-300">
                  <Sparkles className={`w-3.5 h-3.5 text-cyan-400 ${isDiagnosing ? 'animate-spin' : ''}`} />
                  <span>AI Screen & Context Diagnosis</span>
                </div>
                {aiDiagnosis && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/80 text-cyan-300 text-[10px] font-semibold">
                    {aiDiagnosis.category}
                  </span>
                )}
              </div>

              {isDiagnosing ? (
                <div className="text-xs text-slate-400 flex items-center gap-2 py-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>Analyzing your last question and AI output...</span>
                </div>
              ) : aiDiagnosis ? (
                <div className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <p className="font-medium text-slate-200">✨ Auto-Detected Issue:</p>
                  <p className="text-slate-400 mt-0.5 text-[11px]">{aiDiagnosis.suggestedSummary}</p>
                </div>
              ) : (
                <p className="text-xs text-slate-400">Describe what went wrong with this response below.</p>
              )}
            </div>

            {/* User Custom Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Your Description / Suggestions:</span>
                <span className="text-[10px] text-slate-500 font-normal">Editable</span>
              </label>
              <textarea
                rows={3}
                value={userDescription}
                onChange={(e) => setUserDescription(e.target.value)}
                placeholder="What was inaccurate, missing, or broken with this response?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                required
              />
            </div>

            {/* Citizen Email (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-slate-400" />
                <span>Your Email (Optional, for resolution follow-up):</span>
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="citizen@example.ca"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Collapsible Attached Context */}
            {userPrompt && (
              <div className="border-t border-slate-800/60 pt-2">
                <button
                  type="button"
                  onClick={() => setShowContext(!showContext)}
                  className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center justify-between w-full py-1"
                >
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-cyan-400" />
                    <span>Attached Conversation Context ({tenantId.toUpperCase()})</span>
                  </span>
                  {showContext ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {showContext && (
                  <div className="p-2.5 mt-1 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] space-y-1.5 text-slate-400 max-h-32 overflow-y-auto">
                    <p><strong className="text-slate-300">Question:</strong> &quot;{userPrompt}&quot;</p>
                    <p className="line-clamp-3"><strong className="text-slate-300">AI Response:</strong> {aiResponse}</p>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !userDescription.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white text-xs font-semibold hover:opacity-95 shadow-md shadow-rose-900/20 active:scale-95 disabled:opacity-50 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Dispatching...' : 'Send Issue Report'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
