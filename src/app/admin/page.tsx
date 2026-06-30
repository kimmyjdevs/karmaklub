import { db } from '@/db';
import { events, products, gallery, orders } from '@/db/schema';
import { count } from 'drizzle-orm';
import Link from 'next/link';

export default async function AdminDashboard() {
  const [[eventCount], [productCount], [galleryCount], [orderCount]] =
    await Promise.all([
      db.select({ count: count() }).from(events).catch(() => [{ count: 0 }]),
      db.select({ count: count() }).from(products).catch(() => [{ count: 0 }]),
      db.select({ count: count() }).from(gallery).catch(() => [{ count: 0 }]),
      db.select({ count: count() }).from(orders).catch(() => [{ count: 0 }]),
    ]);

  const stats = [
    { label: 'Events', count: eventCount?.count ?? 0, href: '/admin/events' },
    { label: 'Products', count: productCount?.count ?? 0, href: '/admin/products' },
    { label: 'Gallery Photos', count: galleryCount?.count ?? 0, href: '/admin/gallery' },
    { label: 'Orders', count: orderCount?.count ?? 0, href: '#' },
  ];

  return (
    <div className="p-8">
      <h1 className="font-display font-bold text-3xl uppercase tracking-widest text-white mb-8">
        Dashboard
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-card border border-border p-6 hover:border-white transition-colors"
          >
            <p className="font-display font-bold text-3xl text-white mb-1">
              {s.count}
            </p>
            <p className="font-mono text-xs text-text-secondary uppercase tracking-widest">
              {s.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
