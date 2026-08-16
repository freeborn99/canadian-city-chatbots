import { Metadata } from 'next';
import { getTenantById } from '@/lib/tenants';
import { ChatContainer } from '@/components/chat/chat-container';

interface TenantPageProps {
  params: Promise<{
    tenantId: string;
  }>;
}

export async function generateMetadata({ params }: TenantPageProps): Promise<Metadata> {
  const { tenantId } = await params;
  const tenant = getTenantById(tenantId);

  return {
    title: `Chat${tenant.id.toUpperCase()} - ${tenant.name}, ${tenant.province} AI Assistant`,
    description: `Real-time AI concierge for ${tenant.name}, Canada. Ask about local events, municipal news, restaurants, transit, and weather.`,
    openGraph: {
      title: `Chat${tenant.id.toUpperCase()} • ${tenant.name}`,
      description: tenant.tagline,
      siteName: `Chat${tenant.id.toUpperCase()}`,
      url: `https://${tenant.domain}`,
      type: 'website',
      locale: 'en_CA',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Chat${tenant.id.toUpperCase()} • ${tenant.name}`,
      description: tenant.tagline,
    },
  };
}

export default async function TenantPage({ params }: TenantPageProps) {
  const { tenantId } = await params;
  const validTenant = getTenantById(tenantId);

  return <ChatContainer initialTenantId={validTenant.id} />;
}
