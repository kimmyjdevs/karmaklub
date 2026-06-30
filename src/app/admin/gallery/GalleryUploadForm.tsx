'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GalleryUploadForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [publicId, setPublicId] = useState('');
  const [eventTag, setEventTag] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !publicId) return;
    setLoading(true);

    await fetch('/api/admin/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cloudinaryUrl: url, cloudinaryPublicId: publicId, eventTag, eventDate }),
    });

    setUrl('');
    setPublicId('');
    setEventTag('');
    setEventDate('');
    setLoading(false);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="label">Cloudinary URL</label>
        <input value={url} onChange={(e) => setUrl(e.target.value)} required className="input" placeholder="https://res.cloudinary.com/..." />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="label">Cloudinary Public ID</label>
        <input value={publicId} onChange={(e) => setPublicId(e.target.value)} required className="input" placeholder="karma-klub/photo-name" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="label">Event Tag (optional)</label>
        <input value={eventTag} onChange={(e) => setEventTag(e.target.value)} className="input" placeholder="e.g. Open Decks March 2024" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="label">Event Date (optional)</label>
        <input value={eventDate} onChange={(e) => setEventDate(e.target.value)} type="date" className="input" />
      </div>
      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
        {loading ? 'Adding...' : 'Add Photo'}
      </button>
    </form>
  );
}
