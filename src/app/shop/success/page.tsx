'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';

export default function ShopSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4">
          Order Confirmed
        </p>
        <h1 className="font-display font-bold text-4xl uppercase text-white mb-6">
          Thanks for the support.
        </h1>
        <p className="text-text-secondary text-sm leading-relaxed mb-8">
          Your order is confirmed. You&apos;ll receive a confirmation email shortly. You&apos;re helping keep the underground alive — and that means everything to us.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="btn-primary">
            Back to Shop
          </Link>
          <Link href="/events" className="btn-ghost">
            Upcoming Events
          </Link>
        </div>
      </div>
    </div>
  );
}
