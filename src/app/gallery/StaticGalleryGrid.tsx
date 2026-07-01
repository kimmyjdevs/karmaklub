'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const staticPhotos = [
  '/images/dsc00018.jpg',
  '/images/dsc00020.jpg',
  '/images/dsc00065.jpg',
  '/images/dsc00133.jpg',
  '/images/dsc00145.jpg',
  '/images/dsc00188.jpg',
  '/images/dsc00277.jpg',
  '/images/dsc00291.jpg',
  '/images/dsc00310.jpg',
  '/images/dsc00314.jpg',
  '/images/dsc00316.jpg',
  '/images/dsc00319.jpg',
  '/images/dsc00334.jpg',
  '/images/dsc00345.jpg',
  '/images/dsc00361.jpg',
  '/images/dsc00371.jpg',
  '/images/dsc00375.jpg',
  '/images/dsc00386.jpg',
  '/images/dsc00425.jpg',
  '/images/p1430537.jpg',
  '/images/p1430661.jpg',
  '/images/p1430663.jpg',
  '/images/snapseed.jpg',
  '/images/snapseed(2).jpg',
  '/images/c118e1fc-7b73-414f-811f-2a97a5a96eee.jpeg',
  '/images/copy-of-bfc6a871-aa34-43ed-b770-d37c936ae558.jpeg',
];

export default function StaticGalleryGrid() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = staticPhotos.map((src) => ({ src }));

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
        {staticPhotos.map((src, i) => (
          <button
            key={src}
            onClick={() => { setIndex(i); setOpen(true); }}
            className="block w-full overflow-hidden group fade-in-up"
            aria-label="Karma Klub event photo"
          >
            <div className="relative w-full">
              <Image
                src={src}
                alt="Karma Klub event photo"
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:opacity-80 transition-opacity duration-200"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200" />
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
