export interface StarterPrompt {
  id: string;
  category: 'events' | 'food' | 'traffic' | 'news';
  title: string;
  subtitle: string;
  prompt: string;
  iconName: 'Calendar' | 'Utensils' | 'Car' | 'Newspaper';
}

export interface CityTenant {
  id: string;
  domain: string;
  name: string;
  province: string;
  tagline: string;
  description: string;
  colorTheme: string;
  gradientClass: string;
  glowClass: string;
  borderClass: string;
  bgTintClass: string;
  accentHex: string;
  starterPrompts: StarterPrompt[];
  landmarks: string[];
  sampleTrivia: string;
}

export const DOMAIN_TO_TENANT_MAP: Record<string, { id: string; name: string; colorTheme: string }> = {
  'chatyyz.com': { id: 'yyz', name: 'Toronto', colorTheme: 'blue-500' },
  'chatyvr.com': { id: 'yvr', name: 'Vancouver', colorTheme: 'emerald-500' },
  'chatyul.com': { id: 'yul', name: 'Montreal', colorTheme: 'indigo-500' },
  'chatyyc.com': { id: 'yyc', name: 'Calgary', colorTheme: 'red-500' },
  'chatyeg.com': { id: 'yeg', name: 'Edmonton', colorTheme: 'orange-500' },
  'chatyow.com': { id: 'yow', name: 'Ottawa', colorTheme: 'teal-500' },
  'chatywg.com': { id: 'ywg', name: 'Winnipeg', colorTheme: 'cyan-500' },
  'chatyhz.com': { id: 'yhz', name: 'Halifax', colorTheme: 'sky-500' },
  'chatyyj.com': { id: 'yyj', name: 'Victoria', colorTheme: 'green-500' },
  'chatyyt.com': { id: 'yyt', name: "St. John's", colorTheme: 'violet-500' },
};

