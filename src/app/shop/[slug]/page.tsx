import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import AddToCartForm from './AddToCartForm';
import ProductImageGallery from './ProductImageGallery';
import type { Metadata } from 'next';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [product] = await Promise.resolve()
    .then(() => db.select().from(products).where(eq(products.slug, params.slug)).limit(1))
    .catch(() => []);

  if (!product) return { title: 'Product Not Found' };

  return {
    title: product.name,
    description: product.description ?? undefined,
    openGraph: {
      title: product.name,
      images: (product.images as string[])?.[0] ? [(product.images as string[])[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const [product] = await Promise.resolve()
    .then(() => db.select().from(products).where(eq(products.slug, params.slug)).limit(1))
    .catch(() => []);

  if (!product || !product.published) notFound();

  const images = (product.images as string[]) ?? [];
  const sizes = (product.sizes as string[]) ?? [];
  const soldOut = (product.stock ?? 0) === 0;

  return (
    <div className="pt-24 px-6 pb-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Images */}
        <ProductImageGallery images={images} name={product.name} />

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div>
            {product.isNew && (
              <span className="font-mono text-xs uppercase tracking-widest bg-white text-black px-2 py-0.5 inline-block mb-3">
                New Drop
              </span>
            )}
            <h1 className="font-display font-bold text-3xl md:text-4xl uppercase text-white leading-tight">
              {product.name}
            </h1>
            <p className="font-mono text-xl text-white mt-3">
              {formatPrice(product.price)}
            </p>
          </div>

          {product.description && (
            <p className="text-text-secondary leading-relaxed text-sm">
              {product.description}
            </p>
          )}

          {soldOut ? (
            <div className="border border-border py-4 text-center">
              <span className="font-mono text-sm uppercase tracking-widest text-text-secondary">
                Sold Out
              </span>
            </div>
          ) : (
            <AddToCartForm
              product={{
                productId: product.id,
                name: product.name,
                price: product.price,
                image: images[0] ?? '',
                slug: product.slug,
              }}
              sizes={sizes}
            />
          )}

          <div className="border-t border-border pt-6 space-y-2">
            <p className="font-mono text-xs text-text-secondary uppercase tracking-widest">
              Category: {product.category}
            </p>
            <p className="font-mono text-xs text-text-secondary uppercase tracking-widest">
              Stock: {soldOut ? 'Out of stock' : `${product.stock} available`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
