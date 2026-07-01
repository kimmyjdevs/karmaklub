import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="grain-overlay relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/dsc00316.jpg"
          alt="Karma Klub underground event"
          fill
          priority
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-6 fade-in-up">
        <Image
          src="/logo.png"
          alt="Karma Klub"
          width={260}
          height={260}
          priority
          className="mx-auto drop-shadow-[0_0_40px_rgba(255,255,255,0.08)]"
        />
      </div>

      {/* Tagline */}
      <p
        className="relative z-10 font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-text-secondary mb-10 fade-in-up"
        style={{ animationDelay: '120ms' }}
      >
        Underground &nbsp;·&nbsp; Community &nbsp;·&nbsp; Movement
      </p>

      {/* Est. line */}
      <p
        className="relative z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-border mb-12 fade-in-up"
        style={{ animationDelay: '180ms' }}
      >
        Est. 2018 &nbsp;·&nbsp; Brisbane, Australia
      </p>

      {/* CTAs */}
      <div
        className="relative z-10 flex flex-col sm:flex-row gap-4 fade-in-up"
        style={{ animationDelay: '240ms' }}
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
    <div className="flex flex-col items-center gap-1 animate-bounce opacity-40">
      <span className="w-px h-8 bg-border block" />
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-border"
      >
        <polyline points="2 4 6 8 10 4" />
      </svg>
    </div>
  );
}
