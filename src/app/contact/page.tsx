import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact Karma Club | DJ Bookings & Enquiries Brisbane',
  description: 'Book a DJ, collab on an event, or get in touch with Karma Club Brisbane. We also take DJ submissions for open deck nights.',
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="px-6 pb-12 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <h1 className="section-heading font-display font-bold text-5xl md:text-7xl uppercase tracking-tight text-white pb-2 mb-4">
            Contact
          </h1>
          <p className="text-text-secondary font-mono text-sm max-w-lg">
            Hit us up for bookings, collabs, or anything else. We&apos;re real people who read real emails.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
        {/* Form */}
        <div>
          <h2 className="section-heading font-display font-bold text-xl uppercase tracking-widest text-white pb-2 mb-8 fade-in-up">
            Send a Message
          </h2>
          <ContactForm />
        </div>

        {/* Community + Socials */}
        <div className="flex flex-col gap-12">
          {/* Facebook group */}
          <div className="fade-in-up">
            <h2 className="section-heading font-display font-bold text-xl uppercase tracking-widest text-white pb-2 mb-4">
              Join the Karma Club Family
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              We have a Facebook community group where members share mixes, event info, and support each other. It&apos;s free. It&apos;s judgment-free. Come in.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_FACEBOOK_GROUP_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Join Our Facebook Group
            </a>
          </div>

          {/* Socials */}
          <div className="fade-in-up">
            <h2 className="font-display font-bold text-xl uppercase tracking-widest text-white mb-4">
              Find Us Online
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Instagram', url: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
                { label: 'Facebook', url: process.env.NEXT_PUBLIC_FACEBOOK_GROUP_URL },
                { label: 'SoundCloud', url: process.env.NEXT_PUBLIC_SOUNDCLOUD_URL },
                { label: 'TikTok', url: process.env.NEXT_PUBLIC_TIKTOK_URL },
              ].map(({ label, url }) =>
                url ? (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-text-secondary hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="text-border">→</span> {label}
                  </a>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
