export interface StarterPrompt {
  id: string;
  category: 'events' | 'food' | 'traffic' | 'news' | 'nightlife';
  title: string;
  subtitle: string;
  prompt: string;
  iconName: 'Calendar' | 'Utensils' | 'Car' | 'Newspaper' | 'Flame' | 'Sparkles';
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
  metroArea: string;
  surroundingRegions: string[];
  nightlifeDistricts: string[];
  starterPrompts: StarterPrompt[];
  landmarks: string[];
  sampleTrivia: string;
  contactEmail?: string;
  newsEmail?: string;
  partnersEmail?: string;
  pressEmail?: string;
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
    tagline: 'The 6ix Local Intelligence, Nightlife & City Navigator',
    description: "Your real-time guide to Canada's largest metropolis, King West nightlife, TTC updates, Queen West dining, and Harbourfront events.",
    colorTheme: 'blue-500',
    gradientClass: 'from-blue-500 via-indigo-500 to-cyan-400',
    glowClass: 'shadow-blue-500/25',
    borderClass: 'border-blue-500/30 hover:border-blue-500/60',
    bgTintClass: 'bg-blue-500/10',
    accentHex: '#3b82f6',
    metroArea: 'Greater Toronto Area (GTA)',
    surroundingRegions: ['Mississauga', 'Brampton', 'Markham', 'Vaughan', 'Oakville', 'Richmond Hill', 'Burlington', 'Pickering', 'Ajax', 'Whitby', 'Oshawa'],
    nightlifeDistricts: ['King Street West', 'Entertainment District', 'Queen Street West', 'Ossington Avenue', 'Yorkville', 'Kensington Market'],
    landmarks: ['CN Tower', 'Scotiabank Arena', 'Distillery District', 'High Park', 'King West'],
    sampleTrivia: 'Toronto has over 1,500 parks and more than 140 official distinct neighborhoods.',
    starterPrompts: [
      {
        id: 'yyz-nightlife',
        category: 'nightlife',
        title: 'King West Clubs & Late Night',
        subtitle: 'Rebel, Lavelle, Century Club & hidden speakeasies',
        prompt: 'What are the best nightclubs, rooftop lounges, and cocktail speakeasies in Toronto tonight for music and dancing?',
        iconName: 'Flame',
      },
      {
        id: 'yyz-events',
        category: 'events',
        title: 'Festivals, Concerts & Shows',
        subtitle: 'TIFF, Scotiabank Arena, Danforth & Budweiser Stage',
        prompt: 'What major festivals, cultural events, and live concerts are happening in Toronto this week?',
        iconName: 'Calendar',
      },
      {
        id: 'yyz-food',
        category: 'food',
        title: 'Trending Dining & Resos',
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
    ],
  },
  yvr: {
    id: 'yvr',
    domain: 'chatyvr.com',
    name: 'Vancouver',
    province: 'British Columbia',
    tagline: 'Coastal Pacific Pulse, Gastown Nightlife & Mountain Living',
    description: 'Real-time TransLink updates, Granville club district, Stanley Park trails, Gastown dining, and Pacific Northwest happenings.',
    colorTheme: 'emerald-500',
    gradientClass: 'from-emerald-500 via-teal-500 to-cyan-400',
    glowClass: 'shadow-emerald-500/25',
    borderClass: 'border-emerald-500/30 hover:border-emerald-500/60',
    bgTintClass: 'bg-emerald-500/10',
    accentHex: '#10b981',
    metroArea: 'Metro Vancouver',
    surroundingRegions: ['Burnaby', 'Richmond', 'Surrey', 'North Vancouver', 'West Vancouver', 'Coquitlam', 'Whistler', 'Squamish', 'Langley', 'New Westminster'],
    nightlifeDistricts: ['Granville Entertainment District', 'Gastown', 'Yaletown', 'Main Street', 'Davie Village', 'Commercial Drive'],
    landmarks: ['Stanley Park', 'Granville Island', 'Capilano Suspension Bridge', 'Gastown Steam Clock'],
    sampleTrivia: 'Vancouver is home to the worlds longest uninterrupted waterfront path (the Seawall at 28 km).',
    starterPrompts: [
      {
        id: 'yvr-nightlife',
        category: 'nightlife',
        title: 'Granville & Gastown Nightlife',
        subtitle: 'Celebrities, Fortune Sound Club & Yaletown lounges',
        prompt: 'What are the top nightclubs, dance venues, and cocktail lounges in Vancouver tonight?',
        iconName: 'Flame',
      },
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
    ],
  },
  yul: {
    id: 'yul',
    domain: 'chatyul.com',
    name: 'Montreal',
    province: 'Quebec',
    tagline: 'Metropolitan Art, Legendary Nightlife & Francophone Culture',
    description: 'STM metro alerts, Boulevard St-Laurent clubs, Old Montreal nightlife, Mont-Royal vistas, and world-class festival coverage.',
    colorTheme: 'indigo-500',
    gradientClass: 'from-indigo-500 via-purple-500 to-pink-400',
    glowClass: 'shadow-indigo-500/25',
    borderClass: 'border-indigo-500/30 hover:border-indigo-500/60',
    bgTintClass: 'bg-indigo-500/10',
    accentHex: '#6366f1',
    metroArea: 'Greater Montreal (Grand Montréal)',
    surroundingRegions: ['Laval', 'Longueuil', 'Brossard', 'West Island', 'Terrebonne', 'Saint-Jérôme', 'Mont-Tremblant', 'Laurentians', 'Eastern Townships'],
    nightlifeDistricts: ['Boulevard Saint-Laurent (The Main)', 'Crescent Street', 'Rue Saint-Denis', 'Old Montreal (Vieux-Port)', 'Plateau-Mont-Royal', 'Village'],
    landmarks: ['Mount Royal', 'Old Port of Montreal', 'Notre-Dame Basilica', 'Quartier des Spectacles', 'Stereo Nightclub'],
    sampleTrivia: 'Montreal was named a UNESCO City of Design and is the second-largest French-speaking city in the world.',
    starterPrompts: [
      {
        id: 'yul-nightlife',
        category: 'nightlife',
        title: 'St-Laurent & Crescent Nightlife',
        subtitle: 'Stereo, New City Gas, Muzique & Old Port speakeasies',
        prompt: 'What are the hottest electronic music clubs, after-hours, and chic lounges in Montreal tonight?',
        iconName: 'Flame',
      },
      {
        id: 'yul-events',
        category: 'events',
        title: 'Quartier des Spectacles & Festivals',
        subtitle: 'Jazz Fest, Just for Laughs, Francos & Osheaga',
        prompt: 'What festivals, art exhibitions, and cultural events are live in Montreal this week?',
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
        title: 'STM Metro & Bridge Status',
        subtitle: 'Orange/Green Line status & roadwork detours',
        prompt: 'Are there any STM metro disruptions or road closures on the Turcot Interchange and Champlain Bridge?',
        iconName: 'Car',
      },
    ],
  },
  yyc: {
    id: 'yyc',
    domain: 'chatyyc.com',
    name: 'Calgary',
    province: 'Alberta',
    tagline: 'Stampede Spirit, 17th Ave Nightlife & Rocky Mountain Gateway',
    description: 'CTrain status, 17th Ave Red Mile clubs, Beltline speakeasies, Bow River pathways, and Stampede City culture.',
    colorTheme: 'red-500',
    gradientClass: 'from-red-500 via-rose-500 to-amber-400',
    glowClass: 'shadow-red-500/25',
    borderClass: 'border-red-500/30 hover:border-red-500/60',
    bgTintClass: 'bg-red-500/10',
    accentHex: '#ef4444',
    metroArea: 'Calgary Metropolitan Region',
    surroundingRegions: ['Banff', 'Canmore', 'Kananaskis', 'Cochrane', 'Airdrie', 'Okotoks', 'Chestermere', 'High River', 'Strathmore', 'Bragg Creek'],
    nightlifeDistricts: ['17th Avenue SW (The Red Mile)', 'Beltline & 10th Ave SW', 'Stephen Avenue Walk', 'Inglewood', 'East Village'],
    landmarks: ['Calgary Tower', 'Stampede Park', 'Prince’s Island Park', 'Saddledome', 'Cowboys Nightclub'],
    sampleTrivia: 'Calgary is consistently ranked as one of the cleanest and sunniest cities in North America (333 sunny days/year).',
    starterPrompts: [
      {
        id: 'yyc-nightlife',
        category: 'nightlife',
        title: '17th Ave & Beltline Nightlife',
        subtitle: 'Cowboys, Commonwealth Bar, Sub Rosa & craft cocktail bars',
        prompt: 'Where are the top nightclubs, dance spots, live country saloons, and hidden speakeasies in Calgary tonight?',
        iconName: 'Flame',
      },
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
        title: 'Alberta Beef & Hotspots',
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
    ],
  },
  yeg: {
    id: 'yeg',
    domain: 'chatyeg.com',
    name: 'Edmonton',
    province: 'Alberta',
    tagline: 'Canada’s Festival City, Whyte Ave Nightlife & River Valley',
    description: 'Edmonton Transit (ETS), Whyte Ave party strip, ICE District entertainment, and North Saskatchewan River adventures.',
    colorTheme: 'orange-500',
    gradientClass: 'from-orange-500 via-amber-500 to-yellow-400',
    glowClass: 'shadow-orange-500/25',
    borderClass: 'border-orange-500/30 hover:border-orange-500/60',
    bgTintClass: 'bg-orange-500/10',
    accentHex: '#f97316',
    metroArea: 'Edmonton Metropolitan Region',
    surroundingRegions: ['Sherwood Park', 'St. Albert', 'Leduc', 'Spruce Grove', 'Fort Saskatchewan', 'Stony Plain', 'Beaumont', 'Nisku', 'Devon'],
    nightlifeDistricts: ['Whyte Avenue (Old Strathcona)', 'ICE District & 104th St Downtown', 'Jasper Avenue', 'Oliver (Grandin)'],
    landmarks: ['West Edmonton Mall', 'Rogers Place & ICE District', 'Muttart Conservatory', 'Alberta Legislature', 'Whyte Ave'],
    sampleTrivia: 'Edmonton’s River Valley is 22 times larger than New York’s Central Park.',
    starterPrompts: [
      {
        id: 'yeg-nightlife',
        category: 'nightlife',
        title: 'Whyte Ave & ICE District Clubs',
        subtitle: 'The Bower, Midway Music Hall, Beercade & Jasper Ave lounges',
        prompt: 'What are the best clubs, dance halls, and late-night party bars in Edmonton tonight?',
        iconName: 'Flame',
      },
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
    ],
  },
  yow: {
    id: 'yow',
    domain: 'chatyow.com',
    name: 'Ottawa',
    province: 'Ontario',
    tagline: 'Capital Heritage, ByWard Market Clubs & Gatineau Gateway',
    description: 'OC Transpo O-Train, ByWard Market nightlife & culinary scene, Parliament Hill updates, and Gatineau trails.',
    colorTheme: 'teal-500',
    gradientClass: 'from-teal-500 via-emerald-500 to-cyan-400',
    glowClass: 'shadow-teal-500/25',
    borderClass: 'border-teal-500/30 hover:border-teal-500/60',
    bgTintClass: 'bg-teal-500/10',
    accentHex: '#14b8a6',
    metroArea: 'National Capital Region (Ottawa-Gatineau)',
    surroundingRegions: ['Gatineau', 'Kanata', 'Nepean', 'Orléans', 'Barrhaven', 'Gloucester', 'Stittsville', 'Chelsea', 'Wakefield', 'Almonte'],
    nightlifeDistricts: ['ByWard Market', 'Elgin Street', 'Bank Street (Centretown)', 'Wellington West & Hintonburg', 'Hull / Promenade du Portage (Gatineau)'],
    landmarks: ['Parliament Hill', 'Rideau Canal', 'ByWard Market', 'National Gallery of Canada'],
    sampleTrivia: 'In winter, the Rideau Canal Skateway becomes the world’s largest naturally frozen ice rink (7.8 km).',
    starterPrompts: [
      {
        id: 'yow-nightlife',
        category: 'nightlife',
        title: 'ByWard Market & Elgin Nightlife',
        subtitle: 'The 27 Club, City At Night, Moon Room & speakeasies',
        prompt: 'What are the top nightclubs, dance spots, and cocktail lounges in Ottawa and Gatineau tonight?',
        iconName: 'Flame',
      },
      {
        id: 'yow-events',
        category: 'events',
        title: 'Capital Events & Festivals',
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
    ],
  },
  ywg: {
    id: 'ywg',
    domain: 'chatywg.com',
    name: 'Winnipeg',
    province: 'Manitoba',
    tagline: 'Heart of the Continent, Exchange District Nightlife & Prairie Arts',
    description: 'Winnipeg Transit, Exchange District music clubs, Osborne Village nightlife, and Jets hockey energy.',
    colorTheme: 'cyan-500',
    gradientClass: 'from-cyan-500 via-blue-500 to-indigo-400',
    glowClass: 'shadow-cyan-500/25',
    borderClass: 'border-cyan-500/30 hover:border-cyan-500/60',
    bgTintClass: 'bg-cyan-500/10',
    accentHex: '#06b6d4',
    metroArea: 'Winnipeg Metropolitan Region',
    surroundingRegions: ['Selkirk', 'Steinbach', 'Headingley', 'East St. Paul', 'West St. Paul', 'Oakbank', 'Stonewall', 'Grand Beach', 'Gimli'],
    nightlifeDistricts: ['Exchange District', 'Osborne Village', 'Corydon Avenue (Little Italy)', 'The Forks', 'Downtown'],
    landmarks: ['The Forks', 'Canadian Museum for Human Rights', 'Exchange District', 'Canada Life Centre'],
    sampleTrivia: 'The intersection of Portage and Main is historically recognized as the windiest intersection in Canada.',
    starterPrompts: [
      {
        id: 'ywg-nightlife',
        category: 'nightlife',
        title: 'Exchange District & Osborne Clubs',
        subtitle: 'The Met, Pyramid Cabaret, Palomino Club & speakeasies',
        prompt: 'Where are the top nightclubs, indie dance bars, and cocktail lounges in Winnipeg tonight?',
        iconName: 'Flame',
      },
      {
        id: 'ywg-events',
        category: 'events',
        title: 'The Forks & Arts Festivals',
        subtitle: 'Festival du Voyageur, Jets games & live theatre',
        prompt: 'What events, concerts, and activities are taking place at The Forks and Canada Life Centre?',
        iconName: 'Calendar',
      },
      {
        id: 'ywg-food',
        category: 'food',
        title: 'Winnipeg Rye & Osborne Dining',
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
    ],
  },
  yhz: {
    id: 'yhz',
    domain: 'chatyhz.com',
    name: 'Halifax',
    province: 'Nova Scotia',
    tagline: 'Atlantic Seaport, Argyle Pub Crawls & Maritime Charm',
    description: 'Halifax Transit ferry alerts, Argyle Street party corridor, Waterfront boardwalk bars, and live Celtic energy.',
    colorTheme: 'sky-500',
    gradientClass: 'from-sky-500 via-blue-500 to-teal-400',
    glowClass: 'shadow-sky-500/25',
    borderClass: 'border-sky-500/30 hover:border-sky-500/60',
    bgTintClass: 'bg-sky-500/10',
    accentHex: '#0284c7',
    metroArea: 'Halifax Regional Municipality (HRM)',
    surroundingRegions: ['Dartmouth', 'Bedford', 'Sackville', 'Peggy’s Cove', 'Cole Harbour', 'Eastern Passage', 'Fall River', 'Chester', 'Lunenburg', 'Wolfville'],
    nightlifeDistricts: ['Argyle Street', 'Halifax Waterfront Boardwalk', 'Downtown Halifax (Barrington St)', 'North End (Gottingen / Agricola)', 'Spring Garden Road'],
    landmarks: ['Halifax Citadel', 'Halifax Waterfront Boardwalk', 'Peggy’s Cove', 'The Dome Nightclub'],
    sampleTrivia: 'Halifax has more pubs and bars per capita than almost any other city in Canada.',
    starterPrompts: [
      {
        id: 'yhz-nightlife',
        category: 'nightlife',
        title: 'Argyle Pubs & Dance Clubs',
        subtitle: 'The Dome, Pacifico, Lower Deck & North End cocktail bars',
        prompt: 'What are the top live music pubs, dance clubs, and waterfront bars in Halifax tonight?',
        iconName: 'Flame',
      },
      {
        id: 'yhz-events',
        category: 'events',
        title: 'Waterfront & Maritime Music',
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
    ],
  },
  yyj: {
    id: 'yyj',
    domain: 'chatyyj.com',
    name: 'Victoria',
    province: 'British Columbia',
    tagline: 'The Garden City, Bastion Square Lounges & Island Life',
    description: 'BC Transit, Inner Harbour cocktail lounges, Bastion Square nightlife, and Vancouver Island coastal living.',
    colorTheme: 'green-500',
    gradientClass: 'from-green-500 via-emerald-500 to-teal-400',
    glowClass: 'shadow-green-500/25',
    borderClass: 'border-green-500/30 hover:border-green-500/60',
    bgTintClass: 'bg-green-500/10',
    accentHex: '#22c55e',
    metroArea: 'Greater Victoria (Capital Regional District)',
    surroundingRegions: ['Saanich', 'Esquimalt', 'Langford', 'Colwood', 'Sidney', 'Sooke', 'Oak Bay', 'View Royal', 'Central Saanich', 'Salt Spring Island'],
    nightlifeDistricts: ['Bastion Square', 'Inner Harbour', 'Downtown (Douglas & Yates)', 'Chinatown', 'Cook Street Village'],
    landmarks: ['Inner Harbour', 'Empress Hotel', 'Butchart Gardens', 'Bastion Square'],
    sampleTrivia: 'Victoria is known as the Cycling Capital of Canada, featuring the extensive Galloping Goose Regional Trail.',
    starterPrompts: [
      {
        id: 'yyj-nightlife',
        category: 'nightlife',
        title: 'Bastion Square & Cocktail Lounges',
        subtitle: 'Lucky Bar, Clive’s Classic Lounge, Darcy’s Pub & speakeasies',
        prompt: 'What are the best cocktail lounges, dance spots, and craft brewpubs in Victoria tonight?',
        iconName: 'Flame',
      },
      {
        id: 'yyj-events',
        category: 'events',
        title: 'Inner Harbour Celebrations',
        subtitle: 'Royal Theatre, Butchart Gardens & market days',
        prompt: 'What community events, museum exhibits, and garden tours are scheduled in Victoria this weekend?',
        iconName: 'Calendar',
      },
      {
        id: 'yyj-food',
        category: 'food',
        title: 'Afternoon Tea & Farm-to-Table',
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
    ],
  },
  yyt: {
    id: 'yyt',
    domain: 'chatyyt.com',
    name: "St. John's",
    province: 'Newfoundland and Labrador',
    tagline: 'North America’s Oldest City, Famous George Street & Atlantic Gales',
    description: 'George Street pub crawls, live Celtic dance clubs, Screech-in traditions, and colourful Atlantic maritime culture.',
    colorTheme: 'violet-500',
    gradientClass: 'from-violet-500 via-purple-500 to-fuchsia-400',
    glowClass: 'shadow-violet-500/25',
    borderClass: 'border-violet-500/30 hover:border-violet-500/60',
    bgTintClass: 'bg-violet-500/10',
    accentHex: '#8b5cf6',
    metroArea: "St. John's Metropolitan Area",
    surroundingRegions: ['Mount Pearl', 'Conception Bay South (CBS)', 'Paradise', 'Torbay', 'Portugal Cove-St. Philip’s', 'Logy Bay', 'Holyrood', 'Bay Bulls', 'Witless Bay'],
    nightlifeDistricts: ['George Street', 'Water Street', 'Duckworth Street', 'Quidi Vidi Village'],
    landmarks: ['Signal Hill', 'Cape Spear', 'George Street', 'Jellybean Row houses', 'Trappers Lounge'],
    sampleTrivia: 'George Street in St. John’s has the most bars and pubs per square foot of any street in North America.',
    starterPrompts: [
      {
        id: 'yyt-nightlife',
        category: 'nightlife',
        title: 'Legendary George Street Clubs',
        subtitle: 'Trappers, Christian’s Pub Screech-ins, Martini Bar & live jigs',
        prompt: 'Where are the best live music pubs, dance bars, and late-night party spots on George Street tonight?',
        iconName: 'Flame',
      },
      {
        id: 'yyt-events',
        category: 'events',
        title: 'George Street Music & Festivals',
        subtitle: 'Screech-ins, Folk festivals & Mile One Centre',
        prompt: 'What live traditional music sessions and festivals are happening on George Street and downtown this week?',
        iconName: 'Calendar',
      },
      {
        id: 'yyt-food',
        category: 'food',
        title: 'Newfoundland Cod & Game',
        subtitle: 'Water Street, Duckworth St & Quidi Vidi Village',
        prompt: 'Where can I find the freshest Atlantic cod, wild game tasting menus, and Quidi Vidi craft beer?',
        iconName: 'Utensils',
      },
      {
        id: 'yyt-traffic',
        category: 'traffic',
        title: 'Metrobus & Outer Ring Road',
        subtitle: 'Weather-related road conditions & bus routes',
        prompt: 'What are the current road conditions on the Outer Ring Road and Metrobus schedule updates?',
        iconName: 'Car',
      },
    ],
  },
};

function enrichTenant(tenant: any): CityTenant {
  return {
    ...tenant,
    contactEmail: tenant.contactEmail || `hello@${tenant.domain}`,
    newsEmail: tenant.newsEmail || `news@${tenant.domain}`,
    partnersEmail: tenant.partnersEmail || `partners@${tenant.domain}`,
    pressEmail: tenant.pressEmail || `press@${tenant.domain}`,
  };
}

export const DEFAULT_TENANT_ID = 'yyz';
export const DEFAULT_TENANT = enrichTenant(TENANTS[DEFAULT_TENANT_ID]);

export function getTenantById(id?: string | null): CityTenant {
  if (!id) return DEFAULT_TENANT;
  const cleanId = id.toLowerCase().trim();
  const raw = TENANTS[cleanId] || TENANTS[DEFAULT_TENANT_ID];
  return enrichTenant(raw);
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
    return enrichTenant(TENANTS[subdomain]);
  }

  return DEFAULT_TENANT;
}

export function getAllTenants(): CityTenant[] {
  return Object.values(TENANTS).map(enrichTenant);
}
