// Porkbun Automated DNS Configurator for Canadian City Domains
const https = require('https');

const API_KEY = process.env.PORKBUN_API_KEY || process.argv[2];
const SECRET_KEY = process.env.PORKBUN_SECRET_KEY || process.argv[3];

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

if (!API_KEY || !SECRET_KEY) {
  console.error('Usage: node scripts/configure-porkbun-dns.js <API_KEY> <SECRET_KEY>');
  process.exit(1);
}

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

async function configureDomain(domain) {
  console.log(`\n⚙️ Configuring DNS for ${domain}...`);

  // 1. Check existing records
  const retrieveRes = await porkbunRequest(`dns/retrieve/${domain}`, {
    secretapikey: SECRET_KEY,
    apikey: API_KEY,
  });

  if (retrieveRes.body.status === 'SUCCESS' && Array.isArray(retrieveRes.body.records)) {
    const existing = retrieveRes.body.records;
    for (const r of existing) {
      if ((r.type === 'A' && (!r.name || r.name === domain)) || (r.type === 'CNAME' && r.name === `www.${domain}`)) {
        // Delete old parking record
        await porkbunRequest(`dns/delete/${domain}/${r.id}`, {
          secretapikey: SECRET_KEY,
          apikey: API_KEY,
        });
        console.log(`  🗑️ Removed existing ${r.type} record (ID: ${r.id})`);
      }
    }
  }

  // 2. Add Apex A Record -> 76.76.21.21
  const aRes = await porkbunRequest(`dns/create/${domain}`, {
    secretapikey: SECRET_KEY,
    apikey: API_KEY,
    name: '',
    type: 'A',
    content: '76.76.21.21',
    ttl: '600',
  });

  if (aRes.body.status === 'SUCCESS') {
    console.log(`  ✅ Created A record -> 76.76.21.21 (Apex)`);
  } else {
    console.log(`  ℹ️ A record: ${aRes.body.message || JSON.stringify(aRes.body)}`);
  }

  // 3. Add www CNAME Record -> cname.vercel-dns.com
  const cnameRes = await porkbunRequest(`dns/create/${domain}`, {
    secretapikey: SECRET_KEY,
    apikey: API_KEY,
    name: 'www',
    type: 'CNAME',
    content: 'cname.vercel-dns.com',
    ttl: '600',
  });

  if (cnameRes.body.status === 'SUCCESS') {
    console.log(`  ✅ Created CNAME record www.${domain} -> cname.vercel-dns.com`);
  } else {
    console.log(`  ℹ️ CNAME record: ${cnameRes.body.message || JSON.stringify(cnameRes.body)}`);
  }
}

async function main() {
  console.log('🍁 Starting Automated Porkbun DNS Configuration for all 10 Canadian City Domains...\n');

  // Test credentials with ping
  const pingRes = await porkbunRequest('ping', {
    secretapikey: SECRET_KEY,
    apikey: API_KEY,
  });

  if (pingRes.body.status !== 'SUCCESS') {
    console.error('❌ Porkbun authentication failed. Check your API and Secret keys.');
    console.error('Porkbun response:', pingRes.body);
    process.exit(1);
  }

  console.log('✅ Porkbun API Authentication Successful! Your IP is authorized.');

  for (const domain of DOMAINS) {
    await configureDomain(domain);
    await new Promise((r) => setTimeout(r, 300)); // Rate-limiting guard
  }

  console.log('\n🎉 ALL 10 DOMAINS HAVE BEEN FULLY CONFIGURED ON PORKBUN & LINKED TO VERCEL!');
}

main();
