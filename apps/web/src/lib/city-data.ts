import liveNewsFeed from '../data/live-news.json';
import liveHotspotsFeed from '../data/live-hotspots.json';

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
  category: 'Food Tour' | 'Sightseeing' | 'Nature & Wildlife' | 'Craft Brewery' | 'Helicopter / Cruise' | 'Historic Walk' | 'Ski & Alpine Resort' | 'Mountain Sightseeing';
  duration: string;
  rating: number;
  reviewCount: number;
  priceFrom: string;
  bookingUrl: string;
  bookingPlatform: 'Viator' | 'GetYourGuide' | 'SkiBig3' | 'WhistlerEpicPass' | 'MountainAdventure' | 'Direct';
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
  category: 'Civic' | 'Business' | 'Culture' | 'Development' | 'Regional' | 'Sports' | 'Technology' | 'Government' | 'Energy' | 'Finance' | 'Maritime' | 'Aerospace' | 'Agriculture' | 'Policy' | 'Industry' | 'Logistics' | 'Healthcare' | 'Environment' | 'Education';
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
  priceLevel?: string;
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
            'Expected completion timeline projected for late 2028 with enhanced electric low-floor trains.'
          ],
          localImpact: 'Expect temporary traffic detours along 11th Avenue SW and 2nd Street SE. Transit riders will experience zero service cuts to current Red/Blue line service.',
          timeline: 'Tunneling commences Q2 2027 • Station structural work underway through 2028.',
          relatedActionUrl: 'https://www.calgary.ca/greenline.html',
          relatedActionText: 'View Green Line Detour Map'
        }
      },
      {
        id: 'yyc-n2',
        title: 'Alberta Energy Sector Reaches Milestone in Pathways Carbon Capture Infrastructure',
        source: 'Financial Post / Calgary Energy Desk',
        category: 'Energy',
        url: 'https://financialpost.com/commodities/energy',
        timeAgo: '2 hours ago',
        summary: 'Major pipeline trunkline agreements approved to transport sequestered carbon to cold lake storage reservoirs.',
        expandedDetails: {
          keyTakeaways: [
            'Trunkline engineering permits cleared for the $16.5B CCUS network.',
            'Expected to reduce regional upstream oil sands emissions by 22 megatonnes annually by 2030.',
            'Substantial engineering and procurement contracts awarded to Alberta-based contractors.'
          ],
          localImpact: 'Boosts high-tech engineering and construction employment across Calgary corporate offices and northern field operations.',
          timeline: 'Phase 1 operations target 2027 commissioning.'
        }
      },
      {
        id: 'yyc-n3',
        title: 'Downtown Office-to-Residential Conversion Program Surpasses 1.5M Square Feet',
        source: 'Daily Hive Calgary',
        category: 'Development',
        url: 'https://dailyhive.com/calgary',
        timeAgo: '3 hours ago',
        summary: 'Over 13 vacant corporate office towers successfully transformed into 2,400+ modern residential rental suites.',
        expandedDetails: {
          keyTakeaways: [
            'Calgary Downtown Development Incentive program adds thousands of new residents to the downtown core.',
            'New ground-floor retail, grocery stores, and micro-breweries opening along 5th and 6th Avenues SW.',
            'Program recognized globally as a benchmark for municipal urban renewal.'
          ],
          localImpact: 'Brings vibrant evening and weekend pedestrian activity to formerly commercial-only corporate corridors.',
          timeline: 'Additional 5 buildings slated for 2026/2027 delivery.'
        }
      },
      {
        id: 'yyc-n4',
        title: 'Calgary Tech Ecosystem Attracts $450M in Clean-Tech and AI Venture Funding',
        source: 'BetaKit',
        category: 'Technology',
        url: 'https://betakit.com',
        timeAgo: '5 hours ago',
        summary: 'Venture capital investments surge in Calgary clean-tech, industrial IoT, and energy software scale-ups.',
        expandedDetails: {
          keyTakeaways: [
            'Calgary ranks in the top 3 North American mid-sized tech talent markets.',
            'Platform Calgary hub hosts over 120 active software and hardware startups.',
            'Strong venture inflow from Silicon Valley and Toronto funds into Western Canadian AI scale-ups.'
          ],
          localImpact: 'Creates hundreds of senior software engineering and product management roles in downtown innovation hubs.',
          timeline: 'Active hiring across Q3 and Q4 2026.'
        }
      },
      {
        id: 'yyc-n5',
        title: '17th Avenue Southwest Patio Program Returns for Extended Season',
        source: 'Avenue Calgary',
        category: 'Culture',
        url: 'https://www.avenuecalgary.com',
        timeAgo: '6 hours ago',
        summary: 'Over 40 restaurants and craft bars along 17th Ave and Inglewood expand outdoor dining boardwalks.',
        expandedDetails: {
          keyTakeaways: [
            'Expanded patio permits granted to 40+ local Beltline and 17th Ave establishments.',
            'Sidewalk boardwalk extensions provide barrier-free pedestrian accessibility alongside outdoor dining.',
            'Acoustic live music permitted on patios until 10:00 PM on weekends.'
          ],
          localImpact: 'Pedestrian foot traffic along the Red Mile corridor increases significantly with designated pick-up/drop-off zones for rideshares.',
          timeline: 'Patios operating daily through late October weather permitting.'
        }
      }
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
        isHome: true
      },
      {
        id: 'yyc-sp2',
        team: 'Calgary Flames',
        opponent: 'Edmonton Oilers (Battle of Alberta)',
        league: 'NHL',
        status: 'Upcoming',
        gameTime: 'Regular Season Matchup',
        tvBroadcast: 'Sportsnet West / CBC',
        isHome: true
      },
      {
        id: 'yyc-sp3',
        team: 'Calgary Hitmen',
        opponent: 'Red Deer Rebels',
        league: 'WHL',
        status: 'Final',
        score: '5 - 3 (W)',
        tvBroadcast: 'WHL Live',
        isHome: true
      },
      {
        id: 'yyc-sp4',
        team: 'Calgary Roughnecks',
        opponent: 'Toronto Rock',
        league: 'NLL',
        status: 'Upcoming',
        gameTime: 'Friday • 7:30 PM',
        tvBroadcast: 'TSN+',
        isHome: true
      },
      {
        id: 'yyc-sp5',
        team: 'Cavalry FC',
        opponent: 'Forge FC',
        league: 'CPL',
        status: 'Upcoming',
        gameTime: 'Sunday • 2:00 PM',
        tvBroadcast: 'OneSoccer',
        isHome: true
      }
    ],
    restaurants: [
      {
        id: 'yyc-r1',
        name: 'Major Tom Bar',
        cuisine: 'Modern Steakhouse & Elevated Cocktails',
        neighborhood: 'Downtown / Stephen Ave (40th Floor)',
        priceLevel: '$$$$',
        rating: 4.9,
        reviewCount: 2450,
        signatureDish: 'Prime Alberta Striploin & Crispy Potato Puffs',
        bookingPlatform: 'SevenRooms',
        reservationUrl: 'https://www.sevenrooms.com/reservations/majortombar',
        availableTimes: ['5:15 PM', '7:30 PM', '9:00 PM', '9:45 PM'],
        tag: 'Canada’s 100 Best #1'
      },
      {
        id: 'yyc-r2',
        name: 'Ten Foot Henry',
        cuisine: 'Vegetable-Forward & Family-Style Sharing',
        neighborhood: 'Beltline / 1st St SW',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 3100,
        signatureDish: 'Tuna Crudo, Henry Salad & Butterscotch Pudding',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/ten-foot-henry-calgary',
        availableTimes: ['5:00 PM', '6:45 PM', '8:15 PM', '9:30 PM'],
        tag: 'Calgary Culinary Icon'
      },
      {
        id: 'yyc-r3',
        name: 'River Café',
        cuisine: 'Canadian Regional & Foraged Fare',
        neighborhood: 'Prince’s Island Park (Waterfront)',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 2200,
        signatureDish: 'Haida Gwaii Halibut & Wild Boar Belly',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/river-cafe-calgary',
        availableTimes: ['5:30 PM', '7:15 PM', '8:45 PM'],
        tag: 'Scenic Riverfront Dining'
      },
      {
        id: 'yyc-r4',
        name: 'Model Milk',
        cuisine: 'New American & Farm-to-Table Comfort',
        neighborhood: '17th Avenue SW (Beltline)',
        priceLevel: '$$$',
        rating: 4.7,
        reviewCount: 1850,
        signatureDish: 'Hot Fried Chicken & Calamansi Sorbet',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/model-milk-calgary',
        availableTimes: ['5:45 PM', '7:30 PM', '9:15 PM'],
        tag: 'Historic Dairy Conversion'
      },
      {
        id: 'yyc-r5',
        name: 'Shokunin',
        cuisine: 'Contemporary Japanese Yakitori & Izakaya',
        neighborhood: 'Mission / 4th St SW',
        priceLevel: '$$$',
        rating: 4.7,
        reviewCount: 1600,
        signatureDish: 'Binchotan Grilled Wagyu & Sake Glazed Wings',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/shokunin-calgary',
        availableTimes: ['5:15 PM', '7:00 PM', '8:45 PM'],
        tag: 'Canada’s Top 50'
      },
      {
        id: 'yyc-r6',
        name: 'Bridgette Bar',
        cuisine: 'Wood-Fired Pizza, Pasta & Craft Cocktails',
        neighborhood: 'Design District / 10th Ave SW',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 2100,
        signatureDish: 'Wood-Roasted Duck Breast & Garlic Focaccia',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/bridgette-bar-calgary',
        availableTimes: ['5:00 PM', '6:30 PM', '8:30 PM', '10:00 PM'],
        tag: 'Mid-Century Design Hub'
      },
      {
        id: 'yyc-r7',
        name: 'CHARCUT Roast House',
        cuisine: 'Local Charcuterie, Steaks & Rotisserie',
        neighborhood: 'Downtown / Centre St & Hotel Arts',
        priceLevel: '$$$',
        rating: 4.7,
        reviewCount: 1900,
        signatureDish: 'Pork Sausage with Brassica Mustard & Duck Fat Poutine',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/charcut-roast-house-calgary',
        availableTimes: ['5:30 PM', '7:00 PM', '8:30 PM'],
        tag: 'Top Chef Canada Heritage'
      },
      {
        id: 'yyc-r8',
        name: 'Pigeonhole',
        cuisine: 'Natural Wine Bar & Small Plate Tapas',
        neighborhood: '17th Ave SW / Victoria Park',
        priceLevel: '$$$',
        rating: 4.7,
        reviewCount: 1400,
        signatureDish: 'Charred Cabbage with Miso Butter & Ricotta Gnudi',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/pigeonhole-calgary',
        availableTimes: ['5:00 PM', '7:15 PM', '9:30 PM'],
        tag: 'Canada’s Best New Resto Winner'
      }
    ],
    nightlife: [
      {
        id: 'yyc-nl1',
        name: 'Sub Rosa',
        category: 'Speakeasy',
        neighborhood: 'Downtown (Under Hudson’s Bay Building)',
        vibe: 'Subterranean luxury cocktail lounge with velvet booths, antique brick arches, and weekend guest DJs',
        coverOrVip: '$10 - $20 on weekends • Table bottle service available',
        hours: 'Thu - Sat • 8:00 PM - 2:00 AM',
        guestlistUrl: 'https://subrosayyc.com',
        tag: 'Hidden Underground Speakeasy'
      },
      {
        id: 'yyc-nl2',
        name: 'Commonwealth Bar & Stage',
        category: 'Nightclub',
        neighborhood: 'Beltline / 10th Ave SW',
        vibe: 'High-energy 2-floor warehouse club featuring world-class electronic producers, hip hop nights & dance floors',
        coverOrVip: '$15 - $30 depending on headliner • Guestlist before 10:30 PM',
        hours: 'Fri & Sat • 9:00 PM - 2:00 AM',
        guestlistUrl: 'https://commonwealthbar.ca',
        tag: 'Premier Calgary Nightclub'
      },
      {
        id: 'yyc-nl3',
        name: 'Ranchman’s Cookhouse & Dancehall',
        category: 'Country Saloon',
        neighborhood: 'South Calgary / Macleod Trail',
        vibe: 'World-famous iconic country party bar with mechanical bull, live country headliners, and 2-stepping dance floors',
        coverOrVip: '$10 - $25 • Stampede VIP tables',
        hours: 'Thu - Sat • 7:00 PM - 2:00 AM',
        guestlistUrl: 'https://ranchmans.ca',
        tag: 'Legendary Stampede Bar'
      },
      {
        id: 'yyc-nl4',
        name: 'Betty Lou’s Library',
        category: 'Speakeasy',
        neighborhood: 'Beltline / 17th Ave SW',
        vibe: '1920s Prohibition speakeasy entered through a hidden bookcase with password telephone booth',
        coverOrVip: 'Password Required • Reservation Recommended',
        hours: 'Wed - Sun • 5:00 PM - 1:00 AM',
        guestlistUrl: 'https://bettylouslibrary.com',
        tag: 'Password-Only Prohibition Bar'
      }
    ],
    shows: [
      {
        id: 'yyc-s1',
        title: 'Theatre Calgary: The Great Gatsby',
        venue: 'Arts Commons (Max Bell Theatre)',
        neighborhood: 'Downtown Cultural District',
        category: 'Theatre',
        dates: 'Tue - Sun • 7:30 PM (Matinees 2:00 PM)',
        ticketPriceRange: '$45 - $135',
        ticketUrl: 'https://www.theatrecalgary.com',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald'
      },
      {
        id: 'yyc-s2',
        title: 'Calgary Philharmonic Orchestra: Beethoven Symphony No. 9',
        venue: 'Jack Singer Concert Hall',
        neighborhood: 'Arts Commons',
        category: 'Symphony',
        dates: 'Friday & Saturday • 7:30 PM',
        ticketPriceRange: '$38 - $110',
        ticketUrl: 'https://calgaryphil.com',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Selling Fast',
        badgeColor: 'amber'
      },
      {
        id: 'yyc-s3',
        title: 'Saddledome Live: Dua Lipa - Radical Optimism Tour',
        venue: 'Scotiabank Saddledome',
        neighborhood: 'Stampede Park / Victoria Park',
        category: 'Concert',
        dates: 'Next Month • 8:00 PM',
        ticketPriceRange: '$85 - $295',
        ticketUrl: 'https://www.ticketmaster.ca',
        ticketPlatform: 'Ticketmaster',
        availabilityStatus: 'Limited VIP',
        badgeColor: 'purple'
      },
      {
        id: 'yyc-s4',
        title: 'Jubilee Auditorium: Wicked Broadway National Tour',
        venue: 'Southern Alberta Jubilee Auditorium',
        neighborhood: 'SAIT / North Hill',
        category: 'Theatre',
        dates: 'Wed - Sun • 8:00 PM & 2:00 PM',
        ticketPriceRange: '$65 - $180',
        ticketUrl: 'https://www.ticketmaster.ca',
        ticketPlatform: 'Ticketmaster',
        availabilityStatus: 'Selling Fast',
        badgeColor: 'amber'
      },
      {
        id: 'yyc-s5',
        title: 'Loose Moose Theatre: Improv Comedy Championship',
        venue: 'Loose Moose Theatre',
        neighborhood: 'Crossroads Market Complex',
        category: 'Comedy',
        dates: 'Friday & Saturday • 8:00 PM & 10:30 PM',
        ticketPriceRange: '$18 - $25',
        ticketUrl: 'https://loosemoose.com',
        ticketPlatform: 'Showpass',
        availabilityStatus: 'Walk-ins Welcome',
        badgeColor: 'cyan'
      }
    ],
    hotels: [
      {
        id: 'yyc-h1',
        name: 'The Dorian, Autograph Collection',
        neighborhood: 'Downtown / 5th Ave SW',
        rating: 4.9,
        reviewCount: 850,
        pricePerNight: '$285 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/the-dorian-autograph-collection.html',
        bookingPlatform: 'Booking.com',
        amenities: ['The Wilde Rooftop Dining', 'Bespoke Gin Trolley', 'Fitness Centre', 'Pet Friendly'],
        tag: 'Boutique Luxury Rooftop',
        description: 'Oscar Wilde inspired British whimsy meets Calgary skyline elegance with award-winning 27th floor rooftop cocktails.'
      },
      {
        id: 'yyc-h2',
        name: 'Fairmont Palliser',
        neighborhood: 'Downtown / 9th Ave SW',
        rating: 4.8,
        reviewCount: 3200,
        pricePerNight: '$310 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/the-fairmont-palliser.html',
        bookingPlatform: 'Booking.com',
        amenities: ['Hawthorn Dining Room', 'RnR Wellness Spa', 'Indoor Saltwater Pool', 'Valet Parking'],
        tag: 'Historic Landmark Grandeur',
        description: 'Calgary’s premier historic railway hotel since 1914, seamlessly modernized with luxury spa amenities and direct transit access.'
      },
      {
        id: 'yyc-h3',
        name: 'Hotel Arts',
        neighborhood: 'Victoria Park / Beltline',
        rating: 4.7,
        reviewCount: 2100,
        pricePerNight: '$220 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/hotel-arts.html',
        bookingPlatform: 'Booking.com',
        amenities: ['Artisan Pool & Licensed Patio', 'Yellow Door Bistro', 'Freestyle Fitness', 'Urban Cruiser Bikes'],
        tag: 'Urban Designer Pool Oasis',
        description: 'Vibrant boutique hotel featuring a heated outdoor pool patio with all-season inflatable dome and chef-driven dining.'
      }
    ],
    experiences: [
      {
        id: 'yyc-e1',
        title: 'Banff, Lake Louise & Moraine Lake All-Day Alpine Tour',
        operator: 'Rocky Mountain Heritage Excursions',
        category: 'Nature & Wildlife',
        duration: '9.5 Hours',
        rating: 4.9,
        reviewCount: 4100,
        priceFrom: '$145 / person',
        bookingUrl: 'https://www.viator.com/Calgary/d817-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Guaranteed Moraine Lake & Lake Louise entry', 'Banff Town landmark stops', 'Scenic Bow Valley Parkway drive'],
        badge: 'Canada #1 Best Seller'
      },
      {
        id: 'yyc-e2',
        title: 'Drumheller Dinosaur Badlands & Royal Tyrrell Museum Excursion',
        operator: 'Badlands Explorers Canada',
        category: 'Sightseeing',
        duration: '8 Hours',
        rating: 4.9,
        reviewCount: 1350,
        priceFrom: '$115 / person',
        bookingUrl: 'https://www.viator.com/Calgary/d817-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Royal Tyrrell Museum fossil galleries', 'Horsethief Canyon lookout', 'Historic Hoodoos walking loop'],
        badge: 'Alberta Badlands Classic'
      },
      {
        id: 'yyc-e3',
        title: 'Calgary Downtown Food & Craft Brewery Crawl',
        operator: 'YYC Food & Ale Tours',
        category: 'Food Tour',
        duration: '3.5 Hours',
        rating: 4.8,
        reviewCount: 920,
        priceFrom: '$79 / person',
        bookingUrl: 'https://www.viator.com/Calgary/d817-ttd',
        bookingPlatform: 'Viator',
        highlights: ['4 chef-tasting stops in Inglewood & Beltline', 'Craft beer flights & cocktail pairings', 'Behind-the-scenes distillery tour'],
        badge: 'Culinary Insider Favorite'
      },
      {
        id: 'yyc-e4',
        title: 'Canadian Rockies Helicopter Glacier Flight from Kananaskis',
        operator: 'Alpine Helicopters',
        category: 'Helicopter / Cruise',
        duration: '30 - 50 Mins',
        rating: 5.0,
        reviewCount: 1850,
        priceFrom: '$240 / person',
        bookingUrl: 'https://www.viator.com/Calgary/d817-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Fly over Mount Assiniboine & continental divide', 'Aerial view of turquoise glacier lakes', 'Pilot audio narration'],
        badge: 'Bucket List Experience'
      },
      {
        id: 'yyc-e5',
        title: 'SkiBig3: Banff Sunshine, Lake Louise & Mt Norquay Tri-Area Pass',
        operator: 'SkiBig3 Alberta Rockies',
        category: 'Ski & Alpine Resort',
        duration: 'Multi-Day / Season',
        rating: 4.9,
        reviewCount: 2800,
        priceFrom: '$169 / day pass',
        bookingUrl: 'https://www.skibig3.com',
        bookingPlatform: 'SkiBig3',
        highlights: ['8,000+ skiable acres across 3 iconic resorts', 'Free ski bus shuttles from Banff & Lake Louise hotels', 'Champagne dry powder with 7-month winter season'],
        badge: 'Canada #1 Ski Pass'
      },
      {
        id: 'yyc-e6',
        title: 'Banff Gondola Summit Experience & Sulphur Mountain Boardwalk',
        operator: 'Pursuit Banff Jasper Collection',
        category: 'Mountain Sightseeing',
        duration: '2 - 3 Hours',
        rating: 4.8,
        reviewCount: 5200,
        priceFrom: '$68 / person',
        bookingUrl: 'https://www.viator.com/Calgary/d817-ttd',
        bookingPlatform: 'Viator',
        highlights: ['360° Canadian Rockies panoramic summit views', 'Above-the-clouds rooftop observation deck & Sky Bistro', 'Self-guided Sulphur Mountain boardwalk trail'],
        badge: 'Must-See Rockies Icon'
      }
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
        tag: 'Calgary Waterfront Jewel'
      },
      {
        id: 'yyc-o2',
        name: 'Nose Hill Park & Medicine Wheel Vista',
        neighborhood: 'NW Calgary (Between Shaganappi & 14th St)',
        category: 'Hiking Trail',
        distanceOrSize: '1,129 Hectares (One of NA’s largest urban parks)',
        difficulty: 'Moderate Trail',
        features: ['Panoramic Rocky Mountain & Skyline Views', 'Native Fescue Grassland', 'Off-leash Dog Zones'],
        parkingTips: '14th Street NW or Shaganappi Trail parking lots.',
        bestTime: 'Sunset for glowing skyline panoramas against the Rockies.',
        tag: 'Massive Urban Prairie Park'
      },
      {
        id: 'yyc-o3',
        name: 'Fish Creek Provincial Park',
        neighborhood: 'South Calgary',
        category: 'Urban Park',
        distanceOrSize: '1,348 Hectares (100+ km of trails)',
        difficulty: 'Easy Stroll',
        features: ['Bow Valley Ranche Restaurant', 'Sikome Lake Aquatic Facility', 'Paved Cycling Pathways', 'Birdwatching'],
        parkingTips: 'Bow Valley Ranche or Shannon Terrace parking areas.',
        bestTime: 'Afternoon for family cycling and valley forest strolls.',
        tag: 'Provincial Park Oasis'
      },
      {
        id: 'yyc-o4',
        name: 'Scotsman’s Hill Skyline Lookout',
        neighborhood: 'Ramsay / Southeast Calgary',
        category: 'Lookout Point',
        distanceOrSize: '1.5 km Hilltop Walk',
        difficulty: 'Easy Stroll',
        features: ['Unobstructed Saddledome & Skyline View', 'Sunset Bench Seating', 'Stairs for Cardio Workouts'],
        parkingTips: 'Free street parking along Salisbury Avenue SE.',
        bestTime: 'Dusk to watch downtown skyscrapers light up in neon.',
        tag: 'Top City Postcard View'
      }
    ],
    transitLines: [
      {
        id: 'yyc-t1',
        lineName: 'CTrain Red Line (Tuscany - Somerset-Bridlewood)',
        systemName: 'Calgary Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Frequent 5-minute service active. Free Downtown 7th Ave Fare Zone in effect.',
        updatedMinutesAgo: 2
      },
      {
        id: 'yyc-t2',
        lineName: 'CTrain Blue Line (69th St - Saddletowne)',
        systemName: 'Calgary Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'All trains operating on schedule through City Hall and West Calgary.',
        updatedMinutesAgo: 4
      },
      {
        id: 'yyc-t3',
        lineName: 'Route 300 Airport - Downtown Direct Express',
        systemName: 'Calgary Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Direct rapid bus link between YYC Airport Terminal and Downtown 7th Ave Core.',
        updatedMinutesAgo: 6
      },
      {
        id: 'yyc-t4',
        lineName: 'MAX Purple Rapid Bus Line (Downtown - East Hills)',
        systemName: 'Calgary Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Dedicated transitway lanes operating on 10-minute headway frequency.',
        updatedMinutesAgo: 8
      }
    ],
    civicServices: [
      {
        id: 'yyc-c1',
        title: 'Calgary 311 Online Service Request',
        department: 'City of Calgary Civic Services',
        actionText: 'Report an Issue (311)',
        actionUrl: 'https://www.calgary.ca/311.html',
        description: 'Snow clearing notices, street sweeping, green cart schedule, and property bylaws.',
        phone: '311 (403-268-2489)'
      }
    ]
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
        title: 'Ontario Line Subway Construction Reaches Queen & Yonge Station Milestone',
        source: 'Toronto Star',
        category: 'Civic',
        url: 'https://www.thestar.com',
        timeAgo: '30 mins ago',
        summary: 'Underground cavern excavation links the future Ontario Line with TTC Line 1 interchange.',
        expandedDetails: {
          keyTakeaways: [
            'Tunnel boring machines complete critical lower concourse drilling beneath Queen Street.',
            'Direct underground transfers to Line 1 will handle 388,000 daily passenger trips once open.',
            'Automated driverless trains scheduled for delivery next year.'
          ],
          localImpact: 'Queen Street pedestrian walkway remains open between Yonge and Bay with active wayfinding.',
          timeline: 'Structural platform work scheduled through 2028.'
        }
      },
      {
        id: 'yyz-n2',
        title: 'Bay Street Fintech Corridors See Surge in Green Tech and AI Listings',
        source: 'Globe and Mail / Report on Business',
        category: 'Finance',
        url: 'https://www.theglobeandmail.com/business',
        timeAgo: '2 hours ago',
        summary: 'Toronto Stock Exchange welcomes 14 new technology listings and AI venture fund raises.',
        expandedDetails: {
          keyTakeaways: [
            'Toronto holds second-largest financial and banking hub status in North America.',
            'Over $1.2B in venture funding deployed into Toronto-Waterloo corridor AI startups this quarter.',
            'Major institutional pension funds expand private market green infrastructure investments.'
          ],
          localImpact: 'Accelerates commercial office leasing demand in the Financial District and South Core.',
          timeline: 'Q3 economic data releases upcoming.'
        }
      },
      {
        id: 'yyz-n3',
        title: 'MaRS Discovery District Launches Autonomous Systems & Healthcare AI Accelerator',
        source: 'BetaKit Toronto',
        category: 'Technology',
        url: 'https://betakit.com',
        timeAgo: '4 hours ago',
        summary: 'Partnership with University of Toronto and Vector Institute injects $60M into medical diagnostics AI.',
        expandedDetails: {
          keyTakeaways: [
            '50 clinical trials in generative AI oncology diagnostics set to launch across University Health Network (UHN).',
            'Incubator space expands in the Discovery District along College & University.',
            'Attracts international talent under the Global Skills visa strategy.'
          ],
          localImpact: 'Strengthens Toronto’s position as a global leader in ethical AI and biotech healthcare commercialization.',
          timeline: 'Cohort begins operations next month.'
        }
      },
      {
        id: 'yyz-n4',
        title: 'Toronto City Council Approves Waterfront Light Rail Transit Expansion',
        source: 'City of Toronto Newsroom',
        category: 'Government',
        url: 'https://www.toronto.ca',
        timeAgo: '6 hours ago',
        summary: 'New dedicated light rail tracks will connect Union Station directly to East Bayfront and Port Lands.',
        expandedDetails: {
          keyTakeaways: [
            'Fully funded $2.1B transit project to service the naturalized Don River mouth development.',
            'Underground transit tunnel from Union Station loop under Bay Street.',
            'New surface stations at Sugar Beach, Queens Quay East, and Villiers Island.'
          ],
          localImpact: 'Provides zero-emission rapid transit for 45,000 new residents and tech workers in the Port Lands.',
          timeline: 'Utility relocation starts Q4 2026.'
        }
      }
    ],
    sports: [
      {
        id: 'yyz-sp1',
        team: 'Toronto Maple Leafs',
        opponent: 'Montreal Canadiens (Original 6)',
        league: 'NHL',
        status: 'Upcoming',
        gameTime: 'Saturday • 7:00 PM',
        tvBroadcast: 'CBC / Sportsnet',
        isHome: true
      },
      {
        id: 'yyz-sp2',
        team: 'Toronto Raptors',
        opponent: 'Boston Celtics',
        league: 'NBA',
        status: 'Upcoming',
        gameTime: 'Friday • 7:30 PM',
        tvBroadcast: 'TSN 1/4',
        isHome: true
      },
      {
        id: 'yyz-sp3',
        team: 'Toronto Blue Jays',
        opponent: 'New York Yankees',
        league: 'MLB',
        status: 'Final',
        score: '6 - 4 (W)',
        tvBroadcast: 'Sportsnet',
        isHome: true
      },
      {
        id: 'yyz-sp4',
        team: 'Toronto FC',
        opponent: 'CF Montréal',
        league: 'MLS',
        status: 'Upcoming',
        gameTime: 'Saturday • 7:30 PM',
        tvBroadcast: 'Apple TV (MLS Season Pass)',
        isHome: true
      },
      {
        id: 'yyz-sp5',
        team: 'Toronto Argonauts',
        opponent: 'Hamilton Tiger-Cats',
        league: 'CFL',
        status: 'Upcoming',
        gameTime: 'Monday • 1:00 PM',
        tvBroadcast: 'TSN 1/3',
        isHome: false
      }
    ],
    restaurants: [
      {
        id: 'yyz-r1',
        name: 'Alo Restaurant',
        cuisine: 'Contemporary French Tasting Menu',
        neighborhood: 'Queen West & Spadina (Victorian Top Floor)',
        priceLevel: '$$$$',
        rating: 4.9,
        reviewCount: 2800,
        signatureDish: 'Hokkaido Sea Urchin & Roasted Squab',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/alo-restaurant-toronto',
        availableTimes: ['5:00 PM', '8:30 PM'],
        tag: 'Michelin 1-Star & Canada’s Best'
      },
      {
        id: 'yyz-r2',
        name: 'Canoe',
        cuisine: 'Contemporary Canadian & High-Altitude Views',
        neighborhood: 'Financial District / TD Bank Tower (54th Floor)',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 3900,
        signatureDish: 'Alberta Venison Loin & Ontario Tamarack Duck',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/canoe-toronto',
        availableTimes: ['5:30 PM', '7:45 PM', '9:15 PM'],
        tag: 'Iconic 54th Floor Skyline Views'
      },
      {
        id: 'yyz-r3',
        name: 'Pai Northern Thai Kitchen',
        cuisine: 'Authentic Chiang Mai Street Food',
        neighborhood: 'Entertainment District / Duncan St',
        priceLevel: '$$',
        rating: 4.8,
        reviewCount: 9200,
        signatureDish: 'Khao Soi Curry & Chef Nuit Pad Thai',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/pai-northern-thai-kitchen-toronto',
        availableTimes: ['4:45 PM', '6:30 PM', '8:45 PM', '9:45 PM'],
        tag: 'Michelin Bib Gourmand'
      },
      {
        id: 'yyz-r4',
        name: 'Richmond Station',
        cuisine: 'Ingredient-Driven Canadian & Kitchen Table',
        neighborhood: 'Financial District / Richmond St W',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 4600,
        signatureDish: 'Station Burger on Milk Bun & Chef Tasting Menu',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/richmond-station-toronto',
        availableTimes: ['5:15 PM', '7:00 PM', '8:30 PM'],
        tag: 'Top Chef Canada Winner'
      },
      {
        id: 'yyz-r5',
        name: 'Bar Raval',
        cuisine: 'Spanish Tapas, Pintxos & Craft Cocktails',
        neighborhood: 'Little Italy / College & Palmerston',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 3400,
        signatureDish: 'House-Cured Boquerones & Basque Cheesecake',
        bookingPlatform: 'Direct',
        reservationUrl: 'https://www.thisisbarraval.com',
        availableTimes: ['Walk-in Only Bar', 'Late Night Tapas'],
        tag: 'World’s 50 Best Bars'
      },
      {
        id: 'yyz-r6',
        name: 'Don Alfonso 1890',
        cuisine: 'Amalfi Coast Fine Dining & Seafood',
        neighborhood: 'Harbourfront (Westin Harbour Castle Top Floor)',
        priceLevel: '$$$$',
        rating: 4.9,
        reviewCount: 1800,
        signatureDish: 'Macaroni Souffle with Smoked Mozzarella',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/don-alfonso-1890-toronto',
        availableTimes: ['5:30 PM', '8:00 PM'],
        tag: 'Michelin 1-Star & Lake Views'
      },
      {
        id: 'yyz-r7',
        name: 'Prime Seafood Palace',
        cuisine: 'Matty Matheson Elevated Steak & Seafood',
        neighborhood: 'Queen West / Strachan',
        priceLevel: '$$$$',
        rating: 4.7,
        reviewCount: 1500,
        signatureDish: 'Bone-in Prime Rib & Caviar Ice Cream',
        bookingPlatform: 'Resy',
        reservationUrl: 'https://resy.com/cities/toronto-on/venues/prime-seafood-palace',
        availableTimes: ['5:00 PM', '7:30 PM', '9:45 PM'],
        tag: 'Architectural Wood Sanctuary'
      },
      {
        id: 'yyz-r8',
        name: 'Terroni Adelaide',
        cuisine: 'Southern Italian Pizza & Handmade Pasta',
        neighborhood: 'Financial District / Historic Courthouse',
        priceLevel: '$$$',
        rating: 4.7,
        reviewCount: 5200,
        signatureDish: 'Spaghetti al Limone & Pizza San Giorgio',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/terroni-adelaide-toronto',
        availableTimes: ['5:15 PM', '6:45 PM', '8:30 PM'],
        tag: 'Historic 1853 Courthouse Setting'
      }
    ],
    nightlife: [
      {
        id: 'yyz-nl1',
        name: 'BarChef',
        category: 'Cocktail Lounge',
        neighborhood: 'Queen West',
        vibe: 'Atmospheric molecular cocktail laboratory using essential oils, dry ice aromatics, and vintage bitters',
        coverOrVip: 'Reservation highly recommended • Cocktails $20 - $55',
        hours: 'Daily • 5:00 PM - 2:00 AM',
        guestlistUrl: 'https://barchef.com',
        tag: 'Pioneering Molecular Mixology'
      },
      {
        id: 'yyz-nl2',
        name: 'Rebel Nightclub',
        category: 'Nightclub',
        neighborhood: 'Port Lands / Polson Pier',
        vibe: 'Massive 45,000 sq ft waterfront mega-club featuring 65-foot interactive stage, laser shows, and world-class headliner DJs',
        coverOrVip: '$25 - $60 • VIP Table Bottle Service',
        hours: 'Sat • 10:00 PM - 3:00 AM',
        guestlistUrl: 'https://rebeltoronto.com',
        tag: 'Canada’s Largest Nightclub'
      },
      {
        id: 'yyz-nl3',
        name: 'Mahjong Bar',
        category: 'Speakeasy',
        neighborhood: 'Dundas West / Trinity Bellwoods',
        vibe: 'Hidden pink neon bodega entrance leading to an opulent glowing cocktail lounge with Chinese sharing bites',
        coverOrVip: 'No cover • Arrive early on weekends',
        hours: 'Tue - Sun • 5:00 PM - 2:00 AM',
        guestlistUrl: 'https://mahjongbar.com',
        tag: 'Secret Bodega Speakeasy'
      },
      {
        id: 'yyz-nl4',
        name: 'The Drake Underground',
        category: 'Live Music & Dance',
        neighborhood: 'West Queen West',
        vibe: 'Basement indie music and cultural venue with live bands, vinyl DJs, and craft cocktails',
        coverOrVip: '$10 - $25 at door',
        hours: 'Daily • 7:00 PM - 2:00 AM',
        guestlistUrl: 'https://thedrake.ca/underground',
        tag: 'Queen West Indie Institution'
      }
    ],
    shows: [
      {
        id: 'yyz-s1',
        title: 'Mirvish: The Lion King Broadway Spectacular',
        venue: 'Princess of Wales Theatre',
        neighborhood: 'Entertainment District / King St W',
        category: 'Theatre',
        dates: 'Tue - Sun • 7:30 PM & 2:00 PM',
        ticketPriceRange: '$69 - $235',
        ticketUrl: 'https://www.mirvish.com',
        ticketPlatform: 'Mirvish',
        availabilityStatus: 'Selling Fast',
        badgeColor: 'amber'
      },
      {
        id: 'yyz-s2',
        title: 'Toronto Symphony Orchestra: Mahler Symphony No. 5',
        venue: 'Roy Thomson Hall',
        neighborhood: 'Financial District / King St W',
        category: 'Symphony',
        dates: 'Thursday & Saturday • 8:00 PM',
        ticketPriceRange: '$45 - $145',
        ticketUrl: 'https://www.tso.ca',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald'
      },
      {
        id: 'yyz-s3',
        title: 'Scotiabank Arena Live: Billie Eilish - Hit Me Hard and Soft Tour',
        venue: 'Scotiabank Arena',
        neighborhood: 'Downtown / Union Station',
        category: 'Concert',
        dates: 'Next Month • 8:00 PM',
        ticketPriceRange: '$110 - $420',
        ticketUrl: 'https://www.ticketmaster.ca',
        ticketPlatform: 'Ticketmaster',
        availabilityStatus: 'Almost Sold Out',
        badgeColor: 'rose'
      },
      {
        id: 'yyz-s4',
        title: 'Mirvish: Hamilton Broadway Musical',
        venue: 'Royal Alexandra Theatre',
        neighborhood: 'King Street Theatre District',
        category: 'Theatre',
        dates: 'Tue - Sun • 8:00 PM & 2:00 PM',
        ticketPriceRange: '$75 - $250',
        ticketUrl: 'https://www.mirvish.com',
        ticketPlatform: 'Mirvish',
        availabilityStatus: 'Limited VIP',
        badgeColor: 'purple'
      },
      {
        id: 'yyz-s5',
        title: 'The Second City: Improv Mainstage Show',
        venue: 'The Second City Toronto',
        neighborhood: 'Danforth / One York',
        category: 'Comedy',
        dates: 'Tue - Sun • 7:30 PM & 10:00 PM',
        ticketPriceRange: '$35 - $65',
        ticketUrl: 'https://www.secondcity.com/toronto',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Walk-ins Welcome',
        badgeColor: 'cyan'
      }
    ],
    hotels: [
      {
        id: 'yyz-h1',
        name: '1 Hotel Toronto',
        neighborhood: 'King West',
        rating: 4.9,
        reviewCount: 1100,
        pricePerNight: '$460 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/1-hotel-toronto.html',
        bookingPlatform: 'Booking.com',
        amenities: ['Harriet’s Rooftop Pool & Lounge', '1 Kitchen Organic Dining', 'Field House Gym', 'Tesla Chauffeur'],
        tag: 'Eco-Luxury Urban Sanctuary',
        description: 'Sustainable luxury hotel crafted with reclaimed Ontario timber, lush greenery, and rooftop pool overlooking CN Tower.'
      },
      {
        id: 'yyz-h2',
        name: 'Fairmont Royal York',
        neighborhood: 'Downtown / Front St (Opposite Union Station)',
        rating: 4.8,
        reviewCount: 6800,
        pricePerNight: '$380 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/fairmont-royal-york.html',
        bookingPlatform: 'Booking.com',
        amenities: ['Clockwork Champagne Bar', 'Reign Restaurant', 'Fairmont Gold Lounge', 'Indoor Pool'],
        tag: 'Toronto Historic Palace',
        description: 'Iconic grand railway hotel celebrating a century of royal luxury, completely renovated with glamorous modern cocktail salons.'
      },
      {
        id: 'yyz-h3',
        name: 'The Hazelton Hotel',
        neighborhood: 'Yorkville / Yorkville Ave',
        rating: 4.9,
        reviewCount: 950,
        pricePerNight: '$520 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/the-hazelton.html',
        bookingPlatform: 'Booking.com',
        amenities: ['ONE Restaurant by Mark McEwan', 'Valmont Spa', 'Private Silver Screening Room', 'Marble Bathrooms'],
        tag: 'Yorkville 5-Star Prestige',
        description: 'Toronto’s premier boutique luxury address located steps from Bloor Street designer fashion houses.'
      }
    ],
    experiences: [
      {
        id: 'yyz-e1',
        title: 'Niagara Falls Luxury Day Tour with Hornblower Boat Cruise from Toronto',
        operator: 'Niagara Day Tour Excursions',
        category: 'Sightseeing',
        duration: '9.5 Hours',
        rating: 4.9,
        reviewCount: 6500,
        priceFrom: '$99 / person',
        bookingUrl: 'https://www.viator.com/Toronto/d623-ttd',
        bookingPlatform: 'Viator',
        highlights: ['VIP skip-the-line Hornblower Niagara boat cruise', 'Niagara-on-the-Lake historic town stop', 'Maple syrup & winery tasting'],
        badge: 'Ontario #1 Must-Do'
      },
      {
        id: 'yyz-e2',
        title: 'CN Tower EdgeWalk & Toronto Harbor 360 Cruise',
        operator: 'CN Tower & Mariposa Cruises',
        category: 'Sightseeing',
        duration: '3.5 Hours',
        rating: 4.9,
        reviewCount: 3800,
        priceFrom: '$195 / person',
        bookingUrl: 'https://www.viator.com/Toronto/d623-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Hands-free walk around 116-storey tower ledge', 'Observation deck access included', 'Lake Ontario skyline cruise ticket'],
        badge: 'Extreme Adrenaline Hit'
      },
      {
        id: 'yyz-e3',
        title: 'Kensington Market & Chinatown Cultural Food Walking Tour',
        operator: 'Chopsticks+Forks Culinary Tours',
        category: 'Food Tour',
        duration: '3.5 Hours',
        rating: 4.9,
        reviewCount: 2100,
        priceFrom: '$79 / person',
        bookingUrl: 'https://www.viator.com/Toronto/d623-ttd',
        bookingPlatform: 'Viator',
        highlights: ['6 multi-cultural food tastings (dumplings, empanadas, churros, cheese)', 'Vintage market lane history', 'Local culinary guide'],
        badge: 'Toronto Cultural Essential'
      },
      {
        id: 'yyz-e4',
        title: 'Distillery Historic District & Segway History Tour',
        operator: 'Go Tours Canada',
        category: 'Sightseeing',
        duration: '1.5 Hours',
        rating: 4.8,
        reviewCount: 1400,
        priceFrom: '$49 / person',
        bookingUrl: 'https://www.viator.com/Toronto/d623-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Glide through 1832 Victorian industrial cobblestones', 'Gooderham & Worts whiskey history', 'Chocolate tasting stop'],
        badge: 'Top Rated Urban Tour'
      }
    ],
    outdoors: [
      {
        id: 'yyz-o1',
        name: 'High Park & Grenadier Pond Trails',
        neighborhood: 'West End / Bloor West',
        category: 'Urban Park',
        distanceOrSize: '161 Hectares (Spring Cherry Blossoms)',
        difficulty: 'Easy Stroll',
        features: ['Spring Sakura Cherry Blossom Groves', 'High Park Zoo', 'Grenadier Pond Boardwalk', 'Off-leash Dog Park'],
        parkingTips: 'Free parking inside park gates or take TTC High Park subway.',
        bestTime: 'Early morning for tranquility; Spring for cherry blossom walks.',
        tag: 'Toronto’s Largest Public Park'
      },
      {
        id: 'yyz-o2',
        name: 'Toronto Islands & Ward’s Island Boardwalk',
        neighborhood: 'Toronto Harbour (Ferry Access)',
        category: 'Beach & Waterfront',
        distanceOrSize: '15 Islands Connected by Bridges (Bike Loop)',
        difficulty: 'Easy Stroll',
        features: ['Breathtaking Downtown Skyline Panorama', 'Blue Flag Sand Beaches', 'Bicycle Rentals', 'Centreville Amusement Park'],
        parkingTips: 'Take Jack Layton Ferry Terminal ferry from foot of Bay Street.',
        bestTime: 'Sunset from the ferry return ride overlooking lit-up skyline.',
        tag: 'Car-Free Island Retreat'
      },
      {
        id: 'yyz-o3',
        name: 'Scarborough Bluffs & Cathedral Bluffs Park',
        neighborhood: 'Scarborough Waterfront',
        category: 'Lookout Point',
        distanceOrSize: '15 km Coastal Escarpment (90m Cliffs)',
        difficulty: 'Moderate Trail',
        features: ['Dramatic White Clay Cliffs', 'Bluffer’s Park Beach & Marina', 'Turquoise Lake Ontario Views'],
        parkingTips: 'Bluffer’s Park Lower Lot (arrives early on sunny weekends).',
        bestTime: 'Morning light for photography against blue waters.',
        tag: 'Dramatic Coastal Bluffs'
      },
      {
        id: 'yyz-o4',
        name: 'Trinity Bellwoods Park',
        neighborhood: 'Queen West / Dundas West',
        category: 'Urban Park',
        distanceOrSize: '15 Hectares Valley Park',
        difficulty: 'Easy Stroll',
        features: ['Garrison Creek Ravine Basin', 'Tennis Courts & Baseball Diamond', 'Famous Dog Bowl Area', 'Picnic Scene'],
        parkingTips: 'Take 501 Queen or 505 Dundas streetcars directly to gates.',
        bestTime: 'Saturday afternoon for vibrant neighborhood picnic culture.',
        tag: 'Queen West Social Hub'
      }
    ],
    transitLines: [
      {
        id: 'yyz-t1',
        lineName: 'TTC Line 1 (Yonge-University Subway)',
        systemName: 'Toronto Transit Commission',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'High frequency subway service operating every 2-3 minutes through Union & Bloor.',
        updatedMinutesAgo: 1
      },
      {
        id: 'yyz-t2',
        lineName: 'TTC Line 2 (Bloor-Danforth Subway)',
        systemName: 'Toronto Transit Commission',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'East-west rapid transit operating on schedule from Kipling to Kennedy.',
        updatedMinutesAgo: 3
      },
      {
        id: 'yyz-t3',
        lineName: 'UP Express (Union Pearson Express)',
        systemName: 'Metrolinx',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Direct 25-minute train link between Toronto Pearson Airport (YYZ) and Union Station.',
        updatedMinutesAgo: 4
      },
      {
        id: 'yyz-t4',
        lineName: '501 Queen Streetcar & 504 King Transitway',
        systemName: 'TTC Surface Rail',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Low-floor streetcar service active along Queen and King Street Priority Corridor.',
        updatedMinutesAgo: 6
      }
    ],
    civicServices: [
      {
        id: 'yyz-c1',
        title: 'City of Toronto 311 Services',
        department: 'City of Toronto Civic Services',
        actionText: 'Submit 311 Service Request',
        actionUrl: 'https://www.toronto.ca/home/311-toronto-at-your-service/',
        description: 'Pothole repairs, waste collection, park maintenance, road closures, and municipal bylaws.',
        phone: '311 (416-392-2489)'
      }
    ]
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
        title: 'Broadway Subway Millennium Line Extension Tunnel Breakthrough Achieved',
        source: 'Vancouver Sun',
        category: 'Civic',
        url: 'https://vancouversun.com',
        timeAgo: '45 mins ago',
        summary: 'Twin tunnel boring machines complete 5.7 km underground run reaching Arbutus Station.',
        expandedDetails: {
          keyTakeaways: [
            'All underground tunneling between VCC-Clark and Arbutus successfully finished.',
            'Crews transition to station track laying and electrical power substation fit-outs.',
            'Direct SkyTrain connection will move 160,000 riders daily along the health & tech corridor.'
          ],
          localImpact: 'Surface construction decks along Broadway dismantled with full road restoration.',
          timeline: 'Testing and commissioning starts 2027.'
        }
      },
      {
        id: 'yvr-n2',
        title: 'Port of Vancouver Breaks Ground on Green Hydrogen Bunkering Facility',
        source: 'Business in Vancouver',
        category: 'Maritime',
        url: 'https://biv.com',
        timeAgo: '3 hours ago',
        summary: 'Canada’s largest port accelerates clean marine fuel corridors for trans-Pacific container vessels.',
        expandedDetails: {
          keyTakeaways: [
            '$220M multi-modal green hydrogen and shore power infrastructure project begins construction.',
            'Eliminates maritime diesel idling at Burrard Inlet container berths.',
            'Positions BC as the leading green shipping hub on the Pacific coast.'
          ],
          localImpact: 'Reduces regional air emissions while creating specialized clean tech engineering careers.',
          timeline: 'Phase 1 operational by 2027.'
        }
      },
      {
        id: 'yvr-n3',
        title: 'Vancouver Creative Tech & Gaming Studios Announce AI Innovation Hubs',
        source: 'Daily Hive Vancouver',
        category: 'Technology',
        url: 'https://dailyhive.com/vancouver',
        timeAgo: '5 hours ago',
        summary: 'Gastown and Mount Pleasant visual effects studios expand sovereign AI rendering infrastructure.',
        expandedDetails: {
          keyTakeaways: [
            'BC digital media sector generates over $4.2B in annual export GDP.',
            'Major VFX studios launch generative machine-learning post-production pipelines.',
            'Collaborative talent incubator with UBC and Simon Fraser University computing science.'
          ],
          localImpact: 'Expands high-paying digital entertainment and tech software opportunities.',
          timeline: 'Active tech hiring underway.'
        }
      }
    ],
    sports: [
      {
        id: 'yvr-sp1',
        team: 'Vancouver Canucks',
        opponent: 'Edmonton Oilers (Pacific Division Rivalry)',
        league: 'NHL',
        status: 'Upcoming',
        gameTime: 'Saturday • 7:00 PM',
        tvBroadcast: 'Sportsnet Pacific / CBC',
        isHome: true
      },
      {
        id: 'yvr-sp2',
        team: 'BC Lions',
        opponent: 'Calgary Stampeders',
        league: 'CFL',
        status: 'Upcoming',
        gameTime: 'Saturday • 4:00 PM',
        tvBroadcast: 'TSN 1/3',
        isHome: true
      },
      {
        id: 'yvr-sp3',
        team: 'Vancouver Whitecaps FC',
        opponent: 'Seattle Sounders FC (Cascadia Cup)',
        league: 'MLS',
        status: 'Upcoming',
        gameTime: 'Sunday • 7:30 PM',
        tvBroadcast: 'Apple TV (MLS Season Pass)',
        isHome: true
      },
      {
        id: 'yvr-sp4',
        team: 'Vancouver Giants',
        opponent: 'Victoria Royals',
        league: 'WHL',
        status: 'Final',
        score: '4 - 2 (W)',
        tvBroadcast: 'WHL Live',
        isHome: true
      }
    ],
    restaurants: [
      {
        id: 'yvr-r1',
        name: 'Hawksworth Restaurant',
        cuisine: 'Contemporary Pacific Northwest & Fine Dining',
        neighborhood: 'Downtown / Rosewood Hotel Georgia',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 3100,
        signatureDish: 'Haida Gwaii Halibut & Confit Duck Terrine',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/hawksworth-restaurant-vancouver',
        availableTimes: ['5:30 PM', '7:15 PM', '9:00 PM'],
        tag: 'Canada’s 100 Best Hall of Fame'
      },
      {
        id: 'yvr-r2',
        name: 'Miku Vancouver',
        cuisine: 'Aburi Flame-Seared Sushi & Waterfront Dining',
        neighborhood: 'Coal Harbour / Canada Place Waterfront',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 5400,
        signatureDish: 'Aburi Salmon Oshi Sushi & Ebi Oshi',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/miku-restaurant-vancouver',
        availableTimes: ['5:00 PM', '6:45 PM', '8:30 PM'],
        tag: 'Harbourfront Sunset Dining'
      },
      {
        id: 'yvr-r3',
        name: 'Vij’s Restaurant',
        cuisine: 'Innovative Modern Indian Cuisine',
        neighborhood: 'Cambie Village / Cambie St',
        priceLevel: '$$$',
        rating: 4.7,
        reviewCount: 4200,
        signatureDish: 'Wine-Marinated Lamb Popsicles in Fenugreek Cream',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/vijs-restaurant-vancouver',
        availableTimes: ['5:15 PM', '7:00 PM', '8:45 PM'],
        tag: 'Michelin Recommended'
      },
      {
        id: 'yvr-r4',
        name: 'Published on Main',
        cuisine: 'Hyper-Local Foraged & Contemporary Canadian',
        neighborhood: 'Mount Pleasant / Main St',
        priceLevel: '$$$$',
        rating: 4.9,
        reviewCount: 1600,
        signatureDish: 'Bee Pollen Brioche & Foraged Pine Mushroom Dashi',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/published-on-main-vancouver',
        availableTimes: ['5:00 PM', '7:30 PM', '9:30 PM'],
        tag: 'Michelin 1-Star & Canada #1'
      },
      {
        id: 'yvr-r5',
        name: 'Kissa Tanto',
        cuisine: 'Italian-Japanese Fusion & 1960s Tokyo Jazz',
        neighborhood: 'Chinatown / East Pender',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 1300,
        signatureDish: 'Tajarin Pasta with Butter, Miso & Truffle',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/kissa-tanto-vancouver',
        availableTimes: ['5:15 PM', '7:45 PM', '9:45 PM'],
        tag: 'Michelin 1-Star'
      },
      {
        id: 'yvr-r6',
        name: 'L’Abattoir',
        cuisine: 'French-Infused West Coast & Historic Brick Architecture',
        neighborhood: 'Gastown / Blood Alley',
        priceLevel: '$$$',
        rating: 4.7,
        reviewCount: 2900,
        signatureDish: 'Baked Pacific Oysters with Truffle Sabayon',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/labattoir-restaurant-vancouver',
        availableTimes: ['5:30 PM', '7:00 PM', '8:45 PM'],
        tag: 'Gastown Historic Landmark'
      },
      {
        id: 'yvr-r7',
        name: 'Blue Water Cafe',
        cuisine: 'Sustainable Seafood & Raw Oyster Bar',
        neighborhood: 'Yaletown / Hamilton St',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 4800,
        signatureDish: 'Seafood Tower on Ice & Sablefish with Miso Sake Glaze',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/blue-water-cafe-vancouver',
        availableTimes: ['5:00 PM', '7:15 PM', '9:15 PM'],
        tag: 'Vancouver Seafood Gold Standard'
      },
      {
        id: 'yvr-r8',
        name: 'Osteria Savio Volpe',
        cuisine: 'Rustic Wood-Fired Italian & Handmade Pasta',
        neighborhood: 'Fraserhood / Kingsway',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 2200,
        signatureDish: 'Tortiglioni with Wild Boar Ragu & Wood-Grilled Bistecca',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/savio-volpe-vancouver',
        availableTimes: ['5:00 PM', '6:30 PM', '8:30 PM'],
        tag: 'Michelin Recommended'
      }
    ],
    nightlife: [
      {
        id: 'yvr-nl1',
        name: 'The Keefer Bar',
        category: 'Cocktail Lounge',
        neighborhood: 'Chinatown / Keefer St',
        vibe: 'Dark apothecary-themed cocktail lounge with herbal tinctures, fire-pit patio, and world-class bartenders',
        coverOrVip: 'No cover • Ranked among North America’s 50 Best Bars',
        hours: 'Daily • 4:00 PM - 2:00 AM',
        guestlistUrl: 'https://thekeeferbar.com',
        tag: 'North America’s 50 Best Bars'
      },
      {
        id: 'yvr-nl2',
        name: 'Celebrities Nightclub',
        category: 'Nightclub',
        neighborhood: 'Davie Village / West End',
        vibe: 'Iconic Vancouver high-energy dance club with state-of-the-art Funktion-One sound, LED video walls & international DJs',
        coverOrVip: '$15 - $35 • VIP table service',
        hours: 'Tue, Fri, Sat • 10:00 PM - 3:00 AM',
        guestlistUrl: 'https://celebritiesnightclub.com',
        tag: 'Iconic Dance Club'
      },
      {
        id: 'yvr-nl3',
        name: 'Guilt & Company',
        category: 'Live Music & Dance',
        neighborhood: 'Gastown / Alexander St',
        vibe: 'Subterranean stone-wall lounge featuring live soul, jazz, funk, and flamenco every single night of the week',
        coverOrVip: 'Pay-what-you-can artist donation • No guestlist required',
        hours: 'Daily • 7:00 PM - 1:00 AM',
        guestlistUrl: 'https://guiltandcompany.com',
        tag: 'Live Jazz & Soul Every Night'
      },
      {
        id: 'yvr-nl4',
        name: 'Fortune Sound Club',
        category: 'Nightclub',
        neighborhood: 'Chinatown / Pender St',
        vibe: 'Hip hop, trap, and house club built into the historic Ming’s building with legendary custom sound rig and eco-friendly design',
        coverOrVip: '$15 - $30 • VIP Booths',
        hours: 'Fri - Sun • 10:00 PM - 2:00 AM',
        guestlistUrl: 'https://fortunesoundclub.com',
        tag: 'Chinatown Underground Beats'
      }
    ],
    shows: [
      {
        id: 'yvr-s1',
        title: 'Queen Elizabeth Theatre: Wicked Broadway Tour',
        venue: 'Queen Elizabeth Theatre',
        neighborhood: 'Downtown / Hamilton St',
        category: 'Theatre',
        dates: 'Tue - Sun • 8:00 PM & 2:00 PM',
        ticketPriceRange: '$65 - $220',
        ticketUrl: 'https://www.ticketmaster.ca',
        ticketPlatform: 'Ticketmaster',
        availabilityStatus: 'Selling Fast',
        badgeColor: 'amber'
      },
      {
        id: 'yvr-s2',
        title: 'Vancouver Symphony Orchestra: Tchaikovsky Violin Concerto',
        venue: 'The Orpheum',
        neighborhood: 'Granville Entertainment District',
        category: 'Symphony',
        dates: 'Friday & Saturday • 8:00 PM',
        ticketPriceRange: '$35 - $125',
        ticketUrl: 'https://www.vancouversymphony.ca',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald'
      },
      {
        id: 'yvr-s3',
        title: 'Rogers Arena Live: Coldplay - Music of the Spheres Tour',
        venue: 'Rogers Arena',
        neighborhood: 'Downtown / False Creek',
        category: 'Concert',
        dates: 'Next Month • 7:30 PM',
        ticketPriceRange: '$95 - $350',
        ticketUrl: 'https://www.ticketmaster.ca',
        ticketPlatform: 'Ticketmaster',
        availabilityStatus: 'Almost Sold Out',
        badgeColor: 'rose'
      },
      {
        id: 'yvr-s4',
        title: 'Arts Club Theatre: Million Dollar Quartet',
        venue: 'Stanley Industrial Alliance Stage',
        neighborhood: 'South Granville',
        category: 'Theatre',
        dates: 'Wed - Sun • 7:30 PM & 2:00 PM',
        ticketPriceRange: '$39 - $98',
        ticketUrl: 'https://artsclub.com',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald'
      },
      {
        id: 'yvr-s5',
        title: 'The Comedy Department: Pro Improv & Standup',
        venue: 'Granville Island Comedy Bar',
        neighborhood: 'Granville Island',
        category: 'Comedy',
        dates: 'Friday & Saturday • 7:30 PM & 9:30 PM',
        ticketPriceRange: '$22 - $32',
        ticketUrl: 'https://thecomedydepartment.com',
        ticketPlatform: 'Eventbrite',
        availabilityStatus: 'Walk-ins Welcome',
        badgeColor: 'cyan'
      }
    ],
    hotels: [
      {
        id: 'yvr-h1',
        name: 'Rosewood Hotel Georgia',
        neighborhood: 'Downtown / West Georgia St',
        rating: 4.9,
        reviewCount: 1800,
        pricePerNight: '$490 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/rosewood-hotel-georgia.html',
        bookingPlatform: 'Booking.com',
        amenities: ['1927 Lounge & Reflections Garden', 'Sense Spa', 'Indoor Saltwater Lap Pool', 'Valet Parking'],
        tag: 'Ultra-Luxury Historic Landmark',
        description: 'Vancouver’s legendary 1927 landmark restored to pristine grandeur with heritage cocktails, Forbes 5-star spa, and luxury suites.'
      },
      {
        id: 'yvr-h2',
        name: 'Fairmont Pacific Rim',
        neighborhood: 'Coal Harbour / Waterfront',
        rating: 4.8,
        reviewCount: 4200,
        pricePerNight: '$450 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/fairmont-pacific-rim.html',
        bookingPlatform: 'Booking.com',
        amenities: ['Rooftop Pool & Cabanas', 'Botanist Restaurant', 'Willow Stream Spa', 'Harbourfront Mountain Views'],
        tag: 'Harbourfront 5-Star Resort',
        description: 'Modern luxury overlooking the North Shore mountains and harbour seaplanes with rooftop pool cabanas and world-class dining.'
      },
      {
        id: 'yvr-h3',
        name: 'The Douglas, Autograph Collection',
        neighborhood: 'Parq Vancouver / False Creek',
        rating: 4.8,
        reviewCount: 1400,
        pricePerNight: '$360 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/the-douglas-autograph-collection.html',
        bookingPlatform: 'Booking.com',
        amenities: ['6th Floor Elevated Rooftop Park', 'D/6 Bar & Lounge', 'Parq Casino Complex', 'Fitness Studio'],
        tag: 'Urban Forest Boutique Design',
        description: 'Stunning lifestyle hotel featuring a 25-foot Douglas fir reception desk and a 30,000 sq ft elevated outdoor rooftop park.'
      }
    ],
    experiences: [
      {
        id: 'yvr-e1',
        title: 'Whistler & Sea-to-Sky Gondola Excursion from Vancouver',
        operator: 'Landsea Tours & Adventures',
        category: 'Sightseeing',
        duration: '10.5 Hours',
        rating: 4.9,
        reviewCount: 5200,
        priceFrom: '$149 / person',
        bookingUrl: 'https://www.viator.com/Vancouver/d616-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Sea-to-Sky Gondola ride over Howe Sound', 'Shannon Falls waterfall walk', 'Whistler Village alpine exploration'],
        badge: 'BC #1 Best Seller'
      },
      {
        id: 'yvr-e2',
        title: 'Capilano Suspension Bridge & Treetops Adventure',
        operator: 'Capilano Park Excursions',
        category: 'Nature & Wildlife',
        duration: '3.5 Hours',
        rating: 4.8,
        reviewCount: 8900,
        priceFrom: '$69 / person',
        bookingUrl: 'https://www.viator.com/Vancouver/d616-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Walk 230 ft above Capilano River canyon', 'Cliffwalk granite precipice walk', 'Free downtown shuttle transfer'],
        badge: 'Vancouver Icon'
      },
      {
        id: 'yvr-e3',
        title: 'Vancouver Wild Orca & Whale Watching Zodiac Safari',
        operator: 'Prince of Whales Whale Watching',
        category: 'Nature & Wildlife',
        duration: '4 Hours',
        rating: 4.9,
        reviewCount: 3100,
        priceFrom: '$165 / person',
        bookingUrl: 'https://www.viator.com/Vancouver/d616-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Spot killer whales, humpbacks & sea lions', 'Salish Sea marine biologist guide', 'Comfortable high-speed catamaran'],
        badge: 'Marine Wildlife Must-Do'
      },
      {
        id: 'yvr-e4',
        title: 'Vancouver Harbour Panorama Seaplane Tour',
        operator: 'Harbour Air Seaplanes',
        category: 'Helicopter / Cruise',
        duration: '20 - 45 Mins',
        rating: 4.9,
        reviewCount: 2200,
        priceFrom: '$145 / person',
        bookingUrl: 'https://www.viator.com/Vancouver/d616-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Water takeoff from Coal Harbour', 'Aerial views of Stanley Park & Lions Gate Bridge', 'North Shore mountain flyover'],
        badge: 'Iconic West Coast Flight'
      },
      {
        id: 'yvr-e5',
        title: 'Whistler Blackcomb Ski Resort Lift Tickets & Peak 2 Peak Gondola',
        operator: 'Vail Resorts / Whistler Blackcomb',
        category: 'Ski & Alpine Resort',
        duration: 'Full Day / Multi-Day',
        rating: 4.9,
        reviewCount: 9400,
        priceFrom: '$199 / day pass',
        bookingUrl: 'https://www.whistlerblackcomb.com',
        bookingPlatform: 'WhistlerEpicPass',
        highlights: ['North America’s largest ski resort (8,171 acres & 200+ runs)', 'World record-breaking Peak 2 Peak 360° gondola span', 'Vibrant pedestrian alpine village with après-ski dining'],
        badge: 'World #1 Ski Destination'
      },
      {
        id: 'yvr-e6',
        title: 'Grouse Mountain Skyride & Mountaintop Alpine Adventure',
        operator: 'Grouse Mountain Resort',
        category: 'Mountain Sightseeing',
        duration: '3 - 5 Hours',
        rating: 4.8,
        reviewCount: 6800,
        priceFrom: '$75 / person',
        bookingUrl: 'https://www.viator.com/Vancouver/d616-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Scenic North Shore Skyride gondola ascent', 'Grizzly bear refuge & lumberjack show in summer; Night skiing in winter', 'The Observatory mountaintop dining overlooking Vancouver'],
        badge: 'The Peak of Vancouver'
      }
    ],
    outdoors: [
      {
        id: 'yvr-o1',
        name: 'Stanley Park Seawall & Totem Poles Loop',
        neighborhood: 'West End / Coal Harbour',
        category: 'Urban Park',
        distanceOrSize: '405 Hectares (10 km Paved Seawall Loop)',
        difficulty: 'Easy Stroll',
        features: ['Unobstructed Pacific Ocean & Mountain Views', 'First Nations Totem Poles', 'Lions Gate Bridge Viewpoint', 'Beaver Lake'],
        parkingTips: 'Pay parking available near Brockton Point or Second Beach.',
        bestTime: 'Morning bike ride or sunset walk around Third Beach.',
        tag: 'World’s Best City Park'
      },
      {
        id: 'yvr-o2',
        name: 'Lynn Canyon Suspension Bridge & Ecology Trails',
        neighborhood: 'North Vancouver',
        category: 'Hiking Trail',
        distanceOrSize: '250 Hectares (Free Suspension Bridge)',
        difficulty: 'Moderate Trail',
        features: ['Free 50m Suspension Bridge over Canyon', 'Twin Falls & 30 Foot Pool Swimming Holes', 'Temperate Coastal Rainforest'],
        parkingTips: 'Lynn Canyon Ecology Centre parking lot.',
        bestTime: 'Early morning to avoid crowds and experience mist among giant cedars.',
        tag: 'Free Rainforest Canyon Hike'
      },
      {
        id: 'yvr-o3',
        name: 'Lighthouse Park Coastal Rainforest Trail',
        neighborhood: 'West Vancouver',
        category: 'Hiking Trail',
        distanceOrSize: '75 Hectares (Old-Growth Douglas Firs)',
        difficulty: 'Easy Stroll',
        features: ['Historic 1912 Point Atkinson Lighthouse', 'Granite Rock Ocean Lookouts', 'Arbutus Trees & Burrard Inlet Views'],
        parkingTips: 'Free parking lot at the end of Beacon Lane.',
        bestTime: 'Golden hour sunset looking across to Vancouver Island.',
        tag: 'Old-Growth Coastal Sanctuary'
      },
      {
        id: 'yvr-o4',
        name: 'Queen Elizabeth Park & Bloedel Conservatory',
        neighborhood: 'Cambie / Little Mountain',
        category: 'Lookout Point',
        distanceOrSize: '53 Hectares (Highest Point in City)',
        difficulty: 'Easy Stroll',
        features: ['Highest Panoramic City View in Vancouver', 'Quarry Sunken Gardens', 'Tropical Bio-Dome Conservatory', 'Seasons in the Park Resto'],
        parkingTips: 'Pay parking available on top of park beside Bloedel Conservatory.',
        bestTime: 'Clear afternoon for unobstructed view of downtown skyscrapers against snowcapped mountains.',
        tag: 'Top City Viewpoint'
      }
    ],
    transitLines: [
      {
        id: 'yvr-t1',
        lineName: 'SkyTrain Canada Line (YVR Airport / Richmond - Waterfront)',
        systemName: 'TransLink',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Direct 24-minute rapid link between YVR Airport Terminal and Downtown Waterfront.',
        updatedMinutesAgo: 2
      },
      {
        id: 'yvr-t2',
        lineName: 'SkyTrain Expo & Millennium Lines',
        systemName: 'TransLink',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'High frequency automated trains running every 2 minutes through Downtown, Burnaby & Surrey.',
        updatedMinutesAgo: 3
      },
      {
        id: 'yvr-t3',
        lineName: 'SeaBus (Waterfront - Lonsdale Quay, North Van)',
        systemName: 'TransLink Marine',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Frequent 15-minute harbour catamaran crossing Burrard Inlet with panoramic skyline views.',
        updatedMinutesAgo: 5
      },
      {
        id: 'yvr-t4',
        lineName: '99 B-Line RapidBus (Broadway Corridor)',
        systemName: 'TransLink',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Articulated rapid bus connecting Commercial-Broadway SkyTrain with UBC campus.',
        updatedMinutesAgo: 7
      }
    ],
    civicServices: [
      {
        id: 'yvr-c1',
        title: 'City of Vancouver Van311 Online Service',
        department: 'City of Vancouver',
        actionText: 'Report an Issue (Van311)',
        actionUrl: 'https://vancouver.ca/van311.aspx',
        description: 'Potholes, graffiti removal, street parking regulations, water restrictions, and city bylaws.',
        phone: '311 (604-873-7000)'
      }
    ]
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
        title: 'REM Light Rail Phase 2 Airport & West Island Tracks Approach Commissioning',
        source: 'La Presse / Montreal Gazette',
        category: 'Civic',
        url: 'https://www.lapresse.ca',
        timeAgo: '40 mins ago',
        summary: 'Automated electric train tests commence between Central Station and Montreal-Trudeau Airport (YUL).',
        expandedDetails: {
          keyTakeaways: [
            'Direct 20-minute rapid transit from Downtown Central Station to YUL Airport terminals.',
            'Connects West Island communities through 14 modern elevated stations.',
            'Operates 20 hours a day with trains every 3 minutes at peak times.'
          ],
          localImpact: 'Significantly cuts Highway 20 and Highway 40 airport vehicular congestion.',
          timeline: 'Full passenger service launch in 2027.'
        }
      },
      {
        id: 'yul-n2',
        title: 'Greater Montreal Aerospace Cluster Finalizes Next-Gen SAF Jet Engine Tests',
        source: 'Les Affaires',
        category: 'Aerospace',
        url: 'https://www.lesaffaires.com',
        timeAgo: '2 hours ago',
        summary: 'Bombardier, Pratt & Whitney Canada, and CAE achieve 100% sustainable aviation fuel milestone.',
        expandedDetails: {
          keyTakeaways: [
            'Montreal maintains rank as the world’s #3 international aerospace capital.',
            'Over $450M in federal and provincial green aerospace R&D investments.',
            'New flight simulator and avionics software training facilities opened in Mirabel and Dorval.'
          ],
          localImpact: 'Creates 1,800 specialized aerospace engineering and avionics careers across the region.',
          timeline: 'Commercial certification expected next year.'
        }
      },
      {
        id: 'yul-n3',
        title: 'MILA AI Institute Announces $50M Sovereign Computing Infrastructure Grant',
        source: 'BetaKit Montreal',
        category: 'Technology',
        url: 'https://betakit.com',
        timeAgo: '4 hours ago',
        summary: 'World-renowned AI research institute founded by Yoshua Bengio expands sovereign supercomputing clusters.',
        expandedDetails: {
          keyTakeaways: [
            'Attracts over 1,200 international machine learning researchers to the Mile-Ex AI district.',
            'New partnerships with McGill, Université de Montréal, and global health biotech firms.',
            'Focus on ethical AI safety, drug discovery, and climate modeling.'
          ],
          localImpact: 'Solidifies Montreal as one of the world’s foremost deep learning research clusters.',
          timeline: 'Cluster expansion online Q4 2026.'
        }
      }
    ],
    sports: [
      {
        id: 'yul-sp1',
        team: 'Montreal Canadiens',
        opponent: 'Boston Bruins (Historic NHL Rivalry)',
        league: 'NHL',
        status: 'Upcoming',
        gameTime: 'Saturday • 7:00 PM',
        tvBroadcast: 'TVA Sports / CBC',
        isHome: true
      },
      {
        id: 'yul-sp2',
        team: 'CF Montréal',
        opponent: 'Toronto FC (Canadian Classique)',
        league: 'MLS',
        status: 'Upcoming',
        gameTime: 'Saturday • 7:30 PM',
        tvBroadcast: 'Apple TV (MLS Season Pass)',
        isHome: true
      },
      {
        id: 'yul-sp3',
        team: 'Montreal Alouettes',
        opponent: 'Hamilton Tiger-Cats',
        league: 'CFL',
        status: 'Upcoming',
        gameTime: 'Thursday • 7:30 PM',
        tvBroadcast: 'RDS / TSN',
        isHome: true
      },
      {
        id: 'yul-sp4',
        team: 'Laval Rocket',
        opponent: 'Toronto Marlies',
        league: 'AHL' as any,
        status: 'Final',
        score: '3 - 1 (W)',
        tvBroadcast: 'BPM Sports / RDS',
        isHome: true
      }
    ],
    restaurants: [
      {
        id: 'yul-r1',
        name: 'Joe Beef',
        cuisine: 'Old-School Quebecois Decadence & Natural Wine',
        neighborhood: 'Little Burgundy / Notre-Dame St W',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 3800,
        signatureDish: 'Lobster Spaghetti & Foie Gras Double Down',
        bookingPlatform: 'Resy',
        reservationUrl: 'https://resy.com/cities/montreal-qc/venues/joe-beef',
        availableTimes: ['5:30 PM', '8:15 PM', '9:45 PM'],
        tag: 'Legendary Montreal Gastronomy'
      },
      {
        id: 'yul-r2',
        name: 'Toqué!',
        cuisine: 'Haute Gastronomie Quebecoise & Market Foraged',
        neighborhood: 'Quartier International / Place Jean-Paul-Riopelle',
        priceLevel: '$$$$',
        rating: 4.9,
        reviewCount: 2200,
        signatureDish: 'Princess Scallop Tartare & Venison Loin in Juniper',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/toque-montreal',
        availableTimes: ['5:45 PM', '8:00 PM'],
        tag: 'Grand Chef Relais & Châteaux'
      },
      {
        id: 'yul-r3',
        name: 'Schwartz’s Deli',
        cuisine: 'Historic Montreal Smoked Meat on Rye',
        neighborhood: 'The Main / Boulevard Saint-Laurent',
        priceLevel: '$',
        rating: 4.7,
        reviewCount: 14200,
        signatureDish: 'Medium-Fat Smoked Meat Sandwich & Cott’s Black Cherry',
        bookingPlatform: 'Direct',
        reservationUrl: 'https://schwartzsdeli.com',
        availableTimes: ['Walk-in Counter Service Daily'],
        tag: '1928 Jewish Montreal Icon'
      },
      {
        id: 'yul-r4',
        name: 'Restaurant L’Express',
        cuisine: 'Classic Parisian Bistro & Late Night Croque Monsieur',
        neighborhood: 'Plateau Mont-Royal / Rue Saint-Denis',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 4600,
        signatureDish: 'Steak Frites with Herb Butter & Bone Marrow with Grey Salt',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/lexpress-montreal',
        availableTimes: ['5:00 PM', '7:30 PM', '10:00 PM', '11:30 PM'],
        tag: 'Parisian Bistro Institution'
      },
      {
        id: 'yul-r5',
        name: 'Damas Restaurant',
        cuisine: 'Fine Syrian Gastronomy & Charcoal Grills',
        neighborhood: 'Outremont / Avenue Van Horne',
        priceLevel: '$$$$',
        rating: 4.9,
        reviewCount: 3100,
        signatureDish: 'Fattet Makdous & Aleppo Spiced Lamb Kebab',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/damas-restaurant-montreal',
        availableTimes: ['5:30 PM', '8:00 PM', '9:45 PM'],
        tag: 'Canada’s 100 Best Top 10'
      },
      {
        id: 'yul-r6',
        name: 'Vin Mon Lapin',
        cuisine: 'Farm-Driven Micro-Seasonal & Natural Wine',
        neighborhood: 'Little Italy / Rue Saint-Zotique',
        priceLevel: '$$$$',
        rating: 4.9,
        reviewCount: 1900,
        signatureDish: 'Croque-Pétoncle (Scallop Toast) & Jerusalem Artichoke Tart',
        bookingPlatform: 'Resy',
        reservationUrl: 'https://resy.com/cities/montreal-qc/venues/vin-mon-lapin',
        availableTimes: ['5:00 PM', '7:45 PM', '9:30 PM'],
        tag: 'Canada’s #1 Restaurant 2023 & 2024'
      },
      {
        id: 'yul-r7',
        name: 'Nora Gray',
        cuisine: 'Intimate Southern Italian & Handmade Pasta',
        neighborhood: 'Griffintown / Saint-Jacques',
        priceLevel: '$$$',
        rating: 4.7,
        reviewCount: 1700,
        signatureDish: 'Tagliolini with Duck Ragu & Rabbit Sausage',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/nora-gray-montreal',
        availableTimes: ['5:15 PM', '7:00 PM', '9:00 PM'],
        tag: 'Romantic Candlelit Trattoria'
      },
      {
        id: 'yul-r8',
        name: 'Au Pied de Cochon',
        cuisine: 'Extravagant Quebec Pork, Duck & Maple',
        neighborhood: 'Plateau / Rue Duluth',
        priceLevel: '$$$$',
        rating: 4.7,
        reviewCount: 4100,
        signatureDish: 'Foie Gras Poutine & Duck in a Can',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/au-pied-de-cochon-montreal',
        availableTimes: ['5:00 PM', '7:30 PM', '9:45 PM'],
        tag: 'Martin Picard Culinary Legend'
      }
    ],
    nightlife: [
      {
        id: 'yul-nl1',
        name: 'Stereo Nightclub',
        category: 'Nightclub',
        neighborhood: 'The Village / Sainte-Catherine E',
        vibe: 'Legendary after-hours temple with one of the world’s most pristine analogue sound systems and marathon DJ sets',
        coverOrVip: '$25 - $45 • No alcohol / Pure music sanctuary',
        hours: 'Sat midnight - Sun 2:00 PM',
        guestlistUrl: 'https://stereomontreal.com',
        tag: 'World’s Greatest Sound System'
      },
      {
        id: 'yul-nl2',
        name: 'The Coldroom',
        category: 'Speakeasy',
        neighborhood: 'Old Montreal / Rue Saint-Vincent',
        vibe: 'Secret industrial cellar behind an unmarked black door with duck ringing bell, serving bespoke vintage cocktails',
        coverOrVip: 'Ring doorbell • No cover',
        hours: 'Daily • 5:00 PM - 3:00 AM',
        guestlistUrl: 'https://thecoldroommtl.com',
        tag: 'Hidden Old Montreal Speakeasy'
      },
      {
        id: 'yul-nl3',
        name: 'Cloakroom Bar',
        category: 'Speakeasy',
        neighborhood: 'Golden Square Mile / Rue de la Montagne',
        vibe: 'Hidden 25-seat luxury bespoke cocktail haven tucked inside a custom men’s tailor shop with hand-carved ice cubes',
        coverOrVip: 'Walk-ins only • World’s 50 Best Bars',
        hours: 'Daily • 3:00 PM - 2:00 AM',
        guestlistUrl: 'https://cloakroombar.com',
        tag: 'Ultra-Exclusive Tailor Speakeasy'
      },
      {
        id: 'yul-nl4',
        name: 'New City Gas',
        category: 'Nightclub',
        neighborhood: 'Griffintown / Ottawa St',
        vibe: '1859 heritage coal gas factory converted into a monumental 40,000 sq ft festival electronic dance venue',
        coverOrVip: '$30 - $75 • VIP Tables',
        hours: 'Fri & Sat • 10:00 PM - 3:00 AM',
        guestlistUrl: 'https://newcitygas.com',
        tag: 'Massive Industrial Venue'
      }
    ],
    shows: [
      {
        id: 'yul-s1',
        title: 'Orchestre Symphonique de Montréal: Ravel Boléro & Debussy',
        venue: 'Maison Symphonique (Place des Arts)',
        neighborhood: 'Quartier des Spectacles',
        category: 'Symphony',
        dates: 'Wednesday & Saturday • 7:30 PM',
        ticketPriceRange: '$42 - $140',
        ticketUrl: 'https://www.osm.ca',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald'
      },
      {
        id: 'yul-s2',
        title: 'Cirque du Soleil: KURIOS - Cabinet of Curiosities',
        venue: 'Under the Big Top (Old Port of Montreal)',
        neighborhood: 'Vieux-Port de Montréal',
        category: 'Theatre',
        dates: 'Wed - Sun • 8:00 PM & 4:00 PM',
        ticketPriceRange: '$65 - $195',
        ticketUrl: 'https://www.cirquedusoleil.com',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Selling Fast',
        badgeColor: 'amber'
      },
      {
        id: 'yul-s3',
        title: 'Bell Centre Live: Kendrick Lamar & SZA Arena Tour',
        venue: 'Centre Bell',
        neighborhood: 'Downtown / Lucien-L’Allier',
        category: 'Concert',
        dates: 'Next Month • 7:30 PM',
        ticketPriceRange: '$90 - $380',
        ticketUrl: 'https://www.ticketmaster.ca',
        ticketPlatform: 'Ticketmaster',
        availabilityStatus: 'Almost Sold Out',
        badgeColor: 'rose'
      },
      {
        id: 'yul-s4',
        title: 'Théâtre Saint-Denis: Mamma Mia! Comédie Musicale en Français',
        venue: 'Théâtre St-Denis',
        neighborhood: 'Latin Quarter / Saint-Denis',
        category: 'Theatre',
        dates: 'Tue - Sun • 8:00 PM & 2:00 PM',
        ticketPriceRange: '$55 - $130',
        ticketUrl: 'https://theatrestdenis.com',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald'
      },
      {
        id: 'yul-s5',
        title: 'The Comedy Nest: Pro Standup Showcase',
        venue: 'The Comedy Nest (Forum Montreal)',
        neighborhood: 'Shaughnessy Village / Sainte-Catherine W',
        category: 'Comedy',
        dates: 'Thu - Sat • 8:00 PM & 10:30 PM',
        ticketPriceRange: '$18 - $28',
        ticketUrl: 'https://comedynest.com',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Walk-ins Welcome',
        badgeColor: 'cyan'
      }
    ],
    hotels: [
      {
        id: 'yul-h1',
        name: 'The Ritz-Carlton Montreal',
        neighborhood: 'Golden Square Mile / Rue Sherbrooke O',
        rating: 4.9,
        reviewCount: 2100,
        pricePerNight: '$520 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/the-ritz-carlton-montreal.html',
        bookingPlatform: 'Booking.com',
        amenities: ['Maison Boulud Fine Dining', 'Rooftop Indoor Saltwater Pool', 'Spa St. James', 'Courtyard Duck Pond'],
        tag: 'Grand Dame of Montreal',
        description: 'Canada’s first luxury hotel opened in 1912, hosting royalty and celebrities with Daniel Boulud gastronomy and luxury suites.'
      },
      {
        id: 'yul-h2',
        name: 'Hôtel William Gray',
        neighborhood: 'Old Montreal / Place Jacques-Cartier',
        rating: 4.8,
        reviewCount: 3100,
        pricePerNight: '$380 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/hotel-william-gray.html',
        bookingPlatform: 'Booking.com',
        amenities: ['Terrasse William Gray Rooftop', 'Maggie Oakes Steakhouse', 'Luxury Thermal Spa', 'Outdoor Heated Pool'],
        tag: 'Historic Cobblestone Luxury',
        description: 'Chic boutique hotel fusing 18th-century stone facades with glass architecture and panoramic rooftop views of the St. Lawrence River.'
      },
      {
        id: 'yul-h3',
        name: 'Hôtel Le Germain Montréal',
        neighborhood: 'Downtown / Avenue du Président-Kennedy',
        rating: 4.8,
        reviewCount: 1600,
        pricePerNight: '$290 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/le-germain-montreal.html',
        bookingPlatform: 'Booking.com',
        amenities: ['Le Boulevardier French Brasserie', 'Flâneur Bar', 'Fitness Studio', 'Pet Friendly'],
        tag: '1960s Expo Design Icon',
        description: 'Mid-century modern design inspired by Montreal’s Expo 67, featuring plush goose-down bedding and prime downtown walking access.'
      }
    ],
    experiences: [
      {
        id: 'yul-e1',
        title: 'Quebec City & Montmorency Falls All-Day Excursion from Montreal',
        operator: 'Quebec Luxury Day Excursions',
        category: 'Sightseeing',
        duration: '12 Hours',
        rating: 4.9,
        reviewCount: 4800,
        priceFrom: '$119 / person',
        bookingUrl: 'https://www.viator.com/Montreal/d625-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Château Frontenac & Old Quebec UNESCO walk', 'Montmorency Falls waterfall cable car', 'Scenic St. Lawrence river valley coach'],
        badge: 'Quebec #1 Best Seller'
      },
      {
        id: 'yul-e2',
        title: 'Old Montreal Historic 350-Year Walking Tour',
        operator: 'Guidatour Montreal',
        category: 'Historic Walk',
        duration: '2 Hours',
        rating: 4.9,
        reviewCount: 3600,
        priceFrom: '$32 / person',
        bookingUrl: 'https://www.viator.com/Montreal/d625-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Notre-Dame Basilica exterior & Place d’Armes', 'Hidden cobblestone lanes & courtyards', 'Expert certified historian guide'],
        badge: 'Old Port Classic'
      },
      {
        id: 'yul-e3',
        title: 'Mile End Iconic Culinary & Bagel Crawl',
        operator: 'Local Montreal Food Tours',
        category: 'Food Tour',
        duration: '3 Hours',
        rating: 4.9,
        reviewCount: 2900,
        priceFrom: '$75 / person',
        bookingUrl: 'https://www.viator.com/Montreal/d625-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Hot St-Viateur & Fairmount wood-fired bagels', 'Gourmet gnocchi at Drogheria Fine', 'Artisan charcuterie & micro-brew pairing'],
        badge: 'Foodie Must-Do'
      },
      {
        id: 'yul-e4',
        title: 'Laurentian Mountains & Mont-Tremblant Day Tour',
        operator: 'Laurentian Mountain Tours',
        category: 'Nature & Wildlife',
        duration: '9 Hours',
        rating: 4.8,
        reviewCount: 1750,
        priceFrom: '$105 / person',
        bookingUrl: 'https://www.viator.com/Montreal/d625-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Mont-Tremblant colorful pedestrian alpine village', 'Saint-Sauveur lake stop', 'Scenic cable gondola ticket option'],
        badge: 'Alpine Nature Escape'
      }
    ],
    outdoors: [
      {
        id: 'yul-o1',
        name: 'Mount Royal Park & Kondiaronk Belvedere Lookout',
        neighborhood: 'Mount Royal / Plateau',
        category: 'Lookout Point',
        distanceOrSize: '200 Hectares (Designed by Frederick Law Olmsted)',
        difficulty: 'Easy Stroll',
        features: ['Iconic Kondiaronk Chalet Skyline Panorama', 'Beaver Lake (Lac aux Castors)', 'Olmsted Trail Forest Walk', 'Mount Royal Cross'],
        parkingTips: 'Paid parking near Smith House or walk up Peel Street stairs.',
        bestTime: 'Sunrise or sunset for Montreal’s definitive skyline postcard.',
        tag: 'The Heart of Montreal'
      },
      {
        id: 'yul-o2',
        name: 'Parc Jean-Drapeau & Circuit Gilles-Villeneuve',
        neighborhood: 'Saint Helen’s & Notre Dame Islands (St. Lawrence River)',
        category: 'Urban Park',
        distanceOrSize: '268 Hectares (Expo 67 Islands)',
        difficulty: 'Easy Stroll',
        features: ['Buckminster Fuller Biosphere Geodesic Dome', 'Formula 1 Grand Prix Racetrack (Open for Cycling)', 'Beach Jean-Doré'],
        parkingTips: 'Take STM Yellow Line to Jean-Drapeau Metro Station.',
        bestTime: 'Sunny afternoon for biking the Grand Prix racetrack and river views.',
        tag: 'Expo 67 Historic Islands'
      },
      {
        id: 'yul-o3',
        name: 'Lachine Canal Historic Pathway & Atwater Market',
        neighborhood: 'Saint-Henri / Griffintown / Lachine',
        category: 'Urban Park',
        distanceOrSize: '14.5 km Paved Waterfront Pathway',
        difficulty: 'Easy Stroll',
        features: ['Historic 1825 Canal Locks', 'Kayak & Electric Boat Rentals', 'Atwater Artisan Food Market', 'Trendy Canal-Side Terraces'],
        parkingTips: 'Street parking in Saint-Henri or Atwater Market lot.',
        bestTime: 'Weekend morning for market pastries and waterside bike rides.',
        tag: 'Scenic Canal Cycling Loop'
      },
      {
        id: 'yul-o4',
        name: 'Montreal Botanical Garden (Jardin Botanique)',
        neighborhood: 'Olympic Park / Rosemont',
        category: 'Urban Park',
        distanceOrSize: '75 Hectares (7th Largest Botanical Garden Worldwide)',
        difficulty: 'Easy Stroll',
        features: ['Chinese Garden with Pagodas & Lanterns', 'Japanese Zen Garden & Tea House', 'First Nations Garden', '10 Exhibition Greenhouses'],
        parkingTips: 'Paid parking at Pie-IX Metro or Olympic Stadium.',
        bestTime: 'Morning for peaceful greenhouse strolls and Japanese garden reflections.',
        tag: 'World-Renowned Botanical Jewel'
      }
    ],
    transitLines: [
      {
        id: 'yul-t1',
        lineName: 'REM Light Rail (Brossard - Gare Centrale)',
        systemName: 'Réseau express métropolitain',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'High-speed automated train crossing the Samuel De Champlain Bridge every 3.5 minutes.',
        updatedMinutesAgo: 2
      },
      {
        id: 'yul-t2',
        lineName: 'STM Green Line (Ligne Verte: Angrignon - Honoré-Beaugrand)',
        systemName: 'STM Métro',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Rubber-tired subway serving Downtown, McGill, Place des Arts, and Olympic Stadium.',
        updatedMinutesAgo: 3
      },
      {
        id: 'yul-t3',
        lineName: 'STM Orange Line (Ligne Orange: Côte-Vertu - Montmorency)',
        systemName: 'STM Métro',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Main loop subway servicing Old Montreal, Berri-UQAM, Jean-Talon, and Laval.',
        updatedMinutesAgo: 4
      },
      {
        id: 'yul-t4',
        lineName: '747 Express Bus (YUL Airport - Downtown)',
        systemName: 'STM Bus Express',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: '24/7 dedicated express bus link between Montreal-Trudeau Airport and Berri-UQAM.',
        updatedMinutesAgo: 6
      }
    ],
    civicServices: [
      {
        id: 'yul-c1',
        title: 'Ville de Montréal Services aux Citoyens (311)',
        department: 'Ville de Montréal',
        actionText: 'Services Municipaux (311)',
        actionUrl: 'https://montreal.ca/services',
        description: 'Déneigement, collectes des matières résiduelles, vignettes de stationnement et permis.',
        phone: '311 (514-872-0311)'
      }
    ]
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
        title: 'Valley Line West LRT Track Laying Advances Across 149th Street Corridor',
        source: 'Edmonton Journal',
        category: 'Civic',
        url: 'https://edmontonjournal.com',
        timeAgo: '45 mins ago',
        summary: 'Construction crews begin installing low-floor electric tracks connecting Downtown to West Edmonton Mall.',
        expandedDetails: {
          keyTakeaways: [
            '14 km expansion will link Downtown Jasper Ave with West Edmonton Mall and Lewis Farms.',
            'New elevated guideway stations nearing structural completion over Anthony Henday Drive.',
            'Zero service impact to operating Valley Line Southeast route.'
          ],
          localImpact: 'Connects Edmontonians to major healthcare, post-secondary, and retail centers in under 30 minutes.',
          timeline: 'Track installation continues through 2027.'
        }
      },
      {
        id: 'yeg-n2',
        title: 'Alberta Industrial Heartland $2.4B Clean Hydrogen Energy Complex Enters Final Phase',
        source: 'Edmonton Global / Energy Desk',
        category: 'Energy',
        url: 'https://edmontonglobal.ca',
        timeAgo: '2 hours ago',
        summary: 'World-scale net-zero hydrogen facility to supply clean industrial power across Western Canada.',
        expandedDetails: {
          keyTakeaways: [
            'Produces ultra-low carbon blue and green hydrogen from regional feedstock.',
            'Captures and permanently sequesters over 95% of associated CO2 emissions in deep geological formations.',
            'Attracts international clean-tech supply chain partners to the Edmonton metro area.'
          ],
          localImpact: 'Drives high-tech engineering, industrial operations, and procurement jobs in Strathcona County and Edmonton.',
          timeline: 'Full commercial commissioning in 2027.'
        }
      },
      {
        id: 'yeg-n3',
        title: 'ICE District Commercial Towers and Fan Park Reach 94% Tenancy',
        source: 'Daily Hive Edmonton',
        category: 'Development',
        url: 'https://dailyhive.com/edmonton',
        timeAgo: '4 hours ago',
        summary: 'Canada’s largest mixed-use sports and entertainment district expands public event plazas and restaurant patios.',
        expandedDetails: {
          keyTakeaways: [
            'ICE District Fan Park hosts over 120 annual public concerts, watch parties, and community festivals.',
            'New tech engineering offices and national corporate headquarters open in Stantec Tower.',
            'Underground pedway connection provides heated climate-controlled access to Rogers Place.'
          ],
          localImpact: 'Revitalizes downtown core street activation on Oilers game days and major concert nights.',
          timeline: 'Ongoing events schedule active.'
        }
      }
    ],
    sports: [
      {
        id: 'yeg-sp1',
        team: 'Edmonton Oilers',
        opponent: 'Calgary Flames (Battle of Alberta)',
        league: 'NHL',
        status: 'Upcoming',
        gameTime: 'Saturday • 8:00 PM',
        tvBroadcast: 'Sportsnet West / CBC',
        isHome: true
      },
      {
        id: 'yeg-sp2',
        team: 'Edmonton Elks',
        opponent: 'Saskatchewan Roughriders',
        league: 'CFL',
        status: 'Upcoming',
        gameTime: 'Friday • 7:30 PM',
        tvBroadcast: 'TSN 1/4',
        isHome: true
      },
      {
        id: 'yeg-sp3',
        team: 'Edmonton Oil Kings',
        opponent: 'Medicine Hat Tigers',
        league: 'WHL',
        status: 'Final',
        score: '4 - 3 (W)',
        tvBroadcast: 'WHL Live',
        isHome: true
      },
      {
        id: 'yeg-sp4',
        team: 'Edmonton Stingers',
        opponent: 'Calgary Surge',
        league: 'BSL' as any,
        status: 'Upcoming',
        gameTime: 'Sunday • 4:00 PM',
        tvBroadcast: 'CEBL+',
        isHome: true
      }
    ],
    restaurants: [
      {
        id: 'yeg-r1',
        name: 'RGE RD (Range Road)',
        cuisine: 'Untamed Prairie Cuisine & Wood-Fired Butcher',
        neighborhood: '124th Street / Westmount',
        priceLevel: '$$$$',
        rating: 4.9,
        reviewCount: 2200,
        signatureDish: 'Road Trip Tasting Menu & Beef Tartare on Grilled Sourdough',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/rge-rd-edmonton',
        availableTimes: ['5:15 PM', '7:30 PM', '9:15 PM'],
        tag: 'Canada’s 100 Best & Farm Pioneer'
      },
      {
        id: 'yeg-r2',
        name: 'Bündok',
        cuisine: 'Modern Seasonal Small Plates & Natural Wine',
        neighborhood: 'Downtown / 104th St Promenade',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 1650,
        signatureDish: 'Sea Bream Crudo with Citrus & Grilled Gnocchi with Leeks',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/bundok-edmonton',
        availableTimes: ['5:00 PM', '6:45 PM', '8:30 PM'],
        tag: 'Top Chef Canada Alum'
      },
      {
        id: 'yeg-r3',
        name: 'Sabor Restaurant',
        cuisine: 'Iberian Seafood, Tapas & Coastal Flavours',
        neighborhood: 'Downtown / 103rd St & Boardwalk',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 2400,
        signatureDish: 'Grilled Whole Branzino & Seafood Paella',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/sabor-restaurant-edmonton',
        availableTimes: ['5:30 PM', '7:15 PM', '9:00 PM'],
        tag: 'Edmonton Seafood Institution'
      },
      {
        id: 'yeg-r4',
        name: 'Uccellino',
        cuisine: 'Modern Italian & Handcrafted Regional Pasta',
        neighborhood: 'Jasper Avenue / Downtown',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 1900,
        signatureDish: 'Raviolo al Uovo with Brown Butter & Roast Half Chicken',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/uccellino-edmonton',
        availableTimes: ['5:00 PM', '7:00 PM', '8:45 PM'],
        tag: 'Corso 32 Culinary Family'
      },
      {
        id: 'yeg-r5',
        name: 'Clementine',
        cuisine: 'French-Inspired Small Plates & Bespoke Cocktails',
        neighborhood: 'Oliver / 119th St',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 1200,
        signatureDish: 'Duck Confit Cassoulet & Tailored Gin Cocktails',
        bookingPlatform: 'Direct',
        reservationUrl: 'https://barclementine.ca',
        availableTimes: ['5:00 PM', '7:15 PM', '9:30 PM'],
        tag: 'Art Nouveau Cocktail Haven'
      },
      {
        id: 'yeg-r6',
        name: 'Smokey Bear',
        cuisine: 'Direct Fire Cooking & Natural Wine Bar',
        neighborhood: 'Old Strathcona / Whyte Ave',
        priceLevel: '$$$',
        rating: 4.7,
        reviewCount: 980,
        signatureDish: 'Ember-Roasted Pork Chop & Smoked Bone Marrow Butter',
        bookingPlatform: 'Resy',
        reservationUrl: 'https://resy.com/cities/edmonton-ab/venues/smokey-bear',
        availableTimes: ['5:15 PM', '7:30 PM', '9:15 PM'],
        tag: 'Wood-Fired Hearth Specialist'
      },
      {
        id: 'yeg-r7',
        name: 'Tzin Wine & Tapas',
        cuisine: 'Intimate Spanish-Infused Tapas & Fine Wine Flights',
        neighborhood: '104th Street Promenade',
        priceLevel: '$$$',
        rating: 4.9,
        reviewCount: 1400,
        signatureDish: 'The Bacon (Braised Pork Belly with Apple Slaw & Sriracha)',
        bookingPlatform: 'Direct',
        reservationUrl: 'https://tzin.ca',
        availableTimes: ['5:00 PM', '7:00 PM', '9:00 PM'],
        tag: 'Cozy 20-Seat Tapas Jewel'
      }
    ],
    nightlife: [
      {
        id: 'yeg-nl1',
        name: 'The Bower',
        category: 'Nightclub',
        neighborhood: 'Old Strathcona / Whyte Ave',
        vibe: 'Sophisticated vintage lounge featuring velvet banquettes, top-tier vinyl DJs, and weekend house/funk dance nights',
        coverOrVip: '$10 - $20 on weekends • Table bottle service',
        hours: 'Thu - Sat • 8:00 PM - 2:00 AM',
        guestlistUrl: 'https://thebower.ca',
        tag: 'Whyte Ave Premier Dance Lounge'
      },
      {
        id: 'yeg-nl2',
        name: 'Mercer Tavern / Alleykat Lounge',
        category: 'Live Music & Dance',
        neighborhood: 'ICE District / 104th St (Across from Rogers Place)',
        vibe: 'Historic 1911 timber warehouse converted into a bustling pre-game pub with craft local pints and live acoustic bands',
        coverOrVip: 'No cover • Arrive early on game nights',
        hours: 'Daily • 11:30 AM - 2:00 AM',
        guestlistUrl: 'https://mercertavern.com',
        tag: 'Oilers Game Night Classic'
      },
      {
        id: 'yeg-nl3',
        name: 'Beercade',
        category: 'Live Music & Dance',
        neighborhood: 'Whyte Avenue',
        vibe: 'Over 80 classic arcade cabinets, pinball machines, skeeball, craft beers on tap, and high-energy dance floor',
        coverOrVip: '$5 - $10 on weekends',
        hours: 'Daily • 4:00 PM - 2:00 AM',
        guestlistUrl: 'https://beercade.ca',
        tag: 'Arcade Party Bar'
      },
      {
        id: 'yeg-nl4',
        name: 'Red Star Pub',
        category: 'Cocktail Lounge',
        neighborhood: 'Downtown / Jasper Ave',
        vibe: 'Low-key subterranean basement bar with craft beer, artisanal negronis, and indie vinyl selectors',
        coverOrVip: 'No cover',
        hours: 'Wed - Sun • 5:00 PM - 1:00 AM',
        guestlistUrl: 'https://redstarpub.ca',
        tag: 'Downtown Hidden Local Bar'
      }
    ],
    shows: [
      {
        id: 'yeg-s1',
        title: 'Citadel Theatre: Little Shop of Horrors Musical',
        venue: 'Citadel Theatre (Shoctor Stage)',
        neighborhood: 'Downtown Arts District',
        category: 'Theatre',
        dates: 'Tue - Sun • 7:30 PM (Matinees 1:30 PM)',
        ticketPriceRange: '$40 - $125',
        ticketUrl: 'https://citadeltheatre.com',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald'
      },
      {
        id: 'yeg-s2',
        title: 'Edmonton Symphony Orchestra: Holst The Planets',
        venue: 'Winspear Centre',
        neighborhood: 'Sir Winston Churchill Square',
        category: 'Symphony',
        dates: 'Friday & Saturday • 7:30 PM',
        ticketPriceRange: '$35 - $105',
        ticketUrl: 'https://www.winspearcentre.com',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Selling Fast',
        badgeColor: 'amber'
      },
      {
        id: 'yeg-s3',
        title: 'Rogers Place Live: Zach Bryan - The Quittin Time Tour',
        venue: 'Rogers Place (ICE District)',
        neighborhood: 'Downtown Edmonton',
        category: 'Concert',
        dates: 'Next Month • 8:00 PM',
        ticketPriceRange: '$85 - $295',
        ticketUrl: 'https://www.ticketmaster.ca',
        ticketPlatform: 'Ticketmaster',
        availabilityStatus: 'Almost Sold Out',
        badgeColor: 'rose'
      },
      {
        id: 'yeg-s4',
        title: 'Spotlight Cabaret: Drag Brunch & Burlesque Comedy',
        venue: 'Spotlight Cabaret',
        neighborhood: 'Old Strathcona / Whyte Ave',
        category: 'Comedy',
        dates: 'Fri - Sun • 7:00 PM & 12:00 PM Brunch',
        ticketPriceRange: '$25 - $45',
        ticketUrl: 'https://spotlightcabaret.ca',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Walk-ins Welcome',
        badgeColor: 'cyan'
      }
    ],
    hotels: [
      {
        id: 'yeg-h1',
        name: 'JW Marriott Edmonton ICE District',
        neighborhood: 'Downtown ICE District',
        rating: 4.9,
        reviewCount: 2200,
        pricePerNight: '$340 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/jw-marriott-edmonton-ice-district.html',
        bookingPlatform: 'Booking.com',
        amenities: ['Braven Chophouse', 'Archetype High-Performance Fitness', 'Spa by JW', 'Direct Heated Pedway to Rogers Place'],
        tag: 'Luxury Sports & Arena Hotel',
        description: 'Edmonton’s premier 5-star hotel in the heart of ICE District with luxury suites and direct indoor connection to Rogers Place.'
      },
      {
        id: 'yeg-h2',
        name: 'Fairmont Hotel Macdonald',
        neighborhood: 'Downtown (Overlooking River Valley)',
        rating: 4.8,
        reviewCount: 3800,
        pricePerNight: '$290 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/fairmont-hotel-macdonald.html',
        bookingPlatform: 'Booking.com',
        amenities: ['The Confederation Lounge', 'Harvest Room Dining', 'River Valley Patio & Gardens', 'Indoor Saltwater Pool'],
        tag: 'Château on the River',
        description: 'Iconic 1915 château perched high above the North Saskatchewan River Valley with manicured garden patios and luxury historic charm.'
      },
      {
        id: 'yeg-h3',
        name: 'Metterra Hotel on Whyte',
        neighborhood: 'Old Strathcona / Whyte Ave',
        rating: 4.7,
        reviewCount: 1450,
        pricePerNight: '$195 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/metterra-on-whyte.html',
        bookingPlatform: 'Booking.com',
        amenities: ['Complimentary Wine Tasting Evenings', 'Breakfast Buffet Included', 'Fitness Studio', 'Whyte Ave Step-Out Access'],
        tag: 'Boutique Arts & Culture',
        description: 'Chic lifestyle boutique hotel on trendy Whyte Avenue surrounded by Edmonton’s best independent theatres, cafes, and pubs.'
      }
    ],
    experiences: [
      {
        id: 'yeg-e1',
        title: 'Elk Island National Park Wild Bison Safari & Dark Sky Preserve Excursion',
        operator: 'Prairie Wildlife Safaris',
        category: 'Nature & Wildlife',
        duration: '5.5 Hours',
        rating: 4.9,
        reviewCount: 2800,
        priceFrom: '$89 / person',
        bookingUrl: 'https://www.viator.com/Edmonton/d28470-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Spot wild plains & woods bison herds', 'Astin Peak & Astotin Lake boardwalk', 'Starry dark sky preserve narration'],
        badge: 'Alberta Wildlife Classic'
      },
      {
        id: 'yeg-e2',
        title: 'Edmonton River Valley Segway Adventure Tour',
        operator: 'River Valley Adventure Co.',
        category: 'Sightseeing',
        duration: '1.5 - 2 Hours',
        rating: 4.9,
        reviewCount: 1950,
        priceFrom: '$65 / person',
        bookingUrl: 'https://www.viator.com/Edmonton/d28470-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Glide through Louise McKinney Riverfront Park', 'Historic low-level bridge crossing', 'Beginner training included'],
        badge: 'Top Rated Outdoor Adventure'
      },
      {
        id: 'yeg-e3',
        title: 'Old Strathcona Heritage & Foodie Walking Tour',
        operator: 'Edmonton Food Tours',
        category: 'Food Tour',
        duration: '3 Hours',
        rating: 4.8,
        reviewCount: 1100,
        priceFrom: '$75 / person',
        bookingUrl: 'https://www.viator.com/Edmonton/d28470-ttd',
        bookingPlatform: 'Viator',
        highlights: ['5 local culinary tastings at Strathcona markets & cafes', 'Historic brick architecture stories', 'Local craft beer pairing'],
        badge: 'Whyte Ave Culinary Hit'
      },
      {
        id: 'yeg-e4',
        title: 'Ukrainian Cultural Heritage Village Historic Day Trip',
        operator: 'Heritage Alberta Excursions',
        category: 'Historic Walk',
        duration: '4.5 Hours',
        rating: 4.8,
        reviewCount: 920,
        priceFrom: '$59 / person',
        bookingUrl: 'https://www.viator.com/Edmonton/d28470-ttd',
        bookingPlatform: 'Viator',
        highlights: ['35 authentically restored pioneer buildings', 'Costumed historical interpreters', 'Traditional pyrohy & sausage lunch option'],
        badge: 'Living History Experience'
      }
    ],
    outdoors: [
      {
        id: 'yeg-o1',
        name: 'North Saskatchewan River Valley Trail Network',
        neighborhood: 'Central Edmonton (Stretching across city)',
        category: 'Urban Park',
        distanceOrSize: '7,300 Hectares (North America’s Largest Continuous Urban Park)',
        difficulty: 'Easy Stroll',
        features: ['160+ km Paved & Natural Pathways', 'Connects 20 Major City Parks', 'River Boat Launches', 'Funicular Lift Downtown'],
        parkingTips: 'Free parking at Louise McKinney Park or Emily Murphy Park.',
        bestTime: 'Morning cycling and autumn for stunning golden birch and aspen foliage.',
        tag: 'Largest Urban Park in North America'
      },
      {
        id: 'yeg-o2',
        name: 'William Hawrelak Park & Lake Trail',
        neighborhood: 'University Area / River Valley',
        category: 'Urban Park',
        distanceOrSize: '68 Hectares (Scenic Lake Loop)',
        difficulty: 'Easy Stroll',
        features: ['5-Hectare Paddleboat Lake', 'Heritage Amphitheatre Stage', 'Covered Picnic Pavilions', 'Cross-Country Skiing in Winter'],
        parkingTips: 'Ample free parking lots throughout park grounds.',
        bestTime: 'Summer festivals or afternoon picnic by the lake.',
        tag: 'Festival Park Jewel'
      },
      {
        id: 'yeg-o3',
        name: 'Victoria Park & Ice Trail',
        neighborhood: 'River Valley / Jasper Ave West',
        category: 'Urban Park',
        distanceOrSize: '35 Hectares (Riverfront Promenade)',
        difficulty: 'Easy Stroll',
        features: ['Free Speed Skating Oval & Illuminated Iceway Trail', 'Public Golf Course', 'Historic Victoria Promenade Viewpoint'],
        parkingTips: 'Free parking at Victoria Park Pavilion lot.',
        bestTime: 'Winter evenings under fairy lights on the ice trail.',
        tag: 'Year-Round Recreation Park'
      }
    ],
    transitLines: [
      {
        id: 'yeg-t1',
        lineName: 'Valley Line Southeast LRT (102 St Downtown - Mill Woods)',
        systemName: 'Edmonton Transit Service',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Modern low-floor street-level electric LRT operating every 5 minutes.',
        updatedMinutesAgo: 2
      },
      {
        id: 'yeg-t2',
        lineName: 'Capital Line LRT (Clareview - Century Park)',
        systemName: 'Edmonton Transit Service',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'North-south spine rail connecting Churchill, University, and Southgate.',
        updatedMinutesAgo: 3
      },
      {
        id: 'yeg-t3',
        lineName: 'Route 747 EIA Airport Express',
        systemName: 'Edmonton Transit Service',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Direct rapid bus link between Century Park LRT Station and Edmonton International Airport.',
        updatedMinutesAgo: 5
      }
    ],
    civicServices: [
      {
        id: 'yeg-c1',
        title: 'City of Edmonton 311 Online Portal',
        department: 'City of Edmonton',
        actionText: 'Report an Issue (311)',
        actionUrl: 'https://www.edmonton.ca/programs_services/311-city-services',
        description: 'Road clearing, pothole fixes, ETS transit alerts, and waste collection schedules.',
        phone: '311 (780-442-5311)'
      }
    ]
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
        title: 'O-Train East Extension Line 1 Nearing Passenger Readiness Testing',
        source: 'Ottawa Citizen',
        category: 'Civic',
        url: 'https://ottawacitizen.com',
        timeAgo: '45 mins ago',
        summary: 'OC Transpo begins simulated service across 5 new light rail stations reaching Trim Road.',
        expandedDetails: {
          keyTakeaways: [
            '12.5 km extension connects Blair Station to Orléans and Trim Road.',
            'Direct connection to downtown Parliament Hill and Tunney’s Pasture.',
            'Fully climate-controlled covered platforms with heated waiting shelters.'
          ],
          localImpact: 'Cuts east-end commuter highway traffic by an estimated 18,000 cars daily.',
          timeline: 'Public passenger opening Q1 2027.'
        }
      },
      {
        id: 'yow-n2',
        title: 'Parliament Hill Centre Block Rehabilitation Reaches Structural Milestone',
        source: 'CBC News Ottawa',
        category: 'Government',
        url: 'https://www.cbc.ca/news/canada/ottawa',
        timeAgo: '3 hours ago',
        summary: 'Historic stone heritage preservation and underground Parliament Welcome Centre excavation completed.',
        expandedDetails: {
          keyTakeaways: [
            'Major seismic reinforcement and green energy geothermal heating conversion under the Great Lawn.',
            'Peace Tower clock mechanism and Memorial Chamber stone restoration ongoing.',
            'Massive construction project employs thousands of heritage stonemasons and trades.'
          ],
          localImpact: 'Parliamentary Precinct public guided tours operating smoothly in West Block and Senate building.',
          timeline: 'Phased completion ongoing.'
        }
      },
      {
        id: 'yow-n3',
        title: 'Kanata North Technology Park Advances 6G Telecommunications & Defense AI',
        source: 'Ottawa Business Journal',
        category: 'Technology',
        url: 'https://obj.ca',
        timeAgo: '5 hours ago',
        summary: 'Canada’s largest tech park attracts $180M in federal defense AI and photonics research grants.',
        expandedDetails: {
          keyTakeaways: [
            'Over 540 tech companies and 33,000 software engineers based in Kanata North.',
            'Focus on autonomous connected vehicle testing and quantum encrypted satellite telecoms.',
            'Partnerships with Carleton University and University of Ottawa engineering labs.'
          ],
          localImpact: 'Reinforces Ottawa’s standing as a premier global telecommunications and defense tech capital.',
          timeline: 'Active tech scaling across 2026.'
        }
      }
    ],
    sports: [
      {
        id: 'yow-sp1',
        team: 'Ottawa Senators',
        opponent: 'Montreal Canadiens (Battle of the 417)',
        league: 'NHL',
        status: 'Upcoming',
        gameTime: 'Saturday • 7:00 PM',
        tvBroadcast: 'TSN 5 / RDS',
        isHome: true
      },
      {
        id: 'yow-sp2',
        team: 'Ottawa REDBLACKS',
        opponent: 'Toronto Argonauts',
        league: 'CFL',
        status: 'Upcoming',
        gameTime: 'Friday • 7:00 PM',
        tvBroadcast: 'TSN 1/4',
        isHome: true
      },
      {
        id: 'yow-sp3',
        team: 'Ottawa 67’s',
        opponent: 'Kingston Frontenacs',
        league: 'OHL',
        status: 'Final',
        score: '5 - 2 (W)',
        tvBroadcast: 'Rogers TV',
        isHome: true
      },
      {
        id: 'yow-sp4',
        team: 'Atlético Ottawa',
        opponent: 'Cavalry FC',
        league: 'CPL',
        status: 'Upcoming',
        gameTime: 'Sunday • 3:00 PM',
        tvBroadcast: 'OneSoccer',
        isHome: true
      }
    ],
    restaurants: [
      {
        id: 'yow-r1',
        name: 'Riviera',
        cuisine: 'Upscale New Canadian & Fine Cocktails in Historic 1920s Bank',
        neighborhood: 'Sparks Street / Downtown',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 2600,
        signatureDish: 'Lobster Pappardelle & Black Truffle Steak Tartare',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/riviera-ottawa',
        availableTimes: ['5:30 PM', '7:15 PM', '9:00 PM'],
        tag: 'Canada’s 100 Best & Parliament Power Spot'
      },
      {
        id: 'yow-r2',
        name: 'Atelier',
        cuisine: '12-Course Molecular Gastronomy Tasting Menu',
        neighborhood: 'Little Italy / Preston St',
        priceLevel: '$$$$',
        rating: 4.9,
        reviewCount: 1100,
        signatureDish: 'Helium Floating Sugar Balloon & Deconstructed Carrot Cake',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/atelier-ottawa',
        availableTimes: ['5:30 PM', '8:00 PM'],
        tag: 'Canada’s Culinary Pioneer'
      },
      {
        id: 'yow-r3',
        name: 'Play Food & Wine',
        cuisine: 'Small Plates & Sommelier Wine Pairings',
        neighborhood: 'ByWard Market / Sussex Dr',
        priceLevel: '$$$',
        rating: 4.7,
        reviewCount: 2900,
        signatureDish: 'Gnocchi with Roasted Squash & Maple-Glazed Pork Belly',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/play-food-and-wine-ottawa',
        availableTimes: ['5:15 PM', '7:00 PM', '8:45 PM'],
        tag: 'ByWard Market Classic'
      },
      {
        id: 'yow-r4',
        name: 'Beckta Dining & Wine',
        cuisine: 'Fine Contemporary Canadian & Heritage Mansion',
        neighborhood: 'Centretown / Elgin St',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 1800,
        signatureDish: 'Pan-Roasted Duck Breast with Cherry Glaze',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/beckta-dining-and-wine-ottawa',
        availableTimes: ['5:30 PM', '7:45 PM', '9:15 PM'],
        tag: 'Historic Grant House Flagship'
      },
      {
        id: 'yow-r5',
        name: 'Supply and Demand',
        cuisine: 'Housemade Pasta & Fresh Raw Seafood',
        neighborhood: 'Wellington West / Hintonburg',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 1950,
        signatureDish: 'Squid Ink Rigatoni & Albacore Tuna Crudo',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/supply-and-demand-ottawa',
        availableTimes: ['5:00 PM', '6:45 PM', '8:30 PM'],
        tag: 'Hintonburg Neighborhood Gem'
      },
      {
        id: 'yow-r6',
        name: 'The Whalesbone Oyster House',
        cuisine: 'Sustainable Fresh Oysters & Atlantic Seafood',
        neighborhood: 'Bank Street / Centretown',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 2200,
        signatureDish: 'Fresh Shucked Maritime Oysters & Lobster Roll',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/the-whalesbone-bank-st-ottawa',
        availableTimes: ['5:15 PM', '7:00 PM', '8:45 PM'],
        tag: 'Ottawa’s Premier Oyster Bar'
      }
    ],
    nightlife: [
      {
        id: 'yow-nl1',
        name: 'The Moonroom',
        category: 'Cocktail Lounge',
        neighborhood: 'Little Italy / Preston St',
        vibe: 'Candlelit bohemian cocktail sanctuary with Italian small bites, vinyl jazz records, and craft concoctions',
        coverOrVip: 'No cover • Cozy and intimate',
        hours: 'Daily • 5:00 PM - 2:00 AM',
        guestlistUrl: 'https://themoonroom.ca',
        tag: 'Intimate Candlelit Lounge'
      },
      {
        id: 'yow-nl2',
        name: 'The 27 Club',
        category: 'Live Music & Dance',
        neighborhood: 'ByWard Market / York St',
        vibe: 'High-energy live rock, punk, and electronic music venue with weekend dance parties and touring bands',
        coverOrVip: '$10 - $25 at door',
        hours: 'Thu - Sun • 8:00 PM - 2:00 AM',
        guestlistUrl: 'https://the27club.ca',
        tag: 'ByWard Market Live Music'
      },
      {
        id: 'yow-nl3',
        name: 'Charlotte',
        category: 'Cocktail Lounge',
        neighborhood: 'Centretown / Elgin St',
        vibe: 'Mid-century modern aesthetic lounge with velvet sofas, craft cocktails, natural wine, and weekend DJs',
        coverOrVip: 'No cover',
        hours: 'Tue - Sun • 4:00 PM - 2:00 AM',
        guestlistUrl: 'https://charlotteottawa.com',
        tag: 'Elgin Street Style Hub'
      }
    ],
    shows: [
      {
        id: 'yow-s1',
        title: 'National Arts Centre: NAC Orchestra - Beethoven & Brahms',
        venue: 'Southam Hall (National Arts Centre)',
        neighborhood: 'Downtown / Elgin St',
        category: 'Symphony',
        dates: 'Thursday & Saturday • 8:00 PM',
        ticketPriceRange: '$35 - $115',
        ticketUrl: 'https://nac-cna.ca',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald'
      },
      {
        id: 'yow-s2',
        title: 'NAC Indigenous Theatre: Tales from Turtle Island',
        venue: 'Babs Asper Theatre',
        neighborhood: 'National Arts Centre',
        category: 'Theatre',
        dates: 'Wed - Sun • 7:30 PM & 2:00 PM',
        ticketPriceRange: '$32 - $85',
        ticketUrl: 'https://nac-cna.ca',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald'
      },
      {
        id: 'yow-s3',
        title: 'Canadian Tire Centre Live: Pearl Jam World Tour',
        venue: 'Canadian Tire Centre',
        neighborhood: 'Kanata / Palladium Dr',
        category: 'Concert',
        dates: 'Next Month • 7:30 PM',
        ticketPriceRange: '$90 - $340',
        ticketUrl: 'https://www.ticketmaster.ca',
        ticketPlatform: 'Ticketmaster',
        availabilityStatus: 'Almost Sold Out',
        badgeColor: 'rose'
      },
      {
        id: 'yow-s4',
        title: 'Absolute Comedy: Standup Headliner Weekend',
        venue: 'Absolute Comedy Ottawa',
        neighborhood: 'Little Italy / Preston St',
        category: 'Comedy',
        dates: 'Thu - Sun • 8:00 PM & 10:30 PM',
        ticketPriceRange: '$18 - $25',
        ticketUrl: 'https://absolutecomedy.ca/ottawa',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Walk-ins Welcome',
        badgeColor: 'cyan'
      }
    ],
    hotels: [
      {
        id: 'yow-h1',
        name: 'Fairmont Château Laurier',
        neighborhood: 'Downtown (Overlooking Rideau Canal & Parliament)',
        rating: 4.8,
        reviewCount: 4900,
        pricePerNight: '$340 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/fairmont-chateau-laurier.html',
        bookingPlatform: 'Booking.com',
        amenities: ['Wilfrid’s Restaurant', 'Art Deco Indoor Pool', 'Zoe’s Lounge Afternoon Tea', 'Rideau Canal Views'],
        tag: 'Ottawa’s Historic Castle',
        description: 'French Renaissance castle hotel built in 1912 at the confluence of the Ottawa River and Rideau Canal locks.'
      },
      {
        id: 'yow-h2',
        name: 'Andaz Ottawa ByWard Market',
        neighborhood: 'ByWard Market / Dalhousie St',
        rating: 4.8,
        reviewCount: 2600,
        pricePerNight: '$270 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/andaz-ottawa-byward-market.html',
        bookingPlatform: 'Booking.com',
        amenities: ['Copper Spirits and Sights Rooftop Lounge', 'Feast + Revel Restaurant', 'Fitness Studio', 'Pet Friendly'],
        tag: 'Highest Rooftop in ByWard',
        description: 'Modern luxury boutique hotel featuring the city’s most famous rooftop terrace overlooking Parliament Hill and the Gatineau Hills.'
      },
      {
        id: 'yow-h3',
        name: 'ARC The Hotel',
        neighborhood: 'Downtown / Slater St',
        rating: 4.7,
        reviewCount: 1300,
        pricePerNight: '$210 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/arc-the-hotel.html',
        bookingPlatform: 'Booking.com',
        amenities: ['ARC Lounge & Bar', 'Belgian Chocolate Turn-down', 'Fitness Studio', 'Steps to Parliament'],
        tag: 'Design Boutique Hotel',
        description: 'Sophisticated design boutique hotel with sleek minimalist interiors and prime downtown walking access.'
      }
    ],
    experiences: [
      {
        id: 'yow-e1',
        title: 'Gatineau Park & Chelsea Nordik Spa Day Excursion from Ottawa',
        operator: 'Capital Nature Tours',
        category: 'Nature & Wildlife',
        duration: '6 Hours',
        rating: 4.9,
        reviewCount: 3100,
        priceFrom: '$89 / person',
        bookingUrl: 'https://www.viator.com/Ottawa/d624-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Pink Lake scenic lookout', 'Nordic outdoor thermal baths stop', 'Champlain Lookout panoramic view over Ottawa Valley'],
        badge: 'Capital Region Must-Do'
      },
      {
        id: 'yow-e2',
        title: 'Ottawa River Electric Boat Cruise & Parliament Panorama',
        operator: 'Paul’s Boat Lines',
        category: 'Sightseeing',
        duration: '1.5 Hours',
        rating: 4.8,
        reviewCount: 2600,
        priceFrom: '$36 / person',
        bookingUrl: 'https://www.viator.com/Ottawa/d624-ttd',
        bookingPlatform: 'Viator',
        highlights: ['100% electric zero-emission vessel', 'Views of Parliament Hill, Rideau Falls, and Supreme Court', 'Bilingual live narration'],
        badge: 'Waterfront Essential'
      },
      {
        id: 'yow-e3',
        title: 'ByWard Market Culinary & Historical Tasting Tour',
        operator: 'C’est Bon Culinary Experiences',
        category: 'Food Tour',
        duration: '2.5 Hours',
        rating: 4.9,
        reviewCount: 1850,
        priceFrom: '$69 / person',
        bookingUrl: 'https://www.viator.com/Ottawa/d624-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Iconic BeaverTails pastry tasting', 'Quebec artisan cheeses & maple delights', 'Historic market square stories'],
        badge: 'ByWard Foodie Favorite'
      },
      {
        id: 'yow-e4',
        title: '1000 Islands Gananoque Day Excursion & Castle Cruise from Ottawa',
        operator: '1000 Islands Tours',
        category: 'Sightseeing',
        duration: '8.5 Hours',
        rating: 4.9,
        reviewCount: 2200,
        priceFrom: '$125 / person',
        bookingUrl: 'https://www.viator.com/Ottawa/d624-ttd',
        bookingPlatform: 'Viator',
        highlights: ['St. Lawrence River island cruise', 'Views of historic Boldt Castle & Millionaire’s Row', 'Luxury coach transport'],
        badge: 'Ontario Scenic Gem'
      }
    ],
    outdoors: [
      {
        id: 'yow-o1',
        name: 'Rideau Canal Pathway & Locks National Historic Site',
        neighborhood: 'Downtown / The Glebe / Ottawa South',
        category: 'Urban Park',
        distanceOrSize: '8.5 km UNESCO World Heritage Canal Loop',
        difficulty: 'Easy Stroll',
        features: ['UNESCO World Heritage Site', 'Paved Cycling Pathway', 'Summer Boat Cruises', 'World’s Largest Skateway in Winter'],
        parkingTips: 'National Arts Centre underground parking or along Queen Elizabeth Driveway.',
        bestTime: 'Morning bike ride or sunny afternoon stroll along the canal locks.',
        tag: 'UNESCO World Heritage Canal'
      },
      {
        id: 'yow-o2',
        name: 'Gatineau Park & Pink Lake Trail',
        neighborhood: 'Gatineau Hills (15 mins from Parliament)',
        category: 'Hiking Trail',
        distanceOrSize: '361 sq km Park (2.5 km Pink Lake Loop)',
        difficulty: 'Moderate Trail',
        features: ['Rare Meromictic Turquoise Lake', 'Wooden Boardwalks & Forest Stairs', 'Champlain Lookout Escarpment'],
        parkingTips: 'Pink Lake parking lot or Gatineau Parkway shuttle.',
        bestTime: 'Autumn for world-class colorful fall foliage reflections on the water.',
        tag: 'Turquoise Meromictic Lake Hike'
      },
      {
        id: 'yow-o3',
        name: 'Major’s Hill Park & Nepean Point Lookout',
        neighborhood: 'Behind Château Laurier (Downtown)',
        category: 'Lookout Point',
        distanceOrSize: '5 Hectares Historic Park',
        difficulty: 'Easy Stroll',
        features: ['Stunning Parliament Hill & Ottawa River Views', 'Spring Tulip Festival Displays', 'Statue of Samuel de Champlain'],
        parkingTips: 'Park at ByWard Market parkades or walk from Sussex Drive.',
        bestTime: 'Sunset overlooking the Ottawa River and Parliament Hill silhouettes.',
        tag: 'Premier Postcard Lookout'
      }
    ],
    transitLines: [
      {
        id: 'yow-t1',
        lineName: 'O-Train Line 1 (Confederation Line LRT)',
        systemName: 'OC Transpo',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Electric light rail running from Tunney’s Pasture to Blair via downtown underground tunnel.',
        updatedMinutesAgo: 2
      },
      {
        id: 'yow-t2',
        lineName: 'O-Train Line 2 (Trillium Line)',
        systemName: 'OC Transpo',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Direct north-south rail link to Carleton University and Ottawa International Airport (YOW).',
        updatedMinutesAgo: 3
      },
      {
        id: 'yow-t3',
        lineName: 'Route 97 Transitway Airport Express',
        systemName: 'OC Transpo',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Dedicated transitway bus link between YOW Airport and Hurdman Station.',
        updatedMinutesAgo: 5
      }
    ],
    civicServices: [
      {
        id: 'yow-c1',
        title: 'City of Ottawa Client Service Centre (311)',
        department: 'City of Ottawa',
        actionText: 'Report to 311',
        actionUrl: 'https://ottawa.ca/en/3-1-1',
        description: 'Road repairs, snow plowing updates, garbage/recycling calendars, and municipal permits.',
        phone: '311 (613-580-2400)'
      }
    ]
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
        title: 'CentrePort Canada Rail-Direct Inland Port Breaks Ground on Global Logistics Expansion',
        source: 'Winnipeg Free Press',
        category: 'Logistics',
        url: 'https://www.winnipegfreepress.com',
        timeAgo: '45 mins ago',
        summary: 'North America’s largest trimodal inland port expands direct rail switching and cargo distribution.',
        expandedDetails: {
          keyTakeaways: [
            '20,000-acre development integrates CPKC and CN transcontinental rail with Winnipeg Airport.',
            'Attracts major agri-food, precision manufacturing, and international cold chain exporters.',
            'Direct heavy-truck trade corridor to US Midwest interstate networks.'
          ],
          localImpact: 'Drives long-term supply chain and manufacturing employment across Manitoba.',
          timeline: 'Phase 2 rail leads operational next year.'
        }
      },
      {
        id: 'ywg-n2',
        title: 'The Forks Waterfront Renewal Expands Indigenous Market and Public Spaces',
        source: 'CBC News Manitoba',
        category: 'Civic',
        url: 'https://www.cbc.ca/news/canada/manitoba',
        timeAgo: '3 hours ago',
        summary: 'New pedestrian bridges and Indigenous cultural gathering pavilions unveiled along the Red and Assiniboine rivers.',
        expandedDetails: {
          keyTakeaways: [
            'Revitalizes 6,000-year-old historic gathering site at the junction of two rivers.',
            'Year-round artisan food market, outdoor craft brewery patio, and boat launches.',
            'Winter skating trail infrastructure enhanced with warming huts by international architects.'
          ],
          localImpact: 'Provides a world-class gathering hub for 4 million annual visitors and local families.',
          timeline: 'Public pavilions open now.'
        }
      }
    ],
    sports: [
      {
        id: 'ywg-sp1',
        team: 'Winnipeg Jets',
        opponent: 'Minnesota Wild (Central Division Matchup)',
        league: 'NHL',
        status: 'Upcoming',
        gameTime: 'Saturday • 6:00 PM',
        tvBroadcast: 'Sportsnet / TSN 3',
        isHome: true
      },
      {
        id: 'ywg-sp2',
        team: 'Winnipeg Blue Bombers',
        opponent: 'Saskatchewan Roughriders (Banjo Bowl)',
        league: 'CFL',
        status: 'Upcoming',
        gameTime: 'Saturday • 3:00 PM',
        tvBroadcast: 'TSN 1/3',
        isHome: true
      },
      {
        id: 'ywg-sp3',
        team: 'Manitoba Moose',
        opponent: 'Grand Rapids Griffins',
        league: 'AHL' as any,
        status: 'Final',
        score: '3 - 2 (W)',
        tvBroadcast: 'AHLTV',
        isHome: true
      },
      {
        id: 'ywg-sp4',
        team: 'Valour FC',
        opponent: 'Forge FC',
        league: 'CPL',
        status: 'Upcoming',
        gameTime: 'Sunday • 2:00 PM',
        tvBroadcast: 'OneSoccer',
        isHome: true
      }
    ],
    restaurants: [
      {
        id: 'ywg-r1',
        name: 'Deer + Almond',
        cuisine: 'Playful Multi-Cultural Sharing Plates & Tapas',
        neighborhood: 'Exchange District / Princess St',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 2100,
        signatureDish: 'Beef Tartare with Smoked Oyster Mayo & Roast Duck Breast',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/deer-and-almond-winnipeg',
        availableTimes: ['5:30 PM', '7:15 PM', '9:00 PM'],
        tag: 'Mandel Hitzer Culinary Flagship'
      },
      {
        id: 'ywg-r2',
        name: 'Clementine Cafe',
        cuisine: 'World-Class Elevated Breakfast & Brunch',
        neighborhood: 'Exchange District / Princess St',
        priceLevel: '$$',
        rating: 4.9,
        reviewCount: 3800,
        signatureDish: 'Braised Duck Leg with Poached Eggs & Sugar Pie Waffle',
        bookingPlatform: 'Direct',
        reservationUrl: 'https://clementinewinnipeg.com',
        availableTimes: ['Walk-in Only Daily 8AM - 3PM'],
        tag: 'Canada’s Best Brunch'
      },
      {
        id: 'ywg-r3',
        name: '529 Wellington',
        cuisine: 'Prime Steaks & Fine Wine in Historic 1912 Riverside Mansion',
        neighborhood: 'Crescentwood / Wellington Crescent',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 1900,
        signatureDish: 'Prime Ribeye Steak & Jumbo Lump Crab Cake',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/529-wellington-winnipeg',
        availableTimes: ['5:00 PM', '7:30 PM', '9:15 PM'],
        tag: 'Winnipeg Premier Steakhouse'
      },
      {
        id: 'ywg-r4',
        name: 'Sous Sol',
        cuisine: 'Speakeasy French Bistro with Vintage Candlelight',
        neighborhood: 'Osborne Village',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 1400,
        signatureDish: 'Steak Frites & Duck Confit Parmentier',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/sous-sol-winnipeg',
        availableTimes: ['5:15 PM', '7:30 PM', '9:30 PM'],
        tag: 'Hidden Cellar Gem'
      },
      {
        id: 'ywg-r5',
        name: 'Passero',
        cuisine: 'Contemporary Italian & Hand-Rolled Pasta',
        neighborhood: 'The Forks Market',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 1600,
        signatureDish: 'Truffle Gnocchi & Crispy Squid with Calabrian Chili',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/passero-winnipeg',
        availableTimes: ['5:00 PM', '7:00 PM', '8:45 PM'],
        tag: 'Scott Bagshaw Trattoria'
      }
    ],
    nightlife: [
      {
        id: 'ywg-nl1',
        name: 'The King’s Head Pub',
        category: 'Irish Pub',
        neighborhood: 'Exchange District / King St',
        vibe: 'Classic 2-floor British party pub with 30+ draft beers, live local indie rock and Celtic bands',
        coverOrVip: 'No cover most nights • $5 - $10 on band nights',
        hours: 'Daily • 11:30 AM - 2:00 AM',
        guestlistUrl: 'https://kingshead.ca',
        tag: 'Historic Exchange District Pub'
      },
      {
        id: 'ywg-nl2',
        name: '441 Main',
        category: 'Nightclub',
        neighborhood: 'Downtown / Main St',
        vibe: 'High-energy weekend dance venue with bottle service booths, LED lighting rigs, and top resident hip hop DJs',
        coverOrVip: '$10 - $25 • VIP Tables',
        hours: 'Fri & Sat • 10:00 PM - 2:00 AM',
        guestlistUrl: 'https://441main.ca',
        tag: 'Downtown Dance Spot'
      },
      {
        id: 'ywg-nl3',
        name: 'The Toad in the Hole',
        category: 'Live Music & Dance',
        neighborhood: 'Osborne Village',
        vibe: 'Legendary neighborhood dive & live music venue with craft beers, whisky bar, and eclectic local performers',
        coverOrVip: 'No cover',
        hours: 'Daily • 4:00 PM - 2:00 AM',
        guestlistUrl: 'https://thetoad.ca',
        tag: 'Osborne Village Classic'
      }
    ],
    shows: [
      {
        id: 'ywg-s1',
        title: 'Royal Manitoba Theatre Centre: The Sound of Music',
        venue: 'Royal MTC (John Hirsch Mainstage)',
        neighborhood: 'Exchange District / Market Ave',
        category: 'Theatre',
        dates: 'Tue - Sun • 7:30 PM & 2:00 PM',
        ticketPriceRange: '$35 - $110',
        ticketUrl: 'https://royalmtc.ca',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald'
      },
      {
        id: 'ywg-s2',
        title: 'Winnipeg Symphony Orchestra: Tchaikovsky 1812 Overture',
        venue: 'Centennial Concert Hall',
        neighborhood: 'Downtown / Main St',
        category: 'Symphony',
        dates: 'Friday & Saturday • 7:30 PM',
        ticketPriceRange: '$30 - $95',
        ticketUrl: 'https://wso.ca',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Selling Fast',
        badgeColor: 'amber'
      },
      {
        id: 'ywg-s3',
        title: 'Canada Life Centre Live: Shania Twain - Queen of Me Tour',
        venue: 'Canada Life Centre',
        neighborhood: 'Downtown / Portage Ave',
        category: 'Concert',
        dates: 'Next Month • 7:30 PM',
        ticketPriceRange: '$75 - $280',
        ticketUrl: 'https://www.ticketmaster.ca',
        ticketPlatform: 'Ticketmaster',
        availabilityStatus: 'Almost Sold Out',
        badgeColor: 'rose'
      },
      {
        id: 'ywg-s4',
        title: 'Rumor’s Comedy Club: Pro Standup Weekend',
        venue: 'Rumor’s Restaurant & Comedy Club',
        neighborhood: 'Tuxedo / Corydon Ave',
        category: 'Comedy',
        dates: 'Wed - Sat • 7:45 PM & 10:15 PM',
        ticketPriceRange: '$18 - $25',
        ticketUrl: 'https://rumorscomedyclub.com',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Walk-ins Welcome',
        badgeColor: 'cyan'
      }
    ],
    hotels: [
      {
        id: 'ywg-h1',
        name: 'The Fort Garry Hotel, Spa and Conference Centre',
        neighborhood: 'Downtown / Broadway',
        rating: 4.8,
        reviewCount: 3200,
        pricePerNight: '$220 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/the-fort-garry.html',
        bookingPlatform: 'Booking.com',
        amenities: ['Ten Spa & Turkish Hamam', 'Oval Room Brasserie', 'Fitness Centre', 'Historic Ballroom'],
        tag: '1913 Grand Railway Hotel',
        description: 'Iconic château railway hotel renowned for world-class Turkish Hamam spa treatments and jazz brunches.'
      },
      {
        id: 'ywg-h2',
        name: 'Inn at the Forks',
        neighborhood: 'The Forks Historic Site',
        rating: 4.8,
        reviewCount: 2400,
        pricePerNight: '$235 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/inn-at-the-forks.html',
        bookingPlatform: 'Booking.com',
        amenities: ['SMITH Restaurant', 'Riverstone Spa', 'Steps to Canadian Museum for Human Rights', 'Pet Friendly'],
        tag: 'Waterfront Boutique Luxury',
        description: 'Contemporary boutique hotel situated at the historic junction of the Red and Assiniboine rivers.'
      }
    ],
    experiences: [
      {
        id: 'ywg-e1',
        title: 'Journey to Churchill: Polar Bear & Arctic Safari at Assiniboine Park',
        operator: 'Assiniboine Park Zoo',
        category: 'Nature & Wildlife',
        duration: '3.5 Hours',
        rating: 4.9,
        reviewCount: 4200,
        priceFrom: '$26 / person',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=Winnipeg',
        bookingPlatform: 'Viator',
        highlights: ['Underwater glass viewing tunnels with swimming polar bears', 'Arctic fox & snowy owl habitats', 'Interactive climate dome'],
        badge: 'Manitoba #1 Attraction'
      },
      {
        id: 'ywg-e2',
        title: 'The Forks & Historic Exchange District Architectural Walking Tour',
        operator: 'Winnipeg Architecture Foundation',
        category: 'Historic Walk',
        duration: '2.5 Hours',
        rating: 4.8,
        reviewCount: 1600,
        priceFrom: '$29 / person',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=Winnipeg',
        bookingPlatform: 'Viator',
        highlights: ['North America’s largest intact collection of early 1900s Chicago-style terra cotta buildings', 'Bankers row history', 'Local artisan coffee stop'],
        badge: 'Architectural Gem'
      }
    ],
    outdoors: [
      {
        id: 'ywg-o1',
        name: 'The Forks Historic National Site & Riverwalk',
        neighborhood: 'Downtown / Waterfront',
        category: 'Urban Park',
        distanceOrSize: '22 Hectares Riverfront',
        difficulty: 'Easy Stroll',
        features: ['Riverwalk Promenade', 'Red & Assiniboine River Confluence', 'Oodena Celebration Circle', 'Winter Nestaweya Skating Trail'],
        parkingTips: 'The Forks surface and parkade parking lots.',
        bestTime: 'Sunset along the riverbank or winter skating.',
        tag: '6,000-Year Historic Meeting Place'
      },
      {
        id: 'ywg-o2',
        name: 'Assiniboine Park & The Leaf Biomes',
        neighborhood: 'Tuxedo / Assiniboine River',
        category: 'Urban Park',
        distanceOrSize: '445 Hectares Historic Park',
        difficulty: 'Easy Stroll',
        features: ['The Leaf Tropical & Mediterranean Biomes', 'English Garden', 'Leo Mol Sculpture Garden', 'Duck Pond'],
        parkingTips: 'Ample free parking lots across Assiniboine Park.',
        bestTime: 'Afternoon stroll through botanical gardens and sculpture walks.',
        tag: 'Winnipeg Green Heart'
      }
    ],
    transitLines: [
      {
        id: 'ywg-t1',
        lineName: 'Winnipeg Transit Plus BLUE Rapid Transit Line',
        systemName: 'Winnipeg Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Dedicated grade-separated high speed transitway connecting Downtown, Jubilee, and University of Manitoba.',
        updatedMinutesAgo: 3
      },
      {
        id: 'ywg-t2',
        lineName: 'Route 15 Airport - Mountain Express',
        systemName: 'Winnipeg Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Frequent service connecting Winnipeg James Armstrong Richardson International Airport (YWG) and Downtown.',
        updatedMinutesAgo: 6
      }
    ],
    civicServices: [
      {
        id: 'ywg-c1',
        title: 'City of Winnipeg 311 Services',
        department: 'City of Winnipeg',
        actionText: 'Report to 311',
        actionUrl: 'https://winnipeg.ca/311',
        description: 'Snow clearing zones, waste pickup, water service updates, and municipal permits.',
        phone: '311 (204-986-5311)'
      }
    ]
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
        title: 'Halifax Ferry Fleet Modernization Adds Mill Cove Electric Fast Ferries',
        source: 'The Chronicle Herald',
        category: 'Civic',
        url: 'https://www.thechronicleherald.ca',
        timeAgo: '45 mins ago',
        summary: 'Halifax Transit awards build contracts for 5 zero-emission catamaran ferries connecting Bedford Basin directly to Downtown.',
        expandedDetails: {
          keyTakeaways: [
            'High-speed electric ferries will carry commuters from Bedford to Halifax Waterfront in 18 minutes.',
            'Net-zero shore charging infrastructure at both terminal docks.',
            'Complements operating Alderney and Woodside harbour ferry services.'
          ],
          localImpact: 'Eliminates thousands of daily rush hour cars along the Bedford Highway corridor.',
          timeline: 'Vessel delivery commences late 2026.'
        }
      },
      {
        id: 'yhz-n2',
        title: 'Irving Shipbuilding Cuts Steel on Next-Gen Canadian Surface Combatant',
        source: 'Atlantic Business Magazine',
        category: 'Maritime',
        url: 'https://atlanticbusinessmagazine.net',
        timeAgo: '3 hours ago',
        summary: 'National Shipbuilding Strategy reaches milestone in constructing the Royal Canadian Navy River-class destroyers.',
        expandedDetails: {
          keyTakeaways: [
            'Halifax Shipyard builds 15 advanced multi-mission naval warships.',
            'Generates over 10,000 direct and indirect marine tech careers in Atlantic Canada.',
            'Positions Halifax as a premier NATO naval defense and shipbuilding hub.'
          ],
          localImpact: 'Drives specialized engineering procurement and regional industrial apprenticeships.',
          timeline: 'Construction active across shipyard facilities.'
        }
      },
      {
        id: 'yhz-n3',
        title: 'Canada’s Ocean Supercluster Injects $35M into Marine AI & Ocean Tech',
        source: 'Entrevestor',
        category: 'Technology',
        url: 'https://entrevestor.com',
        timeAgo: '5 hours ago',
        summary: 'Halifax-headquartered ocean cluster backs autonomous subsea robotics and environmental sensor startups.',
        expandedDetails: {
          keyTakeaways: [
            'COVE (Centre for Ocean Ventures & Entrepreneurship) hosts over 70 ocean tech startups in Dartmouth.',
            'Commercialization of sonar AI, autonomous underwater vehicles (AUVs), and tidal turbine sensors.',
            'Global export partnerships with European and US maritime leaders.'
          ],
          localImpact: 'Expands high-wage ocean engineering and machine learning roles.',
          timeline: 'New funding rounds active.'
        }
      }
    ],
    sports: [
      {
        id: 'yhz-sp1',
        team: 'Halifax Mooseheads',
        opponent: 'Moncton Wildcats (QMJHL Rivalry)',
        league: 'QMJHL',
        status: 'Upcoming',
        gameTime: 'Saturday • 7:00 PM',
        tvBroadcast: 'Eastlink Community TV / QMJHL Live',
        isHome: true
      },
      {
        id: 'yhz-sp2',
        team: 'HFX Wanderers FC',
        opponent: 'Pacific FC',
        league: 'CPL',
        status: 'Upcoming',
        gameTime: 'Saturday • 2:00 PM',
        tvBroadcast: 'OneSoccer',
        isHome: true
      },
      {
        id: 'yhz-sp3',
        team: 'Halifax Thunderbirds',
        opponent: 'Toronto Rock',
        league: 'NLL',
        status: 'Upcoming',
        gameTime: 'Friday • 7:30 PM',
        tvBroadcast: 'TSN+',
        isHome: true
      }
    ],
    restaurants: [
      {
        id: 'yhz-r1',
        name: 'The Bicycle Thief',
        cuisine: 'North American Italian & Fresh Atlantic Seafood',
        neighborhood: 'Downtown Waterfront / Bishop’s Landing',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 4200,
        signatureDish: 'Spaghettoni ai Frutti di Mare & Beef Carpaccio',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/the-bicycle-thief-halifax',
        availableTimes: ['5:30 PM', '7:00 PM', '8:45 PM'],
        tag: 'Halifax Waterfront Classic'
      },
      {
        id: 'yhz-r2',
        name: 'Bar Kismet',
        cuisine: 'Seafood, Handmade Pasta & Bespoke Cocktails',
        neighborhood: 'North End / Agricola St',
        priceLevel: '$$$',
        rating: 4.9,
        reviewCount: 1400,
        signatureDish: 'Halibut Carpaccio & Lobster Agnolotti',
        bookingPlatform: 'Resy',
        reservationUrl: 'https://resy.com/cities/halifax-ns/venues/bar-kismet',
        availableTimes: ['5:45 PM', '7:30 PM', '9:15 PM'],
        tag: 'Canada’s #2 Best Bar / Resto'
      },
      {
        id: 'yhz-r3',
        name: 'Drift',
        cuisine: 'Elevated Maritime Classics & Oceanfront Dining',
        neighborhood: 'Queen’s Marque / Waterfront',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 1850,
        signatureDish: 'Nova Scotia Lobster Pot Pie & Hodge Podge Stew',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/drift-halifax',
        availableTimes: ['5:00 PM', '7:15 PM', '9:00 PM'],
        tag: 'Queen’s Marque Architectural Star'
      },
      {
        id: 'yhz-r4',
        name: 'The Press Gang Restaurant & Oyster Bar',
        cuisine: 'Fine Dining & Historic 1759 Stone Cellar',
        neighborhood: 'Downtown / Prince St',
        priceLevel: '$$$$',
        rating: 4.7,
        reviewCount: 2200,
        signatureDish: 'Pan-Seared Halibut & Fresh Shucked Maritime Oysters',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/the-press-gang-restaurant-and-oyster-bar-halifax',
        availableTimes: ['5:30 PM', '7:30 PM', '9:00 PM'],
        tag: '1759 Historic Stone Cellar'
      },
      {
        id: 'yhz-r5',
        name: 'Highwayman Restaurant & Bar',
        cuisine: 'Spanish Tapas, Cured Meats & Sherry Cocktails',
        neighborhood: 'Downtown / Argyle St',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 1100,
        signatureDish: 'Jamón Ibérico & Pulpo Gallego (Galician Octopus)',
        bookingPlatform: 'Direct',
        reservationUrl: 'https://highwaymanhfx.com',
        availableTimes: ['5:00 PM', '7:00 PM', '9:15 PM'],
        tag: 'Argyle Street Tapas Jewel'
      }
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
        tag: 'Legendary Maritime Pub'
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
        tag: 'Downtown Dance Spot'
      },
      {
        id: 'yhz-nl3',
        name: 'The Split Crow Pub',
        category: 'Irish Pub',
        neighborhood: 'Downtown / Granville St',
        vibe: 'Nova Scotia’s oldest tavern (since 1749) featuring live acoustic singalongs, tavern steaks, and maritime hospitality',
        coverOrVip: 'No cover',
        hours: 'Daily • 11:00 AM - 2:00 AM',
        guestlistUrl: 'https://splitcrow.com',
        tag: 'Nova Scotia’s Oldest Tavern'
      }
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
        ticketUrl: 'https://www.neptunetheatre.com',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald'
      },
      {
        id: 'yhz-s2',
        title: 'Symphony Nova Scotia: Celtic & Maritime Spectacular',
        venue: 'Rebecca Cohn Auditorium',
        neighborhood: 'Dalhousie Arts Centre',
        category: 'Symphony',
        dates: 'Friday & Saturday • 7:30 PM',
        ticketPriceRange: '$35 - $95',
        ticketUrl: 'https://symphonynovascotia.ca',
        ticketPlatform: 'Ticket Atlantic',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald'
      },
      {
        id: 'yhz-s3',
        title: 'Scotiabank Centre Live: Arkells - Big Feelings Tour',
        venue: 'Scotiabank Centre',
        neighborhood: 'Downtown / Carmichael St',
        category: 'Concert',
        dates: 'Next Month • 8:00 PM',
        ticketPriceRange: '$55 - $165',
        ticketUrl: 'https://www.ticketatlantic.com',
        ticketPlatform: 'Ticket Atlantic',
        availabilityStatus: 'Selling Fast',
        badgeColor: 'amber'
      }
    ],
    hotels: [
      {
        id: 'yhz-h1',
        name: 'The Muir, Autograph Collection',
        neighborhood: 'Queen’s Marque / Waterfront',
        rating: 4.9,
        reviewCount: 650,
        pricePerNight: '$380 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/muir-autograph-collection.html',
        bookingPlatform: 'Booking.com',
        amenities: ['Private Yacht Experience (Little Muir)', 'Windward Wellness Spa', 'Drift Restaurant', 'Bespoke Art Gallery'],
        tag: 'Ultra-Luxury Waterfront',
        description: 'Halifax’s preeminent 5-star hotel offering curated Nova Scotian art, private yacht cruises, and harbour oceanfront views.'
      },
      {
        id: 'yhz-h2',
        name: 'The Lord Nelson Hotel & Suites',
        neighborhood: 'Spring Garden / South Park St',
        rating: 4.7,
        reviewCount: 2800,
        pricePerNight: '$210 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/the-lord-nelson-and-suites.html',
        bookingPlatform: 'Booking.com',
        amenities: ['The Arms Public House', 'Opposite Halifax Public Gardens', 'Fitness Centre', 'Pet Friendly'],
        tag: '1928 Historic Landmark',
        description: 'Beloved historic hotel overlooking the Victorian Halifax Public Gardens, steps from Spring Garden boutiques.'
      }
    ],
    experiences: [
      {
        id: 'yhz-e1',
        title: 'Peggy’s Cove Lighthouse & Coastal Fishing Village Tour',
        operator: 'Ambassatours Gray Line',
        category: 'Sightseeing',
        duration: '3.5 Hours',
        rating: 4.9,
        reviewCount: 4500,
        priceFrom: '$59 / person',
        bookingUrl: 'https://www.viator.com/Halifax/d4416-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Iconic Peggy’s Point Lighthouse', 'Granite rock coastline exploration', 'Fresh lobster roll tasting option'],
        badge: 'East Coast Must-Do'
      },
      {
        id: 'yhz-e2',
        title: 'Lunenburg UNESCO Historic Town & Mahone Bay Tour',
        operator: 'Atlantic Day Excursions',
        category: 'Sightseeing',
        duration: '7 Hours',
        rating: 4.9,
        reviewCount: 2900,
        priceFrom: '$95 / person',
        bookingUrl: 'https://www.viator.com/Halifax/d4416-ttd',
        bookingPlatform: 'Viator',
        highlights: ['UNESCO World Heritage town of Lunenburg', 'Bluenose II schooner wharf', 'Mahone Bay 3 churches photo stop'],
        badge: 'UNESCO Heritage Excursion'
      },
      {
        id: 'yhz-e3',
        title: 'Halifax Harbour Tall Ship Silva Sailing Cruise',
        operator: 'Tall Ship Silva',
        category: 'Helicopter / Cruise',
        duration: '1.5 Hours',
        rating: 4.8,
        reviewCount: 2100,
        priceFrom: '$42 / person',
        bookingUrl: 'https://www.viator.com/Halifax/d4416-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Sail aboard historic 130-foot tall ship', 'Panoramic views of Georges Island & naval dockyards', 'Onboard maritime pub & live music'],
        badge: 'Top Harbour Cruise'
      }
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
        tag: 'Coastal Ocean Park'
      },
      {
        id: 'yhz-o2',
        name: 'Halifax Citadel National Historic Site',
        neighborhood: 'Downtown / Citadel Hill',
        category: 'Lookout Point',
        distanceOrSize: 'Historic Star-Shaped Fort Fortress',
        difficulty: 'Easy Stroll',
        features: ['Noon Gun Cannon Firing Daily', '360 Panoramic City & Harbour Lookout', '78th Highlanders Guard Ceremonies'],
        parkingTips: 'Paid parking at fort summit or downtown parkades.',
        bestTime: '11:45 AM to witness the famous Noon Gun firing ceremony.',
        tag: 'Iconic Star Fortress'
      }
    ],
    transitLines: [
      {
        id: 'yhz-t1',
        lineName: 'Halifax Ferry (Halifax Waterfront - Alderney Landing)',
        systemName: 'Halifax Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Scenic 12-minute harbour crossing running every 15 minutes with panoramic skyline views.',
        updatedMinutesAgo: 2
      },
      {
        id: 'yhz-t2',
        lineName: 'Halifax Ferry (Halifax Waterfront - Woodside)',
        systemName: 'Halifax Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Direct harbour link to Dartmouth South and NSCC Waterfront Campus.',
        updatedMinutesAgo: 4
      },
      {
        id: 'yhz-t3',
        lineName: 'Route 320 MetroX Airport Express',
        systemName: 'Halifax Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Express highway bus link between Halifax Stanfield International Airport (YHZ) and Downtown.',
        updatedMinutesAgo: 6
      }
    ],
    civicServices: [
      {
        id: 'yhz-c1',
        title: 'Halifax 311 Citizen Contact Centre',
        department: 'Halifax Regional Municipality',
        actionText: 'Report to Halifax 311',
        actionUrl: 'https://www.halifax.ca/home/311-contact-centre',
        description: 'Road clearing, parking enforcement, waste collection calendars, and municipal permits.',
        phone: '311 (902-490-4000)'
      }
    ]
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
        title: 'Crystal Pool Modern Replacement & Multi-Sport Complex Enters Construction Phase',
        source: 'Times Colonist',
        category: 'Civic',
        url: 'https://www.timescolonist.com',
        timeAgo: '40 mins ago',
        summary: 'City Council awards tenders for $168M state-of-the-art zero-carbon aquatic facility.',
        expandedDetails: {
          keyTakeaways: [
            '50-metre competition pool, wellness hot pools, therapy spaces, and fitness gym.',
            'Geothermal heat exchange system will achieve net-zero carbon operations.',
            'Expands green space in Central Park with new playgrounds and cycling paths.'
          ],
          localImpact: 'Provides a modern community wellness hub for generations of Island families.',
          timeline: 'Groundbreaking this autumn with 2028 opening target.'
        }
      },
      {
        id: 'yyj-n2',
        title: 'Victoria Clean Marine Cluster Tests All-Electric Harbour Ferries',
        source: 'Douglas Magazine / Business Desk',
        category: 'Maritime',
        url: 'https://douglasmagazine.com',
        timeAgo: '3 hours ago',
        summary: 'Victoria Harbour Ferry fleet trials zero-emission quiet electric propulsion for Inner Harbour crossings.',
        expandedDetails: {
          keyTakeaways: [
            'Quiet electric motors eliminate underwater noise to protect local Salish Sea marine life.',
            'Solar-assisted fast-charging dock installed at Fisherman’s Wharf.',
            'Positions Victoria as a model for sustainable urban eco-tourism.'
          ],
          localImpact: 'Reduces noise and emissions across the bustling Inner Harbour waterway.',
          timeline: 'Full fleet rollout planned for next season.'
        }
      }
    ],
    sports: [
      {
        id: 'yyj-sp1',
        team: 'Victoria Royals',
        opponent: 'Vancouver Giants (Island vs Mainland WHL Rivalry)',
        league: 'WHL',
        status: 'Upcoming',
        gameTime: 'Saturday • 7:05 PM',
        tvBroadcast: 'WHL Live / CHEK TV',
        isHome: true
      },
      {
        id: 'yyj-sp2',
        team: 'Pacific FC',
        opponent: 'Vancouver FC (BC Derby)',
        league: 'CPL',
        status: 'Upcoming',
        gameTime: 'Sunday • 3:00 PM',
        tvBroadcast: 'OneSoccer',
        isHome: true
      },
      {
        id: 'yyj-sp3',
        team: 'Victoria HarbourCats',
        opponent: 'Bellingham Bells',
        league: 'BSL' as any,
        status: 'Final',
        score: '6 - 3 (W)',
        tvBroadcast: 'WCL Live',
        isHome: true
      }
    ],
    restaurants: [
      {
        id: 'yyj-r1',
        name: 'The Courtney Room',
        cuisine: 'Elevated Pacific Northwest & Vancouver Island Foraged',
        neighborhood: 'Downtown / Inner Harbour (The Magnolia Hotel)',
        priceLevel: '$$$$',
        rating: 4.8,
        reviewCount: 1900,
        signatureDish: 'Dry-Aged Duck Breast & Qualicum Bay Scallops',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/the-courtney-room-victoria',
        availableTimes: ['5:15 PM', '7:00 PM', '8:45 PM'],
        tag: 'Canada’s 100 Best & Wine Spectator'
      },
      {
        id: 'yyj-r2',
        name: 'Brasserie L’Ecole',
        cuisine: 'Authentic French Brasserie & Steak Frites',
        neighborhood: 'Chinatown / Fisgard St',
        priceLevel: '$$$',
        rating: 4.9,
        reviewCount: 2200,
        signatureDish: 'Steak Frites with Roquefort Butter & Moules Marinières',
        bookingPlatform: 'Direct',
        reservationUrl: 'https://lecole.ca',
        availableTimes: ['Walk-in Only Tue - Sat 5:30 PM'],
        tag: 'Victoria’s Most Beloved Bistro'
      },
      {
        id: 'yyj-r3',
        name: 'Ferris’ Upstairs Seafood & Oyster Bar',
        cuisine: 'Fresh Pacific Oysters, Seafood & Tapas',
        neighborhood: 'Downtown / Yates St',
        priceLevel: '$$$',
        rating: 4.7,
        reviewCount: 1800,
        signatureDish: 'Pan-Roasted Halibut & Fanny Bay Oyster Platter',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/ferris-upstairs-seafood-and-oyster-bar-victoria',
        availableTimes: ['5:00 PM', '7:15 PM', '9:00 PM'],
        tag: 'Victoria Oyster Destination'
      },
      {
        id: 'yyj-r4',
        name: 'Nourish Kitchen & Cafe',
        cuisine: 'Wholesome Farm-to-Table & Natural Wine in 1888 Heritage House',
        neighborhood: 'James Bay / Quebec St (Near Harbour)',
        priceLevel: '$$',
        rating: 4.8,
        reviewCount: 2600,
        signatureDish: 'Golden Benny on Sweet Potato Waffle & Bone Broth',
        bookingPlatform: 'Direct',
        reservationUrl: 'https://nourishkitchen.ca',
        availableTimes: ['Daytime & Evening Dinners'],
        tag: 'James Bay Heritage Darling'
      }
    ],
    nightlife: [
      {
        id: 'yyj-nl1',
        name: 'Clive’s Classic Lounge',
        category: 'Cocktail Lounge',
        neighborhood: 'Downtown / Chateau Victoria',
        priceLevel: '$$$',
        vibe: 'World-renowned leather armchair cocktail sanctuary pioneering classic mixology and rare single malt whiskeys',
        coverOrVip: 'No cover • Tales of the Cocktail Best International Bar',
        hours: 'Daily • 5:00 PM - 12:00 AM',
        guestlistUrl: 'https://clivesclassiclounge.com',
        tag: 'World’s 50 Best Classic Bar'
      },
      {
        id: 'yyj-nl2',
        name: 'The Drake Eatery & Craft Beer Parlour',
        category: 'Live Music & Dance',
        neighborhood: 'Old Town / Market Square',
        vibe: 'Pacific Northwest craft beer institution with 30 rotating independent taps, open-air brick courtyard patio',
        coverOrVip: 'No cover',
        hours: 'Daily • 12:00 PM - 12:00 AM',
        guestlistUrl: 'https://drakeeatery.com',
        tag: 'Market Square Craft Beer Hub'
      }
    ],
    shows: [
      {
        id: 'yyj-s1',
        title: 'Royal Theatre: Victoria Symphony - Mozart & Dvořák',
        venue: 'Royal Theatre',
        neighborhood: 'Downtown / Broughton St',
        category: 'Symphony',
        dates: 'Saturday & Sunday • 8:00 PM & 2:30 PM',
        ticketPriceRange: '$32 - $98',
        ticketUrl: 'https://www.rmts.bc.ca',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald'
      },
      {
        id: 'yyj-s2',
        title: 'Belfry Theatre: Canadian Premier Play',
        venue: 'The Belfry Theatre',
        neighborhood: 'Fernwood Square',
        category: 'Theatre',
        dates: 'Tue - Sun • 7:30 PM & 2:00 PM',
        ticketPriceRange: '$28 - $65',
        ticketUrl: 'https://www.belfry.bc.ca',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald'
      }
    ],
    hotels: [
      {
        id: 'yyj-h1',
        name: 'Fairmont Empress',
        neighborhood: 'Inner Harbour / Government St',
        rating: 4.8,
        reviewCount: 5800,
        pricePerNight: '$420 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/the-fairmont-empress.html',
        bookingPlatform: 'Booking.com',
        amenities: ['World-Famous Afternoon Tea', 'Q at the Empress Dining', 'Willow Stream Spa', 'Inner Harbour Views'],
        tag: 'Victoria’s Castle on the Harbour',
        description: 'Iconic 1908 harbour landmark where royalty stays, celebrated for traditional afternoon tea and harbourfront gardens.'
      },
      {
        id: 'yyj-h2',
        name: 'The Magnolia Hotel & Spa',
        neighborhood: 'Downtown / Courtney St',
        rating: 4.9,
        reviewCount: 2200,
        pricePerNight: '$310 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/the-magnolia-and-spa.html',
        bookingPlatform: 'Booking.com',
        amenities: ['The Courtney Room Dining', 'Spa Magnolia', 'Complimentary Curated Trail Bikes', 'Inner Harbour Access'],
        tag: 'Top Boutique Luxury in Canada',
        description: 'Award-winning luxury boutique hotel recognized on Condé Nast Gold Lists for personalized service and culinary excellence.'
      }
    ],
    experiences: [
      {
        id: 'yyj-e1',
        title: 'The Butchart Gardens & Scenic Floatplane Day Excursion',
        operator: 'CVS Tours & Harbour Air',
        category: 'Sightseeing',
        duration: '4.5 Hours',
        rating: 4.9,
        reviewCount: 5900,
        priceFrom: '$75 / person',
        bookingUrl: 'https://www.viator.com/Victoria/d617-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Sunken Garden & Ross Fountain', 'Japanese Garden & Rose Garden', 'Direct express shuttle from Inner Harbour'],
        badge: 'World-Renowned Botanical Garden'
      },
      {
        id: 'yyj-e2',
        title: 'Victoria Wild Orca & Humpback Whale Watching Zodiac Safari',
        operator: 'Eagle Wing Whale Watching Tours',
        category: 'Nature & Wildlife',
        duration: '3.5 Hours',
        rating: 4.9,
        reviewCount: 3800,
        priceFrom: '$165 / person',
        bookingUrl: 'https://www.viator.com/Victoria/d617-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Salish Sea killer whales & humpback encounters', 'Marine biologist guided narration', 'Eco-certified carbon neutral tour'],
        badge: 'Canada #1 Whale Safari'
      },
      {
        id: 'yyj-e3',
        title: 'Mount Washington Alpine Resort Lift Tickets & Vancouver Island Snow Pass',
        operator: 'Mount Washington Alpine Resort',
        category: 'Ski & Alpine Resort',
        duration: 'Full Day / Season',
        rating: 4.8,
        reviewCount: 2100,
        priceFrom: '$119 / day pass',
        bookingUrl: 'https://www.mountwashington.ca',
        bookingPlatform: 'MountainAdventure',
        highlights: ['Vancouver Island’s premier alpine playground with 1,700 acres', 'Epic coastal deep powder with Pacific Ocean views from the peaks', 'Night skiing, cross-country Nordic trails & snow tubing park'],
        badge: 'Island Alpine Haven'
      },
      {
        id: 'yyj-e4',
        title: 'Malahat SkyWalk & Salish Sea Coastal Mountain Lookout',
        operator: 'Malahat SkyWalk Experience',
        category: 'Mountain Sightseeing',
        duration: '2.5 - 3.5 Hours',
        rating: 4.9,
        reviewCount: 4400,
        priceFrom: '$36 / person',
        bookingUrl: 'https://www.viator.com/Victoria/d617-ttd',
        bookingPlatform: 'Viator',
        highlights: ['Walk 250 meters above sea level on spiral wooden tower', '360° views of Mount Baker, Finlayson Arm & coastal fjords', '20-meter spiral adventure slide descent'],
        badge: 'Top Island Attraction'
      }
    ],
    outdoors: [
      {
        id: 'yyj-o1',
        name: 'Beacon Hill Park & Dallas Road Waterfront',
        neighborhood: 'Downtown / Cook Street Village',
        category: 'Urban Park',
        distanceOrSize: '75 Hectares (Miles 0 of Trans-Canada Highway)',
        difficulty: 'Easy Stroll',
        features: ['Roaming Peacocks & Children’s Farm', 'World’s Tallest Free-Standing Totem Pole', 'Dallas Road Coastal Cliffs & Olympic Mountain Views'],
        parkingTips: 'Free parking throughout Beacon Hill Park and along Dallas Road.',
        bestTime: 'Sunset walk along Dallas Road breakwater overlooking snowcapped Washington mountains.',
        tag: 'Victoria’s Crown Jewel Park'
      }
    ],
    transitLines: [
      {
        id: 'yyj-t1',
        lineName: 'BC Transit Route 70 / 72 Swartz Bay Express',
        systemName: 'BC Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Direct highway double-decker bus connecting Downtown Victoria with Swartz Bay BC Ferries Terminal.',
        updatedMinutesAgo: 2
      },
      {
        id: 'yyj-t2',
        lineName: 'Victoria Harbour Ferry Water Taxis',
        systemName: 'Harbour Ferry',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Iconic little green water taxis connecting Fisherman’s Wharf, Empress, Chinatown, and Songhees.',
        updatedMinutesAgo: 5
      }
    ],
    civicServices: [
      {
        id: 'yyj-c1',
        title: 'City of Victoria Public Service Portal',
        department: 'City of Victoria',
        actionText: 'Contact Public Works',
        actionUrl: 'https://www.victoria.ca/city-government/contact-us',
        description: 'Street maintenance, tree care, parking programs, and residential bylaws.',
        phone: '250-385-5711'
      }
    ]
  },

  // =========================================================================
  // 10. ST. JOHN’S (YYT)
  // =========================================================================
  yyt: {
    tenantId: 'yyt',
    cityName: 'St. John’s',
    news: [
      {
        id: 'yyt-n1',
        title: 'Team Gushue Highway Extension Finalizes Overpass Construction',
        source: 'The Telegram',
        category: 'Civic',
        url: 'https://www.thetelegram.com',
        timeAgo: '45 mins ago',
        summary: 'Major arterial highway linking Kenmount Road to the Pitts Memorial Drive transit corridor prepares for paving.',
        expandedDetails: {
          keyTakeaways: [
            'Completes long-awaited central arterial connector across the metro region.',
            'Direct access to St. John’s harbour port terminals and southern shore communities.',
            'Significantly cuts commercial truck traffic through residential neighbourhoods.'
          ],
          localImpact: 'Eases morning commuter congestion across Topsail Road and Kenmount Road.',
          timeline: 'Full opening scheduled for late 2026.'
        }
      },
      {
        id: 'yyt-n2',
        title: 'Newfoundland Offshore Wind & Green Hydrogen Project Secures Environmental Clearance',
        source: 'CBC News Newfoundland',
        category: 'Energy',
        url: 'https://www.cbc.ca/news/canada/newfoundland-labrador',
        timeAgo: '3 hours ago',
        summary: 'World-scale clean energy export project in Placentia Bay moves to commercial engineering development.',
        expandedDetails: {
          keyTakeaways: [
            'Harnesses premier North Atlantic offshore wind power to produce zero-emission green ammonia.',
            'Direct clean fuel export agreements with European industrial ports.',
            'Creates thousands of specialized clean tech and maritime construction roles in the province.'
          ],
          localImpact: 'Positions Newfoundland & Labrador as a global leader in Atlantic clean energy export.',
          timeline: 'Engineering procurement underway.'
        }
      }
    ],
    sports: [
      {
        id: 'yyt-sp1',
        team: 'Newfoundland Growlers Hockey',
        opponent: 'Trois-Rivières Lions',
        league: 'ECHL' as any,
        status: 'Upcoming',
        gameTime: 'Friday • 7:00 PM',
        tvBroadcast: 'FloHockey / Rogers TV',
        isHome: true
      },
      {
        id: 'yyt-sp2',
        team: 'St. John’s Edge Basketball',
        opponent: 'London Lightning',
        league: 'BSL' as any,
        status: 'Upcoming',
        gameTime: 'Saturday • 7:00 PM',
        tvBroadcast: 'BSL Live',
        isHome: true
      }
    ],
    restaurants: [
      {
        id: 'yyt-r1',
        name: 'Terre Restaurant',
        cuisine: 'Newfoundland Foraged, Ocean Harvest & French Technique',
        neighborhood: 'Harbourfront (Alt Hotel St. John’s)',
        priceLevel: '$$$$',
        rating: 4.9,
        reviewCount: 1450,
        signatureDish: 'Fogo Island Cod with Brown Butter & Bakeapple Tart',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/terre-restaurant-st-johns',
        availableTimes: ['5:30 PM', '7:15 PM', '8:45 PM'],
        tag: 'Canada’s 100 Best Top 10'
      },
      {
        id: 'yyt-r2',
        name: 'Mallard Cottage',
        cuisine: 'Rustic Newfoundland Heritage & Nose-to-Tail Cuisine',
        neighborhood: 'Quidi Vidi Village / Barrows Rd',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 2800,
        signatureDish: 'Braised Moose Stew, Salt Cod Cakes & Dessert Table',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/mallard-cottage-st-johns',
        availableTimes: ['5:00 PM', '7:00 PM', '8:45 PM'],
        tag: '18th-Century Quidi Vidi Cottage'
      },
      {
        id: 'yyt-r3',
        name: 'The Merchant Tavern',
        cuisine: 'Casual Seafood, Handmade Pasta & Local Craft Cocktails',
        neighborhood: 'Downtown / Water St',
        priceLevel: '$$$',
        rating: 4.8,
        reviewCount: 3100,
        signatureDish: 'House-Made Tagliatelle with Newfoundland Crab & Albacore Crudo',
        bookingPlatform: 'OpenTable',
        reservationUrl: 'https://www.opentable.com/r/the-merchant-tavern-st-johns',
        availableTimes: ['5:15 PM', '7:00 PM', '8:30 PM'],
        tag: 'Downtown Culinary Mainstay'
      },
      {
        id: 'yyt-r4',
        name: 'Adelaide Oyster House',
        cuisine: 'High-Energy Oyster Bar, Asian Street Food & Craft Pours',
        neighborhood: 'Downtown / Water St',
        priceLevel: '$$$',
        rating: 4.9,
        reviewCount: 2200,
        signatureDish: 'Oyster Shots, Pork Belly Tacos & Kona Kampachi Crudo',
        bookingPlatform: 'Direct',
        reservationUrl: 'https://theadelaideoysterhouse.com',
        availableTimes: ['Walk-in Only Tue - Sat 5:00 PM'],
        tag: 'Rock & Roll Oyster Bar'
      }
    ],
    nightlife: [
      {
        id: 'yyt-nl1',
        name: 'Christian’s Pub',
        category: 'Irish Pub',
        neighborhood: 'George Street',
        vibe: 'Home of the world-famous official Newfoundland Screech-In ceremony with cod kissing and honorary Newfoundlander certificates',
        coverOrVip: '$25 for full Screech-In ceremony with rum shot & certificate',
        hours: 'Daily • 2:00 PM - 2:30 AM',
        guestlistUrl: 'https://christianspub.com',
        tag: 'Official Screech-In Headquarters'
      },
      {
        id: 'yyt-nl2',
        name: 'O’Reilly’s Irish Newfoundland Pub',
        category: 'Irish Pub',
        neighborhood: 'George Street',
        vibe: 'The heartbeat of George Street featuring live roaring Newfoundland Celtic folk bands every night with singing and dancing',
        coverOrVip: '$5 - $10 on weekends',
        hours: 'Daily • 12:00 PM - 3:00 AM',
        guestlistUrl: 'https://oreillyspub.com',
        tag: 'Legendary George Street Folk Pub'
      },
      {
        id: 'yyt-nl3',
        name: 'The Black Sheep on George',
        category: 'Live Music & Dance',
        neighborhood: 'George Street',
        vibe: 'Intimate upstairs live indie music and craft cocktail spot featuring local acoustic songwriters and weekend DJ sets',
        coverOrVip: 'No cover most nights',
        hours: 'Wed - Sun • 6:00 PM - 2:30 AM',
        guestlistUrl: 'https://blacksheepgeorge.com',
        tag: 'Craft Drinks & Live Music'
      }
    ],
    shows: [
      {
        id: 'yyt-s1',
        title: 'Arts and Culture Centre: Come From Away Newfoundland Production',
        venue: 'St. John’s Arts and Culture Centre',
        neighborhood: 'Memorial University Campus',
        category: 'Theatre',
        dates: 'Tue - Sun • 8:00 PM & 2:00 PM',
        ticketPriceRange: '$45 - $120',
        ticketUrl: 'https://artsandculturecentre.com',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Selling Fast',
        badgeColor: 'amber'
      },
      {
        id: 'yyt-s2',
        title: 'Spirit of Newfoundland: Dinner & Musical Comedy Theatre',
        venue: 'Masonic Temple',
        neighborhood: 'Cathedral Hill / Downtown',
        category: 'Theatre',
        dates: 'Wed - Sat • 6:30 PM (Dinner Included)',
        ticketPriceRange: '$65 - $95',
        ticketUrl: 'https://spiritofnewfoundland.com',
        ticketPlatform: 'Box Office',
        availabilityStatus: 'Good Seats Available',
        badgeColor: 'emerald'
      }
    ],
    hotels: [
      {
        id: 'yyt-h1',
        name: 'Alt Hotel St. John’s',
        neighborhood: 'Harbourfront / Water St',
        rating: 4.8,
        reviewCount: 1900,
        pricePerNight: '$210 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/alt-st-johns.html',
        bookingPlatform: 'Booking.com',
        amenities: ['Terre Restaurant Onsite', 'Harbourfront The Narrows Views', '24/7 Fitness Centre', 'Pet Friendly'],
        tag: 'Best Harbour Views',
        description: 'Sleek modern boutique hotel facing St. John’s harbour with unobstructed views of ships entering The Narrows.'
      },
      {
        id: 'yyt-h2',
        name: 'Murray Premises Hotel',
        neighborhood: 'Downtown / Water St & Harbour',
        rating: 4.8,
        reviewCount: 1600,
        pricePerNight: '$225 / night',
        bookingUrl: 'https://www.booking.com/hotel/ca/murray-premises.html',
        bookingPlatform: 'Booking.com',
        amenities: ['1846 Historic Fishery Architecture', 'Jetted Tubs & Exposed Timber Beams', 'Complimentary Continental Breakfast'],
        tag: 'National Historic Site Hotel',
        description: 'St. John’s oldest commercial masonry building restored into a romantic boutique hotel with 19th-century timber beams.'
      }
    ],
    experiences: [
      {
        id: 'yyt-e1',
        title: 'Witless Bay Ecological Reserve: Puffin & Whale Watching Boat Safari',
        operator: 'Gatherall’s Puffin & Whale Watch',
        category: 'Nature & Wildlife',
        duration: '3.5 Hours',
        rating: 4.9,
        reviewCount: 4100,
        priceFrom: '$85 / person',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=St.+John%27s+Newfoundland',
        bookingPlatform: 'Viator',
        highlights: ['Over 500,000 Atlantic puffins nesting on islands', 'Humpback whale breaching encounters', 'Iceberg sightings in season'],
        badge: 'Newfoundland #1 Wildlife Safari'
      },
      {
        id: 'yyt-e2',
        title: 'Cape Spear Easternmost Point & St. John’s Historic City Tour',
        operator: 'McCarthy’s Party Tours',
        category: 'Sightseeing',
        duration: '4 Hours',
        rating: 4.9,
        reviewCount: 2600,
        priceFrom: '$65 / person',
        bookingUrl: 'https://www.viator.com/searchResults/all?text=St.+John%27s+Newfoundland',
        bookingPlatform: 'Viator',
        highlights: ['Stand on the most easterly point in North America', 'Historic Cape Spear 1836 Lighthouse', 'Jellybean row Victorian houses tour'],
        badge: 'Iconic North American Landmark'
      }
    ],
    outdoors: [
      {
        id: 'yyt-o1',
        name: 'Signal Hill National Historic Site & North Head Trail',
        neighborhood: 'Signal Hill / The Battery',
        category: 'Hiking Trail',
        distanceOrSize: '5 km Rugged Ocean Cliff Loop',
        difficulty: 'Challenging Hike',
        features: ['Cabot Tower Panoramic Views', 'The Narrows Harbour Entrance', 'Ocean Cliff Boardwalks', 'Site of Marconi’s First Transatlantic Wireless Signal'],
        parkingTips: 'Free parking at Cabot Tower summit or Lower Battery lot.',
        bestTime: 'Sunrise over the Atlantic Ocean at Canada’s most easterly lookout.',
        tag: 'Iconic Atlantic Cliff Hike'
      },
      {
        id: 'yyt-o2',
        name: 'Cape Spear Lighthouse National Historic Site',
        neighborhood: 'Blackhead / Cape Spear (15 mins from Downtown)',
        category: 'Lookout Point',
        distanceOrSize: 'Easternmost Point of North America',
        difficulty: 'Easy Stroll',
        features: ['Oldest Surviving Lighthouse in NL (1836)', 'Ocean Whale Watching from Cliffs', 'World War II Gun Battery Bunkers'],
        parkingTips: 'Large free visitor center parking lot.',
        bestTime: 'Dawn to be the very first person in North America to see the sunrise.',
        tag: 'Most Easterly Point in North America'
      }
    ],
    transitLines: [
      {
        id: 'yyt-t1',
        lineName: 'Metrobus Route 1 & 2 (Downtown - Avalon Mall Loop)',
        systemName: 'Metrobus Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Regular urban loop service running every 15 minutes through Water St and Memorial University.',
        updatedMinutesAgo: 3
      },
      {
        id: 'yyt-t2',
        lineName: 'Metrobus Route 14 (Airport - Downtown Connection)',
        systemName: 'Metrobus Transit',
        status: 'Normal Service',
        statusColor: 'emerald',
        details: 'Direct bus connection between St. John’s International Airport (YYT) and Memorial University.',
        updatedMinutesAgo: 6
      }
    ],
    civicServices: [
      {
        id: 'yyt-c1',
        title: 'City of St. John’s Access 311',
        department: 'City of St. John’s',
        actionText: 'Contact Access 311',
        actionUrl: 'https://www.stjohns.ca/en/access-311.aspx',
        description: 'Road conditions, garbage/recycling lookup, bylaw enforcement, and public permits.',
        phone: '311 (709-754-2489)'
      }
    ]
  }
};

export function getCityHubData(tenantId: string): CityHubData {
  const data = CITY_HUB_REGISTRY[tenantId] || CITY_HUB_REGISTRY.yyc;
  
  // Merge live scraped news if it exists
  const liveNews = (liveNewsFeed as any)[tenantId] || [];

  // Merge dynamic live hotspot items if available
  const dynamicHotspots = (liveHotspotsFeed as any)?.tenants?.[tenantId] || null;

  const mergedTransit = dynamicHotspots?.transitLines?.length 
    ? [...dynamicHotspots.transitLines, ...data.transitLines]
    : data.transitLines;

  return {
    ...data,
    news: [...liveNews, ...data.news].slice(0, 10),
    transitLines: mergedTransit.slice(0, 5)
  };
}
