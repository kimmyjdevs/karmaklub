import type { Metadata } from 'next';
import { db } from '@/db';
import { events, products } from '@/db/schema';

export const metadata: Metadata = {
  title: 'Karma Club — Drum & Bass + Techno Events Brisbane',
  description:
    "Karma Club is Brisbane's underground Drum & Bass and Techno events community. Open deck nights, pop-up events, and limited merch drops. Est. 2018.",
};
import { desc, eq, gte, and } from 'drizzle-orm';
import HeroSection from '@/components/home/HeroSection';
import PhotoMarquee from '@/components/home/PhotoMarquee';
import MissionStrip from '@/components/home/MissionStrip';
import EventsPreview from '@/components/home/EventsPreview';
import MerchPreview from '@/components/home/MerchPreview';
import CommunityStrip from '@/components/home/CommunityStrip';

export default async function HomePage() {
  const upcomingEvents = await Promise.resolve()
    .then(() => db.select().from(events)
      .where(and(eq(events.published, true), gte(events.date, new Date())))
      .orderBy(events.date)
      .limit(3))
    .catch(() => []);

  const featuredProducts = await Promise.resolve()
    .then(() => db.select().from(products)
      .where(and(eq(products.published, true), eq(products.isFeatured, true)))
      .orderBy(desc(products.createdAt))
      .limit(4))
    .catch(() => []);

  return (
    <>
      <HeroSection />
      <PhotoMarquee />
      <MissionStrip />
      <EventsPreview events={upcomingEvents} />
      <MerchPreview products={featuredProducts} />
      <CommunityStrip />
    </>
  );
}
