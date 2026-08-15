import { NextResponse } from 'next/server';
import { getIssues, updateIssueStatus } from '@/lib/issue-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const authToken = req.headers.get('x-admin-token');
    const expectedToken = process.env.ADMIN_API_TOKEN;
    if (!expectedToken || authToken !== expectedToken) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    const issues = getIssues();
    return NextResponse.json({
      status: 'SUCCESS',
      issues,
    });
  } catch (error: any) {
    return NextResponse.json({ status: 'ERROR', message: error?.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const authToken = req.headers.get('x-admin-token');
    const expectedToken = process.env.ADMIN_API_TOKEN;
    if (!expectedToken || authToken !== expectedToken) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ status: 'ERROR', message: 'Missing id or status' }, { status: 400 });
    }
    const validStatuses = ['new', 'investigating', 'resolved'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ status: 'ERROR', message: 'Invalid status' }, { status: 400 });
    }
    const updated = updateIssueStatus(id, status);
    return NextResponse.json({ status: 'SUCCESS', updated });
  } catch (error: any) {
    return NextResponse.json({ status: 'ERROR', message: error?.message }, { status: 500 });
  }
}
