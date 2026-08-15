import { headers } from 'next/headers';
import { getTenantByHost, getTenantById } from '@/lib/tenants';
import { ChatContainer } from '@/components/chat/chat-container';

export default async function RootPage() {
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const tenantHeader = headersList.get('x-tenant-id');

  const tenant = tenantHeader ? getTenantById(tenantHeader) : getTenantByHost(host);

  return <ChatContainer initialTenantId={tenant.id} />;
}
