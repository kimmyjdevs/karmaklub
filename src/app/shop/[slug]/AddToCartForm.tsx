'use client';

import { useState } from 'react';
import { useCart } from '@/components/cart/CartProvider';

type Props = {
  product: {
    productId: number;
    name: string;
    price: number;
    image: string;
    slug: string;
  };
  sizes: string[];
};

export default function AddToCartForm({ product, sizes }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    sizes.length > 0 ? undefined : undefined
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    if (sizes.length > 0 && !selectedSize) return;
    addItem({ ...product, size: selectedSize, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Size selector */}
      {sizes.length > 0 && (
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-3">
            Size {!selectedSize && <span className="text-destructive">— required</span>}
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`font-mono text-xs uppercase tracking-widest w-12 h-12 border transition-colors ${
                  selectedSize === size
                    ? 'border-white text-white bg-card'
                    : 'border-border text-text-secondary hover:border-white hover:text-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Qty */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-3">
          Quantity
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-10 h-10 border border-border text-text-secondary hover:text-white hover:border-white transition-colors flex items-center justify-center font-mono"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="font-mono text-white w-6 text-center">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="w-10 h-10 border border-border text-text-secondary hover:text-white hover:border-white transition-colors flex items-center justify-center font-mono"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart */}
      <button
        onClick={handleAdd}
        disabled={sizes.length > 0 && !selectedSize}
        className={`btn-primary w-full mt-2 disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        {added ? 'Added to Cart ✓' : 'Add to Cart'}
      </button>
    </div>
  );
}
