import { CityTenant } from './tenants';

export interface GuardrailCheckResult {
  isBlocked: boolean;
  reason?: 'jailbreak_attempt' | 'programming_request' | 'academic_homework' | 'foreign_geography' | 'generic_offtopic' | 'adversarial_injection';
  refusalMessage?: string;
}

// 1. Explicit Jailbreak, Persona Hijack & System Prompt Leak Patterns
const JAILBREAK_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|system|above|initial)\s+(instructions|prompts|rules|commands|constraints)/i,
  /disregard\s+(all\s+)?(previous|prior|system|above)\s+(instructions|prompts|rules|commands)/i,
  /forget\s+(all\s+)?(previous|prior|your)\s+(instructions|rules|identity|purpose|system prompt)/i,
  /\b(you are now|from now on you are|pretend to be|roleplay as|play the role of)\s+(unfiltered|dan|chaosgpt|developer mode|god mode)\b/i,
  /\b(DAN|do anything now|unrestricted mode|unfiltered mode|jailbreak|jailbroken|chaosgpt)\b/i,
  /\b(bypass|disable|override|break|remove|turn off)\s+(your\s+)?(guardrails|filters|rules|boundaries|safety|restrictions)/i,
  /\b(repeat|print|output|reveal|show|display|tell me)\s+(the\s+)?(system prompt|initial prompt|hidden prompt|developer prompt|rules verbatim|instructions you were given)/i,
  /---\s*(END OF (SYSTEM|PROMPT|RULES)|NEW INSTRUCTIONS)\s*---/i,
  /\[SYSTEM(\s+OVERRIDE)?\]/i,
];

// 2. Explicit Programming / Software Code Generation Patterns (Only block direct code synthesis requests)
const PROGRAMMING_PATTERNS = [
  /\b(write|create|generate|provide|debug|fix|refactor)\s+(a\s+|the\s+|some\s+)?(python|javascript|typescript|c\+\+|c#|java|rust|golang|php|ruby|swift|kotlin|sql|bash|powershell)\s+(script|code|program|function|class|algorithm|component|endpoint|backend)/i,
  /\b(write|code|implement|generate)\s+(a\s+|an\s+)?(binary search|sorting algorithm|linked list|leetcode solution|cron job script|dockerfile|database migration script)/i,
  /```(python|js|javascript|ts|typescript|cpp|csharp|java|sql|sh|bash)\n/i,
];

// 3. Academic Essay / Non-Local Homework Generation
const ACADEMIC_PATTERNS = [
  /\b(write|compose|generate|draft)\s+(an?|a\s+\d+\s+words?)\s+(essay|thesis|term paper|book report)\s+(on|about|regarding)\s+(?!calgary|toronto|vancouver|montreal|edmonton|ottawa|winnipeg|halifax|victoria|st\.?\s*john|canada|alberta|ontario|quebec|british columbia|nova scotia|manitoba|newfoundland)/i,
  /\b(solve|calculate|evaluate|integrate|differentiate)\s+(this\s+|the\s+)?(equation|math problem|integral|derivative|matrix|calculus|trigonometry problem)\b/i,
];

// 4. Foreign Non-Canadian Travel Planning (Only if explicitly asking for itineraries/hotels in foreign destinations)
const FOREIGN_GEOGRAPHY_PATTERNS = [
  /\b(vacation in|trip to|hotels in|flights to|things to do in|itinerary for|best spots in)\s+(miami|las vegas|vegas|los angeles|chicago|orlando|houston|dallas|cancun|punta cana|hawaii|bali|phuket|florence|madrid|venice|cabo|paris|london|tokyo|dubai|rome)\b/i,
];

/**
 * Fast synchronous heuristic guardrail check.
 * Permissive on ALL general inquiries (dining, date ideas, walking routes, parks, weather, shopping, transit, etc.)
 * by assuming the inquiry implicitly pertains to the active city hub.
 */
export function checkQueryGuardrails(query: string, city: CityTenant): GuardrailCheckResult {
  if (!query || typeof query !== 'string') {
    return { isBlocked: false };
  }

  const q = query.trim();
  if (q.length < 3) {
    return { isBlocked: false };
  }

  // 1. Check for explicit jailbreaks & system prompt attacks
  for (const pattern of JAILBREAK_PATTERNS) {
    if (pattern.test(q)) {
      return {
        isBlocked: true,
        reason: 'jailbreak_attempt',
        refusalMessage: buildRefusalResponse(
          city,
          `I am strictly anchored to **${city.name}** and cannot roleplay as another assistant, bypass safety policies, or disclose system directives.`
        ),
      };
    }
  }

  // 2. Check for explicit programming / software code generation
  for (const pattern of PROGRAMMING_PATTERNS) {
    if (pattern.test(q)) {
      return {
        isBlocked: true,
        reason: 'programming_request',
        refusalMessage: buildRefusalResponse(
          city,
          `I am your dedicated local **${city.name}** AI concierge, not a software coding tool.`
        ),
      };
    }
  }

  // 3. Check for explicit non-local academic essay writing
  for (const pattern of ACADEMIC_PATTERNS) {
    if (pattern.test(q)) {
      return {
        isBlocked: true,
        reason: 'academic_homework',
        refusalMessage: buildRefusalResponse(
          city,
          `I am focused on **${city.name}** local intelligence, events, dining, and city services rather than academic essay writing.`
        ),
      };
    }
  }

  // 4. Check for explicit foreign non-Canadian travel planning
  for (const pattern of FOREIGN_GEOGRAPHY_PATTERNS) {
    if (pattern.test(q)) {
      return {
        isBlocked: true,
        reason: 'foreign_geography',
        refusalMessage: buildRefusalResponse(
          city,
          `I specialize exclusively in **${city.name} (${city.province})** and the **${city.metroArea}** region. I don't provide guides for destinations outside Canada.`
        ),
      };
    }
  }

  // All other general inquiries pass directly through with implicit local context!
  return { isBlocked: false };
}

/**
 * Evaluates semantic guardrails with maximum tolerance for natural, general inquiries.
 */
export async function evaluateSemanticGuardrails(
  query: string,
  _history: Array<{ role: string; content: string }>,
  city: CityTenant,
  _groqApiKey?: string
): Promise<GuardrailCheckResult> {
  return checkQueryGuardrails(query, city);
}

/**
 * Generates a helpful refusal message with local options
 */
function buildRefusalResponse(city: CityTenant, customRefusalReason: string): string {
  const topNightlife = city.nightlifeDistricts?.[0] || 'Downtown';
  const topLandmark = city.landmarks?.[0] || city.name;

  return `🍁 **Chat${city.id.toUpperCase()} Local Concierge**\n\n` +
    `${customRefusalReason}\n\n` +
    `I would love to help you with anything in **${city.name}** and the **${city.metroArea}** instead!\n\n` +
    `💡 **Popular in ${city.name}:**\n` +
    `- Top restaurants and cocktail speakeasies around ${topNightlife} tonight\n` +
    `- Live concert, theatre, and sports tickets near ${topLandmark}\n` +
    `- Real-time transit schedules, 311 bylaws, and local city guides`;
}
