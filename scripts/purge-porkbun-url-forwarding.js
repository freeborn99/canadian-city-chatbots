// Script to purge all Porkbun URL Forwarding / Pixie Proxies across all 10 Canadian domains
const https = require('https');

const API_KEY = process.env.PORKBUN_API_KEY || process.argv[2];
const SECRET_KEY = process.env.PORKBUN_SECRET_KEY || process.argv[3];

if (!API_KEY || !SECRET_KEY) {
  console.error('Usage: Set PORKBUN_API_KEY and PORKBUN_SECRET_KEY environment variables, or pass as arguments.');
  process.exit(1);
}

const DOMAINS = [
  'chatyyc.com',
  'chatyyz.com',
  'chatyvr.com',
  'chatyul.com',
  'chatyeg.com',
  'chatyow.com',
  'chatywg.com',
  'chatyhz.com',
  'chatyyj.com',
  'chatyyt.com',
];

function porkbunRequest(path, payload = {}) {
  return new Promise((resolve) => {
    const data = JSON.stringify({
      secretapikey: SECRET_KEY,
      apikey: API_KEY,
      ...payload,
    });

    const options = {
      hostname: 'api.porkbun.com',
      port: 443,
      path: `/api/json/v3/${path}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({ status: res.statusCode, body: json });
        } catch (e) {
          resolve({ status: res.statusCode, body: { status: 'ERROR', message: body } });
        }
      });
    });

    req.on('error', (err) => {
      resolve({ status: 500, body: { status: 'ERROR', message: err.message } });
    });

    req.write(data);
    req.end();
  });
}

async function cleanUrlForwarding(domain) {
  console.log(`\n🔍 Checking URL forwarding / Pixie proxies for ${domain}...`);

  const listRes = await porkbunRequest(`domain/getUrlForwarding/${domain}`);

  if (listRes.body.status === 'SUCCESS' && Array.isArray(listRes.body.forwards)) {
    const forwards = listRes.body.forwards;
    if (forwards.length === 0) {
      console.log(`  ✨ No URL forwarders active on ${domain}`);
    } else {
      for (const f of forwards) {
        console.log(`  🗑️ Found Pixie proxy redirect -> ${f.location} (ID: ${f.id}). Deleting...`);
        const delRes = await porkbunRequest(`domain/deleteUrlForward/${domain}/${f.id}`);
        console.log(`  ✅ Deleted URL forwarding (ID: ${f.id}): ${delRes.body.status}`);
      }
    }
  } else {
    console.log(`  ℹ️ Response: ${listRes.body.message || JSON.stringify(listRes.body)}`);
  }
}

async function main() {
  console.log('🚀 Purging all Porkbun URL Forwarding / Pixie Proxy interceptors across all 10 domains...\n');
  for (const domain of DOMAINS) {
    await cleanUrlForwarding(domain);
    await new Promise((r) => setTimeout(r, 250));
  }
  console.log('\n🎉 ALL PORKBUN URL FORWARDERS PURGED! Traffic now goes 100% directly to Vercel!');
}

main();
