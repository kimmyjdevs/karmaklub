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

export const metadata: Metadata = {
  title: {
    default: 'Karma Club — Underground. Community. Movement.',
    template: '%s | Karma Club',
  },
  description:
    'Karma Club is an underground DJ and bass/techno events community based in Australia. Since 2018, we\'ve been building the underground — one open deck at a time.',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'Karma Club',
  },
  twitter: {
    card: 'summary_large_image',
  },
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
