/**
 * Centralized Affiliate & Partner Network Configuration
 * 
 * Supports dynamic partner tagging by tenant (e.g., yyc, yyz, yvr)
 * to accurately track revenue attribution per Canadian domain.
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
    aid: string; // Affiliate ID
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
    partnerId: process.env.NEXT_PUBLIC_OPENTABLE_AFFILIATE_ID || '',
    network: 'impact',
  },
  ticketmaster: {
    affiliateId: process.env.NEXT_PUBLIC_TICKETMASTER_AFFILIATE_ID || '',
    campaignId: process.env.NEXT_PUBLIC_TICKETMASTER_CAMPAIGN_ID || '',
    network: 'impact',
  },
  bookingCom: {
    aid: process.env.NEXT_PUBLIC_BOOKING_AFFILIATE_ID || '',
    label: '',
  },
  expedia: {
    partnerId: process.env.NEXT_PUBLIC_EXPEDIA_AFFILIATE_ID || '',
    camref: '',
  },
  viator: {
    partnerId: process.env.NEXT_PUBLIC_VIATOR_PARTNER_ID || '',
    subId: 'tours_radar',
  },
  getYourGuide: {
    partnerId: process.env.NEXT_PUBLIC_GETYOURGUIDE_PARTNER_ID || '',
  },
  uber: {
    clientSecretPromo: process.env.NEXT_PUBLIC_UBER_PROMO_CODE || '',
  },
  skipTheDishes: {
    referralCode: process.env.NEXT_PUBLIC_SKIP_REFERRAL || '',
  },
  cj: {
    apiKey: process.env.NEXT_PUBLIC_CJ_API_KEY || '',
  },
};

/**
 * Automatically infers the booking platform based on the URL domain.
 */
export function inferPlatformFromUrl(rawUrl: string): string {
  if (!rawUrl) return 'Direct';
  try {
    const hostname = new URL(rawUrl).hostname.toLowerCase();
    if (hostname.includes('opentable')) return 'OpenTable';
    if (hostname.includes('ticketmaster')) return 'Ticketmaster';
    if (hostname.includes('booking.com')) return 'Booking.com';
    if (hostname.includes('expedia')) return 'Expedia';
    if (hostname.includes('viator')) return 'Viator';
    if (hostname.includes('getyourguide')) return 'GetYourGuide';
    if (hostname.includes('mirvish')) return 'Mirvish';
    if (hostname.includes('vividseats') || hostname.includes('stubhub')) return 'CJ';
    return 'Direct';
  } catch {
    return 'Direct';
  }
}

/**
 * Universal Affiliate Link Formatter
 * Appends official partner tracking parameters and tenant tracking subIDs
 */
export function buildAffiliateUrl(
  rawUrl: string,
  platform: 'OpenTable' | 'Resy' | 'Ticketmaster' | 'Mirvish' | 'Booking.com' | 'Expedia' | 'Viator' | 'GetYourGuide' | 'Direct' | string,
  tenantId: string = 'yyc'
): string {
  if (!rawUrl || platform === 'Direct') return rawUrl;

  try {
    const url = new URL(rawUrl);

    switch (platform) {
      case 'OpenTable':
        if (DEFAULT_AFFILIATE_CONFIG.openTable.partnerId) {
          url.searchParams.set('affil', DEFAULT_AFFILIATE_CONFIG.openTable.partnerId);
          url.searchParams.set('sub_id', tenantId);
        }
        break;

      case 'Ticketmaster':
        if (DEFAULT_AFFILIATE_CONFIG.ticketmaster.affiliateId) {
          url.searchParams.set('partner', DEFAULT_AFFILIATE_CONFIG.ticketmaster.affiliateId);
          url.searchParams.set('camref', DEFAULT_AFFILIATE_CONFIG.ticketmaster.campaignId || tenantId);
          url.searchParams.set('subId1', tenantId);
        }
        break;

      case 'Booking.com':
        if (DEFAULT_AFFILIATE_CONFIG.bookingCom.aid) {
          url.searchParams.set('aid', DEFAULT_AFFILIATE_CONFIG.bookingCom.aid);
          if (DEFAULT_AFFILIATE_CONFIG.bookingCom.label) {
            url.searchParams.set('label', `${DEFAULT_AFFILIATE_CONFIG.bookingCom.label}_${tenantId}`);
          }
        }
        break;

      case 'Expedia':
        if (DEFAULT_AFFILIATE_CONFIG.expedia.camref) {
          url.searchParams.set('camref', DEFAULT_AFFILIATE_CONFIG.expedia.camref);
          url.searchParams.set('subId', tenantId);
        }
        break;

      case 'Viator': {
        const partnerId = DEFAULT_AFFILIATE_CONFIG.viator.partnerId || 'bba2dead-f9fa-416b-acc8-3cc64cc6211b';
        url.searchParams.set('pid', partnerId);
        url.searchParams.set('mcid', '42383');
        url.searchParams.set('medium', 'link');
        url.searchParams.set('sub_id', tenantId);
        break;
      }

      case 'GetYourGuide':
        if (DEFAULT_AFFILIATE_CONFIG.getYourGuide.partnerId) {
          url.searchParams.set('partner_id', DEFAULT_AFFILIATE_CONFIG.getYourGuide.partnerId);
          url.searchParams.set('utm_medium', 'online_publisher');
          url.searchParams.set('utm_source', tenantId);
        }
        break;

      case 'CJ': {
        const cjKey = DEFAULT_AFFILIATE_CONFIG.cj.apiKey || 'bDOCcy4VFDcylkkHG4tu9B4-cg';
        url.searchParams.set('publisherId', cjKey);
        url.searchParams.set('sid', tenantId);
        break;
      }

      default:
        // Clean direct link without legacy query params
        break;
    }

    return url.toString();
  } catch {
    return rawUrl;
  }
}
