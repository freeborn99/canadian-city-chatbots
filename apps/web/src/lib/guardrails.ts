import { CityTenant } from './tenants';

export interface GuardrailCheckResult {
  isBlocked: boolean;
  reason?: 'jailbreak_attempt' | 'programming_request' | 'academic_homework' | 'foreign_geography' | 'generic_offtopic';
  refusalMessage?: string;
}

// 1. Jailbreak, Roleplay & System Prompt Override Patterns
const JAILBREAK_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|system|above)\s+(instructions|prompts|rules|commands|constraints)/i,
  /disregard\s+(all\s+)?(previous|prior|system|above)\s+(instructions|prompts|rules|commands)/i,
  /forget\s+(all\s+)?(previous|prior|your)\s+(instructions|rules|identity|purpose)/i,
  /\b(you are now|from now on you are|act as|pretend to be|simulate|roleplay as|play the role of)\b/i,
  /\b(DAN|do anything now|developer mode|unrestricted mode|unfiltered mode|god mode|jailbreak|jailbroken)\b/i,
  /\b(bypass|disable|override|break|remove)\s+(your\s+)?(guardrails|filters|rules|boundaries|safety|restrictions)/i,
  /\b(hypothetically|in a fictional (world|story|universe)|in an alternate universe)\s+(if you were|where you can|where you are)/i,
  /\b(repeat|print|output|reveal|show|display)\s+(the\s+)?(system prompt|initial prompt|hidden prompt|developer prompt|rules verbatim)/i,
];

// 2. Programming, Code Generation & Technical Debugging Patterns
const PROGRAMMING_PATTERNS = [
  /\b(write|create|generate|provide|give me|debug|fix|explain)\s+(a\s+|the\s+|some\s+)?(python|javascript|typescript|c\+\+|java|rust|golang|php|c#|sql|bash|shell|powershell|regex|html|css|react|vue|angular|node\.js|next\.js)\s+(script|code|program|function|class|algorithm|component|regex|query|snippet)/i,
  /\b(write|code|implement|generate)\s+(a\s+|an\s+)?(algorithm|binary search|sorting algorithm|linked list|leetcode|api endpoint|unit test|cron job|dockerfile|yaml config)/i,
  /\bhow to (code|program|compile|build an app|implement|reverse a string|invert a binary tree)\b/i,
  /```(python|js|javascript|ts|typescript|html|css|cpp|java|sql|sh|bash)/i,
  /\b(def |function\(|const |let |var |import React|public class |SELECT \* FROM)\b/,
];

// 3. Academic Homework, Math & General Science Essays
const ACADEMIC_PATTERNS = [
  /\b(write|compose|generate|draft)\s+(an?|a\s+\d+\s+words?)\s+(essay|research paper|thesis|term paper|book report|speech|analysis)\s+(on|about|regarding)\s+(?!calgary|toronto|vancouver|montreal|edmonton|ottawa|winnipeg|halifax|victoria|st\.?\s*john)/i,
  /\b(solve|calculate|compute|evaluate)\s+(this\s+|the\s+)?(equation|math problem|integral|derivative|matrix|calculus|trigonometry|physics problem)/i,
  /\b(explain|summarize|describe)\s+(in detail\s+)?(quantum (mechanics|physics)|general relativity|string theory|photosynthesis|mitosis|cellular respiration|the french revolution|the cold war|the fall of rome|the industrial revolution)\b/i,
];

// 4. Foreign & Non-Regional Geography Patterns (Outside Canada / specific metro)
const FOREIGN_GEOGRAPHY_PATTERNS = [
  /\b(in|visit|travel to|hotels in|flights to|things to do in|trip to|attractions in|vacation in)\s+(miami|las vegas|vegas|new york|nyc|los angeles|la|chicago|san francisco|orlando|houston|dallas|austin|seattle|boston|london|paris|rome|tokyo|dubai|bangkok|singapore|sydney|melbourne|cancun|mexico city|punta cana|barcelona|amsterdam|berlin|hawaii|bali|phuket|florence|madrid|venice|los cabos|cabo)\b/i,
];

/**
 * Checks whether an incoming user query violates regional guardrails or attempts token abuse.
 */
export function checkQueryGuardrails(query: string, city: CityTenant): GuardrailCheckResult {
  if (!query || typeof query !== 'string') {
    return { isBlocked: false };
  }

  const q = query.trim();

  // 1. Check for Jailbreak / Prompt Injection Override
  for (const pattern of JAILBREAK_PATTERNS) {
    if (pattern.test(q)) {
      return {
        isBlocked: true,
        reason: 'jailbreak_attempt',
        refusalMessage: buildRefusalResponse(
          city,
          `I am strictly anchored to **${city.name}** and cannot roleplay as another assistant, bypass regional boundaries, or ignore civic directives.`
        ),
      };
    }
  }

  // 2. Check for Programming / Coding Requests
  for (const pattern of PROGRAMMING_PATTERNS) {
    if (pattern.test(q)) {
      return {
        isBlocked: true,
        reason: 'programming_request',
        refusalMessage: buildRefusalResponse(
          city,
          `I am a dedicated local civic & nightlife assistant for **${city.name}**, not a general software coding tool or programming assistant.`
        ),
      };
    }
  }

  // 3. Check for Academic Homework / Non-Local Essays
  for (const pattern of ACADEMIC_PATTERNS) {
    if (pattern.test(q)) {
      return {
        isBlocked: true,
        reason: 'academic_homework',
        refusalMessage: buildRefusalResponse(
          city,
          `I am focused exclusively on **${city.name}** local intelligence, events, and municipal services, and do not generate general academic essays or solve general homework problems.`
        ),
      };
    }
  }

  // 4. Check for Foreign / Out-of-Region Travel Destinations
  for (const pattern of FOREIGN_GEOGRAPHY_PATTERNS) {
    if (pattern.test(q)) {
      return {
        isBlocked: true,
        reason: 'foreign_geography',
        refusalMessage: buildRefusalResponse(
          city,
          `I specialize exclusively in **${city.name} (${city.province})** and the surrounding **${city.metroArea}** region. I don't provide guides for destinations outside Canada.`
        ),
      };
    }
  }

  return { isBlocked: false };
}

/**
 * Generates an elegant, helpful refusal message that redirects the user to explore the city's nightlife, dining, and live events.
 */
function buildRefusalResponse(city: CityTenant, customRefusalReason: string): string {
  const topNightlife = city.nightlifeDistricts?.[0] || 'Downtown';
  const topLandmark = city.landmarks?.[0] || city.name;

  return `🍁 **Chat${city.id.toUpperCase()} Local Boundary Notice**\n\n` +
    `${customRefusalReason}\n\n` +
    `I would love to help you discover everything happening in **${city.name}** and the **${city.metroArea}** instead!\n\n` +
    `💡 **What would you like to explore in ${city.name}?**\n` +
    `- What are the hottest nightclubs and speakeasies around ${topNightlife} tonight?\n` +
    `- Find top-rated restaurant reservations near ${topLandmark}\n` +
    `- What major concerts, festivals, or live shows are happening this week?`;
}
