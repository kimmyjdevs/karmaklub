import { db } from '@/db';
import { events } from '@/db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import DeleteEventButton from './DeleteEventButton';

export default async function AdminEventsPage() {
  const allEvents = await db
    .select()
    .from(events)
    .orderBy(desc(events.date))
    .catch(() => []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-bold text-3xl uppercase tracking-widest text-white">
          Events
        </h1>
        <Link href="/admin/events/new" className="btn-primary text-sm">
          + Add Event
        </Link>
      </div>

      <div className="border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left font-mono text-xs uppercase tracking-widest text-text-secondary px-4 py-3">
                Event
              </th>
              <th className="text-left font-mono text-xs uppercase tracking-widest text-text-secondary px-4 py-3 hidden md:table-cell">
                Date
              </th>
              <th className="text-left font-mono text-xs uppercase tracking-widest text-text-secondary px-4 py-3 hidden md:table-cell">
                Status
              </th>
              <th className="text-left font-mono text-xs uppercase tracking-widest text-text-secondary px-4 py-3 hidden md:table-cell">
                Tickets
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {allEvents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-mono text-sm text-text-secondary">
                  No events yet.{' '}
                  <Link href="/admin/events/new" className="text-white underline">
                    Add one
                  </Link>
                </td>
              </tr>
            ) : (
              allEvents.map((event) => (
                <tr key={event.id} className="border-b border-border hover:bg-card transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-display font-bold text-sm text-white">{event.title}</p>
                    <p className="font-mono text-xs text-text-secondary">{event.venue}, {event.suburb}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell font-mono text-xs text-text-secondary">
                    {formatDate(event.date)}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`font-mono text-[10px] uppercase tracking-widest border px-2 py-0.5 ${event.published ? 'border-white text-white' : 'border-border text-text-secondary'}`}>
                      {event.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell font-mono text-xs text-text-secondary">
                    {event.ticketStatus}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/admin/events/${event.id}/edit`}
                        className="font-mono text-xs text-text-secondary hover:text-white transition-colors"
                      >
                        Edit
                      </Link>
                      <DeleteEventButton id={event.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
