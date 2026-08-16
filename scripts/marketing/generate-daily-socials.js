/**
 * Social Media Content Generation Engine
 * 
 * This script automatically generates engaging, localized social media posts (Twitter/Facebook)
 * for all 10 cities by querying your live AI endpoints. It leverages the live RAG data 
 * (news, transit, events) that your system already scrapes.
 * 
 * Usage:
 * node scripts/marketing/generate-daily-socials.js
 */

const fs = require('fs');
const path = require('path');

const DOMAINS = {
  yyz: 'chatyyz.com',
  yvr: 'chatyvr.com',
  yul: 'chatyul.com',
  yyc: 'chatyyc.com',
  yeg: 'chatyeg.com',
  yow: 'chatyow.com',
  ywg: 'chatywg.com',
  yhz: 'chatyhz.com',
  yyj: 'chatyyj.com',
  yyt: 'chatyyt.com',
};

async function generatePostForCity(tenantId, domain) {
  const prompt = `You are the social media manager for ${tenantId.toUpperCase()}. Generate ONE highly engaging, short social media post (max 280 characters) about a LIVE local event, piece of news, or transit alert happening TODAY. Do not use generic placeholders. Make it sound like a local insider. Include 2-3 relevant local hashtags. End the post with a call-to-action asking followers to check live updates at https://${domain}`;

  console.log(`[${tenantId.toUpperCase()}] Generating post...`);

  try {
    // We hit the local development server if running locally, or the production URL
    // For this script, we'll hit the production URL to ensure we get live data
    const url = `https://${domain}/api/chat`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        tenantId: tenantId,
        persona: 'insider',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // The API streams text back, we need to read the stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let resultText = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      // Clean up Vercel AI SDK stream format (0:"text")
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (line.startsWith('0:')) {
          try {
            resultText += JSON.parse(line.substring(2));
          } catch (e) {
            // ignore parse errors on partial chunks
          }
        }
      }
    }

    return resultText.trim() || 'No response generated.';
  } catch (error) {
    console.error(`[${tenantId.toUpperCase()}] Error generating post:`, error.message);
    return `[Failed to generate post for ${tenantId}]`;
  }
}

async function run() {
  console.log('==================================================');
  console.log('🚀 AUTOMATED SOCIAL MEDIA ENGINE STARTING...');
  console.log('==================================================\n');

  const dateStr = new Date().toISOString().split('T')[0];
  const outputDir = path.join(__dirname, 'output');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `social-posts-${dateStr}.txt`);
  let fileContent = `Daily Social Media Posts - ${dateStr}\n\n`;

  for (const [tenantId, domain] of Object.entries(DOMAINS)) {
    const post = await generatePostForCity(tenantId, domain);
    
    const formattedEntry = `--- ${tenantId.toUpperCase()} (${domain}) ---\n${post}\n\n`;
    console.log(`\n✅ Generated for ${tenantId.toUpperCase()}:\n${post}\n`);
    
    fileContent += formattedEntry;
  }

  fs.writeFileSync(outputPath, fileContent);
  console.log('==================================================');
  console.log(`🎉 Complete! All posts saved to: ${outputPath}`);
  console.log('You can now copy and paste these to Twitter, Facebook, or a scheduling tool like Buffer/Hootsuite.');
}

run();
