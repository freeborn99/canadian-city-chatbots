// Persistent In-Memory Issue & Feedback Store for Canadian AI Hub

export interface SessionDiagnostics {
  viewport?: string;
  screenResolution?: string;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
  userAgent?: string;
  currentUrl?: string;
  persona?: string;
  clientTimestamp?: string;
  recentChatTranscript?: Array<{ role: string; content: string }>;
  networkLatencyMs?: number;
}

export interface HostPerformanceSnapshot {
  edgeRegion?: string;
  p50LatencyMs?: number;
  p95LatencyMs?: number;
  cacheHitRatio?: string;
  activeProvider?: string;
}

export interface IssueReport {
  id: string;
  timestamp: number;
  tenantId: string;
  userPrompt: string;
  aiResponse: string;
  aiSuggestedCategory: string;
  aiSuggestedSummary: string;
  userDescription: string;
  userEmail?: string;
  status: 'new' | 'investigating' | 'resolved';
  antigravityPrompt?: string;
  sessionDiagnostics?: SessionDiagnostics;
  hostStats?: HostPerformanceSnapshot;
  clientMeta?: {
    userAgent?: string;
    url?: string;
  };
}

const globalIssueState: {
  issues: IssueReport[];
} = (globalThis as any).__CANADIAN_ISSUES__ || {
  issues: [
    {
      id: 'iss_init_1',
      timestamp: Date.now() - 3600000,
      tenantId: 'yyc',
      userPrompt: 'train schedule chinnok station',
      aiResponse: 'I am your hyper-local ChatYYC AI concierge for Calgary, Alberta! 🍁 I can give you real-time answers...',
      aiSuggestedCategory: 'Transit / Schedule Formatting',
      aiSuggestedSummary: 'User requested CTrain Chinook Station schedule with typo; AI returned generic intro menu.',
      userDescription: 'The formatting for the train schedule was generic and not structured.',
      userEmail: 'user@chatyyc.com',
      status: 'resolved',
      antigravityPrompt: `Fix transit schedule routing and formatting in ChatYYC:
- Problem: User asked 'train schedule chinnok station' (Calgary CTrain Chinook Station).
- Fix: Ensure CTrain Red Line / Blue Line schedule tables and Chinook Station details are rendered with structured markdown tables in apps/web/src/app/api/chat/route.ts and city-data.ts.`,
      sessionDiagnostics: {
        viewport: '1440x900',
        deviceType: 'desktop',
        persona: 'insider',
        clientTimestamp: new Date().toISOString(),
      },
    },
  ],
};

(globalThis as any).__CANADIAN_ISSUES__ = globalIssueState;

export function recordIssue(issue: Omit<IssueReport, 'id' | 'timestamp' | 'status'>): IssueReport {
  const newIssue: IssueReport = {
    id: `iss_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
    status: 'new',
    ...issue,
  };

  globalIssueState.issues.unshift(newIssue);

  // Keep latest 500 reports
  if (globalIssueState.issues.length > 500) {
    globalIssueState.issues.pop();
  }

  return newIssue;
}

export function getIssues(): IssueReport[] {
  return globalIssueState.issues;
}

export function updateIssueStatus(id: string, status: IssueReport['status']) {
  const issue = globalIssueState.issues.find((i) => i.id === id);
  if (issue) {
    issue.status = status;
    return true;
  }
  return false;
}
