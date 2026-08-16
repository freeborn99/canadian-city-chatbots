import { MetadataRoute } from 'next';
import { TENANTS } from '@/lib/tenants';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = Object.values(TENANTS).map((tenant) => ({
    url: `https://${tenant.domain}`,
    lastModified: new Date(),
    changeFrequency: 'always',
    priority: 1.0,
  }));

  // Add the central admin portal
  routes.push({
    url: `https://${TENANTS.yyc.domain}/admin`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  });

  return routes;
}
