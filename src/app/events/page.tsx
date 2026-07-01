import { db } from '@/db';
import { events } from '@/db/schema';
import { eq, desc, gte, lt, and } from 'drizzle-orm';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate, formatTime } from '@/lib/utils';
import EventTypeTag from '@/components/ui/EventTypeTag';
import TicketBadge from '@/components/ui/TicketBadge';
import EventsFilter from './EventsFilter';

export const metadata = {
  title: 'Upcoming D&B & Techno Events Brisbane | Karma Club',
  description: 'Find upcoming Karma Club events in Brisbane — Open Deck nights, D&B pop-ups, and headline underground shows. Free and ticketed events.',
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const filter = searchParams.filter ?? 'upcoming';
  const now = new Date();

  const allEvents = await Promise.resolve()
    .then(() => db.select().from(events)
      .where(eq(events.published, true))
      .orderBy(desc(events.date)))
    .catch(() => []);

  const upcoming = allEvents.filter((e) => new Date(e.date) >= now);
  const past = allEvents.filter((e) => new Date(e.date) < now);

  const displayed =
    filter === 'past' ? past : filter === 'upcoming' ? upcoming : allEvents;

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="px-6 pb-12 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="section-heading font-display font-bold text-5xl md:text-7xl uppercase tracking-tight text-white pb-2 mb-4">
            Events
          </h1>
          <p className="text-text-secondary font-mono text-sm max-w-xl">
            Open decks, pop-ups, headline shows — underground, community-first events across Brisbane.
          </p>
        </div>
      </section>

      {/* Filter */}
      <EventsFilter active={filter} />

      {/* Grid */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {displayed.length === 0 ? (
            <div className="border border-border py-20 text-center">
              <p className="font-mono text-text-secondary text-sm">
                {filter === 'upcoming' ? 'No upcoming events right now. Check back soon.' : 'No events found.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {displayed.map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function EventRow({ event }: { event: any }) {
  const isPast = new Date(event.date) < new Date();
  return (
    <Link
      href={`/events/${event.slug}`}
      className={`bg-background hover:bg-card transition-colors duration-200 flex gap-6 p-6 group fade-in-up ${isPast ? 'opacity-60' : ''}`}
    >
      {/* Image */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 bg-card overflow-hidden">
        {event.coverImage ? (
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 96px, 128px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-card">
            <span className="font-display font-bold text-2xl text-border">K</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-xs text-text-secondary uppercase">
            {formatDate(event.date)} &middot; {formatTime(event.date)}
          </span>
          <EventTypeTag type={event.eventType} />
        </div>
        <h2 className="font-display font-bold text-xl uppercase text-white leading-tight truncate">
          {event.title}
        </h2>
        <p className="font-mono text-xs text-text-secondary mt-1">
          {event.venue}, {event.suburb}
        </p>
        {event.shortDescription && (
          <p className="text-text-secondary text-sm mt-2 line-clamp-2">
            {event.shortDescription}
          </p>
        )}
        <div className="flex items-center gap-3 mt-3">
          <TicketBadge status={event.ticketStatus} />
        </div>
      </div>
    </Link>
  );
}
