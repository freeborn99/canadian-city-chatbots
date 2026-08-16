'use client';

import React, { useState, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { CityTenant, getTenantById } from '@/lib/tenants';
import { CityHeader } from '@/components/layout/city-header';
import { Sidebar } from '@/components/layout/sidebar';
import { StarterPrompts } from './starter-prompts';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';
import { TenantSwitcher } from '@/components/layout/tenant-switcher';
import { QuickCategoryBar, CivicCategory } from '@/components/radar/quick-category-bar';
import { CityRadarPanel } from '@/components/radar/city-radar-panel';
import { SpotlightDeck } from '@/components/radar/spotlight-deck';
import { AuthProvider } from '@/lib/auth-context';
import { SocialAuthModal } from '@/components/auth/social-auth-modal';
import { SocialShareDialog } from '@/components/social/social-share-dialog';
import { PersonaSwitcher, AIPersona } from './persona-switcher';

interface ChatContainerProps {
  initialTenantId: string;
}

const InnerChatContainer: React.FC<ChatContainerProps> = ({ initialTenantId }) => {
  const [activeTenantId, setActiveTenantId] = useState<string>(initialTenantId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileRadarOpen, setIsMobileRadarOpen] = useState(false);
  const [activeRadarCategory, setActiveRadarCategory] = useState<CivicCategory>('eats');
  const [activePersona, setActivePersona] = useState<AIPersona>('insider');

  const tenant: CityTenant = getTenantById(activeTenantId);

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

  // Intelligent Context Keyword Spotter: Detects intent from completed conversation and syncs Right Radar
  useEffect(() => {
    if (!lastUserMsg && !lastAssistantMsg) return;
    const textToCheck = `${lastUserMsg} ${lastAssistantMsg}`.toLowerCase();

    if (
      textToCheck.includes('food') ||
      textToCheck.includes('eat') ||
      textToCheck.includes('restaurant') ||
      textToCheck.includes('dinner') ||
      textToCheck.includes('lunch') ||
      textToCheck.includes('reservation') ||
      textToCheck.includes('bites') ||
      textToCheck.includes('brunch') ||
      textToCheck.includes('steak') ||
      textToCheck.includes('brewery') ||
      textToCheck.includes('cocktail')
    ) {
      setActiveRadarCategory('eats');
    } else if (
      textToCheck.includes('ticket') ||
      textToCheck.includes('show') ||
      textToCheck.includes('theatre') ||
      textToCheck.includes('concert') ||
      textToCheck.includes('game') ||
      textToCheck.includes('movie') ||
      textToCheck.includes('festival') ||
      textToCheck.includes('play')
    ) {
      setActiveRadarCategory('shows');
    } else if (
      textToCheck.includes('transit') ||
      textToCheck.includes('bus') ||
      textToCheck.includes('train') ||
      textToCheck.includes('subway') ||
      textToCheck.includes('ctrain') ||
      textToCheck.includes('ttc') ||
      textToCheck.includes('skytrain') ||
      textToCheck.includes('traffic')
    ) {
      setActiveRadarCategory('transit');
    } else if (
      textToCheck.includes('311') ||
      textToCheck.includes('bylaw') ||
      textToCheck.includes('parking') ||
      textToCheck.includes('waste') ||
      textToCheck.includes('municipal') ||
      textToCheck.includes('service')
    ) {
      setActiveRadarCategory('civic');
    }
  }, [messages, lastUserMsg, lastAssistantMsg]);

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

      {/* Mobile Drawer Radar (for < xl screens) */}
      <div className="xl:hidden">
        <CityRadarPanel
          tenant={tenant}
          isOpen={isMobileRadarOpen}
          onClose={() => setIsMobileRadarOpen(false)}
          activeCategory={activeRadarCategory}
          onSelectCategory={(cat) => setActiveRadarCategory(cat)}
          onAskAI={handleSelectStarterPrompt}
        />
      </div>

      {/* Main Workspace: 2-Column Desktop Grid (Center Chat + Right Spotlight Deck) */}
      <div className="relative z-10 flex-1 min-h-0 w-full flex overflow-hidden px-2 md:px-4 pb-3 pt-1 gap-4 max-w-[1700px] mx-auto">
        {/* Center Main Chat Panel */}
        <main className="flex-1 min-h-0 flex flex-col h-full overflow-hidden glass-panel rounded-3xl border border-slate-800/80 shadow-2xl relative">
          {/* Quick Discovery Category Bar */}
          <div className="flex-shrink-0">
            <QuickCategoryBar
              tenant={tenant}
              activeCategory={activeRadarCategory}
              onSelectCategory={(cat) => setActiveRadarCategory(cat)}
            />
          </div>

          {/* Chat Stream or Empty State Starter Prompts */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
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

export const ChatContainer: React.FC<ChatContainerProps> = (props) => {
  return (
    <AuthProvider>
      <InnerChatContainer {...props} />
    </AuthProvider>
  );
};
