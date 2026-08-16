/**
 * Centralized Affiliate & Partner Network Configuration
 * 
 * Supports dynamic partner tagging by tenant (e.g., yyc, yyz, yvr, yyj)
 * to accurately track revenue attribution per Canadian domain across
 * Ski & Mountain Adventures (SkiBig3, Banff, Whistler, Vancouver Island),
 * VIP bottle service, dining reservations, concerts, and hotel stays.
 */

export interface AffiliateConfig {
  openTable: {
    partnerId: string;
    network: 'rakuten' | 'impact' | 'direct';
  };
  ticketmaster: {
    affiliateId: string;
    campaignId: string;
    network: 'impact' | 'cj';
  };
  bookingCom: {
    aid: string;
    label: string;
  };
  expedia: {
    partnerId: string;
    camref: string;
  };
  viator: {
    partnerId: string;
    subId: string;
  };
  getYourGuide: {
    partnerId: string;
  };
  sevenRooms: {
    partnerId: string;
  };
  resy: {
    partnerId: string;
  };
  eventbrite: {
    affiliateCode: string;
  };
  skiBig3: {
    partnerId: string;
    network: 'avantlink' | 'direct';
  };
  epicPassWhistler: {
    partnerId: string;
    network: 'cj' | 'impact';
  };
  uber: {
    clientSecretPromo?: string;
  };
  skipTheDishes: {
    referralCode?: string;
  };
  cj: {
    apiKey: string;
  };
}

export const DEFAULT_AFFILIATE_CONFIG: AffiliateConfig = {
  openTable: {
    partnerId: process.env.NEXT_PUBLIC_OPENTABLE_AFFILIATE_ID || '8J3cHl03Wu3pploY0KrQxAvkuP1L36bo',
    network: 'rakuten',
  },
  ticketmaster: {
    affiliateId: process.env.NEXT_PUBLIC_TICKETMASTER_AFFILIATE_ID || 'canadacity_tm',
    campaignId: process.env.NEXT_PUBLIC_TICKETMASTER_CAMPAIGN_ID || '14920',
    network: 'impact',
  },
  bookingCom: {
    aid: process.env.NEXT_PUBLIC_BOOKING_AFFILIATE_ID || '',
    label: 'canadacity_stays',
  },
  expedia: {
    partnerId: process.env.NEXT_PUBLIC_EXPEDIA_AFFILIATE_ID || '',
    camref: '',
  },
  viator: {
    partnerId: process.env.NEXT_PUBLIC_VIATOR_PARTNER_ID || 'P-88319',
    subId: 'tours_radar',
  },
  getYourGuide: {
    partnerId: process.env.NEXT_PUBLIC_GETYOURGUIDE_PARTNER_ID || 'canadacity_gyg',
  },
  sevenRooms: {
    partnerId: process.env.NEXT_PUBLIC_SEVENROOMS_PARTNER_ID || 'canadacity_sr',
  },
  resy: {
    partnerId: process.env.NEXT_PUBLIC_RESY_PARTNER_ID || 'canadacity_resy',
  },
  eventbrite: {
    affiliateCode: process.env.NEXT_PUBLIC_EVENTBRITE_AFF_CODE || 'canadacity',
  },
  skiBig3: {
    partnerId: process.env.NEXT_PUBLIC_SKIBIG3_PARTNER_ID || 'canadacity_ski',
    network: 'avantlink',
  },
  epicPassWhistler: {
    partnerId: process.env.NEXT_PUBLIC_EPICPASS_PARTNER_ID || '6429184',
    network: 'cj',
  },
  uber: {
    clientSecretPromo: process.env.NEXT_PUBLIC_UBER_PROMO_CODE || '',
  },
  skipTheDishes: {
    referralCode: process.env.NEXT_PUBLIC_SKIP_REFERRAL || '',
  },
  cj: {
    apiKey: process.env.NEXT_PUBLIC_CJ_API_KEY || '6429184',
  },
};

/**
 * Automatically infers the booking, ticketing, or ski platform based on the URL domain.
 */
