import { db } from '@/db';
import { products } from '@/db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import DeleteProductButton from './DeleteProductButton';

export default async function AdminProductsPage() {
  const allProducts = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt))
    .catch(() => []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-bold text-3xl uppercase tracking-widest text-white">
          Products
        </h1>
        <Link href="/admin/products/new" className="btn-primary text-sm">
          + Add Product
        </Link>
      </div>

      <div className="border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {['Product', 'Category', 'Price', 'Stock', 'Status', ''].map((h) => (
                <th key={h} className="text-left font-mono text-xs uppercase tracking-widest text-text-secondary px-4 py-3 hidden md:table-cell first:table-cell last:table-cell">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center font-mono text-sm text-text-secondary">
                  No products yet.{' '}
                  <Link href="/admin/products/new" className="text-white underline">Add one</Link>
                </td>
              </tr>
            ) : (
              allProducts.map((p) => (
                <tr key={p.id} className="border-b border-border hover:bg-card transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-display font-bold text-sm text-white">{p.name}</p>
                    <p className="font-mono text-xs text-text-secondary">{p.slug}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell font-mono text-xs text-text-secondary">{p.category}</td>
                  <td className="px-4 py-3 hidden md:table-cell font-mono text-xs text-white">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3 hidden md:table-cell font-mono text-xs text-text-secondary">{p.stock}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`font-mono text-[10px] uppercase tracking-widest border px-2 py-0.5 ${p.published ? 'border-white text-white' : 'border-border text-text-secondary'}`}>
                      {p.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link href={`/admin/products/${p.id}/edit`} className="font-mono text-xs text-text-secondary hover:text-white transition-colors">Edit</Link>
                      <DeleteProductButton id={p.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
