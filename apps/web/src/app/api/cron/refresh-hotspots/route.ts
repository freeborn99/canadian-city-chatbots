import { NextRequest, NextResponse } from 'next/server';
import { fetchAndCacheAllCityNews, getNewsCacheStatus } from '@/lib/news-fetcher';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow up to 60s for RSS + AI summary generation

export async function GET(req: NextRequest) {
  try {
    // Auth check: Vercel cron secret OR admin token
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    const adminToken = process.env.ADMIN_API_TOKEN;
    const isVercelCron = authHeader === `Bearer ${cronSecret}`;
    const isAdminAuth = req.headers.get('x-admin-token') === (adminToken || 'can-admin-2026-secure-token');

    if (cronSecret && !isVercelCron && !isAdminAuth) {
      return NextResponse.json({ error: 'Unauthorized cron trigger' }, { status: 401 });
    }

    // Execute the real news fetch + AI summary pipeline
    const result = await fetchAndCacheAllCityNews();
    const cacheStatus = getNewsCacheStatus();

    return NextResponse.json({
      success: true,
      message: 'Live news refresh completed',
      refreshedAt: new Date().toISOString(),
      articlesPerCity: result,
      cacheStatus,
    });
  } catch (error: any) {
    console.error('Error executing news refresh cron:', error);
    return NextResponse.json({ 
      error: 'News refresh failed', 
      message: error?.message || 'Unknown error' 
    }, { status: 500 });
  }
}
