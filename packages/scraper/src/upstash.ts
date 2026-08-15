import { Index } from '@upstash/vector';
import * as dotenv from 'dotenv';
import { ScrapedDocument } from './scraper';

dotenv.config();

let indexInstance: Index | null = null;

export function getUpstashIndex(): Index | null {
  const url = process.env.UPSTASH_VECTOR_REST_URL;
  const token = process.env.UPSTASH_VECTOR_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  if (!indexInstance) {
    indexInstance = new Index({
      url,
      token,
    });
  }

  return indexInstance;
}

/**
 * Split long text content into overlapping semantic chunks
 */
export function chunkText(text: string, chunkSize = 500, overlap = 80): string[] {
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0);
  const chunks: string[] = [];

  for (const para of paragraphs) {
    if (para.length <= chunkSize) {
      if (para.trim().length > 30) {
        chunks.push(para.trim());
      }
    } else {
      // Split paragraph by sentences or fixed window
      let start = 0;
      while (start < para.length) {
        let end = start + chunkSize;
        if (end < para.length) {
          const lastPeriod = para.lastIndexOf('. ', end);
          if (lastPeriod > start + 100) {
            end = lastPeriod + 1;
          }
        }
        const chunk = para.slice(start, end).trim();
        if (chunk.length > 30) {
          chunks.push(chunk);
        }
        start = end - overlap;
        if (start >= para.length - 30) break;
      }
    }
  }

  return chunks.length > 0 ? chunks : [text.slice(0, chunkSize)];
}

export interface IngestionResult {
  tenantId: string;
  url: string;
  chunksUpserted: number;
  status: 'success' | 'dry-run' | 'failed';
  error?: string;
}

export async function ingestDocument(
  tenantId: string,
  doc: ScrapedDocument
): Promise<IngestionResult> {
  const chunks = chunkText(doc.content, 450, 60);
  const index = getUpstashIndex();

  if (!index) {
    console.log(
      `[Upstash] (Dry-run) No UPSTASH_VECTOR_REST_URL configured. Would ingest ${chunks.length} chunks for [${tenantId}].`
    );
    return {
      tenantId,
      url: doc.url,
      chunksUpserted: chunks.length,
      status: 'dry-run',
    };
  }

  try {
    const vectors = chunks.map((chunk, idx) => {
      const chunkId = `${tenantId}-${Buffer.from(doc.url).toString('base64').slice(0, 16)}-chunk-${idx}`;
      return {
        id: chunkId,
        data: `${doc.title}\n\n${chunk}`,
        metadata: {
          tenantId: tenantId,
          timestamp: Date.now(),
          url: doc.url,
          title: doc.title,
          category: doc.category,
          extractedAt: doc.extractedAt,
        },
      };
    });

    // Upsert in batches of 20
    const BATCH_SIZE = 20;
    for (let i = 0; i < vectors.length; i += BATCH_SIZE) {
      const batch = vectors.slice(i, i + BATCH_SIZE);
      await index.upsert(batch);
    }

    console.log(`[Upstash] Successfully upserted ${vectors.length} chunks for [${tenantId}] (${doc.title})`);
    return {
      tenantId,
      url: doc.url,
      chunksUpserted: vectors.length,
      status: 'success',
    };
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`[Upstash] Failed to upsert chunks for [${tenantId}]:`, err.message);
    return {
      tenantId,
      url: doc.url,
      chunksUpserted: 0,
      status: 'failed',
      error: err.message,
    };
  }
}
