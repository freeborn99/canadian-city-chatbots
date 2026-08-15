import { NextResponse } from 'next/server';
import { recordIssue } from '@/lib/issue-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Basic HTML entity escaping to prevent XSS in email templates
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: Request) {
  try {
    // Rate limiting: simple per-IP tracking via headers
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown';

    const body = await req.json();
    const {
      tenantId = 'yyc',
      userPrompt = '',
      aiResponse = '',
      aiSuggestedCategory = 'General Issue',
      aiSuggestedSummary = '',
      userDescription = '',
      userEmail = '',
      clientMeta = {},
    } = body;

    // Input validation
    if (typeof userPrompt !== 'string' || typeof aiResponse !== 'string') {
      return NextResponse.json({ status: 'ERROR', message: 'Invalid input format.' }, { status: 400 });
    }

    // Length limits to prevent abuse
    const safeUserDescription = typeof userDescription === 'string' ? userDescription.slice(0, 2000) : '';
    const safeUserEmail = typeof userEmail === 'string' ? userEmail.slice(0, 254) : '';
    const safeUserPrompt = typeof userPrompt === 'string' ? userPrompt.slice(0, 4000) : '';
    const safeAiResponse = typeof aiResponse === 'string' ? aiResponse.slice(0, 8000) : '';
    const safeSummary = typeof aiSuggestedSummary === 'string' ? aiSuggestedSummary.slice(0, 500) : '';
    const safeCategory = typeof aiSuggestedCategory === 'string' ? aiSuggestedCategory.slice(0, 100) : 'General Issue';

    // 1. Record the issue in the server issue store
    const newReport = recordIssue({
      tenantId,
      userPrompt: safeUserPrompt,
      aiResponse: safeAiResponse,
      aiSuggestedCategory: safeCategory,
      aiSuggestedSummary: safeSummary,
      userDescription: safeUserDescription,
      userEmail: safeUserEmail,
      clientMeta,
    });

    console.log(`\n🚨 [NEW CITIZEN ISSUE REPORTED - ${tenantId.toUpperCase()}]:`);
    console.log(`- ID: ${newReport.id}`);
    console.log(`- Summary: ${safeSummary}`);
    console.log(`- User Notes: ${safeUserDescription}`);
    console.log(`- Contact: ${safeUserEmail || 'Anonymous'}`);
    console.log(`- Source IP: ${ip}\n`);

    // 2. Email Dispatch Logic (with HTML escaping to prevent stored XSS)
    const adminEmail = process.env.ADMIN_ALERT_EMAIL || 'admin@chatyyc.com';
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Canadian AI Hub Alerts <alerts@chatyyc.com>',
            to: [adminEmail],
            subject: `🚨 Issue Report [${tenantId.toUpperCase()}]: ${escapeHtml(safeSummary.slice(0, 60))}`,
            html: `
              <h2>🚨 Citizen Issue Report - Chat${escapeHtml(tenantId.toUpperCase())}</h2>
              <p><strong>Report ID:</strong> ${escapeHtml(newReport.id)}</p>
              <p><strong>AI Diagnosis:</strong> ${escapeHtml(safeSummary)}</p>
              <p><strong>User Comments:</strong> ${escapeHtml(safeUserDescription) || 'No additional notes provided.'}</p>
              <p><strong>Citizen Email:</strong> ${escapeHtml(safeUserEmail) || 'Anonymous'}</p>
              <hr />
              <h3>Attached Context</h3>
              <p><strong>Citizen Question:</strong> "${escapeHtml(safeUserPrompt)}"</p>
              <p><strong>Chatbot Answer:</strong></p>
              <blockquote style="background:#f4f4f4;padding:12px;border-left:4px solid #0088cc;">
                ${escapeHtml(safeAiResponse).replace(/\n/g, '<br/>')}
              </blockquote>
            `,
          }),
        });
      } catch (emailErr) {
        console.warn('[Email Dispatch Notice]:', emailErr);
      }
    }

    return NextResponse.json({
      status: 'SUCCESS',
      reportId: newReport.id,
      message: 'Issue reported successfully! Our team has been notified.',
    });
  } catch {
    console.error('[Feedback Submission Error]');
    return NextResponse.json(
      { status: 'ERROR', message: 'Failed to submit issue report.' },
      { status: 500 }
    );
  }
}
