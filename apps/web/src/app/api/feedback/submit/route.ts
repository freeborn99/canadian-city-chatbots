import { NextResponse } from 'next/server';
import { recordIssue } from '@/lib/issue-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
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

    // 1. Record the issue in the server issue store
    const newReport = recordIssue({
      tenantId,
      userPrompt,
      aiResponse,
      aiSuggestedCategory,
      aiSuggestedSummary,
      userDescription,
      userEmail,
      clientMeta,
    });

    console.log(`\n🚨 [NEW CITIZEN ISSUE REPORTED - ${tenantId.toUpperCase()}]:`);
    console.log(`- ID: ${newReport.id}`);
    console.log(`- Summary: ${aiSuggestedSummary}`);
    console.log(`- User Notes: ${userDescription}`);
    console.log(`- Contact: ${userEmail || 'Anonymous'}`);
    console.log(`- Question: ${userPrompt}\n`);

    // 2. Email Dispatch Logic:
    // If RESEND_API_KEY / SMTP / ADMIN_EMAIL is configured, it sends an email notification.
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
            subject: `🚨 Issue Report [${tenantId.toUpperCase()}]: ${aiSuggestedSummary.slice(0, 60)}`,
            html: `
              <h2>🚨 Citizen Issue Report - Chat${tenantId.toUpperCase()}</h2>
              <p><strong>Report ID:</strong> ${newReport.id}</p>
              <p><strong>AI Diagnosis:</strong> ${aiSuggestedSummary}</p>
              <p><strong>User Comments:</strong> ${userDescription || 'No additional notes provided.'}</p>
              <p><strong>Citizen Email:</strong> ${userEmail || 'Anonymous'}</p>
              <hr />
              <h3>Attached Context</h3>
              <p><strong>Citizen Question:</strong> "${userPrompt}"</p>
              <p><strong>Chatbot Answer:</strong></p>
              <blockquote style="background:#f4f4f4;padding:12px;border-left:4px solid #0088cc;">
                ${aiResponse.replace(/\n/g, '<br/>')}
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
  } catch (error: any) {
    console.error('[Feedback Submission Error]:', error);
    return NextResponse.json(
      { status: 'ERROR', message: error?.message || 'Failed to submit issue report' },
      { status: 500 }
    );
  }
}
