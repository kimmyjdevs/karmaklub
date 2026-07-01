import { db } from '@/db';
import { gallery } from '@/db/schema';
import { desc } from 'drizzle-orm';
import GalleryGrid from './GalleryGrid';
import StaticGalleryGrid from './StaticGalleryGrid';

export const metadata = {
  title: 'Event Photos | Karma Club Underground Events Brisbane',
  description: "Photos from Karma Club's underground events in Brisbane — Drum & Bass, Techno, and open deck nights since 2018.",
};

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: { event?: string };
}) {
  const photos = await Promise.resolve()
    .then(() => db.select().from(gallery).orderBy(desc(gallery.createdAt)))
    .catch(() => []);

  const events = Array.from(
    new Set(photos.map((p) => p.eventTag).filter(Boolean))
  ) as string[];

  const filtered = searchParams.event
    ? photos.filter((p) => p.eventTag === searchParams.event)
    : photos;

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="px-6 pb-12 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="section-heading font-display font-bold text-5xl md:text-7xl uppercase tracking-tight text-white pb-2 mb-4">
            Gallery
          </h1>
          <p className="text-text-secondary font-mono text-sm">
            Moments from the underground.
          </p>
        </div>
      </section>

      {/* Filter */}
      {events.length > 0 && (
        <div className="px-6 py-4 border-b border-border overflow-x-auto">
          <div className="max-w-7xl mx-auto flex gap-2 min-w-max">
            <a
              href="/gallery"
              className={`font-mono text-xs uppercase tracking-widest px-4 py-2 transition-colors whitespace-nowrap ${
                !searchParams.event
                  ? 'bg-white text-black'
                  : 'text-text-secondary hover:text-white border border-transparent hover:border-border'
              }`}
            >
              All
            </a>
            {events.map((tag) => (
              <a
                key={tag}
                href={`/gallery?event=${encodeURIComponent(tag)}`}
                className={`font-mono text-xs uppercase tracking-widest px-4 py-2 transition-colors whitespace-nowrap ${
                  searchParams.event === tag
                    ? 'bg-white text-black'
                    : 'text-text-secondary hover:text-white border border-transparent hover:border-border'
                }`}
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Gallery */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <StaticGalleryGrid />
          ) : (
            <GalleryGrid photos={filtered} />
          )}
        </div>
      </section>
    </div>
  );
}
