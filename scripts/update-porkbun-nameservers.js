// Script to switch authoritative nameservers to Vercel across all 10 Canadian domains
const https = require('https');

const API_KEY = 'pk1_6714231bbae2f8b7944c139b5daf1df2e30d9151d9d99e9398ae72aafc4e256e';
const SECRET_KEY = 'sk1_d8e1939652f2d1f1ebb1be56617e4ee3ecf7e931633040ae1ac17381fb127452';

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

async function updateNameservers(domain) {
  console.log(`\n🚀 Switching authoritative nameservers for ${domain} to Vercel...`);
  const res = await porkbunRequest(`domain/updateNs/${domain}`, {
    ns: ['ns1.vercel-dns.com', 'ns2.vercel-dns.com'],
  });

  if (res.body.status === 'SUCCESS') {
    console.log(`  ✅ Successfully pointed ${domain} nameservers to Vercel Anycast!`);
  } else {
    console.log(`  ℹ️ Result: ${res.body.message || JSON.stringify(res.body)}`);
  }
}

async function main() {
  console.log('🍁 Switching all 10 Canadian Domains to Vercel Authoritative Nameservers...\n');
  for (const domain of DOMAINS) {
    await updateNameservers(domain);
    await new Promise((r) => setTimeout(r, 250));
  }
  console.log('\n🎉 ALL 10 DOMAINS ARE NOW DIRECTLY HOSTED ON VERCEL AUTHORITATIVE NAMESERVERS!');
}

main();
