export interface RestaurantHighlight {
  id: string;
  name: string;
  cuisine: string;
  neighborhood: string;
  priceLevel: '$' | '$$' | '$$$' | '$$$$';
  rating: number;
  reviewCount: number;
  signatureDish: string;
  bookingPlatform: 'OpenTable' | 'Resy' | 'Direct' | 'SevenRooms';
  reservationUrl: string;
  availableTimes: string[];
  imageUrl?: string;
  tag: string;
  sponsored?: boolean;
}

export interface ShowHighlight {
  id: string;
  title: string;
  venue: string;
  neighborhood: string;
  category: 'Theatre' | 'Concert' | 'Comedy' | 'Cinema' | 'Festival' | 'Symphony';
  dates: string;
  ticketPriceRange: string;
  ticketUrl: string;
  ticketPlatform: 'Ticketmaster' | 'Mirvish' | 'Eventbrite' | 'Box Office' | 'Direct' | 'Ticket Atlantic' | 'Showpass';
  availabilityStatus: 'Selling Fast' | 'Good Seats Available' | 'Limited VIP' | 'Almost Sold Out' | 'Walk-ins Welcome';
  badgeColor: string;
  sponsored?: boolean;
}

export interface HotelStay {
  id: string;
  name: string;
  neighborhood: string;
  rating: number;
  reviewCount: number;
  pricePerNight: string;
  bookingUrl: string;
  bookingPlatform: 'Booking.com' | 'Expedia' | 'Direct' | 'Hotels.com';
  amenities: string[];
  tag: string;
  description: string;
}

export interface TourExperience {
  id: string;
  title: string;
  operator: string;
  category: 'Food Tour' | 'Sightseeing' | 'Nature & Wildlife' | 'Craft Brewery' | 'Helicopter / Cruise' | 'Historic Walk';
  duration: string;
  rating: number;
  reviewCount: number;
  priceFrom: string;
  bookingUrl: string;
  bookingPlatform: 'Viator' | 'GetYourGuide' | 'Direct';
  highlights: string[];
  badge: string;
}

export interface OutdoorPark {
  id: string;
  name: string;
  neighborhood: string;
  category: 'Hiking Trail' | 'Urban Park' | 'Beach & Waterfront' | 'Lookout Point';
  distanceOrSize: string;
  difficulty: 'Easy Stroll' | 'Moderate Trail' | 'Challenging Hike';
  features: string[];
  parkingTips: string;
  bestTime: string;
  tag: string;
}

export interface TransitLineStatus {
  id: string;
  lineName: string;
  systemName: string;
  status: 'Normal Service' | 'Minor Delays' | 'Planned Work' | 'Station Advisory';
  statusColor: 'emerald' | 'amber' | 'rose' | 'blue';
  details: string;
  updatedMinutesAgo: number;
}

export interface CivicService {
  id: string;
  title: string;
  department: string;
  actionText: string;
  actionUrl: string;
  description: string;
  phone?: string;
}

export interface NewsHeadline {
  id: string;
  title: string;
  source: string;
  category: 'Civic' | 'Business' | 'Culture' | 'Development';
  url: string;
  timeAgo: string;
  summary: string;
  expandedDetails: {
    keyTakeaways: string[];
    localImpact: string;
    timeline: string;
    relatedActionUrl?: string;
    relatedActionText?: string;
  };
}

export interface SportsGameScore {
  id: string;
  team: string;
  opponent: string;
  league: 'NHL' | 'CFL' | 'NBA' | 'MLB' | 'MLS' | 'WHL' | 'QMJHL' | 'OHL' | 'CPL' | 'NLL' | 'BSL';
  status: 'Final' | 'Live' | 'Upcoming';
  score?: string;
  gameTime?: string;
  tvBroadcast?: string;
  isHome: boolean;
}

export interface NightlifeSpot {
  id: string;
  name: string;
  category: 'Nightclub' | 'Speakeasy' | 'Cocktail Lounge' | 'Rooftop Bar' | 'Live Music & Dance' | 'Country Saloon' | 'Irish Pub';
  neighborhood: string;
  vibe: string;
  coverOrVip: string;
  hours: string;
  guestlistUrl: string;
  tag: string;
  sponsored?: boolean;
}

export interface CityHubData {
  tenantId: string;
  cityName: string;
  news: NewsHeadline[];
  sports: SportsGameScore[];
  restaurants: RestaurantHighlight[];
  nightlife: NightlifeSpot[];
  shows: ShowHighlight[];
  hotels: HotelStay[];
  experiences: TourExperience[];
  outdoors: OutdoorPark[];
  transitLines: TransitLineStatus[];
  civicServices: CivicService[];
}

