import { DEFAULT_TENANT_ID } from '@/lib/tenants';
import { ChatContainer } from '@/components/chat/chat-container';

export default function RootPage() {
  return <ChatContainer initialTenantId={DEFAULT_TENANT_ID} />;
}
