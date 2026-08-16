'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, ChevronRight } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { CityTenant, getTenantById } from '@/lib/tenants';
import { CityHeader } from '@/components/layout/city-header';
import { Sidebar } from '@/components/layout/sidebar';
import { StarterPrompts } from './starter-prompts';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';
import { TenantSwitcher } from '@/components/layout/tenant-switcher';
import { QuickCategoryBar, CivicCategory } from '@/components/radar/quick-category-bar';
import { SpotlightDeck } from '@/components/radar/spotlight-deck';
import { AuthProvider } from '@/lib/auth-context';
import { SocialAuthModal } from '@/components/auth/social-auth-modal';
import { SocialShareDialog } from '@/components/social/social-share-dialog';
import { PersonaSwitcher, AIPersona } from './persona-switcher';
import { LocalPartnerShowcase } from '@/components/radar/local-partner-showcase';
import { LiveCivicFeed } from '@/components/radar/live-civic-feed';
import { getCityHubData } from '@/lib/city-data';

interface ChatContainerProps {
  initialTenantId: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ initialTenantId }) => {
  const [activeTenantId, setActiveTenantId] = useState<string>(initialTenantId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileRadarOpen, setIsMobileRadarOpen] = useState(false);
  const [activeRadarCategory, setActiveRadarCategory] = useState<CivicCategory>('overview');
  const [activePersona, setActivePersona] = useState<AIPersona>('insider');

  const tenant: CityTenant = getTenantById(activeTenantId);
  const hubData = getCityHubData(activeTenantId);

  // Vercel AI SDK useChat hook
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    setMessages,
    setInput,
  } = useChat({
    api: '/api/chat',
    body: {
      tenantId: activeTenantId,
      persona: activePersona,
    },
    onError: (err) => {
      console.error('Chat error:', err);
    },
  });

  // Extract last messages for intelligent spotlight matching
  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')?.content || '';
  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === 'assistant')?.content || '';

  // Memoize joined conversation text to prevent re-extracting on every input keystroke
  const allConversationText = React.useMemo(
    () => messages.map((m) => m.content).join(' '),
    [messages]
  );

  const handleSelectQuickCategory = (cat: CivicCategory) => {
    setActiveRadarCategory(cat);
    // On mobile (< 1280px), automatically open the Spotlight deck to that tab!
    if (typeof window !== 'undefined' && window.innerWidth < 1280) {
      setIsMobileRadarOpen(true);
    }
  };

  const handleSelectStarterPrompt = (promptText: string) => {
    append({
      role: 'user',
      content: promptText,
    });
  };

  // When a persona button is clicked, immediately send an activation message
  const handlePersonaActivation = (persona: string, activationPrompt: string) => {
    append({
      role: 'user',
      content: activationPrompt,
    });
  };

  const handleSendSmartPrompt = (promptText: string) => {
    append({
      role: 'user',
      content: promptText,
    });
  };

  const handleSwitchTenant = (newTenantId: string) => {
    setActiveTenantId(newTenantId);
    setMessages([]);
    setInput('');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('city', newTenantId);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
  };

  const handleVoiceInput = (transcribedText: string) => {
    setInput(transcribedText);
  };

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Dynamic Ambient Background Gradient Mesh tied to City Color Theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`ambient-glow-orb -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br ${tenant.gradientClass}`}
          style={{ opacity: 0.22 }}
        />
        <div
          className={`ambient-glow-orb -bottom-40 -right-40 w-[700px] h-[700px] bg-gradient-to-tl ${tenant.gradientClass}`}
          style={{ opacity: 0.18 }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-slate-900/40 rounded-full blur-3xl -z-10" />
      </div>

      {/* City Header with Social Profile & Share */}
      <div className="flex-shrink-0 z-30">
        <CityHeader
          tenant={tenant}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          onToggleRadar={() => setIsMobileRadarOpen(!isMobileRadarOpen)}
          isRadarOpen={isMobileRadarOpen}
        />
      </div>

      {/* Floating Top-Right Tenant Switcher */}
      <div className="fixed top-3.5 right-64 z-40 hidden 2xl:block">
        <TenantSwitcher
          currentTenant={tenant}
          onSelectTenant={handleSwitchTenant}
        />
      </div>

      {/* Left Panel: Translucent Glass Sidebar */}
      <Sidebar
        tenant={tenant}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={handleNewChat}
        onSwitchTenant={handleSwitchTenant}
      />

      {/* Mobile Drawer Spotlight Hub (for < xl screens) */}
      <AnimatePresence>
        {isMobileRadarOpen && (
          <div className="fixed inset-0 z-50 xl:hidden flex justify-end">
            {/* Dark Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileRadarOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Slide-in Mobile Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative z-10 w-full max-w-md sm:max-w-lg h-full bg-slate-950 p-2 sm:p-4 overflow-hidden shadow-2xl flex flex-col"
            >
              <SpotlightDeck
                tenant={tenant}
                allMessagesText={allConversationText}
                hasMessages={messages.length > 0}
                onAskAI={(p) => {
                  setIsMobileRadarOpen(false);
                  handleSelectStarterPrompt(p);
                }}
                onClose={() => setIsMobileRadarOpen(false)}
                isMobileDrawer={true}
                initialTab={
                  activeRadarCategory === 'eats'
                    ? 'eats'
                    : activeRadarCategory === 'shows'
                    ? 'shows'
                    : activeRadarCategory === 'transit'
                    ? 'transit'
                    : 'overview'
                }
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Mobile Spotlight Hub Button (When closed on mobile) */}
      {!isMobileRadarOpen && (
        <div className="fixed bottom-24 right-3 z-30 xl:hidden">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileRadarOpen(true)}
            className={`flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-900/95 border border-slate-700/80 text-white text-xs font-bold shadow-2xl backdrop-blur-md transition-all hover:border-cyan-500/80 ${tenant.glowClass}`}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Spotlight & Map</span>
          </motion.button>
        </div>
      )}

      {/* Main Workspace: 2-Column Desktop Grid (Center Chat + Right Spotlight Deck) */}
      <div className="relative z-10 flex-1 min-h-0 w-full flex overflow-hidden px-2 md:px-4 pb-3 pt-1 gap-4 max-w-[1700px] mx-auto">
        {/* Center Main Chat Panel */}
        <main className="flex-1 min-h-0 flex flex-col h-full overflow-hidden glass-panel rounded-3xl border border-slate-800/80 shadow-2xl relative">
          {/* Quick Discovery Category Bar */}
          <div className="flex-shrink-0">
            <QuickCategoryBar
              tenant={tenant}
              activeCategory={activeRadarCategory}
              onSelectCategory={handleSelectQuickCategory}
            />
          </div>

          {/* Chat Stream or Empty State Starter Prompts */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col max-w-3xl mx-auto pb-10">
                <LiveCivicFeed tenant={tenant} news={hubData.news} />
                <StarterPrompts
                  tenant={tenant}
                  onSelectPrompt={handleSelectStarterPrompt}
                />
              </div>
            ) : (
              <ChatMessages
                messages={messages}
                isLoading={isLoading}
                tenant={tenant}
                onSendFollowup={handleSelectStarterPrompt}
              />
            )}
          </div>

          {/* Partner Showcase between chat and input */}
          <div className="flex-shrink-0 px-3 md:px-5 py-1.5 border-t border-slate-800/40 bg-slate-950/40">
            <LocalPartnerShowcase tenantId={tenant.id} variant="compact" />
          </div>

          {/* Persona Mood Switcher & Pinned Bottom Glass Input Bar */}
          <div className="flex-shrink-0 z-20 bg-slate-950/80 backdrop-blur-md border-t border-slate-800/50">
            <PersonaSwitcher
              tenant={tenant}
              activePersona={activePersona}
              onSelectPersona={(p) => setActivePersona(p)}
              onActivatePersona={handlePersonaActivation}
              isLoading={isLoading}
            />
            <ChatInput
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              tenant={tenant}
              onClearChat={handleNewChat}
              hasMessages={messages.length > 0}
              onVoiceInput={handleVoiceInput}
            />
          </div>
        </main>

        {/* Right Desktop Showcase Canvas (Directly fills the highlighted empty area) */}
        <div className="hidden xl:flex flex-shrink-0 h-full overflow-hidden">
          <SpotlightDeck
            tenant={tenant}
            allMessagesText={allConversationText}
            hasMessages={messages.length > 0}
            onAskAI={handleSelectStarterPrompt}
            initialTab={
              activeRadarCategory === 'eats'
                ? 'eats'
                : activeRadarCategory === 'shows'
                ? 'shows'
                : activeRadarCategory === 'transit'
                ? 'transit'
                : 'overview'
            }
          />
        </div>
      </div>

      {/* Social Auth Modal */}
      <SocialAuthModal accentClass={tenant.gradientClass} />

      {/* Social Share Modal */}
      <SocialShareDialog tenant={tenant} />
    </div>
  );
};
