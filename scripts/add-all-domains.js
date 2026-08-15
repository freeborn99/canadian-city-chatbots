// Script to automatically register all 20 Canadian city domains to Vercel project via Vercel REST API
const https = require('https');

const DOMAINS = [
  'chatyyc.com', 'www.chatyyc.com',
  'chatyyz.com', 'www.chatyyz.com',
  'chatyvr.com', 'www.chatyvr.com',
  'chatyul.com', 'www.chatyul.com',
  'chatyeg.com', 'www.chatyeg.com',
  'chatyow.com', 'www.chatyow.com',
  'chatywg.com', 'www.chatywg.com',
  'chatyhz.com', 'www.chatyhz.com',
  'chatyyj.com', 'www.chatyyj.com',
  'chatyyt.com', 'www.chatyyt.com',
];

const token = process.env.VERCEL_TOKEN || process.argv[2];
const projectId = process.env.VERCEL_PROJECT_ID || process.argv[3] || 'canadian-city-chatbots';

if (!token) {
  console.error('Usage: node scripts/add-all-domains.js <VERCEL_TOKEN> [PROJECT_NAME_OR_ID]');
  process.exit(1);
}

async function addDomain(domain) {
  const data = JSON.stringify({ name: domain });
  const options = {
    hostname: 'api.vercel.com',
    port: 443,
    path: `/v10/projects/${projectId}/domains`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`✅ Successfully added: ${domain}`);
            resolve({ domain, success: true, data: json });
          } else {
            console.log(`ℹ️ [${res.statusCode}] ${domain}: ${json.error?.message || body}`);
            resolve({ domain, success: false, error: json.error });
          }
        } catch (e) {
          console.log(`❌ Error parsing response for ${domain}: ${body}`);
          resolve({ domain, success: false, error: body });
        }
      });
    });

    req.on('error', (err) => {
      console.error(`❌ Network error for ${domain}:`, err.message);
      resolve({ domain, success: false, error: err.message });
    });

    req.write(data);
    req.end();
  });
}

async function main() {
  console.log(`🚀 Adding ${DOMAINS.length} Canadian City Domains to Vercel project: ${projectId}...`);
  for (const domain of DOMAINS) {
    await addDomain(domain);
    await new Promise((r) => setTimeout(r, 250)); // Rate limit guard
  }
  console.log('🎉 Domain configuration batch completed!');
}

main();
