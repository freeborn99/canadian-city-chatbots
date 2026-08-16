'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { buildAffiliateUrl, inferPlatformFromUrl } from '@/lib/affiliate-config';

interface LocalPartnerShowcaseProps {
  tenantId?: string;
  partnerNetwork?: 'cj' | 'impact' | 'rakuten' | 'viator';
  title?: string;
  description?: string;
  ctaText?: string;
  destinationUrl?: string;
  imageUrl?: string;
  className?: string;
  variant?: 'card' | 'compact';
}

const LOCALIZED_COPY: Record<string, { title: string; description: string; imageUrl: string; ctaText: string; destinationUrl: string; network: 'viator' | 'cj' }> = {
  yyc: {
    title: 'Top Rated Calgary Tours & Banff Excursions',
    description: 'Book exclusive Banff day trips, Calgary foodie tours, and Rocky Mountain excursions.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    ctaText: 'Explore YYC Tours',
    destinationUrl: 'https://www.viator.com/Calgary/d817-ttd',
    network: 'viator'
  },
  yvr: {
    title: 'Vancouver Seaplane & Island Tours',
    description: 'Capilano suspension bridge passes, whale watching cruises, and Stanley Park guided tours.',
    imageUrl: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&q=80&w=800',
    ctaText: 'Explore YVR Stays & Tours',
    destinationUrl: 'https://www.viator.com/Vancouver/d616-ttd',
    network: 'viator'
  },
  yyz: {
    title: 'Toronto Entertainment & Niagara Tours',
    description: 'Skip-the-line CN Tower passes, Broadway theatre tickets, and luxury Niagara day trips.',
    imageUrl: 'https://images.unsplash.com/photo-1513628253939-010e64ac66cd?auto=format&fit=crop&q=80&w=800',
    ctaText: 'Explore YYZ Offers',
    destinationUrl: 'https://www.viator.com/Toronto/d623-ttd',
    network: 'viator'
  },
  yul: {
    title: 'Old Montreal Walking & Foodie Tours',
    description: 'Historic architecture tours, Nordic spa packages, and authentic French culinary crawls.',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800',
    ctaText: 'Explore YUL Experiences',
    destinationUrl: 'https://www.viator.com/Montreal/d625-ttd',
    network: 'viator'
  },
  yeg: {
    title: 'Edmonton Highlights & Elk Island Safaris',
    description: 'Bison tracking adventures, Ice District entertainment, and river valley segway tours.',
    imageUrl: 'https://images.unsplash.com/photo-1605330386925-4228c2e68444?auto=format&fit=crop&q=80&w=800',
    ctaText: 'Explore YEG Deals',
    destinationUrl: 'https://www.viator.com/Edmonton/d28470-ttd',
    network: 'viator'
  },
  yow: {
    title: 'Ottawa Heritage & Gatineau Park Tours',
    description: 'Rideau Canal cruises, Parliament Hill historical walks, and scenic river excursions.',
    imageUrl: 'https://images.unsplash.com/photo-1584448141569-69f342da535c?auto=format&fit=crop&q=80&w=800',
    ctaText: 'Explore YOW Passes',
    destinationUrl: 'https://www.viator.com/Ottawa/d624-ttd',
    network: 'viator'
  },
  ywg: {
    title: 'Winnipeg Arctic Safaris & Cultural Passes',
    description: 'Journey to Churchill polar bear exhibits, Forks market tasting tours, and museum passes.',
    imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800',
    ctaText: 'Explore YWG Tours',
    destinationUrl: 'https://www.viator.com/searchResults/all?text=Winnipeg',
    network: 'viator'
  },
  yhz: {
    title: 'Halifax Peggy’s Cove & Coastal Cruises',
    description: 'Tall ship harbor cruises, South Shore lighthouse tours, and fresh seafood crawls.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    ctaText: 'Explore YHZ Adventures',
    destinationUrl: 'https://www.viator.com/Halifax/d4416-ttd',
    network: 'viator'
  },
  yyj: {
    title: 'Victoria Whale Watching & Butchart Gardens',
    description: 'Orca zodiac safaris, High Tea experiences, and scenic floatplane day trips.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    ctaText: 'Explore YYJ Experiences',
    destinationUrl: 'https://www.viator.com/Victoria/d617-ttd',
    network: 'viator'
  },
  yyt: {
    title: 'St. John’s Iceberg & Puffin Boat Excursions',
    description: 'Witless Bay ecological boat safaris, Signal Hill tours, and George Street nightlife crawls.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    ctaText: 'Explore YYT Safaris',
    destinationUrl: 'https://www.viator.com/searchResults/all?text=St.+John%27s+Newfoundland',
    network: 'viator'
  },
  default: {
    title: 'Discover Premium Local Experiences & Stays',
    description: 'Book the top-rated tours, exclusive events, and luxury stays through verified partners.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    ctaText: 'Explore Offers',
    destinationUrl: 'https://www.viator.com/Canada/d75-ttd',
    network: 'viator'
  }
};

