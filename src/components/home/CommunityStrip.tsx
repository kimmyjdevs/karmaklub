export default function CommunityStrip() {
  return (
    <section className="py-24 px-6 bg-background border-t border-border">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-display font-bold text-2xl md:text-3xl text-white leading-snug mb-8 fade-in-up">
          Karma Club is a judgment-free zone.{' '}
          <span className="text-text-secondary">
            Whether you&apos;ve played 10 gigs or never touched a deck — you belong here.
          </span>
        </p>
        <a
          href={process.env.NEXT_PUBLIC_FACEBOOK_GROUP_URL || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost fade-in-up"
        >
          Join the Community
        </a>
      </div>
    </section>
  );
}
