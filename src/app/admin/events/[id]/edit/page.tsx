import { db } from '@/db';
import { events } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import EventForm from '../../EventForm';

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const [event] = await db
    .select()
    .from(events)
    .where(eq(events.id, Number(params.id)))
    .limit(1)
    .catch(() => []);

  if (!event) notFound();

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-display font-bold text-3xl uppercase tracking-widest text-white mb-8">
        Edit Event
      </h1>
      <EventForm event={event} />
    </div>
  );
}
