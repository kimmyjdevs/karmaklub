'use client';

import { useRouter } from 'next/navigation';

export default function DeleteProductButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="font-mono text-xs text-text-secondary hover:text-destructive transition-colors"
    >
      Delete
    </button>
  );
}
