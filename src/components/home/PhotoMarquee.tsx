import Image from 'next/image';
import Marquee from '@/components/ui/Marquee';

const row1 = [
  { src: '/images/dsc00018.jpg', alt: 'Karma Klub event' },
  { src: '/images/dsc00065.jpg', alt: 'Karma Klub event' },
  { src: '/images/dsc00133.jpg', alt: 'Karma Klub event' },
  { src: '/images/dsc00145.jpg', alt: 'Karma Klub event' },
  { src: '/images/dsc00188.jpg', alt: 'Karma Klub event' },
  { src: '/images/dsc00291.jpg', alt: 'Karma Klub event' },
  { src: '/images/dsc00316.jpg', alt: 'Karma Klub event' },
  { src: '/images/dsc00334.jpg', alt: 'Karma Klub event' },
];

const row2 = [
  { src: '/images/dsc00345.jpg', alt: 'Karma Klub event' },
  { src: '/images/dsc00361.jpg', alt: 'Karma Klub event' },
  { src: '/images/dsc00371.jpg', alt: 'Karma Klub event' },
  { src: '/images/dsc00375.jpg', alt: 'Karma Klub event' },
  { src: '/images/dsc00386.jpg', alt: 'Karma Klub event' },
  { src: '/images/p1430661.jpg', alt: 'Karma Klub event' },
  { src: '/images/p1430663.jpg', alt: 'Karma Klub event' },
  { src: '/images/snapseed.jpg', alt: 'Karma Klub DJ' },
];

function PhotoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-52 w-72 shrink-0 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="288px"
        loading="lazy"
      />
    </div>
  );
}

export default function PhotoMarquee() {
  return (
    <section className="py-16 border-t border-b border-border overflow-hidden">
      <div className="flex flex-col gap-3">
        <Marquee pauseOnHover duration="50s" gap="0.75rem">
          {row1.map((img, i) => (
            <PhotoCard key={i} {...img} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse duration="45s" gap="0.75rem">
          {row2.map((img, i) => (
            <PhotoCard key={i} {...img} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