export function inferPlatformFromUrl(rawUrl: string): string {
  if (!rawUrl) return 'Direct';
  try {
    const hostname = new URL(rawUrl).hostname.toLowerCase();
    // Ski & Mountain Resorts
    if (hostname.includes('skibig3.com')) return 'SkiBig3';
    if (hostname.includes('banffsunshinemeadows') || hostname.includes('skibanff.com')) return 'BanffSunshine';
    if (hostname.includes('skilouise.com')) return 'LakeLouise';
    if (hostname.includes('whistlerblackcomb') || hostname.includes('epicpass.com')) return 'WhistlerEpicPass';
    if (hostname.includes('mountnorquay') || hostname.includes('banffgondola') || hostname.includes('brewster.ca')) return 'BanffTours';
    if (hostname.includes('grousemountain') || hostname.includes('cypressmountain') || hostname.includes('mountseymour') || hostname.includes('mountwashington')) return 'MountainAdventure';

    // Dining, VIP & Nightlife
    if (hostname.includes('opentable')) return 'OpenTable';
    if (hostname.includes('sevenrooms')) return 'SevenRooms';
    if (hostname.includes('resy.com')) return 'Resy';
    if (hostname.includes('exploretock') || hostname.includes('tock')) return 'Tock';

    // Live Entertainment & Tickets
    if (hostname.includes('ticketmaster')) return 'Ticketmaster';
    if (hostname.includes('eventbrite')) return 'Eventbrite';
    if (hostname.includes('booking.com')) return 'Booking.com';
    if (hostname.includes('expedia')) return 'Expedia';
    if (hostname.includes('viator')) return 'Viator';
    if (hostname.includes('getyourguide')) return 'GetYourGuide';
    if (hostname.includes('mirvish')) return 'Mirvish';
    if (hostname.includes('vividseats') || hostname.includes('stubhub') || hostname.includes('seatgeek')) return 'CJ';
    if (hostname.includes('axs.com') || hostname.includes('ticketweb') || hostname.includes('showclix') || hostname.includes('livenation')) return 'LiveNation';

    return 'Direct';
  } catch {
    return 'Direct';
  }
}

/**
 * Universal Affiliate, Ski & VIP Referral Link Formatter
 * Appends official partner tracking parameters and tenant tracking subIDs
 * to all ski passes, mountain shuttles, VIP guestlists, table bookings, tickets, and reservations.
 */
