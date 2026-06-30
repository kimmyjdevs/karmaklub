'use client';

import { useState } from 'react';
import Image from 'next/image';

type Props = {
  images: string[];
  name: string;
};

export default function ProductImageGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-card flex items-center justify-center">
        <span className="font-mono text-xs text-text-secondary uppercase tracking-widest text-center px-8">
          {name}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square bg-card overflow-hidden">
        <Image
          src={images[active]}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-16 h-16 overflow-hidden border transition-colors ${
                i === active ? 'border-white' : 'border-border hover:border-text-secondary'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${name} ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
