'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useCart } from './CartProvider';
import { formatPrice } from '@/lib/utils';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQty, subtotal } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-surface border-l border-border flex flex-col transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-display font-bold uppercase tracking-widest text-white">
            Your Cart
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-white transition-colors p-1"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <p className="text-text-secondary font-mono text-sm">Your cart is empty.</p>
              <button onClick={onClose} className="btn-ghost text-xs">
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-4 py-4 border-b border-border"
                >
                  {item.image && (
                    <div className="relative w-16 h-16 shrink-0 bg-card">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-sm text-white truncate">
                      {item.name}
                    </p>
                    {item.size && (
                      <p className="font-mono text-xs text-text-secondary mt-0.5">
                        Size: {item.size}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.productId, item.qty - 1, item.size)}
                          className="w-6 h-6 border border-border text-text-secondary hover:text-white hover:border-white transition-colors flex items-center justify-center font-mono text-sm"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="font-mono text-sm text-white w-4 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.productId, item.qty + 1, item.size)}
                          className="w-6 h-6 border border-border text-text-secondary hover:text-white hover:border-white transition-colors flex items-center justify-center font-mono text-sm"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-white">
                          {formatPrice(item.price * item.qty)}
                        </span>
                        <button
                          onClick={() => removeItem(item.productId, item.size)}
                          className="text-text-secondary hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6M14 11v6" />
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-sm text-text-secondary uppercase tracking-widest">
                Subtotal
              </span>
              <span className="font-display font-bold text-white text-lg">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-text-secondary font-mono text-xs mb-4">
              Shipping & taxes calculated at checkout
            </p>
            <button onClick={handleCheckout} className="btn-primary w-full">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