export const LocalPartnerShowcase: React.FC<LocalPartnerShowcaseProps> = ({
  tenantId = 'yyc',
  partnerNetwork,
  title,
  description,
  ctaText,
  destinationUrl,
  imageUrl,
  className = '',
  variant = 'card',
}) => {
  const tId = tenantId.toLowerCase();
  const copy = LOCALIZED_COPY[tId] || LOCALIZED_COPY['default'];
  
  const finalTitle = title || copy.title;
  const finalDesc = description || copy.description;
  const finalImage = imageUrl || copy.imageUrl;
  const finalCta = ctaText || copy.ctaText;
  const rawDest = destinationUrl || copy.destinationUrl;
  const finalNetwork = partnerNetwork || copy.network;
  
  const platform = finalNetwork === 'viator' ? 'Viator' : finalNetwork === 'cj' ? 'CJ' : inferPlatformFromUrl(rawDest);
  const affiliateUrl = buildAffiliateUrl(rawDest, platform, tenantId);

  // Slim, elegant compact bar between chat stream and response input
  if (variant === 'compact') {
    return (
      <div className={`flex items-center justify-between gap-3 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/40 text-xs shadow-md backdrop-blur-md transition-all ${className}`}>
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="flex-shrink-0 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-800/60 text-cyan-300">
            {finalNetwork === 'viator' ? 'Viator' : 'Partner'}
          </span>
          <div className="truncate flex items-center gap-1.5">
            <span className="font-semibold text-white truncate text-xs">{finalTitle}</span>
            <span className="hidden lg:inline text-[11px] text-slate-400 truncate">• {finalDesc}</span>
          </div>
        </div>

        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-500/30 text-[11px] font-semibold transition-all shadow-sm active:scale-95"
        >
          <span>{finalCta}</span>
          <ExternalLink className="w-2.5 h-2.5 text-cyan-400" />
        </a>
      </div>
    );
  }

  // Standard Card layout (for Spotlight Deck)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-xl group ${className}`}
    >
      {/* Highlight Badge */}
      <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-wider text-slate-300">
        Partner Feature
      </div>

      <div className="flex flex-col sm:flex-row h-full">
        {/* Highlight Image */}
        <div className="w-full sm:w-1/3 min-h-[100px] sm:min-h-[120px] relative overflow-hidden bg-slate-800 flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={finalImage}
            alt="Featured Partner Offer"
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-slate-900/90" />
        </div>

        {/* Highlight Content */}
        <div className="flex-1 p-3.5 sm:p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white mb-1 line-clamp-1 group-hover:text-cyan-200 transition-colors">
              {finalTitle}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-400 mb-2.5 line-clamp-2 leading-relaxed">
              {finalDesc}
            </p>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
            <span className="text-[9px] font-medium text-slate-500 uppercase tracking-wider">
              {finalNetwork === 'viator' ? 'Viator Experience' : 'Premium Partner'}
            </span>
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-500/20 hover:border-cyan-500/40 text-xs font-semibold transition-all shadow-sm active:scale-95"
            >
              <span>{finalCta}</span>
              <ExternalLink className="w-3 h-3 text-cyan-400" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
