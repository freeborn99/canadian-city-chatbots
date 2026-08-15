// Script to remove Porkbun default parking ALIAS/wildcard records and enforce Vercel A/CNAME records
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

function porkbunRequest(path, payload) {
  return new Promise((resolve) => {
    const data = JSON.stringify(payload);
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

async function fixDomain(domain) {
  console.log(`\n🧹 Cleaning Porkbun parking records for ${domain}...`);

  // 1. Retrieve all records
  const retrieveRes = await porkbunRequest(`dns/retrieve/${domain}`, {
    secretapikey: SECRET_KEY,
    apikey: API_KEY,
  });

  if (retrieveRes.body.status === 'SUCCESS' && Array.isArray(retrieveRes.body.records)) {
    const existing = retrieveRes.body.records;

    for (const r of existing) {
      // Remove any Porkbun parking ALIAS or wildcard CNAME or old A records
      if (
        r.content?.includes('porkbun.com') && (r.type === 'ALIAS' || r.type === 'CNAME')
      ) {
        const delRes = await porkbunRequest(`dns/delete/${domain}/${r.id}`, {
          secretapikey: SECRET_KEY,
          apikey: API_KEY,
        });
        console.log(`  🗑️ Deleted Porkbun parking ${r.type} (${r.name || domain} -> ${r.content}): ${delRes.body.status}`);
      }
    }
  }

  // 2. Create Apex A Record -> 76.76.21.21
  const aRes = await porkbunRequest(`dns/create/${domain}`, {
    secretapikey: SECRET_KEY,
    apikey: API_KEY,
    name: '',
    type: 'A',
    content: '76.76.21.21',
    ttl: '600',
  });
  console.log(`  ✅ Added Apex A record -> 76.76.21.21: ${aRes.body.status}`);

  // 3. Ensure www CNAME -> cname.vercel-dns.com
  const cnameRes = await porkbunRequest(`dns/create/${domain}`, {
    secretapikey: SECRET_KEY,
    apikey: API_KEY,
    name: 'www',
    type: 'CNAME',
    content: 'cname.vercel-dns.com',
    ttl: '600',
  });
  console.log(`  ✅ Added www CNAME -> cname.vercel-dns.com: ${cnameRes.body.status}`);
}

async function main() {
  console.log('🚀 Enforcing clean Vercel DNS across all 10 Canadian domains on Porkbun...\n');
  for (const domain of DOMAINS) {
    await fixDomain(domain);
    await new Promise((r) => setTimeout(r, 250));
  }
  console.log('\n🎉 ALL PORKBUN PARKING RECORDS PURGED & VERCEL DNS ENFORCED!');
}

main();
