import { getUpstashVectorClient, queryTenantContext } from './apps/web/src/lib/upstash';
import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import * as dotenv from 'dotenv';
dotenv.config({ path: './apps/web/.env.local' });

async function test() {
  console.log('Testing Upstash query...');
  const t0 = Date.now();
  try {
    const ctx = await queryTenantContext('what are the best places in Calgary', 'yyc');
    console.log(`Upstash context (${Date.now() - t0}ms):`, ctx ? ctx.slice(0, 150) + '...' : '(none)');
  } catch (e) {
    console.error('Upstash error:', e);
  }

  console.log('\nTesting Groq AI stream...');
  const t1 = Date.now();
  try {
    const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
    const res = streamText({
      model: groq('llama-3.3-70b-versatile'),
      prompt: 'Say Hello Calgary in 10 words.',
    });
    for await (const chunk of res.textStream) {
      process.stdout.write(chunk);
    }
    console.log(`\nGroq finished in ${Date.now() - t1}ms`);
  } catch (e) {
    console.error('Groq error:', e);
  }
}

test();
