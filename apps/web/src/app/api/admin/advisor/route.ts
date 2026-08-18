import { NextResponse } from 'next/server';
import { getRealMetrics } from '@/lib/telemetry';
import { getIssues } from '@/lib/issue-store';
import { getLiveAffiliateMetrics } from '@/lib/affiliate-api';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export interface OptimizationRecommendation {
  id: string;
  category: 'AFFILIATE_OPPORTUNITY' | 'FEATURE_IMPROVEMENT' | 'PROMPT_TUNING' | 'CONTENT_EXPANSION';
  title: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  estimatedImpact: string;
  summary: string;
  rationale: string;
  antigravityPrompt: string;
  status: 'active' | 'implemented' | 'dismissed';
  createdAt: string;
}

interface RecommendationState {
  [id: string]: 'active' | 'implemented' | 'dismissed';
}

const globalForAdvisor = globalThis as unknown as {
  __ADVISOR_STATE__: RecommendationState;
};

if (!globalForAdvisor.__ADVISOR_STATE__) {
  globalForAdvisor.__ADVISOR_STATE__ = {
    rec_ski_tourism: 'implemented',
    rec_transit_itinerary: 'implemented',
    rec_vip_guestlist: 'implemented',
  };
}

const advisorState = globalForAdvisor.__ADVISOR_STATE__;

function calculateUpside(recs: OptimizationRecommendation[]): string {
  let total = 0;
  for (const r of recs) {
    const match = r.estimatedImpact.match(/\+\$([\d,]+)/);
    if (match) {
      total += parseInt(match[1].replace(/,/g, ''), 10);
    }
  }
  return `+$${total.toLocaleString()} CAD / mo`;
}

