'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const tabs = [
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Past', value: 'past' },
  { label: 'All', value: 'all' },
];

export default function EventsFilter({ active }: { active: string }) {
  return (
    <div className="px-6 py-4 border-b border-border">
      <div className="max-w-7xl mx-auto flex gap-1">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            href={`/events?filter=${tab.value}`}
            className={`font-mono text-xs uppercase tracking-widest px-4 py-2 transition-colors ${
              active === tab.value
                ? 'bg-white text-black'
                : 'text-text-secondary hover:text-white border border-transparent hover:border-border'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
