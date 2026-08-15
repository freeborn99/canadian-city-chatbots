import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DOMAIN_TO_TENANT_MAP, DEFAULT_TENANT_ID, TENANTS } from './src/lib/tenants';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Bypass static files, images, system routes, and admin portal
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.') || // e.g. favicon.ico, sitemap.xml, images
    pathname.startsWith('/fonts')
  ) {
    return NextResponse.next();
  }

  // 1. Check custom Host header
  const host = request.headers.get('host') || '';
  const cleanHost = host.split(':')[0].replace(/^www\./, '').toLowerCase().trim();

  let tenantId = DEFAULT_TENANT_ID;

  // Check exact domain map (e.g. chatyyc.com -> yyc)
  if (DOMAIN_TO_TENANT_MAP[cleanHost]) {
    tenantId = DOMAIN_TO_TENANT_MAP[cleanHost].id;
  } else {
    // Check if subdomain is a tenant ID (e.g., yvr.localhost:3000 or yul.my-staging-app.vercel.app)
    const subdomain = cleanHost.split('.')[0];
    if (TENANTS[subdomain]) {
      tenantId = subdomain;
    }
  }

  // 2. Allow override via query param for local dev testing (?city=yyc or ?tenant=yyc)
  const cityQuery = url.searchParams.get('city') || url.searchParams.get('tenant');
  if (cityQuery && TENANTS[cityQuery.toLowerCase()]) {
    tenantId = cityQuery.toLowerCase();
  }

  // 3. Create request headers forwarding tenant context
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tenant-id', tenantId);
  requestHeaders.set('x-host', cleanHost);

  // 4. If the path already has a valid tenantId (e.g. /yyc or /yvr), no rewrite needed
  const pathSegment = pathname.split('/')[1]?.toLowerCase();
  if (pathSegment && TENANTS[pathSegment]) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 5. Rewrite internally to dynamic route /[tenantId] preserving browser URL
  const rewriteUrl = new URL(`/${tenantId}${pathname === '/' ? '' : pathname}`, request.url);

  return NextResponse.rewrite(rewriteUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
