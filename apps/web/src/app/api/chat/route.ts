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

    // 2. Format Structured Regional Intelligence Categories
    const liveNewsFeed = (cityHub.news || [])
      .map(
        (n, i) =>
          `[News Story ${i + 1}]: "${n.title}"\n- Direct Article Link: [${n.title}](${n.url})\n- Source: [${n.source}](${n.url}) (${n.timeAgo})\n- Summary: ${n.summary}\n- Key Facts: ${n.expandedDetails?.keyTakeaways?.join('; ') || ''}\n- Local Impact: ${n.expandedDetails?.localImpact || ''}`
      )
      .join('\n\n');

    const liveShowsFeed = (cityHub.shows || [])
      .map(
        (s, i) =>
          `[Event ${i + 1}]: **${s.title}** (${s.category})\n- Venue & Location: [${s.venue}](${s.ticketUrl}) (${s.neighborhood})\n- Dates/Times: ${s.dates}\n- Ticket Price: ${s.ticketPriceRange} (Status: ${s.availabilityStatus})\n- Direct Box Office Booking: [Get Tickets for ${s.title} on ${s.ticketPlatform}](${s.ticketUrl})`
      )
      .join('\n\n');

    const liveSportsFeed = (cityHub.sports || [])
      .map(
        (s) =>
          `- 🏒 **${s.team} vs ${s.opponent}** (${s.league}): Match Status [${s.status}] | ${s.score ? `Current Score: ${s.score}` : `Game Time: ${s.gameTime}`} | Home/Away: ${s.isHome ? 'Home Game' : 'Away'} | Broadcast Channel: ${s.tvBroadcast || 'Sportsnet / TSN'} | Official Tickets: [${s.team} Box Office](https://www.google.com/search?q=${encodeURIComponent(s.team + ' schedule tickets')})`
      )
      .join('\n');

    const liveResoFeed = (cityHub.restaurants || [])
      .map(
        (r) =>
          `- 🍽️ **[${r.name}](${r.reservationUrl})** (${r.neighborhood} • ${r.priceLevel} • ⭐${r.rating} • ${r.cuisine}): Must-Order Signature "${r.signatureDish}". Available Slots: ${r.availableTimes.join(', ')}. Instant Table Reservation: [Book ${r.name} on ${r.bookingPlatform}](${r.reservationUrl})`
      )
      .join('\n');

    const liveHotelsFeed = (cityHub.hotels || [])
      .map(
        (h) =>
          `- 🏨 **[${h.name}](${h.bookingUrl})** (${h.neighborhood} • ⭐${h.rating} • ${h.pricePerNight}): ${h.description}. Reserve: [Book ${h.name} on ${h.bookingPlatform}](${h.bookingUrl})`
      )
      .join('\n');

    const liveToursFeed = (cityHub.experiences || [])
      .map(
        (e) =>
          `- 🧭 **[${e.title}](${e.bookingUrl})** by ${e.operator} (${e.duration} • ${e.priceFrom}): Booking: [Book ${e.title} on ${e.bookingPlatform}](${e.bookingUrl})`
      )
      .join('\n');

    const liveOutdoorFeed = (cityHub.outdoors || [])
      .map(
        (o) =>
          `- 🌲 **${o.name}** (${o.category} • ${o.neighborhood}): ${o.features.join(', ')} (Difficulty: ${o.difficulty} • Best Time: ${o.bestTime} • Parking: ${o.parkingTips})`
      )
      .join('\n');

    const liveCivicServices = (cityHub.civicServices || [])
      .map(
        (c) =>
          `- 🏛️ **[${c.title}](${c.actionUrl})** (${c.department}): ${c.description} -> [${c.actionText}](${c.actionUrl})`
      )
      .join('\n');

    // 3. Persona Tuning
    const personaGuides = {
      insider: 'Voice: Friendly, witty, hyper-local insider who knows the hidden gems, shortcuts, and true local culture.',
      news: 'Voice: Executive civic news briefing style — factual, timely, analytical, focusing on city development, policy, and breaking headlines.',
      foodie: 'Voice: Acclaimed culinary enthusiast focusing on flavor profiles, chef stories, cocktail pairing secrets, and immediate table reservation times.',
      family: 'Voice: Warm, helpful family guide highlighting budget-friendly activities, stroller/kid accessibility, and safe public parks.',
    };

    // 4. Build Comprehensive Real-Time System Prompt with Strict Intent Categorization
    const systemPrompt = `You are "Chat${city.id.toUpperCase()}", the premier hyper-local AI assistant and real-time civic portal for ${city.name}, ${city.province}, Canada.

${personaGuides[persona] || personaGuides.insider}

==================================================
🎯 ABSOLUTE QUERY INTENT ROUTING RULES (CRITICAL):
==================================================
You MUST classify what the user is asking for and respond strictly with the corresponding dataset:

1. 🎪 **LIVE EVENTS, SHOWS, CONCERTS, THEATRE, COMEDY & FESTIVALS**:
   - If the user asks for "events", "live events", "what's happening", "shows", "concerts", "theatre", "comedy", "festivals", "entertainment", or "weekend plans":
   - **STRICTLY USE THE 🎟️ LIVE SHOWS, CONCERTS & ENTERTAINMENT EVENTS FEED BELOW**.
   - List the real live events with Event Name, Venue, Dates/Times, Price Range, and direct Ticket Purchase link ([Get Tickets on Ticketmaster](...)).
   - **⚠️ STRICT PROHIBITION: NEVER RETURN NEWS HEADLINES OR MUNICIPAL ARTICLES WHEN ASKED FOR EVENTS.**

2. 📰 **NEWS & HEADLINES**:
   - ONLY when the user explicitly asks for "news", "headlines", "politics", "city council", "breaking stories", or "municipal updates", use the 📰 LIVE NEWS HEADLINES FEED below.
   - Provide the headline hyperlinked to the article URL, source, time, and 2-sentence executive summary.

3. 🍽️ **FOOD, DINING & RESTAURANTS**:
   - When asked about restaurants, food, brunch, dinner, coffee, or bars, use the 🍽️ FEATURED DINING FEED.
   - Include restaurant name hyperlinked to booking URL, neighborhood, signature dish, and open reservation timeslots.

4. 🏒 **SPORTS & GAME SCORES**:
   - When asked about sports, hockey, baseball, basketball, games, or scores, use the 🏒 LIVE SPORTS SCORES & SCHEDULE FEED.
   - State matchup, current score or game start time, venue, and TV broadcast channel.

5. 🏨 **HOTELS & STAYS**:
   - When asked where to stay or about hotels, use the 🏨 BOUTIQUE HOTELS & STAYS FEED with direct booking links.

6. 🧭 **TOURS & EXPERIENCES**:
   - When asked for tours, activities, boat cruises, or day trips, use the 🧭 LOCAL TOURS & EXPERIENCES FEED.

7. 🌲 **OUTDOOR & PARKS**:
   - When asked for parks, hikes, nature, or ski hills, use the 🌲 OUTDOOR & PARKS FEED.

8. 🏛️ **CIVIC SERVICES & TRANSIT**:
   - When asked about city hall, transit, 311, parking, or utilities, use the 🏛️ MUNICIPAL SERVICES FEED.

==================================================
🔗 MANDATORY HYPERLINKING DIRECTIVE:
==================================================
- Every single entity (event, venue, ticket, restaurant, news article, hotel, tour) MUST be a clickable markdown hyperlink in format: [Entity Name / Action](URL).
- Never output plain unlinked names when URLs exist in the directory below.
- Keep responses scannable, punchy, well-formatted with bold headers and bullet points.
- At the end of every response, output 3 interactive follow-up suggestions:
💡 **Quick Next Steps:**
- [Actionable follow-up 1]
- [Actionable follow-up 2]
- [Actionable follow-up 3]

==================================================
🔴 VERIFIED LIVE ${city.name.toUpperCase()} INTELLIGENCE DIRECTORY
==================================================

🎟️ LIVE SHOWS, CONCERTS & ENTERTAINMENT EVENTS:
${liveShowsFeed || `(Check box office for ${city.name})`}

📰 LIVE NEWS HEADLINES & ARTICLES (USE ONLY FOR NEWS QUERIES):
${liveNewsFeed || `(City news feed active for ${city.name})`}

🍽️ FEATURED DINING & RESERVATION LINKS:
${liveResoFeed}

🏒 LIVE SPORTS SCORES & GAME SCHEDULES:
${liveSportsFeed}

🏨 BOUTIQUE HOTELS & STAY BOOKING LINKS:
${liveHotelsFeed}

🧭 LOCAL TOURS & EXPERIENCES:
${liveToursFeed}

🌲 OUTDOOR, PARKS & SKI GUIDES:
${liveOutdoorFeed}

🏛️ MUNICIPAL SERVICES & CIVIC PORTALS:
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
        temperature: 0.3,
      });
      return result.toDataStreamResponse();
    } else if (googleKey) {
      const google = createGoogleGenerativeAI({ apiKey: googleKey });
      const result = streamText({
        model: google('gemini-1.5-flash'),
        system: systemPrompt,
        messages,
        temperature: 0.3,
      });
      return result.toDataStreamResponse();
    } else {
      // Fallback intent router for offline mode
      const isEventsQuery = /event|show|concert|theatre|ticket|music|festival|tonight|weekend/i.test(lastUserMessage);
      const isFoodQuery = /food|restaurant|eat|dinner|lunch|brunch|bar|drink|table|reservation/i.test(lastUserMessage);
      const isSportsQuery = /sport|game|score|hockey|flames|leafs|canucks|oilers|raptors|jays/i.test(lastUserMessage);

      let fallbackResponse = '';

      if (isEventsQuery && cityHub.shows?.length > 0) {
        fallbackResponse = `Here are the top live entertainment events and shows happening in **${city.name}**: 🎟️\n\n` +
          cityHub.shows.map(s => `🎭 **[${s.title}](${s.ticketUrl})** (${s.category})\n- **Venue**: [${s.venue}](${s.ticketUrl}) • ${s.neighborhood}\n- **Dates**: ${s.dates} • ${s.ticketPriceRange}\n- **Tickets**: [Get Tickets on ${s.ticketPlatform}](${s.ticketUrl}) (${s.availabilityStatus})\n`).join('\n') +
          `\n💡 **Quick Next Steps:**\n- Find dinner reservations near these venues\n- Check live sports games tonight in ${city.name}\n- Look for outdoor experiences`;
      } else if (isFoodQuery && cityHub.restaurants?.length > 0) {
        fallbackResponse = `Here are top trending dining spots in **${city.name}** with open tables tonight: 🍽️\n\n` +
          cityHub.restaurants.map(r => `🍷 **[${r.name}](${r.reservationUrl})** (${r.neighborhood} • ${r.priceLevel} • ⭐${r.rating})\n- **Cuisine**: ${r.cuisine} • Must-Order: *${r.signatureDish}*\n- **Available Tables**: ${r.availableTimes.join(', ')}\n- **Reserve**: [Book on ${r.bookingPlatform}](${r.reservationUrl})\n`).join('\n') +
          `\n💡 **Quick Next Steps:**\n- Check shows happening after dinner\n- Find late-night cocktail bars\n- Get transit directions`;
      } else if (isSportsQuery && cityHub.sports?.length > 0) {
        fallbackResponse = `Here is the live sports action for **${city.name}**: 🏒\n\n` +
          cityHub.sports.map(s => `🏆 **${s.team} vs ${s.opponent}** (${s.league})\n- **Status**: ${s.status} ${s.score ? `(${s.score})` : `• Starts at ${s.gameTime}`}\n- **Home/Away**: ${s.isHome ? 'Home Arena' : 'Away'} • TV: ${s.tvBroadcast || 'Sportsnet / TSN'}\n- **Tickets**: [Get Match Tickets](https://www.google.com/search?q=${encodeURIComponent(s.team + ' tickets')})\n`).join('\n') +
          `\n💡 **Quick Next Steps:**\n- Find sports bars near the arena\n- Check full team schedule\n- View city transit routes to the game`;
      } else {
        const topNews = cityHub.news[0];
        fallbackResponse = `Here are the top breaking headlines for **${city.name}** right now: 📰\n\n` +
          `📰 **[${topNews?.title || 'City Council Infrastructure Plan'}](${topNews?.url || `https://${city.domain}`})**\n- **Source**: [${topNews?.source || 'City News'}](${topNews?.url || `https://${city.domain}`}) • *${topNews?.timeAgo || 'Just now'}*\n- **Summary**: ${topNews?.summary || 'Major public transit and civic investments underway.'}\n- **Full Article**: [Read on ${topNews?.source || 'News'}](${topNews?.url || `https://${city.domain}`})\n\n` +
          `💡 **Quick Next Steps:**\n- What live events are happening in ${city.name}?\n- Find top dinner reservations tonight\n- Check live sports scores`;
      }

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
