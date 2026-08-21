'use client';

import React, { useState, useEffect } from 'react';
import { CityTenant } from '@/lib/tenants';
import { ExternalLink, Ticket, Utensils, Hotel, Compass, X } from 'lucide-react';
import { buildAffiliateUrl } from '@/lib/affiliate-config';

interface SponsoredDeal {
  id: string;
  category: 'tickets' | 'dining' | 'stays' | 'tours';
  badge: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  targetUrl: string;
  platform: 'ticketmaster' | 'opentable' | 'booking.com' | 'viator' | 'sevenrooms';
  cta: string;
}

const CITY_SPONSORED_DEALS: Record<string, SponsoredDeal[]> = {
  yyz: [
    {
      id: 'yyz_tix',
      category: 'tickets',
      badge: 'Concerts & Shows',
      icon: Ticket,
      title: 'Scotiabank Arena & Mirvish Box Office',
      subtitle: 'Official concert, theatre & sports tickets in Toronto',
      targetUrl: 'https://www.ticketmaster.ca/toronto',
      platform: 'ticketmaster',
      cta: 'Find Tickets',
    },
    {
      id: 'yyz_dine',
      category: 'dining',
      badge: 'Trending Dining',
      icon: Utensils,
      title: 'King West & Yorkville Table Resos',
      subtitle: 'Instant confirmations at Toronto’s premier restaurants',
      targetUrl: 'https://www.opentable.ca/toronto-restaurants',
      platform: 'opentable',
      cta: 'Book Table',
    },
    {
      id: 'yyz_hotel',
      category: 'stays',
      badge: 'Luxury Stays',
      icon: Hotel,
      title: 'Downtown Toronto Boutique Hotels',
      subtitle: 'Save up to 25% on CN Tower & waterfront stays',
      targetUrl: 'https://www.booking.com/city/ca/toronto.html',
      platform: 'booking.com',
      cta: 'View Deals',
    },
  ],
  yyc: [
    {
      id: 'yyc_ski',
      category: 'tours',
      badge: 'Rocky Mountains',
      icon: Compass,
      title: 'Banff Sunshine & Lake Louise Passes',
      subtitle: 'Official lift tickets, mountain shuttles & day tours',
      targetUrl: 'https://www.viator.com/Calgary-tourism/d914-r10238321921-srp',
      platform: 'viator',
      cta: 'Explore Tours',
    },
    {
      id: 'yyc_dine',
      category: 'dining',
      badge: 'Calgary Dining',
      icon: Utensils,
      title: 'Stephen Ave & 17th Ave Table Resos',
      subtitle: 'Top steaks, craft cocktails & patio bookings',
      targetUrl: 'https://www.opentable.ca/calgary-restaurants',
      platform: 'opentable',
      cta: 'Book Table',
    },
    {
      id: 'yyc_stay',
      category: 'stays',
      badge: 'Mountain & City',
      icon: Hotel,
      title: 'Calgary & Canmore Weekend Getaways',
      subtitle: 'Best rates on Rocky Mountain view suites',
      targetUrl: 'https://www.booking.com/city/ca/calgary.html',
      platform: 'booking.com',
      cta: 'View Stays',
    },
  ],
  yvr: [
    {
      id: 'yvr_tours',
      category: 'tours',
      badge: 'Whistler & Coastal',
      icon: Compass,
      title: 'Whistler Day Tours & Capilano Bridge',
      subtitle: 'Skip-the-line passes & scenic ocean fjord excursions',
      targetUrl: 'https://www.viator.com/Vancouver/d616-ttd',
      platform: 'viator',
      cta: 'Book Tour',
    },
    {
      id: 'yvr_dine',
      category: 'dining',
      badge: 'Waterfront Dining',
      icon: Utensils,
      title: 'Yaletown & Coal Harbour Reservations',
      subtitle: 'Reserve Michelin-recommended West Coast seafood',
      targetUrl: 'https://www.opentable.ca/vancouver-restaurants',
      platform: 'opentable',
      cta: 'Reserve',
    },
    {
      id: 'yvr_stay',
      category: 'stays',
      badge: 'Vancouver Stays',
      icon: Hotel,
      title: 'Downtown & Stanley Park Boutique Hotels',
      subtitle: 'Waterfront view suites with free cancellation',
      targetUrl: 'https://www.booking.com/city/ca/vancouver.html',
      platform: 'booking.com',
      cta: 'View Deals',
    },
  ],
  yul: [
    {
      id: 'yul_tix',
      category: 'tickets',
      badge: 'Montreal Live',
      icon: Ticket,
      title: 'Centre Bell & Place des Arts Tickets',
      subtitle: 'Official concert, hockey & festival box office',
      targetUrl: 'https://www.ticketmaster.ca/montreal',
      platform: 'ticketmaster',
      cta: 'Get Tickets',
    },
    {
      id: 'yul_dine',
      category: 'dining',
      badge: 'Old Montreal Dining',
      icon: Utensils,
      title: 'Plateau & Old Port Bistro Tables',
      subtitle: 'French dining & trendy nightlife reservations',
      targetUrl: 'https://www.opentable.ca/montreal-restaurants',
      platform: 'opentable',
      cta: 'Book Table',
    },
    {
      id: 'yul_stay',
      category: 'stays',
      badge: 'Old Port Stays',
      icon: Hotel,
      title: 'Montreal Boutique & Heritage Stays',
      subtitle: 'Charming Old Port suites with instant confirmation',
      targetUrl: 'https://www.booking.com/city/ca/montreal.html',
      platform: 'booking.com',
      cta: 'Find Stays',
    },
  ],
  yeg: [
    {
      id: 'yeg_tix',
      category: 'tickets',
      badge: 'Rogers Place',
      icon: Ticket,
      title: 'Oilers & Rogers Place Concert Tickets',
      subtitle: 'Live NHL games, stadium tours & arena concerts',
      targetUrl: 'https://www.ticketmaster.ca/edmonton',
      platform: 'ticketmaster',
      cta: 'Find Seats',
    },
    {
      id: 'yeg_dine',
      category: 'dining',
      badge: 'Whyte Ave Dining',
      icon: Utensils,
      title: 'Ice District & Strathcona Dining',
      subtitle: 'Trending chef-driven bistro reservations',
      targetUrl: 'https://www.opentable.ca/edmonton-restaurants',
      platform: 'opentable',
      cta: 'Reserve',
    },
    {
      id: 'yeg_stay',
      category: 'stays',
      badge: 'River Valley Stays',
      icon: Hotel,
      title: 'Downtown Edmonton Hotel Deals',
      subtitle: 'Best rates near ICE District and river valley',
      targetUrl: 'https://www.booking.com/city/ca/edmonton.html',
      platform: 'booking.com',
      cta: 'View Hotels',
    },
  ],
  yow: [
    {
      id: 'yow_tix',
      category: 'tickets',
      badge: 'National Arts',
      icon: Ticket,
      title: 'NAC & Canadian Tire Centre Tickets',
      subtitle: 'National theatre, ballet & Senators NHL action',
      targetUrl: 'https://www.ticketmaster.ca/ottawa',
      platform: 'ticketmaster',
      cta: 'View Events',
    },
    {
      id: 'yow_dine',
      category: 'dining',
      badge: 'ByWard Market',
      icon: Utensils,
      title: 'ByWard Market & Elgin St Tables',
      subtitle: 'Top patios, embassies dining & cocktail lounges',
      targetUrl: 'https://www.opentable.ca/ottawa-restaurants',
      platform: 'opentable',
      cta: 'Book Table',
    },
    {
      id: 'yow_tours',
      category: 'tours',
      badge: 'Parliament & Canal',
      icon: Compass,
      title: 'Ottawa River & Canal Sightseeing',
      subtitle: 'Guided historic cruises & Gatineau Park excursions',
      targetUrl: 'https://www.viator.com/Ottawa/d628-ttd',
      platform: 'viator',
      cta: 'Book Tour',
    },
  ],
  ywg: [
    {
      id: 'ywg_tix',
      category: 'tickets',
      badge: 'Canada Life Centre',
      icon: Ticket,
      title: 'Winnipeg Jets & Live Arena Tickets',
      subtitle: 'Official NHL hockey & major concert seating',
      targetUrl: 'https://www.ticketmaster.ca/winnipeg',
      platform: 'ticketmaster',
      cta: 'Find Seats',
    },
    {
      id: 'ywg_dine',
      category: 'dining',
      badge: 'The Forks Dining',
      icon: Utensils,
      title: 'Exchange District & Forks Table Resos',
      subtitle: 'Top craft cocktail lounges & local dining spots',
      targetUrl: 'https://www.opentable.ca/winnipeg-restaurants',
      platform: 'opentable',
      cta: 'Book Table',
    },
    {
      id: 'ywg_stay',
      category: 'stays',
      badge: 'Winnipeg Stays',
      icon: Hotel,
      title: 'Downtown & Exchange District Hotels',
      subtitle: 'Boutique accommodations near Canada Life Centre',
      targetUrl: 'https://www.booking.com/city/ca/winnipeg.html',
      platform: 'booking.com',
      cta: 'View Deals',
    },
  ],
  yhz: [
    {
      id: 'yhz_tours',
      category: 'tours',
      badge: 'Peggy’s Cove',
      icon: Compass,
      title: 'Peggy’s Cove & Coastal Fjord Tours',
      subtitle: 'Ocean whale watching & historic lighthouse tours',
      targetUrl: 'https://www.viator.com/Halifax/d629-ttd',
      platform: 'viator',
      cta: 'Explore Tours',
    },
    {
      id: 'yhz_dine',
      category: 'dining',
      badge: 'Waterfront Seafood',
      icon: Utensils,
      title: 'Halifax Boardwalk Seafood Resos',
      subtitle: 'Fresh Atlantic lobster & Maritime craft beer',
      targetUrl: 'https://www.opentable.ca/halifax-restaurants',
      platform: 'opentable',
      cta: 'Reserve',
    },
    {
      id: 'yhz_stay',
      category: 'stays',
      badge: 'Oceanview Stays',
      icon: Hotel,
      title: 'Halifax Harbourfront Boutique Hotels',
      subtitle: 'Waterfront suites overlooking the historic harbour',
      targetUrl: 'https://www.booking.com/city/ca/halifax.html',
      platform: 'booking.com',
      cta: 'View Stays',
    },
  ],
  yyj: [
    {
      id: 'yyj_tours',
      category: 'tours',
      badge: 'Butchart Gardens',
      icon: Compass,
      title: 'Butchart Gardens & Whale Watching',
      subtitle: 'World-famous floral gardens & Salish Sea orca tours',
      targetUrl: 'https://www.viator.com/Victoria/d617-ttd',
      platform: 'viator',
      cta: 'Book Tour',
    },
    {
      id: 'yyj_dine',
      category: 'dining',
      badge: 'Inner Harbour',
      icon: Utensils,
      title: 'Inner Harbour & High Tea Tables',
      subtitle: 'Pacific seafood, cocktail lounges & Empress tea',
      targetUrl: 'https://www.opentable.ca/victoria-restaurants',
      platform: 'opentable',
      cta: 'Book Table',
    },
    {
      id: 'yyj_stay',
      category: 'stays',
      badge: 'Harbour Suites',
      icon: Hotel,
      title: 'Victoria Ocean & Garden Stays',
      subtitle: 'Historic boutique suites with free cancellation',
      targetUrl: 'https://www.booking.com/city/ca/victoria.html',
      platform: 'booking.com',
      cta: 'View Deals',
    },
  ],
  yyt: [
    {
      id: 'yyt_tours',
      category: 'tours',
      badge: 'Cape Spear & Icebergs',
      icon: Compass,
      title: 'Cape Spear & Iceberg Boat Tours',
      subtitle: 'North America’s easternmost point & puffin boat tours',
      targetUrl: 'https://www.viator.com/St-Johns/d22384-ttd',
      platform: 'viator',
      cta: 'Explore Tours',
    },
    {
      id: 'yyt_dine',
      category: 'dining',
      badge: 'George Street',
      icon: Utensils,
      title: 'George Street & Water St Tables',
      subtitle: 'Atlantic cod, screech bars & traditional live music',
      targetUrl: 'https://www.opentable.ca/s?term=St+Johns+NL',
      platform: 'opentable',
      cta: 'Book Table',
    },
    {
      id: 'yyt_stay',
      category: 'stays',
      badge: 'Heritage Stays',
      icon: Hotel,
      title: 'Jellybean Row & Downtown St. John’s',
      subtitle: 'Charming colourful historic suites & ocean view B&Bs',
      targetUrl: 'https://www.booking.com/city/ca/st-johns.html',
      platform: 'booking.com',
      cta: 'Find Stays',
    },
  ],
};

