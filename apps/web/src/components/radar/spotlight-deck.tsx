'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Utensils,
  Ticket,
  MapPin,
  Star,
  ExternalLink,
  Clock,
  Sparkles,
  Compass,
  Navigation,
  Share2,
  Calendar,
  Train,
  Check,
  Flame,
  Bookmark,
  Newspaper,
  Trophy,
  Tv,
  Trees,
  Bed,
  ChevronRight,
  Search,
  Map as MapIcon,
  X,
} from 'lucide-react';
import { CityTenant } from '@/lib/tenants';
import {
  getCityHubData,
  RestaurantHighlight,
  ShowHighlight,
  TransitLineStatus,
  NewsHeadline,
  SportsGameScore,
  HotelStay,
  TourExperience,
  OutdoorPark,
} from '@/lib/city-data';
import { findMatchingGeoSpotlight, CANADIAN_GEO_SPOTLIGHTS, GeoSpotlightDistrict } from '@/lib/city-geo-data';
import { InteractiveSpotlightMap } from './interactive-spotlight-map';
import { NewsExpandedModal } from './news-expanded-modal';
import { HotelCard } from './hotel-card';
import { ExperienceCard } from './experience-card';
import { OutdoorCard } from './outdoor-card';
import { LocalPartnerShowcase } from './local-partner-showcase';
import { buildAffiliateUrl } from '@/lib/affiliate-config';
import { useAuth } from '@/lib/auth-context';

import { extractChatSpotlightEntities } from '@/lib/entity-extractor';

export type SpotlightTab = 'map' | 'overview' | 'eats' | 'shows' | 'experiences' | 'outdoors' | 'transit';

interface SpotlightDeckProps {
  tenant: CityTenant;
  allMessagesText?: string;
  onAskAI: (prompt: string) => void;
  hasMessages?: boolean;
  onClose?: () => void;
  isMobileDrawer?: boolean;
  initialTab?: SpotlightTab;
}

