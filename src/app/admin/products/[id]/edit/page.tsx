import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import ProductForm from '../../ProductForm';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, Number(params.id)))
    .limit(1)
    .catch(() => []);

  if (!product) notFound();

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-display font-bold text-3xl uppercase tracking-widest text-white mb-8">
        Edit Product
      </h1>
      <ProductForm product={product} />
    </div>
  );
}
