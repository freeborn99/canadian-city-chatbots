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

import { extractChatSpotlightEntities } from '@/lib/entity-extractor';

export type SpotlightTab = 'map' | 'overview' | 'eats' | 'shows' | 'experiences' | 'outdoors' | 'transit';

interface SpotlightDeckProps {
  tenant: CityTenant;
  allMessagesText?: string;
  onAskAI: (prompt: string) => void;
  hasMessages?: boolean;
}

export const SpotlightDeck: React.FC<SpotlightDeckProps> = ({
  tenant,
  allMessagesText = '',
  onAskAI,
  hasMessages = false,
}) => {
  const hubData = getCityHubData(tenant.id);
  const [activeTab, setActiveTab] = useState<SpotlightTab>('overview');
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedNewsArticle, setSelectedNewsArticle] = useState<NewsHeadline | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [manualDistrict, setManualDistrict] = useState<GeoSpotlightDistrict | null>(null);

  // 1. Dynamic Chat Results Entity Extraction: Scans all places mentioned in the conversation
  const chatExtracted = extractChatSpotlightEntities(allMessagesText + ' ' + searchQuery, tenant.id);
  const matchedSpotlight = findMatchingGeoSpotlight(allMessagesText + ' ' + searchQuery, tenant.id);

  // 2. Prioritize dynamic chat results, then manual district, then matched street district, then default
  const dynamicDistrict: GeoSpotlightDistrict | null = chatExtracted.hasResults
    ? {
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
      }
    : null;

  const activeGeoSpotlight =
    manualDistrict && manualDistrict.tenantId === tenant.id
      ? manualDistrict
      : dynamicDistrict ||
        matchedSpotlight ||
        CANADIAN_GEO_SPOTLIGHTS.find((s) => s.tenantId === tenant.id) ||
        null;

  // Universal dynamic intent recognition: Automatically lock the best tab based on the conversation
  useEffect(() => {
    if (!hasMessages) {
      setActiveTab('overview');
      return;
    }

    // If chat returned specific places or landmarks, immediately showcase the map!
    if (chatExtracted.hasResults || matchedSpotlight) {
      setActiveTab('map');
      return;
    }

    const text = (allMessagesText + ' ' + searchQuery).toLowerCase();

    if (
      text.includes('map') ||
      text.includes('where is') ||
      text.includes('directions') ||
      text.includes('street') ||
      text.includes('ave') ||
      text.includes('avenue') ||
      text.includes('zoo')
    ) {
      setActiveTab('map');
    } else if (
      text.includes('hotel') ||
      text.includes('stay') ||
      text.includes('tour') ||
      text.includes('airbnb') ||
      text.includes('experience') ||
      text.includes('activity') ||
      text.includes('excursion')
    ) {
      setActiveTab('experiences');
    } else if (
      text.includes('hike') ||
      text.includes('trail') ||
      text.includes('park') ||
      text.includes('outdoor') ||
      text.includes('dog') ||
      text.includes('nature') ||
      text.includes('mountain')
    ) {
      setActiveTab('outdoors');
    } else if (
      text.includes('food') ||
      text.includes('eat') ||
      text.includes('restaurant') ||
      text.includes('dinner') ||
      text.includes('lunch') ||
      text.includes('steak') ||
      text.includes('brewery') ||
      text.includes('cocktail') ||
      text.includes('reservation')
    ) {
      setActiveTab('eats');
    } else if (
      text.includes('ticket') ||
      text.includes('show') ||
      text.includes('theatre') ||
      text.includes('concert') ||
      text.includes('game') ||
      text.includes('play')
    ) {
      setActiveTab('shows');
    } else if (
      text.includes('transit') ||
      text.includes('train') ||
      text.includes('bus') ||
      text.includes('subway') ||
      text.includes('ctrain') ||
      text.includes('ttc')
    ) {
      setActiveTab('transit');
    }
  }, [allMessagesText, searchQuery, hasMessages, chatExtracted.hasResults, matchedSpotlight]);

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
    { id: 'map' as SpotlightTab, label: 'Geo-Map Radar', icon: MapIcon },
    { id: 'overview' as SpotlightTab, label: 'News & Scores', icon: Newspaper },
    { id: 'eats' as SpotlightTab, label: 'Dining Resos', icon: Utensils, count: (hubData.restaurants || []).length },
    { id: 'shows' as SpotlightTab, label: 'Tickets', icon: Ticket, count: (hubData.shows || []).length },
    { id: 'experiences' as SpotlightTab, label: 'Tours & Stays', icon: Bed, count: (hubData.hotels?.length || 0) + (hubData.experiences?.length || 0) },
    { id: 'outdoors' as SpotlightTab, label: 'Trails & Parks', icon: Trees, count: (hubData.outdoors || []).length },
    { id: 'transit' as SpotlightTab, label: 'Transit', icon: Train },
  ];

  return (
    <>
      <aside className="w-80 md:w-96 xl:w-[430px] h-full flex flex-col glass-panel rounded-3xl border border-slate-800/80 shadow-2xl p-4 md:p-5 overflow-hidden transition-all duration-300">
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

          <button
            onClick={handleShare}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors border border-slate-800"
            title="Share Spotlight Link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
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

        {/* Persistent Tab Bar (Scrollable for full category coverage) */}
        <div className="flex gap-1 p-1 my-2 rounded-2xl bg-slate-900/90 border border-slate-800 flex-shrink-0 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center gap-1 py-1.5 px-2.5 rounded-xl text-[10px] font-semibold transition-all ${
                  isSelected
                    ? `bg-slate-800 text-white shadow-md border border-slate-700 ${tenant.glowClass}`
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/60'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isSelected ? 'text-cyan-400' : 'text-slate-400'
                  }`}
                />
                <span className="whitespace-nowrap">{tab.label}</span>
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
              {/* Dynamic Interactive Geo-Map (Always Visible & Reacting to Search) */}
              {activeGeoSpotlight && (
                <div className="mb-1">
                  <InteractiveSpotlightMap
                    district={activeGeoSpotlight}
                    tenant={tenant}
                    onAskAI={onAskAI}
                    onSelectDistrict={(d) => setManualDistrict(d)}
                  />
                </div>
              )}

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
                  {(hubData.sports || [])
                    .filter((g) => g.team.toLowerCase().includes(searchQuery.toLowerCase()) || g.opponent.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((game: SportsGameScore) => (
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

              {/* Regional News Headlines with Expand Action */}
              <div>
                <div className="flex items-center justify-between text-xs px-1 mb-2">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Newspaper className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Regional News Highlights</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Click to Expand</span>
                </div>

                <div className="space-y-2.5">
                  {(hubData.news || [])
                    .filter((n) => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.summary.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((n: NewsHeadline) => (
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

                        <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] text-cyan-400 font-medium">
                          <span>Read AI Executive Briefing</span>
                          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    ))}
                </div>
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

              {(hubData.restaurants || [])
                .filter((r) => r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.cuisine.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((restaurant: RestaurantHighlight) => (
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
                        href={restaurant.reservationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-gradient-to-r ${tenant.gradientClass} text-white font-semibold text-xs shadow-md hover:opacity-95 transition-opacity`}
                      >
                        <span>Reserve Table ({restaurant.bookingPlatform})</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

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

              {(hubData.shows || [])
                .filter((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.venue.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((show: ShowHighlight) => (
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
                        href={show.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-gradient-to-r ${tenant.gradientClass} text-white font-semibold text-xs shadow-md hover:opacity-95 transition-opacity`}
                      >
                        <span>Get Tickets ({show.ticketPlatform})</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

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
                  {hubData.hotels
                    ?.filter((h) => h.name.toLowerCase().includes(searchQuery.toLowerCase()) || h.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((hotel) => (
                      <HotelCard
                        key={hotel.id}
                        hotel={hotel}
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
                  {hubData.experiences
                    ?.filter((e) => e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.operator.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((exp) => (
                      <ExperienceCard
                        key={exp.id}
                        experience={exp}
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

              {hubData.outdoors
                ?.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((park) => (
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
