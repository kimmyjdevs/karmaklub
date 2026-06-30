import { db } from '@/db';
import { events } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatDate, formatTime } from '@/lib/utils';
import EventTypeTag from '@/components/ui/EventTypeTag';
import TicketBadge from '@/components/ui/TicketBadge';
import ShareButtons from '@/components/ui/ShareButtons';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [event] = await db
    .select()
    .from(events)
    .where(eq(events.slug, params.slug))
    .limit(1)
    .catch(() => []);

  if (!event) return { title: 'Event Not Found' };

  return {
    title: event.title,
    description: event.shortDescription ?? undefined,
    openGraph: {
      title: event.title,
      description: event.shortDescription ?? undefined,
      images: event.coverImage ? [event.coverImage] : [],
    },
  };
}

export default async function EventPage({ params }: Props) {
  const [event] = await db
    .select()
    .from(events)
    .where(eq(events.slug, params.slug))
    .limit(1)
    .catch(() => []);

  if (!event || !event.published) notFound();

  const lineup = (event.lineup as string[]) ?? [];

  return (
    <div className="pt-16">
      {/* Hero image */}
      <div className="relative h-[50vh] md:h-[60vh] bg-card">
        {event.coverImage ? (
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-card">
            <span className="font-display font-bold text-8xl text-border">K</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        {/* Header info */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs text-text-secondary uppercase tracking-widest">
              {formatDate(event.date)} &middot; {formatTime(event.date)}
            </span>
            <EventTypeTag type={event.eventType} />
            <TicketBadge status={event.ticketStatus} />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl uppercase text-white leading-none mb-4">
            {event.title}
          </h1>
          <p className="font-mono text-sm text-text-secondary">
            {event.venue}, {event.suburb}
          </p>
        </div>

        {/* Description */}
        {event.longDescription && (
          <div className="prose-invert mb-12">
            <p className="text-text-secondary leading-relaxed whitespace-pre-line">
              {event.longDescription}
            </p>
          </div>
        )}

        {/* Lineup */}
        {lineup.length > 0 && (
          <section className="mb-12 border-t border-border pt-8">
            <h2 className="font-display font-bold text-xl uppercase tracking-widest text-white mb-6">
              Lineup
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lineup.map((dj, i) => (
                <li key={i} className="flex items-center gap-3 font-mono text-sm text-text-secondary">
                  <span className="text-border font-bold">·</span>
                  {dj}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Ticketing */}
        <section className="mb-12 border-t border-border pt-8">
          <h2 className="font-display font-bold text-xl uppercase tracking-widest text-white mb-6">
            Get Your Tickets
          </h2>
          {event.yourKindUrl ? (
            <div className="border border-border overflow-hidden">
              <iframe
                src={event.yourKindUrl}
                className="w-full"
                style={{ minHeight: '600px', border: 'none' }}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                title={`Tickets for ${event.title}`}
              />
            </div>
          ) : event.ticketStatus === 'FREE' ? (
            <div className="border border-border py-10 text-center">
              <p className="font-display font-bold text-2xl text-white uppercase tracking-widest mb-2">
                Free Entry
              </p>
              <p className="font-mono text-sm text-text-secondary">
                No tickets required — just show up.
              </p>
            </div>
          ) : (
            <div className="border border-border py-10 text-center">
              <p className="font-mono text-sm text-text-secondary">
                Tickets coming soon.
              </p>
            </div>
          )}
        </section>

        {/* Share */}
        <section className="mb-16 border-t border-border pt-8">
          <ShareButtons title={event.title} />
        </section>
      </div>
    </div>
  );
}
