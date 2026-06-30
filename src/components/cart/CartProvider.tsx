'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  image: string;
  size?: string;
  qty: number;
  slug: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'> & { qty?: number }) => void;
  removeItem: (productId: number, size?: string) => void;
  updateQty: (productId: number, qty: number, size?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

const STORAGE_KEY = 'karma-klub-cart';

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, 'qty'> & { qty?: number }) => {
    setItems((prev) => {
      const key = `${item.productId}-${item.size ?? ''}`;
      const existing = prev.find(
        (i) => `${i.productId}-${i.size ?? ''}` === key
      );
      if (existing) {
        return prev.map((i) =>
          `${i.productId}-${i.size ?? ''}` === key
            ? { ...i, qty: i.qty + (item.qty ?? 1) }
            : i
        );
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: number, size?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size))
    );
  }, []);

  const updateQty = useCallback((productId: number, qty: number, size?: string) => {
    if (qty <= 0) {
      removeItem(productId, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.size === size ? { ...i, qty } : i
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}
