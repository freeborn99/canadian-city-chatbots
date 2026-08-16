'use client';

import React, { useState } from 'react';
import { 
  Navigation, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  ExternalLink, 
  Copy, 
  Check, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp,
  Footprints,
  Train,
  Bus,
  Compass
} from 'lucide-react';

export interface TransitStep {
  type: 'walk' | 'train' | 'bus' | 'transfer' | 'ferry';
  instruction: string;
  lineName?: string;
  lineColor?: string;
  stopCount?: number;
  durationMinutes: number;
  fromStop: string;
  toStop: string;
  alerts?: string;
  scheduleDetails?: string;
  stops?: string[];
}

export interface TransitItinerary {
  origin: string;
  destination: string;
  totalDurationMinutes: number;
  fareCost: string;
  cityId: string;
  transitAgency: string;
  officialPlannerUrl: string;
  nextDepartures: string[];
  serviceStatus?: 'NORMAL' | 'DELAYS' | 'MAINTENANCE';
  transferCount?: number;
  steps: TransitStep[];
}

const OFFICIAL_TRANSIT_PORTALS: Record<string, { name: string; url: string; appName: string }> = {
  yyc: {
    name: 'Calgary Transit',
    url: 'https://www.calgarytransit.com/plan-a-trip.html',
    appName: 'My Fare & CTrain Maps',
  },
  yyz: {
    name: 'TTC (Toronto Transit Commission)',
    url: 'https://www.ttc.ca/trip-planner',
    appName: 'PRESTO & TTC Real-Time',
  },
  yvr: {
    name: 'TransLink Metro Vancouver',
    url: 'https://www.translink.ca/trip-planner',
    appName: 'Compass Card & SkyTrain Live',
  },
  yul: {
    name: 'STM (Société de transport de Montréal)',
    url: 'https://www.stm.info/en/trip-planner',
    appName: 'OPUS & STM Live',
  },
  yeg: {
    name: 'ETS (Edmonton Transit Service)',
    url: 'https://www.edmonton.ca/edmonton-transit-system-ets',
    appName: 'Arc Card & ETS Live',
  },
  yow: {
    name: 'OC Transpo',
    url: 'https://www.octranspo.com/en/plan-your-trip/travel-planner/',
    appName: 'O-Train & OC Transpo Live',
  },
  ywg: {
    name: 'Winnipeg Transit',
    url: 'https://winnipegtransit.com/navigo',
    appName: 'Navigo Trip Planner',
  },
  yhz: {
    name: 'Halifax Transit',
    url: 'https://www.halifax.ca/transportation/halifax-transit',
    appName: 'HFXGO Mobile Ticketing',
  },
  yyj: {
    name: 'BC Transit Victoria',
    url: 'https://www.bctransit.com/victoria/schedules-and-maps',
    appName: 'Umo App & Victoria Transit',
  },
  yyt: {
    name: 'Metrobus St. John’s',
    url: 'https://www.metrobus.com',
    appName: 'm-Card & St. John’s Transit',
  },
};

