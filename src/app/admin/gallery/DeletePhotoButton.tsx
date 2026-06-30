'use client';

import { useRouter } from 'next/navigation';

export default function DeletePhotoButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Delete this photo?')) return;
    await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="font-mono text-xs text-white border border-white px-3 py-1 hover:bg-destructive hover:border-destructive transition-colors"
    >
      Delete
    </button>
  );
}
