import { NextResponse } from 'next/server';
import { getIssues, updateIssueStatus } from '@/lib/issue-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
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
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ status: 'ERROR', message: 'Missing id or status' }, { status: 400 });
    }
    const updated = updateIssueStatus(id, status);
    return NextResponse.json({ status: 'SUCCESS', updated });
  } catch (error: any) {
    return NextResponse.json({ status: 'ERROR', message: error?.message }, { status: 500 });
  }
}