export const TransitWidget: React.FC<{
  data: TransitItinerary;
  className?: string;
}> = ({ data, className = '' }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({});

  const portal = OFFICIAL_TRANSIT_PORTALS[data.cityId?.toLowerCase()] || {
    name: data.transitAgency || 'Official City Transit Portal',
    url: data.officialPlannerUrl || 'https://www.google.com/maps',
    appName: 'Live Transit Planner',
  };

  const toggleStepStops = (idx: number) => {
    setExpandedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCopyItinerary = () => {
    const formatted = [
      `🚇 TRANSIT ITINERARY: ${data.origin} ➔ ${data.destination}`,
      `⏱️ Travel Time: ~${data.totalDurationMinutes} mins | Fare: ${data.fareCost}`,
      `🏢 Agency: ${portal.name}`,
      `\nROUTE STEPS:`,
      ...data.steps.map(
        (s, i) => `${i + 1}. [${s.type.toUpperCase()}] ${s.instruction} (${s.fromStop} ➔ ${s.toStop}, ~${s.durationMinutes} mins)`
      ),
      `\n🔗 Live Planner: ${portal.url}`,
    ].join('\n');

    navigator.clipboard.writeText(formatted);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2200);
  };

  const getStepIcon = (type: TransitStep['type']) => {
    switch (type) {
      case 'train':
        return <Train className="w-4 h-4 text-cyan-300" />;
      case 'bus':
        return <Bus className="w-4 h-4 text-amber-300" />;
      case 'walk':
        return <Footprints className="w-3.5 h-3.5 text-emerald-300" />;
      case 'transfer':
        return <Compass className="w-4 h-4 text-purple-300" />;
      default:
        return <Navigation className="w-4 h-4 text-slate-300" />;
    }
  };

  return (
    <div className={`my-4 rounded-2xl border border-cyan-500/40 bg-slate-900/95 shadow-2xl overflow-hidden ${className}`}>
      {/* Header Banner */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-700/80 text-cyan-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Train className="w-3 h-3" />
              <span>Interactive Transit Itinerary</span>
            </span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Scheduled</span>
            </span>
          </div>

          <h3 className="text-sm md:text-base font-extrabold text-white flex items-center gap-2">
            <span>{data.origin}</span>
            <ArrowRight className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span className="text-cyan-300">{data.destination}</span>
          </h3>
        </div>

        {/* Quick Badges */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-1.5 text-xs text-slate-200">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold text-white font-mono">{data.totalDurationMinutes} min</span>
          </div>

          <div className="px-2.5 py-1 rounded-xl bg-emerald-950/60 border border-emerald-800/80 flex items-center gap-1 text-xs text-emerald-300 font-bold font-mono">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>{data.fareCost}</span>
          </div>
        </div>
      </div>

      {/* Departures & Agency Bar */}
      <div className="px-4 py-2 bg-slate-950/70 border-b border-slate-850 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300">{portal.name}</span>
          <span>•</span>
          <span className="text-cyan-400">{data.nextDepartures?.[0] || 'Every 7–12 mins'}</span>
        </div>

        <span className="text-[11px] text-slate-400">
          90-min Free Transfer Included
        </span>
      </div>

      {/* Step-by-Step Interactive Route Timeline */}
      <div className="p-4 space-y-3">
        {data.steps.map((step, idx) => {
          const isExpanded = !!expandedSteps[idx];
          const hasStops = step.stops && step.stops.length > 0;

          return (
            <div key={idx} className="flex items-start gap-3 relative group">
              {/* Timeline Connector Line */}
              {idx < data.steps.length - 1 && (
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-800 group-hover:bg-cyan-800/50 transition-colors" />
              )}

              {/* Node Icon */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md border ${
                  step.type === 'train'
                    ? 'bg-cyan-950 border-cyan-700/80 text-cyan-300'
                    : step.type === 'bus'
                    ? 'bg-amber-950 border-amber-700/80 text-amber-300'
                    : step.type === 'transfer'
                    ? 'bg-purple-950 border-purple-700/80 text-purple-300'
                    : 'bg-slate-900 border-slate-700 text-slate-300'
                }`}
                style={step.lineColor ? { borderColor: step.lineColor } : {}}
              >
                {getStepIcon(step.type)}
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-slate-950/60 p-3 rounded-xl border border-slate-850 hover:border-slate-750 transition-colors space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    {step.lineName && (
                      <span
                        className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded-md mb-1 shadow-sm"
                        style={{
                          backgroundColor: step.lineColor ? `${step.lineColor}22` : '#083344',
                          color: step.lineColor || '#67e8f9',
                          border: `1px solid ${step.lineColor ? `${step.lineColor}55` : '#0e7490'}`,
                        }}
                      >
                        {step.lineName}
                      </span>
                    )}
                    <h4 className="text-xs md:text-sm font-bold text-white leading-snug">{step.instruction}</h4>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-semibold flex-shrink-0">
                    ~{step.durationMinutes} min
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 flex items-center gap-1.5 pt-0.5">
                  <span className="text-slate-400">From:</span>
                  <span className="font-semibold text-slate-200">{step.fromStop}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="text-slate-400">To:</span>
                  <span className="font-semibold text-slate-200">{step.toStop}</span>
                </div>

                {step.alerts && (
                  <div className="flex items-center gap-1 text-[10px] text-amber-300 bg-amber-950/40 px-2 py-1 rounded border border-amber-800/40 mt-1.5">
                    <AlertCircle className="w-3 h-3 flex-shrink-0 text-amber-400" />
                    <span>{step.alerts}</span>
                  </div>
                )}

                {/* Intermediate Stops Toggle */}
                {hasStops && (
                  <div className="pt-1.5">
                    <button
                      onClick={() => toggleStepStops(idx)}
                      className="text-[10px] font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      <span>
                        {isExpanded
                          ? `Hide ${step.stops!.length} intermediate stops`
                          : `View ${step.stops!.length} intermediate stops (${step.stopCount || step.stops!.length} stops)`}
                      </span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {isExpanded && (
                      <ul className="mt-1.5 ml-2 pl-2 border-l border-cyan-800/60 space-y-1 text-[10px] text-slate-400 font-mono">
                        {step.stops!.map((st, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="p-3.5 bg-slate-950 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <button
          onClick={handleCopyItinerary}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-750 text-slate-200 text-xs font-semibold transition-all shadow-sm"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Itinerary Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy Route Steps</span>
            </>
          )}
        </button>

        <a
          href={portal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md group"
        >
          <span>Open {portal.name} Live Map</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </div>
  );
};
