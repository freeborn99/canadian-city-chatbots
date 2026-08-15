'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Send, Sparkles, CornerDownLeft, Trash2, Mic, MicOff } from 'lucide-react';
import { CityTenant } from '@/lib/tenants';

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  tenant: CityTenant;
  onClearChat?: () => void;
  hasMessages?: boolean;
  onVoiceInput?: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  tenant,
  onClearChat,
  hasMessages,
  onVoiceInput,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        const form = e.currentTarget.closest('form');
        if (form) {
          form.requestSubmit();
        } else {
          handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
        }
      }
    }
  };

  // Web Speech API Voice Dictation
  const toggleVoiceRecognition = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice dictation is not supported in this browser. Please try Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-CA';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (onVoiceInput) {
          onVoiceInput(transcript);
        } else if (textareaRef.current) {
          // Synthetic change
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLTextAreaElement.prototype,
            'value'
          )?.set;
          nativeInputValueSetter?.call(textareaRef.current, transcript);
          const ev = new Event('input', { bubbles: true });
          textareaRef.current.dispatchEvent(ev);
        }
      };

      recognition.onerror = (err: any) => {
        console.error('Speech recognition error:', err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error('Speech initialization error:', e);
      setIsListening(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4 pt-1">
      <form
        onSubmit={handleSubmit}
        className={`relative glass-input rounded-2xl p-2 md:p-3 shadow-2xl transition-all duration-300 focus-within:ring-1 focus-within:ring-cyan-500/50 focus-within:border-cyan-500/40`}
      >
        {/* Top ambient glow light */}
        <div
          className={`absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none`}
        />

        <div className="flex items-end gap-2">
          {/* Reset / Clear Button */}
          {hasMessages && onClearChat && (
            <button
              type="button"
              onClick={onClearChat}
              title="Reset conversation"
              className="p-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-colors flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* Auto-expanding Input Area */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={
              isListening
                ? '🎙️ Listening to your voice in Canadian English/French...'
                : `Ask ${tenant.name} AI (news headlines, scores, food resos, events)...`
            }
            disabled={isLoading}
            className={`w-full bg-transparent resize-none border-0 px-3 py-2 text-sm md:text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-0 max-h-44 min-h-[44px] leading-relaxed disabled:opacity-50 ${
              isListening ? 'placeholder:text-cyan-400 placeholder:animate-pulse' : ''
            }`}
          />

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={toggleVoiceRecognition}
            title={isListening ? 'Stop listening' : 'Voice Input (Speak to AI)'}
            className={`p-2.5 md:p-3 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/50'
                : 'bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-cyan-400'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`p-2.5 md:p-3 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
              input.trim() && !isLoading
                ? `bg-gradient-to-r ${tenant.gradientClass} text-white shadow-lg ${tenant.glowClass} hover:opacity-95 active:scale-95`
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            }`}
          >
            {isLoading ? (
              <Sparkles className="w-4 h-4 animate-spin text-cyan-300" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Input Footer status */}
        <div className="hidden md:flex items-center justify-between mt-1 px-3 pt-1 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>
              Real-time Vectors & Scraped News active for{' '}
              <span className="text-slate-300 font-mono">[{tenant.id.toUpperCase()}]</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300 font-mono flex items-center gap-0.5">
              Enter <CornerDownLeft className="w-2.5 h-2.5 inline" />
            </kbd>
            <span>to send</span>
          </div>
        </div>
      </form>
    </div>
  );
};
