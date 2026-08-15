import { NextResponse } from 'next/server';
import { getRealMetrics } from '@/lib/telemetry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const authToken = req.headers.get('x-admin-token');
    const expectedToken = process.env.ADMIN_API_TOKEN;
    if (!expectedToken || authToken !== expectedToken) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    const { searchParams } = new URL(req.url);
    const timeRange = (searchParams.get('range') || '7d') as '24h' | '7d' | '30d' | 'all';
    const cityFilter = searchParams.get('city') || 'all';

    // Compute real metrics on-demand
    const metrics = getRealMetrics(timeRange, cityFilter);

    return NextResponse.json({
      status: 'SUCCESS',
      computedAt: new Date().toISOString(),
      timeRange,
      cityFilter,
      metrics,
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'ERROR', message: error?.message || 'Failed to compute telemetry' },
      { status: 500 }
    );
  }
}
