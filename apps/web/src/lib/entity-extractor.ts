import { getCityHubData } from './city-data';
import { MapPinPoint, CANADIAN_GEO_SPOTLIGHTS, GeoSpotlightDistrict, findMatchingGeoSpotlight } from './city-geo-data';

export interface ExtractedChatSpotlight {
  hasResults: boolean;
  title: string;
  subtitle: string;
  center: [number, number];
  zoom: number;
  pins: MapPinPoint[];
  bounds?: [[number, number], [number, number]];
}

// City Center Coordinate Defaults
const CITY_CENTERS: Record<string, { center: [number, number]; zoom: number }> = {
  yyc: { center: [51.0447, -114.0719], zoom: 14 },
  yyz: { center: [43.6532, -79.3832], zoom: 14 },
  yvr: { center: [49.2827, -123.1207], zoom: 14 },
  yul: { center: [45.5017, -73.5673], zoom: 14 },
  yeg: { center: [53.5461, -113.4938], zoom: 14 },
  yow: { center: [45.4215, -75.6972], zoom: 14 },
  ywg: { center: [49.8951, -97.1384], zoom: 14 },
  yhz: { center: [44.6488, -63.5752], zoom: 14 },
  yyj: { center: [48.4284, -123.3656], zoom: 14 },
  yyt: { center: [47.5615, -52.7126], zoom: 14 },
};

