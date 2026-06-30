import { db } from '@/db';
import { gallery } from '@/db/schema';
import { desc } from 'drizzle-orm';
import Image from 'next/image';
import GalleryUploadForm from './GalleryUploadForm';
import DeletePhotoButton from './DeletePhotoButton';

export default async function AdminGalleryPage() {
  const photos = await db
    .select()
    .from(gallery)
    .orderBy(desc(gallery.createdAt))
    .catch(() => []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-bold text-3xl uppercase tracking-widest text-white">
          Gallery
        </h1>
      </div>

      {/* Upload form */}
      <div className="border border-border p-6 mb-8 max-w-lg">
        <h2 className="font-display font-bold text-lg uppercase tracking-widest text-white mb-4">
          Add Photo
        </h2>
        <GalleryUploadForm />
      </div>

      {/* Grid */}
      {photos.length === 0 ? (
        <p className="font-mono text-sm text-text-secondary">No photos yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group">
              <div className="relative aspect-square bg-card overflow-hidden">
                <Image
                  src={photo.cloudinaryUrl}
                  alt={photo.eventTag ?? 'Gallery photo'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <DeletePhotoButton id={photo.id} />
                </div>
              </div>
              {photo.eventTag && (
                <p className="font-mono text-[10px] text-text-secondary mt-1 truncate uppercase tracking-widest">
                  {photo.eventTag}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
