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

export type SpotlightTab = 'hub' | 'map' | 'overview' | 'eats' | 'shows' | 'experiences' | 'outdoors' | 'transit';

export function getProvinceNewsTopic(tenantId: string) {
  const t = tenantId.toLowerCase();
  if (t === 'yyc' || t === 'yeg') {
    return { id: 'province', label: '🛢️ Oil, Gas & Energy', filterTags: ['energy', 'oil', 'gas', 'pipeline', 'carbon', 'clean energy', 'resources'] };
  }
  if (t === 'yvr' || t === 'yyj') {
    return { id: 'province', label: '🌲 Pacific Trade & Tech', filterTags: ['pacific', 'forestry', 'port', 'maritime', 'marine', 'clean', 'gaming', 'vfx', 'green'] };
  }
  if (t === 'yyz') {
    return { id: 'province', label: '📈 Bay St & AI Tech', filterTags: ['bay street', 'finance', 'ai', 'fintech', 'tsx', 'mars', 'housing', 'banking'] };
  }
  if (t === 'yow') {
    return { id: 'province', label: '🏛️ Federal Policy & Defense', filterTags: ['federal', 'parliament', 'policy', 'kanata', 'telecom', 'defense', 'government', 'public service'] };
  }
  if (t === 'yul') {
    return { id: 'province', label: '⚜️ Aerospace & AI Hub', filterTags: ['aerospace', 'mila', 'ai', 'saf', 'bombardier', 'aviation', 'spectacles', 'french'] };
  }
  if (t === 'ywg') {
    return { id: 'province', label: '🌾 Agri-Tech & Logistics', filterTags: ['agri', 'centreport', 'grain', 'freight', 'agriculture', 'logistics', 'transport'] };
  }
  if (t === 'yhz') {
    return { id: 'province', label: '⚓ Ocean Tech & Naval', filterTags: ['ocean', 'naval', 'shipbuilding', 'maritime', 'atlantic', 'ferry', 'supercluster'] };
  }
  if (t === 'yyt') {
    return { id: 'province', label: '🌊 Offshore & Fisheries', filterTags: ['offshore', 'wind', 'fisheries', 'mining', 'minerals', 'subsea', 'ocean'] };
  }
  return { id: 'province', label: '💼 Regional Sector', filterTags: ['business', 'development', 'industry'] };
}

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
  initialTab = 'hub',
}) => {
  const hubData = getCityHubData(tenant.id);
  const [activeTab, setActiveTab] = useState<SpotlightTab>(initialTab || 'overview');
  const [newsSubFilter, setNewsSubFilter] = useState<'all' | 'sports' | 'business' | 'province' | 'govt' | 'tech'>('all');
  const [eatsSubFilter, setEatsSubFilter] = useState<'all' | 'top-rated' | 'patios' | 'late-night'>('all');
  const [showsSubFilter, setShowsSubFilter] = useState<'all' | 'theatre' | 'concerts' | 'comedy'>('all');
  const [toursSubFilter, setToursSubFilter] = useState<'all' | 'tours' | 'hotels'>('all');
  
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedNewsArticle, setSelectedNewsArticle] = useState<NewsHeadline | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [manualDistrict, setManualDistrict] = useState<GeoSpotlightDistrict | null>(null);
  const { openShareModal } = useAuth();
  const provinceTopic = getProvinceNewsTopic(tenant.id);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const deferredSearch = React.useDeferredValue(searchQuery);
  const normalizedSearch = deferredSearch.trim().toLowerCase();

  const chatExtracted = React.useMemo(() => {
    return extractChatSpotlightEntities(allMessagesText + (normalizedSearch ? ` ${normalizedSearch}` : ''), tenant.id);
  }, [allMessagesText, normalizedSearch, tenant.id]);

  const matchedSpotlight = React.useMemo(() => {
    return findMatchingGeoSpotlight(allMessagesText + (normalizedSearch ? ` ${normalizedSearch}` : ''), tenant.id);
  }, [allMessagesText, normalizedSearch, tenant.id]);

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

  const filteredSports = React.useMemo(() => {
    let list = hubData.sports || [];
    if (normalizedSearch) {
      list = list.filter(
        (g) => g.team.toLowerCase().includes(normalizedSearch) || g.opponent.toLowerCase().includes(normalizedSearch)
      );
    }
    return list;
  }, [hubData.sports, normalizedSearch]);

  const filteredNews = React.useMemo(() => {
    let list = hubData.news || [];
    
    if (newsSubFilter === 'sports') {
      return [];
    } else if (newsSubFilter === 'business') {
      list = list.filter((n) => n.category === 'Business' || n.category === 'Development' || n.category === 'Finance' || /business|market|tsx|economy|commercial/i.test(n.title + ' ' + n.summary));
    } else if (newsSubFilter === 'province') {
      list = list.filter((n) => {
        const text = (n.title + ' ' + n.summary + ' ' + n.category).toLowerCase();
        return provinceTopic.filterTags.some((tag) => text.includes(tag.toLowerCase()));
      });
      if (list.length === 0) list = (hubData.news || []).slice(0, 2);
    } else if (newsSubFilter === 'govt') {
      list = list.filter((n) => n.category === 'Civic' || n.category === 'Government' || n.category === 'Policy' || /city council|mayor|province|legislation|transit|infrastructure|budget/i.test(n.title + ' ' + n.summary));
    } else if (newsSubFilter === 'tech') {
      list = list.filter((n) => n.category === 'Technology' || /tech|ai|startup|innovation|research|software|incubator/i.test(n.title + ' ' + n.summary));
      if (list.length === 0) list = (hubData.news || []).filter((n) => /tech|ai|innovation|program/i.test(n.title + ' ' + n.summary));
    }

    if (normalizedSearch) {
      list = list.filter(
        (n) => n.title.toLowerCase().includes(normalizedSearch) || n.summary.toLowerCase().includes(normalizedSearch)
      );
    }
    return list;
  }, [hubData.news, newsSubFilter, normalizedSearch, provinceTopic]);

  const filteredRestaurants = React.useMemo(() => {
    let list = hubData.restaurants || [];
    if (eatsSubFilter === 'top-rated') {
      list = list.filter((r) => r.rating >= 4.8);
    } else if (eatsSubFilter === 'patios') {
      list = list.filter((r) => /patio|view|waterfront|rooftop|terrace/i.test(r.tag + ' ' + r.neighborhood + ' ' + r.name));
    } else if (eatsSubFilter === 'late-night') {
      list = list.filter((r) => /bar|cocktail|late|pub|lounge/i.test(r.cuisine + ' ' + r.tag + ' ' + r.name));
    }

    if (normalizedSearch) {
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(normalizedSearch) ||
          r.cuisine.toLowerCase().includes(normalizedSearch) ||
          r.neighborhood.toLowerCase().includes(normalizedSearch)
      );
    }
    return list;
  }, [hubData.restaurants, eatsSubFilter, normalizedSearch]);

  const filteredShows = React.useMemo(() => {
    let list = hubData.shows || [];
    if (showsSubFilter === 'theatre') {
      list = list.filter((s) => s.category === 'Theatre' || s.category === 'Symphony');
    } else if (showsSubFilter === 'concerts') {
      list = list.filter((s) => s.category === 'Concert');
    } else if (showsSubFilter === 'comedy') {
      list = list.filter((s) => s.category === 'Comedy' || s.category === 'Festival');
    }

    if (normalizedSearch) {
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(normalizedSearch) ||
          s.venue.toLowerCase().includes(normalizedSearch) ||
          s.category.toLowerCase().includes(normalizedSearch)
      );
    }
    return list;
  }, [hubData.shows, showsSubFilter, normalizedSearch]);

  const filteredHotels = React.useMemo(() => {
    let list = hubData.hotels || [];
    if (normalizedSearch) {
      list = list.filter(
        (h) =>
          h.name.toLowerCase().includes(normalizedSearch) ||
          h.neighborhood.toLowerCase().includes(normalizedSearch)
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
          e.operator.toLowerCase().includes(normalizedSearch)
      );
    }
    return list;
  }, [hubData.experiences, normalizedSearch]);

  const filteredOutdoors = React.useMemo(() => {
    let list = hubData.outdoors || [];
    if (normalizedSearch) {
      list = list.filter(
        (o) =>
          o.name.toLowerCase().includes(normalizedSearch) ||
          o.neighborhood.toLowerCase().includes(normalizedSearch)
      );
    }
    return list;
  }, [hubData.outdoors, normalizedSearch]);

  const filteredTransit = React.useMemo(() => {
    let list = hubData.transitLines || [];
    if (normalizedSearch) {
      list = list.filter(
        (t) =>
          t.lineName.toLowerCase().includes(normalizedSearch) ||
          t.systemName.toLowerCase().includes(normalizedSearch)
      );
    }
    return list;
  }, [hubData.transitLines, normalizedSearch]);

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

  const categories = [
    { id: 'overview' as SpotlightTab, label: 'Local News & Intel', shortLabel: 'News', icon: Newspaper, count: (hubData.news || []).length, desc: 'Breaking news, sports matchups, business & province sectors' },
    { id: 'map' as SpotlightTab, label: 'Interactive Geo-Map', shortLabel: 'Map Radar', icon: MapIcon, desc: 'Live GPS pins, street districts & neighborhood guide' },
    { id: 'eats' as SpotlightTab, label: 'Dining & Resos', shortLabel: 'Dining', icon: Utensils, count: (hubData.restaurants || []).length, desc: 'Top-rated culinary spots, patio reservations & food crawls' },
    { id: 'shows' as SpotlightTab, label: 'Shows & Tickets', shortLabel: 'Tickets', icon: Ticket, count: (hubData.shows || []).length, desc: 'Live arena concerts, Mirvish/Neptune theatre & comedy' },
    { id: 'experiences' as SpotlightTab, label: 'Tours & Stays', shortLabel: 'Tours & Stays', icon: Bed, count: (hubData.hotels?.length || 0) + (hubData.experiences?.length || 0), desc: 'Viator day tours, Rocky Mountain/harbour trips & hotels' },
    { id: 'outdoors' as SpotlightTab, label: 'Trails & Parks', shortLabel: 'Trails & Parks', icon: Trees, count: (hubData.outdoors || []).length, desc: 'Urban green pathways, coastal lookouts & hiking trails' },
    { id: 'transit' as SpotlightTab, label: 'Transit Alerts', shortLabel: 'Transit', icon: Train, count: (hubData.transitLines || []).length, desc: 'Live LRT / Subway status, airport express & road closures' },
  ];

  const currentCategory = categories.find((c) => c.id === activeTab);

  return (
    <>
      <aside className={`flex flex-col glass-panel rounded-3xl border border-slate-800/80 shadow-2xl p-4 md:p-5 overflow-hidden transition-all duration-300 ${
        isMobileDrawer ? 'w-full h-full max-h-screen' : 'w-80 md:w-96 xl:w-[430px] h-full'
      }`}>
        {/* Top Header */}
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
                {activeTab === 'hub' ? 'All Civic Hubs' : currentCategory?.label || 'Civic Radar'}
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

        {/* Drillable Navigation Bar: Shows '← Back to All Categories' when drilled down */}
        {activeTab !== 'hub' ? (
          <div className="my-2.5 flex-shrink-0 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveTab('hub')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-xs font-bold text-cyan-300 hover:text-white transition-all shadow-sm active:scale-95 group"
                title="Return to top level categories"
              >
                <ChevronRight className="w-3.5 h-3.5 rotate-180 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
                <span>All Categories</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-950/70 border border-slate-800 px-3 py-1 rounded-xl">
                {currentCategory?.icon && <currentCategory.icon className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{currentCategory?.shortLabel}</span>
              </div>
            </div>

            {/* Sub-menu Filter Pills for 'Local News' */}
            {activeTab === 'overview' && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { id: 'all', label: '📰 All News' },
                  { id: 'sports', label: '🏆 Sports Scores' },
                  { id: 'business', label: '💼 Business' },
                  { id: 'province', label: provinceTopic.label },
                  { id: 'govt', label: '🏛️ Civic & Govt' },
                  { id: 'tech', label: '🚀 Tech & AI' },
                ].map((pill) => {
                  const isSelected = newsSubFilter === pill.id;
                  return (
                    <button
                      key={pill.id}
                      onClick={() => setNewsSubFilter(pill.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                        isSelected
                          ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 shadow-sm'
                          : 'bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Sub-menu Filter Pills for 'Dining' */}
            {activeTab === 'eats' && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { id: 'all', label: '🍽️ All Dining' },
                  { id: 'top-rated', label: '⭐ Top Rated (4.8+)' },
                  { id: 'patios', label: '☀️ Patios & Views' },
                  { id: 'late-night', label: '🍸 Bars & Late Night' },
                ].map((pill) => {
                  const isSelected = eatsSubFilter === pill.id;
                  return (
                    <button
                      key={pill.id}
                      onClick={() => setEatsSubFilter(pill.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                        isSelected
                          ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 shadow-sm'
                          : 'bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Sub-menu Filter Pills for 'Shows & Tickets' */}
            {activeTab === 'shows' && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { id: 'all', label: '🎟️ All Shows' },
                  { id: 'theatre', label: '🎭 Theatre & Symphony' },
                  { id: 'concerts', label: '🎸 Live Concerts' },
                  { id: 'comedy', label: '🎪 Comedy & Fests' },
                ].map((pill) => {
                  const isSelected = showsSubFilter === pill.id;
                  return (
                    <button
                      key={pill.id}
                      onClick={() => setShowsSubFilter(pill.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                        isSelected
                          ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 shadow-sm'
                          : 'bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Top-Level Mode: Search Bar */
          <div className="relative mt-2.5 mb-2 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${tenant.name} places, news, transit...`}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 transition-all"
            />
          </div>
        )}

        {/* Scrollable Content Deck */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3.5">
          {/* TOP-LEVEL HUB: 7 Visual Drillable Cards */}
          {activeTab === 'hub' && (
            <div className="space-y-2.5">
              <div className="px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Explore {tenant.name} Civic Categories
              </div>

              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className="w-full text-left p-3.5 rounded-2xl glass-card border border-slate-800/90 hover:border-cyan-500/60 transition-all group flex items-start justify-between gap-3 shadow-md hover:shadow-xl"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-750 group-hover:border-cyan-500/50 group-hover:scale-105 transition-all text-cyan-400`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white group-hover:text-cyan-200 transition-colors">
                            {cat.label}
                          </h4>
                          {cat.count !== undefined && cat.count > 0 && (
                            <span className="px-1.5 py-0.2 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-[10px] font-mono text-cyan-300">
                              {cat.count}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                          {cat.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0 mt-1" />
                  </button>
                );
              })}
            </div>
          )}

          {/* TAB 0: INTERACTIVE GEO-MAP RADAR */}
          {activeTab === 'map' && activeGeoSpotlight && (
            <div className="space-y-3">
              <InteractiveSpotlightMap
                district={activeGeoSpotlight}
                tenant={tenant}
                onAskAI={onAskAI}
                onSelectDistrict={(d) => setManualDistrict(d)}
              />

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

          {/* TAB 1: LOCAL NEWS & INTEL */}
          {activeTab === 'overview' && (
            <div className="space-y-3.5">
              {/* Regional News Headlines with Expand Action (when not filtered strictly to sports) */}
              {newsSubFilter !== 'sports' && (
                <div>
                  <div className="flex items-center justify-between text-xs px-1 mb-2">
                    <span className="font-bold text-slate-200 flex items-center gap-1.5">
                      <Newspaper className="w-3.5 h-3.5 text-cyan-400" />
                      <span>
                        {newsSubFilter === 'business'
                          ? 'Business & Market News'
                          : newsSubFilter === 'province'
                          ? provinceTopic.label
                          : newsSubFilter === 'govt'
                          ? 'Civic & Government Updates'
                          : newsSubFilter === 'tech'
                          ? 'Tech Startups & Innovation'
                          : 'Regional Headlines'}
                      </span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {filteredNews.length} Stories
                    </span>
                  </div>

                  {filteredNews.length === 0 ? (
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
                      No stories currently matching this filter. Showing general updates.
                    </div>
                  ) : (
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
                  )}
                </div>
              )}

              {/* Local Sports Scores (shown on 'all' or 'sports' filter) */}
              {(newsSubFilter === 'all' || newsSubFilter === 'sports') && (
                <div>
                  <div className="flex items-center justify-between text-xs px-1 mb-2 pt-1">
                    <span className="font-bold text-slate-200 flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Local Sports &amp; Matchups</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Live Feeds</span>
                  </div>

                  <div className="space-y-2">
                    {filteredSports.map((game: SportsGameScore) => (
                      <div
                        key={game.id}
                        className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-slate-750 transition-colors space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px] font-bold">
                            {game.league}
                          </span>
                          <span
                            className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                              game.status === 'Live'
                                ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                                : game.status === 'Final'
                                ? 'bg-slate-800 text-slate-400'
                                : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                            }`}
                          >
                            {game.status}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span>{game.team}</span>
                              {game.isHome && (
                                <span className="text-[9px] text-cyan-400 font-normal border border-cyan-800/60 bg-cyan-950 px-1 rounded">
                                  Home
                                </span>
                              )}
                            </h4>
                            <p className="text-[11px] text-slate-400">vs. {game.opponent}</p>
                          </div>

                          {game.score ? (
                            <div className="text-sm font-extrabold font-mono text-cyan-300 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
                              {game.score}
                            </div>
                          ) : (
                            <div className="text-right">
                              <span className="text-[11px] font-semibold text-slate-200 block font-mono">
                                {game.gameTime}
                              </span>
                              {game.tvBroadcast && (
                                <span className="text-[9px] text-slate-400 flex items-center gap-1 justify-end mt-0.5">
                                  <Tv className="w-2.5 h-2.5 text-cyan-400" />
                                  <span>{game.tvBroadcast}</span>
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
