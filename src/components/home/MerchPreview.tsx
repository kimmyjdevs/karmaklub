import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/db/schema';
import { formatPrice } from '@/lib/utils';

type Props = {
  products: Product[];
};

export default function MerchPreview({ products }: Props) {
  return (
    <section className="py-20 px-6 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <h2 className="section-heading font-display font-bold text-3xl md:text-4xl uppercase tracking-widest text-white pb-2">
            Latest Drops
          </h2>
          <Link
            href="/shop"
            className="font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-white transition-colors hidden sm:block"
          >
            Visit The Shop →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="border border-border py-16 text-center">
            <p className="font-mono text-text-secondary text-sm">
              Merch coming soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-8 sm:hidden text-center">
          <Link href="/shop" className="btn-outline">
            Visit The Shop
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const image = (product.images as string[])?.[0];
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="bg-surface hover:bg-card transition-colors duration-200 group fade-in-up"
    >
      <div className="relative aspect-square bg-card overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-card">
            <span className="font-mono text-xs text-text-secondary uppercase tracking-widest text-center px-4">
              {product.name}
            </span>
          </div>
        )}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-white text-black font-mono text-[10px] uppercase tracking-widest px-2 py-0.5">
            New Drop
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="font-display font-bold text-sm text-white uppercase truncate">
          {product.name}
        </p>
        <p className="font-mono text-xs text-text-secondary mt-1">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
