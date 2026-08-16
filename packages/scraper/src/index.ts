import { CITY_SCRAPE_TARGETS } from './config';
import { scrapeUrl, ScrapedDocument } from './scraper';
import { ingestDocument, IngestionResult } from './upstash';
import * as fs from 'fs';
import * as path from 'path';

// Using a similar type to what the web app expects
interface NewsHeadline {
  id: string;
  title: string;
  source: string;
  category: string;
  url: string;
  timeAgo: string;
  summary: string;
  expandedDetails: {
    keyTakeaways: string[];
    localImpact: string;
    timeline: string;
    relatedActionUrl?: string;
    relatedActionText?: string;
  };
}

async function main() {
  console.log('='.repeat(70));
  console.log('🚀 Canadian Cities Automated Scraper & Vector Ingestion');
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
  console.log(`🇨🇦 Target Cities: ${CITY_SCRAPE_TARGETS.length}`);
  console.log('='.repeat(70));

  const results: IngestionResult[] = [];
  const liveNewsFeed: Record<string, NewsHeadline[]> = {};

  for (const city of CITY_SCRAPE_TARGETS) {
    console.log(`\n📍 Processing City: ${city.cityName} (${city.tenantId.toUpperCase()})`);
    liveNewsFeed[city.tenantId] = [];

    for (const target of city.urls) {
      try {
        const doc = await scrapeUrl(target.url, target.category, target.label);
        if (doc) {
          // 1. Ingest to Vector DB for AI context
          const res = await ingestDocument(city.tenantId, doc);
          results.push(res);

          // 2. Format for live JSON feed
          let uiCategory = 'Civic';
          if (doc.category === 'events' || doc.category === 'culture') {
            uiCategory = 'Culture';
          } else if (doc.category === 'news') {
            uiCategory = 'Civic'; // We'll classify local news under Civic for the UI
          }

          const headline: NewsHeadline = {
            id: `scrape-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            title: doc.title,
            source: target.label,
            category: uiCategory,
            url: doc.url,
            timeAgo: 'Just now', // Could be formatted based on doc.extractedAt
            summary: doc.aiSummary?.summary || doc.content.substring(0, 150) + '...',
            expandedDetails: {
              keyTakeaways: doc.aiSummary?.keyTakeaways || ['Check full article for details.'],
              localImpact: doc.aiSummary?.localImpact || 'Local news update.',
              timeline: 'Recent',
              relatedActionUrl: doc.url,
              relatedActionText: 'Read Full Article',
            }
          };
          liveNewsFeed[city.tenantId].push(headline);

        } else {
          // Fallback handled via vector DB normally, skip for live UI feed
        }
      } catch (err: unknown) {
        console.error(`Error processing ${target.url}:`, (err as Error).message);
      }

      // Small delay between requests to be polite
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  // Write JSON Feed to web app directory
  try {
    const dataDir = path.resolve(__dirname, '../../../apps/web/src/data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const outputPath = path.join(dataDir, 'live-news.json');
    fs.writeFileSync(outputPath, JSON.stringify(liveNewsFeed, null, 2));
    console.log(`\n💾 Saved live news feed to ${outputPath}`);
  } catch (err) {
    console.error(`Failed to save live news feed:`, err);
  }

  console.log('\n' + '='.repeat(70));
  console.log('📊 INGESTION SUMMARY:');
  const successful = results.filter((r) => r.status === 'success').length;
  const dryRuns = results.filter((r) => r.status === 'dry-run').length;
  const failed = results.filter((r) => r.status === 'failed').length;
  const totalChunks = results.reduce((acc, r) => acc + r.chunksUpserted, 0);

  console.log(`✅ Successful: ${successful}`);
  console.log(`📝 Dry-runs: ${dryRuns}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📦 Total Chunks Processed: ${totalChunks}`);
  console.log('='.repeat(70));
}

main().catch((err) => {
  console.error('Fatal error in scraper pipeline:', err);
  process.exit(1);
});
