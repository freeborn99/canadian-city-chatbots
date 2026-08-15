'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Star,
  Compass,
  Maximize2,
  Minimize2,
  Clock,
  Layers,
} from 'lucide-react';
import { GeoSpotlightDistrict, MapPinPoint, CANADIAN_GEO_SPOTLIGHTS } from '@/lib/city-geo-data';
import { CityTenant } from '@/lib/tenants';

interface InteractiveSpotlightMapProps {
  district: GeoSpotlightDistrict;
  tenant: CityTenant;
  onAskAI?: (prompt: string) => void;
  onSelectDistrict?: (district: GeoSpotlightDistrict) => void;
}

export const InteractiveSpotlightMap: React.FC<InteractiveSpotlightMapProps> = ({
  district,
  tenant,
  onAskAI,
  onSelectDistrict,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const [selectedPin, setSelectedPin] = useState<MapPinPoint | null>(
    district.pins[0] || null
  );
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Available districts for current tenant
  const availableDistricts = CANADIAN_GEO_SPOTLIGHTS.filter(
    (d) => d.tenantId.toLowerCase() === tenant.id.toLowerCase()
  );

  // Update selectedPin whenever active district changes
  useEffect(() => {
    setSelectedPin(district.pins[0] || null);
  }, [district.id]);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    let isSubscribed = true;

    // Dynamically import Leaflet to prevent SSR window reference issues
    import('leaflet').then((L) => {
      if (!isSubscribed || !mapContainerRef.current) return;

      // 1. Initialize map only once if not existing
      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: district.center,
          zoom: district.zoom,
          zoomControl: false,
          attributionControl: false,
        });

        // Dark Matter / Voyager Tile Layer
        L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png',
          {
            maxZoom: 19,
            subdomains: 'abcd',
          }
        ).addTo(map);

        const markers = L.layerGroup().addTo(map);
        markersGroupRef.current = markers;
        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;
      const markers = markersGroupRef.current;

      if (!map || !markers) return;

      // Invalidate size in case of container size shifts
      setTimeout(() => {
        map.invalidateSize();
      }, 50);

      // Clear existing markers and populate new pins
      markers.clearLayers();

      district.pins.forEach((pin) => {
        const color =
          pin.category === 'restaurant'
            ? '#f59e0b'
            : pin.category === 'theatre'
            ? '#a855f7'
            : pin.category === 'park'
            ? '#10b981'
            : '#06b6d4';

        const customIcon = L.divIcon({
          className: 'custom-leaflet-pin',
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; cursor: pointer;">
              <div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background-color: ${color}; opacity: 0.3; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="position: relative; width: 26px; height: 26px; border-radius: 50%; background-color: #0f172a; border: 2px solid ${color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 12px ${color}80;">
                <div style="width: 10px; height: 10px; border-radius: 50%; background-color: ${color};"></div>
              </div>
            </div>
          `,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        });

        const marker = L.marker([pin.lat, pin.lng], { icon: customIcon }).addTo(
          markers
        );

        marker.on('click', () => {
          setSelectedPin(pin);
          map.panTo([pin.lat, pin.lng], { animate: true, duration: 0.4 });
        });
      });

      // Smooth camera fly-to without recreating map DOM
      map.flyTo(district.center, district.zoom, { duration: 0.5 });
    });

    return () => {
      isSubscribed = false;
    };
  }, [district]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // When selectedPin changes, fly to it
  const handleSelectPin = (pin: MapPinPoint) => {
    setSelectedPin(pin);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([pin.lat, pin.lng], 17, {
        animate: true,
        duration: 0.4,
      });
    }
  };

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetCenter = () =>
    mapInstanceRef.current?.flyTo(district.center, district.zoom, {
      duration: 0.4,
    });

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden glass-card border border-slate-700/80 shadow-2xl transition-all ${
        isFullScreen ? 'fixed inset-4 z-50 flex flex-col bg-slate-950/95' : 'space-y-2.5'
      }`}
    >
      {/* Map Header */}
      <div className="p-3.5 pb-2 flex items-start justify-between border-b border-slate-800/80 bg-slate-950/70">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-800/60 text-cyan-300 flex items-center gap-1">
              <Compass className="w-3 h-3 text-cyan-400" />
              <span>AI Geo-Spotlight</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Walk Score: {district.walkScore}/100
            </span>
          </div>

          <h3 className="text-sm font-bold text-white tracking-tight">
            {district.name}
          </h3>
          <p className="text-[11px] text-slate-400 leading-tight">
            {district.tagline}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setIsFullScreen(!isFullScreen);
              setTimeout(() => mapInstanceRef.current?.invalidateSize(), 200);
            }}
            className="p-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title={isFullScreen ? 'Exit Full Screen' : 'Full Screen Map'}
          >
            {isFullScreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Quick District Selector Chips */}
      {availableDistricts.length > 1 && (
        <div className="px-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          <span className="text-[9px] text-slate-500 font-mono uppercase">Districts:</span>
          {availableDistricts.map((d) => {
            const isCurrent = d.id === district.id;
            return (
              <button
                key={d.id}
                onClick={() => onSelectDistrict?.(d)}
                className={`flex-shrink-0 px-2 py-0.5 rounded-lg text-[10px] font-medium transition-all ${
                  isCurrent
                    ? 'bg-cyan-950 border border-cyan-700 text-cyan-300 shadow-sm'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {d.name.split(' ')[0]}
              </button>
            );
          })}
        </div>
      )}

      {/* Leaflet Map Canvas */}
      <div className="relative w-full h-52 md:h-60 rounded-xl overflow-hidden border-y border-slate-800/60">
        <div ref={mapContainerRef} className="w-full h-full z-0 bg-slate-900" />

        {/* Map Floating Controls */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
          <button
            onClick={handleZoomIn}
            className="w-7 h-7 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white flex items-center justify-center font-bold text-sm shadow-md transition-colors"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="w-7 h-7 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white flex items-center justify-center font-bold text-sm shadow-md transition-colors"
            title="Zoom Out"
          >
            -
          </button>
          <button
            onClick={handleResetCenter}
            className="w-7 h-7 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-cyan-400 flex items-center justify-center shadow-md transition-colors"
            title="Recenter"
          >
            <Navigation className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* District Vibe Badge */}
        <div className="absolute bottom-2 left-2 z-10 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-800 text-[10px] text-slate-300 shadow-lg flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="truncate max-w-[200px]">{district.vibe}</span>
        </div>
      </div>

      {/* Horizontal Pinned Spots Carousel */}
      <div className="px-3 py-1 space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold text-slate-300 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>Pinned Venues & Highlights ({district.pins.length})</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Tap pin to focus</span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {district.pins.map((pin) => {
            const isSelected = selectedPin?.id === pin.id;
            return (
              <button
                key={pin.id}
                onClick={() => handleSelectPin(pin)}
                className={`flex-shrink-0 p-2 rounded-xl text-left border transition-all text-xs w-40 ${
                  isSelected
                    ? `bg-slate-850 border-cyan-500/80 shadow-lg ${tenant.glowClass}`
                    : 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="font-bold text-white truncate text-[11px]">
                    {pin.name}
                  </span>
                  {pin.rating && (
                    <span className="flex items-center gap-0.5 text-amber-400 font-mono text-[10px] flex-shrink-0">
                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                      <span>{pin.rating}</span>
                    </span>
                  )}
                </div>

                <p className="text-[10px] text-slate-400 truncate mb-1">
                  {pin.address}
                </p>

                <span className="inline-block text-[9px] font-semibold text-cyan-400 uppercase tracking-wider">
                  {pin.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Pin Detailed Showcase Box */}
      {selectedPin && (
        <div className="p-3 bg-slate-900/95 border-t border-slate-800/80 space-y-2 text-xs">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                  {selectedPin.category}
                </span>
                {selectedPin.priceLevel && (
                  <span className="text-[11px] text-slate-400 font-mono">
                    {selectedPin.priceLevel}
                  </span>
                )}
                {selectedPin.hours && (
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{selectedPin.hours}</span>
                  </span>
                )}
              </div>

              <h4 className="font-bold text-white text-sm">{selectedPin.name}</h4>
              <p className="text-[11px] text-slate-400">{selectedPin.address}</p>
            </div>

            {selectedPin.rating && (
              <div className="flex items-center gap-1 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-md text-amber-300 text-xs font-semibold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{selectedPin.rating}</span>
              </div>
            )}
          </div>

          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-300">
            <span className="text-slate-400 font-medium">✨ Highlight: </span>
            <span>{selectedPin.highlight}</span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <a
              href={selectedPin.actionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-gradient-to-r ${tenant.gradientClass} text-white font-semibold text-xs shadow-md hover:opacity-95 transition-opacity`}
            >
              <span>{selectedPin.actionText}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                selectedPin.name + ' ' + selectedPin.address + ' ' + tenant.name
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Open in Google Maps / Directions"
            >
              <Navigation className="w-4 h-4 text-cyan-400" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
