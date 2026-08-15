import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';

export const metadata: Metadata = {
  title: 'Canadian City AI Portals | Real-Time Local Intelligence',
  description: 'Zero-cost multi-tenant AI chatbot network serving 10 Canadian metropolitan centers with real-time vector RAG and glassmorphism UI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
