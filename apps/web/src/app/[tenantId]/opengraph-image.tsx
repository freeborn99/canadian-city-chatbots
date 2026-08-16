import { ImageResponse } from 'next/og';
import { getTenantById } from '@/lib/tenants';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Canadian City Chatbots - Real-Time Local Intelligence';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ tenantId: string }> }) {
  const { tenantId } = await params;
  const tenant = getTenantById(tenantId);

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #020617, #0f172a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background glow orb */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background: tenant.accentHex,
            filter: 'blur(150px)',
            opacity: 0.25,
            borderRadius: '50%',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: tenant.accentHex,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
          </div>
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 800,
              color: 'white',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Chat{tenant.id.toUpperCase()}
          </h1>
        </div>

        <h2
          style={{
            fontSize: '72px',
            fontWeight: 900,
            color: 'white',
            lineHeight: 1.1,
            marginBottom: '24px',
            maxWidth: '900px',
            letterSpacing: '-0.03em',
          }}
        >
          {tenant.tagline}
        </h2>

        <p
          style={{
            fontSize: '32px',
            color: '#94a3b8',
            lineHeight: 1.4,
            maxWidth: '850px',
            margin: 0,
            marginBottom: '60px',
          }}
        >
          {tenant.description}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '16px 32px',
              borderRadius: '100px',
              color: 'white',
              fontSize: '24px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Ask AI
          </div>
          <div
            style={{
              color: tenant.accentHex,
              fontSize: '24px',
              fontWeight: 600,
            }}
          >
            {tenant.domain}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
