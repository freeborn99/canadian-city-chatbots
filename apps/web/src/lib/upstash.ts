import { Index } from '@upstash/vector';

let vectorIndex: Index | null = null;

export function getUpstashVectorClient(): Index | null {
  const url = process.env.UPSTASH_VECTOR_REST_URL;
  const token = process.env.UPSTASH_VECTOR_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  if (!vectorIndex) {
    vectorIndex = new Index({
      url,
      token,
    });
  }

  return vectorIndex;
}

export interface VectorMetadata extends Record<string, unknown> {
  tenantId?: string;
  title?: string;
  url?: string;
  category?: string;
  timestamp?: number;
}

export interface RetrievedVectorResult {
  id: string | number;
  score: number;
  data?: string;
  metadata?: VectorMetadata;
}

/**
 * Query Upstash Vector index filtered strictly by tenantId
 */
export async function queryTenantContext(
  userMessage: string,
  tenantId: string,
  topK = 3
): Promise<string> {
  const index = getUpstashVectorClient();

  if (!index) {
    return ''; // Will rely on LLM general city knowledge
  }

  try {
    const results = await index.query<VectorMetadata>({
      data: userMessage,
      topK,
      includeData: true,
      includeMetadata: true,
      filter: `tenantId = '${tenantId}'`,
    });

    if (!results || results.length === 0) {
      return '';
    }

    const contextSnippets = results
      .map((item, idx) => {
        const title = item.metadata?.title || `Document ${idx + 1}`;
        const sourceUrl = item.metadata?.url ? ` (Source: ${item.metadata.url})` : '';
        const body = item.data || '';
        return `### [Local Civic Context #${idx + 1}] ${title}${sourceUrl}\n${body}`;
      })
      .filter(Boolean)
      .join('\n\n---\n\n');

    return contextSnippets;
  } catch (error: unknown) {
    console.warn('[Upstash RAG] Vector query failed, proceeding with baseline prompt:', (error as Error).message);
    return '';
  }
}