export const TENANTS: Record<string, CityTenant> = {
  yyz: {
    id: 'yyz',
    domain: 'chatyyz.com',
    name: 'Toronto',
    province: 'Ontario',
    tagline: 'The 6ix Local Intelligence & City Navigator',
    description: "Your real-time guide to Canada's largest metropolis, TTC updates, Queen West dining, and Harbourfront events.",
    colorTheme: 'blue-500',
    gradientClass: 'from-blue-500 via-indigo-500 to-cyan-400',
    glowClass: 'shadow-blue-500/25',
    borderClass: 'border-blue-500/30 hover:border-blue-500/60',
    bgTintClass: 'bg-blue-500/10',
    accentHex: '#3b82f6',
    landmarks: ['CN Tower', 'Scotiabank Arena', 'Distillery District', 'High Park'],
    sampleTrivia: 'Toronto has over 1,500 parks and more than 140 official distinct neighborhoods.',
    starterPrompts: [
      {
        id: 'yyz-events',
        category: 'events',
        title: 'Upcoming Festivals & Concerts',
        subtitle: 'TIFF, Scotiabank Arena, Danforth & Harbourfront',
        prompt: 'What major festivals, cultural events, and live concerts are happening in Toronto this week?',
        iconName: 'Calendar',
      },
      {
        id: 'yyz-food',
        category: 'food',
        title: 'Best Local Bites & Hidden Gems',
        subtitle: 'Kensington, Ossington, Chinatown & Yorkville',
        prompt: 'Recommend top rated spots for dinner and unique cocktails near Downtown Toronto and Ossington tonight.',
        iconName: 'Utensils',
      },
      {
        id: 'yyz-traffic',
        category: 'traffic',
        title: 'TTC, Gardiner & DVP Transit',
        subtitle: 'Subway delays, highway slowdowns & bike lanes',
        prompt: 'Are there any major TTC subway closures or heavy delays on the DVP / Gardiner Expressway right now?',
        iconName: 'Car',
      },
      {
        id: 'yyz-news',
        category: 'news',
        title: 'Breaking Civic News',
        subtitle: 'City Hall updates, housing & municipal news',
        prompt: 'What are the top breaking news stories and City of Toronto municipal announcements today?',
        iconName: 'Newspaper',
      },
    ],
  },
  yvr: {
    id: 'yvr',
    domain: 'chatyvr.com',
    name: 'Vancouver',
    province: 'British Columbia',
    tagline: 'Coastal Pacific Pulse & Mountain Living',
    description: 'Real-time TransLink updates, Stanley Park trails, Gastown dining, and Pacific Northwest happenings.',
    colorTheme: 'emerald-500',
    gradientClass: 'from-emerald-500 via-teal-500 to-cyan-400',
    glowClass: 'shadow-emerald-500/25',
    borderClass: 'border-emerald-500/30 hover:border-emerald-500/60',
    bgTintClass: 'bg-emerald-500/10',
    accentHex: '#10b981',
    landmarks: ['Stanley Park', 'Granville Island', 'Capilano Suspension Bridge', 'Kitsilano Beach'],
    sampleTrivia: 'Vancouver is home to the worlds longest uninterrupted waterfront path (the Seawall at 28 km).',
    starterPrompts: [
      {
        id: 'yvr-events',
        category: 'events',
        title: 'Outdoor & Cultural Events',
        subtitle: 'Rogers Arena, Queen Elizabeth Theatre & Seawall',
        prompt: 'What events, farmers markets, and outdoor activities are happening around Vancouver this weekend?',
        iconName: 'Calendar',
      },
      {
        id: 'yvr-food',
        category: 'food',
        title: 'Fresh Seafood & Ramen Scene',
        subtitle: 'Gastown, Commercial Drive & Richmond Night Market',
        prompt: 'Where can I find the freshest Pacific seafood, authentic sushi, and top craft breweries in Vancouver?',
        iconName: 'Utensils',
      },
      {
        id: 'yvr-traffic',
        category: 'traffic',
        title: 'SkyTrain & SeaBus Alerts',
        subtitle: 'Expo/Millennium Line delays & bridge traffic',
        prompt: 'How is the traffic on Lions Gate Bridge and are there any TransLink SkyTrain service advisories?',
        iconName: 'Car',
      },
      {
        id: 'yvr-news',
        category: 'news',
        title: 'Metro Vancouver News',
        subtitle: 'City Council decisions, weather & environment',
        prompt: 'Summarize the top civic news and environmental updates from the City of Vancouver.',
        iconName: 'Newspaper',
      },
    ],
  },
  yul: {
    id: 'yul',
    domain: 'chatyul.com',
    name: 'Montreal',
    province: 'Quebec',
    tagline: 'Metropolitan Art, Gastronomy & Francophone Culture',
    description: 'STM metro alerts, Old Montreal nightlife, Mont-Royal vistas, and world-class festival coverage.',
    colorTheme: 'indigo-500',
    gradientClass: 'from-indigo-500 via-purple-500 to-pink-400',
    glowClass: 'shadow-indigo-500/25',
    borderClass: 'border-indigo-500/30 hover:border-indigo-500/60',
    bgTintClass: 'bg-indigo-500/10',
    accentHex: '#6366f1',
    landmarks: ['Mount Royal', 'Old Port of Montreal', 'Notre-Dame Basilica', 'Quartier des Spectacles'],
    sampleTrivia: 'Montreal was named a UNESCO City of Design and is the second-largest French-speaking city in the world.',
    starterPrompts: [
      {
        id: 'yul-events',
        category: 'events',
        title: 'Quartier des Spectacles & Festivals',
        subtitle: 'Jazz Fest, Just for Laughs, Francos & Osheaga',
        prompt: 'What festivals, art exhibitions, and nightlife events are live in Montreal this week?',
        iconName: 'Calendar',
      },
      {
        id: 'yul-food',
        category: 'food',
        title: 'Iconic Bagels, Smoked Meat & Bistros',
        subtitle: 'Mile End, Plateau-Mont-Royal & Little Italy',
        prompt: 'Give me the quintessential Montreal food tour including bagels, smoked meat, and trendy Plateau bistros.',
        iconName: 'Utensils',
      },
      {
        id: 'yul-traffic',
        category: 'traffic',
        title: 'STM Metro & Pont Champlain Traffic',
        subtitle: 'Orange/Green Line status & roadwork detours',
        prompt: 'Are there any STM metro disruptions or road closures on the Turcot Interchange and Champlain Bridge?',
        iconName: 'Car',
      },
      {
        id: 'yul-news',
        category: 'news',
        title: 'Ville de Montréal Civic Updates',
        subtitle: 'Bilingual news, municipal bylaws & transit projects',
        prompt: 'What are the main municipal updates and community news from Ville de Montréal today?',
        iconName: 'Newspaper',
      },
    ],
  },
  yyc: {
    id: 'yyc',
    domain: 'chatyyc.com',
    name: 'Calgary',
    province: 'Alberta',
    tagline: 'Stampede Spirit, Rocky Mountain Gateway & Energy Hub',
    description: 'CTrain status, 17th Ave dining, Bow River pathways, and Stampede City culture.',
    colorTheme: 'red-500',
    gradientClass: 'from-red-500 via-rose-500 to-amber-400',
    glowClass: 'shadow-red-500/25',
    borderClass: 'border-red-500/30 hover:border-red-500/60',
    bgTintClass: 'bg-red-500/10',
    accentHex: '#ef4444',
    landmarks: ['Calgary Tower', 'Stampede Park', 'Prince’s Island Park', 'Saddledome'],
    sampleTrivia: 'Calgary is consistently ranked as one of the cleanest and sunniest cities in North America (333 sunny days/year).',
    starterPrompts: [
      {
        id: 'yyc-events',
        category: 'events',
        title: 'Stampede Park & Downtown Events',
        subtitle: 'Saddledome, Telus Spark & Arts Commons',
        prompt: 'What live events, concerts, and festivals are happening in Calgary this weekend?',
        iconName: 'Calendar',
      },
      {
        id: 'yyc-food',
        category: 'food',
        title: 'Alberta Beef & 17th Ave Hotspots',
        subtitle: 'Beltline, Inglewood & Stephen Avenue',
        prompt: 'Recommend the top steakhouses, craft breweries, and trendy cocktail lounges along 17th Ave and Inglewood.',
        iconName: 'Utensils',
      },
      {
        id: 'yyc-traffic',
        category: 'traffic',
        title: 'CTrain & Deerfoot Trail Live Flow',
        subtitle: 'Red/Blue Line updates & Ring Road traffic',
        prompt: 'What is the traffic condition on Deerfoot Trail, Stoney Trail, and the CTrain Red/Blue lines?',
        iconName: 'Car',
      },
      {
        id: 'yyc-news',
        category: 'news',
        title: 'Calgary City Hall & Community News',
        subtitle: 'Green Line LRT, bylaws & Rocky Mountain weather',
        prompt: 'What are the top news headlines and municipal announcements from the City of Calgary?',
        iconName: 'Newspaper',
      },
    ],
  },
  yeg: {
    id: 'yeg',
    domain: 'chatyeg.com',
    name: 'Edmonton',
    province: 'Alberta',
    tagline: 'Canada’s Festival City & North Saskatchewan River Valley',
    description: 'Edmonton Transit (ETS), ICE District, Old Strathcona arts, and River Valley park adventures.',
    colorTheme: 'orange-500',
    gradientClass: 'from-orange-500 via-amber-500 to-yellow-400',
    glowClass: 'shadow-orange-500/25',
    borderClass: 'border-orange-500/30 hover:border-orange-500/60',
    bgTintClass: 'bg-orange-500/10',
    accentHex: '#f97316',
    landmarks: ['West Edmonton Mall', 'Rogers Place & ICE District', 'Muttart Conservatory', 'Alberta Legislature'],
    sampleTrivia: 'Edmonton’s River Valley is 22 times larger than New York’s Central Park.',
    starterPrompts: [
      {
        id: 'yeg-events',
        category: 'events',
        title: 'Festival City & Rogers Place Shows',
        subtitle: 'Fringe, Folk Fest, Oilers games & ICE District',
        prompt: 'What festivals, Oilers games, and cultural performances are scheduled in Edmonton this week?',
        iconName: 'Calendar',
      },
      {
        id: 'yeg-food',
        category: 'food',
        title: 'Whyte Ave & 104th St Dining',
        subtitle: 'Old Strathcona, Downtown & Oliver eats',
        prompt: 'Where are the top locally loved restaurants and brunch spots on Whyte Ave and 104th Street Downtown?',
        iconName: 'Utensils',
      },
      {
        id: 'yeg-traffic',
        category: 'traffic',
        title: 'ETS Transit & Anthony Henday Flow',
        subtitle: 'Valley Line LRT updates & bridge work',
        prompt: 'How is traffic on Anthony Henday Drive and are there any ETS LRT service updates?',
        iconName: 'Car',
      },
      {
        id: 'yeg-news',
        category: 'news',
        title: 'City of Edmonton Civic News',
        subtitle: 'Municipal budget, snow clearing & community programs',
        prompt: 'Summarize the latest municipal news and council decisions from the City of Edmonton.',
        iconName: 'Newspaper',
      },
    ],
  },
  yow: {
    id: 'yow',
    domain: 'chatyow.com',
    name: 'Ottawa',
    province: 'Ontario',
    tagline: 'Capital Heritage, Rideau Canal & National Institutions',
    description: 'OC Transpo O-Train, ByWard Market culinary scene, Parliament Hill updates, and Gatineau trails.',
    colorTheme: 'teal-500',
    gradientClass: 'from-teal-500 via-emerald-500 to-cyan-400',
    glowClass: 'shadow-teal-500/25',
    borderClass: 'border-teal-500/30 hover:border-teal-500/60',
    bgTintClass: 'bg-teal-500/10',
    accentHex: '#14b8a6',
    landmarks: ['Parliament Hill', 'Rideau Canal', 'ByWard Market', 'National Gallery of Canada'],
    sampleTrivia: 'In winter, the Rideau Canal Skateway becomes the world’s largest naturally frozen ice rink (7.8 km).',
    starterPrompts: [
      {
        id: 'yow-events',
        category: 'events',
        title: 'Capital Events & National Museums',
        subtitle: 'Winterlude, Bluesfest, NAC & ByWard Market',
        prompt: 'What exhibitions, national museum events, and festivals are happening in Ottawa right now?',
        iconName: 'Calendar',
      },
      {
        id: 'yow-food',
        category: 'food',
        title: 'ByWard Market & Glebe Gastronomy',
        subtitle: 'BeaverTails, Shawarma capital & Wellington West',
        prompt: 'Where should I go for dinner in ByWard Market or the Glebe, and where is the best Ottawa shawarma?',
        iconName: 'Utensils',
      },
      {
        id: 'yow-traffic',
        category: 'traffic',
        title: 'OC Transpo O-Train & Queensway',
        subtitle: 'Confederation Line status & 417 traffic',
        prompt: 'Are there any delays on the OC Transpo O-Train Line 1 or highway 417 traffic slowdowns?',
        iconName: 'Car',
      },
      {
        id: 'yow-news',
        category: 'news',
        title: 'City of Ottawa & Capital News',
        subtitle: 'City Hall releases, NCC projects & weather alerts',
        prompt: 'What are the top municipal news releases and National Capital Commission updates today?',
        iconName: 'Newspaper',
      },
    ],
  },
  ywg: {
    id: 'ywg',
    domain: 'chatywg.com',
    name: 'Winnipeg',
    province: 'Manitoba',
    tagline: 'Heart of the Continent, The Forks & Prairie Creativity',
    description: 'Winnipeg Transit, Exchange District architecture, Jets hockey, and Canadian Museum for Human Rights.',
    colorTheme: 'cyan-500',
    gradientClass: 'from-cyan-500 via-blue-500 to-indigo-400',
    glowClass: 'shadow-cyan-500/25',
    borderClass: 'border-cyan-500/30 hover:border-cyan-500/60',
    bgTintClass: 'bg-cyan-500/10',
    accentHex: '#06b6d4',
    landmarks: ['The Forks', 'Canadian Museum for Human Rights', 'Exchange District', 'Canada Life Centre'],
    sampleTrivia: 'The intersection of Portage and Main is historically recognized as the windiest intersection in Canada.',
    starterPrompts: [
      {
        id: 'ywg-events',
        category: 'events',
        title: 'The Forks & Exchange District Arts',
        subtitle: 'Festival du Voyageur, Jets games & live theatre',
        prompt: 'What events, concerts, and family activities are taking place at The Forks and Canada Life Centre?',
        iconName: 'Calendar',
      },
      {
        id: 'ywg-food',
        category: 'food',
        title: 'Winnipeg Rye, Smoked Goldeye & Bakeries',
        subtitle: 'Osborne Village, Exchange District & Corydon',
        prompt: 'Recommend top local restaurants and bakeries in the Exchange District and Osborne Village.',
        iconName: 'Utensils',
      },
      {
        id: 'ywg-traffic',
        category: 'traffic',
        title: 'Winnipeg Transit & Perimeter Highway',
        subtitle: 'BLUE Rapid Transit & bridge maintenance',
        prompt: 'Are there any Winnipeg Transit route detours or delays along Portage Ave and the Perimeter Highway?',
        iconName: 'Car',
      },
      {
        id: 'ywg-news',
        category: 'news',
        title: 'City of Winnipeg Civic News',
        subtitle: 'Council decisions, road construction & seasonal notices',
        prompt: 'Summarize the latest municipal advisories and public news from the City of Winnipeg.',
        iconName: 'Newspaper',
      },
    ],
  },
  yhz: {
    id: 'yhz',
    domain: 'chatyhz.com',
    name: 'Halifax',
    province: 'Nova Scotia',
    tagline: 'Atlantic Seaport, Historic Citadel & Maritime Charm',
    description: 'Halifax Transit ferry alerts, Waterfront boardwalk dining, Dalhousie area events, and coastal music.',
    colorTheme: 'sky-500',
    gradientClass: 'from-sky-500 via-blue-500 to-teal-400',
    glowClass: 'shadow-sky-500/25',
    borderClass: 'border-sky-500/30 hover:border-sky-500/60',
    bgTintClass: 'bg-sky-500/10',
    accentHex: '#0284c7',
    landmarks: ['Halifax Citadel', 'Halifax Waterfront Boardwalk', 'Peggy’s Cove', 'Point Pleasant Park'],
    sampleTrivia: 'Halifax has one of the world’s deepest and largest natural ice-free harbors.',
    starterPrompts: [
      {
        id: 'yhz-events',
        category: 'events',
        title: 'Waterfront Festivals & Maritime Music',
        subtitle: 'Scotiabank Centre, live Celtic pubs & festivals',
        prompt: 'What live music sessions, harbour events, and theatre shows are running in Halifax this week?',
        iconName: 'Calendar',
      },
      {
        id: 'yhz-food',
        category: 'food',
        title: 'Halifax Donair & Atlantic Lobster',
        subtitle: 'North End culinary, Argyle St & waterfront docks',
        prompt: 'Where can I get the best authentic Halifax donair, fresh lobster rolls, and craft cider in the North End?',
        iconName: 'Utensils',
      },
      {
        id: 'yhz-traffic',
        category: 'traffic',
        title: 'Halifax Transit & Harbour Bridges',
        subtitle: 'Macdonald/MacKay bridges & Dartmouth Ferry',
        prompt: 'Are both harbour bridges clear and is the Halifax-Dartmouth ferry running on normal schedule?',
        iconName: 'Car',
      },
      {
        id: 'yhz-news',
        category: 'news',
        title: 'Halifax Regional Municipality News',
        subtitle: 'HRM council updates, coastal weather & public notices',
        prompt: 'What are the main civic announcements and news releases from Halifax Regional Municipality today?',
        iconName: 'Newspaper',
      },
    ],
  },
  yyj: {
    id: 'yyj',
    domain: 'chatyyj.com',
    name: 'Victoria',
    province: 'British Columbia',
    tagline: 'The Garden City, Inner Harbour & Vancouver Island Life',
    description: 'BC Transit, BC Ferries status, Inner Harbour buskers, Beacon Hill peacocks, and farm-to-table cuisine.',
    colorTheme: 'green-500',
    gradientClass: 'from-green-500 via-emerald-500 to-teal-400',
    glowClass: 'shadow-green-500/25',
    borderClass: 'border-green-500/30 hover:border-green-500/60',
    bgTintClass: 'bg-green-500/10',
    accentHex: '#22c55e',
    landmarks: ['Inner Harbour', 'Empress Hotel', 'Butchart Gardens', 'Beacon Hill Park'],
    sampleTrivia: 'Victoria is known as the Cycling Capital of Canada, featuring the extensive Galloping Goose Regional Trail.',
    starterPrompts: [
      {
        id: 'yyj-events',
        category: 'events',
        title: 'Inner Harbour & Garden Celebrations',
        subtitle: 'Royal Theatre, Butchart Gardens & market days',
        prompt: 'What community events, museum exhibits, and garden tours are scheduled in Victoria this weekend?',
        iconName: 'Calendar',
      },
      {
        id: 'yyj-food',
        category: 'food',
        title: 'Afternoon Tea & Farm-to-Table Dining',
        subtitle: 'Chinatown, Cook Street Village & Inner Harbour',
        prompt: 'What are the best farm-to-table restaurants, historic tea houses, and craft bakeries in Victoria?',
        iconName: 'Utensils',
      },
      {
        id: 'yyj-traffic',
        category: 'traffic',
        title: 'BC Ferries & Malahat Highway',
        subtitle: 'Swartz Bay sailing waits & BC Transit routes',
        prompt: 'Are there any sailing waits at Swartz Bay BC Ferries or construction delays on the Malahat Drive?',
        iconName: 'Car',
      },
      {
        id: 'yyj-news',
        category: 'news',
        title: 'City of Victoria Civic Announcements',
        subtitle: 'Capital Regional District news & island weather',
        prompt: 'What are the top civic stories and City of Victoria municipal council updates today?',
        iconName: 'Newspaper',
      },
    ],
  },
  yyt: {
    id: 'yyt',
    domain: 'chatyyt.com',
    name: "St. John's",
    province: 'Newfoundland and Labrador',
    tagline: 'North America’s Oldest City, Jellybean Row & Atlantic Gales',
    description: 'Metrobus updates, George Street music, Signal Hill trails, and colourful Atlantic maritime culture.',
    colorTheme: 'violet-500',
    gradientClass: 'from-violet-500 via-purple-500 to-fuchsia-400',
    glowClass: 'shadow-violet-500/25',
    borderClass: 'border-violet-500/30 hover:border-violet-500/60',
    bgTintClass: 'bg-violet-500/10',
    accentHex: '#8b5cf6',
    landmarks: ['Signal Hill', 'Cape Spear', 'George Street', 'Jellybean Row houses'],
    sampleTrivia: 'St. John’s is the easternmost city in North America, with its own unique half-hour time zone (NST).',
    starterPrompts: [
      {
        id: 'yyt-events',
        category: 'events',
        title: 'George Street Live Music & Traditions',
        subtitle: 'Screech-ins, Folk festivals & Mile One Centre',
        prompt: 'What live traditional music sessions and festivals are happening on George Street and downtown this week?',
        iconName: 'Calendar',
      },
      {
        id: 'yyt-food',
        category: 'food',
        title: 'Newfoundland Fish & Chips & Wild Game',
        subtitle: 'Water Street, Duckworth St & Quidi Vidi Village',
        prompt: 'Where can I find the freshest Atlantic cod, wild game tasting menus, and Quidi Vidi craft beer?',
        iconName: 'Utensils',
      },
      {
        id: 'yyt-traffic',
        category: 'traffic',
        title: 'Metrobus & Outer Ring Road Alerts',
        subtitle: 'Weather-related road conditions & bus routes',
        prompt: 'What are the current road conditions on the Outer Ring Road and Metrobus schedule updates?',
        iconName: 'Car',
      },
      {
        id: 'yyt-news',
        category: 'news',
        title: "City of St. John's Civic Bulletins",
        subtitle: 'Harbour updates, weather alerts & council news',
        prompt: "Summarize the latest municipal news and advisories from the City of St. John's.",
        iconName: 'Newspaper',
      },
    ],
  },
};

export const DEFAULT_TENANT_ID = 'yyz';
export const DEFAULT_TENANT = TENANTS[DEFAULT_TENANT_ID];

export function getTenantById(id?: string | null): CityTenant {
  if (!id) return DEFAULT_TENANT;
  const cleanId = id.toLowerCase().trim();
  return TENANTS[cleanId] || DEFAULT_TENANT;
}

export function getTenantByHost(host?: string | null): CityTenant {
  if (!host) return DEFAULT_TENANT;
  
  // Normalize host (remove port, remove www.)
  const cleanHost = host.split(':')[0].replace(/^www\./, '').toLowerCase().trim();

  // Check direct domain map
  if (DOMAIN_TO_TENANT_MAP[cleanHost]) {
    return getTenantById(DOMAIN_TO_TENANT_MAP[cleanHost].id);
  }

  // Check if subdomain contains tenant id (e.g. yvr.localhost, yyc.vercel.app)
  const subdomain = cleanHost.split('.')[0];
  if (TENANTS[subdomain]) {
    return TENANTS[subdomain];
  }

  return DEFAULT_TENANT;
}

export function getAllTenants(): CityTenant[] {
  return Object.values(TENANTS);
}
