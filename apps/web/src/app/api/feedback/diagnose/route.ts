import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { userPrompt = '', aiResponse = '', tenantId = 'yyc' } = (await req.json()) as {
      userPrompt: string;
      aiResponse: string;
      tenantId?: string;
    };

    const groqKey = process.env.GROQ_API_KEY;
    const googleKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

    let aiDiagnosis = {
      category: 'Content Accuracy & Relevance',
      suggestedSummary: 'The chatbot response did not accurately match the citizen question.',
      severity: 'medium',
    };

    const analysisPrompt = `You are a QA Diagnostic AI for a Canadian City AI Chatbot (${tenantId.toUpperCase()}).
A user clicked "Report an Issue" on their screen.
Analyze the user's question and the chatbot's response below to diagnose what went wrong:

Citizen Question: "${userPrompt}"
Chatbot Response: "${aiResponse.slice(0, 1000)}"

Respond ONLY with valid JSON in this exact structure:
{
  "category": "Accuracy Error | Wrong Category (e.g. News instead of Events) | Inaccurate Local Data | Formatting / Broken Link | Other",
  "suggestedSummary": "Crisp 1-sentence description of the exact flaw in the response",
  "severity": "low | medium | high"
}`;

    try {
      if (groqKey) {
        const groq = createGroq({ apiKey: groqKey });
        const result = await generateText({
          model: groq('llama-3.3-70b-versatile'),
          prompt: analysisPrompt,
          temperature: 0.1,
        });
        const match = result.text.match(/\{[\s\S]*\}/);
        if (match) {
          aiDiagnosis = JSON.parse(match[0]);
        }
      } else if (googleKey) {
        const google = createGoogleGenerativeAI({ apiKey: googleKey });
        const result = await generateText({
          model: google('gemini-1.5-flash'),
          prompt: analysisPrompt,
          temperature: 0.1,
        });
        const match = result.text.match(/\{[\s\S]*\}/);
        if (match) {
          aiDiagnosis = JSON.parse(match[0]);
        }
      }
    } catch (llmErr) {
      console.warn('[Issue Diagnostic LLM Warning]:', llmErr);
      // Fast rule-based diagnostic fallback
      if (userPrompt.toLowerCase().includes('dog') || userPrompt.toLowerCase().includes('animal')) {
        aiDiagnosis = {
          category: 'Wrong Category / Irrelevant Content',
          suggestedSummary: 'Chatbot did not provide direct 311 Animal Services contact steps.',
          severity: 'high',
        };
      } else if (userPrompt.toLowerCase().includes('event') || userPrompt.toLowerCase().includes('concert')) {
        aiDiagnosis = {
          category: 'Event / Ticket Mismatch',
          suggestedSummary: 'Chatbot response did not list upcoming live events with direct ticket links.',
          severity: 'medium',
        };
      }
    }

    return NextResponse.json({
      status: 'SUCCESS',
      diagnosis: aiDiagnosis,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'ERROR',
        diagnosis: {
          category: 'General Issue',
          suggestedSummary: 'The response did not meet expectations.',
          severity: 'medium',
        },
      },
      { status: 200 }
    );
  }
}