export const SpotlightDeck: React.FC<SpotlightDeckProps> = ({
  tenant,
  allMessagesText = '',
  onAskAI,
  hasMessages = false,
  onClose,
  isMobileDrawer = false,
  initialTab = 'overview',
}) => {
  const hubData = getCityHubData(tenant.id);
  const [activeTab, setActiveTab] = useState<SpotlightTab>(initialTab);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedNewsArticle, setSelectedNewsArticle] = useState<NewsHeadline | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [manualDistrict, setManualDistrict] = useState<GeoSpotlightDistrict | null>(null);
  const { openShareModal } = useAuth();

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const deferredSearch = React.useDeferredValue(searchQuery);
  const normalizedSearch = deferredSearch.trim().toLowerCase();

  // 1. Dynamic Chat Results Entity Extraction: Memoized to eliminate synchronous main-thread blocking
  const chatExtracted = React.useMemo(() => {
    return extractChatSpotlightEntities(allMessagesText + (normalizedSearch ? ` ${normalizedSearch}` : ''), tenant.id);
  }, [allMessagesText, normalizedSearch, tenant.id]);

  const matchedSpotlight = React.useMemo(() => {
    return findMatchingGeoSpotlight(allMessagesText + (normalizedSearch ? ` ${normalizedSearch}` : ''), tenant.id);
  }, [allMessagesText, normalizedSearch, tenant.id]);

  // 2. Prioritize dynamic chat results, then manual district, then matched street district, then default
  const dynamicDistrict: GeoSpotlightDistrict | null = React.useMemo(() => {
    if (!chatExtracted.hasResults) return null;
    return {
      id: 'dynamic-chat-results',
      tenantId: tenant.id,
      keywords: [],
      name: chatExtracted.title,
      tagline: chatExtracted.subtitle,
      center: chatExtracted.center,
      zoom: chatExtracted.zoom,
      description: `Interactive map pinpointing all ${chatExtracted.pins.length} venues and attractions mentioned in your chat results.`,
      vibe: `🎯 ${chatExtracted.pins.length} Chat Venues Pinned`,
      walkScore: 96,
      transitAccess: 'Direct GPS Pinpoints',
      pins: chatExtracted.pins,
    };
  }, [chatExtracted, tenant.id]);

  const activeGeoSpotlight = React.useMemo(() => {
    if (manualDistrict && manualDistrict.tenantId === tenant.id) return manualDistrict;
    return (
      dynamicDistrict ||
      matchedSpotlight ||
      CANADIAN_GEO_SPOTLIGHTS.find((s) => s.tenantId === tenant.id) ||
      null
    );
  }, [manualDistrict, dynamicDistrict, matchedSpotlight, tenant.id]);

  // Memoized Filtered Lists for instant 60fps search
  const filteredSports = React.useMemo(() => {
    if (!normalizedSearch) return hubData.sports || [];
    return (hubData.sports || []).filter(
      (g) => g.team.toLowerCase().includes(normalizedSearch) || g.opponent.toLowerCase().includes(normalizedSearch)
    );
  }, [hubData.sports, normalizedSearch]);

  const filteredNews = React.useMemo(() => {
    if (!normalizedSearch) return hubData.news || [];
    return (hubData.news || []).filter(
      (n) => n.title.toLowerCase().includes(normalizedSearch) || n.summary.toLowerCase().includes(normalizedSearch)
    );
  }, [hubData.news, normalizedSearch]);

  const filteredRestaurants = React.useMemo(() => {
    let list = hubData.restaurants || [];
    if (normalizedSearch) {
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(normalizedSearch) ||
          r.cuisine.toLowerCase().includes(normalizedSearch) ||
          r.neighborhood.toLowerCase().includes(normalizedSearch)
      );
    }
    return list;
  }, [hubData.restaurants, normalizedSearch]);

  const filteredShows = React.useMemo(() => {
    let list = hubData.shows || [];
    if (normalizedSearch) {
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(normalizedSearch) ||
          s.venue.toLowerCase().includes(normalizedSearch) ||
          s.category.toLowerCase().includes(normalizedSearch)
      );
    }
    return list;
  }, [hubData.shows, normalizedSearch]);

  const filteredHotels = React.useMemo(() => {
    let list = hubData.hotels || [];
    if (normalizedSearch) {
      list = list.filter(
        (h) =>
          h.name.toLowerCase().includes(normalizedSearch) ||
          h.neighborhood.toLowerCase().includes(normalizedSearch) ||
          h.tag.toLowerCase().includes(normalizedSearch)
      );
    }
    return list;
  }, [hubData.hotels, normalizedSearch]);

  const filteredExperiences = React.useMemo(() => {
    let list = hubData.experiences || [];
    if (normalizedSearch) {
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(normalizedSearch) ||
          e.operator.toLowerCase().includes(normalizedSearch) ||
          e.category.toLowerCase().includes(normalizedSearch)
      );
    }
    return list;
  }, [hubData.experiences, normalizedSearch]);

  const filteredOutdoors = React.useMemo(() => {
    if (!normalizedSearch) return hubData.outdoors || [];
    return (hubData.outdoors || []).filter(
      (p) =>
        p.name.toLowerCase().includes(normalizedSearch) ||
        p.neighborhood.toLowerCase().includes(normalizedSearch) ||
        p.category.toLowerCase().includes(normalizedSearch)
    );
  }, [hubData.outdoors, normalizedSearch]);

  const toggleSave = (id: string) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const tabs = [
    { id: 'overview' as SpotlightTab, label: 'News & Scores', icon: Newspaper },
    { id: 'map' as SpotlightTab, label: 'Geo-Map Radar', icon: MapIcon },
    { id: 'eats' as SpotlightTab, label: 'Dining Resos', icon: Utensils, count: (hubData.restaurants || []).length },
    { id: 'shows' as SpotlightTab, label: 'Tickets', icon: Ticket, count: (hubData.shows || []).length },
    { id: 'experiences' as SpotlightTab, label: 'Tours & Stays', icon: Bed, count: (hubData.hotels?.length || 0) + (hubData.experiences?.length || 0) },
    { id: 'outdoors' as SpotlightTab, label: 'Trails & Parks', icon: Trees, count: (hubData.outdoors || []).length },
    { id: 'transit' as SpotlightTab, label: 'Transit', icon: Train },
  ];

  return (
    <>
      <aside className={`flex flex-col glass-panel rounded-3xl border border-slate-800/80 shadow-2xl p-4 md:p-5 overflow-hidden transition-all duration-300 ${
        isMobileDrawer ? 'w-full h-full max-h-screen' : 'w-80 md:w-96 xl:w-[430px] h-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-tr ${tenant.gradientClass} p-0.5 shadow-lg ${tenant.glowClass}`}
            >
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  {tenant.name} Spotlight
                </h3>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Interactive AI Geo-Map & Radar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors border border-slate-800"
              title="Share Spotlight Link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 transition-colors border border-slate-700 shadow-sm"
                title="Close Spotlight"
              >
                <X className="w-4 h-4 text-slate-300" />
              </button>
            )}
          </div>
        </div>

        {/* In-Deck Search & Filter Bar */}
        <div className="relative mt-2.5 mb-1 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${tenant.name} places, streets, zoo, food...`}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 transition-all"
          />
        </div>

        {/* Wrapped Tab Bar (No horizontal scrolling, clean wrapping for full category visibility) */}
        <div className="flex flex-wrap gap-1.5 p-1.5 my-2 rounded-2xl bg-slate-900/90 border border-slate-800 flex-shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl text-[11px] font-semibold transition-all ${
                  isSelected
                    ? `bg-slate-800 text-white shadow-md border border-slate-700 ${tenant.glowClass}`
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/60 bg-slate-950/40 border border-transparent'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isSelected ? 'text-cyan-400' : 'text-slate-400'
                  }`}
                />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60' : 'bg-slate-800/90 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Deck */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3.5">
          {/* TAB 0: INTERACTIVE GEO-MAP RADAR */}
          {activeTab === 'map' && activeGeoSpotlight && (
            <div className="space-y-3">
              <InteractiveSpotlightMap
                district={activeGeoSpotlight}
                tenant={tenant}
                onAskAI={onAskAI}
                onSelectDistrict={(d) => setManualDistrict(d)}
              />

              {/* Quick Prompt Suggestions */}
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
                <span className="font-bold text-slate-300 block text-[11px]">
                  💡 Ask AI about {activeGeoSpotlight.name}:
                </span>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() =>
                      onAskAI(`What are the best restaurants on ${activeGeoSpotlight.name} in ${tenant.name}?`)
                    }
                    className="text-left px-2.5 py-1.5 rounded-xl bg-slate-950/70 hover:bg-slate-850 border border-slate-800 text-cyan-300 hover:text-white transition-colors text-[11px]"
                  >
                    📍 What are the best restaurants on {activeGeoSpotlight.name}?
                  </button>
                  <button
                    onClick={() =>
                      onAskAI(`How do I take transit to ${activeGeoSpotlight.name} in ${tenant.name}?`)
                    }
                    className="text-left px-2.5 py-1.5 rounded-xl bg-slate-950/70 hover:bg-slate-850 border border-slate-800 text-cyan-300 hover:text-white transition-colors text-[11px]"
                  >
                    🚇 How do I take transit to {activeGeoSpotlight.name}?
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: NEWS & SPORTS SCORES */}
          {activeTab === 'overview' && (
            <div className="space-y-3.5">
              {/* Regional News Headlines with Expand Action */}
              <div>
                <div className="flex items-center justify-between text-xs px-1 mb-2">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Newspaper className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Regional News Highlights</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Real-time summaries</span>
                </div>

                <div className="space-y-2.5">
                  {filteredNews.map((n: NewsHeadline) => (
                    <div
                      key={n.id}
                      onClick={() => setSelectedNewsArticle(n)}
                      className="p-3 rounded-2xl glass-card border border-slate-800/90 hover:border-slate-700/80 shadow-md space-y-1.5 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-semibold text-cyan-400">{n.source}</span>
                        <span className="text-slate-500 font-mono">{n.timeAgo}</span>
                      </div>

                      <h4 className="text-xs font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                        {n.title}
                      </h4>

                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {n.summary}
                      </p>

                      <div className="flex items-center justify-between pt-1.5 border-t border-slate-800/60 text-[10px]">
                        <div className="flex items-center gap-2">
                          <a
                            href={n.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 font-semibold text-cyan-300 hover:text-white bg-cyan-950/60 hover:bg-cyan-900/80 px-2 py-0.5 rounded-lg border border-cyan-800/40 hover:border-cyan-600 transition-colors"
                          >
                            <span>Read Story</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                          {n.expandedDetails?.relatedActionUrl && (
                            <a
                              href={n.expandedDetails.relatedActionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-2 py-0.5 rounded-lg border border-slate-700 transition-colors"
                            >
                              <span>{n.expandedDetails.relatedActionText || 'Civic Link'}</span>
                              <Compass className="w-2.5 h-2.5 text-cyan-400" />
                            </a>
                          )}
                        </div>
                        <span className="text-cyan-400 font-medium flex items-center gap-0.5 group-hover:text-cyan-300">
                          <span>Briefing</span>
                          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Local Sports Scores */}
              <div>
                <div className="flex items-center justify-between text-xs px-1 mb-2">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Local Sports & Matchups</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Live Feeds</span>
                </div>

                <div className="space-y-2">
                  {filteredSports.map((game: SportsGameScore) => (
                    <div
                      key={game.id}
                      className="p-3 rounded-2xl glass-card border border-slate-800/90 shadow-md text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                          {game.league}
                        </span>
                        <span
                          className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${
                            game.status === 'Final'
                              ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300'
                              : 'bg-cyan-950/60 border-cyan-800/60 text-cyan-300'
                          }`}
                        >
                          {game.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between font-bold text-white text-xs pt-0.5">
                        <span>{game.team}</span>
                        {game.score ? (
                          <span className="text-emerald-400 font-mono text-sm">{game.score}</span>
                        ) : (
                          <span className="text-slate-400 text-[11px] font-mono">{game.gameTime}</span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                        <span>vs. {game.opponent}</span>
                        {game.tvBroadcast && (
                          <span className="flex items-center gap-1 text-slate-400">
                            <Tv className="w-3 h-3" />
                            <span>{game.tvBroadcast}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partner Showcase Injection */}
              <div className="py-1">
                <LocalPartnerShowcase tenantId={tenant.id} />
              </div>
            </div>
          )}

          {/* TAB 2: DINING RESERVATIONS */}
          {activeTab === 'eats' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs px-1">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Featured Resos & Tables</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Instant Booking</span>
              </div>

              {/* Partner Showcase Injection */}
              <div className="py-1">
                <LocalPartnerShowcase 
                  tenantId={tenant.id} 
                  title="Exclusive Dining Experiences" 
                  description="Book premium chef-tasting menus and VIP tables across the city."
                  imageUrl="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800"
                />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
              {filteredRestaurants.map((restaurant: RestaurantHighlight) => (
                  <motion.div
                    key={restaurant.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-2xl glass-card border border-slate-800/90 hover:border-slate-700/80 p-3.5 shadow-xl transition-all group overflow-hidden"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300">
                            {restaurant.tag}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono font-medium">
                            {restaurant.priceLevel}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                          {restaurant.name}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-md text-amber-300 text-xs font-semibold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{restaurant.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mb-1">{restaurant.cuisine}</p>

                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-2">
                      <MapPin className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                      <span className="truncate">{restaurant.neighborhood}</span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800/80 mb-2 text-xs flex items-start gap-1.5">
                      <Utensils className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div className="truncate">
                        <span className="text-slate-400 text-[9px] uppercase font-semibold block">Must Try:</span>
                        <span className="text-slate-200 font-medium truncate block">{restaurant.signatureDish}</span>
                      </div>
                    </div>

                    <div className="mb-2.5">
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-1">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span>Open Reso Slots:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {restaurant.availableTimes.map((time) => (
                          <span
                            key={time}
                            className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-900 border border-slate-750 text-cyan-300"
                          >
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
                      <a
                        href={buildAffiliateUrl(restaurant.reservationUrl, restaurant.bookingPlatform, tenant.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-gradient-to-r ${tenant.gradientClass} text-white font-semibold text-xs shadow-md hover:opacity-95 transition-opacity`}
                      >
                        <span>Reserve Table ({restaurant.bookingPlatform})</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        onClick={() => openShareModal({ 
                          title: restaurant.name, 
                          text: `Check out ${restaurant.name} in ${tenant.name}!`,
                          url: window.location.href 
                        })}
                        className="p-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
                        title="Share"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleSave(restaurant.id)}
                        className="p-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-300 transition-colors"
                        title="Save to Plan"
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            savedItems.includes(restaurant.id) ? 'fill-amber-400 text-amber-400' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LIVE SHOWS & TICKETS */}
          {activeTab === 'shows' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs px-1">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Shows, Concerts & Sports</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Box Office</span>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
              {filteredShows.map((show: ShowHighlight) => (
                  <motion.div
                    key={show.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-2xl glass-card border border-slate-800/90 hover:border-slate-700/80 p-3.5 shadow-xl transition-all group overflow-hidden"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-950/80 border border-violet-800/60 text-violet-300">
                        {show.category}
                      </span>
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-rose-950/60 border border-rose-800/50 text-rose-300">
                        {show.availabilityStatus}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors mb-1">
                      {show.title}
                    </h4>

                    <div className="space-y-0.5 mb-2 text-xs text-slate-300">
                      <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                        <MapPin className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                        <span className="truncate">{show.venue}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                        <Calendar className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{show.dates}</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800/80 mb-2.5 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">Tickets From:</span>
                      <span className="font-bold text-white font-mono">{show.ticketPriceRange}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
                      <a
                        href={buildAffiliateUrl(show.ticketUrl, show.ticketPlatform, tenant.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-gradient-to-r ${tenant.gradientClass} text-white font-semibold text-xs shadow-md hover:opacity-95 transition-opacity`}
                      >
                        <span>Get Tickets ({show.ticketPlatform})</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        onClick={() => openShareModal({ 
                          title: show.title, 
                          text: `Check out ${show.title} at ${show.venue} in ${tenant.name}!`,
                          url: window.location.href 
                        })}
                        className="p-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
                        title="Share"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleSave(show.id)}
                        className="p-1.5 rounded-xl bg-slate-855 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-300 transition-colors"
                        title="Save to Plan"
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            savedItems.includes(show.id) ? 'fill-amber-400 text-amber-400' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TOURS & STAYS (Monetized Hotels & Experiences) */}
          {activeTab === 'experiences' && (
            <div className="space-y-4">
              {/* Hotels & Boutique Stays */}
              <div>
                <div className="flex items-center justify-between text-xs px-1 mb-2">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Bed className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Boutique Hotels & Stays</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Best Rates</span>
                </div>

                <div className="space-y-3">
                  {filteredHotels.map((hotel) => (
                      <HotelCard
                        key={hotel.id}
                        hotel={hotel}
                        tenantId={tenant.id}
                        accentClass={tenant.gradientClass}
                        isSaved={savedItems.includes(hotel.id)}
                        onToggleSave={() => toggleSave(hotel.id)}
                        onAskAI={onAskAI}
                      />
                    ))}
                </div>
              </div>

              {/* Local Tours & Excursions */}
              <div>
                <div className="flex items-center justify-between text-xs px-1 mb-2">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Top Tours & Excursions</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Viator / GYG</span>
                </div>

                <div className="space-y-3">
                  {filteredExperiences.map((exp) => (
                      <ExperienceCard
                        key={exp.id}
                        experience={exp}
                        tenantId={tenant.id}
                        accentClass={tenant.gradientClass}
                        isSaved={savedItems.includes(exp.id)}
                        onToggleSave={() => toggleSave(exp.id)}
                        onAskAI={onAskAI}
                      />
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: TRAILS & PARKS */}
          {activeTab === 'outdoors' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs px-1">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Trees className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Scenic Trails & Parks</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">City Escapes</span>
              </div>

              {filteredOutdoors.map((park) => (
                  <OutdoorCard
                    key={park.id}
                    park={park}
                    accentClass={tenant.gradientClass}
                    isSaved={savedItems.includes(park.id)}
                    onToggleSave={() => toggleSave(park.id)}
                    onAskAI={onAskAI}
                  />
                ))}
            </div>
          )}

          {/* TAB 6: TRANSIT RADAR */}
          {activeTab === 'transit' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs px-1">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Train className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Live Transit Feed</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Real-Time</span>
              </div>

              {(hubData.transitLines || []).map((t: TransitLineStatus) => (
                <div
                  key={t.id}
                  className="p-3 rounded-2xl glass-card border border-slate-800/90 shadow-md text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{t.lineName}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-semibold">
                      {t.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{t.details}</p>
                </div>
              ))}
            </div>
          )}

          {/* Persistent Showcase at the bottom of the Spotlight window */}
          <div className="pt-4 pb-2">
            <LocalPartnerShowcase tenantId={tenant.id} />
          </div>
        </div>
      </aside>

      {/* Expanded News Modal */}
      {selectedNewsArticle && (
        <NewsExpandedModal
          article={selectedNewsArticle}
          accentClass={tenant.gradientClass}
          onClose={() => setSelectedNewsArticle(null)}
          onAskAI={onAskAI}
        />
      )}
    </>
  );
};
