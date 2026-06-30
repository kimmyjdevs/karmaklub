'use client';

type Props = {
  active: string;
  categories: string[];
};

export default function ShopFilter({ active, categories }: Props) {
  return (
    <div className="px-6 py-4 border-b border-border overflow-x-auto">
      <div className="max-w-7xl mx-auto flex gap-1 min-w-max">
        {categories.map((cat) => (
          <a
            key={cat}
            href={cat === 'ALL' ? '/shop' : `/shop?cat=${cat.toLowerCase()}`}
            className={`font-mono text-xs uppercase tracking-widest px-4 py-2 transition-colors whitespace-nowrap ${
              active === cat
                ? 'bg-white text-black'
                : 'text-text-secondary hover:text-white border border-transparent hover:border-border'
            }`}
          >
            {cat}
          </a>
        ))}
      </div>
    </div>
  );
}