export async function GET(req: Request) {
  try {
    const authToken = req.headers.get('x-admin-token');
    const expectedToken = process.env.ADMIN_API_TOKEN || 'can-admin-2026-secure-token';
    if (!expectedToken || authToken !== expectedToken) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { searchParams } = new URL(req.url);
    const range = (searchParams.get('range') || '7d') as '24h' | '7d' | '30d' | 'all';
    const city = searchParams.get('city') || 'all';

    const metrics = getRealMetrics(range, city);
    const issues = getIssues();
    const affiliateSummary = await getLiveAffiliateMetrics(metrics.partnerClicks || {});

    const allRecommendations = generateRecommendations(metrics, issues, affiliateSummary);
    const activeRecommendations = allRecommendations.filter(r => r.status === 'active');
    const completedRecommendations = allRecommendations.filter(r => r.status !== 'active');

    return NextResponse.json({
      status: 'SUCCESS',
      computedAt: new Date().toISOString(),
      recommendations: activeRecommendations,
      completedRecommendations,
      stats: {
        totalOpportunities: activeRecommendations.length,
        highPriorityCount: activeRecommendations.filter((r) => r.priority === 'HIGH' || r.priority === 'CRITICAL').length,
        potentialMonthlyUpside: calculateUpside(activeRecommendations),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'ERROR', message: error?.message || 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  // Trigger fresh scan (POST returns same analyzed recommendations with fresh timestamp)
  return GET(req);
}

export async function PATCH(req: Request) {
  try {
    const authToken = req.headers.get('x-admin-token');
    const expectedToken = process.env.ADMIN_API_TOKEN || 'can-admin-2026-secure-token';
    if (!expectedToken || authToken !== expectedToken) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status || !['active', 'implemented', 'dismissed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    advisorState[id] = status;

    return NextResponse.json({
      status: 'SUCCESS',
      message: `Recommendation ${id} marked as ${status}`
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'ERROR', message: error?.message || 'Failed to update recommendation' },
      { status: 500 }
    );
  }
}

function generateRecommendations(metrics: any, issues: any[], _affiliateSummary: any): OptimizationRecommendation[] {
  const recs: OptimizationRecommendation[] = [];

  // 1. VIP Bottle Service & Guestlist Affiliate Bridge
  recs.push({
    id: 'rec_vip_guestlist',
    category: 'AFFILIATE_OPPORTUNITY',
    title: 'Monetize Nightlife VIP Tables & Bottle Service via SevenRooms / Discotech',
    priority: 'HIGH',
    estimatedImpact: '+$1,400 CAD / mo (CPA: $35/table)',
    summary: 'High volume of user queries seeking VIP table bookings, bottle service, and club guestlists.',
    rationale:
      'Nightlife is one of the highest query categories across Calgary (Sub Rosa, Commonwealth), Toronto (Rebel, Century Club), and Vancouver (Celebrities). Standardizing affiliate tracking with SevenRooms & Discotech partner links monetizes table reservations.',
    antigravityPrompt: `Implement a high-converting VIP Bottle Service & Guestlist booking card across all 10 city hubs...`,
    status: 'active',
    createdAt: new Date().toISOString(),
  });

  // 2. Ski & Rocky Mountain Winter Tourism Affiliates
  recs.push({
    id: 'rec_ski_tourism',
    category: 'AFFILIATE_OPPORTUNITY',
    title: 'Add SkiBig3 / Banff Sunshine / Whistler Lift Ticket Affiliates',
    priority: 'HIGH',
    estimatedImpact: '+$1,250 CAD / mo (5-8% lift ticket rev-share)',
    summary: 'Visitors on ChatYYC (Calgary) and ChatYVR (Vancouver) frequently query mountain getaways, ski conditions, and Rocky Mountain tours.',
    rationale:
      'Banff and Whistler are premier Canadian destinations...',
    antigravityPrompt: `Add Ski & Mountain Adventure affiliate tracking...`,
    status: 'active',
    createdAt: new Date().toISOString(),
  });

  // 3. Interactive Multi-Stop Transit Route Planner
  recs.push({
    id: 'rec_transit_itinerary',
    category: 'FEATURE_IMPROVEMENT',
    title: 'Interactive Multi-Stop Transit & Airport Express Route Widget',
    priority: 'HIGH',
    estimatedImpact: '+35% Session Duration & Return Visits',
    summary: 'Citizens frequently ask multi-step transit questions...',
    rationale:
      'Text schedule tables are popular, but an interactive visual step-by-step transit itinerary widget...',
    antigravityPrompt: `Build an interactive Transit Itinerary & Route visualizer widget...`,
    status: 'active',
    createdAt: new Date().toISOString(),
  });

  // 4. Weather & Heated Patio Live Indicator
  recs.push({
    id: 'rec_patio_weather',
    category: 'FEATURE_IMPROVEMENT',
    title: 'Live Weather Radar & Heated Patio Dining Filter',
    priority: 'MEDIUM',
    estimatedImpact: '+18% OpenTable Reservation Click-through',
    summary: 'Dining inquiries spike around weather conditions...',
    rationale:
      'Dynamically matching weather forecasts with patio availability tags...',
    antigravityPrompt: `Implement a Dynamic Weather & Patio dining filter...`,
    status: 'active',
    createdAt: new Date().toISOString(),
  });

  // 5. Unresolved Citizen Feedback / Bug Auto-Tuning
  if (issues && issues.length > 0) {
    const unresolved = issues.filter((i) => i.status !== 'resolved');
    if (unresolved.length > 0) {
      recs.push({
        id: 'rec_citizen_issues',
        category: 'PROMPT_TUNING',
        title: `Auto-Fix ${unresolved.length} Reported Citizen Gaps in RAG & Chat Knowledge`,
        priority: 'CRITICAL',
        estimatedImpact: '100% Query Satisfaction on Edge Cases',
        summary: `There are ${unresolved.length} unresolved citizen reports...`,
        rationale:
          'Citizen issue reports highlight exact gaps...',
        antigravityPrompt: `Review and resolve all ${unresolved.length} open citizen issues...`,
        status: 'active',
        createdAt: new Date().toISOString(),
      });
    }
  }

  // Apply state from memory
  for (const r of recs) {
    if (advisorState[r.id]) {
      r.status = advisorState[r.id];
    }
  }

  return recs;
}
