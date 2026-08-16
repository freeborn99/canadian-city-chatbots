const TENANTS = [
  { id: 'yyc', name: 'Calgary' },
  { id: 'yvr', name: 'Vancouver' },
  { id: 'yyz', name: 'Toronto' },
  { id: 'yul', name: 'Montreal' },
  { id: 'yeg', name: 'Edmonton' },
  { id: 'yow', name: 'Ottawa' },
  { id: 'ywg', name: 'Winnipeg' },
  { id: 'yhz', name: 'Halifax' },
  { id: 'yyj', name: 'Victoria' },
  { id: 'yyt', name: "St. John's" },
];

// A simulated script that could be run via GitHub Actions to automatically post
// to local subreddits, Facebook groups, and Twitter with a link back to the site.
async function runGrowthBot() {
  console.log('🚀 Starting Canadian City Chatbots Growth Bot...');
  console.log('Analyzing trending topics across all 10 cities...\n');

  for (const tenant of TENANTS) {
    const domain = `https://chat${tenant.id}.com`;
    
    // Simulate finding a trending topic for the city
    const trendingTopics = [
      'new restaurant opening downtown',
      'weekend transit delays',
      'upcoming festival in the park',
      'local sports team highlights',
      'city council zoning updates'
    ];
    const topic = trendingTopics[Math.floor(Math.random() * trendingTopics.length)];

    const aiPost = `Hey ${tenant.name}! 🍁 Just heard about the ${topic}. Our AI has all the details, reservations, and tickets sorted out for you. Ask our Local Insider here: ${domain} #Chat${tenant.id.toUpperCase()} #${tenant.name.replace(/\s+/g, '')} #Canada`;

    console.log(`📍 Posting to r/${tenant.name.replace(/\s+/g, '')} and Twitter for ${tenant.id.toUpperCase()}:`);
    console.log(`   "${aiPost}"`);
    console.log(`   [Action] Simulated POST request to social APIs\n`);
    
    // In a real scenario, this would use the Twitter API / Reddit API:
    // await fetch('https://api.twitter.com/2/tweets', { ... })
  }

  console.log('✅ Growth Bot execution complete. Engaging with local communities!');
}

runGrowthBot().catch(console.error);