// Comprehensive Known Coordinate Dictionary for Canadian Venues, Attractions & Districts
const VENUE_COORDINATES: Record<string, { lat: number; lng: number; address: string; actionUrl?: string; category?: 'restaurant' | 'theatre' | 'hotel' | 'park' | 'attraction' | 'transit'; rating?: number }> = {
  // Calgary (YYC)
  'telus spark': { lat: 51.0535, lng: -114.0250, address: '220 St. George\'s Dr NE', actionUrl: 'https://sparkscience.ca', category: 'attraction', rating: 4.7 },
  'spark science': { lat: 51.0535, lng: -114.0250, address: '220 St. George\'s Dr NE', actionUrl: 'https://sparkscience.ca', category: 'attraction', rating: 4.7 },
  'spark': { lat: 51.0535, lng: -114.0250, address: '220 St. George\'s Dr NE', actionUrl: 'https://sparkscience.ca', category: 'attraction', rating: 4.7 },
  'science centre': { lat: 51.0535, lng: -114.0250, address: '220 St. George\'s Dr NE', actionUrl: 'https://sparkscience.ca', category: 'attraction', rating: 4.7 },
  'calgary tower': { lat: 51.0443, lng: -114.0631, address: '101 9 Ave SW', actionUrl: 'https://calgarytower.com', category: 'attraction', rating: 4.6 },
  'sky 360': { lat: 51.0443, lng: -114.0631, address: '101 9 Ave SW', actionUrl: 'https://opentable.com/sky-360', category: 'restaurant', rating: 4.7 },
  'major tom': { lat: 51.0455, lng: -114.0689, address: '40th Floor, 700 2 St SW', actionUrl: 'https://sevenrooms.com/reservations/majortombar', category: 'restaurant', rating: 4.9 },
  'river café': { lat: 51.0542, lng: -114.0708, address: '25 Prince\'s Island Park', actionUrl: 'https://opentable.com/river-cafe-calgary', category: 'restaurant', rating: 4.9 },
  'teatro': { lat: 51.0459, lng: -114.0601, address: '200 8 Ave SE', actionUrl: 'https://opentable.com/teatro', category: 'restaurant', rating: 4.8 },
  'charcut': { lat: 51.0461, lng: -114.0628, address: '899 Centre St S', actionUrl: 'https://opentable.com/charcut', category: 'restaurant', rating: 4.7 },
  'model milk': { lat: 51.0378, lng: -114.0685, address: '308 17 Ave SW', actionUrl: 'https://opentable.com/model-milk', category: 'restaurant', rating: 4.8 },
  'una pizza': { lat: 51.0379, lng: -114.0748, address: '618 17 Ave SW', actionUrl: 'https://unapizzeria.com', category: 'restaurant', rating: 4.7 },
  'lulu bar': { lat: 51.0377, lng: -114.0710, address: '510 17 Ave SW', actionUrl: 'https://opentable.com/lulu-bar', category: 'restaurant', rating: 4.8 },
  'ship & anchor': { lat: 51.0380, lng: -114.0725, address: '534 17 Ave SW', actionUrl: 'https://shipandanchor.com', category: 'restaurant', rating: 4.7 },
  'calgary zoo': { lat: 51.0456, lng: -114.0270, address: '210 St. George\'s Dr NE', actionUrl: 'https://calgaryzoo.com', category: 'attraction', rating: 4.8 },
  'wilder institute': { lat: 51.0456, lng: -114.0270, address: '210 St. George\'s Dr NE', actionUrl: 'https://calgaryzoo.com', category: 'attraction', rating: 4.8 },
  'stephen ave': { lat: 51.0458, lng: -114.0680, address: '8th Ave SW', actionUrl: 'https://downtowncalgary.com', category: 'attraction' },
  'peace bridge': { lat: 51.0538, lng: -114.0792, address: 'Bow River at 8 St SW', actionUrl: 'https://calgary.ca/peacebridge', category: 'attraction' },
  'prince\'s island': { lat: 51.0545, lng: -114.0710, address: 'Prince\'s Island Park', actionUrl: 'https://calgary.ca/parks', category: 'park', rating: 4.9 },
  'saddledome': { lat: 51.0374, lng: -114.0519, address: '555 Saddledome Rise SE', actionUrl: 'https://ticketmaster.ca', category: 'theatre' },
  'flames': { lat: 51.0374, lng: -114.0519, address: 'Scotiabank Saddledome', actionUrl: 'https://ticketmaster.ca', category: 'theatre' },
  'stampede': { lat: 51.0374, lng: -114.0519, address: 'Stampede Park', actionUrl: 'https://calgarystampede.com', category: 'attraction', rating: 4.9 },
  'studio bell': { lat: 51.0450, lng: -114.0531, address: '850 4 St SE', actionUrl: 'https://studiobell.ca', category: 'attraction', rating: 4.8 },
  'heritage park': { lat: 50.9818, lng: -114.0990, address: '1900 Heritage Dr SW', actionUrl: 'https://heritagepark.ca', category: 'attraction', rating: 4.8 },
  'winsport': { lat: 51.0805, lng: -114.2158, address: '88 Canada Olympic Rd SW', actionUrl: 'https://winsport.ca', category: 'park', rating: 4.7 },
  'glenbow': { lat: 51.0449, lng: -114.0608, address: '130 9 Ave SE', actionUrl: 'https://glenbow.org', category: 'attraction', rating: 4.8 },
  'hotel le germain': { lat: 51.0445, lng: -114.0625, address: '899 Centre St SW', actionUrl: 'https://booking.com', category: 'hotel', rating: 4.8 },
  'the dorian': { lat: 51.0478, lng: -114.0720, address: '525 5 Ave SW', actionUrl: 'https://booking.com', category: 'hotel', rating: 4.9 },

  // Toronto (YYZ)
  'cn tower': { lat: 43.6426, lng: -79.3871, address: '290 Bremner Blvd', actionUrl: 'https://cntower.ca', category: 'attraction', rating: 4.8 },
  'ripley\'s': { lat: 43.6424, lng: -79.3860, address: '288 Bremner Blvd', actionUrl: 'https://ripleyaquariums.com/canada', category: 'attraction', rating: 4.8 },
  'aquarium': { lat: 43.6424, lng: -79.3860, address: '288 Bremner Blvd', actionUrl: 'https://ripleyaquariums.com/canada', category: 'attraction', rating: 4.8 },
  'rom': { lat: 43.6677, lng: -79.3948, address: '100 Queens Park', actionUrl: 'https://rom.on.ca', category: 'attraction', rating: 4.8 },
  'royal ontario museum': { lat: 43.6677, lng: -79.3948, address: '100 Queens Park', actionUrl: 'https://rom.on.ca', category: 'attraction', rating: 4.8 },
  'casa loma': { lat: 43.6780, lng: -79.4094, address: '1 Austin Terrace', actionUrl: 'https://casaloma.ca', category: 'attraction', rating: 4.7 },
  'ago': { lat: 43.6536, lng: -79.3925, address: '317 Dundas St W', actionUrl: 'https://ago.ca', category: 'attraction', rating: 4.8 },
  'art gallery of ontario': { lat: 43.6536, lng: -79.3925, address: '317 Dundas St W', actionUrl: 'https://ago.ca', category: 'attraction', rating: 4.8 },
  'alo': { lat: 43.6483, lng: -79.3965, address: '163 Spadina Ave', actionUrl: 'https://opentable.com/alo-restaurant', category: 'restaurant', rating: 4.9 },
  'el catrin': { lat: 43.6506, lng: -79.3585, address: '18 Tank House Lane', actionUrl: 'https://opentable.com/el-catrin', category: 'restaurant', rating: 4.8 },
  'cluny': { lat: 43.6501, lng: -79.3598, address: '35 Tank House Lane', actionUrl: 'https://opentable.com/cluny-bistro', category: 'restaurant', rating: 4.7 },
  'princess of wales': { lat: 43.6471, lng: -79.3892, address: '300 King St W', actionUrl: 'https://mirvish.com', category: 'theatre', rating: 4.9 },
  'lion king': { lat: 43.6471, lng: -79.3892, address: 'Princess of Wales Theatre', actionUrl: 'https://mirvish.com', category: 'theatre', rating: 4.9 },
  'distillery district': { lat: 43.6503, lng: -79.3592, address: '55 Mill St', actionUrl: 'https://thedistillerydistrict.com', category: 'attraction', rating: 4.8 },
  'king st': { lat: 43.6475, lng: -79.3905, address: 'King Street West', actionUrl: 'https://toronto.ca', category: 'attraction' },
  'toronto zoo': { lat: 43.8180, lng: -79.1865, address: '2000 Meadowvale Rd', actionUrl: 'https://torontozoo.com', category: 'attraction', rating: 4.8 },
  'scotiabank arena': { lat: 43.6435, lng: -79.3791, address: '40 Bay St', actionUrl: 'https://ticketmaster.ca', category: 'theatre', rating: 4.8 },
  'maple leafs': { lat: 43.6435, lng: -79.3791, address: 'Scotiabank Arena', actionUrl: 'https://ticketmaster.ca', category: 'theatre' },
  '1 hotel toronto': { lat: 43.6438, lng: -79.4002, address: '550 Wellington St W', actionUrl: 'https://booking.com', category: 'hotel', rating: 4.8 },
  'shangri-la': { lat: 43.6491, lng: -79.3872, address: '188 University Ave', actionUrl: 'https://booking.com', category: 'hotel', rating: 4.9 },

  // Vancouver (YVR)
  'science world': { lat: 49.2734, lng: -123.1038, address: '1455 Quebec St', actionUrl: 'https://scienceworld.ca', category: 'attraction', rating: 4.7 },
  'capilano': { lat: 49.3429, lng: -123.1149, address: '3735 Capilano Rd', actionUrl: 'https://capbridge.com', category: 'park', rating: 4.8 },
  'granville island': { lat: 49.2712, lng: -123.1340, address: '1669 Johnston St', actionUrl: 'https://granvilleisland.com', category: 'attraction', rating: 4.8 },
  'l\'abattoir': { lat: 49.2838, lng: -123.1090, address: '217 Carrall St', actionUrl: 'https://opentable.com/labattoir', category: 'restaurant', rating: 4.9 },
  'steam clock': { lat: 49.2845, lng: -123.1089, address: '305 Water St', actionUrl: 'https://gastown.org', category: 'attraction', rating: 4.6 },
  'gastown': { lat: 49.2838, lng: -123.1090, address: 'Gastown Quarter', actionUrl: 'https://gastown.org', category: 'attraction' },
  'stanley park': { lat: 49.3017, lng: -123.1310, address: 'Stanley Park', actionUrl: 'https://vancouver.ca', category: 'park', rating: 4.9 },
  'vancouver aquarium': { lat: 49.3006, lng: -123.1312, address: '845 Avison Way', actionUrl: 'https://vanaqua.org', category: 'attraction', rating: 4.8 },
  'rogers arena': { lat: 49.2778, lng: -123.1088, address: '800 Griffiths Way', actionUrl: 'https://ticketmaster.ca', category: 'theatre' },
  'canucks': { lat: 49.2778, lng: -123.1088, address: 'Rogers Arena', actionUrl: 'https://ticketmaster.ca', category: 'theatre' },

  // Montreal (YUL)
  'notre-dame': { lat: 45.5048, lng: -73.5560, address: '110 Notre-Dame St W', actionUrl: 'https://basiliquenotredame.ca', category: 'attraction', rating: 4.9 },
  'old port': { lat: 45.5030, lng: -73.5510, address: 'Old Port of Montreal', actionUrl: 'https://oldportofmontreal.com', category: 'attraction', rating: 4.8 },
  'mount royal': { lat: 45.5039, lng: -73.5878, address: 'Mount Royal Lookout', actionUrl: 'https://montreal.ca', category: 'park', rating: 4.9 },
  'biodome': { lat: 45.5580, lng: -73.5500, address: '4777 Pierre-de Coubertin Ave', actionUrl: 'https://espacepourlavie.ca', category: 'attraction', rating: 4.8 },

  // Edmonton (YEG)
  'west edmonton mall': { lat: 53.5225, lng: -113.6242, address: '8882 170 St NW', actionUrl: 'https://wem.ca', category: 'attraction', rating: 4.8 },
  'rogers place': { lat: 53.5469, lng: -113.4975, address: '10220 104 Ave NW', actionUrl: 'https://rogersplace.com', category: 'theatre', rating: 4.8 },
  'oilers': { lat: 53.5469, lng: -113.4975, address: 'Rogers Place', actionUrl: 'https://ticketmaster.ca', category: 'theatre' },

  // Ottawa (YOW)
  'parliament': { lat: 45.4248, lng: -75.6997, address: 'Wellington St', actionUrl: 'https://lop.parl.ca', category: 'attraction', rating: 4.8 },
  'byward market': { lat: 45.4276, lng: -75.6925, address: 'ByWard Market Square', actionUrl: 'https://byward-market.com', category: 'attraction', rating: 4.7 },
  'rideau canal': { lat: 45.4215, lng: -75.6940, address: 'Rideau Canal', actionUrl: 'https://ncc-ccn.gc.ca', category: 'park', rating: 4.9 },
};

