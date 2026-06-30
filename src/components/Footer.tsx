import Link from 'next/link';

const navLinks = [
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="font-display font-bold text-2xl uppercase tracking-widest text-white block mb-4">
              Karma Club
            </Link>
            <p className="text-text-secondary font-mono text-sm leading-relaxed">
              Underground. Community. Movement.<br />
              Building the scene since 2018.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4">Navigate</p>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-sm text-text-secondary hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Community */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4">Community</p>
            <p className="text-text-secondary text-sm mb-4">
              Join our Facebook group — free, judgment-free, and full of people who actually care about the music.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_FACEBOOK_GROUP_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-xs"
            >
              Join the Group
            </a>
          </div>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-6 mb-8 pt-8 border-t border-border">
          <SocialLink href={process.env.NEXT_PUBLIC_INSTAGRAM_URL} label="Instagram">
            <InstagramIcon />
          </SocialLink>
          <SocialLink href={process.env.NEXT_PUBLIC_FACEBOOK_GROUP_URL} label="Facebook">
            <FacebookIcon />
          </SocialLink>
          <SocialLink href={process.env.NEXT_PUBLIC_SOUNDCLOUD_URL} label="SoundCloud">
            <SoundCloudIcon />
          </SocialLink>
          <SocialLink href={process.env.NEXT_PUBLIC_TIKTOK_URL} label="TikTok">
            <TikTokIcon />
          </SocialLink>
        </div>

        <p className="font-mono text-xs text-text-secondary">
          © Karma Club {year}. Underground since 2018.
        </p>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-text-secondary hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function SoundCloudIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.175 12.225c-.015.015-.02.03-.02.045 0 .375.27.6.6.6h.165l.525-3.045-.525-3.09c-.33 0-.6.225-.6.6 0 .015.005.03.02.045l-.165 2.49.165 2.355zM3.6 9.24l-.525 3.03.525 2.97c.27 0 .48-.21.48-.48 0-.015-.005-.03-.015-.045l-.015-.015.465-2.43-.465-2.55c0-.27-.21-.48-.48-.48-.015 0-.015.005-.015.005zM5.685 7.785l-.54 4.485.54 4.035c.315 0 .57-.255.57-.57 0-.015-.005-.03-.015-.045l.015-.015.48-3.405-.48-3.54c0-.315-.255-.57-.57-.57zM7.8 7.08l-.54 5.19.54 4.815c.36 0 .66-.3.66-.66 0-.015-.005-.03-.015-.045v.015l.435-4.125-.435-4.245c0-.36-.3-.66-.66-.66zM9.9 5.4l-.54 6.87.54 5.49c.405 0 .735-.33.735-.735 0-.015-.005-.03-.015-.045l.015.015.39-4.725-.39-5.04c0-.405-.33-.735-.735-.735z" />
      <path d="M11.985 3.33l-.525 9.06.525 5.895c.45 0 .825-.375.825-.825 0-.015-.005-.03-.015-.045l.015.015.345-5.04-.345-5.535c-.015-.45-.375-.825-.825-.825zM14.07 2.46l-.51 9.96.51 5.79c.495 0 .9-.405.9-.9 0-.015-.005-.03-.015-.045h.015l.3-4.845-.3-5.625c0-.495-.405-.9-.9-.9zM16.17 2.1l-.495 10.335.495 5.655c.54 0 .975-.435.975-.975 0-.015-.005-.03-.015-.045h.015l.255-4.635-.255-5.625c0-.54-.435-.975-.975-.975zM18.255 2.085c-.585 0-1.065.48-1.065 1.065 0 .015.005.03.015.045h-.015l.21 9.075-.21 5.52c0 .585.48 1.065 1.065 1.065.585 0 1.065-.48 1.065-1.065 0-.015-.005-.03-.015-.045h.015l.165-5.475-.165-9.12c0-.585-.48-1.065-1.065-1.065zM20.34 6.39c-.63 0-1.14.51-1.14 1.14 0 .015.005.03.015.045h-.015v.015l.12 4.68-.12 4.41c0 .63.51 1.14 1.14 1.14.63 0 1.14-.51 1.14-1.14l.135-4.41-.135-4.74c0-.63-.51-1.14-1.14-1.14z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.04-8.6a8.18 8.18 0 0 0 4.79 1.53V4.78a4.85 4.85 0 0 1-1.03-.09z" />
    </svg>
  );
}
