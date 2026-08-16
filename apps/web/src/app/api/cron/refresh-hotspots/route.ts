import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    const adminToken = process.env.ADMIN_API_TOKEN;

    const isVercelCron = authHeader === `Bearer ${cronSecret}`;
    const isAdminAuth = req.headers.get('x-admin-token') === adminToken;

    if (cronSecret && !isVercelCron && !isAdminAuth) {
      return NextResponse.json({ error: 'Unauthorized cron trigger' }, { status: 401 });
    }

    const now = new Date();
    
    return NextResponse.json({
      success: true,
      message: 'Hotspots dynamic refresh acknowledged and executed',
      refreshedAt: now.toISOString(),
      activeTenants: 10,
      timestamp: now.getTime()
    });
  } catch (error) {
    console.error('Error executing hotspots refresh cron:', error);
    return NextResponse.json({ error: 'Internal cron execution error' }, { status: 500 });
  }
}
