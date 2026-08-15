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
}

export const DEFAULT_AFFILIATE_CONFIG: AffiliateConfig = {
  openTable: {
    partnerId: process.env.NEXT_PUBLIC_OPENTABLE_AFFILIATE_ID || 'canadacity_ot',
    network: 'impact',
  },
  ticketmaster: {
    affiliateId: process.env.NEXT_PUBLIC_TICKETMASTER_AFFILIATE_ID || 'canadacity_tm',
    campaignId: process.env.NEXT_PUBLIC_TICKETMASTER_CAMPAIGN_ID || 'canadacity_shows',
    network: 'impact',
  },
  bookingCom: {
    aid: process.env.NEXT_PUBLIC_BOOKING_AFFILIATE_ID || '894210', // Default / Custom AID
    label: 'canadacity_hotels',
  },
  expedia: {
    partnerId: process.env.NEXT_PUBLIC_EXPEDIA_AFFILIATE_ID || 'canadacity_exp',
    camref: '1100lCan',
  },
  viator: {
    partnerId: process.env.NEXT_PUBLIC_VIATOR_PARTNER_ID || 'canadacity_viator',
    subId: 'tours_radar',
  },
  getYourGuide: {
    partnerId: process.env.NEXT_PUBLIC_GETYOURGUIDE_PARTNER_ID || 'canadacity_gyg',
  },
  uber: {
    clientSecretPromo: process.env.NEXT_PUBLIC_UBER_PROMO_CODE || 'CANADACITY20',
  },
  skipTheDishes: {
    referralCode: process.env.NEXT_PUBLIC_SKIP_REFERRAL || 'CANADACITYEATS',
  },
};

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
        url.searchParams.set('affil', DEFAULT_AFFILIATE_CONFIG.openTable.partnerId);
        url.searchParams.set('sub_id', tenantId);
        break;

      case 'Ticketmaster':
        url.searchParams.set('partner', DEFAULT_AFFILIATE_CONFIG.ticketmaster.affiliateId);
        url.searchParams.set('camref', DEFAULT_AFFILIATE_CONFIG.ticketmaster.campaignId);
        url.searchParams.set('subId1', tenantId);
        break;

      case 'Booking.com':
        url.searchParams.set('aid', DEFAULT_AFFILIATE_CONFIG.bookingCom.aid);
        url.searchParams.set('label', `${DEFAULT_AFFILIATE_CONFIG.bookingCom.label}_${tenantId}`);
        break;

      case 'Expedia':
        url.searchParams.set('camref', DEFAULT_AFFILIATE_CONFIG.expedia.camref);
        url.searchParams.set('subId', tenantId);
        break;

      case 'Viator':
        url.searchParams.set('pid', DEFAULT_AFFILIATE_CONFIG.viator.partnerId);
        url.searchParams.set('mcid', '42383');
        url.searchParams.set('medium', 'link');
        url.searchParams.set('sub_id', tenantId);
        break;

      case 'GetYourGuide':
        url.searchParams.set('partner_id', DEFAULT_AFFILIATE_CONFIG.getYourGuide.partnerId);
        url.searchParams.set('utm_medium', 'online_publisher');
        url.searchParams.set('utm_source', `canadacity_${tenantId}`);
        break;

      default:
        url.searchParams.set('ref', `canadacity_${tenantId}`);
        break;
    }

    return url.toString();
  } catch {
    // If URL parsing fails, return rawUrl as fallback
    return rawUrl;
  }
}
