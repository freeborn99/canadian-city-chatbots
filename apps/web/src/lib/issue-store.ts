// Persistent In-Memory Issue & Feedback Store for Canadian AI Hub

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
      userPrompt: 'i need to call animal control. what do i tell them about a bad dog',
      aiResponse: 'Here are the top breaking headlines for Calgary right now: Green Line LRT Construction...',
      aiSuggestedCategory: 'Irrelevant Response / Content Mismatch',
      aiSuggestedSummary: 'AI returned Green Line LRT transit news instead of Animal Control 311 reporting instructions.',
      userDescription: 'Chat returned news headlines when I specifically asked for animal control contact info.',
      userEmail: 'citizen@calgary.ca',
      status: 'resolved',
    }
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
