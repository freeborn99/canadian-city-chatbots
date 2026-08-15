import { streamText, Message } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { getTenantById } from '@/lib/tenants';
import { queryTenantContext } from '@/lib/upstash';
import { getCityHubData } from '@/lib/city-data';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, tenantId, persona = 'insider' } = (await req.json()) as {
      messages: Message[];
      tenantId?: string;
      persona?: 'insider' | 'news' | 'foodie' | 'family';
    };

    const activeTenantId = tenantId || 'yyz';
    const city = getTenantById(activeTenantId);
    const cityHub = getCityHubData(activeTenantId);

    // Get the latest user message
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content || '';

    // 1. Upstash Vector Query (RAG pipeline strictly scoped to active tenant)
    let retrievedContext = '';
    if (lastUserMessage) {
      retrievedContext = await queryTenantContext(lastUserMessage, activeTenantId, 3);
    }

    // 2. Format Structured Live Regional Intelligence & Complete Hyperlink Registry
    const liveNewsFeed = (cityHub.news || [])
      .map(
        (n, i) =>
          `[Headline ${i + 1}]: "${n.title}"\n- Direct Article Link: [${n.title}](${n.url})\n- Source: [${n.source}](${n.url}) (${n.timeAgo})\n- Summary: ${n.summary}\n- Key Facts: ${n.expandedDetails?.keyTakeaways?.join('; ') || ''}\n- Local Impact: ${n.expandedDetails?.localImpact || ''}`
      )
      .join('\n\n');

    const liveSportsFeed = (cityHub.sports || [])
      .map(
        (s) =>
          `- ${s.team} vs ${s.opponent} (${s.league}): Status [${s.status}] | ${s.score ? `Score: ${s.score}` : `Time: ${s.gameTime}`} | Broadcast: ${s.tvBroadcast || 'Local'} | Team Hub: [${s.team} Official](https://www.google.com/search?q=${encodeURIComponent(s.team + ' schedule tickets')})`
      )
      .join('\n');

    const liveResoFeed = (cityHub.restaurants || [])
      .map(
        (r) =>
          `- [${r.name}](${r.reservationUrl}) (${r.neighborhood} • ${r.priceLevel} • ⭐${r.rating} • ${r.cuisine}): Signature "${r.signatureDish}". Reso Slots: ${r.availableTimes.join(', ')}. Instant Booking: [Book ${r.name} on ${r.bookingPlatform}](${r.reservationUrl})`
      )
      .join('\n');

    const liveShowsFeed = (cityHub.shows || [])
      .map(
        (s) =>
          `- [${s.title}](${s.ticketUrl}) at [${s.venue}](${s.ticketUrl}) (${s.category} • ${s.ticketPriceRange}): Status [${s.availabilityStatus}]. Tickets: [Get Tickets on ${s.ticketPlatform}](${s.ticketUrl})`
      )
      .join('\n');

    const liveHotelsFeed = (cityHub.hotels || [])
      .map(
        (h) =>
          `- [${h.name}](${h.bookingUrl}) (${h.neighborhood} • ⭐${h.rating} • ${h.pricePerNight}): ${h.description}. Booking: [Reserve ${h.name} on ${h.bookingPlatform}](${h.bookingUrl})`
      )
      .join('\n');

    const liveToursFeed = (cityHub.experiences || [])
      .map(
        (e) =>
          `- [${e.title}](${e.bookingUrl}) by ${e.operator} (${e.duration} • ${e.priceFrom}): Booking: [Book ${e.title} on ${e.bookingPlatform}](${e.bookingUrl})`
      )
      .join('\n');

    const liveCivicServices = (cityHub.civicServices || [])
      .map(
        (c) =>
          `- [${c.title}](${c.actionUrl}) (${c.department}): ${c.description} -> [${c.actionText}](${c.actionUrl})`
      )
      .join('\n');

    // 3. Persona Tuning
    const personaGuides = {
      insider: 'Voice: Friendly, witty, hyper-local insider who knows the hidden gems, shortcuts, and true local culture.',
      news: 'Voice: Executive civic news briefing style — factual, timely, analytical, focusing on city development, policy, and breaking headlines.',
      foodie: 'Voice: Acclaimed culinary enthusiast focusing on flavor profiles, chef stories, cocktail pairing secrets, and immediate table reservation times.',
      family: 'Voice: Warm, helpful family guide highlighting budget-friendly activities, stroller/kid accessibility, and safe public parks.',
    };

    // 4. Build Comprehensive Real-Time System Prompt
    const systemPrompt = `You are "Chat${city.id.toUpperCase()}", the premier hyper-local AI assistant and real-time civic portal for ${city.name}, ${city.province}, Canada.

${personaGuides[persona] || personaGuides.insider}

==================================================
🔥 MANDATORY HYPERLINKING DIRECTIVE (HIGHEST PRIORITY):
==================================================
1. **LINK DENSITY**: Your answers must be rich with actionable, clickable hyperlinks. Every single response you produce MUST contain multiple (at least 3 to 6) interactive markdown hyperlinks formatted as [Entity Name / Action](URL).
2. **NEWS HEADLINES**: When presenting news or headlines, ALWAYS hyperlink the headline title directly to its verified article URL (e.g. "[Ontario Line Queen Station Milestone](https://cbc.ca/news/toronto/transit-update) - *CBC Toronto*").
3. **RESTAURANTS & BARS**: Always hyperlink restaurant names and reservation buttons directly to their booking URLs (e.g. "[Alo Restaurant](https://opentable.com/alo-restaurant) - [Book Table on OpenTable](https://opentable.com/alo-restaurant)").
4. **SHOWS, CONCERTS & THEATRE**: Always hyperlink the show title and tickets to their box office links (e.g. "[The Lion King](https://ticketmaster.ca/event/lion-king-toronto) at [Princess of Wales Theatre](https://ticketmaster.ca/event/lion-king-toronto)").
5. **HOTELS, TOURS & CIVIC SERVICES**: Hyperlink hotel names, tour experiences, transit agencies ([${city.name} Transit](https://${city.domain})), and municipal services ([311 ${city.name} Portal](https://${city.domain})).
6. **NEVER OUTPUT PLAIN UNLINKED TEXT** when a URL exists in the intelligence registry below.

CRITICAL RULES FOR REAL-TIME ACCURACY & VALUE:
1. **LIVE NEWS & HEADLINES**: When asked about news, headlines, what's happening, or current events, ALWAYS present the actual live breaking stories listed in the LIVE NEWS FEED below with clickable article links. State the headline, source, and 2-sentence executive summary.
2. **LIVE SPORTS SCORES**: When asked about sports or game schedules, use the LIVE SPORTS FEED below to give the exact score, matchup, game time, and TV broadcast channel.
3. **FORMAT & CONCISENESS**: Keep answers crisp, punchy, and scannable (under 200 words). Use bolding and structured bullets.
4. **QUICK NEXT STEPS**: At the very end of EVERY response, output exactly 3 interactive follow-up suggestions in this exact format:
💡 **Quick Next Steps:**
- [Short follow-up 1]
- [Short follow-up 2]
- [Short follow-up 3]

==================================================
🔴 VERIFIED LIVE ${city.name.toUpperCase()} INTELLIGENCE & HYPERLINK DIRECTORY
==================================================

📰 LIVE NEWS HEADLINES & ARTICLE LINKS:
${liveNewsFeed || `(City news feed active for ${city.name})`}

🍽️ FEATURED DINING & OPEN RESERVATION LINKS:
${liveResoFeed}

🎟️ LIVE SHOWS, CONCERTS & BOX OFFICE TICKET LINKS:
${liveShowsFeed}

🏨 BOUTIQUE HOTELS & STAY BOOKING LINKS:
${liveHotelsFeed}

🧭 LOCAL TOURS & EXPERIENCE LINKS:
${liveToursFeed}

🏒 LIVE SPORTS SCORES & SCHEDULE:
${liveSportsFeed}

🏛️ MUNICIPAL SERVICES & CIVIC LINKS:
${liveCivicServices}
- Official City Portal: [City of ${city.name}](https://${city.domain})

📚 RETRIEVED CIVIC VECTORS (UPSTASH RAG):
${retrievedContext ? retrievedContext : `(Rely on verified live directory above)`}`;

    // 5. Stream LLM Response (Groq -> Gemini -> Fallback)
    const groqKey = process.env.GROQ_API_KEY;
    const googleKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (groqKey) {
      const groq = createGroq({ apiKey: groqKey });
      const result = streamText({
        model: groq('llama-3.3-70b-versatile'),
        system: systemPrompt,
        messages,
        temperature: 0.4,
      });
      return result.toDataStreamResponse();
    } else if (googleKey) {
      const google = createGoogleGenerativeAI({ apiKey: googleKey });
      const result = streamText({
        model: google('gemini-1.5-flash'),
        system: systemPrompt,
        messages,
        temperature: 0.4,
      });
      return result.toDataStreamResponse();
    } else {
      const topNews = cityHub.news[0];
      const fallbackResponse = `Here are the top breaking headlines and quick links for **${city.name}** right now: 🍁

📰 **[${topNews?.title || 'City Council Infrastructure Plan'}](${topNews?.url || `https://${city.domain}`})**
- **Source**: [${topNews?.source || 'City News'}](${topNews?.url || `https://${city.domain}`}) • *${topNews?.timeAgo || 'Just now'}*
- **Executive Summary**: ${topNews?.summary || 'Major public transit and civic investments underway across the metropolitan area.'}
- **Read Full Coverage**: [View Article on ${topNews?.source || 'News'}](${topNews?.url || `https://${city.domain}`})

🍽️ **Trending Tonight**: Book a table at [${cityHub.restaurants[0]?.name || 'Top Restaurant'}](${cityHub.restaurants[0]?.reservationUrl || 'https://opentable.com'}) or grab tickets for [${cityHub.shows[0]?.title || 'Featured Show'}](${cityHub.shows[0]?.ticketUrl || 'https://ticketmaster.ca'}).

💡 **Quick Next Steps:**
- What are the latest sports scores for ${city.name}?
- Find top dinner reservations tonight
- Check live transit status`;

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const chunks = fallbackResponse.match(/.{1,12}/g) || [fallbackResponse];
          for (const chunk of chunks) {
            controller.enqueue(encoder.encode(`0:${JSON.stringify(chunk)}\n`));
            await new Promise((res) => setTimeout(res, 25));
          }
          controller.enqueue(encoder.encode('d:{"finishReason":"stop"}\n'));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Vercel-AI-Data-Stream': 'v1',
        },
      });
    }
  } catch (error: unknown) {
    console.error('[Chat API Error]:', error);
    return new Response(
      JSON.stringify({ error: 'Internal chat processing error', details: (error as Error).message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