export function buildAffiliateUrl(
  rawUrl: string,
  platform: 'SkiBig3' | 'BanffSunshine' | 'LakeLouise' | 'WhistlerEpicPass' | 'BanffTours' | 'MountainAdventure' | 'OpenTable' | 'SevenRooms' | 'Resy' | 'Tock' | 'Ticketmaster' | 'Eventbrite' | 'LiveNation' | 'Mirvish' | 'Booking.com' | 'Expedia' | 'Viator' | 'GetYourGuide' | 'CJ' | 'Direct' | string,
  tenantId: string = 'yyc'
): string {
  if (!rawUrl) return '#';

  try {
    const url = new URL(rawUrl);

    // Skip modifying internal relative paths or local hash anchors
    if (!url.protocol.startsWith('http')) return rawUrl;

    switch (platform) {
      // 🎿 Ski & Mountain Adventures
      case 'SkiBig3':
        url.searchParams.set('affil', DEFAULT_AFFILIATE_CONFIG.skiBig3.partnerId || 'canadacity_ski');
        url.searchParams.set('sub_id', tenantId);
        url.searchParams.set('utm_source', `chat${tenantId}`);
        url.searchParams.set('utm_medium', 'ski_lift_pass');
        url.searchParams.set('utm_campaign', 'rocky_mountain_ski');
        break;

      case 'BanffSunshine':
      case 'LakeLouise':
        url.searchParams.set('ref', `chat${tenantId}`);
        url.searchParams.set('utm_source', `chat${tenantId}`);
        url.searchParams.set('utm_medium', 'mountain_lift_tickets');
        url.searchParams.set('utm_campaign', 'alberta_rockies');
        break;

      case 'WhistlerEpicPass':
        url.searchParams.set('publisherId', DEFAULT_AFFILIATE_CONFIG.epicPassWhistler.partnerId || '6429184');
        url.searchParams.set('sid', `chat${tenantId}`);
        url.searchParams.set('utm_source', `chat${tenantId}`);
        url.searchParams.set('utm_medium', 'whistler_blackcomb_pass');
        break;

      case 'BanffTours':
      case 'Viator':
        url.searchParams.set('pid', DEFAULT_AFFILIATE_CONFIG.viator.partnerId || 'P-88319');
        url.searchParams.set('medium', 'link');
        url.searchParams.set('sub_id', tenantId);
        url.searchParams.set('utm_source', `chat${tenantId}`);
        url.searchParams.set('utm_medium', 'mountain_tour_shuttle');
        break;

      case 'MountainAdventure':
        url.searchParams.set('utm_source', `chat${tenantId}`);
        url.searchParams.set('utm_medium', 'mountain_adventure');
        url.searchParams.set('utm_campaign', 'alpine_recreation');
        url.searchParams.set('ref', `chat${tenantId}`);
        break;

      // 🍽️ Dining & VIP
      case 'OpenTable':
        url.searchParams.set('affil', DEFAULT_AFFILIATE_CONFIG.openTable.partnerId || '8J3cHl03Wu3pploY0KrQxAvkuP1L36bo');
        url.searchParams.set('sub_id', tenantId);
        url.searchParams.set('utm_source', `chat${tenantId}`);
        url.searchParams.set('utm_medium', 'table_booking');
        break;

      case 'SevenRooms':
        url.searchParams.set('affil', DEFAULT_AFFILIATE_CONFIG.sevenRooms.partnerId || 'canadacity_sr');
        url.searchParams.set('sub_id', tenantId);
        url.searchParams.set('utm_source', `chat${tenantId}`);
        url.searchParams.set('utm_medium', 'vip_concierge');
        url.searchParams.set('utm_campaign', 'vip_guestlist');
        break;

      case 'Resy':
        url.searchParams.set('ref', `chat${tenantId}`);
        url.searchParams.set('utm_source', `chat${tenantId}`);
        url.searchParams.set('utm_medium', 'dining_vip');
        break;

      case 'Tock':
        url.searchParams.set('ref', `chat${tenantId}`);
        url.searchParams.set('utm_source', `chat${tenantId}`);
        url.searchParams.set('utm_medium', 'chef_experience');
        break;

      // 🎟️ Live Events & Shows
      case 'Ticketmaster':
        url.searchParams.set('partner', DEFAULT_AFFILIATE_CONFIG.ticketmaster.affiliateId || 'canadacity_tm');
        url.searchParams.set('camref', DEFAULT_AFFILIATE_CONFIG.ticketmaster.campaignId || tenantId);
        url.searchParams.set('subId1', tenantId);
        url.searchParams.set('utm_source', `chat${tenantId}`);
        break;

      case 'Eventbrite':
        url.searchParams.set('aff', DEFAULT_AFFILIATE_CONFIG.eventbrite.affiliateCode || `chat${tenantId}`);
        url.searchParams.set('utm_source', `chat${tenantId}`);
        url.searchParams.set('utm_medium', 'nightlife_tickets');
        break;

      case 'LiveNation':
        url.searchParams.set('utm_source', `chat${tenantId}`);
        url.searchParams.set('utm_medium', 'concert_box_office');
        url.searchParams.set('utm_campaign', 'live_shows');
        break;

      // 🏨 Stays & Travel
      case 'Booking.com':
        url.searchParams.set('aid', DEFAULT_AFFILIATE_CONFIG.bookingCom.aid || 'canadacity');
        url.searchParams.set('label', `chat${tenantId}_stays`);
        break;

      case 'Expedia':
        url.searchParams.set('camref', DEFAULT_AFFILIATE_CONFIG.expedia.camref || `chat${tenantId}`);
        url.searchParams.set('subId', tenantId);
        break;

      case 'GetYourGuide':
        url.searchParams.set('partner_id', DEFAULT_AFFILIATE_CONFIG.getYourGuide.partnerId || 'canadacity_gyg');
        url.searchParams.set('utm_medium', 'online_publisher');
        url.searchParams.set('utm_source', `chat${tenantId}`);
        break;

      case 'CJ':
        url.searchParams.set('publisherId', DEFAULT_AFFILIATE_CONFIG.cj.apiKey || '6429184');
        url.searchParams.set('sid', tenantId);
        url.searchParams.set('utm_source', `chat${tenantId}`);
        break;

      default:
        // Direct Links - append universal publisher attribution tags
        if (!url.searchParams.has('utm_source')) {
          url.searchParams.set('utm_source', `chat${tenantId}`);
          url.searchParams.set('utm_medium', 'ai_concierge');
          url.searchParams.set('utm_campaign', 'direct_referral');
          url.searchParams.set('ref', `chat${tenantId}`);
        }
        break;
    }

    return url.toString();
  } catch {
    return rawUrl;
  }
}
