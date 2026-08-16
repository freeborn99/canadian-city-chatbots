import { NextResponse } from 'next/server';
import { recordAffiliateClick } from '@/lib/telemetry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, tenantId, partner, item } = body;

    if (type === 'affiliate_click') {
      recordAffiliateClick(tenantId || 'unknown', partner || 'unknown', item);
    }

    return NextResponse.json({ status: 'SUCCESS' });
  } catch (error: any) {
    return NextResponse.json({ status: 'ERROR', message: error?.message || 'Failed' }, { status: 500 });
  }
}
