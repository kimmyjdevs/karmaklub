'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { slugify } from '@/lib/utils';
import type { Product } from '@/db/schema';

type Props = { product?: Product };

const CATEGORIES = ['SHIRT', 'HAT', 'STICKER', 'DROP'];

export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState(product?.slug ?? '');
  const [autoSlug, setAutoSlug] = useState(!product);
  const [images, setImages] = useState<string[]>((product?.images as string[]) ?? ['']);
  const [sizes, setSizes] = useState<string[]>((product?.sizes as string[]) ?? []);
  const [sizeInput, setSizeInput] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (autoSlug) setSlug(slugify(e.target.value));
  };

  const addSize = () => {
    const s = sizeInput.trim().toUpperCase();
    if (s && !sizes.includes(s)) setSizes([...sizes, s]);
    setSizeInput('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);

    const data = {
      name: fd.get('name') as string,
      slug,
      category: fd.get('category') as string,
      price: Math.round(parseFloat(fd.get('price') as string) * 100),
      description: fd.get('description') as string,
      sizes,
      stock: parseInt(fd.get('stock') as string, 10),
      images: images.filter(Boolean),
      isFeatured: fd.get('isFeatured') === 'on',
      isNew: fd.get('isNew') === 'on',
      published: fd.get('published') === 'on',
    };

    const method = product ? 'PUT' : 'POST';
    const url = product ? `/api/admin/products/${product.id}` : '/api/admin/products';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setLoading(false);
    router.push('/admin/products');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="label">Name</label>
        <input name="name" required defaultValue={product?.name} onChange={handleTitleChange} className="input" />
      </div>

      {/* Slug */}
      <div className="flex flex-col gap-1.5">
        <label className="label">Slug</label>
        <div className="flex gap-2">
          <input value={slug} onChange={(e) => { setSlug(e.target.value); setAutoSlug(false); }} className="input flex-1" />
          <button type="button" onClick={() => setAutoSlug(true)} className="btn-outline text-xs px-3">Auto</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="label">Category</label>
          <select name="category" defaultValue={product?.category} className="input appearance-none">
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="label">Price (AUD)</label>
          <input name="price" type="number" step="0.01" min="0" required
            defaultValue={product ? (product.price / 100).toFixed(2) : ''} className="input" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="label">Stock</label>
        <input name="stock" type="number" min="0" defaultValue={product?.stock ?? 0} className="input" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="label">Description</label>
        <textarea name="description" rows={4} defaultValue={product?.description ?? ''} className="input resize-none" />
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-2">
        <label className="label">Sizes</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {sizes.map((s) => (
            <span key={s} className="flex items-center gap-1 border border-border px-3 py-1 font-mono text-xs text-white">
              {s}
              <button type="button" onClick={() => setSizes(sizes.filter((x) => x !== s))} className="text-text-secondary hover:text-destructive ml-1">✕</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSize(); } }}
            className="input flex-1"
            placeholder="e.g. S, M, L, XL"
          />
          <button type="button" onClick={addSize} className="btn-outline text-xs px-4">Add</button>
        </div>
      </div>

      {/* Images */}
      <div className="flex flex-col gap-2">
        <label className="label">Image URLs (up to 4)</label>
        {images.map((img, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={img}
              onChange={(e) => { const next = [...images]; next[i] = e.target.value; setImages(next); }}
              placeholder={`Image ${i + 1} Cloudinary URL`}
              className="input flex-1"
            />
            {images.length > 1 && (
              <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))} className="btn-outline text-xs px-3">✕</button>
            )}
          </div>
        ))}
        {images.length < 4 && (
          <button type="button" onClick={() => setImages([...images, ''])} className="btn-outline text-xs self-start">+ Add Image</button>
        )}
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-3">
        {[
          { name: 'isFeatured', label: 'Featured on Homepage', checked: product?.isFeatured },
          { name: 'isNew', label: 'Show NEW DROP Badge', checked: product?.isNew },
          { name: 'published', label: 'Published', checked: product?.published },
        ].map(({ name, label, checked }) => (
          <label key={name} className="flex items-center gap-3 cursor-pointer">
            <input name={name} type="checkbox" defaultChecked={checked ?? false} className="w-4 h-4 accent-white" />
            <span className="font-mono text-sm text-text-secondary uppercase tracking-widest">{label}</span>
          </label>
        ))}
      </div>

      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
        {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
}
