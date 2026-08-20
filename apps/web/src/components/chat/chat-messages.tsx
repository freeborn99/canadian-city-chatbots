'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from 'ai';
import { User, Sparkles, Copy, Check, Bot, CornerDownRight, Volume2, VolumeX, Flag, ExternalLink } from 'lucide-react';
import { CityTenant } from '@/lib/tenants';
import { MarkdownRenderer } from './markdown-renderer';
import { FeedbackModal } from '@/components/feedback/feedback-modal';
import { buildAffiliateUrl, inferPlatformFromUrl } from '@/lib/affiliate-config';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  tenant: CityTenant;
  onSendFollowup?: (text: string) => void;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isLoading,
  tenant,
  onSendFollowup,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [activeFeedback, setActiveFeedback] = useState<{ userPrompt: string; aiResponse: string } | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Text-to-Speech audio reader
  const handleToggleSpeak = (id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech audio is not supported in this browser.');
      return;
    }

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown symbols for cleaner speech
    const cleanText = text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_#`~]/g, '')
      .replace(/💡.*$/s, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setSpeakingId(null);
    };
    utterance.onerror = () => {
      setSpeakingId(null);
    };

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Helper to extract follow-up pills and action links from response text
  interface FollowupItem {
    id: string;
    text: string;
    url?: string;
    isLink: boolean;
  }

  const parseFollowups = (content: string): { mainText: string; followups: FollowupItem[] } => {
    if (!content.includes('Next Steps') && !content.includes('Follow-Ups') && !content.includes('💡')) {
      return { mainText: content, followups: [] };
    }

    const parts = content.split(/💡\s*\*\*(?:Quick Next Steps|Executive Follow-Ups|Follow-Ups|Next Steps):\*\*/i);
    if (parts.length < 2) {
      return { mainText: content, followups: [] };
    }
    const mainText = parts[0].trim();
    const followupBlock = parts[1] || '';

    const lines = followupBlock
      .split('\n')
      .map((line) => line.replace(/^[\s\-*•\d.]+\s*/, '').trim())
      .filter((line) => line.length > 2 && line.length < 150);

    const followups: FollowupItem[] = [];

    for (const line of lines) {
      // Check if this line is a markdown link: [Anchor Text](https://...)
      const mdLinkMatch = line.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
      if (mdLinkMatch) {
        followups.push({
          id: line,
          text: mdLinkMatch[1].trim(),
          url: mdLinkMatch[2].trim(),
          isLink: true,
        });
        continue;
      }

      // Check if line contains a markdown link
      const embeddedMatch = line.match(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/);
      if (embeddedMatch) {
        followups.push({
          id: line,
          text: embeddedMatch[1].trim(),
          url: embeddedMatch[2].trim(),
          isLink: true,
        });
        continue;
      }

      // Check if line is a raw URL
      if (/^https?:\/\/[^\s]+$/.test(line)) {
        followups.push({
          id: line,
          text: 'Visit Official Website',
          url: line,
          isLink: true,
        });
        continue;
      }

      // Otherwise it's a prompt suggestion
      const cleanPrompt = line.replace(/[*_`]/g, '').trim();
      if (cleanPrompt) {
        followups.push({
          id: line,
          text: cleanPrompt,
          isLink: false,
        });
      }
    }

    return { mainText, followups };
  };

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto px-1 sm:px-4 md:px-8 py-2 sm:py-6 space-y-3 sm:space-y-6 max-w-4xl mx-auto w-full"
    >
      <AnimatePresence initial={false}>
        {messages.map((message, index) => {
          const isUser = message.role === 'user';
          const { mainText, followups } = !isUser
            ? parseFollowups(message.content)
            : { mainText: message.content, followups: [] };
          const isCurrentlySpeaking = speakingId === message.id;

          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`flex gap-1.5 sm:gap-3 md:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {/* Bot Avatar */}
              {!isUser && (
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg sm:rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${tenant.gradientClass} p-0.5 shadow-md ${tenant.glowClass} mt-0.5`}
                >
                  <div className="w-full h-full bg-slate-950 rounded-[6px] sm:rounded-[10px] flex items-center justify-center">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>
              )}

              {/* Message Bubble Container - Optimized for mobile width & padding */}
              <div className="max-w-[98%] sm:max-w-[90%] md:max-w-[84%] space-y-1.5 sm:space-y-2 flex-1 sm:flex-initial min-w-0">
                <div
                  className={`relative group rounded-2xl p-2.5 sm:p-4 md:p-5 shadow-lg transition-all ${
                    isUser
                      ? 'glass-bubble-user text-white border-blue-500/20 shadow-blue-900/10'
                      : 'glass-bubble-assistant text-slate-100 border-slate-800/80'
                  }`}
                >
                  {/* Header label & Action Bar for assistant */}
                  {!isUser && (
                    <div className="flex items-center justify-between gap-2 sm:gap-4 mb-2 pb-1.5 border-b border-slate-800/60 text-xs">
                      <div className="flex items-center gap-1.5 font-medium">
                        <span
                          className={`bg-gradient-to-r ${tenant.gradientClass} bg-clip-text text-transparent font-semibold`}
                        >
                          Chat{tenant.id.toUpperCase()}
                        </span>
                        <span className="text-slate-500">• {tenant.name} AI</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Audio Speech Button */}
                        <button
                          onClick={() => handleToggleSpeak(message.id, mainText)}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-medium transition-all ${
                            isCurrentlySpeaking
                              ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 animate-pulse'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                          }`}
                          title={isCurrentlySpeaking ? 'Stop audio' : 'Listen to Briefing'}
                        >
                          {isCurrentlySpeaking ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Playing...</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Listen</span>
                            </>
                          )}
                        </button>

                        {/* Copy Button */}
                        <button
                          onClick={() => handleCopy(message.id, message.content)}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white transition-opacity p-1 rounded hover:bg-slate-800/60"
                          title="Copy response"
                        >
                          {copiedId === message.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Report Issue on this message */}
                        <button
                          onClick={() => {
                            const prevUserMsg = [...messages.slice(0, index)].reverse().find((m) => m.role === 'user')?.content || '';
                            setActiveFeedback({
                              userPrompt: prevUserMsg,
                              aiResponse: message.content,
                            });
                          }}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-amber-400 transition-opacity p-1 rounded hover:bg-slate-800/60"
                          title="Report an issue on this response"
                        >
                          <Flag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Message Content */}
                  {isUser ? (
                    <div className="whitespace-pre-wrap text-sm md:text-base leading-relaxed text-white">
                      {message.content}
                    </div>
                  ) : (
                    <MarkdownRenderer content={mainText} tenantId={tenant.id} />
                  )}
                </div>

                {/* Interactive Clickable Follow-up Action Chips & Links */}
                {!isUser && followups.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-2 pt-2 pl-1"
                  >
                    {followups.map((item, idx) => {
                      if (item.isLink && item.url) {
                        const finalUrl = buildAffiliateUrl(item.url, inferPlatformFromUrl(item.url), tenant.id);
                        return (
                          <a
                            key={idx}
                            href={finalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/80 hover:border-cyan-400 text-xs font-semibold text-cyan-200 hover:text-white transition-all shadow-md group active:scale-95 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                            <span>{item.text}</span>
                          </a>
                        );
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => onSendFollowup?.(item.text)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-xs text-slate-300 hover:text-white transition-all shadow-sm group active:scale-95 cursor-pointer"
                        >
                          <CornerDownRight className="w-3 h-3 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                          <span>{item.text}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </div>

              {/* User Avatar */}
              {isUser && (
                <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center bg-slate-800/80 border border-slate-700/60 shadow-md">
                  <User className="w-4 h-4 text-slate-300" />
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-3 md:gap-4 justify-start items-center"
          >
            <div
              className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${tenant.gradientClass} p-0.5 shadow-md`}
            >
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Bot className="w-4 h-4 text-white animate-spin" />
              </div>
            </div>

            <div className="glass-bubble-assistant rounded-2xl px-5 py-3.5 flex items-center gap-2 border border-slate-800/80 shadow-md">
              <span className="text-xs text-slate-400 font-medium">
                Scanning verified {tenant.name} live vectors & news
              </span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flag Message Feedback Modal */}
      <FeedbackModal
        isOpen={!!activeFeedback}
        onClose={() => setActiveFeedback(null)}
        tenantId={tenant.id}
        userPrompt={activeFeedback?.userPrompt}
        aiResponse={activeFeedback?.aiResponse}
      />
    </div>
  );
};
