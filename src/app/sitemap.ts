import type { MetadataRoute } from 'next';
import { db } from '@/db';
import { events, products } from '@/db/schema';
import { eq } from 'drizzle-orm';

const baseUrl = 'https://karmaklub.netlify.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/events`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/shop`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${baseUrl}/gallery`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`,       lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${baseUrl}/contact`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
  ];

  const eventRows = await Promise.resolve()
    .then(() =>
      db.select({ slug: events.slug, createdAt: events.createdAt })
        .from(events)
        .where(eq(events.published, true))
    )
    .catch(() => []);

  const productRows = await Promise.resolve()
    .then(() =>
      db.select({ slug: products.slug, createdAt: products.createdAt })
        .from(products)
        .where(eq(products.published, true))
    )
    .catch(() => []);

  const eventRoutes: MetadataRoute.Sitemap = eventRows.map((e) => ({
    url: `${baseUrl}/events/${e.slug}`,
    lastModified: e.createdAt ?? new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = productRows.map((p) => ({
    url: `${baseUrl}/shop/${p.slug}`,
    lastModified: p.createdAt ?? new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...eventRoutes, ...productRoutes];
}