export const CITY_HUB_REGISTRY: Record<string, CityHubData> = {
  // =========================================================================
  // 1. CALGARY (YYC)
  // =========================================================================
  yyc: {
    tenantId: 'yyc',
    cityName: 'Calgary',
    news: [
      {
        id: 'yyc-n1',
        title: 'Green Line LRT Construction Accelerates with Downtown Cavern Contracts',
        source: 'Calgary Herald',
        category: 'Civic',
        url: 'https://calgaryherald.com',
        timeAgo: '45 mins ago',
        summary: 'City Council finalizes major underground tunneling agreements for 7th Ave and Beltline connections.',
        expandedDetails: {
          keyTakeaways: [
            'Construction contracts finalized for initial Phase 1 underground tunneling beneath the downtown rail corridor.',
            'New underground stations planned at 4th Street SE and Centre Street with multi-modal CTrain transfers.',
            'Expected completion timeline projected for late 2028 with enhanced electric low-floor trains.',
          ],
          localImpact: 'Expect temporary traffic detours along 11th Avenue SW and 2nd Street SE. Transit riders will experience zero service cuts to current Red/Blue line service.',
          timeline: 'Tunneling commences Q2 2027 • Station structural work underway through 2028.',
          relatedActionUrl: 'https://www.calgary.ca/greenline.html',
          relatedActionText: 'View Green Line Detour Map',
        },
      },
      {
        id: 'yyc-n2',
        title: '17th Avenue Southwest Patio Program Returns for Extended Season',
        source: 'Daily Hive Calgary',
        category: 'Culture',
        url: 'https://dailyhive.com/calgary',
        timeAgo: '2 hours ago',
        summary: 'Over 40 restaurants and craft bars along 17th Ave and Inglewood expand outdoor dining spaces.',
        expandedDetails: {
          keyTakeaways: [
            'Expanded patio permits granted to 40+ local Beltline and 17th Ave establishments.',
            'Sidewalk boardwalk extensions provide barrier-free pedestrian accessibility alongside outdoor dining.',
            'Acoustic live music permitted on patios until 10:00 PM on weekends.',
          ],
          localImpact: 'Pedestrian foot traffic along the Red Mile corridor increases significantly with designated pick-up/drop-off zones for rideshares.',
          timeline: 'Patios operating daily through late October weather permitting.',
          relatedActionUrl: 'https://www.17thave.ca',
          relatedActionText: 'Explore 17th Ave Patio Directory',
        },
      },
    ],
    sports: [
      {
        id: 'yyc-sp1',
        team: 'Calgary Stampeders',
        opponent: 'BC Lions',
        league: 'CFL',
        status: 'Upcoming',
        gameTime: 'Saturday • 5:00 PM',
        tvBroadcast: 'TSN 1/3',
        isHome: true,
      },
      {
        id: 'yyc-sp2',
        team: 'Calgary Flames',
        opponent: 'Edmonton Oilers (Battle of Alberta)',
        league: 'NHL',
        status: 'Upcoming',
        gameTime: 'Regular Season Matchup',
        tvBroadcast: 'Sportsnet West / CBC',
        isHome: true,
      },
      {
        id: 'yyc-sp3',
        team: 'Calgary Hitmen',
        opponent: 'Red Deer Rebels',
        league: 'WHL',
        status: 'Final',
        score: '5 - 3 (W)',
        tvBroadcast: 'WHL Live',
        isHome: true,
      },
    ],
    restaurants: [
      {
        id: 'yyc-r1',
        name: 'Major Tom Bar',
        cuisine: 'Modern Steakhouse & Elevated Cocktails',
        neighborhood: 'Downtown / Stephen Ave (40th Floor)',
        priceLevel: '$$$$',
        rating: 4.9,
        reviewCount: 2100,
        signatureDish: 'Prime Alberta Striploin & Potato Puffs',
        bookingPlatform: 'SevenRooms',
        reservationUrl: 'https://www.sevenrooms.com/reservations/majortombar?aff=canadacity',
        availableTimes: ['5:15 PM', '7:30 PM', '9:00 PM'],
        tag: 'Canada’s 100 Best #1',
      },
      {
        id: 'yyc-r2',
        name: 'Ten Foot Henry',
        cuisine: 'Vegetable-Forward & Family-Style Sharing',
        neighborhood: 'Beltline / 1st St SW',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 2900,
        signatureDish: 'Tuna Crudo & Henry Salad',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/ten-foot-henry-calgary?aff=canadacity',
        availableTimes: ['5:45 PM', '6:30 PM', '8:15 PM'],
        tag: 'Calgary Essential',
      },
      {
        id: 'yyc-r3',
        name: 'Bridgette Bar',
        cuisine: 'Chef-Driven Wood-Fired Kitchen',
        neighborhood: 'Design District / 10th Ave',
        priceLevel: '$$$',
        rating: 4.7,
        reviewCount: 1650,
        signatureDish: 'Eggplant Fries & Lamb Rigatoni',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/bridgette-bar-calgary?aff=canadacity',
        availableTimes: ['6:00 PM', '7:15 PM', '8:45 PM'],
        tag: 'Vibrant Nightlife',
      },
    ],
    nightlife: [
      {
        id: 'yyc-nl1',
        name: 'Cowboys Dance Hall',
        category: 'Country Saloon',
        neighborhood: 'Stampede Park / Victoria Park',
        vibe: 'High-energy mega country dance club with live bands, mechanical bulls & VIP bottle service',
        coverOrVip: '$10 - $25 • VIP Booths Available',
        hours: 'Thu - Sat • 8:00 PM - 2:00 AM',
        guestlistUrl: 'https://cowboysnightclub.com',
        tag: 'Legendary Calgary Party',
      },
      {
        id: 'yyc-nl2',
        name: 'Commonwealth Bar & Stage',
        category: 'Nightclub',
        neighborhood: 'Beltline / 10th Ave SW',
        vibe: 'Two-floor historic warehouse venue with vintage sound, hip-hop main room & underground basement beats',
        coverOrVip: '$15 - $20 at door • Guestlist prior to 10:30 PM',
        hours: 'Fri & Sat • 9:00 PM - 2:00 AM',
        guestlistUrl: 'https://commonwealthbar.ca',
        tag: 'Beltline Hotspot',
      },
      {
        id: 'yyc-nl3',
        name: 'Sub Rosa',
        category: 'Speakeasy',
        neighborhood: 'Downtown / Stephen Ave (Below Hudson’s Block)',
        vibe: 'Subterranean luxury lounge with exposed century brick, plush velvet booths & craft cocktail artistry',
        coverOrVip: 'Free entry early • Reservations recommended',
        hours: 'Thu - Sat • 8:00 PM - 2:00 AM',
        guestlistUrl: 'https://subrosayyc.com',
        tag: 'Hidden Speakeasy',
      },
      {
        id: 'yyc-nl4',
        name: 'Proof Cocktail Bar',
        category: 'Cocktail Lounge',
        neighborhood: 'Beltline / 1st St SW',
        vibe: 'Intimate artisanal cocktail haven with over 300 spirits and bespoke seasonal concoctions',
        coverOrVip: 'No cover • Walk-ins & reservations',
        hours: 'Daily • 4:00 PM - 1:00 AM',
        guestlistUrl: 'https://proofyyc.com',
        tag: 'Canada’s Top Cocktail Bar',
      },
    ],
    shows: [
      {
        id: 'yyc-s1',
        title: 'Broadway Across Canada: Wicked',
        venue: 'Southern Alberta Jubilee Auditorium',
        neighborhood: 'NW / SAIT Campus',
        category: 'Theatre',
        dates: 'Wed - Sun • 7:30 PM & 2:00 PM',
        ticketPriceRange: '$75 - $210',
        ticketUrl: 'https://calgary.broadway.com?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
      {
        id: 'yyc-s2',
        title: 'Calgary Philharmonic Orchestra: Sci-Fi & Movie Masterworks',
        venue: 'Jack Singer Concert Hall (Arts Commons)',
        neighborhood: 'Downtown Cultural District',
        category: 'Symphony',
        dates: 'Friday & Saturday • 7:30 PM',
        ticketPriceRange: '$42 - $135',
        ticketUrl: 'https://calgaryphil.com?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
      {
        id: 'yyc-s3',
        title: 'MacEwan Live Concert Series',
        venue: 'MacEwan Hall',
        neighborhood: 'U of C Campus / NW',
        category: 'Concert',
        dates: 'Touring Schedule • 8:00 PM',
        ticketPriceRange: '$35 - $85',
        ticketUrl: 'https://www.showpass.com?partner=canadacity',
        ticketPlatform: 'Showpass',
        availabilityStatus: 'Selling Fast',
        badgeColor: 'violet',
      },
    ],
    hotels: [
      {
        id: 'yyc-h1',
        name: 'The Dorian, Autograph Collection',
        neighborhood: 'Downtown / 5th Ave SW',
        rating: 4.8,
        reviewCount: 720,
        pricePerNight: '$245 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/the-dorian.html?aid=canadacity',
        bookingPlatform: 'Booking.com',
        amenities: ['Rooftop Lounge (The Wilde)', 'Boutique Aesthetic', 'Fitness Centre', 'Pet Friendly'],
        tag: 'Boutique Luxury',
        description: 'Oscar Wilde inspired boutique luxury hotel featuring an acclaimed 27th-floor rooftop restaurant.',
      },
    ],
    experiences: [
      {
        id: 'yyc-e1',
        title: 'Banff & Lake Louise Day Trip from Calgary',
        operator: 'Rocky Mountain Heritage Excursions',
        category: 'Nature & Wildlife',
        duration: '9 Hours',
        rating: 4.9,
        reviewCount: 1280,
        priceFrom: '$165 / person',
        bookingUrl: 'https://www.getyourguide.com/calgary-l1507/banff-national-park-day-trip?partner_id=canadacity',
        bookingPlatform: 'GetYourGuide',
        highlights: ['Lake Louise & Moraine Lake access', 'Banff Town exploration', 'Luxury coach with national park pass'],
        badge: 'Best Seller',
      },
    ],
    outdoors: [
      {
        id: 'yyc-o1',
        name: 'Prince’s Island Park & Bow River Pathway',
        neighborhood: 'Downtown Waterfront',
        category: 'Urban Park',
        distanceOrSize: '20 Hectares (50 km Pathway Loop)',
        difficulty: 'Easy Stroll',
        features: ['Paved Bike Paths', 'Riverfront Cafes', 'River Cafe Restaurant', 'Off-leash Dog Area'],
        parkingTips: 'Park at Eau Claire Market underground or surface lot.',
        bestTime: 'Morning for quiet runs; Evening for golden hour sunset.',
        tag: 'Calgary Waterfront Jewel',
      },
    ],
    transitLines: [
      {
        id: 'yyc-t1',
        lineName: 'CTrain Red Line (Tuscany - Somerset)',
        systemName: 'Calgary Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Frequent service active. Downtown Free Fare Zone operating.',
        updatedMinutesAgo: 3,
      },
      {
        id: 'yyc-t2',
        lineName: 'CTrain Blue Line (69th St - Saddletowne)',
        systemName: 'Calgary Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'All trains on schedule through City Hall.',
        updatedMinutesAgo: 6,
      },
    ],
    civicServices: [
      {
        id: 'yyc-c1',
        title: 'Calgary 311 Online Service Request',
        department: 'City of Calgary Civic Services',
        actionText: 'Report an Issue (311)',
        actionUrl: 'https://www.calgary.ca/311.html',
        description: 'Snow clearing notices, street sweeping, green cart schedule, and property bylaws.',
        phone: '311 (403-268-2489)',
      },
    ],
  },

  // =========================================================================
  // 2. TORONTO (YYZ)
  // =========================================================================
  yyz: {
    tenantId: 'yyz',
    cityName: 'Toronto',
    news: [
      {
        id: 'yyz-n1',
        title: 'Ontario Line Subway Construction Reaches Queen Station Milestone',
        source: 'Toronto Star',
        category: 'Civic',
        url: 'https://www.thestar.com',
        timeAgo: '1 hour ago',
        summary: 'Metrolinx announces key underground tunnel breakthrough in the downtown core.',
        expandedDetails: {
          keyTakeaways: [
            'Underground station cavern excavation reaches 30 meters beneath Queen and Yonge street.',
            'Direct subterranean connection to Line 1 subway and Eaton Centre complex completed.',
            'Target opening set to significantly reduce Line 1 crowding.',
          ],
          localImpact: 'Queen Street transit diversion via Richmond and Adelaide remains in place.',
          timeline: 'Civil engineering on schedule • Track installation in progress.',
          relatedActionUrl: 'https://www.metrolinx.com/ontarioline',
          relatedActionText: 'Ontario Line Route Map',
        },
      },
    ],
    sports: [
      {
        id: 'yyz-sp1',
        team: 'Toronto Blue Jays',
        opponent: 'New York Yankees',
        league: 'MLB',
        status: 'Upcoming',
        gameTime: 'Tonight • 7:07 PM',
        tvBroadcast: 'Sportsnet / MLB Network',
        isHome: true,
      },
      {
        id: 'yyz-sp2',
        team: 'Toronto Argonauts',
        opponent: 'Hamilton Tiger-Cats',
        league: 'CFL',
        status: 'Upcoming',
        gameTime: 'Friday • 7:30 PM',
        tvBroadcast: 'TSN 1/4',
        isHome: true,
      },
      {
        id: 'yyz-sp3',
        team: 'Toronto Maple Leafs',
        opponent: 'Montreal Canadiens',
        league: 'NHL',
        status: 'Upcoming',
        gameTime: 'Saturday Night Hockey • 7:00 PM',
        tvBroadcast: 'Sportsnet / CBC',
        isHome: true,
      },
    ],
    restaurants: [
      {
        id: 'yyz-r1',
        name: 'Alo Restaurant',
        cuisine: 'Contemporary French Tasting',
        neighborhood: 'Queen West / Spadina',
        priceLevel: '$$$$',
        rating: 4.9,
        reviewCount: 1420,
        signatureDish: 'Hokkaido Scallop & Truffle Foie Gras',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/alo-restaurant-toronto?aff=canadacity',
        availableTimes: ['5:30 PM', '7:45 PM', '9:15 PM'],
        tag: 'Michelin Starred',
      },
      {
        id: 'yyz-r2',
        name: 'Pai Northern Thai Kitchen',
        cuisine: 'Authentic Northern Thai',
        neighborhood: 'Entertainment District',
        priceLevel: '$$',
        rating: 4.8,
        reviewCount: 5200,
        signatureDish: 'Khao Soi with Braised Beef',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/pai-northern-thai-kitchen-toronto?aff=canadacity',
        availableTimes: ['6:00 PM', '6:30 PM', '8:00 PM'],
        tag: 'Local Favorite',
      },
    ],
    nightlife: [
      {
        id: 'yyz-nl1',
        name: 'Rebel Nightclub',
        category: 'Nightclub',
        neighborhood: 'Polson Pier / Waterfront',
        vibe: 'Canada’s largest nightlife complex (45,000 sq ft) with 4 rooms, 65-foot stage & international EDM DJs',
        coverOrVip: '$25 - $60 • VIP Bottle Service Booths',
        hours: 'Sat • 10:00 PM - 3:00 AM',
        guestlistUrl: 'https://rebeltoronto.com',
        tag: 'Mega Waterfront Club',
      },
      {
        id: 'yyz-nl2',
        name: 'Lavelle',
        category: 'Rooftop Bar',
        neighborhood: 'King West (16th Floor)',
        vibe: 'Upscale rooftop playground with 3 outdoor pools, 360-degree Toronto skyline vistas, and DJ bottle service',
        coverOrVip: 'Reservations & VIP Table Packages',
        hours: 'Wed - Sun • 5:00 PM - 2:00 AM',
        guestlistUrl: 'https://chezlavelle.com',
        tag: 'King West Skyline Rooftop',
      },
    ],
    shows: [
      {
        id: 'yyz-s1',
        title: 'The Lion King - Mirvish Musical',
        venue: 'Princess of Wales Theatre',
        neighborhood: 'Entertainment District',
        category: 'Theatre',
        dates: 'Tue - Sun • 7:30 PM & 2:00 PM',
        ticketPriceRange: '$69 - $225',
        ticketUrl: 'https://www.mirvish.com/shows/the-lion-king?partner=canadacity',
        ticketPlatform: 'Mirvish',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
      {
        id: 'yyz-s2',
        title: 'Toronto Symphony Orchestra: Masterworks',
        venue: 'Roy Thomson Hall',
        neighborhood: 'Downtown / King St',
        category: 'Symphony',
        dates: 'Thursday & Saturday • 8:00 PM',
        ticketPriceRange: '$48 - $160',
        ticketUrl: 'https://www.tso.ca?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
    ],
    hotels: [
      {
        id: 'yyz-h1',
        name: '1 Hotel Toronto',
        neighborhood: 'King West / Wellington',
        rating: 4.8,
        reviewCount: 950,
        pricePerNight: '$380 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/1-hotel-toronto.html?aid=canadacity',
        bookingPlatform: 'Booking.com',
        amenities: ['Harriet’s Rooftop Pool', 'Eco-Luxury Design', 'Flora Lounge'],
        tag: 'King West Hotspot',
        description: 'Sustainable luxury oasis with reclaimed wood interiors and a vibrant rooftop pool.',
      },
    ],
    experiences: [
      {
        id: 'yyz-e1',
        title: 'Kensington Market & Chinatown Secret Food Tour',
        operator: 'Culinary Adventure Co.',
        category: 'Food Tour',
        duration: '3 Hours',
        rating: 4.9,
        reviewCount: 950,
        priceFrom: '$89 / person',
        bookingUrl: 'https://www.viator.com/tours/Toronto/Kensington-Market-Food-Tour/d623-68212P2?partner=canadacity',
        bookingPlatform: 'Viator',
        highlights: ['6 curated food tastings across Kensington', 'Authentic Chinatown dumplings', 'Expert culinary guide'],
        badge: 'Top Food Tour',
      },
    ],
    outdoors: [
      {
        id: 'yyz-o1',
        name: 'High Park & Grenadier Pond Trails',
        neighborhood: 'West End / Bloor West',
        category: 'Urban Park',
        distanceOrSize: '161 Hectares (400 Acres)',
        difficulty: 'Easy Stroll',
        features: ['Cherry Blossom Grove', 'High Park Zoo', 'Grenadier Pond Boardwalk'],
        parkingTips: 'Free parking inside park gates on weekdays; TTC High Park Station direct.',
        bestTime: 'Spring for blossoms; Autumn for golden foliage.',
        tag: 'Toronto’s Largest Urban Park',
      },
    ],
    transitLines: [
      {
        id: 'yyz-t1',
        lineName: 'TTC Line 1 (Yonge-University)',
        systemName: 'Toronto Transit Commission',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Trains running every 3-4 minutes between Finch and Vaughan.',
        updatedMinutesAgo: 4,
      },
    ],
    civicServices: [
      {
        id: 'yyz-c1',
        title: 'Toronto 311 Online Service Request',
        department: 'City of Toronto Operations',
        actionText: 'Submit 311 Request',
        actionUrl: 'https://www.toronto.ca/home/311-toronto-at-your-service/',
        description: 'Report potholes, broken street lights, waste collection, or noise bylaws.',
        phone: '311 (416-392-2489)',
      },
    ],
  },

  // =========================================================================
  // 3. VANCOUVER (YVR)
  // =========================================================================
  yvr: {
    tenantId: 'yvr',
    cityName: 'Vancouver',
    news: [
      {
        id: 'yvr-n1',
        title: 'Broadway Subway Project Station Fit-Outs Reach Final Testing Phase',
        source: 'Vancouver Sun',
        category: 'Civic',
        url: 'https://vancouversun.com',
        timeAgo: '1 hour ago',
        summary: 'TransLink outlines testing schedule for Millennium Line extension along Broadway.',
        expandedDetails: {
          keyTakeaways: [
            '6 new underground stations from VCC-Clark to Arbutus Street entering electrical testing.',
            'Direct connection to major health precinct at Vancouver General Hospital.',
            'Reduces peak transit commute times from East Vancouver to UBC corridor by 30 minutes.',
          ],
          localImpact: 'Broadway street lanes reopened with new bus priority corridors.',
          timeline: 'Testing ongoing • Passenger revenue service expected.',
          relatedActionUrl: 'https://www.broadwaysubway.ca',
          relatedActionText: 'Broadway Subway Updates',
        },
      },
    ],
    sports: [
      {
        id: 'yvr-sp1',
        team: 'Vancouver Whitecaps FC',
        opponent: 'Seattle Sounders FC',
        league: 'MLS',
        status: 'Upcoming',
        gameTime: 'Saturday • 7:30 PM',
        tvBroadcast: 'Apple TV - MLS Season Pass / TSN',
        isHome: true,
      },
      {
        id: 'yvr-sp2',
        team: 'BC Lions',
        opponent: 'Calgary Stampeders',
        league: 'CFL',
        status: 'Upcoming',
        gameTime: 'Friday • 7:00 PM',
        tvBroadcast: 'TSN 1/3',
        isHome: true,
      },
      {
        id: 'yvr-sp3',
        team: 'Vancouver Canucks',
        opponent: 'Edmonton Oilers',
        league: 'NHL',
        status: 'Upcoming',
        gameTime: 'Pacific Division Showcase',
        tvBroadcast: 'Sportsnet Pacific',
        isHome: true,
      },
    ],
    restaurants: [
      {
        id: 'yvr-r1',
        name: 'Miku Vancouver',
        cuisine: 'Aburi (Flame-Seared) Sushi & Pacific Seafood',
        neighborhood: 'Waterfront / Coal Harbour',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 3800,
        signatureDish: 'Salmon Oshi Sushi & Ebi Oshi Sushi',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/miku-restaurant-vancouver?aff=canadacity',
        availableTimes: ['5:30 PM', '7:15 PM', '8:45 PM'],
        tag: 'Waterfront Views',
      },
      {
        id: 'yvr-r2',
        name: 'Botanist',
        cuisine: 'Pacific Northwest Fine Dining',
        neighborhood: 'Coal Harbour (Fairmont Pacific Rim)',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 1200,
        signatureDish: 'Dry-Aged Duck Breast & Botanical Cocktails',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/botanist-vancouver?aff=canadacity',
        availableTimes: ['6:00 PM', '7:30 PM', '9:00 PM'],
        tag: 'Michelin Recommended',
      },
    ],
    nightlife: [
      {
        id: 'yvr-nl1',
        name: 'Celebrities Nightclub',
        category: 'Nightclub',
        neighborhood: 'Davie Village / Downtown',
        vibe: 'Vancouver nightlife staple with Funktion-One sound, world-touring EDM DJs, and inclusive dance floors',
        coverOrVip: '$15 - $35 • VIP table service',
        hours: 'Tue, Fri & Sat • 10:00 PM - 3:00 AM',
        guestlistUrl: 'https://celebritiesnightclub.com',
        tag: 'Iconic Vancouver Dance Club',
      },
      {
        id: 'yvr-nl2',
        name: 'The Keefer Bar',
        category: 'Cocktail Lounge',
        neighborhood: 'Chinatown',
        vibe: 'Award-winning apothecary cocktail bar serving medicinal-inspired tinctures and dim sum bites',
        coverOrVip: 'No cover • Walk-ins & reservations',
        hours: 'Daily • 4:00 PM - 2:00 AM',
        guestlistUrl: 'https://thekeeferbar.com',
        tag: 'Top 50 Best Bars in North America',
      },
    ],
    shows: [
      {
        id: 'yvr-s1',
        title: 'Cirque du Soleil: ECHO',
        venue: 'Under the Big Top • Concord Pacific Place',
        neighborhood: 'Downtown / False Creek',
        category: 'Theatre',
        dates: 'Wed - Sun • 7:30 PM & 3:30 PM',
        ticketPriceRange: '$65 - $185',
        ticketUrl: 'https://www.cirquedusoleil.com/echo?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
      {
        id: 'yvr-s2',
        title: 'Vancouver Symphony Orchestra: Orpheum Classics',
        venue: 'The Orpheum',
        neighborhood: 'Granville Entertainment District',
        category: 'Symphony',
        dates: 'Saturday & Sunday • 8:00 PM',
        ticketPriceRange: '$38 - $140',
        ticketUrl: 'https://www.vancouversymphony.ca?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
    ],
    hotels: [
      {
        id: 'yvr-h1',
        name: 'Fairmont Pacific Rim',
        neighborhood: 'Coal Harbour Waterfront',
        rating: 4.9,
        reviewCount: 2200,
        pricePerNight: '$420 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/fairmont-pacific-rim.html?aid=canadacity',
        bookingPlatform: 'Booking.com',
        amenities: ['Rooftop Pool & Cabanas', 'Willow Stream Spa', 'Botanist Restaurant'],
        tag: 'Ultra-Luxury Waterfront',
        description: '5-star hotel offering floor-to-ceiling views of the North Shore mountains and Vancouver Harbour.',
      },
    ],
    experiences: [
      {
        id: 'yvr-e1',
        title: 'Vancouver Seaplane Scenic Alpine Glacier Tour',
        operator: 'Harbour Air Seaplanes',
        category: 'Helicopter / Cruise',
        duration: '45 Minutes',
        rating: 4.9,
        reviewCount: 1600,
        priceFrom: '$175 / person',
        bookingUrl: 'https://www.viator.com/tours/Vancouver/Seaplane-Tour/d616-28212P1?partner=canadacity',
        bookingPlatform: 'Viator',
        highlights: ['Water takeoff from Downtown Coal Harbour', 'Glacier peak flyover', 'Bird’s-eye view of Stanley Park'],
        badge: 'Bucket List Experience',
      },
    ],
    outdoors: [
      {
        id: 'yvr-o1',
        name: 'Stanley Park Seawall & Third Beach',
        neighborhood: 'West End / Stanley Park',
        category: 'Beach & Waterfront',
        distanceOrSize: '10 km Paved Coastal Loop',
        difficulty: 'Easy Stroll',
        features: ['Ocean Seawall', 'Totem Poles', 'Siwash Rock Sunset', 'Lighthouse Views'],
        parkingTips: 'Paid parking lots throughout park; bike rentals available at Denman St.',
        bestTime: 'Golden hour sunset at Third Beach or Ferguson Point.',
        tag: 'World’s #1 Urban Park',
      },
    ],
    transitLines: [
      {
        id: 'yvr-t1',
        lineName: 'SkyTrain Expo Line (Waterfront - King George)',
        systemName: 'TransLink',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Normal 2-3 minute headways across Metro Vancouver.',
        updatedMinutesAgo: 4,
      },
    ],
    civicServices: [
      {
        id: 'yvr-c1',
        title: 'Van311 City Services',
        department: 'City of Vancouver',
        actionText: 'Van311 Portal',
        actionUrl: 'https://vancouver.ca/van311.aspx',
        description: 'Municipal requests, park maintenance, and city bylaws.',
        phone: '311 (604-873-7000)',
      },
    ],
  },

  // =========================================================================
  // 4. MONTREAL (YUL)
  // =========================================================================
  yul: {
    tenantId: 'yul',
    cityName: 'Montreal',
    news: [
      {
        id: 'yul-n1',
        title: 'Quartier des Spectacles Announces Summer Festival Lineups',
        source: 'La Presse',
        category: 'Culture',
        url: 'https://www.lapresse.ca',
        timeAgo: '2 hours ago',
        summary: 'Montreal Jazz Fest, Francos, and Just For Laughs reveal indoor and outdoor stages.',
        expandedDetails: {
          keyTakeaways: [
            'Over 350 free outdoor concerts scheduled on Place des Festivals stages.',
            'Expanded pedestrian zones along Sainte-Catherine and Saint-Laurent.',
            'Eco-friendly cup deposit system across all festival sites.',
          ],
          localImpact: 'Sainte-Catherine Street East & West pedestrian-only until September.',
          timeline: 'Festivals kick off early June.',
          relatedActionUrl: 'https://www.quartierdesspectacles.com',
          relatedActionText: 'Festival Schedule',
        },
      },
    ],
    sports: [
      {
        id: 'yul-sp1',
        team: 'CF Montréal',
        opponent: 'Toronto FC (Canadian Classique)',
        league: 'MLS',
        status: 'Upcoming',
        gameTime: 'Saturday • 7:30 PM',
        tvBroadcast: 'Apple TV - MLS Season Pass / RDS',
        isHome: true,
      },
      {
        id: 'yul-sp2',
        team: 'Montreal Alouettes',
        opponent: 'Hamilton Tiger-Cats',
        league: 'CFL',
        status: 'Upcoming',
        gameTime: 'Friday • 7:00 PM',
        tvBroadcast: 'RDS / TSN',
        isHome: true,
      },
      {
        id: 'yul-sp3',
        team: 'Canadiens de Montréal',
        opponent: 'Boston Bruins',
        league: 'NHL',
        status: 'Upcoming',
        gameTime: 'Saturday Night Hockey • 7:00 PM',
        tvBroadcast: 'RDS / TVA Sports / CBC',
        isHome: true,
      },
    ],
    restaurants: [
      {
        id: 'yul-r1',
        name: 'Schwartz’s Deli',
        cuisine: 'World Famous Montreal Smoked Meat',
        neighborhood: 'Saint-Laurent Blvd / Plateau',
        priceLevel: '$$',
        rating: 4.8,
        reviewCount: 9200,
        signatureDish: 'Smoked Meat Sandwich (Medium Fat)',
        bookingPlatform: 'Direct',
        reservationUrl: 'https://schwartzsdeli.com',
        availableTimes: ['Walk-in Counter & Dining'],
        tag: 'Montreal Icon',
      },
      {
        id: 'yul-r2',
        name: 'Joe Beef',
        cuisine: 'Celebrated Quebec Gastronomy & Oysters',
        neighborhood: 'Little Burgundy / Notre-Dame Ouest',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 2800,
        signatureDish: 'Lobster Spaghetti & Dry-Aged Côte de Boeuf',
        bookingPlatform: 'Resy',
        reservationUrl: 'https://resy.com/cities/montreal-qc/venues/joe-beef?aff=canadacity',
        availableTimes: ['5:30 PM', '8:15 PM', '9:45 PM'],
        tag: 'Global Culinary Landmark',
      },
    ],
    nightlife: [
      {
        id: 'yul-nl1',
        name: 'Stereo Nightclub',
        category: 'Nightclub',
        neighborhood: 'The Village / Sainte-Catherine East',
        vibe: 'Globally celebrated temple of sound featuring legendary analog acoustics and marathon 12-hour house & techno sets',
        coverOrVip: '$25 - $40 • After-hours admission',
        hours: 'Fri & Sat • 10:00 PM - 10:00 AM (After-hours)',
        guestlistUrl: 'https://stereonightclub.net',
        tag: 'World’s #1 Sound System',
      },
      {
        id: 'yul-nl2',
        name: 'Cloakroom Bar',
        category: 'Speakeasy',
        neighborhood: 'Golden Square Mile / Rue de la Montagne',
        vibe: 'Ultra-exclusive 25-seat bespoke speakeasy hidden behind a custom tailor shop with handcrafted carved ice',
        coverOrVip: 'No cover • Intimate waitlist at door',
        hours: 'Daily • 3:00 PM - 2:00 AM',
        guestlistUrl: 'https://cloakroombar.co',
        tag: 'Canada’s #1 Secret Speakeasy',
      },
    ],
    shows: [
      {
        id: 'yul-s1',
        title: 'Cirque du Soleil - KURIOS',
        venue: 'Under the Big Top • Old Port of Montreal',
        neighborhood: 'Vieux-Port',
        category: 'Theatre',
        dates: 'Wed - Sun • 8:00 PM',
        ticketPriceRange: '$65 - $195',
        ticketUrl: 'https://www.cirquedusoleil.com/kurios?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
      {
        id: 'yul-s2',
        title: 'Orchestre Symphonique de Montréal: Grand Concerts',
        venue: 'Maison symphonique de Montréal',
        neighborhood: 'Quartier des Spectacles',
        category: 'Symphony',
        dates: 'Thursday & Saturday • 7:30 PM',
        ticketPriceRange: '$45 - $155',
        ticketUrl: 'https://www.osm.ca?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
    ],
    hotels: [
      {
        id: 'yul-h1',
        name: 'Hôtel William Gray',
        neighborhood: 'Old Montreal / Place Jacques-Cartier',
        rating: 4.9,
        reviewCount: 1600,
        pricePerNight: '$310 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/william-gray.html?aid=canadacity',
        bookingPlatform: 'Booking.com',
        amenities: ['Terrasse William Gray Rooftop', 'Luxury Spa', 'Cobblestone Views'],
        tag: 'Historic Old Montreal Luxury',
        description: 'Boutique hotel set within 18th-century historic stone buildings with panoramic Old Port views.',
      },
    ],
    experiences: [
      {
        id: 'yul-e1',
        title: 'Old Montreal Historical & Culinary Walking Tour',
        operator: 'Spade & Palacio Tours',
        category: 'Food Tour',
        duration: '3.5 Hours',
        rating: 4.9,
        reviewCount: 780,
        priceFrom: '$85 / person',
        bookingUrl: 'https://www.viator.com/tours/Montreal/Old-Montreal-Walking-Tour/d625-38212P1?partner=canadacity',
        bookingPlatform: 'Viator',
        highlights: ['Cobblestone heritage alleys', 'Artisan pastries and cheese tastings', 'Notre-Dame Basilica exterior'],
        badge: 'Authentic Local Guide',
      },
    ],
    outdoors: [
      {
        id: 'yul-o1',
        name: 'Mount Royal Park & Kondiaronk Belvedere',
        neighborhood: 'Mount Royal / Plateau',
        category: 'Lookout Point',
        distanceOrSize: '200 Hectares (Frederick Law Olmsted Design)',
        difficulty: 'Moderate Trail',
        features: ['Belvedere Skyline Lookout', 'Beaver Lake Pavilion', 'Tam-Tams Drum Circle (Sundays)'],
        parkingTips: 'Park at Beaver Lake lot; bus 11 direct to summit.',
        bestTime: 'Sunset from the grand stone belvedere terrace.',
        tag: 'Heart of Montreal',
      },
    ],
    transitLines: [
      {
        id: 'yul-t1',
        lineName: 'STM Ligne Orange (Montmorency - Côte-Vertu)',
        systemName: 'Société de transport de Montréal',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Service fluide sur l’ensemble de la ligne orange.',
        updatedMinutesAgo: 3,
      },
    ],
    civicServices: [
      {
        id: 'yul-c1',
        title: 'Montréal Services 311',
        department: 'Ville de Montréal',
        actionText: 'Accéder à 311',
        actionUrl: 'https://montreal.ca/311',
        description: 'Services municipaux et règlements.',
        phone: '311 (514-872-0311)',
      },
    ],
  },

  // =========================================================================
  // 5. EDMONTON (YEG)
  // =========================================================================
  yeg: {
    tenantId: 'yeg',
    cityName: 'Edmonton',
    news: [
      {
        id: 'yeg-n1',
        title: 'ICE District Summer Plaza Series Opens with Live Music & Outdoor Screenings',
        source: 'Edmonton Journal',
        category: 'Culture',
        url: 'https://edmontonjournal.com',
        timeAgo: '1 hour ago',
        summary: 'Downtown Edmonton events calendar kicks off with free public plaza programming next to Rogers Place.',
        expandedDetails: {
          keyTakeaways: [
            'Fan park and plaza host weekly outdoor markets and live acoustic performances.',
            'New patio dining installations connected to ICE District restaurants.',
            'Direct access via MacEwan and Central LRT stations.',
          ],
          localImpact: 'High foot traffic around 104th Avenue and 102nd Street during weekend events.',
          timeline: 'Plaza active daily through late Autumn.',
          relatedActionUrl: 'https://icedistrict.com',
          relatedActionText: 'ICE District Events Schedule',
        },
      },
    ],
    sports: [
      {
        id: 'yeg-sp1',
        team: 'Edmonton Elks',
        opponent: 'Calgary Stampeders (Labour Day Rivalry)',
        league: 'CFL',
        status: 'Upcoming',
        gameTime: 'Saturday • 5:00 PM',
        tvBroadcast: 'TSN 1/4',
        isHome: true,
      },
      {
        id: 'yeg-sp2',
        team: 'Edmonton Oilers',
        opponent: 'Vancouver Canucks',
        league: 'NHL',
        status: 'Upcoming',
        gameTime: 'Western Conference Showdown',
        tvBroadcast: 'Sportsnet West',
        isHome: true,
      },
      {
        id: 'yeg-sp3',
        team: 'Edmonton Oil Kings',
        opponent: 'Calgary Hitmen',
        league: 'WHL',
        status: 'Upcoming',
        gameTime: 'Sunday • 4:00 PM',
        tvBroadcast: 'WHL Live',
        isHome: true,
      },
    ],
    restaurants: [
      {
        id: 'yeg-r1',
        name: 'RGE RD (Range Road)',
        cuisine: 'Untamed Canadian Farm-to-Table',
        neighborhood: '124th Street District',
        priceLevel: '$$$$',
        rating: 4.9,
        reviewCount: 1650,
        signatureDish: 'Road Trip Tasting Menu & Wood-Roasted Bison',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/rge-rd-edmonton?aff=canadacity',
        availableTimes: ['5:30 PM', '7:00 PM', '8:45 PM'],
        tag: 'Canada’s Top 100 Best',
      },
      {
        id: 'yeg-r2',
        name: 'Bündok',
        cuisine: 'Modern Seasonal Small Plates',
        neighborhood: 'Downtown / 104th St',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 920,
        signatureDish: 'Parmigiano Soup & Sea Bream Crudo',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/bundok-edmonton?aff=canadacity',
        availableTimes: ['6:00 PM', '7:15 PM', '8:30 PM'],
        tag: 'Downtown Favorite',
      },
      {
        id: 'yeg-r3',
        name: 'Meat',
        cuisine: 'Authentic Southern BBQ & Bourbon Bar',
        neighborhood: 'Old Strathcona / Whyte Ave',
        priceLevel: '$$',
        rating: 4.7,
        reviewCount: 2400,
        signatureDish: 'Beef Brisket & Bourbon Beer Cocktails',
        bookingPlatform: 'Direct',
        reservationUrl: 'https://meatfordinner.com',
        availableTimes: ['Walk-in Seating & Patio'],
        tag: 'Whyte Ave Classic',
      },
    ],
    nightlife: [
      {
        id: 'yeg-nl1',
        name: 'The Bower',
        category: 'Nightclub',
        neighborhood: 'Old Strathcona / Whyte Ave',
        vibe: 'Intimate boutique lounge featuring world-class house and disco DJs with plush leather booths',
        coverOrVip: '$10 - $15 • Guestlist before 11 PM',
        hours: 'Fri & Sat • 9:00 PM - 2:00 AM',
        guestlistUrl: 'https://thebower.ca',
        tag: 'Whyte Ave Electronic Lounge',
      },
      {
        id: 'yeg-nl2',
        name: 'Baijiu & Little Hong Kong',
        category: 'Cocktail Lounge',
        neighborhood: 'Downtown / Mercer Warehouse',
        vibe: 'Hip Asian-inspired cocktail den with hidden speakeasy bar, dim sum snacks, and weekend hip-hop vibes',
        coverOrVip: 'No cover • Reservations recommended',
        hours: 'Tue - Sat • 5:00 PM - 2:00 AM',
        guestlistUrl: 'https://baijiuyeg.com',
        tag: 'Mercer Building Speakeasy',
      },
    ],
    shows: [
      {
        id: 'yeg-s1',
        title: 'Broadway Across Canada: Hamilton',
        venue: 'Northern Alberta Jubilee Auditorium',
        neighborhood: 'University / South Side',
        category: 'Theatre',
        dates: 'Tue - Sun • 7:30 PM & 2:00 PM',
        ticketPriceRange: '$85 - $240',
        ticketUrl: 'https://edmonton.broadway.com?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
      {
        id: 'yeg-s2',
        title: 'Edmonton Symphony Orchestra: Masterworks Series',
        venue: 'Winspear Centre',
        neighborhood: 'Downtown Arts District',
        category: 'Symphony',
        dates: 'Friday & Saturday • 7:30 PM',
        ticketPriceRange: '$35 - $125',
        ticketUrl: 'https://www.winspearcentre.com?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
    ],
    hotels: [
      {
        id: 'yeg-h1',
        name: 'JW Marriott Edmonton ICE District',
        neighborhood: 'Downtown / ICE District',
        rating: 4.8,
        reviewCount: 1100,
        pricePerNight: '$285 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/jw-marriott-edmonton-ice-district.html?aid=canadacity',
        bookingPlatform: 'Booking.com',
        amenities: ['Braven Steakhouse', 'Archetype Fitness Health Club', 'Indoor Lap Pool'],
        tag: 'ICE District Flagship',
        description: 'Luxury hotel directly connected to Rogers Place arena in the center of downtown Edmonton.',
      },
    ],
    experiences: [
      {
        id: 'yeg-e1',
        title: 'Elk Island National Park Bison Safari & Stargazing',
        operator: 'Explore Edmonton Adventures',
        category: 'Nature & Wildlife',
        duration: '5 Hours',
        rating: 4.9,
        reviewCount: 540,
        priceFrom: '$110 / person',
        bookingUrl: 'https://www.getyourguide.com/edmonton-l1508/elk-island-bison-tour?partner_id=canadacity',
        bookingPlatform: 'GetYourGuide',
        highlights: ['Wild bison herd tracking', 'Dark Sky Preserve stargazing', 'Ast photography tips'],
        badge: 'Wildlife Adventure',
      },
    ],
    outdoors: [
      {
        id: 'yeg-o1',
        name: 'North Saskatchewan River Valley & Funicular',
        neighborhood: 'Downtown Riverfront / Strathcona',
        category: 'Urban Park',
        distanceOrSize: '160 km Connected Trail Network',
        difficulty: 'Easy Stroll',
        features: ['100 Street Funicular Viewpoint', 'Paved Cycling Paths', 'Kinsmen Park Access'],
        parkingTips: 'Free parking at Kinsmen Sports Centre or downtown parkades.',
        bestTime: 'Morning bike rides and sunset view from the funicular.',
        tag: 'Largest Urban Park in Canada',
      },
    ],
    transitLines: [
      {
        id: 'yeg-t1',
        lineName: 'ETS Capital Line (Clareview - Century Park)',
        systemName: 'Edmonton Transit Service',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Operating on regular schedule with 5-minute peak service.',
        updatedMinutesAgo: 4,
      },
    ],
    civicServices: [
      {
        id: 'yeg-c1',
        title: 'Edmonton 311 Online Service Portal',
        department: 'City of Edmonton',
        actionText: 'Report Issue (311)',
        actionUrl: 'https://www.edmonton.ca/programs_services/311-city-services',
        description: 'Potholes, property assessments, transit inquiries, and municipal bylaws.',
        phone: '311 (780-442-5311)',
      },
    ],
  },

  // =========================================================================
  // 6. OTTAWA (YOW)
  // =========================================================================
  yow: {
    tenantId: 'yow',
    cityName: 'Ottawa',
    news: [
      {
        id: 'yow-n1',
        title: 'ByWard Market Public Realm Plan Advances with Pedestrian Promenades',
        source: 'Ottawa Citizen',
        category: 'Civic',
        url: 'https://ottawacitizen.com',
        timeAgo: '1 hour ago',
        summary: 'City Council approves expanded outdoor terraces and pedestrian priority zones on William and George Streets.',
        expandedDetails: {
          keyTakeaways: [
            'William Street and Clarence Street converted to permanent seasonal pedestrian corridors.',
            'New public seating and artisan market pavilions installed for summer vendors.',
            'Enhanced direct connection from Rideau O-Train station to the Market building.',
          ],
          localImpact: 'More patio seating and vibrant night walks through ByWard Market.',
          timeline: 'Phased installations underway throughout the season.',
          relatedActionUrl: 'https://ottawa.ca/en/city-hall/public-engagement/projects/byward-market-public-realm-plan',
          relatedActionText: 'View ByWard Market Masterplan',
        },
      },
    ],
    sports: [
      {
        id: 'yow-sp1',
        team: 'Ottawa Redblacks',
        opponent: 'Montreal Alouettes',
        league: 'CFL',
        status: 'Upcoming',
        gameTime: 'Saturday • 4:00 PM',
        tvBroadcast: 'TSN 1/5',
        isHome: true,
      },
      {
        id: 'yow-sp2',
        team: 'Ottawa Senators',
        opponent: 'Toronto Maple Leafs (Battle of Ontario)',
        league: 'NHL',
        status: 'Upcoming',
        gameTime: 'Rivalry Showcase • 7:00 PM',
        tvBroadcast: 'TSN5 / RDS / Sportsnet',
        isHome: true,
      },
      {
        id: 'yow-sp3',
        team: 'Ottawa 67’s',
        opponent: 'Kingston Frontenacs',
        league: 'OHL',
        status: 'Upcoming',
        gameTime: 'Friday • 7:00 PM',
        tvBroadcast: 'CHL TV / Rogers tv',
        isHome: true,
      },
      {
        id: 'yow-sp4',
        team: 'Atlético Ottawa',
        opponent: 'Forge FC',
        league: 'CPL',
        status: 'Upcoming',
        gameTime: 'Sunday • 2:00 PM',
        tvBroadcast: 'OneSoccer',
        isHome: true,
      },
    ],
    restaurants: [
      {
        id: 'yow-r1',
        name: 'Riviera',
        cuisine: 'Elevated Canadian Fine Dining & Cocktails',
        neighborhood: 'Downtown / Sparks Street (Art Deco Bank)',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 1850,
        signatureDish: 'Black Truffle Risotto & Lobster Pappardelle',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/riviera-ottawa?aff=canadacity',
        availableTimes: ['5:30 PM', '7:15 PM', '9:00 PM'],
        tag: 'Canada’s 100 Best',
      },
      {
        id: 'yow-r2',
        name: 'Supply and Demand',
        cuisine: 'Pasta & Raw Bar',
        neighborhood: 'Wellington West',
        priceLevel: '$$$',
        rating: 4.9,
        reviewCount: 1400,
        signatureDish: 'Beef Tartare & Squid Ink Rigatoni',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/supply-and-demand-ottawa?aff=canadacity',
        availableTimes: ['5:45 PM', '7:30 PM', '8:45 PM'],
        tag: 'Culinary Icon',
      },
      {
        id: 'yow-r3',
        name: 'Chez Lucien',
        cuisine: 'Classic French Bistro & Gourmet Burgers',
        neighborhood: 'ByWard Market / Murray St',
        priceLevel: '$$',
        rating: 4.7,
        reviewCount: 2200,
        signatureDish: 'Lucien Burger with Brie & Frites',
        bookingPlatform: 'Direct',
        reservationUrl: 'https://chezlucien.ca',
        availableTimes: ['Walk-in Cozy Bistro'],
        tag: 'ByWard Market Classic',
      },
    ],
    nightlife: [
      {
        id: 'yow-nl1',
        name: 'City At Night',
        category: 'Nightclub',
        neighborhood: 'Downtown / Bank Street',
        vibe: 'Ottawa’s premier underground electronic venue showcasing international house, techno & deep grooves',
        coverOrVip: '$15 - $25 • Advance tickets recommended',
        hours: 'Fri & Sat • 10:00 PM - 2:30 AM',
        guestlistUrl: 'https://cityatnight.ca',
        tag: 'Underground Dance Haven',
      },
      {
        id: 'yow-nl2',
        name: 'The Moon Room',
        category: 'Cocktail Lounge',
        neighborhood: 'Little Italy / Preston St',
        vibe: 'Romantic candlelit cocktail oasis with bespoke mixology, Italian charcuterie, and intimate lounge patio',
        coverOrVip: 'No cover • Cozy walk-in lounge',
        hours: 'Tue - Sun • 5:00 PM - 2:00 AM',
        guestlistUrl: 'https://themoonroom.ca',
        tag: 'Preston St Speakeasy',
      },
      {
        id: 'yow-nl3',
        name: 'Show Nightclub',
        category: 'Nightclub',
        neighborhood: 'ByWard Market / Dalhousie',
        vibe: 'High-energy multi-level club with VIP bottle service, LED light walls, and top commercial DJs',
        coverOrVip: '$15 - $30 • VIP Bottle Service Booths',
        hours: 'Fri & Sat • 10:00 PM - 2:00 AM',
        guestlistUrl: 'https://shownightclub.ca',
        tag: 'ByWard Party Spot',
      },
    ],
    shows: [
      {
        id: 'yow-s1',
        title: 'Broadway Across Canada: Come From Away',
        venue: 'National Arts Centre (Southam Hall)',
        neighborhood: 'Downtown / Elgin St',
        category: 'Theatre',
        dates: 'Tue - Sun • 8:00 PM & 2:00 PM',
        ticketPriceRange: '$65 - $190',
        ticketUrl: 'https://nac-cna.ca?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
      {
        id: 'yow-s2',
        title: 'National Arts Centre Orchestra: Classical Showcase',
        venue: 'Southam Hall (NAC)',
        neighborhood: 'Downtown Waterfront',
        category: 'Symphony',
        dates: 'Thursday & Friday • 8:00 PM',
        ticketPriceRange: '$38 - $120',
        ticketUrl: 'https://nac-cna.ca?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
    ],
    hotels: [
      {
        id: 'yow-h1',
        name: 'Fairmont Château Laurier',
        neighborhood: 'Downtown / Rideau Canal Locks',
        rating: 4.8,
        reviewCount: 3100,
        pricePerNight: '$290 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/fairmont-chateau-laurier.html?aid=canadacity',
        bookingPlatform: 'Booking.com',
        amenities: ['Wilfrid’s Restaurant', 'Historic Castle Architecture', 'Art Deco Indoor Pool'],
        tag: 'Iconic Grand Railway Hotel',
        description: 'French Gothic castle landmark overlooking Parliament Hill and the Rideau Canal.',
      },
    ],
    experiences: [
      {
        id: 'yow-e1',
        title: 'Rideau Canal Historic Electric Boat Cruise',
        operator: 'Ottawa Boat Cruise',
        category: 'Sightseeing',
        duration: '1.5 Hours',
        rating: 4.8,
        reviewCount: 890,
        priceFrom: '$42 / person',
        bookingUrl: 'https://www.viator.com/tours/Ottawa/Rideau-Canal-Cruise/d628-88212P1?partner=canadacity',
        bookingPlatform: 'Viator',
        highlights: ['100% electric quiet boat', 'UNESCO World Heritage Canal commentary', 'Views of Lansdowne and National Arts Centre'],
        badge: 'UNESCO Heritage Cruise',
      },
    ],
    outdoors: [
      {
        id: 'yow-o1',
        name: 'Rideau Canal Promenade & Major’s Hill Park',
        neighborhood: 'Downtown Waterfront / ByWard Market',
        category: 'Urban Park',
        distanceOrSize: '8 km Canal Pathway',
        difficulty: 'Easy Stroll',
        features: ['Canal Locks Lookout', 'Tulip Festival Displays (Spring)', 'Parliament Hill Skyline Views'],
        parkingTips: 'Park at National Arts Centre underground or ByWard Market lots.',
        bestTime: 'Late afternoon stroll towards sunset over the Ottawa River.',
        tag: 'Capital Iconic Pathway',
      },
    ],
    transitLines: [
      {
        id: 'yow-t1',
        lineName: 'O-Train Line 1 (Confederation Line)',
        systemName: 'OC Transpo',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Trains operating every 4-5 minutes between Blair and Tunney’s Pasture.',
        updatedMinutesAgo: 3,
      },
    ],
    civicServices: [
      {
        id: 'yow-c1',
        title: 'City of Ottawa 311 Client Service Portal',
        department: 'City of Ottawa',
        actionText: 'Submit 311 Request',
        actionUrl: 'https://ottawa.ca/en/3-1-1',
        description: 'Road repairs, snow clearing, park maintenance, and city bylaws.',
        phone: '311 (613-580-2400)',
      },
    ],
  },

  // =========================================================================
  // 7. WINNIPEG (YWG)
  // =========================================================================
  ywg: {
    tenantId: 'ywg',
    cityName: 'Winnipeg',
    news: [
      {
        id: 'ywg-n1',
        title: 'The Forks Rails-to-Greenways Project Unveils Riverwalk Expansion',
        source: 'Winnipeg Free Press',
        category: 'Development',
        url: 'https://www.winnipegfreepress.com',
        timeAgo: '2 hours ago',
        summary: 'New pedestrian bridges and shaded river plazas expand connection between The Forks and St. Boniface.',
        expandedDetails: {
          keyTakeaways: [
            'New illuminated riverwalk boardwalk connects directly to Esplanade Riel bridge.',
            'Expanded outdoor seating, food truck plazas, and indigenous cultural art displays.',
            'Year-round all-season maintenance for runners and cyclists.',
          ],
          localImpact: 'Seamless walking route between downtown, The Forks, and the French Quarter.',
          timeline: 'Phased completion this Summer.',
          relatedActionUrl: 'https://www.theforks.com',
          relatedActionText: 'The Forks Riverwalk Plans',
        },
      },
    ],
    sports: [
      {
        id: 'ywg-sp1',
        team: 'Winnipeg Blue Bombers',
        opponent: 'Saskatchewan Roughriders (Banjo Bowl Rivalry)',
        league: 'CFL',
        status: 'Upcoming',
        gameTime: 'Saturday • 3:00 PM',
        tvBroadcast: 'TSN 1/3',
        isHome: true,
      },
      {
        id: 'ywg-sp2',
        team: 'Winnipeg Jets',
        opponent: 'Minnesota Wild',
        league: 'NHL',
        status: 'Upcoming',
        gameTime: 'Central Division Matchup',
        tvBroadcast: 'TSN3',
        isHome: true,
      },
      {
        id: 'ywg-sp3',
        team: 'Winnipeg Goldeyes',
        opponent: 'Fargo-Moorhead RedHawks',
        league: 'MLB',
        status: 'Upcoming',
        gameTime: 'Friday • 6:30 PM',
        tvBroadcast: 'AABaseball.tv',
        isHome: true,
      },
    ],
    restaurants: [
      {
        id: 'ywg-r1',
        name: 'Deer + Almond',
        cuisine: 'Creative Chef-Driven Canadian Sharing Plates',
        neighborhood: 'Exchange District',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 1650,
        signatureDish: 'Smoked Goldeye & Seasonal Tasting Plates',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/deer-and-almond-winnipeg?aff=canadacity',
        availableTimes: ['5:30 PM', '7:15 PM', '8:45 PM'],
        tag: 'Canada’s 100 Best',
      },
      {
        id: 'ywg-r2',
        name: 'Clementine Cafe',
        cuisine: 'Acclaimed Artisanal Brunch',
        neighborhood: 'Exchange District / Princess St',
        priceLevel: '$$',
        rating: 4.9,
        reviewCount: 3100,
        signatureDish: 'Braised Bacon Benedict & Turkish Eggs',
        bookingPlatform: 'Direct',
        reservationUrl: 'https://clementinewinnipeg.com',
        availableTimes: ['Walk-in Brunch & Breakfast'],
        tag: 'Canada’s #1 Brunch',
      },
    ],
    nightlife: [
      {
        id: 'ywg-nl1',
        name: '441 Main',
        category: 'Nightclub',
        neighborhood: 'Downtown / Exchange District',
        vibe: 'Upscale two-story nightlife venue with premier bottle service, top hip-hop DJs, and high-energy crowd',
        coverOrVip: '$15 - $25 • VIP Booths Available',
        hours: 'Fri & Sat • 10:00 PM - 2:00 AM',
        guestlistUrl: 'https://441main.ca',
        tag: 'Premier Winnipeg Nightclub',
      },
      {
        id: 'ywg-nl2',
        name: 'The Roost',
        category: 'Cocktail Lounge',
        neighborhood: 'Corydon Village',
        vibe: 'Charming rooftop treehouse cocktail lounge serving botanical concoctions and elevated small plates',
        coverOrVip: 'No cover • Intimate walk-in rooftop',
        hours: 'Daily • 5:00 PM - 1:00 AM',
        guestlistUrl: 'https://theroostcorydon.com',
        tag: 'Corydon Rooftop Gem',
      },
    ],
    shows: [
      {
        id: 'ywg-s1',
        title: 'Royal Manitoba Theatre Centre: The Great Gatsby',
        venue: 'John Hirsch Mainstage',
        neighborhood: 'Exchange District',
        category: 'Theatre',
        dates: 'Tue - Sat • 7:30 PM & 2:00 PM',
        ticketPriceRange: '$35 - $115',
        ticketUrl: 'https://royalmtc.ca?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
      {
        id: 'ywg-s2',
        title: 'Winnipeg Symphony Orchestra: Classical Masterworks',
        venue: 'Centennial Concert Hall',
        neighborhood: 'Exchange District',
        category: 'Symphony',
        dates: 'Friday & Saturday • 7:30 PM',
        ticketPriceRange: '$32 - $110',
        ticketUrl: 'https://wso.ca?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
    ],
    hotels: [
      {
        id: 'ywg-h1',
        name: 'Inn at the Forks',
        neighborhood: 'The Forks / Waterfront',
        rating: 4.8,
        reviewCount: 1400,
        pricePerNight: '$210 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/inn-at-the-forks.html?aid=canadacity',
        bookingPlatform: 'Booking.com',
        amenities: ['Riverstone Spa', 'SMITH Restaurant', 'The Forks Market Access'],
        tag: 'Waterfront Boutique',
        description: 'Contemporary boutique hotel situated at the historic junction of the Red and Assiniboine rivers.',
      },
    ],
    experiences: [
      {
        id: 'ywg-e1',
        title: 'Canadian Museum for Human Rights Architecture Tour',
        operator: 'CMHR Guided Excursions',
        category: 'Historic Walk',
        duration: '2 Hours',
        rating: 4.9,
        reviewCount: 920,
        priceFrom: '$22 / person',
        bookingUrl: 'https://humanrights.ca?partner=canadacity',
        bookingPlatform: 'Direct',
        highlights: ['Antoine Predock architectural design', 'Tower of Hope panoramic elevator', 'Interactive global exhibits'],
        badge: 'Iconic Canadian Museum',
      },
    ],
    outdoors: [
      {
        id: 'ywg-o1',
        name: 'Assiniboine Park & The Leaf Biomes',
        neighborhood: 'Tuxedo / River Heights',
        category: 'Urban Park',
        distanceOrSize: '450 Acres',
        difficulty: 'Easy Stroll',
        features: ['The Leaf Tropical Biome', 'English Garden', 'Assiniboine Forest Trails'],
        parkingTips: 'Free parking lots adjacent to The Leaf and English Garden.',
        bestTime: 'Afternoon botanical walk and tranquil forest trails.',
        tag: 'Winnipeg Premier Green Space',
      },
    ],
    transitLines: [
      {
        id: 'ywg-t1',
        lineName: 'Winnipeg Transit Blue Line (Downtown - St. Norbert)',
        systemName: 'Winnipeg Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Rapid transit corridor operating with 5-minute peak frequency.',
        updatedMinutesAgo: 5,
      },
    ],
    civicServices: [
      {
        id: 'ywg-c1',
        title: 'City of Winnipeg 311 Services',
        department: 'City of Winnipeg',
        actionText: 'Contact 311',
        actionUrl: 'https://winnipeg.ca/interhom/311/',
        description: 'Snow clearing, pothole reporting, recycling schedule, and neighborhood bylaws.',
        phone: '311 (204-986-2111)',
      },
    ],
  },

  // =========================================================================
  // 8. HALIFAX (YHZ)
  // =========================================================================
  yhz: {
    tenantId: 'yhz',
    cityName: 'Halifax',
    news: [
      {
        id: 'yhz-n1',
        title: 'Halifax Waterfront Boardwalk Boardwalk Expansion Opens at Queen’s Marque',
        source: 'Chronicle Herald',
        category: 'Development',
        url: 'https://www.saltwire.com/halifax',
        timeAgo: '2 hours ago',
        summary: 'New continuous coastal walkways, public art, and floating sea docks completed along Halifax Harbour.',
        expandedDetails: {
          keyTakeaways: [
            'Continuous 4.4 km uninterrupted harbour boardwalk from Casino Nova Scotia to Seaport.',
            'New ocean access steps and floating sea-level docks for water taxis.',
            'Expanded harbourfront patio seating for local seafood eateries.',
          ],
          localImpact: 'Pedestrian-friendly waterfront bustling with summer buskers and food kiosks.',
          timeline: 'Open daily year-round.',
          relatedActionUrl: 'https://my-waterfront.ca',
          relatedActionText: 'Explore Waterfront Directory',
        },
      },
    ],
    sports: [
      {
        id: 'yhz-sp1',
        team: 'Halifax Thunderbirds',
        opponent: 'Toronto Rock',
        league: 'NLL',
        status: 'Upcoming',
        gameTime: 'Friday • 7:00 PM',
        tvBroadcast: 'TSN / NLL Live',
        isHome: true,
      },
      {
        id: 'yhz-sp2',
        team: 'Halifax Mooseheads',
        opponent: 'Moncton Wildcats',
        league: 'QMJHL',
        status: 'Upcoming',
        gameTime: 'Saturday • 7:00 PM',
        tvBroadcast: 'QMJHL Live / Eastlink Community TV',
        isHome: true,
      },
      {
        id: 'yhz-sp3',
        team: 'HFX Wanderers FC',
        opponent: 'Pacific FC',
        league: 'CPL',
        status: 'Upcoming',
        gameTime: 'Saturday • 2:00 PM',
        tvBroadcast: 'OneSoccer',
        isHome: true,
      },
    ],
    restaurants: [
      {
        id: 'yhz-r1',
        name: 'The Bicycle Thief',
        cuisine: 'North American Italian & Atlantic Seafood',
        neighborhood: 'Downtown Waterfront / Bishop’s Landing',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 3800,
        signatureDish: 'Spaghettoni ai Frutti di Mare & Beef Carpaccio',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/the-bicycle-thief-halifax?aff=canadacity',
        availableTimes: ['5:30 PM', '7:00 PM', '8:45 PM'],
        tag: 'Halifax Waterfront Classic',
      },
      {
        id: 'yhz-r2',
        name: 'Bar Kismet',
        cuisine: 'Seafood, Handmade Pasta & Bespoke Cocktails',
        neighborhood: 'North End / Agricola St',
        priceLevel: '$$$',
        rating: 4.9,
        reviewCount: 1100,
        signatureDish: 'Halibut Carpaccio & Lobster Agnolotti',
        bookingPlatform: 'Resy',
        reservationUrl: 'https://resy.com/cities/halifax-ns/venues/bar-kismet?aff=canadacity',
        availableTimes: ['5:45 PM', '7:30 PM', '9:15 PM'],
        tag: 'Canada’s #2 Best Bar / Resto',
      },
    ],
    nightlife: [
      {
        id: 'yhz-nl1',
        name: 'The Lower Deck',
        category: 'Irish Pub',
        neighborhood: 'Historic Properties / Waterfront',
        vibe: 'Legendary 3-floor maritime party pub with roaring live East Coast folk bands, singalongs & cold draft beer',
        coverOrVip: '$5 - $10 at door on weekends',
        hours: 'Daily • 11:30 AM - 2:00 AM',
        guestlistUrl: 'https://lowerdeck.ca',
        tag: 'Legendary Maritime Pub',
      },
      {
        id: 'yhz-nl2',
        name: 'Pacifico Nightclub',
        category: 'Nightclub',
        neighborhood: 'Downtown / George St',
        vibe: 'Sleek subterranean dance venue with state-of-the-art lighting, weekend guest DJs, and VIP booths',
        coverOrVip: '$10 - $20 • VIP Table Service',
        hours: 'Fri & Sat • 10:00 PM - 3:30 AM',
        guestlistUrl: 'https://pacificohalifax.com',
        tag: 'Downtown Dance Spot',
      },
    ],
    shows: [
      {
        id: 'yhz-s1',
        title: 'Neptune Theatre: Mamma Mia!',
        venue: 'Fountain Hall (Neptune Theatre)',
        neighborhood: 'Downtown / Argyle St',
        category: 'Theatre',
        dates: 'Tue - Sun • 7:30 PM & 2:00 PM',
        ticketPriceRange: '$40 - $115',
        ticketUrl: 'https://www.neptunetheatre.com?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
      {
        id: 'yhz-s2',
        title: 'Symphony Nova Scotia: Celtic & Maritime Spectacular',
        venue: 'Rebecca Cohn Auditorium',
        neighborhood: 'Dalhousie Arts Centre',
        category: 'Symphony',
        dates: 'Friday & Saturday • 7:30 PM',
        ticketPriceRange: '$35 - $95',
        ticketUrl: 'https://symphonynovascotia.ca?partner=canadacity',
        ticketPlatform: 'Ticket Atlantic',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
    ],
    hotels: [
      {
        id: 'yhz-h1',
        name: 'The Muir, Autograph Collection',
        neighborhood: 'Queen’s Marque / Waterfront',
        rating: 4.9,
        reviewCount: 580,
        pricePerNight: '$360 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/muir-autograph-collection.html?aid=canadacity',
        bookingPlatform: 'Booking.com',
        amenities: ['Private Yacht Experience (Little Muir)', 'Windward Wellness Spa', 'Drift Restaurant'],
        tag: 'Ultra-Luxury Waterfront',
        description: 'Halifax’s preeminent 5-star hotel offering curated Nova Scotian art and harbour oceanfront views.',
      },
    ],
    experiences: [
      {
        id: 'yhz-e1',
        title: 'Peggy’s Cove Lighthouse & Coastal Fishing Village Tour',
        operator: 'Ambassatours Gray Line',
        category: 'Sightseeing',
        duration: '3.5 Hours',
        rating: 4.9,
        reviewCount: 2200,
        priceFrom: '$59 / person',
        bookingUrl: 'https://www.viator.com/tours/Halifax/Peggys-Cove-Tour/d629-38212P1?partner=canadacity',
        bookingPlatform: 'Viator',
        highlights: ['Iconic Peggy’s Point Lighthouse', 'Granite rock coastline exploration', 'Fresh lobster roll tasting option'],
        badge: 'East Coast Must-Do',
      },
    ],
    outdoors: [
      {
        id: 'yhz-o1',
        name: 'Point Pleasant Park Coastal Forest Trails',
        neighborhood: 'South End Oceanfront',
        category: 'Urban Park',
        distanceOrSize: '75 Hectares (39 km Trails)',
        difficulty: 'Easy Stroll',
        features: ['Prince of Wales Tower', 'Ocean Harbour Views', 'Off-Leash Dog Trails', 'Historic Military Forts'],
        parkingTips: 'Free parking lots at Point Pleasant Lower and Upper gates.',
        bestTime: 'Morning for ocean breeze and watching container ships enter harbour.',
        tag: 'Coastal Ocean Park',
      },
    ],
    transitLines: [
      {
        id: 'yhz-t1',
        lineName: 'Halifax Ferry (Halifax - Alderney Landing)',
        systemName: 'Halifax Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Ferries running every 15 minutes between Halifax and Dartmouth.',
        updatedMinutesAgo: 3,
      },
    ],
    civicServices: [
      {
        id: 'yhz-c1',
        title: 'Halifax 311 Citizen Services',
        department: 'Halifax Regional Municipality',
        actionText: 'Report to 311',
        actionUrl: 'https://www.halifax.ca/home/311',
        description: 'Municipal service requests, street maintenance, transit inquiries, and bylaws.',
        phone: '311 (902-490-4000)',
      },
    ],
  },

  // =========================================================================
  // 9. VICTORIA (YYJ)
  // =========================================================================
  yyj: {
    tenantId: 'yyj',
    cityName: 'Victoria',
    news: [
      {
        id: 'yyj-n1',
        title: 'Victoria Inner Harbour Belleville Terminal Modernization Enters Phase 1',
        source: 'Times Colonist',
        category: 'Development',
        url: 'https://www.timescolonist.com',
        timeAgo: '3 hours ago',
        summary: 'Major upgrades commence for international ferry terminals connecting Victoria to Seattle and Port Angeles.',
        expandedDetails: {
          keyTakeaways: [
            'New state-of-the-art passenger terminal with enhanced customs and commercial plazas.',
            'Expanded public waterfront esplanade connecting directly to the Legislature grounds.',
            'Zero disruption to Clipper and Coho passenger ferry services during initial phases.',
          ],
          localImpact: 'Beautified Inner Harbour walking paths and modern eco-friendly gateway.',
          timeline: 'Phased completion scheduled for 2028.',
          relatedActionUrl: 'https://www2.gov.bc.ca/gov/content/transportation/transportation-infrastructure/projects/belleville-terminal',
          relatedActionText: 'Belleville Terminal Updates',
        },
      },
    ],
    sports: [
      {
        id: 'yyj-sp1',
        team: 'Pacific FC',
        opponent: 'Vancouver FC (BC Derby)',
        league: 'CPL',
        status: 'Upcoming',
        gameTime: 'Saturday • 3:00 PM',
        tvBroadcast: 'OneSoccer',
        isHome: true,
      },
      {
        id: 'yyj-sp2',
        team: 'Victoria Royals',
        opponent: 'Vancouver Giants',
        league: 'WHL',
        status: 'Upcoming',
        gameTime: 'Friday • 7:05 PM',
        tvBroadcast: 'WHL Live',
        isHome: true,
      },
      {
        id: 'yyj-sp3',
        team: 'Victoria HarbourCats',
        opponent: 'Nanaimo NightOwls',
        league: 'MLB',
        status: 'Upcoming',
        gameTime: 'Tonight • 6:35 PM',
        tvBroadcast: 'WCL Live',
        isHome: true,
      },
    ],
    restaurants: [
      {
        id: 'yyj-r1',
        name: 'The Courtney Room',
        cuisine: 'Elevated Island Farm-to-Table',
        neighborhood: 'Downtown / Humboldt St (Magnolia Hotel)',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 890,
        signatureDish: 'Haida Gwaii Halibut & Duck Breast with Local Berries',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/the-courtney-room-victoria?aff=canadacity',
        availableTimes: ['5:30 PM', '7:15 PM', '8:45 PM'],
        tag: 'Canada’s 100 Best',
      },
      {
        id: 'yyj-r2',
        name: 'Red Fish Blue Fish',
        cuisine: 'Sustainable Outdoor Pier Seafood & Fish-Tacos',
        neighborhood: 'Inner Harbour / Wharf St',
        priceLevel: '$$',
        rating: 4.8,
        reviewCount: 4200,
        signatureDish: 'Wild Salmon Tacones & Pacific Cod Fish and Chips',
        bookingPlatform: 'Direct',
        reservationUrl: 'https://www.redfish-bluefish.com',
        availableTimes: ['Walk-up Dockside Counter'],
        tag: 'Inner Harbour Icon',
      },
    ],
    nightlife: [
      {
        id: 'yyj-nl1',
        name: 'Lucky Bar',
        category: 'Nightclub',
        neighborhood: 'Downtown / Yates St',
        vibe: 'Victoria’s legendary indie club hosting live touring bands, DJ dance parties & 90s throwback nights',
        coverOrVip: '$10 - $15 at door',
        hours: 'Wed - Sat • 9:00 PM - 2:00 AM',
        guestlistUrl: 'https://luckybar.ca',
        tag: 'Live Indie & Dance Institution',
      },
      {
        id: 'yyj-nl2',
        name: 'Clive’s Classic Lounge',
        category: 'Cocktail Lounge',
        neighborhood: 'Downtown / Chateau Victoria',
        vibe: 'Pioneering international cocktail bar recognized for world-class spirits collection and bespoke mixology',
        coverOrVip: 'No cover • Walk-ins & reservations',
        hours: 'Daily • 5:00 PM - 12:00 AM',
        guestlistUrl: 'https://clivesclassiclounge.com',
        tag: 'World-Renowned Cocktail Bar',
      },
    ],
    shows: [
      {
        id: 'yyj-s1',
        title: 'Victoria Symphony: Vivaldi’s Four Seasons',
        venue: 'Royal Theatre',
        neighborhood: 'Downtown / Broughton St',
        category: 'Symphony',
        dates: 'Friday & Saturday • 7:30 PM',
        ticketPriceRange: '$35 - $110',
        ticketUrl: 'https://victoriasymphony.ca?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
      {
        id: 'yyj-s2',
        title: 'Pacific Opera Victoria: Master Opera Series',
        venue: 'Royal Theatre',
        neighborhood: 'Downtown / Broughton St',
        category: 'Theatre',
        dates: 'Touring Season • 7:30 PM',
        ticketPriceRange: '$45 - $145',
        ticketUrl: 'https://pacificopera.ca?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
    ],
    hotels: [
      {
        id: 'yyj-h1',
        name: 'The Fairmont Empress',
        neighborhood: 'Inner Harbour / Government St',
        rating: 4.8,
        reviewCount: 3400,
        pricePerNight: '$340 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/the-fairmont-empress.html?aid=canadacity',
        bookingPlatform: 'Booking.com',
        amenities: ['World-Famous Afternoon Tea', 'Willow Stream Spa', 'Q at the Empress Restaurant'],
        tag: 'Iconic Castle Hotel',
        description: 'Vancouver Island’s most famous historic luxury hotel presiding over Victoria’s Inner Harbour.',
      },
    ],
    experiences: [
      {
        id: 'yyj-e1',
        title: 'The Butchart Gardens & Butterfly World Scenic Tour',
        operator: 'CVS Tours Victoria',
        category: 'Sightseeing',
        duration: '4 Hours',
        rating: 4.9,
        reviewCount: 3100,
        priceFrom: '$75 / person',
        bookingUrl: 'https://www.viator.com/tours/Victoria/Butchart-Gardens-Tour/d617-18212P1?partner=canadacity',
        bookingPlatform: 'Viator',
        highlights: ['Sunken Garden & Rose Garden access', 'Luxury coach transport from Inner Harbour', '55-acre floral masterpiece'],
        badge: 'Top Victoria Attraction',
      },
    ],
    outdoors: [
      {
        id: 'yyj-o1',
        name: 'Beacon Hill Park & Dallas Road Oceanfront',
        neighborhood: 'James Bay / South Waterfront',
        category: 'Beach & Waterfront',
        distanceOrSize: '74 Hectares (Coastal Cliff Pathway)',
        difficulty: 'Easy Stroll',
        features: ['Mile 0 Trans-Canada Highway', 'Peacock Groves & Rose Gardens', 'Olympic Mountain Views across Strait'],
        parkingTips: 'Free parking along Dallas Road and inside Beacon Hill Park.',
        bestTime: 'Sunset walk along Dallas Road cliffside pathway.',
        tag: 'Vancouver Island Coastal Jewel',
      },
    ],
    transitLines: [
      {
        id: 'yyj-t1',
        lineName: 'BC Transit Route 50 (Langford - Downtown Victoria)',
        systemName: 'BC Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Frequent RapidBus service operating every 7-10 minutes.',
        updatedMinutesAgo: 4,
      },
    ],
    civicServices: [
      {
        id: 'yyj-c1',
        title: 'City of Victoria Online Citizen Services',
        department: 'City of Victoria',
        actionText: 'Access Citizen Portal',
        actionUrl: 'https://www.victoria.ca',
        description: 'Bylaw services, parking permits, waste collection, and municipal public notices.',
        phone: '250-385-5711',
      },
    ],
  },

  // =========================================================================
  // 10. ST. JOHN'S (YYT)
  // =========================================================================
  yyt: {
    tenantId: 'yyt',
    cityName: "St. John's",
    news: [
      {
        id: 'yyt-n1',
        title: 'George Street Heritage Pedestrian Zone Expands for Summer Festival Season',
        source: 'The Telegram',
        category: 'Culture',
        url: 'https://www.saltwire.com/newfoundland-labrador',
        timeAgo: '2 hours ago',
        summary: 'North America’s most concentrated pub district pedestrianizes cobblestone lanes for outdoor live music.',
        expandedDetails: {
          keyTakeaways: [
            'George Street closed to vehicular traffic daily from 12:00 PM to 4:00 AM.',
            'Expanded outdoor pub patios and acoustic stages for local Newfoundland folk artists.',
            'Enhanced security and taxi stands along Water and New Gower Streets.',
          ],
          localImpact: 'Vibrant nightlife and safe pedestrian flow through the historic entertainment quarter.',
          timeline: 'Active throughout the summer and fall.',
          relatedActionUrl: 'https://georgestreetlive.ca',
          relatedActionText: 'George Street Festival Lineup',
        },
      },
    ],
    sports: [
      {
        id: 'yyt-sp1',
        team: 'Newfoundland Rogues',
        opponent: 'London Lightning',
        league: 'BSL',
        status: 'Upcoming',
        gameTime: 'Friday • 7:00 PM',
        tvBroadcast: 'BSL Live / Rogers tv NL',
        isHome: true,
      },
      {
        id: 'yyt-sp2',
        team: 'Royal St. John’s Regatta',
        opponent: 'Championship Races (Quidi Vidi Lake)',
        league: 'CPL',
        status: 'Upcoming',
        gameTime: 'Regatta Day Annual Showcase',
        tvBroadcast: 'NTV Newfoundland',
        isHome: true,
      },
    ],
    restaurants: [
      {
        id: 'yyt-r1',
        name: 'Mallard Cottage',
        cuisine: 'Traditional Newfoundland Farm-and-Foraged Gastronomy',
        neighborhood: 'Quidi Vidi Village',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 1650,
        signatureDish: 'Cod Cheeks, Wild Game Sausage & Traditional Cake Table',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/mallard-cottage-st-johns?aff=canadacity',
        availableTimes: ['5:30 PM', '7:00 PM', '8:45 PM'],
        tag: 'Canada’s 100 Best',
      },
      {
        id: 'yyt-r2',
        name: 'The Merchant Tavern',
        cuisine: 'Elevated Coastal Italian & Atlantic Seafood',
        neighborhood: 'Downtown / Water Street',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 1450,
        signatureDish: 'Fresh Lobster Tagliatelle & Seared Scallops',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/the-merchant-tavern-st-johns?aff=canadacity',
        availableTimes: ['6:00 PM', '7:30 PM', '9:00 PM'],
        tag: 'Raymonds Sister Resto',
      },
    ],
    nightlife: [
      {
        id: 'yyt-nl1',
        name: 'O’Reilly’s Irish Newfoundland Pub',
        category: 'Irish Pub',
        neighborhood: 'George Street',
        vibe: 'Legendary George Street centerpiece with live traditional fiddle music 7 nights a week, cold pints & step dancing',
        coverOrVip: '$5 - $10 at door on weekends',
        hours: 'Daily • 12:00 PM - 3:00 AM',
        guestlistUrl: 'https://oreillyspub.com',
        tag: 'George Street Crown Jewel',
      },
      {
        id: 'yyt-nl2',
        name: 'Trapper John’s Museum Pub',
        category: 'Irish Pub',
        neighborhood: 'George Street',
        vibe: 'Famous historic tavern known for authentic Screech-In ceremonies, local folklore, and lively weekend crowds',
        coverOrVip: 'No cover • Screech-in packages available',
        hours: 'Daily • 4:00 PM - 3:00 AM',
        guestlistUrl: 'https://trapperjohnspub.ca',
        tag: 'Official Screech-In Pub',
      },
    ],
    shows: [
      {
        id: 'yyt-s1',
        title: 'Come From Away - The Musical Homecoming',
        venue: 'Holy Heart Theatre / Arts and Culture Centre',
        neighborhood: 'Central / Prince Philip Drive',
        category: 'Theatre',
        dates: 'Wed - Sun • 8:00 PM & 2:00 PM',
        ticketPriceRange: '$45 - $120',
        ticketUrl: 'https://artsandculturecentre.com?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Selling Fast',
        badgeColor: 'emerald',
      },
      {
        id: 'yyt-s2',
        title: 'Newfoundland Symphony Orchestra: Masterworks Series',
        venue: 'St. John’s Arts and Culture Centre',
        neighborhood: 'Prince Philip Drive',
        category: 'Symphony',
        dates: 'Friday • 8:00 PM',
        ticketPriceRange: '$35 - $85',
        ticketUrl: 'https://nso-music.com?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
    ],
    hotels: [
      {
        id: 'yyt-h1',
        name: 'JAG Boutique Hotel',
        neighborhood: 'Downtown / George Street West',
        rating: 4.8,
        reviewCount: 1100,
        pricePerNight: '$220 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/jag.html?aid=canadacity',
        bookingPlatform: 'Booking.com',
        amenities: ['Exile Restaurant & Lounge', 'Rock & Roll Luxury Aesthetic', 'Valet Parking'],
        tag: 'Rock & Roll Boutique',
        description: 'Chic music-themed boutique hotel located steps from George Street entertainment district.',
      },
    ],
    experiences: [
      {
        id: 'yyt-e1',
        title: 'Witless Bay Puffin & Humpback Whale Boat Tour',
        operator: 'Gatherall’s Puffin & Whale Watch',
        category: 'Nature & Wildlife',
        duration: '2.5 Hours',
        rating: 4.9,
        reviewCount: 1800,
        priceFrom: '$85 / person',
        bookingUrl: 'https://www.viator.com/tours/St-Johns/Puffin-and-Whale-Watch/d630-28212P1?partner=canadacity',
        bookingPlatform: 'Viator',
        highlights: ['North America’s largest Atlantic Puffin sanctuary', 'Humpback whale breaches', 'Iceberg viewings in season'],
        badge: 'Newfoundland Classic',
      },
    ],
    outdoors: [
      {
        id: 'yyt-o1',
        name: 'Signal Hill National Historic Site & North Head Trail',
        neighborhood: 'Signal Hill / Battery',
        category: 'Lookout Point',
        distanceOrSize: '5 km Rugged Ocean Cliff Loop',
        difficulty: 'Challenging Hike',
        features: ['Cabot Tower Panoramic Views', 'The Narrows Harbour Entrance', 'Ocean Cliff Boardwalks'],
        parkingTips: 'Free parking at Cabot Tower summit or Lower Battery lot.',
        bestTime: 'Sunrise over the Atlantic Ocean at Canada’s most easterly lookout.',
        tag: 'Iconic Atlantic Cliff Hike',
      },
    ],
    transitLines: [
      {
        id: 'yyt-t1',
        lineName: 'Metrobus Route 1 & 2 (Downtown - Avalon Mall)',
        systemName: 'Metrobus Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Regular urban loop service running every 15 minutes.',
        updatedMinutesAgo: 5,
      },
    ],
    civicServices: [
      {
        id: 'yyt-c1',
        title: 'City of St. John’s Access 311',
        department: 'City of St. John’s',
        actionText: 'Contact Access 311',
        actionUrl: 'https://www.stjohns.ca/en/access-311.aspx',
        description: 'Road conditions, garbage/recycling lookup, bylaw enforcement, and public permits.',
        phone: '311 (709-754-2489)',
      },
    ],
  },
};

export function getCityHubData(tenantId: string): CityHubData {
  return CITY_HUB_REGISTRY[tenantId] || CITY_HUB_REGISTRY.yyc;
}
