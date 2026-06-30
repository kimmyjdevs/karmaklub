import Link from 'next/link';
import type { Event } from '@/db/schema';
import { formatDate, formatTime } from '@/lib/utils';
import EventTypeTag from '@/components/ui/EventTypeTag';
import TicketBadge from '@/components/ui/TicketBadge';

type Props = {
  events: Event[];
};

export default function EventsPreview({ events }: Props) {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <h2 className="section-heading font-display font-bold text-3xl md:text-4xl uppercase tracking-widest text-white pb-2">
            Upcoming Events
          </h2>
          <Link
            href="/events"
            className="font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-white transition-colors hidden sm:block"
          >
            View All →
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="border border-border py-16 text-center">
            <p className="font-mono text-text-secondary text-sm">
              No upcoming events right now. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        <div className="mt-8 sm:hidden text-center">
          <Link href="/events" className="btn-outline">
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="bg-background hover:bg-card transition-colors duration-200 p-6 flex flex-col gap-4 group fade-in-up"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-text-secondary uppercase tracking-widest">
          {formatDate(event.date)}
        </span>
        <EventTypeTag type={event.eventType} />
      </div>

      <h3 className="font-display font-bold text-xl text-white uppercase leading-tight group-hover:text-text-secondary transition-colors">
        {event.title}
      </h3>

      <div className="text-text-secondary font-mono text-xs">
        {event.venue}, {event.suburb} &middot; {formatTime(event.date)}
      </div>

      {event.shortDescription && (
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
          {event.shortDescription}
        </p>
      )}

      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
        <TicketBadge status={event.ticketStatus} />
        <span className="font-mono text-xs text-text-secondary group-hover:text-white transition-colors">
          View Event →
        </span>
      </div>
    </Link>
  );
}
