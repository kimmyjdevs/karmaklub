import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="grain-overlay relative min-h-screen flex flex-col items-center justify-center text-center px-6">
      {/* Logo / wordmark */}
      <div className="relative z-10 mb-8 fade-in-up">
        <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl uppercase tracking-widest text-white leading-none">
          KARMA
          <br />
          CLUB
        </h1>
      </div>

      {/* Tagline */}
      <p
        className="relative z-10 font-mono text-sm md:text-base uppercase tracking-[0.3em] text-text-secondary mb-12 fade-in-up"
        style={{ animationDelay: '100ms' }}
      >
        Underground &nbsp;·&nbsp; Community &nbsp;·&nbsp; Movement
      </p>

      {/* CTAs */}
      <div
        className="relative z-10 flex flex-col sm:flex-row gap-4 fade-in-up"
        style={{ animationDelay: '200ms' }}
      >
        <Link href="/events" className="btn-primary">
          See Events
        </Link>
        <Link href="/shop" className="btn-ghost">
          Shop Merch
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <ScrollChevron />
      </div>
    </section>
  );
}

function ScrollChevron() {
  return (
    <div className="flex flex-col items-center gap-1 animate-bounce">
      <span className="w-px h-8 bg-border block" />
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        stroke="#2A2A2A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="2 4 6 8 10 4" />
      </svg>
    </div>
  );
}
