import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export const metadata = { title: 'Admin | Karma Club' };

const adminNav = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/gallery', label: 'Gallery' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <aside className="w-56 bg-surface border-r border-border flex flex-col shrink-0">
            <div className="p-6 border-b border-border">
              <Link href="/" className="font-display font-bold text-lg uppercase tracking-widest text-white">
                Karma Club
              </Link>
              <p className="font-mono text-[10px] text-text-secondary mt-1 uppercase tracking-widest">
                Admin
              </p>
            </div>
            <nav className="flex-1 p-4">
              {adminNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block font-mono text-sm text-text-secondary hover:text-white py-2 px-3 hover:bg-card transition-colors rounded"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-border">
              <UserButton afterSignOutUrl="/" />
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0 bg-background">{children}</main>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