// Generic fallback deals for other cities
const DEFAULT_DEALS: SponsoredDeal[] = [
  {
    id: 'gen_reso',
    category: 'dining',
    badge: 'Local Dining',
    icon: Utensils,
    title: 'Top Local Restaurant Reservations',
    subtitle: 'Instant confirmed tables at top rated neighborhood spots',
    targetUrl: 'https://www.opentable.ca',
    platform: 'opentable',
    cta: 'Book Table',
  },
  {
    id: 'gen_tix',
    category: 'tickets',
    badge: 'Live Events',
    icon: Ticket,
    title: 'Concerts, Sports & Arena Tickets',
    subtitle: '100% verified tickets with direct box office seating',
    targetUrl: 'https://www.ticketmaster.ca',
    platform: 'ticketmaster',
    cta: 'Find Seats',
  },
  {
    id: 'gen_stay',
    category: 'stays',
    badge: 'Weekend Getaways',
    icon: Hotel,
    title: 'Hotel Deals & Boutique Stays',
    subtitle: 'Exclusive discounts on top rated city stays',
    targetUrl: 'https://www.booking.com',
    platform: 'booking.com',
    cta: 'View Rates',
  },
];

export const SponsoredBanner: React.FC<{ tenant: CityTenant }> = ({ tenant }) => {
  const deals = CITY_SPONSORED_DEALS[tenant.id] || DEFAULT_DEALS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  // Auto-rotate every 9 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % deals.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [deals.length]);

  if (isDismissed) return null;

  const currentDeal = deals[currentIndex] || deals[0];
  const IconComponent = currentDeal.icon;
  const finalAffiliateUrl = buildAffiliateUrl(currentDeal.targetUrl, currentDeal.platform, tenant.id);

  const handleClick = () => {
    // Record affiliate click telemetry
    try {
      fetch('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'affiliate_click',
          tenantId: tenant.id,
          partner: currentDeal.platform,
          item: currentDeal.title,
        }),
      }).catch(() => {});
    } catch {}
  };

  return (
    <div className="w-full px-2 sm:px-4 py-1.5 flex-shrink-0 z-20">
      <div className="relative overflow-hidden rounded-xl border border-slate-700/60 bg-gradient-to-r from-slate-900/90 via-slate-850/80 to-slate-900/90 backdrop-blur-md shadow-md hover:border-slate-600 transition-all p-2.5 sm:py-2 sm:px-3.5 flex items-center justify-between gap-2.5">
        
        {/* Glow ambient background */}
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />

        {/* Left Icon & Information */}
        <a
          href={finalAffiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="flex items-center gap-2.5 flex-1 min-w-0 group cursor-pointer"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-cyan-300 group-hover:scale-105 transition-transform">
            <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Partner Deal
              </span>
              <span className="text-[11px] font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                {currentDeal.title}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate hidden xs:block sm:block">
              {currentDeal.subtitle}
            </p>
          </div>
        </a>

        {/* Action Button & Dismiss */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <a
            href={finalAffiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-200 text-xs font-semibold shadow-sm transition-all active:scale-95 whitespace-nowrap"
          >
            <span>{currentDeal.cta}</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-80" />
          </a>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
            title="Dismiss ad"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};