export function extractChatSpotlightEntities(
  messagesText: string,
  tenantId: string
): ExtractedChatSpotlight {
  const normalized = messagesText.toLowerCase();

  // 0. If conversation matches a known landmark/district (e.g. TELUS Spark, Toronto Zoo, Stephen Ave), load full curated pins
  const matchedDistrict = findMatchingGeoSpotlight(normalized, tenantId);
  if (matchedDistrict) {
    return {
      hasResults: true,
      title: matchedDistrict.name,
      subtitle: matchedDistrict.tagline,
      center: matchedDistrict.center,
      zoom: matchedDistrict.zoom,
      pins: matchedDistrict.pins,
    };
  }

  const cityHub = getCityHubData(tenantId);
  const matchedPins: MapPinPoint[] = [];
  const addedIds = new Set<string>();

  // 1. Check Known Coordinate Dictionary for all Canadian Venues and Attractions
  Object.keys(VENUE_COORDINATES).forEach((key) => {
    if (normalized.includes(key) && !addedIds.has(key)) {
      const coord = VENUE_COORDINATES[key];
      const defaultCenter = CITY_CENTERS[tenantId]?.center || [51.0447, -114.0719];
      const dist = Math.abs(coord.lat - defaultCenter[0]) + Math.abs(coord.lng - defaultCenter[1]);

      if (dist < 1.0) {
        addedIds.add(key);
        const properName = key.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        matchedPins.push({
          id: key,
          name: properName,
          category: coord.category || 'attraction',
          lat: coord.lat,
          lng: coord.lng,
          address: coord.address,
          rating: coord.rating,
          highlight: `Featured Location • ${coord.address}`,
          actionText: coord.actionUrl?.includes('ticket') ? 'Get Tickets' : coord.actionUrl?.includes('seven') || coord.actionUrl?.includes('open') ? 'Reserve Table' : 'View Venue Details',
          actionUrl: coord.actionUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(properName + ' ' + tenantId)}`,
        });
      }
    }
  });

  // 2. Scan Curated Restaurants
  (cityHub.restaurants || []).forEach((r) => {
    const key = r.name.toLowerCase();
    if (normalized.includes(key) && !addedIds.has(r.id)) {
      addedIds.add(r.id);
      const coords = VENUE_COORDINATES[key] || {
        lat: CITY_CENTERS[tenantId]?.center[0] || 51.0447,
        lng: CITY_CENTERS[tenantId]?.center[1] || -114.0719,
        address: `${r.neighborhood}, ${tenantId.toUpperCase()}`,
      };

      matchedPins.push({
        id: r.id,
        name: r.name,
        category: 'restaurant',
        lat: coords.lat,
        lng: coords.lng,
        address: coords.address || `${r.neighborhood}`,
        rating: r.rating,
        highlight: `Signature: ${r.signatureDish} • ${r.cuisine} (${r.priceLevel})`,
        actionText: `Reserve Table (${r.bookingPlatform})`,
        actionUrl: r.reservationUrl,
        hours: `Open Slots: ${r.availableTimes.slice(0, 2).join(', ')}`,
        priceLevel: r.priceLevel,
      });
    }
  });

  // 3. Scan Curated Shows & Theatres
  (cityHub.shows || []).forEach((s) => {
    const key = s.title.toLowerCase();
    const venueKey = s.venue.toLowerCase();
    if ((normalized.includes(key) || normalized.includes(venueKey)) && !addedIds.has(s.id)) {
      addedIds.add(s.id);
      const coords = VENUE_COORDINATES[venueKey] || VENUE_COORDINATES[key] || {
        lat: (CITY_CENTERS[tenantId]?.center[0] || 51.0447) + 0.002,
        lng: (CITY_CENTERS[tenantId]?.center[1] || -114.0719) - 0.002,
        address: `${s.venue}, ${tenantId.toUpperCase()}`,
      };

      matchedPins.push({
        id: s.id,
        name: `${s.title} (${s.venue})`,
        category: 'theatre',
        lat: coords.lat,
        lng: coords.lng,
        address: coords.address,
        highlight: `${s.category} • From ${s.ticketPriceRange} • ${s.availabilityStatus}`,
        actionText: `Get Tickets (${s.ticketPlatform})`,
        actionUrl: s.ticketUrl,
        hours: s.dates,
      });
    }
  });

  // 4. Scan Hotels
  (cityHub.hotels || []).forEach((h) => {
    const key = h.name.toLowerCase();
    if (normalized.includes(key) && !addedIds.has(h.id)) {
      addedIds.add(h.id);
      const coords = VENUE_COORDINATES[key] || {
        lat: (CITY_CENTERS[tenantId]?.center[0] || 51.0447) - 0.003,
        lng: (CITY_CENTERS[tenantId]?.center[1] || -114.0719) + 0.003,
        address: `${h.neighborhood}`,
      };

      matchedPins.push({
        id: h.id,
        name: h.name,
        category: 'hotel',
        lat: coords.lat,
        lng: coords.lng,
        address: coords.address,
        rating: h.rating,
        highlight: `${h.tag} • ${h.pricePerNight}`,
        actionText: `Book Stay (${h.bookingPlatform})`,
        actionUrl: h.bookingUrl,
      });
    }
  });

  // If we found specific pins in the chat response:
  if (matchedPins.length > 0) {
    const avgLat = matchedPins.reduce((sum, p) => sum + p.lat, 0) / matchedPins.length;
    const avgLng = matchedPins.reduce((sum, p) => sum + p.lng, 0) / matchedPins.length;

    return {
      hasResults: true,
      title: `Chat Results Spotlight (${matchedPins.length} Places Pinned)`,
      subtitle: `Live locations mentioned in your conversation`,
      center: [avgLat, avgLng],
      zoom: matchedPins.length > 1 ? 14 : 16,
      pins: matchedPins,
    };
  }

  // Fallback to default city center
  const defaultCity = CITY_CENTERS[tenantId] || { center: [51.0447, -114.0719], zoom: 14 };
  return {
    hasResults: false,
    title: `City Exploration Spotlight`,
    subtitle: `Ask about restaurants, shows, or streets to drop live pins`,
    center: defaultCity.center,
    zoom: defaultCity.zoom,
    pins: [],
  };
}
