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
  category: 'Theatre' | 'Concert' | 'Comedy' | 'Cinema' | 'Sports';
  dates: string;
  ticketPriceRange: string;
  ticketUrl: string;
  ticketPlatform: 'Ticketmaster' | 'Mirvish' | 'Eventbrite' | 'Box Office' | 'Direct' | 'Ticket Atlantic';
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
  category: 'Food Tour' | 'Sightseeing' | 'Nature & Wildlife' | 'Craft Brewery' | 'Helicopter / Cruise';
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
  league: 'NHL' | 'CFL' | 'NBA' | 'MLB' | 'MLS' | 'WHL' | 'QMJHL';
  status: 'Final' | 'Live' | 'Upcoming';
  score?: string;
  gameTime?: string;
  tvBroadcast?: string;
  isHome: boolean;
}

export interface NightlifeSpot {
  id: string;
  name: string;
  category: 'Nightclub' | 'Speakeasy' | 'Cocktail Lounge' | 'Rooftop Bar' | 'Live Music & Dance' | 'Country Saloon';
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
  yyc: {
    tenantId: 'yyc',
    cityName: 'Calgary',
    news: [
      {
        id: 'yyc-n1',
        title: 'Green Line LRT Construction Accelerates with Downtown Station Contracts',
        source: 'Calgary Herald',
        category: 'Civic',
        url: 'https://calgaryherald.com',
        timeAgo: '45 mins ago',
        summary: 'City Council finalizes major underground tunneling agreements for 7th Ave and Beltline connections.',
        expandedDetails: {
          keyTakeaways: [
            'Construction contracts finalized for initial Phase 1 underground tunneling beneath the downtown CPR rail corridor.',
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
        title: '17th Avenue Southwest Patio Program Returns for Extended Summer Season',
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
      {
        id: 'yyc-n3',
        title: 'Calgary Stampede Unveils Saddledome & Big Four Concert Headliners',
        source: 'CBC Calgary',
        category: 'Culture',
        url: 'https://www.cbc.ca/news/canada/calgary',
        timeAgo: '4 hours ago',
        summary: 'Major country and rock international touring acts announced for upcoming summer showcase.',
        expandedDetails: {
          keyTakeaways: [
            'Over 75 international touring artists announced across the Scotiabank Saddledome, Big Four Roadhouse, and Cowboys Music Festival.',
            'Advance rodeo and evening show ticket packages go on general sale this Friday at 10 AM.',
            'New family value days and free morning pancake breakfast locations announced across all quadrants.',
          ],
          localImpact: 'High hotel occupancy rates across downtown and Stampede Park. Advance bookings strongly recommended.',
          timeline: '10-day festival runs the first full week of July annually.',
          relatedActionUrl: 'https://www.calgarystampede.com',
          relatedActionText: 'View Official Stampede Lineup',
        },
      },
    ],
    sports: [
      {
        id: 'yyc-sp1',
        team: 'Calgary Flames',
        opponent: 'Edmonton Oilers (Battle of Alberta)',
        league: 'NHL',
        status: 'Upcoming',
        gameTime: 'Tonight • 8:00 PM',
        tvBroadcast: 'Sportsnet West / CBC',
        isHome: true,
      },
      {
        id: 'yyc-sp2',
        team: 'Calgary Stampeders',
        opponent: 'BC Lions',
        league: 'CFL',
        status: 'Upcoming',
        gameTime: 'Saturday • 5:00 PM',
        tvBroadcast: 'TSN 1/3',
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
      {
        id: 'yyc-r4',
        name: 'Hy’s Steakhouse & Cocktail Bar',
        cuisine: 'Legendary Prime Beef & Tableside Caesar',
        neighborhood: 'Downtown Core / 8th Ave',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 1850,
        signatureDish: 'Bone-in Rib Steak & Cheese Toast',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/hys-steakhouse-calgary?aff=canadacity',
        availableTimes: ['5:30 PM', '7:00 PM', '8:30 PM'],
        tag: 'Calgary Classic Since 1955',
      },
      {
        id: 'yyc-r5',
        name: 'Cold Garden Beverage Company',
        cuisine: 'Microbrewery & Dog-Friendly Taproom',
        neighborhood: 'Inglewood / 11th St SE',
        priceLevel: '$',
        rating: 4.8,
        reviewCount: 2400,
        signatureDish: 'Dandelion’s Blonde Ale & Red Smashed IPA',
        bookingPlatform: 'Direct',
        reservationUrl: 'https://www.coldgarden.ca',
        availableTimes: ['Walk-in Taproom', 'Bring Your Own Food'],
        tag: 'Dog Friendly & Eclectic',
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
      {
        id: 'yyc-nl5',
        name: 'Habitat Living Sound',
        category: 'Nightclub',
        neighborhood: 'Beltline / 1st St SW',
        vibe: 'Intimate micro-club dedicated to pure house, deep techno, and local electronic DJ culture',
        coverOrVip: '$10 - $15 • Free on guestlist before 11 PM',
        hours: 'Fri & Sat • 10:00 PM - 2:30 AM',
        guestlistUrl: 'https://habitatlivingsound.com',
        tag: 'Underground Electronic',
      },
    ],
    shows: [
      {
        id: 'yyc-s1',
        title: 'Calgary Flames vs. Edmonton Oilers (Battle of Alberta)',
        venue: 'Scotiabank Saddledome',
        neighborhood: 'Stampede Park',
        category: 'Sports',
        dates: 'Saturday • 8:00 PM',
        ticketPriceRange: '$95 - $480',
        ticketUrl: 'https://www.ticketmaster.ca/calgary-flames-tickets?partner=canadacity',
        ticketPlatform: 'Ticketmaster',
        availabilityStatus: 'Selling Fast',
        badgeColor: 'rose',
      },
      {
        id: 'yyc-s2',
        title: 'Broadway Across Canada: Wicked',
        venue: 'Southern Alberta Jubilee Auditorium',
        neighborhood: 'NW / SAIT Campus',
        category: 'Theatre',
        dates: 'Wed - Sun • 7:30 PM',
        ticketPriceRange: '$75 - $210',
        ticketUrl: 'https://calgary.broadway.com?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
      },
      {
        id: 'yyc-s3',
        title: 'Calgary Philharmonic Orchestra: Star Wars in Concert',
        venue: 'Jack Singer Concert Hall (Arts Commons)',
        neighborhood: 'Downtown Cultural District',
        category: 'Concert',
        dates: 'Friday & Saturday • 7:30 PM',
        ticketPriceRange: '$42 - $135',
        ticketUrl: 'https://calgaryphil.com?partner=canadacity',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald',
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
      {
        id: 'yyc-h2',
        name: 'Hotel Arts Calgary',
        neighborhood: 'Beltline / 1st St SW',
        rating: 4.7,
        reviewCount: 1450,
        pricePerNight: '$195 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/hotel-arts.html?aid=canadacity',
        bookingPlatform: 'Booking.com',
        amenities: ['Outdoor Heated Pool', 'Yellow Door Bistro', 'Free Brooklyn Cruiser Bikes'],
        tag: 'Arts & Poolside Vibe',
        description: 'Urban boutique hotel in the heart of the Beltline with a year-round heated pool patio.',
      },
    ],
    experiences: [
      {
        id: 'yyc-e1',
        title: 'Calgary Downtown & Inglewood Brewery Crawl Tour',
        operator: 'Canadian Craft Tours',
        category: 'Craft Brewery',
        duration: '3.5 Hours',
        rating: 4.9,
        reviewCount: 420,
        priceFrom: '$99 / person',
        bookingUrl: 'https://www.viator.com/tours/Calgary/Craft-Beer-Tour/d913-98212P1?partner=canadacity',
        bookingPlatform: 'Viator',
        highlights: ['Tasting flights at 3 top craft breweries', 'Behind-the-scenes brewmaster tour', 'Round-trip transport included'],
        badge: 'Top Rated Tour',
      },
      {
        id: 'yyc-e2',
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
      {
        id: 'yyc-o2',
        name: 'Nose Hill Park & Siksikaitsitapi Medicine Wheel',
        neighborhood: 'NW Calgary',
        category: 'Hiking Trail',
        distanceOrSize: '11.27 sq km (One of largest urban parks in North America)',
        difficulty: 'Moderate Trail',
        features: ['Panoramic Skyline Views', 'Off-Leash Dog Enclave', 'Fescue Grassland Ecosystem'],
        parkingTips: 'Free parking lots along 14th Street NW and Shaganappi Trail.',
        bestTime: 'Sunrise & Sunset for 360-degree mountain & skyline vistas.',
        tag: 'Prairie Vista Hiking',
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
        phone: '311',
      },
    ],
  },
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
            'Target opening set to significantly reduce Line 1 crowding by 2031.',
          ],
          localImpact: 'Queen Street transit diversion via Richmond and Adelaide remains in place with high frequency streetcars.',
          timeline: 'Civil engineering complete • Track installation scheduled for 2028.',
          relatedActionUrl: 'https://www.metrolinx.com/ontarioline',
          relatedActionText: 'Ontario Line Route Map',
        },
      },
      {
        id: 'yyz-n2',
        title: 'Harbourfront Waterfront Revitalization Plan Unveiled with New Public Parks',
        source: 'CBC Toronto',
        category: 'Development',
        url: 'https://www.cbc.ca/news/canada/toronto',
        timeAgo: '3 hours ago',
        summary: 'City Council approves expanding continuous waterfront boardwalks and cycling paths.',
        expandedDetails: {
          keyTakeaways: [
            'New 10-acre public park with urban beach and naturalized wetlands at the mouth of the Don River.',
            'Queens Quay West bike path expanded with dedicated pedestrian esplanades.',
            'Community cultural pavilion with free year-round public programming.',
          ],
          localImpact: 'Uninterrupted walking path from Bathurst Quay to Port Lands.',
          timeline: 'Phase 1 opens this Summer.',
          relatedActionUrl: 'https://waterfrontoronto.ca',
          relatedActionText: 'View Waterfront Renderings',
        },
      },
    ],
    sports: [
      {
        id: 'yyz-sp1',
        team: 'Toronto Maple Leafs',
        opponent: 'Montreal Canadiens',
        league: 'NHL',
        status: 'Final',
        score: '4 - 2 (W)',
        tvBroadcast: 'Sportsnet / CBC',
        isHome: true,
      },
      {
        id: 'yyz-sp2',
        team: 'Toronto Blue Jays',
        opponent: 'New York Yankees',
        league: 'MLB',
        status: 'Upcoming',
        gameTime: 'Tonight • 7:07 PM',
        tvBroadcast: 'Sportsnet ONE',
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
      {
        id: 'yyz-r3',
        name: 'Prime Seafood Palace',
        cuisine: 'Elevated Steakhouse & Seafood',
        neighborhood: 'West Queen West',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 680,
        signatureDish: 'Dry-Aged Bone-in Ribeye & Lobster Pasta',
        bookingPlatform: 'Resy',
        reservationUrl: 'https://resy.com/cities/toronto-on/venues/prime-seafood-palace?aff=canadacity',
        availableTimes: ['6:15 PM', '8:30 PM', '9:45 PM'],
        tag: 'Matty Matheson Flagship',
      },
    ],
    nightlife: [
      {
        id: 'yyz-nl1',
        name: 'Rebel Nightclub',
        category: 'Nightclub',
        neighborhood: 'Polson Pier / Waterfront',
        vibe: 'Canada’s largest nightlife complex (45,000 sq ft) with 4 distinct rooms, 65-foot stage & international EDM DJs',
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
      {
        id: 'yyz-nl3',
        name: 'Century Toronto',
        category: 'Nightclub',
        neighborhood: 'King West',
        vibe: 'Ultra-luxurious King West nightlife sanctuary featuring celebrity guestlists, top hip-hop DJs, and high-energy crowd',
        coverOrVip: 'Guestlist & Bottle Service Reservations',
        hours: 'Fri & Sat • 10:30 PM - 3:00 AM',
        guestlistUrl: 'https://centurytoronto.com',
        tag: 'Celebrity King West Lounge',
      },
      {
        id: 'yyz-nl4',
        name: 'Coda',
        category: 'Nightclub',
        neighborhood: 'Annex / Bathurst & Bloor',
        vibe: 'Toronto’s premier underground dance venue with custom PK sound system and marathon techno/house sets',
        coverOrVip: '$20 - $35 • Advance tickets recommended',
        hours: 'Fri & Sat • 10:00 PM - 5:00 AM',
        guestlistUrl: 'https://codatoronto.com',
        tag: 'Underground Techno Sanctuary',
      },
      {
        id: 'yyz-nl5',
        name: 'BarChef',
        category: 'Cocktail Lounge',
        neighborhood: 'Queen West',
        vibe: 'World-renowned molecular mixology laboratory creating multisensory cocktail experiences with dry ice & botanical essences',
        coverOrVip: 'Reservations recommended • No cover',
        hours: 'Daily • 5:00 PM - 2:00 AM',
        guestlistUrl: 'https://barchef.com',
        tag: 'World’s Best Cocktail Bar',
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
        amenities: ['Harriet’s Rooftop Pool', 'Eco-Luxury Design', 'Flora Lounge', 'Gym & Wellness'],
        tag: 'King West Hotspot',
        description: 'Sustainable luxury oasis with reclaimed wood interiors and a vibrant rooftop pool overlooking the Toronto skyline.',
      },
      {
        id: 'yyz-h2',
        name: 'The Drake Hotel',
        neighborhood: 'Queen West / West Queen West',
        rating: 4.7,
        reviewCount: 1120,
        pricePerNight: '$225 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/the-drake.html?aid=canadacity',
        bookingPlatform: 'Booking.com',
        amenities: ['Sky Yard Rooftop', 'Underground Live Venue', 'Curated Contemporary Art'],
        tag: 'Art & Cultural Icon',
        description: 'Cultural hub of Queen West with rotating art exhibitions and famous rooftop cocktail patio.',
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
        highlights: ['6 curated food tastings across Kensington', 'Authentic Chinatown dumpling tasting', 'Expert culinary guide'],
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
        features: ['Cherry Blossom Grove', 'High Park Zoo', 'Grenadier Pond Boardwalk', 'Off-Leash Dog Trails'],
        parkingTips: 'Free parking inside park gates on weekdays; TTC High Park Station direct.',
        bestTime: 'Spring for Sakura blossoms; Autumn for golden foliage.',
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
        description: 'Report potholes, broken street lights, missed waste collection, or noise bylaws.',
        phone: '311',
      },
    ],
  },
  yvr: {
    tenantId: 'yvr',
    cityName: 'Vancouver',
    news: [
      {
        id: 'yvr-n1',
        title: 'Broadway Subway Project Station Fit-Outs Reach Final Phases',
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
          localImpact: 'Broadway street lanes fully reopened to vehicular traffic with new bus priority corridors.',
          timeline: 'Testing ongoing • Passenger revenue service expected early 2026.',
          relatedActionUrl: 'https://www.broadwaysubway.ca',
          relatedActionText: 'Broadway Subway Updates',
        },
      },
    ],
    sports: [
      {
        id: 'yvr-sp1',
        team: 'Vancouver Canucks',
        opponent: 'Seattle Kraken',
        league: 'NHL',
        status: 'Upcoming',
        gameTime: 'Tonight • 7:00 PM',
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
    ],
    nightlife: [
      {
        id: 'yvr-nl1',
        name: 'Celebrities Nightclub',
        category: 'Nightclub',
        neighborhood: 'Davie Village / Downtown',
        vibe: 'Vancouver nightlife staple with state-of-the-art Funktion-One sound, world-touring EDM DJs, and inclusive dance floors',
        coverOrVip: '$15 - $35 • VIP table service',
        hours: 'Tue, Fri & Sat • 10:00 PM - 3:00 AM',
        guestlistUrl: 'https://celebritiesnightclub.com',
        tag: 'Iconic Vancouver Dance Club',
      },
      {
        id: 'yvr-nl2',
        name: 'Fortune Sound Club',
        category: 'Nightclub',
        neighborhood: 'Chinatown / Pender St',
        vibe: 'Multi-level cultural hub known for hip-hop, R&B, and electronic music with custom acoustic engineering',
        coverOrVip: '$15 - $25 • Advance tickets online',
        hours: 'Fri & Sat • 10:00 PM - 2:00 AM',
        guestlistUrl: 'https://fortunesoundclub.com',
        tag: 'Chinatown Sound Haven',
      },
      {
        id: 'yvr-nl3',
        name: 'The Keefer Bar',
        category: 'Cocktail Lounge',
        neighborhood: 'Chinatown',
        vibe: 'Award-winning apothecary cocktail bar serving medicinal-inspired tinctures, dim sum bites, and patio DJ sets',
        coverOrVip: 'No cover • Walk-ins & reservations',
        hours: 'Daily • 4:00 PM - 2:00 AM',
        guestlistUrl: 'https://thekeeferbar.com',
        tag: 'Top 50 Best Bars in North America',
      },
      {
        id: 'yvr-nl4',
        name: 'The Roxy Cabaret',
        category: 'Live Music & Dance',
        neighborhood: 'Granville Entertainment District',
        vibe: 'Legendary Granville party institution with high-energy live house bands, touring rock acts, and weekend dance crowds',
        coverOrVip: '$10 - $20 at door',
        hours: 'Daily • 8:00 PM - 3:00 AM',
        guestlistUrl: 'https://roxyvan.com',
        tag: 'Granville Strip Legend',
      },
    ],
    shows: [
      {
        id: 'yvr-s1',
        title: 'Vancouver Canucks vs. Seattle Kraken',
        venue: 'Rogers Arena',
        neighborhood: 'Downtown / Chinatown',
        category: 'Sports',
        dates: 'Thursday • 7:00 PM',
        ticketPriceRange: '$85 - $420',
        ticketUrl: 'https://www.ticketmaster.ca/vancouver-canucks-tickets?partner=canadacity',
        ticketPlatform: 'Ticketmaster',
        availabilityStatus: 'Selling Fast',
        badgeColor: 'rose',
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
        amenities: ['Rooftop Pool & Cabanas', 'Willow Stream Spa', 'Botanist Restaurant', 'Harbour Vistas'],
        tag: 'Ultra-Luxury Waterfront',
        description: 'World-renowned 5-star hotel offering floor-to-ceiling views of the North Shore mountains and Vancouver Harbour.',
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
        highlights: ['Water takeoff from Downtown Coal Harbour', 'Glacier peak flyover', 'Bird’s-eye view of Stanley Park & Lions Gate Bridge'],
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
        description: 'Municipal requests and city bylaws.',
        phone: '311',
      },
    ],
  },
  // Default data for other cities
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
            'Eco-friendly cup deposit system and water refill stations across all festival sites.',
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
        team: 'Canadiens de Montréal',
        opponent: 'Boston Bruins',
        league: 'NHL',
        status: 'Upcoming',
        gameTime: 'Tomorrow • 7:00 PM',
        tvBroadcast: 'RDS / TSN2 / CBC',
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
        name: 'New City Gas',
        category: 'Nightclub',
        neighborhood: 'Griffintown',
        vibe: 'Massive heritage 19th-century industrial brick warehouse hosting global electronic superstars, festivals & digital art',
        coverOrVip: '$35 - $75 • VIP Mezzanine & Bottle Service',
        hours: 'Fri & Sat • 10:00 PM - 3:00 AM',
        guestlistUrl: 'https://newcitygas.com',
        tag: 'Industrial Mega-Venue',
      },
      {
        id: 'yul-nl3',
        name: 'Muzique',
        category: 'Nightclub',
        neighborhood: 'Boulevard Saint-Laurent (The Main)',
        vibe: 'High-energy dual-room club with outdoor rooftop terrace, celebrity appearances, and premier hip-hop & house sets',
        coverOrVip: 'Guestlist before 11:30 PM • VIP Bottle Service',
        hours: 'Fri - Sun • 10:00 PM - 3:00 AM',
        guestlistUrl: 'https://muziquemontreal.com',
        tag: 'St-Laurent Party Strip',
      },
      {
        id: 'yul-nl4',
        name: 'Cloakroom Bar',
        category: 'Speakeasy',
        neighborhood: 'Golden Square Mile / Rue de la Montagne',
        vibe: 'Ultra-exclusive 25-seat bespoke speakeasy hidden behind a custom tailor shop with handcrafted carved ice and tailored drinks',
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
        phone: '311',
      },
    ],
  },
  yeg: {
    tenantId: 'yeg',
    cityName: 'Edmonton',
    news: [],
    sports: [],
    restaurants: [],
    nightlife: [],
    shows: [],
    hotels: [],
    experiences: [],
    outdoors: [],
    transitLines: [],
    civicServices: [],
  },
  yow: {
    tenantId: 'yow',
    cityName: 'Ottawa',
    news: [],
    sports: [],
    restaurants: [],
    nightlife: [],
    shows: [],
    hotels: [],
    experiences: [],
    outdoors: [],
    transitLines: [],
    civicServices: [],
  },
  ywg: {
    tenantId: 'ywg',
    cityName: 'Winnipeg',
    news: [],
    sports: [],
    restaurants: [],
    nightlife: [],
    shows: [],
    hotels: [],
    experiences: [],
    outdoors: [],
    transitLines: [],
    civicServices: [],
  },
  yhz: {
    tenantId: 'yhz',
    cityName: 'Halifax',
    news: [],
    sports: [],
    restaurants: [],
    nightlife: [],
    shows: [],
    hotels: [],
    experiences: [],
    outdoors: [],
    transitLines: [],
    civicServices: [],
  },
  yyj: {
    tenantId: 'yyj',
    cityName: 'Victoria',
    news: [],
    sports: [],
    restaurants: [],
    nightlife: [],
    shows: [],
    hotels: [],
    experiences: [],
    outdoors: [],
    transitLines: [],
    civicServices: [],
  },
  yyt: {
    tenantId: 'yyt',
    cityName: "St. John's",
    news: [],
    sports: [],
    restaurants: [],
    nightlife: [],
    shows: [],
    hotels: [],
    experiences: [],
    outdoors: [],
    transitLines: [],
    civicServices: [],
  },
};

// Fallback filler for remaining cities
for (const id of ['yeg', 'yow', 'ywg', 'yhz', 'yyj', 'yyt']) {
  if (CITY_HUB_REGISTRY[id].restaurants.length === 0) {
    CITY_HUB_REGISTRY[id] = {
      ...CITY_HUB_REGISTRY[id],
      restaurants: CITY_HUB_REGISTRY.yyc.restaurants,
      nightlife: CITY_HUB_REGISTRY.yyc.nightlife,
      shows: CITY_HUB_REGISTRY.yyc.shows,
      hotels: CITY_HUB_REGISTRY.yyc.hotels,
      experiences: CITY_HUB_REGISTRY.yyc.experiences,
      outdoors: CITY_HUB_REGISTRY.yyc.outdoors,
      news: CITY_HUB_REGISTRY.yyc.news,
      sports: CITY_HUB_REGISTRY.yyc.sports,
      transitLines: CITY_HUB_REGISTRY.yyc.transitLines,
      civicServices: CITY_HUB_REGISTRY.yyc.civicServices,
    };
  }
}

export function getCityHubData(tenantId: string): CityHubData {
  return CITY_HUB_REGISTRY[tenantId] || CITY_HUB_REGISTRY.yyc;
}
