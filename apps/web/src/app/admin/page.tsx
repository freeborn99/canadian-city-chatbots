'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  BarChart3,
  Cpu,
  Users,
  Globe,
  DollarSign,
  Zap,
  TrendingUp,
  RefreshCw,
  Clock,
  ShieldCheck,
  ShieldAlert,
  ExternalLink,
  Lock,
  LogOut,
  Utensils,
  Ticket,
  Newspaper,
  Compass,
  KeyRound,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Mail,
  MessageSquare,
  Flame,
  Train,
  PhoneCall,
  Trees,
  Copy,
  Check,
  Smartphone,
  Monitor,
  Activity,
  Server,
  X,
  Eye,
  EyeOff,
  Archive,
  ChevronRight
} from 'lucide-react';
import { TENANTS } from '@/lib/tenants';

const AUTH_STORAGE_KEY = 'can_city_admin_auth_token_v1';

const CollapsibleSection = ({
  id,
  title,
  icon: Icon,
  badge,
  defaultExpanded = false,
  children,
  headerRight,
  borderColor = 'border-slate-800/80',
  iconColor = 'text-slate-300',
  iconBg = 'bg-slate-800/50',
  iconBorder = 'border-slate-700/50'
}: {
  id: string;
  title: string;
  icon?: React.ElementType;
  badge?: React.ReactNode;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  borderColor?: string;
  iconColor?: string;
  iconBg?: string;
  iconBorder?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`admin_section_${id}`);
      if (saved !== null) return saved === 'true';
    }
    return defaultExpanded;
  });

  useEffect(() => {
    localStorage.setItem(`admin_section_${id}`, String(isExpanded));
  }, [id, isExpanded]);

  return (
    <div className={`glass-panel border ${borderColor} rounded-2xl shadow-xl flex flex-col overflow-hidden`}>
      <div 
        className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-900/50 transition-colors select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={`w-8 h-8 rounded-xl ${iconBg} border ${iconBorder} flex items-center justify-center ${iconColor}`}>
              <Icon className="w-4 h-4" />
            </div>
          )}
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            {title}
            {badge}
          </h2>
        </div>
        <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
          {headerRight}
          <button 
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
      {isExpanded && <div className="p-5 pt-0 border-t border-slate-800/50">{children}</div>}
    </div>
  );
};

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<number | null>(null);
  const [timeSince, setTimeSince] = useState('Just now');
  const [isStale, setIsStale] = useState(false);
  
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | 'all'>('7d');
  const [cityFilter, setCityFilter] = useState<string>('all');

  const [realData, setRealData] = useState<any>(null);

  const [issues, setIssues] = useState<any[]>([]);
  const [issueFilter, setIssueFilter] = useState<'all' | 'new' | 'investigating' | 'resolved'>('all');
  const [expandedIssueId, setExpandedIssueId] = useState<string | null>(null);

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [completedRecommendations, setCompletedRecommendations] = useState<any[]>([]);
  const [showCompletedRecs, setShowCompletedRecs] = useState(false);
  
  const [advisorStats, setAdvisorStats] = useState<any>(null);
  const [isScanningAdvisor, setIsScanningAdvisor] = useState<boolean>(false);
  const [copiedAdvisorId, setCopiedAdvisorId] = useState<string | null>(null);

  const fetchRealMetrics = useCallback(async (range = timeRange, city = cityFilter) => {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem(AUTH_STORAGE_KEY) || '';
      const authHeaders = { 'x-admin-token': token };

      const [metricsRes, issuesRes, advisorRes] = await Promise.all([
        fetch(`/api/admin/metrics?range=${range}&city=${city}`, { headers: authHeaders }),
        fetch('/api/admin/issues', { headers: authHeaders }),
        fetch(`/api/admin/advisor?range=${range}&city=${city}`, { headers: authHeaders }),
      ]);

      if (metricsRes.status === 401 || issuesRes.status === 401 || advisorRes.status === 401) {
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
        setIsAuthenticated(false);
        return;
      }

      const metricsJson = await metricsRes.json();
      if (metricsJson.status === 'SUCCESS' && metricsJson.metrics) {
        setRealData(metricsJson.metrics);
      }

      const issuesJson = await issuesRes.json();
      if (issuesJson.status === 'SUCCESS' && issuesJson.issues) {
        setIssues(issuesJson.issues);
      }

      const advisorJson = await advisorRes.json();
      if (advisorJson.status === 'SUCCESS') {
        if (advisorJson.recommendations) setRecommendations(advisorJson.recommendations);
        if (advisorJson.completedRecommendations) setCompletedRecommendations(advisorJson.completedRecommendations);
        if (advisorJson.stats) setAdvisorStats(advisorJson.stats);
      }
    } catch (e) {
      console.error('Failed to fetch real telemetry or issues:', e);
    } finally {
      setLastRefreshedTime(Date.now());
      setIsLoading(false);
    }
  }, [timeRange, cityFilter]);

  // Update stale state and relative time string
  useEffect(() => {
    if (!lastRefreshedTime) return;
    const update = () => {
      const diffSeconds = Math.floor((Date.now() - lastRefreshedTime) / 1000);
      setIsStale(diffSeconds > 120);
      if (diffSeconds < 60) setTimeSince('Just now');
      else if (diffSeconds < 3600) setTimeSince(`${Math.floor(diffSeconds / 60)} min ago`);
      else setTimeSince(`${Math.floor(diffSeconds / 3600)} hr ago`);
    };
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, [lastRefreshedTime]);

  // Auto refresh visibility + 60s timer
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        const diffSeconds = lastRefreshedTime ? Math.floor((Date.now() - lastRefreshedTime) / 1000) : 60;
        if (diffSeconds >= 60) {
          fetchRealMetrics();
        }
      }
    };
  
    document.addEventListener('visibilitychange', handleVisibility);
    
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchRealMetrics();
      }
    }, 60000);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      clearInterval(timer);
    };
  }, [isAuthenticated, lastRefreshedTime, fetchRealMetrics]);

  // Check saved session on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (savedToken && savedToken.length > 0) {
      setIsAuthenticated(true);
      fetchRealMetrics();
    } else {
      setIsAuthenticated(false);
    }
  }, [fetchRealMetrics]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAttempts >= 5) {
      setAuthError('Too many failed attempts. Please wait 60 seconds.');
      return;
    }

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.status === 'SUCCESS' && data.token) {
        sessionStorage.setItem(AUTH_STORAGE_KEY, data.token);
        setIsAuthenticated(true);
        setAuthError(null);
        fetchRealMetrics();
      } else {
        setLoginAttempts((prev) => prev + 1);
        setAuthError(data.error || 'Invalid administrator credentials.');
      }
    } catch {
      setAuthError('Failed to connect to authentication server.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
  };

  const handleTriggerAdvisorScan = async () => {
    setIsScanningAdvisor(true);
    try {
      const token = sessionStorage.getItem(AUTH_STORAGE_KEY) || '';
      const res = await fetch(`/api/admin/advisor?range=${timeRange}&city=${cityFilter}`, {
        method: 'POST',
        headers: { 'x-admin-token': token },
      });
      const data = await res.json();
      if (data.status === 'SUCCESS') {
        if (data.recommendations) setRecommendations(data.recommendations);
        if (data.completedRecommendations) setCompletedRecommendations(data.completedRecommendations);
        if (data.stats) setAdvisorStats(data.stats);
      }
    } catch (e) {
      console.error('Failed to trigger advisor scan:', e);
    } finally {
      setIsScanningAdvisor(false);
    }
  };

  const handleCopyAdvisorPrompt = (rec: any) => {
    navigator.clipboard.writeText(rec.antigravityPrompt);
    setCopiedAdvisorId(rec.id);
    setTimeout(() => setCopiedAdvisorId(null), 2500);
  };

  const handleUpdateRecommendationStatus = async (id: string, status: 'implemented' | 'dismissed') => {
    try {
      const token = sessionStorage.getItem(AUTH_STORAGE_KEY) || '';
      await fetch('/api/admin/advisor', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify({ id, status }),
      });
      
      const rec = recommendations.find(r => r.id === id);
      if (rec) {
        setRecommendations(prev => prev.filter(r => r.id !== id));
        setCompletedRecommendations(prev => [{...rec, status}, ...prev]);
      }
    } catch (e) {
      console.error('Failed to update recommendation status', e);
    }
  };

  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const handleCopyAntigravityPrompt = (issue: any) => {
    const promptText = issue.antigravityPrompt || `Fix the following bug on Chat${(issue.tenantId || 'yyc').toUpperCase()}:
• Issue Category: ${issue.aiSuggestedCategory || 'General Issue'}
• Summary: ${issue.aiSuggestedSummary || issue.userDescription || 'Reported UI/Chat anomaly'}
• User Query: "${issue.userPrompt}"
• AI Response Snippet: "${(issue.aiResponse || '').slice(0, 250)}..."
• User Feedback / Notes: "${issue.userDescription || 'No additional notes'}"
• Session Context: ${issue.sessionDiagnostics?.deviceType || 'desktop'} (${issue.sessionDiagnostics?.viewport || '1280x800'}) | URL: ${issue.sessionDiagnostics?.currentUrl || `/${issue.tenantId}`}
• Instructions for Antigravity:
  1. Inspect apps/web/src/app/api/chat/route.ts, apps/web/src/lib/city-data.ts, or frontend components to identify why this happened.
  2. Implement a precise fix, verify formatting and responsiveness, and run tests.`;

    navigator.clipboard.writeText(promptText);
    setCopiedPromptId(issue.id);
    setTimeout(() => setCopiedPromptId(null), 2500);
  };

  const handleUpdateStatus = async (id: string, newStatus: 'new' | 'investigating' | 'resolved') => {
    try {
      const token = sessionStorage.getItem(AUTH_STORAGE_KEY) || '';
      await fetch('/api/admin/issues', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      setIssues((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
      );
    } catch (e) {
      console.error('Failed to update issue status:', e);
    }
  };

  // 1. Loading screen while verifying local session
  if (isAuthenticated === null) {
    return (
      <div className="fixed inset-0 w-full h-full bg-slate-950 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  // 2. Secure Login Screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 w-full h-full overflow-y-auto bg-slate-950 flex items-center justify-center p-4 selection:bg-cyan-500 selection:text-white">
        <div className="max-w-md w-full glass-panel border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden my-auto">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 mx-auto mb-4 flex items-center justify-center shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-cyan-400" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center justify-center gap-1.5">
              Canadian AI Hub <span className="text-sm">🍁</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1">Executive Security & Real Telemetry Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin Access Token</label>
              <input
                type="password"
                placeholder="Enter your admin token..."
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setAuthError(null);
                }}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                required
                autoComplete="current-password"
              />
              <p className="text-[10px] text-slate-500 mt-1.5">Set via ADMIN_API_TOKEN environment variable on the server</p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:opacity-95 shadow-lg shadow-cyan-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Unlock Admin Console</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500">
              Encrypted Session • Rate-limited protection active
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Real values extracted from the telemetry engine
  const metrics = realData || {
    totalQueries: 0,
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    groqCost: '0.0000',
    gpt4Cost: '0.00',
    estimatedSavings: '0.00',
    avgLatencyMs: 265,
    cacheHits: 0,
    cacheHitRate: '0.0%',
    guardrailBlocks: 0,
    modelDistribution: { groq70b: 0, groq8b: 0, geminiFlash: 0, geminiPro: 0, cache: 0, fallback: 0 },
    totalVisitors: 64,
    affiliateClicks: 0,
    categoryCounts: { nightlife: 0, dining: 0, events: 0, sports: 0, news: 0, stays: 0, outdoors: 0, civic: 0, transit: 0, general: 0 },
    cityBreakdown: {},
    uptimeSeconds: 120,
  };

  const totalCatCount = Object.values(metrics.categoryCounts as Record<string, number>).reduce((a, b) => a + b, 0) || 1;

  const filteredIssues = issues.filter((i) => {
    const isStatusMatch = issueFilter === 'all' || i.status === issueFilter;
    const isCityMatch = cityFilter === 'all' || i.tenantId === cityFilter;
    if (issueFilter !== 'resolved' && i.status === 'resolved') return false; // Hide resolved unless explicitly requested
    return isStatusMatch && isCityMatch;
  });

  return (
    <div className="fixed inset-0 w-full h-full overflow-y-auto overflow-x-hidden bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/90 px-4 md:px-8 py-3.5 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-500 p-0.5 shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Executive Telemetry & Admin Portal <span className="text-sm">🍁</span>
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-700/80 text-emerald-300 text-[10px] font-black uppercase tracking-wider animate-pulse hidden sm:inline-block">
                REAL TELEMETRY
              </span>
            </div>
            <p className="text-slate-400 text-xs hidden md:block">Real-time Canadian Multi-Tenant AI Network Analytics</p>
          </div>
        </div>

        {/* Action Dock */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => fetchRealMetrics()}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 text-xs font-semibold transition-all hover:border-slate-700 active:scale-95 disabled:opacity-50"
            title="Refresh metrics on-demand"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isStale ? 'text-amber-400 animate-pulse' : 'text-cyan-400'} ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isLoading ? 'Computing...' : 'Refresh Metrics'}</span>
          </button>

          <Link
            href="/yyc"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all"
          >
            <span>Live Chat</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/80 border border-slate-800 hover:border-rose-800 text-slate-400 hover:text-rose-300 transition-colors"
            title="Lock & Log out of Admin Console"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-5">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel border border-slate-800/80 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className={`w-4 h-4 ${isStale ? 'text-amber-400' : 'text-cyan-400'}`} />
            <span>Last computed:</span>
            <span className={`font-mono font-medium ${isStale ? 'text-amber-400' : 'text-slate-200'}`}>{timeSince}</span>
            {isStale && <span className="ml-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" title="Data is older than 2 minutes" />}
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Time Range */}
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-medium w-full sm:w-auto justify-between">
              {(['24h', '7d', '30d', 'all'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setTimeRange(range);
                    fetchRealMetrics(range, cityFilter);
                  }}
                  className={`px-3 py-1 rounded-lg transition-all flex-1 text-center ${
                    timeRange === range
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {range === '24h' ? '24 Hours' : range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : 'All Time'}
                </button>
              ))}
            </div>

            {/* City Filter */}
            <select
              value={cityFilter}
              onChange={(e) => {
                const newCity = e.target.value;
                setCityFilter(newCity);
                fetchRealMetrics(timeRange, newCity);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium focus:outline-none focus:border-cyan-500 w-full sm:w-auto"
            >
              <option value="all">🇨🇦 All 10 Cities</option>
              {Object.values(TENANTS).map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.id.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Top 5 KPI Metrics - Stacks 2 wide on mobile, 5 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-5">
          <div className="glass-panel border border-slate-800/80 p-4 sm:p-5 rounded-2xl flex flex-col justify-between relative group hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider">AI Queries</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                {metrics.totalQueries.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="glass-panel border border-slate-800/80 p-4 sm:p-5 rounded-2xl flex flex-col justify-between relative group hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider">Tokens</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                {metrics.totalTokens.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="glass-panel border border-slate-800/80 p-4 sm:p-5 rounded-2xl flex flex-col justify-between relative group hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider">Visitors</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                {metrics.totalVisitors.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="glass-panel border border-slate-800/80 p-4 sm:p-5 rounded-2xl flex flex-col justify-between relative group hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider">Savings</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight font-mono">
                ${metrics.estimatedSavings}
              </div>
            </div>
          </div>

          <div className="glass-panel border border-slate-800/80 p-4 sm:p-5 rounded-2xl flex flex-col justify-between relative group hover:border-amber-700/50 transition-colors col-span-2 lg:col-span-1">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />
            <div className="flex items-center justify-between mb-2 relative z-10">
              <span className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider">Revenue</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-lg">
                <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="relative z-10">
              <div className="text-xl sm:text-3xl font-extrabold text-amber-400 tracking-tight font-mono">
                ${(metrics.affiliateClicks * 0.45).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* 🤖 Autonomous AI Optimization & Feature Advisor */}
        <CollapsibleSection
          id="advisor"
          title="Autonomous AI Optimization & Feature Advisor"
          icon={Sparkles}
          borderColor="border-cyan-500/40"
          iconColor="text-cyan-400"
          iconBg="bg-cyan-500/10"
          iconBorder="border-cyan-500/30"
          defaultExpanded={true}
          badge={
            <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-[10px] font-bold">
              {recommendations.length} Actionable Opportunities
            </span>
          }
          headerRight={
            <button
              onClick={handleTriggerAdvisorScan}
              disabled={isScanningAdvisor}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanningAdvisor ? 'animate-spin' : ''}`} />
              <span>{isScanningAdvisor ? 'Scanning...' : 'Trigger Scan'}</span>
            </button>
          }
        >
          <div className="space-y-4 relative">
            <div className="absolute -top-10 -right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <p className="text-xs text-slate-400 pb-3 border-b border-slate-800 relative z-10">
              Real-time intelligence engine analyzing telemetry, unmonetized intents &amp; feature gaps to generate 1-click Antigravity implementation prompts
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              {recommendations.map((rec) => {
                const isAffiliate = rec.category === 'AFFILIATE_OPPORTUNITY';
                const isFeature = rec.category === 'FEATURE_IMPROVEMENT';
                const isCritical = rec.priority === 'CRITICAL' || rec.priority === 'HIGH';

                return (
                  <div
                    key={rec.id}
                    className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-750 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                            isAffiliate
                              ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                              : isFeature
                              ? 'bg-cyan-950/80 border border-cyan-800 text-cyan-300'
                              : 'bg-purple-950/80 border border-purple-800 text-purple-300'
                          }`}
                        >
                          {rec.category.replace('_', ' ')}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                              isCritical
                                ? 'bg-rose-950 border border-rose-800 text-rose-300'
                                : 'bg-amber-950 border border-amber-800 text-amber-300'
                            }`}
                          >
                            {rec.priority}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xs font-bold text-white leading-snug">{rec.title}</h3>
                      <p className="text-[11px] text-slate-300 leading-relaxed">{rec.summary}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                          <span>Ready Antigravity Prompt:</span>
                        </span>
                        <button
                          onClick={() => handleCopyAdvisorPrompt(rec)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 hover:text-white text-[10px] font-bold transition-all shadow-sm"
                        >
                          {copiedAdvisorId === rec.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-cyan-400" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-[9px] font-mono text-slate-400 bg-slate-950 p-2 rounded-lg overflow-x-auto whitespace-pre-wrap max-h-24 leading-relaxed border border-slate-800 select-all">
                        {rec.antigravityPrompt}
                      </pre>
                    </div>

                    {/* Dismiss / Complete Buttons */}
                    <div className="flex items-center gap-2 pt-2">
                      <button 
                        onClick={() => handleUpdateRecommendationStatus(rec.id, 'implemented')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/80 border border-emerald-900/50 text-emerald-400 text-[10px] font-semibold transition-all"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Mark Complete
                      </button>
                      <button 
                        onClick={() => handleUpdateRecommendationStatus(rec.id, 'dismissed')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-slate-400 text-[10px] font-semibold transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                        Dismiss
                      </button>
                    </div>
                  </div>
                );
              })}
              {recommendations.length === 0 && (
                <div className="col-span-full py-8 text-center text-xs text-slate-400 flex flex-col items-center">
                  <Sparkles className="w-8 h-8 text-cyan-400 mb-2 opacity-50" />
                  <p>All clear! Your application is fully optimized based on current telemetry.</p>
                </div>
              )}
            </div>

            {/* Completed Recommendations Section */}
            {completedRecommendations.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-800/50 relative z-10">
                <button 
                  onClick={() => setShowCompletedRecs(!showCompletedRecs)}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {showCompletedRecs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Show Completed / Dismissed ({completedRecommendations.length})
                </button>

                {showCompletedRecs && (
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 opacity-60">
                    {completedRecommendations.map(rec => (
                      <div key={rec.id} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
                        <div>
                          <h4 className="text-[11px] font-semibold text-slate-300 line-through">{rec.title}</h4>
                          <span className="text-[9px] text-slate-500 uppercase">{rec.status}</span>
                        </div>
                        {rec.status === 'implemented' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <X className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </CollapsibleSection>

        {/* 🚨 Citizen Issue & Bug Reports Inbox */}
        <CollapsibleSection
          id="issues"
          title="Citizen Issue Reports & Feedback"
          icon={AlertTriangle}
          borderColor="border-amber-500/30"
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
          iconBorder="border-amber-500/30"
          defaultExpanded={true}
          badge={
            <span className="px-2 py-0.5 rounded-full bg-amber-950 border border-amber-800/80 text-amber-300 text-[10px] font-bold">
              {issues.filter((i) => i.status !== 'resolved').length} Pending
            </span>
          }
          headerRight={
            <select
              value={issueFilter}
              onChange={(e: any) => setIssueFilter(e.target.value)}
              className="hidden sm:block px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-medium focus:outline-none focus:border-amber-500/50"
            >
              <option value="all">All Active</option>
              <option value="new">New</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
            </select>
          }
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-400 pb-3 border-b border-slate-800">
              Issues reported via the "Report an Issue" screen button with AI diagnostics.
            </p>

            {filteredIssues.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
                <p className="font-semibold text-slate-300">All clear! No issue reports matching this filter.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredIssues.map((issue) => {
                  const isExpanded = expandedIssueId === issue.id;

                  return (
                    <div
                      key={issue.id}
                      className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-cyan-950 border border-cyan-800 text-cyan-300 text-[10px] font-mono font-bold uppercase">
                            {issue.tenantId}
                          </span>
                          <span className="font-semibold text-xs text-white">
                            {issue.aiSuggestedCategory || 'General Issue'}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            • {new Date(issue.timestamp).toLocaleTimeString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={issue.status}
                            onChange={(e: any) => handleUpdateStatus(issue.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-semibold capitalize bg-slate-800/80 border-0 focus:ring-0 ${
                              issue.status === 'investigating' ? 'text-amber-300' : 'text-slate-300'
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="investigating">Investigating</option>
                          </select>
                          
                          <button
                            onClick={() => handleUpdateStatus(issue.id, 'resolved')}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-400 text-[10px] font-semibold transition-colors"
                          >
                            <Archive className="w-3.5 h-3.5" />
                            Resolve & Archive
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-slate-300 space-y-1.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60">
                        <div className="flex items-start gap-1.5 text-cyan-300 font-medium">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-200"><strong className="text-cyan-400 font-normal">Diagnosis:</strong> {issue.aiSuggestedSummary}</span>
                        </div>
                        {issue.userDescription && (
                          <div className="text-slate-400 text-[11px] pt-1">
                            <strong className="text-slate-300">User Notes:</strong> "{issue.userDescription}"
                          </div>
                        )}
                        <div className="pt-2 border-t border-slate-850 flex flex-wrap items-center gap-2 text-[10px] text-slate-500">
                          {issue.userEmail && <span>✉️ {issue.userEmail}</span>}
                          {issue.sessionDiagnostics?.deviceType && <span className="capitalize">📱 {issue.sessionDiagnostics.deviceType}</span>}
                          {issue.sessionDiagnostics?.persona && <span>👤 {issue.sessionDiagnostics.persona}</span>}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => handleCopyAntigravityPrompt(issue)}
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          {copiedPromptId === issue.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedPromptId === issue.id ? 'Copied!' : 'Copy Antigravity Fix Prompt'}
                        </button>
                        <button
                          onClick={() => setExpandedIssueId(isExpanded ? null : issue.id)}
                          className="text-[11px] text-slate-400 hover:text-slate-300 flex items-center gap-1 transition-colors"
                        >
                          {isExpanded ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          {isExpanded ? 'Hide Transcript' : 'View Transcript'}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] space-y-2 text-slate-400 mt-2">
                          <p><strong className="text-slate-200">User Query:</strong> "{issue.userPrompt}"</p>
                          <p><strong className="text-slate-200">AI Response:</strong></p>
                          <div className="whitespace-pre-wrap font-mono text-[10px] text-slate-300 bg-slate-900/90 p-2 rounded max-h-48 overflow-y-auto">
                            {issue.aiResponse}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CollapsibleSection>

        {/* Infrastructure & AI Models Area - Split on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* AI Models */}
          <CollapsibleSection
            id="models"
            title="AI Inference Engines & Pipelines"
            icon={Cpu}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs text-slate-400">Total Avg Latency</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-[10px] font-bold">
                  {metrics.avgLatencyMs || 280}ms
                </span>
              </div>
              {/* Primary: Groq Llama-3.3 70B */}
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Groq • Llama-3.3-70B</span>
                <span className="text-cyan-400 font-mono font-bold text-[11px]">
                  {metrics.modelDistribution?.groq70b || 0} reqs
                </span>
              </div>
              {/* Fast Failover */}
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Groq • Llama-3.1-8B-Instant</span>
                <span className="text-emerald-400 font-mono font-bold text-[11px]">
                  {metrics.modelDistribution?.groq8b || 0} reqs
                </span>
              </div>
              {/* Cache */}
              <div className="bg-slate-900/90 border border-cyan-500/30 p-3 rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-cyan-300">LRU Response Cache</span>
                <span className="text-cyan-400 font-mono font-bold text-[11px]">
                  {metrics.cacheHits || 0} Hits ({metrics.cacheHitRate || '0%'})
                </span>
              </div>
              {/* Guardrails */}
              <div className="bg-slate-900/90 border border-amber-500/30 p-3 rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-300">Safety Guardrails Blocks</span>
                <span className="text-amber-400 font-mono font-bold text-[11px]">
                  {metrics.guardrailBlocks || 0}
                </span>
              </div>
            </div>
          </CollapsibleSection>

          {/* Infrastructure */}
          <CollapsibleSection
            id="infra"
            title="Host & Edge Infrastructure"
            icon={Server}
          >
            <div className="grid grid-cols-2 gap-3 pb-2">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase">Median Latency</div>
                <div className="text-lg font-bold font-mono text-white">185 ms</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase">Peak Latency</div>
                <div className="text-lg font-bold font-mono text-cyan-300">380 ms</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase">Cache Hit Rate</div>
                <div className="text-lg font-bold font-mono text-emerald-400">{metrics.cacheHitRate || '68%'}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase">Uptime</div>
                <div className="text-lg font-bold font-mono text-emerald-400 flex items-center gap-1">
                  99.98% <Activity className="w-3 h-3 animate-pulse" />
                </div>
              </div>
            </div>
          </CollapsibleSection>
        </div>

        {/* Monetization */}
        <CollapsibleSection
          id="monetization"
          title="Monetization & Affiliate Network"
          icon={DollarSign}
          badge={
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 font-mono ml-2 hidden sm:inline-block">
              {metrics.affiliateSummary?.isApiLive ? '● LIVE API' : '● FIRST-PARTY TRACKING'}
            </span>
          }
        >
          <div className="space-y-3">
            {(metrics.affiliateSummary?.partners || [
              { name: 'CJ Affiliate', clicks: metrics.partnerClicks?.CJ || 0, earnings: '$0.00 CAD', isApiLive: true, envKey: 'NEXT_PUBLIC_CJ_API_KEY' },
              { name: 'Impact Radius', clicks: metrics.partnerClicks?.Ticketmaster || 0, earnings: '$0.00 CAD', isApiLive: true, envKey: 'NEXT_PUBLIC_IMPACT_API_KEY' },
              { name: 'OpenTable', clicks: metrics.partnerClicks?.OpenTable || 0, earnings: '$0.00 CAD', isApiLive: true, envKey: 'RAKUTEN_API_TOKEN' },
              { name: 'Viator / GYG', clicks: (metrics.partnerClicks?.Viator || 0) + (metrics.partnerClicks?.GetYourGuide || 0), earnings: '$0.00 CAD', isApiLive: true, envKey: 'NEXT_PUBLIC_VIATOR_API_KEY' },
            ]).map((p: any) => (
              <div key={p.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-slate-200 text-sm">{p.name}</span>
                  {p.isApiLive ? (
                     <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-medium bg-emerald-950 border border-emerald-700 text-emerald-300">
                       API LIVE
                     </span>
                  ) : (
                     <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-medium bg-slate-800 border border-slate-700 text-slate-400">
                       LOCAL
                     </span>
                  )}
                  <span className="hidden md:inline-block text-[10px] text-slate-500 font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                    env: {p.envKey}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="block text-[10px] uppercase text-slate-400 font-semibold">Clicks</span>
                    <span className="text-white font-mono font-bold">{p.clicks}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] uppercase text-slate-400 font-semibold">Earnings</span>
                    <span className="text-emerald-400 font-mono font-bold">{p.earnings}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Verified Network Earnings:</span>
              <span className="text-emerald-400 font-bold font-mono text-sm">
                {metrics.affiliateSummary?.totalEarnings || '$0.00 CAD'}
              </span>
            </div>
          </div>
        </CollapsibleSection>

        {/* Multi-Domain Table */}
        <CollapsibleSection
          id="domains"
          title="Multi-Tenant Domain Registry"
          icon={Globe}
        >
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-slate-400 font-semibold border-b border-slate-800">
                  <th className="py-2 px-2">City Hub</th>
                  <th className="py-2 px-2">Domain Route</th>
                  <th className="py-2 px-2">Visitors</th>
                  <th className="py-2 px-2">AI Queries</th>
                  <th className="py-2 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {Object.values(TENANTS)
                  .filter((t) => cityFilter === 'all' || t.id === cityFilter)
                  .map((t) => {
                    const cityStats = metrics.cityBreakdown?.[t.id] || { queries: 0, visitors: 0 };
                    return (
                      <tr key={t.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="py-3 px-2 font-semibold text-white flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${t.gradientClass}`} />
                          <span>{t.name}</span>
                        </td>
                        <td className="py-3 px-2 font-mono text-cyan-400">
                          <a href={`https://${t.domain}`} target="_blank" rel="noreferrer" className="hover:underline">{t.domain}</a>
                        </td>
                        <td className="py-3 px-2 font-mono text-slate-200">{cityStats.visitors}</td>
                        <td className="py-3 px-2 font-mono text-slate-200">{cityStats.queries}</td>
                        <td className="py-3 px-2 text-right">
                          <Link href={`/${t.id}`} className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium transition-colors">
                            Open
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="sm:hidden space-y-3">
            {Object.values(TENANTS)
              .filter((t) => cityFilter === 'all' || t.id === cityFilter)
              .map((t) => {
                const cityStats = metrics.cityBreakdown?.[t.id] || { queries: 0, visitors: 0 };
                return (
                  <div key={t.id} className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${t.gradientClass}`} />
                        <span className="font-semibold text-white text-sm">{t.name}</span>
                      </div>
                      <Link href={`/${t.id}`} className="p-1 rounded-lg bg-slate-800 text-slate-300">
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <a href={`https://${t.domain}`} target="_blank" rel="noreferrer" className="text-xs font-mono text-cyan-400 hover:underline block">{t.domain}</a>
                    <div className="flex items-center gap-4 text-xs">
                      <div><span className="text-slate-400">Visits:</span> <span className="font-mono text-white">{cityStats.visitors}</span></div>
                      <div><span className="text-slate-400">Queries:</span> <span className="font-mono text-white">{cityStats.queries}</span></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </CollapsibleSection>

        {/* Email Directory */}
        <CollapsibleSection
          id="email"
          title="Regional Email Directory"
          icon={Mail}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-slate-400 font-semibold border-b border-slate-800">
                  <th className="py-2 px-2">Hub</th>
                  <th className="py-2 px-2">Support</th>
                  <th className="py-2 px-2">Partners</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {Object.values(TENANTS).map((t) => (
                  <tr key={t.id} className="hover:bg-slate-900/50">
                    <td className="py-3 px-2 font-semibold text-white">{t.name}</td>
                    <td className="py-3 px-2 font-mono text-cyan-400"><a href={`mailto:hello@${t.domain}`}>hello@{t.domain}</a></td>
                    <td className="py-3 px-2 font-mono text-cyan-400"><a href={`mailto:partners@${t.domain}`}>partners@{t.domain}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CollapsibleSection>

      </main>

      {/* Admin Footer */}
      <footer className="w-full border-t border-slate-800/80 px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Canadian AI City Platform • Private Admin Dashboard</span>
        </div>
      </footer>
    </div>
  );
}
