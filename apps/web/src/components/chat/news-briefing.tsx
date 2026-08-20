'use client';

import React from 'react';
import { Newspaper, ExternalLink, Clock } from 'lucide-react';

export interface NewsStory {
  title: string;
  source: string;
  url: string;
  category: string;
  timeAgo: string;
  summary: string;
  keyTakeaways?: string[];
  localImpact?: string;
}

export interface NewsBriefingProps {
  cityName: string;
  stories: NewsStory[];
}

export function NewsBriefing({ cityName, stories }: NewsBriefingProps) {
  const getCategoryColor = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('politics') || cat.includes('government')) return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    if (cat.includes('business') || cat.includes('economy')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    if (cat.includes('sports')) return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    if (cat.includes('tech')) return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    return 'bg-slate-700/50 text-slate-300 border-slate-600/50';
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
      <div className="flex items-center px-5 py-4 border-b border-slate-800/80 bg-slate-900/50">
        <Newspaper className="w-5 h-5 text-cyan-400 mr-3" />
        <h2 className="text-lg font-semibold text-slate-100 m-0">Executive Briefing — {cityName}</h2>
      </div>
      
      <div className="flex flex-col gap-3 p-4 bg-slate-950">
        {stories.map((story, idx) => (
          <div key={idx} className="flex flex-col bg-slate-900/50 border border-slate-800/60 rounded-xl p-4 transition-colors hover:bg-slate-900/80">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getCategoryColor(story.category)}`}>
                {story.category}
              </span>
              <div className="flex items-center text-xs text-slate-400">
                <span className="font-medium">{story.source}</span>
                <span className="mx-1.5">•</span>
                <Clock className="w-3 h-3 mr-1" />
                <span>{story.timeAgo}</span>
              </div>
            </div>
            
            <h3 className="text-base font-bold text-slate-200 mb-2 leading-snug">
              {story.title}
            </h3>
            
            <p className="text-sm text-slate-300 mb-3 leading-relaxed">
              {story.summary}
            </p>
            
            {(story.keyTakeaways && story.keyTakeaways.length > 0) && (
              <div className="mb-4 bg-slate-950/50 rounded-lg p-3 border border-slate-800/50">
                <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Key Takeaways</p>
                <ul className="list-disc pl-4 space-y-1">
                  {story.keyTakeaways.map((takeaway, tIdx) => (
                    <li key={tIdx} className="text-xs text-slate-300 pl-1">{takeaway}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {story.localImpact && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-cyan-400 mb-1">Local Impact</p>
                <p className="text-sm text-slate-300">{story.localImpact}</p>
              </div>
            )}
            
            <div className="mt-auto pt-2 flex justify-end border-t border-slate-800/40">
              <a 
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Read on {story.source} <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        ))}
        {stories.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-sm">
            No news stories available for this briefing.
          </div>
        )}
      </div>
    </div>
  );
}

export function parseNewsBriefing(content: string): NewsBriefingProps | null {
  try {
    const markerStart = '<!-- NEWS_BRIEFING_START -->';
    const dataMarker = '<!-- NEWS_DATA:';
    const dataMarkerEnd = '-->';
    
    if (!content.includes(markerStart) || !content.includes(dataMarker)) {
      return null;
    }
    
    const startIndex = content.indexOf(dataMarker) + dataMarker.length;
    const endIndex = content.indexOf(dataMarkerEnd, startIndex);
    
    if (startIndex < dataMarker.length || endIndex === -1) {
      return null;
    }
    
    const jsonStr = content.substring(startIndex, endIndex).trim();
    const data = JSON.parse(jsonStr) as NewsBriefingProps;
    
    if (!data.cityName || !Array.isArray(data.stories)) {
      return null;
    }
    
    return data;
  } catch (e) {
    console.error("Failed to parse news briefing data:", e);
    return null;
  }
}
