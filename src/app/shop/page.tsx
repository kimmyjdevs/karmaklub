import { db } from '@/db';
import { products } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import ShopFilter from './ShopFilter';

export const metadata = {
  title: 'Shop',
  description: 'Limited run Karma Club merch — shirts, hats, stickers, and drop items.',
};

const CATEGORIES = ['ALL', 'SHIRTS', 'HATS', 'STICKERS', 'DROPS'];
const categoryMap: Record<string, string> = {
  SHIRTS: 'SHIRT',
  HATS: 'HAT',
  STICKERS: 'STICKER',
  DROPS: 'DROP',
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  const cat = searchParams.cat?.toUpperCase() ?? 'ALL';
  const dbCategory = categoryMap[cat];

  const allProducts = await Promise.resolve()
    .then(() => db.select().from(products)
      .where(eq(products.published, true)))
    .catch(() => []);

  const displayed = dbCategory
    ? allProducts.filter((p) => p.category === dbCategory)
    : allProducts;

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="px-6 pb-12 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="section-heading font-display font-bold text-5xl md:text-7xl uppercase tracking-tight text-white pb-2 mb-4">
            Shop
          </h1>
          <p className="text-text-secondary font-mono text-sm max-w-md">
            Limited runs. Once it&apos;s gone, it&apos;s gone. Wear the scene.
          </p>
        </div>
      </section>

      <ShopFilter active={cat} categories={CATEGORIES} />

      {/* Grid */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {displayed.length === 0 ? (
            <div className="border border-border py-24 text-center">
              <p className="font-mono text-text-secondary text-sm">
                No products found. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border">
              {displayed.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  const images = (product.images as string[]) ?? [];
  const primary = images[0];
  const hover = images[1];
  const soldOut = (product.stock ?? 0) === 0;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="bg-background hover:bg-card transition-colors duration-200 group fade-in-up relative"
    >
      <div className="relative aspect-square bg-card overflow-hidden">
        {primary ? (
          <>
            <Image
              src={primary}
              alt={product.name}
              fill
              className={`object-cover transition-opacity duration-300 ${hover ? 'group-hover:opacity-0' : ''}`}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {hover && (
              <Image
                src={hover}
                alt={product.name}
                fill
                className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-card">
            <span className="font-mono text-xs text-text-secondary uppercase tracking-widest text-center px-4">
              {product.name}
            </span>
          </div>
        )}
        {soldOut && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-white border border-white px-3 py-1">
              Sold Out
            </span>
          </div>
        )}
        {product.isNew && !soldOut && (
          <span className="absolute top-2 left-2 bg-white text-black font-mono text-[10px] uppercase tracking-widest px-2 py-0.5">
            New Drop
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="font-display font-bold text-sm text-white uppercase">
          {product.name}
        </p>
        <p className="font-mono text-xs text-text-secondary mt-1">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
