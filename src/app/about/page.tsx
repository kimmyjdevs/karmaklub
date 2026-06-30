import { db } from '@/db';
import { events } from '@/db/schema';
import { count } from 'drizzle-orm';

export const metadata = {
  title: 'About',
  description:
    'Karma Club started in 2018 as a grassroots movement to give underground DJs real stage time. Drum & Bass, Techno, Bass Music — community first.',
};

export default async function AboutPage() {
  const [eventCount] = await db
    .select({ count: count() })
    .from(events)
    .catch(() => [{ count: 0 }]);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4">
            Est. 2018
          </p>
          <h1 className="section-heading font-display font-bold text-5xl md:text-7xl uppercase tracking-tight text-white leading-none pb-2">
            About Karma Club
          </h1>
          <p className="mt-8 text-text-secondary text-xl max-w-2xl leading-relaxed">
            Underground. Community. Movement. We&apos;re not a venue, a booking agency, or a promoter chasing big ticket sales. We&apos;re the crew that believes the scene is bigger than the clubs making money off it.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="section-heading font-display font-bold text-2xl uppercase tracking-widest text-white pb-2 mb-8">
              Our Story
            </h2>
          </div>
          <div className="space-y-5 text-text-secondary leading-relaxed">
            <p>
              Karma Club kicked off in 2018 with a simple idea: give underground DJs a real stage in front of people who actually care about the music. No industry gatekeepers. No pay-to-play schemes. Just raw talent, real community, and a shared love for Drum & Bass and Techno.
            </p>
            <p>
              We started with small open deck nights — living rooms, backyards, borrowed venues — and built something that now runs regular events across Brisbane and beyond. The energy in the room at a Karma Club night is different because the people in it chose to be there for the right reasons.
            </p>
            <p>
              Whether you&apos;re a seasoned selector who&apos;s played festivals or someone who just got their first controller last month, there&apos;s a place for you at a Karma Club event. That&apos;s not a slogan. That&apos;s just how we roll.
            </p>
            <p>
              The underground doesn&apos;t advertise itself — it just keeps going. We&apos;re proof of that.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 px-6 bg-surface border-t border-b border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-heading font-display font-bold text-2xl uppercase tracking-widest text-white pb-2 mb-12 fade-in-up">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              {
                title: 'Open Deck Nights',
                body: 'Community events where any DJ can play in front of a supportive crowd. No judgement. Real experience. This is where legends start and where the scene gets its next generation.',
              },
              {
                title: 'Pop-Up Events',
                body: 'Low ticket price, high energy. We bring in DJs who deserve the spotlight and put them in front of people who actually care. Different locations, different vibes — always underground.',
              },
              {
                title: 'Merch Drops',
                body: 'Limited run shirts, hats, stickers, and random collabs. Wear the scene. Every drop is small batch — once it&apos;s gone, it&apos;s gone.',
              },
            ].map((card) => (
              <div key={card.title} className="bg-surface p-8 fade-in-up">
                <h3 className="font-display font-bold text-lg uppercase tracking-widest text-white mb-4">
                  {card.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Genres */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-heading font-display font-bold text-2xl uppercase tracking-widest text-white pb-2 mb-12 fade-in-up">
            The Genres
          </h2>
          <div className="flex flex-wrap gap-3">
            {['Drum & Bass', 'Techno', 'Bass Music', 'Underground', 'Jungle', 'Breaks'].map(
              (genre) => (
                <span
                  key={genre}
                  className="font-mono text-sm uppercase tracking-widest border border-border text-text-secondary px-4 py-2 fade-in-up"
                >
                  {genre}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-16 px-6 bg-surface border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 divide-x divide-border">
            {[
              { stat: 'EST. 2018', label: 'Founded' },
              { stat: String(eventCount?.count ?? '50+'), label: 'Events Hosted' },
              { stat: 'Community First', label: 'Always' },
            ].map((item) => (
              <div key={item.label} className="px-8 py-6 text-center fade-in-up">
                <p className="font-display font-bold text-2xl md:text-4xl uppercase text-white mb-2">
                  {item.stat}
                </p>
                <p className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
