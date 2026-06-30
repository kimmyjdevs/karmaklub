'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import type { Gallery } from '@/db/schema';

type Props = {
  photos: Gallery[];
};

export default function GalleryGrid({ photos }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = photos.map((p) => ({ src: p.cloudinaryUrl }));

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => { setIndex(i); setOpen(true); }}
            className="block w-full overflow-hidden group fade-in-up"
            aria-label={photo.eventTag ?? 'Gallery photo'}
          >
            <div className="relative w-full">
              <Image
                src={photo.cloudinaryUrl}
                alt={photo.eventTag ?? 'Karma Club event photo'}
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:opacity-80 transition-opacity duration-200"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
              />
              {photo.eventTag && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-end p-3 opacity-0 group-hover:opacity-100">
                  <span className="font-mono text-xs text-white uppercase tracking-widest">
                    {photo.eventTag}
                  </span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        styles={{
          container: { backgroundColor: 'rgba(10,10,10,0.98)' },
        }}
      />
    </>
  );
}
