import type { Metadata } from 'next';
import { Inter, Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartProvider from '@/components/cart/CartProvider';
import ScrollObserver from '@/components/ScrollObserver';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

const siteUrl = 'https://karmaklub.netlify.app';

export const metadata: Metadata = {
  title: {
    default: 'Karma Club — Underground. Community. Movement.',
    template: '%s | Karma Club',
  },
  description:
    "Karma Club is Brisbane's underground Drum & Bass and Techno events community. Open deck nights, pop-up events, and limited merch drops. Est. 2018.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'Karma Club',
    url: siteUrl,
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Karma Club — Underground Brisbane Events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-default.jpg'],
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Karma Club',
  url: siteUrl,
  logo: `${siteUrl}/logo-white.png`,
  description: "Brisbane's underground Drum & Bass and Techno events community since 2018.",
  foundingDate: '2018',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brisbane',
    addressRegion: 'QLD',
    addressCountry: 'AU',
  },
  sameAs: [
    'https://instagram.com/karmaclub',
    'https://facebook.com/groups/karmaclub',
    'https://soundcloud.com/karmaclub',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
      >
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
          />
        </head>
        <body>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ScrollObserver />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
